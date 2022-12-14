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
                case -22:
                    this.battle.currency.money-=10
                break
                case -25:
                    this.battle.combatants[0].take(this.damage,0)
                break
                case 1: case 52: case 99: case 114: case 139: case 232: case 284: case 329: case 560: case 565: case 573: case 579: case 597: case 599: case 633: case 642: case 723:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                break
                case 2: case 231: case 241: case 268: case 598: case 600: case 657:
                    this.battle.combatants[0].addBlock(this.damage)
                break
                case 3: case 51: case 135: case 582:
                    if(this.alt>0){
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                    this.attacks.push([0,this.alt*10-10,this.target,this.damage])
                break
                case 4: case 627: case 641:
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
                    this.battle.takeAll(this.damage,this.user,1)
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
                    this.battle.discarding=this.alt
                break
                case 19:
                    if(this.battle.combatants[0].ammo.length>1){
                        this.battle.combatants[0].evoke(this.battle.combatants[0].ammo[this.battle.combatants[0].ammo.length-1].type,this.battle.combatants[0].ammoDetail[this.battle.combatants[0].ammoDetail.length-1].type)
                        this.battle.combatants[0].ammo.splice(this.battle.combatants[0].ammo.length-1,1)
                        this.battle.combatants[0].ammoDetail.splice(this.battle.combatants[0].ammoDetail.length-1,1)
                    }
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
                        if(this.battle.hand.cards[g].attack==22||this.battle.hand.cards[g].attack==683){
                            this.battle.hand.cards[g].damage+=2
                        }
                    }
                    for(g=0,lg=this.battle.reserve.cards.length;g<lg;g++){
                        if(this.battle.reserve.cards[g].attack==22||this.battle.reserve.cards[g].attack==683){
                            this.battle.reserve.cards[g].damage+=2
                        }
                    }
                    for(g=0,lg=this.battle.discard.cards.length;g<lg;g++){
                        if(this.battle.discard.cards[g].attack==22||this.battle.discard.cards[g].attack==683){
                            this.battle.discard.cards[g].damage+=2
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
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
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
                        this.battle.combatants[this.target-1].take(this.damage+this.alt*this.combo,this.user)
                    }
                    if(this.target<this.battle.combatants.length-1){
                        this.battle.combatants[this.target+1].take(this.damage+this.alt*this.combo,this.user)
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
                    this.battle.random.exhausting+=3
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
                        for(h=0,lh=listing.card[this.battle.player][g].length;h<lh;h++){
                            if(types.card[listing.card[this.battle.player][g][h]].rarity>=0&&(types.card[listing.card[this.battle.player][g][h]].stats[0].class==0&&this.type==59||types.card[listing.card[this.battle.player][g][h]].stats[0].class==1&&this.type==61)){
                                this.hold.list.push(listing.card[this.battle.player][g][h])
                            }
                        }
                    }
                    for(g=0;g<this.damage;g++){
                        h=this.hold.list[floor(random(0,this.hold.list.length))]
                        this.battle.reserve.addShuffleCost(h,0,types.card[h].list,0)
                    }
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
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].team==1){
                            this.battle.combatants[g].boost.main[0]-=this.damage
                            this.battle.combatants[g].boost.main[1]-=this.damage
                        }
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
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                break
                case 70:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    this.battle.combatants[0].meter+=this.alt
                break
                case 71:
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
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
                    this.battle.takeAll(this.damage,this.user,1)
                    this.battle.combatants[0].armed=0
                break
                case 84:
                    this.battle.combatants[0].boost.main[2]+=this.alt
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                break
                case 85:
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].block<=0&&this.battle.combatants[g].team==1){
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
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.target>1){
                        this.battle.combatants[this.target-1].take(this.damage,this.user)
                    }
                    if(this.target<this.battle.combatants.length-1){
                        this.battle.combatants[this.target+1].take(this.damage,this.user)
                    }
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
                    this.battle.takeAll(this.damage,this.user,1)
                    this.battle.close()
                break
                case 106:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.hand.add(findCard('Safety'),0,0)
                break
                case 107:
                    if(this.battle.combatants[0].stance==2){
                        for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                            if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
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
                    if(this.battle.combatants[this.target].blocked>0&&this.battle.combatants[this.target].calc.damage>0){
                        this.battle.combatants[0].addBlock(this.battle.combatants[this.target].calc.damage)
                    }
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
                    this.battle.combatants[0].addBlock(this.damage*this.battle.deck.cards.length)
                break
                case 125:
                    this.battle.combatants[0].addBlock(this.damage)
                    for(let g=0;g<this.alt;g++){
                        this.battle.hand.add(findCard('Shiv'),0,0)
                    }
                break
                case 126:
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
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
                    if(this.mana>0){
                        this.battle.combatants[this.target].take(this.damage,this.user)
                        this.attacks.push([0,this.alt*this.mana*10-10,this.target,this.damage])
                    }
                break
                case 131:
                    this.battle.combatants[0].status.main[22]+=this.damage
                break
                case 132:
                    this.hold.int=this.battle.hand.cards.length
                    this.battle.allDiscard()
                    for(g=0;g<this.hold.int;g++){
                        this.battle.hand.add(findCard('Shiv'),this.damage,0)
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
                    this.battle.hand.add(findCard('Smite'),0,0)
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
                case 171: case 706:
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
                    this.battle.combatants[0].take(this.alt,-1)
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
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].team==1){
                            this.battle.combatants[g].status.main[9]+=this.damage
                        }
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
                    this.battle.drop.addDrop(findCard('Winded'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Winded'),0,stage.playerNumber+1)
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
                    this.battle.drop.addDrop(findCard('Dizzy'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Dizzy'),0,stage.playerNumber+1)
                break
                case 210:
                    this.battle.combatants[this.target].take(this.damage*this.battle.hand.cards.length,this.user)
                    this.battle.combatants[0].meter+=this.alt
                    this.battle.allExhaust(-1)
                break
                case 211:
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
                            this.battle.combatants[g].take(this.damage,this.user)
                            this.battle.combatants[0].meter+=this.alt
                        }
                    }
                    this.battle.combatants[0].armed=0
                    this.battle.drop.addDrop(findCard('Struggle'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Struggle'),0,stage.playerNumber+1)
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
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
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
                    this.battle.takeAll(this.damage,this.user,1)
                    for(g=0;g<this.alt;g++){
                        this.battle.draw()
                    }
                break
                case 234:
                    this.battle.mana.main+=this.damage
                    this.battle.reserve.addShuffle(findCard('Void'),0,stage.playerNumber+1)
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
                    this.battle.takeAll(this.damage,this.user,1)
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
                    this.battle.drop.addDrop(findCard('Burn'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Burn'),0,stage.playerNumber+1)
                break
                case 246:
                    this.battle.combatants[0].boost.main[0]+=this.damage
                    this.battle.combatants[0].boost.main[2]+=this.damage
                    this.battle.combatants[0].boost.main[3]-=this.damage
                break
                case 247:
                    this.hold.list=[]
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
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
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
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
                    this.battle.combatants[0].take(this.alt,-1)
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
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
                            this.battle.combatants[g].status.main[62]+=this.damage
                        }
                    }
                break
                case 277:
                    this.battle.combatants[0].status.main[39]+=this.damage
                break
                case 278: case 604:
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
                    this.battle.takeAll(this.damage,this.user,1)
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
                    this.battle.combatants[0].base.meter=max(0,this.battle.combatants[0].base.meter+5)
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
                    this.battle.combatants[0].take(this.damage,-1)
                    this.battle.combatants[0].boost.main[0]+=this.alt
                break
                case 303:
                    this.battle.discarding+=this.damage
                    for(g=0;g<this.alt;g++){
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
                    this.battle.combatants[0].take(this.damage,-1)
                    this.battle.combatants[0].status.main[59]+=this.alt
                break
                case 312:
                    for(g=0;g<this.damage;g++){
                        this.battle.hand.randomUpgrade()
                    }
                break
                case 313:
                    this.battle.combatants[0].take(this.damage,-1)
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
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
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
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
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
                    if(this.battle.combatants[0].ammo[0]==1){
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
                    this.battle.combatants[0].load(6,0)
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
                        if(this.battle.hand.cards[g].base.cost!=0){
                            this.hold.list.push(g)
                        }
                    }
                    if(this.hold.list.length>0){
                        g=this.hold.list[floor(random(0,this.hold.list.length))]
                        this.battle.hand.cards[g].cost=0
                        this.battle.hand.cards[g].base.cost=0
                    }
                break
                case 398:
                    for(g=0;g<this.damage;g++){
                        this.battle.combatants[0].load(6,0)
                    }
                    this.battle.combatants[0].boost.main[1]--
                    this.battle.combatants[0].boost.main[2]--
                break
                case 399:
                    this.battle.combatants[0].status.main[35]+=this.damage
                break
                case 400:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].boost.main[2]-=this.alt
                    this.battle.combatants[0].combo--
                break
                case 401:
                    this.battle.buildAlly('Wall')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 402: case 507:
                    if(this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 403:
                    if(this.battle.combatants[1].type>0&&this.battle.combatants[1].built==1){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 404:
                    if(this.battle.combatants[1].type>0&&this.battle.combatants[1].built==1){
                        this.battle.combatants[1].addBlock(this.damage)
                    }
                break
                case 405:
                    this.battle.buildAlly('Spikes')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 406:
                    this.battle.combatants[this.target].take(this.damage,-1)
                break
                case 407:
                    this.battle.combatants[this.target].take(this.damage,-1)
                    if(this.target>1){
                        this.battle.combatants[this.target-1].take(this.damage,-1)
                    }
                    if(this.target<this.battle.combatants.length-1){
                        this.battle.combatants[this.target+1].take(this.damage,-1)
                    }
                break
                case 408:
                    if(this.battle.combatants[this.target].boost.main[0]>0){
                        this.battle.combatants[this.target].boost.main[0]=0
                    }
                break
                case 409:
                    this.battle.combatants[this.target].take(this.damage,-1)
                    if(this.battle.combatants[this.target].life<=0){
                        this.battle.mana.main++
                    }
                    if(this.target>1&&this.battle.combatants[this.target-1].life>0){
                        this.battle.combatants[this.target-1].take(this.damage,-1)
                        if(this.battle.combatants[this.target-1].life<=0){
                            this.battle.mana.main++
                        }
                    }
                    if(this.target<this.battle.combatants.length-1&&this.battle.combatants[this.target+1].life>0){
                        this.battle.combatants[this.target+1].take(this.damage,-1)
                        if(this.battle.combatants[this.target+1].life<=0){
                            this.battle.mana.main++
                        }
                    }
                break
                case 410:
                    this.battle.buildAlly('Projector')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 411:
                    this.battle.buildAlly('Turret')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 412:
                    this.battle.allExhaust(3)
                break
                case 413:
                    this.battle.combatants[1].base.life+=this.damage
                break
                case 414:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.discarding=this.alt
                break
                case 415:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].status.main[11]+=this.alt
                break
                case 416:
                    this.battle.combatants[this.target].status.main[11]+=this.damage
                break
                case 417:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].block<=0){
                        this.battle.combatants[this.target].status.main[11]++
                    }
                    this.attacks.push([0,this.alt*10-10,this.target,this.damage])
                    this.attacks.push([12,this.alt*10-10,this.target,1])
                break
                case 418:
                    if(this.battle.combatants[1].built==1){
                        this.battle.takeAll(this.battle.combatants[1].life/2,this.user,1)
                        this.battle.combatants[1].life=0
                    }
                break
                case 419:
                    this.battle.combatants[1].status.main[91]++
                break
                case 420:
                    this.battle.buildAlly('Readout')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 421:
                    this.battle.buildAlly('Generator')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 422:
                    this.battle.buildAlly('Strengthener')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 423:
                    this.battle.buildAlly('Explosive Turret')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 424:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target+1].take(this.damage,this.user)
                break
                case 425:
                    this.battle.combatants[0].status.main[87]+=this.damage
                break
                case 426:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[92]++
                    for(g=0,lg=this.battle.combatants[0].remember.boost.length;g<lg;g++){
                        this.battle.combatants[0].remember.boost[g]=this.battle.combatants[0].boost.main[g]
                    }
                break
                case 427:
                    this.battle.combatants[0].status.main[59]+=this.alt
                break
                case 428:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    this.battle.discarding+=this.alt
                break
                case 429:
                    this.battle.combatants[0].life=min(this.battle.combatants[0].life+this.damage*this.mana*this.battle.random.healEffectiveness,this.battle.combatants[0].base.life)
                break
                case 430:
                    this.battle.combatants[0].combo+=this.damage
                    this.battle.combatants[0].status.main[1]+=this.alt
                break
                case 431:
                    this.battle.combatants[0].combo+=this.damage
                    this.battle.combatants[0].status.main[93]+=this.alt
                break
                case 432:
                    this.battle.random.doubling+=this.damage
                break
                case 433:
                    this.battle.combatants[this.target].take(this.damage+this.alt*this.combo,this.user)
                    this.battle.draw()
                break
                case 434:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[94]+=this.alt
                break
                case 435:
                    this.hold.list=[]
                    for(g=0,lg=listing.card[this.battle.player].length;g<lg;g++){
                        for(h=0,lh=listing.card[this.battle.player][g].length;h<lh;h++){
                            if(types.card[listing.card[this.battle.player][g][h]].stats[0].class==0){
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
                case 436:
                    this.battle.combatants[0].status.main[1]+=this.damage
                break
                case 437:
                    this.battle.combatants[0].status.main[95]+=this.damage
                break
                case 438:
                    this.battle.combatants[0].status.main[96]+=this.damage
                break
                case 439:
                    this.battle.combatants[0].status.main[97]+=this.damage
                break
                case 440:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].life<=0){
                        this.battle.combatants[0].combo+=this.alt
                    }
                break
                case 441:
                    this.battle.combatants[0].addBlock(this.damage*this.mana)
                    this.battle.combatants[0].status.main[3]+=this.alt*this.mana
                break
                case 442:
                    this.battle.buildAlly('Dexterizer')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 443:
                    this.battle.buildAlly('Thorns')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 444:
                    this.battle.buildAlly('Bufferer')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 445:
                    this.battle.buildAlly('Gun Rack')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 446:
                    if(this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0&&this.battle.combatants[1].life==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 447:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[32]+=this.alt
                break
                case 448:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.random.upgrading+=this.alt
                break
                case 449:
                    this.battle.random.upgrading+=this.damage
                break
                case 450:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.random.upgrading+=this.alt
                break
                case 451:
                    this.battle.combatants[0].status.main[101]+=this.damage
                break
                case 452:
                    if(this.battle.combatants[1].type>0&&this.battle.combatants[1].built==1){
                        this.battle.combatants[1].status.main[38]+=this.damage
                    }
                break
                case 453:
                    this.hold.list=[]
                    for(g=0,lg=listing.card[this.battle.player].length;g<lg;g++){
                        for(h=0,lh=listing.card[this.battle.player][g].length;h<lh;h++){
                            if(types.card[listing.card[this.battle.player][g][h]].stats[0].class==3){
                                this.hold.list.push(listing.card[this.battle.player][g][h])
                            }
                        }
                    }
                    for(h=0;h<this.damage;h++){
                        if(this.hold.list.length>0){
                            g=floor(random(0,this.hold.list.length))
                            this.battle.hand.add(this.hold.list[g],0,this.battle.player)
                        }
                    }
                break
                case 454:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].block>0){
                        this.battle.combatants[this.target].boost.main[1]-=this.alt
                    }
                break
                case 455:
                    this.hold.list=[]
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
                            this.hold.list.push(g)
                        }
                    }
                    for(g=0;g<this.alt;g++){
                        this.battle.combatants[this.hold.list[floor(random(0,this.hold.list.length))]].take(this.damage,-1)
                    }
                break
                case 456:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                        if(this.battle.hand.cards[this.battle.hand.cards.length-1].level==0){
                            this.battle.hand.cards[this.battle.hand.cards.length-1].level++
                            this.battle.hand.cards[this.battle.hand.cards.length-1]=reformCard(this.battle.hand.cards[this.battle.hand.cards.length-1])
                        }
                    }
                break
                case 457:
                    if(this.battle.combatants[this.target].life>=this.battle.combatants[this.target].base.life){
                        this.battle.mana.main+=this.alt
                    }
                    this.battle.combatants[this.target].take(this.damage,this.user)
                break
                case 458:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].life<=0){
                        this.battle.mana.main-=this.alt
                    }
                break
                case 459:
                    this.battle.combatants[0].life=min(this.battle.combatants[0].life+this.damage*this.battle.random.healEffectiveness,this.battle.combatants[0].base.life)
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(floor(random(0,2))==0){
                            this.battle.hand.cards[g].cost++
                            this.battle.hand.cards[g].base.cost++
                        }else if(this.battle.hand.cards[g].cost>0){
                            this.battle.hand.cards[g].cost--
                            this.battle.hand.cards[g].base.cost--
                        }
                    }
                break
                case 460:
                    this.battle.combatants[this.target].take(this.damage,-1)
                    this.battle.combatants[this.target].boost.main[0]-=this.alt
                    this.battle.combatants[this.target].status.main[8]+=this.alt-1
                break
                case 461:
                    if(this.battle.combatants[1].type>0&&this.battle.combatants[1].built==1){
                        this.battle.combatants[1].status.main[40]+=this.damage
                    }
                break
                case 462:
                    this.hold.list=copyList(listing.card[15][0])
                    for(g=0;g<this.damage;g++){
                        if(this.hold.list.length>0){
                            h=floor(random(0,this.hold.list.length))
                            this.battle.hand.add(this.hold.list[h],0,types.card[this.hold.list[h]].list)
                            this.hold.list.splice(h,1)
                        }
                    }
                break
                case 463:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([0,this.alt*10-10,this.target,this.damage])
                    this.battle.draw()
                break
                case 464:
                    this.battle.takeAll(this.damage,this.user,1)
                    this.battle.draw()
                break
                case 465:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([0,this.alt*10-10,this.target,this.damage])
                    if(this.battle.combatants[this.target].block<=0){
                        this.battle.combatants[this.target].boost.main[2]-=4
                    }
                break
                case 466:
                    this.battle.takeAll(this.damage,-1,1)
                break
                case 467:
                    this.battle.combatants[0].status.main[6]+=this.damage
                    this.battle.combatants[0].status.main[31]+=this.alt
                break
                case 468:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[102]+=this.alt
                break
                case 469:
                    this.battle.hand.allUpgrade()
                    this.battle.allDiscard()
                break
                case 470:
                    this.battle.combatants[0].status.main[103]+=this.damage
                break
                case 471:
                    this.battle.currency.money+=this.damage
                break
                case 472:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.currency.money-=this.alt
                break
                case 473:
                    if(this.battle.combatants[this.target].block>0){
                        this.battle.combatants[this.target].take(this.damage*this.alt,this.user)
                    }else{
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                break
                case 474:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.random.exhausting=this.alt
                break
                case 475:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.random.transforming=this.alt
                break
                case 476:
                    this.battle.buildAlly('Trap')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 477:
                    this.battle.buildAlly('Multiturret')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 478:
                    this.battle.buildAlly('Metallicizer')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 479:
                    this.battle.buildAlly('Mirror Shield')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 480:
                    this.battle.buildAlly('Limiter')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 481:
                    this.battle.buildAlly('Repulsor')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 482:
                    this.battle.buildAlly('Machine Gun')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 483:
                    this.battle.buildAlly('Maintainer')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 484:
                    this.battle.buildAlly('Upgrader')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 485:
                    this.battle.buildAlly('Transformer')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 486:
                    this.battle.buildAlly('Doubler')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 487:
                    this.battle.buildAlly('Exhauster')
                    if(this.damage>0&&this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                break
                case 488:
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        this.battle.hand.cards[g].cost=1
                        this.battle.hand.cards[g].base.cost=1
                    }
                break
                case 489:
                    for(g=0,lg=this.damage+this.battle.hand.cards.length;g<lg;g++){
                        this.battle.draw()
                    }
                break
                case 490:
                    if(this.battle.combatants[1].life<this.battle.combatants[1].base.life&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=this.battle.combatants[1].base.life
                    }
                break
                case 491:
                    if(this.battle.combatants[1].life<this.battle.combatants[1].base.life&&this.battle.combatants[1].built==1){
                        this.battle.combatants[1].life=this.battle.combatants[1].base.life
                    }
                break
                case 492:
                    if(this.battle.combatants[1].life>0&&this.battle.combatants[1].built==1){
                        this.battle.combatants[1].status.main[40]+=this.damage
                    }
                break
                case 493:
                    this.battle.constructEffect()
                break
                case 494:
                    if(this.battle.combatants[1].life>0){
                        this.battle.combatants[1].built=1
                    }
                break
                case 495:
                    if(this.battle.combatants[1].life>0&&this.battle.combatants[1].built==1){
                        this.battle.combatants[1].status.main[12]+=this.damage
                    }
                break
                case 496:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.random.exhausting=this.alt
                break
                case 497:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    this.battle.random.exhausting=this.alt
                break
                case 498:
                    this.battle.random.transforming=this.damage
                break
                case 499:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.random.transforming=this.alt
                break
                case 500:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.random.doubling++
                break
                case 501:
                    this.battle.random.upgrading=this.mana
                    this.battle.combatants[0].status.main[74]+=this.mana
                break
                case 502:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].blocked>0&&this.battle.combatants[this.target].calc.damage>0){
                        this.battle.combatants[0].addBlock(this.battle.combatants[this.target].calc.damage)
                    }
                    this.attacks.push([13,this.alt*10-10,this.target,this.damage])
                break
                case 504:
                    this.battle.combatants[this.target].status.main[7]+=this.damage
                break
                case 505:
                    this.battle.combatants[this.target].take(this.damage*this.mana,this.user)
                    this.battle.combatants[this.target].boost.main[0]-=this.alt*this.mana
                    this.battle.combatants[this.target].boost.main[1]-=this.alt*this.mana
                break
                case 506:
                    this.battle.combatants[0].status.main[38]+=this.damage
                break
                case 508:
                    if(this.battle.combatants[1].life>0&&this.battle.combatants[1].built==1){
                        this.battle.combatants[0].status.main[6]+=this.damage
                    }
                break
                case 509:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    for(let g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1&&types.attack[this.battle.combatants[g].attacks[this.battle.combatants[g].intent]].class==0){
                            this.battle.combatants[g].setupIntent(-1)
                        }
                    }
                break
                case 510:
                    this.battle.combatants[0].addBlock(this.damage)
                    for(let g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1&&types.attack[this.battle.combatants[g].attacks[this.battle.combatants[g].intent]].class==1){
                            this.battle.combatants[g].setupIntent(-1)
                        }
                    }
                break
                case 511:
                    if(this.battle.combatants[1].life>0&&this.battle.combatants[1].built==1){
                        this.battle.combatants[1].status.main[10]+=this.damage
                    }
                break
                case 512:
                    if(this.battle.combatants[1].life>0&&this.battle.combatants[1].built==1){
                        this.battle.combatants[1].status.main[3]+=this.damage
                    }
                break
                case 513:
                    if(this.battle.combatants[1].life>0&&this.battle.combatants[1].built==1){
                        this.battle.combatants[1].status.main[0]+=this.damage
                    }
                break
                case 514:
                    this.battle.combatants[this.target].status.main[104]+=this.damage
                break
                case 515:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].status.main[104]+=this.alt
                break
                case 516:
                    for(let g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
                            this.battle.combatants[g].status.main[104]+=this.damage
                        }
                    }
                break
                case 517:
                    this.battle.combatants[this.target].status.main[104]*=this.damage
                break
                case 518:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[105]+=this.alt
                break
                case 519:
                    this.battle.combatants[1].base.life+=this.damage
                    for(g=0;g<this.alt;g++){
                        this.battle.draw()
                    }
                break
                case 520:
                    if(this.battle.combatants[1].type>0&&this.battle.combatants[1].built==1){
                        this.battle.combatants[1].addBlock(this.damage)
                    }
                    this.battle.combatants[1].status.main[47]+=this.alt
                break
                case 521:
                    if(this.battle.combatants[1].type>0&&this.battle.combatants[1].built==1){
                        this.battle.combatants[1].addBlock(this.damage)
                    }
                    this.battle.combatants[1].base.life+=this.alt
                break
                case 522:
                    for(g=0;g<this.mana;g++){
                        this.battle.constructEffect()
                    }
                break
                case 523:
                    this.battle.allTransform()
                break
                case 524:
                    if(this.battle.combatants[1].life>0&&this.battle.combatants[1].built==1){
                        this.battle.combatants[1].status.main[33]+=this.damage
                    }
                break
                case 525:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].life<0){
                        for(let g=0,lg=this.battle.combatants.length;g<lg;g++){
                            if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
                                this.battle.combatants[g].status.main[104]+=this.damage
                            }
                        }
                    }
                break
                case 526:
                    for(g=0;g<this.damage;g++){
                        this.battle.hand.add(findCard('Scrap\nMetal'),0,0)
                    }
                break
                case 527:
                    if(this.battle.combatants[1].type>0&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=min(this.battle.combatants[1].life+this.damage,this.battle.combatants[1].base.life)
                    }
                    this.battle.combatants[0].block+=this.alt
                break
                case 528:
                    this.battle.combatants[this.target].status.main[106]+=this.damage
                break
                case 529:
                    this.battle.random.upgrading=this.damage
                    this.battle.combatants[0].status.main[33]+=this.alt
                break
                case 530:
                    this.hold.list=[]
                    for(g=0,lg=listing.card[15][0].length;g<lg;g++){
                        if(types.card[listing.card[15][0][g]].rarity>=0&&types.card[listing.card[15][0][g]].stats[0].class==2){
                            this.hold.list.push(listing.card[15][0][g])
                        }
                    }
                    for(g=0;g<this.damage;g++){
                        h=floor(random(0,this.hold.list.length))
                        this.battle.hand.add(this.hold.list[h],0,types.card[this.hold.list[h]].list)
                    }
                break
                case 531:
                    this.battle.combatants[0].status.main[107]+=this.damage
                break
                case 532:
                    this.battle.mana.main+=this.damage
                    if(this.alt>0){
                        for(g=0;g<this.alt;g++){
                            this.battle.draw()
                        }
                    }
                break
                case 533:
                    this.battle.allDiscard()
                    this.battle.turnDraw()
                    this.battle.combatants[0].boost.main[0]+=this.damage
                break
                case 534:
                    this.battle.combatants[this.target].take(this.damage,-1)
                    if(this.battle.combatants[this.target].life<=0){
                        for(g=0;g<this.alt;g++){
                            this.battle.draw()
                        }
                    }
                break
                case 535:
                    this.battle.combatants[this.target].boost.main[0]-=this.damage
                break
                case 536:
                    this.battle.combatants[this.target].boost.main[1]-=this.damage
                break
                case 537:
                    transition.trigger=true
                    transition.scene='choice'
                    this.battle.setupChoice(0,0,6)
                    this.battle.context=-5
                break
                case 538:
                    this.battle.random.forethinking=this.damage
                break
                case 539:
                    for(g=0;g<this.damage;g++){
                        h=floor(random(1,3))
                        this.battle.hand.add(listing.card[0][h][floor(random(0,listing.card[0][h].length))],0,0)
                    }
                break
                case 540:
                    this.battle.combatants[0].status.main[108]+=this.damage
                break
                case 541:
                    this.battle.combatants[0].status.main[111]+=this.damage
                break
                case 542:
                    this.battle.combatants[this.target].status.main[112]+=this.damage
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1&&this.battle.combatants[g].status.main[112]>0){
                            this.battle.combatants[g].take(this.battle.combatants[g].status.main[112],-1)
                        }
                    }
                break
                case 543:
                    if(this.battle.combatants[this.target].status.main[112]>0){
                        this.battle.combatants[this.target].take(this.battle.combatants[this.target].status.main[112]*this.damage,-1)
                    }
                break
                case 544:
                    this.battle.reserve.addShuffle(findCard('Beta'),0,0)
                    this.battle.drop.addDrop(findCard('Beta'),0,0)
                break
                case 545:
                    this.battle.reserve.addShuffle(findCard('Omega'),0,0)
                    this.battle.drop.addDrop(findCard('Omega'),0,0)
                break
                case 546:
                    this.battle.combatants[0].status.main[113]+=this.damage
                break
                case 547:
                    this.battle.reserve.addShuffleAlt(findCard('Expunger'),0,0,this.mana+this.damage)
                    this.battle.drop.addDrop(findCard('Expunger'),0,0)
                break
                case 548:
                    this.battle.combatants[0].status.main[114]+=this.damage
                break
                case 549:
                    this.battle.combatants[0].status.main[115]+=this.damage
                break
                case 550:
                    if(this.battle.combatants[0].stance==2){
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                break
                case 551:
                    if(this.battle.combatants[0].stance==1){
                        this.battle.combatants[0].addBlock(this.damage)
                    }
                break
                case 552:
                    this.battle.combatants[0].status.main[2]+=this.damage
                    this.battle.combatants[0].changeStance(2)
                break
                case 553:
                    this.battle.combatants[0].status.main[12]+=this.damage
                    this.battle.combatants[0].changeStance(1)
                break
                case 554:
                    if(this.battle.combatants[0].stance==2){
                        this.battle.mana.main++
                    }
                break
                case 555:
                    if(this.battle.combatants[0].stance==1){
                        this.battle.mana.main++
                    }
                break
                case 556:
                    this.battle.randomDiscard()
                    this.battle.random.doubling=this.damage
                break
                case 557:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].status.main[0]+=this.alt
                break
                case 558:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.mana.main=1
                break
                case 559:
                    this.hold.list=[]
                    for(g=0,lg=this.battle.combatants[this.target].status.class.length;g<lg;g++){
                        if(this.battle.combatants[this.target].status.class[g]==0){
                            this.hold.list.push(g)
                        }
                    }
                    this.battle.combatants[this.target].status.main[this.hold.list[floor(random(0,this.hold.list.length))]]+=this.damage
                break
                case 561:
                    this.battle.combatants[this.target].take(this.damage*this.mana*this.mana,this.user)
                break
                case 562:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.reserve.addShuffle(findCard('Chip'),0,0)
                    this.battle.drop.addDrop(findCard('Chip'),0,0)
                break
                case 563:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].addBlock(this.alt)
                break
                case 564:
                    if(this.mana%2==0){
                        this.battle.combatants[this.target].take(this.damage*this.mana,this.user)
                    }else{
                        this.battle.combatants[0].addBlock(this.alt*this.mana)
                    }
                break
                case 566:
                    this.hold.int=0
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].class!=0&&!this.battle.hand.cards[g].trigger){
                            this.hold.int=1
                        }
                    }
                    if(this.hold.int==0){
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                break
                case 567:
                    this.battle.combatants[0].boost.main[0]+=this.damage
                    this.battle.combatants[0].status.main[7]+=this.damage-1
                break
                case 568:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                        this.battle.hand.cards[this.battle.hand.cards.length-1].cost=0
                    }
                break
                case 569:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    transition.trigger=true
                    transition.scene='deck'
                    this.battle.context=12
                break
                case 570:
                    this.hold.int=0
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].class==0&&!this.battle.hand.cards[g].trigger){
                            this.hold.int++
                        }
                    }
                    this.battle.combatants[this.target].take(this.damage+this.alt*this.hold.int,this.user)
                break
                case 571:
                    this.battle.takeAll(this.damage,this.user,1)
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
                            this.battle.combatants[g].boost.main[1]-=this.alt
                        }
                    }
                break
                case 572:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.randomExhaust()
                break
                case 574:
                    this.battle.mana.main+=this.damage
                    this.battle.combatants[0].life-=this.alt
                break
                case 575:
                    this.battle.combatants[0].status.main[113]+=this.damage
                    this.battle.combatants[0].status.main[71]+=this.alt
                break
                case 576:
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
                            this.battle.combatants[g].boost.main[0]-=this.damage
                            this.battle.combatants[g].status.main[4]+=this.damage-1
                        }
                    }
                break
                case 577:
                    this.battle.combatants[0].status.main[116]+=this.damage
                break
                case 578:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].status.main[117]+=this.alt
                break
                case 580:
                    this.battle.draw()
                    if(this.battle.hand.cards[this.battle.hand.cards.length-1].class==1){
                        this.battle.combatants[0].block+=this.alt
                    }
                break
                case 581:
                    this.battle.combatants[0].status.main[118]+=this.damage
                break
                case 583:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].boost.main[1]<0){
                        this.battle.mana.main+=this.alt
                        this.battle.draw()
                    }
                break
                case 584:
                    this.battle.combatants[this.target].boost.main[0]-=this.damage
                    this.battle.combatants[0].block+=this.alt
                break
                case 585:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].status.main[74]+=this.alt
                break
                case 586:
                    this.battle.random.reserving=this.damage
                break
                case 587:
                    this.battle.combatants[0].status.main[119]+=this.damage
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        this.battle.hand.cards[g].cost=0
                    }
                break
                case 588:
                    this.battle.combatants[this.target].status.main[120]+=this.damage
                break
                case 589:
                    if(this.battle.reserve.cards.length<=0){
                        this.battle.takeAll(this.damage,this.user,1)
                    }
                break
                case 590:
                    this.battle.combatants[this.target].boost.main[0]-=this.mana*this.damage
                break
                case 591:
                    this.battle.random.reserving2++
                    this.battle.random.copying+=this.damage
                break
                case 592:
                    this.battle.combatants[0].status.main[122]+=this.damage
                break
                case 593:
                    this.battle.random.tempDrawAmount+=this.damage
                    this.battle.random.drawing+=this.damage
                    this.battle.combatants[0].status.main[123]+=this.alt
                break
                case 594:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].class!=0){
                            this.battle.hand.cards[g].used=true
                            this.battle.hand.cards[g].selectDiscard=true
                        }
                    }
                break
                case 595:
                    this.battle.combatants[0].status.main[12]+=this.damage
                    this.battle.combatants[0].status.main[124]+=this.alt
                break
                case 596:
                    this.battle.combatants[0].status.main[125]+=this.damage
                break
                case 601:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].class!=0){
                            this.battle.hand.cards[g].used=true
                            this.battle.hand.cards[g].exhaust=true
                        }
                    }
                break
                case 602:
                    if(types.attack[this.battle.combatants[this.target].attacks[this.battle.combatants[this.target].intent]].class==0){
                        this.battle.combatants[0].boost.main[0]+=this.damage
                    }
                break
                case 603:
                    if(this.mana>0){
                        this.battle.takeAll(this.damage,this.user,1)
                        for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                            if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
                                this.attacks.push([0,this.alt*this.mana*10-10,g,this.damage])
                            }
                        }
                    }
                break
                case 605:
                    this.battle.combatants[0].boost.main[1]-=this.damage
                    this.battle.mana.max+=this.alt
                    this.battle.mana.gen+=this.alt
                break
                case 606:
                    this.battle.random.tempDrawAmount+=this.damage
                    this.battle.random.drawing+=this.damage
                    this.battle.combatants[0].status.main[71]+=this.alt
                break
                case 607:
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].class==1){
                            this.battle.hand.cards[g].cost=0
                            this.battle.hand.cards[g].base.cost=0
                            this.battle.hand.cards[g].playExhaust=true
                        }
                    }
                break
                case 608:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].life<=0){
                        this.battle.combatants[0].base.life+=this.alt
                        this.battle.combatants[0].life+=this.alt
                    }
                break
                case 609:
                    this.battle.combatants[0].status.main[126]+=this.damage
                break
                case 610:
                    for(g=0,lg=this.battle.combatants[0].boost.main.length;g<lg;g++){
                        if(this.battle.combatants[0].boost.main[g]>0){
                            this.battle.combatants[0].boost.main[g]*=2
                        }
                    }
                break
                case 611:
                    this.battle.combatants[0].status.main[127]+=this.damage
                break
                case 612:
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].attack==1&&this.battle.hand.cards[g].spec==3){
                            this.battle.hand.cards[g].trigger=true
                            this.battle.hand.cards[g].used=true
                            this.battle.combatants[0].orbAttack(8,-1,0)
                        }
                    }
                break
                case 613:
                    this.battle.draw()
                    if(this.battle.hand.cards[this.battle.hand.cards.length-1].class==0){
                        for(g=0;g<this.alt;g++){
                            this.battle.hand.add(findCard('Shiv'),0,0)
                        }
                    }
                break
                case 614:
                    this.battle.combatants[0].status.main[128]+=this.damage
                break
                case 615:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].life<=0){
                        this.battle.takeAll(this.alt,this.user,1)
                    }
                break
                case 616:
                    if(this.battle.combatants[0].boost.main[0]<0){
                        this.battle.combatants[this.target].take(this.damage+this.alt,this.user)
                    }else{
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                break
                case 617:
                    transition.trigger=true
                    transition.scene='deck'
                    this.battle.context=17
                break
                case 618:
                    while(this.battle.discard.cards.length>0){
                        this.battle.hand.cards.push(copyCard(this.battle.discard.cards[0]))
                        this.battle.hand.cards[this.battle.hand.cards.length-1].position.x=1206
                        this.battle.hand.cards[this.battle.hand.cards.length-1].position.y=500
                        this.battle.discard.cards.splice(0,1)
                    }
                break
                case 619:
                    for(g=0,lg=this.battle.discard.cards.length;g<lg;g++){
                        if(this.battle.discard.cards[g].spec==16){
                            this.battle.hand.cards.push(copyCard(this.battle.discard.cards[g]))
                            this.battle.hand.cards[this.battle.hand.cards.length-1].position.x=1206
                            this.battle.hand.cards[this.battle.hand.cards.length-1].position.y=500
                            this.battle.discard.cards.splice(g,1)
                            break
                        }
                    }
                break
                case 620:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    transition.trigger=true
                    transition.scene='deck'
                    this.battle.context=12
                break
                case 621:
                    for(g=0,lg=this.battle.discard.cards.length;g<lg;g++){
                        if(this.battle.discard.cards[g].spec==16){
                            this.battle.hand.cards.push(copyCard(this.battle.discard.cards[g]))
                            this.battle.hand.cards[this.battle.hand.cards.length-1].position.x=1206
                            this.battle.hand.cards[this.battle.hand.cards.length-1].position.y=500
                            this.battle.discard.cards.splice(g,1)
                            g--
                            lg--
                        }
                    }
                break
                case 622:
                    this.battle.combatants[this.target].boost.main[0]-=this.damage
                    this.battle.combatants[this.target].boost.main[1]-=this.damage
                break
                case 623:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].spec==16&&this.battle.hand.cards[g].used){
                            this.battle.hand.cards[g].used=false
                        }
                    }
                break
                case 624:
                    this.hold.list=[]
                    for(g=0,lg=types.card.length;g<lg;g++){
                        if(types.card[g].stats[0].spec==16){
                            this.hold.list.push(g)
                        }
                    }
                    g=floor(random(0,this.hold.list.length))
                    this.battle.hand.add(this.hold.list[g],0,types.card[this.hold.list[g]].list)
                break
                case 625:
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].spec==16){
                            this.battle.hand.cards[g].spec=0
                        }
                    }
                break
                case 626:
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].spec!=16){
                            this.battle.hand.cards[g].cost=0
                            this.battle.hand.cards[g].base.cost=0
                            this.battle.hand.cards[g].spec=16
                        }
                    }
                break
                case 628:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.hold.list=[]
                    for(g=0,lg=this.battle.combatants[this.target].status.class.length;g<lg;g++){
                        if(this.battle.combatants[this.target].status.class[g]==0){
                            this.hold.list.push(g)
                        }
                    }
                    this.battle.combatants[this.target].status.main[this.hold.list[floor(random(0,this.hold.list.length))]]+=this.alt
                break
                case 629:
                    this.battle.combatants[0].status.main[129]+=this.damage
                    this.battle.combatants[0].status.main[1]+=this.damage
                break
                case 630:
                    this.battle.tickStatus()
                break
                case 631:
                    this.battle.combatants[this.target].take(this.damage*this.battle.counter.played,this.user)
                break
                case 632:
                    this.battle.combatants[this.target].take(this.damage*this.battle.random.played,this.user)
                break
                case 634:
                    this.battle.combatants[0].status.main[130]+=this.damage
                break
                case 635:
                    while(this.battle.reserve.cards.length>0){
                        this.battle.hand.cards.push(copyCard(this.battle.reserve.cards[0]))
                        this.battle.hand.cards[this.battle.hand.cards.length-1].position.x=1206
                        this.battle.hand.cards[this.battle.hand.cards.length-1].position.y=500
                        this.battle.reserve.cards.splice(0,1)
                    }
                    this.battle.return()
                    while(this.battle.hand.cards.length>0){
                        this.battle.discard.cards.push(copyCard(this.battle.hand.cards[0]))
                        this.battle.discard.cards[this.battle.discard.cards.length-1].position.x=1206
                        this.battle.discard.cards[this.battle.discard.cards.length-1].position.y=500
                        this.battle.hand.cards.splice(0,1)
                    }
                break
                case 636:
                    if(this.battle.hand.cards.length==1){
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                break
                case 637:
                    if(this.battle.mana.main<=0){
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                break
                case 638:
                    this.battle.drop.addDrop(findCard('Peak'),this.damage,0)
                    this.battle.reserve.addShuffle(findCard('Peak'),this.damage,0)
                    this.attacks.push([8,20,0,'Trough'])
                break
                case 639:
                    for(g=0;g<this.damage;g++){
                        this.battle.hand.add(findCard('Screen'),0,0)
                    }
                break
                case 640:
                    if(this.battle.counter.turn>=5){
                        this.battle.mana.main+=this.damage
                        for(g=0;g<this.alt;g++){
                            this.battle.draw()
                        }
                    }
                break
                case 643:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.drop.addDrop(findCard('Dazed'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Dazed'),0,stage.playerNumber+1)
                break
                case 644:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.counter.played==1){
                        this.battle.combatants[this.target].boost.main[1]-=this.alt
                    }
                break
                case 645:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                        this.battle.hand.cards[this.battle.hand.cards.length-1].cost=0
                    }
                    if(this.battle.counter.played==1){
                        this.battle.mana.main+=this.alt
                    }
                break
                case 646: case 647:
                    this.hold.int=0
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].list==10||this.battle.hand.cards[g].list==11){
                            this.hold.int=1
                        }
                    }
                    if(this.hold.int==1&&this.type==646||this.hold.int==0&&this.type==647){
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                break
                case 648:
                    if(this.battle.counter.played==1){
                        this.battle.combatants[this.target].take(this.damage*this.alt,this.user)
                    }else{
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                break
                case 649:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.drop.addDrop(findCard('Spin'),0,0)
                    this.battle.reserve.addShuffle(findCard('Spin'),0,0)
                    if(this.alt>1){
                        this.attacks.push([14,20,0,'Spin'])
                    }
                break
                case 650:
                    this.battle.combatants[0].status.main[6]+=this.damage
                    for(g=0;g<this.alt;g++){
                        this.battle.randomDiscard()
                    }
                break
                case 651:
                    if(this.battle.combatants[0].stance==1){
                        this.battle.combatants[0].addBlock(this.alt+this.damage)
                    }else{
                        this.battle.combatants[0].addBlock(this.damage)
                    }
                break
                case 652:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[131]+=this.alt
                break
                case 653:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[132]+=this.alt
                break
                case 654:
                    this.battle.combatants[this.target].status.main[133]+=this.damage
                break
                case 655:
                    this.battle.combatants[this.target].take(this.battle.combatants[0].base.life-this.battle.combatants[0].life,-1)
                break
                case 656:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[134]+=this.alt
                break
                case 658:
                    this.battle.combatants[0].status.main[135]+=this.damage
                break
                case 659:
                    this.battle.random.exiling=this.damage
                break
                case 660:
                    this.battle.random.releasing=this.damage
                break
                case 661:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[47]+=2
                break
                case 662:
                    this.battle.takeAll(this.damage,0,1)
                    this.battle.combatants[this.target].take(this.damage*2,this.user)
                break
                case 663:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        this.battle.hand.cards[g].cost=0
                    }
                break
                case 664:
                    this.battle.combatants[0].status.main[1]+=this.damage
                    this.battle.combatants[0].status.main[115]+=this.damage
                break
                case 665:
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].team==1&&this.battle.combatants[g].life>0&&types.attack[this.battle.combatants[g].attacks[this.battle.combatants[g].intent]].class==0){
                            this.battle.mana.main+=this.damage
                        }
                    }
                break
                case 666:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    this.battle.combatants[0].status.main[118]++
                break
                case 667:
                    this.battle.combatants[0].boost.main[0]+=this.damage*this.battle.hand.cards.length
                    this.battle.allDiscard()
                break
                case 668:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].changeStance(2)
                break
                case 669:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].changeStance(1)
                break
                case 670:
                    this.battle.combatants[0].status.main[136]+=this.damage
                break
                case 671:
                    this.battle.combatants[0].status.main[137]+=this.damage
                break
                case 672:
                    this.battle.combatants[0].status.main[138]+=this.damage
                break
                case 673:
                    if(this.battle.combatants[0].stance==1){
                        this.battle.combatants[this.target].take(this.damage,this.user)
                        this.battle.combatants[0].changeStance(0)
                    }
                break
                case 674:
                    if(this.battle.combatants[0].stance==2){
                        this.battle.combatants[0].addBlock(this.damage)
                        this.battle.combatants[0].changeStance(0)
                    }
                break
                case 675:
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1&&this.battle.combatants[g].status.main[112]>0){
                            this.battle.combatants[g].take(this.battle.combatants[g].status.main[112]*this.damage,-1)
                        }
                    }
                break
                case 676:
                    this.battle.combatants[this.target].status.main[112]+=this.damage
                break
                case 677:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[139]+=this.alt
                break
                case 678:
                    for(g=0,lg=this.battle.combatants[this.target].boost.main.length;g<lg;g++){
                        if(this.battle.combatants[this.target].boost.main[g]<0){
                            this.battle.combatants[this.target].take(abs(this.damage*this.battle.combatants[this.target].boost.main[g]),this.user)
                        }
                    }
                    for(g=0,lg=this.battle.combatants[this.target].status.main.length;g<lg;g++){
                        if(this.battle.combatants[this.target].status.main[g]>0&&this.battle.combatants[this.target].status.class[g]==0){
                            this.battle.combatants[this.target].take(this.damage,this.user)
                        }
                    }
                break
                case 679:
                    if(this.battle.combatants[this.target].life<=this.battle.combatants[this.target].base.life*this.damage/10){
                        this.battle.combatants[this.target].life=0
                    }
                break
                case 680:
                    for(g=0;g<this.damage;g++){
                        this.battle.combatants[0].load(5,0)
                    }
                    for(g=0,lg=this.battle.combatants[0].ammo.length;g<lg;g++){
                        if(this.battle.combatants[0].ammo[g]==5){
                            this.battle.combatants[0].addBlock(this.alt)
                        }
                    }
                break
                case 681:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(types.attack[this.battle.combatants[this.target].attacks[this.battle.combatants[this.target].intent]].class==0){
                        this.battle.combatants[0].load(2,0)
                    }
                break
                case 682:
                    for(g=0;g<this.damage;g++){
                        this.battle.combatants[0].load(5,0)
                    }
                    this.battle.combatants[0].autoEvoke()
                break
                case 683:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].attack==22||this.battle.hand.cards[g].attack==683){
                            this.battle.hand.cards[g].damage+=5
                        }
                    }
                    for(g=0,lg=this.battle.reserve.cards.length;g<lg;g++){
                        if(this.battle.reserve.cards[g].attack==22||this.battle.reserve.cards[g].attack==683){
                            this.battle.reserve.cards[g].damage+=5
                        }
                    }
                    for(g=0,lg=this.battle.discard.cards.length;g<lg;g++){
                        if(this.battle.discard.cards[g].attack==22||this.battle.discard.cards[g].attack==683){
                            this.battle.discard.cards[g].damage+=5
                        }
                    }
                break
                case 684:
                    for(g=0;g<this.damage;g++){
                        this.battle.combatants[0].load(0,0)
                    }
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].attack==22||this.battle.hand.cards[g].attack==683){
                            this.battle.hand.cards[g].damage+=2
                        }
                    }
                    for(g=0,lg=this.battle.reserve.cards.length;g<lg;g++){
                        if(this.battle.reserve.cards[g].attack==22||this.battle.reserve.cards[g].attack==683){
                            this.battle.reserve.cards[g].damage+=2
                        }
                    }
                    for(g=0,lg=this.battle.discard.cards.length;g<lg;g++){
                        if(this.battle.discard.cards[g].attack==22||this.battle.discard.cards[g].attack==683){
                            this.battle.discard.cards[g].damage+=2
                        }
                    }
                break
                case 685:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    for(g=0,lg=this.battle.combatants[0].ammo.length;g<lg;g++){
                        if(this.battle.combatants[0].ammo[g]>=0){
                            this.battle.combatants[0].addBlock(this.alt)
                        }
                    }
                break
                case 686:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].status.main[31]+=this.alt
                break
                case 687:
                    this.battle.combatants[0].status.main[140]+=this.damage
                break
                case 688:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].load(4,6)
                break
                case 689:
                    for(g=0,lg=this.battle.combatants[0].ammo.length;g<lg;g++){
                        if(this.battle.combatants[0].ammo[g]==4){
                            this.battle.combatants[0].ammoDetail[g]*=this.damage
                        }
                    }
                break
                case 690:
                    for(g=0,lg=this.battle.combatants[0].ammo.length;g<lg;g++){
                        if(this.battle.combatants[0].ammo[g]<0){
                            this.battle.combatants[0].ammo[g]=1
                        }
                    } 
                break
                case 691:
                    this.battle.combatants[0].status.main[141]+=this.damage
                break
                case 692:
                    this.battle.combatants[0].status.main[142]+=this.damage
                break
                case 693:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    this.battle.combatants[0].boost.main[3]-=this.alt
                break
                case 694:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                        if(this.battle.hand.cards[this.battle.hand.cards.length-1].cost!=0){
                            this.battle.hand.cards[this.battle.hand.cards.length-1].used=true
                        }
                    }
                break
                case 695:
                    for(g=0;g<this.damage;g++){
                        this.battle.combatants[0].ammo.push(-1)
                        this.battle.combatants[0].ammoDetail.push(0)
                    }
                break
                case 696:
                    for(g=0,lg=this.battle.combatants[0].ammo.length;g<lg;g++){
                        this.battle.combatants[0].passiveEvoke(this.battle.combatants[0].ammo[g],this.battle.combatants[0].ammoDetail[g])
                    }
                break
                case 697:
                    this.battle.combatants[0].status.main[143]+=this.damage
                break
                case 698:
                    this.battle.combatants[0].status.main[6]+=this.damage
                    this.battle.discarding=this.alt
                break
                case 699:
                    this.battle.mana.max+=this.damage
                    this.battle.mana.gen+=this.damage
                    this.battle.random.tempDrawAmount-=this.alt
                    this.battle.random.drawing-=this.alt
                    this.battle.combatants[0].meter=0
                break
                case 700:
                    this.battle.combatants[0].status.main[144]+=this.damage
                break
                case 701:
                    this.hold.list=[]
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].life>0&&this.battle.combatants[g].team==1){
                            this.hold.list.push(g)
                        }
                    }
                    for(g=0;g<this.alt;g++){
                        this.battle.combatants[this.hold.list[floor(random(0,this.hold.list.length))]].status.main[11]+=this.damage
                    }
                    this.battle.combatants[0].meter+=3
                break
                case 702:
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].team==1&&this.battle.combatants[g].life>0){
                            this.battle.combatants[g].status.main[11]+=this.damage
                            this.battle.combatants[g].boost.main[0]-=this.alt
                        }
                    }
                    this.battle.combatants[0].meter-=3
                break
                case 703:
                    this.battle.combatants[0].status.main[6]+=this.damage
                    this.battle.combatants[0].meter+=this.alt
                break
                case 704:
                    this.battle.combatants[0].status.main[145]+=this.damage
                    this.battle.combatants[0].meter+=this.alt
                break
                case 705:
                    if(this.battle.combatants[this.target].status.main[11]>0){
                        this.battle.combatants[this.target].take(this.damage*2,this.user)
                    }else{
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                    this.battle.combatants[0].meter+=this.alt
                break
                case 707:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].block<=0){
                        this.battle.combatants[this.target].status.main[11]+=this.alt
                    }
                    this.battle.combatants[0].meter-=2
                break
                case 708:
                    this.hold.int=this.damage
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].team==1&&this.battle.combatants[g].life>0&&this.battle.combatants[g].status.main[11]>0){
                            this.hold.int+=this.battle.combatants[g].status.main[11]*2
                        }
                    }
                    if(this.hold.int>0){
                        this.battle.combatants[0].addBlock(this.hold.int)
                    }
                    this.battle.combatants[0].meter+=this.alt
                break
                case 709:
                    this.battle.combatants[0].status.main[146]+=this.damage
                    this.battle.combatants[0].meter+=this.alt
                break
                case 710:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.random.tempDrawAmount--
                    this.battle.random.drawing--
                    this.battle.combatants[0].meter+=this.alt
                break
                case 711:
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].class==0){
                            this.battle.hand.cards[g].used=true
                        }
                    }
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].meter+=this.alt
                break
                case 712:
                    this.battle.combatants[0].status.main[147]+=this.damage
                break
                case 713:
                    this.battle.mana.main+=this.damage
                    for(g=0;g<this.alt;g++){
                        this.battle.draw()
                    }
                break
                case 714:
                    this.battle.combatants[0].status.main[148]+=this.damage
                break
                case 715:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(types.attack[this.battle.combatants[this.target].attacks[this.battle.combatants[this.target].intent]].class==0){
                        this.battle.combatants[this.target].damage[this.battle.combatants[this.target].intent]=max(0,this.battle.combatants[this.target].damage[this.battle.combatants[this.target].intent]-this.alt)
                    }
                break
                case 716:
                    if(types.attack[this.battle.combatants[this.target].attacks[this.battle.combatants[this.target].intent]].class==0){
                        this.battle.combatants[this.target].damage[this.battle.combatants[this.target].intent]=max(0,this.battle.combatants[this.target].damage[this.battle.combatants[this.target].intent]-this.damage)
                    }
                break
                case 717:
                    if(types.attack[this.battle.combatants[this.target].attacks[this.battle.combatants[this.target].intent]].class==2){
                        this.battle.combatants[this.target].damage[this.battle.combatants[this.target].intent]=max(0,this.battle.combatants[this.target].damage[this.battle.combatants[this.target].intent]-this.damage)
                    }
                break
                case 718:
                    this.battle.combatants[0].status.main[40]+=this.damage
                    this.battle.combatants[0].status.main[149]+=this.alt
                break
                case 719:
                    this.battle.combatants[this.target].damage[this.battle.combatants[this.target].intent]=0
                break
                case 720:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].boost.main[1]-=this.alt
                    this.battle.combatants[0].boost.main[1]-=this.alt
                    this.battle.combatants[0].meter-=4
                break
                case 721:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                    }
                    this.hold.list=[findCard('Construct'),findCard('Repair'),findCard('Duct Tape')]
                    g=floor(random(0,this.hold.list.length))
                    this.battle.hand.add(this.hold.list[g],0,types.card[this.hold.list[g]].list)
                break
                case 722:
                    if(this.battle.combatants[1].life<this.battle.combatants[1].base.life&&this.battle.combatants[1].built==0){
                        this.battle.combatants[1].life=this.battle.combatants[1].base.life
                    }
                    this.battle.combatants[0].take(this.damage,-1)
                break
                case 724:
                    this.battle.combatants[0].boost.main[0]+=this.damage
                    this.battle.combatants[0].boost.main[2]+=this.alt
                break
                case 725:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.combatants[0].status.main[47]++
                break
                case 726:
                    for(g=0;g<this.damage;g++){
                        this.battle.draw()
                        this.battle.hand.cards[this.battle.hand.cards.length-1].cost=0
                        this.battle.hand.cards[this.battle.hand.cards.length-1].base.cost=0
                    }
                break
                case 727:
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        this.battle.hand.cards[g].used=true
                    }
                break
                case 729:
                    for(g=0,lg=this.battle.reserve.cards.length;g<lg;g++){
                        if(this.battle.reserve.cards[g].list==11){
                            this.battle.reserve.cards[g].remove=true
                        }
                    }
                break
                case 730:
                    for(g=0,lg=this.battle.discard.cards.length;g<lg;g++){
                        if(this.battle.discard.cards[g].list==11){
                            this.battle.discard.cards[g].remove=true
                        }
                    }
                break
                case 731:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    for(g=0,lg=this.battle.discard.cards.length;g<lg;g++){
                        if((g+lg)%2==0){
                            this.battle.reserve.cards.push(copyCard(this.battle.discard.cards[g]))
                            this.battle.discard.cards.splice(g,1)
                            g--
                            lg--
                        }
                    }
                break
                case 732:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    if(this.battle.combatants[this.target].life<=0){
                        for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                            if(this.battle.hand.cards[g].trigger&&this.battle.hand.cards[g].attack==732){
                                for(h=0;h<this.alt;h++){
                                    this.battle.reserve.cards.push(copyCard(this.battle.hand.cards[g]))
                                }
                            }
                        }
                    }
                break
                case 733:
                    this.battle.mana.main+=this.damage
                    this.battle.combatants[0].take(this.alt,-1)
                break
                case 734:
                    transition.trigger=true
                    transition.scene='deck'
                    this.battle.setupDeck(18)
                    this.battle.context=18
                break
                case 735:
                    this.battle.combatants[0].addBlock(this.damage)
                    this.battle.random.exhausting+=this.alt
                break
                case 736:
                    this.battle.deck.randomUpgrade()
                break
                case 738:
                    if(this.alt>0){
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                    this.attacks.push([0,this.alt*10-10,this.target,this.damage])
                    this.battle.drop.addDrop(findCard('Whap'),this.damage,0)
                    this.battle.reserve.addShuffle(findCard('Whap'),this.damage,0)
                    this.attacks.push([14,20,0,'Whap'])
                break
                default:
            }
            this.battle.combatants[0].lastPlay=this.class
        }else{
            switch(type){
                case 1:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                break
                case 2:
                    this.battle.drop.addDrop(findCard(this.alt),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard(this.alt),0,stage.playerNumber+1)
                break
                case 3:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([7,7+this.alt*5,this.user,this.damage,this.alt,this.target])
                break
                case 4:
                    this.battle.drop.addDrop(findCard('Dazed'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Dazed'),0,stage.playerNumber+1)
                    this.attacks.push([8,20,0,'Dazed'])
                break
                case 5:
                    this.battle.drop.addDrop(findCard('Burn'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Burn'),0,stage.playerNumber+1)
                    for(let g=0;g<this.damage-1;g++){
                        this.attacks.push([8+g*8,20,0,'Burn'])
                    }
                break
                case 6:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                    this.battle.drop.addDrop(findCard(this.alt),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard(this.alt),0,stage.playerNumber+1)
                break
                case 7:
                    this.battle.combatants[this.target].boost.main[0]-=this.damage
                break
                case 8:
                    this.battle.combatants[this.user].addBlock(this.damage)
                break
                case 9:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                    if(this.battle.combatants[this.target].block<=0){
                        this.battle.combatants[this.target].status.main[11]+=this.alt
                    }
                break
                case 10:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                    if(this.battle.combatants[this.target].block<=0){
                        this.battle.drop.addDrop(findCard(this.alt),0,stage.playerNumber+1)
                        this.battle.reserve.addShuffle(findCard(this.alt),0,stage.playerNumber+1)
                    }
                break
                case 11:
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].team==1){
                            this.battle.combatants[g].status.main[4]+=this.damage
                        }
                    }
                break
                case 12:
                    this.battle.combatants[this.target].status.main[71]+=this.damage
                    this.battle.combatants[this.target].status.main[72]++
                    this.battle.mana.gen--
                break
                case 13:
                    this.battle.drop.addDrop(findCard('Parasite'),0,stage.playerNumber+2)
                    this.battle.deck.add(findCard('Parasite'),0,stage.playerNumber+2)
                break
                case 14:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                    this.battle.combatants[this.user].addBlock(this.alt)
                break
                case 15:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                    this.battle.combatants[this.target].boost.main[2]-=this.alt
                break
                case 16:
                    this.battle.combatants[this.user].addBlock(this.damage)
                    this.battle.combatants[this.user].status.main[47]+=this.alt+1
                break
                case 17:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                    this.battle.combatants[this.target].boost.main[0]-=this.alt
                break
                case 18:
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].team==1&&this.battle.combatants[g].life>0){
                            this.battle.combatants[g].life=min(this.battle.combatants[g].life+this.damage,this.battle.combatants[g].base.life)
                        }
                    }
                break
                case 19:
                    this.battle.combatants[this.user].status.main[4]+=this.damage
                break
                case 20:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                    this.battle.drop.addDrop(findCard('Burn'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Burn'),0,stage.playerNumber+1)
                break
                case 22:
                    this.battle.combatants[this.user].addBlock(this.damage)
                    this.battle.combatants[this.user].status.main[89]+=this.alt
                break
                case 23:
                    this.battle.combatants[this.user].addBlock(this.damage)
                    this.battle.combatants[this.user].status.main[90]+=this.alt
                break
                case 24:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([7,7+this.alt*5,this.user,this.damage,this.alt,this.target])
                    this.battle.drop.addDrop(findCard('Dazed'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Dazed'),0,stage.playerNumber+1)
                    this.attacks.push([8,20,0,'Dazed'])
                break
                case 25:
                    this.battle.combatants[this.user].status.main[40]+=this.damage
                break
                case 26:
                    this.battle.combatants[0].status.main[64]+=this.damage
                break
                case 27:
                    this.battle.combatants[this.user].status.main[116]+=this.damage
                break
                case 28:
                    this.battle.combatants[this.target].status.main[71]+=this.damage
                break
                case 29:
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].team==1&&this.battle.combatants[g].life>0){
                            this.battle.combatants[g].addBlock(this.damage)
                        }
                    }
                break
                case 30:
                    this.battle.combatants[this.target].take(this.damage,this.user,1)
                    this.attacks.push([1,12,this.user,this.damage])
                break
                case 31:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                    this.battle.currency.money-=this.alt
                    this.battle.combatants[this.user].status.main[156]+=this.alt
                break
                case 32:
                    for(g=0,lg=this.battle.combatants[this.user].status.main.length;g<lg;g++){
                        this.battle.combatants[this.user].status.main[g]=0
                    }
                    this.battle.combatants[this.user].life=0
                    while(this.battle.objective.length>1){
                        this.battle.objective.splice(this.battle.objective.length-1)
                    }
                break
                case 33:
                    for(g=0,lg=this.battle.combatants[this.user].attacks.length;g<lg;g++){
                        if(this.battle.combatants[this.user].attacks[g]!=33){
                            this.battle.combatants[this.user].damage=copyList(this.battle.combatants[this.user].damage)
                            this.battle.combatants[this.user].damage[g]+=this.damage
                        }
                    }
                break
                case 34:
                    this.battle.combatants[this.user].boost.main[0]+=this.damage
                    this.battle.combatants[this.user].addBlock(this.alt)
                break
                case 35:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([7,7+this.alt*5,this.user,this.damage,this.alt,this.target])
                    this.battle.drop.addDrop(findCard('Burn'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Burn'),0,stage.playerNumber+1)
                    for(g=0,lg=this.battle.hand.cards.length;g<lg;g++){
                        if(this.battle.hand.cards[g].attack==-10&&this.battle.hand.cards[g].color==stage.playerNumber+1){
                            this.battle.hand.cards[g].level=1
                        }
                    }
                    for(g=0,lg=this.battle.reserve.cards.length;g<lg;g++){
                        if(this.battle.reserve.cards[g].attack==-10&&this.battle.reserve.cards[g].color==stage.playerNumber+1){
                            this.battle.reserve.cards[g].level=1
                        }
                    }
                    for(g=0,lg=this.battle.discard.cards.length;g<lg;g++){
                        if(this.battle.discard.cards[g].attack==-10&&this.battle.discard.cards[g].color==stage.playerNumber+1){
                            this.battle.discard.cards[g].level=1
                        }
                    }
                break
                case 36:
                    this.battle.combatants[this.target].take(this.battle.combatants[this.target].life*this.alt/this.damage,this.user)
                    this.attacks.push([1,12,this.user,this.damage])
                break
                case 37:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.user].combo++
                    this.attacks.push([15,7+this.alt*5,this.user,this.damage,this.alt,this.target])
                break
                case 38:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.user].combo++
                    this.attacks.push([1,12,this.user,this.damage])
                break
                case 39:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.user].combo++
                    this.attacks.push([1,12,this.user,this.damage])
                    if(this.battle.combatants[this.target].block<=0){
                        this.battle.drop.addDrop(findCard(this.alt),0,stage.playerNumber+1)
                        this.battle.reserve.addShuffle(findCard(this.alt),0,stage.playerNumber+1)
                    }
                break
                case 40:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.user].combo=0
                    this.attacks.push([1,12,this.user,this.damage])
                break
                case 41: case 42: case 43:
                    this.battle.combatants[this.target].boost.main[this.type-41]-=this.damage
                break
                case 44: case 45: case 46:
                    for(g=0,lg=this.battle.combatants.length;g<lg;g++){
                        if(this.battle.combatants[g].team==1&&this.battle.combatants[g].life>0){
                            this.battle.combatants[g].boost.main[this.type-44]+=this.damage
                        }
                    }
                break
                case 47:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.random.drawing--
                    this.attacks.push([1,12,this.user,this.damage])
                break
                case 48:
                    this.battle.quickReinforce(findCombatant('Management Robot'))
                break
                case 49:
                    this.battle.drop.addDrop(findCard('Dazed'),0,stage.playerNumber+1)
                    this.battle.reserve.addShuffle(findCard('Dazed'),0,stage.playerNumber+1)
                    for(g=0;g<3;g++){
                        this.attacks.push([8,20+g*10,0,'Dazed'])
                    }
                break
                case 50:
                    this.battle.quickReinforce(findCombatant('Management Soldier'))
                break
                case 51:
                    this.battle.random.drawing-=this.damage
                break
                case 52:
                    this.battle.combatants[this.target].status.main[1]-=this.damage
                break
                case 53:
                    this.battle.combatants[this.target].status.main[133]+=this.damage
                break
                case 54:
                    this.battle.combatants[this.user].status.main[129]+=this.damage
                break
                default:
            }
        }
    }
    run(){
        for(let g=0,lg=this.attacks.length;g<lg;g++){
            this.attacks[g][1]--
            switch(this.attacks[g][0]){
                case 0: case 6: case 13:
                    if(this.attacks[g][1]%10==0){
                        this.battle.combatants[this.attacks[g][2]].take(this.attacks[g][3],0)
                        if(this.attacks[g][0]==13&&this.battle.combatants[this.attacks[g][2]].blocked>0&&this.battle.combatants[this.attacks[g][2]].calc.damage>0){
                            this.battle.combatants[0].addBlock(this.battle.combatants[this.attacks[g][2]].calc.damage)
                        }
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
                case 7: case 15:
                    if(this.attacks[g][1]>=1+this.attacks[g][4]*5){
                        this.battle.combatants[this.attacks[g][2]].position.x-=10
                    }else if(this.attacks[g][1]<6){
                        this.battle.combatants[this.attacks[g][2]].position.x+=10
                    }else if(this.attacks[g][1]%5==0){
                        if(this.attacks[g][0]==15){
                            this.battle.combatants[this.attacks[g][2]].combo++
                        }
                        this.battle.combatants[this.attacks[g][5]].take(this.attacks[g][3],this.attacks[g][2],0)
                    }
                break
                case 8:
                    if(this.attacks[g][1]==10){
                        this.battle.drop.addDrop(findCard(this.attacks[g][3]),0,stage.playerNumber+1)
                        this.battle.reserve.addShuffle(findCard(this.attacks[g][3]),0,stage.playerNumber+1)
                    }
                break
                case 10:
                    if(this.attacks[g][1]<10){
                        this.battle.combatants[this.attacks[g][2]].position.x+=8
                    }else{
                        this.battle.combatants[this.attacks[g][2]].position.x-=8
                    }
                    if(this.attacks[g][1]==10&&this.attacks[g][2]>1&&this.battle.combatants[this.attacks[g][2]].life>0){
                        if(this.battle.combatants[this.attacks[g][2]-1].life>0&&(this.attacks[g][0]==10)){
                            this.battle.combatants[this.attacks[g][2]].take(this.attacks[g][3]+this.battle.combatants[0].status.main[26],this.attacks[g][2]-1,0)
                        }
                        this.battle.combatants[this.attacks[g][2]-1].take(this.attacks[g][3]+this.battle.combatants[0].status.main[26],this.attacks[g][2],0)
                    }
                break
                case 12:
                    if(this.attacks[g][1]%10==0&&this.battle.combatants[this.attacks[g][2]].block<=0){
                        this.battle.combatants[this.attacks[g][2]].status.main[11]+=this.attacks[g][3]
                    }
                break
                case 14:
                    if(this.attacks[g][1]==10){
                        this.battle.drop.addDrop(findCard(this.attacks[g][3]),0,0)
                        this.battle.reserve.addShuffle(findCard(this.attacks[g][3]),0,0)
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