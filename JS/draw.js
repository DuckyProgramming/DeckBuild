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
    }
    stage.scale=min(width/graphics.main.width,height/graphics.main.height)
    displayTransition(graphics.main,transition)
    image(graphics.main,width/2-stage.scale*graphics.main.width/2,height/2-stage.scale*graphics.main.height/2,stage.scale*graphics.main.width,stage.scale*graphics.main.height)
    updateMouse(graphics.main)
}