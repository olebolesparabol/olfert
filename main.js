const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const spawnManager = require('spawnManager');
const buildManager = require('buildManager');
const defenseManager = require('defenseManager');
const roadManager = require('roadManager');
const utils = require('utils');
const constants = require('constants');

module.exports.loop = function () {
    console.log("Tick");
    
    if (!Memory.gameInitialized) {
        Memory.planning = {
            extensionsPlanned: false,
            roadsPlanned: false,
            defensePlanned: false,
        };
        
        Memory.gameInitialized = true;
    }
    
    // TODO: Make queue system for construction projects with priorities
    
    var spawner = Game.spawns["Spawn1"]; // TODO: iterate over spawners
    
    for(var roomName in Game.rooms) // for each of my rooms
    {
        var room = Game.rooms[roomName];
        
        roadManager.run(room, spawner);
        
        if (room.controller.level > 1) {
            if (utils.isMyRoom(room)) {
                buildManager.run(room, spawner);
                defenseManager.run(room);
            }
        }
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == constants.HARVESTER) {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == constants.UPGRADER) {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == constants.BUILDER) {
            roleBuilder.run(creep);
        }
    }
    
    spawnManager.run(spawner);
    
    // Cleanup
    utils.removeDeadCreepsFromMemory();
}