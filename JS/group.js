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
        this.anim={discarding:0}
    }
    initial(type){
        /*for(e=0;e<20;e++){
            this.add(floor(random(1,118)),0,this.battle.player)
        }*/
        switch(type){
            case 1:
                /*for(e=0;e<4;e++){
                    this.add(1,0,this.battle.player) 
                }
                for(e=0;e<4;e++){
                    this.add(2,0,this.battle.player)
                }
                this.add(findCard('Big\nStrike'),0,this.battle.player)
                this.add(findCard('Triple\nPunch'),0,this.battle.player)*/
                this.add(69,0,this.battle.player)
                this.add(70,0,this.battle.player)
                this.add(71,0,this.battle.player)
                this.add(72,0,this.battle.player)
                this.add(73,0,this.battle.player)
            break
            case 2:
                for(e=0;e<4;e++){
                    //this.add(1,0,this.battle.player)
                }
                for(e=0;e<4;e++){
                    //this.add(2,0,this.battle.player)
                }
                this.add(findCard('Eruption'),0,this.battle.player)
                this.add(findCard('Vigilance'),0,this.battle.player)
                /*this.add(126,0,this.battle.player)
                this.add(127,0,this.battle.player)
                this.add(128,0,this.battle.player)
                this.add(129,0,this.battle.player)
                this.add(130,0,this.battle.player)*/
            break
            case 3:
                /*for(e=0;e<4;e++){
                    this.add(1,0,this.battle.player)
                }
                for(e=0;e<4;e++){
                    this.add(2,0,this.battle.player)
                }
                this.add(findCard('Charge'),0,this.battle.player)
                this.add(findCard('Multicast'),0,this.battle.player)*/
                this.add(144,0,this.battle.player)
                this.add(145,0,this.battle.player)
                this.add(146,0,this.battle.player)
                this.add(147,0,this.battle.player)
                this.add(148,0,this.battle.player)
            break
            case 4:
                for(e=0;e<4;e++){
                    this.add(1,0,this.battle.player)
                }
                for(e=0;e<4;e++){
                    this.add(2,0,this.battle.player)
                }
                this.add(findCard('Peace'),0,this.battle.player)
                this.add(findCard('Danger'),0,this.battle.player)
                /*this.add(213,0,this.battle.player)
                this.add(214,0,this.battle.player)
                this.add(215,0,this.battle.player)
                this.add(216,0,this.battle.player)
                this.add(217,0,this.battle.player)*/
            break
        }
    }
    add(type,level,color){
        this.calc.level=level
        if(types.card[type].stats[level].class==0&&this.battle.relics.active[41]||types.card[type].stats[level].class==1&&this.battle.relics.active[42]||types.card[type].stats[level].class==2&&this.battle.relics.active[43]){
            this.calc.level++
        }
        if(types.card[type].list==10&&this.battle.relics.active[21]){
            this.battle.relics.active[21]=false
        }else{
            this.cards.push(new card(this.layer,1206,500,type,this.calc.level,color))
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
    addDrop(type,level,color){
        this.cards.push(new card(this.layer,50,-200,type,level,color))
    }
    allUpgrade(){
        this.storage.cards=[]
        while(this.cards.length>0){
            this.storage.cards.push(copyCard(this.cards[0]))
            this.storage.cards[this.storage.cards.length-1].level=1
            this.cards.splice(0,1)
        }
        while(this.storage.cards.length>0){
            this.cards.push(copyCard(this.storage.cards[0]))
            this.storage.cards.splice(0,1)
        }
    }
    shuffle(){
        if(this.battle.relics.active[58]){
            this.battle.mana.main++
        }
        if(this.battle.relics.active[114]){
            this.battle.combatants[0].block+=6
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
                        this.battle.combatants[0].take(1,0)
                    }
                }
            }else if(this.cards[e].attack==139){
                this.battle.combatants[0].take(this.cards[e].alt,0)
            }
        }
        for(let e=0,le=this.cards.length;e<le;e++){
            if(this.cards[e].attack==52&&!this.cards[e].trigger){
                this.cards[e].damage+=this.cards[e].alt
            }else if(this.cards[e].attack==114&&this.cards[e].cost>0&&!this.cards[e].trigger){
                this.cards[e].cost--
            }else if((this.cards[e].spec!=2&&this.cards[e].spec!=9&&this.cards[e].spec!=12||this.cards[e].trigger)){
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
                    this.battle.combatants[0].take(2,0)
                }else if(this.cards[e].attack==-14){
                    this.battle.combatants[0].status.main[11]+=2
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
        for(e=0,le=this.cards.length;e<le;e++){
            this.cards[e].displayDiscarding(this.anim.discarding)
            this.cards[e].display(this.battle.deck.cards.length,this.battle.hand.cards.length,this.battle.discard.cards.length)
        }
    }
    displayView(level){
        if(level>=0){
            for(e=0,le=min(level,this.cards.length);e<le;e++){
                this.cards[e].position.x=75+(e%6)*150
                this.cards[e].position.y=100+floor(e/6)*200-this.scroll
                this.cards[e].anim.afford=0
                this.cards[e].size=1
                this.cards[e].fade=1
                this.cards[e].display(le)
            }
        }else{
            for(e=0,le=this.cards.length;e<le;e++){
                this.cards[e].position.x=75+(e%6)*150
                this.cards[e].position.y=100+floor(e/6)*200-this.scroll
                this.cards[e].anim.afford=0
                this.cards[e].size=1
                this.cards[e].fade=1
                this.cards[e].display(le)
            }
        }
    }
    update(){
        for(e=0,le=this.cards.length;e<le;e++){
            if(this.cards[e].discard||this.cards[e].remove&&this.battle.relics.active[113]&&floor(random(0,2))==0){
                if(this.cards[e].selectDiscard){
                    this.cards[e].selectDiscard=false
                    if(this.cards[e].attack==167){
                        for(f=0;f<this.cards[e].damage;f++){
                            this.battle.draw()
                        }
                    }else if(this.cards[e].attack==168){
                        this.battle.mana.main+=this.cards[e].damage
                    }
                }
                if(!this.cards[e].trigger){
                    if(this.battle.relics.active[95]){
                        this.calc.list=[]
                        for(f=1,lf=this.battle.combatants.length;f<lf;f++){
                            if(this.battle.combatants[f].life>0){
                                this.calc.list.push(f)
                            }
                        }
                        this.battle.combatants[this.calc.list[floor(random(0,this.calc.list.length))]].take(3,0)
                    }
                    if(this.battle.relics.active[96]){
                        this.battle.combatants[0].block+=3
                    }
                }
                this.battle.discard.cards.push(copyCard(this.cards[e]))
                this.cards.splice(e,1)
                e--
                le--
            }else if(this.cards[e].draw){
                this.battle.reserve.cards.push(copyCard(this.cards[e]))
                this.cards.splice(e,1)
                e--
                le--
            }else if(this.cards[e].remove){
                this.cards.splice(e,1)
                e--
                le--
                if(this.battle.combatants[0].status[46]>0){
                    for(f=0;f<this.battle.combatants[0].status[46];f++){
                        this.battle.draw()
                    }
                }
                if(this.battle.relics.active[71]){
                    this.battle.randomAdd()
                }
                if(this.battle.relics.active[93]){
                    for(f=1,lf=this.battle.combatants.length;f<lf;f++){
                        this.battle.combatants[f].take(3,0)
                    }
                }
            }
        }
    }
    updateHand(){
        for(e=0,le=this.cards.length;e<le;e++){
            this.cards[e].update(this.battle.mana,this.battle.combatants[0].combo,this.battle.combatants[0].armed)
            if((inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>350||this.cards[e].select)&&(!this.trigger||this.cards[e].trigger)&&this.cards[e].position.y>320){
                this.cards[e].position.y-=20
            }else if(!((inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>250||this.cards[e].select)&&(!this.trigger||this.cards[e].trigger))&&this.cards[e].position.y<500){
                this.cards[e].position.y+=20
            }
            if(this.cards[e].position.x>e*80+126&&(this.cards[e].position.x>this.cards[max(0,e-1)].position.x+80||e==0)){
                this.cards[e].position.x-=20
            }else if(this.cards[e].attack==121&&this.cards[e].position.x<=e*80+126&&!this.cards[e].used){
                this.cards[e].used=true
                this.cards[e].exhaust=true
                for(f=0;f<this.cards[e].damage;f++){
                    this.add(findCard('Miracle'),0,0)
                }
            }
        }
    }
    updateDrop(){
        for(e=0,le=this.cards.length;e<le;e++){
            this.cards[e].size=0.5
            this.cards[e].position.y+=20
            if(this.cards[e].position.y>800){
                this.cards[e].remove=true
            }
        }
    }
    updateView(){
        for(e=0,le=this.cards.length;e<le;e++){
            this.cards[e].update(0,0,0)
        }
    }
    onClickHand(){
        if(this.trigger){
            switch(this.battle.attack.targetType){
                case 1:
                    for(e=1,le=this.battle.combatants.length;e<le;e++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.battle.combatants[e].position.x,y:this.battle.combatants[e].position.y-this.battle.combatants[e].height/2},width:80,height:160})&&this.battle.combatants[e].life>0){
                            this.battle.attack.target=e
                            this.battle.playCard()
                            if(this.battle.attack.type==63){
                                this.battle.attack.update(1,this.battle.attack.level,0)
                            }else{
                                this.battle.attack.update(this.battle.attack.type,this.battle.attack.level,0)
                            }
                            for(f=0,lf=this.cards.length;f<lf;f++){
                                if(this.cards[f].trigger){
                                    this.cards[f].used=true
                                    if(this.battle.attack.type==135){
                                        this.cards[f].damage-=this.cards[f].alt
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
            for(e=0,le=this.cards.length;e<le;e++){
                if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>this.cards[e].position.y-this.cards[e].height/2&&inputs.rel.y<this.cards[e].position.y+this.cards[e].height/2&&this.select&&this.cards[e].select&&(this.battle.mana.main>=this.cards[e].cost&&this.cards[e].spec!=4||this.battle.combatants[0].combo>=this.cards[e].cost&&this.cards[e].spec==4)&&!((this.cards[e].spec==5||this.cards[e].spec==11||this.cards[e].spec==14)&&this.battle.combatants[0].armed!=1)){
                    this.trigger=true
                    this.cards[e].trigger=true
                    this.select=false
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
                    if(this.cards[e].spec==4){
                        if(this.battle.relics.active[99]){
                            this.battle.combatants[0].combo-=min(this.cards[e].cost,2)
                        }else{
                            this.battle.combatants[0].combo-=this.cards[e].cost
                        }
                    }else if(this.cards[e].cost==-1){
                        this.battle.mana.main=0
                        this.battle.attack.mana+=2
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
                    if(this.cards[e].attack==63){
                        if(inputs.rel.y>this.cards[e].position.y+10){
                            this.battle.playCard()
                            this.battle.attack.update(2,this.cards[e].level,0)
                            this.cards[e].used=true
                            this.trigger=false
                        }else{
                            this.battle.attack.targetType=this.cards[e].target
                        }
                    }else if(this.cards[e].target==0){
                        this.battle.playCard()
                        this.battle.attack.update(this.cards[e].attack,this.cards[e].level,0)
                        this.cards[e].used=true
                        this.trigger=false
                    }else{
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
                }else if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>250&&!this.select&&!this.cards[e].trigger&&(this.cards[e].spec!=1&&this.cards[e].spec!=6&&this.cards[e].spec!=7||this.cards[e].list==10&&this.battle.relics.active[38]||this.cards[e].list==11&&this.battle.relics.active[108])){
                    this.cards[e].select=true
                    this.select=true
                    this.selected=true
                }
            }
            if(!this.selected){
                this.select=false
            }
            if(this.trigger){
                for(e=0,le=this.cards.length;e<le;e++){
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
                    this.cards[e]=new card(this.cards[e].layer,this.cards[e].x,this.cards[e].y,this.cards[e].type,this.cards[e].level+1,this.cards[e].color)
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
                }
                this.cards[e].select=false
            }
            if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>this.cards[e].position.y-this.cards[e].height/2&&inputs.rel.y<this.cards[e].position.y+this.cards[e].height/2&&!(this.cards[e].level==1&&context==1)&&!(e>=context2&&(context==7||context==8))){
                this.cards[e].select=true
                this.select=true
                this.selected=true
                if(context==11){
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
                }else if(context==2){
                    this.battle.hand.cards.push(copyCard(this.cards[e]))
                    this.battle.hand.cards[this.battle.hand.cards.length-1].position.x=1206
                    this.battle.hand.cards[this.battle.hand.cards.length-1].position.y=500
                    this.cards.splice(e,1)
                    e--
                    le--
                    transition.trigger=true
                    transition.scene='battle'
                    this.battle.close()
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