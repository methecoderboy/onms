import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { fetchAllNotices, selectNotice } from "../app/slices/notice";
import { useEffect } from "react";
import DisplayNotice from "./DisplayNotice";
import { Navigate } from "react-router-dom";

function AdminView() {
  const { sentNotices } = useSelector((state) => state.notice);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const items = sentNotices;

  useEffect(() => {
    dispatch(fetchAllNotices());
  }, [dispatch]);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <div className="h-full w-[99%] overflow-auto  flex flex-col items-center overflow-x-hidden mx-auto">
      <form className="h-14 w-1/2  px-4  flex items-center justify-center mx-auto gap-2">
        <header className="p-2 h-14 w-full flex items-center justify-center">
          <div className="relative h-full w-full flex items-center justify-center">
            <Search className="absolute left-2 top-3.25 h-4 w-4 text-muted-foreground " />
            <Input
              placeholder="Search"
              className="h-full lg:w-[600px] pl-8 border bg-white rounded-lg"
            />
          </div>
        </header>
        <Dialog>
          <DialogTrigger>
            <SlidersHorizontal size={20} className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Apply fiters to your search</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="from" className="">
                  From
                </Label>
                <input
                  type="date"
                  name="from"
                  id="from"
                  className="w-[280px] p-1 border rounded-md"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="to" className="">
                  To
                </Label>
                <input
                  type="date"
                  name="to"
                  id="to"
                  className="w-[280px] p-1 border rounded-md"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Categories</Label>
                <Select>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Reset</Button>
              <Button type="submit">Apply</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
      <main className="h-[calc(100%-48px)] lg:w-[900px] md:w-[720px]  flex-grow px-4 pb-4 bg-white overflow-auto">
        <ScrollArea className="h-full w-full">
          <div className="flex flex-col gap-2 p-4 pt-1 bg-white overflow-auto">
            {items.map((item) => (
              <Dialog key={item.subject}>
                <DialogTrigger>
                  <div
                    key={item.id}
                    className={cn(
                      "flex flex-col  items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent cursor-pointer "
                    )}
                    onClick={() => {
                      dispatch(selectNotice(item._id));
                    }}
                  >
                    <div className="flex w-full flex-col gap-1">
                      <div className="flex items-center">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">{item.title}</div>
                        </div>
                        <div className={cn("ml-auto text-xs")}>
                          {formatDistanceToNow(item.updatedAt, {
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                      <div className="text-xs font-medium">{item.subject}</div>
                    </div>
                    <div className="line-clamp-2 text-xs text-muted-foreground">
                      {item.content.substring(0, 300)}
                    </div>
                    <div className="w-full flex items-center  pt-2 gap-2">
                      <div className="flex items-center gap-2 w-full">
                        <Badge>{item.category}</Badge>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DisplayNotice shooBackButton={false} />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

export default AdminView;
