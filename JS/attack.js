class attack{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.type=0
        this.level=0
        this.side=0
        this.mana=0
        this.combo=0
        this.color=0
        this.damage=0
        this.alt=0
        this.user=0
        this.target=[1]
        this.targetType=0
        this.attacks=[]
        this.hold={int:0}
    }
    update(type,level,side){
        this.type=type
        this.level=level
        this.side=side
        if(side==0){
            switch(type){
                case 1:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                break
                case 2:
                    this.battle.combatants[0].block+=this.damage
                break
                case 3:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([0,this.alt*10-10,this.target,this.damage])
                break
                case 4:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                break
                case 5:
                    this.battle.combatants[this.target].boost.main[0]-=this.damage
                break
                case 6:
                    this.battle.combatants[0].block+=this.damage
                    this.battle.combatants[0].status.main[0]+=this.alt
                break
                case 7:
                    this.battle.combatants[0].block+=this.damage*this.mana
                break
                case 8:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.drop.addDrop(11,0,4)
                    this.battle.reserve.add(11,0,4)
                break
                case 9:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.randomDiscard()
                break
                case 10:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].life<=0){
                        this.battle.mana.main++
                    }
                break
                case 11:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].status.main[1]+=this.alt
                break
                case 12:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            this.battle.combatants[g].take(this.damage,this.user)
                        }
                    }
                break
                case 13:
                    this.battle.combatants[0].load(0)
                    if(this.level>=1){
                        this.battle.combatants[0].load(0)
                    }
                break
                case 14:
                    for(g=0;g<this.damage;g++){
                        this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[0])
                    }
                    for(g=0,lg=this.battle.combatants[0].ammo.length-1;g<lg;g++){
                        this.battle.combatants[0].ammo[g]=this.battle.combatants[0].ammo[g+1]
                    }
                    this.battle.combatants[0].ammo[this.battle.combatants[0].ammo.length-1]=-1
                break
                case 15:
                    this.battle.combatants[0].load(1)
                break
                case 16:
                    this.battle.combatants[0].load(2)
                    if(this.level>=1){
                        this.battle.combatants[0].load(2)
                    }
                break
                case 17:
                    for(g=0,lg=this.battle.combatants[0].ammo.length;g<lg;g++){
                        this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[g])
                        this.battle.combatants[0].ammo[g]=-1
                    }
                break
                case 18:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.allDiscard()
                break
                case 19:
                    this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[this.battle.combatants[0].ammo.length-1].type)
                    this.battle.combatants[0].ammo.splice(this.battle.combatants[0].ammo.length-1,1)
                break
                case 20:
                    this.battle.combatants[0].load(3)
                break
                case 21:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].boost.main[1]-=this.alt
                break
                case 22:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].attack==22){
                            this.battle.hand.cards[g].damage+=2
                        }
                    }
                    for(g=0,lg=this.battle.reserve.cards.length;g<lg;g++){
                        if(this.battle.reserve.cards[g].attack==22){
                            this.battle.reserve.cards[g].damage+=2
                        }
                    }
                break
                case 23:
                    this.battle.combatants[this.target].take(this.damage*this.mana,this.user)
                break
                case 24:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.draw()
                    this.battle.draw()
                break
                case 25:
                    this.battle.combatants[0].life=min(this.battle.combatants[0].life+this.damage,this.battle.combatants[0].base.life)
                break
                case 26:
                    for(g=0;g<this.damage;g++){
                        this.battle.hand.add(31,0,this.color)
                    }
                break
                case 27:
                    this.battle.combatants[0].block+=this.damage
                    this.battle.combatants[0].changeStance(1)
                break
                case 28:
                    this.battle.combatants[0].block+=this.damage
                    this.battle.combatants[0].changeStance(0)
                break
                case 29:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(types.attack[this.battle.combatants[this.target].attacks[this.battle.combatants[this.target].intent]].class==0){
                        this.battle.combatants[0].changeStance(1)
                    }
                break
                case 30:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].changeStance(0)
                break
                case 31:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    this.battle.combatants[0].changeStance(0)
                break
                case 32:
                    this.battle.combatants[this.target].block=0
                    this.battle.combatants[this.target].take(this.damage,this.user)
                break
                case 33:
                    this.hold.int=this.battle.combatants[0].ammo[0]
                    this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[0])
                    for(g=0,lg=this.battle.combatants[0].ammo.length-1;g<lg;g++){
                        this.battle.combatants[0].ammo[g]=this.battle.combatants[0].ammo[g+1]
                    }
                    this.battle.combatants[0].ammo[this.battle.combatants[0].ammo.length-1]=-1
                    this.battle.combatants[0].load(this.hold.int)
                break
                case 34:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].boost.main[0]-=6
                break
                case 35:
                    this.battle.combatants[0].combo+=this.damage
                break
                case 36:
                    this.battle.combatants[this.target].take(this.damage+this.alt*this.combo,this.user)
                    this.battle.combatants[0].combo=0
                break
                case 37:
                    this.battle.combatants[this.target].take(this.damage+this.alt*this.combo,this.user)
                break
                case 38:
                    this.battle.combatants[0].status.main[2]+=this.damage
                break
                case 39:
                    this.battle.combatants[0].block+=this.damage
                    this.battle.combatants[0].status.main[3]+=this.alt
                break
                case 40:
                    this.battle.combatants[0].block+=this.damage
                    this.battle.combatants[0].status.main[3]+=this.alt+2*this.combo
                break
                case 41:
                    this.battle.combatants[this.target].take(this.damage+this.alt*this.combo,this.user)
                    this.battle.combatants[0].status.main[4]+=this.alt
                break
                case 42:
                    this.battle.combatants[this.target].take(this.damage+this.alt*this.combo,this.user)
                    if(this.battle.combatants[this.target].class==0){
                        this.battle.combatants[this.target].status.main[5]+=this.alt
                    }
                break
                case 43:
                    if(this.battle.combatants[this.target].status.main[5]>0){
                        this.battle.combatants[this.target].take(this.damage+this.alt,this.user)
                    }else{
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                break
                case 44:
                    this.battle.combatants[this.target].take(this.damage+this.combo,this.user)
                    this.attacks.push([2,this.alt*10-10,this.target,this.damage+this.combo])
                    this.battle.combatants[0].combo=0
                break
                case 45:
                    this.battle.combatants[this.target].take(this.damage+this.combo,this.user)
                    this.battle.combatants[0].status.main[6]++
                break
                case 46:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([3,20,this.target,this.alt])
                break
                case 47:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([4,20,this.target,this.alt])
                break
            }
        }else{
            switch(type){
                case 1:
                    this.battle.combatants[0].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                break
                case 2:
                    this.battle.drop.addDrop(6,0,4)
                    this.battle.reserve.add(6,0,4)
                break
            }
        }
    }
    run(){
        for(g=0,lg=this.attacks.length;g<lg;g++){
            this.attacks[g][1]--
            switch(this.attacks[g][0]){
                case 0:
                    if(this.attacks[g][1]%10==0){
                        this.battle.combatants[this.attacks[g][2]].take(this.attacks[g][3],0)
                    }
                break
                case 1:
                    if(this.attacks[g][1]>=6){
                        this.battle.combatants[this.attacks[g][2]].position.x-=10
                    }else{
                        this.battle.combatants[this.attacks[g][2]].position.x+=10
                    }
                break
                case 2:
                    if(this.attacks[g][1]%10==0){
                        this.battle.combatants[this.attacks[g][2]].take(this.attacks[g][3],0)
                        this.battle.combatants[0].combo=0
                    }
                break
                case 3:
                    if(this.attacks[g][1]<10){
                        this.battle.combatants[this.attacks[g][2]].position.x+=8
                    }else{
                        this.battle.combatants[this.attacks[g][2]].position.x-=8
                    }
                    if(this.attacks[g][1]==10&&this.attacks[g][2]>1){
                        this.battle.combatants[this.attacks[g][2]-1].take(this.attacks[g][3],0)
                    }
                break
                case 4:
                    if(this.attacks[g][1]<10){
                        this.battle.combatants[this.attacks[g][2]].position.x-=8
                    }else{
                        this.battle.combatants[this.attacks[g][2]].position.x+=8
                    }
                    if(this.attacks[g][1]==10&&this.attacks[g][2]<this.battle.combatants.length-1){
                        this.battle.combatants[this.attacks[g][2]+1].take(this.attacks[g][3],0)
                    }
                break
            }
            if(this.attacks[g][1]<=0){
                this.attacks.splice(g,1)
                g--
                lg--
            }
        }
    }
}