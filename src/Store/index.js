import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import errorReducer from "./error";

const store = configureStore({
  reducer: { auth: authReducer, error: errorReducer },
});

export default store;
