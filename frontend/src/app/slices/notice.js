import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "@/lib/axios";
import toast from "react-hot-toast";

const initialState = {
  notices: [],
  sentNotices: [],
  selectedNotice: null,
  viewNotice: null,
};

export const slice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNotices: (state, action) => {
      state.notices = action.payload;
    },
    addNotice: (state, action) => {
      state.notices.push(action.payload);
    },
    selectNotice: (state, action) => {
      state.selectedNotice = action.payload;
    },
    setViewNotice: (state, action) => {
      state.viewNotice = action.payload;
    },
    setSentNotices: (state, action) => {
      state.sentNotices = action.payload;
    },
  },
});

export const { addNotice, setNotices, selectNotice } = slice.actions;

export default slice.reducer;

export const createNotice = createAsyncThunk(
  "/notice/create",
  async (formData, { dispatch }) => {
    try {
      const { data } = await Axios.post("/notice/create", formData, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success("Notice posted!");
        dispatch(slice.actions.addNotice(data.notice));
      }
    } catch (error) {
      toast.error("Failed to post notice!");
      console.error(error);
    }
  }
);

export const fetchAllNotices = createAsyncThunk(
  "/notice/fetchAllNotices",
  async (_, { dispatch }) => {
    try {
      const { data } = await Axios.get("/notice/all", {
        withCredentials: true,
      });
      if (data.success) {
        dispatch(slice.actions.setNotices(data.notices));
      }
    } catch (error) {
      toast.error("Failed to fetch notices!");
      console.error(error);
    }
  }
);

export const fetchNotice = createAsyncThunk(
  "/notice/fetchNotice",
  async (id, { dispatch }) => {
    try {
      console.log(id);
      const { data } = await Axios.get(`/notice/${id}`, {
        withCredentials: true,
      });
      if (data.success) {
        dispatch(slice.actions.setViewNotice(data.notice));
      }
    } catch (error) {
      toast.error("Failed to fetch notice!");
      console.error(error);
    }
  }
);

export const fetchSentNotices = createAsyncThunk(
  "/notice/fetchSentNotices",
  async (_, { dispatch }) => {
    try {
      const { data } = await Axios.get("/notice/sent/all", {
        withCredentials: true,
      });
      if (data.success) {
        dispatch(slice.actions.setSentNotices(data.notices));
        return data;
      }
    } catch (error) {
      toast.error("Failed to fetch sent notices!");
      console.error(error);
    }
  }
);

export const updateNotice = createAsyncThunk(
  "/notice/updateNotice",
  async (formData, { dispatch }) => {
    try {
      const { data } = await Axios.post("/notice/update", formData, {
        withCredentials: true,
      });
      if (data.success) {
        dispatch(fetchSentNotices());
        dispatch(slice.actions.selectNotice(null));
        return data;
      }
    } catch (error) {
      toast.error("Notice update failed!");
      console.error(error);
    }
  }
);

export const deleteNotice = createAsyncThunk(
  "/notice/deleteNotice",
  async (id, { dispatch }) => {
    try {
      const { data } = await Axios.post(
        `/notice/delete`,
        { noticeId: id },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        await dispatch(fetchSentNotices());
        await dispatch(fetchAllNotices());
        toast.success("Notice deleted!");
      }

      return { success: data.success };
    } catch (error) {
      toast.error("Notice deletion failed!");
      console.error(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "/auth/changePassword",
  async (formData) => {
    try {
      const { data } = await Axios.post("/auth/change-password", formData, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success("Password changed successfully!");
      }
      console.log(data);
    } catch (error) {
      toast.error("Password change failed!");
      console.error(error);
    }
  }
);
