# Pinboard — Test Results

| ID  | Purpose | Scenario | Expected Result | Actual Result | Pass/Fail |
|-----|---------|----------|-----------------|---------------|-----------|
| TC1 | User Login | 1. Go to login page<br>2. Enter valid email and password<br>3. Click "Login" | Redirect to main screen with user tasks | | |
| TC2 | User Login (Invalid) | 1. Go to login page<br>2. Enter invalid credentials<br>3. Click "Login" | Error message displayed, no redirect | | |
| TC3 | Create Task | 1. Log in<br>2. Click "Add Task"<br>3. Enter title and description<br>4. Save | New task appears in the task list | | |
| TC4 | Edit Task | 1. Open existing task<br>2. Modify text<br>3. Save changes | Task is updated in the list | | |
| TC5 | Delete Task | 1. Click delete icon next to task<br>2. Confirm deletion | Task is removed from the list | | |
| TC6 | Mark Task Complete | 1. Click checkbox next to task | Task is visually marked complete and moved to "Completed" filter | | |
| TC7 | Clear Completed Tasks | 1. Complete several tasks<br>2. Click "Clear Completed" | All completed tasks are removed | | |
| TC8 | Filter Tasks (Important) | 1. Click "Important" filter | Only tasks marked as important are shown | | |
| TC9 | Mobile Responsiveness | 1. Open app on mobile device<br>2. Navigate through all screens | UI adapts to small screen, all elements accessible | | |
| TC10 | Logout | 1. Click user menu<br>2. Click "Logout" | Session ends, redirect to login page | | |