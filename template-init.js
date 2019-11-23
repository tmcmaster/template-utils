#!/usr/bin/env node

const replace = require('replace-in-file');
const prompts = require('prompts');

// noinspection JSUnresolvedVariable
const [,, ...args] = process.argv;

const componentName = 'component-name';

const userInitialValues = {
    'authorName': 'Tim McMaster'
};

const defaultInitialValues = {
    'packageName': '@wonkytech',
    'componentName': 'tm-test',
    'componentDescription': 'Web Component to...',
    'authorName': 'User Name',
    'license': 0
};

const LICENSES = [
    { title: 'None', value: '' },
    { title: 'MIT', value: 'MIT' }
];

function getLicenseIndex(license) {
    let index = 0;
    LICENSES.forEach((item, i) => {
        if (item.value === license) {
            index = i;
        }
    });
    return index;
}


(async () => {
    let response = {...defaultInitialValues, ...userInitialValues};
    let confirm = {completed: false};
    while (confirm.completed !== true) {

        response = await prompts([
            {
                type: 'text',
                name: 'packageName',
                message: 'Package Name:',
                initial: response.packageName
            },
            {
                type: 'text',
                name: 'componentName',
                message: 'Component Name:',
                initial: response.componentName
            }, {
                type: 'text',
                name: 'componentDescription',
                message: 'Description of Component:',
                initial: response.componentDescription
            }, {
                type: 'text',
                name: 'authorName',
                message: 'Your Name: ',
                initial: response.authorName
            }, {
                type: 'select',
                name: 'license',
                message: 'License: ',
                choices: LICENSES,
                initial: getLicenseIndex(response.license)
            },
        ]);

        console.log(response);

        delete confirm.completed;

        confirm = await prompts({
            type: 'confirm',
            name: 'completed',
            message: 'Good to go?',
            initial: true
        });
    }



    // => response => { username, age, about }
})();


//
// const options = {
//     files: ['README.md'],
//     from: /template-web-component/g,
//     to: '${component-name}',
// };
//
// console.log('Args: ', args);
// console.log('Options: ', options);
// console.log('Component Name: ', componentName);
