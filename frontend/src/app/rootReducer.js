import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/auth";
import noticeReducer from "./slices/notice";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  blacklist: ["notice"],
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  notice: noticeReducer,
});

export { rootReducer, rootPersistConfig };
