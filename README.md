# 🏥 MediCare Hospital Management System

A full-stack Hospital Management System built with **React.js** (frontend) and **Spring Boot** (backend), using **MySQL** for data storage.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, React Router v6, Axios |
| Backend | Spring Boot 3.2, Spring Data JPA |
| Database | MySQL 8.0+ |
| Styling | Custom CSS (Google Fonts: Outfit + Space Mono) |
| Build Tool | Maven (backend), npm (frontend) |

---

## 📁 Project Structure

```
hospital-management-system/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/hospital/
│       │   ├── HospitalManagementApplication.java
│       │   ├── config/
│       │   │   └── CorsConfig.java
│       │   ├── controller/
│       │   │   ├── PatientController.java
│       │   │   ├── DoctorController.java
│       │   │   ├── AppointmentController.java
│       │   │   └── DashboardController.java
│       │   ├── model/
│       │   │   ├── Patient.java
│       │   │   ├── Doctor.java
│       │   │   └── Appointment.java
│       │   ├── repository/
│       │   │   ├── PatientRepository.java
│       │   │   ├── DoctorRepository.java
│       │   │   └── AppointmentRepository.java
│       │   └── service/
│       │       ├── PatientService.java
│       │       ├── DoctorService.java
│       │       └── AppointmentService.java
│       └── resources/
│           ├── application.properties
│           └── schema.sql
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── App.css
        ├── index.js
        ├── services/
        │   └── api.js
        ├── components/
        │   └── Layout.js
        └── pages/
            ├── Login.js
            ├── Dashboard.js
            ├── Patients.js
            ├── AddPatient.js
            ├── EditPatient.js
            ├── Doctors.js
            ├── AddDoctor.js
            ├── Appointments.js
            └── BookAppointment.js
```

---

## ⚙️ Prerequisites

- **Java 17+** — [Download](https://adoptium.net/)
- **Maven 3.8+** — [Download](https://maven.apache.org/)
- **Node.js 18+** — [Download](https://nodejs.org/)
- **MySQL 8.0+** — [Download](https://dev.mysql.com/downloads/)

---

## 🛠️ Setup & Installation

### 1. Database Setup

```sql
-- Option A: Auto-create (recommended)
-- The app creates the DB automatically if it doesn't exist.

-- Option B: Manual setup
mysql -u root -p
CREATE DATABASE hospital_db;
USE hospital_db;
SOURCE backend/src/main/resources/schema.sql;
```

### 2. Configure Database Credentials

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hospital_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 3. Start the Backend

```bash
cd backend
mvn spring-boot:run
```

✅ Backend runs at: `http://localhost:8080`

### 4. Start the Frontend

```bash
cd frontend
npm install
npm start
```

✅ Frontend runs at: `http://localhost:3000`

---

## 🔐 Login Credentials

```
Username: admin
Password: admin123
```

---

## 📡 API Endpoints

### Patients
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients` | Get all patients |
| GET | `/api/patients?search=name` | Search patients |
| GET | `/api/patients/{id}` | Get patient by ID |
| POST | `/api/patients` | Create patient |
| PUT | `/api/patients/{id}` | Update patient |
| DELETE | `/api/patients/{id}` | Delete patient |
| GET | `/api/patients/count` | Get patient count |

### Doctors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | Get all doctors |
| GET | `/api/doctors/{id}` | Get doctor by ID |
| POST | `/api/doctors` | Create doctor |
| PUT | `/api/doctors/{id}` | Update doctor |
| DELETE | `/api/doctors/{id}` | Delete doctor |
| GET | `/api/doctors/count` | Get doctor count |

### Appointments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | Get all appointments |
| POST | `/api/appointments` | Book appointment |
| DELETE | `/api/appointments/{id}` | Cancel appointment |
| GET | `/api/appointments/count` | Get count |
| GET | `/api/appointments/patient/{id}` | By patient |
| GET | `/api/appointments/doctor/{id}` | By doctor |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Get all stats |

---

## 📦 Sample API Requests

### Create a Patient
```json
POST /api/patients
{
  "name": "John Doe",
  "age": 45,
  "gender": "Male",
  "disease": "Hypertension",
  "contact": "+1-555-0100"
}
```

### Book an Appointment
```json
POST /api/appointments
{
  "patientId": 1,
  "doctorId": 2,
  "appointmentDate": "2026-03-20T10:30:00",
  "status": "SCHEDULED",
  "notes": "Regular checkup"
}
```

---

## 🎨 Features

- ✅ **Patient Registration** — Add, view, edit, delete patients
- ✅ **Doctor Management** — Add and manage medical staff
- ✅ **Appointment Booking** — Schedule patient-doctor appointments
- ✅ **Dashboard** — Real-time stats: total patients, doctors, appointments
- ✅ **Search** — Search patients by name
- ✅ **Authentication** — Simple login page
- ✅ **Responsive UI** — Works on desktop and tablet

---

## 🐛 Troubleshooting

**Backend won't start?**
- Ensure MySQL is running: `systemctl start mysql` (Linux) or start MySQL from System Preferences (Mac)
- Check DB credentials in `application.properties`
- Ensure port 8080 is not in use

**Frontend can't connect to backend?**
- Ensure backend is running on port 8080
- The `proxy` in `package.json` handles CORS in development
- Check browser console for errors

**CORS errors?**
- Verify `CorsConfig.java` allows `http://localhost:3000`
- Restart the backend after any config changes

---

## 📄 License

MIT License — Free to use and modify.
