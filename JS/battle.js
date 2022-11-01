class battle{
    constructor(layer,player){
        this.layer=layer
        this.player=player
        this.hand=new group(this.layer,this)
        this.reserve=new group(this.layer,this)
        this.deck=new group(this.layer,this)
        this.discard=new group(this.layer,this)
        this.drop=new group(this.layer,this)
        this.attack=new attack(this.layer,this)
        this.particles=[]
        this.combatants=[]
        this.combatants.push(new combatant(this.layer,100,350,player,0,0))
        this.mana={main:3,max:3}
        this.anim={turn:0}
        this.deck.initial(player)
        this.initialReserve()
        this.reserve.shuffle()
        this.turn=0
        this.turnTimer=0
        this.drawAmount=5
        this.calc={list:[]}
        for(e=0;e<this.drawAmount;e++){
            this.draw()
        }
    }
    create(combatants){
        for(e=0,le=combatants.length;e<le;e++){
            this.combatants.push(new combatant(this.layer,300+e*100,350,combatants[e].type,1,e+1))
        }
        for(e=1,le=this.combatants.length;e<le;e++){
            this.combatants[e].setupIntent()
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
        if(this.reserve.cards.length<=0){
            this.return()
        }
    }
    return(){
        while(this.discard.cards.length>0){
            this.reserve.cards.push(copyCard(this.discard.cards[0]))
            this.reserve.cards[this.reserve.cards.length-1].position.x=1206
            this.discard.cards.splice(0,1)
        }
    }
    endTurn(){
        this.mana.main=this.mana.max
        this.mana.main+=this.combatants[0].status.main[1]
        for(e=0,le=this.combatants.length;e<le;e++){
            this.combatants[e].block=0
            this.combatants[e].setupIntent()
            for(f=0,lf=this.combatants[e].boost.main.length;f<lf;f++){
                this.combatants[e].boost.main[f]=0
            }
            for(f=0,lf=this.combatants[e].status.main.length;f<lf;f++){
                this.combatants[e].status.main[f]=0
            }
        }
    }
    playCard(){
        for(g=0,lg=this.hand.cards.length;g<lg;g++){
            if(this.hand.cards[g].type==11){
                this.combatants[0].take(1,0)
            }
        }
    }
    randomDiscard(){
        this.calc.list=[]
        for(g=0,lg=this.hand.cards.length;g<lg;g++){
            if(!this.hand.cards[g].trigger){
                this.calc.list.push(g)
            }
        }
        if(this.calc.list.length>0){
            this.hand.cards[this.calc.list[floor(random(0,this.calc.list.length))]].used=true
        }
    }
    allDiscard(){
        for(g=0,lg=this.hand.cards.length;g<lg;g++){
            if(!this.hand.cards[g].trigger){
                this.hand.cards[g].used=true
            }
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
        this.drop.display()
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
        this.drop.update()
        this.hand.updateHand()
        this.drop.updateDrop()
        if(this.turn>0){
            if(this.turnTimer>0){
                this.turnTimer--
            }else{
                this.attack.user=this.turn
                this.attack.damage=round(this.combatants[this.turn].damage[this.combatants[this.turn].intent]*(2+max(0,this.combatants[this.turn].boost.main[0]))/(2-min(0,this.combatants[this.turn].boost.main[0])))
                this.attack.alt=round(this.combatants[this.turn].alt[this.combatants[this.turn].intent]*(2+max(0,this.combatants[this.turn].boost.main[0]))/(2-min(0,this.combatants[this.turn].boost.main[0])))
                this.attack.update(this.combatants[this.turn].attacks[this.combatants[this.turn].intent],0,1)
                this.turnTimer=20
                this.turn++
                if(this.turn>=this.combatants.length){
                    this.turn=0
                }
                while(this.turn>0&&(this.combatants[this.turn].type<=0||this.combatants[this.turn].life<=0)){
                    this.turn++
                    if(this.turn>=this.combatants.length){
                        this.turn=0
                    }
                }
            }
            if(this.turn==0){
                this.reserve.shuffle()
                for(e=0;e<this.drawAmount;e++){
                    this.draw()
                }
                this.endTurn()
            }
        }
    }
    onClick(){
        if(this.turn==0){
            this.hand.onClickHand()
            if(pointInsideBox({position:inputs.rel},{position:{x:-68+this.anim.turn*100,y:565},width:40,height:30})){
                this.turn++
                this.turnTimer=20
                this.hand.discard()
                while(this.turn>0&&(this.combatants[this.turn].type<=0||this.combatants[this.turn].life<=0)){
                    this.turn++
                    if(this.turn>=this.combatants.length){
                        this.turn=0
                    }
                }
            }
        }
    }
}