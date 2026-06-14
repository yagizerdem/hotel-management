const jwt = require("jsonwebtoken");

function generateJwtToken({
  _id,
  email,
  username,
  role,
}: {
  _id: string;
  email: string;
  username: string;
  role: string;
}) {
  return jwt.sign(
    {
      userId: _id,
      email,
      username,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "60d",
    },
  );
}

function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

function verifyRefreshToken(token: string) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}

export { generateJwtToken, verifyAccessToken, verifyRefreshToken };
