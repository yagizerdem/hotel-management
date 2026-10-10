export type ClientRoomResponseDTO = {
  id: string;
  number: string;
  floor: number;
  type: string;
  beds: { single: number; double: number };
  hasBalcony: boolean;
  hasMinibar: boolean;
  amenities: string[];
};

export type DeleteRoomResponseDTO = {
  id: string;
};
