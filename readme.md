# GoBarber ✂

Full-stack application developed during GoStack Bootcamp by <a href="https://www.rocketseat.com.br">Rocketseat</a>.

💇 Platform for registering Barber Shop professionals and consumers interested in their services.

Currently working in user Web interface first screens, as the one below (design by Rocketseat):

<img src="./readme-images/gobarber-screenshot.png" alt="Project screenshot">

## Built with

- Typescript
- Node.js
- React
- React Native (coming soon)
- PostgreSQL

## Libraries used so far

- Express
- Axios
- Styled-components
- React Icons
- Polished
- Unform
- Yup
- ESLint
- Prettier


## Requirements

- Node.js installed
- ESLint editor plugin
- Docker container with PostgreSQL
- Yarn


### Backend

To install all dependencies, navigate to backend folder and run:
```
yarn
```
When its done, run the migrations:
```
yarn typeorm migration:run
```

### Web

To install all dependencies, navigate to web folder and run:
```
yarn
```
To start the application, run:
```
yarn start
```


## License

This project is under the terms of <a href="https://opensource.org/licenses/MIT">MIT</a> license.
