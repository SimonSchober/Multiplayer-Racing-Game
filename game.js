class Game {
    constructor() {
        this.rank1 = createElement('h2')
        this.rank2 = createElement('h2')
        this.rank3 = createElement('h2')
        this.rank4 = createElement('h2')
        this.leaderboardTitle = createElement('h2')
    }

    getState() {
        var gameref = database.ref("gamestate")
        gameref.on("value", function (data) {
            gamestate = data.val()
        })
    }

    update(state) {
        database.ref('/').update({
            gamestate: state
        })
    }

    async start() {
        if (gamestate === 0) {
            player = new Player()
            var playerCountref = await database.ref('playerCount').once("value")
            if (playerCountref.exists()) {
                playerCount = playerCountref.val()
                player.getCount()
            }
            form = new Form()
            form.display()
        }
        car1 = createSprite(width /2 -50, height -100)
        car1.addImage(car1img)
        car2 = createSprite(width /2 +100, height -100)
        car3 = createSprite(width /2 +50, height -100)
        car4 = createSprite(width /2 -100, height -100)
        cars = [car1, car2, car3, car4]
        car2.addImage(car2img)
        car3.addImage(car3img)
        car4.addImage(car4img)

    }
    handleElements() {
        form.hide()
        this.leaderboardTitle.html("Leaderboard")
        this.leaderboardTitle.position(width /3 -60, 60)
        this.rank1.position(width /3 -50, 100)
        this.rank2.position(width /3 -50, 140)
        this.rank3.position(width /3 -50, 180)
        this.rank4.position(width /3 -50, 220)

    }

    play() {  
        this.handleElements()
        textSize(30)
        text("Game Start", 120, 100)
        Player.getPlayerInfo()
        player.getcarsAtEnd()

        if (allPlayers !== undefined) {
            background("#c68767")
            image(trackimg, 0, -displayHeight * 8, displayWidth, displayHeight * 9)
            var index = 0
            for (var plr in allPlayers) {
                index = index + 1
                var x = allPlayers[plr].positionX 
                var y = displayHeight - allPlayers[plr].distance
                cars[index - 1].x = x
                cars[index - 1].y = y
                if (index === player.index) {
                    stroke(10)
                    fill("red")
                    ellipse(x, y, 60, 60)

                    cars[index - 1].shapeColor = "red"
                    camera.position.x = displayWidth / 2
                    camera.position.y = cars[index - 1].y

                }

            }

            // Up Arrow is pressed
            if (keyIsDown(UP_ARROW) && player.index !== null) {
                player.distance += 50
                player.update()
            }
            if(keyIsDown(RIGHT_ARROW) ){
                player.positionX += 5
                player.update()
            }

            if(keyIsDown(LEFT_ARROW) ){
                player.positionX += -5
                player.update()
            }
            drawSprites()


            if (player.distance > 8200) {
                gamestate = 2
                player.rank += 1
                Player.updateRank(player.rank)
                player.update()
                this.showRank()
            }

            
        }

    }
    showRank() {
        swal({
            title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
            text: "You reached the finish line successfully",
            imageUrl:
                "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
            imageSize: "100x100",
            confirmButtonText: "Ok"
        });
    }

    gameOver() {
        // alert("game ended " + "you stood at rank " + player.rank)
        swal({
            title: `Game Over`,
            text: "You lose the Game",
            imageUrl:
                "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
            imageSize: "100x100",
            confirmButtonText: "Ok"
        });
        text(player.name + " stood at rank " + player.rank, displayWidth / 3, 800)
        game.update(2)
    }
    end() {
        console.log("game ended")
    }
}

