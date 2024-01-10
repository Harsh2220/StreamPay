import CompanyCard from "@/components/cards/CompanyCard";
import Container from "@/components/ui/container";
import useGetCompany from "@/hooks/useGetCompany";
import { CompanyData } from "@/types";
import React, { useEffect, useState } from "react";

export default function Companies() {
  const { getAllCompanies } = useGetCompany();
  const [companies, setCompanies] = useState<CompanyData[] | undefined>();

  async function handleCompanies() {
    const data = await getAllCompanies();
    console.log(data, "data");
    if (data && data?.length > 0) {
      setCompanies(data as unknown as CompanyData[]);
    }
  }

  useEffect(() => {
    handleCompanies();
  }, []);

  return (
    <Container>
      <div className="flex justify-center items-center flex-wrap gap-10 my-40">
        {companies &&
          companies.map((company: CompanyData, index: React.Key) => (
            <CompanyCard key={index} company={company} />
          ))}
      </div>
    </Container>
  );
}
