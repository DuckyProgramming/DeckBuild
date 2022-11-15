class battle{
    constructor(layer,player){
        this.layer=layer
        this.player=player
        this.hand=new group(this.layer,this,0)
        this.reserve=new group(this.layer,this,1)
        this.deck=new group(this.layer,this,2)
        this.discard=new group(this.layer,this,3)
        this.drop=new group(this.layer,this,4)
        this.attack=new attack(this.layer,this,5)
        this.particles=[]
        this.combatants=[]
        this.combatants.push(new combatant(this.layer,this,100,350,this.player,0,0))
        this.choice={cards:[]}
        this.mana={main:3,gen:3,max:3,base:3}
        this.anim={turn:0,lost:0,end:0}
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
        this.map={main:[],complete:[],scroll:0,scrollGoal:100,position:[0,0],zone:0}
        this.restOptions=[1,2]
        this.context=0
        this.context2=0
        this.eventList=[]
        this.event=0
        this.page=0
        this.discarding=0
        this.costs={card:[[0,0,0,0,0],[0,0]],sale:0,remove:0}
        this.relics={list:[[],[],[]],owned:[],active:[]}
        this.random={rested:false,attacked:0,taken:0,attacks:0,skills:0,played:0}
        this.deck.initial(this.player)
    }
    create(){
        this.end=false
        this.counter={enemies:{dead:0,total:0,alive:0},turn:1,played:0,turn:0,taken:0}
        this.anim.lost=0
        this.anim.end=0
        this.discarding=0
        this.random.attacked=0
        this.random.taken=0
        this.random.attacks=0
        this.random.played=0
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
                for(f=0,lf=this.combatants[e].boost.main.length;f<lf;f++){
                    this.combatants[e].boost.main[f]=0
                }
                for(f=0,lf=this.combatants[e].status.main.length;f<lf;f++){
                    this.combatants[e].status.main[f]=0
                }
            }
        }
        for(e=0,le=this.deck.cards.length;e<le;e++){
            this.deck.cards[e].position.x=1206
            this.deck.cards[e].position.y=500
        }
        this.counter.enemies.total+=this.generation.reinforce.length
        this.reserve.cards=[]
        this.hand.cards=[]
        this.drop.cards=[]
        this.initialReserve()
        this.reserve.shuffle()
        this.mana.max=this.mana.base
        this.mana.main=this.mana.max
        this.drawInitial()
        this.turnDraw()
    }
    initialEvent(){
        this.costs.card=[[0,0,0,0,0],[0,0]]
        this.costs.sale=0
        this.costs.remove=80
        for(g=0,lg=zones[this.map.zone].events[0].length;g<lg;g++){
            this.eventList.push(zones[this.map.zone].events[0][g])
        }
        for(g=0,lg=zones[this.map.zone].events[this.player].length;g<lg;g++){
            this.eventList.push(zones[this.map.zone].events[this.player][g])
        }
        for(g=0,lg=types.relic.length;g<lg;g++){
            if(g>=1&&types.relic[g].rarity>=0&&(types.relic[g].list==0||types.relic[g].list==this.player)){
                this.relics.list[types.relic[g].rarity].push(g)
            }
            this.relics.active.push(false)
        }
    }
    initialReserve(){
        this.reserve.cards=[]
        this.hand.cards=[]
        this.discard.cards=[]
        for(e=0,le=this.deck.cards.length;e<le;e++){
            this.reserve.cards.push(copyCard(this.deck.cards[e]))
        }
    }
    drawInitial(){
        for(e=0,le=this.reserve.cards.length;e<le;e++){
            if(this.reserve.cards[e].spec==7||this.reserve.cards[e].spec==8||this.reserve.cards[e].spec==10){
                this.hand.cards.push(copyCard(this.reserve.cards[e]))
                this.hand.cards[this.hand.cards.length-1].position.x=1206
                this.hand.cards[this.hand.cards.length-1].position.y=500
                this.reserve.cards.splice(e,1)
                e--
                le--
            }
        }
        if(this.relics.active[1]){
            this.hand.add(findCard('Redraw'),0,0)
        }
        if(this.relics.active[5]){
            this.hand.add(findCard('Miracle'),0,0)
        }
        if(this.relics.active[6]){
            this.combatants[0].status.main[30]+=8
        }
        if(this.relics.active[7]){
            this.combatants[0].block+=10
        }
        if(this.relics.active[8]&&this.random.rested){
            this.mana.main+=2
        }
        if(this.relics.active[10]){
            for(e=1,le=this.combatants.length;e<le;e++){
                this.combatants[e].boost.main[1]--
            }
        }
        if(this.relics.active[16]){
            this.mana.main++
        }
        if(this.relics.active[20]){
            this.combatants[0].boost.main[2]++
        }
        if(this.relics.active[28]){
            this.combatants[0].boost.main[0]++
        }
        if(this.relics.active[36]){
            this.combatants[0].boost.main[3]++
        }
        this.startTurn()
        this.random.rested=false
        if(this.relics.active[4]){
            this.draw()
            this.draw()
        }
    }
    turnDraw(){
        for(e=0,le=this.drawAmount;e<le;e++){
            this.draw()
        }
        if(this.relics.active[2]){
            this.hand.add(findCard('Step'),0,0)
        }
        if(this.relics.active[29]){
            e=floor(random(0,this.hand.cards.length))
            if(this.hand.cards[e].level==0){
                this.hand.cards[e].level++
            }
            this.hand.cards[e]=reformCard(this.hand.cards[e])
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
            this.hand.cards[this.hand.cards.length-1].position.x=1206
            this.hand.cards[this.hand.cards.length-1].position.y=500
            this.reserve.cards.splice(0,1)
        }else{
            this.hand.add(findCard('Empty'),0,0)
        }
        if(this.reserve.cards.length<=0){
            this.return()
            this.reserve.shuffle()
        }
    }
    getRelic(type){
        this.relics.owned.push(type)
        this.relics.active[type]=true
        switch(type){
            case 26:
                this.combatants[0].base.life+=7
                this.combatants[0].life+=7
            break
            case 30: case 31: case 32:
                for(h=0;h<2;h++){
                    this.calc.list=[]
                    for(g=0,lg=this.deck.cards.length;g<lg;g++){
                        if(this.deck.cards[g].class==type-30&&this.deck.cards[g].level==0){
                            this.calc.list.push(g)
                        }
                    }
                    if(this.calc.list.length>0){
                        g=floor(random(0,this.calc.list.length))
                        if(this.deck.cards[this.calc.list[g]].level==0){
                            this.deck.cards[this.calc.list[g]].level++
                        }
                        this.deck.cards[this.calc.list[g]]=reformCard(this.deck.cards[this.calc.list[g]])
                    }
                }
            break
            case 37:
                this.combatants[0].base.meter+=2
            break
            case 54:
                this.combatants[0].base.life+=10
                this.combatants[0].life+=10
            break
            case 57:
                this.restOptions.push(3)
            break
        }
    }
    return(){
        while(this.discard.cards.length>0){
            if(this.discard.cards[0].spec!=6&&this.discard.cards[0].spec!=13){
                this.reserve.cards.push(copyCard(this.discard.cards[0]))
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
        this.counter.turn++
        this.discarding=0
        this.mana.main=min(this.mana.max,this.mana.main+this.mana.gen)
        this.mana.main+=this.combatants[0].status.main[1]
        this.remember=[0,0,0,0]
        if(this.combatants[0].status.main[19]>0){
            this.combatants[0].life=0
        }
        this.remember[0]+=this.combatants[0].status.main[4]
        this.remember[1]+=this.combatants[0].status.main[7]
        this.remember[3]+=this.combatants[0].status.main[8]
        this.combatants[0].mantra+=this.combatants[0].status.main[20]
        for(e=0,le=this.combatants.length;e<le;e++){
            this.combatants[e].block=0
            this.combatants[e].setupIntent(-1)
            for(f=0,lf=this.combatants[e].boost.main.length;f<lf;f++){
                if(this.combatants[e].boost.main[f]>0){
                    this.combatants[e].boost.main[f]=max(0,this.combatants[e].boost.main[f]-1)
                }
                if(this.combatants[e].boost.main[f]<0){
                    this.combatants[e].boost.main[f]=min(0,this.combatants[e].boost.main[f]+1)
                }
            }
            for(f=0,lf=this.combatants[e].status.main.length;f<lf;f++){
                if(this.combatants[e].status.main[f]>0&&f==24){
                    this.combatants[e].take(this.combatants[e].status.main[f],e)
                }
                if(f==11&&this.combatants[e].status.main[f]>0){
                    this.combatants[e].take(this.combatants[e].status.main[f],e)
                    this.combatants[e].status.main[f]--
                }else if(f!=14&&f!=15&&f!=18&&f!=20&&f!=21&&f!=22&&f!=23&&f!=30){
                    this.combatants[e].status.main[f]=0
                }
            }
        }
        this.combatants[0].boost.main[0]+=this.remember[0]-this.remember[1]
        this.combatants[0].boost.main[1]+=this.remember[2]-this.remember[3]
        for(e=0;e<this.combatants[0].status.main[14];e++){
            this.hand.add(findCard('Smite'),0,0)
        }
        for(e=0;e<this.combatants[0].status.main[21];e++){
            this.hand.add(findCard('Shiv'),0,0)
        }
        if(this.relics.active[9]&&this.random.attacked<=0){
            this.mana.main++
        }
        if(this.relics.active[45]&&this.counter.turn==2){
            this.combatants[0].block+=14
        }
        this.startTurn()
        this.counter.played=0
        this.random.attacked=0
    }
    startTurn(){
        if(this.relics.active[15]&&this.counter.turn%3==0){
            this.mana.main++
        }
        if(this.relics.active[33]&&this.combatants[0].life<this.combatants[0].base.life/2){
            this.combatants[0].boost.main[0]++
        }
        if(this.relics.active[35]){
            this.combatants[0].mantra++
        }
        if(this.relics.active[50]){
            for(g=1,lg=this.combatants.length;g<lg;g++){
                this.combatants[g].take(3,0)
            }
        }
    }
    playCard(){
        this.counter.played++
        this.random.played++
        if(this.counter.played>=3){
            for(g=0,lg=this.hand.cards.length;g<lg;g++){
                if(this.hand.cards[g].attack==-11){
                    this.allDiscard()
                }
            }
        }else if(this.attack.class==0){
            this.combatants[0].status.main[24]=0
            for(g=0,lg=this.hand.cards.length;g<lg;g++){
                if(this.hand.cards[g].attack==-12){
                    this.allDiscard()
                }
            }
        }
        if(this.attack.class==0){
            this.random.attacked++
            this.random.attacks++
            this.combatants[0].status.main[24]=0
            if(this.random.attacks%10==0&&this.relics.active[22]){
                this.mana.main++
            }
            if(this.random.attacks%3==0&&this.relics.active[47]){
                this.combatants[0].boost.main[2]++
            }
            if(this.random.attacks%3==0&&this.relics.active[52]){
                this.combatants[0].block+=4
            }
            if(this.random.attacks%3==0&&this.relics.active[56]){
                this.combatants[0].boost.main[0]++
            }
        }
        if(this.attack.class==1){
            this.random.skills++
            if(this.random.skills%3==0&&this.relics.active[48]){
                for(g=1,lg=this.combatants.length;g<lg;g++){
                    this.combatants[g].take(5,0)
                }
            }
        }
        if(this.attack.class==2){
            if(this.relics.active[51]&&this.hand.cards.length>0){
                g=floor(random(0,this.hand.cards.length))
                if(this.hand.cards[g].cost>0){
                    this.hand.cards[g].cost--
                }
            }
        }
        for(g=0,lg=this.hand.cards.length;g<lg;g++){
            if(this.hand.cards[g].attack==-2){
                this.combatants[0].take(1,0)
            }
            if(this.hand.cards[g].attack==149){
                this.hand.cards[g].used=true
            }
        }
        if(this.random.played%10==0&&this.relics.active[46]){
            this.draw()
        }
        if(this.combatants[0].status.main[22]>0){
            for(g=1,lg=this.combatants.length;g<lg;g++){
                this.combatants[g].take(this.combatants[0].status.main[22],0)
            }
        }
        if(this.combatants[0].status.main[23]>0){
            this.combatants[0].block+=this.combatants[0].status.main[23]
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
    close(){
        this.hand.discard()
        this.turn++
        this.turnTimer=20
        if(this.combatants[0].stance==3){
            this.combatants[0].changeStance(0)
            if(this.combatants[0].mantra>=12){
                this.combatants[0].changeStance(3)
				this.combatants[0].mantra-=12
            }
        }
        while(this.turn>0&&(this.combatants[this.turn].type<=0||this.combatants[this.turn].life<=0)){
            this.turn++
            if(this.turn>=this.combatants.length){
                this.turn=0
            }
        }
    }
    displayRelics(){
        for(e=0,le=this.relics.owned.length;e<le;e++){
            displayRelicSymbol(this.layer,25+e*50,50,this.relics.owned[e],0,1,1,this.relics.active[this.relics.owned[e]])
            if(dist(inputs.rel.x,inputs.rel.y,25+e*50,50)<20){
                this.layer.noStroke()
                this.layer.fill(180)
                this.layer.rect(130,110,240,60,5)
                this.layer.fill(0)
                this.layer.textSize(12)
                this.layer.text(types.relic[this.relics.owned[e]].desc,130,110)
            }
        }
    }
    display(){
        for(e=0,le=this.combatants.length;e<le;e++){
            this.combatants[e].display(0)
        }
        this.layer.noStroke()
        this.layer.fill(80,85,90)
        this.layer.rect(450,475,910,250)
        this.layer.fill(200,225,250,this.fade)
        this.layer.stroke(150,200,250,this.fade)
        this.layer.strokeWeight(6)
        this.layer.quad(-92+this.anim.turn*100,390,-68+this.anim.turn*100,358,-44+this.anim.turn*100,390,-68+this.anim.turn*100,422)
        switch(this.player){
            case 1:
                this.layer.fill(160,200,160)
                this.layer.stroke(120,160,120)
            break
            case 2:
                this.layer.fill(200,120,160)
                this.layer.stroke(160,80,120)
            break
            case 3:
                this.layer.fill(240,200,160)
                this.layer.stroke(200,160,120)
            break
            case 4:
                this.layer.fill(220,200,240)
                this.layer.stroke(180,160,200)
            break
        }
        this.layer.strokeWeight(5)
        this.layer.rect(-68+this.anim.turn*100,525,40,30,5)
        this.layer.rect(-68+this.anim.turn*100,565,40,30,5)
        this.layer.fill(0,this.fade)
        this.layer.noStroke()
        this.layer.textSize(10)
        this.layer.text(this.mana.gen,-68+this.anim.turn*100,370)
        this.layer.textSize(20)
        this.layer.text(this.mana.main+'/'+this.mana.max,-68+this.anim.turn*100,390)
        this.layer.textSize(12)
        this.layer.text('Discard',-68+this.anim.turn*100,525)
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
        this.displayRelics()
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
                if(this.objective[e][0]==1&&this.counter.turn>this.objective[e][1]||this.objective[e][0]==2&&this.counter.taken>=this.objective[e][1]){
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
                    case 2:
                        this.layer.text('Take Less Than '+this.objective[e][1]+' Damage ('+this.counter.taken+')',640,e*20+20)
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
                    case 3:
                        this.layer.text(this.objective[e][3]+' HP',600,e*20+20)
                    break
                    case 4:
                        this.layer.text('Relic',600,e*20+20)
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
                if(this.objective[e][0]==1&&this.counter.turn>this.objective[e][1]||this.objective[e][0]==2&&this.counter.taken>=this.objective[e][1]){
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
                    case 2:
                        this.layer.text('Take Less Than '+this.objective[e][1]+' Damage ('+this.counter.taken+')',450,e*60+120)
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
                    case 3:
                        this.layer.text('Heal '+this.objective[e][3]+' Health',450,e*60+150)
                    break
                    case 4:
                        this.layer.text('New Relic',450,e*60+150)
                    break
                }
            }
        }
    }
    update(){
        if(this.relics.active[34]&&this.combatants[0].combo==0){
            this.combatants[0].combo=1
        }
        this.counter.enemies.alive=0
        for(e=1,le=this.combatants.length;e<le;e++){
            if(this.combatants[e].life>0){
                this.counter.enemies.alive++
            }
        }
        if(this.counter.enemies.alive<=0&&this.generation.reinforce.length<=0){
            this.end=true
        }
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
        }else if(this.turn>100){
            if(this.turnTimer>0){
                this.turnTimer--
            }else if(this.turn>=this.combatants.length+100||this.combatants[this.turn-100].status.main[5]>0||this.combatants[this.turn-100].status.main[9]>0){
                this.turn=0
            }else{
                this.attack.user=this.turn-100
                this.attack.damage=round(this.combatants[this.turn-100].damage[this.combatants[this.turn-100].intent]*(2+max(0,this.combatants[this.turn-100].boost.main[0]))/(2-min(0,this.combatants[this.turn-100].boost.main[0])))
                this.attack.alt=this.combatants[this.turn-100].altAttack[this.combatants[this.turn-100].intent]
                this.attack.update(this.combatants[this.turn-100].attacks[this.combatants[this.turn-100].intent],0,1)
                this.turn=200
            }
        }else if(this.turn>0){
            if(this.turnTimer>0){
                this.turnTimer--
            }else if(this.turn>=this.combatants.length){
                this.turn=0
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
                this.turnDraw()
                for(e=0,le=this.hand.cards.length;e<le;e++){
                    this.hand.cards[e].position.y=500
                }
                this.endTurn()
            }else if(this.combatants[this.turn].status.main[5]>0||this.combatants[this.turn].status.main[9]>0){
                this.turn++
                while(this.turn>0&&this.turn<this.combatants.length&&(this.combatants[this.turn].type<=0||this.combatants[this.turn].life<=0)){
                    this.turn++
                }
                if(this.turn>=this.combatants.length){
                    this.turnTimer=30
                }
            }else{
                this.attack.user=this.turn
                this.attack.damage=round(this.combatants[this.turn].damage[this.combatants[this.turn].intent]*(2+max(0,this.combatants[this.turn].boost.main[0]))/(2-min(0,this.combatants[this.turn].boost.main[0])))
                this.attack.alt=this.combatants[this.turn].altAttack[this.combatants[this.turn].intent]
                this.attack.update(this.combatants[this.turn].attacks[this.combatants[this.turn].intent],0,1)
                this.turnTimer=20
                this.turn++
                while(this.turn>0&&this.turn<this.combatants.length&&(this.combatants[this.turn].type<=0||this.combatants[this.turn].life<=0)){
                    this.turn++
                }
            }
        }
    }
    onClick(){
        if(this.end){
            if(pointInsideBox({position:inputs.rel},{position:{x:450,y:this.objective.length*60+140},width:150,height:40})){
                transition.trigger=true
                transition.scene='map'
                this.map.complete[this.map.position[0]][this.map.position[1]]=1
                if(this.relics.active[3]){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+2)
                }
                if(this.relics.active[49]&&this.combatants[0].life<this.combatants[0].base.life/2){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+12)
                }
                for(e=0,le=this.objective.length;e<le;e++){
                    if(this.objective[e][0]==0||this.objective[e][0]==1&&this.counter.turn<=this.objective[e][1]||this.objective[e][0]==2&&this.counter.taken<this.objective[e][1]){
                        switch(this.objective[e][2]){
                            case 0:
                                transition.scene='choice'
                                this.setupChoice(0,floor(random(0,1.5)),0)
                            break
                            case 1:
                                transition.scene='choice'
                                this.setupChoice(1,floor(random(0,1.5)),0)
                            break
                            case 2:
                                this.currency.money+=this.objective[e][3]
                            break
                            case 3:
                                this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+this.objective[e][3])
                            break
                            case 4:
                                g=floor(random(0,1.5))
                                f=floor(random(0,this.relics.list[g].length))
                                this.getRelic(this.relics.list[g][f])
                                this.relics.list[0].splice(f,1)
                            break
                        }
                    }
                }
            }
        }else if(this.turn==0&&this.combatants[0].life>0){
            this.hand.onClickHand()
            if(pointInsideBox({position:inputs.rel},{position:{x:-68+this.anim.turn*100,y:525},width:40,height:30})){
                transition.trigger=true
                transition.scene='deck'
                this.setupDeck(1)
                this.context=3
            }else if(pointInsideBox({position:inputs.rel},{position:{x:-68+this.anim.turn*100,y:565},width:40,height:30})){
                this.close()
            }
        }
    }
    setupChoice(level,rarity,spec){
        this.choice.cards=[]
        this.context=0
        switch(spec){
            case 0:
                this.calc.list=listing.card[this.player][rarity]
                if(this.relics.active[55]){
                    for(g=0;g<4;g++){
                        if(this.calc.list.length>0){
                            h=this.calc.list[floor(random(0,this.calc.list.length))]
                            this.choice.cards.push(new card(this.layer,180+g*180,300,h,level,types.card[h].list))
                            this.calc.list.splice(h,1)
                        }
                    }
                }else{
                    for(g=0;g<3;g++){
                        if(this.calc.list.length>0){
                            h=this.calc.list[floor(random(0,this.calc.list.length))]
                            this.choice.cards.push(new card(this.layer,225+g*225,300,h,level,types.card[h].list))
                            this.calc.list.splice(h,1)
                        }
                    }
                }
            break
            case 1:
                this.choice.cards.push(new card(this.layer,225,300,findCard('Uncontrolled\nPower'),level,this.player))
                this.choice.cards.push(new card(this.layer,450,300,findCard('This is\nPersonal'),level,this.player))
                this.choice.cards.push(new card(this.layer,675,300,findCard('Enraging\nBlow'),level,this.player))
            break
            case 2:
                h=listing.card[this.player][rarity][floor(random(0,listing.card[this.player][rarity].length))]
                this.choice.cards.push(new card(this.layer,450,300,h,level,types.card[h].list))
            break
        }
        for(g=0,lg=this.choice.cards.length;g<lg;g++){
            this.choice.cards[g].size=1
        }
    }
    displayChoice(){
        this.layer.noStroke()
        this.layer.fill(160)
        this.layer.rect(450,450,80,40,5)
        this.layer.fill(0)
        this.layer.textSize(60)
        this.layer.text('Add a Card',450,150)
        this.layer.textSize(20)
        this.layer.text('Skip',450,450)
        for(e=0,le=this.choice.cards.length;e<le;e++){
            this.choice.cards[e].display(this.deck.cards.length,this.drawAmount,0)
        }
    }
    onClickChoice(){
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
        if(transition.scene=='map'&&this.context==1){
            transition.scene='rest'
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
                if(e==this.map.main.length-1){
                    this.map.main[e].push(5)
                }else if(floor(random(0,5))<2||e<2){
                    this.map.main[e].push(0)
                }else if(floor(random(0,3))==0){
                    this.map.main[e].push(1)
                }else if(floor(random(0,4))==0){
                    this.map.main[e].push(2)
                }else if(floor(random(0,2))==0){
                    this.map.main[e].push(3)
                }else{
                    this.map.main[e].push(4)
                }
                this.map.complete[e].push(0)
            }
        }
    } 
    displayMap(){
        this.displayRelics()
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
        switch(this.player){
            case 1:
                this.layer.fill(160,200,160)
                this.layer.stroke(120,160,120)
            break
            case 2:
                this.layer.fill(200,120,160)
                this.layer.stroke(160,80,120)
            break
            case 3:
                this.layer.fill(240,200,160)
                this.layer.stroke(200,160,120)
            break
            case 4:
                this.layer.fill(220,200,240)
                this.layer.stroke(180,160,200)
            break
        }
        this.layer.strokeWeight(5)
        this.layer.rect(32,565,40,30,5)
        this.layer.fill(0,this.fade)
        this.layer.noStroke()
        this.layer.textSize(12)
        this.layer.text('Deck',32,565)
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
                    case 4:
                        this.layer.text('Shop',530-this.map.main[e].length*80+f*160,300+e*100-this.map.scroll)
                    break
                    case 5:
                        this.layer.text('Boss',530-this.map.main[e].length*80+f*160,300+e*100-this.map.scroll)
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
    updateMap(){
        if(this.map.scroll<this.map.scrollGoal){
            this.map.scroll+=10
        }
    }
    onClickMap(){
        if(pointInsideBox({position:inputs.rel},{position:{x:32,y:565},width:40,height:30})){
            transition.trigger=true
            transition.scene='deck'
            this.context=5
        }
        for(e=0,le=this.map.main.length;e<le;e++){
            for(f=0,lf=this.map.main[e].length;f<lf;f++){
                if(dist(inputs.rel.x,inputs.rel.y,530-this.map.main[e].length*80+f*160,300+e*100-this.map.scroll)<50&&e==this.map.position[0]+1&&((f==this.map.position[1]||f==this.map.position[1]+1)&&this.map.main[this.map.position[0]].length==this.map.main[e].length-1||(f==this.map.position[1]-1||f==this.map.position[1]||f==this.map.position[1]+1)&&this.map.main[this.map.position[0]].length==this.map.main[e].length||(f==this.map.position[1]-1||f==this.map.position[1])&&this.map.main[this.map.position[0]].length==this.map.main[e].length+1)){
                    this.map.position[0]=e
                    this.map.position[1]=f
                    this.map.scrollGoal+=100
                    transition.trigger=true
                    switch(this.map.main[e][f]){
                        case 0:
                            transition.scene='battle'
                            setupEncounter(current,zones[this.map.zone].encounters[floor(random(0,zones[this.map.zone].encounters.length))])
                            this.create()
                        break
                        case 1:
                            transition.scene='battle'
                            setupEncounter(current,zones[this.map.zone].elites[floor(random(0,zones[this.map.zone].elites.length))])
                            this.create()
                            if(this.relics.active[23]){
                                for(g=1,lg=this.combatants.length;g<lg;g++){
                                    this.combatants[g].life*=0.8
                                }
                            }
                        break
                        case 2:
                            if(this.relics.active[14]){
                                this.setupChoice(0,floor(random(0,1.5)),0)
                                this.context=1
                                transition.scene='choice'
                            }else{
                                transition.scene='rest'
                            }
                            this.random.rested=true
                            if(this.relics.active[40]){
                                this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+this.deck.cards.length/2)
                            }
                        break
                        case 3:
                            transition.scene='event'
                            e=this.eventList[floor(random(0,this.eventList.length))]
                            this.event=this.eventList[e]
                            this.eventList.splice(e,1)
                            this.page=0
                        break
                        case 4:
                            transition.scene='shop'
                            this.setupShop(0)
                            if(this.relics.active[17]){
                                this.relics.active[17]=false
                            }
                            if(this.relics.active[18]){
                                this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+15)
                            }
                        break
                        case 5:
                            transition.scene='battle'
                            setupEncounter(current,zones[this.map.zone].bosses[floor(random(0,zones[this.map.zone].bosses.length))])
                            this.create()
                            if(this.relics.active[53]){
                                this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+25)
                            }
                        break
                    }
                    if(this.relics.active[17]){
                        this.currency.money+=10
                    }
                }
            }
        }
    }
    displayRest(){
        this.combatants[0].display(1)
        this.layer.noStroke()
        this.layer.fill(80,85,90)
        this.layer.rect(450,475,910,250)
        this.combatants[0].displayInfo()
        this.layer.fill(160)
        for(e=0,le=this.restOptions.length;e<le;e++){
            this.layer.rect(525+e*150-le*75,300,120,60,5)
        }
        this.layer.fill(0)
        this.layer.textSize(60)
        this.layer.text('Rest Site',450,150)
        this.layer.textSize(20)
        for(e=0,le=this.restOptions.length;e<le;e++){
            switch(this.restOptions[e]){
                case 0:
                    this.layer.text('Skip',525+e*150-le*75,300)
                break
                case 1:
                    this.layer.text('Heal',525+e*150-le*75,300)
                break
                case 2:
                    this.layer.text('Train',525+e*150-le*75,300)
                break
                case 3:
                    this.layer.text('Gain Max\nHealth',525+e*150-le*75,300)
                break
            }
        }
    }
    updateRest(){
        this.combatants[0].update()
    }
    onClickRest(){
        if(!transition.trigger){
            for(e=0,le=this.restOptions.length;e<le;e++){
                if(pointInsideBox({position:inputs.rel},{position:{x:525+e*150-le*75,y:300},width:120,height:60})){
                    transition.trigger=true
                    this.map.complete[this.map.position[0]][this.map.position[1]]=1
                    switch(this.restOptions[e]){
                        case 0:
                            transition.scene='map'
                        break
                        case 1:
                            this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+this.combatants[0].base.life/5)
                            transition.scene='map'
                            if(this.relics.active[24]){
                                this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+15)
                            }
                        break
                        case 2:
                            transition.scene='deck'
                            this.context=1
                            this.setupDeck(1)
                        break
                        case 3:
                            this.combatants[0].base.life+=2
                            this.combatants[0].life+=2
                            transition.scene='map'
                        break
                    }
                }
            }
        }
    }
    setupDeck(context){
        this.deck.scroll=0
        this.deck.select=false
        if(context!=6){
            this.choice.cards=[]
            this.choice.cards.push(new card(this.layer,-300,0,0,0,0))
        }
        for(let g=0,lg=this.deck.cards.length;g<lg;g++){
            this.deck.cards[g].anim.select=0
        }
    }
    displayDeck(){
        if(this.context==1||this.context==4){
            this.deck.displayView(-1)
            this.choice.cards[0].display(this.deck.cards.length,this.drawAmount,0)
        }else if(this.context==2||this.context==3){
            this.discard.displayView(-1)
        }else if(this.context==5||this.context==6){
            this.deck.displayView(-1)
        }else if(this.context==7||this.context==8){
            this.reserve.displayView(this.context2)
        }
        this.layer.noStroke()
        this.layer.fill(80)
        this.layer.rect(850,570,80,40,5)
        this.layer.fill(0)
        this.layer.textSize(20)
        if(this.context==3||this.context==5||this.context==6){
            this.layer.text('Back',850,570)
        }else if(this.context==1||this.context==2||this.context==4||this.context==7||this.context==8){
            this.layer.text('Skip',850,570)
        }
        if(this.context==6){
            this.layer.fill(255,225,0)
            this.layer.ellipse(20,16,16,16)
            this.layer.fill(255,240,0)
            this.layer.ellipse(20,16,10,10)
            this.layer.fill(255,225,0)
            this.layer.textSize(16)
            this.layer.textAlign(LEFT,CENTER)
            this.layer.text(this.currency.money,30,18)
            this.layer.textAlign(RIGHT,CENTER)
            this.layer.text('Remove for '+this.costs.remove,890,18)
            this.layer.textAlign(CENTER,CENTER)
        }
    }
    updateDeck(){
        if(inputs.keys[0][2]||inputs.keys[1][2]){
            this.deck.scroll+=30
        }
        if(inputs.keys[0][3]||inputs.keys[1][3]){
            this.deck.scroll-=30
        }
        this.deck.scroll=constrain(this.deck.scroll,0,floor(this.deck.cards.length/6)*200-600)
        if(this.context==1||this.context==4||this.context==5||this.context==6){
            this.deck.updateView()
        }
    }
    onClickDeck(){
        if(pointInsideBox({position:inputs.rel},{position:{x:850,y:570},width:80,height:40})){
            transition.trigger=true
            if(this.context==1||this.context==4||this.context==5){
                transition.scene='map'
            }else if(this.context==2){
                this.close()
                transition.scene='battle'
            }else if(this.context==3||this.context==7){
                transition.scene='battle'
            }else if(this.context==6){
                transition.scene='shop'
            }else if(this.context==8){
                this.draw()
                transition.scene='battle'
            }
        }
        if(this.context==1||this.context==4||this.context==6){
            this.deck.onClickView(this.context,this.context2)
        }else if(this.context==2){
            this.discard.onClickView(this.context,this.context2)
        }else if(this.context==7||this.context==8){
            this.reserve.onClickView(this.context,this.context2)
        }
    }
    displayEvent(){
        this.combatants[0].display()
        this.layer.noStroke()
        this.layer.fill(80,85,90)
        this.layer.rect(450,475,910,250)
        this.layer.fill(160)
        for(e=0,le=types.event[this.event].pages[this.page].option.length;e<le;e++){
            this.layer.rect(450,350+e*60,200,50,5)
        }
        this.layer.fill(255)
        this.layer.textSize(45)
        this.layer.text(types.event[this.event].name,450,50)
        this.layer.textSize(15)
        this.layer.text(types.event[this.event].pages[this.page].desc,450,200)
        for(e=0,le=types.event[this.event].pages[this.page].option.length;e<le;e++){
            if(types.event[this.event].pages[this.page].optionDesc[e]==''){
                this.layer.text(types.event[this.event].pages[this.page].option[e],450,350+e*60)
            }else{
                this.layer.text(types.event[this.event].pages[this.page].option[e],450,340+e*60)
            }
        }
        this.layer.textSize(10)
        for(e=0,le=types.event[this.event].pages[this.page].option.length;e<le;e++){
            this.layer.text(types.event[this.event].pages[this.page].optionDesc[e],450,360+e*60)
        }
        this.combatants[0].displayInfo()
    }
    updateEvent(){
        this.combatants[0].update()
    }
    onClickEvent(){
        if(!transition.trigger){
            for(let e=0,le=types.event[this.event].pages[this.page].option.length;e<le;e++){
                if(pointInsideBox({position:inputs.rel},{position:{x:450,y:350+e*60},width:200,height:50})){
                    if(types.event[this.event].pages[this.page].link[e]==-1){
                        this.map.complete[this.map.position[0]][this.map.position[1]]=1
                        transition.trigger=true
                        transition.scene='map'
                    }
                    this.remember[0]=0
                    switch(types.event[this.event].id){
                        case 1:
                            if(this.page==0&&e==0){
                                this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-4)
                            }else if(this.page==1&&e==0){
                                transition.scene='choice'
                                this.setupChoice(0,1,0)
                            }
                        break
                        case 2:
                            if(this.page==1&&e==0){
                                this.currency.money+=100
                            }else if(this.page==2&&e==0){
                                this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+40)
                            }
                        break
                        case 3:
                            if(this.page==0&&e==0){
                                this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-10)
                            }else if(this.page==1&&e==0){
                                transition.scene='deck'
                                this.setupDeck(1)
                                this.context=1
                            }
                        break
                        case 4:
                            if(this.page==1&&e==0){
                                this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-20)
                                this.currency.money+=150
                            }else if(this.page==2&&e==0){
                                this.combatants[0].life=this.combatants[0].base.life
                            }
                        break
                        case 5:
                            if(this.page==0&&floor(random(0,3))==0){
                                this.remember[0]=1
                            }else if(this.page==1&&e==0){
                                this.currency.money+=50
                            }else if(this.page==2&&e==0){
                                this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-15)
                            }
                        break
                        case 6:
                            if(this.page==0&&e==0&&floor(random(0,4))==0){
                                this.remember[0]=1
                            }else if(this.page==1&&e==0){
                                this.setupChoice(0,0,1)
                                transition.scene='choice'
                            }else if(this.page==2&&e==0){
                                this.currency.money=0
                            }
                        break
                        case 7:
                            if((this.page==0||this.page==1)&&e==0&&floor(random(0,2))==0){
                                this.remember[0]=3-types.event[this.event].pages[this.page].link[e]
                            }else if((this.page==0||this.page==1)&&e==1){
                                setupEncounter(current,zones[0].special[0])
                                this.create()
                                transition.scene='battle'
                            }else if(this.page==3&&e==0){
                                this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-6)
                                setupEncounter(current,zones[0].special[0])
                                this.create()
                                transition.scene='battle'
                            }
                        break
                        case 8:
                            if(this.page==1&&e==0){
                                this.deck.add(findCard('Imbalance'),0,stage.playerNumber+2)
                            }else if(this.page==2&&e==0){
                                this.deck.add(findCard('Doubt'),0,stage.playerNumber+2)
                            }else if(this.page==3&&e==0){
                                this.deck.add(findCard('Shame'),0,stage.playerNumber+2)
                            }
                        break
                        case 9:
                            if(this.page==0&&e==0){
                                transition.scene='deck'
                                this.setupDeck(1)
                                this.context=1
                            }else if(this.page==0&&e==1){
                                this.setupChoice(0,floor(random(1,2.5)),0)
                                transition.scene='choice'
                            }else if(this.page==0&&e==2){
                                transition.scene='deck'
                                this.setupDeck(4)
                                this.context=4
                            }
                        break
                        case 10:
                            if(this.page==0&&floor(random(0,3))==0){
                                this.remember[0]=1
                            }else if(this.page==1&&e==0){
                                this.currency.money+=15
                                this.setupChoice(0,floor(random(1,2.5)),0)
                                transition.scene='choice'
                            }else if(this.page==2&&e==0){
                                this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-8)
                            }else if(this.page==4&&e==0){
                                this.currency.money+=15
                            }
                        break
                        case 11:
                            if(this.page==1&&e==0){
                                transition.scene='deck'
                                this.setupDeck(1)
                                this.context=1
                            }else if(this.page==2&&e==0){
                                this.deck.add(findCard('Pain'),0,stage.playerNumber+2)
                                current.getRelic(29)
                            }
                        break
                        case 12:
                            if(this.page==0&&e==0){
                                setupEncounter(current,zones[0].special[1])
                                this.create()
                                transition.scene='battle'
                            }else if(this.page==1&&e==0){
                                this.relics.active[this.relics.owned[floor(random(0,this.relics.owned.length))]]=false
                            }
                        break
                        case 13:
                            if(this.page==1&&e==0){
                                this.relics.active[this.relics.owned[floor(random(0,this.relics.owned.length))]]=false
                            }else if(this.page==2&&e==0){
                                this.deck.cards.splice(floor(random(0,this.deck.cards.length)),1)
                                this.deck.cards.splice(floor(random(0,this.deck.cards.length)),1)
                            }else if(this.page==3&&e==0){
                                this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-13)
                            }
                        break
                    }
                    if(types.event[this.event].pages[this.page].link[e]!=-1){
                        this.page=types.event[this.event].pages[this.page].link[e]+this.remember[0]
                    }
                }
            }
        }
    }
    setupShop(spec){
        this.choice.cards=[]
        this.costs.card[0][0]=round(random(40,60))
        this.costs.card[0][1]=round(random(40,60))
        this.costs.card[0][2]=round(random(60,80))
        this.costs.card[0][3]=round(random(60,80))
        this.costs.card[0][4]=round(random(120,160))
        this.costs.card[1][0]=round(random(80,100))
        this.costs.card[1][1]=round(random(160,200))
        this.costs.sale=floor(random(0,5))
        this.costs.card[0][this.costs.sale]=round(this.costs.card[0][this.costs.sale]/2)
        switch(spec){
            case 0:
                this.calc.list=listing.card[this.player]
                for(g=0;g<5;g++){
                    if(this.calc.list.length>0){
                        h=floor(random(0,this.calc.list[floor(g/2)].length))
                        this.choice.cards.push(new card(this.layer,75+g*150,200,this.calc.list[floor(g/2)][h],0,types.card[this.calc.list[floor(g/2)][h]].list))
                        this.calc.list[floor(g/2)].splice(h,1)
                    }
                }
                this.calc.list2=listing.card[0]
                for(g=0;g<2;g++){
                    if(this.calc.list.length>0){
                        h=floor(random(0,this.calc.list2[g+1].length))
                        this.choice.cards.push(new card(this.layer,75+g*150,400,this.calc.list2[g+1][h],0,0))
                        this.calc.list2[g+1].splice(h,1)
                    }
                }
            break
        }
        for(g=0,lg=this.choice.cards.length;g<lg;g++){
            this.choice.cards[g].size=1
        }
    }
    displayShop(){
        for(e=0,le=this.choice.cards.length;e<le;e++){
            if(this.choice.cards[e]!=0){
                this.choice.cards[e].display(this.deck.cards.length,this.drawAmount,0)
            }
        }
        this.layer.fill(160,80,80)
        this.layer.stroke(200,100,100)
        this.layer.strokeWeight(5)
        this.layer.rect(825,300,120,160,5)
        this.layer.noStroke()
        this.layer.textSize(14)
        this.layer.fill(0)
        this.layer.text('Remove\nCard',825,300)
        this.layer.fill(255,225,0)
        this.layer.ellipse(20,16,16,16)
        this.layer.fill(255,240,0)
        this.layer.ellipse(20,16,10,10)
        this.layer.fill(255,225,0)
        this.layer.textSize(16)
        this.layer.textAlign(LEFT,CENTER)
        this.layer.text(this.currency.money,30,18)
        this.layer.textAlign(CENTER,CENTER)
        this.layer.text(this.costs.remove,825,400)
        for(g=0;g<5;g++){
            if(this.choice.cards[g]!=0){
                this.layer.fill(255,225,0,this.choice.cards[g].size)
                this.layer.text(this.costs.card[0][g],this.choice.cards[g].position.x,this.choice.cards[g].position.y+100)
                if(this.costs.sale==g){
                    this.layer.text('Sale',this.choice.cards[g].position.x,this.choice.cards[g].position.y-100)
                }
            }
        }
        for(g=0;g<2;g++){
            if(this.choice.cards[g+5]!=0){
                this.layer.fill(255,225,0,this.choice.cards[g+5].size)
                this.layer.text(this.costs.card[1][g],this.choice.cards[g+5].position.x,this.choice.cards[g+5].position.y+100)
            }
        }
        this.layer.noStroke()
        this.layer.fill(160)
        this.layer.rect(850,570,80,40,5)
        this.layer.fill(0)
        this.layer.textSize(20)
        this.layer.text('Exit',850,570)
    }
    updateShop(){
        if(this.relics.active[25]){
            this.costs.remove=60
        }
        for(e=0,le=this.choice.cards.length;e<le;e++){
            if(this.choice.cards[e].used){
                this.choice.cards[e].size-=0.1
                if(this.choice.cards[e].size<=0){
                    if(this.relics.active[59]&&this.calc.list.length>0){
                        if(e<5){
                            h=floor(random(0,this.calc.list[floor(e/2)].length))
                            this.choice.cards[e]=new card(this.layer,this.choice.cards[e].position.x,this.choice.cards[e].position.y,this.calc.list[floor(e/2)][h],0,types.card[this.calc.list[floor(e/2)][h]].list)
                        }else{
                            h=floor(random(0,this.calc.list2[e-4].length))
                            this.choice.cards[e]=new card(this.layer,this.choice.cards[e].position.x,this.choice.cards[e].position.y,this.calc.list2[e-4][h],0,types.card[this.calc.list2[floor(e-4)][h]].list)
                        }
                        this.choice.cards[e].used=false
                        if(e==0){
                            this.costs.card[0][0]=round(random(40,60))
                        }else if(e==1){
                            this.costs.card[0][1]=round(random(40,60))
                        }else if(e==2){
                            this.costs.card[0][2]=round(random(60,80))
                        }else if(e==3){
                            this.costs.card[0][3]=round(random(60,80))
                        }else if(e==4){
                            this.costs.card[0][4]=round(random(120,160))
                        }else if(e==5){
                            this.costs.card[1][0]=round(random(80,100))
                        }else if(e==6){
                            this.costs.card[1][1]=round(random(160,200))
                        }
                        if(e==this.costs.sale){
                            this.costs.card[0][e]=round(this.costs.card[0][e]/2)
                        }
                    }else{
                        this.choice.cards[e]=0
                    }
                }
            }else if(this.choice.cards[e].size<1){
                this.choice.cards[e].size=round(this.choice.cards[e].size*10+1)/10
            }
        }
    }
    onClickShop(){
        if(pointInsideBox({position:inputs.rel},{position:{x:850,y:570},width:80,height:40})){
            transition.trigger=true
            transition.scene='map'
            this.map.complete[this.map.position[0]][this.map.position[1]]=1
        }
        if(pointInsideBox({position:inputs.rel},{position:{x:825,y:300},width:120,height:160})){
            transition.trigger=true
            transition.scene='deck'
            this.setupDeck(6)
            this.context=6
        }
        for(e=0,le=this.choice.cards.length;e<le;e++){
            if(this.choice.cards[e]!=0){
                if(pointInsideBox({position:inputs.rel},this.choice.cards[e])&&this.currency.money>=this.costs.card[floor(e/5)][e%5]&&!this.choice.cards[e].used){
                    this.deck.add(this.choice.cards[e].type,this.choice.cards[e].level,this.choice.cards[e].color)
                    this.currency.money-=this.costs.card[floor(e/5)][e%5]
                    this.choice.cards[e].used=true
                }
            }
        }
    }
}