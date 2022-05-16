// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
    switch (license) {
        case "MIT":
            return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
        case "Mozilla-Public":
            return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
        case "Apache":
            return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
        case 'BSD 3-clause':
            return `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
        case 'Creative Commons':
            return `[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)`;
        case 'GNU-General-Public':
            return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
        case 'None':
            return `None`;
    }
}


// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
    switch (license) {
        case "MIT":
            return `(https://opensource.org/licenses/MIT)`;
        case "Mozilla-Public":
            return `(https://opensource.org/licenses/MPL-2.0)`;
        case "Apache":
            return `(https://opensource.org/licenses/Apache-2.0)`;
        case 'BSD 3-clause':
            return `(https://opensource.org/licenses/BSD-3-Clause)`;
        case 'Creative Commons':
            return `(http://creativecommons.org/publicdomain/zero/1.0/)`;
        case 'GNU-General-Public':
            return `(https://www.gnu.org/licenses/gpl-3.0)`;
        case 'None':
            return `None`;
    }
}


// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
    if (license === "None") {
        return "";
    } else {
        return `
    ${renderLicenseBadge(license)}
    Copyright (c) ${license}. All rights reserved.
    ${renderLicenseLink(license)}`
    }
}


function renderCreditsSection(credits) {
    if (credits === "None") {
        return "";
    } else {
        return `
    ## Credits
    
    ${credits}
    `
    }
}


// TODO: Create a function to generate markdown for README
// This does most of the heavy lifting for the template
function generateMarkdown(data) {
    const markdown =
        `# ${data.title}
    
## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Additional Info](#additional-info)

## Description
${data.description}

## Installation
${data.installation}

## Usage
${data.usage}

${renderCreditsSection(data.credits)}

## License
${renderLicenseSection(data.license)}

---

## Additional Info:
- Github: [${data.authorGit}](https://github.com/${data.authorGit})
`
    return markdown
}

module.exports = generateMarkdown;