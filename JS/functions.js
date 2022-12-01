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
	battle.objective=[]
	for(i=0,li=types.encounter[type].objective.length;i<li;i++){
		battle.objective.push(types.encounter[type].objective[i])
	}
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
function displayAmmo(layer,x,y,type,detail,fade){
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
		case 4:
			layer.noFill()
			layer.stroke(50,0,50,fade)
			layer.strokeWeight(3)
			layer.triangle(-4,-2,-4,2,4,0)
			layer.fill(255,fade)
			layer.noStroke()
			layer.textSize(15)
			layer.text(detail,0,1)
		break
		case 5:
			layer.stroke(255,205,50,fade)
			layer.strokeWeight(2)
			layer.line(-5,-5,5,5)
			layer.line(-5,5,5,-5)
		break
		case 6:
			layer.noFill()
			layer.stroke(255,255,150,fade)
			layer.strokeWeight(2)
			regPoly(layer,0,0,6,6,0)
		break
		case 7:
			layer.noFill()
			layer.stroke(150,0,0,fade)
			layer.strokeWeight(2)
			layer.beginShape()
			layer.vertex(0,6)
			layer.vertex(-6,-4)
			layer.vertex(-2,2)
			layer.vertex(0,-6)
			layer.vertex(2,2)
			layer.vertex(6,-4)
			layer.endShape(CLOSE)
		break
		case 8:
			layer.noFill()
			layer.stroke(155,255,255,fade)
			layer.strokeWeight(2)
			layer.rect(0,0,7,7)
		break
		case 9:
			layer.noFill()
			layer.stroke(155,255,155,fade)
			layer.strokeWeight(3)
			layer.line(0,-4,0,4)
			layer.line(-4,0,4,0)
		break
	}
	layer.translate(-x,-y)
}
function displayIntent(layer,x,y,fade,size,damage,alt,type){
	layer.translate(x,y)
	layer.scale(size)
	switch(type){
		case 1:
			layer.fill(255,50,50,fade*3/4)
			layer.triangle(-20,0,15,-6,15,6)
		break
		case 2: case 4: case 5:
			layer.fill(125,255,255,fade*3/4)
			layer.ellipse(0,-3,24,24)
		break
		case 3:
			layer.fill(255,50,50,fade*3/4)
			layer.triangle(-12,-10,9,-13,9,-7)
			layer.triangle(-16,0,12,-4,12,4)
			layer.triangle(-12,10,9,7,9,13)
		break
		case 6:
			layer.fill(150,255,150,fade*3/4)
			layer.ellipse(0,0,15,15)
			layer.fill(255,50,50,fade*3/4)
			layer.triangle(-20,0,15,-6,15,6)
		break
		case 7:
			layer.fill(150,255,150,fade*3/4)
			layer.triangle(-12,-8,12,-8,0,12)
		break
		case 8: case 16: case 22: case 23:
			layer.fill(150,175,200,fade*3/4)
			layer.triangle(-8,-5,8,-5,0,-9)
			layer.arc(0,-5,16,28,0,180)
		break
		case 9:
			layer.fill(200,0,0,fade*3/4)
			layer.ellipse(0,0,15,15)
			layer.fill(255,50,50,fade*3/4)
			layer.triangle(-20,0,15,-6,15,6)
		break
		case 10:
			layer.fill(150,50,50,fade*3/4)
			layer.ellipse(0,0,15,15)
			layer.fill(255,50,50,fade*3/4)
			layer.triangle(-20,0,15,-6,15,6)
		break
		case 11: case 19:
			layer.fill(150,255,150,fade*3/4)
			layer.ellipse(0,-3,24,24)
		break
		case 12:
			layer.fill(150,255,150,fade*3/4)
			layer.ellipse(0,0,24,24)
			layer.fill(255,50,50,fade*3/4)
			layer.triangle(0,0,-15,-9,-9,-15)
			layer.triangle(0,0,15,-9,9,-15)
			layer.triangle(0,0,-15,9,-9,15)
			layer.triangle(0,0,15,9,9,15)
		break
		case 13:
			layer.fill(120,40,120,fade*3/4)
			layer.ellipse(0,-3,24,24)
		break
		case 14:
			layer.fill(150,175,200,fade*3/4)
			layer.triangle(-8,-5,8,-5,0,-9)
			layer.arc(0,-5,16,28,0,180)
			layer.fill(255,50,50,fade*3/4)
			layer.triangle(-20,0,15,-6,15,6)
		break
		case 15: case 17:
			layer.fill(150,255,150,fade*3/4)
			layer.triangle(-12,-8,12,-8,0,12)
			layer.fill(255,50,50,fade*3/4)
			layer.triangle(-20,0,15,-6,15,6)
		break
		case 19:
			layer.fill(255,125,125,fade*3/4)
			layer.rect(0,0,8,24)
			layer.rect(0,0,24,8)
		break
		case 20:
			layer.fill(255,150,0,fade*3/4)
			layer.ellipse(0,0,15,15)
			layer.fill(255,50,50,fade*3/4)
			layer.triangle(-20,0,15,-6,15,6)
		break
	}
	layer.fill(255,fade)
	layer.textSize(20)
	switch(type){
		case 1: case 6: case 7: case 8: case 10: case 12: case 16: case 18: case 20:
			layer.text(damage,0,1)
		break
		case 2: case 4: case 5: case 11: case 13: case 19:
			layer.text('?',0,-2)
		break
		case 3:
			layer.textSize(16)
			layer.text(damage+'x'+alt,0,0)
		break
		case 9: case 14: case 15: case 17: case 22: case 23:
			layer.textSize(16)
			layer.text(damage+'|'+alt,0,1)
		break
		case 21:
			layer.text('x',0,-2)
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
	inputs.rel.x=(inputs.mouse.x-width/2)/stage.scale/stage.quality+layer.width/2/stage.quality
	inputs.rel.y=(inputs.mouse.y-height/2)/stage.scale/stage.quality+layer.height/2/stage.quality
}
function copyCard(base){
	return new card(base.layer,base.position.x,base.position.y,base.type,base.level,base.color,base.damage,base.alt,base.base.cost)
}
function reformCard(base){
	return new card(base.layer,base.position.x,base.position.y,base.type,base.level,base.color)
}
function copyList(base){
	i=[]
	for(j=0,lj=base.length;j<lj;j++){
		i.push(base[j])
	}
	return i
}
function quickAdd(name){
	current.hand.add(findCard(name),0,0)
}
function outList(player){
	print('Common: '+listing.card[player][0].length+
	'\nUncommon: '+listing.card[player][1].length+
	'\nRare: '+listing.card[player][2].length+
	'\nTotal: '+(listing.card[player][0].length+listing.card[player][1].length+listing.card[player][2].length))
}
function outEvent(){
	print('All: '+zones[0].events[0].length+
	'\n'+types.combatant[1].name+': '+zones[0].events[1].length+
	'\n'+types.combatant[2].name+': '+zones[0].events[2].length+
	'\n'+types.combatant[3].name+': '+zones[0].events[3].length+
	'\n'+types.combatant[4].name+': '+zones[0].events[4].length+
	'\nTotal: '+(zones[0].events[0].length+zones[0].events[1].length+zones[0].events[2].length+zones[0].events[3].length+zones[0].events[4].length))
}
function generateListing(cards,encounters,events){
	for(a=0,la=listing.card.length;a<la;a++){
		for(b=0;b<4;b++){
			listing.card[a].push([])
		}
	}
	for(a=0,la=cards.length;a<la;a++){
		if(cards[a].list>=0){
			if(cards[a].rarity>=0){
				listing.card[14][0].push(a)
			}
			if(cards[a].rarity<0){
				listing.card[cards[a].list][3].push(a)
			}else{
				listing.card[cards[a].list][cards[a].rarity].push(a)
				listing.card[13][cards[a].rarity].push(a)
			}
		}
	}
	for(a=0,la=encounters.length;a<la;a++){
		if(encounters[a].class>=0){
			zones[encounters[a].zone].encounters[encounters[a].class].push(a)
		}
	}
	for(a=0,la=events.length;a<la;a++){
		if(events[a].list>=0){
			for(b=0,lb=zones.length;b<lb;b++){
				zones[b].events[events[a].list].push(a)
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
function findPotion(name){
	for(i=0,li=types.potion.length;i<li;i++){
		if(types.potion[i].name==name){
			return i
		}
	}
	return -1
}
function findEvent(name){
	for(i=0,li=types.event.length;i<li;i++){
		if(types.event[i].name==name){
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
			layer.textSize(10)
			layer.text('2',-5,10)
			layer.image(graphics.symbol[4],-15,-15,20,20)
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
			layer.text('1',-10,1)
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
			layer.text('<5',-9,1)
			layer.text('5',9,1)
			layer.image(graphics.symbol[7],-19,-10,20,20)
			layer.image(graphics.symbol[7],-1,-10,20,20)
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
		case 38:
			layer.text('C',0,-3)
			layer.image(graphics.symbol[5],-12,-16,24,24)
			layer.image(graphics.symbol[1],-10,2,20,20)
		break
		case 39:
			layer.textSize(16)
			layer.text('C',-8,0)
			layer.textSize(10)
			layer.text('+6',0,13)
			layer.image(graphics.symbol[5],-18,-12,20,20)
			layer.image(graphics.symbol[17],1,-9,14,14)
		break
		case 40:
			layer.textSize(10)
			layer.text('+0.5',0,13)
			layer.image(graphics.symbol[5],-18,-8,16,16)
			layer.image(graphics.symbol[9],-8,-20,16,16)
			layer.image(graphics.symbol[4],2,-8,16,16)
		break
		case 41:
			layer.textSize(10)
			layer.text('+',-10,0)
			layer.text('A',8,0)
			layer.image(graphics.symbol[5],-20,-10,20,20)
			layer.image(graphics.symbol[7],-2,-10,20,20)
		break
		case 42:
			layer.textSize(10)
			layer.text('+',-10,0)
			layer.text('A',8,0)
			layer.image(graphics.symbol[5],-20,-10,20,20)
			layer.image(graphics.symbol[2],-2,-10,20,20)
		break
		case 43:
			layer.textSize(10)
			layer.text('+',-10,0)
			layer.text('A',8,0)
			layer.image(graphics.symbol[5],-20,-10,20,20)
			layer.image(graphics.symbol[18],-2,-10,20,20)
		break
		case 44:
			layer.textSize(10)
			layer.text('1',-8,6)
			layer.text('1',8,6)
			layer.image(graphics.symbol[25],-10,-20,20,20)
			layer.image(graphics.symbol[5],-16,-2,16,16)
			layer.image(graphics.symbol[8],-4,-6,24,24)
		break
		case 45:
			layer.text('2',10,1)
			layer.textSize(10)
			layer.text('14',-5,0)
			layer.image(graphics.symbol[2],-15,-10,20,20)
		break
		case 46:
			layer.textSize(10)
			layer.text('10',-8,-2)
			layer.text('1',8,-2)
			layer.image(graphics.symbol[5],-2,-13,20,20)
			layer.image(graphics.symbol[5],-18,-13,20,20)
			layer.image(graphics.symbol[1],-10,2,20,20)
		break
		case 47:
			layer.textSize(10)
			layer.text('3',8,1)
			layer.image(graphics.symbol[7],-2,-10,20,20)
			layer.image(graphics.symbol[2],-20,-10,20,20)
			layer.image(graphics.symbol[15],-18,-8,16,16)
		break
		case 48:
			layer.textSize(10)
			layer.text('3',9,1)
			layer.text('5',-9,1)
			layer.image(graphics.symbol[2],-1,-10,20,20)
			layer.image(graphics.symbol[7],-19,-10,20,20)
		break
		case 49:
			layer.textSize(10)
			layer.text('<50%',0,11)
			layer.text('+12',-8,-3)
			layer.image(graphics.symbol[4],2,-12,16,16)
		break
		case 50:
			layer.textSize(10)
			layer.text('3',0,-4)
			layer.image(graphics.symbol[7],-10,-15,20,20)
			layer.image(graphics.symbol[1],-10,2,20,20)
		break
		case 51:
			layer.textSize(10)
			layer.text('-1',8,0)
			layer.image(graphics.symbol[18],-20,-10,20,20)
			layer.image(graphics.symbol[5],-4,-12,24,24)
			layer.image(graphics.symbol[8],-7,-15,30,30)
		break
		case 52:
			layer.textSize(10)
			layer.text('3',9,1)
			layer.text('4',-10,1)
			layer.image(graphics.symbol[2],-20,-10,20,20)
			layer.image(graphics.symbol[7],-1,-10,20,20)
		break
		case 53:
			layer.textSize(10)
			layer.text('25',6,9)
			layer.image(graphics.symbol[26],-10,-17,20,20)
			layer.image(graphics.symbol[4],-12,2,12,12)
		break
		case 54:
			layer.image(graphics.symbol[17],-10,-15,20,20)
			layer.textSize(10)
			layer.text('+10',0,11)
		break
		case 55:
			layer.image(graphics.symbol[5],-14,-16,16,16)
			layer.image(graphics.symbol[5],-14,0,16,16)
			layer.image(graphics.symbol[5],-2,-16,16,16)
			layer.image(graphics.symbol[5],-2,0,16,16)
		break
		case 56:
			layer.textSize(10)
			layer.text('3',8,1)
			layer.image(graphics.symbol[7],-2,-10,20,20)
			layer.image(graphics.symbol[7],-20,-10,20,20)
			layer.image(graphics.symbol[15],-18,-8,16,16)
		break
		case 57:
			layer.textSize(10)
			layer.text('+4',11,0)
			layer.image(graphics.symbol[17],-15,-13,20,20)
			layer.image(graphics.symbol[9],-8,6,16,16)
		break
		case 58:
			layer.textSize(10)
			layer.text('1',13,0)
			layer.image(graphics.symbol[0],-22,-16,32,32)
			layer.image(graphics.symbol[5],-16,-10,20,20)
			layer.image(graphics.symbol[8],1,-12,24,24)
		break
		case 59:
			layer.text('$',0,1)
			layer.image(graphics.symbol[5],-22,-10,20,20)
			layer.image(graphics.symbol[5],2,-10,20,20)
		break
		case 60:
			layer.textSize(10)
			layer.text('75%',0,13)
			layer.image(graphics.symbol[2],-10,-15,20,20)
			layer.image(graphics.symbol[11],-8,-13,16,16)
		break
		case 61:
			layer.textSize(10)
			layer.text('3',-8,0)
			layer.image(graphics.symbol[2],-18,-10,20,20)
			layer.image(graphics.symbol[13],-2,-10,20,20)
		break
		case 62:
			layer.textSize(10)
			layer.text('50%',0,13)
			layer.image(graphics.symbol[7],-10,-15,20,20)
			layer.image(graphics.symbol[11],-8,-13,16,16)
		break
		case 63:
			layer.image(graphics.symbol[27],-8,-20,16,16)
			layer.image(graphics.symbol[2],-20,-7,20,20)
			layer.image(graphics.symbol[7],-1,-7,20,20)
			layer.image(graphics.symbol[15],-18,-5,16,16)
		break
		case 64:
			layer.textSize(10)
			layer.text('+',-6,0)
			layer.image(graphics.symbol[19],-16,-10,20,20)
			layer.image(graphics.symbol[13],2,-10,20,20)
		break
		case 65:
			layer.text('1',10,1)
			layer.textSize(10)
			layer.text('C',-5,0)
			layer.image(graphics.symbol[28],-15,-10,20,20)
		break
		case 66:
			layer.text('1',10,1)
			layer.image(graphics.symbol[29],-15,-10,20,20)
		break
		case 67:
			layer.image(graphics.symbol[22],-18,-12,24,24)
			layer.image(graphics.symbol[14],-18,-12,24,24)
			layer.image(graphics.symbol[11],2,-10,20,20)
		break
		case 68:
			layer.textSize(10)
			layer.text('2',-8,10)
			layer.image(graphics.symbol[4],-18,-15,20,20)
			layer.image(graphics.symbol[18],-2,-10,20,20)
		break
		case 69:
			layer.textSize(10)
			layer.text('-15',0,5)
			layer.image(graphics.symbol[2],-10,-20,20,20)
			layer.image(graphics.symbol[1],-10,5,20,20)
		break
		case 70:
			layer.text('3',10,1)
			layer.textSize(10)
			layer.text('18',-5,0)
			layer.image(graphics.symbol[2],-15,-10,20,20)
		break
		case 71:
			layer.textSize(10)
			layer.text('X',-8,0)
			layer.text('?',8,0)
			layer.image(graphics.symbol[5],-18,-10,20,20)
			layer.image(graphics.symbol[5],-2,-10,20,20)
		break
		case 72:
			layer.text('1',0,13)
			layer.textSize(16)
			layer.text('C',9,0)
			layer.image(graphics.symbol[5],-1,-12,20,20)
			layer.image(graphics.symbol[7],-19,-12,20,20)
			layer.image(graphics.symbol[15],-17,-10,16,16)
		break
		case 73:
			layer.text('1',10,1)
			layer.image(graphics.symbol[30],-15,-10,20,20)
		break
		case 74:
			layer.text('1',10,1)
			layer.textSize(10)
			layer.text('1',-5,0)
			layer.image(graphics.symbol[0],-15,-10,20,20)
		break
		case 75:
			layer.image(graphics.symbol[14],-15,-15,30,30)
			layer.image(graphics.symbol[7],-10,-10,20,20)
			layer.image(graphics.symbol[11],-8,-8,16,16)
		break
		case 76:
			layer.image(graphics.symbol[14],-15,-15,30,30)
			layer.image(graphics.symbol[13],-14,-14,28,28)
			layer.image(graphics.symbol[15],-8,-8,16,16)
		break
		case 77:
			layer.image(graphics.symbol[14],-15,-15,30,30)
			layer.image(graphics.symbol[2],-10,-10,20,20)
			layer.image(graphics.symbol[11],-8,-8,16,16)
		break
		case 78:
			layer.textSize(10)
			layer.text('+1',0,-5)
			layer.image(graphics.symbol[7],-10,-15,20,20)
			layer.image(graphics.symbol[9],-8,6,16,16)
		break
		case 79:
			layer.image(graphics.symbol[8],-25,-18,30,30)
			layer.image(graphics.symbol[8],-5,-18,30,30)
			layer.image(graphics.symbol[1],-8,2,16,16)
		break
		case 80:
			layer.text('5',5,-5)
			layer.textSize(10)
			layer.text('1',-10,1)
			layer.image(graphics.symbol[31],-20,-10,20,20)
			layer.image(graphics.symbol[1],0,-5,18,18)
		break
		case 81:
			layer.textSize(10)
			layer.text('50%',0,11)
			layer.image(graphics.symbol[14],-12,-18,24,24)
			layer.image(graphics.symbol[25],-8,-14,16,16)
		break
		case 82:
			layer.image(graphics.symbol[17],-10,-15,20,20)
			layer.textSize(10)
			layer.text('+14',0,11)
		break
		case 83:
			layer.textSize(40)
			layer.text('$',0,2)
			layer.image(graphics.symbol[15],-24,-10,20,20)
			layer.image(graphics.symbol[15],4,-10,20,20)
		break
		case 84:
			layer.image(graphics.symbol[14],-13,-18,26,26)
			layer.image(graphics.symbol[5],-10,-15,20,20)
			layer.image(graphics.symbol[9],-8,6,16,16)
		break
		case 85:
			layer.textSize(10)
			layer.text('<3',-8,0)
			layer.text('+3',8,0)
			layer.image(graphics.symbol[5],-18,-10,20,20)
			layer.image(graphics.symbol[5],-2,-10,20,20)
		break
		case 86:
			layer.image(graphics.symbol[5],-22,-10,20,20)
			layer.image(graphics.symbol[5],2,-10,20,20)
			layer.image(graphics.symbol[5],-6,-6,12,12)
		break
		case 87:
			layer.image(graphics.symbol[32],-10,-15,20,20)
			layer.image(graphics.symbol[9],-8,6,16,16)
		break
		case 88:
			layer.text('1',10,1)
			layer.textSize(10)
			layer.text('52',-5,0)
			layer.image(graphics.symbol[7],-15,-10,20,20)
		break
		case 89:
			layer.text('1',10,1)
			layer.textSize(10)
			layer.text('4',-8,0)
			layer.image(graphics.symbol[33],-18,-10,20,20)
		break
		case 90:
			layer.textSize(10)
			layer.text('≤5',-9,1)
			layer.text('1',9,1)
			layer.image(graphics.symbol[7],-19,-10,20,20)
			layer.image(graphics.symbol[7],-1,-10,20,20)
		break
		case 91:
			layer.textSize(10)
			layer.text('-1',0,0)
			layer.image(graphics.symbol[7],-15,-15,30,30)
		break
		case 92:
			layer.textSize(10)
			layer.text('0',-8,0)
			layer.text('1',8,0)
			layer.image(graphics.symbol[5],-18,-10,20,20)
			layer.image(graphics.symbol[5],-2,-10,20,20)
		break
		case 93:
			layer.textSize(10)
			layer.text('X',-10,0)
			layer.text('3',8,0)
			layer.image(graphics.symbol[5],-20,-10,20,20)
			layer.image(graphics.symbol[7],-2,-10,20,20)
		break
		case 94:
			layer.image(graphics.symbol[4],-10,-15,20,20)
			layer.textSize(10)
			layer.text('x2',0,11)
		break
		case 95:
			layer.textSize(10)
			layer.text('3',8,0)
			layer.image(graphics.symbol[1],-15,-5,10,10)
			layer.image(graphics.symbol[5],-20,-10,20,20)
			layer.image(graphics.symbol[7],-2,-10,20,20)
		break
		case 96:
			layer.textSize(10)
			layer.text('3',8,0)
			layer.image(graphics.symbol[1],-15,-5,10,10)
			layer.image(graphics.symbol[5],-20,-10,20,20)
			layer.image(graphics.symbol[2],-2,-10,20,20)
		break
		case 97:
			layer.textSize(10)
			layer.text('1',7,-5)
			layer.image(graphics.symbol[5],-20,-10,20,20)
			layer.image(graphics.symbol[2],-3,-15,20,20)
			layer.image(graphics.symbol[1],-2,0,18,18)
		break
		case 98:
			layer.text('1',10,1)
			layer.image(graphics.symbol[34],-20,-15,30,30)
		break
		case 99:
			layer.textSize(10)
			layer.text('2',0,0)
			layer.image(graphics.symbol[5],-18,-18,36,36)
			layer.image(graphics.symbol[19],-10,-10,20,20)
		break
		case 100:
			layer.image(graphics.symbol[28],-14,-14,28,28)
			layer.image(graphics.symbol[7],-10,-10,20,20)
			layer.image(graphics.symbol[15],-8,-8,16,16)
		break
		case 101:
			layer.text('1',10,1)
			layer.image(graphics.symbol[7],-13,-8,16,16)
			layer.image(graphics.symbol[29],-15,-10,20,20)
		break
		case 102:
			layer.image(graphics.symbol[35],-20,-25,40,40)
		break
		case 103:
			layer.textSize(10)
			layer.text('X',-8,0)
			layer.text('+2',8,0)
			layer.image(graphics.symbol[5],-18,-10,20,20)
		break
		case 104:
			layer.text('1',10,1)
			layer.image(graphics.symbol[36],-20,-15,30,30)
		break
		case 105:
			layer.textSize(10)
			layer.text('x2',8,0)
			layer.image(graphics.symbol[5],-18,-10,20,20)
		break
		case 106:
			layer.image(graphics.symbol[2],-20,-10,20,20)
			layer.image(graphics.symbol[2],0,-10,20,20)
			layer.image(graphics.symbol[7],-17,-7,14,14)
			layer.image(graphics.symbol[11],2,-8,16,16)
		break
		case 107:
			layer.image(graphics.symbol[4],-18,-12,16,16)
			layer.image(graphics.symbol[17],-2,-12,16,16)
			layer.textSize(10)
			layer.text('+7',0,11)
		break
		case 108:
			layer.text('S',0,-3)
			layer.image(graphics.symbol[5],-12,-16,24,24)
			layer.image(graphics.symbol[1],-10,2,20,20)
		break
		case 109:
			layer.text('$/2',0,2)
		break
		case 110:
			layer.image(graphics.symbol[5],-18,-2,12,12)
			layer.image(graphics.symbol[5],-12,-14,12,12)
			layer.image(graphics.symbol[5],-6,-2,12,12)
			layer.image(graphics.symbol[5],0,-14,12,12)
			layer.image(graphics.symbol[5],6,-2,12,12)
		break
		case 111:
			layer.image(graphics.symbol[5],-18,-6,12,12)
			layer.image(graphics.symbol[5],-6,-15,12,12)
			layer.image(graphics.symbol[5],6,-6,12,12)
			layer.image(graphics.symbol[5],-6,3,12,12)
		break
		case 112:
			layer.image(graphics.symbol[16],-20,-10,20,20)
			layer.image(graphics.symbol[7],-2,-10,20,20)
			layer.image(graphics.symbol[15],0,-8,16,16)
		break
		case 113:
			layer.textSize(10)
			layer.text('X',-8,0)
			layer.text('50%',9,0)
			layer.image(graphics.symbol[5],-18,-10,20,20)
		break
		case 114:
			layer.textSize(10)
			layer.text('6',13,0)
			layer.image(graphics.symbol[0],-22,-16,32,32)
			layer.image(graphics.symbol[5],-16,-10,20,20)
			layer.image(graphics.symbol[2],5,-8,16,16)
		break
		case 115:
			layer.text('1',10,1)
			layer.textSize(10)
			layer.text('o',-5,0)
			layer.image(graphics.symbol[5],-15,-10,20,20)
		break
		case 116:
			layer.image(graphics.symbol[7],-19,-10,20,20)
			layer.image(graphics.symbol[7],-1,-10,20,20)
			layer.image(graphics.symbol[15],-17,-8,16,16)
			layer.image(graphics.symbol[15],1,-8,16,16)
		break
		case 117:
			layer.text('2',0,-3)
			layer.textSize(10)
			layer.image(graphics.symbol[37],-15,-20,30,30)
			layer.image(graphics.symbol[1],-10,0,20,20)
		break
		case 118:
			layer.text('1',10,1)
			layer.textSize(10)
			layer.text('4',-5,0)
			layer.image(graphics.symbol[19],-15,-10,20,20)
		break
		case 119:
			layer.textSize(10)
			layer.text('3',9,-2)
			layer.image(graphics.symbol[0],-22,-12,24,24)
			layer.image(graphics.symbol[5],-17.5,-7.5,15,15)
			layer.image(graphics.symbol[38],-2,-11,22,22)
		break
		case 120:
			layer.image(graphics.symbol[29],-10,-15,20,20)
			layer.image(graphics.symbol[1],-10,0,20,20)
		break
		case 121:
			layer.textSize(10)
			layer.text('10',10,0)
			layer.image(graphics.symbol[22],-19,-10,20,20)
			layer.image(graphics.symbol[14],-19,-10,20,20)
			layer.image(graphics.symbol[7],0,-10,20,20)
		break
		case 122:
			layer.textSize(10)
			layer.text('50%',0,11)
			layer.text('+',0,-5)
			layer.image(graphics.symbol[5],-10,-15,20,20)
		break
		case 123:
			layer.textSize(8)
			layer.text('-',-14,0)
			layer.text('-',14,0)
			layer.image(graphics.symbol[8],-15,-15,30,30)
			layer.image(graphics.symbol[5],-20,-6,12,12)
			layer.image(graphics.symbol[5],8,-6,12,12)
		break
		case 124:
			layer.textSize(10)
			layer.text('C',0,-12)
			layer.image(graphics.symbol[32],4,-8,16,16)
			layer.image(graphics.symbol[32],-20,-8,16,16)
			layer.image(graphics.symbol[32],-8,4,16,16)
			layer.image(graphics.symbol[5],-8,-20,16,16)
		break
		case 125:
			layer.image(graphics.symbol[8],-15,-20,30,30)
			layer.image(graphics.symbol[4],-16,0,12,12)
			layer.image(graphics.symbol[9],4,0,12,12)
		break
		case 126:
			layer.textSize(8)
			layer.text('C',-14,0)
			layer.text('C',14,0)
			layer.image(graphics.symbol[8],-15,-15,30,30)
			layer.image(graphics.symbol[5],-20,-6,12,12)
			layer.image(graphics.symbol[5],8,-6,12,12)
		break
		case 127:
			layer.textSize(10)
			layer.text('$',-14,0)
			layer.text('$',14,0)
			layer.image(graphics.symbol[8],-15,-15,30,30)
		break
		case 128:
			layer.textSize(10)
			layer.text('50%',0,11)
			layer.text('-',0,-5)
			layer.image(graphics.symbol[5],-10,-15,20,20)
		break
		case 129:
			layer.textSize(10)
			layer.text('+',-10,6)
			layer.image(graphics.symbol[8],-15,-20,30,30)
			layer.image(graphics.symbol[5],-16,0,12,12)
			layer.image(graphics.symbol[9],4,0,12,12)
		break
		case 130:
			layer.text('?',0,0)
			layer.image(graphics.symbol[5],-14,-14,28,28)
			layer.image(graphics.symbol[5],-20,-6,12,12)
			layer.image(graphics.symbol[5],8,-6,12,12)
			layer.image(graphics.symbol[7],-18,-4,8,8)
			layer.image(graphics.symbol[2],10,-4,8,8)
		break
		case 131:
			layer.image(graphics.symbol[8],-15,-15,30,30)
			layer.image(graphics.symbol[24],-20,-6,12,12)
			layer.image(graphics.symbol[7],8,-6,12,12)
			layer.image(graphics.symbol[15],9,-5,10,10)
		break
		case 132:
			layer.text('?',10,6)
			layer.image(graphics.symbol[8],-15,-20,30,30)
			layer.image(graphics.symbol[24],-16,0,12,12)
		break
		case 133:
			layer.text('>',0,-4)
			layer.image(graphics.symbol[1],-10,2,20,20)
			layer.image(graphics.symbol[5],-10,-15,20,20)
			layer.image(graphics.symbol[14],-12,-17,24,24)
		break
		case 134:
			layer.image(graphics.symbol[8],-15,-15,30,30)
			layer.image(graphics.symbol[16],-20,-6,12,12)
			layer.image(graphics.symbol[26],8,-6,12,12)
		break
		case 135:
			layer.textSize(10)
			layer.text('1',0,-5)
			layer.image(graphics.symbol[1],-10,2,20,20)
			layer.image(graphics.symbol[5],-10,-15,20,20)
		break
		case 136:
			layer.textSize(10)
			layer.text('6',-10,0)
			layer.image(graphics.symbol[8],-8,-15,30,30)
			layer.image(graphics.symbol[5],-18,-8,16,16)
		break
		case 137:
			layer.text('E',10,2)
			layer.textSize(10)
			layer.text('6',-5,10)
			layer.image(graphics.symbol[4],-15,-15,20,20)
		break
		case 138:
			layer.image(graphics.symbol[40],-19,-10,20,20)
			layer.image(graphics.symbol[40],-1,-10,20,20)
		break
		case 139:
			layer.image(graphics.symbol[4],-19,-14,20,20)
			layer.image(graphics.symbol[40],-1,-14,20,20)
			layer.textSize(10)
			layer.text('5',0,10)
		break
		case 140:
			layer.image(graphics.symbol[5],-19,-14,20,20)
			layer.image(graphics.symbol[40],-1,-14,20,20)
			layer.textSize(10)
			layer.text('2',0,10)
		break
		case 141:
			layer.image(graphics.symbol[40],-18,-2,12,12)
			layer.image(graphics.symbol[40],-12,-14,12,12)
			layer.image(graphics.symbol[40],-6,-2,12,12)
			layer.image(graphics.symbol[40],0,-14,12,12)
			layer.image(graphics.symbol[40],6,-2,12,12)
		break
		case 142:
			layer.textSize(10)
			layer.text('x2',0,0)
			layer.image(graphics.symbol[40],-16,-16,32,32)
		break
		case 143:
			layer.image(graphics.symbol[8],-8,-15,30,30)
			layer.image(graphics.symbol[40],-18,-8,16,16)
		break
		case 144:
			layer.textSize(10)
			layer.text('W',-10,0)
			layer.image(graphics.symbol[8],-8,-15,30,30)
			layer.image(graphics.symbol[5],-18,-8,16,16)
		break
		case 145:
			layer.image(graphics.symbol[13],-20,-20,40,40)
			layer.image(graphics.symbol[5],-8,-8,16,16)
		break
		case 146:
			layer.textSize(30)
			layer.text('?',0,1)
			layer.image(graphics.symbol[5],-20,-6,12,12)
			layer.image(graphics.symbol[5],8,-6,12,12)
		break
		case 147:
			layer.image(graphics.symbol[5],-19,-10,20,20)
			layer.image(graphics.symbol[7],-1,-10,20,20)
			layer.textSize(10)
			layer.text('0',-9,0)
			layer.text('4',9,0)
		break
		case 148:
			layer.image(graphics.symbol[5],-19,-10,20,20)
			layer.image(graphics.symbol[8],-6,-15,30,30)
			layer.textSize(10)
			layer.text('x',-9,0)
		break
		case 149:
			layer.text('1',0,-10)
			layer.image(graphics.symbol[6],-19,-10,18,18)
			layer.image(graphics.symbol[6],1,-10,18,18)
			layer.image(graphics.symbol[6],-10,1,18,18)
		break
		case 150:
			layer.textSize(10)
			layer.text('$',8,-8)
			layer.image(graphics.symbol[5],-16,0,16,16)
			layer.image(graphics.symbol[17],2,2,12,12)
			layer.image(graphics.symbol[40],-16,-16,16,16)
		break
		case 151:
			layer.image(graphics.symbol[7],-18,-9,12,12)
			layer.image(graphics.symbol[2],-6,-15,12,12)
			layer.image(graphics.symbol[18],6,-9,12,12)
			layer.image(graphics.symbol[14],-9,0,18,18)
			layer.image(graphics.symbol[15],-7,2,14,14)
		break
		case 152:
			layer.textSize(10)
			layer.text('x2',0,8)
			layer.image(graphics.symbol[25],-10,-20,20,20)
			layer.image(graphics.symbol[19],-8,0,16,16)
		break
		case 153:
			layer.textSize(10)
			layer.text('C',0,0)
			layer.image(graphics.symbol[8],-26,-26,52,52)
			layer.image(graphics.symbol[28],-8,-8,16,16)
		break
		case 154:
			layer.image(graphics.symbol[29],-10,-10,20,20)
			layer.image(graphics.symbol[7],-15,-15,30,30)
		break
		case 155:
			layer.image(graphics.symbol[22],-10,-10,20,20)
			layer.image(graphics.symbol[0],-18,-18,36,36)
		break
		case 156:
			layer.textSize(10)
			layer.text('?',0,-5)
			layer.image(graphics.symbol[1],-10,3,20,20)
			layer.image(graphics.symbol[5],-10,-15,20,20)
			layer.image(graphics.symbol[5],-18,-9,12,12)
			layer.image(graphics.symbol[5],6,-9,12,12)
		break
		case 157:
			layer.image(graphics.symbol[4],-10,-10,20,20)
			layer.image(graphics.symbol[14],-15,-15,30,30)
		break
		case 158:
			layer.image(graphics.symbol[17],-10,-15,20,20)
			layer.textSize(10)
			layer.text('+30',0,11)
		break
		case 159:
			layer.textSize(10)
			layer.text('R',-10,0)
			layer.image(graphics.symbol[5],-20,-10,20,20)
			layer.image(graphics.symbol[16],0,-10,20,20)
		break
		case 160:
			layer.text('1',10,1)
			layer.image(graphics.symbol[44],-15,-10,20,20)
		break
		case 161:
			layer.text('1',10,1)
			layer.image(graphics.symbol[45],-15,-10,20,20)
		break
		case 162:
			layer.text('1',10,1)
			layer.image(graphics.symbol[46],-15,-10,20,20)
		break
		case 163:
			layer.text('$',0,1)
			layer.image(graphics.symbol[7],-15,-15,30,30)
		break
		case 164:
			layer.text('$',10,-4)
			layer.textSize(10)
			layer.text('+50%',0,10)
			layer.image(graphics.symbol[24],-18,-15,20,20)
		break
	}
	layer.scale(1/size,1/size/flip)
	layer.rotate(-direction)
	layer.translate(-x,-y)
}
function displayPotionSymbol(layer,x,y,type,direction,size,flip){
	layer.translate(x,y)
	layer.rotate(direction)
	layer.scale(size,size*flip)
	layer.noStroke()
	layer.fill(180)
	layer.ellipse(0,0,30,30)
	layer.fill(0)
	layer.textSize(12)
	switch(type){
		case -1:
			layer.ellipse(0,0,24,24)
		break
		case 1:
			layer.image(graphics.symbol[5],-12,-12,24,24)
			layer.image(graphics.symbol[7],-8,-8,16,16)
		break
		case 2:
			layer.text('+',0,1)
			layer.image(graphics.symbol[5],-12,-12,24,24)
		break
		case 3:
			layer.image(graphics.symbol[2],-12,-12,24,24)
		break
		case 4:
			layer.image(graphics.symbol[4],-12,-12,24,24)
		break
		case 5:
			layer.image(graphics.symbol[6],-12,-12,24,24)
		break
		case 6:
			layer.text('o',0,0)
			layer.image(graphics.symbol[5],-12,-12,24,24)
		break
		case 7:
			layer.image(graphics.symbol[2],-12,-12,24,24)
			layer.image(graphics.symbol[15],-9,-9,18,18)
		break
		case 8:
			layer.image(graphics.symbol[8],-12,-12,24,24)
		break
		case 9:
			layer.image(graphics.symbol[7],-16,-8,16,16)
			layer.image(graphics.symbol[7],0,-8,16,16)
		break
		case 10:
			layer.image(graphics.symbol[2],-12,-12,24,24)
			layer.image(graphics.symbol[11],-9,-9,18,18)
		break
		case 11:
			layer.image(graphics.symbol[7],-12,-12,24,24)
		break
		case 12:
			layer.image(graphics.symbol[27],0,-7,14,14)
			layer.image(graphics.symbol[7],-14,-8,16,16)
			layer.image(graphics.symbol[15],-12,-6,12,12)
		break
		case 13:
			layer.image(graphics.symbol[37],-12,-12,24,24)
		break
		case 14:
			layer.image(graphics.symbol[5],-12,-12,24,24)
			layer.image(graphics.symbol[2],-8,-8,16,16)
		break
		case 15:
			layer.image(graphics.symbol[5],-12,-12,24,24)
			layer.image(graphics.symbol[18],-8,-8,16,16)
		break
		case 16:
			layer.image(graphics.symbol[27],0,-7,14,14)
			layer.image(graphics.symbol[2],-14,-8,16,16)
			layer.image(graphics.symbol[15],-12,-6,12,12)
		break
		case 17:
			layer.image(graphics.symbol[7],-12,-12,24,24)
			layer.image(graphics.symbol[15],-9,-9,18,18)
		break
		case 18:
			layer.image(graphics.symbol[5],-12,-12,24,24)
		break
		case 19:
			layer.image(graphics.symbol[7],-12,-12,24,24)
			layer.image(graphics.symbol[11],-9,-9,18,18)
		break
		case 20:
			layer.image(graphics.symbol[36],-12,-12,24,24)
		break
		case 21:
			layer.image(graphics.symbol[34],-12,-12,24,24)
		break
		case 22:
			layer.text('X',0,1)
			layer.image(graphics.symbol[5],-12,-12,24,24)
		break
		case 23:
			layer.image(graphics.symbol[33],-12,-12,24,24)
		break
		case 24:
			layer.image(graphics.symbol[0],-12,-12,24,24)
		break
		case 25:
			layer.image(graphics.symbol[1],-10,-15,20,20)
			layer.image(graphics.symbol[12],-10,-5,20,20)
		break
		case 26:
			layer.text('<',0,1)
			layer.image(graphics.symbol[5],-12,-12,24,24)
		break
		case 27:
			layer.image(graphics.symbol[39],-12,-12,24,24)
		break
		case 28:
			layer.image(graphics.symbol[1],-8,2,16,16)
			layer.image(graphics.symbol[7],-10,-14,20,20)
			layer.image(graphics.symbol[15],-8,-12,16,16)
		break
		case 29:
			layer.image(graphics.symbol[40],-12,-12,24,24)
		break
		case 30:
			layer.image(graphics.symbol[14],-12,-12,24,24)
			layer.image(graphics.symbol[25],-8,-8,16,16)
		break
		case 31:
			layer.image(graphics.symbol[17],-10,-10,20,20)
		break
		case 32:
			layer.image(graphics.symbol[31],-12,-12,24,24)
		break
		case 33:
			layer.image(graphics.symbol[41],-12,-12,24,24)
		break
		case 34:
			layer.image(graphics.symbol[1],-12,-12,24,24)
		break
		case 35:
			layer.text('?',0,1)
			layer.image(graphics.symbol[5],-12,-12,24,24)
		break
		case 36:
			layer.image(graphics.symbol[30],-12,-12,24,24)
		break
		case 37:
			layer.image(graphics.symbol[19],-12,-12,24,24)
		break
		case 38:
			layer.image(graphics.symbol[7],-13,-12,14,14)
			layer.image(graphics.symbol[7],-1,-12,14,14)
			layer.image(graphics.symbol[7],-7,0,14,14)
		break
		case 39:
			layer.text('-2',0,1)
			layer.image(graphics.symbol[5],-12,-12,24,24)
		break
		case 40:
			layer.text('C',0,1)
			layer.image(graphics.symbol[28],-12,-12,24,24)
		break
		case 41:
			layer.text('W',0,1)
			layer.image(graphics.symbol[28],-12,-12,24,24)
		break
		case 42:
			layer.text('D',0,1)
			layer.image(graphics.symbol[28],-12,-12,24,24)
		break
		case 43:
			layer.image(graphics.symbol[21],-12,-12,24,24)
		break
		case 44:
			layer.image(graphics.symbol[42],-12,-12,24,24)
		break
		case 45:
			layer.image(graphics.symbol[43],-12,-12,24,24)
		break
		case 46:
			layer.image(graphics.symbol[22],-12,-16,24,24)
			layer.image(graphics.symbol[12],-8,0,16,16)
		break
		case 47:
			layer.image(graphics.symbol[22],-12,-16,24,24)
			layer.image(graphics.symbol[1],-8,0,16,16)
		break
		case 48:
			layer.image(graphics.symbol[35],-16,-18,32,32)
		break
		case 49:
			layer.image(graphics.symbol[44],-10,-10,20,20)
		break
	}
	layer.scale(1/size,1/size/flip)
	layer.rotate(-direction)
	layer.translate(-x,-y)
}
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
13-DamageTaken
14-No
15-ArrowUp
16-Elite
17-MaxHealth
18-Power
19-Combo
20-Faith
21-Focus
22-Balance
23-MaxBalance
24-Enemy
25-Dead
26-Boss
27-Time
28-Stance
29-BasicCharge
30-Buffer
31-Intangible
32-Relic
33-Armor
34-Shiv
35-Armed
36-Control
37-Poison
38-Scry
39-Regen
40-Potion
41-Metallicize
42-DarkCharge
43-EnergyCharge
44-FlameCharge
45-IceCharge
46-LifeCharge
*/