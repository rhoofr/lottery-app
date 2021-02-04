# Lottery App

![Project start page](/img/lottery-app-preview.jpg)

> Lottery App - React frontend for tracking PowerBall and Mega Millions lottery tickets.

## Description

This application is used to track the Numbers Played, the Winning Numbers and Results of the drawings. Users can enter the ticket information in and after the drawings check the results. The Results show how many balls were matched and if the PB or Mega ball was matched and gives the current winnings. On the Results page the user can check which ticket the results are for. On the Numbers Played page the user can check all the results for a particular ticket and also edit or delete the ticket if necessary. On the Upcoming Jackpots page a user can get the next jackpots for the games.

There is a backend project that contains the API for this project. The frontend makes calls to the backend to get all the data. The backend project is listed below in Dependencies.

## Features

What information can a user obtain and store?

- Store lottery ticket information
- Check results of drawings
- Show results and the winning numbers for each drawing
- Provide results information on a particular ticket

## Technologies

- axios
- create-react-app
- immer
- jest and enzyme
- primereact
- react
- react-router-dom
- react-toastify
- react-tooltip
- others...

## Dependencies

- All packages listed in package.json
- The app looks for REACT_APP_BASE_BACKENDURL in the env vars for the backend.
- [lottery-app-api](https://github.com/rhoofr/lottery-app-api)
- The API project lists the other dependencies it requires

## Links

- Project homepage: https://github.com/rhoofr/lottery-app
- Related projects:
  - Backend API: https://github.com/rhoofr/lottery-app-api

## License

> You can check out the full license [here](https://github.com/rhoofr/lottery-app/blob/main/LICENSE)

This project is licensed under the terms of the **MIT** license.
