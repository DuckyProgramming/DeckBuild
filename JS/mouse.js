function mouseClicked(){
    updateMouse(graphics.main)
    if(!transition.trigger){
        switch(stage.scene){
            case 'menu':
                onClickMenu(inputs.rel)
            break
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
            case 'shop':
                current.onClickShop()
            break
            case 'bosschoice':
                current.onClickBossChoice()
            break
            case 'dictionary':
                current.onClickDictionary()
            break
        }
    }
}