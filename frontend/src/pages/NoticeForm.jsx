import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNotice } from "../app/slices/notice";
import { MoveLeft } from "lucide-react";
import { Navigate } from "react-router-dom";

const recps = [
  "students",
  "teachers",
  "individual teacher",
  "individual student",
];

const Categories = [
  "general",
  "academic",
  "admission",
  "placement",
  "meeting",
  "event",
  "holiday",
  "urgent",
];

const students = [
  "all students",
  "first year",
  "second year",
  "third year",
  "fourth year",
];

const departments = ["ALL", "CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"];

function NoticeForm() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [recipient, setRecipient] = useState("");
  const [student, setStudent] = useState("");
  const [department, setDepartment] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const { role, isLoggedIn } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const notice = {
      title,
      subject,
      content,
      category,
      recipient,
      student,
      department,
      rollnumber: rollNumber,
      email,
    };

    dispatch(createNotice(notice));
    window.history.back();
    setTitle("");
    setSubject("");
    setContent("");
    setCategory("");
    setRecipient("");
    setStudent("");
    setDepartment("");
    setRollNumber("");
    setEmail("");
  };

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  if (role === "student") {
    return <Navigate to="/student/dashboard" />;
  }

  return (
    <div className="h-full w-full  flex items-center justify-center ">
      <form
        className="h-full w-full flex flex-col bg-slate-300 rounded-sm shadow-md"
        onSubmit={handleSubmit}
      >
        <header className="h-12 w-full flex items-center px-10">
          <div
            className="flex gap-3 cursor-pointer"
            onClick={() => {
              window.history.back();
            }}
          >
            <MoveLeft size={28} />
            <span className="text-lg font-medium">Go Back</span>
          </div>
        </header>
        <div className="w-full flex-grow flex flex-col items-center">
          <h1 className="text-2xl font-Poppin font-medium mx-auto">
            Fill Notice Details
          </h1>
          <div className="input-item p-2 flex flex-col gap-2 ">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              required
              className="bg-white w-[600px]"
              placeholder="Enter title "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-item p-2 flex flex-col gap-2 ">
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              required
              className="bg-white w-[600px]"
              placeholder="Enter Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="input-item py-2 flex justify-between gap-2 mt-4 w-[600px] ">
            <Select onValueChange={setCategory} required>
              <SelectTrigger className="w-[280px] bg-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>

              <SelectContent>
                {Categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setRecipient} required>
              <SelectTrigger className="w-[280px] bg-white">
                <SelectValue placeholder="Recipient" />
              </SelectTrigger>
              <SelectContent>
                {recps.map((rec) => (
                  <SelectItem key={rec} value={rec}>
                    {rec.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {recipient === "students" && (
            <div className="input-item py-2 flex justify-between gap-2 w-[600px] ">
              <Select onValueChange={setStudent} required>
                <SelectTrigger className="w-[280px] bg-white">
                  <SelectValue placeholder="Select Students" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student} value={student}>
                      {student.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setDepartment}>
                <SelectTrigger className="w-[280px] bg-white">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {recipient === "individual student" && (
            <div className="input-item p-2 flex flex-col gap-2 ">
              <Label htmlFor="rollnumber">{"Student's Roll Number"}</Label>
              <Input
                type="text"
                id="subject"
                className="bg-white w-[600px]"
                placeholder="Enter Roll Number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
              />
            </div>
          )}
          {recipient === "individual teacher" && (
            <div className="input-item p-2 flex flex-col gap-2 ">
              <Label htmlFor="email">{"Teacher's Email"}</Label>
              <Input
                type="email"
                id="email"
                className="bg-white w-[600px]"
                placeholder="Enter Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
          <div className="input-item p-2 flex flex-col gap-2 ">
            <Label htmlFor="content">Content</Label>
            <Textarea
              placeholder="Type your message here."
              required
              id="content"
              className="bg-white w-[600px] h-[140px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button className="w-[600px] mt-4">Post Notice</Button>
        </div>
      </form>
    </div>
  );
}

export default NoticeForm;
