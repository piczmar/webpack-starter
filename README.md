This is a minimal project demonstrating Webpack features

## What is Webpack?
Webpack is a module bundler - a tool that can analyze your project's structure, find JavaScript modules
and other assets to bundle and pack them for the browser.
It is much different than task runners and build tools like Grunt or Gulp, which look into configuration file first to discover files on which they operate.
Webpack needs only one file which is an entry point to discover all other module dependencies withing a project.

## Instaling Webpack
You can install it with npm:

1. init npm project
```npm init```

2. install Webpack
``` npm install --save-dev webpack```

## Create basic structure
app - in this folder we will keep JS sources
public - in this folder we will keep static content.

NOTE:  Webpack only supports the commonJS module definition out of the box (i.e. require).
    Using ES6 modules with webpack will be possible with Babel.

## 1. First run
```node_modules/.bin/webpack app/main.js public/bundle.js```

This will create file public/bundle.js which is included in public/index.html
Now open index.html and you should see:

Hello Webpack!!
