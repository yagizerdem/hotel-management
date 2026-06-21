"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useL10n } from "@/src/provider/l10n-provider";
import { useApp } from "@/src/provider/app-provider";
import { ApiResponse } from "@/src/lib/api-response";
import { IUserCredentials } from "@/src/models/user";
import { api } from "@/src/lib/axios-api";
import { useAuth } from "@/src/provider/auth-provider";
import { toast } from "sonner";

type JwtToken = { token: string };
type Role = { role: string };

export default function LoginPage() {
  const router = useRouter();
  const { lang } = useL10n();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[] | null>(null);
  const { setIsLoading } = useApp();
  const { setCredentials, setIsLoggedIn, setRole } = useAuth();

  function navigateToRegister() {
    router.push(`/${lang}/auth/register`);
  }

  function navigateToHome() {
    router.push(`/${lang}`);
  }

  async function loginUser() {
    try {
      setIsLoading(true);
      const apiResponse: ApiResponse<IUserCredentials & JwtToken & Role> = (
        await api.post("/auth/login", {
          email,
          password,
        })
      ).data;

      if (apiResponse.status.toString().startsWith("2")) {
        toast.success(apiResponse.message || "User logged in successfully", {
          position: "top-right",
        });
        setErrors(null);

        setCredentials({
          username: apiResponse.data?.username,
          email: apiResponse.data?.email,
        } as IUserCredentials);
        setRole(apiResponse.data?.role || null);
        setIsLoggedIn(true);
        navigateToHome();
      } else {
        console.log(apiResponse);
        toast.error(apiResponse.message || "Failed to log in user", {
          position: "top-right",
        });

        setErrors(apiResponse.errors || null);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Failed to log in user", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-6">
      <Card className="w-96 shadow-2xl">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>

          <CardAction>
            <Button
              variant="link"
              onMouseUp={navigateToRegister}
              className="cursor-pointer"
            >
              Register
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full" onMouseUp={loginUser}>
            Login
          </Button>

          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={navigateToHome}
          >
            Go back
          </Button>
          <Label>
            {" "}
            If you don't have an account, click the register button to create an
            account
          </Label>
          <Button
            onMouseUp={navigateToRegister}
            variant="link"
            className="w-1/2 cursor-pointer"
          >
            Register
          </Button>
        </CardFooter>
        <ul className="list-disc px-3">
          {errors &&
            errors.map((error, index) => (
              <li key={index} className="text-red-500 text-sm text-left my-2">
                {error}
              </li>
            ))}
        </ul>
      </Card>
    </div>
  );
}
