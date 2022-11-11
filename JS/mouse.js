function mouseClicked(){
    updateMouse(graphics.main)
    if(!transition.trigger)
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
        case 'rest':
            current.onClickRest()
        break
        case 'deck':
            current.onClickDeck()
        break
        case 'event':
            current.onClickEvent()
        break
    }
}