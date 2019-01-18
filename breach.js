// import chalk from 'chalk';
// import inquirer from 'inquirer';
// import request from 'request';

const chalk = require('chalk');
const inquirer = require('inquirer');
const request = require('request');



const question = chalk.bold.whiteBright;
const choice1 = chalk.red("Check email address breaches");
const choice2 = chalk.yellow("Check email address pastes");




function start() {

    inquirer

        .prompt({

        name: "action",
        type: "list",
        message: question("Hola Mike, what are we checking for today??"),
        choices: [choice1, choice2]

        //more choices to be added for password checking later

    })

    .then(function(answer) {

        switch (answer.action) {

            case choice1:
                console.log(`API call for email address checking`);
                emailCheck();
                break;


            case choice2:
                console.log('API call for paste checking');
                break;

            default:
                console.log(`nothing seems to match`);

        }; //end switch





    }); //end then



}; //end of start


function emailCheck() {





}


start();