import UserCard from "@/components/UserCard";
import Container from "@/components/ui/container";
import React from "react";

export default function Users() {
  return (
    <Container>
      <div className="flex justify-center items-center flex-wrap gap-10 my-40">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </Container>
  );
}
