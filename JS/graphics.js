function setupGraphics(){
    angleMode(DEGREES)
	textAlign(CENTER,CENTER)
	rectMode(CENTER)
	colorMode(RGB,255,255,255,1)
    graphics.main=createGraphics(900,600)
    setupLayer(graphics.main)
}