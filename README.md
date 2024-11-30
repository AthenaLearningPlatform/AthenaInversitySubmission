Athena Learning Platform
Overview
The Athena Learning Platform is a web-based application designed for educational environments, offering a range of features for both teachers and students. Teachers can create assignments, view student submissions, and access class averages. Students can view their assignments, submit work, and monitor their performance.

This platform is designed to provide an easy-to-use interface for managing learning tasks and assignments, and aims to enhance collaboration between teachers and students through intuitive dashboards.

Table of Contents:
Features
Technologies Used
Getting Started
Prerequisites
Installation
Running the Application
Usage
Known Bugs
Contributing
License

Features:

Teacher Features
Create Assignment: Teachers can create assignments with various types, including project assignments and quickfire questions.
Manage Assignments: Teachers can view all assignments and student submissions.
Student Submissions: Teachers can view and manage student submissions for each assignment.
Class Averages: Teachers can view average grades for the class based on assignment results.
Input Exam Results: Teachers can input exam results to keep track of student performance.
Student Features
View Assignments: Students can view their active and past assignments.
Generate Projects: Students can generate their own specific homework based off desired skills set by the teacher.
Submit Assignments: Students can submit work for assignments directly through the platform.
Average Grade: Students can view their average grades for all their assignments.
Input Exam Results: Students can input their exam results to track academic performance.
Modals and Dynamic UI Components
Quickfire Questions Modal: Students and teachers can interact with a modal that dynamically generates quickfire questions.
Project Generation Modal: Teachers and students can work on generating project prompts based on topics they provide.

Technologies Used:
This platform leverages the following technologies:

HTML5: For structuring the content of the application.
CSS3: For styling the application and creating responsive layouts.
JavaScript: For implementing interactive elements such as form handling, dynamic content loading, and modals.
Chart.js: Used for generating visual charts for student grades and class averages.
External Libraries:
Chart.js: For dynamic charting and visualization (e.g., displaying student progress and assignment statistics).

This project intends to use OpenAI to generate the prompts more effectively, for now we have a prompt generation matrix that acts as the 'generation AI'.

Getting Started:

Prerequisites
To run the Athena Learning Platform locally, you'll need the following:

A modern web browser (Chrome, Firefox, etc.)
Basic understanding of HTML, CSS, JavaScript, and web development concepts.
Optional: A local web server (if you want to host the platform locally without opening the file directly in your browser).
Installation
Clone the repository to your local machine:

bash
Copy code
git clone https://github.com/yourusername/athena-learning-platform.git
Navigate into the project directory:

bash
Copy code
cd athena-learning-platform
Install dependencies: Since this project is a front-end application with no server-side code, there are no backend dependencies to install. However, you may want to use a local web server for testing.

Open the project in your browser:

Simply open the index.html file in your browser to start using the platform locally.
Alternatively, if you have a local development environment set up (e.g., using VS Code's Live Server extension), you can use that to serve the app.
Running the Application
To run the application, follow these steps:

Navigate to the root folder where index.html is located.
Open the file directly in your browser or use a local development server to view the platform.
Usage
Once the platform is loaded in your browser, you will be presented with a login form. Here are the steps to use the platform:

Login Process
Login: If you are a teacher or student, log in using your credentials.
For the sake of this Demo, we have test credentials (teacher1, pass123) (student1, pass123)
Register: If you do not have an account, you can register a new account by clicking the "Register here" link on the login page.
Teacher Dashboard:
After logging in as a teacher, you will be directed to the teacher dashboard, where you can create assignments, view student submissions, and monitor class performance.
Use the sidebar navigation to switch between different sections like "Create Assignment," "View Assignments," and "Student Submissions."
Student Dashboard:
After logging in as a student, you will be directed to the student dashboard, where you can view assignments and track your grades.
You can also submit your assignments directly through the platform.
Creating Assignments (for Teachers):
Teachers can create a variety of assignments, such as project-based tasks and quickfire questions, by selecting the appropriate options from the dashboard.
Submitting Assignments (for Students):
Students can view and submit assignments. If the teacher has selected a project assignment, they will be prompted to enter a project topic and generate related prompts.
Modals:
Quickfire Questions Modal: A popup will appear for students to answer a series of quickfire questions.
Project Topic Modal: A modal allows teachers or students to enter a project topic and generate prompts related to that topic.
Known Bugs
While the application works for most use cases, there are some known issues that may affect the user experience:

Login UI Issues:

There are some inconsistencies in the layout and styling of the login form in different browsers, causing it to misalign in certain cases.
The login form may not always correctly handle invalid credentials or display error messages in a timely manner.
Project Generation Issues:

The project prompt generation functionality sometimes fails to produce valid prompts based on the entered topic.
The "Generate Prompts" button might not always enable when a valid topic is entered. This bug is currently under investigation.
Dynamic Content Loading:

Some dynamic content loading (e.g., assignment and submission lists) may occasionally cause delays or fail to render under certain conditions.
UI Responsiveness:

There are occasional issues with the responsiveness of certain elements on smaller screen sizes, especially the teacher's assignment creation form.
These bugs are actively being addressed in upcoming releases.

Contributing
We welcome contributions to Athena Learning Platform! If you would like to contribute, please follow these steps:

Fork the repository on GitHub.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit them (git commit -am 'Add new feature').
Push to your branch (git push origin feature/your-feature).
Create a pull request from your fork to the main repository.
Please make sure to follow the coding conventions used in the project and provide detailed commit messages.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Feel free to reach out with questions or issues! You can contact us via GitHub issues or through our email provided in the repository details
