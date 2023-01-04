class group{
    constructor(layer,battle,id){
        this.layer=layer
        this.battle=battle
        this.id=id
        this.storage={cards:[]}
        this.cards=[]
        this.scroll=0
        this.select=false
        this.selcted=false
        this.trigger=false
        this.calc={level:0,cut:0,list:[]}
        this.anim={discarding:0,doubling:0,upgrading:0,exhausting:0,transforming:0,forethinking:0,reserving:0,reserving2:0,exiling:0,releasing:0,selectCombo:false}
    }
    initial(type){
        switch(type){
            case 1:
                for(let e=0;e<4;e++){
                    this.add(1,0,this.battle.player) 
                }
                for(let e=0;e<4;e++){
                    this.add(2,0,this.battle.player)
                }
                this.add(findCard('Big\nStrike'),0,this.battle.player)
                this.add(findCard('Triple\nPunch'),0,this.battle.player)
            break
            case 2:
                for(let e=0;e<4;e++){
                    this.add(1,0,this.battle.player)
                }
                for(let e=0;e<4;e++){
                    this.add(2,0,this.battle.player)
                }
                this.add(findCard('Eruption'),0,this.battle.player)
                this.add(findCard('Vigilance'),0,this.battle.player)
            break
            case 3:
                for(let e=0;e<4;e++){
                    this.add(1,0,this.battle.player)
                }
                for(let e=0;e<4;e++){
                    this.add(2,0,this.battle.player)
                }
                this.add(findCard('Charge'),0,this.battle.player)
                this.add(findCard('Dualcast'),0,this.battle.player)
            break
            case 4:
                for(let e=0;e<4;e++){
                    this.add(1,0,this.battle.player)
                }
                for(let e=0;e<4;e++){
                    this.add(2,0,this.battle.player)
                }
                this.add(findCard('Peace'),0,this.battle.player)
                this.add(findCard('Danger'),0,this.battle.player)
            break
            case 5:
                for(let e=0;e<4;e++){
                    this.add(1,0,this.battle.player)
                }
                for(let e=0;e<4;e++){
                    this.add(2,0,this.battle.player)
                }
                this.add(findCard('Pistol'),0,this.battle.player)
                this.add(findCard('Construct'),0,this.battle.player)
            break
            case 6:
                for(let e=0;e<4;e++){
                    this.add(1,0,this.battle.player)
                }
                for(let e=0;e<4;e++){
                    this.add(2,0,this.battle.player)
                }
                this.add(findCard('Survivor'),0,this.battle.player)
                this.add(findCard('Neutralize'),0,this.battle.player)
            break
            case 7:
                for(let e=0;e<4;e++){
                    this.add(1,0,this.battle.player)
                }
                for(let e=0;e<4;e++){
                    this.add(2,0,this.battle.player)
                }
                this.add(findCard('Tap'),0,this.battle.player)
                this.add(findCard('Spare'),0,this.battle.player)
            break
        }
        if(stage.ascend>=20){
            for(let e=0,le=this.cards.length;e<le;e++){
                if(this.cards[e].list==stage.playerNumber+1){
                    this.cards[e].type+=3
                    this.cards[e]=reformCard(this.cards[e])
                }
            }
        }
    }
    add(type,level,color){
        if(type>0){
            stage.id++
            this.calc.level=level
            if(this.calc.level==0&&(types.card[type].stats[level].class==0&&this.battle.relics.active[41]||types.card[type].stats[level].class==1&&this.battle.relics.active[42]||types.card[type].stats[level].class==2&&this.battle.relics.active[43])){
                this.calc.level++
            }
            if(this.calc.level==0&&this.battle.combatants[0].status.main[114]>0){
                this.calc.level++
            }
            if(types.card[type].list==10&&this.battle.relics.active[21]){
                this.battle.relics.active[21]=false
            }else{
                this.cards.push(new card(this.layer,1206,500,type,this.calc.level,color))
                this.cards[this.cards.length-1].id=stage.id
                if(types.card[type].stats[level].attack==1&&types.card[type].stats[level].spec==3){
                    this.cards[this.cards.length-1].damage+=this.battle.combatants[0].status.main[63]
                }
            }
            if(types.card[type].list==10&&this.battle.relics.active[39]){
                this.battle.combatants[0].base.life+=6
                this.battle.combatants[0].life+=6
            }
            if(this.id==2&&stage.scene=='choice'){
                if(this.battle.relics.active[13]){
                    this.battle.currency.money+=10
                }
            }
        }
    }
    addShuffle(type,level,color){
        this.calc.cut=floor(random(0,this.cards.length))
        for(let g=this.calc.cut,lg=this.cards.length;g<lg;g++){
            this.storage.cards.push(this.cards[g])
            this.cards.splice(g,1)
            g--
            lg--
        }
        this.add(type,level,color)
        while(this.storage.cards.length>0){
            this.cards.push(copyCard(this.storage.cards[0]))
            this.storage.cards.splice(0,1)
        }
    }
    addShuffleAlt(type,level,color,alt){
        this.calc.cut=floor(random(0,this.cards.length))
        for(let g=this.calc.cut,lg=this.cards.length;g<lg;g++){
            this.storage.cards.push(this.cards[g])
            this.cards.splice(g,1)
            g--
            lg--
        }
        this.add(type,level,color)
        this.cards[this.cards.length-1].alt=alt
        while(this.storage.cards.length>0){
            this.cards.push(copyCard(this.storage.cards[0]))
            this.storage.cards.splice(0,1)
        }
    }
    addShuffleCost(type,level,color,cost){
        this.calc.cut=floor(random(0,this.cards.length))
        for(let g=this.calc.cut,lg=this.cards.length;g<lg;g++){
            this.storage.cards.push(this.cards[g])
            this.cards.splice(g,1)
            g--
            lg--
        }
        this.add(type,level,color)
        this.cards[this.cards.length-1].cost=cost
        this.cards[this.cards.length-1].base.cost=cost
        while(this.storage.cards.length>0){
            this.cards.push(copyCard(this.storage.cards[0]))
            this.storage.cards.splice(0,1)
        }
    }
    pushTop(card){
        for(let g=0,lg=this.cards.length;g<lg;g++){
            this.storage.cards.push(this.cards[g])
            this.cards.splice(g,1)
            g--
            lg--
        }
        this.cards.push(card)
        while(this.storage.cards.length>0){
            this.cards.push(copyCard(this.storage.cards[0]))
            this.storage.cards.splice(0,1)
        }
    }
    addDrop(type,level,color){
        stage.id++
        this.cards.push(new card(this.layer,50,-200,type,level,color))
        this.cards[this.cards.length-1].id=stage.id
    }
    allUpgrade(){
        this.storage.cards=[]
        while(this.cards.length>0){
            this.storage.cards.push(copyCard(this.cards[0]))
            this.storage.cards[this.storage.cards.length-1].level=1
            this.cards.splice(0,1)
        }
        while(this.storage.cards.length>0){
            this.cards.push(reformCard(this.storage.cards[0]))
            this.storage.cards.splice(0,1)
        }
    }
    randomUpgrade(){
        this.calc.list=[]
        for(let h=0,lh=this.cards.length;h<lh;h++){
            if(this.cards[h].level==0&&!this.cards[h].trigger){
                this.calc.list.push(h)
            }
        }
        if(this.calc.list.length>0){
            h=this.calc.list[floor(random(0,this.calc.list.length))]
            if(this.cards[h].level==0){
                this.cards[h].level++
                this.cards[h]=reformCard(this.cards[h])
            }
        }
    }
    shuffle(){
        if(this.battle.relics.active[58]){
            this.battle.mana.main++
        }
        if(this.battle.relics.active[114]){
            this.battle.combatants[0].addBlock(6)
        }
        if(this.battle.relics.active[119]){
            transition.trigger=true
            transition.scene='deck'
            this.battle.context=7
            this.battle.context2=3
        }
        this.storage.cards=[]
        while(this.cards.length>0){
            this.storage.cards.push(copyCard(this.cards[0]))
            this.cards.splice(0,1)
        }
        while(this.storage.cards.length>0){
            h=floor(random(0,this.storage.cards.length))
            this.cards.push(copyCard(this.storage.cards[h]))
            this.storage.cards.splice(h,1)
        }
    }
    discard(){
        for(let e=0,le=this.cards.length;e<le;e++){
            if(this.cards[e].attack==-5){
                for(let g=0,lg=this.cards.length;g<lg;g++){
                    if(this.cards[g].attack>=0&&!this.cards[g].trigger){
                        this.battle.combatants[0].take(1,-1)
                    }
                }
            }else if(this.cards[e].attack==139){
                this.battle.combatants[0].take(this.cards[e].alt,-1)
            }
        }
        for(let e=0,le=this.cards.length;e<le;e++){
            if((this.cards[e].attack==52||this.cards[e].attack==268||this.cards[e].attack==641)&&!this.cards[e].trigger){
                this.cards[e].damage+=this.cards[e].alt
                if(this.battle.combatants[0].status.main[79]>0&&this.cards[e].cost>0){
                    this.cards[e].cost=max(0,this.cards[e].cost-this.battle.combatants[0].status.main[79])
                }
            }else if(this.cards[e].attack==114&&this.cards[e].cost>0&&!this.cards[e].trigger){
                this.cards[e].cost--
                if(this.battle.combatants[0].status.main[79]>0&&this.cards[e].cost>0){
                    this.cards[e].cost=max(0,this.cards[e].cost-this.battle.combatants[0].status.main[79])
                }
            }else if((this.cards[e].spec!=2&&this.cards[e].spec!=9&&this.cards[e].spec!=12&&!this.cards[e].retain&&!(this.cards[e].spec==16&&this.battle.relics.active[180])||this.cards[e].trigger)){
                if(this.battle.relics.active[133]){
                    this.battle.random.drawing--
                }else{
                    this.cards[e].used=true
                }
                if(this.cards[e].attack==-4){
                    this.battle.combatants[0].status.main[7]++
                }else if(this.cards[e].attack==-7){
                    this.battle.combatants[0].status.main[8]++
                }else if(this.cards[e].attack==-10){
                    this.battle.combatants[0].take(2+this.cards[e].level*2,-1)
                }else if(this.cards[e].attack==-14){
                    this.battle.combatants[0].status.main[11]+=2
                }else if(this.cards[e].attack==-21){
                    this.battle.combatants[0].take(this.cards[e].damage,-1)
                    this.cards[e].damage++
                }else if(this.cards[e].attack==-23){
                    this.battle.combatants[0].status.main[133]++
                }
            }else if(this.cards[e].retain){
                this.cards[e].retain=false
                if(this.battle.combatants[0].status.main[79]>0&&this.cards[e].cost>0){
                    this.cards[e].cost=max(0,this.cards[e].cost-this.battle.combatants[0].status.main[79])
                }
            }else{
                if(this.battle.combatants[0].status.main[79]>0&&this.cards[e].cost>0){
                    this.cards[e].cost=max(0,this.cards[e].cost-this.battle.combatants[0].status.main[79])
                }
            }
        }
    }
    display(){ 
        if(this.battle.discarding&&this.anim.discarding<1){
            this.anim.discarding=round(this.anim.discarding*5+1)/5
        }else if(!this.battle.discarding&&this.anim.discarding>0){
            this.anim.discarding=round(this.anim.discarding*5-1)/5
        }
        if(this.battle.random.doubling&&this.anim.doubling<1){
            this.anim.doubling=round(this.anim.doubling*5+1)/5
        }else if(!this.battle.random.doubling&&this.anim.doubling>0){
            this.anim.doubling=round(this.anim.doubling*5-1)/5
        }
        if(this.battle.random.upgrading&&this.anim.upgrading<1){
            this.anim.upgrading=round(this.anim.upgrading*5+1)/5
        }else if(!this.battle.random.upgrading&&this.anim.upgrading>0){
            this.anim.upgrading=round(this.anim.upgrading*5-1)/5
        }
        if(this.battle.random.exhausting&&this.anim.exhausting<1){
            this.anim.exhausting=round(this.anim.exhausting*5+1)/5
        }else if(!this.battle.random.exhausting&&this.anim.exhausting>0){
            this.anim.exhausting=round(this.anim.exhausting*5-1)/5
        }
        if(this.battle.random.transforming&&this.anim.transforming<1){
            this.anim.transforming=round(this.anim.transforming*5+1)/5
        }else if(!this.battle.random.transforming&&this.anim.transforming>0){
            this.anim.transforming=round(this.anim.transforming*5-1)/5
        }
        if(this.battle.random.forethinking&&this.anim.forethinking<1){
            this.anim.forethinking=round(this.anim.forethinking*5+1)/5
        }else if(!this.battle.random.forethinking&&this.anim.forethinking>0){
            this.anim.forethinking=round(this.anim.forethinking*5-1)/5
        }
        if(this.battle.random.reserving&&this.anim.reserving<1){
            this.anim.reserving=round(this.anim.reserving*5+1)/5
        }else if(!this.battle.random.reserving&&this.anim.reserving>0){
            this.anim.reserving=round(this.anim.reserving*5-1)/5
        }
        if(this.battle.random.reserving2&&this.anim.reserving2<1){
            this.anim.reserving2=round(this.anim.reserving2*5+1)/5
        }else if(!this.battle.random.reserving2&&this.anim.reserving2>0){
            this.anim.reserving2=round(this.anim.reserving2*5-1)/5
        }
        if(this.battle.random.exiling&&this.anim.exiling<1){
            this.anim.exiling=round(this.anim.exiling*5+1)/5
        }else if(!this.battle.random.exiling&&this.anim.exiling>0){
            this.anim.exiling=round(this.anim.exiling*5-1)/5
        }
        if(this.battle.random.releasing&&this.anim.releasing<1){
            this.anim.releasing=round(this.anim.releasing*5+1)/5
        }else if(!this.battle.random.releasing&&this.anim.releasing>0){
            this.anim.releasing=round(this.anim.releasing*5-1)/5
        }
        for(let e=0,le=this.cards.length;e<le;e++){
            this.cards[e].displayExtra([255,0,0],this.anim.discarding)
            this.cards[e].displayExtra([255,100,255],this.anim.doubling)
            this.cards[e].displayExtra([255,255,50],this.anim.upgrading)
            this.cards[e].displayExtra([150,200,255],this.anim.exhausting)
            this.cards[e].displayExtra([100,255,100],this.anim.transforming)
            this.cards[e].displayExtra([255,200,255],this.anim.forethinking)
            this.cards[e].displayExtra([255,150,0],this.anim.reserving)
            this.cards[e].displayExtra([255,150,50],this.anim.reserving2)
            this.cards[e].displayExtra([150,255,200],this.anim.exiling)
            this.cards[e].displayExtra([100,255,255],this.anim.releasing)
            this.cards[e].display(this.battle.deck.cards.length,this.battle.hand.cards.length,this.battle.discard.cards.length,this.battle.reserve.cards.length,this.battle.counter.turn,this.battle.random)
        }
    }
    displayView(level){
        if(level>=0){
            for(let e=0,le=min(level,this.cards.length);e<le;e++){
                this.cards[e].position.x=75+(e%6)*150
                this.cards[e].position.y=100+floor(e/6)*200-this.scroll
                this.cards[e].anim.afford=0
                this.cards[e].size=1
                this.cards[e].fade=1
                this.cards[e].display(le,this.battle.drawAmount,0,le,0,this.battle.defaultRandom)
            }
        }else{
            for(let e=0,le=this.cards.length;e<le;e++){
                this.cards[e].position.x=75+(e%6)*150
                this.cards[e].position.y=100+floor(e/6)*200-this.scroll
                this.cards[e].anim.afford=0
                this.cards[e].size=1
                this.cards[e].fade=1
                this.cards[e].display(le,this.battle.drawAmount,0,le,0,this.battle.defaultRandom)
            }
        }
    }
    update(){
        for(let e=0,le=this.cards.length;e<le;e++){
            if(this.cards[e].drawTop){
                this.battle.reserve.pushTop(copyCard(this.cards[e]))
                this.cards.splice(e,1)
                e--
                le--
            }if(this.cards[e].draw||this.battle.combatants[0].status.main[52]>0&&this.cards[e].attack!=229&&(this.cards[e].discard||this.cards[e].remove)){
                this.battle.reserve.cards.push(copyCard(this.cards[e]))
                this.cards.splice(e,1)
                e--
                le--
                if(this.battle.combatants[0].status.main[52]>0){
                    this.battle.combatants[0].status.main[52]--
                }
            }else if(this.cards[e].discard||this.cards[e].remove&&this.battle.relics.active[113]&&floor(random(0,2))==0||this.cards[e].remove&&this.battle.relics.active[179]&&this.battle.random.exhausted==0){
                if(this.battle.relics.active[179]&&this.cards[e].remove){
                    this.battle.random.exhausted++
                }
                if(this.cards[e].selectDiscard){
                    this.cards[e].selectDiscard=false
                    if(this.cards[e].attack==167){
                        for(let f=0;f<this.cards[e].damage;f++){
                            this.battle.draw()
                        }
                    }else if(this.cards[e].attack==168){
                        this.battle.mana.main+=this.cards[e].damage
                    }else if(this.cards[e].attack==275){
                        this.battle.combatants[0].combo+=this.cards[e].alt
                    }
                }
                if(!this.cards[e].trigger){
                    if(this.battle.relics.active[95]){
                        this.calc.list=[]
                        for(let f=0,lf=this.battle.combatants.length;f<lf;f++){
                            if(this.battle.combatants[f].life>0&&this.battle.combatants[f].team==1){
                                this.calc.list.push(f)
                            }
                        }
                        if(this.calc.list.length>0){
                            this.battle.combatants[this.calc.list[floor(random(0,this.calc.list.length))]].take(3,0)
                        }
                    }
                    if(this.battle.relics.active[96]){
                        this.battle.combatants[0].addBlock(3)
                    }
                    if(this.battle.relics.active[182]&&this.cards[e].spec==16){
                        this.battle.draw()
                    }
                }
                this.battle.discard.cards.push(copyCard(this.cards[e]))
                if(this.cards[e].trigger){
                    this.battle.discard.cards[this.battle.discard.cards.length-1].trigger=true
                }
                this.cards.splice(e,1)
                e--
                le--
            }else if(this.cards[e].remove){
                if(this.cards[e].attack==600){
                    this.battle.mana.main+=this.cards[e].alt
                }
                this.cards.splice(e,1)
                e--
                le--
                this.battle.random.exhausted++
                if(this.battle.combatants[0].status[46]>0){
                    for(let f=0;f<this.battle.combatants[0].status[46];f++){
                        this.battle.draw()
                    }
                }
                if(this.battle.relics.active[71]){
                    this.battle.randomAddHand()
                }
                if(this.battle.relics.active[93]){
                    for(let f=0,lf=this.battle.combatants.length;f<lf;f++){
                        if(this.battle.combatants[f].team==1){
                            this.battle.combatants[f].take(3,0)
                        }
                    }
                }
            }
        }
    }
    updateHand(){
        for(let e=0,le=this.cards.length;e<le;e++){
            this.cards[e].update(this.battle.mana,this.battle.combatants[0].combo,this.battle.combatants[0].armed,this.battle.random)
            if((inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>350||this.cards[e].select)&&(!this.trigger||this.cards[e].trigger)&&this.cards[e].position.y>320){
                this.cards[e].position.y-=20
            }else if(!((inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>250||this.cards[e].select)&&(!this.trigger||this.cards[e].trigger))&&this.cards[e].position.y<500){
                this.cards[e].position.y+=20
            }
            if((this.cards[e].position.x>e*80+126&&this.battle.player!=stage.playerNumber||this.cards[e].position.x>e*140+126&&this.battle.player==stage.playerNumber)&&(this.cards[e].position.x>this.cards[max(0,e-1)].position.x+80&&this.battle.player!=stage.playerNumber||this.cards[e].position.x>this.cards[max(0,e-1)].position.x+140&&this.battle.player==stage.playerNumber||e==0)){
                this.cards[e].position.x-=20
            }else if(this.cards[e].attack==121&&this.cards[e].position.x<=e*80+126&&!this.cards[e].used){
                this.cards[e].used=true
                this.cards[e].exhaust=true
                for(let f=0;f<this.cards[e].damage;f++){
                    this.add(findCard('Miracle'),0,0)
                }
            }
        }
    }
    updateDrop(){
        for(let e=0,le=this.cards.length;e<le;e++){
            this.cards[e].size=0.5
            this.cards[e].position.y+=20
            if(this.cards[e].position.y>800){
                this.cards[e].remove=true
            }
        }
    }
    updateView(){
        for(let e=0,le=this.cards.length;e<le;e++){
            this.cards[e].update(0,0,0,{hits:0})
        }
    }
    onClickHand(){
        if(this.trigger){
            switch(this.battle.attack.targetType){
                case 1:
                    for(let e=0,le=this.battle.combatants.length;e<le;e++){
                        if(this.battle.combatants[e].team==1&&pointInsideBox({position:inputs.rel},{position:{x:this.battle.combatants[e].position.x,y:this.battle.combatants[e].position.y-this.battle.combatants[e].height/2},width:80,height:160})&&this.battle.combatants[e].life>0){
                            this.battle.attack.target=e
                            this.battle.playCard()
                            if(this.battle.attack.type==63){
                                this.battle.attack.update(1,this.battle.attack.level,0)
                            }else{
                                this.battle.attack.update(this.battle.attack.type,this.battle.attack.level,0)
                            }
                            this.battle.afterPlayCard()
                            for(let f=0,lf=this.cards.length;f<lf;f++){
                                if(this.cards[f].trigger){
                                    if(this.battle.attack.type==723){
                                        this.cards[f].trigger=false
                                        this.cards[f].select=false
                                        this.cards[f].position.x=1260
                                        this.cards[f].position.y=500
                                    }else{
                                        this.cards[f].used=true
                                    }
                                    if(this.battle.attack.type==599||this.battle.attack.type==723){
                                        this.cards[f].damage+=this.cards[f].alt
                                    }else if(this.battle.attack.type==135){
                                        this.cards[f].damage-=this.cards[f].alt
                                    }else if(this.battle.attack.type==232&&this.cards[f].cost>0){
                                        this.cards[f].cost-=this.cards[f].alt
                                        this.cards[f].base.cost-=this.cards[f].alt
                                    }
                                }
                            }
                            this.trigger=false
                        }
                    }
                break
            }
        }else{
            this.selected=false
            for(let e=0,le=this.cards.length;e<le;e++){
                if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>this.cards[e].position.y-this.cards[e].height/2&&inputs.rel.y<this.cards[e].position.y+this.cards[e].height/2&&this.select&&this.cards[e].select&&(this.battle.mana.main>=this.cards[e].cost&&this.cards[e].spec!=4||this.battle.combatants[0].combo>=this.cards[e].cost&&this.cards[e].spec==4||this.battle.combatants[0].status.main[76]>0&&this.cards[e].class==0||this.battle.combatants[0].status.main[118]>0)&&!((this.cards[e].spec==5||this.cards[e].spec==11||this.cards[e].spec==14)&&this.battle.combatants[0].armed!=1)){
                    this.trigger=true
                    this.cards[e].trigger=true
                    this.select=false
                    if(this.battle.random.doubling>0){
                        this.battle.random.doubling--
                        this.cards.push(copyCard(this.cards[e]))
                        this.cards[this.cards.length-1].position.x=1206
                        this.cards[this.cards.length-1].position.y=500
                    }
                    if(this.cards[e].class==0){
                        if(this.battle.relics.active[61]){
                            this.battle.attack.damage=round(this.cards[e].damage*(2+max(0,this.battle.combatants[0].boost.main[0]))/(2-min(0,this.battle.combatants[0].boost.main[0]*1.5)))
                        }else{
                            this.battle.attack.damage=round(this.cards[e].damage*(2+max(0,this.battle.combatants[0].boost.main[0]))/(2-min(0,this.battle.combatants[0].boost.main[0])))
                        }
                        if(this.battle.combatants[0].status.main[18]>0){
                            this.battle.attack.damage+=this.battle.combatants[0].status.main[18]
                            this.battle.combatants[0].status.main[18]=0
                        }
                        if(this.battle.relics.active[19]&&this.battle.random.attacks%10==0){
                            this.battle.attack.damage*=2
                        }
                    }else{
                        this.battle.attack.damage=round(this.cards[e].damage)
                    }
                    this.battle.attack.alt=round(this.cards[e].alt)
                    this.battle.attack.mana=this.battle.mana.main
                    this.battle.attack.combo=this.battle.combatants[0].combo
                    this.battle.attack.color=this.cards[e].color
                    if(this.battle.combatants[0].status.main[76]>0&&this.cards[e].class==0&&this.cards[e].cost>0){
                        this.cards[e].cost=0
                        this.battle.combatants[0].status.main[76]=0
                    }
                    if(this.battle.combatants[0].status.main[118]>0&&this.cards[e].cost>0){
                        this.cards[e].cost=0
                        this.battle.combatants[0].status.main[118]=0
                    }
                    if(this.cards[e].spec==4){
                        if(this.battle.relics.active[99]){
                            this.battle.combatants[0].combo-=min(this.cards[e].cost,2)
                        }else{
                            this.battle.combatants[0].combo-=this.cards[e].cost
                        }
                    }else if(this.cards[e].cost==-1){
                        this.battle.mana.main=0
                        if(this.battle.relics.active[103]){
                            this.battle.attack.mana+=2
                        }
                    }else{
                        this.battle.mana.main-=this.cards[e].cost
                    }
                    if(this.cards[e].cost==0&&this.battle.relics.active[147]){
                        this.battle.attack.damage+=4
                    }
                    this.battle.attack.user=0
                    this.battle.attack.type=this.cards[e].attack
                    this.battle.attack.level=this.cards[e].level
                    this.battle.attack.class=this.cards[e].class
                    if(this.cards[e].spec==17||this.cards[e].spec==18){
                        this.cards[e].alt--
                        if(this.cards[e].alt<=0){
                            for(let f=0,lf=this.battle.hand.cards.length;f<lf;f++){
                                if(this.battle.hand.cards[f].id==this.cards[e].id){
                                    this.battle.hand.cards[f].exhaust=true
                                }
                            }
                            for(let f=0,lf=this.battle.deck.cards.length;f<lf;f++){
                                if(this.battle.deck.cards[f].id==this.cards[e].id){
                                    this.battle.deck.cards[f].remove=true
                                }
                            }
                        }
                    }
                    if(this.cards[e].attack==296&&inputs.rel.y>this.cards[e].position.y+10){
                        this.battle.attack.damage*=-1
                    }
                    if(this.cards[e].attack==63){
                        if(inputs.rel.y>this.cards[e].position.y+10){
                            this.battle.playCard()
                            this.battle.attack.update(2,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }else{
                            this.battle.attack.targetType=this.cards[e].target
                        }
                    }else if(this.cards[e].attack==280){
                        if(inputs.rel.y>this.cards[e].position.y+10){
                            this.battle.playCard()
                            this.battle.attack.update(103,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }else{
                            this.battle.playCard()
                            this.battle.attack.update(100,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }
                    }else if(this.cards[e].attack==341){
                        this.battle.attack.update(this.cards[e].attack,this.cards[e].level,0)
                        this.trigger=false
                        break
                    }else if(this.cards[e].attack==367){
                        if(inputs.rel.y>this.cards[e].position.y+10){
                            this.battle.playCard()
                            this.battle.attack.update(351,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }else{
                            this.battle.playCard()
                            this.battle.attack.update(174,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }
                    }else if(this.cards[e].attack==503){
                        if(inputs.rel.y>this.cards[e].position.y+10){
                            this.battle.playCard()
                            this.battle.attack.update(403,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }else{
                            this.battle.playCard()
                            this.battle.attack.update(402,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }
                    }else if(this.cards[e].attack==639){
                        if(inputs.rel.y>this.cards[e].position.y+10){
                            this.battle.playCard()
                            this.battle.attack.update(639,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }else{
                            this.battle.playCard()
                            this.battle.attack.update(26,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }
                    }else if(this.cards[e].attack==728){
                        this.battle.playCard()
                        if(e<le-1){
                            this.cards[e]=copyCard(this.cards[e+1])
                        }else{
                            this.cards[e].used=true
                        }
                        this.battle.afterPlayCard()
                        this.trigger=false
                    }else if(this.cards[e].attack==737){
                        this.battle.playCard()
                        if(e<le-1){
                            this.calc.level=this.cards[e].damage
                            this.cards[e]=copyCard(this.cards[e+1])
                            this.cards[e].damage*=this.calc.level
                            this.cards[e].alt*=this.calc.level
                        }else{
                            this.cards[e].used=true
                        }
                        this.battle.afterPlayCard()
                        this.trigger=false
                    }else if(this.cards[e].target==0||(this.cards[e].attack==564&&this.battle.attack.mana%2==1)){
                        this.battle.playCard()
                        this.battle.attack.update(this.cards[e].attack,this.cards[e].level,0)
                        this.battle.afterPlayCard()
                        this.cards[e].used=true
                        this.trigger=false
                        if(this.battle.attack.type==231){
                            this.cards[e].damage-=this.cards[e].alt
                        }else if(this.battle.attack.type==241||this.battle.attack.type==507){
                            this.cards[e].damage+=this.cards[e].alt
                        }
                    }else{
                        if(this.cards[e].attack==565){
                            this.battle.discard.cards.push(copyCard(this.cards[e]))
                        }
                        this.battle.attack.targetType=this.cards[e].target
                    }
                    if(this.cards[e].list==10&&this.battle.relics.active[38]){
                        this.cards[e].exhaust=true
                        this.battle.combatants[0].take(1,0)
                    }
                }
                if(this.select&&this.cards[e].select){
                    this.cards[e].select=false
                    this.select=false
                }
                if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>250&&!this.cards[e].used&&this.battle.discarding>0){
                    this.battle.discarding--
                    this.battle.random.discards++
                    this.cards[e].used=true
                    this.cards[e].selectDiscard=true
                    if(this.battle.random.discards==1&&this.battle.relics.active[148]){
                        this.battle.mana.main++
                    }
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>250&&!this.cards[e].used&&this.battle.random.upgrading>0){
                    this.battle.random.upgrading--
                    if(this.cards[e].level<1){
                        this.cards[e].level++
                    }
                    this.cards[e]=reformCard(this.cards[e])
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>250&&!this.cards[e].used&&this.battle.random.exhausting>0&&this.cards[e].attack!=-24){
                    this.battle.random.exhausting--
                    this.cards[e].used=true
                    this.cards[e].exhaust=true
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>250&&!this.cards[e].used&&this.battle.random.transforming>0&&this.cards[e].attack!=-26){
                    this.battle.random.transforming--
                    g=floor(random(0,3))
                    this.cards[e].type=listing.card[this.battle.player][g][floor(random(0,listing.card[this.battle.player][g].length))]
                    this.cards[e].color=this.battle.player
                    this.cards[e]=reformCard(this.cards[e])
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>250&&!this.cards[e].used&&this.battle.random.forethinking>0){
                    this.battle.random.forethinking--
                    this.cards[e].used=true
                    this.cards[e].draw=true
                    this.cards[e].cost=0
                    this.cards[e].base.cost=0
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>250&&!this.cards[e].used&&this.battle.random.reserving>0){
                    this.battle.random.reserving--
                    if(this.battle.random.copying>0){
                        for(let f=0;f<this.battle.random.copying;f++){
                            this.battle.reserve.pushTop(copyCard(this.cards[e]))
                        }
                        this.battle.random.copying=0
                    }else{
                        this.cards[e].used=true
                        this.cards[e].drawTop=true
                        this.cards[e].cost=0
                        this.cards[e].base.cost=0
                    }
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>250&&!this.cards[e].used&&this.battle.random.reserving2>0){
                    this.battle.random.reserving2--
                    if(this.battle.random.copying>0){
                        for(let f=0;f<this.battle.random.copying;f++){
                            this.battle.reserve.pushTop(copyCard(this.cards[e]))
                            this.battle.reserve.cards[this.battle.reserve.cards.length-1].cost=0
                            this.battle.reserve.cards[this.battle.reserve.cards.length-1].base.cost=0
                        }
                        this.battle.random.copying=0
                    }
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>250&&!this.cards[e].used&&this.battle.random.exiling>0){
                    this.battle.random.exiling--
                    this.battle.combatants[0].block+=this.cards[e].cost*5
                    this.cards[e].used=true
                    this.cards[e].exhaust=true
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>250&&!this.cards[e].used&&this.battle.random.releasing>0){
                    this.battle.random.releasing--
                    this.battle.combatants[0].orbAttack(this.cards[e].cost*6,0,0)
                    this.cards[e].used=true
                    this.cards[e].exhaust=true
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>250&&!this.select&&!this.cards[e].trigger&&(this.cards[e].spec!=1&&this.cards[e].spec!=6&&this.cards[e].spec!=7||this.cards[e].list==10&&this.battle.relics.active[38]||this.cards[e].list==11&&this.battle.relics.active[108])){
                    this.cards[e].select=true
                    this.select=true
                    this.selected=true
                    if(this.cards[e].spec==4){
                        this.anim.selectCombo=true
                    }else{
                        this.anim.selectCombo=false
                    }
                }
            }
            if(!this.selected){
                this.select=false
            }
            if(this.trigger){
                for(let e=0,le=this.cards.length;e<le;e++){
                    if(this.cards[e].select&&!this.cards[e].trigger){
                        this.cards[e].select=false
                    }
                }
            }
        }
    }
    onKeyHand(key,code){
        if(this.trigger){
            switch(this.battle.attack.targetType){
                case 1:
                    for(let e=0,le=this.battle.combatants.length;e<le;e++){
                        if(this.battle.combatants[e].team==1&&(key==' '&&pointInsideBox({position:inputs.rel},{position:{x:this.battle.combatants[e].position.x,y:this.battle.combatants[e].position.y-this.battle.combatants[e].height/2},width:80,height:160})||int(key)==(e-stage.playerCombatantNumber))&&this.battle.combatants[e].life>0){
                            this.battle.attack.target=e
                            this.battle.playCard()
                            if(this.battle.attack.type==63){
                                this.battle.attack.update(1,this.battle.attack.level,0)
                            }else{
                                this.battle.attack.update(this.battle.attack.type,this.battle.attack.level,0)
                            }
                            this.battle.afterPlayCard()
                            for(let f=0,lf=this.cards.length;f<lf;f++){
                                if(this.cards[f].trigger){
                                    if(this.battle.attack.type==723){
                                        this.cards[f].trigger=false
                                        this.cards[f].select=false
                                        this.cards[f].position.x=1260
                                        this.cards[f].position.y=500
                                    }else{
                                        this.cards[f].used=true
                                    }
                                    if(this.battle.attack.type==599||this.battle.attack.type==723){
                                        this.cards[f].damage+=this.cards[f].alt
                                    }else if(this.battle.attack.type==135){
                                        this.cards[f].damage-=this.cards[f].alt
                                    }else if(this.battle.attack.type==232&&this.cards[f].cost>0){
                                        this.cards[f].cost-=this.cards[f].alt
                                        this.cards[f].base.cost-=this.cards[f].alt
                                    }
                                }
                            }
                            this.trigger=false
                        }
                    }
                break
            }
        }else{
            this.selected=false
            for(let e=0,le=this.cards.length;e<le;e++){
                if(int(key)==(e+1)&&this.select&&this.cards[e].select&&(this.battle.mana.main>=this.cards[e].cost&&this.cards[e].spec!=4||this.battle.combatants[0].combo>=this.cards[e].cost&&this.cards[e].spec==4||this.battle.combatants[0].status.main[76]>0&&this.cards[e].class==0||this.battle.combatants[0].status.main[118]>0)&&!((this.cards[e].spec==5||this.cards[e].spec==11||this.cards[e].spec==14)&&this.battle.combatants[0].armed!=1)){
                    this.trigger=true
                    this.cards[e].trigger=true
                    this.select=false
                    if(this.battle.random.doubling>0){
                        this.battle.random.doubling--
                        this.cards.push(copyCard(this.cards[e]))
                        this.cards[this.cards.length-1].position.x=1206
                        this.cards[this.cards.length-1].position.y=500
                    }
                    if(this.cards[e].class==0){
                        if(this.battle.relics.active[61]){
                            this.battle.attack.damage=round(this.cards[e].damage*(2+max(0,this.battle.combatants[0].boost.main[0]))/(2-min(0,this.battle.combatants[0].boost.main[0]*1.5)))
                        }else{
                            this.battle.attack.damage=round(this.cards[e].damage*(2+max(0,this.battle.combatants[0].boost.main[0]))/(2-min(0,this.battle.combatants[0].boost.main[0])))
                        }
                        if(this.battle.combatants[0].status.main[18]>0){
                            this.battle.attack.damage+=this.battle.combatants[0].status.main[18]
                            this.battle.combatants[0].status.main[18]=0
                        }
                        if(this.battle.relics.active[19]&&this.battle.random.attacks%10==0){
                            this.battle.attack.damage*=2
                        }
                    }else{
                        this.battle.attack.damage=round(this.cards[e].damage)
                    }
                    this.battle.attack.alt=round(this.cards[e].alt)
                    this.battle.attack.mana=this.battle.mana.main
                    this.battle.attack.combo=this.battle.combatants[0].combo
                    this.battle.attack.color=this.cards[e].color
                    if(this.battle.combatants[0].status.main[76]>0&&this.cards[e].class==0&&this.cards[e].cost>0){
                        this.cards[e].cost=0
                        this.battle.combatants[0].status.main[76]=0
                    }
                    if(this.battle.combatants[0].status.main[118]>0&&this.cards[e].cost>0){
                        this.cards[e].cost=0
                        this.battle.combatants[0].status.main[118]=0
                    }
                    if(this.cards[e].spec==4){
                        if(this.battle.relics.active[99]){
                            this.battle.combatants[0].combo-=min(this.cards[e].cost,2)
                        }else{
                            this.battle.combatants[0].combo-=this.cards[e].cost
                        }
                    }else if(this.cards[e].cost==-1){
                        this.battle.mana.main=0
                        if(this.battle.relics.active[103]){
                            this.battle.attack.mana+=2
                        }
                    }else{
                        this.battle.mana.main-=this.cards[e].cost
                    }
                    if(this.cards[e].cost==0&&this.battle.relics.active[147]){
                        this.battle.attack.damage+=4
                    }
                    this.battle.attack.user=0
                    this.battle.attack.type=this.cards[e].attack
                    this.battle.attack.level=this.cards[e].level
                    this.battle.attack.class=this.cards[e].class
                    if(this.cards[e].spec==17||this.cards[e].spec==18){
                        this.cards[e].alt--
                        for(let f=0,lf=this.battle.deck.cards.length;f<lf;f++){
                            if(this.battle.deck.cards[f].id==this.cards[e].id){
                                this.battle.deck.cards[f].alt--
                            }
                        }
                        if(this.cards[e].alt<=0){
                            for(let f=0,lf=this.battle.hand.cards.length;f<lf;f++){
                                if(this.battle.hand.cards[f].id==this.cards[e].id){
                                    this.battle.hand.cards[f].exhaust=true
                                }
                            }
                            for(let f=0,lf=this.battle.deck.cards.length;f<lf;f++){
                                if(this.battle.deck.cards[f].id==this.cards[e].id){
                                    this.battle.deck.cards[f].remove=true
                                }
                            }
                        }
                    }
                    if(this.cards[e].attack==296&&inputs.rel.y>this.cards[e].position.y+10){
                        this.battle.attack.damage*=-1
                    }
                    if(this.cards[e].attack==63){
                        if(inputs.rel.y>this.cards[e].position.y+10){
                            this.battle.playCard()
                            this.battle.attack.update(2,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }else{
                            this.battle.attack.targetType=this.cards[e].target
                        }
                    }else if(this.cards[e].attack==280){
                        if(inputs.rel.y>this.cards[e].position.y+10){
                            this.battle.playCard()
                            this.battle.attack.update(103,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }else{
                            this.battle.playCard()
                            this.battle.attack.update(100,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }
                    }else if(this.cards[e].attack==341){
                        this.battle.attack.update(this.cards[e].attack,this.cards[e].level,0)
                        this.trigger=false
                        break
                    }else if(this.cards[e].attack==367){
                        if(inputs.rel.y>this.cards[e].position.y+10){
                            this.battle.playCard()
                            this.battle.attack.update(351,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }else{
                            this.battle.playCard()
                            this.battle.attack.update(174,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }
                    }else if(this.cards[e].attack==503){
                        if(inputs.rel.y>this.cards[e].position.y+10){
                            this.battle.playCard()
                            this.battle.attack.update(403,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }else{
                            this.battle.playCard()
                            this.battle.attack.update(402,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }
                    }else if(this.cards[e].attack==639){
                        if(inputs.rel.y>this.cards[e].position.y+10){
                            this.battle.playCard()
                            this.battle.attack.update(639,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }else{
                            this.battle.playCard()
                            this.battle.attack.update(26,this.cards[e].level,0)
                            this.battle.afterPlayCard()
                            this.cards[e].used=true
                            this.trigger=false
                        }
                    }else if(this.cards[e].attack==728){
                        this.battle.playCard()
                        if(e<le-1){
                            this.cards[e]=copyCard(this.cards[e+1])
                        }else{
                            this.cards[e].used=true
                        }
                        this.battle.afterPlayCard()
                        this.trigger=false
                    }else if(this.cards[e].attack==737){
                        this.battle.playCard()
                        if(e<le-1){
                            this.calc.level=this.cards[e].damage
                            this.cards[e]=copyCard(this.cards[e+1])
                            this.cards[e].damage*=this.calc.level
                            this.cards[e].alt*=this.calc.level
                        }else{
                            this.cards[e].used=true
                        }
                        this.battle.afterPlayCard()
                        this.trigger=false
                    }else if(this.cards[e].target==0||(this.cards[e].attack==564&&this.battle.attack.mana%2==1)){
                        this.battle.playCard()
                        this.battle.attack.update(this.cards[e].attack,this.cards[e].level,0)
                        this.battle.afterPlayCard()
                        this.cards[e].used=true
                        this.trigger=false
                        if(this.battle.attack.type==231){
                            this.cards[e].damage-=this.cards[e].alt
                        }else if(this.battle.attack.type==241||this.battle.attack.type==507){
                            this.cards[e].damage+=this.cards[e].alt
                        }
                    }else{
                        if(this.cards[e].attack==565){
                            this.battle.discard.cards.push(copyCard(this.cards[e]))
                        }
                        this.battle.attack.targetType=this.cards[e].target
                    }
                    if(this.cards[e].list==10&&this.battle.relics.active[38]){
                        this.cards[e].exhaust=true
                        this.battle.combatants[0].take(1,0)
                    }
                }
                if(this.select&&this.cards[e].select){
                    this.cards[e].select=false
                    this.select=false
                }
                if(int(key)==(e+1)&&!this.cards[e].used&&this.battle.discarding>0){
                    this.battle.discarding--
                    this.battle.random.discards++
                    this.cards[e].used=true
                    this.cards[e].selectDiscard=true
                    if(this.battle.random.discards==1&&this.battle.relics.active[148]){
                        this.battle.mana.main++
                    }
                }else if(int(key)==(e+1)&&!this.cards[e].used&&this.battle.random.upgrading>0){
                    this.battle.random.upgrading--
                    if(this.cards[e].level<1){
                        this.cards[e].level++
                    }
                    this.cards[e]=reformCard(this.cards[e])
                }else if(int(key)==(e+1)&&!this.cards[e].used&&this.battle.random.exhausting>0&&this.cards[e].attack!=-24){
                    this.battle.random.exhausting--
                    this.cards[e].used=true
                    this.cards[e].exhaust=true
                }else if(int(key)==(e+1)&&!this.cards[e].used&&this.battle.random.transforming>0&&this.cards[e].attack!=-26){
                    this.battle.random.transforming--
                    g=floor(random(0,3))
                    this.cards[e].type=listing.card[this.battle.player][g][floor(random(0,listing.card[this.battle.player][g].length))]
                    this.cards[e].color=this.battle.player
                    this.cards[e]=reformCard(this.cards[e])
                }else if(int(key)==(e+1)&&!this.cards[e].used&&this.battle.random.forethinking>0){
                    this.battle.random.forethinking--
                    this.cards[e].used=true
                    this.cards[e].draw=true
                    this.cards[e].cost=0
                    this.cards[e].base.cost=0
                }else if(int(key)==(e+1)&&!this.cards[e].used&&this.battle.random.reserving>0){
                    this.battle.random.reserving--
                    if(this.battle.random.copying>0){
                        for(let f=0;f<this.battle.random.copying;f++){
                            this.battle.reserve.pushTop(copyCard(this.cards[e]))
                        }
                        this.battle.random.copying=0
                    }else{
                        this.cards[e].used=true
                        this.cards[e].drawTop=true
                        this.cards[e].cost=0
                        this.cards[e].base.cost=0
                    }
                }else if(int(key)==(e+1)&&!this.cards[e].used&&this.battle.random.exiling>0){
                    this.battle.random.exiling--
                    this.battle.combatants[0].block+=this.cards[e].cost*5
                    this.cards[e].used=true
                    this.cards[e].exhaust=true
                }else if(int(key)==(e+1)&&!this.cards[e].used&&this.battle.random.releasing>0){
                    this.battle.random.releasing--
                    this.battle.combatants[0].orbAttack(this.cards[e].cost*6,0,0)
                    this.cards[e].used=true
                    this.cards[e].exhaust=true
                }else if(int(key)==(e+1)&&!this.select&&!this.cards[e].trigger&&(this.cards[e].spec!=1&&this.cards[e].spec!=6&&this.cards[e].spec!=7||this.cards[e].list==10&&this.battle.relics.active[38]||this.cards[e].list==11&&this.battle.relics.active[108])){
                    this.cards[e].select=true
                    this.select=true
                    this.selected=true
                    if(this.cards[e].spec==4){
                        this.anim.selectCombo=true
                    }else{
                        this.anim.selectCombo=false
                    }
                }
            }
            if(!this.selected){
                this.select=false
            }
            if(this.trigger){
                for(let e=0,le=this.cards.length;e<le;e++){
                    if(this.cards[e].select&&!this.cards[e].trigger){
                        this.cards[e].select=false
                    }
                }
            }
        }
    }
    onClickView(context,context2){
        this.selected=false
        for(let e=0,le=this.cards.length;e<le;e++){
            if(this.cards[e].select){
                if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>this.cards[e].position.y-this.cards[e].height/2&&inputs.rel.y<this.cards[e].position.y+this.cards[e].height/2&&this.cards[e].level==0&&context==1){
                    this.cards[e].level++
                    this.cards[e]=reformCard(this.cards[e])
                    transition.trigger=true
                    transition.scene='map'
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>this.cards[e].position.y-this.cards[e].height/2&&inputs.rel.y<this.cards[e].position.y+this.cards[e].height/2&&context==4&&this.cards.length>0){
                    this.battle.removeCard(e)
                    e--
                    le--
                    transition.trigger=true
                    transition.scene='map'
                    break
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>this.cards[e].position.y-this.cards[e].height/2&&inputs.rel.y<this.cards[e].position.y+this.cards[e].height/2&&context==6&&this.battle.currency.money>=this.battle.costs.remove&&this.cards.length>0){
                    this.battle.removeCard(e)
                    e--
                    le--
                    this.battle.currency.money-=this.battle.costs.remove
                    this.battle.costs.remove+=20
                    break
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>this.cards[e].position.y-this.cards[e].height/2&&inputs.rel.y<this.cards[e].position.y+this.cards[e].height/2&&context==9){
                    this.cards.push(copyCard(this.cards[e]))
                    transition.trigger=true
                    transition.scene='shop'
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>this.cards[e].position.y-this.cards[e].height/2&&inputs.rel.y<this.cards[e].position.y+this.cards[e].height/2&&context==14){
                    this.cards.push(copyCard(this.cards[e]))
                    transition.trigger=true
                    transition.scene='map'
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>this.cards[e].position.y-this.cards[e].height/2&&inputs.rel.y<this.cards[e].position.y+this.cards[e].height/2&&context==15){
                    f=floor(random(0,3))
                    this.cards[e].type=listing.card[this.battle.player][f][floor(random(0,listing.card[this.battle.player][f].length))]
                    this.cards[e].color=this.battle.player
                    this.cards[e]=reformCard(this.cards[e])
                    transition.trigger=true
                    transition.scene='map'
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>this.cards[e].position.y-this.cards[e].height/2&&inputs.rel.y<this.cards[e].position.y+this.cards[e].height/2&&context==16&&this.cards.length>0){
                    if(this.cards[e].list==10||this.cards[e].list==11||this.cards[e].list==5){
                        this.battle.currency.money++
                    }else if(this.cards[e].rarity==2){
                        this.battle.combatants[0].base.life+=10
                        this.battle.combatants[0].life=this.battle.combatants[0].base.life
                    }else if(this.cards[e].rarity==1){
                        this.battle.combatants[0].life=this.battle.combatants[0].base.life
                    }else{
                        this.battle.combatants[0].life=min(this.battle.combatants[0].base.life,this.battle.combatants[0].life+5)
                    }
                    this.battle.removeCard(e)
                    e--
                    le--
                    transition.trigger=true
                    transition.scene='map'
                    break
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>this.cards[e].position.y-this.cards[e].height/2&&inputs.rel.y<this.cards[e].position.y+this.cards[e].height/2&&context==18&&this.cards.length>0){
                    this.battle.removeCard(e)
                    e--
                    le--
                    transition.trigger=true
                    transition.scene='battle'
                    break
                }
                this.cards[e].select=false
            }
            if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>this.cards[e].position.y-this.cards[e].height/2&&inputs.rel.y<this.cards[e].position.y+this.cards[e].height/2&&!(this.cards[e].level==1&&context==1)&&!(e>=context2&&(context==7||context==8||context==13))){
                this.cards[e].select=true
                this.select=true
                this.selected=true
                if(context==12){
                    this.battle.hand.cards.push(copyCard(this.cards[e]))
                    this.battle.hand.cards[this.battle.hand.cards.length-1].position.x=1206
                    this.battle.hand.cards[this.battle.hand.cards.length-1].position.y=500
                    this.cards.splice(e,1)
                    e--
                    le--
                    transition.trigger=true
                    transition.scene='battle'
                }else if(context==11){
                    this.battle.hand.cards.push(copyCard(this.cards[e]))
                    this.battle.hand.cards[this.battle.hand.cards.length-1].position.x=1206
                    this.battle.hand.cards[this.battle.hand.cards.length-1].position.y=500
                    this.battle.hand.cards[this.battle.hand.cards.length-1].cost=0
                    this.battle.hand.cards.push(copyCard(this.cards[e]))
                    this.battle.hand.cards[this.battle.hand.cards.length-1].position.x=1206
                    this.battle.hand.cards[this.battle.hand.cards.length-1].position.y=500
                    this.battle.hand.cards[this.battle.hand.cards.length-1].cost=0
                    this.cards.splice(e,1)
                    e--
                    le--
                    transition.trigger=true
                    transition.scene='battle'
                }else if(context==10){
                    this.battle.hand.cards.push(copyCard(this.cards[e]))
                    this.battle.hand.cards[this.battle.hand.cards.length-1].position.x=1206
                    this.battle.hand.cards[this.battle.hand.cards.length-1].position.y=500
                    this.battle.hand.cards[this.battle.hand.cards.length-1].cost=0
                    this.cards.splice(e,1)
                    e--
                    le--
                    transition.trigger=true
                    transition.scene='battle'
                }else if(context==7||context==8){
                    this.battle.discard.cards.push(copyCard(this.cards[e]))
                    this.cards.splice(e,1)
                    e--
                    le--
                    this.battle.context2--
                }else if(context==2||context==17){
                    this.battle.hand.cards.push(copyCard(this.cards[e]))
                    this.battle.hand.cards[this.battle.hand.cards.length-1].position.x=1206
                    this.battle.hand.cards[this.battle.hand.cards.length-1].position.y=500
                    this.cards.splice(e,1)
                    e--
                    le--
                    transition.trigger=true
                    transition.scene='battle'
                    if(context==2){
                        this.battle.close()
                    }
                }else if(context==1){
                    this.battle.choice.cards[0]=new card(this.layer,this.cards[e].position.x,this.cards[e].position.y,this.cards[e].type,1,this.cards[e].color)
                    this.battle.choice.cards[0].size=1
                }
            }
        }
        if(!this.selected){
            this.select=false
            if(context!=6){
                this.battle.choice.cards[0]=new card(this.layer,-300,0,0,0,0)
            }
        }
    }
}