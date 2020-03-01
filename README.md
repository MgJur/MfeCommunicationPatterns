# BachelorProject

Please follow the instructions to initiate this project

(This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.22.)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md)

### How to Setup

- Start by cloning the project to your local machine

!Important: Checkout one of following branches for different types of Communication Patterns:

  1) Observer Pattern: `https://github.com/MgJur/MfeCommunicationPatterns/tree/develop/ObserverPattern`
  2) Publisher Subscriber Pattern: `https://github.com/MgJur/MfeCommunicationPatterns/tree/develop/PubSubPattern`
  3) Shared Database Pattern: `https://github.com/MgJur/MfeCommunicationPatterns/tree/develop/SharedDatabaseRxJsPattern`
  

- Once done Cd into the project Folder

1. Run `npm i` to install all node modules

2. Build the Microfrontend's with: `npm run build:all` to your dist folder
  - (Optional build single Microfrontends with :`npm run build:mfe1`)

3. Serve the builded dist folder with `npm run serve:dist` 
  - (port will be 8080 for all JS - Files of the Microfrontend's)

4. Serve the host app with `npm run serve:host` to serve the container application
  - (standart port for the host app will be `localhost:4200/`)
  
5. Open your browser on `localhost:4200/`

(Hint: Open Developer Tools and disable Cache. Otherwise pictures will get cached)


