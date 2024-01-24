import { Training } from '@/types/types';

export const trainings: Training[] = [
	{
		trainingId: '1',
		trainingName: 'Google Cloud Platform - Foundational',
		trainingCenter: 'Google, Inc.',
		trainingDate: new Date('2024-01-13'),
		trainingAddress: '2/F Park Centrale Bldg., IT Park, Apas, Lahug, Cebu City',
		trainingDescription:
			'The Google Cloud Platform - Foundational training is designed to provide participants with a comprehensive understanding of cloud computing principles and the core services offered by Google Cloud. This hands-on training will cover topics such as virtual machines, storage, and networking in the context of Google Cloud services.',
		trainingActivities: [
			'Introduction to Google Cloud Console',
			'Creating and Managing Virtual Machines',
			'Exploring Cloud Storage',
		],
		trainingObjectives: [
			'Understand fundamental cloud computing concepts',
			'Gain proficiency in using Google Cloud Console',
			'Deploy and manage virtual machines effectively',
		],
		trainingRegistrants: ['James', 'Harden', 'Reynald', 'harley'],
		trainingRegistration: '20.00',
		trainingCategory: 'certification',
	},
	{
		trainingId: '2',
		trainingName: 'Technical Support and Troubleshooting',
		trainingCenter: 'University of San Carlos - Department of Computer Engineering',
		trainingDate: new Date('2024-01-01'),
		trainingAddress: 'Barangay Nasipit, Talamban, Cebu',
		trainingDescription:
			"The Technical Support and Troubleshooting training is a practical workshop aimed at enhancing participants' skills in diagnosing and resolving technical issues. Conducted by industry experts from the University of San Carlos, this training will cover topics such as system diagnostics, hardware troubleshooting, and effective customer communication.",
		trainingActivities: [
			'System Diagnostics and Analysis',
			'Hardware Troubleshooting Techniques',
			'Effective Communication in Technical Support',
		],
		trainingObjectives: [
			'Develop advanced troubleshooting skills',
			'Enhance knowledge of system diagnostics',
			'Improve communication skills in technical support scenarios',
		],
		trainingRegistrants: ['James', 'Harden'],
		trainingRegistration: '10.00',
		trainingCategory: 'technical',
	},
	{
		trainingId: '3',
		trainingName: 'CCNA: Introduction to Networks',
		trainingCenter: 'Cisco Networking Academy',
		trainingDate: new Date('2024-02-02'),
		trainingAddress: 'Online via Microsoft Teams',
		trainingDescription:
			'The CCNA: Introduction to Networks training, offered by the prestigious Cisco Networking Academy, is a foundational course in networking. Participants will gain practical knowledge and skills related to networking fundamentals, IP addressing, and basic security concepts. The training includes hands-on labs and virtual simulations to reinforce theoretical concepts.',
		trainingActivities: ['Networking Fundamentals', 'IP Addressing and Subnetting', 'Basic Network Security'],
		trainingObjectives: [
			'Acquire fundamental networking knowledge',
			'Master IP addressing and subnetting techniques',
			'Understand basic concepts of network security',
		],
		trainingRegistrants: ['James', 'Harden', 'Reynald', 'harley', 'shasha'],
		trainingRegistration: '0.00',
		trainingCategory: 'certification',
	},
	{
		trainingId: '4',
		trainingName: 'Food and Beverage Services NC II- CBC',
		trainingCenter: 'TESDA',
		trainingDate: new Date('2024-04-01'),
		trainingAddress: 'PROVINCIAL TRAINING CENTER-INABANGA',
		trainingDescription:
			'The Food and Beverage Services NC II- CBC training, accredited by TESDA, is a vocational course designed for individuals aspiring to enter the hospitality industry. Participants will learn practical skills in food and beverage preparation, customer service, and hygiene standards. The training includes hands-on sessions and real-world scenarios to prepare participants for the demands of the industry.',
		trainingActivities: ['Food Preparation Techniques', 'Customer Service Excellence', 'Hygiene and Safety Standards'],
		trainingObjectives: [
			'Develop culinary skills for food preparation',
			'Provide excellent customer service in a hospitality setting',
			'Adhere to hygiene and safety standards in food service',
		],
		trainingRegistrants: ['James'],
		trainingRegistration: '20.00',
		trainingCategory: 'vocational & arts',
	},
	{
		trainingId: '5',
		trainingName: 'JUMP Camp',
		trainingCenter: 'University of San Carlos - Department of Computer Engineering',
		trainingDate: new Date('2024-05-31'),
		trainingAddress: 'Barangay Nasipit, Talamban, Cebu',
		trainingDescription:
			'JUMP Camp (Java, Unity, Mobile, and Python) is an immersive technical training program hosted by the University of San Carlos. Participants will engage in hands-on coding sessions, collaborative projects, and mentorship from industry professionals. The camp covers programming languages such as Java, Unity for game development, mobile app development, and Python for data science.',
		trainingActivities: [
			'Java Programming Workshop',
			'Unity Game Development Project',
			'Mobile App Development Challenge',
			'Introduction to Python for Data Science',
		],
		trainingObjectives: [
			'Gain proficiency in Java programming',
			'Develop a Unity game project',
			'Create a functional mobile app',
			'Understand basics of Python for data science',
		],
		trainingRegistrants: [
			'James',
			'Harden',
			'Reynald',
			'harley',
			'shasha',
			'james',
			'harden',
			'reynald',
			'harley',
			'shasha',
		],
		trainingRegistration: '0.00',
		trainingCategory: 'technical',
	},
];

export default trainings;
