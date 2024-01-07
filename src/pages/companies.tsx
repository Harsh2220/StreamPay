import CompanyCard from "@/components/CompanyCard";
import Container from "@/components/ui/container";
import React from "react";

export default function Companies() {
  return (
    <Container>
      <div className="flex justify-center items-center flex-wrap gap-10 my-40">
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
      </div>
    </Container>
  );
}
