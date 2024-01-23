import {
  Button,
  Datepicker,
  Label,
  Select,
  Textarea,
  TextInput,
  Modal,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEventFormSchema, AddEventFormType } from "@/schemas/AddEventSchema";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface AddEventProps {
  addEventOpened: boolean;
  handleAddEventClose: () => void;
}

export const AddEventForm = ({
  addEventOpened,
  handleAddEventClose,
}: AddEventProps) => {
  // Define form
  const form = useForm<AddEventFormType>({
    resolver: zodResolver(addEventFormSchema),
    mode: "onChange",
    defaultValues: {
      eventName: "",
      eventAddress: "",
      eventDate: undefined,
      eventDescription: "",
      eventCategory: "",
      eventRegistration: 0,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const handleTrainingDate = (selectedDate: Date) => {
    if (selectedDate) {
      form.setValue("eventDate", selectedDate);
      form.trigger("eventDate");
    }
  };

  const resetForm = () => {
    reset(); // Reset the form to its default values
    handleAddEventClose(); // Close the modal
  };

  const submitAddEventForm = async (eventPayload: AddEventFormType) => {
    const networkingRef = collection(db, "networking");
    await addDoc(networkingRef, eventPayload);
    handleAddEventClose();
    reset();
  };

  return (
    <>
      <Modal
        show={addEventOpened}
        position="center"
        size="4xl"
        onClose={() => resetForm()}
        popup
      >
        <Modal.Header>
          <span className="font-bold pl-3">Add Training</span>
        </Modal.Header>
        <Modal.Body className="flex flex-col gap-4">
          <form
            className="flex max-w-full flex-col gap-4"
            onSubmit={handleSubmit(submitAddEventForm)}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="eventName" value="Event Name" />
              </div>
              <TextInput
                id="eventName"
                type="text"
                placeholder="Project Taytayan Networking Event"
                {...register("eventName")}
              />
              {errors.eventName && (
                <span className="text-xs lg:text-sm text-red-600 font-semibold">
                  {errors.eventName.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="eventAddress" value="Event Address" />
              </div>
              <TextInput
                id="eventAddress"
                type="text"
                placeholder="Project Taytayan HQ"
                {...register("eventAddress")}
              />
              {errors.eventAddress && (
                <span className="text-xs lg:text-sm text-red-600 font-semibold">
                  {errors.eventAddress.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="eventDate" value="Event Date" />
              </div>
              <Datepicker
                id="eventDate"
                minDate={new Date()}
                placeholder="Select event date"
                onSelectedDateChanged={(selectedDate) =>
                  handleTrainingDate(selectedDate)
                }
                {...register("eventDate", { required: true })}
              />
              {errors.eventDate && (
                <span className="text-xs lg:text-sm text-red-600 font-semibold">
                  {errors.eventDate.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="eventDescription" value="Event Description" />
              </div>
              <Textarea
                id="trainingDescription"
                {...register("eventDescription")}
              />
              {errors.eventDescription && (
                <span className="text-xs lg:text-sm text-red-600 font-semibold">
                  {errors.eventDescription.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="eventRegistration"
                  value="Event Registration (in PHP)"
                />
              </div>
              <TextInput
                id="trainingRegistration"
                type="number"
                placeholder="0.00"
                addon="₱"
                {...register("eventRegistration", { valueAsNumber: true })}
              />
              {errors.eventRegistration && (
                <span className="text-xs lg:text-sm text-red-600 font-semibold">
                  {errors.eventRegistration.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="eventCategory" value="Event Category" />
              </div>
              <Select
                id="eventCategory"
                {...register("eventCategory", { required: true })}
              >
                <option>Technical</option>
                <option>Certification</option>
                <option>Personal</option>
                <option>Professional</option>
                <option>Vocational & Arts</option>
                <option>Others</option>
              </Select>
              {errors.eventCategory && (
                <span className="text-xs lg:text-sm text-red-600 font-semibold">
                  {errors.eventCategory.message}
                </span>
              )}
            </div>
            <Button type="submit" disabled={!isValid}>
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
