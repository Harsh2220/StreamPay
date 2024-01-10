import RegisterCompanyForm from "@/components/forms/RegisterCompanyForm";
import Container from "@/components/ui/container";

function RegisterCompany() {
  return (
    <Container>
      <div className="py-20 max-w-3xl mx-auto relative z-10">
        <h1 className="mb-4 text-center text-3xl lg:text-5xl font-bold font-heading">
          Register company
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Submit your info and pay to your employees direct through stream.
        </p>
        <RegisterCompanyForm />
      </div>
    </Container>
  );
}

export default RegisterCompany;
