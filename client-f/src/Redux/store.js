import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { reducer } from "./reducer";

const RootReducer = combineReducers({ userdate: reducer });
export const Store = legacy_createStore(RootReducer, applyMiddleware(thunk));
