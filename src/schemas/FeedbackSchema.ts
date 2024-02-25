import { z } from 'zod';

export const FeedbackSchema = z.object({
	satisfaction: z.number({ required_error: 'Rating should be provided' }).nonnegative(),
	navigation: z
		.number({ required_error: 'Rating should be provided' })
		.min(1, { message: 'Rating should be provided' }),
	layout: z.number({ required_error: 'Rating should be provided' }).min(1, { message: 'Rating should be provided' }),
	bugs: z.number({ required_error: 'Rating should be provided' }).min(1, { message: 'Rating should be provided' }),
	speed: z.number({ required_error: 'Rating should be provided' }).min(1, { message: 'Rating should be provided' }),
	recommendation: z
		.number({ required_error: 'Rating should be provided' })
		.min(1, { message: 'Rating should be provided' }),

	improvements: z.string().optional(),
	comments: z.string().optional(),

	name: z.string().optional(),
	email: z.string().optional(),
});

export type FeedbackType = z.infer<typeof FeedbackSchema>;
