import { z } from "zod";

export const addTrainingFormSchema = z.object({
  trainingName: z
    .string({
      required_error: "A training name is required.",
    })
    .min(2, {
      message: "Training name must be 2 or more characters long.",
    })
    .max(50, {
      message: "Training name must be 50 or less characters long.",
    }),
  trainingCenter: z
    .string({
      required_error: "A training center is required.",
    })
    .min(2, {
      message: "Training center must be 2 or more characters long.",
    })
    .max(50, {
      message: "Training center must be 50 or less characters long.",
    }),
  trainingDate: z.date({
    required_error: "A training date is required.",
  }),
  trainingAddress: z
    .string({
      required_error: "A training address is required.",
    })
    .min(2, {
      message: "Training address must be 2 or more characters long.",
    }),
  trainingDescription: z
    .string({
      required_error: "A training description is required.",
    })
    .min(2, {
      message: "Training description must be 2 or more characters long.",
    })
    .max(100, {
      message: "Training description must be 100 or less characters long.",
    }),
  trainingActivities: z
    .string({
      required_error: "Training activities are required.",
    })
    .min(2, {
      message: "Training activities must be 2 or more characters long.",
    }),
  trainingObjectives: z
    .string({
      required_error: "Training objectives are required.",
    })
    .min(2, {
      message: "Training objectives must be 2 or more characters long.",
    }),
  trainingRegistration: z.coerce
    .number({
      invalid_type_error:
        "Please enter the amount a participant must pay to join the training. Values allowed are 0 (zero) or greater.",
      required_error:
        "Please enter the amount a participant must pay to join the training. Values allowed are 0 (zero) or greater.",
    })
    .nonnegative({
      message: "Please enter an amount greater than or equal to zero.",
    }),
  trainingCategory: z
    .string({
      required_error: "A training category is required.",
    })
    .refine(
      (value) =>
        [
          "Technical",
          "Certification",
          "Personal",
          "Professional",
          "Vocational & Arts",
          "Others",
        ].includes(value),
      {
        message: "A training category is required.",
      }
    ),
});

export type AddTrainingFormType = z.infer<typeof addTrainingFormSchema>;
