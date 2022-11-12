function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    current=new battle(graphics.main,1)
    generateListing(types.card)
    setupEncounter(current,2)
    current.create()
    current.initialEvent()
    current.setupShop(0)
    
    //transition.trigger=true
    //transition.scene='event'
    current.setupMap()
    //current.map.complete[0][0]=1
    //current.event=10

    transition.trigger=true
    transition.scene='shop'
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}