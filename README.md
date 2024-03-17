# Project Setup and Run Guide

This guide walks you through the steps to set up and run the project in a development environment, ensuring adherence to best practices.

## Prerequisites

Make sure the following software is installed on your machine:

- [Node.js](https://nodejs.org/en/) (version 20.11.1 or higher)
- [npm](https://www.npmjs.com/) (version 10.2.4 or higher)

## Clone the Repository

```bash
git clone https://github.com/awaisshahid965/users-manager.git
cd users-manager
```

## Install Dependencies

Navigate to the project directory and install the dependencies using the following command:

```bash
npm install
```

## Running Seed Script

Before running the seed script, ensure you have all the necessary dependencies installed. after that you can run:

```bash
npm run seed-admin-user
```

## Note: MongoDB Installation Required

Before running the seed script or starting the application, make sure you have MongoDB installed and running locally on your machine. If MongoDB is not installed, please install it from the [official MongoDB website](https://www.mongodb.com/try/download/community) before proceeding.


## Run the Application

Start the development server with the following command:

```bash
npm run dev
```

This command initiates the development server. Open your browser and go to `http://localhost:8000` to access the application.

## Directory Structure

The project directory structure is designed to provide organization and clarity, with each directory serving a specific purpose:

- **`adapters/`**: Contains setup files for integration with external systems or frameworks, such as Inversify Express integration and MongoDB configuration.

- **`container/`**: Houses configuration files for dependency injection containers, like Inversify configuration files.

- **`controller/`**: Stores controller files responsible for handling incoming requests from clients and interacting with services.

- **`middlewares/`**: Holds middleware components used for request processing, such as authentication middleware or error handling middleware.

- **`models/`**: Contains Mongoose models representing the data structure of the application, defining the schema for data stored in the database.

- **`repositories/`**: Contains repository logic following the service repository pattern for interacting with data sources, abstracting away the data access layer.

- **`schemas/`**: Houses schema definitions used for data validation, such as Zod schemas ensuring data integrity.

- **`seeds/`**: Contains scripts for generating initial entries or test data in the database, facilitating database seeding.

- **`services/`**: Contains service logic following the service repository pattern, encapsulating business logic and coordinating data operations.

- **`types/`**: Stores TypeScript types and enums used across the project, enhancing type safety and code clarity.

- **`utils/`**: Contains reusable functions and classes catering to various utility purposes, such as encryption utilities (Cipher) or authentication token management (AuthTokenManager).


## Contributing

I invite contributions from the community. Feel free to contribute by forking the repository, making improvements, and creating pull requests.

## License

This project is licensed under the [MIT License](LICENSE).