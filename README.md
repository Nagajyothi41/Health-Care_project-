Objective: 
Develop a simple full-stack web application using the MERN stack (MongoDB, Express.js,  React.js, Node.js) to simulate a basic dental checkup system. This project will help evaluate  your understanding of front-end and back-end integration, user roles, file handling, and PDF  export functionality. 
Project Overview: 
The web application must support two types of users: 
1. Patient (User) 
2. Dentist 
The workflow includes selecting a dentist, applying for a checkup, and viewing results  uploaded by the dentist. The user should be able to export the checkup data as a PDF. 
Application Requirements: 
1. User (Patient) Interface: 
- Register/Login as a user (optional but encouraged). 
- View a list of available dentists (fetched from MongoDB). 
- Select a dentist and apply for a checkup request. 
- View checkup results (images + dentist notes). 
- Export the checkup details (images and descriptions) to a single PDF file. 
2. Dentist Interface: 
- Register/Login as a dentist (optional but encouraged). 
- View a list of users who have requested checkups. 
- For each user, upload one or more photos related to the checkup. 
- Add a description/note for each photo. 
- Save this data to MongoDB for user access.
Technical Requirements: 
- Frontend: React.js (with or without frameworks like Tailwind CSS or Material-UI). - Backend: Node.js with Express.js. 
- Database: MongoDB (local or MongoDB Atlas). 
- Use Mongoose for MongoDB integration. 
- Image uploads should be handled using libraries like Multer. 
- PDF generation can be done using libraries like jsPDF or html2pdf. - Maintain clear code structure and use version control (Git). 
Bonus Features (Optional): 
- Authentication using JWT or any preferred method. 
- Responsive and user-friendly UI. 
- Real-time updates (using sockets or polling). 
- Deploy the app using platforms like Vercel (frontend) and Render/Heroku (backend). 
