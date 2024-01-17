import React from "react";
import { trainings } from "@/utils/DummyTrainings";
import { AddTrainingButton } from "@/components/Trainings/AddTrainingButton";

const page = () => {
  return (
    <>
      <div className="h-screen ">
        <div>
          <AddTrainingButton />
        </div>
      </div>
    </>
  );
};

export default page;
