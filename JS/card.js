class card{
    constructor(layer,x,y,type,level,color,damage,alt,cost){
        this.layer=layer
        this.position={x:x,y:y}
        this.type=type
        this.level=level
        this.color=color
        this.name=types.card[this.type].name
        this.damage=damage||types.card[this.type].stats[this.level].damage
        this.alt=alt||types.card[this.type].stats[this.level].alt
        this.cost=cost||types.card[this.type].stats[this.level].cost
        this.attack=types.card[this.type].stats[this.level].attack
        this.target=types.card[this.type].stats[this.level].target
        this.desc=types.card[this.type].stats[this.level].desc
        this.spec=types.card[this.type].stats[this.level].spec
        this.class=types.card[this.type].stats[this.level].class
        this.anim={select:0,afford:0}
        this.width=120
        this.height=160
        this.size=0
        this.fade=1
        this.calcDirection=0
        this.remove=false
        this.discard=false
        this.select=false
        this.trigger=false
        this.used=false
    }
    displayName(){
        switch(this.type){
            case 1: case 3:
                this.desc='Deal '+this.damage+'\nDamage'
            break
            case 2:
                this.desc='Add '+this.damage+'\nBlock'
            break
            case 4:
                this.desc='Deal '+this.damage+' Damage '+this.alt+'\nTimes'
            break
            case 5:
                this.desc='Draw 2 Cards'
            break
            case 6:
                this.desc='Unplayable'
            break
            case 7:
                this.desc='Apply '+this.damage+'\nWeak'
            break
            case 8:
                this.desc='Add '+this.damage+' Block\nCounter '+this.alt
            break
            case 9:
                this.desc='Add '+this.damage+'X\nBlock'
            break
            case 10:
                this.desc='Deal '+this.damage+' Damage\nAdd a Bleed\nto Deck'
            break
            case 11:
                this.desc='Unplayable\nTake 1 Damage\nper Card Played'
            break
            case 12:
                this.desc='Deal '+this.damage+' Damage\nDiscard a Card'
            break
            case 13:
                this.desc='Deal '+this.damage+' Damage\nIf Fatal, gain\n1 Energy'
            break
            case 14:
                this.desc='Deal '+this.damage+' Damage\nGain 2 Mana\nNext Turn'
            break
            case 15:
                this.desc='Deal '+this.damage+' Damage\nto All Enemies'
            break
            case 16:
                this.desc='Hold '+this.damage+'\nBasic Bullet'
            break
            case 17:
                this.desc='Fire 1st Bullet\n'+this.damage+' Times'
            break
            case 18:
                this.desc='Hold '+this.damage+'\nExplosive Bullet'
            break
            case 19:
                this.desc='Hold '+this.damage+'\nShield Charge'
            break
            case 20:
                this.desc='Fire All\nBullets'
            break
            case 21:
                this.desc='Deal '+this.damage+' Damage\nDiscard Hand'
            break
            case 22:
                this.desc='Lose 1\nAmmo Slot'
            break
            case 23:
                this.desc='Hold '+this.damage+'\nEnergy Charge'
            break
            case 24:
                this.desc='Deal '+this.damage+' Damage\nApply '+this.alt+' Vulnerable'
            break                
            case 25:
                this.desc='Deal '+this.damage+' Damage\nAll Claws gain\n+2 Damage'
            break
        }
    }
    display(){
        this.displayName()
        if(this.size>0){
            this.layer.translate(this.position.x,this.position.y)
            this.layer.scale(this.size)
            this.layer.fill(255,this.fade*this.anim.select)
            this.layer.noStroke()
            this.layer.rect(0,0,this.width+15,this.height+15,10)
            switch(this.color){
                case 1:
                    this.layer.fill(160,200,160,this.fade)
                    this.layer.stroke(120,160,120,this.fade)
                break
                case 2:
                    this.layer.fill(200,160,200,this.fade)
                    this.layer.stroke(160,120,160,this.fade)
                break
                case 4:
                    this.layer.fill(120,this.fade)
                    this.layer.stroke(80,this.fade)
                break
            }
            this.layer.strokeWeight(5)
            this.layer.rect(0,0,this.width,this.height,5)
            if(this.spec!=1){
                this.layer.fill(200,225,250,this.fade)
                this.layer.stroke(150,200,250,this.fade)
                this.layer.strokeWeight(3)
                this.layer.quad(-this.width/2+4,-this.height/2+20,-this.width/2+16,-this.height/2+4,-this.width/2+28,-this.height/2+20,-this.width/2+16,-this.height/2+36)
            }
            this.layer.fill(this.anim.afford*240,0,0,this.fade)
            this.layer.noStroke()
            if(this.cost==-1){
                this.layer.textSize(20)
                this.layer.text('X',-this.width/2+16,-this.height/2+20)
            }else if(this.spec!=1){
                this.layer.textSize(20)
                this.layer.text(this.cost,-this.width/2+16,-this.height/2+20)
            }
            this.layer.textSize(16)
            if(this.level==1){
                switch(this.color){
                    case 1:
                        this.layer.fill(50,100,50,this.fade)
                    break
                    case 2:
                        this.layer.fill(100,50,100,this.fade)
                    break
                    case 4:
                        this.layer.fill(40,this.fade)
                    break
                }
                this.layer.text(this.name+'+',0,-this.height/2+24)
                this.layer.fill(0,this.fade)
            }else{
                this.layer.fill(0,this.fade)
                this.layer.text(this.name,0,-this.height/2+24)
            }
            this.layer.textSize(12)
            this.layer.text(this.desc,0,10)
            this.layer.scale(1/this.size)
            this.layer.translate(-this.position.x,-this.position.y)
        }
    }
    update(mana){
        if(this.size<1&&!this.used){
            this.size=round(this.size*5+1)*0.2
        }else if(this.size>0&&this.used){
            this.size=round(this.size*5-1)*0.2
        }
        if(this.size<=0&&this.used){
            this.discard=true
        }
        if(this.select&&this.anim.select<1){
            this.anim.select=round(this.anim.select*5+1)/5
        }else if(!this.select&&this.anim.select>0){
            this.anim.select=round(this.anim.select*5-1)/5
        }
        if(mana.main<this.cost&&this.anim.afford<1){
            this.anim.afford=round(this.anim.afford*5+1)/5
        }else if(mana.main>=this.cost&&this.anim.afford>0){
            this.anim.afford=round(this.anim.afford*5-1)/5
        }
        if(this.trigger&&!this.used){
            if(dist(this.position.x,this.position.y,100,120)<20){
                this.position.x=100
                this.position.y=120
            }else{
                this.calcDirection=atan2(100-this.position.x,120-this.position.y)
                this.position.x+=sin(this.calcDirection)*20
                this.position.y+=cos(this.calcDirection)*20
            }
        }
    }
}