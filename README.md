# SDP Group Test Project

This project is a web application designed to manage appointments, employees, and departments. It is built using Django for the backend and React for the frontend.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Description

The SDP Group Test Project is a full-stack application that allows users to create, edit, and manage appointments. It includes features for managing employees and departments, and it provides a calendar view for scheduling.

## Features

- Create
- Manage employees and departments
- View appointments in a calendar format
- Fetch employees based on department selection

## Technologies Used

- **Backend**: Django, Django REST Framework
- **Frontend**: React, TypeScript
- **Database**: PostgreSQL
- **Styling**: CSS

## Setup Instructions

### Prerequisites

- Python 3.x
- Node.js and npm
- PostgreSQL

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tq9epa/homework-SDP.git
   cd sdp-group-test/be
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Configure the database**:
   - Update the `DATABASES` setting in `settings.py` with your PostgreSQL credentials.

4. **Apply migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Run the server**:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd ../fe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

## Usage

- Access the application at `http://localhost:8000` in your web browser.
- Use the calendar to view and manage appointments.
- Select a department to fetch and manage employees.

## API Endpoints

- **Appointments**: `/api/appointments/`
- **Employees**: `/api/employees/`
- **Departments**: `/api/departments/`
- api/employees/by-department/
- /api/employees/name/
- /api/employees/email/

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.