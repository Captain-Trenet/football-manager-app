import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DialogState {
  action: boolean;
  confirm: boolean;
  edit: boolean;
}

const initialState: DialogState = {
  action: false,
  confirm: false,
  edit: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setDialogWindow: (
      state,
      action: PayloadAction<{ type: string; payload?: boolean }>
    ) => {
      const { type } = action.payload;
      switch (type) {
        case "action":
          return { action: true, edit: false, confirm: false };
        case "confirm":
          return { action: false, edit: false, confirm: true };
        case "edit":
          return { action: false, edit: true, confirm: false };
        case "cancel":
          return { action: false, edit: false, confirm: false };
        default:
          return state;
      }
    },
  },
});

export const { setDialogWindow } = dialogSlice.actions;
export default dialogSlice.reducer;
