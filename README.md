# To-Do List Web Application

## Overview
This project is a fully functional To-Do List web application built using React.js, Node.js (backend), Express.js, HTML, and CSS. It allows users to manage their tasks by adding, editing, deleting, and marking tasks as complete. The app also supports task filtering, sorting, and persisting data to ensure users can retrieve their tasks after page refreshes or session changes.

## Technologies Used
- **Frontend:** React.js, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** SQLite (for storing tasks)
- **Styling:** Custom CSS
- **Version Control:** Git, GitHub

## Features
- **Add Tasks:** Users can add new tasks by entering the task description and submitting it to the list.
- **Edit Tasks:** Users can edit the task description to modify or update tasks as needed.
- **Delete Tasks:** Allows users to remove tasks from the list.
- **Mark as Complete:** Users can mark tasks as complete, and completed tasks are visually indicated using different styles (e.g., strikethrough text).
- **Task Persistence:** Tasks are saved in the SQLite database, ensuring they remain available even after page refreshes.
- **Task Filtering and Sorting:** Users can filter tasks by status (e.g., completed or not completed) and sort them based on different criteria (e.g., alphabetical order, creation date).
- **Responsive Design:** The app is designed to be responsive, working well on both desktop and mobile devices.

## Learning Goals
- **Frontend-Backend Interaction:** Utilize React and Axios to interact with a Node.js backend, making API calls to create, read, update, and delete tasks.
- **State Management:** Use React's `useState` hook to manage task states and handle form inputs.
- **Database Integration:** Integrate SQLite with Node.js to provide persistent data storage for tasks.
- **Event Handling:** Implement form submission, task editing, and checkbox change event handling to capture user interactions and update task statuses.
- **Styling and User Experience:** Create an intuitive and visually appealing user interface using CSS.

## Pages Design
The web application has a simple and user-friendly interface:
1. **Task List Display:** Shows the current tasks in a list format, where users can see all tasks or filter based on their status.
2. **Task Input Field:** Allows users to add new tasks by entering a description and submitting it.
3. **Action Buttons:** Includes buttons for adding, editing, and deleting tasks, as well as checkboxes for marking tasks as complete.
4. **Responsive Design:** The app adjusts seamlessly between desktop and mobile views, ensuring accessibility across devices.

## Future Enhancements
- **User Authentication:** Add a login system to allow multiple users to manage their own tasks.
- **Task Due Dates:** Allow users to set due dates for tasks and display upcoming tasks with reminders.
- **Task Prioritization:** Implement a prioritization system for tasks based on urgency or importance.
