This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).



```
personal-site/
  README.md
  node_modules/
  package.json
  gitignore.git
  public/
    index.html
    favicon.ico
  src/
    actions/
      index.js
    components/
      NavBar/
        ...
      Timeline/
        ...
      Todo/
        ...
      About.js
      Home.js
      Login.js
      ...
    data/
      timeline-data.json
    middleware/
      loggingMiddleware.js
      ...
    reducers/
      reducers.js (combines all the others)
      * other reducer js files *
    styles/
      *.css
    App.js
    App.test.js
    configureStore.js
    index.js
    Root.js
    types.js
    
```

TODO: 
* Update above with the correct file structure 
* Add error code to Login component
* Research how to obscure passwords for auth
* Integrate Login component with a backend
* Complete the following pages with content
  * Home
  * About
  * Timeline
* Create testing for site
