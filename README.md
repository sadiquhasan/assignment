Kaban Portal
Kaban Portal is a project that provides a Kaban board portal to manage tasks and workflows efficiently. The project consists of three main pages 

pages:
--Home Page
--Kaban Board Page
--Kaban Card (Items) Page

Getting Started
Follow these steps to get the project up and running:

Download Project:
Clone or download the project from the GitHub repository.
Install Dependencies:

Open your terminal and navigate to the project folder.
Run npm install to install the necessary dependencies.
Create .env file:

Create a .env file in the root level of the project.

Add the following variables and provide your MongoDB database URL and base URL:

env
Copy code
BASE_URL=http://localhost:3000/api/
DATABASE=your-mongodb-database-url
Start the Project:

Run npm run dev to start the project.
The project will be accessible at http://localhost:3000.
Project Overview
Home Page


Header:
Two menu items: Home and Kaban Board.
Clicking on the Kaban Board option navigates to the Kaban Board page.

Hero Section:
Learn More (Dummy button).
Kaban Board (Navigate to the Kaban Board page).
Dummy Footer Section

Kaban Board Page

Top Right Button:
Click to create a new Kaban board card.

Kaban Board Cards:
Each card has options for edit and delete.
Clicking on the card name navigates to the Kaban Card page for that specific board.


Technology used 

--Nextjs 
--Tailwindcss
--MongoDB
--Nodejs
--ExpressJs