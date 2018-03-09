# TypeScript Node API seed

Super minimalistic yet fully functional TypeScript, NodeJS API starter project.

## Requirements

* Docker
* MongoDB
* NodeJS version 8+

## Run in Docker
```
$ docker-compose up
```
Check http://localhost:3000/

## Local development

### Installation

Install the dependencies and devDependencies and start the server.

```
$ git clone https://github.com/DmitriyNoa/typescript-nodejs-sample
$ cd typescript-nodejs-sample
$ npm install
```
### Running the project

Make sure that mongodb is running:
```
$ mongo
```
If connection is not established:
```
$ mongod --dbpath /path_to_your_data_folder
```
Run the project

```
$ npm run build
$ npm run start_local
```
App should be available now on http://localhost:8080/articles.

### Add some data to the project
Use POSTMAN to screate articles by sending POST request to http://localhost:8080/articles.
```
HEADERS:
[{"key":"Content-Type","value":"application/json","description":"","enabled":true}]
BODY:
{
	"price": {
		"price": 23,
		"discountPrice": 14
	},
	"name": "T-Shirt",
	"type": 0,
	"size": 1,
	"color": 3
}
```
