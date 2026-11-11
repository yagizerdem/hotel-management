import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Room } from "@domain/home/room";

type RoomState = {
  rooms: Room[];
};

const initialState: RoomState = {
  rooms: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms(state, action: PayloadAction<Room[]>) {
      state.rooms = action.payload;
    },
  },
  selectors: {
    selectRooms: (state) => state.rooms,
  },
});

export const { setRooms } = roomSlice.actions;
export const { selectRooms } = roomSlice.selectors;
export default roomSlice;
