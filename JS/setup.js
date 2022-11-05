function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    current=new battle(graphics.main,4)
    current.create(combatants)
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}