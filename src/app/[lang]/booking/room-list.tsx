"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import {
  Wifi,
  Tv,
  Wind,
  Coffee,
  Bath,
  Users,
  BedSingle,
  BedDouble,
  Building2,
} from "lucide-react";
import { IRoom } from "@/src/models/room";
import { Button } from "@base-ui/react";
import { useBooking } from "@/src/provider/booking-provider";
import { twMerge } from "tailwind-merge";
import { Fragment, useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (open) {
      gsap.fromTo(
        el,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
      );
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [open]);

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

      <CardContent className="space-y-4 border-t pt-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {room.capacity} Guests
          </div>

          <div className="flex items-center gap-2">
            <BedSingle className="h-4 w-4" />
            {room.beds.single} Single Beds
          </div>

          <div className="flex items-center gap-2">
            <BedDouble className="h-4 w-4" />
            {room.beds.double} Double Beds
          </div>

          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Floor {room.floor}
          </div>
        </div>

        <div className="min-h-20">
          <div className="flex flex-wrap">
            {room.hasWifi && (
              <Badge variant="secondary">
                <Wifi className="mr-1 h-3 w-3" />
                Free WiFi
              </Badge>
            )}

            {room.hasTv && (
              <Badge variant="secondary">
                <Tv className="mr-1 h-3 w-3" />
                Smart TV
              </Badge>
            )}

            {room.hasAirConditioner && (
              <Badge variant="secondary">
                <Wind className="mr-1 h-3 w-3" />
                Air Conditioner
              </Badge>
            )}

            {room.hasMinibar && (
              <Badge variant="secondary">
                <Coffee className="mr-1 h-3 w-3" />
                Minibar
              </Badge>
            )}

            {room.hasHairDryer && (
              <Badge variant="secondary">
                <Bath className="mr-1 h-3 w-3" />
                Hair Dryer
              </Badge>
            )}
          </div>
        </div>

        <Button
          className="w-full h-fit p-2 mx-auto rounded-sm cursor-pointer 
         bg-text-foreground hover:bg-text-foreground-dark transition-colors duration-300"
        >
          Book Now
        </Button>

        <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
          {room.description && (
            <div className="rounded-lg border p-4 text-sm text-muted-foreground">
              {room.description}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "Show Less" : "View Details"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export { RoomList };
