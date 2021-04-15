# VBI Music app

## Hosted application link

Here is the deployed running app [link] for given task. In case of running the code in local machine please follow the instructions provided in the Installation section

## Users

- username - s@s.s
- password - s

--------------

## Installation

- ### .env file setup

    Create an `.env` file in the root folder of the project and add the following vars as mentioned below
     1. PORT = 3001
     2. NODE_ENV = development
     3. DATABASE_URL = `<mongodb connection url>`
     4. SESSION_SECRET = 8dc8ec2963a4ea4adda9e8575f1124180255316df44b821333
     5. SESSION_EXPIRY_TIME_IN_MINS = 10
     6. HASH_ROUND = 10

- ### mongoDB setup

    1. Please ensure you have mongoDB 3.6 or above installed in your local machine.
    2. Open `.env` file in the root of the project and update the `DATABASE_URL` with db connection url
    3. Please ensure that `DATABASE_URL` has the collection name as well.

- ### Data setup

    Once the above mentioned mongoDB setup is done, run the `npm run dataseed`. If you would like to add more data to the any collection, open the collection script file in the `./scripts/seeding/collection_data` folder and add the data as you wish.

- ### Build

    Please run the build command `npm run build`

- ### Start

    Please run the start command `npm run start` and open `http://localhost:3001/`

--------------

## Logouts

- Below mentioned cases where the logout would happen
    1. By default the session would expire in 10 mins, irrespective of idleness.
    2. Although the session touching or session extension can be implemented, extending the session on different page is not implemented.
    3. As this is a SPA, on refreshing the page after login in home page will logout the user.

[link]: <https://vbimusic-ind.herokuapp.com/>
