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
        this.choice={cards:[]}
        this.shop={cards:[]}
        this.mana={main:3,gen:3,max:3,base:3}
        this.anim={turn:0,lost:0,end:0}
        this.turn=0
        this.turnTimer=0
        this.drawAmount=0
        this.calc={list:[]}
        this.remember=[0,0,0,0,0]
        this.currency={money:100}
        this.generation={combatants:[],reinforce:[],threshold:[]}
        this.objective=[]
        this.counter={}
        this.end=false
        this.map={main:[],complete:[],scroll:0,scrollGoal:0,position:[0,0],zone:0}
        this.restOptions=[0,1,2]
        this.context=0
        this.context2=0
        this.eventList=[]
        this.event=0
        this.page=0
        this.discarding=0
        this.costs={card:[[0,0,0,0,0],[0,0]],relic:[0,0,0,0,0,0],sale:0,remove:0}
        this.relics={list:[[],[],[],[],[],[]],owned:[],active:[],shop:[],size:[]}
        this.potions={list:[[],[],[]],owned:[-1,-1,-1]}
        this.random={rested:false,attacked:0,taken:0,attacks:0,skills:0,played:0,healEffectiveness:1,strengthBase:0,picked:0,class:0,drawing:0,potionEffectiveness:1,discards:0,playClass:[0,0,0],tempDrawAmount:0,hits:0,orbs:0,shields:0,chosen:0,doubling:0,upgrading:0,exhausting:0,transforming:0,forethinking:0,reserving:0,copying:0,play2More:0,exiling:0,releasing:0,exhausted:0}
        this.dict={suggestions:[],collect:[],typing:'',allowedCharacter:false,allowed:["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0","-",",",".","'","'","/"," ","(",")"]}
        this.defaultRandom={attacked:0,orbs:0,shields:0,hits:0,discards:0}
        this.combatants.push(new combatant(this.layer,this,100,350,this.player,0,0))
        this.combatants.push(new combatant(this.layer,this,200,350,0,0,1))
        stage.identifier=types.combatant[this.player].identifiers
    }
    setupTesting(draft/*type,key*/){
        this.initialEvent()
        this.setupMap()
        if(stage.draft==1){
            this.draftDeck()
        }else{
            this.deck.initial(this.player)
        }
        //stage.scene='battle'
        //setupEncounter(this,type)

        //this.getRelic(key)

        this.create()

        //this.map.position[0]=0
        //transition.trigger=true
        //transition.scene='event'
        //this.map.complete[0][0]=1
        //this.event=key

        //this.getPotion(key)
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
        this.random.playClass=[0,0,0]
        this.random.hits=0
        this.random.orbs=0
        this.random.shields=0
        this.random.doubling=0
        this.random.upgrading=0
        this.random.exhausting=0
        this.random.transforming=0
        this.random.forethinking=0
        this.random.reserving=0
        this.random.copying=0
        this.random.play2More=0
        this.random.exhausted=0
        this.combatants[0].resetUnique()
        while(this.combatants.length>1){
            this.combatants.splice(this.combatants.length-1,1)
        }
        this.combatants.push(new combatant(this.layer,this,200,350,0,0,1))
        for(let e=0,le=this.generation.combatants.length;e<le;e++){
            this.combatants.push(new combatant(this.layer,this,300+e*100,350,this.generation.combatants[e],1,e+2))
        }
        for(let e=0,le=this.deck.cards.length;e<le;e++){
            this.deck.cards[e].position.x=1206
            this.deck.cards[e].position.y=500
        }
        this.counter.enemies.total+=this.generation.reinforce.length
        this.random.tempDrawAmount=0
        this.initialReserve()
        this.reserve.shuffle()
        this.mana.max=this.mana.base
        this.mana.main=this.mana.max
        this.mana.gen=this.mana.max
        this.random.drawing=this.drawAmount+this.random.tempDrawAmount
        this.turn=0
        this.resetCombatant()
        this.drawInitial()
        this.turnDraw()
        this.bonusObjective(this.random.class)
        this.combatants[0].boost.main[0]+=this.random.strengthBase
        if(this.relics.active[146]){
            for(let g=0,lg=this.hand.cards.length;g<lg;g++){
                this.hand.cards[g].cost=floor(random(0,4))
            }
        }
    }
    initialEvent(){
        this.costs={card:[[0,0,0,0,0],[0,0]],relic:[0,0,0,0,0,0],sale:0,remove:80}
        this.relics={list:[[],[],[],[],[]],owned:[],active:[],shop:[],size:[]}
        this.potions={list:[[],[],[]],owned:[-1,-1,-1]}
        for(let g=0,lg=zones[this.map.zone].events[0].length;g<lg;g++){
            this.eventList.push(zones[this.map.zone].events[0][g])
        }
        for(let g=0,lg=zones[this.map.zone].events[this.player].length;g<lg;g++){
            this.eventList.push(zones[this.map.zone].events[this.player][g])
        }
        for(let g=0,lg=types.relic.length;g<lg;g++){
            if(g>=1&&types.relic[g].rarity>=0&&(types.relic[g].list==0||types.relic[g].list==this.player||this.player==stage.playerNumber)){
                this.relics.list[types.relic[g].rarity].push(g)
            }
            this.relics.active.push(false)
        }
        for(let g=0,lg=types.potion.length;g<lg;g++){
            if(g>=1&&types.potion[g].rarity>=0&&(types.potion[g].list==0||types.potion[g].list==this.player||this.player==stage.playerNumber)){
                this.potions.list[types.potion[g].rarity].push(g)
            }
        }
        if(this.player==7){
            this.drawAmount=3
        }else{
            this.drawAmount=5
        }
        if(stage.ascend>=10){
            this.deck.add(findCard('Ascender\nBane'),0,stage.playerNumber+2)
        }
        if(stage.ascend>=11){
            this.potions.owned.splice(this.potions.owned.length-1,1)
        }
    }
    actComplete(){
        transition.trigger=true
        transition.scene='map'
        this.map.zone++
        this.setupMap()
    }
    draftDeck(){
        this.setupChoice(0,0,0)
        this.context=3
        this.random.chosen=0
    }
    bonusObjective(spec){
        switch(spec){
            case 0:
                if(floor(random(0,4))<3){
                    this.objective.push([1,floor(random(2,9)),floor(random(2,6)),0])
                }else{
                    this.objective.push([2,floor(random(1,5))*5,floor(random(2,6)),0])
                }
                switch(this.objective[this.objective.length-1][2]){
                    case 2:
                        this.objective[this.objective.length-1][3]=floor(random(1,7))*10
                    break
                    case 3:
                        this.objective[this.objective.length-1][3]=floor(random(1,5))*5
                    break
                }
                this.objective.push([1,floor(random(2,9)),2,floor(random(2,7))*5])
            break
            case 1:
                for(let g=0;g<3;g++){
                    if(floor(random(0,4))<3){
                        this.objective.push([1,floor(random(2,9)),floor(random(2,6)),0])
                    }else{
                        this.objective.push([2,floor(random(1,5))*5,floor(random(2,6)),0])
                    }
                    switch(this.objective[this.objective.length-1][2]){
                        case 2:
                            this.objective[this.objective.length-1][3]=floor(random(1,7))*10
                        break
                        case 3:
                            this.objective[this.objective.length-1][3]=floor(random(1,5))*5
                        break
                    }
                }
                this.objective.push([1,floor(random(2,9)),2,floor(random(2,7))*5])
            break
            case 2:
                if(this.map.zone!=2){
                    if(stage.ascend<13){
                        this.objective.push([0,0,2,100])
                    }
                    if(stage.ascend>=5){
                        this.objective.push([1,10,3,40])
                    }else{
                        this.objective.push([0,0,3,100])
                    }
                }
            break
        }
    }
    initialReserve(){
        this.reserve.cards=[]
        this.hand.cards=[]
        this.drop.cards=[]
        this.discard.cards=[]
        for(let e=0,le=this.deck.cards.length;e<le;e++){
            this.reserve.cards.push(copyCard(this.deck.cards[e]))
        }
    }
    drawInitial(){
        for(let e=0,le=this.reserve.cards.length;e<le;e++){
            if(this.reserve.cards[e].spec==7||this.reserve.cards[e].spec==8||this.reserve.cards[e].spec==10||this.reserve.cards[e].spec==18){
                if(this.reserve.cards[e].list==10){
                    this.random.tempDrawAmount--
                }
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
            this.combatants[0].addBlock(10)
        }
        if(this.relics.active[8]&&this.random.rested){
            this.mana.main+=2
        }
        if(this.relics.active[10]){
            for(let e=0,le=this.combatants.length;e<le;e++){
                if(this.combatants[e].team==1){
                    this.combatants[e].boost.main[1]--
                }
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
        if(this.relics.active[65]){
            this.combatants[0].stance=1
        }
        if(this.relics.active[72]){
            for(let e=0,le=this.deck.cards.length;e<le;e++){
                if(this.deck.cards[e].list==10){
                    this.combatants[0].boost.main[0]++
                }
            }
        }
        if(this.relics.active[73]){
            this.combatants[0].status.main[33]++
        }
        if(this.relics.active[74]){
            this.hand.add(findCard('Selective\nRedraw'),0,0)
        }
        if(this.relics.active[89]){
            this.combatants[0].status.main[35]+=4
            this.combatants[0].addBlock(4)
        }
        if(this.relics.active[98]){
            this.hand.add(findCard('Shiv'),0,0)
            this.hand.add(findCard('Shiv'),0,0)
        }
        if(this.relics.active[66]){
            this.combatants[0].load(0)
        }
        if(this.relics.active[101]){
            this.combatants[0].load(1)
        }
        if(this.relics.active[160]){
            this.combatants[0].load(7)
        }
        if(this.relics.active[161]){
            this.combatants[0].load(8)
        }
        if(this.relics.active[162]){
            this.combatants[0].load(9)
        }
        if(this.relics.active[104]){
            this.combatants[0].status.main[36]++
        }
        if(this.relics.active[112]&&this.random.class==1){
            this.combatants[0].boost.main[0]+=3
        }
        if(this.relics.active[115]){
            transition.trigger=true
            transition.scene='choice'
            this.setupChoice(0,floor(random(1,3)),4)
            this.context=-2
        }
        if(this.relics.active[118]){
            this.combatants[0].combo+=4
        }
        if(this.relics.active[131]){
            for(let e=0,le=this.combatants.length;e<le;e++){
                if(this.combatants[e].team==1){
                    this.combatants[e].boost.main[0]++
                }
            }
        }
        if(this.relics.active[144]){
            this.hand.add(findCard('Wound'),0,stage.playerNumber+1)
        }
        if(this.relics.active[149]){
            for(let e=0;e<3;e++){
                this.hand.add(findCard('Miracle'),0,0)
            }
        }
        if(this.relics.active[178]){
            this.calc.list=[]
            for(let e=0,le=types.card.length;e<le;e++){
                if(types.card[e].stats[0].spec==16){
                    this.calc.list.push(e)
                }
            }
            e=floor(random(0,this.calc.list.length))
            this.hand.add(this.calc.list[e],0,types.card[this.calc.list[e]].list)
            this.hand.cards[this.hand.cards.length-1].exhaust=true
        }
        for(let e=0,le=this.combatants.length;e<le;e++){
            this.combatants[e].initialBuff()
        }
        this.startTurn()
        this.random.rested=false
        this.random.drawing=this.drawAmount+this.random.tempDrawAmount
        if(this.relics.active[4]){
            this.draw()
            this.draw()
        }
    }
    turnDraw(){
        if(this.player==stage.playerNumber){
            this.return()
            this.reserve.shuffle()
        }
        if(this.combatants[0].status.main[119]>0){
            this.combatants[0].status.main[119]=0
        }
        for(let e=0,le=this.random.drawing;e<le;e++){
            this.draw()
        }
        this.random.drawing=this.drawAmount+this.random.tempDrawAmount
        if(this.relics.active[2]){
            this.hand.add(findCard('Run'),0,0)
        }
        if(this.relics.active[29]){
            e=floor(random(0,this.hand.cards.length))
            if(this.hand.cards[e].level==0){
                this.hand.cards[e].level++
                this.hand.cards[e]=reformCard(this.hand.cards[e])
            }
        }
    }
    draw(){
        if(this.combatants[0].status.main[119]<=0){
            if(this.reserve.cards.length<=0){
                this.return()
                this.reserve.shuffle()
            }
            if(this.reserve.cards.length>0){
                this.drawEffect(this.reserve.cards[0].attack)
                this.hand.cards.push(copyCard(this.reserve.cards[0]))
                this.hand.cards[this.hand.cards.length-1].position.x=1206
                this.hand.cards[this.hand.cards.length-1].position.y=500
                if(this.relics.active[172]&&this.hand.cards[this.hand.cards.length-1].list==11){
                    this.draw()
                }
                if(this.combatants[0].status.main[125]>0&&(this.hand.cards[this.hand.cards.length-1].list==10||this.hand.cards[this.hand.cards.length-1].list==11)){
                    this.takeAll(this.combatants[0].status.main[125],-1,1)
                }
                if(this.reserve.cards[0].spec==16){
                    this.hand.cards[this.hand.cards.length-1].size=1
                    this.hand.cards[this.hand.cards.length-1].used=true
                }
                if(this.reserve.cards[0].attack==579){
                    for(let g=0;g<this.reserve.cards[0].alt;g++){
                        this.hand.cards.push(copyCard(this.reserve.cards[0]))
                        this.hand.cards[this.hand.cards.length-1].position.x=1206
                        this.hand.cards[this.hand.cards.length-1].position.y=500
                        if(this.relics.active[172]&&this.hand.cards[this.hand.cards.length-1].list==11){
                            this.draw()
                        }
                        if(this.combatants[0].status.main[125]>0&&(this.hand.cards[this.hand.cards.length-1].list==10||this.hand.cards[this.hand.cards.length-1].list==11)){
                            this.takeAll(this.combatants[0].status.main[125],-1,1)
                        }
                        if(this.reserve.cards[0].spec==16){
                            this.hand.cards[this.hand.cards.length-1].size=1
                            this.hand.cards[this.hand.cards.length-1].used=true
                        }
                    }
                }
                this.reserve.cards.splice(0,1)
            }else{
                this.hand.add(findCard('Empty'),0,stage.playerNumber+4)
            }
        }
    }
    drawEffect(attack){
        switch(attack){
            case -9: case -17:
                this.combatants[0].status.main[1]--
            break
            case -15:
                this.combatants[0].boost.main[4]-=2
                this.combatants[0].boost.main[100]++
            break
            case -16:
                this.hand.cards[floor(random(0,this.hand.cards.length))].cost++
            break
            case -18:
                for(let f=0,lf=this.hand.cards.length;f<lf;f++){
                    if(this.hand.cards[f].cost>=0){
                        this.hand.cards[f].cost++
                    }
                }
            break
            case -19:
                this.combatants[0].status.main[99]-=2
            break
            case -24:
                this.random.exhausting++
            break
            case -26:
                this.random.transforming++
            break
            case -27:
                this.randomExhaust()
            break
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
                for(let h=0;h<2;h++){
                    this.calc.list=[]
                    for(let g=0,lg=this.deck.cards.length;g<lg;g++){
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
                this.combatants[0].base.meterControl-=2
            break
            case 54:
                this.combatants[0].base.life+=10
                this.combatants[0].life+=10
            break
            case 57:
                this.restOptions.push(3)
            break
            case 78:
                this.restOptions.push(4)
            break
            case 82:
                this.combatants[0].base.life+=14
                this.combatants[0].life+=14
            break
            case 83:
                this.currency.money+=300
            break
            case 84:
                this.restOptions.push(5)
            break
            case 87:
                this.restOptions.push(6)
            break
            case 94:
                this.random.healEffectiveness*=2
            break
            case 105:
                transition.trigger=true
                transition.scene='deck'
                this.setupDeck(9)
                this.context=9
            break
            case 107:
                this.combatants[0].base.life+=7
                this.combatants[0].life=this.combatants[0].base.life
            break
            case 110:
                transition.trigger=true
                transition.scene='choice'
                this.setupChoice(0,0,3)
                this.context=-1
            break
            case 122:
                for(let g=0,lg=this.deck.cards.length;g<lg;g++){
                    if(floor(random(0,2))==0&&this.deck.cards[g].level==0){
                        this.deck.cards[g].level++
                        this.deck.cards[g]=reformCard(this.deck.cards[g])
                    }
                }
            break
            case 123: case 127: case 131: case 132: case 136: case 143: case 144:
                this.mana.gen++
                this.mana.main++
                this.mana.max++
                this.mana.base++
            break
            case 124:
                this.deck.add(findCard('Hoarding'),0,stage.playerNumber+2)
                for(let g=0;g<3;g++){
                    f=floor(random(0,this.relics.list[g].length))
                    this.getRelic(this.relics.list[g][f])
                    this.relics.list[g].splice(f,1)
                }
            break
            case 125:
                this.mana.gen++
                this.mana.main++
                this.mana.max++
                this.mana.base++
                this.restOptions.splice(this.restOptions.indexOf(1),1)
            break
            case 126:
                this.mana.gen++
                this.mana.main++
                this.mana.max++
                this.mana.base++
                this.calc.list=listing.card[10]
                for(let g=0;g<2;g++){
                    if(this.calc.list.length>0){
                        h=floor(random(0,this.calc.list[3].length))
                        this.deck.add(this.calc.list[3][h],0,stage.playerNumber+2)
                        this.calc.list[3].splice(h,1)
                    }
                }
            break
            case 128:
                for(let g=0,lg=this.deck.cards.length;g<lg;g++){
                    if(floor(random(0,2))==0&&this.deck.cards[g].level==0){
                        this.deck.cards.splice(g,1)
                        g--
                        lg--
                    }
                }
            break
            case 129:
                this.mana.gen++
                this.mana.main++
                this.mana.max++
                this.mana.base++
                this.restOptions.splice(this.restOptions.indexOf(2),1)
            break
            case 130:
                for(let g=0,lg=this.deck.cards.length;g<lg;g++){
                    if(this.deck.cards[g].list==stage.playerNumber+1){
                        h=floor(random(0,3))
                        this.deck.cards[g].type=listing.card[this.player][h][floor(random(0,listing.card[this.player][h].length))]
                        this.deck.cards[g].color=this.player
                        this.deck.cards[g]=reformCard(this.deck.cards[g])
                    }
                }
            break
            case 135:
                this.drawAmount++
            break
            case 138:
                this.potions.owned.push(-1,-1)
            break
            case 141:
                this.calc.list=[0,0,0,1,1,2]
                for(let e=0,le=this.potions.owned.length;e<le;e++){
                    g=this.calc.list[floor(random(0,this.calc.list.length))]
                    f=floor(random(0,this.potions.list[g].length))
                    this.getPotion(this.potions.list[g][f])
                }
            break
            case 142:
                this.random.potionEffectiveness++
            break
            case 146:
                this.drawAmount+=2
            break
            case 150:
                this.currency.money+=50
                this.combatants[0].base.life+=5
                this.combatants[0].life+=5
                this.calc.list=[0,0,0,1,1,2]
                g=this.calc.list[floor(random(0,this.calc.list.length))]
                f=floor(random(0,this.potions.list[g].length))
                this.getPotion(this.potions.list[g][f])
                for(let g=0;g<999;g++){
                    h=floor(random(0,this.deck.cards.length))
                    if(this.deck.cards[h].level==0){
                        this.deck.cards[h].level++
                        this.deck.cards[h]=reformCard(this.deck.cards[h])
                        break
                    }
                }
                transition.trigger++
            break
            case 157:
                this.random.healEffectiveness=0
            break
            case 158:
                this.combatants[0].base.life+=30
                this.combatants[0].life+=30
            break
            case 165:
                this.combatants[0].life+=999-this.combatants[0].base.life
                this.combatants[0].base.life=999
            break
        }
    }
    getPotion(type){
        for(let g=0,lg=this.potions.owned.length;g<lg;g++){
            if(this.potions.owned[g]==-1){
                this.potions.owned[g]=type
                break
            }
        }
    }
    loseRelic(){
        if(this.relics.owned.length>0){
            this.relics.active[this.relics.owned[floor(random(0,this.relics.owned.length))]]=false
        }
    }
    return(){
        while(this.discard.cards.length>0){
            if(this.discard.cards[0].spec!=6&&this.discard.cards[0].spec!=13&&(this.discard.cards[0].spec!=15||this.discard.cards[0].trigger)){
                this.reserve.cards.push(copyCard(this.discard.cards[0]))
            }
            this.discard.cards.splice(0,1)
        }
    }
    returnHand(){
        while(this.hand.cards.length>0){
            if(this.hand.cards[0].spec!=6&&this.hand.cards[0].spec!=13&&(this.hand.cards[0].spec!=15||this.hand.cards[0].trigger)){
                this.reserve.cards.push(copyCard(this.hand.cards[0]))
            }
            this.hand.cards.splice(0,1)
        }
    }
    removeCard(index){
        if(this.deck.cards[index].attack==-8){
            this.combatants[0].base.life-=3
            this.combatants[0].life-=3
        }
        if(this.deck.cards[index].attack!=-13){
            this.deck.cards.splice(index,1)
        }
    }
    tickStatus(){
        if(this.combatants[0].status.main[19]>0){
            this.combatants[0].life=0
        }
        this.mana.main=max(0,this.mana.main+this.combatants[0].status.main[1])
        this.combatants[0].mantra+=this.combatants[0].status.main[20]
        this.combatants[0].boost.main[2]+=this.combatants[0].status.main[32]
        for(let e=0,le=this.combatants.length;e<le;e++){
            if(this.combatants[e].status.main[139]>0){
                this.combatants[e].orbAttack(this.combatants[e].block,-1,0)
            }
            if(e==0&&this.combatants[e].status.main[47]<=0){
                if(this.relics.active[69]){
                    this.combatants[e].block=max(0,this.combatants[e].block-15)
                }else{
                    this.combatants[e].block=0
                }
            }
            this.combatants[e].setupIntent(-1)
            for(let f=0,lf=this.combatants[e].boost.main.length;f<lf;f++){
                if(f!=3&&this.combatants[e].status.main[88]<=0){
                    if(this.combatants[e].boost.main[f]>0){
                        this.combatants[e].boost.main[f]=max(0,this.combatants[e].boost.main[f]-1)
                    }
                    if(this.combatants[e].boost.main[f]<0){
                        this.combatants[e].boost.main[f]=min(0,this.combatants[e].boost.main[f]+1)
                    }
                }
            }
            this.combatants[e].boost.main[0]+=this.combatants[e].status.main[4]-this.combatants[e].status.main[7]+this.combatants[e].status.main[39]
            this.combatants[e].boost.main[2]+=this.combatants[e].status.main[32]-this.combatants[e].status.main[8]
            if(this.combatants[e].status.main[31]+this.combatants[e].status.main[40]>0){
                this.combatants[e].addBlock(this.combatants[e].status.main[31]+this.combatants[e].status.main[40])
            }
            for(let f=0,lf=this.combatants[e].status.main.length;f<lf;f++){
                if(this.combatants[e].status.main[f]>0){
                    if(f==24){
                        this.combatants[e].take(this.combatants[e].status.main[f],e)
                    }else if(f==35||f==155){
                        this.combatants[e].addBlock(this.combatants[e].status.main[f])
                    }else if(f==42){
                        this.combatants[e].boost.main[0]-=this.combatants[e].status.main[f]
                    }else if(f==49&&this.combatants[e].armed==0){
                        this.combatants[e].armed=1
                    }else if(f==50&&this.combatants[e].armed==1){
                        this.combatants[e].addBlock(this.combatants[e].status.main[50])
                    }else if(f==61&&this.combatants[e].stance==1){
                        this.combatants[e].addBlock(this.combatants[e].status.main[61])
                    }else if(f==72&&this.mana.main==this.mana.max){
                        this.combatants[e].status.main[f]--
                        this.mana.gen++
                    }else if(f==73){
                        this.combatants[e].changeStance(2)
                    }else if(f==74){
                        for(let g=0;g<this.combatants[e].status.main[f];g++){
                            this.draw()
                        }
                    }else if(f==78){
                        this.mana.max+=this.combatants[e].status.main[f]
                        this.mana.gen+=this.combatants[e].status.main[f]
                        this.mana.main+=this.combatants[e].status.main[f]
                    }else if(f==80){
                        this.combatants[e].boost.main[3]-=this.combatants[e].status.main[f]
                    }else if(f==92){
                        for(let g=0,lg=this.combatants[e].remember.boost.length;g<lg;g++){
                            this.combatants[e].boost.main[g]=this.combatants[e].remember.boost[g]
                        }
                    }else if(f==93){
                        this.combatants[e].combo=0
                    }else if(f==101){
                        if(this.combatants[1].type>0&&this.combatants[1].built==0){
                            this.combatants[1].life=min(this.combatants[1].life+this.combatants[e].status.main[f],this.combatants[1].base.life)
                        }
                    }else if(f==109||f==113){
                        this.takeAll(this.combatants[e].status.main[f],-1,1)
                    }else if(f==123){
                        this.discarding+=this.combatants[e].status.main[f]
                    }else if(f==124){
                        this.combatants[e].boost.main[1]-=this.combatants[e].status.main[f]
                    }else if(f==141){
                        for(let g=0,lg=this.combatants[e].status.main[f];g<lg;g++){
                            this.combatants[e].load(0,0)
                        }
                    }else if(f==149){
                        this.combatants[e].status.main[40]+=this.combatants[e].status.main[f]
                    }
                }
                if((f==11||f==37)&&this.combatants[e].status.main[f]>0){
                    this.combatants[e].take(this.combatants[e].status.main[f],-1)
                    this.combatants[e].status.main[f]--
                }else if((f==71||f==104)&&this.combatants[e].status.main[f]>0){
                    this.combatants[e].take(this.combatants[e].status.main[f],-1)
                }else if(f==38&&this.combatants[e].status.main[f]>0){
                    this.combatants[e].life=min(this.combatants[e].life+this.combatants[e].status.main[f],this.combatants[e].base.life)
                    this.combatants[e].status.main[f]--
                }else if((f==9||f==12||f==47||f==64)&&this.combatants[e].status.main[f]>0){
                    this.combatants[e].status.main[f]--
                }else if(f==60&&this.combatants[e].status.main[f]>0){
                    this.hand.add(findCard('Miracle'),1,0)
                    this.combatants[e].status.main[f]--
                }else if(f==84&&this.combatants[e].status.main[f]>0){
                    this.combatants[e].flower+=this.combatants[e].status.main[f]
                }else if(f==86&&this.combatants[e].status.main[f]>0){
                    if(this.combatants[e].meter<0){
                        this.combatants[e].meter-=this.combatants[e].status.main[f]
                    }else if(this.combatants[e].meter>0){
                        this.combatants[e].meter+=this.combatants[e].status.main[f]
                    }
                }else if(f==145&&this.combatants[e].status.main[f]>0){
                    for(let g=0,lg=this.combatants.length;g<lg;g++){
                        if(this.combatants[g].team==1&&this.combatants[g].life>0){
                            this.combatants[g].status.main[11]+=this.combatants[e].status.main[f]
                        }
                    }
                }else if(
                    f!=2&&f!=14&&f!=15&&f!=18&&f!=20&&f!=21&&f!=22&&f!=23&&f!=30&&f!=33&&
                    f!=35&&f!=36&&f!=39&&f!=40&&f!=41&&f!=42&&f!=46&&f!=48&&f!=50&&f!=51&&
                    f!=52&&f!=53&&f!=54&&f!=55&&f!=56&&f!=57&&f!=58&&f!=59&&f!=61&&f!=62&&
                    f!=63&&f!=68&&f!=69&&f!=70&&f!=72&&f!=75&&f!=76&&f!=77&&f!=78&&f!=79&&
                    f!=80&&f!=81&&f!=82&&f!=85&&f!=88&&f!=91&&f!=95&&f!=96&&f!=97&&f!=101&&
                    f!=103&&f!=107&&f!=108&&f!=112&&f!=113&&f!=114&&f!=116&&f!=120&&f!=123&&f!=124&&
                    f!=125&&f!=126&&f!=127&&f!=128&&f!=130&&f!=131&&f!=132&&f!=135&&f!=136&&f!=137&&
                    f!=138&&f!=140&&f!=141&&f!=142&&f!=143&&f!=6&&f!=144&&f!=146&&f!=147&&f!=148&&
                    f!=149&&f!=133&&f!=155&&f!=156&&f!=118){
                    if(f==44){
                        this.combatants[e].status.main[9]+=this.combatants[e].status.main[f]
                    }else if(f==67){
                        this.combatants[e].status.main[5]+=this.combatants[e].status.main[f]
                    }else if(f==89){
                        this.combatants[e].status.main[3]+=this.combatants[e].status.main[f]
                    }else if(f==90){
                        this.combatants[e].status.main[10]+=this.combatants[e].status.main[f]
                    }else if(f==99){
                        this.combatants[e].status.main[98]+=this.combatants[e].status.main[f]
                    }else if(f==100){
                        this.combatants[e].status.main[4]+=this.combatants[e].status.main[f]
                    }else if(f==102){
                        this.combatants[e].status.main[6]+=this.combatants[e].status.main[f]
                    }else if(f==110){
                        this.combatants[e].status.main[109]+=this.combatants[e].status.main[f]
                    }else if(f==111){
                        this.combatants[e].status.main[110]+=this.combatants[e].status.main[f]
                    }else if(f==122){
                        this.combatants[e].status.main[121]+=this.combatants[e].status.main[f]
                    }else if(f==129){
                        this.combatants[e].status.main[12]+=this.combatants[e].status.main[f]
                    }else if(f==150){
                        this.combatants[e].status.main[111]+=this.combatants[e].status.main[f]
                    }else if(f==151){
                        this.combatants[e].status.main[150]+=this.combatants[e].status.main[f]
                    }else if(f==152){
                        this.combatants[e].status.main[151]+=this.combatants[e].status.main[f]
                    }else if(f==153){
                        this.combatants[e].status.main[152]+=this.combatants[e].status.main[f]
                    }else if(f==154){
                        this.combatants[e].status.main[153]+=this.combatants[e].status.main[f]
                    }
                    this.combatants[e].status.main[f]=0
                }
            }
            this.combatants[e].turnBuff()
        }
        for(let e=0;e<this.combatants[0].status.main[14];e++){
            this.hand.add(findCard('Smite'),0,0)
        }
        for(let e=0;e<this.combatants[0].status.main[21];e++){
            this.hand.add(findCard('Shiv'),0,0)
        }
        for(let e=0;e<this.combatants[0].status.main[75];e++){
            this.hand.add(findCard('Insight'),0,0)
        }
    }
    endTurn(){
        this.counter.turn++
        this.discarding=0
        if(this.relics.active[79]){
            this.mana.main+=this.mana.gen
        }else{
            this.mana.main=min(this.mana.max,this.mana.main+this.mana.gen)
        }
        this.tickStatus()
        if(this.relics.active[9]&&this.random.attacked<=0){
            this.mana.main++
        }
        if(this.relics.active[45]&&this.counter.turn==1){
            this.combatants[0].addBlock(14)
        }
        if(this.relics.active[70]&&this.counter.turn==2){
            this.combatants[0].addBlock(18)
        }
        if(this.relics.active[88]&&this.counter.turn==6){
            for(let e=0,le=this.combatants.length;e<le;e++){
                if(this.combatants[e].team==1){
                    this.combatants[e].take(52,-1)
                }
            }
        }
        if(this.relics.active[85]&&this.counter.played<3){
            for(let e=0;e<3;e++){
                this.draw()
            }
        }
        if(this.relics.active[102]&&!this.combatants[0].armed){
            this.combatants[0].armed=true
        }
        this.startTurn()
        this.counter.played=0
        this.random.attacked=0
        this.random.discards=0
        this.random.play2More=0
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
            for(let e=0,le=this.combatants.length;e<le;e++){
                if(this.combatants[e].team==1){
                    this.combatants[e].take(3,-1)
                }
            }
        }
        if(this.relics.active[80]&&this.counter.turn%5==0){
            this.combatants[0].status.main[34]++
        }
        if(this.relics.active[116]){
            for(let e=0,le=this.combatants.length;e<le;e++){
                if(this.combatants[e].team==0&&this.counter.turn==0){
                    this.combatants[e].boost.main[0]+=2
                }else{
                    this.combatants[e].boost.main[0]++
                }
            }
        }
        if(this.relics.active[117]){
            for(let e=0,le=this.combatants.length;e<le;e++){
                if(this.combatants[e].team==1){
                    this.combatants[e].status.main[37]+=2
                }
            }
        }
        if(this.relics.active[120]){
            this.combatants[0].passiveEvoke(this.combatants[0].ammo[0],this.combatants[0].ammoDetail[0])
        }
        if(this.relics.active[134]&&(this.random.class==1||this.random.class==2)){
            this.mana.main++
        }
        if(this.relics.active[156]){
            transition.trigger=true
            transition.scene='choice'
            this.setupChoice(0,0,5)
            this.context=-6
        }
        if(this.combatants[0].status.main[54]>0){
            for(let g=0;g<this.combatants[0].status.main[54];g++){
                this.hand.add(listing.card[this.player][0][floor(random(0,listing.card[this.player][0].length))],0,this.player)
            }
        }
        if(this.combatants[0].status.main[55]>0){
            for(let g=0;g<this.combatants[0].status.main[55];g++){
                this.combatants[0].passiveEvoke(this.combatants[0].ammo[0],this.combatants[0].ammoDetail[0])
            }
        }
        if(this.combatants[0].status.main[58]>0){
            this.calc.list=[]
            for(let g=0,lg=listing.card[this.player].length;g<lg;g++){
                for(let h=0,lh=listing.card[this.player][g].length;h<lh;h++){
                    if(types.card[listing.card[this.player][g][h]].stats[0].class==2){
                        this.calc.list.push(listing.card[this.player][g][h])
                    }
                }
            }
            for(let g=0;g<this.combatants[0].status.main[58];g++){
                if(this.calc.list.length>0){
                    g=floor(random(0,this.calc.list.length))
                    this.hand.add(this.calc.list[g],0,this.player)
                    this.hand.cards[this.hand.cards.length-1].cost=0
                }
            }
        }
        this.combatants[0].autoEvoke()
    }
    resetTurn(){
        if(this.combatants[0].status.main[68]>0){
            transition.trigger=true
            transition.scene='deck'
            this.context=13
            this.context2=this.combatants[0].status.main[68]
        }else{
            this.resetTurnProxy()
        }
    }
    resetTurnProxy(){
        this.counter.enemies.alive=0
        for(let e=0,le=this.combatants.length;e<le;e++){
            if(this.combatants[e].team==1&&this.combatants[e].life>0){
                this.counter.enemies.alive++
            }
        }
        if(this.counter.enemies.alive<this.generation.threshold&&this.generation.reinforce.length>0){
            e=stage.playerCombatantNumber
            while(e<this.combatants.length){
                if(this.combatants[e].type==0&&this.combatants[e].id!=1){
                    this.combatants[e]=new combatant(this.layer,this,100+e*100,350,this.generation.reinforce[0],1,e)
                    this.combatants[e].initialBuff()
                    this.generation.reinforce.splice(0,1)
                    break
                }
                e++
            }
        }
        this.turnDraw()
        for(let e=0,le=this.hand.cards.length;e<le;e++){
            this.hand.cards[e].position.y=500
        }
        this.endTurn()
    }
    quickReinforce(type){
        e=stage.playerCombatantNumber
        while(e<this.combatants.length){
            if(this.combatants[e].type==0&&this.combatants[e].id!=1){
                this.combatants[e]=new combatant(this.layer,this,100+e*100,350,type,1,e)
                this.combatants[e].initialBuff()
                this.combatants[e].attacks=copyList(this.combatants[e].attacks)
                this.combatants[e].attacks.push(21)
                this.combatants[e].behavior=1
                this.combatants[e].intent=this.combatants[e].attacks.length-1
                break
            }
            e++
        }
        this.counter.enemies.total++
    }
    takeAll(damage,user,team){
        for(let g=0,lg=this.combatants.length;g<lg;g++){
            if(this.combatants[g].life>0&&this.combatants[g].team==team){
                this.combatants[g].take(damage,user)
            }
        }
    }
    playCard(){
        this.counter.played++
        this.random.played++
        this.random.playClass[this.attack.class]++
        if(this.relics.active[151]&&this.random.playClass[0]>0&&this.random.playClass[1]>0&&this.random.playClass[2]>0){
            this.combatants[0].clearDebuff()
        }
        if(this.counter.played%5==0&&this.combatants[0].status.main[108]>0){
            this.takeAll(this.combatants[0].status.main[108],-1,1)
        }
        if(this.counter.played>=6&&this.relics.active[136]){
            this.allDiscard()
        }else if(this.attack.class==0){
            this.combatants[0].status.main[24]=0
        }
        for(let g=0,lg=this.hand.cards.length;g<lg;g++){
            if(this.hand.cards[g].attack==-12&&this.attack.class==0||this.hand.cards[g].attack==-11&&this.counter.played>=3){
                this.allDiscard()
            }else if(this.hand.cards[g].attack==315){
                this.hand.cards[g].used=true
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
                this.combatants[0].addBlock(4)
            }
            if(this.random.attacks%3==0&&this.relics.active[56]){
                this.combatants[0].boost.main[0]++
            }
            if(this.relics.active[63]){
                this.combatants[0].boost.main[2]++
                this.combatants[0].status.main[32]--
            }
            for(let g=0,lg=this.hand.cards.length;g<lg;g++){
                if((this.hand.cards[g].attack==193||this.hand.cards[g].attack==195||this.hand.cards[g].attack==196)&&this.hand.cards[g].cost>0){
                    this.hand.cards[g].cost--
                }
            }
            for(let g=0;g<this.combatants[0].status.main[96];g++){
                this.draw()
            }
            if(this.combatants[0].status.main[128]>0){
                for(let g=0,lg=this.hand.cards.length;g<lg;g++){
                    if(this.hand.cards[g].trigger&&this.hand.cards[g].attack==1&&this.hand.cards[g].spec==3){
                        for(let h=0;h<this.combatants[0].status.main[128];h++){
                            this.draw()
                        }
                    }
                }
            }
            if(this.combatants[0].status.main[135]>0&&this.random.play2More==0){
                for(let g=0,lg=this.hand.cards.length;g<lg;g++){
                    if(this.hand.cards[g].trigger&&this.hand.cards[g].cost>=2){
                        this.random.play2More++
                        this.mana.main+=this.combatants[0].status.main[135]
                    }
                }
            }
        }
        if(this.attack.class==1){
            this.random.skills++
            if(this.random.skills%3==0&&this.relics.active[48]){
                for(let g=0,lg=this.combatants.length;g<lg;g++){
                    if(this.combatants[g].team==1){
                        this.combatants[g].take(5,-1)
                    }
                }
            }
            for(let g=0,lg=this.hand.cards.length;g<lg;g++){
                if(this.hand.cards[g].attack==194&&this.hand.cards[g].cost>0){

                    this.hand.cards[g].cost--
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
            if(this.relics.active[68]){
                this.combatants[0].life=min(this.combatants[0].life+2*this.random.healEffectiveness,this.combatants[0].base.life)
            }
            if(this.combatants[0].status.main[53]>0){
                for(let g=0,lg=this.hand.cards.length;g<lg;g++){
                    if(this.hand.cards[g].trigger&&this.hand.cards[g].base.cost!=0){
                        for(let h=0;h<this.combatants[0].status.main[53];h++){
                            this.draw()
                        }
                    }
                }
            }
            for(let g=0;g<this.combatants[0].status.main[57];g++){
                this.combatants[0].load(0,0)
            }
        }
        if(this.attack.class==3){
            if(this.relics.active[181]){
                this.draw()
            }
        }
        for(let g=0,lg=this.hand.cards.length;g<lg;g++){
            if(this.hand.cards[g].attack==-2){
                this.combatants[0].take(this.hand.cards[g].damage,-1)
            }else if(this.hand.cards[g].attack==633&&this.hand.cards[g].cost>0){
                this.hand.cards[g].cost--
            }else if(this.hand.cards[g].attack==149){
                this.hand.cards[g].used=true
            }
        }
        if(this.random.played%10==0&&this.relics.active[46]){
            this.draw()
        }
        if(this.random.played%7==0&&this.relics.active[176]){
            this.draw()
            this.discarding++
        }
        if(this.random.played%13==0&&this.combatants[0].status.main[130]>0){
            this.takeAll(this.combatants[0].status.main[130],-1,1)
            this.combatants[0].addBlock(this.combatants[0].status.main[130])
        }
        if(this.combatants[0].status.main[22]>0){
            for(let g=0,lg=this.combatants.length;g<lg;g++){
                if(this.combatants[g].team==1&&this.combatants[g].status.main[22]>0&&this.combatants[g].life>0){
                    this.combatants[g].take(this.combatants[0].status.main[22],0)
                }
            }
        }
        if(this.combatants[0].status.main[23]>0){
            this.combatants[0].addBlock(this.combatants[0].status.main[23])
        }
        for(let g=0,lg=this.combatants.length;g<lg;g++){
            if(this.combatants[g].team==1&&this.combatants[g].life>0&&this.combatants[g].status.main[117]>0){
                this.combatants[g].take(this.combatants[g].status.main[117],g)
            }
        }
    }
    afterPlayCard(){
        for(let g=0,lg=this.combatants.length;g<lg;g++){
            if(this.combatants[g].team==1&&this.combatants[g].life>0&&this.combatants[g].status.main[70]>0){
                this.combatants[0].take(this.combatants[g].status.main[70],g)
            }
        }
    }
    randomDiscard(){
        this.calc.list=[]
        for(let g=0,lg=this.hand.cards.length;g<lg;g++){
            if(!this.hand.cards[g].trigger&&!this.hand.cards[g].used){
                this.calc.list.push(g)
            }
        }
        if(this.calc.list.length>0){
            g=this.calc.list[floor(random(0,this.calc.list.length))]
            this.hand.cards[g].used=true
            this.hand.cards[g].selectDiscard=true
        }
    }
    randomExhaust(){
        this.calc.list=[]
        for(let g=0,lg=this.hand.cards.length;g<lg;g++){
            if(!this.hand.cards[g].trigger&&!this.hand.cards[g].used){
                this.calc.list.push(g)
            }
        }
        if(this.calc.list.length>0){
            g=this.calc.list[floor(random(0,this.calc.list.length))]
            this.hand.cards[g].used=true
            this.hand.cards[g].exhaust=true
        }
    }
    randomAdd(){
        this.calc.list=listing.card[this.player]
        if(this.calc.list.length>0){
            g=floor(random(0,this.calc.list.length))
            if(this.calc.list[g].length>0){
                h=floor(random(0,this.calc.list[g].length))
                this.deck.add(this.calc.list[g][h],0,types.card[this.calc.list[g][h]].list)
            }
        }
    }
    allDiscard(){
        for(let g=0,lg=this.hand.cards.length;g<lg;g++){
            if(!this.hand.cards[g].trigger||this.hand.cards[g].target==0){
                this.hand.cards[g].used=true
                this.hand.cards[g].selectDiscard=true
            }
        }
    }
    allExhaust(type){
        for(let g=0,lg=this.hand.cards.length;g<lg;g++){
            if(!this.hand.cards[g].trigger&&(type==-1||type==this.hand.cards[g].class)){
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
    allTransform(){
        for(let g=0,lg=this.hand.cards.length;g<lg;g++){
            h=floor(random(0,3))
            this.hand.cards[g].type=listing.card[this.player][h][floor(random(0,listing.card[this.player][h].length))]
            this.hand.cards[g].color=this.player
            this.hand.cards[g]=reformCard(this.hand.cards[g])
        }
    }
    buildAlly(type){
        if(this.combatants[1].status.main[91]>0){
            this.combatants[1].status.main[91]--
            this.remember[0]=this.combatants[1].life
        }else{
            this.remember[0]=0
        }
        this.combatants[1]=new combatant(this.layer,this,200,350,findCombatant(type),0,1)
        this.combatants[1].life=min(this.remember[0],this.combatants[1].base.life)
        this.combatants[1].collect.life=this.remember[0]
        if(this.relics.active[175]){
            this.combatants[1].life=min(this.combatants[1].base.life,this.combatants[1].life+5)
        }
    }
    constructEffect(){
        if(this.combatants[1].built==1){
            switch(this.combatants[1].name){
                case 'Spikes':
                    this.combatants[0].status.main[0]+=5
                break
                case 'Projector':
                    this.combatants[0].block+=5
                break
                case 'Turret':
                    this.combatants[0].orbAttack(10,-1,0)
                break
                case 'Readout':
                    this.draw()
                break
                case 'Generator':
                    this.combatants[0].status.main[1]++
                break
                case 'Strengthener':
                    this.combatants[0].status.main[4]++
                break
                case 'Explosive Turret':
                    this.combatants[0].orbAttack(8,-1,1)
                break
                case 'Dexterizer':
                    this.combatants[0].status.main[32]++
                break
                case 'Thorns':
                    this.combatants[0].status.main[27]+=3
                break
                case 'Bufferer':
                    this.combatants[0].status.main[33]++
                break
                case 'Gun Rack':
                    this.hand.add(findCard('Revolver'),0,0)
                break
                case 'Trap':
                    this.combatants[0].status.main[3]+=8
                break
                case 'Multiturret':
                    this.takeAll(6,-1,1)
                break
                case 'Metallicizer':
                    this.combatants[0].status.main[40]+=2
                break
                case 'Mirror Shield':
                    this.combatants[0].status.main[10]++
                break
                case 'Limiter':
                    this.combatants[0].status.main[36]++
                break
                case 'Repulsor':
                    this.combatants[0].orbAttack(4,-1,3)
                break
                case 'Machine Gun':
                    this.combatants[0].orbAttack(4,-1,4)
                break
                case 'Maintainer':
                    this.combatants[0].status.main[47]++
                break
                case 'Upgrader':
                    this.random.upgrading++
                break
                case 'Transformer':
                    this.random.transforming++
                break
                case 'Doubler':
                    this.random.doubling++
                break
                case 'Exhauster':
                    this.random.exhausting++
                break
            }
        }
    }
    resetCombatant(){
        for(let e=0,le=this.combatants.length;e<le;e++){
            if(this.combatants[e].type!=0){
                this.combatants[e].block=0
                this.combatants[e].fade=1
                if(e>0){
                    this.combatants[e].setupIntent(-1)
                    this.counter.enemies.total++
                }
                for(let f=0,lf=this.combatants[e].boost.main.length;f<lf;f++){
                    this.combatants[e].boost.main[f]=0
                }
                for(let f=0,lf=this.combatants[e].status.main.length;f<lf;f++){
                    this.combatants[e].status.main[f]=0
                }
            }
        }
    }
    close(){
        if(this.relics.active[97]){
            for(let g=0,lg=this.hand.cards.length;g<lg;g++){
                if(!this.hand.cards[g].trigger){
                    this.combatants[0].block++
                }
            }
        }
        this.hand.trigger=false
        this.hand.discard()
        if(this.combatants[0].status.main[115]>0){
            this.turn=0
            this.resetTurn()
        }else{
            this.turn++
            this.turnTimer=20
        }
        if(this.combatants[0].stance==3){
            this.combatants[0].changeStance(0)
            if(this.combatants[0].mantra>=12){
                this.combatants[0].changeStance(3)
				this.combatants[0].mantra-=12
            }
        }
        for(let e=0,le=this.combatants.length;e<le;e++){
            if(this.combatants[e].team==1&&this.combatants[e].status.main[47]<=0){
                this.combatants[e].block=0
            }
        } 
        while(this.turn>0&&(this.combatants[this.turn].type<=0||this.combatants[this.turn].life<=0)){
            this.turn++
            if(this.turn>=this.combatants.length){
                this.turn=0
                this.resetTurn()
            }
        }
    }
    displayRelics(){
        for(let e=0,le=this.relics.owned.length;e<le;e++){
            displayRelicSymbol(this.layer,25+(e%18)*50,60+floor(e/18)*50,this.relics.owned[e],0,1,1,this.relics.active[this.relics.owned[e]])
            if(dist(inputs.rel.x,inputs.rel.y,25+(e%18)*50,60+floor(e/18)*50)<20){
                this.layer.noStroke()
                this.layer.fill(180)
                this.layer.rect(130,120+floor((le-1)/18)*50,240,60,5)
                this.layer.fill(0)
                this.layer.textSize(18)
                this.layer.text(types.relic[this.relics.owned[e]].name,130,105+floor((le-1)/18)*50)
                this.layer.textSize(12)
                this.layer.text(types.relic[this.relics.owned[e]].desc,130,130+floor((le-1)/18)*50)
            }
        }
    }
    displayPotions(){
        for(let e=0,le=this.potions.owned.length;e<le;e++){
            displayPotionSymbol(this.layer,100+e*50,20,this.potions.owned[e],0,1,1)
            if(dist(inputs.rel.x,inputs.rel.y,100+e*50,20)<15&&this.potions.owned[e]>=0){
                this.layer.noStroke()
                this.layer.fill(180)
                this.layer.rect(130,120+floor((this.relics.owned.length-1)/18)*50,240,60,5)
                this.layer.fill(0)
                this.layer.textSize(18)
                this.layer.text(types.potion[this.potions.owned[e]].name,130,105+floor((this.relics.owned.length-1)/18)*50)
                this.layer.textSize(12)
                this.layer.text(types.potion[this.potions.owned[e]].desc,130,130+floor((this.relics.owned.length-1)/18)*50)
            }
        }
    }
    onClickPotions(){
        if(!this.relics.active[143]){
            for(let e=0,le=this.potions.owned.length;e<le;e++){
                if(dist(inputs.rel.x,inputs.rel.y,100+e*50,20)<15&&this.potions.owned[e]>=0){
                    this.remember=[this.potions.owned[e]]
                    if(this.relics.active[139]){
                        this.combatants[0].life=min(this.combatants[0].life+5,this.combatants[0].base.life)
                    }else if(this.relics.active[140]){
                        this.draw()
                        this.draw()
                    }
                    this.potions.owned[e]=-1
                    switch(this.remember[0]){
                        case 1:
                            this.calc.list=[]
                            for(let g=0,lg=types.card.length;g<lg;g++){
                                if(types.card[g].list<=5&&types.card[g].stats[0].class==0){
                                    this.calc.list.push(g)
                                }
                            }
                            for(let h=0;h<this.random.potionEffectiveness;h++){
                                g=floor(random(0,this.calc.list.length))
                                this.hand.add(this.calc.list[g],0,types.card[this.calc.list[g]].list)
                                this.hand.cards[this.hand.cards.length-1].cost=0
                            }
                        break
                        case 2:
                            for(let g=0,lg=this.hand.cards.length;g<lg;g++){
                                if(this.hand.cards[g].level==0){
                                    this.hand.cards[g].level++
                                    this.hand.cards[g]=reformCard(this.hand.cards[g])
                                }
                            }
                        break
                        case 3:
                            this.combatants[0].addBlock(12*this.random.potionEffectiveness)
                        break
                        case 4:
                            this.combatants[0].life=min(this.combatants[0].life+this.combatants[0].base.life*0.2*this.random.potionEffectiveness,this.combatants[0].base.life)
                        break
                        case 5:
                            for(let g=0;g<2*this.random.potionEffectiveness;g++){
                                this.hand.add(findCard('Miracle'),0,0)
                            }
                        break
                        case 6:
                            transition.trigger=true
                            transition.scene='choice'
                            this.setupChoice(0,floor(random(1,3)),4)
                            if(this.random.potionEffectiveness>1){
                                this.context=-3
                            }else{
                                this.context=-2
                            }
                        break
                        case 7:
                            this.combatants[0].boost.main[2]+=2*this.random.potionEffectiveness
                        break
                        case 8:
                            this.mana.main+=2*this.random.potionEffectiveness
                        break
                        case 9:
                            for(let g=0,lg=this.combatants.length;g<lg;g++){
                                if(this.combatants[g].team==1&&this.combatants[g].life>0){
                                    this.combatants[g].take(10*this.random.potionEffectiveness,0)
                                }
                            }
                        break
                        case 10:
                            this.attack.damage=3*this.random.potionEffectiveness
                            this.attack.user=0
                            this.attack.type=172
                            this.attack.class=2
                            this.attack.targetType=1
                            this.hand.trigger=true
                        break
                        case 11:
                            this.attack.damage=20*this.random.potionEffectiveness
                            this.attack.user=0
                            this.attack.type=1
                            this.attack.class=0
                            this.attack.targetType=1
                            this.hand.trigger=true
                        break
                        case 12:
                            this.combatants[0].boost.main[0]+=5*this.random.potionEffectiveness
                            this.combatants[0].status.main[4]-=5*this.random.potionEffectiveness-1
                        break
                        case 13:
                            this.attack.damage=6*this.random.potionEffectiveness
                            this.attack.user=0
                            this.attack.type=173
                            this.attack.class=2
                            this.attack.targetType=1
                            this.hand.trigger=true
                        break
                        case 14:
                            for(let h=0;h<this.random.potionEffectiveness;h++){
                                this.calc.list=[]
                                for(let g=0,lg=types.card.length;g<lg;g++){
                                    if(types.card[g].list<=5&&types.card[g].stats[0].class==1){
                                        this.calc.list.push(g)
                                    }
                                }
                                g=floor(random(0,this.calc.list.length))
                                this.hand.add(this.calc.list[g],0,types.card[this.calc.list[g]].list)
                                this.hand.cards[this.hand.cards.length-1].cost=0
                            }
                        break
                        case 15:
                            for(let h=0;h<this.random.potionEffectiveness;h++){
                                this.calc.list=[]
                                for(let g=0,lg=types.card.length;g<lg;g++){
                                    if(types.card[g].list<=5&&types.card[g].stats[0].class==2){
                                        this.calc.list.push(g)
                                    }
                                }
                                g=floor(random(0,this.calc.list.length))
                                this.hand.add(this.calc.list[g],0,types.card[this.calc.list[g]].list)
                                this.hand.cards[this.hand.cards.length-1].cost=0
                            }
                        break
                        case 16:
                            this.combatants[0].boost.main[2]+=5*this.random.potionEffectiveness
                            this.combatants[0].status.main[32]-=5*this.random.potionEffectiveness-1
                        break
                        case 17:
                            this.combatants[0].boost.main[0]+=2*this.random.potionEffectiveness
                        break
                        case 18:
                            for(let g=0;g<3*this.random.potionEffectiveness;g++){
                                this.draw()
                            }
                        break
                        case 19:
                            this.attack.damage=3*this.random.potionEffectiveness
                            this.attack.user=0
                            this.attack.type=5
                            this.attack.class=2
                            this.attack.targetType=1
                            this.hand.trigger=true
                        break
                        case 20:
                            this.combatants[0].status.main[36]+=this.random.potionEffectiveness
                        break
                        case 21:
                            for(let g=0;g<3*this.random.potionEffectiveness;g++){
                                this.hand.add(findCard('Shiv'),1,0)
                            }
                        break
                        case 22:
                            this.allExhaust(-1)
                        break
                        case 23:
                            this.combatants[0].status.main[35]+=4*this.random.potionEffectiveness
                        break
                        case 24:
                            this.allDiscard()
                            this.turnDraw()
                        break
                        case 25:
                            this.combatants[0].status.main[0]+=5*this.random.potionEffectiveness
                        break
                        case 26:
                            transition.trigger=true
                            transition.scene='deck'
                            if(this.random.potionEffectiveness>1){
                                this.setupDeck(11)
                                this.context=11
                            }else{
                                this.setupDeck(10)
                                this.context=10
                            }
                        break
                        case 27:
                            this.combatants[0].status.main[38]+=5*this.random.potionEffectiveness
                        break
                        case 28:
                            this.combatants[0].status.main[39]+=2*this.random.potionEffectiveness
                        break
                        case 29:
                            this.calc.list=[0,0,0,1,1,2]
                            for(let e=0,le=this.potions.owned.length;e<le;e++){
                                g=this.calc.list[floor(random(0,this.calc.list.length))]
                                f=floor(random(0,this.potions.list[g].length))
                                this.getPotion(this.potions.list[g][f])
                            }
                        break
                        case 30:
                            this.combatants[0].life=min(this.combatants[0].life+this.combatants[0].base.life*0.5*this.random.potionEffectiveness,this.combatants[0].base.life)
                        break
                        case 31:
                            this.combatants[0].base.life+=5*this.random.potionEffectiveness
                            this.combatants[0].life+=5*this.random.potionEffectiveness
                        break
                        case 32:
                            this.combatants[0].status.main[34]+=this.random.potionEffectiveness
                        break
                        case 33:
                            this.combatants[0].status.main[40]+=6*this.random.potionEffectiveness
                        break
                        case 34:
                            transition.trigger=true
                            transition.scene='map'
                            this.map.complete[this.map.position[0]][this.map.position[1]]=1
                        break
                        case 35:
                            for(let g=0;g<5*this.random.potionEffectiveness;g++){
                                this.draw()
                            }
                            for(let g=0,lg=this.hand.cards.length;g<lg;g++){
                                this.hand.cards[g].cost=floor(random(0,4))
                            }
                        break
                        case 36:
                            this.combatants[0].status.main[33]+=2*this.random.potionEffectiveness
                        break
                        case 37:
                            this.combatants[0].combo+=5*this.random.potionEffectiveness
                        break
                        case 38:
                            this.mana.main+=this.random.potionEffectiveness
                            this.remember[0]=0
                            for(let g=0,lg=this.hand.cards.length;g<lg;g++){
                                if(this.hand.cards[g].class!=0){
                                    this.hand.cards[g].used=true
                                    this.remember[0]++
                                }
                            }
                            for(let g=0;g<this.remember[0];g++){
                                this.draw()
                            }
                        break
                        case 39:
                            for(let g=0,lg=this.hand.cards.length;g<lg;g++){
                                this.hand.cards[g].cost=max(this.hand.cards[g].cost-2*this.random.potionEffectiveness,0)
                            }
                        break
                        case 40:
                            this.combatants[0].changeStance(1)
                        break
                        case 41:
                            this.combatants[0].changeStance(2)
                        break
                        case 42:
                            this.combatants[0].changeStance(3)
                        break
                        case 43:
                            this.combatants[0].boost.main[3]+=2*this.random.potionEffectiveness
                        break
                        case 44:
                            this.combatants[0].load(4,6)
                            if(this.random.potionEffectiveness>1){
                                this.combatants[0].load(4,6)
                            }
                        break
                        case 45:
                            this.combatants[0].load(3,0)
                            if(this.random.potionEffectiveness>1){
                                this.combatants[0].load(3,0)
                            }
                        break
                        case 46:
                            this.combatants[0].meter=-this.combatants[0].base.meter
                        break
                        case 47:
                            this.combatants[0].meter=this.combatants[0].base.meter
                        break
                        case 48:
                            if(this.battle.combatants[0].armed!=1){
                                this.battle.combatants[0].armed=1
                            }
                        break
                        case 49:
                            this.combatants[0].boost.main[0]+=4*this.random.potionEffectiveness
                            this.discard.add(findCard('Burn'),0,stage.playerNumber+1)
                            this.discard.add(findCard('Burn'),0,stage.playerNumber+1)
                        break
                        case 50:
                            this.combatants[0].life=min(this.combatants[0].life+20*this.random.potionEffectiveness,this.combatants[0].base.life)
                            this.combatants[0].status.main[24]+=15
                        break
                        case 51:
                            if(this.combatants[1].type>0&&this.combatants[1].built==0){
                                this.combatants[1].life=this.combatants[1].base.life
                            }
                        break
                        case 52:
                            if(this.combatants[1].type>0&&this.combatants[1].built==1&&this.combatants[1].life>0){
                                this.combatants[1].status.main[10]+=99
                            }
                        break
                        case 53:
                            for(let g=0;g<2*this.random.potionEffectiveness;g++){
                                this.draw()
                            }
                            this.random.upgrading=2*this.random.potionEffectiveness
                        break
                        case 54:
                            for(let g=0,lg=this.discard.cards.length;g<lg;g++){
                                if(this.discard.cards[g].spec==16){
                                    this.hand.cards.push(this.discard.cards[g])
                                    this.hand.cards[this.hand.cards.length-1].position.x=1206
                                    this.hand.cards[this.hand.cards.length-1].position.y=500
                                    this.discard.cards.splice(g,1)
                                    g--
                                    lg--
                                }
                            }
                        break
                        case 55:
                            for(let g=0,lg=this.hand.cards.length;g<lg;g++){
                                this.hand.cards[g].spec=0
                            }
                        break
                        case 56:
                            this.tickStatus()
                        break
                        case 57:
                            this.combatants[0].status.main[115]++
                        break
                    }
                }
            }
        }
    }
    display(){
        for(let e=0,le=this.combatants.length;e<le;e++){
            this.combatants[e].display(0)
        }
        this.layer.noStroke()
        this.layer.fill(80,85,90)
        this.layer.rect(450,475,910,250)
        this.layer.fill(200,225,250)
        this.layer.stroke(150,200,250)
        this.layer.strokeWeight(6)
        this.layer.quad(-92+this.anim.turn*100,390,-68+this.anim.turn*100,358,-44+this.anim.turn*100,390,-68+this.anim.turn*100,422)
        playerFill(this.layer,this.player,1)
        this.layer.strokeWeight(5)
        this.layer.rect(-68+this.anim.turn*100,445,40,30,5)
        this.layer.rect(-68+this.anim.turn*100,485,40,30,5)
        this.layer.rect(-68+this.anim.turn*100,525,40,30,5)
        this.layer.rect(-68+this.anim.turn*100,565,40,30,5)
        this.layer.fill(0)
        this.layer.noStroke()
        this.layer.textSize(10)
        this.layer.text(this.mana.gen,-68+this.anim.turn*100,370)
        this.layer.textSize(20)
        this.layer.text(this.mana.main+'/'+this.mana.max,-68+this.anim.turn*100,390)
        this.layer.textSize(12)
        this.layer.text('('+this.reserve.cards.length+')',-68+this.anim.turn*100,491)
        this.layer.text('Discard',-68+this.anim.turn*100,519)
        this.layer.text('('+this.discard.cards.length+')',-68+this.anim.turn*100,531)
        this.layer.text('End',-68+this.anim.turn*100,565)
        this.layer.text('Dicti\nonary',-68+this.anim.turn*100,445)
        this.layer.fill(50)
        this.layer.text('Draw',-68+this.anim.turn*100,479)
        for(let e=0,le=this.combatants.length;e<le;e++){
            this.combatants[e].displayInfo()
        }
        this.hand.display()
        this.drop.display()
        for(let e=0,le=this.particles.length;e<le;e++){
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
        this.displayPotions()
        this.layer.fill(255,225,0)
        this.layer.textSize(16)
        this.layer.textAlign(LEFT,CENTER)
        this.layer.text(this.currency.money,30,18)
        this.layer.fill(80,1-this.anim.end)
        this.layer.rect(710,this.objective.length*10+10,360,this.objective.length*20,10)
        this.layer.fill(80,this.anim.end)
        this.layer.rect(450,this.objective.length*30+100,450,this.objective.length*60+20,10)
        this.layer.rect(450,this.objective.length*60+140,150,40,10)
        if(this.anim.end<1){
            this.layer.textSize(12)
            for(let e=0,le=this.objective.length;e<le;e++){
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
                        this.layer.text('Take Less Than '+this.objective[e][1]+' Damage ('+ceil(this.counter.taken)+')',640,e*20+20)
                    break
                }
                switch(this.objective[e][2]){
                    case 0:
                        this.layer.text('Card',540,e*20+20)
                    break
                    case 1:
                        this.layer.text('Card+',540,e*20+20)
                    break
                    case 2:
                        this.layer.text('$'+this.objective[e][3],540,e*20+20)
                    break
                    case 3:
                        this.layer.text(this.objective[e][3]+' HP',540,e*20+20)
                    break
                    case 4:
                        this.layer.text('Relic',540,e*20+20)
                    break
                    case 5:
                        this.layer.text('Potion',540,e*20+20)
                    break
                    case 6:
                        this.layer.text('Card, Boss Relic',540,e*20+20)
                    break
                    case 7:
                        this.layer.text('Victory',540,e*20+20)
                    break
                }
            }
        }
        this.layer.textAlign(CENTER,CENTER)
        if(this.anim.end>0){
            this.layer.textSize(18)
            this.layer.fill(255,this.anim.end)
            this.layer.text('End',450,this.objective.length*60+140)
            for(let e=0,le=this.objective.length;e<le;e++){
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
                        this.layer.text('Take Less Than '+this.objective[e][1]+' Damage ('+ceil(this.counter.taken)+')',450,e*60+120)
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
                    case 5:
                        this.layer.text('New Potion',450,e*60+150)
                    break
                    case 6:
                        this.layer.text('New Card, New Boss Relic',450,e*60+150)
                    break
                    case 7:
                        this.layer.text('Game Complete!',450,e*60+150)
                    break
                }
            }
        }
    }
    update(){
        if(this.relics.active[34]&&this.combatants[0].combo==0){
            this.combatants[0].combo=1
        }
        if(this.relics.active[75]&&this.combatants[0].boost.main[0]<0){
            this.combatants[0].boost.main[0]=0
        }
        if(this.relics.active[76]&&this.combatants[0].boost.main[1]<0){
            this.combatants[0].boost.main[1]=0
        }
        if(this.relics.active[77]&&this.combatants[0].boost.main[2]<0){
            this.combatants[0].boost.main[2]=0
        }
        if(this.turn==0){
            if(this.relics.active[92]&&this.hand.cards.length<=0){
                this.draw()
            }
            if(this.player==7&&this.hand.cards.length<3){
                if(this.reserve.cards.length<=0){
                    for(let g=0,lg=this.discard.cards.length;g<lg;g++){
                        if(this.discard.cards[g].attack==560){
                            this.reserve.cards.push(this.discard.cards[g])
                            this.discard.cards.splice(g,1)
                            g--
                            lg--
                        }
                    }
                }
                if(this.reserve.cards.length>0){
                    this.draw()
                }
            }
        }
        this.counter.enemies.alive=0
        for(let e=0,le=this.combatants.length;e<le;e++){
            if(this.combatants[e].team==1&&this.combatants[e].life>0){
                this.counter.enemies.alive++
            }
        }
        if(this.counter.enemies.alive<=0&&this.generation.reinforce.length<=0){
            this.end=true
        }
        for(let e=0,le=this.particles.length;e<le;e++){
            this.particles[e].update()
            if(this.particles[e].remove){
                this.particles.splice(e,1)
                e--
                le--
            }
        }
        for(let e=0,le=this.combatants.length;e<le;e++){
            this.combatants[e].update()
        }
        if((this.turn==0||this.turn>=100)&&this.anim.turn<1){
            this.anim.turn=round(this.anim.turn*10+1)/10
        }else if(!(this.turn==0||this.turn>=100)&&this.anim.turn>0){
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
                if(this.combatants[1].life>0&&this.combatants[1].built==1&&this.combatants[1].class!=-1){
                    this.attack.target=1
                }else{
                    this.attack.target=0
                }
                this.attack.user=this.turn-100
                if(types.attack[this.combatants[this.turn-100].attacks[this.combatants[this.turn-100].intent]].class==0){
                    this.attack.damage=round(this.combatants[this.turn-100].damage[this.combatants[this.turn-100].intent]*(2+max(0,this.combatants[this.turn-100].boost.main[0]))/(2-min(0,this.combatants[this.turn-100].boost.main[0])))
                }else{
                    this.attack.damage=round(this.combatants[this.turn-100].damage[this.combatants[this.turn-100].intent])
                }
                this.attack.alt=this.combatants[this.turn-100].altAttack[this.combatants[this.turn-100].intent]
                this.attack.update(this.combatants[this.turn-100].attacks[this.combatants[this.turn-100].intent],0,1)
                this.turn=200
            }
        }else if(this.turn==1){
            this.constructEffect()
            this.turn++
            while(this.turn>0&&this.turn<this.combatants.length&&(this.combatants[this.turn].type<=0||this.combatants[this.turn].life<=0)){
                this.turn++
            }
        }else if(this.turn>0){
            if(this.turnTimer>0){
                this.turnTimer--
            }else if(this.turn>=this.combatants.length){
                this.turn=0
                this.resetTurn()
            }else if(this.combatants[this.turn].status.main[5]>0||this.combatants[this.turn].status.main[9]>0||this.combatants[this.turn].status.main[106]>0){
                this.turn++
                while(this.turn>0&&this.turn<this.combatants.length&&(this.combatants[this.turn].type<=0||this.combatants[this.turn].life<=0)){
                    this.turn++
                }
                if(this.turn>=this.combatants.length){
                    this.turnTimer=30
                }
            }else{
                if(this.combatants[1].life>0&&this.combatants[1].built==1&&this.combatants[1].class!=-1){
                    this.attack.target=1
                }else{
                    this.attack.target=0
                }
                this.attack.user=this.turn
                if(types.attack[this.combatants[this.turn].attacks[this.combatants[this.turn].intent]].class==0){
                    this.attack.damage=round(this.combatants[this.turn].damage[this.combatants[this.turn].intent]*(2+max(0,this.combatants[this.turn].boost.main[0]))/(2-min(0,this.combatants[this.turn].boost.main[0])))
                }else{
                    this.attack.damage=round(this.combatants[this.turn].damage[this.combatants[this.turn].intent])
                }
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
                if(this.map.position[0]>=0){
                    this.map.complete[this.map.position[0]][this.map.position[1]]=1
                }   
                if(this.relics.active[3]){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+2)
                }
                if(this.relics.active[49]&&this.combatants[0].life<this.combatants[0].base.life/2){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+12)
                }
                if(this.relics.active[137]){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+6)
                }
                if(this.relics.active[167]&&this.counter.taken==0){
                    this.random.strengthBase++
                }
                for(let e=0,le=this.objective.length;e<le;e++){
                    if(this.objective[e][0]==0||this.objective[e][0]==1&&this.counter.turn<=this.objective[e][1]||this.objective[e][0]==2&&this.counter.taken<this.objective[e][1]){
                        switch(this.objective[e][2]){
                            case 0:
                                transition.scene='choice'
                                this.setupChoice(0,floor(random(0,1.5)),0)
                            break
                            case 1:
                                transition.scene='choice'
                                if(this.relics.active[159]){
                                    this.setupChoice(1,floor(random(1,2.5)),0)
                                }else{
                                    this.setupChoice(1,floor(random(0,1.5)),0)
                                }
                            break
                            case 2:
                                if(this.relics.active[164]){
                                    this.currency.money+=round(this.objective[e][3]*1.5)
                                }else{
                                    this.currency.money+=this.objective[e][3]
                                }
                            break
                            case 3:
                                this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+this.objective[e][3])
                            break
                            case 4:
                                this.calc.list=[0,0,0,1,1,2]
                                g=this.calc.list[floor(random(0,this.calc.list.length))]
                                f=floor(random(0,this.relics.list[g].length))
                                this.getRelic(this.relics.list[g][f])
                                this.relics.list[g].splice(f,1)
                            break
                            case 5:
                                this.calc.list=[0,0,0,1,1,2]
                                g=this.calc.list[floor(random(0,this.calc.list.length))]
                                f=floor(random(0,this.potions.list[g].length))
                                this.getPotion(this.potions.list[g][f])
                            break
                            case 6:
                                transition.scene='choice'
                                this.setupChoice(0,2,0)
                                this.context=-69
                            break
                            case 7:
                                transition.trigger=false
                            break
                        }
                    }
                }
            }
        }else if(this.turn==0&&this.combatants[0].life>0){
            this.onClickPotions()
            this.hand.onClickHand()
            if(pointInsideBox({position:inputs.rel},{position:{x:-68+this.anim.turn*100,y:525},width:40,height:30})){
                transition.trigger=true
                transition.scene='deck'
                this.setupDeck(1)
                this.context=3
            }else if(pointInsideBox({position:inputs.rel},{position:{x:-68+this.anim.turn*100,y:565},width:40,height:30})){
                this.close()
            }else if(pointInsideBox({position:inputs.rel},{position:{x:-68+this.anim.turn*100,y:445},width:40,height:30})){
                transition.trigger=true
                transition.scene='dictionary'
            }
        }
    }
    onKey(key,code){
        if(this.end){
            if(code==ENTER){
                transition.trigger=true
                transition.scene='map'
                if(this.map.position[0]>=0){
                    this.map.complete[this.map.position[0]][this.map.position[1]]=1
                }   
                if(this.relics.active[3]){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+2)
                }
                if(this.relics.active[49]&&this.combatants[0].life<this.combatants[0].base.life/2){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+12)
                }
                if(this.relics.active[137]){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+6)
                }
                if(this.relics.active[167]&&this.counter.taken==0){
                    this.random.strengthBase++
                }
                for(let e=0,le=this.objective.length;e<le;e++){
                    if(this.objective[e][0]==0||this.objective[e][0]==1&&this.counter.turn<=this.objective[e][1]||this.objective[e][0]==2&&this.counter.taken<this.objective[e][1]){
                        switch(this.objective[e][2]){
                            case 0:
                                transition.scene='choice'
                                this.setupChoice(0,floor(random(0,1.5)),0)
                            break
                            case 1:
                                transition.scene='choice'
                                if(this.relics.active[159]){
                                    this.setupChoice(1,floor(random(1,2.5)),0)
                                }else{
                                    this.setupChoice(1,floor(random(0,1.5)),0)
                                }
                            break
                            case 2:
                                if(this.relics.active[164]){
                                    this.currency.money+=round(this.objective[e][3]*1.5)
                                }else{
                                    this.currency.money+=this.objective[e][3]
                                }
                            break
                            case 3:
                                this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+this.objective[e][3])
                            break
                            case 4:
                                this.calc.list=[0,0,0,1,1,2]
                                g=this.calc.list[floor(random(0,this.calc.list.length))]
                                f=floor(random(0,this.relics.list[g].length))
                                this.getRelic(this.relics.list[g][f])
                                this.relics.list[g].splice(f,1)
                            break
                            case 5:
                                this.calc.list=[0,0,0,1,1,2]
                                g=this.calc.list[floor(random(0,this.calc.list.length))]
                                f=floor(random(0,this.potions.list[g].length))
                                this.getPotion(this.potions.list[g][f])
                            break
                            case 6:
                                transition.scene='choice'
                                this.setupChoice(0,2,0)
                                this.context=-69
                            break
                            case 7:
                                transition.trigger=false
                            break
                        }
                    }
                }
            }
        }else if(this.turn==0&&this.combatants[0].life>0){
            this.onClickPotions()
            this.hand.onKeyHand(key,code)
            if(key=='d'){
                transition.trigger=true
                transition.scene='deck'
                this.setupDeck(1)
                this.context=3
            }else if(code==ENTER){
                this.close()
            }else if(key=='i'){
                transition.trigger=true
                transition.scene='dictionary'
            }
        }
    }
    setupChoice(level,rarity,spec){
        this.choice.cards=[]
        this.context=0
        this.random.picked=0
        switch(spec){
            case 0:
                if(this.relics.active[111]){
                    this.calc.list=copyList(listing.card[14][rarity])
                }else{
                    this.calc.list=copyList(listing.card[this.player][rarity])
                }
                if(this.relics.active[123]){
                    if(this.relics.active[55]){
                        for(let g=0;g<2;g++){
                            if(this.calc.list.length>0){
                                h=floor(random(0,this.calc.list.length))
                                this.choice.cards.push(new card(this.layer,300+g*300,300,this.calc.list[h],level,types.card[this.calc.list[h]].list))
                                this.calc.list.splice(h,1)
                            }
                        }
                    }else{
                        if(this.calc.list.length>0){
                            h=floor(random(0,this.calc.list.length))
                            this.choice.cards.push(new card(this.layer,450,300,this.calc.list[h],level,types.card[this.calc.list[h]].list))
                            this.calc.list.splice(h,1)
                        }
                    }
                }else{
                    if(this.relics.active[55]){
                        for(let g=0;g<4;g++){
                            if(this.calc.list.length>0){
                                h=floor(random(0,this.calc.list.length))
                                this.choice.cards.push(new card(this.layer,180+g*180,300,this.calc.list[h],level,types.card[this.calc.list[h]].list))
                                this.calc.list.splice(h,1)
                            }
                        }
                    }else{
                        for(let g=0;g<3;g++){
                            if(this.calc.list.length>0){
                                h=floor(random(0,this.calc.list.length))
                                this.choice.cards.push(new card(this.layer,225+g*225,300,this.calc.list[h],level,types.card[this.calc.list[h]].list))
                                this.calc.list.splice(h,1)
                            }
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
            case 3:
                this.calc.list=[]
                for(let g=0;g<3;g++){
                    for(let h=0,lh=listing.card[this.player][g].length;h<lh;h++){
                        this.calc.list.push(listing.card[this.player][g][h])
                    }
                }
                for(let g=0;g<5;g++){
                    if(this.calc.list.length>0){
                        h=floor(random(0,this.calc.list.length))
                        this.choice.cards.push(new card(this.layer,150+g*150,300,this.calc.list[h],level,types.card[this.calc.list[h]].list))
                        this.calc.list.splice(h,1)
                    }
                }
            break
            case 4:
                this.calc.list=copyList(listing.card[0][rarity])
                for(let g=0;g<3;g++){
                    if(this.calc.list.length>0){
                        h=floor(random(0,this.calc.list.length))
                        this.choice.cards.push(new card(this.layer,225+g*225,300,this.calc.list[h],level,types.card[this.calc.list[h]].list))
                        this.calc.list.splice(h,1)
                    }
                }
            break
            case 5:
                this.calc.list=[]
                for(let g=0,lg=listing.card[15][0].length;g<lg;g++){
                    if(types.card[listing.card[15][0][g]].stats[0].class==0){
                        this.calc.list.push(listing.card[15][0][g])
                    }
                }
                for(let g=0;g<3;g++){
                    if(this.calc.list.length>0){
                        h=floor(random(0,this.calc.list.length))
                        this.choice.cards.push(new card(this.layer,225+g*225,300,this.calc.list[h],level,types.card[this.calc.list[h]].list))
                        this.calc.list.splice(h,1)
                    }
                }
            break
            case 6:
                this.calc.list=copyList(listing.card[15][0])
                for(let g=0;g<3;g++){
                    if(this.calc.list.length>0){
                        h=floor(random(0,this.calc.list.length))
                        this.choice.cards.push(new card(this.layer,225+g*225,300,this.calc.list[h],level,types.card[this.calc.list[h]].list))
                        this.calc.list.splice(h,1)
                    }
                }
            break
        }
        for(let g=0,lg=this.choice.cards.length;g<lg;g++){
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
        for(let e=0,le=this.choice.cards.length;e<le;e++){
            this.choice.cards[e].display(this.deck.cards.length,this.drawAmount,0,this.deck.cards.length-this.drawAmount,0,this.defaultRandom)
        }
    }
    updateChoice(){
        for(let e=0,le=this.choice.cards.length;e<le;e++){
            if(this.choice.cards[e].used&&this.choice.cards[e].size>0){
                this.choice.cards[e].size=round(this.choice.cards[e].size*10-1)/10
            }
        }
        if(this.context==3&&transition.anim>=1){
            this.setupChoice(0,floor(this.random.chosen/12),0)
            this.context=2
        }
    }
    onClickChoice(){
        if(pointInsideBox({position:inputs.rel},{position:{x:450,y:450},width:80,height:40})){
            transition.trigger=true
            if(this.context==-69){
                transition.scene='bosschoice'
                this.setupBossChoice(0)
            }else if(this.context==-1){
                transition.scene='shop'
            }else{
                transition.scene='map'
            }
        }
        for(let e=0,le=this.choice.cards.length;e<le;e++){
            if(pointInsideBox({position:inputs.rel},this.choice.cards[e])&&this.choice.cards[e].size>=1){
                this.random.picked++
                if((this.random.picked==1&&!this.relics.active[86]||this.random.picked==2)&&this.context!=-1){
                    transition.trigger=true
                    transition.scene='map'
                }
                if(this.context==-6){
                    this.reserve.addShuffle(this.choice.cards[e].type,this.choice.cards[e].level,this.choice.cards[e].color)
                }else if(this.context==-5){
                    this.hand.add(this.choice.cards[e].type,this.choice.cards[e].level,this.choice.cards[e].color)
                    this.hand.cards[this.hand.cards.length-1].cost=0
                }else if(this.context==-3){
                    this.hand.add(this.choice.cards[e].type,this.choice.cards[e].level,this.choice.cards[e].color)
                    this.hand.add(this.choice.cards[e].type,this.choice.cards[e].level,this.choice.cards[e].color)
                }else if(this.context==-2){
                    this.hand.add(this.choice.cards[e].type,this.choice.cards[e].level,this.choice.cards[e].color)
                }else{
                    this.deck.add(this.choice.cards[e].type,this.choice.cards[e].level,this.choice.cards[e].color)
                }
                this.choice.cards[e].used=true
            }
        }
        if(transition.scene=='map'){
            if(this.context==1){
                transition.scene='rest'
            }else if(this.context==2){
                this.random.chosen++
                if(this.random.chosen>=15){
                    transition.scene='map'
                }else{
                    transition.scene='choice'
                    this.context=3
                }
            }else if(this.context==-2||this.context==-3||this.context==-4||this.context==-5||this.context==-6){
                transition.scene='battle'
            }else if(this.context==-69){
                transition.scene='bosschoice'
                this.setupBossChoice(0)
            }
        }
    }
    onKeyChoice(key,code){
        if(code==ENTER){
            transition.trigger=true
            if(this.context==-69){
                transition.scene='bosschoice'
                this.setupBossChoice(0)
            }else if(this.context==-1){
                transition.scene='shop'
            }else{
                transition.scene='map'
            }
        }
        for(let e=0,le=this.choice.cards.length;e<le;e++){
            if(int(key)==(e+1)&&this.choice.cards[e].size>=1){
                this.random.picked++
                if((this.random.picked==1&&!this.relics.active[86]||this.random.picked==2)&&this.context!=-1){
                    transition.trigger=true
                    transition.scene='map'
                }
                if(this.context==-6){
                    this.reserve.addShuffle(this.choice.cards[e].type,this.choice.cards[e].level,this.choice.cards[e].color)
                }else if(this.context==-5){
                    this.hand.add(this.choice.cards[e].type,this.choice.cards[e].level,this.choice.cards[e].color)
                    this.hand.cards[this.hand.cards.length-1].cost=0
                }else if(this.context==-3){
                    this.hand.add(this.choice.cards[e].type,this.choice.cards[e].level,this.choice.cards[e].color)
                    this.hand.add(this.choice.cards[e].type,this.choice.cards[e].level,this.choice.cards[e].color)
                }else if(this.context==-2){
                    this.hand.add(this.choice.cards[e].type,this.choice.cards[e].level,this.choice.cards[e].color)
                }else{
                    this.deck.add(this.choice.cards[e].type,this.choice.cards[e].level,this.choice.cards[e].color)
                }
                this.choice.cards[e].used=true
            }
        }
        if(transition.scene=='map'){
            if(this.context==1){
                transition.scene='rest'
            }else if(this.context==2){
                this.random.chosen++
                if(this.random.chosen>=15){
                    transition.scene='map'
                }else{
                    transition.scene='choice'
                    this.context=3
                }
            }else if(this.context==-2||this.context==-3||this.context==-4||this.context==-5||this.context==-6){
                transition.scene='battle'
            }else if(this.context==-69){
                transition.scene='bosschoice'
                this.setupBossChoice(0)
            }
        }
    }
    setupMap(){
        this.map.main=[]
        this.map.complete=[]
        this.map.position=[-1,0]
        this.map.scroll=0
        this.map.scrollGoal=0
        for(let e=0;e<19;e++){
            this.map.main.push([])
            this.map.complete.push([])
        }
        for(let e=0,le=this.map.main.length;e<le;e++){
            for(let f=0;f<min(5,10-abs(9-e));f++){
                if(e==this.map.main.length-1){
                    this.map.main[e].push(5)
                }else if(floor(random(0,3))==0||e<2){
                    this.map.main[e].push(0)
                }else if(floor(random(0,6))==0&&stage.ascend<1||stage.ascend>=1&&floor(random(0,4))==0){
                    this.map.main[e].push(1)
                }else if(floor(random(0,3))==0){
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
        for(let e=0,le=this.map.main.length-1;e<le;e++){
            for(let f=0,lf=this.map.main[e].length;f<lf;f++){
                for(let g=0,lg=this.map.main[e+1].length;g<lg;g++){
                    if((g==f||g==f+1)&&this.map.main[e].length==this.map.main[e+1].length-1||(g==f-1||g==f||g==f+1)&&this.map.main[e].length==this.map.main[e+1].length||(g==f-1||g==f)&&this.map.main[e].length==this.map.main[e+1].length+1){
                        this.layer.line(530-this.map.main[e].length*80+f*160,300+e*100-this.map.scroll,530-this.map.main[e+1].length*80+g*160,400+e*100-this.map.scroll)
                    }
                }
            }
        }
        playerFill(this.layer,this.player,1)
        this.layer.strokeWeight(5)
        this.layer.rect(32,565,40,30,5)
        this.layer.fill(0)
        this.layer.noStroke()
        this.layer.textSize(12)
        this.layer.text('Deck',32,565)
        this.layer.textSize(20)
        for(let e=0,le=this.map.main.length;e<le;e++){
            for(let f=0,lf=this.map.main[e].length;f<lf;f++){
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
            this.setupDeck(5)
            this.context=5
        }
        for(let e=0,le=this.map.main.length;e<le;e++){
            for(let f=0,lf=this.map.main[e].length;f<lf;f++){
                if(dist(inputs.rel.x,inputs.rel.y,530-this.map.main[e].length*80+f*160,300+e*100-this.map.scroll)<50&&e==this.map.position[0]+1&&(this.map.position[0]==-1||(f==this.map.position[1]||f==this.map.position[1]+1)&&this.map.main[this.map.position[0]].length==this.map.main[e].length-1||(f==this.map.position[1]-1||f==this.map.position[1]||f==this.map.position[1]+1)&&this.map.main[this.map.position[0]].length==this.map.main[e].length||(f==this.map.position[1]-1||f==this.map.position[1])&&this.map.main[this.map.position[0]].length==this.map.main[e].length+1)){
                    this.map.position[0]=e
                    this.map.position[1]=f
                    this.map.scrollGoal+=100
                    transition.trigger=true
                    this.resetCombatant()
                    if(floor(random(0,5))==0&&this.currency.money<0){
                        this.deck.add(findCard('Debt'),0,stage.playerNumber+2)
                    }
                    if(this.relics.active[171]){
                        this.currency.money+=10
                    }
                    switch(this.map.main[e][f]){
                        case 0:
                            transition.scene='battle'
                            this.random.class=0
                            if(this.map.position[0]==0){
                                setupEncounter(this,zones[this.map.zone].special[0])
                            }else if(this.map.position[0]==1&&this.map.zone==0){
                                setupEncounter(this,73)
                            }else{
                                setupEncounter(this,zones[this.map.zone].encounters[0][floor(random(0,zones[this.map.zone].encounters[0].length))])
                            }
                            this.create()
                        break
                        case 1:
                            transition.scene='battle'
                            this.random.class=1
                            setupEncounter(this,zones[this.map.zone].encounters[1][floor(random(0,zones[this.map.zone].encounters[1].length))])
                            this.create()
                            if(this.relics.active[23]){
                                for(let g=0,lg=this.combatants.length;g<lg;g++){
                                    if(this.combatants[g].team==1){
                                        this.combatants[g].life*=0.8
                                    }
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
                            if(stage.ascend>=15&&floor(random(0,10))==0){
                                transition.scene='battle'
                                this.random.class=1
                                setupEncounter(this,zones[this.map.zone].encounters[1][floor(random(0,zones[this.map.zone].encounters[1].length))])
                                this.create()
                                if(this.relics.active[23]){
                                    for(let g=0,lg=this.combatants.length;g<lg;g++){
                                        if(this.combatants[g].team==1){
                                            this.combatants[g].life*=0.8
                                        }
                                    }
                                }
                            }else if(stage.ascend>=15&&floor(random(0,3))==0){
                                transition.scene='battle'
                                this.random.class=0
                                if(this.map.position[0]==0){
                                    setupEncounter(this,zones[this.map.zone].special[0])
                                }else{
                                    setupEncounter(this,zones[this.map.zone].encounters[0][floor(random(0,zones[this.map.zone].encounters[0].length))])
                                }
                                this.create()
                            }else{
                                transition.scene='event'
                                g=floor(random(0,this.eventList.length))
                                this.event=this.eventList[g]
                                this.eventList.splice(g,1)
                                this.page=0
                            }
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
                            this.random.class=2
                            setupEncounter(this,zones[this.map.zone].encounters[2][floor(random(0,zones[this.map.zone].encounters[2].length))])
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
    onKeyMap(key,code){
        if(key=='d'){
            transition.trigger=true
            transition.scene='deck'
            this.setupDeck(5)
            this.context=5
        }
        for(let e=0,le=this.map.main.length;e<le;e++){
            for(let f=0,lf=this.map.main[e].length;f<lf;f++){
                if(int(key)==(f+1)&&e==this.map.position[0]+1&&!transition.trigger&&(this.map.position[0]==-1||(f==this.map.position[1]||f==this.map.position[1]+1)&&this.map.main[this.map.position[0]].length==this.map.main[e].length-1||(f==this.map.position[1]-1||f==this.map.position[1]||f==this.map.position[1]+1)&&this.map.main[this.map.position[0]].length==this.map.main[e].length||(f==this.map.position[1]-1||f==this.map.position[1])&&this.map.main[this.map.position[0]].length==this.map.main[e].length+1)){
                    this.map.position[0]=e
                    this.map.position[1]=f
                    this.map.scrollGoal+=100
                    transition.trigger=true
                    this.resetCombatant()
                    if(floor(random(0,5))==0&&this.currency.money<0){
                        this.deck.add(findCard('Debt'),0,stage.playerNumber+2)
                    }
                    if(this.relics.active[171]){
                        this.currency.money+=10
                    }
                    switch(this.map.main[e][f]){
                        case 0:
                            transition.scene='battle'
                            this.random.class=0
                            if(this.map.position[0]==0){
                                setupEncounter(this,zones[this.map.zone].special[0])
                            }else if(this.map.position[0]==1&&this.map.zone==0){
                                setupEncounter(this,73)
                            }else{
                                setupEncounter(this,zones[this.map.zone].encounters[0][floor(random(0,zones[this.map.zone].encounters[0].length))])
                            }
                            this.create()
                        break
                        case 1:
                            transition.scene='battle'
                            this.random.class=1
                            setupEncounter(this,zones[this.map.zone].encounters[1][floor(random(0,zones[this.map.zone].encounters[1].length))])
                            this.create()
                            if(this.relics.active[23]){
                                for(let g=0,lg=this.combatants.length;g<lg;g++){
                                    if(this.combatants[g].team==1){
                                        this.combatants[g].life*=0.8
                                    }
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
                            if(stage.ascend>=15&&floor(random(0,10))==0){
                                transition.scene='battle'
                                this.random.class=1
                                setupEncounter(this,zones[this.map.zone].encounters[1][floor(random(0,zones[this.map.zone].encounters[1].length))])
                                this.create()
                                if(this.relics.active[23]){
                                    for(let g=0,lg=this.combatants.length;g<lg;g++){
                                        if(this.combatants[g].team==1){
                                            this.combatants[g].life*=0.8
                                        }
                                    }
                                }
                            }else if(stage.ascend>=15&&floor(random(0,3))==0){
                                transition.scene='battle'
                                this.random.class=0
                                if(this.map.position[0]==0){
                                    setupEncounter(this,zones[this.map.zone].special[0])
                                }else{
                                    setupEncounter(this,zones[this.map.zone].encounters[0][floor(random(0,zones[this.map.zone].encounters[0].length))])
                                }
                                this.create()
                            }else{
                                transition.scene='event'
                                g=floor(random(0,this.eventList.length))
                                this.event=this.eventList[g]
                                this.eventList.splice(g,1)
                                this.page=0
                            }
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
                            this.random.class=2
                            setupEncounter(this,zones[this.map.zone].encounters[2][floor(random(0,zones[this.map.zone].encounters[2].length))])
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
        for(let e=0,le=this.restOptions.length;e<le;e++){
            this.layer.rect(525+e*150-le*75,300,120,60,5)
        }
        this.layer.fill(0)
        this.layer.textSize(60)
        this.layer.text('Rest Site',450,150)
        this.layer.textSize(20)
        for(let e=0,le=this.restOptions.length;e<le;e++){
            switch(this.restOptions[e]){
                case 0:
                    this.layer.text('Skip',525+e*150-le*75,300)
                break
                case 1:
                    this.layer.text('Heal',525+e*150-le*75,300)
                break
                case 2:
                    this.layer.text('Upgrade',525+e*150-le*75,300)
                break
                case 3:
                    this.layer.text('Gain Max\nHealth',525+e*150-le*75,300)
                break
                case 4:
                    this.layer.text('Gain\nStrength',525+e*150-le*75,300)
                break
                case 5:
                    this.layer.text('Remove',525+e*150-le*75,300)
                break
                case 6:
                    this.layer.text('Gain\nRelic',525+e*150-le*75,300)
                break
            }
        }
    }
    updateRest(){
        this.combatants[0].update()
    }
    onClickRest(){
        if(!transition.trigger){
            for(let e=0,le=this.restOptions.length;e<le;e++){
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
                            this.combatants[0].base.life+=4
                            this.combatants[0].life+=4
                            transition.scene='map'
                        break
                        case 4:
                            this.random.strengthBase++
                            transition.scene='map'
                        break
                        case 5:
                            transition.scene='deck'
                            this.setupDeck(4)
                            this.context=4
                        break
                        case 6:
                            this.calc.list=[0,0,0,1,1,2]
                            g=this.calc.list[floor(random(0,this.calc.list.length))]
                            f=floor(random(0,this.relics.list[g].length))
                            this.getRelic(this.relics.list[g][f])
                            this.relics.list[0].splice(f,1)
                            transition.scene='map'
                        break
                    }
                }
            }
        }
    }
    onKeyRest(key,code){
        if(!transition.trigger){
            for(let e=0,le=this.restOptions.length;e<le;e++){
                if(int(key)==(e+1)){
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
                            this.combatants[0].base.life+=4
                            this.combatants[0].life+=4
                            transition.scene='map'
                        break
                        case 4:
                            this.random.strengthBase++
                            transition.scene='map'
                        break
                        case 5:
                            transition.scene='deck'
                            this.setupDeck(4)
                            this.context=4
                        break
                        case 6:
                            this.calc.list=[0,0,0,1,1,2]
                            g=this.calc.list[floor(random(0,this.calc.list.length))]
                            f=floor(random(0,this.relics.list[g].length))
                            this.getRelic(this.relics.list[g][f])
                            this.relics.list[0].splice(f,1)
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
        if(this.context==1||this.context==4||this.context==16||this.context==18){
            this.deck.displayView(-1)
            this.choice.cards[0].display(this.deck.cards.length,this.drawAmount,0,this.deck.cards.length-this.drawAmount,0,this.defaultRandom)
        }else if(this.context==2||this.context==3||this.context==10||this.context==11||this.context==12){
            this.discard.displayView(-1)
        }else if(this.context==5||this.context==6||this.context==9||this.context==14||this.context==15){
            this.deck.displayView(-1)
        }else if(this.context==17){
            this.reserve.displayView(-1)
        }else if(this.context==7||this.context==8||this.context==13){
            this.reserve.displayView(this.context2)
        }
        this.layer.noStroke()
        this.layer.fill(80)
        this.layer.rect(850,570,80,40,5)
        this.layer.fill(0)
        this.layer.textSize(20)
        if(this.context==3||this.context==5||this.context==6){
            this.layer.text('Back',850,570)
        }else if(this.context==1||this.context==2||this.context==4||this.context==7||this.context==8||this.context==9||this.context==10||this.context==11||this.context==12||this.context==13||this.context==14||this.context==15||this.context==16||this.context==17||this.context==18){
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
        if(this.relics.active[25]){
            this.costs.remove=60
        }
        if((inputs.keys[0][2]||inputs.keys[1][2])&&this.deck.scroll<floor((this.deck.cards.length-1)/6)*200-400){
            this.deck.scroll+=30
            for(let g=0,lg=this.choice.cards.length;g<lg;g++){
                this.choice.cards[g].position.y-=30
            }
        }
        if((inputs.keys[0][3]||inputs.keys[1][3])&&this.deck.scroll>0){
            this.deck.scroll-=30
            for(let g=0,lg=this.choice.cards.length;g<lg;g++){
                this.choice.cards[g].position.y+=30
            }
        }
        if(this.context==1||this.context==4||this.context==5||this.context==6||this.context==9||this.context==14||this.context==15||this.context==16||this.context==18){
            this.deck.updateView()
        }
    }
    onClickDeck(){
        if(pointInsideBox({position:inputs.rel},{position:{x:850,y:570},width:80,height:40})){
            transition.trigger=true
            if(this.context==1||this.context==4||this.context==5||this.context==14||this.context==15||this.context==16){
                transition.scene='map'
            }else if(this.context==2){
                this.close()
                transition.scene='battle'
            }else if(this.context==3||this.context==7||this.context==10||this.context==11||this.context==12||this.context==17||this.context==18){
                transition.scene='battle'
            }else if(this.context==6||this.context==9){
                transition.scene='shop'
            }else if(this.context==8){
                this.draw()
                transition.scene='battle'
            }else if(this.context==13){
                this.resetTurnProxy()
                transition.scene='battle'
            }
            if(this.context==7||this.context==8||this.context==13){
                for(let g=0,lg=this.discard.cards.length;g<lg;g++){
                    if(this.discard.cards[g].attack==329){
                        this.hand.cards.push(copyCard(this.discard.cards[g]))
                        this.hand.cards[this.hand.cards.length-1].position.x=1206
                        this.hand.cards[this.hand.cards.length-1].position.y=500
                        this.discard.cards.splice(g,1)
                        g--
                        lg--
                    }
                }
                if(this.combatants[0].status.main[69]>0){
                    this.combatants[0].addBlock(this.combatants[0].status.main[69])
                }
            }
        }
        if(this.context==1||this.context==4||this.context==6||this.context==9||this.context==14||this.context==15||this.context==16||this.context==18){
            this.deck.onClickView(this.context,this.context2)
        }else if(this.context==2||this.context==10||this.context==11||this.context==12){
            this.discard.onClickView(this.context,this.context2)
        }else if(this.context==7||this.context==8||this.context==17){
            this.reserve.onClickView(this.context,this.context2)
        }
    }
    displayEvent(){
        this.combatants[0].display()
        this.layer.noStroke()
        this.layer.fill(80,85,90)
        this.layer.rect(450,475,910,250)
        this.layer.fill(160)
        for(let e=0,le=types.event[this.event].pages[this.page].option.length;e<le;e++){
            this.layer.rect(450,350+e*60,200,50,5)
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
        this.layer.fill(255)
        this.layer.textSize(45)
        this.layer.text(types.event[this.event].name,450,50)
        this.layer.textSize(15)
        this.layer.text(types.event[this.event].pages[this.page].desc,450,200)
        for(let e=0,le=types.event[this.event].pages[this.page].option.length;e<le;e++){
            if(types.event[this.event].pages[this.page].optionDesc[e]==''){
                this.layer.text(types.event[this.event].pages[this.page].option[e],450,350+e*60)
            }else{
                this.layer.text(types.event[this.event].pages[this.page].option[e],450,340+e*60)
            }
        }
        this.layer.textSize(10)
        for(let e=0,le=types.event[this.event].pages[this.page].option.length;e<le;e++){
            this.layer.text(types.event[this.event].pages[this.page].optionDesc[e],450,360+e*60)
        }
        this.combatants[0].displayInfo()
    }
    updateEvent(){
        this.combatants[0].update()
        if(types.event[this.event].id==47&&this.page==0){
            types.event[this.event].pages[this.page].desc="You notice a group of hooded figures on the street, performing an unknown ritual.\n"+
            "As you approach, they turn to you in unison. The largest smiles and extends a hand toward you.\n"+
            '"'+"Join us, "+stage.identifier[0]+", and feel our power."+'"'
        }else if(types.event[this.event].id==49&&(this.page==1||this.page==2)){
            types.event[this.event].pages[this.page].desc='You feel a memory from within the stone...\n\n'
            switch(this.remember[1]){
                case 0:
                    types.event[this.event].pages[this.page].desc+="RAGE\n"+"The Commandant screams at all the officers, you included.\n"+
                    "He's clearly not happy with your recent performance. When he gets to you, he hands over several papers.\n"+
                    "Each contains worse news than the previous about the current state of the occupation forces."+
                    '"'+"Fix this mess, agent!"+'"'
                break
                case 1:
                    types.event[this.event].pages[this.page].desc+="SORROW\n"+"You stare deeply at the massive stab wound on her. Deep... and fatal.\n"+
                    "She was the only person left who ever cared for you, who actively stayed with you just so you could grieve together.\n"+
                    "Now, she's gone. You enter the mountains, never looking back at the home that took so much from you."
                break
                case 2:
                    types.event[this.event].pages[this.page].desc+="POWER\n"+"The burning remains of the crusher lie before you. All too easy.\n"+
                    "The officers viewing the battle applaud your effort. The leader invites you over where he shakes your hand.\n"+
                    "It's official now: you're a Management Executor. Under their rules, nobody can every take that away from you."
                break
                case 3:
                    types.event[this.event].pages[this.page].desc+="PAIN\n"+"The machine releases for the final time. Your muscles tense up once again.\n"+
                    "The pain becomes nearly unbearable, and you lose all sight of your surroundings.\n"+
                    "You try to cry out, but it's impossible. No sound comes out. It's over. This is your death...\n\n"+
                    "The supervisor waves his hand. The machine stops. You're finally able to recover and reevaluate the situation.\n"+
                    "He smiles and writes something down on a notepad, handing it to one of the scientists."
                break
                case 4:
                    types.event[this.event].pages[this.page].desc+="PRIDE\n"+"Finally, you have escaped the ghetto.\n"+
                    "There was a time when some officer could tell you what to do, but now, you are free.\n"+
                    "But with the guards still chasing you, there's only one place to go."+
                    "You fly toward the Empire of Konai."
                break
                case 5:
                    types.event[this.event].pages[this.page].desc+="EMPTINESS\n"+"How did you get here, you no longer know.\n"+
                    "You know absolutely nothing. The beam recedes, taking your memories with it..\n"+
                    "There's nothing you can do; your mind is spinning from the shock."+
                    "The only way is forward."
                break
                case 6:
                    types.event[this.event].pages[this.page].desc+="FAILURE\n"+"The hammer has come down.\n"+
                    "The lawyers talk amongst themselves, happy that they've received their verdict.\n"+
                    "The judge signs a couple papers before leaving you to your fate."+
                    "The soldiers take you away, but..."
                break
            }
        }else if(types.event[this.event].id==51&&this.page==0){
            types.event[this.event].pages[this.page].desc="You see a strange blue glow coming from a nearby lake. As you approach, you notice a woman sitting on a ledge.\n"+
            '"'+"I've been watching you, "+stage.identifier[3]+", having taken interest in your adventure. But there isn't much I can do right now."+'"\n'+
            '"'+"He'll always be watching, so I can only help you in a few ways."+'"\n'+
            "You avoid asking questions and decide what blessing you would like."
        }else if(types.event[this.event].id==72&&this.page==0){
            types.event[this.event].pages[this.page].desc="You enter a seemingly cheery-looking shop that seems to relate to what your working on right now.\n"+
            "The proprietor approaches from behidn the counter and greets you. "+'"'+"Hello, "+stage.identifier[1]+", what would you like?"+'", he says politely.\n'+
            "You're liking the place, when he looks over you again. "+'"'+"Actually, we don't serve people like you, not that it's illegal, of course..."+'"\n'+
            "It's illegal.\n\n"+
            "He reconsiders the final time. "+'"'+"Fine, what service would you like?"+'"\n'+
            "You could take one of the services, but you would rather slap him."
        }else if(types.event[this.event].id==89&&this.page==0){
            types.event[this.event].pages[this.page].desc="It's the same lake as before, only this time there's no glow. But something compels you to go there anyway.\n"+
            "You here the voice before you even near the lake. He knew about this all long before.\n"+
            '"'+"I've been watching you, "+stage.identifier[3]+", having taken interest in your adventure. But there I'm not limited like my suboordinate."+'"\n'+
            '"'+"I'll always be watching, but I have others to observe. Developing is hard work, as you might know."+'"\n'+
            "You have no idea what he's talking about.\n\n"+
            '"'+"Here's your prize. You haven't earned it, but nobody's earned anything as of yet."+'"'
        }else if(types.event[this.event].id==98&&this.page==0){
            types.event[this.event].pages[this.page].desc="A man wearing a trenchcoat walks by you. When he gets near, he quickly hands you a paper ball and runs away.\n"+
            "Unfolding the ball, you find a message from some sort of organization operating on the planet.\n"+
            '"'+stage.identifier[2]+", we would like to meet you tomorrow at our base."+'"\n'+
            "Looks like they've given you directions there as well."
        }else if(types.event[this.event].id==101&&this.page==0){
            types.event[this.event].pages[this.page].desc="You get into a taxi to cross a non-pedestrian-friendly bridge. "+'"'+"Hello, "+stage.identifier[1]+',"'+" he says.\n"+
            '"'+"I'm Alexander, your driver. Where would you like to go?"+'"'+" He accelerates as soon as you tell him your destination.\n"+
            "As he continually speeds up, you begin to get worried. This is exacerbated when he starts swerving through traffic.\n"+
            "It is at that moment you realize that the other cars are driving the other way."
        }
    }
    onClickEvent(){
        if(!transition.trigger){
            for(e=0,le=types.event[this.event].pages[this.page].option.length;e<le;e++){
                if(pointInsideBox({position:inputs.rel},{position:{x:450,y:350+e*60},width:200,height:50})){
                    this.triggerEvent()
                }
            }
        }
    }
    onKeyEvent(key,code){
        if(!transition.trigger){
            for(e=0,le=types.event[this.event].pages[this.page].option.length;e<le;e++){
                if(int(key)==(e+1)){
                    this.triggerEvent()
                }
            }
        }
    }
    triggerEvent(){
        if(types.event[this.event].pages[this.page].link[e]==-1){
            this.map.complete[this.map.position[0]][this.map.position[1]]=1
            transition.trigger=true
            transition.scene='map'
        }
        this.remember[0,0]=0
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
                }else if(this.page==2&&e==0&&this.currency.money>0){
                    this.currency.money=0
                }
            break
            case 7:
                if((this.page==0||this.page==1)&&e==0&&floor(random(0,2))==0){
                    this.remember[0]=3-types.event[this.event].pages[this.page].link[e]
                }else if((this.page==0||this.page==1)&&e==1){
                    setupEncounter(current,zones[0].special[1])
                    this.create()
                    transition.scene='battle'
                }else if(this.page==3&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-6)
                    setupEncounter(current,zones[0].special[1])
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
                    current.getRelic(findRelic('Bent Pliers'))
                }
            break
            case 12:
                if(this.page==0&&e==0){
                    setupEncounter(current,zones[0].special[2])
                    this.create()
                    transition.scene='battle'
                }else if(this.page==1&&e==0){
                    this.loseRelic()
                }
            break
            case 13:
                if(this.page==1&&e==0){
                    this.loseRelic()
                }else if(this.page==2&&e==0){
                    this.deck.cards.splice(floor(random(0,this.deck.cards.length)),1)
                    this.deck.cards.splice(floor(random(0,this.deck.cards.length)),1)
                }else if(this.page==3&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-13)
                }
            break
            case 14:
                if(this.page==0&&e==0){
                    setupEncounter(current,zones[0].special[3])
                    this.create()
                    transition.scene='battle'
                    for(let f=0,lf=this.combatants.length;f<lf;f++){
                        if(this.combatants[f].team==1){
                            this.combatants[f].life=round(this.combatants[f].life*random(0.8,1))
                        }
                    }
                }else if(this.page==0&&e==2&&floor(random(0,3))==0){
                    this.remember[0]=1
                }else if(this.page==1&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-7)
                }else if(this.page==3&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-11)
                    setupEncounter(current,zones[0].special[3])
                    this.create()
                    transition.scene='battle'
                }
            break
            case 15:
                if(this.page==0&&e==0){
                    this.deck.add(findCard('Mixture A'),0,0)
                }else if(this.page==0&&e==1){
                    this.deck.add(findCard('Mixture B'),0,0)
                }else if(this.page==0&&e==2){
                    this.deck.add(findCard('Mixture C'),0,0)
                }
            break
            case 16:
                if(this.page==0&&(e==0||e==1)&&floor(random(0,3))==0){
                    this.remember[0]=1
                }else if(this.page==1&&e==0){
                    this.currency.money+=50
                }else if((this.page==2||this.page==3)&&e==0){
                    this.currency.money-=50
                }else if(this.page==4&&e==0){
                    this.currency.money+=150
                }
            break
            case 17:
                if(this.page==0&&(e==0||e==1||e==2)&&floor(random(0,3))==0){
                    this.remember[0]=1
                }else if(this.page==1){
                    this.currency.money+=100
                }else if(this.page==2){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-30)
                }
            break
            case 18:
                if(this.page==1&&e==0){
                    setupEncounter(current,zones[0].special[4])
                    this.create()
                    transition.scene='battle'
                }
            break
            case 19:
                if(this.page==0&&e==0){
                    transition.trigger=true
                    transition.scene='deck'
                    this.setupDeck(14)
                    this.context=14
                }
            break
            case 20:
                if(this.page==1&&e==0){
                    this.deck.cards.splice(floor(random(0,this.deck.cards.length)),1)
                }else if(this.page==2&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-5)
                }else if(this.page==3&&e==0){
                    this.currency.money-=20
                }
            break
            case 21:
                if(this.page==0&&e==0){
                    this.currency.money-=50
                    this.eventList.push(findEvent('Payout'))
                }
            break
            case 22:
                if(this.page==0&&e==0){
                    this.currency.money+=250
                }
            break
            case 23:
                if(this.page==0&&e==0){
                    this.currency.money-=60
                }else if(this.page==0&&e==1){
                    setupEncounter(current,zones[0].special[5])
                    this.create()
                    transition.scene='battle'
                }
            break
            case 24:
                if(this.page==0&&e==0&&floor(random(0,3))==0){
                    this.remember[0]=1
                }else if(this.page==1){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-20)
                }else if(this.page==2){
                    this.currency.money+=200
                }
            break
            case 25:
                if((this.page==0||this.page==1)&&e==0&&floor(random(0,3))==0){
                    this.remember[0]=2-this.page
                }else if((this.page==0||this.page==1||this.page==2)&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-5)
                }else if(this.page==3&&e==0){
                    this.calc.list=[0,0,0,1,1,2]
                    g=this.calc.list[floor(random(0,this.calc.list.length))]
                    f=floor(random(0,this.relics.list[g].length))
                    this.getRelic(this.relics.list[g][f])
                    this.relics.list[g].splice(f,1)
                }
            break
            case 26:
                if(this.page==0&&e==1&&floor(random(0,2))==0){
                    this.remember[0]=1
                }else if(this.page==2&&e==0){
                    this.currency.money+=100
                }else if(this.page==3&&e==0){
                    this.currency.money-=50
                }
            break
            case 27:
                if(this.page==1&&e==0){
                    for(let g=0,lg=this.deck.cards.length;g<lg;g++){
                        if(this.deck.cards[g].list==10){
                            this.deck.cards.splice(g,1)
                            g--
                            lg--
                        }
                    }
                }
            break
            case 28:
                if(this.page==1&&e==0){
                    this.currency.money+=75
                }else if(this.page==2&&e==0){
                    this.currency.money+=175
                    this.deck.add(findCard('Regret'),0,stage.playerNumber+2)
                }
            break
            case 29:
                if(this.page==1&&e==0){
                    transition.scene='deck'
                    this.setupDeck(1)
                    this.context=1
                }
            break
            case 30:
                if(this.page==1&&e==0){
                    transition.scene='deck'
                    this.setupDeck(15)
                    this.context=15
                }
            break
            case 31:
                if(this.page==1&&e==0){
                    transition.scene='deck'
                    this.setupDeck(4)
                    this.context=4
                }
            break
            case 32:
                if(this.page==1&&e==0){
                    this.combatants[0].life+=5
                    this.combatants[0].base.life+=5
                }else if(this.page==2&&e==0){
                    this.calc.list=[0,0,0,1,1,2]
                    g=this.calc.list[floor(random(0,this.calc.list.length))]
                    f=floor(random(0,this.relics.list[g].length))
                    this.getRelic(this.relics.list[g][f])
                    this.relics.list[g].splice(f,1)
                    this.deck.add(findCard('Regret'),0,stage.playerNumber+2)
                }
            break
            case 33:
                if(this.page==0&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-12)
                }else if(this.page==1&&e==0){
                    this.deck.randomUpgrade()
                    this.deck.randomUpgrade()
                }
            break
            case 34:
                if(this.page==0&&e==0){
                    this.currency.main-=35
                }else if(this.page==0&&e==1){
                    this.currency.main-=50
                }else if(this.page==1&&e==0){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+15)
                }else if(this.page==2&&e==0){
                    transition.scene='deck'
                    this.setupDeck(4)
                    this.context=4
                }
            break
            case 35:
                if(this.page==0&&e==0){
                    this.currency.money+=175
                }else if(this.page==1&&e==0){
                    this.deck.add(findCard('Doubt'),0,stage.playerNumber+2)
                }
            break
            case 36:
                if(this.page==1&&e==0){
                    transition.scene='deck'
                    this.setupDeck(4)
                    this.context=4
                }else if(this.page==2&&e==0){
                    for(let g=0,lg=this.deck.cards.length;g<lg;g++){
                        if(this.deck.cards[g].list==stage.playerNumber+1&&this.deck.cards[g].level==0){
                            this.deck.cards[g].level++
                            this.deck.cards[g]=reformCard(this.deck.cards[g])
                        }
                    }
                }
            break
            case 37:
                if(this.page==0&&e==0){
                    this.combatants[0].base.life*=0.5
                    this.combatants[0].life=min(this.combatants[0].life,this.combatants[0].base.life)
                }else if(this.page==1&&e==0){
                    for(let g=0;g<5;g++){
                        this.deck.add(findCard('Apparition'),0,0)
                    }
                }
            break
            case 38:
                if(this.page==0&&(e==0||e==1)){
                    this.currency.money-=50
                    if(floor(random(0,2))==0){
                        this.remember[0]=1
                    }
                }else if(this.page==1&&e==0){
                    this.currency.money+=100
                }
            break
            case 39:
                if(this.page==1&&e==0){
                    transition.scene='choice'
                    this.setupChoice(0,0,3)
                }else if(this.page==2&&e==0){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+25)
                }
            break
            case 40:
                if(this.page==0&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-18)
                }else if(this.page==1&&e==0){
                    this.combatants[0].life+=5
                    this.combatants[0].base.life+=5
                }else if(this.page==2&&e==0){
                    this.deck.add(findCard('Decay'),0,stage.playerNumber+2)
                }
            break
            case 41:
                if(this.page==0&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-1)
                }else if(this.page==2&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-2)
                }else if(this.page==3&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-3)
                }else if(this.page==4&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-10)
                }else if(this.page==5&&e==0){
                    current.getRelic(findRelic('Audrian Codex'))
                    this.eventList.push(findEvent('Collector'))
                }
            break
            case 42:
                if(this.page==0&&e==0){
                    setupEncounter(current,zones[0].special[6])
                    this.create()
                    transition.scene='battle'
                }else if(this.page==1&&e==0){
                    this.deck.add(findCard('Guilt'),0,stage.playerNumber+2)
                }
            break
            case 43:
                if(this.page==1&&e==0){
                    this.currency.money+=300
                    this.relics.active[findRelic('Audrian Codex')]=false
                }else if(this.page==2&&e==0){
                    this.relics.active[findRelic('Audrian Codex')]=false
                }
            break
            case 44:
                if(this.page==0&&e==0){
                    this.calc.list=[0,0,0,1,1,2]
                    g=this.calc.list[floor(random(0,this.calc.list.length))]
                    f=floor(random(0,this.relics.list[g].length))
                    this.getRelic(this.relics.list[g][f])
                    this.relics.list[g].splice(f,1)
                }else if(this.page==1&&e==0){
                    this.deck.add(findCard('Writhe'),0,stage.playerNumber+2)
                }
            break
            case 45:
                if(this.page==0&&(e==0||e==1||e==2)){
                    this.combatants[0].life-=8
                }else if(this.page==1&&e==0){
                    this.currency.money+=45
                }else if(this.page==2&&e==0){
                    this.deck.add(listing.card[0][1][floor(random(0,listing.card[0][1].length))],0,0)
                }else if(this.page==3&&e==0){
                    this.calc.list=[0,0,0,1,1,2]
                    g=this.calc.list[floor(random(0,this.calc.list.length))]
                    f=floor(random(0,this.potions.list[g].length))
                    this.getPotion(this.potions.list[g][f])
                }
            break
            case 46:
                if(this.page==0&&e==0){
                    this.currency.money-=50
                }else if(this.page==1&&e==0){
                    this.calc.list=[0,0,0,1,1,2]
                    g=this.calc.list[floor(random(0,this.calc.list.length))]
                    f=floor(random(0,this.relics.list[g].length))
                    this.getRelic(this.relics.list[g][f])
                    this.relics.list[g].splice(f,1)
                }else if(this.page==2&&e==0){
                    this.calc.list=[0,0,0,1,1,2]
                    g=this.calc.list[floor(random(0,this.calc.list.length))]
                    f=floor(random(0,this.relics.list[g].length))
                    this.getRelic(this.relics.list[g][f])
                    this.relics.list[g].splice(f,1)
                    this.deck.add(findCard('Shame'),0,stage.playerNumber+2)
                }
            break
            case 47:
                if(this.page==0&&e==0){
                    this.combatants[0].base.life*=0.75
                    this.combatants[0].life=min(this.combatants[0].life,this.combatants[0].base.life)
                    for(let g=0,lg=this.deck.cards.length;g<lg;g++){
                        if(this.deck.cards[g].list==stage.playerNumber+1&&this.deck.cards[g].attack==1){
                            this.deck.cards.splice(g,1)
                            g--
                            lg--
                        }
                    }
                }else if(this.page==1&&e==0){
                    for(let g=0;g<5;g++){
                        this.deck.add(findCard('Bite'),0,0)
                    }
                }
            break
            case 48:
                if(this.page==0&&e==0){
                    for(let g=0,lg=this.deck.cards.length;g<lg;g++){
                        if(this.deck.cards[g].level==0){
                            this.deck.cards[g].level++
                            this.deck.cards[g]=reformCard(this.deck.cards[g])
                        }
                    }
                }else if(this.page==0&&e==1){
                    this.currency.money+=999
                }else if(this.page==0&&e==2){
                    this.combatants[0].life+=this.combatants[0].base.life*0.5
                    this.combatants[0].base.life*=1.5
                }else if(this.page==1&&e==0){
                    this.getRelic(findRelic('Too Much Knowledge'))
                }else if(this.page==2&&e==0){
                    this.deck.add(findCard('Normality'),0,stage.playerNumber+2)
                    this.deck.add(findCard('Normality'),0,stage.playerNumber+2)
                }else if(this.page==3&&e==0){
                    this.deck.add(findCard('Doubt'),0,stage.playerNumber+2)
                }
            break
            case 49:
                if(this.page==0){
                    this.remember[1]=floor(random(0,7))
                }else if(this.page==1&&e==0){
                    this.deck.add(listing.card[0][1][floor(random(0,listing.card[0][1].length))],0,0)
                }else if(this.page==2&&e==0){
                    this.deck.add(listing.card[0][2][floor(random(0,listing.card[0][2].length))],0,0)
                }
            break
            case 50:
                if(this.page==1&&e==0){
                    this.deck.add(findCard('Madness'),0,0)
                    this.deck.add(findCard('Madness'),0,0)
                    this.combatants[0].base.life-=10
                    this.combatants[0].life=min(this.combatants[0].life,this.combatants[0].base.life)
                }else if(this.page==2&&e==0){
                    this.deck.add(findCard('Writhe'),0,stage.playerNumber+2)
                }else if(this.page==3&&e==0){
                    this.combatants[0].base.life-=5
                    this.combatants[0].life=min(this.combatants[0].life,this.combatants[0].base.life)
                }
            break
            case 51:
                if(this.page==0){
                    this.eventList.push(findEvent('The God'))
                }
                if(this.page==1&&e==0){
                    this.combatants[0].life=this.combatants[0].base.life
                }else if(this.page==2&&e==0){
                    this.calc.list=[0,0,0,1,1,2]
                    g=this.calc.list[floor(random(0,this.calc.list.length))]
                    f=floor(random(0,this.relics.list[g].length))
                    this.getRelic(this.relics.list[g][f])
                    this.relics.list[g].splice(f,1)
                }else if(this.page==3&&e==0){
                    this.calc.list=[0,0,0,1,1,2]
                    g=this.calc.list[floor(random(0,this.calc.list.length))]
                    f=floor(random(0,this.potions.list[g].length))
                    this.getPotion(this.potions.list[g][f])
                }
            break
            case 52:
                if(this.page==1&&e==0){
                    this.currency.money+=10
                }else if(this.page==2&&e==0){
                    this.eventList.push(findEvent('Return of Duck'))
                }else if(this.page==3&&e==0){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+20)
                }
            break
            case 53:
                if(this.page==0&&e==0){
                    this.getRelic(findRelic('McDuck Burger'))
                }
            break
            case 54:
                if(this.page==1&&e==0){
                    this.deck.cards.splice(floor(random(0,this.deck.cards.length)),1)
                }else if(this.page==2&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-6)
                }
            break
            case 55:
                if((this.page==2||this.page==4)&&e==0){
                    this.calc.list=listing.card[this.player]
                    if(this.calc.list.length>0){
                        g=floor(random(0,this.calc.list.length))
                        if(this.calc.list[g].length>0){
                            h=floor(random(0,this.calc.list[g].length))
                            this.deck.add(this.calc.list[g][h],0,types.card[this.calc.list[g][h]].list)
                        }
                    }
                }else if(this.page==5&&e==0){
                    this.combatants[0].base.meterControl-=2
                }
            break
            case 56:
                if(this.page==0&&e==0){
                    this.currency.money+=50
                }else if(this.page==0&&e==1){
                    this.currency.money-=25
                }else if(this.page==1&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-11)
                }
            break
            case 57:
                if(this.page==1&&e==0){
                    setupEncounter(current,zones[0].special[7])
                    this.create()
                    transition.scene='battle'
                }else if(this.page==2&&e==0){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+20)
                    this.deck.add(findCard('Parasite'),0,stage.playerNumber+2)
                }
            break
            case 58:
                if(this.page==1&&e==0){
                    for(let h=0;h<3;h++){
                        this.calc.list=[0,0,0,1,1,2]
                        g=this.calc.list[floor(random(0,this.calc.list.length))]
                        f=floor(random(0,this.relics.list[g].length))
                        this.getRelic(this.relics.list[g][f])
                        this.relics.list[g].splice(f,1)
                    }
                    setupEncounter(current,zones[0].special[8])
                    this.create()
                    transition.scene='battle'
                }
            break
            case 59:
                if(this.page==0&&e==1&&this.currency.money>0){
                    this.currency.money=0
                }else if(this.page==1&&e==0){
                    setupEncounter(current,zones[0].special[9])
                    this.create()
                    transition.scene='battle'
                }
            break
            case 60:
                if(this.page==1&&e==0){
                    setupEncounter(current,zones[0].special[10])
                    this.create()
                    transition.scene='battle'
                }
            break
            case 61:
                if(this.page==1&&e==0){
                    transition.trigger=true
                    transition.scene='deck'
                    this.setupDeck(1)
                    this.context=1
                }else if(this.page==2&&e==0){
                    transition.scene='choice'
                    this.setupChoice(0,1,0)
                }else if(this.page==3&&e==0){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+5)
                }
            break
            case 62:
                if(this.page==0&&(e==0||e==1)){
                    this.currency.money-=25
                }else if(this.page==1&&e==0){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+15)
                }else if(this.page==2&&e==0){
                    this.combatants[0].life+=4
                    this.combatants[0].base.life+=4
                }else if(this.page==3&&e==0){
                    this.currency.money+=10
                }
            break
            case 63:
                if(this.page==1&&e==0){
                    this.calc.list=[0,0,0,1,1,2]
                    g=this.calc.list[floor(random(0,this.calc.list.length))]
                    f=floor(random(0,this.relics.list[g].length))
                    this.getRelic(this.relics.list[g][f])
                    this.relics.list[g].splice(f,1)
                    this.currency.money+=45
                }else if(this.page==2&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-25)
                }
            break
            case 64:
                if(this.page==1&&e==0){
                    this.deck.add(findCard('Philosophy'),0,0)
                }
            break
            case 65:
                if(this.page==1&&e==0){
                    this.deck.add(findCard('Anxiety'),0,stage.playerNumber+2)
                }else if(this.page==2&&e==0){
                    transition.scene='choice'
                    this.setupChoice(0,2,0)
                }
            break
            case 66:
                if(this.page==0&&e==0){
                    transition.trigger=true
                    transition.scene='shop'
                    this.setupShop(1)
                }
            break
            case 67:
                if(this.page==0&&e==0){
                    this.currency.main+=100
                    g=findEvent('Debt Squad')
                    for(let f=0;f<25;f++){
                        this.eventList.push(g)
                    }
                }
            break
            case 68:
                if((this.page==0||this.page==1)&&e==0){
                    setupEncounter(current,zones[0].special[11])
                    this.create()
                    transition.scene='battle'
                }else if(this.page==0&&e==1&&this.currency.money>0){
                    this.currency.money=0
                }else if(this.page==1&&e==1){
                    transition.trigger=false
                }
            break
            case 69:
                if(this.page==1&&e==0){
                    setupEncounter(current,zones[0].special[12])
                    this.create()
                    transition.scene='battle'
                }else if(this.page==2&&e==0){
                    this.combatants[0].base.life-=3
                    this.combatants[0].life=min(this.combatants[0].life,this.combatants[0].base.life)
                }
            break
            case 70:
                if(this.page==1&&e==0){
                    this.loseRelic()
                    if(this.currency.money>0){
                        this.currency.money=0
                    }
                }else if(this.page==2&&e==0){
                    this.combatants[0].base.life-=9
                    this.combatants[0].life=min(this.combatants[0].life,this.combatants[0].base.life)
                }else if(this.page==3&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-27)
                }else if(this.page==4&&e==0){
                    setupEncounter(current,zones[0].special[13])
                    this.create()
                    transition.scene='battle'
                }
            break
            case 71:
                if(this.page==0&&e==0){
                    transition.trigger=true
                    transition.scene='deck'
                    this.setupDeck(16)
                    this.context=16
                }
            break
            case 72:
                if(this.page==0&&e==0){
                    this.currency.money-=40
                }else if(this.page==0&&e==1){
                    this.currency.money-=60
                }else if(this.page==1&&e==0){
                    this.deck.randomUpgrade()
                    this.deck.randomUpgrade()
                }else if(this.page==2&&e==0){
                    transition.trigger=true
                    transition.scene='deck'
                    this.setupDeck(4)
                    this.context=4
                }else if(this.page==3&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-1)
                }
            break
            case 73:
                if(this.page==0&&e==0){
                    this.loseRelic()
                    this.getRelic(findRelic('Klein Box'))
                }
            break
            case 74:
                if(this.page==0&&e==0){
                    this.combatants[0].base.life-=2
                    this.combatants[0].life=min(this.combatants[0].life,this.combatants[0].base.life)
                }else if(this.page==1&&e==0){
                    transition.scene='choice'
                    this.setupChoice(0,2,0)
                }
            break
            case 75:
                if(this.page==0&&e==0){
                    transition.scene='choice'
                    this.setupChoice(0,1,0)
                }else if(this.page==0&&e==1){
                    transition.trigger=true
                    transition.scene='deck'
                    this.setupDeck(1)
                    this.context=1
                }
            break
            case 76:
                if(this.page==1&&e==0){
                    this.getRelic(findRelic('Bottled Flame'))
                }
            break
            case 77:
                if(this.page==1&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-3)
                }else if(this.page==2&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-12)
                    this.getRelic(findRelic('Bottled Rock'))
                }
            break
            case 78:
                if(this.page==1&&e==0){
                    this.calc.list=[findCard('Charge'),findCard('Detonate'),findCard('Shielding'),findCard('Energize'),findCard('Darkness'),findCard('Zap'),findCard('Illuminate'),findCard('Enflame')]
                    for(let g=0;g<3;g++){
                        h=floor(random(0,this.calc.list.length))
                        this.deck.add(this.calc.list[h],floor(random(0,2)),this.player)
                        this.calc.list.splice(h,1)
                    }
                }
            break
            case 79:
                if(this.page==2&&e==0){
                    this.deck.add(findCard('MBF-32\nShield'),0,0)
                }
            break
            case 80:
                if(this.page==0&&e==0&&floor(random(0,2))==0){
                    this.remember[0]=1
                }else if(this.page==1&&e==0){
                    transition.trigger=true
                    transition.scene='deck'
                    this.setupDeck(1)
                    this.context=1
                }else if(this.page==2&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-20)
                    this.getRelic(findRelic('Martyrdom'))
                }
            break
            case 81:
                if(this.page==0&&e==0){
                    this.combatants[0].base.life-=10
                    this.combatants[0].life=min(this.combatants[0].life,this.combatants[0].base.life)
                }else if(this.page==1&&e==0){
                    this.getRelic(findRelic('Bottled Life'))
                }
            break
            case 82:
                if(this.page==1&&e==0){
                    this.getPotion(findPotion('Starflame'))
                }else if(this.page==2&&e==0){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+6)
                }
            break
            case 83:
                if((this.page==1||this.page==2)&&e==0){
                    transition.trigger=true
                    transition.scene='deck'
                    this.setupDeck(1)
                    this.context=1
                }
            break
            case 84:
                if(this.page==2&&e==0){
                    transition.scene='choice'
                    this.setupChoice(0,1,0)
                }
            break
            case 85:
                if(this.page==0&&e==0){
                    setupEncounter(current,zones[0].special[14])
                    this.create()
                    transition.scene='battle'
                    this.objective=[[0,0,0,0],[0,0,2,75]]
                }else if(this.page==0&&e==1&&floor(random(0,2))==0){
                    this.remember[0]=1
                }else if(this.page==1&&e==0){
                    this.currency.money+=125
                }else if(this.page==2&&e==0){
                    this.currency.money-=125
                }
            break
            case 86:
                if(this.page==1&&e==0){
                    this.deck.add(findCard('Pistol'),0,0)
                }else if(this.page==12&&e==0){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+12)
                }
            break
            case 87:
                if(this.page==0&&e==0){
                    this.getRelic(findRelic('Gold Bar'))
                }else if(this.page==3&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-16)
                }else if(this.page==4&&e==0){
                    this.combatants[0].base.life-=10
                    this.combatants[0].life=min(this.combatants[0].life,this.combatants[0].base.life)
                }else if(this.page==5&&e==0){
                    this.deck.add(findCard('Injury'),0,stage.playerNumber+2)
                }
            break
            case 88:
                if(this.page==1&&e==0){
                    this.getPotion(findPotion('Cola'))
                }
            break
            case 89:
                if(this.page==1&&e==0){
                    this.getRelic(findRelic('Dev Console'))
                }
            break
            case 90:
                if(this.page==1&&e==0){
                    this.combatants[0].base.life=round(this.combatants[0].base.life*0.5)
                    this.combatants[0].life=min(this.combatants[0].life,this.combatants[0].base.life)
                    this.getRelic(findRelic('Orb of Discord'))
                }
            break
            case 91:
                if(this.page==2&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-3)
                }else if(this.page==3&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-9)
                    this.combatants[0].base.meterControl-=2
                }
            break
            case 92:
                if(this.page==1&&e==0){
                    this.getRelic(findRelic('Management Pin'))
                }else if(this.page==2&&e==0){
                    this.getRelic(findRelic('Shattered Pin'))
                }else if(this.page==3&&e==0){
                    this.currency.money+=235
                }
            break
            case 93:
                if(this.page==0&&e==0&&floor(random(0,2))==0){
                    this.remember[0]=1
                }else if(this.page==1&&e==0){
                    this.currency.money+=9
                    transition.scene='choice'
                    this.setupChoice(0,1,0)
                }else if(this.page==4&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-14)
                }else if(this.page==5&&e==0){
                    this.combatants[0].base.life-=3
                    this.combatants[0].life=min(this.combatants[0].life,this.combatants[0].base.life)
                }
            break
            case 94:
                if(this.page==0&&(e==0||e==1)&&floor(random(0,4))==0){
                    this.remember[0]=1
                }else if(this.page==1&&e==0){
                    this.currency.money+=40
                }else if(this.page==2&&e==0){
                    this.currency.money+=60
                }else if(this.page==3&&e==0){
                    this.currency.money+=9
                    transition.scene='choice'
                    this.setupChoice(0,2,0)
                }else if(this.page==4&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-20)
                }
            break
            case 95:
                if(this.page==1&&e==0){
                    this.calc.list=[0,0,0,1,1,2]
                    g=this.calc.list[floor(random(0,this.calc.list.length))]
                    f=floor(random(0,this.relics.list[g].length))
                    this.getRelic(this.relics.list[g][f])
                    this.relics.list[g].splice(f,1)
                }else if(this.page==2&&e==0){
                    transition.scene='choice'
                    this.setupChoice(0,2,0)
                }
            break
            case 96:
                if(this.page==1&&e==0){
                    this.getRelic(findRelic('Internal Wrath'))
                }else if(this.page==2&&e==0){
                    this.getRelic(findRelic('Internal Calm'))
                }
            break
            case 97:
                if(this.page==0&&e==0){
                    this.currency.money-=100
                }else if(this.page==1&&e==0){
                    this.getRelic(findRelic('Stocks'))
                }
            break
            case 98:
                if(this.page==0&&e==0&&floor(random(0,2))==0){
                    this.remember[0]=1
                }else if(this.page==2&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-6)
                }else if((this.page==3||this.page==4)&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-3)
                }else if(this.page==6&&e==0){
                    this.calc.list=[0,0,0,1,1,2]
                    g=this.calc.list[floor(random(0,this.calc.list.length))]
                    f=floor(random(0,this.relics.list[g].length))
                    this.getRelic(this.relics.list[g][f])
                    this.relics.list[g].splice(f,1)
                }
            break
            case 99:
                if(this.page==0&&e==0&&floor(random(0,2))==0){
                    this.remember[0]=1
                }else if(this.page==2&&e==0){
                    transition.scene='choice'
                    this.setupChoice(0,1,0)
                }else if(this.page==3&&e==0){
                    this.deck.add(listing.card[this.player][2][floor(random(0,listing.card[this.player][2].length))],0,0)
                }
            break
            case 100:
                if(this.page==1&&e==0){
                    this.getRelic(findRelic('Survival Notes'))
                }else if(this.page==2&&e==0){
                    this.currency.money+=55
                }
            break
            case 101:
                if(this.page==1&&e==0){
                    this.calc.list=listing.card[this.player]
                    if(this.calc.list.length>0){
                        g=floor(random(0,this.calc.list.length))
                        if(this.calc.list[g].length>0){
                            h=floor(random(0,this.calc.list[g].length))
                            this.deck.add(this.calc.list[g][h],0,types.card[this.calc.list[g][h]].list)
                        }
                    }
                }else if(this.page==2&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-99)
                }else if(this.page==3&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-9)
                }
            break
            case 102:
                if((this.page==0||this.page==1)&&e==1){
                    setupEncounter(current,zones[0].special[15])
                    this.create()
                    transition.scene='battle'
                }else if(this.page==1&&e==0){
                    this.currency.money-=40
                }
            break
            case 103:
                if(this.page==1&&e==0){
                    this.mana.gen--
                    this.mana.main--
                    this.mana.max--
                    this.mana.base--
                    this.getRelic(findRelic('Angelic Sphere'))
                }
            break
            case 104:
                if(this.page==0&&(e==0||e==1)&&floor(random(0,2))==0){
                    this.remember[0]=1
                }else if(this.page==1&&e==0){
                    this.combatants[0].life=this.combatants[0].base.life
                    transition.scene='deck'
                    this.setupDeck(4)
                    this.context=4
                }else if(this.page==2&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-15)
                }else if(this.page==3&&e==0){
                    transition.scene='deck'
                    this.setupDeck(4)
                    this.context=4
                }else if(this.page==4&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-5)
                }
            break
            case 105:
                if(this.page==4&&e==0){
                    this.combatants[0].base.meterControl-=2
                }else if(this.page==5&&e==0){
                    transition.scene='choice'
                    this.setupChoice(0,2,0)
                    this.deck.add(findCard('Injury'),0,stage.playerNumber+2)
                }
            break
            case 106:
                if(this.page==1&&e==0){
                    for(let g=0;g<3;g++){
                        this.deck.add(findCard('Broken\nParts'),0,0)
                    }
                }else if(this.page==2&&e==0){
                    this.deck.add(findCard('Broken\nParts'),0,0)
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+5)
                }else if(this.page==3&&e==0){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+15)
                }
            break
            case 107:
                if(this.page==0&&e==0){
                    this.calc.list=[]
                    for(let g=0,lg=types.card.length;g<lg;g++){
                        if(types.card[g].list==this.player&&types.card[g].stats[1].class==3){
                            this.calc.list.push(g)
                        }
                    }
                    this.deck.add(this.calc.list[floor(random(0,this.calc.list.length))],1,this.player)
                }
            break
            case 108:
                if(this.page==0&&e==0){
                    transition.trigger=true
                    transition.scene='shop'
                    this.setupShop(2)
                }
            break
            case 109:
                if(this.page==0&&e==0&&floor(random(0,2))==0){
                    this.remember[0]=1
                }else if(this.page==1&&e==0){
                    this.currency.money+=25
                }else if(this.page==2&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-6)
                }
            break
            case 110:
                if(this.page==0&&e==0){
                    this.currency.money-=40
                }else if(this.page==1&&e==0){
                    this.deck.add(findCard('Monkey\nWrench'),0,0)
                }
            break
            case 111:
                if(this.page==1&&e==0){
                    this.getRelic(findRelic('Ducksquad Badge'))
                }
            break
            case 112:
                if(this.page==0&&e==0){
                    this.deck.cards.splice(floor(random(0,this.deck.cards.length)),1)
                }else if(this.page==1&&e==0){
                    this.currency.money+=35
                }
            break
            case 113:
                if((this.page==0||this.page==1)&&e==0){
                    this.currency.money-=5
                    if(floor(random(0,3))==0){
                        this.remember[0]=1
                    }
                }else if(this.page==2&&e==0){
                    transition.scene='deck'
                    this.setupDeck(1)
                    this.context=1
                }
            break
            case 114:
                if(this.page==1&&e==0){
                    for(let h=0;h<3;h++){
                        i=floor(random(0,3))
                        g=listing.card[14][i][floor(random(0,listing.card[14][i].length))]
                        this.deck.add(g,floor(random(0,2)),types.card[g].list)
                    }
                }else if(this.page==2&&e==0){
                    this.calc.list=[0,0,0,1,1,2]
                    g=this.calc.list[floor(random(0,this.calc.list.length))]
                    f=floor(random(0,this.relics.list[g].length))
                    this.getRelic(this.relics.list[g][f])
                    this.relics.list[g].splice(f,1)
                }
            break
            case 115:
                if(this.page==1&&e==0){
                    transition.scene='choice'
                    this.setupChoice(0,0,0)
                }
            break
            case 116:
                if(this.page==1&&e==0){
                    transition.scene='deck'
                    this.setupDeck(1)
                    this.context=1
                }else if(this.page==2&&e==0){
                    this.combatants[0].life=min(this.combatants[0].base.life,this.combatants[0].life+10)
                }
            break
            case 117:
                if(this.page==1&&e==0){
                    transition.trigger=true
                    transition.scene='deck'
                    this.setupDeck(14)
                    this.context=14
                }else if(this.page==2&&e==0){
                    for(let g=0,lg=this.deck.cards.length;g<lg;g++){
                        this.deck.cards.push(copyCard(this.deck.cards[g]))
                    }
                }
            break
            case 118:
                if(this.page==1&&e==0){
                    transition.trigger=true
                    transition.scene='deck'
                    this.setupDeck(4)
                    this.context=4
                }else if(this.page==2&&e==0){
                    this.deck.cards=[]
                    this.deck.add(findCard('Oroboros'),0,0)
                }
            break
            case 119:
                if(this.page==1&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-15)
                }else if(this.page==2&&e==0){
                    this.deck.add(findCard('Residue'),0,stage.playerNumber+2)
                }
            break
            case 120:
                if(this.page==0&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-5)
                }else if(this.page==1&&e==0){
                    this.deck.add(findCard('Essence of\nthe Sea'),0,0)
                }
            break
            case 121:
                if(this.page==0&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-5)
                }else if(this.page==1&&e==0){
                    this.deck.add(findCard('Essence of\nthe Air'),0,0)
                }
            break
            case 122:
                if(this.page==0&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-5)
                }else if(this.page==1&&e==0){
                    this.deck.add(findCard('Essence of\nthe Earth'),0,0)
                }
            break
            case 123:
                if(this.page==0&&e==0){
                    this.combatants[0].life=max(min(1,this.combatants[0].life),this.combatants[0].life-5)
                }else if(this.page==1&&e==0){
                    this.deck.add(findCard('Essence of\nthe Flame'),0,0)
                }
            break
            case 124:
                if(this.page==1&&e==0){
                    transition.trigger=true
                    transition.scene='deck'
                    this.setupDeck(15)
                    this.context=15
                }else if(this.page==2&&e==0){
                    for(let g=0,lg=this.deck.cards.length;g<lg;g++){
                        f=floor(random(0,3))
                        this.deck.cards[g].type=listing.card[this.player][f][floor(random(0,listing.card[this.player][f].length))]
                        this.deck.cards[g].color=this.player
                        this.deck.cards[g]=reformCard(this.deck.cards[g])
                    }
                }
            break
            case 125:
                if(this.page==1&&e==0){
                    this.deck.add(listing.card[this.player][2][floor(random(0,listing.card[this.player][2].length))],0,this.player)
                }
            break
        }
        if(types.event[this.event].pages[this.page].link[e]!=-1){
            this.page=types.event[this.event].pages[this.page].link[e]+this.remember[0]
        }
    }
    setupShop(spec){
        this.shop.cards=[]
        this.context=spec
        switch(spec){
            case 0:
                this.costs.card[0][0]=round(random(40,60))
                this.costs.card[0][1]=round(random(40,60))
                this.costs.card[0][2]=round(random(60,80))
                this.costs.card[0][3]=round(random(60,80))
                this.costs.card[0][4]=round(random(120,160))
                this.costs.card[1][0]=round(random(80,100))
                this.costs.card[1][1]=round(random(160,180))
                this.costs.relic[0]=round(random(50,70))
                this.costs.relic[1]=round(random(50,70))
                this.costs.relic[2]=round(random(100,120))
                this.costs.relic[3]=round(random(100,120))
                this.costs.relic[4]=round(random(180,200))
                this.costs.relic[5]=round(random(90,110))
                this.costs.sale=floor(random(0,5))
                if(this.relics.active[109]){
                    for(let g=0,lg=this.costs.card.length;g<lg;g++){
                        for(let h=0,lh=this.costs.card[g].length;h<lh;h++){
                            this.costs.card[g][h]=round(this.costs.card[g][h]/2)
                        }
                    }
                    for(let g=0,lg=this.costs.relic.length;g<lg;g++){
                        this.costs.relic[g]=round(this.costs.relic[g]/2)
                    }
                }
                if(stage.ascend>=16){
                    for(let g=0,lg=this.costs.card.length;g<lg;g++){
                        for(let h=0,lh=this.costs.card[g].length;h<lh;h++){
                            this.costs.card[g][h]=round(this.costs.card[g][h]*1.1)
                        }
                    }
                    for(let g=0,lg=this.costs.relic.length;g<lg;g++){
                        this.costs.relic[g]=round(this.costs.relic[g]*1.1)
                    }
                }
                this.costs.card[0][this.costs.sale]=round(this.costs.card[0][this.costs.sale]/2)
                this.calc.list=copyList(listing.card[this.player])
                for(let g=0;g<5;g++){
                    if(this.calc.list.length>0){
                        h=floor(random(0,this.calc.list[floor(g/2)].length))
                        this.shop.cards.push(new card(this.layer,75+g*150,200,this.calc.list[floor(g/2)][h],0,types.card[this.calc.list[floor(g/2)][h]].list))
                        this.calc.list[floor(g/2)].splice(h,1)
                    }
                }
                this.calc.list2=copyList(listing.card[0])
                for(let g=0;g<2;g++){
                    if(this.calc.list2.length>0){
                        h=floor(random(0,this.calc.list2[g+1].length))
                        this.shop.cards.push(new card(this.layer,75+g*150,400,this.calc.list2[g+1][h],0,0))
                        this.calc.list2[g+1].splice(h,1)
                    }
                }
                this.relics.shop=[]
                this.relics.size=[]
                this.calc.list3=copyList(this.relics.list)
                for(let g=0;g<6;g++){
                    if(this.calc.list3.length>0){
                        h=floor(random(0,this.calc.list3[floor(g/2)+floor(g/5)].length))
                        this.relics.shop.push(this.calc.list3[floor(g/2)+floor(g/5)][h])
                        this.relics.size.push(1)
                        this.calc.list3[floor(g/2)+floor(g/5)].splice(h,1)
                    }
                }
            break
            case 1:
                this.relics.shop=[]
                this.relics.size=[]
                this.calc.list3=copyList(this.relics.list)
                for(let g=0;g<2;g++){
                    this.costs.relic[g]=round(random(50,70))
                    this.costs.relic[2+g]=round(random(50,70))
                    this.costs.relic[4+g]=round(random(100,120))
                    this.costs.relic[6+g]=round(random(100,120))
                    this.costs.relic[8+g]=round(random(180,200))
                    this.costs.relic[10+g]=round(random(90,110))
                }
                for(let g=0;g<12;g++){
                    if(this.calc.list3.length>0){
                        h=floor(random(0,this.calc.list3[floor(g/4)+floor(g/10)].length))
                        this.relics.shop.push(this.calc.list3[floor(g/4)+floor(g/10)][h])
                        this.relics.size.push(1)
                        this.calc.list3[floor(g/4)+floor(g/10)].splice(h,1)
                    }
                }
            break
            case 2:
                this.costs.card[0][0]=round(random(96,128))
                this.costs.card[0][1]=round(random(96,128))
                this.costs.card[0][2]=round(random(96,128))
                this.costs.card[0][3]=round(random(96,128))
                this.costs.card[0][4]=round(random(96,128))
                this.costs.card[1][0]=round(random(128,144))
                this.costs.card[1][1]=round(random(128,144))
                this.costs.relic[0]=round(random(144,160))
                this.costs.relic[1]=round(random(144,160))
                this.costs.relic[2]=round(random(144,160))
                this.costs.relic[3]=round(random(144,160))
                this.costs.relic[4]=round(random(72,88))
                this.costs.relic[5]=round(random(72,88))
                this.costs.sale=floor(random(0,5))
                if(this.relics.active[109]){
                    for(let g=0,lg=this.costs.card.length;g<lg;g++){
                        for(let h=0,lh=this.costs.card[g].length;h<lh;h++){
                            this.costs.card[g][h]=round(this.costs.card[g][h]/2)
                        }
                    }
                    for(let g=0,lg=this.costs.relic.length;g<lg;g++){
                        this.costs.relic[g]=round(this.costs.relic[g]/2)
                    }
                }
                this.costs.card[0][this.costs.sale]=round(this.costs.card[0][this.costs.sale]/2)
                this.calc.list=copyList(listing.card[this.player])
                for(let g=0;g<5;g++){
                    if(this.calc.list.length>0){
                        h=floor(random(0,this.calc.list[2].length))
                        this.shop.cards.push(new card(this.layer,75+g*150,200,this.calc.list[2][h],0,types.card[this.calc.list[2][h]].list))
                        this.calc.list[2].splice(h,1)
                    }
                }
                this.calc.list2=copyList(listing.card[0])
                for(let g=0;g<2;g++){
                    if(this.calc.list2.length>0){
                        h=floor(random(0,this.calc.list2[2].length))
                        this.shop.cards.push(new card(this.layer,75+g*150,400,this.calc.list2[2][h],0,0))
                        this.calc.list2[2].splice(h,1)
                    }
                }
                this.relics.shop=[]
                this.relics.size=[]
                this.calc.list3=copyList(this.relics.list)
                for(let g=0;g<6;g++){
                    if(this.calc.list3.length>0){
                        h=floor(random(0,this.calc.list3[2+floor(g/4)].length))
                        this.relics.shop.push(this.calc.list3[2+floor(g/4)][h])
                        this.relics.size.push(1)
                        this.calc.list3[2+floor(g/4)].splice(h,1)
                    }
                }
            break
        }
        for(let g=0,lg=this.shop.cards.length;g<lg;g++){
            this.shop.cards[g].size=1
        }
    }
    displayShop(){
        for(let e=0,le=this.shop.cards.length;e<le;e++){
            if(this.shop.cards[e]!=0){
                this.shop.cards[e].display(this.deck.cards.length,this.drawAmount,0,this.deck.cards.length,0,this.defaultRandom)
            }
        }
        if(this.context!=1){
            this.layer.fill(160,80,80)
            this.layer.stroke(200,100,100)
            this.layer.strokeWeight(5)
            this.layer.rect(825,300,120,160,5)
            this.layer.noStroke()
            this.layer.textSize(14)
            this.layer.fill(0)
            this.layer.text('Remove\nCard',825,300)
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
        if(this.context!=1){
            this.layer.text(this.costs.remove,825,400)
        }
        for(let g=0;g<min(5,this.shop.cards.length);g++){
            if(this.shop.cards[g]!=0){
                this.layer.fill(255,225,0,this.shop.cards[g].size)
                this.layer.text(this.costs.card[0][g],this.shop.cards[g].position.x,this.shop.cards[g].position.y+100)
                if(this.costs.sale==g){
                    this.layer.text('Sale',this.shop.cards[g].position.x,this.shop.cards[g].position.y-100)
                }
            }
        }
        for(let g=0;g<min(2,this.shop.cards.length-5);g++){
            if(this.shop.cards[g+5]!=0){
                this.layer.fill(255,225,0,this.shop.cards[g+5].size)
                this.layer.text(this.costs.card[1][g],this.shop.cards[g+5].position.x,this.shop.cards[g+5].position.y+100)
            }
        }
        for(let e=0,le=this.relics.shop.length;e<le;e++){
            this.layer.fill(255,225,0,this.relics.size[e])
            if(this.context==1){
                this.layer.text(this.costs.relic[e],225+(e%4)*150,240+floor(e/4)*100)
            }else{
                this.layer.text(this.costs.relic[e],375+(e%3)*150,390+floor(e/3)*100)
            }
        }
        this.layer.noStroke()
        this.layer.fill(160)
        this.layer.rect(850,570,80,40,5)
        this.layer.fill(0)
        this.layer.textSize(20)
        this.layer.text('Exit',850,570)
        if(this.context==1){
            for(let e=0,le=this.relics.shop.length;e<le;e++){
                if(this.relics.size[e]>0){
                    displayRelicSymbol(this.layer,225+(e%4)*150,200+floor(e/4)*100,this.relics.shop[e],0,this.relics.size[e],1,true)
                }
                if(dist(inputs.rel.x,inputs.rel.y,225+(e%4)*150,200+floor(e/4)*100)<20){
                    this.layer.noStroke()
                    this.layer.fill(180)
                    this.layer.rect(450,550,240,60,5)
                    this.layer.fill(0)
                    this.layer.textSize(18)
                    this.layer.text(types.relic[this.relics.shop[e]].name,450,535)
                    this.layer.textSize(12)
                    this.layer.text(types.relic[this.relics.shop[e]].desc,450,560)
                }
            }
        }else{
            for(let e=0,le=this.relics.shop.length;e<le;e++){
                if(this.relics.size[e]>0){
                    displayRelicSymbol(this.layer,375+(e%3)*150,350+floor(e/3)*100,this.relics.shop[e],0,this.relics.size[e],1,true)
                }
                if(dist(inputs.rel.x,inputs.rel.y,375+(e%3)*150,350+floor(e/3)*100)<20){
                    this.layer.noStroke()
                    this.layer.fill(180)
                    this.layer.rect(450,550,240,60,5)
                    this.layer.fill(0)
                    this.layer.textSize(18)
                    this.layer.text(types.relic[this.relics.shop[e]].name,450,535)
                    this.layer.textSize(12)
                    this.layer.text(types.relic[this.relics.shop[e]].desc,450,560)
                }
            }
        }
    }
    updateShop(){
        if(this.relics.active[25]){
            this.costs.remove=60
        }
        for(let e=0,le=this.shop.cards.length;e<le;e++){
            if(this.shop.cards[e].used){
                this.shop.cards[e].size-=0.1
                if(this.shop.cards[e].size<=0){
                    if(this.relics.active[59]&&this.calc.list.length>0){
                        if(e<5){
                            h=floor(random(0,this.calc.list[floor(e/2)].length))
                            this.shop.cards[e]=new card(this.layer,this.shop.cards[e].position.x,this.shop.cards[e].position.y,this.calc.list[floor(e/2)][h],0,types.card[this.calc.list[floor(e/2)][h]].list)
                        }else{
                            h=floor(random(0,this.calc.list2[e-4].length))
                            this.shop.cards[e]=new card(this.layer,this.shop.cards[e].position.x,this.shop.cards[e].position.y,this.calc.list2[e-4][h],0,types.card[this.calc.list2[floor(e-4)][h]].list)
                        }
                        this.shop.cards[e].used=false
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
                        this.shop.cards[e]=0
                    }
                }
            }else if(this.shop.cards[e].size<1){
                this.shop.cards[e].size=round(this.shop.cards[e].size*10+1)/10
            }
        }
        for(let e=0,le=this.relics.shop.length;e<le;e++){
            if(this.relics.size[e]<1&&this.relics.size[e]>0){
                this.relics.size[e]=round(this.relics.size[e]*10-1)/10
            }
        }
    }
    onClickShop(){
        if(pointInsideBox({position:inputs.rel},{position:{x:850,y:570},width:80,height:40})){
            transition.trigger=true
            transition.scene='map'
            this.map.complete[this.map.position[0]][this.map.position[1]]=1
        }
        if(pointInsideBox({position:inputs.rel},{position:{x:825,y:300},width:120,height:160})&&this.context!=1){
            transition.trigger=true
            transition.scene='deck'
            this.setupDeck(6)
            this.context=6
        }
        for(let e=0,le=this.shop.cards.length;e<le;e++){
            if(this.shop.cards[e]!=0){
                if(pointInsideBox({position:inputs.rel},this.shop.cards[e])&&this.currency.money>=this.costs.card[floor(e/5)][e%5]&&!this.shop.cards[e].used){
                    this.deck.add(this.shop.cards[e].type,this.shop.cards[e].level,this.shop.cards[e].color)
                    this.currency.money-=this.costs.card[floor(e/5)][e%5]
                    this.shop.cards[e].used=true
                }
            }
        }
        for(let e=0,le=this.relics.shop.length;e<le;e++){
            if((dist(inputs.rel.x,inputs.rel.y,375+(e%3)*150,350+floor(e/3)*100)<20&&this.context!=1||dist(inputs.rel.x,inputs.rel.y,225+(e%4)*150,200+floor(e/4)*100)<20&&this.context==1)&&this.relics.size[e]>=1&&this.currency.money>=this.costs.relic[e]){
                this.getRelic(this.relics.shop[e])
                this.currency.money-=this.costs.relic[e]
                this.relics.size[e]=0.9
            }
        }
    }
    setupBossChoice(spec){
        switch(spec){
            case 0:
                this.relics.shop=[]
                this.relics.size=[]
                this.calc.list3=this.relics.list
                for(let g=0;g<3;g++){
                    if(this.calc.list3.length>0){
                        h=floor(random(0,this.calc.list3[4].length))
                        this.relics.shop.push(this.calc.list3[4][h])
                        this.relics.size.push(1)
                        this.calc.list3[4].splice(h,1)
                    }
                }
            break
        }
    }
    displayBossChoice(){
        this.layer.noStroke()
        this.layer.fill(255)
        this.layer.textSize(45)
        this.layer.text('Select Relic',450,50)
        this.layer.fill(255,225,0)
        this.layer.ellipse(20,16,16,16)
        this.layer.fill(255,240,0)
        this.layer.ellipse(20,16,10,10)
        this.layer.fill(255,225,0)
        this.layer.textSize(16)
        this.layer.textAlign(LEFT,CENTER)
        this.layer.text(this.currency.money,30,18)
        this.layer.textAlign(CENTER,CENTER)
        this.layer.noStroke()
        this.layer.fill(160)
        this.layer.rect(850,570,80,40,5)
        this.layer.fill(0)
        this.layer.textSize(20)
        this.layer.text('Skip',850,570)
        for(let e=0,le=this.relics.shop.length;e<le;e++){
            if(this.relics.size[e]>0){
                displayRelicSymbol(this.layer,225+e*225,300,this.relics.shop[e],0,3,1,true)
                this.layer.fill(0)
                this.layer.textSize(24)
                this.layer.text(types.relic[this.relics.shop[e]].name,225+e*225,200)
            }
            if(dist(inputs.rel.x,inputs.rel.y,225+e*225,300)<60){
                this.layer.noStroke()
                this.layer.fill(180)
                this.layer.rect(450,550,240,60,5)
                this.layer.fill(0)
                this.layer.textSize(12)
                this.layer.text(types.relic[this.relics.shop[e]].desc,450,550)
            }
        }
    }
    onClickBossChoice(){
        if(pointInsideBox({position:inputs.rel},{position:{x:850,y:570},width:80,height:40})){
            this.actComplete()
        }
        for(let e=0,le=this.relics.shop.length;e<le;e++){
            if(dist(inputs.rel.x,inputs.rel.y,225+e*225,300)<60){
                this.getRelic(this.relics.shop[e])
                this.actComplete()
            }
        }
    }
    onKeyBossChoice(key,code){
        if(code==ENTER){
            this.actComplete()
        }
        for(let e=0,le=this.relics.shop.length;e<le;e++){
            if(int(key)==(e+1)){
                this.getRelic(this.relics.shop[e])
                this.actComplete()
            }
        }
    }
    displayDictionary(){
        this.layer.stroke(100)
        this.layer.strokeWeight(4)
        this.layer.fill(200)
        this.layer.rect(130,60,220,40,3)
        this.layer.rect(130,20,120,20,3)
        for(e=0,le=this.dict.suggestions.length;e<le;e++){
            this.layer.rect(130,110+e*60,180,60,3)
            this.layer.rect(430,110+e*60,420,40,3)
        }
        this.layer.fill(0)
        this.layer.noStroke()
        this.layer.textSize(15)
        this.layer.text('Back',130,20)
        this.layer.text(this.dict.typing,130,60)
        for(e=0,le=this.dict.suggestions.length;e<le;e++){
            this.layer.text(types.dictionary[this.dict.suggestions[e]].name,130,110+e*60)
        }
        this.layer.textSize(10)
        for(e=0,le=this.dict.suggestions.length;e<le;e++){
            this.layer.text(types.dictionary[this.dict.suggestions[e]].desc,430,110+e*60)
        }
    }
    onClickDictionary(){
        if(pointInsideBox({position:inputs.rel},{position:{x:130,y:20},width:120,height:20})){
            transition.trigger=true
            transition.scene='battle'
        }
    }
    onKeyDictionary(key,code){
        this.dict.allowedCharacter=false
        for(e=0,le=this.dict.allowed.length;e<le;e++){
            if(key==this.dict.allowed[e]){
                this.dict.allowedCharacter=true
            }
        }
        if(code==BACKSPACE){
            this.dict.typing=this.dict.typing.substr(0,this.dict.typing.length-1)
            if(this.dict.typing.length>0){
                this.createSuggestions(this.dict.typing)
            }
        }
        else if(this.dict.allowedCharacter){
            this.dict.typing+=key
            this.createSuggestions(this.dict.typing)
        }
    }
    updateFull(){
        if(this.relics.active[127]){
            this.currency.money=0
        }
    }
    createSuggestions(base){
        this.dict.suggestions=[]
        this.dict.collect=[]
        for(e=0,le=types.dictionary.length;e<le;e++){
            for(f=0,lf=types.dictionary[e].name.length-base.length+1;f<lf;f++){
                if(types.dictionary[e].name.substr(f,f+base.length).toLowerCase()==base.toLowerCase()){
                    this.dict.collect.push(e)
                    break
                }
            }
        }
        for(e=0;e<30;e++){
            for(f=0,lf=this.dict.collect.length;f<lf;f++){
                if(types.dictionary[this.dict.collect[f]].name.length==e){
                    this.dict.suggestions.push(this.dict.collect[f])
                    this.dict.collect.splice(f,1)
                    f--
                    lf--
                }
            }
            if(this.dict.collect.length==0){
                break
            }
        }
    }
}