"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Wifi, Tv, Wind, Coffee, Bath, Users, BedSingle } from "lucide-react";
import { IRoom } from "@/src/models/room";
import { Button } from "@base-ui/react";
import { useBooking } from "@/src/provider/booking-provider";
import { twMerge } from "tailwind-merge";

function RoomList({ className }: { className?: string }) {
  const { rooms } = useBooking();

  return (
    <div
      className={twMerge(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {rooms.map((room) => (
        <RoomCard key={room._id} room={room} />
      ))}
    </div>
  );
}

interface RoomCardProps {
  room: IRoom;
}

function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[16/10] bg-muted">
        <img
          src="https://placehold.co/600x400?text=Room"
          alt={`Room ${room.number}`}
          className="h-full w-full object-cover"
        />
      </div>

      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">Room {room.number}</h3>
            <p className="text-sm text-muted-foreground">
              {room.type.replaceAll("_", " ")}
            </p>
          </div>

          <Badge
            variant={room.status === "AVAILABLE" ? "default" : "secondary"}
          >
            {room.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4" />
          <span>{room.capacity} Guests</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <BedSingle className="h-4 w-4" />
          <span>
            {room.beds.single > 0 && `${room.beds.single} Single `}
            {room.beds.double > 0 && `${room.beds.double} Double`}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 text-muted-foreground">
          {room.hasWifi && <Wifi className="h-5 w-5" />}
          {room.hasTv && <Tv className="h-5 w-5" />}
          {room.hasAirConditioner && <Wind className="h-5 w-5" />}
          {room.hasMinibar && <Coffee className="h-5 w-5" />}
          {room.hasHairDryer && <Bath className="h-5 w-5" />}
        </div>

        <div className="rounded-lg bg-muted p-3 text-sm">
          Floor: <strong>{room.floor}</strong>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
}

export { RoomList };
