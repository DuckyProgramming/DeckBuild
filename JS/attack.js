class attack{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.type=0
        this.level=0
        this.damage=0
        this.target=[1]
        this.targetType=0
    }
    update(type,level){
        this.type=type
        switch(type){
            case 1:
                this.battle.combatants[this.target].take(this.damage)
            break
            case 2:
                this.battle.combatants[0].block+=this.damage
            break
        }
    }
}