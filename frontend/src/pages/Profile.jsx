import { Button } from "@/components/ui/button";
import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { changePassword } from "../app/slices/notice";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }
    dispatch(changePassword({ newPassword: password }));
    alert("Password Changed Successfully");
  };
  return (
    <div className="flex h-full w-full">
      <div className="h-full lg:w-[320px] w-20 border-r-2">
        <Nav />
      </div>
      <div className="h-[500px] w-[700px] mx-auto  mt-4 flex flex-col overflow-hidden">
        <header className="h-16 w-full flex items-center ">
          <h1 className="text-2xl font-medium mx-auto">Your Profile</h1>
        </header>
        <main className="w-full flex-grow items-center justify-center">
          <div className="">
            <div className="w-full flex items-center px-24 gap-32 mt-6">
              <span className="w-1/2 flex font-medium">Name</span>
              <span className="w-1/2 flex font-medium">{user?.name}</span>
            </div>
            <div className="w-full flex items-center px-24 gap-32 mt-6">
              <span className="w-1/2 flex font-medium">Email</span>
              <span className="w-1/2 flex font-medium">{user?.email} </span>
            </div>
            <div className="w-full flex items-center px-24 gap-32 mt-6">
              <span className="w-1/2 flex font-medium">Department</span>
              <span className="w-1/2 flex font-medium">{user?.department}</span>
            </div>
            <div className="w-full flex items-center px-24 gap-32 mt-6">
              <span className="w-1/2 flex font-medium">Semester</span>
              <span className="w-1/2 flex font-medium">{user?.sememster}</span>
            </div>
            <div className="w-full flex items-center px-24 gap-32 mt-6">
              <span className="w-1/2 flex font-medium">Roll Number</span>
              <span className="w-1/2 flex font-medium">{user.rollnumber}</span>
            </div>
            <div className="w-full flex items-center px-24 gap-32 mt-6">
              <span className="w-1/2 flex font-medium">Date of Birth</span>{" "}
              <span className="w-1/2 flex font-medium">
                {new Date(user.dob).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="w-full flex items-center px-24 gap-32 mt-8">
            <Dialog>
              <DialogTrigger>
                <Button
                  variant="secondary"
                  className="shadow-md hover:bg-slate-300"
                >
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent className="p-4 h-[320px]">
                <DialogTitle className="mx-auto mt-2">
                  Change Your Password
                </DialogTitle>
                <form
                  className="h-[200px] w-[400px] flex items-center justify-center gap-5 flex-col mx-auto"
                  onSubmit={handleSubmit}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="email">New Password</Label>
                    <Input
                      id="email"
                      type="password"
                      placeholder="New Password"
                      required
                      className="w-[320px] "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="psasword"
                      placeholder="Confirm Password"
                      required
                      className="w-[320px] "
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-[320px]">
                    Change Password
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
