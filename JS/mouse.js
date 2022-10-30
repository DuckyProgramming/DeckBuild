function mouseClicked(){
    updateMouse(graphics.main)
    switch(stage.scene){
        case 'battle':
            current.onClick()
        break
    }
}