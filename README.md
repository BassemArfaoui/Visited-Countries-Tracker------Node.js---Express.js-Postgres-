
## Family Visited Countries Tracker

### Overview

This is a fun little project to track the countries your family has visited. Built with Node.js, Express.js, and PostgreSQL, it shows a world map where you can highlight the countries you've been to just by typing their names.

### Features

- **Add Family Members**: Keep track of visited countries for different family members.
- **Interactive Map**: See your travels light up on a world map.
- **Easy to Use**: Just type the name of the country, and it gets highlighted.
- **Reliable**: Uses PostgreSQL to store your data.

### Technologies Used

- **Node.js**: The backend stuff.
- **Express.js**: Helps with the web server part.
- **PostgreSQL**: Keeps all the data safe and sound.
- **JavaScript/HTML/CSS**: Makes it all look and work nicely.

### Getting Started

1. Clone the repo:
   ```
   git clone https://github.com/BassemArfaoui/Visited-Countries-Tracker------Node.js---Express.js-Postgres-.git
   ```
2. Go into the project folder:
   ```
   cd family-visited-countries-tracker
   ```
3. Install the needed stuff:
   ```
   npm install
   ```
4. Set up your PostgreSQL database using the provided SQL code or the CSV files in the repo.
5. Fill out the database connection details in the `index.js` file:
   - **user**: "postgres"
   - **host**: "localhost"
   - **database**: //the name of the created database
   - **password**: //the password of the postgres server
   - **port**:  5432
     





6. Start the web app:
   ```
   node index.js
   ```
   Or, if you prefer to use `nodemon` for automatic restarts:
   ```
   npm install -g nodemon
   nodemon index.js
   ```

### How to Use

- Add family members and start typing the names of the countries they've visited.
- Watch the world map highlight those places!
