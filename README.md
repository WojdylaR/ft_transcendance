# FT_TRANSCENDENCE

## Overview

### Create a website where users can play Pong with each others.

- Website backend must be written in NestJS.
- Website frontend must be written with a TypeScript framework of our choice.
- Free to use any library in this context but it must be the latest stable version.
- Website database must be PostgreSQL.
- Wbsite must be a single-page application. The user should be able to use the Back and Forward buttons of the browser.
- Website must be compatible with the latest stable up-to-date version of: Google Chrome/Firefox/Safari.
- The user should encounter no unhandled errors and no warnings when browsing the website.
- Everything has to be launch by a single call to: docker-compose up --build.

### Security concerns

- Any password stored in your database must be encrypted.
- Your website must be protected against SQL injections.
- You must implement some kind of server-side validation for forms and any user input.

### User Account

- The user must login using the OAuth system of 42 intranet.
- The user should be able to upload an avatar. If the user doesn't, a default one must be set.
- The user should be able to choose a unique name that will displayed on the website.
- The user should be able to enable two-factor authentication. For instance, Google Authenticator or sending a text message to their phone.
- The user should be able to add other users as friends and see their current status (online, offline, in-game, and so forth).
- Stats (wins and losses, ladder level, achievements, and so forth) have to be displayed on the user profile.
- Each user should have a Match History, including 1v1 games, ladder, and anything else useful. Anyone who is logged in should be able to consult it.

### Chat

- The user should be able to create channels (chat rooms) that can be either public, or private, or protected by a password.
- The user should be able to send direct messages to other users.
- The user should be able to block other users. This way, they will see no more messages from the account they blocked.
- The user who has created a new channel is automatically set as the channel owner until they leave it.
- The channel owner can set a password required to access the channel, change it, and also removed it.
- The channel owner is a channel administrator. They can set other users as administrators.
- The admins of a channel can ban or ;ute users for a limited time.

### Game

- Users should be able to play Pong versus another player directly on the website.
- There must be a matchmaking system: the user can join a queue until they get automatically matched with someone else.
- It can be a canvas game, or it can be a game rendered in 3D, it can also be ugly, but in any case, it must be faithful to the original Pong (1972).
- You must offer some customization options (for example, power-ups or different maps). However, the user should be able to select a default version of the game without any extra features if they want to.
- The game must be responsive.
- The user should be able to watch a live play between other users without interfering with it.

# References

## TypeScript framework

- React
- Angular
- Vuejs
- https://www.quora.com/What-are-good-frameworks-for-front-end-development-written-in-Typescript

## Postgres

https://www.postgresqltutorial.com/
https://nanonets.com/blog/pdf-to-database/
https://typeorm.io/
https://nanonets.com/
https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f


## Database

### Channel
int id NOT NULL
char type NOT NULL
char name NOT NULL
bool requirePassword NOT NULL
char password
char lastMessage
timastamp modifiedDate NOT NULL
timestamp creationDate NOT NULL
bool isDirect NOT NULL
int ownerId

### Channel_Ban_User
int id NOT NULL
date to NOT NULL
int channelId
int userId

### Channel_Mute_User
int id NOT NULL
date to NOT NULL
int channelId
int userId

### Blocked_users
int userId_1 NOT NULL
int userId_2 NOT NULL

### Channel_Admin_users
int channelId NOT NULL
int userId NOT NULL

### Channel_user_users
int channelId NOT NULL
int userId NOT NULL

### Friend_request
int id NOT NULL
char status NOT NULL
int creatorId
int receiveId

### Invitation_link
int id NOT NULL
char path NOT NULL
int channelId

### matchHistory
int id NOT NULL
timestamp time NOT NULL
int winnerScore NOT NULL
int looserScore NOT NULL
char gameOptions
bool looserDisconnected
int winnerId
int looserId

### Message
int id NOT NULL
char content NOT NULL
int userId
int channelId

### pending_channels_users
int channelId NOT NULL
int userId NOT NULL

### Users
int id NOT NULL
char username NOT NULL
char password
char is_admin NOT NULL
bool is_blocked NOT NULL
char avatar NOT NULL
int score
char status NOT NULL
bool isTwoFactorAuthentificationEnabled NOT NULL
char twoFactorAuthentificationSecret
char displayname NOT NULL
int wins NOT NULL
int loses NOT NULL
char roomId NOT NULL

## GAME

https://www.youtube.com/watch?v=w6EIMfJmpZ4

## Docker

https://docs.docker.com/compose/gettingstarted/
https://www.educative.io/blog/docker-compose-tutorial

## Useful commands

sudo aa-remove-unknown

### Delete all containers:
docker rm -f $(docker ps -a -q)

### Delete all volumes:
docker volume rm $(docker volume ls -q)

### Delete all images:
docker rmi -f $(docker images -aq)

https://docs.docker.com/compose/extends/
https://serversforhackers.com/dockerized-app/compose-separated

## 42 Auth

https://www.npmjs.com/package/passport-42
https://api.intra.42.fr/apidoc

## Authentification & Double Authentification

https://arctype.com/blog/nestjs-2fa/
https://www.nerd.vision/post/nestjs-third-party-oauth2-authentication
https://docs.nestjs.com/security/authentication#authentication
https://tushar-chy.medium.com/2fa-in-nestjs-application-777b543faff5

## NestJS

https://www.youtube.com/watch?v=F_oOtaxb0L8
https://x-team.com/blog/storing-secure-passwords-with-postgresql/
https://blog.crunchydata.com/blog/preventing-sql-injection-attacks-in-postgresql
https://docs.nestjs.com/techniques/http-module
https://docs.nestjs.com/websockets/gateways
https://docs.nestjs.com/providers