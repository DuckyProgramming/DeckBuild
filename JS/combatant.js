class combatant{
    constructor(layer,x,y,type,team,id){
        this.layer=layer
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
		this.base={life:this.life,position:{x:this.position.x,y:this.position.y}}
        this.collect={life:this.life}
		this.calc={damage:0}
		this.boost={main:[0,0],fade:[0,0],display:[],color:[[200,0,0],[0,150,255]],infoFade:[0,0],name:['Attack','Defense']}
		this.status={main:[],fade:[],display:[],color:[[255,125,0],[200,225,250]],infoFade:[],name:[],class:[1,1]}
		this.ammo=[-1,-1,-1]
		for(g=0;g<2;g++){
			this.status.main.push(0)
			this.status.fade.push(0)
			this.status.infoFade.push(0)
		}
		this.block=0
		this.fades={block:0,info:0}
		this.intent=0
        if(this.type==0){
            this.fade=0
        }else{
            this.fade=1
        }
    }
	setupIntent(){
		switch(this.behavior){
			case 0:
				this.intent=floor(random(0,this.attacks.length))
			break
		}
	}
    display(){
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
			break
			case 4:
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
		if(this.team==1){
			switch(this.attacks[this.intent]){
				case 1:
					this.layer.fill(255,50,50,this.fade)
					this.layer.triangle(-20,-this.height-30,15,-this.height-36,15,-this.height-24)
				break
				case 2:
					this.layer.fill(125,255,255,this.fade)
					this.layer.ellipse(0,-this.height-33,24,24)
				break
			}
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
			switch(this.attacks[this.intent]){
				case 1:
					this.layer.fill(255,this.fade)
					this.layer.textSize(20)
					this.layer.text(this.damage[this.intent],0,-this.height-30)
				break
				case 2:
					this.layer.fill(255,this.fade)
					this.layer.textSize(20)
					this.layer.text('?',0,-this.height-32)
				break
			}
		}
		this.layer.translate(-this.base.position.x,-this.base.position.y)
    }
	evoke(type){
		switch(type){
			case 0:
				i=0
				for(h=1,lh=current.combatants.length;h<lh;h++){
					if(i==0&&current.combatants[h].life>0){
						current.combatants[h].take(8,0)
						i=1
					}
				}
			break
			case 1:
				i=0
				for(h=1,lh=current.combatants.length;h<lh;h++){
					if(i==0&&current.combatants[h].life>0){
						current.combatants[h].take(12,0)
						if(current.combatants[h+1].life>0){
							current.combatants[h+1].take(4,0)
						}
						if(current.combatants[h-1].life>0&&h>1){
							current.combatants[h-1].take(4,0)
						}
						i=1
					}
				}
			break
			case 2:
				this.block+=10
			break
			case 3:
				current.mana.main+=3
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
	take(damage,user){
		this.calc.damage=damage/(2+max(0,this.boost.main[1]))*(2-min(0,this.boost.main[1]))
		if(this.block>this.calc.damage){
			this.block-=this.calc.damage
		}else if(this.block>0){
			this.calc.damage-=this.block
			this.block=0
			this.life-=this.calc.damage
		}else{
			this.life-=this.calc.damage
		}
		if(this.status.main[0]>0){
			current.combatants[user].take(this.status.main[0],this.id)
		}
		current.particles.push(new particle(this.layer,this.position.x,this.position.y-this.height/2,0,random(0,360),3,2,[255,0,0]))
		current.particles[current.particles.length-1].text=round(damage*10)/10
	}
    update(){
		this.boost.display=[]
		this.status.display=[]
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
    }
}