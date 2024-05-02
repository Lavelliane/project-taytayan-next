"use client";

import Certificate from "@/components/Certificate/Certificate";
import { PDFViewer } from "@react-pdf/renderer";

const Page = ({ params }: { params: { id: string; uid: string } }) => {
  return (
    <>
      <PDFViewer width={"80%"} height={"90%"}>
        <Certificate uid={params.uid} eventId={params.id} />
      </PDFViewer>
    </>
  );
};

export default Page;
