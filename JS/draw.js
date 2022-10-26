function draw(){
    background(125)
    switch(stage.scene){
        case 'battle':
            graphics.main.background(100)
            current.display()
            current.update()
        break
    }
    stage.scale=min(width/graphics.main.width,height/graphics.main.height)
    image(graphics.main,width/2-stage.scale*graphics.main.width/2,height/2-stage.scale*graphics.main.height/2,stage.scale*graphics.main.width,stage.scale*graphics.main.height)
    displayTransition(graphics.main,transition)
    updateMouse(graphics.main)
}