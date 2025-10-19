# Pinboard — Test Results

| ID  | Purpose | Scenario | Expected Result | Actual Result | Pass/Fail |
|-----|---------|----------|-----------------|---------------|-----------|
| TC1 | User Login | 1. Go to login page<br>2. Enter valid credentials<br>3. Click "Login" | Redirect to main screen with user tasks | Successfully redirected, JWT token stored | Pass |
| TC2 | User Login (Invalid) | 1. Go to login page<br>2. Enter invalid credentials<br>3. Click "Login" | Error message displayed, no redirect | Error message shown correctly | Pass |
| TC3 | Create Task | 1. Log in<br>2. Click "Add Task"<br>3. Enter title, description, due date, importance<br>4. Save | New task appears with all attributes in task list | Task created with all properties | Pass |
| TC4 | Edit Task | 1. Open existing task<br>2. Modify text, due date, importance<br>3. Save changes | Task is updated with new values in the list | All changes saved correctly | Pass |
| TC5 | Delete Task | 1. Click delete icon next to task<br>2. Confirm deletion | Task is removed from the list | Task successfully deleted | Pass |
| TC6 | Mark Task Complete | 1. Click checkbox next to task | Task is visually marked complete and moved to "Completed" filter | Status toggled correctly, filter works | Pass |
| TC7 | Theme Switching | 1. Click theme toggle button in header | Interface switches between light and dark themes | Theme changes instantly, all elements adapt | Pass |
| TC8 | Due Date Management | 1. Create task with due date<br>2. View in list<br>3. Edit due date | Date is displayed, saved, and editable | Date functionality works correctly | Pass |
| TC9 | Important Tasks | 1. Mark task as important<br>2. Filter by important | Task appears in important filter with visual indicator | Filtering and visual cues work | Pass |
| TC10 | Mobile Responsiveness | 1. Open app on mobile device<br>2. Navigate all screens | UI adapts to small screen, all elements accessible | Responsive design works on mobile | Pass |