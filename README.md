# WorkSphere

## Employee & Recruitment Management Portal

WorkSphere is a modern Employee and Recruitment Management Portal built with Angular. It provides a centralized interface for managing employees, recruitment candidates, departments, notifications, application preferences, and workforce statistics.

The application uses a clean dashboard-driven interface with responsive layouts and light/dark theme support.

---

## Features

### Dashboard
- Total employee count
- Active employee count
- Department count
- New hire statistics
- Employee distribution by department
- Employee status overview
- Recently added employee information
- Real-time dashboard updates based on stored employee data

### Employee Management
- Add employees
- Edit employee information
- View employee details
- Delete employees
- Search employees by name or email
- Filter employees by department
- Employee status management
- Persistent employee data using browser LocalStorage

### Recruitment Management
- Add candidates
- Delete candidates
- Search candidates by name, email, or position
- Filter candidates by recruitment status
- Recruitment statistics
- Candidate experience tracking
- Candidate application dates
- Recruitment pipeline statuses

### Notifications
- Employee activity notifications
- Recruitment activity notifications
- Real-time unread notification count
- Mark all notifications as read
- Notification persistence using LocalStorage
- Enable/disable notifications from Settings

### Settings
- Light/Dark mode
- Notification preferences
- Local data management
- Administrator information
- Application information

### UI & UX
- Responsive design
- Mobile-friendly layouts
- Bootstrap-based components
- Bootstrap Icons
- Interactive modals
- Hover and focus states
- Consistent light and dark themes

### Authentication
- Login page
- Protected application routes
- Authentication guard
- Logout functionality
- Demo administrator account

---

## Tech Stack

- **Angular 22**
- **TypeScript**
- **HTML5**
- **CSS3**
- **Bootstrap**
- **Bootstrap Icons**
- **Reactive Forms**
- **Template-driven Forms**
- **Angular Router**
- **RxJS**
- **Browser LocalStorage**

---

## Project Structure

```text
src/
└── app/
    ├── authguard/
    │   └── auth.guard.ts
    │
    ├── layout/
    │   ├── layout.html
    │   ├── layout.css
    │   └── layout.ts
    │
    ├── models/
    │   ├── employee.ts
    │   └── candidate.ts
    │
    ├── pages/
    │   ├── dashboard/
    │   ├── employees/
    │   ├── add-employee/
    │   ├── recruitment/
    │   ├── departments/
    │   ├── setting/
    │   └── login/
    │
    └── services/
        ├── auth.ts
        ├── employee.ts
        ├── candidate.ts
        ├── notification.ts
        └── theme.ts