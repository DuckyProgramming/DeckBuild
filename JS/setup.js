function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    current=new battle(graphics.main,7)
    generateListing(types.card,types.encounter,types.event)
    
    current.setupTesting(1,0)
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}
/*
TODO
12 Final Gentleman Cards (Including 1 Subsidiary)
*/