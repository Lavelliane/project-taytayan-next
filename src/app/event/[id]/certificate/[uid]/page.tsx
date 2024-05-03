import Certificate from "@/components/Certificate/Certificate";
import FooterLanding from "@/components/Landing/FooterLanding";
import NavbarLanding from "@/components/Landing/NavbarLanding";

const Page = ({ params }: { params: { id: string; uid: string } }) => {
  return (
    <>
      <div>
        <NavbarLanding />
        <div className="mt-20 w-full">
          <Certificate uid={params.uid} eventId={params.id} />
        </div>
        <FooterLanding />
      </div>
    </>
  );
};

export default Page;
