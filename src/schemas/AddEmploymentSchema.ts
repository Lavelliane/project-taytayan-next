import { z } from 'zod';

export const addEmploymentFormSchema = z.object({
	employmentTitle: z
		.string({
			required_error: 'A job title is required.',
		})
		.min(2, {
			message: 'Job title must be 2 or more characters long.',
		})
		.max(50, {
			message: 'Job title must be 50 or less characters long.',
		}),
	employmentDescription: z
		.string({
			required_error: 'A job description is required.',
		})
		.min(2, {
			message: 'Job description must be 2 or more characters long.',
		})
		.max(500, {
			message: 'Job description must be 500 or less characters long.',
		}),
	employmentCompany: z
		.string({
			required_error: 'A job company is required.',
		})
		.min(2, {
			message: 'Company name must be 2 or more characters long.',
		})
		.max(50, {
			message: 'Company name must be 50 or less characters long.',
		}),
	employmentCompanyDescription: z
		.string({
			required_error: 'A company description is required.',
		})
		.min(2, {
			message: 'Company description must be 2 or more characters long.',
		})
		.max(500, {
			message: 'Company description must be 500 or less characters long.',
		}),
	employmentContactInformation: z
		.string({
			required_error: 'A contact information is required.',
		})
		.min(2, {
			message: 'Contact information must be 2 or more characters long.',
		})
		.max(100, {
			message: 'Contact information must be 50 or less characters long.',
		}),
	employmentType: z
		.string({
			required_error: 'An employment type is required.',
		})
		.refine((value) => ['Full-time', 'Part-time', 'Contract'].includes(value), {
			message: 'An employment type is required.',
		}),
	employmentLocationType: z
		.string({
			required_error: 'An employment location type is required.',
		})
		.refine((value) => ['Remote', 'On-site', 'Hybrid'].includes(value), {
			message: 'An employment location type is required.',
		}),
	employmentDatePosted: z.date({
		required_error: 'A training date is required.',
	}),
	employmentAddress: z.object({
		formattedAddress: z.string().min(2, 'Training address must be 2 or more characters long.'), // Make formatted_address required and non-empty
		geometry: z.object({
			lat: z.number().optional(), // lat and lng are optional as they have default values
			lng: z.number().optional(),
		}),
	}),
	employmentKeyRoles: z
		.string({
			required_error: 'Key roles are required.',
		})
		.min(2, {
			message: 'Key roles must be 2 or more characters long.',
		})
		.max(500, {
			message: 'Key roles must be 500 or less characters long.',
		}),
	employmentEducation: z
		.string({
			required_error: 'Educational requirements is required.',
		})
		.min(2, {
			message: 'Enter n/a if not applicable.',
		})
		.max(500, {
			message: 'Educational requirements must be 500 or less characters long.',
		}),
	employmentExperience: z
		.string({
			required_error: 'Experience requirements is required.',
		})
		.min(2, {
			message: 'Enter n/a if not applicable.',
		})
		.max(500, {
			message: 'Experience requirements must be 500 or less characters long.',
		}),
	employmentInstructions: z
		.string({
			required_error: 'Application instructions is required.',
		})
		.min(2, {
			message: 'Application instructions must be 2 or more characters long.',
		})
		.max(500, {
			message: 'Application instructions must be 500 or less characters long.',
		}),
	employmentBenefits: z
		.string({
			required_error: 'Benefits is required.',
		})
		.min(2, {
			message: 'Enter n/a if not applicable.',
		})
		.max(500, {
			message: 'Benefits must be 500 or less characters long.',
		}),
	employmentSalary: z
		.string({
			required_error: 'Salary is required.',
		})
		.min(2, {
			message: 'Enter n/a if not applicable.',
		})
		.max(50, {
			message: 'Salary must be 50 or less characters long.',
		}),
});

export type AddEmploymentFormType = z.infer<typeof addEmploymentFormSchema>;
