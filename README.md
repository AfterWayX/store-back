## Installation

```bash
# install all dependencies
$ yarn
```
## Before running the app start the database server


```bash
# if not have docker app install him from this link https://docs.docker.com/desktop/install/mac-install/
# start database server command
$ docker-compose up
```
## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode // recomanded
$ npm run build
$ npm run start:prod
```

## Generate mock database from endpoint

```bash 
# type thic curl after start the app with database.
$ curl -X 'POST' \
  'http://localhost:6007/mock-generator?howMany=2500' \
  -H 'accept: */*' \
  -d ''
# wait for generating mock database aproximatively 2-5 minutes.
# after generating api is ready to use.
# go to https://github.com/AfterWayX/store, download repository and follow instructions from readme.md
```