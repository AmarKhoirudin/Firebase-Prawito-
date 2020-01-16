import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import reducer from "../Reducer";

export const storeRedux = createStore(reducer, applyMiddleware(thunk));