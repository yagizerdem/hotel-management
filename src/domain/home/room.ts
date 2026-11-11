export interface RoomAmenities {
  balcony: boolean;
  minibar: boolean;
  airConditioning: boolean;
  tv: boolean;
  hairDryer: boolean;
  wifi: boolean;
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  roomTypeId: string;
  amenities: RoomAmenities;
}
