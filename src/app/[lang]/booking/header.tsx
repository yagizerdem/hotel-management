"use client";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@base-ui/react";
import { Fragment, useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Lock,
  UserIcon,
  IdCard,
  MapPin,
  Phone,
} from "lucide-react";
import { api } from "@/src/lib/axios-api";
import { ApiResponse } from "@/src/lib/api-response";
import { IUser, IUserCredentials } from "@/src/models/user";
import { toast } from "sonner";
import { useAuth } from "@/src/provider/auth-provider";
import { useApp } from "@/src/provider/app-provider";
import { useCustomer } from "@/src/provider/customer-provider";

type JwtToken = { token: string };
type Role = { role: string };

export default function Header() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[] | null>(null);

  // profile creation states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { setCredentials, setIsLoggedIn, setRole, isLoggedIn, credentials } =
    useAuth();
  const { setIsLoading } = useApp();
  const { profile } = useCustomer();

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

  async function logoutUser() {
    try {
      setIsLoading(true);
      const apiResponse: ApiResponse<null> = (await api.post("/auth/logout"))
        .data;

      if (apiResponse.status.toString().startsWith("2")) {
        toast.success(apiResponse.message || "User logged out successfully", {
          position: "top-right",
        });
        setErrors(null);
        setCredentials(null);
        setRole(null);
        setIsLoggedIn(false);
      } else {
        console.log(apiResponse);
        toast.error(apiResponse.message || "Failed to log out user", {
          position: "top-right",
        });

        setErrors(apiResponse.errors || null);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Failed to log out user", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function createCustomerProfile() {
    try {
      setIsLoading(true);
      const apiResponse: ApiResponse<null> = (
        await api.post("/web/create-customer", {
          firstName,
          lastName,
          nationalId,
          passportNo,
          phone,
          address,
        })
      ).data;

      if (apiResponse.status.toString().startsWith("2")) {
        toast.success(
          apiResponse.message || "Customer profile created successfully",
          {
            position: "top-right",
          },
        );
        setErrors(null);
      } else {
        console.log(apiResponse);
        toast.error(
          apiResponse.message || "Failed to create customer profile",
          {
            position: "top-right",
          },
        );
        setErrors(apiResponse.errors || null);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Failed to create customer profile", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function updateCustomerProfile() {
    try {
      setIsLoading(true);
      const apiResponse: ApiResponse<null> = (
        await api.post("/web/update-customer", {
          firstName,
          lastName,
          nationalId,
          passportNo,
          phone,
          address,
        })
      ).data;

      if (apiResponse.status.toString().startsWith("2")) {
        toast.success(
          apiResponse.message || "Customer profile updated successfully",
          {
            position: "top-right",
          },
        );
        setErrors(null);
      } else {
        console.log(apiResponse);
        toast.error(
          apiResponse.message || "Failed to update customer profile",
          {
            position: "top-right",
          },
        );
        setErrors(apiResponse.errors || null);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Failed to update customer profile", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setNationalId(profile.nationalId);
      setPassportNo(profile?.passportNo || "");
      setPhone(profile.phone);
      setAddress(profile.address);
    }
  }, [profile]);

  return (
    <div className="w-full h-16 justify-between flex items-center bg-text-foreground ">
      <div className="text-lg font-bold text-gray-100 mx-4">
        Chatto Hotel Tuzla
      </div>

      <div className="flex flex-row gap-4 mx-4">
        <Button>EUR</Button>
        <Button>TR</Button>

        {!isLoggedIn && (
          <Fragment>
            {/* register  */}
            <Dialog onOpenChange={() => setErrors(null)}>
              <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  Register
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Create new account</DialogTitle>
                  <DialogDescription>
                    Enter your email below to create your account. We will send
                    you a confirmation email to verify your account.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <User className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                    <Input
                      type="text"
                      placeholder="User Name"
                      className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 shadow-sm transition-all focus-visible:ring-2"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <Mail className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                    <Input
                      type="email"
                      placeholder="Email"
                      className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 shadow-sm transition-all focus-visible:ring-2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <Lock className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 pr-12 shadow-sm transition-all focus-visible:ring-2"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-1 top-1/2 size-9 -translate-y-1/2 rounded-lg text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <ul className="list-disc px-3">
                  {errors &&
                    errors.map((error, index) => (
                      <li
                        key={index}
                        className="text-red-500 text-sm text-left my-2"
                      >
                        {error}
                      </li>
                    ))}
                </ul>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onMouseUp={() => setErrors(null)}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    onMouseUp={registerUser}
                    className="cursor-pointer"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* login  */}
            <Dialog onOpenChange={() => setErrors(null)}>
              <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Create new account</DialogTitle>
                  <DialogDescription>
                    Enter your email and password below to login your account.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                    <Input
                      type="email"
                      placeholder="Email"
                      className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 shadow-sm transition-all focus-visible:ring-2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <Lock className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 pr-12 shadow-sm transition-all focus-visible:ring-2"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-1 top-1/2 size-9 -translate-y-1/2 rounded-lg text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <ul className="list-disc px-3">
                  {errors &&
                    errors.map((error, index) => (
                      <li
                        key={index}
                        className="text-red-500 text-sm text-left my-2"
                      >
                        {error}
                      </li>
                    ))}
                </ul>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onMouseUp={() => setErrors(null)}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    onMouseUp={loginUser}
                    className="cursor-pointer"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Fragment>
        )}

        {isLoggedIn && (
          <div className="flex flex-row gap-3">
            <div>welcome , {credentials?.username}</div>

            {!profile && (
              <Dialog onOpenChange={() => setErrors(null)}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Create Profile <UserIcon />
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Create customer profile</DialogTitle>
                    <DialogDescription>
                      Enter your personal information below to create your
                      customer profile.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <User className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        type="text"
                        placeholder="First Name"
                        className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 shadow-sm transition-all focus-visible:ring-2"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>

                    <div className="relative">
                      <User className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        type="text"
                        placeholder="Last Name"
                        className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 shadow-sm transition-all focus-visible:ring-2"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>

                    <div className="relative">
                      <IdCard className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        type="text"
                        placeholder="National ID"
                        className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 shadow-sm transition-all focus-visible:ring-2"
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                      />
                    </div>

                    <div className="relative">
                      <IdCard className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        type="text"
                        placeholder="Passport No"
                        className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 shadow-sm transition-all focus-visible:ring-2"
                        value={passportNo}
                        onChange={(e) => setPassportNo(e.target.value)}
                      />
                    </div>

                    <div className="relative">
                      <Phone className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        type="text"
                        placeholder="Phone"
                        className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 shadow-sm transition-all focus-visible:ring-2"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        type="text"
                        placeholder="Address"
                        className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 shadow-sm transition-all focus-visible:ring-2"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <ul className="list-disc px-3">
                    {errors &&
                      errors.map((error, index) => (
                        <li
                          key={index}
                          className="text-red-500 text-sm text-left my-2"
                        >
                          {error}
                        </li>
                      ))}
                  </ul>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                        onMouseUp={() => setErrors(null)}
                      >
                        Cancel
                      </Button>
                    </DialogClose>

                    <Button
                      type="submit"
                      onMouseUp={createCustomerProfile}
                      className="cursor-pointer"
                    >
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            {/* update profile */}
            {profile && (
              <Dialog onOpenChange={() => setErrors(null)}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Update Profile <UserIcon />
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Update customer profile</DialogTitle>
                    <DialogDescription>
                      Enter your personal information below to update your
                      customer profile.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <User className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        type="text"
                        placeholder="First Name"
                        className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 shadow-sm transition-all focus-visible:ring-2"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>

                    <div className="relative">
                      <User className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        type="text"
                        placeholder="Last Name"
                        className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 shadow-sm transition-all focus-visible:ring-2"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>

                    <div className="relative">
                      <IdCard className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        type="text"
                        placeholder="National ID"
                        className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 shadow-sm transition-all focus-visible:ring-2"
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                      />
                    </div>

                    <div className="relative">
                      <IdCard className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        type="text"
                        placeholder="Passport No"
                        className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 shadow-sm transition-all focus-visible:ring-2"
                        value={passportNo}
                        onChange={(e) => setPassportNo(e.target.value)}
                      />
                    </div>

                    <div className="relative">
                      <Phone className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        type="text"
                        placeholder="Phone"
                        className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 shadow-sm transition-all focus-visible:ring-2"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        type="text"
                        placeholder="Address"
                        className="h-12 rounded-xl w-full border-muted bg-muted/40 pl-10 shadow-sm transition-all focus-visible:ring-2"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <ul className="list-disc px-3">
                    {errors &&
                      errors.map((error, index) => (
                        <li
                          key={index}
                          className="text-red-500 text-sm text-left my-2"
                        >
                          {error}
                        </li>
                      ))}
                  </ul>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                        onMouseUp={() => setErrors(null)}
                      >
                        Cancel
                      </Button>
                    </DialogClose>

                    <DialogClose asChild>
                      <Button
                        type="submit"
                        onMouseUp={updateCustomerProfile}
                        className="cursor-pointer"
                      >
                        Save changes
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            <Button className="cursor-pointer" onMouseUp={() => logoutUser()}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
