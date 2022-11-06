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
        this.base={cost:this.cost}
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
        this.exhaust=false
    }
    displayName(deckSize){
        this.desc=''
        if(this.spec==1||this.spec==6||this.spec==7){
            this.desc+='Unplayable\n'
        }
        if(this.spec==7||this.spec==8||this.spec==10){
            this.desc+='Innate\n'
        }
        switch(this.attack){
            case -2: this.desc+='Take 1 Damage\nper Card Played'; break
            case -3: this.desc+='Ethereal'; break
            case -4: this.desc+='At End of Turn,\nGain 1 Weak'; break
            case -5: this.desc+='Take 1 Damage\nper Card Not Played'; break
            case -7: this.desc+='At End of Turn,\nGain 1 Vulnerable'; break
            case -8: this.desc+='When Removed,\nLose 3 Max Health'; break
            case 1: this.desc+='Deal '+this.damage+'\nDamage'; break
            case 2: this.desc+='Add '+this.damage+'\nBlock'; break
            case 3: this.desc+='Deal '+this.damage+' Damage\n'+this.alt+' Times'; break
            case 4: this.desc+='Draw '+this.damage+' Cards'; break
            case 5: this.desc+='Apply '+this.damage+'\nWeak'; break
            case 6: this.desc+='Add '+this.damage+' Block\nCounter '+this.alt+' All'; break
            case 7: this.desc+='Add '+this.damage+'X\nBlock'; break
            case 8: this.desc+='Deal '+this.damage+' Damage\nAdd a Bleed\nto Deck'; break
            case 9: this.desc+='Deal '+this.damage+' Damage\nDiscard a Card'; break
            case 10: this.desc+='Deal '+this.damage+' Damage\nIf Fatal, gain\n1 Energy'; break
            case 11: this.desc+='Deal '+this.damage+' Damage\nGain 2 Mana\nNext Turn'; break
            case 12: this.desc+='Deal '+this.damage+' Damage\nto All Enemies'; break
            case 13: this.desc+='Hold '+this.damage+'\nBasic Charge'; break
            case 14: this.desc+='Fire 1st Charge\n'+this.damage+' Times'; break
            case 15: this.desc+='Hold '+this.damage+'\nExplosive Charge'; break
            case 16: this.desc+='Hold '+this.damage+'\nShield Charge'; break
            case 17: this.desc+='Fire All\nCharges'; break
            case 18: this.desc+='Deal '+this.damage+' Damage\nDiscard Hand'; break
            case 19: this.desc+='Lose 1\nAmmo Slot'; break
            case 20: this.desc+='Hold '+this.damage+'\nEnergy Charge'; break
            case 21: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Vulnerable'; break                
            case 22: this.desc+='Deal '+this.damage+' Damage\nAll Claws gain\n+2 Damage'; break
            case 23: this.desc+='Deal '+this.damage+'X\nDamage'; break
            case 24: this.desc+='Deal '+this.damage+' Damage\nDraw 2 Cards'; break
            case 25: this.desc+='Heal '+this.damage+' Health'; break
            case 26: this.desc+='Draw '+this.damage+' Shivs'; break
            case 27: this.desc+='Add '+this.damage+' Block\nEnter Calm'; break
            case 28: this.desc+='Add '+this.damage+' Block\nExit Stance'; break
            case 29: this.desc+='Deal '+this.damage+' Damage\nIf the Enemy\nIntends to Attack,\nEnter Calm.'; break
            case 30: this.desc+='Deal '+this.damage+' Damage\nExit Stance'; break
            case 31: this.desc+='Draw '+this.damage+' Cards\nExit Stance'; break
            case 32: this.desc+='Remove All\nBlock of Target\nDeal '+this.damage+' Damage'; break
            case 33: this.desc+='Fire 1st Charge\nHold that Charge'; break
            case 34: this.desc+='Deal '+this.damage+' Damage\nApply 6 Weak'; break
            case 35: this.desc+='Gain '+this.damage+'\nCombo'; break
            case 36: this.desc+='Deal '+this.damage+' Damage\n+'+this.alt+' Per Combo\nEnd Combo'; break
            case 37: this.desc+='Deal '+this.damage+' Damage\n+'+this.alt+' Per Combo'; break
            case 38: this.desc+='Next '+this.damage+'\nAttacks Deal\nDouble Damage'; break
            case 39: this.desc+='Add '+this.damage+' Block\nCounter '+this.alt+' Once'; break
            case 40: this.desc+='Add '+this.damage+' Block\nCounter '+this.alt+' +2\nPer Combo'+' Once'; break
            case 41: this.desc+='Deal '+this.damage+' Damage\nGain +'+this.alt+' Damage\nNext Turn'; break
            case 42: this.desc+='Deal '+this.damage+' Damage\nKnockdown'; break
            case 43: this.desc+='Deal '+this.damage+' Damage\nDeal '+this.alt+' Bonus\nDamage to Downed'; break
            case 44: this.desc+='Deal '+this.damage+' Damage\n+1 Per Combo\n'+this.alt+' Times'; break
            case 45: this.desc+='Deal '+this.damage+' Damage\nGain 1 Dodge'; break
            case 46: this.desc+='Deal '+this.damage+' Damage\nDeal '+this.alt+' Damage\nto the Left'; break
            case 47: this.desc+='Deal '+this.damage+' Damage\nDeal '+this.alt+' Damage\nto the Right'; break
            case 48: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Vulnerable'; break
            case 49: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\nDeal '+this.alt+' Bonus\nDamage to Downed'; break
            case 50: this.desc+='Deal '+this.damage+' Damage\n+'+this.alt+' Per Combo\nTo 3 Enemies\nEnd Combo'; break
            case 51: this.desc+='Deal '+this.damage+' Damage\n'+this.alt+' Times'; break
            case 52: this.desc+='Deal '+this.damage+' Damage\nGain '+this.alt+' Damage\nwhen Retained'; break
            case 53: this.desc+='Reduce Cost of\nAll Cards in\nHand to '+this.damage; break
            case 54: this.desc+='Deal '+this.damage+' Damage\nIgnore Block'; break
            case 55: this.desc+='Shuffle Discard\nPile into Draw Pile\nDraw '+this.damage+' Cards'; break
            case 56: this.desc+='Exhuast your Hand'; break
            case 57: this.desc+='Add '+this.damage+' Block\nDraw '+this.alt+' Cards'; break
            case 58: this.desc+='Temporarily\nUpgrade All Cards'; break
            case 59: this.desc+='Shuffle '+this.damage+'\nRandom Attacks\ninto Draw Pile.\nThey Cost 0'; break
            case 60: this.desc+='Deal '+this.damage+' Damage\nIf Fatal, gain\n'+this.alt+' Gold'; break
            case 61: this.desc+='Shuffle '+this.damage+'\nRandom Skills\ninto Draw Pile.\nThey Cost 0'; break
            case 62: this.desc+='Deal Damage\nEqual to Number of\nCards in Deck\n('+deckSize+')'; break
            case 63: this.desc+='Deal '+this.damage+'\nDamage\nor\nAdd '+this.damage+'\nBlock'; break
            case 64: this.desc+='Apply '+this.damage+' Weak\nand '+this.damage+' Vulnerable\nto All Enemies'; break
            case 65: this.desc+='Deal '+this.damage+' Damage\n'+nfp(this.alt)+' Balance'; break
            case 66: this.desc+='Add '+this.damage+' Block\n'+nfp(this.alt)+' Balance'; break
            case 67: this.desc+='If Balance\nis Positive,\nDeal Damage\nEqual to Balance\nReset Balance'; break
            case 68: this.desc+='If Balance\nis Negative, Gain\nBlock Equal to\nNegative Balance\nReset Balance'; break
            case 69: this.desc+='Reset Balance'; break
            case 70: this.desc+='Draw '+this.damage+' Cards\n'+nfp(this.alt)+' Balance'; break
            case 71: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\n'+nfp(this.alt)+' Balance\nPer Enemy'; break
            case 72: this.desc+='Deal '+this.damage+' Damage\nApply 1 Stunned\n'+nfp(this.alt)+' Balance'; break
            case 73: this.desc+='Deal '+this.damage+' Damage\nDisarm'; break
            case 74: this.desc+='Rearm'; break
            case 75: this.desc+='Reflect Next\n'+this.damage+' Attacks\n'+nfp(this.alt)+' Balance'; break
            case 76: this.desc+='Apply '+this.damage+'\nBleed\n'+nfp(this.alt)+' Balance'; break
            case 77: this.desc+='Deal '+this.damage+' Damage\nApply '+(6+this.level*2)+' Bleed\n'+nfp(this.alt)+' Balance'; break
        }
        if(this.spec==2||this.spec==9){
            this.desc+='\nRetain'
        }
        if(this.spec==3||this.spec==8||this.spec==9){
            this.desc+='\nExhaust'
        }
        if(this.desc[this.desc.length-1]=='\n'){
            this.desc=this.desc.substr(0,this.desc.length-1)
        }
    }
    display(deckSize){
        this.displayName(deckSize)
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
                    this.layer.fill(200,160,180,this.fade)
                    this.layer.stroke(160,120,140,this.fade)
                break
                case 3:
                    this.layer.fill(240,200,160,this.fade)
                    this.layer.stroke(200,160,120,this.fade)
                break
                case 4:
                    this.layer.fill(220,200,240,this.fade)
                    this.layer.stroke(180,160,200,this.fade)
                break
                case 5:
                    this.layer.fill(120,this.fade)
                    this.layer.stroke(80,this.fade)
                break
                case 6:
                    this.layer.fill(80,this.fade)
                    this.layer.stroke(50,this.fade)
                break
            }
            this.layer.strokeWeight(5)
            this.layer.rect(0,0,this.width,this.height,5)
            if(this.attack==63){
                this.layer.rect(0,-this.height/4+5,this.width,this.height/2+10,5)
                this.layer.rect(0,this.height/4+5,this.width,this.height/2-10,5)
            }
            if(this.spec==11){
                this.layer.fill(138,141,207,this.fade)
                this.layer.stroke(111,114,178,this.fade)
                this.layer.strokeWeight(2)
                this.layer.ellipse(-this.width/2+16,-this.height/2+20,30,30)
            }
            if(this.spec==4){
                this.layer.noFill()
				this.layer.stroke(240,240,40,this.fade)
				this.layer.strokeWeight(4)
				this.layer.strokeCap(SQUARE)
				this.layer.arc(-this.width/2+17,-this.height/2+19,20,20,-45,135)
				this.layer.arc(-this.width/2+15,-this.height/2+17,20,20,135,315)
				this.layer.strokeCap(ROUND)
                this.layer.fill(250-this.anim.afford*10,250-this.anim.afford*250,250-this.anim.afford*250,this.fade)
            }else if(this.spec!=1&&this.spec!=6&&this.spec!=7){
                this.layer.fill(200,225,250,this.fade)
                this.layer.stroke(150,200,250,this.fade)
                this.layer.strokeWeight(3)
                this.layer.quad(-this.width/2+4,-this.height/2+20,-this.width/2+16,-this.height/2+4,-this.width/2+28,-this.height/2+20,-this.width/2+16,-this.height/2+36)
                this.layer.fill(this.anim.afford*240,0,0,this.fade)
            }
            this.layer.noStroke()
            if(this.cost==-1){
                this.layer.textSize(20)
                this.layer.text('X',-this.width/2+16,-this.height/2+20)
            }else if(this.spec!=1&&this.spec!=6&&this.spec!=7){
                this.layer.textSize(20)
                this.layer.text(this.cost,-this.width/2+16,-this.height/2+20)
            }
            this.layer.textSize(14)
            if(this.level==1){
                switch(this.color){
                    case 1:
                        this.layer.fill(50,100,50,this.fade)
                    break
                    case 2:
                        this.layer.fill(100,0,50,this.fade)
                    break
                    case 3:
                        this.layer.fill(150,100,50,this.fade)
                    break
                    case 4:
                        this.layer.fill(50,0,100,this.fade)
                    break
                    case 5:
                        this.layer.fill(40,this.fade)
                    break
                    case 6:
                        this.layer.fill(20,this.fade)
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
    update(mana,combo,armed){
        if(this.size<1&&!this.used){
            this.size=round(this.size*5+1)*0.2
        }else if(this.size>0&&this.used){
            this.size=round(this.size*5-1)*0.2
        }
        if(this.size<=0&&this.used){
            if(this.spec==3||this.spec==8||this.spec==9||this.exhaust){
                this.remove=true
            }else{
                this.discard=true
            }
        }
        if(this.select&&this.anim.select<1){
            this.anim.select=round(this.anim.select*5+1)/5
        }else if(!this.select&&this.anim.select>0){
            this.anim.select=round(this.anim.select*5-1)/5
        }
        if((mana.main<this.cost&&this.spec!=4||combo<this.cost&&this.spec==4||(this.spec==11&&!armed))&&this.anim.afford<1){
            this.anim.afford=round(this.anim.afford*5+1)/5
        }else if(!(mana.main<this.cost&&this.spec!=4||combo<this.cost&&this.spec==4||(this.spec==11&&!armed))&&this.anim.afford>0){
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