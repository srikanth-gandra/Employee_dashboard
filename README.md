# Employee Management Dashboard

## Project Overview
The **Employee Management Dashboard** is a modern, responsive web application built with React.js. It allows an organization to manage employees efficiently with functionalities such as:

- Secure login authentication
- Add, edit, and delete employee records
- Upload and preview profile images
- Toggle active/inactive status
- Search and filter employees by name, gender, and status
- Print employee list
- Dashboard summary with total, active, and inactive employees

The project demonstrates a clean **UI/UX design**, responsive layout, and state management using **React Context**.

---

## Tech Stack Used

- **Frontend**:  
  - React.js (functional components + hooks)  
  - TailwindCSS for styling  
  - React Router DOM for routing  
- **State Management**:  
  - React Context API (`AuthContext` and `EmployeeContext`)  
- **Storage / Data**:  
  - LocalStorage for persisting employee data  
- **Other Libraries**:  
  - None (fully React + TailwindCSS, no external UI libraries)  

---

## Features

1. **Authentication**
   - Login page with email/password
   - Prevent access to dashboard without login
   - Logout functionality  

2. **Dashboard**
   - Summary cards: total employees, active, inactive
   - Add/Edit employee form with validation and image upload
   - Search and filter employees
   - Responsive employee table with actions (Edit, Delete, Print)

3. **Employee Form**
   - Full Name, Gender, Date of Birth, State
   - Active/Inactive toggle
   - Image upload with preview
   - Validation on required fields

4. **Employee Table**
   - Displays employee ID, profile image, name, gender, DOB, state, status
   - Action buttons for Edit, Delete, Print
   - Fully responsive

---

## Steps to Run the Project Locally

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/employee-dashboard.git
cd employee-dashboard

npm install

npm run dev
