const minimatch = require("minimatch")
const fs = require('fs');
const exec = require('child_process').exec;
const Docker = require('dockerode');
const docker = new Docker();

function nameMeetsCriteria(containerName, criteriaName) {
    if (criteriaName === '*') {
        return true
    } else {
        return minimatch(containerName, criteriaName)
    }
}

function ageMeetsCriteria(containerAge, criteriaAge) {
    return containerAge >= criteriaAge
}

function containerMeetsCriteria(container, criteria) {
    containerName = container.Names[0].slice(1)
    containerAge = parseInt(container.Status.replace(/^\D+/g, ''));
    criteriaName = criteria.name;
    criteriaAge = criteria.age;

    if (nameMeetsCriteria(containerName, criteriaName) && ageMeetsCriteria(containerAge, criteriaAge)) {
        return true
    } else {
        return false
    }
}

function updateCriteria(config) {
    fs.writeFile('config/default.json', JSON.stringify(config, null, 2), function writeJSON(error) {
        if (error) return console.log(error);
    });
}

async function killContainers(criteria) {
    docker.listContainers((error, containers) => {
        if (containers) {
            containers.forEach(async container => {
                if (containerMeetsCriteria(container, criteria)) {
                    await docker.getContainer(container.Id).remove({ force: true });
                    console.log(`Container: ${container.Id} deleted successfully.`);
                }
            })
        }
    })
}

async function restartApp() {
    await exec('pm2 start --name container-sweep lib/server.js || pm2 restart all', 
        (error, stdout, stderr) => {
            if (error) 
                console.log(error);
            else
                console.log('Container sweep started!');
        }
    );
}

module.exports = {
    updateCriteria,
    nameMeetsCriteria,
    ageMeetsCriteria,
    containerMeetsCriteria,
    killContainers,
    restartApp
}