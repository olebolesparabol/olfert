const utils = require('utils');
const constants = require('constants');

var buildManager = {
    run: function(room, spawner) {
        if(!Memory.planning.extensionsPlanned) {
            console.log("Executing extension planning");
            var extensionPositions = this.planExtensions(spawner, 5);
            
            extensionPositions.forEach(function(position) {
                room.createConstructionSite(position.x, position.y, STRUCTURE_EXTENSION);
                console.log("Extension planned at " + position.x + "," + position.y);
            });
            Memory.planning.extensionsPlanned = true;
        }
    },
    planExtensions: function(spawner, totalAmountOfExtensions) {
        // TODO: Improve location planning of extensions
        var constructionPositions = new Array(totalAmountOfExtensions);
        var xPlacement =  spawner.pos.x - Math.floor(totalAmountOfExtensions/2);
        for(var i = 0; i < constructionPositions.length; i++) {
            constructionPositions[i] = { x: xPlacement, y: spawner.pos.y - 2 };
            xPlacement = xPlacement + 2;
        }
        
        return constructionPositions;
    }
}

module.exports = buildManager;