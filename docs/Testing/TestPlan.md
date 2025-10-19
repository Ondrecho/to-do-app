# Pinboard — Test Plan

## 1. Introduction
This document describes the test strategy, objectives, and scope for the Pinboard To-Do Application. The goal of this testing phase is to validate that the application meets its functional and non-functional requirements as specified in the SRS, ensuring a high-quality user experience.

## 2. Test Items
The following components are subject to testing:
- **Pinboard-API**: Spring Boot backend with REST endpoints, JWT authentication, and database interaction.
- **Pinboard-UI**: React-based frontend for task management and user interaction.
- **Integrated System**: End-to-end workflow from UI to API and database.

**Key Quality Attributes (based on ISO 25010):**
- Functional Suitability
- Performance Efficiency
- Compatibility
- Usability
- Reliability
- Security
- Maintainability
- Portability

## 3. Risk Issues
- Internet dependency for authentication and data sync.
- Cross-browser compatibility for the React frontend.
- Data integrity and isolation between users.
- Security risks related to authentication and data exposure.

## 4. Features to Be Tested
### Functional:
- User Authentication (Login, Logout, Registration with JWT)
- Task CRUD Operations (Create, Read, Update, Delete with extended attributes)
- Task Completion Toggle
- Task Importance Marking
- Due Date Management
- Task Filtering (All, Important, Completed)
- Theme Switching (Light/Dark mode)
- Responsive UI (Mobile & Desktop)

### Non-Functional:
- UI Responsiveness across devices
- Security (Password Hashing, JWT Validation, HTTPS)
- Accessibility (Keyboard Navigation, Color Contrast in both themes)
- Error Handling and User Feedback
- Theme Consistency

## 5. Test Approach
- **Unit Testing**: JUnit & Mockito for backend; Jest & React Testing Library for frontend.
- **Integration Testing**: API endpoint testing with Postman or RestAssured.
- **System Testing**: End-to-end testing with Selenium or Cypress.
- **Usability Testing**: Manual testing of UI/UX flows.
- **Security Testing**: Manual review of authentication and data access controls.

## 6. Pass/Fail Criteria
### Test Scenarios (Examples):

| ID  | Purpose | Scenario | Expected Result |
|-----|---------|----------|-----------------|
| TC1 | User Login | Enter valid credentials | Redirect to main task screen with JWT token stored |
| TC2 | Create Task | Add task with title, description, due date and importance | Task appears in list with all attributes |
| TC3 | Mark Task Complete | Click checkbox next to task | Task is visually marked as done and moves to completed filter |
| TC4 | Theme Switching | Click theme toggle button | Interface changes between light and dark themes |
| TC5 | Due Date Setting | Set due date for task | Date is saved and displayed correctly |
| TC6 | Task Importance | Mark task as important | Task appears in important filter and has visual indicator |
| TC7 | Mobile Responsiveness | Use app on mobile device | All UI elements are accessible and properly sized |
| TC8 | Form Validation | Submit empty task form | Appropriate error messages displayed |

## 7. Conclusion
This test plan ensures that the Pinboard application is thoroughly validated against both functional and non-functional requirements. Successful execution of this plan will confirm that the system is secure, usable, and reliable for end-users.