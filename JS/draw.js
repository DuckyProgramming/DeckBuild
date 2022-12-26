function draw(){
    clear()
    background(125)
    graphics.main.push()
    graphics.main.scale(stage.quality)
    switch(stage.scene){
        case 'menu':
            graphics.main.background(0)
            displayMenu(graphics.main)
        break
        case 'blessing':
            graphics.main.background(20,30,40)
            displayGeneration(graphics.main)
        break
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
        case 'bosschoice':
            graphics.main.background(80,85,90)
            current.displayBossChoice()
        break
        case 'dictionary':
            graphics.main.background(80,85,90)
            current.displayDictionary()
            current.updateDictionary()
        break
    }
    graphics.main.pop()
    current.updateFull()
    stage.scale=min(width/graphics.main.width,height/graphics.main.height)
    displayTransition(graphics.main,transition)
    image(graphics.main,width/2-stage.scale*graphics.main.width/2,height/2-stage.scale*graphics.main.height/2,stage.scale*graphics.main.width,stage.scale*graphics.main.height)
    updateMouse(graphics.main)
}