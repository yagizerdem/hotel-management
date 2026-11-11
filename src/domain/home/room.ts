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

/** A room that is free for a searched stay, with the price of that stay. */
export interface AvailableRoom extends Room {
  pricing: {
    boardType: string;
    nights: number;
    nightlyRates: { night: Date; amount: number }[];
    total: number;
    currency: string;
  };
}

export interface RoomRate {
  roomType: RoomType;
  boardType: string;
  validFrom: Date;
  validTo: Date;
  nightlyPrice: number;
  currency: string;
}
