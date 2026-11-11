import NextAuth, { CredentialsSignin } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import UserModel from "@models/user";
import dbConnect from "@lib/db";
import { AppError } from "@error/app-error";
import { getSignInSchema } from "@validator/auth-validator";

declare global {
  var authMongoClient: Promise<MongoClient> | undefined;
}

/**
 * The adapter needs a client from the mongodb 6 driver. Mongoose 9 ships its
 * own mongodb 7, whose client rejects the ObjectIds the adapter creates, so
 * auth gets a separate client to the same database.
 *
 * It connects on first use rather than at import, so building the app doesn't
 * need a database, and is cached on global so hot reloads reuse it.
 */
function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  global.authMongoClient ??= new MongoClient(uri).connect();
  return global.authMongoClient;
}

// Same message for an unknown email and a wrong password, so the form
// doesn't reveal which emails have an account.
const INVALID_CREDENTIALS = "The email or password is incorrect.";

/**
 * Auth.js hides the message of any error thrown in authorize() except
 * CredentialsSignin, and reports it as a server error. This carries an
 * AppError's message to the client in `code`, which signIn() returns.
 */
class AppCredentialsSignin extends CredentialsSignin {
  constructor(error: AppError) {
    super(error.message, { cause: error });
    this.code = error.message;
  }
}

const credentialsProvider = Credentials({
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    try {
      const result = getSignInSchema().safeParse(credentials);
      if (!result.success) {
        throw AppError.fromZod(result.error);
      }
      const { email, password } = result.data;

      await dbConnect();
      // passwordHash is select: false on the model, so ask for it here.
      const user = await UserModel.findOne({ email }).select("+passwordHash");
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        throw AppError.unauthorized(INVALID_CREDENTIALS);
      }

      // Only what the session needs; never the password hash.
      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppCredentialsSignin(error);
      }
      throw error;
    }
  },
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(getMongoClient),
  providers: [credentialsProvider],
  // Credentials sign-in only works with JWT sessions; with an adapter the
  // default would be database sessions.
  session: { strategy: "jwt" },
  // Send Auth.js redirects to our own page instead of its built-in one.
  pages: { signIn: "/auth/sign-in" },

  callbacks: {
    // Auth.js already stores the user's id as token.sub at sign-in, but the
    // default session callback only copies name, email and image. Copy the
    // id too, so auth() returns session.user.id.
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
