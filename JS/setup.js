function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    current=new battle(graphics.main,1)
    generateListing(types.card,types.encounter,types.event)
    
    current.setupTesting(6,0)
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}
/*
TODO
Ascend 10-20
12 Final Gentleman Cards (Including 1 Subsidiary)
*/