class attack{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.type=0
        this.level=0
        this.side=0
        this.class=0
        this.mana=0
        this.combo=0
        this.color=0
        this.damage=0
        this.alt=0
        this.user=0
        this.target=[1]
        this.targetType=0
        this.attacks=[]
        this.hold={int:0,list:[]}
    }
    update(type,level,side){
        this.type=type
        this.level=level
        this.side=side
        if(side==0){
            switch(type){
                case -12:
                    if(this.battle.combatants[0].meter<0){
                        this.battle.combatants[0].meter=-100
                    }else if(this.battle.combatants[0].meter>0){
                        this.battle.combatants[0].meter=100
                    }
                break
                case 1: case 52: case 99: case 114: case 139: case 232: case 284: case 329:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                break
                case 2: case 231: case 268:
                    this.battle.combatants[0].addBlock(this.damage)
                break
                case 3: case 51: case 135:
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
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[0]+=this.alt
                break
                case 7:
                    this.battle.combatants[0].addBlock(this.damage*this.mana)
                break
                case 8:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.drop.addDrop(findCard('Slow\nBleed'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Slow\nBleed'),0,stage.playerNumber+1)
                break
                case 9:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.randomDiscard()
                break
                case 10:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].life<=0){
                        this.battle.mana.main+=this.alt
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
                    this.battle.combatants[0].load(0,0)
                    if(this.level>=1){
                        this.battle.combatants[0].load(0,0)
                    }
                break
                case 14:
                    for(g=0;g<this.damage;g++){
                        this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[0],this.battle.combatants[0].ammoDetail[0])
                    }
                    this.battle.combatants[0].cycleCharge()
                break
                case 15:
                    this.battle.combatants[0].load(1,0)
                break
                case 16:
                    this.battle.combatants[0].load(2,0)
                    if(this.level>=1){
                        this.battle.combatants[0].load(2,0)
                    }
                break
                case 17:
                    for(g=0,lg=this.battle.combatants[0].ammo.length;g<lg;g++){
                        this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[g],this.battle.combatants[0].ammoDetail[g])
                        this.battle.combatants[0].ammo[g]=-1
                    }
                break
                case 18:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    for(g=0;g<this.alt;g++){
                        this.battle.randomDiscard()
                    }
                break
                case 19:
                    this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[this.battle.combatants[0].ammo.length-1].type,this.battle.combatants[0].ammoDetail[this.battle.combatants[0].ammoDetail.length-1].type)
                    this.battle.combatants[0].ammo.splice(this.battle.combatants[0].ammo.length-1,1)
                    this.battle.combatants[0].ammoDetail.splice(this.battle.combatants[0].ammoDetail.length-1,1)
                break
                case 20:
                    this.battle.combatants[0].load(3,0)
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
                    for(g=0;g<this.alt;g++){
                        this.battle.draw()
                    }
                break
                case 25:
                    this.battle.combatants[0].life=min(this.battle.combatants[0].life+this.damage*this.battle.random.healEffectiveness,this.battle.combatants[0].base.life)
                break
                case 26:
                    for(g=0;g<this.damage;g++){
                        this.battle.hand.add(findCard('Shiv'),0,0)
                    }
                break
                case 27:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].changeStance(1)
                break
                case 28:
                    this.battle.combatants[0].addBlock(this.damage)
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
                    this.hold.int2=this.battle.combatants[0].ammoDetail[0]
                    this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[0],this.battle.combatants[0].ammoDetail[0])
                    this.battle.combatants[0].cycleCharge()
                    this.battle.combatants[0].load(this.hold.int,this.hold.int2)
                break
                case 34:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].boost.main[0]-=this.alt
                break
                case 35: case 275:
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
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[3]+=this.alt
                break
                case 40:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[3]+=this.alt+2*this.combo
                break
                case 41:
                    this.battle.combatants[this.target].take(this.damage+this.alt*this.combo,this.user)
                    this.battle.combatants[0].status.main[4]+=this.alt
                break
                case 42:
                    this.battle.combatants[this.target].take(this.damage,this.user)
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
                case 48:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].boost.main[1]-=this.alt
                break
                case 49:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            if(this.battle.combatants[g].status.main[5]>0){
                                this.battle.combatants[g].take(this.damage+this.alt,this.user)
                            }else{
                                this.battle.combatants[g].take(this.damage,this.user)
                            }
                        }
                    }
                break
                case 50:
                    this.battle.combatants[this.target].take(this.damage+this.alt*this.combo,this.user)
                    if(this.target>1){
                        this.battle.combatants[this.target-1].take(this.damage+this.alt*this.combo,0)
                    }
                    if(this.target<this.battle.combatants.length-1){
                        this.battle.combatants[this.target+1].take(this.damage+this.alt*this.combo,0)
                    }
                    this.battle.combatants[0].combo=0
                break
                case 53:
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        this.battle.hand.cards[g].cost=min(this.damage,this.battle.hand.cards[g].cost)
                    }
                break
                case 54:
                    this.battle.combatants[this.target].take(this.damage,this.user,1)
                break
                case 55:
                    this.battle.return()
                    this.battle.reserve.shuffle()
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                break
                case 56:
                    this.battle.allExhaust()
                break
                case 57:
                    this.battle.combatants[0].addBlock(this.damage)
                    for(g=0;g<this.alt;g++){
                        this.battle.draw()
                    }
                break
                case 58:
                    this.battle.allUpgrade()
                break
                case 59: case 61:
                    this.hold.list=[]
                    for(g=0,lg=listing.card[this.battle.player].length;g<lg;g++){
                        if(types.card[listing.card[this.battle.player][g]].rarity>=0&&(types.card[listing.card[this.battle.player][g]].stats[0].class==0&&this.type==59||(types.card[listing.card[this.battle.player][g]].stats[0].class==1||types.card[listing.card[this.battle.player][g]].stats[0].class==2)&&this.type==61)){
                            this.hold.list.push(g)
                        }
                    }
                    for(g=0;g<this.damage;g++){
                        this.battle.reserve.addShuffle(this.hold.list[floor(random(0,this.hold.list.length))],0,this.color)
                        this.battle.reserve.cards[this.battle.reserve.cards.length-1].cost=0
                        this.battle.reserve.cards[this.battle.reserve.cards.length-1].base.cost=0
                    }
                    this.battle.reserve.shuffle()
                break
                case 60:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].life<=0){
                        this.battle.currency.money+=this.alt
                    }
                break
                case 62:
                    this.battle.combatants[this.target].take(this.battle.deck.cards.length,this.user)
                break
                case 64:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        this.battle.combatants[g].boost.main[0]-=this.damage
                        this.battle.combatants[g].boost.main[1]-=this.damage
                    }
                break
                case 65: case 193: case 195:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].meter+=this.alt
                break
                case 66: case 196:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].meter+=this.alt
                break
                case 67:
                    if(this.battle.combatants[0].meter>0){
                        this.battle.combatants[this.target].take(this.damage*this.battle.combatants[0].meter,this.user)
                    }
                    this.battle.combatants[0].meter=0
                break
                case 68:
                    if(this.battle.combatants[0].meter<0){
                        this.battle.combatants[0].addBlock(this.damage*-this.battle.combatants[0].meter)
                    }
                    this.battle.combatants[0].meter=0
                break
                case 69:
                    this.battle.combatants[0].meter=0
                break
                case 70:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    this.battle.combatants[0].meter+=this.alt
                break
                case 71:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            this.battle.combatants[g].take(this.damage,this.user)
                            this.battle.combatants[0].meter+=this.alt
                        }
                    }
                break
                case 72: case 194:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].status.main[9]++
                    this.battle.combatants[0].meter+=this.alt
                break
                case 73:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].armed=0
                break
                case 74:
                    if(this.battle.combatants[0].armed==0){
                        this.battle.combatants[0].armed=1
                    }
                break
                case 75:
                    this.battle.combatants[0].status.main[10]+=this.damage
                    this.battle.combatants[0].meter+=this.alt
                break
                case 76:
                    if(this.battle.combatants[this.target].block<=0){
                        this.battle.combatants[this.target].status.main[11]+=this.damage
                    }
                    this.battle.combatants[0].meter+=this.alt
                break
                case 77:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].block<=0){
                        this.battle.combatants[this.target].status.main[11]+=6+this.level*2
                    }
                    this.battle.combatants[0].meter+=this.alt
                break
                case 78:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([0,50,this.target,this.damage])
                    this.battle.combatants[0].meter+=this.alt
                break
                case 79:
                    if(this.battle.combatants[0].meter>0){
                        this.battle.combatants[0].life=min(this.battle.combatants[0].life+this.damage*this.battle.combatants[0].meter*this.battle.random.healEffectiveness,this.battle.combatants[0].base.life)
                    }
                    this.battle.combatants[0].meter=0
                break
                case 80:
                    this.battle.combatants[0].status.main[12]++
                    this.battle.combatants[0].meter+=this.alt
                break
                case 81:
                    this.battle.combatants[this.target].setupIntent()
                break
                case 82:
                    this.battle.combatants[0].boost.main[0]+=this.damage
                    this.battle.combatants[0].boost.main[2]+=this.alt
                    this.battle.combatants[0].armed=-1
                break
                case 83:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            this.battle.combatants[g].take(this.damage,this.user)
                        }
                    }
                    this.battle.combatants[0].armed=0
                break
                case 84:
                    this.battle.combatants[0].boost.main[2]+=this.alt
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                break
                case 85:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].block<=0){
                            this.battle.combatants[g].status.main[11]+=this.damage
                        }
                    }
                    this.battle.combatants[0].meter+=this.alt
                break
                case 86:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[0].armed==0){
                        this.battle.combatants[0].armed=1
                    }
                break
                case 87:
                    this.battle.combatants[0].addBlock(this.damage)
                    if(this.battle.combatants[0].armed==0){
                        this.battle.combatants[0].armed=1
                    }
                break
                case 88:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].armed=0
                break
                case 89:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    this.battle.combatants[0].meter+=this.alt
                    if(this.battle.combatants[0].meter<=10){
                        for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                            this.battle.hand.cards[g].cost=min(0,this.battle.hand.cards[g].cost)
                        }
                    }
                break
                case 90:
                    if(this.battle.combatants[0].armed!=1){ 
                        this.attacks.push([5,20,this.target,this.damage])
                    }
                break
                case 91:
                    this.battle.combatants[this.target].take(this.damage+this.alt*this.combo,this.user)
                    if(this.target>1){
                        this.battle.combatants[this.target-1].take(this.damage+this.alt*this.combo,0)
                    }
                    if(this.target<this.battle.combatants.length-1){
                        this.battle.combatants[this.target+1].take(this.damage+this.alt*this.combo,0)
                    }
                    this.battle.combatants[0].combo=0
                    this.battle.combatants[0].meter+=this.alt
                break
                case 92:
                    this.battle.combatants[0].addBlock(this.battle.combatants[0].combo*this.damage)
                    this.battle.combatants[0].combo=0
                break
                case 93:
                    if(this.damage>0){
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                    this.attacks.push([5,20,this.target,this.alt])
                break
                case 94:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[13]++
                break
                case 95:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].changeStance(2)
                break
                case 96:
                    this.battle.mana.main+=this.damage
                break
                case 97:
                    this.battle.combatants[this.target].take(this.damage*this.battle.counter.enemies.alive,this.user)
                break
                case 98:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.drop.addDrop(findCard('Insight'),0,0)
                    this.battle.reserve.addShuffle(findCard('Insight'),0,0)
                break
                case 100:
                    this.battle.combatants[0].changeStance(2)
                break
                case 101:
                    if(this.battle.combatants[0].stance==2){
                        this.battle.combatants[0].addBlock(this.alt+this.damage)
                    }else{
                        this.battle.combatants[0].addBlock(this.damage)
                    }
                break
                case 102:
                    this.battle.combatants[0].mantra+=this.damage
                break
                case 103:
                    this.battle.combatants[0].changeStance(1)
                break
                case 104:
                    this.battle.combatants[0].status.main[14]++
                break
                case 105:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            this.battle.combatants[g].take(this.damage,this.user)
                        }
                    }
                    this.battle.close()
                break
                case 106:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.hand.addShuffle(findCard('Safety'),0,0)
                break
                case 107:
                    if(this.battle.combatants[0].stance==2){
                        for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                            if(this.battle.combatants[g].life>0){
                                this.battle.combatants[g].boost.main[1]-=this.damage
                            }
                        }
                    }else{
                        this.battle.combatants[0].changeStance(2)
                    }
                break
                case 108:
                    if(this.battle.combatants[0].stance==1){
                        for(g=0;g<this.damage;g++){
                            this.battle.draw()
                        }
                    }else{
                        this.battle.combatants[0].changeStance(1)
                    }
                break
                case 109:
                    transition.trigger=true
                    transition.scene='deck'
                    this.battle.context=2
                    this.battle.combatants[0].changeStance(1)
                break
                case 110:
                    this.battle.combatants[0].status.main[15]+=this.damage
                break
                case 111:
                    this.battle.combatants[0].mantra+=this.damage
                    this.battle.drop.addDrop(findCard('Insight'),0,0)
                    this.battle.reserve.addShuffle(findCard('Insight'),0,0)
                break
                case 112:
                    this.battle.combatants[0].status.main[16]+=this.damage
                break
                case 113:
                    this.battle.combatants[0].addBlock(this.damage)
                    if(this.battle.combatants[0].lastPlay==1){
                        this.battle.draw()
                        this.battle.draw()
                    }
                break
                case 115:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.stance==2){
                        this.attacks.push([0,this.alt*10-10,this.target,this.damage])
                    }else if(this.stance==3){
                        this.attacks.push([0,this.alt*10-10,this.target,this.damage*3/2])
                    }else{
                        this.attacks.push([0,this.alt*10-10,this.target,this.damage/2])
                    }
                    this.battle.combatants[0].changeStance(2)
                break
                case 116:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].addBlock(max(0,this.damage-this.battle.combatants[this.target].block))
                break
                case 117:
                    this.battle.combatants[0].status.main[17]+=this.damage
                break
                case 118:
                    this.battle.combatants[0].status.main[18]+=this.damage
                break
                case 119:
                    this.battle.combatants[0].mantra+=this.damage
                    this.battle.combatants[0].status.main[19]++
                break
                case 120:
                    this.battle.combatants[this.target].take(this.damage+this.alt*this.battle.combatants[0].mantra,this.user)
                break
                case 122:
                    this.battle.combatants[0].status.main[20]+=this.damage
                break
                case 123:
                    for(g=0,lg=this.damage-this.battle.hand.cards.length+1;g<lg;g++){
                        this.battle.draw()
                    }
                break
                case 124:
                    this.battle.combatants[0].addBlock(this.damage*this.battle.hand.cards.length)
                break
                case 125:
                    this.battle.combatants[0].addBlock(this.damage)
                    for(let g=0;g<this.alt;g++){
                        this.battle.hand.add(findCard('Shiv'),0,0)
                    }
                break
                case 126:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            this.battle.combatants[g].take(this.damage,this.user)
                            this.attacks.push([0,this.alt*10-10,g,this.damage])
                        }
                    }
                break
                case 127:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.draw()
                    this.battle.randomDiscard()
                break
                case 128:
                    this.hold.int=this.battle.hand.cards.length
                    this.battle.allDiscard()
                    for(g=0;g<this.hold.int;g++){
                        this.battle.draw()
                    }
                break
                case 129:
                    this.battle.combatants[0].status.main[21]+=this.damage
                break
                case 130:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([0,this.alt*this.mana*10-10,this.target,this.damage])
                break
                case 131:
                    this.battle.combatants[0].status.main[22]+=this.damage
                break
                case 132:
                    this.hold.int=this.battle.hand.cards.length
                    this.battle.allDiscard()
                    for(g=0;g<this.hold.int;g++){
                        this.battle.hand.addShuffle(findCard('Shiv'),this.damage,0)
                    }
                break
                case 133:
                    this.battle.mana.main+=this.damage
                    for(g=0;g<this.alt;g++){
                        this.battle.draw()
                    }
                break
                case 134:
                    this.battle.combatants[0].status.main[23]+=this.damage
                break
                case 136:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].status.main[11]+=this.alt
                    this.battle.combatants[0].meter-=5
                break
                case 137:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([6,10,this.target,this.damage])
                break
                case 138:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].class==0){
                        this.battle.combatants[this.target].status.main[5]+=this.alt
                    }
                    this.battle.combatants[0].combo+=2
                break
                case 140:
                    this.battle.combatants[this.target].boost.main[0]+=this.alt
                    this.battle.combatants[this.target].boost.main[1]-=this.damage
                break
                case 141:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.turn=this.target+100
                break
                case 142:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([9,20,this.target,this.alt])
                break
                case 143:
                    this.battle.combatants[this.target].take(this.damage*this.battle.discard.cards.length,this.user)
                break
                case 144:
                    this.battle.combatants[0].status.main[6]+=this.damage
                break
                case 145:
                    this.battle.combatants[0].status.main[6]+=this.damage
                    this.battle.combatants[0].status.main[3]+=this.alt
                break
                case 146:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].combo+=2
                    this.battle.combatants[0].status.main[24]+=this.alt
                break
                case 147:
                    this.battle.combatants[0].status.main[25]+=this.damage
                break
                case 148:
                    this.battle.allDiscard()
                    this.battle.turnDraw()
                break
                case 149:
                    this.battle.combatants[0].status.main[6]++
                    this.battle.allDiscard()
                break
                case 150:
                    for(g=0;g<this.mana+this.damage;g++){
                        this.battle.draw()
                    }
                break
                case 151:
                    this.battle.combatants[0].status.main[26]+=this.damage
                break
                case 152:
                    if(this.damage>0){
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                    this.attacks.push([10,20,this.target,this.alt])
                break
                case 153:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[3]+=4
                    this.battle.combatants[0].status.main[27]+=this.alt
                break
                case 154:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[28]+=this.alt
                break
                case 155:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.draw()
                    this.battle.hand.cards[this.battle.hand.cards.length-1].cost=0
                break
                case 156:
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        this.battle.hand.cards[g].cost=max(this.battle.hand.cards[g].cost-this.damage,0)
                    }
                break
                case 157:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[0].lastPlay==0){
                        this.battle.mana.main++
                    }
                break
                case 158:
                    this.battle.combatants[0].mantra+=this.damage
                    this.battle.combatants[0].addBlock(this.alt)
                break
                case 159:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[0].lastPlay==0){
                        this.battle.combatants[this.target].boost.main[0]-=this.alt
                    }
                break
                case 160:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[0].lastPlay==1){
                        this.battle.combatants[this.target].boost.main[1]-=this.alt
                    }
                break
                case 161:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.hand.addShuffle(findCard('Smite'),0,0)
                break
                case 162:
                    this.battle.combatants[0].addBlock(this.damage)
                    transition.trigger=true
                    transition.scene='deck'
                    this.battle.context=7
                    this.battle.context2=this.alt
                break
                case 163:
                    transition.trigger=true
                    transition.scene='deck'
                    this.battle.context=8
                    this.battle.context2=this.damage
                break
                case 164:
                    if(this.battle.combatants[this.target].status.main[5]>0){
                        this.battle.combatants[this.target].status.main[11]+=this.alt
                    }
                    this.battle.combatants[this.target].take(this.damage,this.user)
                break
                case 165:
                    this.battle.combatants[0].status.main[29]+=this.damage
                    if(this.alt>0){
                        this.battle.combatants[0].addBlock(this.alt)
                    }
                break
                case 166:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.discarding+=this.alt
                break
                case 169:
                    this.battle.discarding+=this.damage
                    this.battle.mana.main+=this.alt
                break
                case 170:
                    this.battle.discarding++
                    this.battle.draw()
                break
                case 171:
                    this.battle.combatants[0].status.main[36]+=this.damage
                break
                case 172:
                    this.battle.combatants[this.target].boost.main[1]-=this.damage
                break
                case 173:
                    this.battle.combatants[this.target].status.main[37]+=this.damage
                break
                case 174:
                    this.battle.combatants[0].load(4,6)
                break
                case 175:
                    this.battle.combatants[this.target].take(this.damage*this.combo,this.user)
                break
                case 176:
                    this.battle.combatants[0].status.main[6]+=this.damage
                    this.battle.combatants[0].boost.main[0]+=this.alt
                break
                case 177:
                    if(this.battle.combatants[this.target].class!=0){
                        this.battle.combatants[this.target].take(this.damage*2,this.user)
                    }else{
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                break
                case 178:
                    this.battle.combatants[0].take(this.alt,0)
                    this.battle.combatants[0].addBlock(this.damage)
                break
                case 179:
                    this.battle.combatants[0].status.main[41]+=this.damage
                break
                case 180:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].block<=0){
                        this.battle.combatants[this.target].status.main[11]+=this.alt
                    }
                    this.battle.combatants[0].meter-=6
                break
                case 181:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].block<=0){
                        this.battle.combatants[this.target].status.main[11]+=this.alt
                    }
                    this.battle.combatants[0].meter-=7
                break
                case 182:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].life=min(this.battle.combatants[0].life+this.battle.combatants[this.target].status.main[11]*this.battle.random.healEffectiveness,this.battle.combatants[0].base.life)
                    this.battle.combatants[this.target].status.main[11]=0
                break
                case 183:
                    this.battle.combatants[0].status.main[11]+=this.damage
                    this.battle.combatants[0].boost.main[0]+=this.alt
                    this.battle.combatants[0].meter-=3
                break
                case 184:
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        this.battle.combatants[g].status.main[11]*=2
                    }
                    this.battle.combatants[0].meter+=this.damage
                break
                case 185:
                    this.battle.combatants[this.target].status.main[42]+=this.damage
                    this.battle.combatants[0].meter+=this.alt
                break
                case 186:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].boost.main[0]-=this.alt
                break
                case 187:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[43]++
                    this.battle.combatants[0].meter+=this.alt
                break
                case 188:
                    this.battle.random.tempDrawAmount+=this.damage
                    this.battle.random.drawing+=this.damage
                    this.battle.combatants[0].meter+=this.alt
                break
                case 189:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].block<=0){
                        this.battle.combatants[this.target].status.main[11]+=this.alt
                    }
                    this.battle.combatants[0].armed=0
                break
                case 190:
                    if(this.battle.combatants[this.target].status.main[9]>0){
                        this.battle.combatants[this.target].take(this.damage+this.alt,this.user)
                    }else{
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                    this.battle.combatants[0].meter-=2
                break
                case 191:
                    if(this.battle.combatants[this.target].status.main[9]>0){
                        this.battle.combatants[this.target].take(this.damage,this.user)
                        this.battle.combatants[this.target].status.main[9]=0
                    }
                    this.battle.combatants[0].meter+=this.alt
                break
                case 192:
                    this.battle.combatants[this.target].status.main[11]+=this.damage
                    this.battle.combatants[0].armed=0
                break
                case 197:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        this.battle.combatants[g].status.main[9]+=this.damage
                    }
                break
                case 198:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].status.main[9]++
                    this.battle.combatants[0].boost.main[0]-=2
                    this.battle.combatants[0].meter+=this.alt
                break
                case 199:
                    if(this.battle.combatants[0].armed!=1){ 
                        this.battle.combatants[this.target].take(this.damage,this.user)
                        this.battle.combatants[this.target].status.main[9]++
                        this.battle.combatants[this.target].boost.main[1]--
                    }
                    this.battle.combatants[0].meter+=this.alt
                break
                case 200:
                    this.battle.combatants[0].status.main[10]+=this.damage
                    this.battle.combatants[0].status.main[3]+=7+this.level*3
                    this.battle.combatants[0].meter+=this.alt
                break
                case 201:
                    this.battle.combatants[0].status.main[6]+=this.damage
                    this.battle.combatants[0].meter+=this.alt
                break
                case 202:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[45]+=this.alt
                    this.battle.combatants[0].meter+=6
                break
                case 203:
                    this.battle.combatants[0].status.main[10]+=this.damage
                    this.battle.combatants[0].meter+=this.alt
                    this.battle.combatants[0].armed=0
                break
                case 204:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].meter+=this.alt
                    this.battle.reserve.addShuffle(findCard('Winded'),0,0)
                break
                case 205:
                    this.battle.combatants[0].status.main[46]+=this.damage
                    this.battle.combatants[0].meter+=this.alt
                break
                case 206:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[47]++
                    this.battle.combatants[0].meter+=this.alt
                break
                case 207:
                    this.battle.combatants[0].status.main[48]+=this.damage
                    this.battle.combatants[0].meter+=this.alt
                break
                case 208:
                    this.battle.combatants[0].meter*=-1
                break
                case 209:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].meter+=this.alt
                    this.battle.reserve.addShuffle(findCard('Dizzy'),0,0)
                break
                case 210:
                    this.battle.combatants[this.target].take(this.damage*this.battle.hand.cards.length,this.user)
                    this.battle.combatants[0].meter+=this.alt
                    this.battle.allExhaust()
                break
                case 211:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            this.battle.combatants[g].take(this.damage,this.user)
                            this.battle.combatants[0].meter+=this.alt
                        }
                    }
                    this.battle.combatants[0].armed=0
                    this.battle.reserve.addShuffle(findCard('Struggle'),0,0)
                break
                case 212:
                    this.battle.combatants[0].meter*=2
                break
                case 213:
                    this.battle.combatants[0].base.meter+=5
                break
                case 214:
                    this.battle.combatants[0].take(4,-1)
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[47]++
                    this.battle.combatants[0].meter+=this.alt
                break
                case 215:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            this.hold.int=this.battle.combatants[g].life
                            this.battle.combatants[g].take(this.damage,this.user)
                            this.battle.combatants[0].meter+=this.alt
                            this.battle.combatants[0].life=min(this.battle.combatants[0].life+(this.hold.int-this.battle.combatants[g].life)*this.battle.random.healEffectiveness,this.battle.combatants[0].base.life)
                        }
                    }
                break
                case 216:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    if(this.battle.combatants[0].armed==0){
                        this.battle.combatants[0].armed=1
                    }
                break
                case 217:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].armed=0
                    this.battle.combatants[0].status.main[49]++
                break
                case 218:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[50]+=this.damage
                    this.battle.combatants[0].meter+=this.alt
                break
                case 219:
                    this.battle.combatants[0].status.main[51]+=this.damage
                break
                case 220:
                    this.battle.combatants[0].load(5,0)
                break
                case 221:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].load(0,0)
                break
                case 222:
                    for(g=0,lg=this.battle.combatants[0].ammo.length;g<lg;g++){
                        if(this.battle.combatants[0].ammo[g]>=0){
                            this.battle.combatants[this.target].take(this.damage,this.user)
                        }
                    }
                break
                case 223:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[1]+=this.alt
                break
                case 224:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].load(2,0)
                break
                case 225:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    for(g=0,lg=this.battle.combatants[0].ammo.length;g<lg;g++){
                        if(this.battle.combatants[0].ammo[g]>=0){
                            this.battle.draw()
                        }
                    }
                break
                case 226:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    this.battle.combatants[0].load(2,0)
                break
                case 227:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(types.attack[this.battle.combatants[this.target].attacks[this.battle.combatants[this.target].intent]].class==0){
                        this.battle.combatants[this.target].boost.main[0]--
                    }
                break
                case 228:
                    this.battle.combatants[0].addBlock(this.damage)
                    transition.trigger=true
                    transition.scene='deck'
                    this.battle.context=12
                break
                case 229:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].status.main[52]+=this.alt
                break
                case 230:
                    this.battle.combatants[0].addBlock(this.damage+this.battle.discard.cards.length)
                break
                case 233:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            this.battle.combatants[g].take(this.damage,this.user)
                        }
                    }
                    for(g=0;g<this.alt;g++){
                        this.battle.draw()
                    }
                break
                case 234:
                    this.battle.mana.main+=this.damage
                    this.battle.reserve.addShuffle(findCard('Void'),0,0)
                break
                case 235:
                    this.battle.mana.main+=floor(this.battle.reserve.cards.length/this.damage)
                break
                case 236:
                    if(this.battle.combatants[0].block<=0){
                        this.battle.combatants[0].addBlock(this.damage)
                    }
                break
                case 237:
                    this.battle.combatants[0].boost.main[3]+=this.damage
                break
                case 238:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            this.battle.combatants[g].take(this.damage,this.user)
                        }
                    }
                    this.battle.combatants[0].load(4,6)
                break
                case 239:
                    this.battle.mana.main*=2
                break
                case 240:
                    this.battle.combatants[0].addBlock(this.damage)
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        this.battle.hand.cards[g].retain=true
                    }
                break
                case 242:
                    this.battle.combatants[0].status.main[53]+=this.damage
                break
                case 243:
                    this.battle.combatants[0].status.main[54]+=this.damage
                break
                case 244:
                    this.battle.combatants[0].status.main[55]+=this.damage
                break
                case 245:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    this.battle.reserve.addShuffle(findCard('Burn'),0,0)
                break
                case 246:
                    this.battle.combatants[0].boost.main[0]+=this.damage
                    this.battle.combatants[0].boost.main[2]+=this.damage
                    this.battle.combatants[0].boost.main[3]-=this.damage
                break
                case 247:
                    this.hold.list=[]
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            this.hold.list.push(g)
                        }
                    }
                    for(g=0;g<this.alt;g++){
                        this.battle.combatants[this.hold.list[floor(random(0,this.hold.list.length))]].take(this.damage,this.user)
                    }
                break
                case 248:
                    this.battle.combatants[0].status.main[56]+=this.damage
                break
                case 249:
                    this.battle.combatants[0].status.main[57]+=this.damage
                break
                case 250:
                    for(let g=0;g<this.mana;g++){
                        this.battle.combatants[0].load(0,0)
                    }
                break
                case 251:
                    this.hold.list=[]
                    for(g=0,lg=listing.card[this.battle.player].length;g<lg;g++){
                        for(h=0,lh=listing.card[this.battle.player][g].length;h<lh;h++){
                            if(types.card[listing.card[this.battle.player][g][h]].stats[0].class==2){
                                this.hold.list.push(listing.card[this.battle.player][g][h])
                            }
                        }
                    }
                    if(this.hold.list.length>0){
                        g=floor(random(0,this.hold.list.length))
                        this.battle.hand.add(this.hold.list[g],0,this.battle.player)
                        this.battle.hand.cards[this.battle.hand.cards.length-1].cost=0
                    }
                break
                case 252:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            this.battle.combatants[0].load(1,0)
                        }
                    }
                break
                case 253:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].status.main[36]+=this.alt
                break
                case 254:
                    this.battle.combatants[0].status.main[58]+=this.damage
                break
                case 255:
                    for(g=0,lg=this.battle.combatants[0].ammo.length;g<lg;g++){
                        if(this.alt==1){
                            this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[g],this.battle.combatants[0].ammoDetail[g])
                        }
                        if(this.battle.combatants[0].ammo[g]>=0){
                            this.battle.mana.main++
                            this.battle.draw()
                        }
                        this.battle.combatants[0].ammo[g]=-1
                    }
                break
                case 256:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].boost.main[3]-=this.alt
                break
                case 257:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    for(let g=0;g<this.alt;g++){
                        this.battle.combatants[0].load(3,0)
                    }
                break
                case 258:
                    for(g=0;g<this.damage+this.mana;g++){
                        this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[0],this.battle.combatants[0].ammoDetail[0])
                    }
                    this.battle.combatants[0].cycleCharge()
                break
                case 259:
                    this.battle.combatants[0].load(2,0)
                    this.battle.combatants[0].load(4,6)
                    this.battle.combatants[0].load(5,0)
                break
                case 260:
                    this.battle.combatants[0].life=min(this.battle.combatants[0].life+this.battle.combatants[0].combo*this.damage*this.battle.random.healEffectiveness,this.battle.combatants[0].base.life)
                    this.battle.combatants[0].combo=0
                break
                case 261:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].status.main[59]+=this.alt
                break
                case 262:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[59]+=this.alt
                break
                case 263:
                    this.battle.combatants[0].status.main[59]+=this.damage
                    this.battle.combatants[0].take(this.alt,0)
                break
                case 264:
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].spec==4){
                            this.battle.hand.cards[g].cost=max(this.battle.hand.cards[g].cost-this.damage,0)
                            this.battle.hand.cards[g].base.cost=max(this.battle.hand.cards[g].base.cost-this.damage,0)
                        }
                    }
                    for(g=0,lg=this.battle.reserve.cards.length;g<lg;g++){
                        if(this.battle.reserve.cards[g].spec==4){
                            this.battle.reserve.cards[g].cost=max(this.battle.reserve.cards[g].cost-this.damage,0)
                            this.battle.reserve.cards[g].base.cost=max(this.battle.reserve.cards[g].base.cost-this.damage,0)
                        }
                    }
                    for(g=0,lg=this.battle.discard.cards.length;g<lg;g++){
                        if(this.battle.discard.cards[g].spec==4){
                            this.battle.discard.cards[g].cost=max(this.battle.discard.cards[g].cost-this.damage,0)
                            this.battle.discard.cards[g].base.cost=max(this.battle.discard.cards[g].base.cost-this.damage,0)
                        }
                    }
                break
                case 265:
                    this.battle.combatants[0].status.main[60]+=this.damage+this.mana
                break
                case 266:
                    this.battle.combatants[0].boost.main[0]+=this.damage
                    this.battle.combatants[0].boost.main[2]+=this.damage
                    this.battle.mana.max-=this.alt
                    this.battle.mana.gen-=this.alt
                break
                case 267:
                    this.battle.combatants[0].status.main[61]+=this.damage
                break
                case 269:
                    this.battle.combatants[0].addBlock(this.damage)
                    for(g=0;g<this.alt;g++){
                        this.battle.draw()
                        if(this.battle.hand.cards[this.battle.hand.cards.length-1].cost>0){
                            this.battle.hand.cards[this.battle.hand.cards.length-1].cost--
                        }
                    }
                break
                case 270:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[31]+=this.alt
                break
                case 271:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.random.discards>0){
                        this.battle.mana.main+=this.alt
                    }
                break
                case 272:
                    this.battle.combatants[0].combo*=2
                break
                case 273:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target+1].take(this.damage,this.user)
                    this.attacks.push([11,20,this.target,this.alt])
                    this.attacks.push([5,20,this.target+1,this.alt])
                break
                case 274:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].status.main[18]+=this.alt
                break
                case 276:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            this.battle.combatants[g].status.main[62]+=this.damage
                        }
                    }
                break
                case 277:
                    this.battle.combatants[0].status.main[39]+=this.damage
                break
                case 278:
                    this.battle.combatants[0].status.main[47]+=this.damage
                break
                case 279:
                    this.battle.combatants[0].status.main[6]+=this.damage
                    this.battle.combatants[0].status.main[59]+=this.alt
                break
                case 281:
                    this.battle.combatants[0].status.main[63]+=this.damage
                break
                case 282:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            this.battle.combatants[g].take(this.damage,this.user)
                        }
                    }
                    for(let g=0;g<this.alt;g++){
                        this.battle.randomDiscard()
                    }
                break
                case 283:
                    this.battle.combatants[this.target].take(this.damage*max(0,this.battle.random.attacked-1),this.user)
                break
                case 285:
                    this.hold.list=[0,0,0,1,1,2]
                    i=this.hold.list[floor(random(0,this.hold.list.length))]
                    j=floor(random(0,this.battle.potions.list[i].length))
                    this.battle.getPotion(this.battle.potions.list[i][j])
                break
                case 286:
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].class==0){
                            this.battle.combatants[this.target].take(this.damage,this.user)
                        }
                    }
                break
                case 287:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].boost.main[0]<0){
                        this.battle.mana.main+=this.alt
                        this.battle.draw()
                    }
                break
                case 288:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].life<this.damage/2){
                        this.battle.combatants[this.target].life=0
                    }
                    this.battle.combatants[0].meter+=this.alt
                break
                case 289:
                    if(this.battle.combatants[this.target].status.main[9]>0){
                        this.battle.combatants[this.target].take(this.damage+this.alt,this.user)
                    }else{
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                break
                case 290:
                    this.battle.combatants[0].life=min(this.battle.combatants[0].life+this.battle.combatants[0].status.main[11]*this.battle.random.healEffectiveness,this.battle.combatants[0].base.life)
                    this.battle.combatants[0].status.main[11]=0
                break
                case 291:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].base.meter=max(0,this.battle.combatants[0].base.meter-5)
                break
                case 292:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].block<=0){
                        this.battle.combatants[this.target].status.main[11]+=this.alt
                    }
                    this.battle.combatants[0].status.main[11]+=4
                    this.battle.combatants[0].meter-=7
                break
                case 293:
                    this.battle.combatants[this.target].status.main[11]*=this.damage
                    this.battle.combatants[0].meter+=this.alt
                break
                case 294:
                    if(this.battle.combatants[0].meter>0){
                        this.battle.combatants[0].boost.main[0]+=round(this.battle.combatants[0].meter/this.damage)
                    }
                    this.battle.combatants[0].meter=0
                break
                case 295:
                    if(this.battle.combatants[0].meter<0){
                        this.battle.combatants[0].boost.main[1]+=round(-this.battle.combatants[0].meter/this.damage)
                    }
                    this.battle.combatants[0].meter=0
                break
                case 296: case 390:
                    this.battle.combatants[0].meter+=this.damage
                break
                case 297:
                    this.battle.combatants[this.target].take(this.damage*abs(this.battle.combatants[0].meter),this.user)
                break
                case 298:
                    if(this.battle.combatants[0].meter<0){
                        this.battle.hand.add(findCard('Fury'),this.alt,this.battle.player)
                    }
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].meter+=2
                break
                case 299:
                    if(this.battle.combatants[0].meter>0){
                        this.battle.hand.add(findCard('Quiet'),this.alt,this.battle.player)
                    }
                    this.battle.combatants[0].addBlock(this.user)
                    this.battle.combatants[0].meter-=2
                break
                case 300:
                    this.battle.combatants[0].boost.main[0]+=round(this.battle.combatants[0].combo/this.damage)
                    this.battle.combatants[0].combo=0
                break
                case 301:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[6]+=this.alt
                    this.battle.turn=this.target+100
                break
                case 302:
                    this.battle.combatants[0].take(this.damage,this.user)
                    this.battle.combatants[0].boost.main[0]+=this.alt
                break
                case 303:
                    this.battle.randomDiscard()
                    for(g=0;g<this.damage;g++){
                        h=floor(random(0,2))
                        this.battle.hand.add(listing.card[this.battle.player][h][floor(random(0,listing.card[this.battle.player][h].length))],0,this.battle.player)
                    }
                break
                case 304:
                    this.battle.combatants[0].boost.main[0]+=this.damage
                    this.battle.combatants[0].status.main[64]+=this.alt
                break
                case 305:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[65]+=this.alt
                break
                case 306:
                    this.battle.combatants[0].status.main[0]+=this.damage
                    this.battle.combatants[0].status.main[66]++
                break
                case 307:
                    this.hold.list=[]
                    for(g=0,lg=listing.card[this.battle.player].length;g<lg;g++){
                        for(h=0,lh=listing.card[this.battle.player][g].length;h<lh;h++){
                            if(types.card[listing.card[this.battle.player][g][h]].stats[0].class==1){
                                this.hold.list.push(listing.card[this.battle.player][g][h])
                            }
                        }
                    }
                    if(this.hold.list.length>0){
                        g=floor(random(0,this.hold.list.length))
                        this.battle.hand.add(this.hold.list[g],0,this.battle.player)
                        this.battle.hand.cards[this.battle.hand.cards.length-1].cost=0
                        if(this.alt>0){
                            this.battle.hand.cards[this.battle.hand.cards.length-1].base.cost=0
                        }
                    }
                break
                case 308:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([0,this.alt*10-10,this.target,this.damage])
                    this.battle.combatants[0].status.main[6]++
                break
                case 309:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[64]+=this.alt
                break
                case 310:
                    this.battle.mana.max+=this.damage
                    this.battle.mana.gen+=this.damage
                break
                case 311:
                    this.battle.combatants[0].take(this.damage,this.user)
                    this.battle.combatants[0].status.main[59]+=this.alt
                break
                case 312:
                    for(g=0;g<this.damage;g++){
                        this.battle.hand.randomUpgrade()
                    }
                break
                case 313:
                    this.battle.combatants[0].take(this.damage,this.user)
                    this.battle.combatants[0].combo+=this.alt
                break
                case 314:
                    this.battle.combatants[0].addBlock(this.damage*this.battle.hand.cards.length)
                    this.battle.allDiscard()
                break
                case 315:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.allDiscard()
                break
                case 316:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].combo+=this.alt
                break
                case 317:
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].attack==1&&this.battle.hand.cards[g].spec==3){
                            this.battle.hand.cards[g].spec=0
                        }
                    }
                break
                case 318:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    transition.trigger=true
                    transition.scene='deck'
                    this.battle.context=8
                    this.battle.context2=this.alt
                break
                case 319:
                    this.battle.combatants[this.target].take(this.damage+1,this.user)
                    this.battle.combatants[0].addBlock(this.damage)
                    transition.trigger=true
                    transition.scene='deck'
                    this.battle.context=7
                    this.battle.context2=this.alt
                break
                case 320:
                    transition.trigger=true
                    transition.scene='choice'
                    this.battle.setupChoice(0,0,5)
                    this.battle.context=-2-this.damage*3
                break
                case 321:
                    this.battle.combatants[0].status.main[68]+=this.damage
                break
                case 322:
                    this.battle.combatants[0].status.main[69]+=this.damage
                break
                case 323:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.drop.addDrop(findCard('Last\nPath'),0,0)
                    this.battle.reserve.addShuffle(findCard('Last\nPath'),0,0)
                break
                case 324:
                    this.hold.int=0
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].class==0&&!this.battle.hand.cards[g].trigger){
                            this.hold.int=1
                        }
                    }
                    if(this.hold.int==0){
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                break
                case 325:
                    this.battle.combatants[0].status.main[73]++
                    this.battle.combatants[0].status.main[74]+=this.damage
                break
                case 326:
                    this.battle.combatants[0].status.main[75]++
                break
                case 327:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[76]++
                break
                case 328:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].status.main[77]+=this.alt
                break
                case 330:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].life<=0){
                        this.battle.deck.randomUpgrade()
                    }
                break
                case 331:
                    if(this.battle.combatants[this.target].life<this.damage){
                        this.battle.combatants[this.target].life=0
                    }
                break
                case 332:
                    this.battle.combatants[0].status.main[78]++
                break
                case 333:
                    this.battle.combatants[0].status.main[79]++
                break
                case 334:
                    this.battle.combatants[this.target].take(this.damage*this.battle.random.orbs,this.user)
                break
                case 335:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].boost.main[4]+=this.alt
                break
                case 336:
                    this.battle.combatants[this.target].boost.main[4]+=this.damage
                break
                case 337:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            this.battle.combatants[0].load(2,0)
                        }
                    }
                break
                case 338:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.counter.played<this.alt){
                        this.battle.draw()
                    }
                break
                case 339:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    for(g=0,lg=this.battle.discard.cards.length;g<lg;g++){
                        if(this.battle.discard.cards[g].cost==0){
                            this.battle.hand.cards.push(copyCard(this.battle.discard.cards[g]))
                            this.battle.hand.cards[this.battle.hand.cards.length-1].position.x=1206
                            this.battle.hand.cards[this.battle.hand.cards.length-1].position.y=500
                            this.battle.discard.cards.splice(g,1)
                            g--
                            lg--
                        }
                    }
                break
                case 340:
                    this.battle.combatants[0].boost.main[3]+=this.damage
                    this.battle.combatants[0].status.main[80]+=this.alt
                break
                case 341:
                    this.battle.return()
                    this.battle.returnHand()
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                break
                case 342:
                    for(g=0;g<this.damage;g++){
                        this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[0],this.battle.combatants[0].ammoDetail[0])
                    }
                    this.battle.combatants[0].cycleCharge()
                    for(g=0;g<this.alt;g++){
                        this.battle.draw()
                    }
                break
                case 343:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0){
                            this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[0],this.battle.combatants[0].ammoDetail[0])
                        }
                    }
                    this.battle.combatants[0].cycleCharge()
                break
                case 344:
                    for(g=0;g<this.damage;g++){
                        this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[this.battle.combatants[0].ammo.length-1],this.battle.combatants[0].ammoDetail[this.battle.combatants[0].ammoDetail.length-1])
                    }
                    this.battle.combatants[0].cycleLastCharge()
                break
                case 345:
                    this.battle.combatants[0].addBlock(this.damage*this.battle.random.shields)
                break
                case 346:
                    this.battle.combatants[0].addBlock(this.damage)
                    for(g=0;g<this.alt;g++){
                        this.battle.combatants[0].load(2,0)
                    }
                break
                case 347:
                    for(g=0,lg=this.battle.combatants[0].ammo.length;g<lg;g++){
                        if(this.battle.combatants[0].ammo[g]==2){
                            this.battle.combatants[0].boost.main[0]+=this.damage
                        }
                    }
                break
                case 348:
                    for(g=0,lg=this.battle.combatants[0].ammo.length;g<lg;g++){
                        if(this.battle.combatants[0].ammo[g]==1){
                            this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[g],this.battle.combatants[0].ammoDetail[g])
                            this.battle.combatants[0].ammo[g]=0
                        }
                    }
                break
                case 349:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].boost.main[1]<=0){
                        this.battle.combatants[this.target].boost.main[1]*=2
                    }
                break
                case 350:
                    this.battle.combatants[this.target].boost.main[1]-=this.damage
                    this.battle.combatants[this.target].boost.main[4]+=this.alt
                break
                case 351:
                    this.battle.combatants[0].load(6,0)
                break
                case 352:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].load(6,0)
                break
                case 353:
                    for(g=0;g<this.damage;g++){
                        this.battle.combatants[0].load(6,0)
                    }
                break
                case 354:
                    for(g=0,lg=this.battle.combatants[0].ammo.length;g<lg;g++){
                        if(this.battle.combatants[0].ammo[g]==6){
                            this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[g],this.battle.combatants[0].ammoDetail[g])
                            this.battle.combatants[0].ammo[g]=1
                        }
                    }
                break
                case 355:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].life<=0){
                        this.battle.combatants[0].load(6,0)
                    }
                break
                case 356:
                    this.battle.combatants[0].load(7,0)
                break
                case 357:
                    this.battle.combatants[0].load(3,0)
                    this.battle.combatants[0].load(6,6)
                    this.battle.combatants[0].load(7,0)
                break
                case 358:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    for(g=0;g<this.alt;g++){
                        this.battle.combatants[0].load(7,0)
                    }
                break
                case 359:
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].attack==-10&&this.battle.hand.cards[g].list==11){
                            this.battle.combatants[0].load(7,0)
                        }
                    }
                    for(g=0,lg=this.battle.discard.cards.length;g<lg;g++){
                        if(this.battle.discard.cards[g].attack==-10&&this.battle.discard.cards[g].list==11){
                            this.battle.combatants[0].load(7,0)
                        }
                    }
                    for(g=0,lg=this.battle.reserve.cards.length;g<lg;g++){
                        if(this.battle.reserve.cards[g].attack==-10&&this.battle.reserve.cards[g].list==11){
                            this.battle.combatants[0].load(7,0)
                        }
                    }
                break
                case 360:
                    for(g=0;g<this.damage;g++){
                        this.battle.combatants[0].load(floor(random(0,8)),6)
                    }
                break
                case 361:
                    if(this.damage>0){
                        this.mana+=this.damage
                    }
                   this.battle.combatants[0].status.main[1]+=this.mana
                   this.battle.close()
                break
                case 362:
                    this.battle.mana.main+=this.damage
                    this.battle.turn=this.target+100
                break
                case 363:
                    this.hold.int=this.battle.combatants[0].ammo[0]
                    this.hold.int2=this.battle.combatants[0].ammoDetail[0]
                    this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[0],this.battle.combatants[0].ammoDetail[0])
                    this.battle.combatants[0].cycleCharge()
                    for(g=0;g<this.damage;g++){
                        this.battle.combatants[0].load(this.hold.int,this.hold.int2)
                    }
                break
                case 364:
                    if(this.battle.combatants[0].ammo[0]==2){
                        this.battle.combatants[0].cycleCharge()
                        this.battle.combatants[0].status.main[33]+=this.damage
                    }
                break
                case 365:
                    this.battle.combatants[0].load(5,0)
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([0,this.alt*10-10,this.target,this.damage])
                break
                case 366:
                    if(this.battle.combatants[0].ammo[0]==2){
                        this.battle.combatants[0].cycleCharge()
                        this.battle.combatants[0].evoke(-2,0)
                    }
                break
                case 368:
                    for(g=0,lg=this.battle.combatants[0].ammo.length;g<lg;g++){
                        if(this.battle.combatants[0].ammo[g]==3){
                            this.battle.mana.main++
                        }
                    }
                break
                case 369:
                    for(g=0,lg=this.battle.combatants[0].ammo.length;g<lg;g++){
                        if(this.battle.combatants[0].ammo[g]==0){
                            this.battle.combatants[0].ammo[g]=1
                        }
                    }
                break
                case 370:
                    this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[0],this.battle.combatants[0].ammoDetail[0])
                break
                case 371:
                    this.battle.combatants[0].evoke(this.alt,0)
                break
                case 372:
                    for(g=0;g<this.damage;g++){
                        this.battle.combatants[0].load(0,0)
                    }
                    this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[0],this.battle.combatants[0].ammoDetail[0])
                    this.battle.combatants[0].cycleCharge()
                break
                case 373:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.draw()
                    if(this.battle.hand.cards[this.battle.hand.cards.length-1].cost!=0){
                        this.battle.hand.cards[this.battle.hand.cards.length-1].used=true
                    }
                break
                case 374:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].boost.main[2]-=this.alt
                break
                case 375:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[this.target].boost.main[4]+=this.alt
                break
                case 376:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[3]+=this.alt
                    this.battle.combatants[0].load(7,0)
                break
                case 377:
                    this.battle.combatants[this.target].boost.main[0]-=this.damage
                    this.battle.combatants[0].load(7,0)
                break
                case 378:
                    this.battle.combatants[0].status.main[36]+=this.damage
                break
                case 379:
                    this.battle.combatants[0].status.main[81]+=this.damage
                break
                case 380:
                    this.battle.combatants[0].status.main[74]+=this.damage
                break
                case 381:
                    this.battle.combatants[0].status.main[82]+=this.damage
                break
                case 382:
                    if(this.battle.combatants[0].armed!=1){ 
                        this.battle.combatants[0].addBlock(this.damage)
                        this.battle.combatants[0].status.main[28]+=this.alt
                    }
                break
                case 383:
                    this.battle.combatants[this.target].status.main[11]+=this.damage
                    this.battle.combatants[this.target].boost.main[1]-=this.alt
                break
                case 384:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[83]++
                    this.battle.combatants[0].meter+=this.alt
                break
                case 385:
                    this.battle.combatants[0].flower+=this.damage
                break
                case 386:
                    this.battle.combatants[0].status.main[84]++
                break
                case 387:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].flower+=this.alt
                break
                case 388:
                    this.battle.combatants[0].status.main[85]++
                break
                case 389:
                    this.battle.drop.addDrop(findCard('Banked\nBalance'),0,0)
                    this.battle.drop.cards[this.battle.drop.cards.length-1].damage=this.battle.combatants[0].meter
                    this.battle.hand.add(findCard('Banked\nBalance'),0,0)
                    this.battle.hand.cards[this.battle.hand.cards.length-1].damage=this.battle.combatants[0].meter
                    this.battle.combatants[0].meter=0
                break
                case 391:
                    this.battle.combatants[0].boost.main[0]+=this.damage
                    this.battle.combatants[0].status.main[86]+=this.alt
                break
                case 392:
                    this.battle.combatants[0].life-=this.damage
                    this.battle.combatants[0].boost.main[0]+=this.alt
                break
                case 393:
                    this.battle.combatants[0].life-=this.damage
                    this.battle.combatants[0].boost.main[2]+=this.alt
                break
                case 394:
                    this.battle.combatants[0].life-=this.damage
                    this.battle.mana.main+=this.alt
                break
                case 395:
                    this.battle.combatants[0].status.main[12]++
                break
                case 396:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].life=min(this.battle.combatants[0].life+this.alt*this.battle.random.healEffectiveness,this.battle.combatants[0].base.life)
                break
                case 397:
                    this.hold.list=[]
                    for(let g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].cost!=0){
                            this.hold.list.push(g)
                        }
                    }
                    if(this.hold.list.length>0){
                        g=this.hold.list[floor(random(0,this.hold.list.length))]
                        this.battle.hand.cards[g].cost=0
                        this.battle.hand.cards[g].base.cost=0
                    }
                break
                default:
            }
            this.battle.combatants[0].lastPlay=this.class
        }else{
            switch(type){
                case 1:
                    this.battle.combatants[0].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                break
                case 2:
                    this.battle.drop.addDrop(findCard('Confusion'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Confusion'),0,stage.playerNumber+1)
                break
                case 3:
                    this.battle.combatants[0].take(this.damage,this.user)
                    this.attacks.push([7,7+this.alt*5,this.user,this.damage,this.alt])
                break
                case 4:
                    this.battle.drop.addDrop(findCard('Dazed'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Dazed'),0,stage.playerNumber+1)
                    this.attacks.push([8,20,0,'Dazed'])
                break
                case 5:
                    this.battle.drop.addDrop(findCard('Burn'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Burn'),0,stage.playerNumber+1)
                break
                case 6:
                    this.battle.combatants[0].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                    this.battle.drop.addDrop(findCard('Stuck'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Stuck'),0,stage.playerNumber+1)
                break
                case 7:
                    this.battle.combatants[0].boost.main[0]-=this.damage
                break
                case 8:
                    this.battle.combatants[this.user].block+=this.damage
                break
                case 9:
                    this.battle.combatants[0].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                    if(this.battle.combatants[0].block<=0){
                        this.battle.combatants[0].status.main[11]+=this.alt
                    }
                break
                case 10:
                    this.battle.combatants[0].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                    if(this.battle.combatants[0].block<=0){
                        this.battle.drop.addDrop(findCard(this.alt),0,stage.playerNumber+1)
                        this.battle.reserve.addShuffle(findCard(this.alt),0,stage.playerNumber+1)
                    }
                break
                case 11:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        this.battle.combatants[g].status.main[4]+=this.damage
                    }
                break
                case 12:
                    this.battle.combatants[0].status.main[71]+=this.damage
                    this.battle.combatants[0].status.main[72]++
                    this.battle.mana.gen--
                break
                case 13:
                    this.battle.drop.addDrop(findCard('Parasite'),0,stage.playerNumber+2)
                    this.battle.deck.add(findCard('Parasite'),0,stage.playerNumber+2)
                break
                case 14:
                    this.battle.combatants[0].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                    this.battle.combatants[this.user].block+=this.alt
                break
                case 15:
                    this.battle.combatants[0].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                    this.battle.combatants[0].boost.main[2]-=this.alt
                break
                case 16:
                    this.battle.combatants[this.user].block+=this.damage
                    this.battle.combatants[this.user].status.main[47]+=this.alt+1
                break
                case 17:
                    this.battle.combatants[0].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                    this.battle.combatants[0].boost.main[0]-=this.alt
                break
                case 18:
                    for(g=1,lg=this.battle.combatants.length;g<lg;g++){
                        this.battle.combatants[g].life=min(this.battle.combatants[g].life+this.damage,this.battle.combatants[g].base.life)
                    }
                break
                case 19:
                    this.battle.combatants[this.user].status.main[4]+=this.damage
                break
                case 20:
                    this.battle.combatants[0].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                    this.battle.drop.addDrop(findCard('Burn'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Burn'),0,stage.playerNumber+1)
                break
                default:
            }
        }
    }
    run(){
        for(let g=0,lg=this.attacks.length;g<lg;g++){
            this.attacks[g][1]--
            switch(this.attacks[g][0]){
                case 0: case 6:
                    if(this.attacks[g][1]%10==0){
                        this.battle.combatants[this.attacks[g][2]].take(this.attacks[g][3],0)
                    }
                    if(this.attacks[g][1]==0&&this.attacks[g][0]==6){
                        this.attacks.push([5,20,this.attacks[g][2],this.attacks[g][3]*0.4])
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
                case 3: case 11:
                    if(this.attacks[g][1]<10){
                        this.battle.combatants[this.attacks[g][2]].position.x+=8
                    }else{
                        this.battle.combatants[this.attacks[g][2]].position.x-=8
                    }
                    if(this.attacks[g][1]==10&&this.attacks[g][2]>1){
                        this.battle.combatants[this.attacks[g][2]-1].take(this.attacks[g][3]+this.battle.combatants[0].status.main[26],0)
                        if(this.battle.combatants[this.attacks[g][2]-1].life>0&&this.attacks[g][0]==11){
                            this.battle.combatants[this.attacks[g][2]].take(this.attacks[g][3]+this.battle.combatants[0].status.main[26],this.attacks[g][2],0)
                        }
                    }
                break
                case 4: case 5: case 9:
                    if(this.attacks[g][1]<10){
                        this.battle.combatants[this.attacks[g][2]].position.x-=8
                    }else{
                        this.battle.combatants[this.attacks[g][2]].position.x+=8
                    }
                    if(this.attacks[g][1]==10&&this.attacks[g][2]<this.battle.combatants.length-1&&this.battle.combatants[this.attacks[g][2]].life>0){
                        if(this.battle.combatants[this.attacks[g][2]+1].life>0&&(this.attacks[g][0]==5||this.attacks[g][0]==9)){
                            this.battle.combatants[this.attacks[g][2]].take(this.attacks[g][3]+this.battle.combatants[0].status.main[26],this.attacks[g][2]+1,0)
                            if(this.attacks[g][0]==9){
                                this.attacks.push([5,20,this.attacks[g][2]+1,this.attacks[g][3]])
                            }
                        }
                        this.battle.combatants[this.attacks[g][2]+1].take(this.attacks[g][3]+this.battle.combatants[0].status.main[26],this.attacks[g][2],0)
                    }
                break
                case 7:
                    if(this.attacks[g][1]>=1+this.attacks[g][4]*5){
                        this.battle.combatants[this.attacks[g][2]].position.x-=10
                    }else if(this.attacks[g][1]<6){
                        this.battle.combatants[this.attacks[g][2]].position.x+=10
                    }else if(this.attacks[g][1]%5==0){
                        this.battle.combatants[0].take(this.attacks[g][3],this.attacks[g][2],0)
                    }
                break
                case 8:
                    if(this.attacks[g][1]==10){
                        this.battle.drop.addDrop(findCard(this.attacks[g][3]),0,5)
                        this.battle.reserve.addShuffle(findCard(this.attacks[g][3]),0,5)
                    }
                break
                case 10:
                    if(this.attacks[g][1]<10){
                        this.battle.combatants[this.attacks[g][2]].position.x+=8
                    }else{
                        this.battle.combatants[this.attacks[g][2]].position.x-=8
                    }
                    if(this.attacks[g][1]==10&&this.attacks[g][2]>0&&this.battle.combatants[this.attacks[g][2]].life>0){
                        if(this.battle.combatants[this.attacks[g][2]-1].life>0&&(this.attacks[g][0]==10)){
                            this.battle.combatants[this.attacks[g][2]].take(this.attacks[g][3]+this.battle.combatants[0].status.main[26],this.attacks[g][2]-1,0)
                        }
                        this.battle.combatants[this.attacks[g][2]-1].take(this.attacks[g][3]+this.battle.combatants[0].status.main[26],this.attacks[g][2],0)
                    }
                break
                default:
            }
            if(this.attacks[g][1]<=0){
                this.attacks.splice(g,1)
                g--
                lg--
            }
        }
    }
}