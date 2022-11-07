function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    current=new battle(graphics.main,1)
    generateListing(types.card)
    setupEncounter(current,1)
    current.create()
    
    transition.trigger=true
    transition.scene='choice'
    current.setupChoice(0,0,0)
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}