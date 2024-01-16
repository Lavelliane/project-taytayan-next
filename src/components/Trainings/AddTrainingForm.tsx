import { Button, Modal } from "flowbite-react";
import { z } from "zod";  

interface AddTrainingProps {
  addTrainingOpened: boolean;
  handleAddTrainingClose: () => void;
}

export const AddTrainingForm = ({
  addTrainingOpened,
  handleAddTrainingClose,
}: AddTrainingProps) => {
  return (
    <>
      <div>AddTrainingForm</div>
    </>
  );
};
