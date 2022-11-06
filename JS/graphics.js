function setupGraphics(){
    angleMode(DEGREES)
	textAlign(CENTER,CENTER)
	rectMode(CENTER)
	colorMode(RGB,255,255,255,1)
    graphics.main=createGraphics(900,600)
    setupLayer(graphics.main)
	graphics.minor.push(createGraphics(160,160))
	graphics.minor.push(createGraphics(160,160))
	graphics.minor.push(createGraphics(160,240))
	graphics.minor.push(createGraphics(160,160))
	graphics.minor.push(createGraphics(80,20))
	graphics.minor.push(createGraphics(200,200))
	for(a=0,la=graphics.minor.length;a<la;a++){
		setupLayer(graphics.minor[a])
	}
	graphics.minor[0].noStroke()
	graphics.minor[0].fill(224,181,156)
	graphics.minor[0].ellipse(80,80,120,120)
	graphics.minor[0].fill(204,139,122)
	graphics.minor[0].rect(80,80,120,6)
	graphics.minor[0].quad(24,55,136,55,137,61,23,61)
	graphics.minor[0].quad(24,105,136,105,137,99,23,99)
	graphics.minor[0].quad(41,33,119,33,124,39,36,39)
	graphics.minor[0].quad(41,127,119,127,124,121,36,121)
	graphics.minor[1].stroke(201,61,96)
	graphics.minor[1].strokeWeight(24)
	graphics.minor[1].line(32,50,80,137)
	graphics.minor[1].line(128,50,80,137)
	graphics.minor[1].stroke(233,216,194)
	graphics.minor[1].strokeWeight(8)
	graphics.minor[1].point(80,132)
	graphics.minor[1].point(64,104)
	graphics.minor[1].point(96,104)
	graphics.minor[1].point(48,76)
	graphics.minor[1].point(112,76)
	graphics.minor[1].point(32,48)
	graphics.minor[1].point(128,48)
	graphics.minor[2].translate(80,140)
	graphics.minor[2].scale(0.8)
	graphics.minor[2].noStroke()
	graphics.minor[2].fill(236,130,138)
	for(a=0;a<5;a++){
		graphics.minor[2].rotate(72)
		graphics.minor[2].beginShape()
		graphics.minor[2].vertex(0,0)
		graphics.minor[2].bezierVertex(-14,-14,-14,-28,0,-42)
		graphics.minor[2].bezierVertex(14,-28,14,-14,0,0)
		graphics.minor[2].endShape()
	}
	graphics.minor[2].fill(213,88,102)
	for(a=0;a<5;a++){
		graphics.minor[2].rotate(72)
		graphics.minor[2].beginShape()
		graphics.minor[2].vertex(0,0)
		graphics.minor[2].bezierVertex(-7,-10,-7,-20,0,-30)
		graphics.minor[2].bezierVertex(7,-20,7,-10,0,0)
		graphics.minor[2].endShape()
	}
	graphics.minor[2].fill(255,161,161)
	graphics.minor[2].ellipse(0,0,4,4)
	graphics.minor[2].scale(1.25)
	graphics.minor[2].translate(0,-30)
	graphics.minor[2].noStroke()
	graphics.minor[2].fill(226,120,128)
	for(a=0;a<5;a++){
		graphics.minor[2].rotate(72)
		graphics.minor[2].beginShape()
		graphics.minor[2].vertex(0,0)
		graphics.minor[2].bezierVertex(-14,-14,-14,-28,0,-42)
		graphics.minor[2].bezierVertex(14,-28,14,-14,0,0)
		graphics.minor[2].endShape()
	}
	graphics.minor[2].fill(203,78,92)
	for(a=0;a<5;a++){
		graphics.minor[2].rotate(72)
		graphics.minor[2].beginShape()
		graphics.minor[2].vertex(0,0)
		graphics.minor[2].bezierVertex(-7,-10,-7,-20,0,-30)
		graphics.minor[2].bezierVertex(7,-20,7,-10,0,0)
		graphics.minor[2].endShape()
	}
	graphics.minor[2].fill(255,151,151)
	graphics.minor[2].ellipse(0,0,4,4)
	graphics.minor[2].translate(-80,-370)
	graphics.minor[3].translate(80,80)
	graphics.minor[3].noStroke()
	graphics.minor[3].fill(253,233,242)
	for(a=0;a<5;a++){
		graphics.minor[3].rotate(72)
		graphics.minor[3].beginShape()
		graphics.minor[3].vertex(0,0)
		graphics.minor[3].bezierVertex(-20,-14,-20,-28,0,-42)
		graphics.minor[3].bezierVertex(20,-28,20,-14,0,0)
		graphics.minor[3].endShape()
	}
	graphics.minor[3].fill(252,255,252)
	for(a=0;a<5;a++){
		graphics.minor[3].rotate(72)
		graphics.minor[3].beginShape()
		graphics.minor[3].vertex(0,0)
		graphics.minor[3].bezierVertex(-10,-10,-10,-20,0,-30)
		graphics.minor[3].bezierVertex(10,-20,10,-10,0,0)
		graphics.minor[3].endShape()
	}
	graphics.minor[3].fill(255,231,238)
	graphics.minor[3].ellipse(0,0,4,4)
	graphics.minor[3].translate(-80,-80)
	graphics.minor[4].noStroke()
	for(a=0;a<30;a++){
		graphics.minor[4].fill(180+a*8,-30+a*8,-30+a*8)
		graphics.minor[4].rect(11+a*2,10,2,8)
	}
	graphics.minor[4].noFill()
	graphics.minor[4].stroke(0)
	graphics.minor[4].strokeWeight(1)
	graphics.minor[4].rect(40,10,61,9,3)
	graphics.minor[5].noStroke()
	graphics.minor[5].translate(100,100)
	graphics.minor[5].rotate(-10)
	graphics.minor[5].fill(138,141,207)
	graphics.minor[5].arc(0,0,150,180,0,30)
	graphics.minor[5].fill(111,114,178)
	graphics.minor[5].arc(0,0,150,180,30,60)
	graphics.minor[5].fill(88,82,128)
	graphics.minor[5].arc(0,0,150,180,60,90)

	graphics.minor[5].fill(161,168,222)
	graphics.minor[5].arc(0,0,135,180,0,15)
	graphics.minor[5].fill(121,124,188)
	graphics.minor[5].arc(0,0,135,180,15,45)
	graphics.minor[5].fill(98,92,138)
	graphics.minor[5].arc(0,0,135,180,45,75)
	graphics.minor[5].fill(77,65,108)
	graphics.minor[5].arc(0,0,135,180,75,90)

	graphics.minor[5].erase()
	graphics.minor[5].arc(0,0,120,180,0,90)
	graphics.minor[5].noErase()
	graphics.minor[5].fill(189,187,237)
	graphics.minor[5].rect(0,0,160,8,3)
	graphics.minor[5].fill(149,134,184)
	graphics.minor[5].rect(0,-2,160,4,3)
}