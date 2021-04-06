# Mutant Radar API

Analyze some DNA and recruit your new mutants.

[Live Swagger](https://mutant-radar.herokuapp.com/mutantradar/v1/api-docs)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installing

1. Create a new database in `mysql`
   ```sql
   CREATE DATABASE mutantrad
   ```
2. Clone the repo
   ```sh
   git clone -b master https://github.com/xtVito/mutant-radar.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create `dev.env` into root projec, paste the following variables and change username/password for yours
   ```env
    PORT = 3000
    TYPEORM_CONNECTION = mysql
    TYPEORM_HOST = 127.0.0.1
    TYPEORM_PORT = 3306
    TYPEORM_DATABASE = mutantrad
    TYPEORM_USERNAME = YOUR_USERNAME_DATABASE
    TYPEORM_PASSWORD = YOUR_PASSWORD_DATABASE
    TYPEORM_SYNCHRONIZE = true
    TYPEORM_LOGGING = false
    TYPEORM_ENTITIES = src/modules/**/*.entity.ts
   ```
5. Execute
   ```sh
   npm run dev
   ```

## Usage

For access to all enpoint use the prefix /mutantradar/v1/genome

`POST` /mutant

`GET` /stats

Go to http://localhost:3000/mutantradar/v1/api-docs for all details

## Running the tests

Create `test.env` into root project and paste same `dev.env` variables into this, optional create other database for testing exclusive

### Execute tests

   ```sh
   npm run test
   ```

### Create coverage

   ```sh
   npm run test:coverage
   ```

## Built With

* [NodeJS](https://nodejs.org/es/) - Framework
* [Swagger](https://swagger.io/) - Documentation API generator
* [Jest](https://jestjs.io/) - Testing framework
* [TypeScript](https://www.typescriptlang.org/) - Language

## Authors

* **[iLmer](https://ilmer.dev/)** - *Initial work* - [xtVito](https://github.com/xtVito)

See also the list of [contributors](https://github.com/xtVito/mutant-radar/contributors) who participated in this project.
