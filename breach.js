// import chalk from 'chalk';
// import inquirer from 'inquirer';
// import request from 'request';

const chalk = require('chalk');
const inquirer = require('inquirer');
const axios = require('axios');
const cTable = require('console.table');
const numeral = require('numeral');
const BreachTableObject = require('./breachTableObject.js');
const pasteModelBreach = require('./breachTableObject.js');
const sha1 = require('sha1');



const question1 = chalk.bold.whiteBright("Hola Mike, what are we checking for today??");
const question2 = chalk.bold.whiteBright("Whats the email address we are checking for??");
const question3 = chalk.bold.whiteBright("Whats the email address we are checking pastes for??");
const choice1 = chalk.red("Check email address breaches");
const choice2 = chalk.yellow("Check email address pastes");
const choice3 = chalk.cyan("Check passwords");
const choice4 = chalk.magenta('Check if a password has been breached')


function start() {

    inquirer

        .prompt({

        name: "action",
        type: "list",
        message: question1,
        choices: [choice1, choice2, choice4]

        //more choices to be added for password checking later

    })

    .then(function(answer) {

        switch (answer.action) {

            case choice1:
                emailCheck();
                break;


            case choice2:
                pasteCheck();
                break;

            case choice3:
                passwordCheck();





            default:
                console.log(`nothing seems to match`);

        }; //end switch





    }); //end then



}; //end of start


function emailCheck() {

    inquirer

        .prompt({

            name: "email",
            type: "input",
            message: question2,
            validate: function(answer) {

                    return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/gi.test(answer);

                } //end of validation



        }) //end of prompt

    .then(function(answer) {

        axios({

            method: 'get',
            url: `https://haveibeenpwned.com/api/v2/breachedaccount/${answer.email}`,
            headers: { 'User-Agent': `Mike's JS CLI` },
            timeout: 1000,

        })

        .then(function(response) {


                let tableObjectArr = [];
                let dataClasses = [];

                for (i = 0; i < response.data.length; i++) {

                    let data = response.data[i];
                    let tableObject = new BreachTableObject(data.Name, data.BreachDate, numeral(data.PwnCount).format('0,0'), data.IsVerified, data.IsFabricated)

                    tableObjectArr.push(tableObject);


                };

                console.log(chalk.bold.red(`There have been the following ${response.data.length} breaches of ${answer.email}:`));
                console.table(tableObjectArr);
                console.log(chalk.bold.blue(`The following data types were exposed:`));

                for (i = 0; i < response.data.length; i++) {

                    console.log(chalk.underline.bold.blue(`${response.data[i].Name}:`), chalk.bold.cyan(`${response.data[i].DataClasses.join()}`));
                };




            })
            .catch(function(error1) {

                console.log(chalk.underline.yellow(`Lucky you, ${answer.email} has no registered breaches!`))
                console.log('Error: ', error1.message);

            })




        //end of axios call







    }); //end of then emailCheck

}; //end of emailCheck

function pasteCheck() {

    inquirer

        .prompt({

            name: "email",
            type: "input",
            message: question3,
            validate: function(answer) {

                    return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/gi.test(answer);

                } //end of validation



        }) //end of prompt

    .then(function(answer) {

        axios({

                method: 'get',
                url: `https://haveibeenpwned.com/api/v2/pasteaccount/${answer.email}`,
                headers: { 'User-Agent': `Mike's JS CLI` },
                timeout: 1000,

            })
            .then(function(response) {

                let tableObjectArr1 = [];

                for (i = 0; i < response.data.length; i++) {

                    let data = response.data[i];
                    let tableObject1 = new pasteModelBreach(data.Source, data.Title, data.Date, numeral(data.EmailCount).format('0,0'));

                    tableObjectArr1.push(tableObject1);

                }

                console.log(chalk.bold.red(`There have been the following ${response.data.length} breaches of ${answer.email}:`));
                console.table(tableObjectArr1);
                console.log(chalk.underline.blue("**************************************"));



            })
            .catch(function(error2) {

                console.log(chalk.underline.yellow(`Lucky you, ${answer.email} has no registered pastes!`))
                console.log('Error: ', error2.message);

            })




        //end of axios call







    }); //end of then emailCheck

};

function passwordCheck() {




    console.log(`to be built`);



};












start();