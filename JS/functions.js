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
function displayIntent(layer,x,y,fade,size,damage,type){
	layer.translate(x,y)
	layer.scale(size)
	switch(type){
		case 1:
			layer.fill(255,50,50,fade)
			layer.triangle(-20,0,15,-6,15,6)
		break
		case 2:
			layer.fill(125,255,255,fade)
			layer.ellipse(0,-3,24,24)
		break
	}
	layer.fill(255,fade)
	layer.textSize(20)
	switch(type){
		case 1:
			layer.text(damage,0,0)
		break
		case 2:
			layer.text('?',0,-2)
		break
	}
	layer.scale(1/size)
	layer.translate(-x,-y)
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
function generateListing(cards){
	for(a=0,la=listing.card.length;a<la;a++){
		listing.card[a].push([])
		listing.card[a].push([])
		listing.card[a].push([])
	}
	for(a=0,la=cards.length;a<la;a++){
		if(cards[a].list>=0){
			if(cards[a].rarity<=0){
				listing.card[cards[a].list][0].push(a)
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