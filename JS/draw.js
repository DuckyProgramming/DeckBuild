function draw(){
    clear()
    background(125)
    switch(stage.scene){
        case 'battle':
            graphics.main.background(40,48,50)
            displayMoon(graphics.main)
            current.display()
            current.update()
        break
        case 'choice':
            graphics.main.background(40,48,50)
            displayMoon(graphics.main)
            current.displayChoice()
            current.updateChoice()
        break
        case 'map':
            graphics.main.background(40,48,50)
            current.displayMap()
            current.updateMap()
        break
        case 'rest':
            graphics.main.background(80,75,70)
            current.displayRest()
            current.updateRest()
        break
        case 'deck':
            graphics.main.background(40,48,50)
            current.displayDeck()
            current.updateDeck()
        break
        case 'event':
            graphics.main.background(40,48,50)
            displayMoon(graphics.main)
            current.displayEvent()
            current.updateEvent()
        break
        case 'shop':
            graphics.main.background(80,85,90)
            current.displayShop()
            current.updateShop()
        break
    }
    stage.scale=min(width/graphics.main.width,height/graphics.main.height)
    displayTransition(graphics.main,transition)
    image(graphics.main,width/2-stage.scale*graphics.main.width/2,height/2-stage.scale*graphics.main.height/2,stage.scale*graphics.main.width,stage.scale*graphics.main.height)
    updateMouse(graphics.main)
}