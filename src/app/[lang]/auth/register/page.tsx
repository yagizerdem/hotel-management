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
import { IUser } from "@/src/models/user";
import { api } from "@/src/lib/axios-api";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const { lang } = useL10n();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[] | null>(null);
  const { setIsLoading } = useApp();

  function navigateToLogin() {
    const path = `/${lang}/auth/login`;
    router.push(path);
  }

  function navigateToHome() {
    const path = `/${lang}`;
    router.push(path);
  }

  async function registerUser() {
    try {
      setIsLoading(true);
      const apiResponse: ApiResponse<IUser> = (
        await api.post("/auth/register", {
          username,
          email,
          password,
        })
      ).data;

      if (apiResponse.status.toString().startsWith("2")) {
        toast.success(apiResponse.message || "User registered successfully", {
          position: "top-right",
        });
        setErrors(null);
      } else {
        console.log(apiResponse);
        toast.error(apiResponse.message || "Failed to register user", {
          position: "top-right",
        });

        setErrors(apiResponse.errors || null);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Failed to register user", {
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
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>

          <CardAction>
            <Button variant="link" onMouseUp={navigateToLogin}>
              Login
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

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
                  className="pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  required
                  className="pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full" onMouseUp={registerUser}>
            Create Account
          </Button>

          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={navigateToHome}
          >
            Go back
          </Button>
        </CardFooter>
      </Card>
      <ul className="list-disc px-3">
        {errors &&
          errors.map((error, index) => (
            <li key={index} className="text-red-500 text-sm text-left my-2">
              {error}
            </li>
          ))}
      </ul>
    </div>
  );
}
