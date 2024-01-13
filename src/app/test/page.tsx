import React from "react";
import { trainings } from "@/utils/DummyTrainings";
import { ModalTest } from "@/components/Trainings/ModalTest";

const page = () => {
  return (
    <>
      <div className="h-screen ">
        <div>
          {trainings.map((training) => (
            <ModalTest key={training.trainingId} trainingData={training} />
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
