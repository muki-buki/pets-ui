# Welcome to this amazing pet store project

Works in nodejs engines > 6.x.x.

To get started: 
```
  npm install
  npm start
```

This will build the production bundle and launch a local server listening to port 3000:[localhost:3000](http://localhost:3000)

# Development flow

```
  npm run dev:full
```

Here we run linting, build sass and bundle with the webpack development config and start the wepack-dev-server.
The changes to styles or typescript code would be hot loaded in the browser.

# Testing

In order to run the unit tests: 

```
  npm test
```

# State of the modules

Since I just did a fresh `npm install` that took a bit longer I checked node_modules folder:

```
$ ls node_modules | wc -l
718
```

```
$ du -sh node_modules
208M    node_modules
```

Ouch!

# Next

[] Create pet view

[] Connect with the java service (currently the pets are in memory)

[] Authentication

[] Shopping functionality

[] Sold pet deletion by admins
