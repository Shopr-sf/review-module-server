# UX Components

# Amazon Product Information & Pricing 

> An e-commerce site with the front-end of Amazon.com, and the backend of 10-million randomly generated data.

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

npm run create
- create mysql schema
npm run populate
- populate user table
npm run aggregate
- populate aggregates table
npm run dev
- start server and run webpack


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

## API endpoints

- /reviews/adduser (POST)
  - create a new record in users table providing "username" and "img"
- /reviews/updateuser (PUT)
  - update the record in users table providing "username", "img", and "id"
- /reviews/deleteuser (DELETE)
  - removes a record in users table providing "id"

### Installing Dependencies

npm install
    
