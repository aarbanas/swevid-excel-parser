[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/)


# Introduction

This is a small Angular Electron app used for parsing Excel files to be compatible
with SWEVID swimming software maintained by Croatian Swimming Federation ([HPS](https://www.hrvatski-plivacki-savez.hr/)). 
Application is converting one Excel file with next entries to Access data model needed
for SWEVID:
1. Swimmer name
2. Swimmer date of birth
3. Swimmer sex
4. Disciplines swimmer is swimming for specified competition
5. Swimming competition

## Getting Started

### Usage
From the page "Releases" download the latest version of application for your operating 
system. Application is build in portable version so there is no need for any installations.

### Local setup and development
To application to run locally Node needs to be installed, everything else comes with
application.
1. Clone project 
2. Install dependencies
```shell
$ npm install
$ cd app/
$ npm install
```
3. Run locally from root folder
```shell
$ npm run start
```


