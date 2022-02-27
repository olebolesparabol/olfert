var buildManager = {
    currentRoom: {},
    extensionPositions: {},
    run: function(room, spawner) {
        this.currentRoom = room;
        //if(!Memory.planning.extensionsPlanned) {
            console.log("Executing extension planning");
            this.extensionPositions = this.planExtensions(spawner);
            
            switch(room.controller.level) {
                case 2:
                    this.buildExtensions(5);
                    break;
                case 3:
                    this.buildExtensions(10);
                    break;
                case 4:
                    this.buildExtensions(12);
                    break;
                default:
                    break;
            }
        //}
    },
    planExtensions: function(spawner) {
        let sx = spawner.pos.x;
        let sy = spawner.pos.y;
        
        let extensionMatrix = new Array(12);
        extensionMatrix[0] = new RoomPosition(sx-2,sy-2, this.currentRoom.name);
        extensionMatrix[1] = new RoomPosition(sx-1,sy-2, this.currentRoom.name);
        extensionMatrix[2] = new RoomPosition(sx-2,sy-1, this.currentRoom.name);
        
        extensionMatrix[3] = new RoomPosition(sx+2,sy-2, this.currentRoom.name);
        extensionMatrix[4] = new RoomPosition(sx+1,sy-2, this.currentRoom.name);
        extensionMatrix[5] = new RoomPosition(sx+2,sy-1, this.currentRoom.name);
        
        extensionMatrix[6] = new RoomPosition(sx-2,sy+2, this.currentRoom.name);
        extensionMatrix[7] = new RoomPosition(sx-2,sy+1, this.currentRoom.name);
        extensionMatrix[8] = new RoomPosition(sx-1,sy+2, this.currentRoom.name);
        
        extensionMatrix[9] = new RoomPosition(sx+2,sy+2, this.currentRoom.name);
        extensionMatrix[10] = new RoomPosition(sx+2,sy+1, this.currentRoom.name);
        extensionMatrix[11] = new RoomPosition(sx+1,sy+2, this.currentRoom.name);
        
        return extensionMatrix;
    },
    buildExtensions: function(desiredExtensionCount) {
        let existingExtensions = this.currentRoom.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });

        let plannedExtensions = this.currentRoom.find(FIND_MY_CONSTRUCTION_SITES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });
        console.log("Existing extensions: " + existingExtensions.length);
        console.log("Planned extensions: " + plannedExtensions.length);

        let totalExtensions = existingExtensions.length + plannedExtensions.length;
        let i = 0;
        while (totalExtensions < desiredExtensionCount) {
            console.log("Planning: " + i)
            let result = this.currentRoom.createConstructionSite(this.extensionPositions[i], STRUCTURE_EXTENSION);
            if (result == OK) {
                totalExtensions++;
            }
            i++;
            if(i > 15) {
                console.log("Loop broke");
                break;
            }
        }
        Memory.planning.extensionsPlanned = true;
    }
}

module.exports = buildManager;