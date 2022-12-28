function keyPressed(){
    switch(key){
        case 'a':
            inputs.keys[0][0]=true
        break
        case 'd':
            inputs.keys[0][1]=true
        break
        case 'w':
            inputs.keys[0][2]=true
        break
        case 's':
            inputs.keys[0][3]=true
        break
        case 'ArrowLeft':
            inputs.keys[1][0]=true
        break
        case 'ArrowRight':
            inputs.keys[1][1]=true
        break
        case 'ArrowUp':
            inputs.keys[1][2]=true
        break
        case 'ArrowDown':
            inputs.keys[1][3]=true
        break
    }
    switch(stage.scene){
        case 'menu':
            onKeyMenu(key,keyCode)
        break
        case 'dictionary':
            current.onKeyDictionary(key,keyCode)
        break
        case 'battle':
            current.onKey(key,keyCode)
        break
        case 'choice':
            current.onKeyChoice(key,keyCode)
        break
        case 'map':
            current.onKeyMap(key,keyCode)
        break
        case 'rest':
            current.onKeyRest(key,keyCode)
        break
        case 'event':
            current.onKeyEvent(key,keyCode)
        break
        case 'bosschoice':
            current.onKeyBossChoice(key,keyCode)
        break
    }
}
function keyReleased(){
    switch(key){
        case 'a':
            inputs.keys[0][0]=false
        break
        case 'd':
            inputs.keys[0][1]=false
        break
        case 'w':
            inputs.keys[0][2]=false
        break
        case 's':
            inputs.keys[0][3]=false
        break
        case 'ArrowLeft':
            inputs.keys[1][0]=false
        break
        case 'ArrowRight':
            inputs.keys[1][1]=false
        break
        case 'ArrowUp':
            inputs.keys[1][2]=false
        break
        case 'ArrowDown':
            inputs.keys[1][3]=false
        break
    }
}