# LittleManSim Architecture

## Overview

LittleManSim is an open-source simulator for the Little Man Computer (LMC), designed to help users understand fundamental computer architecture and assembly language programming. The project is divided into three main parts: the client, the server, and end-to-end (e2e) tests. Each part has its own structure and responsibilities.

## Project Structure

### Client

The client is a React-based web application that provides an interactive interface for simulating the LMC. It includes various components for displaying the state of the LMC, such as the accumulator, program counter, and mailboxes. The client also includes a code editor for writing LMC programs and controls for running, stepping through, and resetting the simulation.

- **Components**: The `src/components` directory contains reusable UI components, such as the `Accumulator`, `ProgramCounter`, `Mailbox`, `Output`, and `Input` components.
- **Pages**: The `src/pages` directory contains the main pages of the application, such as the `Simulator` page.
- **Store**: The `src/store` directory contains the Zustand store, which manages the state of the LMC simulation.
- **Utils**: The `src/utils` directory contains utility functions, including the LMC simulator implementation (`lmcSimulator.js`) and the LMC language registration for the Monaco editor (`lmcLanguage.js`).
- **Data**: The `src/data` directory contains predefined LMC programs that can be loaded into the simulator.
- **Helper**: The `src/helper` directory contains helper functions, such as `parseProgramHelper.js` for parsing and transforming LMC programs.

### Server

The server is a Node.js application that provides backend services for the LMC simulator. It uses Express for handling HTTP requests and Mongoose for interacting with a MongoDB database.

- **Config**: The `server/config` directory contains configuration files, such as the database configuration (`db.js`).
- **Controllers**: The `server/src/controllers` directory contains controller functions for handling business logic.
- **Middlewares**: The `server/src/middlewares` directory contains middleware functions for handling authentication and other tasks.
- **Models**: The `server/src/models` directory contains Mongoose models for interacting with the database.
- **Routes**: The `server/src/routes` directory contains route definitions for the API endpoints.
- **Services**: The `server/src/services` directory contains service functions for interacting with external APIs and other services.
- **Utils**: The `server/src/utils` directory contains utility functions, such as the LMC simulator implementation (`lmcSimulator.js`).

### End-to-End Tests

The e2e tests are written using Playwright and are used to test the entire application from the user's perspective. The tests are organized into fixtures, page object models (POM), and test files.

- **Fixtures**: The `e2e/src/fixture` directory contains fixtures for setting up the test environment.
- **POM**: The `e2e/src/pom` directory contains page object models for interacting with the application's UI.
- **Tests**: The `e2e/src/tests` directory contains test files that define the test cases.

## Key Features

- **Interactive Interface**: The client provides an interactive interface for simulating the LMC, allowing users to write, load, and run LMC programs.
- **Educational Tools**: The client includes integrated tutorials and examples to help users learn how to write LMC programs.
- **Visualization**: The client provides real-time visualization of the LMC's state, including the accumulator, program counter, and mailboxes.
- **Customization**: The LMC simulator can be customized and extended to support additional features and instructions.
- **Cross-Platform**: The application is designed to run on Windows, macOS, and Linux.

## Getting Started

To get started with LittleManSim, follow these steps:

1. **Clone the repository**: `git clone https://github.com/IbrahimAni/LittleManSim.git`
2. **Install dependencies**:
   - For the client: `cd client && npm install`
   - For the server: `cd server && npm install`
   - For the e2e tests: `cd e2e && npm install`
3. **Start the development servers**:
   - For the client: `npm run dev`
   - For the server: `npm run dev`
4. **Run the e2e tests**: `npm run test`

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
