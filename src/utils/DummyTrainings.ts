type Training = {
    trainingId: number;
    trainingName: string;
    trainingCenter: string;
    trainingAddress: string;
    trainingRegistration: string;
    trainingCategory: string;
}

const trainings: Training[] = [
    {
      trainingId: 1,
      trainingName: 'Google Cloud Platform - Foundational',
      trainingCenter: 'Google, Inc.',
      trainingAddress: '2/F Park Centrale Bldg., IT Park, Apas, Lahug, Cebu City',
      trainingRegistration: 'No Registration Fee',
      trainingCategory: 'certification',
    },
    {
      trainingId: 2,
      trainingName: 'Technical Support and Troubleshooting',
      trainingCenter: 'University of San Carlos - Department of Computer Engineering',
      trainingAddress: 'Barangay Nasipit, Talamban, Cebu',
      trainingRegistration: 'No Registration Fee',
      trainingCategory: 'technical',
    },
    {
      trainingId: 3,
      trainingName: 'CCNA: Introduction to Networks',
      trainingCenter: 'Cisco Networking Academy',
      trainingAddress: 'Online via Microsoft Teams',
      trainingRegistration: 'No Registration Fee',
      trainingCategory: 'certification',
    },
    {
      trainingId: 4,
      trainingName: 'Food and Beverage Services NC II- CBC',
      trainingCenter: 'TESDA',
      trainingAddress: 'PROVINCIAL TRAINING CENTER-INABANGA',
      trainingRegistration: 'No Registration Fee',
      trainingCategory: 'vocational & arts',
    },
    {
      trainingId: 5,
      trainingName: 'JUMP Camp',
      trainingCenter: 'University of San Carlos - Department of Computer Engineering',
      trainingAddress: 'Barangay Nasipit, Talamban, Cebu',
      trainingRegistration: 'No Registration Fee',
      trainingCategory: 'technical',
    },
];

export default trainings;