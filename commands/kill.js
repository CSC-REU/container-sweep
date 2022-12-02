const {updateCriteria, restartApp} = require('../lib/util');

const config = require('config');

exports.command = 'kill [range]';
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

    yargs.positional('range', {
        describe: 'How often to check check existing containers',
        type: 'string',
        default: '* * * * *'
    });
};

exports.handler = async arguments => {
    config.name = arguments.name || undefined;
    config.age = arguments.age || undefined;
    config.range = arguments.range || undefined;
    await updateCriteria(config);
    restartApp();
};

