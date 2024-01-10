import RegisterUserForm from "@/components/forms/RegisterUserForm";
import Container from "@/components/ui/container";
import React from "react";

export default function RegisterUser() {
  return (
    <Container>
      <div className="py-20 max-w-3xl mx-auto relative z-10">
        <h1 className="mb-4 text-center text-3xl lg:text-5xl font-bold font-heading">
          Register user
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Submit your info and get paid direct through stream.
        </p>
        <RegisterUserForm />
      </div>
    </Container>
  );
}
