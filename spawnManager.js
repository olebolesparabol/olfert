const utils = require('utils');
const constants = require('constants');

var spawnManager = {
    spawner: {},
    run: function(spawner) {
        var harvesterCount = utils.getCreepCountForType(constants.HARVESTER);
        var builderCount = utils.getCreepCountForType(constants.BUILDER);
        var upgraderCount = utils.getCreepCountForType(constants.UPGRADER);
        
        if(harvesterCount < 2) {
            this.spawnWorker(spawner, constants.HARVESTER);
        }
        else if(builderCount < 5) {
            this.spawnWorker(spawner, constants.BUILDER);
        }
        else if(upgraderCount < 3) {
            this.spawnWorker(spawner, constants.UPGRADER);
        }
    },
    spawnWorker: function(spawner, workerType) {
        // TODO: determine body size by max energy available
        const workerBody = [WORK, CARRY, MOVE];
        
        this.spawnCreep(spawner, workerBody, workerType);
    },
    spawnCreep: function(spawner, workerBody, workerType) {
        const workerName = workerType + Game.time.toString();
        const canSpawn = spawner.spawnCreep(workerBody, workerName, { dryRun: true });

        if(canSpawn === OK) {
            spawner.spawnCreep(workerBody, workerName, {
                memory: {role: workerType}
            });
            console.log("Creep "+workerName+" spawning");
        }
    }
}

module.exports = spawnManager;