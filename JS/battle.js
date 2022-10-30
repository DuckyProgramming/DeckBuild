class battle{
    constructor(layer){
        this.layer=layer
        this.hand=new group(this.layer)
        this.reserve=new group(this.layer)
        this.deck=new group(this.layer)
        this.attack=new attack(this.layer,this)
        this.particles=[]
        this.combatants=[]
        this.combatants.push(new combatant(this.layer,100,350,1,0))
        this.mana={main:3,max:3}
        this.deck.initial()
        this.initialReserve()
        this.reserve.shuffle()
        for(e=0;e<4;e++){
            this.draw()
        }
    }
    create(combatants){
        for(e=0,le=combatants.length;e<le;e++){
            this.combatants.push(new combatant(this.layer,300+e*100,350,combatants[e].type,1))
        }
    }
    initialReserve(){
        for(e=0,le=this.deck.cards.length;e<le;e++){
            this.reserve.cards.push(copyCard(this.deck.cards[e]))
        }
    }
    draw(){
        if(this.reserve.cards.length>0){
            this.hand.cards.push(copyCard(this.reserve.cards[0]))
            this.reserve.cards.splice(0,1)
        }
    }
    display(){
        for(e=0,le=this.particles.length;e<le;e++){
            this.particles[e].display()
        }
        for(e=0,le=this.combatants.length;e<le;e++){
            this.combatants[e].display()
        }
        this.layer.fill(60)
        this.layer.rect(450,475,910,250)
        this.layer.fill(200,225,250,this.fade)
        this.layer.stroke(150,200,250,this.fade)
        this.layer.strokeWeight(6)
        this.layer.quad(8,390,32,358,56,390,32,422)
        this.layer.fill(0,this.fade)
        this.layer.noStroke()
        this.layer.textSize(20)
        this.layer.text(this.mana.main+'/'+this.mana.max,32,390)
        for(e=0,le=this.combatants.length;e<le;e++){
            this.combatants[e].displayInfo()
        }
        this.hand.display()
    }
    update(){
        for(e=0,le=this.particles.length;e<le;e++){
            this.particles[e].update()
            if(this.particles[e].remove){
                this.particles.splice(e,1)
                e--
                le--
            }
        }
        for(e=0,le=this.combatants.length;e<le;e++){
            this.combatants[e].update()
        }
        this.hand.update()
        this.reserve.update()
        this.deck.update()
        this.hand.updateHand()
    }
    onClick(){
        this.hand.onClickHand()
    }
}