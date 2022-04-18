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
        message: 'Name of collaborator (Required)',
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
        name: 'another',
        message: 'Include another collaborator?',
        default: false
    },
]

function writeToFile(fileName, data) {
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

const promptCollaborators = (projectData) => {
    if (!projectData.credits) {
        projectData.credits = [];
    }

    console.log(`

    =====================
     Add a Collaborator!
    =====================

    `);
    return inquirer.prompt(collaboratorQuestions)
        .then(collaboratorData => {
            projectData.credits.push(collaboratorData.collaboratorName);
            return collaboratorData.another ? promptCollaborators(projectData) : projectData;
        });
}

// let projectData = {};
// promptCollaborators(projectData).then(res => { console.log(res) });

function init() {
    // Passes the data from the prompts to the writeToFile method
    inquirer.prompt(questions)
        .then(answers => {
            if (answers.includeCollaborators) {
                promptCollaborators(answers)
                    .then(response => writeToFile('README.md', generateMarkdown(response)));
            } else {
                writeToFile('README.md', generateMarkdown(answers));
            }
        });
}

// Function call to initialize app
init();