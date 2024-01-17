import {
  Button,
  Checkbox,
  FileInput,
  Datepicker,
  Label,
  Radio,
  RangeSlider,
  Select,
  Textarea,
  TextInput,
  ToggleSwitch,
  Modal,
} from "flowbite-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addTrainingFormSchema,
  AddTrainingFormType,
} from "@/schemas/AddTrainingSchema";

interface AddTrainingProps {
  addTrainingOpened: boolean;
  handleAddTrainingClose: () => void;
}

export const AddTrainingForm = ({
  addTrainingOpened,
  handleAddTrainingClose,
}: AddTrainingProps) => {
  // Define form
  const form = useForm<AddTrainingFormType>({
    resolver: zodResolver(addTrainingFormSchema),
    mode: "onChange",
    defaultValues: {
      trainingName: "",
      trainingCenter: "",
      trainingDate: undefined,
      trainingAddress: "",
      trainingDescription: "",
      trainingActivities: "",
      trainingObjectives: "",
      trainingRegistration: undefined,
      trainingCategory: "",
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
      form.setValue("trainingDate", selectedDate);
      form.trigger("trainingDate");
    }
  };

  const resetForm = () => {
    reset(); // Reset the form to its default values
    handleAddTrainingClose(); // Close the modal
  };

  const submitAddTrainingForm = (data: AddTrainingFormType) => {
    const trainingActivitiesArray = data.trainingActivities
      .split(";")
      .map((item) => item.trim());
    const trainingObjectivesArray = data.trainingObjectives
      .split(";")
      .map((item) => item.trim());
    const finalPayload = {
      ...data,
      trainingActivities: trainingActivitiesArray,
      trainingObjectives: trainingObjectivesArray,
    };
    console.log(finalPayload); // Insert here Firestore function
    handleAddTrainingClose();
    reset();
  };

  return (
    <>
      <Modal
        show={addTrainingOpened}
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
            onSubmit={handleSubmit(submitAddTrainingForm)}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="trainingName" value="Training Name" />
              </div>
              <TextInput
                id="trainingName"
                type="text"
                placeholder="Project Taytayan Training"
                {...register("trainingName")}
              />
              {errors.trainingName && (
                <span className="text-xs lg:text-sm text-red-600 font-semibold">
                  {errors.trainingName.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="trainingCenter" value="Training Center" />
              </div>
              <TextInput
                id="trainingCenter"
                type="text"
                placeholder="Project Taytayan HQ"
                {...register("trainingCenter")}
              />
              {errors.trainingCenter && (
                <span className="text-xs lg:text-sm text-red-600 font-semibold">
                  {errors.trainingCenter.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="trainingDate" value="Training Date" />
              </div>
              <Datepicker
                id="trainingDate"
                minDate={new Date()}
                placeholder="Select training date"
                onSelectedDateChanged={(selectedDate) =>
                  handleTrainingDate(selectedDate)
                }
                {...register("trainingDate", { required: true })}
              />
              {errors.trainingDate && (
                <span className="text-xs lg:text-sm text-red-600 font-semibold">
                  {errors.trainingDate.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="trainingAddress" value="Training Address" />
              </div>
              <TextInput
                id="trainingAddress"
                type="text"
                placeholder="Cebu City, Cebu"
                {...register("trainingAddress")}
              />
              {errors.trainingAddress && (
                <span className="text-xs lg:text-sm text-red-600 font-semibold">
                  {errors.trainingAddress.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="trainingDescription"
                  value="Training Description"
                />
              </div>
              <Textarea
                id="trainingDescription"
                {...register("trainingDescription")}
              />
              {errors.trainingDescription && (
                <span className="text-xs lg:text-sm text-red-600 font-semibold">
                  {errors.trainingDescription.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="trainingActivities"
                  value="Training Activities (Separate with ';')"
                />
              </div>
              <Textarea
                id="trainingActivities"
                placeholder="Activity 1; Activity 2"
                {...register("trainingActivities")}
              />
              {errors.trainingActivities && (
                <span className="text-xs lg:text-sm text-red-600 font-semibold">
                  {errors.trainingActivities.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="trainingObjectives"
                  value="Training Objectives (Separate with ';')"
                />
              </div>
              <Textarea
                id="trainingObjectives"
                placeholder="Objective 1; Objective 2"
                {...register("trainingObjectives")}
              />
              {errors.trainingObjectives && (
                <span className="text-xs lg:text-sm text-red-600 font-semibold">
                  {errors.trainingObjectives.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="trainingRegistration"
                  value="Training Registration (in PHP)"
                />
              </div>
              <TextInput
                id="trainingRegistration"
                type="number"
                placeholder="0.00"
                {...register("trainingRegistration", { valueAsNumber: true })}
              />
              {errors.trainingRegistration && (
                <span className="text-xs lg:text-sm text-red-600 font-semibold">
                  {errors.trainingRegistration.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="trainingCategory" value="Training Category" />
              </div>
              <Select
                id="trainingCategory"
                {...register("trainingCategory", { required: true })}
              >
                <option>Technical</option>
                <option>Certification</option>
                <option>Personal</option>
                <option>Professional</option>
                <option>Vocational & Arts</option>
                <option>Others</option>
              </Select>
              {errors.trainingCategory && (
                <span className="text-xs lg:text-sm text-red-600 font-semibold">
                  {errors.trainingCategory.message}
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