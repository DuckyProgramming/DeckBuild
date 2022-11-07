function draw(){
    clear()
    background(125)
    switch(stage.scene){
        case 'battle':
            graphics.main.background(100)
            current.display()
            current.update()
        break
        case 'choice':
            graphics.main.background(100)
            current.displayChoice()
        break
        case 'map':
            graphics.main.background(100)
            current.displayMap()
            current.updateMap()
        break
        case 'rest':
            graphics.main.background(80,75,70)
            current.displayRest()
        break
        case 'deck':
            graphics.main.background(100)
            current.displayDeck()
            current.updateDeck()
        break
    }
    stage.scale=min(width/graphics.main.width,height/graphics.main.height)
    displayTransition(graphics.main,transition)
    image(graphics.main,width/2-stage.scale*graphics.main.width/2,height/2-stage.scale*graphics.main.height/2,stage.scale*graphics.main.width,stage.scale*graphics.main.height)
    updateMouse(graphics.main)
}