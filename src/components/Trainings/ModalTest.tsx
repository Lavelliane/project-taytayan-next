'use client'

import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { Training } from "@/utils/DummyTrainings";
import { LearnMoreModal } from "./LearnMoreModal";

interface TrainingButtonProps {
  trainingData: Training;
}

export const ModalTest: React.FC<TrainingButtonProps> = ({ trainingData }) => {
  const [modalOpened, setModalOpened] = useState(false);

  const handleModalOpen = () => {
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  return (
    <>
      <Button
        className="w-fit bg-tertiary border-none text-white px-5"
        size="lg"
        onClick={handleModalOpen}
      >
        {trainingData.trainingName}
      </Button>
      <LearnMoreModal
        learnMoreOpened={modalOpened}
        handleLearnMoreClose={handleModalClose}
        trainingData={trainingData}
      />
    </>
  );
};