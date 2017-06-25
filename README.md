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

## 2. Webpack configuration file

Instead of using Webpack from command line like above it is more useful to create a configuration file and use npm to do it automatically.
Let's create [`webpack.config.js`](webpack.config.js) in root of the project and add task for npm to execute webpack - update [package.json](package.json) and add:
```
 "scripts": {
 "start": "node_modules/.bin/webpack"
 },
```

Now you can run webpack with:
`npm start`


## 3.Source maps
 A disadvantage of Webpack is that it packs all the source code to a single file where it is hard to distinguish original code durign debugging.
 There is a way to fix it using source maps using `devtool` setting:
 * `source-map` Generate a complete, full featured source map in a separate file. This option has the best quality of source map, but it does slow down the build process.
 * `cheap-module-source-map` Generate source map in a separate file without column-mappings. Stripping the column mapping favors a better build performance introducing a minor inconvenient for debugging: The browser developer tools will only be able to point to the line of the original source code, but not to a specific column (or character).
 * `eval-source-map` Bundles the source code modules using “eval”, with nested, complete source map in the same file. This option does generate a full featured source map without a big impact on build time, but with performance and security drawbacks in the JavaScript execution. While it’s a good option for using during development, this option should never be used in production.
 * `cheap-module-eval-source-map` The fastest way to generate a source map during build. The generated source map will be inlined with the same bundled JavaScript file, without column-mappings. As in the previous option, there are drawbacks in JavaScript execution time, so this option is not appropriate for generating production-ready bundles.

We will updade [`webpack.config.js`](webpack.config.js) with this setting.