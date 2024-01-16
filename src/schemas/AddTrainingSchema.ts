import { z } from "zod";

const addTrainingFormSchema = z.object({
  trainingName: z
    .string({
      required_error: "A training name is required.",
    })
    .min(2, {
      message: "Training name must must be 2 or more characters long.",
    })
    .max(50, {
      message: "Training name must must be 50 or less characters long.",
    }),
  trainingCenter: z
    .string({
      required_error: "A training center is required.",
    })
    .min(2, {
      message: "Training center must must be 2 or more characters long.",
    })
    .max(50, {
      message: "Training center must must be 50 or less characters long.",
    }),
  trainingDate: z.date({
    required_error: "A training date is required.",
  }),
  trainingAddress: z
    .string({
      required_error: "A training address is required.",
    })
    .min(2, {
      message: "Training address must must be 2 or more characters long.",
    }),
  trainingDescription: z
    .string({
      required_error: "A training name is required.",
    })
    .min(2, {
      message: "Training name must must be 2 or more characters long.",
    })
    .max(100, {
      message: "Training name must must be 100 or less characters long.",
    }),
  trainingActivities: z
    .string()
    .array()
    .nonempty("Activities cannot be empty."),
  trainingObjectives: z
    .string()
    .array()
    .nonempty("Objectives cannot be empty."),
  trainingRegistration: z.coerce
    .number({
      required_error:
        "Please enter the amount a participant must pay to join the training. Values allowed are 0 (zero) or greater.",
    })
    .nonnegative({
      message: "Please enter an amount greater than or equal to zero.",
    }),
  trainingCategory: z
    .string({
      required_error: "A training name is required.",
    })
    .min(2, {
      message: "Training name must must be 2 or more characters long.",
    })
    .max(50, {
      message: "Training name must must be 50 or less characters long.",
    }),
});

export type AddTrainingFormType = z.infer<typeof addTrainingFormSchema>;