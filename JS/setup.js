function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    current=new battle(graphics.main,5)
    generateListing(types.card,types.encounter,types.event)
    
    current.setupTesting(5)
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}
//long term map selection bug