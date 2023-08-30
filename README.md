# GULP template

This is my GULP template for websites developing using SCSS preprocessor, CSS autoprefixer, font transpiler and minifiers of styles, scripts and images.

## Installation

⚠️ **_Important note:_ consider that you have installed [Node.js](https://nodejs.org/uk) and [GULP](https://gulpjs.com/) on your PC.**

To install all needed packages, run this command in the template folder:

```
npm i
```

Great! Now you're ready to develop! 🤩

## Usage

### Development

All development is conducted in the `src` folder.

To run a local server and start developing, use this command:

```
gulp
```

When the project will be loaded, you will be redirected to the browser. You will see something like this: 

![gulp-template page screenshot](https://github.com/firehawk89/gulp-template/assets/98012691/db3966dd-4d27-4876-8270-d033de166e4d)

Try to change something in the template code, for example in `index.html`, and you will see the results on the page in your browser. Cool, huh? 😃

### Build
You will also see that the `build` folder have appeared in your project directory.

![build folder](https://github.com/firehawk89/gulp-template/assets/98012691/68caf6af-43e7-4650-a6a4-d2482aa1ce29)

So when you change something in the `src` folder, result appears in the `build` folder immediately.

When you will finish the development, `build` folder will consist of all needed result files (i.e. minified code, images, transpiled fonts etc.)

⚠️ **_Important note:_ direct changes in the `build` folder won't be reflected on your page, and files even could change during next page reload after saving changes in the `src` folder, so consider changing files only in the `src` folder.**
