function setupGraphics(){
    angleMode(DEGREES)
	textAlign(CENTER,CENTER)
	rectMode(CENTER)
	colorMode(RGB,255,255,255,1)
    graphics.main=createGraphics(900*stage.quality,600*stage.quality)
    setupLayer(graphics.main)
	graphics.minor.push(createGraphics(160,160))
	graphics.minor.push(createGraphics(160,160))
	graphics.minor.push(createGraphics(160,240))
	graphics.minor.push(createGraphics(160,160))
	graphics.minor.push(createGraphics(80,20))
	graphics.minor.push(createGraphics(200,200))
	graphics.minor.push(createGraphics(160,160))
	graphics.minor.push(createGraphics(160,160))
	graphics.minor.push(createGraphics(140,180))
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
	graphics.minor[6].noStroke()
	graphics.minor[6].fill(150,160,196)
	graphics.minor[6].ellipse(80,80,120,120)
	graphics.minor[7].stroke(95,55,65)
	graphics.minor[7].strokeWeight(24)
	graphics.minor[7].line(32,50,80,137)
	graphics.minor[7].line(128,50,80,137)
	graphics.minor[8].strokeWeight(5)
	for(a=0;a<20;a++){
		graphics.minor[8].stroke(0,500-a*20,a*20)
		graphics.minor[8].line(10,10+a*4,10,170-a*4)
		graphics.minor[8].line(10+a*3,10,130-a*3,10)
		graphics.minor[8].line(130,10+a*4,130,170-a*4)
		graphics.minor[8].line(10+a*3,170,130-a*3,170)
	}
	for(a=0;a<50;a++){
		graphics.symbol.push(createGraphics(100,100))
		setupLayer(graphics.symbol[a])
		graphics.symbol[a].noStroke()
		graphics.symbol[a].fill(0)
		graphics.symbol[a].textSize(40)
		graphics.symbol[a].translate(50,50)
	}
	graphics.symbol[0].arc(0,0,80,80,-45,90)
	graphics.symbol[0].arc(0,0,80,80,135,270)
	graphics.symbol[0].erase()
	graphics.symbol[0].ellipse(0,0,60,60)
	graphics.symbol[0].noErase()
	graphics.symbol[0].triangle(0,-50,0,-20,25,-35)
	graphics.symbol[0].triangle(0,50,0,20,-25,35)
	graphics.symbol[1].rect(-15,0,60,16)
	graphics.symbol[1].triangle(15,-24,15,24,40,0)
	graphics.symbol[2].strokeWeight(5)
	graphics.symbol[2].stroke(0)
	graphics.symbol[2].noFill()
	graphics.symbol[2].line(-40,-25,0,-45)
	graphics.symbol[2].line(40,-25,0,-45)
	graphics.symbol[2].arc(0,-25,80,140,0,180)
	for(a=0;a<6;a++){
		graphics.symbol[3].arc(0,0,80,80,a*60+10,a*60+50)
	}
	graphics.symbol[3].erase()
	graphics.symbol[3].ellipse(0,0,70,70)
	graphics.symbol[4].rect(0,0,20,80)
	graphics.symbol[4].rect(0,0,80,20)
	graphics.symbol[5].strokeWeight(5)
	graphics.symbol[5].stroke(0)
	graphics.symbol[5].noFill()
	graphics.symbol[5].rect(0,0,60,80,2.5)
	graphics.symbol[6].ellipse(0,0,40,40)
	for(a=0;a<4;a++){
		graphics.symbol[6].arc(25*cos(a*90),25*sin(a*90),50-(a%2)*25,25+(a%2)*25,a*90,a*90+180)
	}
	graphics.symbol[7].strokeWeight(5)
	graphics.symbol[7].stroke(0)
	graphics.symbol[7].noFill()
	graphics.symbol[7].beginShape()
	for(a=0;a<16;a++){
		graphics.symbol[7].vertex(sin(a*22.5)*(30+(a%2)*20),cos(a*22.5)*(30+(a%2)*20))
	}
	graphics.symbol[7].endShape(CLOSE)
	graphics.symbol[8].strokeWeight(6)
	graphics.symbol[8].stroke(0)
	graphics.symbol[8].noFill()
    graphics.symbol[8].quad(-24,0,0,-32,24,0,0,32)
	graphics.symbol[9].ellipse(0,10,40,40)
	graphics.symbol[9].ellipse(-25,5,40,40)
	graphics.symbol[9].ellipse(25,5,40,40)
	graphics.symbol[9].ellipse(-15,-10,40,40)
	graphics.symbol[9].ellipse(15,-10,40,40)
	graphics.symbol[10].strokeWeight(5)
	graphics.symbol[10].stroke(0)
	graphics.symbol[10].noFill()
	graphics.symbol[10].beginShape()
	for(a=0;a<16;a++){
		graphics.symbol[10].vertex(sin(a*22.5)*(30+(a%2)*20),cos(a*22.5)*(30+(a%2)*20))
	}
	graphics.symbol[10].endShape(CLOSE)
	graphics.symbol[10].line(-20,-20,20,20)
	graphics.symbol[11].rect(0,-15,16,60)
	graphics.symbol[11].triangle(-24,15,24,15,0,40)
	graphics.symbol[12].rect(15,0,60,16)
	graphics.symbol[12].triangle(-15,-24,-15,24,-40,0)
	graphics.symbol[13].strokeWeight(5)
	graphics.symbol[13].stroke(0)
	graphics.symbol[13].noFill()
	graphics.symbol[13].arc(0,0,50,60,0,180)
	graphics.symbol[13].line(-25,0,0,-40)
	graphics.symbol[13].line(25,0,0,-40)
	graphics.symbol[14].strokeWeight(5)
	graphics.symbol[14].stroke(0)
	graphics.symbol[14].noFill()
	graphics.symbol[14].ellipse(0,0,90,90)
	graphics.symbol[14].line(-45/sqrt(2),-45/sqrt(2),45/sqrt(2),45/sqrt(2))
	graphics.symbol[15].rect(0,15,16,60)
	graphics.symbol[15].triangle(-24,-15,24,-15,0,-40)
	graphics.symbol[16].strokeWeight(5)
	graphics.symbol[16].stroke(0)
	graphics.symbol[16].noFill()
	graphics.symbol[16].ellipse(0,0,80,80)
	graphics.symbol[16].line(-30,-10,-10,0)
	graphics.symbol[16].line(30,-10,10,0)
	graphics.symbol[16].strokeWeight(15)
	graphics.symbol[16].point(-20,5)
	graphics.symbol[16].point(20,5)
	graphics.symbol[17].rect(0,0,18,72)
	graphics.symbol[17].rect(0,0,72,18)
	graphics.symbol[17].strokeWeight(5)
	graphics.symbol[17].stroke(0)
	graphics.symbol[17].noFill()
	graphics.symbol[17].rect(0,0,90,90)
	graphics.symbol[18].strokeWeight(5)
	graphics.symbol[18].stroke(0)
	graphics.symbol[18].noFill()
	graphics.symbol[18].ellipse(0,0,54,54)
	for(a=0;a<12;a++){
		graphics.symbol[18].line(sin(a*30)*36,cos(a*30)*36,sin(a*30)*48,cos(a*30)*48)
	}
	graphics.symbol[19].noFill()
	graphics.symbol[19].stroke(0)
	graphics.symbol[19].strokeWeight(14)
	graphics.symbol[19].strokeCap(SQUARE)
	graphics.symbol[19].arc(3.5,3.5,70,70,-45,135)
	graphics.symbol[19].arc(-3.5,-3.5,70,70,135,315)
	for(a=0;a<12;a++){
		graphics.symbol[20].ellipse(sin(a*30)*40,cos(a*30)*40,12,12)
	}
	graphics.symbol[20].strokeWeight(5)
	graphics.symbol[20].stroke(0)
	graphics.symbol[20].noFill()
	for(a=0;a<12;a++){
		graphics.symbol[20].line(sin(a*30)*24,cos(a*30)*24,sin(a*30)*30,cos(a*30)*30)
	}
	graphics.symbol[21].strokeWeight(5)
	graphics.symbol[21].stroke(0)
	graphics.symbol[21].noFill()
	graphics.symbol[21].ellipse(0,0,82,82)
	for(a=0;a<4;a++){
		graphics.symbol[21].line(sin(a*90+45)*60,cos(a*90+45)*60,sin(a*90+20)*40,cos(a*90+20)*40)
		graphics.symbol[21].line(sin(a*90+45)*60,cos(a*90+45)*60,sin(a*90+70)*40,cos(a*90+70)*40)
	}
	for(a=0;a<2;a++){
		for(b=0;b<5;b++){
			graphics.symbol[22+a].rotate(72)
			graphics.symbol[22+a].beginShape()
			graphics.symbol[22+a].vertex(0,0)
			graphics.symbol[22+a].bezierVertex(-14,-14,-14,-28,0,-42)
			graphics.symbol[22+a].bezierVertex(14,-28,14,-14,0,0)
			graphics.symbol[22+a].endShape()
		}
		graphics.symbol[22+a].erase()
		for(b=0;b<5;b++){
			graphics.symbol[22+a].rotate(72)
			graphics.symbol[22+a].beginShape()
			graphics.symbol[22+a].vertex(0,0)
			graphics.symbol[22+a].bezierVertex(-7,-10,-7,-20,0,-30)
			graphics.symbol[22+a].bezierVertex(7,-20,7,-10,0,0)
			graphics.symbol[22+a].endShape()
		}
	}
	graphics.symbol[23].noErase()
	graphics.symbol[23].strokeWeight(5)
	graphics.symbol[23].stroke(0)
	graphics.symbol[23].noFill()
	graphics.symbol[23].rect(0,0,90,90)
	graphics.symbol[24].strokeWeight(5)
	graphics.symbol[24].stroke(0)
	graphics.symbol[24].noFill()
	graphics.symbol[24].ellipse(0,0,80,80)
	graphics.symbol[24].strokeWeight(15)
	graphics.symbol[24].point(-20,5)
	graphics.symbol[24].point(20,5)
	graphics.symbol[25].strokeWeight(5)
	graphics.symbol[25].stroke(0)
	graphics.symbol[25].noFill()
	graphics.symbol[25].ellipse(0,0,80,80)
	graphics.symbol[25].line(-30,-15,-10,5)
	graphics.symbol[25].line(-30,5,-10,-15)
	graphics.symbol[25].line(30,-15,10,5)
	graphics.symbol[25].line(30,5,10,-15)
	graphics.symbol[26].strokeWeight(5)
	graphics.symbol[26].stroke(0)
	graphics.symbol[26].noFill()
	graphics.symbol[26].ellipse(0,0,80,80)
	graphics.symbol[26].line(-30,-10,-10,0)
	graphics.symbol[26].line(30,-10,10,0)
	graphics.symbol[26].arc(0,25,24,10,-150,-30)
	graphics.symbol[26].strokeWeight(15)
	graphics.symbol[26].point(-20,5)
	graphics.symbol[26].point(20,5)
	graphics.symbol[27].strokeWeight(5)
	graphics.symbol[27].stroke(0)
	graphics.symbol[27].noFill()
	graphics.symbol[27].ellipse(0,0,80,80)
	graphics.symbol[27].strokeWeight(10)
	graphics.symbol[27].line(0,0,0,-30)
	graphics.symbol[27].line(0,0,20,0)
	graphics.symbol[28].strokeWeight(5)
	graphics.symbol[28].stroke(0)
	graphics.symbol[28].noFill()
	graphics.symbol[28].ellipse(-35,-35,30,30)
	graphics.symbol[28].ellipse(-35,35,30,30)
	graphics.symbol[28].ellipse(35,-35,30,30)
	graphics.symbol[28].ellipse(35,35,30,30)
	graphics.symbol[28].line(-15,-45,15,-45)
	graphics.symbol[28].line(-45,-15,-45,15)
	graphics.symbol[28].line(-15,45,15,45)
	graphics.symbol[28].line(45,-15,45,15)
	graphics.symbol[29].strokeWeight(5)
	graphics.symbol[29].stroke(0)
	graphics.symbol[29].noFill()
	graphics.symbol[29].ellipse(0,0,80,80)
	graphics.symbol[29].strokeWeight(12)
	graphics.symbol[29].line(-24,0,24,0)
	graphics.symbol[30].strokeWeight(5)
	graphics.symbol[30].stroke(0)
	graphics.symbol[30].noFill()
	graphics.symbol[30].rect(0,0,50,50)
	graphics.symbol[30].rect(-15,-15,50,50)
	graphics.symbol[30].rect(15,15,50,50)
	graphics.symbol[31].strokeWeight(5)
	graphics.symbol[31].stroke(0)
	graphics.symbol[31].noFill()
	graphics.symbol[31].line(-30,-30,-10,-40)
	graphics.symbol[31].line(30,-30,10,-40)
	graphics.symbol[31].arc(0,-25,80,140,30,50)
	graphics.symbol[31].arc(0,-25,80,140,70,85)
	graphics.symbol[31].arc(0,-25,80,140,95,110)
	graphics.symbol[31].arc(0,-25,80,140,130,150)
	graphics.symbol[32].strokeWeight(5)
	graphics.symbol[32].stroke(0)
	graphics.symbol[32].noFill()
	graphics.symbol[32].ellipse(0,0,80,80)
	graphics.symbol[32].ellipse(0,0,50,50)
	graphics.symbol[33].strokeWeight(5)
	graphics.symbol[33].stroke(0)
	graphics.symbol[33].noFill()
	graphics.symbol[33].quad(0,-25,-35,-35,0,-50,35,-35)
	graphics.symbol[33].quad(-25,0,-35,-35,-50,0,-35,35)
	graphics.symbol[33].quad(0,25,35,35,0,50,-35,35)
	graphics.symbol[33].quad(25,0,35,35,50,0,35,-35)
	graphics.symbol[33].line(0,-50,0,-25)
	graphics.symbol[33].line(-50,0,-25,0)
	graphics.symbol[33].line(0,50,0,25)
	graphics.symbol[33].line(50,0,25,0)
	graphics.symbol[34].strokeWeight(5)
	graphics.symbol[34].stroke(0)
	graphics.symbol[34].noFill()
	graphics.symbol[34].triangle(-10,15,10,15,0,-40)
	graphics.symbol[34].rect(0,25,40,10)
	graphics.symbol[34].rect(0,35,20,10)
	graphics.symbol[35].rotate(-10)
	graphics.symbol[35].arc(0,0,75,90,0,90)
	graphics.symbol[35].erase()
	graphics.symbol[35].ellipse(0,0,60,90)
	graphics.symbol[35].noErase()
	graphics.symbol[35].rect(0,0,80,4,2)
	graphics.symbol[36].ellipse(0,0,60,60)
	graphics.symbol[36].rect(-30,0,15,15)
	graphics.symbol[36].rect(30,0,15,15)
	graphics.symbol[36].rect(0,-30,15,15)
	graphics.symbol[36].rect(0,30,15,15)
	graphics.symbol[36].erase()
	graphics.symbol[36].ellipse(0,0,40,40)
	graphics.symbol[36].noErase()
	graphics.symbol[36].rect(0,0,15,15)
	graphics.symbol[37].strokeWeight(5)
	graphics.symbol[37].stroke(0)
	graphics.symbol[37].noFill()
	graphics.symbol[37].arc(0,0,50,60,0,180)
	graphics.symbol[37].line(-25,0,-8,-32)
	graphics.symbol[37].line(25,0,8,-32)
	graphics.symbol[38].strokeWeight(5)
	graphics.symbol[38].stroke(0)
	graphics.symbol[38].noFill()
	graphics.symbol[38].ellipse(0,0,80,80)
	graphics.symbol[38].ellipse(0,20,30,30)
	graphics.symbol[38].ellipse(0,25,20,20)
	graphics.symbol[39].strokeWeight(5)
	graphics.symbol[39].stroke(0)
	graphics.symbol[39].noFill()
	graphics.symbol[39].arc(-20,-10,40,40,-180,0)
	graphics.symbol[39].arc(20,-10,40,40,-180,0)
	graphics.symbol[39].line(-40,-10,0,40)
	graphics.symbol[39].line(40,-10,0,40)
	graphics.symbol[40].strokeWeight(5)
	graphics.symbol[40].stroke(0)
	graphics.symbol[40].noFill()
	graphics.symbol[40].ellipse(0,0,72,72)
	graphics.symbol[40].line(-10,-36,-10,-48)
	graphics.symbol[40].line(10,-36,10,-48)
	graphics.symbol[40].line(-10,-48,10,-48)
	graphics.symbol[41].strokeWeight(5)
	graphics.symbol[41].stroke(0)
	graphics.symbol[41].noFill()
	graphics.symbol[41].quad(0,0,-24,-24,-48,0,-24,24)
	graphics.symbol[41].quad(0,0,-24,-24,0,-48,24,-24)
	graphics.symbol[41].quad(0,0,24,24,48,0,24,-24)
	graphics.symbol[41].quad(0,0,24,24,0,48,-24,24)
	graphics.symbol[42].strokeWeight(5)
	graphics.symbol[42].stroke(0)
	graphics.symbol[42].noFill()
	graphics.symbol[42].ellipse(0,0,80,80)
	graphics.symbol[42].triangle(-32,-16,-32,16,32,0)
	graphics.symbol[43].strokeWeight(5)
	graphics.symbol[43].stroke(0)
	graphics.symbol[43].noFill()
	graphics.symbol[43].ellipse(0,0,80,80)
	graphics.symbol[43].strokeWeight(12)
	graphics.symbol[43].ellipse(0,0,48,48)
	graphics.symbol[44].strokeWeight(5)
	graphics.symbol[44].stroke(0)
	graphics.symbol[44].noFill()
	graphics.symbol[44].ellipse(0,0,80,80)
	graphics.symbol[44].beginShape()
	graphics.symbol[44].vertex(0,30)
	graphics.symbol[44].vertex(-30,-20)
	graphics.symbol[44].vertex(-10,10)
	graphics.symbol[44].vertex(0,-30)
	graphics.symbol[44].vertex(10,10)
	graphics.symbol[44].vertex(30,-20)
	graphics.symbol[44].endShape(CLOSE)
	graphics.symbol[45].strokeWeight(5)
	graphics.symbol[45].stroke(0)
	graphics.symbol[45].noFill()
	graphics.symbol[45].ellipse(0,0,80,80)
	graphics.symbol[45].rect(0,0,42,42)
	graphics.symbol[46].strokeWeight(5)
	graphics.symbol[46].stroke(0)
	graphics.symbol[46].noFill()
	graphics.symbol[46].ellipse(0,0,80,80)
	graphics.symbol[46].strokeWeight(18)
	graphics.symbol[46].line(0,-24,0,24)
	graphics.symbol[46].line(-24,0,24,0)
	graphics.symbol[47].stroke(0)
	graphics.symbol[47].noFill()
	graphics.symbol[47].strokeWeight(16)
	graphics.symbol[47].line(-12,12,12,-12)
	graphics.symbol[47].arc(25,-25,40,40,45,225)
	graphics.symbol[47].arc(-25,25,40,40,-135,45)
	graphics.symbol[48].strokeWeight(5)
	graphics.symbol[48].stroke(0)
	graphics.symbol[48].noFill()
	graphics.symbol[48].ellipse(0,0,80,80)
	graphics.symbol[48].ellipse(0,20,50,30)
	graphics.symbol[48].line(-25,20,25,20)
	graphics.symbol[48].line(-8,10,-8,15)
	graphics.symbol[48].line(8,10,8,15)
	graphics.symbol[48].ellipse(-12,-6,5,5)
	graphics.symbol[48].ellipse(12,-6,5,5)
}