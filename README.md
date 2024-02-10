# SafeRoads: AI-Enabled Accident Detection

## Overview

SafeRoads is an advanced AI-powered system designed to enhance road safety by detecting and responding to accidents in real-time. This project utilizes computer vision and deep learning techniques to analyze video input from cameras installed on roads, identify potential accidents, and trigger notifications to relevant authorities or emergency services.

## Table of Contents

- [Installation](#installation)
- [Screenshots of Outputs](#screenshots)
- [Additional Comments](#additional-comments)

## Installation

### Clone the Repository

Clone the SafeRoads repository to your local machine using the following command:
```bash
git clone https://github.com/sadiqebrahim/SafeRoads.git
```

Navigate to the root directory of the project
```bash
cd SafeRoads
```

### Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies for frontend:
```bash
npm install
```

### Backend Setup
Open a new terminal in the project's root directory and navigate to the backend directory:
```bash
cd backend
```

Install dependencies for backend:
```bash
pip install -r requirements.txt
```

### Run the Application
<b>Backend : </b><br/>
Open a new terminal in the project's root directory and navigate to the backend directory:
```bash
cd backend
```
Run the backend:
```bash
python app.py
```
The backend server will start at http://localhost:5000<br/><br/>
<b>Frontend : </b><br/>
Open a new terminal in the project's root directory and navigate to the frontend directory:
```bash
cd frontend
```
Run the frontend:
```bash
npm start
```
Now, you should be able to access the full application by visiting http://localhost:3000 in your web browser.


## Web Application Screenshots

### Home Page
![S1](https://github.com/sadiqebrahim/SafeRoads/blob/main/readme/home.png?raw=true)
### Live CCTV Page 
![S2](https://github.com/sadiqebrahim/SafeRoads/blob/main/readme/live-cctv.png?raw=true)
### Detect Accident Page
![S3](https://github.com/sadiqebrahim/SafeRoads/blob/main/readme/detect-accident.png?raw=true)


## Accident Detection Examples<br>
![S4](https://github.com/sadiqebrahim/SafeRoads/blob/main/readme/pred1.jpg?raw=true)<br/>
![S5](https://github.com/sadiqebrahim/SafeRoads/blob/main/readme/pred2.jpg?raw=true)<br/>
![S6](https://github.com/sadiqebrahim/SafeRoads/blob/main/readme/pred3.jpg?raw=true)<br/>

## Contributors
<b>1. [Sadiq Siraj Ebrahim](https://github.com/sadiqebrahim)</b> : Developed the  machine learning model for real-time accident detection utilizing computer vision and deep learning, complemented by detailed documentation.<br/>
<b>2. [Gourav Dutta](https://github.com/GouravDutta-01)</b> : Developed a user-friendly web application with React.js and Material UI and established a Flask server, facilitating seamless integration with the machine learning model for effective user-system communication.

## Additional Comments

**Notice:** This project is actively under development, and we welcome contributions from the community.

