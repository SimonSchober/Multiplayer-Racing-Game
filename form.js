class Form {
    constructor() {
        this.input = createInput("name")
        this.button = createButton("Play")
        this.greeting = createElement("h3")
        this.reset = createButton("RESET")
    }
    hide() {
        this.input.hide()
        this.button.hide()
        this.greeting.hide()
    }
    display() {
        var title = createElement('h2')
        title.html("Car Racing Game")
        title.position(displayWidth / 2 - 50, 100)
        this.reset.position(displayWidth - 100, 20)
        this.button.position(displayWidth / 2 + 30, displayHeight / 2)
        this.input.position(displayWidth / 2 - 40, displayHeight / 2 - 80)
        this.button.mousePressed(() => {
            this.input.hide()
            this.button.hide()
            var name = this.input.value()
            playerCount += 1
            player.index = playerCount
            player.update()
            player.updateCount(playerCount)
            this.greeting.html("Hello " + name + ", welcome to the Car Racing game")
            this.greeting.position(displayWidth / 2 - 70, displayHeight / 4)

        })

        this.reset.mousePressed(() => {
            player.updateCount(0)
            Player.updateRank(0)
            game.update(0)
            Player.deletePlayers()
            window.location.reload()
        })
    }
}

