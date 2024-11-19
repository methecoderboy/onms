import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotices, selectNotice } from "../app/slices/notice";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

function AdminView() {
  const { notices } = useSelector((state) => state.notice);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [items, setItems] = useState(notices);
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
    const res = notices.filter((notice) => {
      return JSON.stringify(notice)
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setItems(res);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    let res;
    setOpen(false);
    res = notices.filter((notice) => {
      if (from && to) {
        return notice.createdAt >= from && notice.createdAt <= to;
      }
      if (from && !to) {
        return notice.createdAt >= from;
      }
      if (!from && to) {
        return notice.createdAt <= to;
      }
    });

    setItems(res);
  };

  const handleReset = () => {
    setOpen(false);
    setFrom("");
    setTo("");
    setItems(notices);
    window.location.reload();
  };

  useEffect(() => {
    setItems(notices);
  }, [notices]);

  useEffect(() => {
    dispatch(fetchAllNotices());
  }, [dispatch]);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <div className="h-full w-[99%] overflow-auto  flex flex-col items-center overflow-x-hidden mx-auto bg-white">
      <div className="h-14 w-1/2  px-4  flex items-center justify-center mx-auto">
        <header className="p-2 h-14 lg:w-[90%] w-full flex items-center justify-center">
          <div className="relative h-full w-full flex items-center justify-center">
            <Input
              value={search}
              onChange={handleChange}
              placeholder="Search"
              className="h-full lg:w-[600px] pl-8 border bg-white rounded-lg"
            />
          </div>
        </header>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <SlidersHorizontal size={20} className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Apply fiters to your search</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4" onSubmit={handleFilter}>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="from" className="">
                  From
                </Label>
                <input
                  type="date"
                  name="from"
                  id="from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
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
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-[280px] p-1 border rounded-md"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
                <Button type="submit">Apply</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <main className="h-[calc(100%-48px)] lg:w-[900px] md:w-[720px]  flex-grow px-4 pb-4 bg-white overflow-auto">
        <ScrollArea className="h-full w-full">
          <div className="flex flex-col gap-2 p-4 pt-1 overflow-auto">
            {items.map((item) => (
              <Dialog key={item?.subject}>
                <DialogTrigger>
                  <div
                    key={item?.id}
                    className={cn(
                      "flex flex-col bg-white  items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent cursor-pointer "
                    )}
                    onClick={() => {
                      dispatch(selectNotice(item?._id));
                    }}
                  >
                    <div className="flex w-full flex-col gap-1">
                      <div className="flex items-center">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">{item?.title}</div>
                        </div>
                        <div className={cn("ml-auto text-xs")}>
                          {formatDistanceToNow(item.updatedAt, {
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                      <div className="text-xs font-medium">{item?.subject}</div>
                    </div>
                    <div className="line-clamp-2 text-xs text-muted-foreground">
                      {item?.content.substring(0, 300)}
                    </div>
                    <div className="w-full flex items-center  pt-1 gap-2">
                      <div className="flex items-center gap-2 w-full">
                        <Badge>{item?.category}</Badge>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="h-[600px] max-w-[800px] ">
                  <div className="h-full w-full bg-white flex flex-col ">
                    <header className=" w-full flex items-center justify-center pt-8 relative">
                      <h1 className="text-2xl ">Notice</h1>
                    </header>
                    <div className="w-full flex items-center gap-2 px-12 py-6 mt-10">
                      <span>Subject:</span> <span>{item.subject}</span>
                    </div>
                    <p className="px-12">{item.content}</p>
                    <div className="px-12 pt-8 ">
                      <div className="inline-flex flex-col gap-2 items-center justify-center">
                        <span className="">Regards</span>
                        <span>
                          <span>{item.creator?.name}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
            {items.length === 0 && (
              <h1 className="mx-auto text-center">No notice found</h1>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

export default AdminView;
