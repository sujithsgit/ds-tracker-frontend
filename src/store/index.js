import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"; // ✅ use import
import rootSaga from "./saga";
import rootReducer from "./reducer";

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.callback", "data.callback"],
      },
    }).concat(middleware),
});

// Run root saga
sagaMiddleware.run(rootSaga);
