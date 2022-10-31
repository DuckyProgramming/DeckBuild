class battle{
    constructor(layer){
        this.layer=layer
        this.hand=new group(this.layer,this)
        this.reserve=new group(this.layer,this)
        this.deck=new group(this.layer,this)
        this.discard=new group(this.layer,this)
        this.attack=new attack(this.layer,this)
        this.particles=[]
        this.combatants=[]
        this.combatants.push(new combatant(this.layer,100,350,1,0))
        this.mana={main:3,max:3}
        this.anim={turn:0}
        this.deck.initial()
        this.initialReserve()
        this.reserve.shuffle()
        this.turn=0
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
        for(e=0,le=this.combatants.length;e<le;e++){
            this.combatants[e].display()
        }
        this.layer.fill(60)
        this.layer.rect(450,475,910,250)
        this.layer.fill(200,225,250,this.fade)
        this.layer.stroke(150,200,250,this.fade)
        this.layer.strokeWeight(6)
        this.layer.quad(-92+this.anim.turn*100,390,-68+this.anim.turn*100,358,-44+this.anim.turn*100,390,-68+this.anim.turn*100,422)
        this.layer.fill(200,160,200,this.fade)
        this.layer.stroke(160,120,160,this.fade)
        this.layer.strokeWeight(5)
        this.layer.rect(-68+this.anim.turn*100,565,40,30,5)
        this.layer.fill(0,this.fade)
        this.layer.noStroke()
        this.layer.textSize(20)
        this.layer.text(this.mana.main+'/'+this.mana.max,-68+this.anim.turn*100,390)
        this.layer.text('End',-68+this.anim.turn*100,565)
        for(e=0,le=this.combatants.length;e<le;e++){
            this.combatants[e].displayInfo()
        }
        this.hand.display()
        for(e=0,le=this.particles.length;e<le;e++){
            this.particles[e].display()
        }
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
        if(this.turn==0&&this.anim.turn<1){
            this.anim.turn=round(this.anim.turn*10+1)/10
        }else if(this.turn!=0&&this.anim.turn>0){
            this.anim.turn=round(this.anim.turn*10-1)/10
        }
        this.attack.run()
        this.hand.update()
        this.reserve.update()
        this.deck.update()
        this.discard.update()
        this.hand.updateHand()
    }
    onClick(){
        if(this.turn==0){
            this.hand.onClickHand()
            if(pointInsideBox({position:inputs.rel},{position:{x:-68+this.anim.turn*100,y:565},width:40,height:30})){
                this.turn++
                this.hand.discard()
            }
        }
    }
}