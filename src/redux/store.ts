import { configureStore, combineReducers } from "@reduxjs/toolkit";
import playerReducer, { PlayersState } from "./reducers/playersSlice";
import dialogReducer, { DialogState } from "./reducers/dialogSlice";

export interface RootState {
  players: PlayersState;
  dialog: DialogState;
}

const rootReducer = combineReducers<RootState>({
  players: playerReducer,
  dialog: dialogReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
