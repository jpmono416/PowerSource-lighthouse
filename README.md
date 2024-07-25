# Lighthouse

<p align="center">
  <img src="https://github.com/user-attachments/assets/732e1c3f-6a07-4180-b88b-df2eaf50a1f4" alt="Powersource Logo" style="max-width: 100%; width: 700px;">
</p>

Lighthouse is a cutting-edge web application designed to serve as a comprehensive repository or library of Large Language Models (LLMs). It aims to provide easy access to a wide range of LLMs for developers, researchers, and enthusiasts interested in exploring and utilizing the capabilities of advanced language models. Lighthouse leverages the power of React for its frontend development, ensuring a responsive and user-friendly interface, while the backend is powered by Express and Node.js, offering robust and scalable server-side functionality. The application's data is stored and managed in a PostgreSQL database, ensuring efficient data handling and retrieval.

## Features

-   **Extensive Library of LLMs**: Access a wide variety of Large Language Models, ranging from general-purpose models to specialized ones tailored for specific tasks.
-   **Interactive Playground**: Experiment with different LLMs directly through the web interface, allowing users to test and compare the performance of various models.
-   **Comprehensive Documentation**: Each LLM comes with detailed documentation, including usage examples, limitations, and performance metrics.
-   **Community Contributions**: Users can contribute by adding new models, providing additional documentation, and sharing usage examples.
-   **Advanced Search**: Easily find models by name, category, or capability using the advanced search feature.
-   **User Accounts**: Create and manage user accounts to save favorite models, track usage, and participate in the community.

## Technology Stack

-   **Frontend**: React.js
-   **Backend**: Express.js, Node.js
-   **Database**: PostgreSQL
-   **Authentication**: JWT for secure user authentication and authorization.
-   **API**: RESTful API design for efficient communication between the frontend and backend.

## Getting Started

To get started with Lighthouse, follow these steps:

### 1. **Clone the Repository**

```bash
git clone https://github.com/jpmono416/PowerSource-lighthouse.git
```

### 2. Install Dependencies

```bash
cd web-api
npm install

cd lighthouse-ui
npm install
```

### 3. Set Up the Database

Ensure PostgreSQL is installed and running on your system. Create a database named lighthouse and run the provided SQL scripts to set up the tables.

```SQL
CREATE TABLE "student"."powersource_llm" (
id SERIAL PRIMARY KEY,
type TEXT,
name TEXT,
organization TEXT,
description TEXT,
created_date DATE,
url TEXT,
datasheet TEXT,
modality TEXT,
size TEXT,
sample TEXT,
analysis TEXT,
dependencies TEXT,
included TEXT,
excluded TEXT,
quality_control TEXT,
access TEXT,
license TEXT,
intended_uses TEXT,
prohibited_uses TEXT,
monitoring TEXT,
feedback TEXT,
model_card TEXT,
training_emissions TEXT,
training_time TEXT,
training_hardware TEXT,
adaptation TEXT,
output_space TEXT,
terms_of_service TEXT,
monthly_active_users TEXT,
user_distribution TEXT,
failures TEXT,
perceived_business_value TEXT,
business_readiness TEXT
);
 
 
CREATE TABLE student.powersourcce_users (
id SERIAL PRIMARY KEY,
username  TEXT NOT NULL,
email     TEXT NOT NULL,
password  TEXT NOT NULL,
roles     TEXT[]
);
```

### 4. Run the Application

Start the backend server:

```bash
cd web-app
npm run start
```

> If running on windows, the command is `npm run start-win`

In a new terminal, start the frontend application:

```bash
cd lighthouse-ui
npm run dev
```

You should provide an adequate .env.dev (for BE) and .env.development (FE) file with environment variables containing your DB connection details, URLs for both back and frontend services, and any other necessary configurations. The name list of the environment variables is:

-   SERVER_PORT
-   SERVER_HOST
-   CLIENT_URL
-   DB_PORT
-   DB_NAME
-   DB_HOST
-   DB_USER
-   DB_PASS
-   VITE_APP_API_ROOT (FE only)

The Lighthouse application should now be running on http://localhost:3000 for the backend and http://localhost:5173/ for the frontend.

### Contributing

This project has been developed as part of the DF ft. HorizonX Hackathon, by Team PowerSource. Please refer to the collaborators of this project for any queries.
