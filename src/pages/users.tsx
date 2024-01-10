import UserCard from "@/components/UserCard";
import Container from "@/components/ui/container";
import useGetUser from "@/hooks/useGetUser";
import { UsersData } from "@/types";
import React, { useEffect, useState } from "react";

export default function Users() {
  const { getAllUsers } = useGetUser();
  const [users, setUsers] = useState<UsersData[] | undefined>();

  async function handleUsers() {
    const data = await getAllUsers();
    console.log(data, "data");
    if (data && data?.length > 0) {
      setUsers(data as unknown as UsersData[]);
    }
  }

  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <Container>
      <div className="flex justify-center items-center flex-wrap gap-10 my-40">
        {users &&
          users.map((user: UsersData, index: React.Key) => (
            <UserCard key={index} user={user} />
          ))}
      </div>
    </Container>
  );
}
