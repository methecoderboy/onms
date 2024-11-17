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
import { MoveLeft } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { updateNotice } from "../app/slices/notice";

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

function EditNoticeForm() {
  const { selectedNotice, sentNotices } = useSelector((state) => state.notice);
  let oldNotice;
  sentNotices.forEach((n) => {
    if (n._id === selectedNotice) {
      oldNotice = n;
    }
  });
  console.log(oldNotice);

  const [subject, setSubject] = useState(oldNotice.subject);
  const [category, setCategory] = useState(oldNotice.category);
  const [content, setContent] = useState(oldNotice.content);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { role, isLoggedIn } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const notice = {
      _id: selectedNotice,
      subject,
      content,
      category,
    };

    await dispatch(updateNotice(notice));
    navigate("/notice/sent-notices");
  };

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  if (role === "student") {
    return <Navigate to="/student/dashboard" />;
  }

  return (
    <div className="h-full w-full bg-blue-100 flex items-center justify-center ">
      <form
        className="h-full w-full flex flex-col bg-blue-300 rounded-sm shadow-md"
        onSubmit={handleSubmit}
      >
        <header className="h-12 w-full flex items-center px-10">
          <div
            className="flex gap-3 cursor-pointer"
            onClick={() => {
              window.history.back();
            }}
          >
            <MoveLeft size={28} />{" "}
            <span className="text-lg font-medium">Go Back</span>
          </div>
        </header>
        <div className="w-full flex-grow flex flex-col items-center">
          <h1 className="text-2xl font-Poppin font-medium mx-auto">
            Fill Notice Details
          </h1>
          <div className="input-item p-2 flex flex-col gap-2 ">
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              className="bg-white w-[600px]"
              placeholder="Enter Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="input-item py-2 flex justify-between gap-2 w-[600px] ">
            <Select onValueChange={setCategory} defaultValue={category}>
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
          </div>
          <div className="input-item p-2 flex flex-col gap-2 ">
            <Label htmlFor="content">Content</Label>
            <Textarea
              placeholder="Type your message here."
              id="content"
              className="bg-white w-[600px] h-[240px]"
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

export default EditNoticeForm;
