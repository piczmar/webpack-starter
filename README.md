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


## 3. Source maps
 A disadvantage of Webpack is that it packs all the source code to a single file where it is hard to distinguish original code durign debugging.
 There is a way to fix it using source maps using `devtool` setting:
 * `source-map` Generate a complete, full featured source map in a separate file. This option has the best quality of source map, but it does slow down the build process.
 * `cheap-module-source-map` Generate source map in a separate file without column-mappings. Stripping the column mapping favors a better build performance introducing a minor inconvenient for debugging: The browser developer tools will only be able to point to the line of the original source code, but not to a specific column (or character).
 * `eval-source-map` Bundles the source code modules using “eval”, with nested, complete source map in the same file. This option does generate a full featured source map without a big impact on build time, but with performance and security drawbacks in the JavaScript execution. While it’s a good option for using during development, this option should never be used in production.
 * `cheap-module-eval-source-map` The fastest way to generate a source map during build. The generated source map will be inlined with the same bundled JavaScript file, without column-mappings. As in the previous option, there are drawbacks in JavaScript execution time, so this option is not appropriate for generating production-ready bundles.

We will updade [`webpack.config.js`](webpack.config.js) with this setting.


## 4. Dev server
Install dev server:
`npm install --save-dev webpack-dev-server`
Update [`webpack.config.js`](webpack.cofig.js) with `devserver` setting and [`package.json`](package.json) start command.

This will allow to run public content on small node.js express application and automatically refresh page in web browser when files are updated.
Now when you start application with `npm start` webpack server will run and print default url: `http://localhost:8080/` which you can open in browser.

## 5. Loaders
Loaders are useful for files transformation, e.g. with Babel loader ES6 version of JS can be transformed to older version ES5 which is supported by current browsers.
Loaders configuration is added in [`webpack.config.js`](webpack.config.js) and has the following options:
* test: A regular expression that matches the file extensions that should run through this loader (Required).
* loader:		The name of the loader (Required).
* include / exclude: Optional setting to manually set which folders and files the loader should explicitly add or ignore.
* query: The query setting can be used to pass Additional options to the loader.

### 5.1 Json Loader
We can install json loader to load text from separate json file:
`npm install --save json-loader`

Add configuration in [`webpack.config.js`](webpack.config.js):
```
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
```

### 5.2 Babel Loader

Babel is modular and distributed in different npm modules.
The core functionality is available in the “babelcore” npm package,
the integration with webpack is available through the “babel-loader” npm package,
and for every type of feature and extensions you want to make available to your code,
you will need to install a separate package (the most common are babel-preset-es2015
and babel-preset-react, for compiling ES6 and React’s JSX, respectively).
To install all at once as development dependencies, you can use:

```
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
```

Update  [`webpack.config.js`](webpack.config.js)  with Babel loader setup:

```
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
```

Now webpack configuration allows to use ES6 modules and syntax, as well as JSX (for React).
We can refactor JS code to use ES6 syntax.

Babel configuration can grow when the project grows and keeping it with webpack config may become cumbersome.
It is possible ot externalize it to [`.babelrc`](.babelrc)

## 5.3 Stylesheet loaders

* `css-loader` looks for `@import` and `url` statements to resolve them, it also supports [CSS modules](https://github.com/css-modules/css-modules) : _CSS files in which all class names and animation names are scoped locally by default._
* `style-loader` adds computed style rules to the page

Install:
```
npm install --save-dev style-loader css-loader
```

Then update  [`webpack.config.js`](webpack.config.js)  with Babel loader setup:

```
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules'
            }
```

`!` is used to chain multiple loaders for the same `test` definition

Next, create [main.css](app/main.css) and import it in our entry point [main.js](app/main.js).
Then create [hello.css](app/hello.css) and import it in [hello.css](app/hello.js).

## Credits
This project was created based on ["APPENDIX A"](http://www.pro-react.com/materials/appendixA/) from [Pro-React Book materials](http://www.pro-react.com/materials/)