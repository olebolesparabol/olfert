var roadManager = {
    run: function(room, spawner) {
        if(!Memory.planning.roadsPlanned) {
            console.log("Executing road planning");
            var sources = room.find(FIND_SOURCES);
            var mainSource = sources[0];
            
            var path = room.findPath(spawner.pos, mainSource.pos);
            
            path.forEach(function(position) {
               room.createConstructionSite(position.x, position.y, STRUCTURE_ROAD);
            });
            
            Memory.planning.roadsPlanned = true;
        }
    }
}

module.exports = roadManager;