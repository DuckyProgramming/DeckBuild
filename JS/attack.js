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
                case 1: case 52: case 99: case 114: case 139:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                break
                case 2:
                    this.battle.combatants[0].block+=this.damage
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
                    this.battle.combatants[0].block+=this.damage
                    this.battle.combatants[0].status.main[0]+=this.alt
                break
                case 7:
                    this.battle.combatants[0].block+=this.damage*this.mana
                break
                case 8:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.drop.addDrop(findCard('Bleed'),0,stage.playerNumber+1)
                    this.battle.reserve.add(findCard('Bleed'),0,stage.playerNumber+1)
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
                    for(g=0;g<this.alt;g++){
                        this.battle.randomDiscard()
                    }
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
                        this.battle.hand.add(findCard('Shiv'),0,0)
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
                    this.battle.combatants[this.target].boost.main[0]-=this.alt
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
                    this.battle.combatants[0].block+=this.damage
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
                        this.battle.reserve.add(this.hold.list[floor(random(0,this.hold.list.length))],0,this.color)
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
                case 65:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[0].meter+=this.alt
                break
                case 66:
                    this.battle.combatants[0].block+=this.damage
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
                        this.battle.combatants[0].block+=this.damage*-this.battle.combatants[0].meter
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
                case 72:
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
                break
                case 76:
                    this.battle.combatants[this.target].status.main[11]+=this.damage
                    this.battle.combatants[0].meter+=this.alt
                break
                case 77:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.battle.combatants[this.target].status.main[11]+=6+this.level*2
                    this.battle.combatants[0].meter+=this.alt
                break
                case 78:
                    this.battle.combatants[this.target].take(this.damage,this.user)
                    this.attacks.push([0,50,this.target,this.damage])
                    this.battle.combatants[0].meter+=this.alt
                break
                case 79:
                    if(this.battle.combatants[0].meter>0){
                        this.battle.combatants[0].life=min(this.battle.combatants[0].life+this.damage*this.battle.combatants[0].meter,this.battle.combatants[0].base.life)
                    }
                    this.battle.combatants[0].meter=0
                break
                case 80:
                    this.battle.combatants[0].status.main[12]++
                    this.battle.combatants[0].meter+=this.alt
                break
                case 81:
                    this.battle.combatants[this.target].setupIntent(0)
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
                        if(this.battle.combatants[g].life>0){
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
                    this.battle.combatants[0].block+=this.damage
                    if(this.battle.combatants[0].armed==0){
                        this.battle.combatants[0].armed=1
                    }
                break
                case 88:
                    this.battle.combatants[0].block+=this.damage
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
                    this.battle.combatants[0].meter+=this.alt
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
                    this.battle.combatants[0].block+=this.battle.combatants[0].combo*this.damage
                    this.battle.combatants[0].combo=0
                break
                case 93:
                    if(this.damage>0){
                        this.battle.combatants[this.target].take(this.damage,this.user)
                    }
                    this.attacks.push([5,20,this.target,this.alt])
                break
                case 94:
                    this.battle.combatants[0].block+=this.damage
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
                    this.battle.combatants[0].block+=this.damage
                    this.battle.drop.addDrop(findCard('Insight'),0,0)
                    this.battle.reserve.add(findCard('Insight'),0,0)
                break
                case 100:
                    this.battle.combatants[0].changeStance(2)
                break
                case 101:
                    this.battle.combatants[0].block+=this.damage
                    if(this.battle.combatants[0].stance==2){
                        this.battle.combatants[0].block+=this.alt
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
                    this.battle.combatants[0].block+=this.damage
                    this.battle.hand.add(findCard('Safety'),0,0)
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
                    this.battle.reserve.add(findCard('Insight'),0,0)
                break
                case 112:
                    this.battle.combatants[0].status.main[16]+=this.damage
                break
                case 113:
                    this.battle.combatants[0].block+=this.damage
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
                    this.battle.combatants[0].block+=max(0,this.damage-this.battle.combatants[this.target].block)
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
                    this.battle.combatants[0].block+=this.damage*this.battle.hand.cards.length
                break
                case 125:
                    this.battle.combatants[0].block+=this.damage
                    for(g=0;g<this.alt;g++){
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
                    this.battle.combatants[0].status.main[6]++
                break
                case 145:
                    this.battle.combatants[0].status.main[6]++
                    this.battle.combatants[0].status.main[3]+=this.alt
                break
                case 146:
                    this.battle.combatants[0].block+=this.damage
                    this.battle.combatants[0].combo+=2
                    this.battle.combatants[0].status.main[24]+=this.alt
                break
                case 147:
                    this.battle.combatants[0].status.main[25]+=this.damage
                break
                case 148:
                    this.battle.allDiscard()
                    for(g=0;g<this.battle.drawAmount;g++){
                        this.battle.draw()
                    }
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
                    this.battle.combatants[0].block+=this.damage
                    this.battle.combatants[0].status.main[3]+=4
                    this.battle.combatants[0].status.main[27]+=this.alt
                break
                case 154:
                    this.battle.combatants[0].block+=this.damage
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
                    this.battle.combatants[0].block+=this.alt
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
                    this.battle.combatants[0].block+=this.damage
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
                        this.battle.combatants[0].block+=this.alt
                    }
                break
                case 166:
                    this.battle.combatants[0].block+=this.damage
                    this.battle.discarding+=this.alt
                break
                case 169:
                    this.battle.discarding+=this.damage
                    this.battle.mana.main+=this.alt
                break
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
                    this.battle.reserve.add(findCard('Confusion'),0,stage.playerNumber+1)
                break
                case 3:
                    this.battle.combatants[0].take(this.damage,this.user)
                    this.attacks.push([7,7+this.alt*5,this.user,this.damage,this.alt])
                break
                case 4:
                    this.battle.drop.addDrop(findCard('Dazed'),0,stage.playerNumber+1)
                    this.battle.reserve.add(findCard('Dazed'),0,stage.playerNumber+1)
                    this.attacks.push([8,20,0,'Dazed'])
                break
            }
        }
    }
    run(){
        for(g=0,lg=this.attacks.length;g<lg;g++){
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
                case 4: case 5: case 9:
                    if(this.attacks[g][1]<10){
                        this.battle.combatants[this.attacks[g][2]].position.x-=8
                    }else{
                        this.battle.combatants[this.attacks[g][2]].position.x+=8
                    }
                    if(this.attacks[g][1]==10&&this.attacks[g][2]<this.battle.combatants.length-1&&this.combatants[this.attack[g][2]].life>0){
                        if(this.battle.combatants[this.attacks[g][2]+1].life>0&&(this.attacks[g][0]==5||this.attacks[g][0]==9)){
                            this.battle.combatants[this.attacks[g][2]].take(this.attacks[g][3],this.attacks[g][2],0)
                            this.battle.combatants[0].combo--
                            if(this.attacks[g][0]==9){
                                this.attacks.push([5,20,this.attacks[g][2]+1,this.attacks[g][3]])
                            }
                        }
                        this.battle.combatants[this.attacks[g][2]+1].take(this.attacks[g][3],this.attacks[g][2],0)
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
                        this.battle.reserve.add(findCard(this.attacks[g][3]),0,5)
                    }
                break
                case 10:
                    if(this.attacks[g][1]<10){
                        this.battle.combatants[this.attacks[g][2]].position.x+=8
                    }else{
                        this.battle.combatants[this.attacks[g][2]].position.x-=8
                    }
                    if(this.attacks[g][1]==10&&this.attacks[g][2]>0&&this.combatants[this.attack[g][2]].life>0){
                        if(this.battle.combatants[this.attacks[g][2]-1].life>0&&(this.attacks[g][0]==10)){
                            this.battle.combatants[this.attacks[g][2]].take(this.attacks[g][3],this.attacks[g][2],0)
                            this.battle.combatants[0].combo--
                        }
                        this.battle.combatants[this.attacks[g][2]-1].take(this.attacks[g][3],this.attacks[g][2],0)
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