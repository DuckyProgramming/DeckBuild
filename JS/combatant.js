class combatant{
    constructor(layer,battle,x,y,type,team,id){
        this.layer=layer
		this.battle=battle
        this.position={x:x,y:y}
        this.type=type
        this.team=team
		this.id=id
        this.size=1
		this.flip=1-this.team*2
		this.direction=0
        this.name=types.combatant[this.type].name
        this.alt=types.combatant[this.type].alt
        this.life=types.combatant[this.type].life
		this.height=types.combatant[this.type].height
		this.behavior=types.combatant[this.type].behavior
        this.attacks=types.combatant[this.type].attacks
		this.damage=types.combatant[this.type].damage
		this.altAttack=types.combatant[this.type].altAttack
		this.class=types.combatant[this.type].class
		this.base={life:this.life,position:{x:this.position.x,y:this.position.y}}
        this.collect={life:this.life,block:0}
		this.calc={damage:0}
		this.boost={main:[0,0,0],fade:[0,0,0],display:[],color:[[200,0,0],[0,150,255],[0,50,150]],infoFade:[0,0],name:['Attack','Defense','Block']}
		this.status={main:[],fade:[],display:[],color:[
			[255,125,0],[200,225,250],[150,0,0],[255,75,0],[200,125,50],[40,80,120],[120,200,120],[125,75,25],[25,125,175],[150,225,150],
			[100,200,200],[200,0,50],[100,50,150],[50,100,50],[20,60,120],[170,240,255],[235,65,15],[210,200,245],[210,90,0],[50,0,0],
			[255,200,255],[125,160,160],[200,25,125],[190,190,60],[225,225,75],[255,50,100],[150,150,50],[255,125,25],[255,175,75],[200,125,250]],infoFade:[],name:[
			'Counter All','Next Turn Mana','Double Damage','Counter Once','Next Turn Strength','Downed','Dodge','Next Turn Weakness','Next Turn Vulnerability','Confused',
			'Reflect','Bleed','Intangible','Sink','Hymn','Mental Fortress','Rush','Wave of the Hand','Next Attack Damage','Die Next Turn',
			'Faith Gain','Shiv Gain','Card Play Damage All Enemies','Card Play Block','Must Act','Add Bleed','Push Boost','Counter Bleed Once','Counter Push Once','Absorb Attacks'],class:[
			1,1,1,1,1,0,1,0,0,0,
			1,0,1,1,1,1,1,1,1,1,
			1,1,1,1,0,1,1,1,1,1]}
		this.combo=0
		this.stance=0
		this.mantra=0
		this.ammo=[-1,-1,-1]
		this.meter=0
		this.armed=1
		this.anim=[0,0,0,0,0]
		for(g=0;g<this.status.name.length;g++){
			this.status.main.push(0)
			this.status.fade.push(0)
			this.status.infoFade.push(0)
		}
		this.block=0
		this.fades={block:0,info:0}
		this.intent=0
        this.fade=0
		this.lastPlay=-1
    }
	resetUnique(){
		this.block=0
		this.combo=0
		this.stance=0
		this.mantra=0
		this.ammo=[-1,-1,-1]
		this.meter=0
		this.armed=1
		this.lastPlay=-1
	}
	setupIntent(type){
		if(type==-1){
			switch(this.behavior){
				case 0:
					this.intent=floor(random(0,this.attacks.length))
				break
			}
		}else{
			this.intent=type
		}
	}
	changeStance(stance){
		if(stance!=this.stance){
			switch(this.stance){
				case 1:
					this.battle.mana.main+=2
				break
				case 3:
					this.battle.mana.main+=3
				break
			}
			this.block+=this.status.main[15]
			for(g=0,lg=this.battle.discard.cards.length;g<lg;g++){
				if(this.battle.discard.cards[g].attack==99){
					this.battle.hand.cards.push(copyCard(this.battle.discard.cards[g]))
					this.battle.hand.cards[this.battle.hand.cards.length-1].position.x=1206
					this.battle.hand.cards[this.battle.hand.cards.length-1].position.y=500
					this.battle.discard.cards.splice(g,1)
					g--
					lg--
				}
			}
			if(stance==2){
				for(g=0;g<this.status.main[16];g++){
					this.battle.draw()
				}
			}
		}
		this.stance=stance
	}
    display(detail){
		if(this.fade>0){
			this.layer.translate(this.position.x,this.position.y)
			this.layer.rotate(this.direction)
			this.layer.scale(this.size*this.flip,this.size)
			switch(this.type){
				case 1:
					this.layer.stroke(25,30,30,this.fade)
					this.layer.strokeWeight(4)
					this.layer.line(-4,-30,-8,0)
					this.layer.line(4,-30,8,0)
					this.layer.stroke(30,35,35,this.fade)
					this.layer.line(-6,-48,-15,-24)
					this.layer.line(6,-48,15,-24)
					this.layer.noStroke()
					this.layer.fill(35,40,40,this.fade)
					this.layer.ellipse(0,-47,18,42)
					this.layer.fill(30,25,0,this.fade)
					this.layer.rect(-7,-45,5,2)
					this.layer.rect(0,-45,5,2)
					this.layer.rect(7,-45,5,2)
					this.layer.fill(240,220,180,this.fade)
					this.layer.ellipse(0,-78,30,30)
					this.layer.fill(0,this.fade)
					this.layer.ellipse(4,-75,4,4)
					this.layer.ellipse(12,-75,4,4)
					this.layer.fill(30,35,35,this.fade)
					this.layer.arc(0,-78,36,36,-180,0)
					this.layer.fill(200,this.fade/2)
					this.layer.rect(8,-75,20,6)
					if(detail==0){
						this.layer.noFill()
						this.layer.stroke(240,240,40,this.fade)
						this.layer.strokeWeight(4)
						this.layer.strokeCap(SQUARE)
						this.layer.arc(1,-119,20,20,-45,135)
						this.layer.arc(-1,-121,20,20,135,315)
						this.layer.strokeCap(ROUND)
						this.layer.noStroke()
						this.layer.fill(255,this.fade)
						this.layer.textSize(16)
						this.layer.text(this.combo,0,-118)
					}
				break
				case 2:
					this.layer.noStroke()
					this.layer.translate(0,-45)
					if(this.mantra>0&&detail==0){
						this.layer.fill(255,200,255,this.fade/2)
						for(g=0;g<12;g++){
							this.layer.rotate(30)
							if(g<this.mantra){
								this.layer.ellipse(0,-40,6,6)
							}
						}
					}
					if(this.stance>0&&detail==0){
						switch(this.stance){
							case 1:
								this.layer.fill(150,255,255,this.fade/2)
							break
							case 2:
								this.layer.fill(255,75,75,this.fade/2)
							break
							case 3:
								this.layer.fill(255,200,255,this.fade/2)
							break
						}
						for(g=0;g<12;g++){
							this.layer.rotate(30)
							this.layer.triangle(0,-8,-8,0,-50,-50)
						}
					}
					this.layer.translate(0,45)
					this.layer.fill(84,46,55,this.fade)
					this.layer.triangle(-15,-75,15,-75,-6,-25)
					this.layer.stroke(207,90,101,this.fade*(1-this.anim[4]))
					this.layer.strokeWeight(0.5)
					this.layer.line(-3,-59,1,-54)
					this.layer.line(3,-59,1,-54)
					this.layer.arc(0,-59,6,3,-180,0)
					this.layer.stroke(190,120,123,this.fade)
					this.layer.strokeWeight(1)
					this.layer.line(-15,-75,-13,-55)
					this.layer.line(-15,-75,-17,-55)
					this.layer.noStroke()
					this.layer.fill(121,164,194,this.fade)
					this.layer.triangle(-8,-30,8,-30,-10,-4)
					this.layer.fill(127,131,167,this.fade)
					this.layer.triangle(-8,-30,8,-30,-7,-14)
					this.layer.fill(254,238,223,this.fade)
					this.layer.ellipse(0,-46,12,30)
					this.layer.stroke(255,235,217,this.fade)
					this.layer.strokeWeight(4)
					this.layer.line(-3,-54,-12,-24)
					this.layer.line(3,-54,12,-24)
					this.layer.line(-3,-32,-8,0)
					this.layer.line(3,-32,8+0*3,0)
					this.layer.noStroke()
					this.layer.fill(255,239,224,this.fade)
					this.layer.ellipse(0,-75,30,30)
					this.layer.stroke(175,121,123,this.fade)
					this.layer.strokeWeight(4-this.anim[0]*3)
					this.layer.line(4+this.anim[0]*2,-72,4-this.anim[0],-72-this.anim[0]*2)
					this.layer.line(4+this.anim[0]*2,-72,4-this.anim[0],-72+this.anim[0]*2)
					this.layer.line(12-this.anim[0]*2,-72,12+this.anim[0],-72-this.anim[0]*2)
					this.layer.line(12-this.anim[0]*2,-72,12+this.anim[0],-72+this.anim[0]*2)
					this.layer.stroke(0,this.fade)
					this.layer.strokeWeight(3-this.anim[0]*2)
					this.layer.line(4+this.anim[0]*2+0.2-this.anim[0]*0.2,-72+0.2-this.anim[0]*0.2,4-this.anim[0]+0.2-this.anim[0]*0.2,-72-this.anim[0]*2+0.2-this.anim[0]*0.2)
					this.layer.line(4+this.anim[0]*2+0.2-this.anim[0]*0.2,-72+0.2-this.anim[0]*0.2,4-this.anim[0]+0.2-this.anim[0]*0.2,-72+this.anim[0]*2+0.2-this.anim[0]*0.2)
					this.layer.line(12-this.anim[0]*2+0.2-this.anim[0]*0.2,-72+0.2-this.anim[0]*0.2,12+this.anim[0]+0.2-this.anim[0]*0.2,-72-this.anim[0]*2+0.2-this.anim[0]*0.2)
					this.layer.line(12-this.anim[0]*2+0.2-this.anim[0]*0.2,-72+0.2-this.anim[0]*0.2,12+this.anim[0]+0.2-this.anim[0]*0.2,-72+this.anim[0]*2+0.2-this.anim[0]*0.2)
					this.layer.noStroke()
					this.layer.fill(125,75,90,this.fade)
					this.layer.rect(0,-54.5,10,1)
					this.layer.fill(108,76,87,this.fade)
					this.layer.beginShape()
					this.layer.vertex(-5,-54)
					this.layer.vertex(5,-54)
					for(g=0;g<11;g++){
						this.layer.vertex(10.4-g*1.8,-26-g*g/8)
					}
					this.layer.endShape()
					this.layer.fill(73,64,78,this.fade)
					this.layer.beginShape()
					this.layer.vertex(5,-54)
					this.layer.vertex(-5,-54)
					for(g=0;g<11;g++){
						this.layer.vertex(-10.4+g*1.9,-26-g*g/8)
					}
					this.layer.endShape()
					this.layer.fill(175,117,125,this.fade)
					this.layer.beginShape()
					this.layer.vertex(-5,-54)
					this.layer.vertex(5,-54)
					for(g=0;g<11;g++){
						this.layer.vertex(9.4-g*1.5,-38-g*g/8)
					}
					this.layer.endShape()
					this.layer.fill(169,155,182,this.fade)
					this.layer.beginShape()
					this.layer.vertex(5,-54)
					this.layer.vertex(-5,-54)
					for(g=0;g<11;g++){
						this.layer.vertex(-9.4+g*1.6,-38-g*g/8)
					}
					this.layer.endShape()
					this.layer.noFill()
					this.layer.stroke(185,103,161,this.fade)
					this.layer.strokeWeight(0.5)
					this.layer.ellipse(-0.5,-58,3,1.5)
					this.layer.ellipse(2.5,-58,3,1.5)
					this.layer.line(1,-58,0,-56)
					this.layer.line(1,-58,2,-56)
					this.layer.ellipse(1,-52,2,2)
					this.layer.line(0,-52.5,-1,-53)
					this.layer.line(2,-52.5,3,-53)
					this.layer.translate(0,-75)
					this.layer.rotate(-30)
					this.layer.noStroke()
					this.layer.fill(184,102,99,this.fade)
					this.layer.triangle(-9,-21,-9,-13,0,-17)
					this.layer.triangle(9,-21,9,-13,0,-17)
					this.layer.rotate(30)
					this.layer.translate(0,75)
					this.layer.fill(128,71,79,this.fade)
					this.layer.arc(0,-75,36,36,-180,0)
					this.layer.fill(255,239,224,this.fade)
					this.layer.triangle(-15,-75,15,-75,9,-85)
					this.layer.fill(128,71,79,this.fade)
					this.layer.triangle(18,-75,12,-80,18,-69)
					this.layer.triangle(15,-85,-12,-85,8,-75)
					this.layer.triangle(-12,-85,6,-85,-3,-73)
					this.layer.triangle(-18,-75,-3,-80,-15,-63)
					this.layer.triangle(-12,-85,-4,-85,-8,-55)
					this.layer.stroke(96,54,66,this.fade)
					this.layer.strokeWeight(1)
					this.layer.line(7,-21,3,-21)
					this.layer.strokeWeight(0.5)
					this.layer.line(5,-21,6,-18)
					this.layer.line(5,-21,4,-18)
				break
				case 3:
					this.layer.noStroke()
					this.layer.fill(40,35,30,this.fade)
					this.layer.quad(-6,-60,6,-60,12,-15,-12,-15)
					this.layer.arc(0,-15,24,12,0,180)
					this.layer.stroke(80,70,60,this.fade)
					this.layer.strokeWeight(4)
					this.layer.line(-4,-30,-8,0)
					this.layer.line(4,-30,8,0)
					this.layer.line(-6,-48,-15,-24)
					this.layer.line(6,-48,15,-24)
					this.layer.noStroke()
					this.layer.fill(80,70,60,this.fade)
					this.layer.ellipse(0,-45,18,36)
					this.layer.fill(240,220,180,this.fade)
					this.layer.ellipse(0,-75,30,30)
					this.layer.fill(100,0,0,this.fade)
					this.layer.ellipse(4,-72,4,4)
					this.layer.ellipse(12,-72,4,4)
					this.layer.fill(60,50,40,this.fade)
					this.layer.arc(0,-75,36,36,-180,0)
					this.layer.arc(8,-75,52,44,135,180)
					this.layer.arc(8,-75,20,36,0,45)
					this.layer.fill(70,60,50,this.fade)
					this.layer.ellipse(-4,-51,3,3)
					this.layer.ellipse(-4,-46,3,3)
					if(detail==0){
						this.layer.fill(255,this.fade/5)
						switch(this.ammo.length){
							case 3:
								this.layer.ellipse(0,-120,20,20)
								this.layer.ellipse(-25,-110,20,20)
								this.layer.ellipse(25,-110,20,20)
								displayAmmo(this.layer,25,-110,this.ammo[0],this.fade)
								displayAmmo(this.layer,0,-120,this.ammo[1],this.fade)
								displayAmmo(this.layer,-25,-110,this.ammo[2],this.fade)
							break
							case 2:
								this.layer.ellipse(-15,-115,20,20)
								this.layer.ellipse(15,-115,20,20)
								displayAmmo(this.layer,15,-115,this.ammo[0],this.fade)
								displayAmmo(this.layer,-15,-115,this.ammo[1],this.fade)
							break
							case 1:
								this.layer.ellipse(0,-120,20,20)
								displayAmmo(this.layer,0,-120,this.ammo[0],this.fade)
							break
						}
					}
				break
				case 4:
					if((this.armed==1||detail==1)&&this.fade>0){
						this.layer.image(graphics.minor[5],-25*this.fade,-60*this.fade,65*this.fade,65*this.fade)
					}
					this.layer.translate(0,-1.25)
					if(this.anim[1]<1){
						this.layer.translate(-7.9,-0.75)
						this.layer.rotate(-atan2(-3.95,30))
						this.layer.image(graphics.minor[0],-4*(1-this.anim[1])*this.fade,-4*(1-this.anim[1])*this.fade,8*(1-this.anim[1])*this.fade,8*(1-this.anim[1])*this.fade)
						this.layer.rotate(atan2(-3.95,30))
						this.layer.translate(15.8,0)
						this.layer.rotate(atan2(-3.95,30))
						this.layer.image(graphics.minor[0],-4*(1-this.anim[1])*this.fade,-4*(1-this.anim[1])*this.fade,8*(1-this.anim[1])*this.fade,8*(1-this.anim[1])*this.fade)
						this.layer.rotate(-atan2(-3.95,30))
						this.layer.translate(-7.9,0.75)
					}
					this.layer.noStroke()
					this.layer.fill(243,154,163,this.fade)
					this.layer.triangle(0,-75,18,-75,9,-58)
					this.layer.triangle(-18,-75,18,-75,-10,-59)
					this.layer.triangle(-18,-75,-6,-75,-15,-65)
					this.layer.triangle(18,-75,6,-75,16,-68)
					this.layer.triangle(-18,-75,18,-75,-5,-56)
					this.layer.triangle(-18,-75,15,-75,3,-50)
					if(this.anim[2]<1){
						this.layer.fill(230,186,197,this.fade*(1-this.anim[2]))
						this.layer.translate(-4*cos(0),-51)
						this.layer.rotate(-atan2(-15*cos(0)+this.anim[0]*30+this.anim[1]*36+4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.quad(3,0,-3,0,-3-9*this.anim[1],24+6*this.anim[1],12-9*this.anim[1],30-6*this.anim[1])
						this.layer.rotate(atan2(-15*cos(0)+this.anim[0]*30+this.anim[1]*36+4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.translate(8*cos(0),0)
						this.layer.rotate(-atan2(15*cos(0)+this.anim[0]*15+this.anim[1]*12-4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.quad(3,0,-3,0,-12,30,3,24)
						this.layer.rotate(atan2(15*cos(0)+this.anim[0]*15+this.anim[1]*12-4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.translate(-8*cos(0),0)
						this.layer.fill(235,209,216,this.fade*(1-this.anim[2]))
						this.layer.rotate(-atan2(-15*cos(0)+this.anim[0]*30+this.anim[1]*36+4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.quad(1,0,-1,0,-1-3*this.anim[1],25+3*this.anim[1],4-3*this.anim[1],27-2*this.anim[1])
						this.layer.rotate(atan2(-15*cos(0)+this.anim[0]*30+this.anim[1]*36+4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.translate(8*cos(0),0)
						this.layer.rotate(-atan2(15*cos(0)+this.anim[0]*15+this.anim[1]*12-4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.quad(1,0,-1,0,-4,27,1,25)
						this.layer.rotate(atan2(15*cos(0)+this.anim[0]*15+this.anim[1]*12-4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.translate(-4*cos(0),51)
					}
					this.layer.stroke(207,90,101,this.fade*(1-this.anim[4]))
					this.layer.strokeWeight(0.5)
					this.layer.line(-3,-59,1,-54)
					this.layer.line(3,-59,1,-54)
					this.layer.arc(0,-59,6,3,-180,0)
					this.layer.noStroke()
					this.layer.fill(254,238,223,this.fade)
					this.layer.ellipse(0,-46,12,30)
					this.layer.fill(250,188,173,this.fade)
					this.layer.ellipse(3,-42,0.5,2)
					this.layer.fill(242,205,219,this.fade)
					this.layer.arc(0,-37.5,11,13,0,180)
					this.layer.stroke(255,235,217,this.fade)
					this.layer.strokeWeight(4)
					this.layer.line(-3,-54,-12,-24)
					this.layer.line(3,-54,12,-24)
					this.layer.strokeWeight(0.8)
					this.layer.stroke(202,51,60,this.fade*(1-this.anim[3]))
					this.layer.fill(209,80,84,this.fade*(1-this.anim[3]))
					this.layer.strokeJoin(ROUND)
					this.layer.triangle(0,-44,-10,-50,-10,-38)
					this.layer.triangle(0,-44,10,-50,10,-38)
					this.layer.strokeJoin(MITER)
					this.layer.strokeWeight(1)
					this.layer.stroke(216,168,182,this.fade*(1-this.anim[4]))
					this.layer.fill(249,218,226,this.fade*(1-this.anim[4]))
					this.layer.beginShape()
					this.layer.vertex(-6,-55)
					this.layer.vertex(6,-55)
					this.layer.vertex(9,-26)
					this.layer.vertex(8,-25)
					this.layer.vertex(-8,-25)
					this.layer.vertex(-9,-26)
					this.layer.endShape()
					this.layer.noStroke()
					this.layer.beginShape()
					this.layer.vertex(-6,-55)
					this.layer.vertex(6,-55)
					for(g=0;g<11;g++){
						this.layer.vertex(10-g*2,-26+(g%2)*3)
					}
					this.layer.endShape()
					this.layer.beginShape()
					this.layer.vertex(-6,-55)
					this.layer.vertex(6,-55)
					for(g=0;g<11;g++){
						this.layer.vertex(10-g*2,-24-(g%2)*3)
					}
					this.layer.endShape()
					this.layer.fill(114,40,119,this.fade*(1-this.anim[4]))
					for(g=0;g<5;g++){
						this.layer.ellipse(8-g*4,-25,0.25,1)
						this.layer.ellipse(8.5-g*4,-25,0.125,0.5)
						this.layer.ellipse(7.5-g*4,-25,0.125,0.5)
					}
					for(g=0;g<4;g++){
						this.layer.ellipse(6-g*4,-25.5,0.125,0.5)
					}
					this.layer.noStroke()
					this.layer.fill(242,205,219,this.fade)
					this.layer.quad(-5.25,-54,5.25,-54,6,-47,-6,-47)
					this.layer.stroke(231,195,205,this.fade)
					this.layer.strokeWeight(0.5)
					this.layer.fill(245,224,231,this.fade)
					for(g=0;g<5;g++){
						this.layer.ellipse(-4+g*2,-53,1.5,2)
					}
					for(g=0;g<6;g++){
						this.layer.ellipse(-5+g*2,-48,1.5,2)
					}
					if(this.anim[2]<1){
						this.layer.noStroke()
						this.layer.fill(249,218,225,this.fade*(1-this.anim[2]))
						this.layer.translate(-4*cos(0),-51)
						this.layer.rotate(-atan2(-15*cos(0)+this.anim[0]*30+this.anim[1]*36+4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.quad(3,0,-3,0,-4,12,4,12)
						this.layer.rotate(atan2(-15*cos(0)+this.anim[0]*30+this.anim[1]*36+4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.translate(8*cos(0),0)
						this.layer.rotate(-atan2(15*cos(0)+this.anim[0]*15+this.anim[1]*12-4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.quad(3,0,-3,0,-4,12,4,12)
						this.layer.rotate(atan2(15*cos(0)+this.anim[0]*15+this.anim[1]*12-4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.translate(-8*cos(0),0)
						this.layer.fill(228,184,195,this.fade*(1-this.anim[2]))
						this.layer.rotate(-atan2(-15*cos(0)+this.anim[0]*30+this.anim[1]*36+4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.quad(1,0,-1,0,-4/3,12,4/3,12)
						this.layer.rotate(atan2(-15*cos(0)+this.anim[0]*30+this.anim[1]*36+4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.translate(8*cos(0),0)
						this.layer.rotate(-atan2(15*cos(0)+this.anim[0]*15+this.anim[1]*12-4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.quad(1,0,-1,0,-4/3,12,4/3,12)
						this.layer.rotate(atan2(15*cos(0)+this.anim[0]*15+this.anim[1]*12-4*cos(0),-24-this.anim[0]*12-this.anim[1]*30+51))
						this.layer.translate(-4*cos(0),51)
					}
					this.layer.stroke(255,235,217,this.fade)
					this.layer.strokeWeight(4)
					this.layer.line(-3,-32,-8,0)
					this.layer.line(3,-32,8+0*3,0)
					if(this.anim[1]<1){
						this.layer.translate(-7.9,-0.75)
						this.layer.rotate(-atan2(-3.95,30))
						this.layer.image(graphics.minor[1],-4*(1-this.anim[1])*this.fade,-4*(1-this.anim[1])*this.fade,8*(1-this.anim[1])*this.fade,8*(1-this.anim[1])*this.fade)
						this.layer.rotate(atan2(-3.95,30))
						this.layer.translate(15.8,0)
						this.layer.rotate(atan2(-3.95,30))
						this.layer.image(graphics.minor[1],-4*(1-this.anim[1])*this.fade,-4*(1-this.anim[1])*this.fade,8*(1-this.anim[1])*this.fade,8*(1-this.anim[1])*this.fade)
						this.layer.rotate(-atan2(-3.95,30))
						this.layer.translate(-7.9,0.75)
					}
					this.layer.stroke(231,195,205,this.fade)
					this.layer.strokeWeight(0.5)
					this.layer.fill(245,224,231,this.fade)
					for(g=0;g<6;g++){
						this.layer.ellipse(-5+g*2,-36.5,1.5,2)
					}
					this.layer.noFill()
					this.layer.stroke(172,44,53,this.fade)
					this.layer.strokeWeight(0.5)
					this.layer.ellipse(-1,-53,4,2)
					this.layer.ellipse(3,-53,4,2)
					this.layer.line(1,-53,0,-50)
					this.layer.line(1,-53,2,-50)
					this.layer.stroke(207,90,101,this.fade*(1-this.anim[4]))
					this.layer.strokeWeight(0.5)
					this.layer.line(-3,-59,1,-54)
					this.layer.line(3,-59,1,-54)
					this.layer.noStroke()
					this.layer.fill(250,230,235,this.fade*(1-this.anim[4]))
					this.layer.beginShape()
					this.layer.vertex(-6,-55)
					this.layer.vertex(6,-55)
					for(g=0;g<11;g++){
						this.layer.vertex(10.4-g*2,-26-g+(g%2)*3)
					}
					this.layer.endShape()
					this.layer.beginShape()
					this.layer.vertex(-6,-55)
					this.layer.vertex(6,-55)
					for(g=0;g<11;g++){
						this.layer.vertex(10.4-g*2,-24-g-(g%2)*3)
					}
					this.layer.endShape()
					this.layer.fill(114,40,119,this.fade*(1-this.anim[4]))
					for(g=0;g<5;g++){
						this.layer.ellipse(8.4-g*4,-26-g*2,0.25,1)
						this.layer.ellipse(8.9-g*4,-25.8-g*2,0.125,0.5)
						this.layer.ellipse(7.9-g*4,-26.2-g*2,0.125,0.5)
					}
					for(g=0;g<4;g++){
						this.layer.ellipse(6.35-g*4,-27.5-g*2,0.125,0.5)
					}
					this.layer.fill(251,242,245,this.fade*(1-this.anim[4]))
					this.layer.beginShape()
					this.layer.vertex(6,-55)
					this.layer.vertex(-6,-55)
					for(g=0;g<11;g++){
						this.layer.vertex(-10.4+g*2,-26-g+(g%2)*3)
					}
					this.layer.endShape()
					this.layer.beginShape()
					this.layer.vertex(6,-55)
					this.layer.vertex(-6,-55)
					for(g=0;g<11;g++){
						this.layer.vertex(-10.4+g*2,-24-g-(g%2)*3)
					}
					this.layer.endShape()
					this.layer.fill(114,40,119,this.fade*(1-this.anim[4]))
					for(g=0;g<5;g++){
						this.layer.ellipse(-8.4+g*4,-26-g*2,0.25,1)
						this.layer.ellipse(-8.9+g*4,-25.8-g*2,0.125,0.5)
						this.layer.ellipse(-7.9+g*4,-26.2-g*2,0.125,0.5)
					}
					for(g=0;g<4;g++){
						this.layer.ellipse(-6.35+g*4,-27.5-g*2,0.125,0.5)
					}
					this.layer.fill(255,252,254,this.fade*(1-this.anim[4]))
					this.layer.beginShape()
					this.layer.vertex(-6,-55)
					this.layer.vertex(6,-55)
					for(g=0;g<11;g++){
						this.layer.vertex(9-g*1.8,-36+(g%2)*3)
					}
					this.layer.endShape()
					this.layer.beginShape()
					this.layer.vertex(-6,-55)
					this.layer.vertex(6,-55)
					for(g=0;g<11;g++){
						this.layer.vertex(9-g*1.8,-34-(g%2)*3)
					}
					this.layer.endShape()
					this.layer.noStroke()
					this.layer.fill(242,235,244,this.fade*(1-this.anim[4]))
					for(g=0;g<10;g++){
						this.layer.triangle(9-g*1.8,-39,7.2-g*1.8,-39,8.1-g*1.8,-36)
					}
					this.layer.strokeJoin(ROUND)
					this.layer.strokeWeight(0.8)
					this.layer.stroke(202,51,60,this.fade*(1-this.anim[3]))
					this.layer.fill(209,80,84,this.fade*(1-this.anim[3]))
					this.layer.quad(1,-49,1,-45,6,-54,5,-57)
					this.layer.quad(1,-49,1,-45,-6,-54,-5,-57)
					this.layer.quad(-7.8,-46,7.8,-46,8.2,-44,-8.2,-44)
					this.layer.quad(-8.2,-44,8.2,-44,8.4,-42,-8.4,-42)
					this.layer.rect(5,-40.5,2,3)
					this.layer.noFill()
					this.layer.strokeJoin(MITER)
					this.layer.stroke(158,57,60,this.fade*(1-this.anim[4]))
					this.layer.strokeWeight(0.25)
					this.layer.ellipse(0,-53,2,1)
					this.layer.ellipse(2,-53,2,1)
					this.layer.line(1,-53,0.5,-51.5)
					this.layer.line(1,-53,1.5,-51.5)
					this.layer.noStroke()
					for(g=1;g<6;g++){
						this.layer.fill(206+g*38/3,107+g*59/3,113+g*61/3,this.fade)
						this.layer.quad(13.5-(g%2)*2,-72+g*3,12-(g%2)*2,-66+g*3,10.5-(g%2)*2,-72+g*3,12-(g%2)*2,-78+g*3)
					}
					this.layer.fill(255,239,224,this.fade)
					this.layer.ellipse(0,-75,30,30)
					this.layer.stroke(201,108,113,this.fade)
					this.layer.strokeWeight(4-this.anim[0]*3)
					this.layer.line(4+this.anim[0]*2,-72,4-this.anim[0],-72-this.anim[0]*2)
					this.layer.line(4+this.anim[0]*2,-72,4-this.anim[0],-72+this.anim[0]*2)
					this.layer.line(12-this.anim[0]*2,-72,12+this.anim[0],-72-this.anim[0]*2)
					this.layer.line(12-this.anim[0]*2,-72,12+this.anim[0],-72+this.anim[0]*2)
					this.layer.stroke(48,4,7,this.fade)
					this.layer.strokeWeight(3-this.anim[0]*2)
					this.layer.line(4+this.anim[0]*2+0.2-this.anim[0]*0.2,-72+0.2-this.anim[0]*0.2,4-this.anim[0]+0.2-this.anim[0]*0.2,-72-this.anim[0]*2+0.2-this.anim[0]*0.2)
					this.layer.line(4+this.anim[0]*2+0.2-this.anim[0]*0.2,-72+0.2-this.anim[0]*0.2,4-this.anim[0]+0.2-this.anim[0]*0.2,-72+this.anim[0]*2+0.2-this.anim[0]*0.2)
					this.layer.line(12-this.anim[0]*2+0.2-this.anim[0]*0.2,-72+0.2-this.anim[0]*0.2,12+this.anim[0]+0.2-this.anim[0]*0.2,-72-this.anim[0]*2+0.2-this.anim[0]*0.2)
					this.layer.line(12-this.anim[0]*2+0.2-this.anim[0]*0.2,-72+0.2-this.anim[0]*0.2,12+this.anim[0]+0.2-this.anim[0]*0.2,-72+this.anim[0]*2+0.2-this.anim[0]*0.2)
					this.layer.noStroke()
					this.layer.fill(250,211,216,this.fade)
					this.layer.arc(0,-75,36,36,-180,0)
					this.layer.triangle(18,-75,9,-75,18,-72)
					this.layer.triangle(18,-75,15,-75,18,-69)
					this.layer.triangle(-18,-75,9,-75,-18,-69)
					this.layer.triangle(-18,-75,0,-75,-12,-63)
					this.layer.triangle(-18,-75,6,-75,0,-69)
					this.layer.stroke(111,23,27,this.fade)
					this.layer.strokeWeight(0.5)
					this.layer.line(13,-58.5,9,-58.5)
					this.layer.image(graphics.minor[2],-5-15*this.fade,-77.5-22.5*this.fade,30*this.fade,45*this.fade)
					if(this.anim[3]<1){
						this.layer.image(graphics.minor[3],-3-15*(1-this.anim[3])*this.fade,-44-15*(1-this.anim[3])*this.fade,30*(1-this.anim[3])*this.fade,30*(1-this.anim[3])*this.fade)
					}
					this.layer.translate(0,1.25)
					if(detail==0){
						if(this.fade>0){
							this.layer.image(graphics.minor[4],-40*this.fade,-112-10*this.fade,80*this.fade,20*this.fade)
						}
						this.layer.stroke(255,this.fade)
						this.layer.strokeWeight(2)
						this.layer.line(this.meter*3,-114,this.meter*3,-110)
						this.layer.noStroke()
						this.layer.fill(0,this.fade)
						this.layer.textSize(8)
						this.layer.text(this.meter,0,-101)
					}
				break
				case 5:
					this.layer.noStroke()
					this.layer.fill(230,230,5,this.fade)
					this.layer.ellipse(-10,-8,20,20)
					this.layer.ellipse(10,-8,20,20)
					this.layer.ellipse(-16,-30,20,20)
					this.layer.fill(235,235,55,this.fade)
					this.layer.ellipse(0,-28,24,40)
					this.layer.fill(240,240,60,this.fade)
					this.layer.ellipse(16,-30,20,20)
					this.layer.fill(245,245,65,this.fade)
					this.layer.ellipse(0,-60,40,40)
					this.layer.fill(240,160,20,this.fade)
					this.layer.ellipse(13.5,-52,24,16)
					this.layer.stroke(0,this.fade)
					this.layer.strokeWeight(1)
					this.layer.arc(13.5,-52,22,2,-180,0)
					this.layer.line(18-3,-56,18-3,-58)
					this.layer.line(18+3,-56,18+3,-58)
					this.layer.strokeWeight(3)
					this.layer.point(9-6,-64)
					this.layer.point(9+6,-64)
				break
				case 6:
					this.layer.stroke(80,this.fade)
					this.layer.strokeWeight(4)
					this.layer.line(-4,-30,-8,0)
					this.layer.line(4,-30,8,0)
					this.layer.line(-6,-48,-15,-24)
					this.layer.line(6,-48,15,-24)
					this.layer.noStroke()
					this.layer.fill(80,this.fade)
					this.layer.ellipse(0,-45,18,36)
					this.layer.fill(240,220,180,this.fade)
					this.layer.ellipse(0,-75,30,30)
					this.layer.fill(0,this.fade)
					this.layer.ellipse(4,-72,4,4)
					this.layer.ellipse(12,-72,4,4)
				break
			}
			this.layer.scale(1/this.size/this.flip,1/this.size)
			this.layer.rotate(-this.direction)
			this.layer.translate(-this.position.x,-this.position.y)
		}
	}
	displayInfo(){
		this.layer.translate(this.base.position.x,this.base.position.y)
		this.layer.noStroke()
		this.layer.fill(0,this.fade)
		this.layer.rect(0,20,62,10,4)
		this.layer.fill(150,this.fade)
		this.layer.rect(0,20,60,8,3)
		if(this.collect.life>=this.life){
			this.layer.fill(240,0,0,this.fade)
			this.layer.rect((max(0,this.collect.life)/this.base.life)*30-30,20,(max(0,this.collect.life)/this.base.life)*60,2+min((max(0,this.collect.life)/this.base.life)*90,6),3)
			this.layer.fill(min(255,510-max(0,this.life)/this.base.life*510)-max(0,5-max(0,this.life)/this.base.life*30)*25,max(0,this.life)/this.base.life*510,0,this.fade)
			this.layer.rect((max(0,this.life)/this.base.life)*30-30,20,(max(0,this.life)/this.base.life)*60,2+min((max(0,this.life)/this.base.life)*90,6),3)
		}else if(this.collect.life<this.life){
			this.layer.fill(240,0,0,this.fade)
			this.layer.rect((max(0,this.life)/this.base.life)*30-30,20,(max(0,this.life)/this.base.life)*60,2+min((max(0,this.life)/this.base.life)*90,6),3)
			this.layer.fill(min(255,510-max(0,this.collect.life)/this.base.life*510)-max(0,5-max(0,this.collect.life)/this.base.life*30)*25,max(0,this.collect.life)/this.base.life*510,0,this.fade)
			this.layer.rect((max(0,this.collect.life)/this.base.life)*30-30,20,(max(0,this.collect.life)/this.base.life)*60,2+min((max(0,this.collect.life)/this.base.life)*90,6),3)
		}
		if(this.fades.block>0){
			this.layer.fill(0,this.fade*this.fades.block)
			this.layer.ellipse(-30,20,16,16)
			this.layer.fill(150,175,200,this.fade*this.fades.block)
			this.layer.ellipse(-30,20,14,14)
		}
		this.layer.fill(0,this.fade)
		this.layer.textSize(8)
		this.layer.text(max(0,ceil(this.life*10)/10)+"/"+max(0,ceil(this.base.life)),0,21)
		if(this.fades.block>0){
			this.layer.text(this.block,-30,20)
		}
		this.layer.textSize(10)
		this.layer.text(this.name,0,32)
		if(this.alt==''){
			for(g=0,lg=this.boost.display.length;g<lg;g++){
				this.layer.fill(this.boost.color[this.boost.display[g]][0],this.boost.color[this.boost.display[g]][1],this.boost.color[this.boost.display[g]][2],this.boost.fade[this.boost.display[g]]*this.fade)
				this.layer.ellipse(-21+g*14,50,12,12)
				this.layer.fill(150,this.fade*this.boost.fade[this.boost.display[g]]*this.boost.infoFade[g])
				this.layer.rect(0,80,45,15,3)
			}
			for(g=0,lg=this.status.display.length;g<lg;g++){
				this.layer.fill(this.status.color[this.status.display[g]][0],this.status.color[this.status.display[g]][1],this.status.color[this.status.display[g]][2],this.status.fade[this.status.display[g]]*this.fade)
				this.layer.ellipse(-21+g*14,64,12,12)
				this.layer.fill(150,this.fade*this.status.fade[this.status.display[g]]*this.status.infoFade[g])
				this.layer.rect(0,80,45,15,3)
			}
			for(g=0,lg=this.boost.display.length;g<lg;g++){
				this.layer.fill(0,this.boost.fade[this.boost.display[g]]*this.fade)
				if(this.boost[this.boost.display[g]]>0){
					this.layer.text('+'+round(this.boost.main[this.boost.display[g]]),-21+g*14,50)
				}else{
					this.layer.text(round(this.boost.main[this.boost.display[g]]),-21+g*14,50)
				}
			}
			for(g=0,lg=this.status.display.length;g<lg;g++){
				this.layer.fill(0,this.status.fade[this.status.display[g]]*this.fade)
				this.layer.text(round(this.status.main[this.status.display[g]]),-21+g*14,64)
			}
		}else{
			this.layer.text(this.alt,0,40)
			for(g=0,lg=this.boost.display.length;g<lg;g++){
				this.layer.fill(this.boost.color[this.boost.display[g]][0],this.boost.color[this.boost.display[g]][1],this.boost.color[this.boost.display[g]][2],this.boost.fade[this.boost.display[g]]*this.fade)
				this.layer.ellipse(-21+g*14,58,12,12)
				this.layer.fill(150,this.fade*this.boost.fade[this.boost.display[g]]*this.boost.infoFade[g])
				this.layer.rect(0,80,45,15,3)
			}
			for(g=0,lg=this.status.display.length;g<lg;g++){
				this.layer.fill(this.status.color[this.status.display[g]][0],this.status.color[this.status.display[g]][1],this.status.color[this.status.display[g]][2],this.status.fade[this.status.display[g]]*this.fade)
				this.layer.ellipse(-21+g*14,72,12,12)
				this.layer.fill(150,this.fade*this.status.fade[this.status.display[g]]*this.status.infoFade[g])
				this.layer.rect(0,80,45,15,3)
			}
			for(g=0,lg=this.boost.display.length;g<lg;g++){
				this.layer.fill(0,this.boost.fade[this.boost.display[g]]*this.fade)
				if(this.boost[this.boost.display[g]]>0){
					this.layer.text('+'+round(this.boost.main[this.boost.display[g]]),-21+g*14,58)
				}else{
					this.layer.text(round(this.boost.main[this.boost.display[g]]),-21+g*14,58)
				}
			}
			for(g=0,lg=this.status.display.length;g<lg;g++){
				this.layer.fill(0,this.status.fade[this.status.display[g]]*this.fade)
				this.layer.text(round(this.status.main[this.status.display[g]]),-21+g*14,72)
			}
		}
		if(this.team==1){
			displayIntent(this.layer,0,-this.height-30,this.fade,1,this.damage[this.intent],this.altAttack[this.intent],this.attacks[this.intent])
			if(this.battle.attack.type==81&&this.battle.hand.trigger){
				displayIntent(this.layer,20,-this.height-50,this.fade,0.5,this.damage[0],this.altAttack[0],this.attacks[0])
			}
		}
		this.layer.translate(-this.base.position.x,-this.base.position.y)
	}
	evoke(type){
		switch(type){
			case 0:
				i=0
				for(h=1,lh=this.battle.combatants.length;h<lh;h++){
					if(i==0&&this.battle.combatants[h].life>0){
						this.battle.combatants[h].take(8,0)
						i=1
					}
				}
			break
			case 1:
				i=0
				for(h=1,lh=this.battle.combatants.length;h<lh;h++){
					if(i==0&&this.battle.combatants[h].life>0){
						this.battle.combatants[h].take(12,0)
						if(this.battle.combatants[h+1].life>0){
							this.battle.combatants[h+1].take(4,0)
						}
						if(this.battle.combatants[h-1].life>0&&h>1){
							this.battle.combatants[h-1].take(4,0)
						}
						i=1
					}
				}
			break
			case 2:
				this.block+=10
			break
			case 3:
				this.battle.mana.main+=3
			break
		}
	}
	load(type){
		this.loaded=false
		for(h=0,lh=this.ammo.length;h<lh;h++){
			if(this.ammo[h]==-1&&!this.loaded){
				this.ammo[h]=type
				this.loaded=true
			}
		}
		if(!this.loaded){
			this.evoke(this.ammo[0])
			for(h=0,lh=this.ammo.length-1;h<lh;h++){
				this.ammo[h]=this.ammo[h+1]
			}
			this.ammo[this.ammo.length-1]=type
		}
	}
	take(damage,user,extra){
		if(this.life>0){
			if(this.status.main[10]>0){
				this.status.main[10]--
				this.battle.combatants[user].take(damage,this.id)
			}else if(this.status.main[6]>0){
				this.status.main[6]--
			}else{
				this.calc.damage=damage
				if(this.battle.combatants[user].status.main[2]>0){
					this.calc.damage*=2
				}
				if(this.status.main[12]>0&&this.calc.damage>1){
					this.calc.damage=1
				}
				if(this.battle.combatants[0].stance==2){
					this.calc.damage*=2
				}
				if(this.battle.combatants[0].stance==3&&this.id>0){
					this.calc.damage*=3
				}
				if(this.block>0){
					this.calc.damage*=(2-min(0,this.boost.main[2]))/(2+max(0,this.boost.main[2]))
				}else{
					this.calc.damage*=(2-min(0,this.boost.main[1]))/(2+max(0,this.boost.main[1]))
				}
				if(this.battle.combatants[user].status.main[25]>0){
					this.status.main[11]+=this.battle.combatants[user].status.main[25]
				}
				if(extra==1){
					this.calc.damage+=this.battle.combatants[user].status.main[26]
				}
				if(this.block>this.calc.damage&&extra!=1){
					this.block-=this.calc.damage
				}else if(this.block>0&&extra!=1){
					this.calc.damage-=this.block
					this.block=0
					this.life-=this.calc.damage
				}else{
					this.life-=this.calc.damage
				}
				if(this.status.main[0]>0){
					this.battle.combatants[user].take(this.status.main[0],this.id)
				}
				if(this.status.main[3]>0){
					this.battle.combatants[user].take(this.status.main[3],this.id)
					this.status.main[3]=0
				}
				if(this.status.main[13]>0){
					this.status.main[4]++
				}
				if(this.status.main[27]>0){
					this.battle.combatants[user].status.main[11]+=this.status.main[27]
					this.status.main[27]=0
				}
				if(this.status.main[28]>0){
					this.battle.attack.attacks.push([5,20,user,this.status.main[28]])
					this.status.main[28]=0
				}
				if(this.status.main[29]>0){
					this.status.main[1]++
				}
				this.battle.particles.push(new particle(this.layer,this.position.x,this.position.y-this.height/2,0,random(0,360),3,2,[255,0,0]))
				this.battle.particles[this.battle.particles.length-1].text=round(this.calc.damage*10)/10
				if(this.id>0&&this.battle.combatants[0].type==1){
					this.battle.combatants[0].combo++
				}
			}
		}
	}
    update(){
		this.boost.display=[]
		this.status.display=[]
		if(this.block>this.collect.block&&this.id==0){
			this.collect.block=this.block
			for(g=1,lg=this.battle.combatants.length;g<lg;g++){
				this.battle.combatants[g].boost.main[0]-=this.status.main[17]
			}
		}else if(this.block<this.collect.block&&this.id==0){
			this.collect.block=this.block
		}
		if(this.type==2){
			if(this.mantra>=12&&this.stance!=3){
				this.changeStance(3)
				this.mantra-=12
			}
		}else if(this.type==4){
			if(this.meter<-10){
				this.meter=0
				this.take(10,0)
			}else if(this.meter>10){
				this.meter=0
				this.battle.mana.main=0
			}
		}
		for(g=0,lg=this.boost.main.length;g<lg;g++){
			if(this.boost.fade[g]!=0){
				this.boost.display.push(g)
			}
			if(this.boost.fade[g]<1&&this.boost.main[g]!=0){
				this.boost.fade[g]=round(this.boost.fade[g]*10+1)/10
			}
			if(this.boost.fade[g]>0&&this.boost.main[g]==0){
				this.boost.fade[g]=round(this.boost.fade[g]*10-1)/10
			}
		}
		for(g=0,lg=this.status.main.length;g<lg;g++){
			if(this.status.fade[g]!=0){
				this.status.display.push(g)
			}
			if(this.status.fade[g]<1&&this.status.main[g]!=0){
				this.status.fade[g]=round(this.status.fade[g]*5+1)/5
			}
			if(this.status.fade[g]>0&&this.status.main[g]==0){
				this.status.fade[g]=round(this.status.fade[g]*5-1)/5
			}
		}
		this.collect.life=this.collect.life*0.9+this.life*0.1
		if(this.fades.block<1&&this.block>0){
			this.fades.block=round(this.fades.block*5+1)/5
		}else if(this.fades.block>0&&this.block<=0){
			this.fades.block=round(this.fades.block*5-1)/5
		}
		if(this.fade<1&&this.life>0){
			this.fade=round(this.fade*5+1)/5
		}else if(this.fade>0&&this.life<=0){
			this.fade=round(this.fade*5-1)/5
		}
		if(this.life<=0&&this.type!=0){
			this.type=0
			this.battle.counter.enemies.dead++
		}
	}
}