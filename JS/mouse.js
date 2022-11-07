function mouseClicked(){
    updateMouse(graphics.main)
    switch(stage.scene){
        case 'battle':
            current.onClick()
        break
        case 'choice':
            current.onClickChoice()
        break
        case 'map':
            current.onClickMap()
        break
    }
}