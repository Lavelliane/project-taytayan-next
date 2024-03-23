# Project Taytayan - A Centralized Hub for Trainings and Jobs 🏢

![Project Taytayan Logo](https://i.imgur.com/I5GAepe.png)
![Commit Shield](https://img.shields.io/github/last-commit/Lavelliane/project-taytayan-next?style=for-the-badge)
![License](https://img.shields.io/github/license/Lavelliane/project-taytayan-next?style=for-the-badge)

## **Context**

Project Taytayan (Bridge) is a web application made using Next.js, Firebase, and Google Maps API. The aim of this project is to establish partnerships, give more exposure to local experts, and provide a centralized platform for training services within the local vicinity. We want to bridge the gap by fostering community growth and skill development for out-of-school youth in Cebu City and provide an avenue for training, jobs, and networking opportunities.

Acknowledging the harsh reality of post-graduation transitions, for many, stepping into the professional world feels like navigating uncharted territory. The challenges are daunting, from fierce competition to evolving market demands. Now, imagine the magnitude of this challenge magnified for those who haven't had the privilege of completing their formal education.

This struggle is amplified for out-of-school youth, who have been denied the credentials and networks that traditional education provides. Furthermore, challenges such as limited opportunities, inadequate support, and skill gap or mismatch often hinder their career advancement.

According to a September 2023 article by Manila Bulletin, the Philippines Statistics Authority has stated that nearly **20% of Filipino children** are not in school. This is due to early employment to support their families, lack of interest, and the financial burden of school fees. This reflects a prevalent societal issue, with far-reaching implications towards the future of the young generation. Without adequate educational, and vocational support, these young individuals face an uphill battle in breaking free from the cycle of poverty and realizing their full potential as productive members of society. Moreover, although there are government initiatives like TESDA, a lot of other local training and experts in different vocational fields are not getting the exposure they need. Many young individuals struggle to navigate through complex application processes and gather the necessary documentation. As a result, a significant number of the young population remains marginalized, unable to tap into their full potential.

Project Taytayan fosters progress towards five Sustainable Development Goals (SDGs): 
1. **No Poverty** (1) 
2. **Quality Education** (4)
3. **Decent Work and Economic Growth** (8)
4. **Reduced Inequalities** (10)
5. **Partnerships for the Goals** (17)

## **Solution**

The web application provides a platform for users to browse, and register for different local trainings to upskill themselves on their preferred areas of interest. 

The web application also provides a means for training centers and professionals to extend their expertise regarding different subject matters and help open up employment opportunities for out-of-school youth within the local community.

Features:
1. **Centralized Administration and Communication** - Streamlined management for administrators, enabling effortless announcement postings and efficient role management, while maintaining centralized control over user registrations.
2. **User-Centric Job and Training Search** - User-friendly interface for job seekers, offering seamless search functionalities for both job opportunities and training courses, alongside automated certification upon course completion, enhancing their employability.
3. **Enhanced Job Posting Platform** - Simplified job posting process for employers, facilitating quick dissemination of job opportunities and heightened visibility for potential candidates.
4. **Transparent Training Center Interface** - Clear and accessible platform for training centers to showcase courses, enabling straightforward registration for interested individuals, coupled with automated certification issuance upon course completion


## **Tech Stack**

**Client:**
<p> <a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" alt="next.js" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> </p>

**Server:**

<p><a href="https://firebase.google.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" alt="firebase" width="40" height="40"/> </a> </p>

## **Screenshots**

![Landing Page](https://i.imgur.com/5wZzwEt.png)
![Home Page](https://i.imgur.com/5ma3cFw.png)
![Jobs Page](https://i.imgur.com/IAiFMi6.png)
![Trainings Page](https://i.imgur.com/CEnXTBa.png)
![Networking Page](https://i.imgur.com/w32zCWk.png)

## **Run Locally**

Clone the project

```bash
  git clone https://github.com/Lavelliane/project-taytayan-next
```

Go to the project's directory

```bash
  cd project-taytayan-next/
```

Install dependencies

```bash
  npm install
```

Create a `.env` file containing your Firebase variables. Use `.env.example` as a template.
```
NEXT_PUBLIC_FIREBASE_API_KEY              = <<your firebase api key here>>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN          = <<your firebase auth domain here>>
NEXT_PUBLIC_FIREBASE_PROJECT_ID           = <<your firebase project id here>>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET       = <<your firebase storage bucket here>>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID  = <<your firebase messaging sender id here>>
NEXT_PUBLIC_FIREBASE_APP_ID               = <<your firebase app id here>>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID       = <<your firebase measurement id here>>
NEXT_PUBLIC_GOOGLE_MAPS_API               = <<your google maps api key here>>
```

Start the server

```bash
  npm run dev
```
