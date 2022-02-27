const utils = require('utils');
const constants = require('constants');

const MAX = 49;

var defenseManager = {
    run: function(room) {
        if(!Memory.planning.defensePlanned) {
            console.log("Executing defense planning");
            this.planWalls(room);
            
            Memory.planning.defensePlanned = true;
        }
    },
    planWalls: function(room) { // TODO: Refine planning. Ramparts should be 2 deep, in front of exit, the rest walls.
        var terrainMap = Game.map.getRoomTerrain(room.name);
            
        var westPerimiter = this.calculateVerticalPerimiter(terrainMap, 0, 1);
        console.log("Plan western rampart: " + westPerimiter[0] + " to " + westPerimiter[westPerimiter.length - 1]);
        westPerimiter.forEach(function(position) {
            room.createConstructionSite(2, position, STRUCTURE_RAMPART);          
        });
        
        var eastPerimiter = this.calculateVerticalPerimiter(terrainMap, MAX, MAX - 1);
        console.log("Plan eastern rampart: " + eastPerimiter[0] + " to " + eastPerimiter[eastPerimiter.length - 1]);
        eastPerimiter.forEach(function(position) {
            room.createConstructionSite(MAX - 2, position, STRUCTURE_RAMPART);
        });

        var northPerimiter = this.calculateHorizontalPerimiter(terrainMap, 0, 1);
        console.log("Plan northern rampart: " + northPerimiter[0] + " to " + northPerimiter[northPerimiter.length - 1]);
        northPerimiter.forEach(function(position) {
            room.createConstructionSite(position, 2, STRUCTURE_RAMPART);
        });
        
        var southPerimiter = this.calculateHorizontalPerimiter(terrainMap, MAX, MAX - 1);
        console.log("Plan southern rampart: " + southPerimiter[0] + " to " + southPerimiter[southPerimiter.length - 1]);
        southPerimiter.forEach(function(position) {
            room.createConstructionSite(position, MAX - 2, STRUCTURE_RAMPART);
        });
    },
    calculateVerticalPerimiter: function(terrainMap, edge, nearEdge) {
        var exitCoordinates = new Array(0);
        
        // Find coordinates for exit
        for(var i = 0; i <= MAX; i++) {
            var terrainPoint = terrainMap.get(edge, i);
            if(terrainPoint == 0) {
                exitCoordinates.push(i);
            }
        }
        
        var exitFirstCoordinate = exitCoordinates[0];
        var exitLastCoordinate = exitCoordinates[exitCoordinates.length - 1];
        
        var hasReachedWall = true;
        var iteratorStart = exitFirstCoordinate;
        var startPosition = 0;
        
        // Find start coordinate for placement of wall
        while(hasReachedWall) {
            var terrainPoint = terrainMap.get(nearEdge, iteratorStart);
            if(terrainPoint == TERRAIN_MASK_WALL) {
                startPosition = iteratorStart;
                break;
            }
            iteratorStart--;
        }
        
        var iteratorEnd = exitLastCoordinate;
        var endPosition = 0;
        
        // Find end coordinate for placement of wall
        while(hasReachedWall) {
            var terrainPoint = terrainMap.get(nearEdge, iteratorEnd);
            if(terrainPoint == TERRAIN_MASK_WALL) {
                endPosition = iteratorEnd;
                break;
            }
            iteratorEnd++;
        }

        return Array(endPosition - startPosition + 1).fill().map((_, idx) => startPosition + idx);
    },
    calculateHorizontalPerimiter: function(terrainMap, edge, nearEdge) {
        var exitCoordinates = new Array(0);
            
        for(var i = 0; i <= MAX; i++) {
            var terrainPoint = terrainMap.get(i, edge);
            if(terrainPoint == 0) {
                exitCoordinates.push(i);
            }
        }
        
        var exitFirstCoordinate = exitCoordinates[0];
        var exitLastCoordinate = exitCoordinates[exitCoordinates.length - 1];
        
        var hasReachedWall = true;
        var iteratorStart = exitFirstCoordinate;
        var startPosition = 0;
        
        while(hasReachedWall) {
            var terrainPoint = terrainMap.get(iteratorStart, nearEdge);
            if(terrainPoint == TERRAIN_MASK_WALL) {
                startPosition = iteratorStart;
                break;
            }
            iteratorStart--;
        }
        
        var iteratorEnd = exitLastCoordinate;
        var endPosition = 0;
        
        while(hasReachedWall) {
            var terrainPoint = terrainMap.get(iteratorEnd, nearEdge);
            if(terrainPoint == TERRAIN_MASK_WALL) {
                endPosition = iteratorEnd;
                break;
            }
            iteratorEnd++;
        }

        return Array(endPosition - startPosition + 1).fill().map((_, idx) => startPosition + idx);
    },
}

module.exports = defenseManager;