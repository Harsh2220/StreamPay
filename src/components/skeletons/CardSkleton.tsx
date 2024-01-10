import React from "react";
import { Skeleton } from "../ui/skeleton";

function CardSkleton() {
  return (
    <Skeleton className="relative p-6 border border-gray-800 rounded-xl w-80 h-80 mx-2" />
  );
}

export default CardSkleton;
