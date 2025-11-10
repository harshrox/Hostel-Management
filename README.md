# IIIT Kalyani Hostel Management System

A **full-stack web application** built using **Django (Backend)** and **React + Tailwind (Frontend)** for managing hostel operations such as student records, room allocations, complaints, and leave applications.

---

## Tech Stack

* **Frontend:** React, Tailwind CSS, Vite
* **Backend:** Django REST Framework (DRF)
* **Database:** MySQL
* **Authentication:** JWT (JSON Web Tokens)

---

## Project Structure

```
Hostel-Management/
│
├── Backend/
│   ├── hostel_management/         # Django project root
│   ├── accounts/            # Handles authentication & user roles
│   ├── rooms/               # Room and allocation management
│   ├── complaints/          # Complaint registration & tracking
│   ├── leaves/              # Leave applications & approvals
│   ├── requirements.txt     # Backend dependencies
│   └── manage.py
│
├── Frontend/
│   ├── src/                 # React source code
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js
│
└── README.md
```

---

## Backend Setup (Django)

1. **Navigate to the backend folder**

   ```bash
   cd Backend
   ```

2. **Create and activate a virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate        # Linux/Mac
   venv\Scripts\activate           # Windows
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply migrations**

   ```bash
   python manage.py migrate
   ```

5. **Run the development server**

   ```bash
   python manage.py runserver
   ```

---

## Frontend Setup (React + Tailwind)

1. **Navigate to the frontend folder**

   ```bash
   cd Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

---

## Roles & Permissions

* **STUDENT:** Can view personal profile, file complaints, apply for leave, and check room allocation.
* **WARDEN:** Can manage users, rooms, complaints, and leave requests with full access control.

---

## Demo & Links

* **YouTube Demo:** [Watch here](https://youtu.be/3qy4lNxEbas)
* **GitHub Repository:** [Hostel-Management](https://github.com/harshrox/Hostel-Management)

---

## Contributors

| Reg No | Name                |
| ------ | ------------------- |
| 898    | Harsh Anand         |
| 881    | Aryan Dev Chaurasia |
| 884    | Ayush Bajpai        |
| 862    | Ajay Tiwari         |