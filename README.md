Exploding Dragons - GameWeek 2014 
=================================


## HOW TO INSTALL AND INIT YOUR PROJECT ##

- Clone your repository from gitbucket.

- Make sure you have `Gulp` installed `Global inside your nodeJs` or make inside your terminal: 
    `npm install gulp -g`

- Make `npm install` inside `/root` of your project.

- Let the magic HAPPEN !

## RUN THE APPLICATION

`gulp` : It will build the application.


## File organisation
- `/` : root folder. 
    - `./GulpFile.js` : task runner
    - `./package.json` : node package( he will install all node dependencies)
    - `./src/` : will containe all , css , js sources files
        - `./js/` : js Sources
            - `./libs/` : externals libraries
            - `./puppetsModules/` : object controllers(they will instantiate some puppets entities)
            - `./Modules/` : containe events controller, our basics methodes and others config files
            - `./main.js` : our main js file, we start our code inside this file
        - `./styles/` : css files
            - `fonts/` : Appliction fonts
        - `./assets/` : Folder of assets as fonts...
            - `images/` : Folder who contains all images resources
    - `./views/` :
        - `index.html` : our index html page

## IGNORED FILES ##

- node_modules/
- build/



