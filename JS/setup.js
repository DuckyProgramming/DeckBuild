function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    current=new battle(graphics.main,2)
    generateListing(types.card)
    setupEncounter(current,3)

    current.initialEvent()

    //current.getRelic(156)
    
    current.create()

    //transition.trigger=true
    //transition.scene='shop'
    current.setupMap()
    //current.map.complete[0][0]=1
    //current.event=14
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}