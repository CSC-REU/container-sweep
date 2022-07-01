const {updateCriteria, restartApp} = require('../lib/util');

const config = require('config');

exports.command = 'kill <range>';
exports.desc = 'Cleans up docker containers used by Docable.';

exports.builder = yargs => {
    yargs.options({
        'name': {
            describe: 'The name criteria of containers to delete.',
            default: '*',
            type: 'string'
        },
        'age': {
            describe: 'The age criteria of containers to delete.',
            default: 0,
            type: 'number'
        }
    });
};

exports.handler = async arguments => {
    config.name = arguments.name;
    config.age = arguments.age;
    config.range = arguments.range;
    updateCriteria(config);
    restartApp();
};

