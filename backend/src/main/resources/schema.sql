-- Hospital Management System Database Schema
-- Run this script to initialize the database

CREATE DATABASE IF NOT EXISTS hospital_db;
USE hospital_db;

-- Patients Table
CREATE TABLE IF NOT EXISTS patients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    disease VARCHAR(200),
    contact VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    contact VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    appointment_date DATETIME NOT NULL,
    status VARCHAR(20) DEFAULT 'SCHEDULED',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

-- Sample Data
INSERT INTO doctors (name, specialization, contact) VALUES
('Dr. Sarah Johnson', 'Cardiology', '+1-555-0101'),
('Dr. Michael Chen', 'Neurology', '+1-555-0102'),
('Dr. Emily Rodriguez', 'Orthopedics', '+1-555-0103'),
('Dr. James Wilson', 'Pediatrics', '+1-555-0104'),
('Dr. Priya Sharma', 'Dermatology', '+1-555-0105');

INSERT INTO patients (name, age, gender, disease, contact) VALUES
('John Smith', 45, 'Male', 'Hypertension', '+1-555-1001'),
('Maria Garcia', 32, 'Female', 'Diabetes Type 2', '+1-555-1002'),
('Robert Johnson', 67, 'Male', 'Heart Disease', '+1-555-1003'),
('Lisa Anderson', 28, 'Female', 'Migraine', '+1-555-1004'),
('David Martinez', 52, 'Male', 'Arthritis', '+1-555-1005');

INSERT INTO appointments (patient_id, doctor_id, appointment_date, status, notes) VALUES
(1, 1, '2026-03-15 09:00:00', 'SCHEDULED', 'Regular checkup'),
(2, 2, '2026-03-15 10:30:00', 'SCHEDULED', 'Follow-up visit'),
(3, 1, '2026-03-16 14:00:00', 'SCHEDULED', 'EKG scheduled'),
(4, 3, '2026-03-17 11:00:00', 'SCHEDULED', 'X-ray required'),
(5, 4, '2026-03-18 09:30:00', 'SCHEDULED', 'Blood work ordered');
