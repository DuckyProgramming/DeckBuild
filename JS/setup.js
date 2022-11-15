function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    current=new battle(graphics.main,1)
    generateListing(types.card)
    setupEncounter(current,1)

    //current.getRelic(61)

    current.create()
    current.initialEvent()
    
    //transition.trigger=true
    //transition.scene='event'
    current.setupMap()
    //current.map.complete[0][0]=1
    //current.event=14
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}