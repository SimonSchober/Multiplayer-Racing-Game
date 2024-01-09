class Player {
    constructor() {
        this.name = null
        this.index = null
        this.distance = 0
        this.rank = 0
        this.positionX = 200
    }

    getCount() {
        var ref = database.ref('playerCount')
        ref.on("value", function (data) {
            playerCount = data.val()
        })
    }

    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        })
    }

    update() {
        var playerIndex = "players/player" + this.index
        if(this.index === 1){
            this.positionX = width /2 -400
        }
        if(this.index === 2){
this.positionX = width /2 -200
        }

        if(this.index === 3){
            this.positionX = width /2 +200
        }
        if(this.index ===  4){
            this.positionX = width /2 +400
        }
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            rank: this.rank,
            positionX: this.positionX
            
        })
    }

    static getPlayerInfo() {
        var ref = database.ref('players')
        ref.on("value", (data) => {
            allPlayers = data.val()
        })
    }

    static deletePlayers() {
        database.ref('players').set('')
    }


    getcarsAtEnd() {
        var ref = database.ref('carsAtEnd')
        ref.on("value", (data)=> {
            this.rank = data.val()
        })
    }

    static updateRank(rank) {
        database.ref('/').update({
            carsAtEnd: rank
        })
    }

    getDistance(){
        database.ref('players/player' + this.index).on("value", data => {
            var data = data.val()
            this.positionX = data.positionX
            this.distance = data.distance
            
        })
    }
}

//ToDo List
//Highscore
//gettingCount
//updating the Count
//updating the name of the Player
