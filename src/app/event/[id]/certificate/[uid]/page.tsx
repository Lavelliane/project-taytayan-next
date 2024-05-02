import Certificate from "@/components/Certificate/Certificate";

const Page = ({ params }: { params: { id: string; uid: string } }) => {
  return (
    <>
      <Certificate uid={params.uid} eventId={params.id} />
    </>
  );
};

export default Page;
