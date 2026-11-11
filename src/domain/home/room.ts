export interface RoomAmenities {
  balcony: boolean;
  minibar: boolean;
  airConditioning: boolean;
  tv: boolean;
  hairDryer: boolean;
  wifi: boolean;
}

export interface RoomType {
  id: string;
  code: string;
  name: string;
  description: string;
  capacity: number;
  beds: {
    single: number;
    double: number;
  };
  images: string[];
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  roomTypeId: string;
  amenities: RoomAmenities;
  roomType: RoomType;
}

export interface RoomRate {
  roomType: RoomType;
  boardType: string;
  validFrom: Date;
  validTo: Date;
  nightlyPrice: number;
  currency: string;
}
