function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    current=new battle(graphics.main,6)
    generateListing(types.card,types.encounter,types.event)
    
    current.setupTesting(1,116)
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}