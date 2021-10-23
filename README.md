# Express Server For Close-Buy

## Getting Started

Create the .env by using .env.example as a reference: cp .env.example .env
Update the .env file with your correct local information

- username: labber
- password: labber
- database: close-buy
- Port etc...

Install dependencies: npm i

Fix to binaries for sass: npm rebuild node-sass

Reset database: npm run db:reset

Check the db folder to see what gets created and seeded in the SDB
Run the server: npm run local

Note: nodemon is used, so you should not have to restart your server
Visit http://localhost:8080/


