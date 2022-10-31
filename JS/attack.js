class attack{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.type=0
        this.damage=0
    }
    set(type,level){
        this.type=type
        switch(type){
            case 1:
            break
            case 2:
                this.battle.combatants[0].block+=this.damage
            break
        }
    }
    update(){
    }
}