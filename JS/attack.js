class attack{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.type=0
        this.level=0
        this.side=0
        this.damage=0
        this.user=0
        this.target=[1]
        this.targetType=0
        this.attacks=[]
    }
    update(type,level,side){
        this.type=type
        this.level=level
        this.side=side
        if(side==0){
            switch(type){
                case 1:
                    this.battle.combatants[this.target].take(this.damage)
                break
                case 2:
                    this.battle.combatants[0].block+=this.damage
                break
                case 3:
                    this.battle.combatants[this.target].take(this.damage)
                    this.attacks.push([0,20,this.target,this.damage])
                break
            }
        }else{
            switch(type){
                case 1:
                    this.battle.combatants[0].take(this.damage)
                    this.attacks.push([1,12,this.user,this.damage])
                break
            }
        }
    }
    run(){
        for(g=0,lg=this.attacks.length;g<lg;g++){
            this.attacks[g][1]--
            switch(this.attacks[g][0]){
                case 0:
                    if(this.attacks[g][1]==0||this.attacks[g][1]==10){
                        this.battle.combatants[this.attacks[g][2]].take(this.attacks[g][3])
                    }
                break
                case 1:
                    if(this.attacks[g][1]>=6){
                        this.battle.combatants[this.user].position.x-=10
                    }else{
                        this.battle.combatants[this.user].position.x+=10
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