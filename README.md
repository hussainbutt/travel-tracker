# Travel Tracker App 🌍

This **Express** and **EJS**-based application helps you easily track the countries you've visited. Add, view, and manage the countries you've explored, all in one place!

## Features ✨
- Add new countries to your travel list
- View all the countries you've visited
- Edit or remove countries from your list
- User-friendly interface with EJS templating
- Data is stored and managed using PostgreSQL

## Tech Stack 🛠
- **PostgreSQL** – for the database
- **Express** – for backend logic and API handling
- **EJS** – for server-side rendering of HTML

## Installation 🛠

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/travel-tracker-app.git
   cd travel-tracker-app
   ```

2. Install server dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL database with the provided schema.

4. Run the app:
   ```bash
   npm run dev
   ```

## Database Setup 🗄

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE travel_tracker;
   ```

2. Use the schema provided in `/database/schema.sql` to set up the tables.

## Usage 🖥
- Open your browser and navigate to `http://localhost:3000`.
- Start adding the countries you've visited to your personal travel list.
- Edit or delete entries as needed.

## Contributing 🤝
Feel free to submit a pull request or open an issue if you'd like to contribute to this project.

## License 📄
This project is licensed under the MIT License.
