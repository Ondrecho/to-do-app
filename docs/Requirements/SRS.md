# Project Requirements

## Content
1 [Introduction](#introduction)  
1.1 [Purpose](#purpose)  
1.2 [Business Requirements](#business-requirements)  
1.2.1 [Background](#background)  
1.2.2 [Business Opportunities](#business-opportunities)  
1.2.3 [Project Boundaries](#project-boundaries)  
1.3 [Analogues](#analogues)  
2 [User Requirements](#user-requirements)  
2.1 [Software Interfaces](#software-interfaces)  
2.2 [User Interface](#user-interface)  
2.3 [User Characteristics](#user-characteristics)  
2.3.1 [User Classes](#user-classes)  
2.3.2 [Application Audience](#application-audience)  
2.3.2.1 [Target Audience](#target-audience)  
2.3.2.2 [Secondary Audience](#secondary-audience)  
2.4 [Assumptions and Dependencies](#assumptions-dependencies)  
3 [System Requirements](#system-requirements)  
3.1 [Functional Requirements](#functional-requirements)  
3.1.1 [Main Functions](#main-functions)  
3.1.1.1 [User Authentication](#user-authentication)  
3.1.1.2 [Task Management](#task-management)  
3.1.1.3 [Task Organization](#task-organization)  
3.1.1.4 [User Profile Management](#user-profile-management)  
3.1.2 [Constraints and Exclusions](#constraints-exclusions)  
3.2 [Non-Functional Requirements](#non-functional-requirements)  
3.2.1 [Quality Attributes](#quality-attributes)  
3.2.1.1 [Usability Requirements](#usability-requirements)  
3.2.1.2 [Security Requirements](#security-requirements)  
3.2.1.3 [Accessibility Requirements](#accessibility-requirements)  
3.2.2 [External Interfaces](#external-interfaces)  
3.2.3 [Constraints](#constraints)  

<a name="introduction"/>

# 1 Introduction

<a name="purpose"/>

## 1.1 Purpose
This document describes the functional and non-functional requirements for the "Pinboard" web-based To-Do application with Java Spring Boot backend and React frontend. This document is intended for the team that will implement and verify the correctness of the application.

<a name="business-requirements"/>

## 1.2 Business Requirements

<a name="background"/>

### 1.2.1 Background
Many people struggle with task management and organization in their daily lives. The constant flow of information and responsibilities makes it difficult to keep track of important tasks, leading to missed deadlines and increased stress. Existing solutions often lack simplicity or require complex setup, making them inaccessible to users who need a straightforward task management system.

<a name="business-opportunities"/>

### 1.2.2 Business Opportunities
There is a significant need for a simple, intuitive task management application that allows users to quickly capture thoughts, organize priorities, and maintain focus. A web-based solution accessible from any device would provide users with the flexibility to manage their tasks anywhere, anytime. The clean interface designed for all user levels would make task management accessible to a broad audience.

<a name="project-boundaries"/>

### 1.2.3 Project Boundaries
The "Pinboard" application will allow registered users to create, manage, and organize their tasks with features for marking completion status, editing, and categorization. Anonymous users will have limited functionality for viewing demo tasks without persistence.

<a name="analogues"/>

## 1.3 Analogues
Similar applications include Todoist, Microsoft To Do, and Google Tasks. These applications provide task management capabilities but often include complex features that can overwhelm users seeking simplicity. Many require subscriptions for full functionality or have cluttered interfaces. Pinboard distinguishes itself by focusing on minimalism, ease of use, and a clean interface that prioritizes the core functionality of task management without unnecessary complexity.

<a name="user-requirements"/>

# 2 User Requirements

<a name="software-interfaces"/>

## 2.1 Software Interfaces
The application uses the following technologies:
- Backend: Java Spring Boot with Spring Security, Spring Data JPA
- Database: H2 (development), PostgreSQL (production)
- Frontend: React with React Router and Axios
- Authentication: JWT (JSON Web Tokens)

<a name="user-interface"/>

## 2.2 User Interface

**Authentication Screen**  
![Authentication Screen](/mockups/Mobile%20-%20auth.png)  
![Authentication Screen](/mockups/Desktop%20-%20auth.png)  

**Main Application Screen**  
![Main Screen](/mockups/Mobile%20-%20main%20screen.png)  
![Main Screen](/mockups/Desktop%20-%20main%20screen.png)  

**Navigation Menu**  
![Navigation Menu](/mockups/Mobile%20-%20menu.png)  

**Tasks Management**  
![Tasks Management](/mockups/Desktop%20-%20tasks.png)  

**Task Creation**  
![Task Creation](/mockups/Desktop%20-%20create%20task%20screen.png)  

<a name="user-characteristics"/>

## 2.3 User Characteristics

<a name="user-classes"/>

### 2.3.1 User Classes

| User Class | Description |
|:---|:---|
| Anonymous Users | Users who access the application without registration. Have access to demo functionality without data persistence |
| Registered Users | Users who have created an account and can fully utilize all task management features with data persistence |

<a name="application-audience"/>

### 2.3.2 Application Audience

<a name="target-audience"/>

#### 2.3.2.1 Target Audience
Students, professionals, and individuals seeking a simple, effective tool for daily task management and organization.

<a name="secondary-audience"/>

#### 2.3.2.2 Secondary Audience
Anyone needing occasional task tracking or interested in trying productivity tools.

<a name="assumptions-dependencies"/>

## 2.4 Assumptions and Dependencies
1. The application requires internet connection for user authentication and data synchronization
2. The frontend functionality depends on the availability of the backend API
3. User data persistence requires database connectivity
4. The application assumes users have modern web browsers with JavaScript enabled

<a name="system-requirements"/>

# 3 System Requirements

<a name="functional-requirements"/>

## 3.1 Functional Requirements

<a name="main-functions"/>

### 3.1.1 Main Functions

<a name="user-authentication"/>

#### 3.1.1.1 User Authentication
**Description.** Users can access the application either anonymously or by registering/logging into their account.

| Function | Requirements |
|:---|:---|
| Anonymous access | The application must allow users to access basic functionality without registration |
| User registration | The application must allow new users to register with username and password |
| User login | Registered users must be able to authenticate with their credentials |
| User logout | Authenticated users must be able to securely log out |

<a name="task-management"/>

#### 3.1.1.2 Task Management
**Description.** Authenticated users can perform full CRUD operations on their tasks.

| Function | Requirements |
|:---|:---|
| Create task | Users must be able to create new tasks with descriptive text |
| Read tasks | Users must be able to view all their tasks in an organized list |
| Update task | Users must be able to modify task text and completion status |
| Delete task | Users must be able to remove tasks individually or in bulk |
| Mark completion | Users must be able to toggle task completion status |

<a name="task-organization"/>

#### 3.1.1.3 Task Organization
**Description.** Users can organize tasks into categories and views.

| Function | Requirements |
|:---|:---|
| Task categories | Users must be able to view tasks by categories: all tasks, important, completed |
| Filter tasks | Users must be able to filter tasks by completion status |
| Clear completed | Users must be able to remove all completed tasks at once |

<a name="user-profile-management"/>

#### 3.1.1.4 User Profile Management
**Description.** Users can manage their account and preferences.

| Function | Requirements |
|:---|:---|
| Profile persistence | User tasks and preferences must be persisted between sessions |
| Data isolation | Users must only access their own tasks and data |

<a name="constraints-exclusions"/>

### 3.1.2 Constraints and Exclusions
1. The application does not support real-time collaboration between users
2. No email or push notifications are implemented
3. No sub-tasks or complex task relationships are supported
4. Task sharing between users is not available
5. Mobile app version is not included (web-responsive only)

<a name="non-functional-requirements"/>

## 3.2 Non-Functional Requirements

<a name="quality-attributes"/>

### 3.2.1 Quality Attributes

<a name="usability-requirements"/>

#### 3.2.1.1 Usability Requirements
1. The interface must be intuitive and require minimal learning
2. Core actions (add, complete task) should be achievable in 1-2 clicks
3. The application must be responsive and work on mobile, tablet, and desktop
4. Error messages must be clear and helpful

<a name="security-requirements"/>

#### 3.2.1.2 Security Requirements
1. User passwords must be hashed using bcrypt before storage
2. All communications must use HTTPS encryption
3. API endpoints must be protected against SQL injection and XSS attacks
4. Users must only access their own data
5. JWT tokens must be properly validated and secured

<a name="accessibility-requirements"/>

#### 3.2.1.3 Accessibility Requirements
1. The interface must support keyboard navigation
2. Sufficient color contrast must be maintained
3. Text must be readable at standard zoom levels
4. Form fields must be properly labeled

<a name="external-interfaces"/>

### 3.2.2 External Interfaces
1. The frontend must consume RESTful APIs from the Java backend
2. The backend must interface with relational database systems
3. The application must follow modern web standards and best practices
4. The UI must be consistent across modern browsers (Chrome, Firefox, Safari, Edge)

<a name="constraints"/>

### 3.2.3 Constraints
1. The application must be developed using Java Spring Boot for backend
2. The frontend must be implemented using React
3. The application must support relational databases (H2 for development, PostgreSQL for production)
4. The solution must be deployable on standard web servers
5. The code must be maintainable and well-documented