/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotice, selectNotice } from "../app/slices/notice";
import { MoveLeft } from "lucide-react";

function DisplayNotice({ showBackButton }) {
  const dispatch = useDispatch();
  const { selectedNotice, viewNotice } = useSelector((state) => state.notice);
  useEffect(() => {
    document.title = "Notice";
    dispatch(fetchNotice(selectedNotice));
  }, [selectedNotice, dispatch]);

  console.log(viewNotice);

  return (
    <div className="h-full bg-white flex flex-col ">
      <header className="p-4 w-full flex items-center justify-center pt-8 relative">
        {showBackButton !== false && (
          <MoveLeft
            size={32}
            className="absolute top-3 left-6 mb-4 cursor-pointer"
            onClick={() => {
              dispatch(selectNotice(null));
            }}
          />
        )}
        <h1 className="text-2xl ">Notice</h1>
      </header>
      <div className="w-full flex items-center gap-2 px-12 py-6 mt-10">
        <span>Subject:</span> <span>{viewNotice?.subject}</span>
      </div>
      <p className="px-12">{viewNotice?.content}</p>
      <div className="px-12 pt-8 ">
        <div className="inline-flex flex-col gap-2 items-center justify-center">
          <span className="">Regards</span>
          <span>
            <span>{viewNotice?.creator?.name}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DisplayNotice;
