const killContainers = require('../lib/util').killContainers;
const cron = require('node-cron');
const config = require('config');

const name = config.get('name');
const age = config.get('age');
const range = config.get('range');

cron.schedule(range, async () => {
    console.log(`Deleting containers with name: ${name} and age: ${age}`);
    await killContainers({name, age});
});
