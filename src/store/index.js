import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["events"]
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, composeWithDevTools());
export const persistor = persistStore(store);
