// TODO: Include packages needed for this application
// DONE
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
// Include collaborators question, where it starts to prompt about collaborators
const questions = [{
        type: 'input',
        name: 'title',
        message: 'Please input the title of your project (Required)',
        validate: title => {
            if (title) {
                return true;
            } else {
                console.log("Must enter a project title:");
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'title',
        message: 'Please input the title of your project (Required)',
        validate: title => {
            if (title) {
                return true;
            } else {
                console.log("Must enter a project title:");
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please describe your project (Required)',
        validate: description => {
            if (description) {
                return true;
            } else {
                console.log("Must enter a description of the project:");
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please describe how to install the project (Required)',
        validate: installation => {
            if (installation) {
                return true;
            } else {
                console.log("Must enter installation protocol:");
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How do you use your project? (Required)',
        validate: usage => {
            if (usage) {
                return true;
            } else {
                console.log("Must describe the usage of project:");
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'testing',
        message: 'Please describe how you test this project (Required)',
        validate: testing => {
            if (testing) {
                return true;
            } else {
                console.log("Must describe the testing of project:");
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How do you use your project? (Required)',
        validate: usage => {
            if (usage) {
                return true;
            } else {
                console.log("Must describe the usage of project:");
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'authorGit',
        message: 'Please input your GitHub account username (Required)',
        validate: authorGit => {
            if (authorGit) {
                return true;
            } else {
                console.log("Must enter a GitHub account:");
                return false
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please choose a license for your project (Required)',
        choices: [
            'MIT',
            'Apache',
            'BSD 3-clause',
            'Creative Commons',
            'Mozilla-Public',
            'GNU-General-Public',
            'Common-Development-and Distribution',
            'None'
        ],
        validate: authorGit => {
            if (authorGit) {
                return true;
            } else {
                console.log("Must pick a licensing option");
                return false
            }
        }
    },
    {
        type: 'confirm',
        name: 'includeCollaborators',
        message: 'Include collaborators?',
        default: false
    },

];


const collaboratorQuestions = [{
        type: 'input',
        name: 'collaboratorName',
        message: 'Name of collaborator:',
        validate: collaboratorName => {
            if (collaboratorName) {
                return true;
            } else {
                console.log("Must enter the collaborator name:");
                return false
            }
        }
    },
    {
        type: 'confirm',
        name: 'includeAnotherCollaborator',
        message: 'Include another collaborator?',
        default: false
    },
]

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    // Takes the input we get from prompt and then write it to the file
    // Gonna wanna format the file a bit with the markup stuff from GitHub
    // I think this will use the generateMarkdown.js file to actually populate the README
    return new Promise((resolve, reject) => {
        fs.writeFile(`./${fileName}`, data, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'File created!'
            });
        })
    });
}

// TODO: Create a function to initialize app
function init() {
    // This is probably what actually does the prompts
    // Passes the data from the prompts to the writeToFile method
    inquirer.prompt(questions)
        .then(answers => {
            console.log(answers);
            writeToFile('README.md', generateMarkdown(answers));
        });
}

// inquirer.prompt([{
//         type: 'input',
//         name: 'test',
//         message: 'PLease Work?',
//         validate: (test) => {
//             if (test) {
//                 console.log(test);
//                 return true;
//             } else {
//                 console.log("MUST TEST");
//                 return false;
//             }
//         }
//     },
//     {
//         type: 'input',
//         name: 'test2',
//         message: 'PLease WOrk NOWWW?',
//     }
// ]).then(answer => console.log(answer));

// Function call to initialize app
init();