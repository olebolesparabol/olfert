var _ = require('lodash');

var utils = {
    getCreepCountForType: function(role) {
        return _.sum(Game.creeps, (c) => c.memory.role == role);
    },
    removeDeadCreepsFromMemory: function() {
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
    },
    isMyRoom: function(room) {
        return room &&
            room.controller &&
            room.controller.my;
    }
}

module.exports = utils;