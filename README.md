# Notes App

A simple and user-friendly Notes Management Application built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). Users can create, view, edit, and delete notes with toast notifications for better user experience.

## Features

- **Add Notes**: Create new notes with a title and content.
- **Edit Notes**: Update existing notes.
- **View Notes**: Display all saved notes.
- **Delete Notes**: Remove notes when no longer needed.
- **Responsive UI**: Works seamlessly across devices.
- **Toast Notifications**: Provides feedback for actions like saving or deleting notes.

## Tech Stack

- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: CSS/Bootstrap
- **Notifications**: React Toastify

## Installation

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/notes-app.git
Navigate to the project directory:

bash
Copy code
cd notes-app
Install dependencies for both the server and client:

bash
Copy code
cd server
npm install
cd ../client
npm install
Create a .env file in the server folder and add the following:

env
Copy code
MONGO_URI=your_mongodb_connection_string
PORT=5000
Start the backend server:

bash
Copy code
cd server
npm start
Start the frontend client:

bash
Copy code
cd client
npm start
API Endpoints
Notes
GET /api/notes: Fetch all notes
POST /api/notes: Create a new note
PUT /api/notes/:id: Update a note
DELETE /api/notes/:id: Delete a note

## Screenshots

![img7](https://github.com/user-attachments/assets/e76c27c4-50ae-45b4-954a-652e467e4f1a)
![img6](https://github.com/user-attachments/assets/e4dc24db-98d9-43b4-81b1-5544a8096422)
![img5](https://github.com/user-attachments/assets/2d445851-463e-4e9f-b617-518c4835a6c0)
![img4](https://github.com/user-attachments/assets/0d1b2b75-657d-4151-b251-766fb6dcaca2)
![img3](https://github.com/user-attachments/assets/91de37ed-e1ad-4c5c-92fd-81a3fd5f3893)
![img2](https://github.com/user-attachments/assets/b60f865f-df67-4b15-b1c1-949bddd0b364)
![Img1](https://github.com/user-attachments/assets/fdf1747e-5475-40ee-9f63-b33ceb992cc8)
![img8](https://github.com/user-attachments/assets/63cd58d4-7c52-48be-98c7-e7769bbd8578)
