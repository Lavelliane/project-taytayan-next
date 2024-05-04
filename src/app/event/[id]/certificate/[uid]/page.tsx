import Certificate from "@/components/Certificate/Certificate";
import NavbarOutlanding from "@/components/Certificate/NavbarOutlanding";
import FooterLanding from "@/components/Landing/FooterLanding";

const Page = ({ params }: { params: { id: string; uid: string } }) => {
  return (
    <>
      <div>
        <NavbarOutlanding />
        <div className="mt-20 w-full min-h-screen h-screen">
          <Certificate uid={params.uid} eventId={params.id} />
        </div>
        <FooterLanding />
      </div>
    </>
  );
};

export default Page;
