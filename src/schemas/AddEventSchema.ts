import { z } from "zod";

export const addEventFormSchema = z.object({
  eventName: z
    .string({
      required_error: "An event name is required.",
    })
    .min(2, {
      message: "Event name must be 2 or more characters long.",
    })
    .max(50, {
      message: "Event name must be 50 or less characters long.",
    }),
  eventDate: z.date({
    required_error: "An event date is required.",
  }),
  eventCenter: z
		.string({
			required_error: 'An event center is required.',
		})
		.min(2, {
			message: 'Event center must be 2 or more characters long.',
		})
		.max(50, {
			message: 'Event center must be 50 or less characters long.',
		}),
  eventAddress: z
    .string({
      required_error: "An event address is required.",
    })
    .min(2, {
      message: "Event address must be 2 or more characters long.",
    }),
  eventDescription: z
    .string({
      required_error: "An event description is required.",
    })
    .min(2, {
      message: "Event description must be 2 or more characters long.",
    })
    .max(100, {
      message: "Event description must be 100 or less characters long.",
    }),
  eventRegistration: z.coerce
    .number({
      invalid_type_error:
        "Please enter the amount a participant must pay to join the training. Values allowed are 0 (zero) or greater.",
      required_error:
        "Please enter the amount a participant must pay to join the training. Values allowed are 0 (zero) or greater.",
    })
    .nonnegative({
      message: "Please enter an amount greater than or equal to zero.",
    }),
  eventActivities: z
    .string({
      required_error: "Event activities are required.",
    })
    .min(2, {
      message: "Event activities must be 2 or more characters long.",
    }),
  eventObjectives: z
    .string({
      required_error: "Event objectives are required.",
    })
    .min(2, {
      message: "Event objectives must be 2 or more characters long.",
    }),
  eventCategory: z
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

export type AddEventFormType = z.infer<typeof addEventFormSchema>;
