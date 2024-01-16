import { Avatar, Button, CustomFlowbiteTheme, Modal } from "flowbite-react";
import { Training } from "@/types/types";
import { FiMapPin } from "react-icons/fi";

//TODO: Bind button to Firebase status of user as registered.

interface LearnMoreProps {
  learnMoreOpened: boolean;
  handleLearnMoreClose: () => void;
  trainingData: Training;
}

const avatarTheme: CustomFlowbiteTheme["avatar"] = {
  root: {
    bordered: "p-1 ring-2",
    color: {
      info: "ring-tertiary",
    },
  },
};

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export const LearnMoreModal = ({
  learnMoreOpened,
  handleLearnMoreClose,
  trainingData,
}: LearnMoreProps) => {
  return (
    <>
      <Modal
        show={learnMoreOpened}
        position="center"
        size="4xl"
        onClose={() => handleLearnMoreClose()}
        popup
      >
        <Modal.Header />
        <Modal.Body className="flex flex-col gap-4">
          <div className="flex gap-2 mt-4 items-center">
            <Avatar
              img="/institution.svg"
              alt="avatar"
              rounded
              size="md"
              color="purple"
              theme={avatarTheme}
              bordered
              className="justify-start min-w-10 mr-2"
            />
            <h1 className="text-sm lg:text-lg font-bold">
              {trainingData.trainingName}
            </h1>
          </div>
          <p className="text-sm lg:text-lg text-gray-500">
            {trainingData.trainingDescription}
          </p>
          <div className="text-sm lg:text-lg font-bold">
            {trainingData.trainingDate.toLocaleDateString("en-US", options)}
          </div>
          <div className="flex gap-2 items-center text-sm lg:text-lg">
            <FiMapPin />
            {trainingData.trainingAddress}
          </div>
          <div className="text-sm lg:text-lg font-bold">
            Registration Fee:{" "}
            {parseFloat(trainingData.trainingRegistration) === 0 ? (
              <span className="text-green-400 font-bold">Free</span>
            ) : (
              <span className="text-red-600 font-bold">
                {trainingData.trainingRegistration}
              </span>
            )}
          </div>
          <div>
            <span className="text-sm lg:text-lg font-bold">Activities</span>
            <ul className="list-disc text-gray-500 list-inside">
              {trainingData.trainingActivities.map(
                (activity: string, index: number) => (
                  <li key={index}>{activity}</li>
                )
              )}
            </ul>
          </div>
          <div>
            <span className="text-sm lg:text-lg font-bold">
              Upon finishing this course, the student should be able to:
            </span>
            <ul className="list-disc text-gray-500 list-inside">
              {trainingData.trainingObjectives.map(
                (objective: string, index: number) => (
                  <li key={index}>{objective}</li>
                )
              )}
            </ul>
          </div>
          <div className="flex justify-end">
            <Button
              className="w-fit bg-tertiary border-none text-white px-5"
              size="lg"
            >
              Register
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
