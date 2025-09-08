# Content

1.  [Application Description](#1-application-description)
2.  [Project Components](#2-project-components)<br/>
    2.1 [Database](#21-database)<br/>
    2.2 [Backend](#22-backend)<br/>
    2.3 [Frontend](#23-frontend)<br/>
3.  [Main Functionality](#3-main-functionality)
4.  [Graphic Interface Mockups](#4-graphic-interface-mockups)<br/>
    4.1 [User Authentication Screen](#41-user-authentication-screen)<br/>
    4.2 [Main Dashboard / Task List](#42-main-dashboard--task-list)<br/>
    4.3 [Task Item States](#43-task-item-states)<br/>
    4.4 [Mobile Responsive View](#44-mobile-responsive-view)<br/>
5.  [System Requirements](#5-system-requirements)<br/>
    5.1 [Functional Requirements](#51-functional-requirements)<br/>
    5.2 [Non-Functional Requirements](#52-non-functional-requirements)<br/>
6.  [User Characteristics & Interfaces](#6-user-characteristics--interfaces)<br/>
    6.1 [User Characteristics](#61-user-characteristics)<br/>
    6.2 [Software Interfaces](#62-software-interfaces)<br/>
    6.3 [User Interface Description](#63-user-interface-description)<br/>
7.  [Assumptions and Dependencies](#7-assumptions-and-dependencies)

---

## Pinboard — To-Do Application

### 1 Application Description

A browser-based task manager designed for clarity and control. It helps users capture fleeting thoughts, organize priorities, and stay focused without relying on memory alone. Accessible from any device, the app allows seamless creation, editing, and removal of tasks — keeping your workflow clean and your mind clear.

The software product, **Pinboard**, consists of:
*   **Pinboard-API:** A RESTful backend service built with Java and Spring Boot. It handles all business logic, data persistence, and authentication.
*   **Pinboard-UI:** A dynamic, single-page application (SPA) frontend built with React. It consumes the API and provides the user interface.

**What the software will do:**
*   Allow users to create, read, update, and delete (CRUD) to-do items.
*   Allow users to mark items as complete or incomplete.
*   Provide a clean and responsive user interface that works on both desktop and mobile browsers.
*   Persist user data securely between sessions.

**What the software will not do (Initial Version):**
*   It will not support real-time collaboration or sharing of task lists between users.
*   It will not send email or push notifications for task reminders.
*   It will not have complex project management features like sub-tasks, tags, or Gantt charts.

### 2 Project Components

#### 2.1 Database
Data storage is implemented using a relational database (H2 for development, PostgreSQL for production). The database consists of normalized SQL tables storing information about users and their tasks (notes).

#### 2.2 Backend
The server side implements the main application logic and work with the database through an ORM (Object-Relational Mapping). Language: Java, Framework: Spring (Boot, Data JPA, Security).

#### 2.3 Frontend
The client side implements the backend functionality by calling API methods. Language: JavaScript, Framework: React. The application can be run in any modern browser on any system.

### 3 Main Functionality

The to-do list app includes several basic functions:
*   **User Authentication**
    *   Registration
    *   Login / Logout
*   **Work with Notes (CRUD Operations)**
    *   View a list of all notes
    *   Add a new note
    *   Edit an existing note
    *   Delete a note
    *   Mark a note as complete/incomplete
    *   Clear all completed notes at once

### 4 Graphic Interface Mockups

The following mockups illustrate the planned user interface design and flow for the Pinboard application. All mockups are located in the `/docs/mockups/` directory.

#### 4.1 User Authentication Screen
This screen allows users to either log in to an existing account or register for a new one. Tabs toggle between the Login and Registration forms.
![Authentication Mockup](/docs/mockups/01-auth-screen.png)

#### 4.2 Main Dashboard / Task List
The primary view of the application. It displays the user's list of tasks, provides an input to add new ones, and offers controls to manage the entire list.
![Dashboard Mockup](/docs/mockups/02-dashboard-screen.png)

#### 4.3 Task Item States
A detailed view showing the interactive states of a single task item: active (pending), completed, and the edit mode.
![Task States Mockup](/docs/mockups/03-task-states.png)

#### 4.4 Mobile Responsive View
This mockup demonstrates how the application's interface adapts to provide an optimal experience on mobile devices.
![Mobile View Mockup](/docs/mockups/04-mobile-view.png)

### 5 System Requirements

#### 5.1 Functional Requirements

| ID   | Requirement Description                                                                                               | Priority |
| :--- | :-------------------------------------------------------------------------------------------------------------------- | :------- |
| FR1  | The system shall allow a user to register for a new account by providing a unique username and a password.             | High     |
| FR2  | The system shall allow a registered user to log in using their username and password.                                 | High     |
| FR3  | The system shall allow a logged-in user to create a new to-do item by entering text.                                  | High     |
| FR4  | The system shall display all to-do items belonging to the logged-in user.                                             | High     |
| FR5  | The system shall allow a user to mark any of their to-do items as complete or incomplete.                             | High     |
| FR6  | The system shall allow a user to edit the text of any of their existing to-do items.                                  | High     |
| FR7  | The system shall allow a user to delete any of their to-do items.                                                     | High     |
| FR8  | The system shall allow a user to delete all of their completed to-do items at once.                                   | Medium   |
| FR9  | The system shall persist all changes to to-do items (create, update, delete) immediately and reflect them for the user. | High     |
| FR10 | The system shall prevent unauthorized access to user data (e.g., User A cannot see or modify User B's tasks).          | High     |
| FR11 | The system shall allow a logged-in user to securely log out.                                                          | Medium   |

#### 5.2 Non-Functional Requirements

*   **Usability:** The UI must be intuitive and simple. Core actions (add, complete task) should require minimal clicks.
*   **Reliability:** The backend API must have high uptime (99.9%). User data must not be lost or corrupted.
*   **Performance:** 95% of API endpoints should respond in <200ms. The main dashboard should be interactive in <3s on a 4G connection.
*   **Security:** All passwords must be hashed (bcrypt). All communication must use HTTPS. API endpoints must be protected against common vulnerabilities (SQL Injection, XSS) using JWT authentication.
*   **Availability:** The application should be available 24/7 with a target of 99.5% uptime.
*   **Maintainability:** The codebase must be well-structured, documented, and adhere to Java/React best practices for ease of future development.

### 6 User Characteristics & Interfaces

#### 6.1 User Characteristics
The intended users are general consumers with basic computer literacy. No specific educational level or technical expertise is required. The application is designed for simplicity, making it accessible to a wide audience.

#### 6.2 Software Interfaces
*   **Backend (Pinboard-API):** Spring Boot Web, Spring Data JPA (Hibernate), H2/PostgreSQL Database, Spring Security, JJWT.
*   **Frontend (Pinboard-UI):** React, React Router, Axios, a CSS-in-JS library (e.g., Styled-Components).

#### 6.3 User Interface Description
The UI will consist of:
1.  **Login / Registration Screen:** A simple form for user authentication.
2.  **Main Dashboard:**
    *   A header with a welcome message and logout button.
    *   An input field with an "Add" button.
    *   A list of tasks, each with:
        *   A checkbox for completion status.
        *   The task text.
        *   An edit button.
        *   A delete button.
    *   Visual styling to distinguish complete vs. incomplete tasks.
    *   A "Clear Completed" button.
3.  The UI will be fully responsive for mobile, tablet, and desktop screens.

### 7 Assumptions and Dependencies

*   **Assumptions:**
    *   Users have access to a modern web browser with JavaScript enabled.
    *   Users will use the application for personal task management.
    *   The application will be deployed on a server with a public URL.
*   **Dependencies:**
    *   The React frontend is entirely dependent on the Java backend API.
    *   The project relies on third-party libraries and frameworks (Spring, React, etc.).
    *   The production environment depends on a PostgreSQL database server.