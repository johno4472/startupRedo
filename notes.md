# CS 260 Notes

[My startup](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## Getting Started Notes

[Getting started notes](https://github.com/johno4472/startupRedo/blob/main/gettingStarted.md)

## AWS Notes

- Terminal command to ssh into server -> ssh -i ./winter2025keyPair.pem ubuntu@54.227.117.64 (ip address at end may change)
- git clone https://github.com/webprogramming260/simon-css.git <- way to clone

## HTML Notes

- ./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s startup <- deploy terminal command

## Node.js Notes
- Node.js not a language, runtime that allows me to run javascript on a server
- type 'node' into the command line to demo editing in node (code in javascript) 
- I can make a variable accessible to anywhere in the code with global (global.luckyNum = 23")
- Q: What is the significance of all the stuff in the package.json file?
- Node.js forces you to use good structure in project setup

## React Notes

- Q: What is vite?
- To deploy React: ./deployReact.sh -k <yourpemkey> -h consistandsee.com -s startup
- Q: It says I need to show stubbed components of the main pieces of my application. What is a stubbed piece?
- React is a JavaScript Library for building out user interfaces
- React uses single page application (so all different pages loaded onto one page when called)
- A functional component is a component that returns html to be inserted
- JSX is HTML infused with JavaScript, like inputting variables dynamically to be displayed. This can't be read by a browser, so it's transpiled to JavaScript and HTML
- Component LifeCycle - Mounting -> Updating -> Unmounting
- Event listeners are waiting for user to do something, like onSubmit
- I can type "code ." in the terminal to open my IDE
- Use NPM to install vite as a package
- "npm init -y" turns project into npm package
- Q: What does the DOM represent?
- npm run dev to open server
- when in server, "o" + enter opens browser

## Service Notes

- To run server, go to server root directory and run node index.js
1. Add service directory
2. Set up npm project (with "npm init -y") and install express (with "npm install express") in service directory root

