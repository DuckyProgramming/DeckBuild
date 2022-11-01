class group{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.storage={cards:[]}
        this.cards=[]
        this.select=false
        this.selcted=false
        this.trigger=false
    }
    initial(type){
        switch(type){
            case 1:
                /*for(e=0;e<5;e++){
                    this.add(1,0,this.battle.player)
                }
                for(e=0;e<5;e++){
                    this.add(2,0,this.battle.player)
                }
                this.add(3,0,this.battle.player)
                this.add(4,0,this.battle.player)
                this.add(5,0,this.battle.player)*/
                this.add(7,0,this.battle.player)
                this.add(8,0,this.battle.player)
                this.add(9,0,this.battle.player)
                this.add(10,0,this.battle.player)
                this.add(12,0,this.battle.player)
            break
        }
    }
    add(type,level,color){
        this.cards.push(new card(this.layer,1206,500,type,level,color))
    }
    addDrop(type,level,color){
        this.cards.push(new card(this.layer,50,-200,type,level,color))
    }
    shuffle(){
        for(e=0,le=this.cards.length;e<le;e++){
            this.storage.cards.push(copyCard(this.cards[e]))
        }
        this.cards=[]
        while(this.storage.cards.length>0){
            e=floor(random(0,this.storage.cards.length))
            this.cards.push(copyCard(this.storage.cards[e]))
            this.storage.cards.splice(e,1)
        }
    }
    discard(){
        for(e=0,le=this.cards.length;e<le;e++){
            this.cards[e].used=true
        }
    }
    display(){ 
        for(e=0,le=this.cards.length;e<le;e++){
            this.cards[e].display()
        }
    }
    update(){
        for(e=0,le=this.cards.length;e<le;e++){
            if(this.cards[e].discard){
                this.battle.discard.cards.push(copyCard(this.cards[e]))
                this.cards.splice(e,1)
                e--
                le--
            }else if(this.cards[e].remove){
                this.cards.splice(e,1)
                e--
                le--
            }
        }
    }
    updateHand(){
        for(e=0,le=this.cards.length;e<le;e++){
            this.cards[e].update(this.battle.mana)
            if((inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>350||this.cards[e].select)&&(!this.trigger||this.cards[e].trigger)&&this.cards[e].position.y>320){
                this.cards[e].position.y-=20
            }else if(!((inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>250||this.cards[e].select)&&(!this.trigger||this.cards[e].trigger))&&this.cards[e].position.y<500){
                this.cards[e].position.y+=20
            }
            if(this.cards[e].position.x>e*80+126&&(this.cards[e].position.x>this.cards[max(0,e-1)].position.x+80||e==0)){
                this.cards[e].position.x-=20
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
    onClickHand(){
        if(this.trigger){
            switch(this.battle.attack.targetType){
                case 1:
                    for(e=1,le=this.battle.combatants.length;e<le;e++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.battle.combatants[e].position.x,y:this.battle.combatants[e].position.y-this.battle.combatants[e].height/2},width:80,height:160})&&this.battle.combatants[e].life>0){
                            this.battle.attack.target=e
                            this.battle.playCard()
                            this.battle.attack.update(this.battle.attack.type,this.battle.attack.level,0)
                            for(f=0,lf=this.cards.length;f<lf;f++){
                                if(this.cards[f].trigger){
                                    this.cards[f].used=true
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
                if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>this.cards[e].position.y-this.cards[e].height/2&&inputs.rel.y<this.cards[e].position.y+this.cards[e].height/2&&this.select&&this.cards[e].select&&this.battle.mana.main>=this.cards[e].cost){
                    this.trigger=true
                    this.cards[e].trigger=true
                    this.select=false
                    this.battle.attack.damage=this.cards[e].damage*(2+max(0,this.battle.combatants[0].boost.main[0]))/(2-min(0,this.battle.combatants[0].boost.main[0]))
                    this.battle.attack.alt=this.cards[e].damage*(2+max(0,this.battle.combatants[0].boost.main[0]))/(2-min(0,this.battle.combatants[0].boost.main[0]))
                    this.battle.attack.mana=this.battle.mana.main
                    if(this.cards[e].cost==-1){
                        this.battle.mana.main=0
                    }else{
                        this.battle.mana.main-=this.cards[e].cost
                    }
                    this.battle.attack.type=this.cards[e].attack
                    this.battle.attack.level=this.cards[e].level
                    if(this.cards[e].target==0){
                        this.battle.playCard()
                        this.battle.attack.update(this.cards[e].attack,this.cards[e].level,0)
                        this.cards[e].used=true
                        this.trigger=false
                    }else{
                        this.battle.attack.targetType=this.cards[e].target
                    }
                }
                if(this.select&&this.cards[e].select){
                    this.cards[e].select=false
                    this.select=false
                }
                if(inputs.rel.x>this.cards[e].position.x-this.cards[e].width/2&&inputs.rel.x<this.cards[e].position.x+this.cards[e].width/2&&inputs.rel.y>250&&!this.select&&!this.cards[e].trigger&&this.cards[e].spec!=1){
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
}