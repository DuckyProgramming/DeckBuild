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
        this.combatants.push(new combatant(this.layer,this,100,350,this.player,0,0))
        this.choice={cards:[]}
        this.mana={main:3,max:3,base:3}
        this.anim={turn:0,lost:0,end:0}
        this.deck.initial(this.player)
        this.turn=0
        this.turnTimer=0
        this.drawAmount=5
        this.calc={list:[]}
        this.remember=[0,0,0,0]
        this.currency={money:100}
        this.generation={combatants:[],reinforce:[],threshold:[]}
        this.objective=[]
        this.counter={}
        this.end=false
        this.map={main:[],complete:[],scroll:0,scrollGoal:100,position:[0,0]}
    }
    create(){
        this.end=false
        this.counter={enemies:{dead:0,total:0},turn:1}
        this.anim.lost=0
        this.anim.end=0
        this.combatants[0].resetUnique()
        while(this.combatants.length>1){
            this.combatants.splice(this.combatants.length-1,1)
        }
        for(e=0,le=this.generation.combatants.length;e<le;e++){
            this.combatants.push(new combatant(this.layer,this,300+e*100,350,this.generation.combatants[e],1,e+1))
        }
        for(e=0,le=this.combatants.length;e<le;e++){
            if(this.combatants[e].type!=0){
                this.combatants[e].fade=1
                if(e>0){
                    this.combatants[e].setupIntent(-1)
                    this.counter.enemies.total++
                }
            }
        }
        this.counter.enemies.total+=this.generation.reinforce.length
        this.mana.max=this.mana.base
        this.mana.main=this.mana.max
        this.initialReserve()
        this.reserve.shuffle()
        this.drawInitial()
        for(e=0,le=this.drawAmount-this.hand.cards.length;e<le;e++){
            this.draw()
        }
    }
    initialReserve(){
        for(e=0,le=this.deck.cards.length;e<le;e++){
            this.reserve.cards.push(copyCard(this.deck.cards[e]))
        }
    }
    drawInitial(){
        for(e=0,e<this.reserve.cards.length;e<le;e++){
            if(this.reserve.cards[e].spec==7||this.reserve.cards[e].spec==8||this.reserve.cards[e].spec==10){
                this.hand.cards.push(copyCard(this.reserve.cards[e]))
                this.reserve.cards.splice(e,1)
                e--
                le--
            }
        }
    }
    draw(){
        if(this.reserve.cards.length>0){
            switch(this.reserve.cards[0].attack){
                case -9:
                    this.mana.main--
                break
            }
            this.hand.cards.push(copyCard(this.reserve.cards[0]))
            this.reserve.cards.splice(0,1)
        }
        if(this.reserve.cards.length<=0){
            this.return()
        }
    }
    return(){
        while(this.discard.cards.length>0){
            if(this.discard.cards[0].spec!=6){
                this.reserve.cards.push(copyCard(this.discard.cards[0]))
                this.reserve.cards[this.reserve.cards.length-1].position.x=1206
            }
            this.discard.cards.splice(0,1)
        }
    }
    removeCard(index){
        if(this.deck.cards[index].attack==-8){
            this.combatants[0].base.life-=3
            this.combatants[0].life-=3
        }
        this.deck.cards.splice(index,1)
    }
    endTurn(){
        this.mana.main=this.mana.max
        this.mana.main+=this.combatants[0].status.main[1]
        this.remember=[0,0,0,0]
        this.remember[0]+=this.combatants[0].status.main[4]
        this.remember[1]+=this.combatants[0].status.main[7]
        this.remember[3]+=this.combatants[0].status.main[8]
        for(e=0,le=this.combatants.length;e<le;e++){
            this.combatants[e].block=0
            this.combatants[e].setupIntent(-1)
            for(f=0,lf=this.combatants[e].status.main.length;f<lf;f++){
                if(f==11&&this.combatants[e].status.main[f]>0){
                    this.combatants[e].take(this.combatants[e].status.main[f],e)
                    this.combatants[e].status.main[f]--
                }else{
                    this.combatants[e].status.main[f]=0
                }
            }
        }
        this.combatants[0].boost.main[0]+=this.remember[0]-this.remember[1]
        this.combatants[0].boost.main[1]+=this.remember[2]-this.remember[3]
    }
    playCard(){
        for(g=0,lg=this.hand.cards.length;g<lg;g++){
            if(this.hand.cards[g].attack==-2){
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
    allExhaust(){
        for(g=0,lg=this.hand.cards.length;g<lg;g++){
            if(!this.hand.cards[g].trigger){
                this.hand.cards[g].used=true
                this.hand.cards[g].exhaust=true
            }
        }
    }
    allUpgrade(){
        this.hand.allUpgrade()
        this.reserve.allUpgrade()
        this.discard.allUpgrade()
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
        this.layer.noStroke()
        this.layer.fill(255,225,0)
        this.layer.ellipse(20,16,16,16)
        this.layer.fill(255,240,0)
        this.layer.ellipse(20,16,10,10)
        this.layer.fill(0,this.anim.lost)
        this.layer.textSize(64)
        this.layer.text('Defeat',this.layer.width/2,150)
        this.layer.fill(255,225,0)
        this.layer.textSize(16)
        this.layer.textAlign(LEFT,CENTER)
        this.layer.text(this.currency.money,30,18)
        this.layer.fill(80,1-this.anim.end)
        this.layer.rect(740,this.objective.length*10+10,300,this.objective.length*20,10)
        this.layer.fill(80,this.anim.end)
        this.layer.rect(450,this.objective.length*30+100,450,this.objective.length*60+20,10)
        this.layer.rect(450,this.objective.length*60+140,150,40,10)
        if(this.anim.end<1){
            this.layer.textSize(12)
            for(e=0,le=this.objective.length;e<le;e++){
                if(this.objective[e][0]==1&&this.counter.turn>this.objective[e][1]){
                    this.layer.fill(150,1-this.anim.end)
                }else{
                    this.layer.fill(255,1-this.anim.end)
                }
                switch(this.objective[e][0]){
                    case 0:
                        this.layer.text('Defeat Enemies ('+this.counter.enemies.dead+'/'+this.counter.enemies.total+')',640,e*20+20)
                    break
                    case 1:
                        this.layer.text('Complete Mission in '+this.objective[e][1]+' Turns ('+this.counter.turn+')',640,e*20+20)
                    break
                }
                switch(this.objective[e][2]){
                    case 0:
                        this.layer.text('Card',600,e*20+20)
                    break
                    case 1:
                        this.layer.text('Card+',600,e*20+20)
                    break
                    case 2:
                        this.layer.text('$'+this.objective[e][3],600,e*20+20)
                    break
                }
            }
        }
        this.layer.textAlign(CENTER,CENTER)
        if(this.anim.end>0){
            this.layer.textSize(18)
            this.layer.fill(255,this.anim.end)
            this.layer.text('End',450,this.objective.length*60+140)
            for(e=0,le=this.objective.length;e<le;e++){
                if(this.objective[e][0]==1&&this.counter.turn>this.objective[e][1]){
                    this.layer.fill(150,this.anim.end)
                }else{
                    this.layer.fill(255,this.anim.end)
                }
                switch(this.objective[e][0]){
                    case 0:
                        this.layer.text('Defeat Enemies ('+this.counter.enemies.dead+'/'+this.counter.enemies.total+')',450,e*60+120)
                    break
                    case 1:
                        this.layer.text('Complete Mission in '+this.objective[e][1]+' Turns ('+this.counter.turn+')',450,e*60+120)
                    break
                }
                switch(this.objective[e][2]){
                    case 0:
                        this.layer.text('New Card',450,e*60+150)
                    break
                    case 1:
                        this.layer.text('New Upgraded Card',450,e*60+150)
                    break
                    case 2:
                        this.layer.text('Gain $'+this.objective[e][3],450,e*60+150)
                    break
                }
            }
        }
    }
    setupChoice(level,rarity,spec){
        this.choice.cards=[]
        switch(spec){
            case 0:
                for(g=0;g<3;g++){
                    h=listing.card[this.player][rarity][floor(random(0,listing.card[this.player][rarity].length))]
                    this.choice.cards.push(new card(this.layer,225+g*225,300,h,level,types.card[h].list))
                }
            break
        }
        for(g=0,lg=this.choice.cards.length;g<lg;g++){
            this.choice.cards[g].size=1
        }
    }
    displayChoice(){
        this.layer.noStroke()
        this.layer.fill(80)
        this.layer.rect(450,450,80,40,5)
        this.layer.fill(0)
        this.layer.textSize(60)
        this.layer.text('Add a Card',450,150)
        this.layer.textSize(20)
        this.layer.text('Skip',450,450)
        for(e=0,le=this.choice.cards.length;e<le;e++){
            this.choice.cards[e].display()
        }
    }
    setupMap(){
        this.map.main=[]
        this.map.complete=[]
        for(e=0;e<15;e++){
            this.map.main.push([])
            this.map.complete.push([])
        }
        for(e=0,le=this.map.main.length;e<le;e++){
            for(f=0;f<min(5,8-abs(7-e));f++){
                if(floor(random(0,5))<2||e<2){
                    this.map.main[e].push(0)
                }else if(floor(random(0,3))==0){
                    this.map.main[e].push(1)
                }else if(floor(random(0,2))==0){
                    this.map.main[e].push(2)
                }else{
                    this.map.main[e].push(3)
                }
                this.map.complete[e].push(0)
            }
        }
    }
    displayMap(){
        this.layer.stroke(150)
        this.layer.strokeWeight(3)
        for(e=0,le=this.map.main.length-1;e<le;e++){
            for(f=0,lf=this.map.main[e].length;f<lf;f++){
                for(g=0,lg=this.map.main[e+1].length;g<lg;g++){
                    if((g==f||g==f+1)&&this.map.main[e].length==this.map.main[e+1].length-1||(g==f-1||g==f||g==f+1)&&this.map.main[e].length==this.map.main[e+1].length||(g==f-1||g==f)&&this.map.main[e].length==this.map.main[e+1].length+1){
                        this.layer.line(530-this.map.main[e].length*80+f*160,300+e*100-this.map.scroll,530-this.map.main[e+1].length*80+g*160,400+e*100-this.map.scroll)
                    }
                }
            }
        }
        this.layer.noStroke()
        this.layer.textSize(20)
        for(e=0,le=this.map.main.length;e<le;e++){
            for(f=0,lf=this.map.main[e].length;f<lf;f++){
                if(this.map.complete[e][f]==1){
                    this.layer.fill(100,255,100)
                }else{
                    this.layer.fill(255)
                }
                switch(this.map.main[e][f]){
                    case 0:
                        this.layer.text('Battle',530-this.map.main[e].length*80+f*160,300+e*100-this.map.scroll)
                    break
                    case 1:
                        this.layer.text('Elite',530-this.map.main[e].length*80+f*160,300+e*100-this.map.scroll)
                    break
                    case 2:
                        this.layer.text('Rest',530-this.map.main[e].length*80+f*160,300+e*100-this.map.scroll)
                    break
                    case 3:
                        this.layer.text('Event',530-this.map.main[e].length*80+f*160,300+e*100-this.map.scroll)
                    break
                }
            }
        }
        this.layer.fill(255,225,0)
        this.layer.ellipse(20,16,16,16)
        this.layer.fill(255,240,0)
        this.layer.ellipse(20,16,10,10)
        this.layer.fill(255,225,0)
        this.layer.textSize(16)
        this.layer.textAlign(LEFT,CENTER)
        this.layer.text(this.currency.money,30,18)
        this.layer.textAlign(CENTER,CENTER)
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
        if(this.end){
            if(this.anim.end<1){
                this.anim.end=round(this.anim.end*5+1)/5
            }
        }else if(this.combatants[0].life<=0){
            if(this.turn==0){
                this.turn=-1
                this.hand.discard()
            }
            if(this.anim.lost<1){
                this.anim.lost=round(this.anim.lost*5+1)/5
            }
        }else if(this.turn>0){
            if(this.turnTimer>0){
                this.turnTimer--
            }else if(this.combatants[this.turn].status.main[5]>0||this.combatants[this.turn].status.main[9]>0){
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
                this.counter.enemies.alive=0
                for(e=1,le=this.combatants.length;e<le;e++){
                    if(this.combatants[e].life>0){
                        this.counter.enemies.alive++
                    }
                }
                if(this.counter.enemies.alive<this.generation.threshold&&this.generation.reinforce.length>0){
                    e=1
                    while(e<this.combatants.length){
                        if(this.combatants[e].type==0){
                            this.combatants[e]=new combatant(this.layer,this,200+e*100,350,this.generation.reinforce[0],1,e)
                            this.generation.reinforce.splice(0,1)
                            break
                        }
                        e++
                    }
                }
                this.counter.turn++
                this.reserve.shuffle()
                for(e=0,le=this.drawAmount-this.hand.cards.length;e<le;e++){
                    this.draw()
                }
                for(e=0,le=this.hand.cards.length;e<le;e++){
                    this.hand.cards[e].position.y=500
                }
                this.endTurn()
            }
        }
    }
    updateMap(){
        if(this.map.scroll<this.map.scrollGoal){
            this.map.scroll+=10
        }
    }
    onClick(){
        if(this.end){
            if(pointInsideBox({position:inputs.rel},{position:{x:450,y:this.objective.length*60+140},width:150,height:40})){
                transition.trigger=true
                transition.scene='map'
                this.map.complete[this.map.position[0]][this.map.position[1]]=1
                for(e=0,le=this.objective.length;e<le;e++){
                    if(this.objective[e][0]==0||this.objective[e][0]==1&&this.counter.turn<=this.objective[e][1]){
                        switch(this.objective[e][2]){
                            case 0:
                                transition.scene='choice'
                                this.setupChoice(0,0,0)
                            break
                            case 1:
                                transition.scene='choice'
                                this.setupChoice(1,0,0)
                            break
                            case 2:
                                this.currency.money+=this.objective[e][3]
                            break
                        }
                    }
                }
            }
        }else if(this.turn==0&&this.combatants[0].life>0){
            this.hand.onClickHand()
            if(pointInsideBox({position:inputs.rel},{position:{x:-68+this.anim.turn*100,y:565},width:40,height:30})){
                this.hand.discard()
                this.counter.enemies.alive=0
                for(e=1,le=this.combatants.length;e<le;e++){
                    if(this.combatants[e].life>0){
                        this.counter.enemies.alive++
                    }
                }
                if(this.counter.enemies.alive<=0&&this.generation.reinforce.length<=0){
                    this.end=true
                }else{
                    this.turn++
                    this.turnTimer=20
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
    onClickChoice(){
        if(!transition.trigger){
            if(pointInsideBox({position:inputs.rel},{position:{x:450,y:450},width:80,height:40})){
                transition.trigger=true
                transition.scene='map'
            }
            for(e=0,le=this.choice.cards.length;e<le;e++){
                if(pointInsideBox({position:inputs.rel},this.choice.cards[e])){
                    transition.trigger=true
                    transition.scene='map'
                    this.deck.add(this.choice.cards[e].type,this.choice.cards[e].level,this.choice.cards[e].color)
                }
            }
        }
    }
    onClickMap(){
        if(!transition.trigger){
            for(e=0,le=this.map.main.length;e<le;e++){
                for(f=0,lf=this.map.main[e].length;f<lf;f++){
                    if(dist(inputs.rel.x,inputs.rel.y,530-this.map.main[e].length*80+f*160,300+e*100-this.map.scroll)<50&&e==this.map.position[0]+1&&((f==this.map.position[1]||f==this.map.position[1]+1)&&this.map.main[this.map.position[0]].length==this.map.main[e].length-1||(f==this.map.position[1]-1||f==this.map.position[1]||f==this.map.position[1]+1)&&this.map.main[this.map.position[0]].length==this.map.main[e+1].length||(f==this.map.position[1]-1||f==this.map.position[1])&&this.map.main[this.map.position[0]].length==this.map.main[e].length+1)){
                        this.map.position[0]=e
                        this.map.position[1]=f
                        this.map.scrollGoal+=100
                        transition.trigger=true
                        switch(this.map.main[e][f]){
                            case 0:
                                transition.scene='battle'
                                setupEncounter(current,1)
                                this.create()
                            break
                        }
                    }
                }
            }
        }
    }
}