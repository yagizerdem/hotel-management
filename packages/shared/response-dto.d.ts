export type RegisterResopnseDTO = {
  email: string;
};

export type RoomDTO = {
  _id: string;
  number: string;
  floor: number;
  type: string;
  beds: { single: number; double: number };
  hasBalcony: boolean;
  hasMinibar: boolean;
  amenities: string[];
  cleaningStatus: string;
};

export type DeleteRoomResponseDTO = {
  id: string;
};
