# Angular Firebase ChatRoom

Multi-user chat room including Google and Twitter auth.
App made using Angular 8, with Firebase DB.

## Setup
    $ npm install

### Database
1. You should create your own Firebase project.
2. next enable/create a `Cloud Firestore` on the Database section (create database button)
3. when the creation finishes you should
create a collection called `chats` with a field called `message`.

*Credentials:* 
Also you need to add the credentials of your project on 
the file `src/environments/environment.ts`. 

To get the credentials of your Firebase project: 

1. go to project overview or project configuration.
2. click on `create web app` and follow the steps.
3. finally put the given `firebaseConfig` on `src/environments/environment.ts`.


### Authentication

#### Google
1. Go to your Firebase project and click on `Authentication`.
2. Click on `Access Methods`.
3. Go to `Google` and click on it.
4. Click on `enable` and then click on `save`.

#### Twitter

First you need to get your `apikey` and `secret api` from Twitter developers. 
Once you have that follow this steps.

1. Go to your Firebase project and click on `Authentication`.
2. Click on `Access Methods`.
3. Go to `Twitter` and click on it.
4. Click on `enable`.
5. Put your `apikey` and `secret api`
5. then click on `save`.

## Execution
    $ npm start
