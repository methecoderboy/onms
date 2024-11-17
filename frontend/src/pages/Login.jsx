import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login as LoginUser } from "../app/slices/auth";
import { Navigate } from "react-router-dom";
// import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollnumber, setRollnumber] = useState("");
  const [role, setRole] = useState("student");

  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(LoginUser({ email, rollnumber, password, role }));

    console.log("submitted");
  };

  console.log(role);

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="h-full w-full flex">
      <div className="h-full w-[40%] bg-slate-300"></div>
      <form
        className="h-full flex-grow bg-card flex justify-center "
        onSubmit={handleSubmit}
      >
        <Card className=" mx-auto w-[480px] shadow-none rounded-none border-none mt-20">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your username below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    className="h-5 w-5"
                    name="role"
                    id="student"
                    value={"student"}
                    checked={role === "student"}
                    onChange={() => setRole("student")}
                  />
                  <Label className="cursor-pointer" htmlFor="student">
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    className="h-5 w-5"
                    name="role"
                    id="teacher"
                    value={"teacher"}
                    checked={role === "teacher"}
                    onChange={() => setRole("teacher")}
                  />
                  <Label className="cursor-pointer" htmlFor="teacher">
                    Teacher
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    className="h-5 w-5"
                    name="role"
                    id="admin"
                    value={"admin"}
                    checked={role === "admin"}
                    onChange={() => setRole("admin")}
                  />
                  <Label className="cursor-pointer" htmlFor="admin">
                    Admin
                  </Label>
                </div>
              </div>
              {role === "student" && (
                <div className="grid gap-2">
                  <Label htmlFor="email">Roll Number</Label>
                  <Input
                    id="rollnumber"
                    type="text"
                    placeholder="Enter your roll number"
                    required
                    value={rollnumber}
                    onChange={(e) => setRollnumber(e.target.value)}
                  />
                </div>
              )}
              {role !== "student" && (
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <Link
                    to="/forgot-password"
                    className="text-primary ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default Login;
