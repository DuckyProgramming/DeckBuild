function setupLayer(layer){
    layer.angleMode(DEGREES)
	layer.textAlign(CENTER,CENTER)
	layer.rectMode(CENTER)
	layer.colorMode(RGB,255,255,255,1)
}
function setupEncounter(battle,type){
	battle.generation.combatants=types.encounter[type].combatants
	battle.generation.reinforce=types.encounter[type].reinforce
	battle.generation.threshold=types.encounter[type].threshold
	battle.objective=types.encounter[type].objective
}
function displayTransition(layer,transition){
	layer.noStroke()
	layer.fill(0)
	layer.rect(transition.anim*layer.width/4,layer.height/2,transition.anim*layer.width/2,layer.height)
	layer.rect(layer.width-transition.anim*layer.width/4,layer.height/2,transition.anim*layer.width/2,layer.height)
	layer.rect(layer.width/2,transition.anim*layer.height/4,layer.width,transition.anim*layer.height/2)
	layer.rect(layer.width/2,layer.height-transition.anim*layer.height/4,layer.width,transition.anim*layer.height/2)
	if(transition.trigger){
		transition.anim=round(transition.anim*10+1)/10
		if(transition.anim>1.1){
			transition.trigger = false
			stage.scene=transition.scene
		}
	}
	else if(transition.anim>0){
		transition.anim=round(transition.anim*10-1)/10
	}
}
function displayAmmo(layer,x,y,type,fade){
	layer.translate(x,y)
	switch(type){
		case 0:
			layer.stroke(50,255,50,fade)
			layer.strokeWeight(3)
			layer.line(-6,0,6,0)
		break
		case 1:
			layer.stroke(255,50,50,fade)
			layer.strokeWeight(3)
			layer.line(-6,0,6,0)
		break
		case 2:
			layer.noFill()
			layer.stroke(50,255,255,fade)
			layer.strokeWeight(2)
			layer.quad(-4,0,0,-4,4,0,0,4)
		break
		case 3:
			layer.noFill()
			layer.stroke(255,255,125,fade)
			layer.strokeWeight(2)
			layer.ellipse(0,0,8,8)
		break
	}
	layer.translate(-x,-y)
}
function displayIntent(layer,x,y,fade,size,damage,alt,type){
	layer.translate(x,y)
	layer.scale(size)
	switch(type){
		case 1:
			layer.fill(255,50,50,fade)
			layer.triangle(-20,0,15,-6,15,6)
		break
		case 2: case 4: case 5:
			layer.fill(125,255,255,fade)
			layer.ellipse(0,-3,24,24)
		break
		case 3:
			layer.fill(255,50,50,fade)
			layer.triangle(-12,-10,9,-13,9,-7)
			layer.triangle(-16,0,12,-4,12,4)
			layer.triangle(-12,10,9,7,9,13)
		break
	}
	layer.fill(255,fade)
	layer.textSize(20)
	switch(type){
		case 1:
			layer.text(damage,0,0)
		break
		case 2: case 4: case 5:
			layer.text('?',0,-2)
		break
		case 3:
			layer.textSize(16)
			layer.text(damage+'x'+alt,0,0)
		break
	}
	layer.scale(1/size)
	layer.translate(-x,-y)
}
function displayMoon(layer){
	layer.noStroke()
	layer.fill(200)
	layer.arc(550,100,30,30,45,225)
	layer.fill(40,48,50)
	layer.ellipse(555,95,32,32)
}
function regTriangle(layer,x,y,radius,direction){
	layer.triangle(x+sin(direction)*radius,y+cos(direction)*radius,x+sin(direction+120)*radius,y+cos(direction+120)*radius,x+sin(direction+240)*radius,y+cos(direction+240)*radius);
}
function regPoly(layer,x,y,sides,radius,direction){
	layer.beginShape()
	for(k=0;k<sides;k++){
		layer.vertex(x+sin(direction+k*360/sides)*radius,y+cos(direction+k*360/sides)*radius)
	}
	layer.endShape(CLOSE)
}
function pointInsideBox(point,box){
	if(point.position.x>box.position.x-box.width/2&&point.position.x<box.position.x+box.width/2&&point.position.y>box.position.y-box.height/2&&point.position.y<box.position.y+box.height/2){
		return true
	}
	else{
		return false
	}
}
function updateMouse(layer){
	inputs.mouse.x=mouseX
	inputs.mouse.y=mouseY
	inputs.rel.x=(inputs.mouse.x-width/2)/stage.scale+layer.width/2
	inputs.rel.y=(inputs.mouse.y-height/2)/stage.scale+layer.height/2
}
function copyCard(base){
	return new card(base.layer,base.position.x,base.position.y,base.type,base.level,base.color,base.damage,base.alt,base.base.cost)
}
function reformCard(base){
	return new card(base.layer,base.position.x,base.position.y,base.type,base.level,base.color)
}
function generateListing(cards){
	for(a=0,la=listing.card.length;a<la;a++){
		for(b=0;b<4;b++){
			listing.card[a].push([])
		}
	}
	for(a=0,la=cards.length;a<la;a++){
		if(cards[a].list>=0){
			if(cards[a].rarity<0){
				listing.card[cards[a].list][3].push(a)
			}else{
				listing.card[cards[a].list][cards[a].rarity].push(a)
			}
		}
	}
}
function findCard(name){
	for(i=0,li=types.card.length;i<li;i++){
		if(types.card[i].name==name){
			return i
		}
	}
	return -1
}
function findRelic(name){
	for(i=0,li=types.relic.length;i<li;i++){
		if(types.relic[i].name==name){
			return i
		}
	}
	return -1
}
function displayRelicSymbol(layer,x,y,type,direction,size,flip,active){
	layer.translate(x,y)
	layer.rotate(direction)
	layer.scale(size,size*flip)
	layer.noStroke()
	if(active){
		layer.fill(180)
	}else{
		layer.fill(60)
	}
	layer.ellipse(0,0,40,40)
	layer.fill(0)
	layer.textSize(15)
	switch(type){
		case 1:
			layer.text('1',10,1)
			layer.image(graphics.symbol[0],-15,-10,20,20)
		break
		case 2:
			layer.image(graphics.symbol[1],-10,-20,20,20)
			layer.image(graphics.symbol[3],-10,-5,20,20)
		break
		case 3:
			layer.text('E',10,2)
			layer.image(graphics.symbol[4],-15,-10,20,20)
		break
		case 4:
			layer.text('1',10,1)
			layer.textSize(10)
			layer.text('2',-5,0)
			layer.image(graphics.symbol[5],-15,-10,20,20)
		break
		case 5:
			layer.text('1',10,1)
			layer.image(graphics.symbol[6],-15,-10,20,20)
		break
		case 6:
			layer.text('1',10,1)
			layer.textSize(10)
			layer.text('8',-5,0)
			layer.image(graphics.symbol[7],-15,-10,20,20)
		break
		case 7:
			layer.text('1',10,1)
			layer.textSize(10)
			layer.text('10',-5,0)
			layer.image(graphics.symbol[2],-15,-10,20,20)
		break
		case 8:
			layer.textSize(10)
			layer.text('2',0,-5)
			layer.image(graphics.symbol[8],-15,-20,30,30)
			layer.image(graphics.symbol[9],-8,5,16,16)
		break
		case 9:
			layer.textSize(10)
			layer.text('2',-10,1)
			layer.image(graphics.symbol[8],-25,-15,30,30)
			layer.image(graphics.symbol[10],-2,-10,20,20)
		break
		case 10:
			layer.text('1',10,1)
			layer.image(graphics.symbol[2],-15,-10,20,20)
			layer.image(graphics.symbol[11],-13,-8,16,16)
		break
		case 11:
			layer.textSize(10)
			layer.text('3',0,1)
			layer.image(graphics.symbol[1],-10,-20,20,20)
			layer.image(graphics.symbol[12],-10,0,20,20)
		break
		case 12:
			layer.textSize(10)
			layer.text('3',-5,0)
			layer.image(graphics.symbol[5],-15,-10,20,20)
			layer.image(graphics.symbol[13],0,-10,20,20)
		break
		case 13:
			layer.text('$',10,1)
			layer.textSize(10)
			layer.text('A',-5,0)
			layer.image(graphics.symbol[5],-15,-10,20,20)
		break
		case 14:
			layer.textSize(10)
			layer.text('A',0,-5)
			layer.image(graphics.symbol[5],-10,-15,20,20)
			layer.image(graphics.symbol[9],-8,5,16,16)
		break
		case 15:
			layer.text('3',5,-5)
			layer.textSize(10)
			layer.text('1',-10,1)
			layer.image(graphics.symbol[8],-25,-15,30,30)
			layer.image(graphics.symbol[1],0,-5,18,18)
		break
		case 16:
			layer.text('1',10,1)
			layer.textSize(10)
			layer.text('1',-5,1)
			layer.image(graphics.symbol[8],-20,-15,30,30)
		break
		case 17:
			layer.text('$',-5,1)
			layer.text('$',10,1)
			layer.image(graphics.symbol[14],-15,-10,20,20)
		break
		case 18:
			layer.text('$',10,1)
			layer.image(graphics.symbol[4],-15,-10,20,20)
		break
		case 19:
			layer.text('10',10,1)
			layer.textSize(10)
			layer.text('x2',-8,1)
			layer.image(graphics.symbol[7],-18,-10,20,20)
		break
		case 20:
			layer.text('1',10,1)
			layer.image(graphics.symbol[2],-15,-10,20,20)
			layer.image(graphics.symbol[15],-13,-8,16,16)
		break
		case 21:
			layer.text('C',0,1)
			layer.image(graphics.symbol[5],-12,-12,24,24)
			layer.image(graphics.symbol[14],-16,-16,32,32)
		break
		case 22:
			layer.textSize(10)
			layer.text('1',-10,1)
			layer.text('10',8,1)
			layer.image(graphics.symbol[7],-2,-10,20,20)
			layer.image(graphics.symbol[8],-25,-15,30,30)
		break
		case 23:
			layer.textSize(10)
			layer.text('-20%',0,9)
			layer.image(graphics.symbol[16],-10,-17,20,20)
		break
		case 24:
			layer.textSize(10)
			layer.text('15',0,3)
			layer.image(graphics.symbol[4],-9,-20,18,18)
			layer.image(graphics.symbol[9],-8,5,16,16)
		break
		case 25:
			layer.textSize(10)
			layer.text('$60',0,13)
			layer.image(graphics.symbol[5],-9,-13,18,18)
			layer.image(graphics.symbol[14],-12,-16,24,24)
		break
		case 26:
			layer.image(graphics.symbol[17],-10,-15,20,20)
			layer.textSize(10)
			layer.text('+7',0,11)
		break
		case 27:
			layer.textSize(10)
			layer.text('<5',0,1)
			layer.image(graphics.symbol[7],-15,-15,30,30)
		break
		case 28:
			layer.text('1',10,1)
			layer.image(graphics.symbol[7],-15,-10,20,20)
			layer.image(graphics.symbol[15],-13,-8,16,16)
		break
		case 29:
			layer.textSize(10)
			layer.text('+',0,6)
			layer.image(graphics.symbol[1],-10,-20,20,20)
			layer.image(graphics.symbol[5],-10,-5,20,20)
		break
		case 30:
			layer.textSize(10)
			layer.text('+',-10,0)
			layer.text('2',8,0)
			layer.image(graphics.symbol[5],-20,-10,20,20)
			layer.image(graphics.symbol[7],-2,-10,20,20)
		break
		case 31:
			layer.textSize(10)
			layer.text('+',-10,0)
			layer.text('2',8,0)
			layer.image(graphics.symbol[5],-20,-10,20,20)
			layer.image(graphics.symbol[2],-2,-10,20,20)
		break
		case 32:
			layer.textSize(10)
			layer.text('+',-10,0)
			layer.text('2',8,0)
			layer.image(graphics.symbol[5],-20,-10,20,20)
			layer.image(graphics.symbol[18],-2,-10,20,20)
		break
		case 33:
			layer.textSize(10)
			layer.text('<50%',0,11)
			layer.image(graphics.symbol[4],2,-12,16,16)
			layer.image(graphics.symbol[7],-18,-14,20,20)
			layer.image(graphics.symbol[15],-16,-12,16,16)
		break
		case 34:
			layer.textSize(10)
			layer.text('<1',0,15)
			layer.image(graphics.symbol[19],-10,-14,20,20)
			layer.image(graphics.symbol[14],-15,-19,30,30)
		break
		case 35:
			layer.textSize(10)
			layer.text('1',0,5)
			layer.image(graphics.symbol[1],-10,-20,20,20)
			layer.image(graphics.symbol[20],-10,-5,20,20)
		break
		case 36:
			layer.text('1',10,1)
			layer.image(graphics.symbol[21],-15,-10,20,20)
			layer.image(graphics.symbol[15],-13,-8,16,16)
		break
		case 37:
			layer.textSize(10)
			layer.text('+2',0,13)
			layer.image(graphics.symbol[23],-12,-16,24,24)
		break
		/*
		0-Redraw
		1-ArrowRight
		2-Defense
		3-Dodge
		4-Health
		5-Card
		6-Miracle
		7-Damage
		8-Energy
		9-Rest
		10-NoDamage
		11-ArrowDown
		12-ArrowLeft
		13-Water
		14-No
		15-UpArrow
		16-Elite
		17-MaxHealth
		18-Power
		19-Combo
		20-Faith
		21-Focus
		22-Balance
		23-Max Balance
		*/
	}
	layer.scale(1/size,1/size/flip)
	layer.rotate(-direction)
	layer.translate(-x,-y)
}