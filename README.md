Project is at C:\Users\bkc\aalinks-vue

# AALINKS-VUE - A site for connecting with people through AA meetings (vue.js, Express.js)

## Source 
C:\Users\bkc\projects2020\aalinks-vue

## Prerequisites
- Node.js
- Mongo DB
- Vue.js
- Stripe - For donations

## Getting started
Follow these steps at the command line:

### 1. Run the solution
```bash
yarn serve
open new command window
cd server
npm start
```

### 2. About app
apiserver.js - loads files: data/newglobalMeetings.json and data/non_geo_globalLocations.json
             - files are a meetings file with each record containing a location id to the locations file
             - request for a radius to at lat,lng will filter locations for radius given and then filter meetings file for records with given location id

### 3. Run the solution
```bash
npm run start
```
## Troubleshooting
Please put bugs and feature request in here
