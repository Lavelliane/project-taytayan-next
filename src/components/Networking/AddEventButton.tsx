"use client";

import React, { useState } from "react";
import { Button } from "flowbite-react";
import { AddEventForm } from "./AddEventForm";

export const AddEventButton = () => {
  const [addEventOpened, setAddEventOpened] = useState(false);

  const handleAddEventOpen = () => {
    setAddEventOpened(true);
  };

  const handleAddEventClose = () => {
    setAddEventOpened(false);
  };
  return (
    <>
      <Button
        className="w-fit bg-tertiary border-none text-white px-5"
        size="lg"
        onClick={handleAddEventOpen}
      >
        Add Event
      </Button>
      <AddEventForm
        addEventOpened={addEventOpened}
        handleAddEventClose={handleAddEventClose}
      />
    </>
  );
};
