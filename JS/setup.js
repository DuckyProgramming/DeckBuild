function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    current=new battle(graphics.main,1)
    generateListing(types.card)
    
    current.setupTesting(8)
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}