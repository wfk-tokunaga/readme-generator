const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const { questions, collaboratorQuestions } = require('./questions');

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