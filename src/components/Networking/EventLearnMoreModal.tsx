import { Avatar, Button, CustomFlowbiteTheme, Modal } from "flowbite-react";
import { NetworkingEvent } from "@/types/types";
import { FiMapPin } from "react-icons/fi";
import { Timestamp } from "firebase/firestore";

//TODO: Bind button to Firebase status of user as registered.

interface LearnMoreProps {
  learnMoreOpened: boolean;
  handleLearnMoreClose: () => void;
  networkingEventData: NetworkingEvent;
}

const avatarTheme: CustomFlowbiteTheme["avatar"] = {
  root: {
    bordered: "p-1 ring-2",
    color: {
      info: "ring-tertiary",
    },
  },
};

const formatTimestamp = (timestamp: Date) => {
  // Convert Firestore Timestamp to JavaScript Date
  const jsDate =
    timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;

  // Format the date as a string
  const formattedDate = jsDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return formattedDate;
};

export const EventLearnMoreModal = ({
  learnMoreOpened,
  handleLearnMoreClose,
  networkingEventData,
}: LearnMoreProps) => {
  return (
    <Modal
      show={learnMoreOpened}
      position="center"
      size="2xl"
      onClose={() => handleLearnMoreClose()}
      popup
    >
      <Modal.Header />
      <Modal.Body className="flex flex-col gap-4 my-4">
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
          <h1 className="text-sm lg:text-base font-bold">
            {networkingEventData.eventName}
          </h1>
        </div>
        <p className="text-xs lg:text-sm text-gray-500">
          {networkingEventData.eventDescription}
        </p>
        <div className="text-xs lg:text-sm font-bold">
          {formatTimestamp(networkingEventData.eventDate)}
        </div>
        <div className="flex gap-2 items-center text-xs lg:text-sm">
          <FiMapPin />
          {networkingEventData.eventAddress.formattedAddress || 'Project Taytayan HQ'}
        </div>
        <div className="text-sm lg:text-base font-bold">
          Registration Fee:{" "}
          {parseFloat(networkingEventData.eventRegistration) === 0 ? (
            <span className="text-green-400 font-bold">Free</span>
          ) : (
            <span className="text-red-600 font-bold">
              {networkingEventData.eventRegistration}
            </span>
          )}
        </div>
        <div>
          <span className="text-sm lg:text-base font-bold">Activities:</span>
          <ul className="list-disc text-gray-500 list-inside">
            {networkingEventData.eventActivities.map(
              (activity: string, index: number) => (
                <li key={index} className="text-xs lg:text-sm">
                  {activity}
                </li>
              )
            )}
          </ul>
        </div>
        <div>
          <span className="text-sm lg:text-base font-bold">
            Upon finishing this event, the student should be able to:
          </span>
          <ul className="list-disc text-gray-500 list-inside">
            {networkingEventData.eventObjectives.map(
              (objective: string, index: number) => (
                <li key={index} className="text-xs lg:text-sm">
                  {objective}
                </li>
              )
            )}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end w-full">
          <Button
            className="w-fit bg-tertiary border-none text-white px-5"
            size="lg"
          >
            Register
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
