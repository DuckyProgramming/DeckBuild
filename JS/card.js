class card{
    constructor(layer,x,y,type,level,color,damage=types.card[type].stats[level].damage,alt=types.card[type].stats[level].alt,cost=types.card[type].stats[level].cost,spec=types.card[type].stats[level].spec,playExhaust=false,id){
        this.layer=layer
        this.position={x:x,y:y}
        this.type=type
        this.level=level
        this.color=color
        this.name=types.card[this.type].name
        this.rarity=types.card[this.type].rarity
        this.list=types.card[this.type].list
        this.damage=damage
        this.alt=alt
        this.cost=cost
        this.spec=spec
        this.playExhaust=playExhaust
        this.id=id
        this.attack=types.card[this.type].stats[this.level].attack
        this.target=types.card[this.type].stats[this.level].target
        this.class=types.card[this.type].stats[this.level].class
        this.desc=''
        this.base={cost:this.cost}
        this.anim={select:0,afford:0}
        this.width=120
        this.height=160
        this.size=0
        this.fade=1
        this.calcDirection=0
        this.retain=false
        this.remove=false
        this.draw=false
        this.discard=false
        this.select=false
        this.trigger=false
        this.used=false
        this.exhaust=false
        this.drawTop=false
        this.selectDiscard=false
    }
    displayName(deckSize,handSize,discardSize,drawSize,turn,random){
        this.desc=''
        if(this.spec==1||this.spec==6||this.spec==7){
            this.desc+='Unplayable\n'
        }
        if(this.spec==7||this.spec==8||this.spec==10){
            this.desc+='Innate\n'
        }
        if(this.spec==16){
            this.desc+='Memory\n'
        }
        switch(this.attack){
            case -2: this.desc+='Take '+this.damage+' Damage\nPer Card Played'; break
            case -3: if(this.spec!=0){this.desc+='Ethereal'}; break
            case -4: this.desc+='At End of Turn,\nGain 1 Weak'; break
            case -5: this.desc+='Take 1 Damage\nPer Card Not Played'; break
            case -7: this.desc+='At End of Turn,\nGain 1 Vulnerable'; break
            case -8: this.desc+='When Removed,\nLose 3 Max Health'; break
            case -9: this.desc+='When Drawn,\nLose 1 Energy'; if(this.spec!=0){this.desc+='\nEthereal'}; break
            case -10: this.desc+='At End of Turn,\nTake 2 Damage'; break
            case -11: this.desc+='Cannot Play more\nthan 3 Cards'; break
            case -12: this.desc+='Cannot Play more\nthan 1 Attack\nWhen Played,\nBreak Balance'; break
            case -13: this.desc+='Unremovable'; break
            case -14: this.desc+='At End of Turn,\nAdd 2 Bleed'; break
            case -15: this.desc+='When Drawn, Gain\n2 Temporary Weak'; break
            case -16: this.desc+='When Drawn,\na Random Card\nGains 1 Cost'; if(this.spec!=0){this.desc+='\nEthereal'} break
            case -17: this.desc+='When Drawn,\nLose 1 Energy'; break
            case -18: this.desc+='All Cards\nCost 1 More'; break
            case -19: this.desc+='When Drawn,\nAttacks Deal\n2 Less Damage'; break
            case -20: this.desc+='Take 1 Damage\nWhen You Damage\nan Enemy'; break
            case -21: this.desc+='At End of Turn,\nTake '+this.damage+' Damage\nIncreases by 1'; break
            case -22: this.desc+='Lose 10\nCurrency'; break
            case 1: this.desc+='Deal '+this.damage+'\nDamage'; break
            case 2: this.desc+='Add '+this.damage+'\nBlock'; break
            case 3: this.desc+='Deal '+this.damage+' Damage\n'+this.alt+' Times'; break
            case 4: this.desc+='Draw '+this.damage+' Cards'; break
            case 5: this.desc+='Apply '+this.damage+'\nWeak'; break
            case 6: this.desc+='Add '+this.damage+' Block\nCounter '+this.alt+' All'; break
            case 7: this.desc+='Add '+this.damage+'X\nBlock'; break
            case 8: this.desc+='Deal '+this.damage+' Damage\nAdd 1 Slow Bleed\nto Deck'; break
            case 9: this.desc+='Deal '+this.damage+' Damage\nDiscard 1\nRandom Card'; break
            case 10: this.desc+='Deal '+this.damage+' Damage\nIf Fatal, Gain\n'+this.alt+' Energy'; break
            case 11: this.desc+='Deal '+this.damage+' Damage\nGain '+this.alt+' Energy\nNext Turn'; break
            case 12: this.desc+='Deal '+this.damage+' Damage\nto All Enemies'; break
            case 13: this.desc+='Hold '+this.damage+'\nBasic Charge'; break
            case 14: this.desc+='Evoke 1st Charge\n'+this.damage+' Times'; break
            case 15: this.desc+='Hold '+this.damage+'\nExplosive Charge'; break
            case 16: this.desc+='Hold '+this.damage+'\nShield Charge'; break
            case 17: this.desc+='Evoke All\nCharges'; break
            case 18: this.desc+='Deal '+this.damage+' Damage\nDiscard '+this.alt+' Cards'; break
            case 19: this.desc+='Lose 1\nAmmo Slot'; break
            case 20: this.desc+='Hold '+this.damage+'\nEnergy Charge'; break
            case 21: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Vulnerable'; break                
            case 22: this.desc+='Deal '+this.damage+' Damage\nAll Claws Gain\n+2 Damage'; break
            case 23: this.desc+='Deal '+this.damage+'X\nDamage'; break
            case 24: this.desc+='Deal '+this.damage+' Damage\nDraw '+this.alt+' Cards'; break
            case 25: this.desc+='Heal '+this.damage+' Health'; break
            case 26: this.desc+='Add '+this.damage+' Shivs\nto Your Hand'; break
            case 27: this.desc+='Add '+this.damage+' Block\nEnter Calm'; break
            case 28: this.desc+='Add '+this.damage+' Block\nExit Stance'; break
            case 29: this.desc+='Deal '+this.damage+' Damage\nIf the Enemy\nIntends to Attack,\nEnter Calm'; break
            case 30: this.desc+='Deal '+this.damage+' Damage\nExit Stance'; break
            case 31: this.desc+='Draw '+this.damage+' Cards\nExit Stance'; break
            case 32: this.desc+='Remove All\nBlock of Target\nDeal '+this.damage+' Damage'; break
            case 33: this.desc+='Evoke 1st Charge\nHold that Charge'; break
            case 34: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Weak'; break
            case 35: this.desc+='Gain '+this.damage+'\nCombo'; break
            case 36: this.desc+='Deal '+this.damage+' Damage\n+'+this.alt+' Per Combo\nEnd Combo'; break
            case 37: this.desc+='Deal '+this.damage+' Damage\n+'+this.alt+' Per Combo'; break
            case 38: this.desc+='Next '+this.damage+'\nAttacks Deal\nDouble Damage'; break
            case 39: this.desc+='Add '+this.damage+' Block\nCounter '+this.alt+' Once'; break
            case 40: this.desc+='Add '+this.damage+' Block\nCounter '+this.alt+'+2\nPer Combo'+' Once'; break
            case 41: this.desc+='Deal '+this.damage+' Damage\nGain '+this.alt+' Strength\nNext Turn'; break
            case 42: this.desc+='Deal '+this.damage+' Damage\nKnockdown'; break
            case 43: this.desc+='Deal '+this.damage+' Damage\nDeal '+this.alt+' Bonus\nDamage to Downed'; break
            case 44: this.desc+='Deal '+this.damage+' Damage\n+1 Per Combo\n'+this.alt+' Times\nEnd Combo'; break
            case 45: this.desc+='Deal '+this.damage+' Damage\nAdd 1 Dodge'; break
            case 46: this.desc+='Deal '+this.damage+' Damage\nDeal '+this.alt+' Damage\nto the Left'; break
            case 47: this.desc+='Deal '+this.damage+' Damage\nDeal '+this.alt+' Damage\nto the Right'; break
            case 48: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Vulnerable'; break
            case 49: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\nDeal '+this.alt+' Bonus\nDamage to Downed'; break
            case 50: this.desc+='Deal '+this.damage+' Damage\n+'+this.alt+' Per Combo\nTo 3 Enemies\nEnd Combo'; break
            case 51: this.desc+='Deal '+this.damage+' Damage\n'+this.alt+' Times'; break
            case 52: this.desc+='Deal '+this.damage+' Damage\nGain '+this.alt+' Damage\nWhen Retained'; break
            case 53: this.desc+='Reduce Cost of\nAll Cards in\nHand to '+this.damage; break
            case 54: this.desc+='Deal '+this.damage+' Damage\nIgnore Block'; break
            case 55: this.desc+='Shuffle Discard\nPile into Draw Pile\nDraw '+this.damage+' Cards'; break
            case 56: this.desc+='Exhaust\n3 Cards'; break
            case 57: this.desc+='Add '+this.damage+' Block\nDraw '+this.alt+' Cards'; break
            case 58: this.desc+='Temporarily\nUpgrade All Cards'; break
            case 59: this.desc+='Shuffle '+this.damage+'\nRandom Attacks\ninto Draw Pile\nThey Cost 0'; break
            case 60: this.desc+='Deal '+this.damage+' Damage\nIf Fatal, gain\n'+this.alt+' Currency'; break
            case 61: this.desc+='Shuffle '+this.damage+'\nRandom Skills\ninto Draw Pile\nThey Cost 0'; break
            case 62: this.desc+='Deal Damage\nEqual to Number of\nCards in Deck\n('+deckSize+')'; break
            case 63: this.desc+='Deal '+this.damage+'\nDamage\nor\nAdd '+this.damage+'\nBlock'; break
            case 64: this.desc+='Apply '+this.damage+' Weak\nand '+this.damage+' Vulnerable\nto All Enemies'; break
            case 65: this.desc+='Deal '+this.damage+' Damage\n'+nfp(this.alt)+' Balance'; break
            case 66: this.desc+='Add '+this.damage+' Block\n'+nfp(this.alt)+' Balance'; break
            case 67: this.desc+='If Balance\nis Positive,\nDeal Damage\nEqual to Balance\nReset Balance'; break
            case 68: this.desc+='If Balance\nis Negative, Add\nBlock Equal to\nNegative Balance\nReset Balance'; break
            case 69: this.desc+='Reset Balance'; break
            case 70: this.desc+='Draw '+this.damage+' Cards\n'+nfp(this.alt)+' Balance'; break
            case 71: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\n'+nfp(this.alt)+' Balance\nPer Enemy'; break
            case 72: this.desc+='Deal '+this.damage+' Damage\nApply 1 Stun\n'+nfp(this.alt)+' Balance'; break
            case 73: this.desc+='Deal '+this.damage+' Damage\nDisarm'; break
            case 74: this.desc+='Rearm'; break
            case 75: this.desc+='Reflect Next\n'+this.damage+' Attacks\n'+nfp(this.alt)+' Balance'; break
            case 76: this.desc+='Apply '+this.damage+'\nBleed\n'+nfp(this.alt)+' Balance'; break
            case 77: this.desc+='Deal '+this.damage+' Damage\nApply '+(6+this.level*2)+' Bleed\n'+nfp(this.alt)+' Balance'; break
            case 78: this.desc+='Deal '+this.damage+' Damage\n6 Times\n'+nfp(this.alt)+' Balance'; break
            case 79: this.desc+='If Balance\nis Positive,\nHeal Health\nEqual to Balance\nReset Balance'; break
            case 80: this.desc+='Gain '+this.damage+' Intangible\n'+nfp(this.alt)+' Balance'; break
            case 81: this.desc+='Reset Enemy\nIntent'; break
            case 82: this.desc+='Gain '+this.damage+' Strength\nGain '+this.alt+' Dexterity\nDisarm Permanently'; break
            case 83: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\nDisarm'; break
            case 84: this.desc+='Gain '+this.damage+' Dexterity\nDraw '+this.alt+' Cards'; break
            case 85: this.desc+='Apply '+this.damage+' Bleed\nto All Enemies\n'+nfp(this.alt)+' Balance'; break
            case 86: this.desc+='Deal '+this.damage+' Damage\nRearm'; break
            case 87: this.desc+='Add '+this.damage+' Block\nRearm'; break
            case 88: this.desc+='Add '+this.damage+' Block\nDisarm'; break
            case 89: this.desc+='Draw '+this.damage+' Cards\n'+nfp(this.alt)+' Balance\nIf Balance Maintained\nAll Cards Cost 0'; break
            case 90: this.desc+='If Unarmed\nPush Collision\nfor '+this.damage+' Damage'; break
            case 91: this.desc+='Deal '+this.damage+' Damage\nTo 3 Enemies\n'+nfp(this.alt)+' Balance'; break
            case 92: this.desc+='Convert '+this.damage+'x Combo\nto Block\nEnd Combo'; break
            case 93: if(this.damage==0){this.desc+='Push Collision\nfor '+this.alt+' Damage'}else{this.desc+='Deal '+this.damage+' Damage\nPush Collision\nfor '+this.alt+' Damage'}; break
            case 94: this.desc+='Add '+this.damage+' Block\nGain 1 Strength\nwhen Attacked'; break
            case 95: this.desc+='Deal '+this.damage+' Damage\nEnter Wrath'; break
            case 96: this.desc+='Gain '+this.damage+' Energy'; break
            case 97: this.desc+='Deal '+this.damage+' Damage\nfor Every Enemy'; break
            case 98: this.desc+='Add '+this.damage+' Block\nShuffle an Insight\ninto Draw Pile'; break
            case 99: this.desc+='Deal '+this.damage+' Damage\nReturn on\nStance Change'; break
            case 100: this.desc+='Enter Wrath'; break
            case 101: this.desc+='Add '+this.damage+' Block\nWrath: Gain '+this.alt+'\nAdditional Block'; break
            case 102: this.desc+='Gain '+this.damage+'\nFaith'; break
            case 103: this.desc+='Enter Calm'; break
            case 104: this.desc+='At the Start\nof Each Turn\nAdd a Smite\nto Your Hand'; break
            case 105: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\nEnd Turn'; break
            case 106: this.desc+='Add '+this.damage+' Block\nAdd a Safety\nto Your Hand'; break
            case 107: this.desc+='Wrath: Apply\n'+this.damage+' Vulnerable\nto All Enemies\nOtherwise,\nEnter Wrath'; break
            case 108: this.desc+='Calm: Draw\n'+this.damage+' Cards\nOtherwise,\nEnter Calm'; break
            case 109: this.desc+='Put a\nDiscarded Card\ninto Your Hand\nEnter Calm\nEnd Turn'; break
            case 110: this.desc+='When You\nChange Stance,\nGain '+this.damage+' Block'; break
            case 111: this.desc+='Gain '+this.damage+' Faith\nShuffle an Insight\ninto Draw Pile'; break
            case 112: this.desc+='When You\nEnter Wrath,\nDraw '+this.damage+' Cards'; break
            case 113: this.desc+='Add '+this.damage+' Block\nIf Last Card Played\nwas a Skill,\nDraw 2 Cards'; break
            case 114: this.desc+='Deal '+this.damage+' Damage\nReduce Cost by 1\nwhen Retained'; break
            case 115: this.desc+='Deal '+this.damage+' Damage\n'+this.alt+' Times\nEnter Wrath'; break
            case 116: this.desc+='Deal '+this.damage+' Damage\nGain Block Equal\nto Unblocked\nDamage Dealt'; break
            case 117: this.desc+='When You Gain\nBlock This Turn\nApply 1 Weak\nto All Enemies'; break
            case 118: this.desc+='Next Attack Deals\n'+this.damage+' More Damage'; break
            case 119: this.desc+='Gain '+this.damage+' Faith\nDie Next Turn'; break
            case 120: this.desc+='Deal '+this.damage+' Damage\nDeal Extra Damage\nEqual to '+this.alt+'\nTimes Faith'; break
            case 121: this.desc+='When Drawn,\nAdd 2 Miracles to\nHand and Exhaust'; break
            case 122: this.desc+='Gain '+this.damage+' Faith\nat the Start\nof Your Turn'; break
            case 123: this.desc+='Draw to '+this.damage+'\nCards'; break
            case 124: this.desc+='Gain Block\nEqual to Number of\nCards in Deck\n('+deckSize+')'; break
            case 125: this.desc+='Add '+this.damage+' Block\nAdd '+this.alt+' Shivs\nto Your Hand'; break
            case 126: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\n'+this.alt+' Times'; break
            case 127: this.desc+='Deal '+this.damage+' Damage\nDraw 1 Card\nDiscard 1\nRandom Card'; break
            case 128: this.desc+='Discard Your Hand,\nthen Draw that\nMany Cards'; break
            case 129: this.desc+='Add 1 Shiv\ninto Your Hand\nat the Start\nof Your Turn'; break
            case 130: this.desc+='Deal '+this.damage+' Damage\nX Times'; break
            case 131: this.desc+='When You\nPlay a Card,\nDeal '+this.damage+' Damage\nto All Enemies'; break
            case 132: if(this.damage==0){this.desc+='Discard Your Hand\nAdd that\nMany Shivs'}else{this.desc+='Discard Your Hand,\nthen Add that\nMany Shivs+'}; break
            case 133: this.desc+='Gain '+this.damage+' Energy\nDraw '+this.alt+' Cards'; break
            case 134: this.desc+='When You\nPlay a Card,\nGain '+this.damage+' Block'; break
            case 135: this.desc+='Deal '+this.damage+' Damage\n'+this.alt+' Times\nTemporarily Reduce\nDamage by '+this.alt; break
            case 136: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Bleed,\nIgnoring Block\n'+nfp(-5)+' Balance'; break
            case 137: this.desc+='Deal '+this.damage+' Damage\n2 Times\nSecond Hit\nPush Collision\nfor '+this.alt+' Damage'; break
            case 138: this.desc+='Deal '+this.damage+' Damage\nGain 2 Combo\nKnockdown'; break
            case 139: this.desc+='Deal '+this.damage+' Damage\nIf Not Played\nTake '+this.alt+' Damage'; break
            case 140: this.desc+='Apply '+this.damage+' Vulnerable\nand '+this.alt+' Strength'; break
            case 141: this.desc+='Deal '+this.damage+' Damage\nForce Target\nto Attack'; break
            case 142: this.desc+='Deal '+this.damage+' Damage\nUp to 2x\nPush Collision\nfor '+this.alt+' Damage'; break
            case 143: this.desc+='Deal Damage\nEqual to '+this.damage+' Times\nthe Number of\nCards in Discard\n('+discardSize+')'; break
            case 144: this.desc+='Add '+this.damage+'\nDodge'; break
            case 145: this.desc+='Add '+this.damage+' Dodge\nCounter '+this.alt+' Once'; break
            case 146: this.desc+='Add '+this.damage+' Block\nGain 2 Combo\nYou Must Attack\nor Take '+this.alt+' Damage'; break
            case 147: this.desc+='Attacks Apply '+this.damage+'\nBleed This Turn'; break
            case 148: this.desc+='Redraw your hand'; if(this.spec!=0){this.desc+='\nExhaust\nEthereal'} break
            case 149: this.desc+='Add '+this.damage+' Dodge\nExhausted when\nAnother Card Played\nDiscard Hand'; if(this.spec!=0){this.desc+='\nExhaust\nEthereal'}; break
            case 150: if(this.damage==0){this.desc+='Draw X Cards'}else{this.desc+='Draw X+'+this.damage+' Cards'}; break
            case 151: this.desc+='Increase Collision\nDamage by '+this.damage; break
            case 152: if(this.damage==0){this.desc+='Pull Collision\nfor '+this.alt+' Damage'}else{this.desc+='Deal '+this.damage+' Damage\nPull Collision\nfor '+this.alt+' Damage'}; break
            case 153: this.desc+='Add '+this.damage+' Block\nCounter 4 Once\nWith '+this.alt+' Bleed'; break
            case 154: this.desc+='Add '+this.damage+' Block\nCounter Once With\nPush Collision\nfor '+this.alt+' Damage'; break
            case 155: this.desc+='Deal '+this.damage+' Damage\nDraw 1 Card\nIt Costs 0\nThis Turn'; break
            case 156: this.desc+='Reduce Cost of\nHand by '+this.damage; break
            case 157: this.desc+='Deal '+this.damage+' Damage\nIf Last Card Played\nwas a Attack,\nGain 1 Energy'; break
            case 158: this.desc+='Gain '+this.damage+' Faith\nAdd '+this.alt+' Block'; break
            case 159: this.desc+='Deal '+this.damage+' Damage\nIf Last Card Played\nwas a Attack,\nApply '+this.alt+' Weak'; break
            case 160: this.desc+='Deal '+this.damage+' Damage\nIf Last Card Played\nwas a Skill,\nApply '+this.alt+' Vulnerable'; break
            case 161: this.desc+='Deal '+this.damage+' Damage\nAdd a Smite\nto Your Hand'; break
            case 162: this.desc+='Add '+this.damage+' Block\nScry '+this.alt; break
            case 163: this.desc+='Scry '+this.damage+'\nDraw '+this.alt+' Card'; break
            case 164: this.desc+='Deal '+this.damage+' Damage\nAdd '+this.alt+' Bleed\nto Downed'; break
            case 165: if(this.alt==0){this.desc+='Gain '+this.damage+' Energy\nfor Every\nHit Taken'}else{this.desc+='Add '+this.alt+' Block\nGain '+this.damage+' Energy\nfor Every\nHit Taken'}; break
            case 166: this.desc+='Add '+this.damage+' Block\nDiscard 1 Card'; break
            case 167: this.desc+='When Discarded,\nDraw '+this.damage+' Cards'; break
            case 168: this.desc+='When Discarded,\nGain '+this.damage+' Energy'; break
            case 169: this.desc+='Discard '+this.damage+' Cards\nGain '+this.alt+' Energy'; break
            case 170: this.desc+='Draw 1 Card\nDiscard 1 Card'; if(this.spec!=0){this.desc+='\nExhaust\nEthereal'}; break
            case 171: this.desc+='Gain '+this.damage+'\nControl'; break
            case 172: this.desc+='Apply '+this.damage+'\nVulnerable'; break
            case 173: this.desc+='Apply '+this.damage+'\nPoison'; break
            case 174: this.desc+='Hold '+this.damage+'\nDark Charge'; break
            case 175: this.desc+='Deal '+this.damage+' Damage\nfor Every Combo'; break
            case 176: this.desc+='Add '+this.damage+' Dodge\nGain '+this.alt+' Strength'; break
            case 177: this.desc+='Deal '+this.damage+' Damage\nDeal Double Damage\nto Heavy Enemies'; break
            case 178: this.desc+='Add '+this.damage+' Block\nTake '+this.alt+' Damage'; break
            case 179: this.desc+='Next Attack\nAdds '+this.damage+' Bleed'; break
            case 180: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Bleed\n'+nfp(-6)+' Balance'; break
            case 181: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Bleed\n'+nfp(-7)+' Balance'; break
            case 182: this.desc+='Deal '+this.damage+' Damage\nConvert Bleed of\nTarget to Health'; break
            case 183: this.desc+='Apply '+this.damage+' Bleed to Self\nGain '+this.alt+' Strength\n'+nfp(-3)+' Balance'; break
            case 184: this.desc+='Double all Bleed\n'+nfp(this.damage)+' Balance'; break
            case 185: this.desc+='Target Gains\n'+this.damage+' Weak\nPer Turn\n'+nfp(this.alt)+' Balance'; break
            case 186: this.desc+='Deal '+this.damage+' Damage\nGain '+this.alt+' Weak'; break
            case 187: this.desc+='Gain '+this.damage+' Block\nCounter With 1 Stun\n'+nfp(this.alt)+' Balance'; break
            case 188: this.desc+='Draw '+this.damage+' More\nCards Per Turn\n'+nfp(this.alt)+' Balance'; break
            case 189: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Bleed\nDisarm'; break
            case 190: this.desc+='Deal '+this.damage+' Damage\nDeal '+this.alt+' Bonus\nDamage to Stunned\n'+nfp(-2)+' Balance'; break
            case 191: this.desc+='Deal '+this.damage+' to Stunned\nEnd Stun\n'+nfp(this.alt)+' Balance'; break
            case 192: this.desc+='Apply '+this.damage+' Bleed,\nIgnoring Block\nDisarm'; break
            case 193: this.desc+='Costs 1 Less\nWhen Attack Played\nDeal '+this.damage+' Damage\n'+nfp(this.alt)+' Balance'; break
            case 194: this.desc+='Costs 1 Less\nWhen Skill Played\nDeal '+this.damage+' Damage\nApply 1 Stun\n'+nfp(this.alt)+' Balance'; break
            case 195: this.desc+='Costs 1 Less\nWhen Attack Played\nDeal '+this.damage+' Damage\n'+nfp(this.alt)+' Balance'; break
            case 196: this.desc+='Costs 1 Less\nWhen Attack Played\nAdd '+this.damage+' Block\n'+nfp(this.alt)+' Balance'; break
            case 197: this.desc+='Apply '+this.damage+' Stun\nto All Enemies'; break
            case 198: this.desc+='Deal '+this.damage+' Damage\nApply 1 Stun\nGain 2 Weak\n'+nfp(this.alt)+' Balance'; break
            case 199: this.desc+='If Unarmed\nDeal '+this.damage+' Damage\nApply 1 Stun\nApply 1 Vulnerable\n'+nfp(this.alt)+' Balance'; break
            case 200: this.desc+='Reflect Next\n'+this.damage+' Attacks\nCounter '+(8+this.level*7)+' Once\n'+nfp(this.alt)+' Balance'; break
            case 201: this.desc+='Add '+this.damage+' Dodge\n'+nfp(this.alt)+' Balance'; break
            case 202: this.desc+='Add '+this.damage+' Block\nCounter '+this.alt+'\nAll 3 Times\n'+nfp(6)+' Balance'; break
            case 203: this.desc+='Reflect Next\n'+this.damage+' Attacks\nDisarm'; break
            case 204: this.desc+='Deal '+this.damage+' Damage\nAdd a Winded\nto Draw Pile\n'+nfp(this.alt)+' Balance'; break
            case 205: this.desc+='When a Card\nis Exhausted,\nDraw '+this.damage+' Cards\n'+nfp(this.alt)+' Balance'; break
            case 206: this.desc+='Add '+this.damage+' Block\nRetain Block\nfor 1 Turn\n'+nfp(this.alt)+' Balance'; break
            case 207: this.desc+='When an\nEnemy Dies,\nHeal '+this.damage+' Health\n'+nfp(this.alt)+' Balance'; break
            case 208: this.desc+='Change Balance\nto Opposite'; break
            case 209: this.desc+='Deal '+this.damage+' Damage\nAdd a Dizzy\nto Draw Pile\n'+nfp(this.alt)+' Balance'; break
            case 210: this.desc+='Deal '+this.damage+'\nfor Each Card\nExhaust Your Hand\n'+nfp(this.alt)+' Balance'; break
            case 211: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\nAdd a Struggle\nto Draw Pile\n'+nfp(this.alt)+' Balance\nPer Enemy'; break
            case 212: this.desc+='Change Balance\nto Double'; break
            case 213: this.desc+='Increase Balance\nLimit by 5'; break
            case 214: this.desc+='Take 4 Damage\nAdd '+this.damage+' Block\nRetain Block\nfor 1 Turn\n'+nfp(this.alt)+' Balance'; break
            case 215: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\nHeal Equal to\nDamage Dealt\n'+nfp(this.alt)+' Balance Per Enemy'; break
            case 216: this.desc+='Draw '+this.damage+' Cards\nRearm'; break
            case 217: this.desc+='Deal '+this.damage+' Damage\nDisarm\nRearm Next Turn'; break
            case 218: this.desc+='Add '+this.damage+' Block\nPer Turn if Armed\n'+nfp(this.alt)+' Balance'; break
            case 219: this.desc+='When You Take\nUnblocked Damage,\nGain 1 Energy\nand 1 Strength'; break
            case 220: this.desc+='Hold '+this.damage+'\nLightning Charge'; break
            case 221: this.desc+='Deal '+this.damage+' Damage\nHold '+this.alt+'\nBasic Charge'; break
            case 222: this.desc+='Deal '+this.damage+' Damage\nPer Charge'; break
            case 223: this.desc+='Add '+this.damage+' Block\nGain 1 Energy\nNext Turn'; break
            case 224: this.desc+='Deal '+this.damage+' Damage\nHold '+this.alt+'\nShield Charges'; break
            case 225: this.desc+='Deal '+this.damage+' Damage\nDraw '+this.alt+' Cards\nPer Charge'; break
            case 226: this.desc+='Draw '+this.damage+' Cards\nHold '+this.alt+'\nShield Charge'; break
            case 227: this.desc+='Deal '+this.damage+' Damage\nIf the Enemy\nIntends to Attack,\nApply 1 Weak'; break
            case 228: this.desc+='Add '+this.damage+' Block\nPut a\nDiscarded Card\ninto Your Hand'; break
            case 229: this.desc+='Deal '+this.damage+' Damage\nNext Card\nPlayed Returns\nto Draw Pile'; break
            case 230: if(this.damage==0){this.desc+='Gain Block Equal\nto the Number of\nCards in Discard\n('+discardSize+')'}else{this.desc+='Gain Block Equal\nto the Number of\nCards in Discard+'+this.damage+'\n('+(discardSize+this.damage)+')'}; break
            case 231: this.desc+='Add '+this.damage+' Block\nTemporarily Reduce\nBlock by '+this.alt; break
            case 232: this.desc+='Deal '+this.damage+' Damage\nTemporarily Reduce\nCost by '+this.alt; break
            case 233: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\nDraw '+this.alt+' Cards'; break
            case 234: this.desc+='Gain '+this.damage+' Energy\nAdd a Void\nto Draw Pile'; break
            case 235: this.desc+='Gain Energy for\nEvery '+this.damage+' Cards\nin Draw Pile\n('+drawSize+')'; break
            case 236: this.desc+='Add '+this.damage+' Block\nIf You Have\nNo Block'; break
            case 237: this.desc+='Gain '+this.damage+'\nFocus'; break
            case 238: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\nHold '+this.alt+'\nDark Charge'; break
            case 239: this.desc+='Double\nYour Energy'; break
            case 240: this.desc+='Add '+this.damage+' Block\nRetain Your Hand'; break
            case 241: this.desc+='Add '+this.damage+' Block\nTemporarily Increase\nBlock by '+this.alt; break
            case 242: this.desc+='When You\nPlay a Power That\nCosts 1 or More,\nDraw '+this.damage+' Cards'; break
            case 243: this.desc+='At the Start of\nYour Turn, Add\na Random Common\nCard to Your Hand'; break
            case 244: this.desc+='At the Start of\nYour Turn, Trigger\na Weak Evoke on\nRightmost Charge'; break
            case 245: this.desc+='Draw '+this.damage+' Cards\nAdd a Burn\nto Draw Pile'; break
            case 246: this.desc+='Lose '+this.damage+' Focus\nGain '+this.damage+' Strength\nGain '+this.damage+' Dexterity'; break
            case 247: this.desc+='Deal '+this.damage+' Damage\nto a Random Enemy\n'+this.alt+' Times'; break
            case 248: this.desc+='When You\nTake Damage,\nHold '+this.damage+'\nLightning Charge'; break
            case 249: this.desc+='When You\nPlay a Power,\nHold '+this.damage+'\nBasic Charge'; break
            case 250: this.desc+='Hold X\nBasic Charges'; break
            case 251: this.desc+='Add a Random\nPower to\nYour Hand\nIt costs 0'; break
            case 252: this.desc+='Hold 1\nExplosive Charge\nPer Enemy'; break
            case 253: this.desc+='Deal '+this.damage+' Damage\nGain '+this.alt+' Control'; break
            case 254: this.desc+='At the Start of\nYour Turn, Add\na Power Card\nto Your Hand'; break
            case 255: if(this.alt==0){this.desc+='Remove All Charges,\nGain 1 Energy and\nDraw 1 Card\nPer Charge'}else{this.desc+='Evoke All Charges,\nGain 1 Energy and\nDraw 1 Card\nPer Charge'}; break
            case 256: this.desc+='Deal '+this.damage+' Damage\nLose '+this.alt+' Focus'; break
            case 257: this.desc+='Deal '+this.damage+' Damage\nHold '+this.alt+' Energy\nCharges'; break
            case 258: if(this.damage==0){this.desc+='Evoke 1st Charge\nX Times'}else{this.desc+='Evoke 1st Charge\nX+'+this.damage+' Times'}; break
            case 259: this.desc+='Hold '+this.damage+' Shield Charge\nHold '+this.damage+' Dark Charge\nHold '+this.damage+' Lightning\nCharge'; break
            case 260: this.desc+='Convert '+this.damage+'x Combo\nto Health\nEnd Combo'; break
            case 261: this.desc+='Deal '+this.damage+' Damage\nAdd '+this.alt+' Conditioning'; break
            case 262: this.desc+='Add '+this.damage+' Block\nAdd '+this.alt+' Conditioning'; break
            case 263: this.desc+='Add '+this.damage+' Conditioning\nTake '+this.alt+' Damage'; break
            case 264: this.desc+='Decrease Cost of\nAll Combo-Costing\nCards by '+this.damage; break
            case 265: if(this.damage==0){this.desc+='Add a Miracle+\nto Your Hand\nfor the Next\nX Turns'}else{this.desc+='Add a Miracle+\nto Your Hand\nfor the Next\nX+'+this.damage+' Turns'}; break
            case 266: this.desc+='Gain '+this.damage+' Strength\nGain '+this.damage+' Dexterity\nGain '+this.alt+' Less\nEnergy Per Turn'; break
            case 267: this.desc+='Gain '+this.damage+' Block\nPer Turn When\nin Calm'; break
            case 268: this.desc+='Add '+this.damage+' Block\nGain '+this.alt+' Block\nWhen Retained'; break
            case 269: this.desc+='Add '+this.damage+' Block\nDraw '+this.alt+' Card\nIt Costs 1 Less\nThis Turn'; break
            case 270: this.desc+='Add '+this.damage+' Block\nAdd '+this.alt+' Block\nNext Turn'; break
            case 271: this.desc+='Deal '+this.damage+' Damage\nIf a Card Has\nBeen Discarded\nThis Turn,\nGain '+this.alt+' Energy'; break
            case 272: this.desc+='Double Your\nCombo'; break
            case 273: this.desc+='Deal '+this.damage+' Damage\nto 2 Enemies\nPush Collision\nfor '+this.alt+' Damage\nin 2 Directions'; break
            case 274: this.desc+='Deal '+this.damage+' Damage\nNext Attack Deals\n'+this.alt+' More Damage'; break
            case 275: this.desc+='Gain '+this.damage+' Combo\nWhen Discarded,\nGain '+this.alt+' Combo'; break
            case 276: this.desc+='Apply -'+this.damage+' Damage\nto All Enemies'; break
            case 277: this.desc+='Gain '+this.damage+' Strength\nEvery Turn'; break
            case 278: this.desc+='Retain Unused\nBlock for the\nNext '+this.damage+' Turns'; break
            case 279: this.desc+='Add '+this.damage+' Dodge\nGain '+this.alt+'\nConditioning'; break
            case 280: this.desc+='Enter Wrath\nor\nEnter Calm'; break
            case 281: this.desc+='Shivs Deal '+this.damage+'\nMore Damage'; break
            case 282: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\nDiscard '+this.alt+'\nRandom Cards'; break
            case 283: this.desc+='Deal '+this.damage+' Damage Per\nAttack This Turn\n('+random.attacked+')'; break
            case 284: this.desc+='Deal '+this.damage+' Damage\nCosts 1 More\nPer Hit Taken'; break
            case 285: this.desc+='Obtain '+this.damage+'\nRandom Potion'; break
            case 286: this.desc+='Deal '+this.damage+' Damage\nPer Attack in\nYour Hand'; break
            case 287: this.desc+='Deal '+this.damage+' Damage\nIf Target\nHas Weak, Gain\n'+this.alt+' Energy and\nDraw '+this.alt+' Card'; break
            case 288: this.desc+='Deal '+this.damage+' Damage\nIf Target Has\nLess Than '+this.damage/2+'\nHealth, Set its\nHealth to 0\n'+nfp(this.alt)+' Balance'; break
            case 289: this.desc+='Deal '+this.damage+' Damage\nDeal '+this.alt+' Bonus\nDamage to Stunned'; break
            case 290: this.desc+='Convert Self\nBleed to Health'; break
            case 291: this.desc+='Add '+this.damage+' Block\nDecrease Balance\nLimit by 5'; break
            case 292: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Bleed\nApply 4 Bleed to Self\n'+nfp(-7)+' Balance'; break
            case 293: this.desc+='Multiply Bleed of\nTarget by '+this.damage+'\n'+nfp(this.alt)+' Balance'; break
            case 294: this.desc+='If Balance\nis Positive,\nGain Strength\nEqual to Balance/'+this.damage+'\nReset Balance'; break
            case 295: this.desc+='If Balance\nis Negative, Gain\nDexterity Equal to\nNegative Balance/'+this.damage+'\nReset Balance'; break
            case 296: this.desc+=nfp(this.damage)+' Balance\nor\n'+nfp(this.alt)+' Balance'; break
            case 297: this.desc+='Deal Damage Equal\nto '+this.damage+'x Absolute\nValue of Balance'; break
            case 298: this.desc+='Deal '+this.damage+' Damage\nIf Balance is\nNegative, Add a\nFury to Your Hand\n'+nfp(2)+' Balance'; break
            case 299: this.desc+='Add '+this.damage+' Block\nIf Balance is\nPositive, Add a\nQuiet to Your Hand\n'+nfp(-2)+' Balance'; break
            case 300: this.desc+='Convert Combo/'+this.damage+'\nto Strength\nEnd Combo'; break
            case 301: this.desc+='Add '+this.damage+' Block\nAdd '+this.alt+' Dodge\nCause an Enemy\nto Attack'; break
            case 302: this.desc+='Take '+this.damage+' Damage\nGain '+this.alt+' Strength'; break
            case 303: this.desc+='Discard 1 Card\nAdd '+this.damage+' Random\nCards'; break
            case 304: this.desc+='Gain '+this.damage+' Strength\nCannot Add Block\nfor '+this.alt+' Turns'; break
            case 305: this.desc+='Add '+this.damage+' Block\nCounter Once With\nPull Collision\nfor '+this.alt+' Damage'; break
            case 306: this.desc+='Counter '+this.damage+' All\nCounter Throw'; break
            case 307: if(this.alt>0){this.desc+='Add '+this.damage+' Random\nSkill to Your Hand\nIt Costs 0'}else{this.desc+='Add '+this.damage+' Random\nSkill to Your Hand\nIt Costs 0\nThis Turn'}; break
            case 308: this.desc+='Deal '+this.damage+' Damage\n'+this.alt+' Times\nAdd 1 Dodge'; break
            case 309: this.desc+='Add '+this.damage+' Block\nCannot Gain Block\nfor '+this.alt+' Turns'; break
            case 310: this.desc+='Increase Energy\nGain by '+this.damage; break
            case 311: this.desc+='Take '+this.damage+' Damage\nGain '+this.alt+' Conditioning'; break
            case 312: this.desc+='Upgrade '+this.damage+'\nRandom Cards\nin Your Hand'; break
            case 313: this.desc+='Take '+this.damage+' Damage\nGain '+this.alt+' Combo'; break
            case 314: this.desc+='Add '+this.damage+' Block Per\nCard in Your Hand\nDiscard Your Hand'; break
            case 315: this.desc+='Deal '+this.damage+' Damage\nMust be Only\nCard Played\nThis Turn'; break
            case 316: this.desc+='Add '+this.damage+' Block\nGain '+this.alt+' Combo'; break
            case 317: this.desc+='Remove "Exhaust"\nFrom All Shivs'; break
            case 318: this.desc+='Deal '+this.damage+' Damage\nScry '+this.alt+'\nDraw 1 Card'; break
            case 319: this.desc+='Deal '+(this.damage+1)+' Damage\nAdd '+this.damage+' Block\nScry '+this.alt; break
            case 320: this.desc+='Choose Between\n3 Attacks to Add\nto Your Hand'; if(this.damage>0){this.desc+='\nIt Costs 0\nThis Turn'} break
            case 321: this.desc+='At the Start\nof Your Turn,\nScry '+this.damage; break
            case 322: this.desc+='When You Scry,\nAdd '+this.damage+' Block'; break
            case 323: this.desc+='Deal '+this.damage+' Damage\nShuffle a Last Path\ninto Draw Pile'; break
            case 324: this.desc+='Deal '+this.damage+' Damage\nHas No Effect if\nOther Attacks Are\nin Your Hand'; break
            case 325: this.desc+='Next Turn,\nEnter Wrath and\nDraw '+this.damage+' Cards'; break
            case 326: this.desc+='At the Start\nof Each Turn\nAdd an Insight\nto Your Hand'; break
            case 327: this.desc+='Add '+this.damage+' Block\nNext Attack\nCosts 0'; break
            case 328: this.desc+='Deal '+this.damage+' Damage\nWhen You Attack\nThis Enemy,\nGain '+this.alt+' Block'; break
            case 329: this.desc+='Deal '+this.damage+' Damage\nReturn on Scry'; break
            case 330: this.desc+='Deal '+this.damage+' Damage\nIf Fatal, Upgrade\na Random Card'; break
            case 331: this.desc+='If Target Has\nLess Than '+this.damage+'\nHealth, Set its\nHealth to 0'; break
            case 332: if(this.spec==13){this.desc+='Gain '+this.damage+' Max Energy\nEvery Turn\nEthereal'}else{this.desc+='Gain '+this.damage+' Max Energy\nEvery Turn'}; break
            case 333: this.desc+='Retained Cards\nCost '+this.damage+' Less\nWhen Retained'; break
            case 334: this.desc+='Deal Damage Equal\nto '+this.damage+'x Number\nof Charges Held\nThis Combat\n('+random.orbs+')'; break
            case 335: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Lock-on'; break
            case 336: this.desc+='Apply '+this.damage+' Lock-on'; break
            case 337: this.desc+='Hold 1\nShield Charge\nPer Enemy'; break
            case 338: this.desc+='Deal '+this.damage+' Damage\nIf You Have\nPlayed Less\nThan '+this.alt+' Cards,\nDraw 1 Card'; break
            case 339: this.desc+='Deal '+this.damage+' Damage\nPut All Discarded\n0 Cost Cards\nin Your Hand'; break
            case 340: this.desc+='Gain '+this.damage+' Focus\nLose '+this.alt+' Focus\nEvery Turn'; break
            case 341: this.desc+='Return All Cards\nto Draw Pile\nDraw '+this.damage+' Cards'; break
            case 342: this.desc+='Evoke 1st Charge\n'+this.damage+' Times\nDraw '+this.alt+' Cards'; break
            case 343: this.desc+='Evoke 1st Charge\nfor Every Enemy'; break
            case 344: this.desc+='Evoke Last Charge\n'+this.damage+' Times'; break
            case 345: this.desc+='Add Block Equal\nto '+this.damage+'x Number of\nShield Charges Held\nThis Combat\n('+random.shields+')'; break
            case 346: this.desc+='Add '+this.damage+' Block\nHold '+this.alt+'\nShield Charges'; break
            case 347: this.desc+='Gain '+this.damage+' Strength\nPer Shield Charge'; break
            case 348: this.desc+='Evoke All\nExplosive Charges\nReplace Them\nWith Basic Charges'; break
            case 349: this.desc+='Deal '+this.damage+' Damage\nDouble Vulnerable\non Target'; break
            case 350: this.desc+='Apply '+this.damage+' Vulnerable\nApply '+this.alt+' Lock-On'; break
            case 351: this.desc+='Hold '+this.damage+'\nLight Charge'; break
            case 352: this.desc+='Deal '+this.damage+' Damage\nHold '+this.alt+'\nLight Charge'; break
            case 353: this.desc+='Hold '+this.damage+'\nLight Charges'; break
            case 354: this.desc+='Evoke All\nLight Charges\nReplace Them\nWith Explosive\nCharges'; break
            case 355: this.desc+='Deal '+this.damage+' Damage\nIf Fatal, Hold '+this.alt+'\nLight Charge'; break
            case 356: this.desc+='Hold '+this.damage+'\nFlame Charge'; break
            case 357: this.desc+='Hold '+this.damage+' Energy Charge\nHold '+this.damage+' Light Charge\nHold '+this.damage+' Flame Charge'; break
            case 358: this.desc+='Deal '+this.damage+' Damage\nHold '+this.alt+'\nFlame Charges'; break
            case 359: this.desc+='Hold '+this.damage+'\nFlame Charge\nPer Burn in\nYour Deck'; break
            case 360: this.desc+='Hold '+this.damage+'\nRandom Charges'; break
            case 361: if(this.damage>0){this.desc+='End Your Turn\nRetain Your Energy\nfor Next Turn\nGain '+this.damage+' Energy'}else{this.desc+='End Your Turn\nRetain Your Energy\nfor Next Turn'}; break
            case 362: this.desc+='Gain '+this.damage+' Energy\nCause an Enemy\nto Attack'; break
            case 363: this.desc+='Evoke 1st Charge\nHold that Charge\n'+this.damage+' Times'; break
            case 364: this.desc+='If 1st Charge\nis a Shield\nCharge, Evoke it,\nAdding '+this.damage+' Buffer'; break
            case 365: this.desc+='Deal '+this.damage+' Damage\n'+this.alt+' Times\nHold 1 Lightning\nCharge'; break
            case 366: this.desc+='If 1st Charge\nis an Explosive\nCharge, Evoke it,\nDealing All Damage\nto 1 Enemy'; break
            case 367: this.desc+='Hold '+this.damage+'\nDark Charge\nor\nHold '+this.damage+'\nLight Charge'; break
            case 368: this.desc+='Gain '+this.damage+' Energy\nPer Energy Charge'; break
            case 369: this.desc+='Replace All\nBasic Charges\nWith Explosive\nCharges'; break
            case 370: this.desc+='Evoke 1st Charge\nKeep that Charge'; break
            case 371: if(this.alt>0){this.desc+='Hold '+this.damage+'\nExplosive Charge\nEvoke It'}else{this.desc+='Hold '+this.damage+'\nBasic Charge\nEvoke It'}; break
            case 372: this.desc+='Hold '+this.damage+'\nBasic Charges\nEvoke 1st Charge'; break
            case 373: this.desc+='Deal '+this.damage+' Damage\nDraw '+this.alt+' Card\nDiscard if Cost\nis Not 0'; break
            case 374: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Frail'; break
            case 375: this.desc+='Add '+this.damage+' Block\nApply '+this.alt+' Lock-On'; break
            case 376: this.desc+='Add '+this.damage+' Block\nCounter '+this.alt+' All\nHold 1 Flame\nCharge'; break
            case 377: this.desc+='Apply '+this.damage+' Weak\nHold 1 Light\nCharge'; break
            case 378: this.desc+='Gain '+this.damage+' Control'; break
            case 379: this.desc+='Hold '+this.damage+' Dark\nCharge When You\nTake Damage'; break
            case 380: this.desc+='Draw '+this.damage+' Cards\nNext Turn'; break
            case 381: this.desc+='Negate the\nNext Time you\nBreak Balance'; break
            case 382: this.desc+='If Unarmed\nAdd '+this.damage+' Block\nCounter Once With\nPush Collision\nfor '+this.damage+' Damage'; break
            case 383: this.desc+='If Unarmed\nApply '+this.damage+' Bleed\nApply '+this.alt+' Vulnerable'; break
            case 384: this.desc+='Gain '+this.damage+' Block\nCounter Once With\n1 Stun\n'+nfp(this.alt)+' Balance'; break
            case 385: this.desc+='Gain '+this.damage+'\nResolve'; break
            case 386: this.desc+='Gain '+this.damage+' Resolve\nPer Turn'; break
            case 387: this.desc+='Add '+this.damage+' Block\nGain '+this.alt+'\nResolve'; break
            case 388: this.desc+='Gain '+this.damage+' Resolve\nWhen You\nBlock Damage'; break
            case 389: this.desc+='Add a Banked\nBalance With\nCurrent Balance\nto Your Hand\nReset Balance'; break
            case 390: this.desc+=nfp(this.damage)+' Balance'; break
            case 391: this.desc+='Gain '+this.damage+' Strength\nUnbalance by '+this.alt+'\nEvery Turn'; break
            case 392: this.desc+='Lose '+this.damage+' Health\nGain '+this.alt+' Strength'; break
            case 393: this.desc+='Lose '+this.damage+' Health\nGain '+this.alt+' Dexterity'; break
            case 394: this.desc+='Lose '+this.damage+' Health\nGain '+this.alt+' Energy'; break
            case 395: this.desc+='Gain '+this.damage+' Intangible'; if(this.spec!=0){this.desc+='\nExhaust\nEthereal'} break
            case 396: this.desc+='Deal '+this.damage+' Damage\nHeal '+this.alt+' Health'; break
            case 397: this.desc+='A Random Card\nin Your Hand\nCosts 0'; break
            case 398: this.desc+='Hold '+this.damage+' Light Charge\nGain '+this.alt+' Weak\nGain '+this.alt+' Frail'; break
            case 399: this.desc+='Gain '+this.damage+'\nArmor'; break
            case 400: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Frail\nNo Combo Gain'; break
            case 401: this.desc+='Set Construct to\nWall'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 402: this.desc+='Build '+this.damage+' of\nConstruct'; break
            case 403: this.desc+='Heal '+this.damage+' Health\nof Construct'; break
            case 404: this.desc+='Add '+this.damage+' Block\nto Construct'; break
            case 405: this.desc+='Set Construct to\nSpikes'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 406: this.desc+='Deal '+this.damage+' Damage\nCannot be\nCountered'; break
            case 407: this.desc+='Deal '+this.damage+' Damage\nto 3 Enemies\nCannot be\nCountered'; break
            case 408: this.desc+='Remove All\nStrength of Target'; break
            case 409: this.desc+='Deal '+this.damage+' Damage\nto 3 Enemies\nGain '+this.alt+' Energy\nPer Fatal\nCannot be\nCountered'; break
            case 410: this.desc+='Set Construct to\nProjector'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 411: this.desc+='Set Construct to\nTurret'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 412: this.desc+='Exhaust All\nBlueprints in\nYour Hand'; break
            case 413: this.desc+='Increase\nConstruct Max\nHealth by '+this.damage; break
            case 414: this.desc+='Deal '+this.damage+' Damage\nDiscard '+this.alt+' Cards'; break
            case 415: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Bleed,\nIgnoring Block'; break
            case 416: this.desc+='Apply '+this.damage+' Bleed,\nIgnoring Block'; break
            case 417: this.desc+='Deal '+this.damage+' Damage and\nApply 1 Bleed\n'+this.alt+' Times'; break
            case 418: this.desc+='If Construct is Built,\nDeal Damage\nEqual to Half\nof Construct Health\nto All Enemies\nDestroy Construct'; break
            case 419: this.desc+='Next Construct\nChange Maintains\nHealth/Progress'; break
            case 420: this.desc+='Set Construct to\nReadout'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 421: this.desc+='Set Construct to\nGenerator'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 422: this.desc+='Set Construct to\nStrengthener'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 423: this.desc+='Set Construct to\nExplosive Turret'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 424: this.desc+='Deal '+this.damage+' Damage\nto 2 Enemies'; break
            case 425: this.desc+='Attacks Deal\n'+this.damage+' More Damage\nThis Turn'; break
            case 426: this.desc+='Add '+this.damage+' Block\nNullify All Stat\nChanges This Turn'; break
            case 427: this.desc+='Add '+this.damage+'\nConditioning'; break
            case 428: this.desc+='Draw '+this.damage+' Cards\nDiscard '+this.alt+' Cards'; break
            case 429: this.desc+='Heal '+this.damage+'X Health'; break
            case 430: this.desc+='Gain '+this.damage+' Combo\nGain '+this.alt+' Energy\nNext Turn'; break
            case 431: this.desc+='Gain '+this.damage+' Combo\nLose Combo at\nEnd of Turn'; break
            case 432: if(this.damage>1){this.desc+='Next '+this.damage+' Cards Played\nis Duplicated'}else{this.desc+='Next '+this.damage+' Card Played\nis Duplicated'} break
            case 433: this.desc+='Deal '+this.damage+' Damage\n+'+this.alt+' Per Combo\nDraw 1 Card'; break
            case 434: this.desc+='Add '+this.damage+' Block\nCounter '+this.alt+' Twice'; break
            case 435: if(this.alt>0){this.desc+='Add '+this.damage+' Random\nAttack to Your Hand\nIt Costs 0'}else{this.desc+='Add '+this.damage+' Random\nAttack to Your Hand\nIt Costs 0\nThis Turn'}; break
            case 436: this.desc+='Gain '+this.damage+' Energy\nNext Turn'; break
            case 437: this.desc+='Gain '+this.damage+' More\nCombo Per Hit'; break
            case 438: this.desc+='When You\nPlay an Attack,\nDraw '+this.damage+' Cards'; break
            case 439: this.desc+='When You Add\nBlock, Gain\n'+this.damage+' Combo'; break
            case 440: this.desc+='Deal '+this.damage+' Damage\nIf Fatal, gain\n'+this.alt+' Combo'; break
            case 441: this.desc+='Add '+this.damage+'X Block\nCounter '+this.alt+'X Once'; break
            case 442: this.desc+='Set Construct to\nDexterizer'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 443: this.desc+='Set Construct to\nThorns'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 444: this.desc+='Set Construct to\nBufferer'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 445: this.desc+='Set Construct to\nGun Rack'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'}; break
            case 446: this.desc+='If Construct\nis Unbuilt,\nBuild '+this.damage+' of\nConstruct'; break
            case 447: this.desc+='Add '+this.damage+' Block\nGain '+this.alt+' Dexterity\nNext Turn'; break
            case 448: this.desc+='Add '+this.damage+' Block\nUpgrade '+this.alt+' Cards\nTemporariliy'; break
            case 449: this.desc+='Upgrade '+this.damage+' Cards'; break
            case 450: this.desc+='Deal '+this.damage+' Damage\nUpgrade '+this.alt+' Cards\nTemporariliy'; break
            case 451: this.desc+='Build '+this.damage+'\nof Construct\nEvery Turn'; break
            case 452: this.desc+='If Construct is Built,\nConstruct Gains\n'+this.damage+' Regeneration'; break
            case 453: this.desc+='Add '+this.damage+' Random\nBlueprints to\nYour Hand'; break
            case 454: this.desc+='Deal '+this.damage+' Damage\nIf Blocked, Apply\n'+this.alt+' Vulnerable'; break
            case 455: this.desc+='Deal '+this.damage+' Damage\nto a Random Enemy\n'+this.alt+' Times\nCannot be\nCountered'; break
            case 456: this.desc+='Draw and\nTemporarily\nUpgrade\n'+this.damage+' Cards'; break
            case 457: this.desc+='Deal '+this.damage+' Damage\nIf Enemy is\nUndamaged, Gain\n'+this.alt+' Energy'; break
            case 458: this.desc+='Deal '+this.damage+' Damage\nIf Fatal, Lose\n'+this.alt+' Energy'; break
            case 459: this.desc+='Heal '+this.damage+' Health\nCards in Hand Cost\n1 More or 1 Less'; break
            case 460: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+'\nTemporary Weak\nCannot be\nCountered'; break
            case 461: this.desc+='If Construct is Built,\nConstruct Gains\n'+this.damage+' Metallicize'; break
            case 462: this.desc+='Add '+this.damage+' Random\nCards to\nYour Hand'; break
            case 463: this.desc+='Deal '+this.damage+' Damage\n'+this.alt+' Times\nDraw 1 Card'; break
            case 464: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\nDraw '+this.alt+' Cards'; break
            case 465: this.desc+='Deal '+this.damage+' Damage\n'+this.alt+' Times\nDraw 1 Card\nIf Unblocked,\nApply 4 Frail'; break
            case 466: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\nCannot be\nCountered'; break
            case 467: this.desc+='Add '+this.damage+' Dodge\nAdd '+this.alt+' Block\nNext Turn'; break
            case 468: this.desc+='Add '+this.damage+' Block\nAdd '+this.alt+' Dodge\nNext Turn'; break
            case 469: this.desc+='Discard\nand Upgrade\nYour Hand'; break
            case 470: this.desc+='Whenever You\nDamage an Enemy,\nBuild '+this.damage+'\nof Construct'; break
            case 471: this.desc+='Gain '+this.damage+' Currency'; break
            case 472: this.desc+='Deal '+this.damage+' Damage\nLose '+this.alt+' Currency'; break
            case 473: this.desc+='Deal '+this.damage+' Damage\nDeal '+this.alt+'x More\nDamage if Target\nHas Block'; break
            case 474: this.desc+='Deal '+this.damage+' Damage\nExhaust '+this.alt+' Card'; break
            case 475: this.desc+='Deal '+this.damage+' Damage\nTransform '+this.alt+' Card'; break
            case 476: this.desc+='Set Construct to\nTrap'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 477: this.desc+='Set Construct to\nMultiturret'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 478: this.desc+='Set Construct to\nMetallicizer'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 479: this.desc+='Set Construct to\nMirror Shield'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 480: this.desc+='Set Construct to\nLimiter'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 481: this.desc+='Set Construct to\nRepulsor'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 482: this.desc+='Set Construct to\nMachine Gun'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 483: this.desc+='Set Construct to\nMaintainer'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 484: this.desc+='Set Construct to\nUpgrader'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 485: this.desc+='Set Construct to\nTransformer'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 486: this.desc+='Set Construct to\nDoubler'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 487: this.desc+='Set Construct to\nExhauster'; if(this.damage>0){this.desc+='\nBuild '+this.damage+' of Construct'} break
            case 488: this.desc+='All Cards in\nHand Cost '+this.damage; break
            case 489: this.desc+='Draw Cards\nEqual to the\nNumber of Cards\nin Your Hand'; if(this.damage>0){this.desc+='\n+'+this.damage} break
            case 490: this.desc+='Build All\nof Construct'; break
            case 491: this.desc+='Heal All Health\nof Construct'; break
            case 492: this.desc+='If Construct\nis Built,\nConstruct Gains\n'+this.damage+' Metallicize'; break
            case 493: this.desc+='Construct Takes\nExtra Turn'; break
            case 494: this.desc+='Finish Construct\nRegardless of\nBuild Progress'; break
            case 495: this.desc+='If Construct\nis Built,\nConstruct Gains\n'+this.damage+' Intangible'; break
            case 496: this.desc+='Add '+this.damage+' Block\nExhaust '+this.alt+' Card'; break
            case 497: this.desc+='Draw '+this.damage+' Cards\nExhaust '+this.alt+' Card'; break
            case 498: this.desc+='Transform\n'+this.damage+' Cards'; break
            case 499: this.desc+='Add '+this.damage+' Block\nTransform '+this.alt+' Card'; break
            case 500: this.desc+='Deal '+this.damage+' Damage\nNext Card Played\nis Duplicated'; break
            case 501: this.desc+='Upgrade X Cards\nDraw X Cards\nNext Turn'; break
            case 502: this.desc+='Deal '+this.damage+' Damage\n'+this.alt+' Times\nGain Block Equal\nto Unblocked\nDamage Dealt'; break
            case 503: this.desc+='Build '+this.damage+' of\nConstruct\nor\nHeal '+this.alt+' Health\nof Construct'; break
            case 504: this.desc+='Apply '+this.damage+' Weak\nNext Turn'; break
            case 505: this.desc+='Deal '+this.damage+'X Damage\nApply X Weak\nApply X Vulnerable'; break
            case 506: this.desc+='Gain '+this.damage+'\nRegeneration'; break
            case 507: this.desc+='Build '+this.damage+'\nof Construct\nBuild Increases\nby '+this.alt; break
            case 508: this.desc+='If Construct\nis Built,\nAdd '+this.damage+' Dodge'; break
            case 509: this.desc+='Deal '+this.damage+' Damage\nReset Attacking\nIntents'; break
            case 510: this.desc+='Add '+this.damage+' Block\nReset Non-Attacking\nIntents'; break
            case 511: this.desc+='If Construct\nis Built,\nConstruct Reflects\nNext Attack'; break
            case 512: this.desc+='If Construct\nis Built,\nConstruct Counters\n'+this.damage+' Once'; break
            case 513: this.desc+='If Construct\nis Built,\nConstruct Counters\n'+this.damage+' All'; break
            case 514: this.desc+='Apply '+this.damage+'\nBurn'; break
            case 515: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+'\nBurn'; break
            case 516: this.desc+='Apply '+this.damage+' Burn\nto All Enemies'; break
            case 517: this.desc+='Multiply Target'+"'"+'s\nBurn by '+this.damage; break
            case 518: this.desc+='Add '+this.damage+' Block\nCounter '+this.alt+' Burn'; break
            case 519: this.desc+='Increase\nConstruct Max\nHealth by '+this.damage+'\nDraw '+this.alt+' Cards'; break
            case 520: this.desc+='Add '+this.damage+' Block\nto Construct\nMaintain Block\nfor '+this.alt+' Turns'; break
            case 521: this.desc+='Add '+this.damage+' Block\nto Construct\nIncrease\nConstruct Max\nHealth by '+this.alt; break
            case 522: this.desc+='Construct Takes\nX Extra Turns'; break
            case 523: this.desc+='Transform\nYour Hand'; break
            case 524: this.desc+='If Construct\nis Built,\nConstruct Gains\n'+this.damage+' Buffer'; break
            case 525: this.desc+='Deal '+this.damage+' Damage\nIf Fatal,\nApply '+this.alt+' Burn\nto All Enemies'; break
            case 526: this.desc+='Add '+this.damage+' Scrap Metals\nto Your Hand'; break
            case 527: this.desc+='Build '+this.damage+' of\nConstruct\nGain '+this.alt+' Block'; break
            case 528: this.desc+='Apply '+this.damage+' Sleep'; break
            case 529: this.desc+='Upgrade '+this.damage+' Cards\nGain '+this.alt+' Buffer'; break
            case 530: this.desc+='Add '+this.damage+'\nRandom Powers\nto Your Hand'; break
            case 531: this.desc+='Next Hit\nTaken Heals\nYou Instead'; break
            case 532: this.desc+='Gain '+this.damage+' Energy'; if(this.alt>0){this.desc+='\nDraw '+this.alt+' Card'} break
            case 533: this.desc+='Gain '+this.damage+' Strength\nRedraw Your Hand'; break
            case 534: this.desc+='Deal '+this.damage+' Damage\nIf Fatal,\nDraw '+this.alt+' Cards\nCannot be\nCountered'; break
            case 535: this.desc+='Apply '+this.damage+'\nWeak'; break
            case 536: this.desc+='Apply '+this.damage+'\nVulnerable'; break
            case 537: this.desc+='Choose Between\n3 Cards to Add\nto Your Hand\nIt Costs 0\nThis Turn'; break
            case 538: this.desc+='Put a Card\non the Bottom of\nYour Draw Pile\nIt Costs 0'; break
            case 539: this.desc+='Add '+this.damage+' Random\nColorless Cards\nto Your Hand'; break
            case 540: this.desc+='When You Play 5\nCards in a Turn,\nDeal '+this.damage+' Damage\nto All Enemies'; break
            case 541: this.desc+='Do '+this.damage+' Damage\nto All Enemies\nin 3 Turns'; break
            case 542: this.desc+='Apply '+this.damage+' Mark\nAll Enemies Take\nUncounterable\nDamage Equal\nto their Mark'; break
            case 543: this.desc+='Target Takes\nUncounterable\nDamage Equal '+this.damage+'x\n to their Mark'; break
            case 544: this.desc+='Shuffle a Beta\ninto Your\nDraw Pile'; break
            case 545: this.desc+='Shuffle a Omega\ninto Your\nDraw Pile'; break
            case 546: this.desc+='At the End\nof Your Turn,\nDeal '+this.damage+' Damage\nto All Enemies'; break
            case 547: if(this.damage<=0){this.desc+='Shuffle an\nExpunger with\nX into Your\nDraw Pile'}else{this.desc+='Shuffle an\nExpunger with\nX+'+this.damage+' into Your\nDraw Pile'}; break
            case 548: this.desc+='Upgrade All\nCards Added\nThis Combat'; break
            case 549: this.desc+='Take an Extra Turn'; break
            case 550: this.desc+='Wrath: Deal\n'+this.damage+' Damage'; break
            case 551: this.desc+='Calm: Add\n'+this.damage+' Block'; break
            case 552: this.desc+='Next '+this.damage+'\nAttacks Deal\n Double Damage\nEnter Wrath'; break
            case 553: this.desc+='Gain '+this.damage+' Intangible\nEnter Calm'; break
            case 554: this.desc+='Wrath: Gain\n'+this.damage+' Energy'; break
            case 555: this.desc+='Calm: Gain\n'+this.damage+' Energy'; break
            case 556: this.desc+='Duplicate Next\n'+this.damage+' Cards Played\nDiscard '+this.alt+' Random\nCard'; break
            case 557: this.desc+='Deal '+this.damage+' Damage\nCounter '+this.alt+' All'; break
            case 558: this.desc+='Deal '+this.damage+' Damage\nHave 1 Energy'; break
            case 559: this.desc+='Apply '+this.damage+'\nRandom Status'; break
            case 560: this.desc+='Deal '+this.damage+' Damage\nAlways Returns'; break
            case 561: this.desc+='Deal '+this.damage+'(X*X)\nDamage'; break
            case 562: this.desc+='Deal '+this.damage+' Damage\nShuffle a Chip\ninto Your\nDraw Pile'; break
            case 563: this.desc+='Deal '+this.damage+' Damage\nAdd '+this.alt+' Block'; break
            case 564: this.desc+='If X is Even,\nDeal '+this.damage+'X Damage\nIf X is Odd,\nAdd '+this.alt+'X Block'; break
            case 565: this.desc+='Deal '+this.damage+' Damage\nAdd a Copy of\nThis Card to Your\nDiscard Pile'; break
            case 566: this.desc+='Deal '+this.damage+' Damage\nHas No Effect if\nNon-Attacks Are\nin Your Hand'; break
            case 567: this.desc+='Gain '+this.damage+'\nTemporary Strength'; break
            case 568: this.desc+='Draw '+this.damage+' Cards\nThey Cost 0\nTemporarily'; break
            case 569: this.desc+='Deal '+this.damage+' Damage\nPut a\nDiscarded Card\ninto Your Hand'; break
            case 570: this.desc+='Deal '+this.damage+' Damage\nDeals '+this.alt+' Extra\nDamage for Every\nAttack in\nYour Hand'; break
            case 571: this.desc+='Deal '+this.damage+' Damage and\nApply '+this.alt+' Vulnerable\nto All Enemies'; break
            case 572: this.desc+='Add '+this.damage+' Block\nExhaust a\nRandom Card'; break
            case 573: this.desc+='Deal '+this.damage+' Damage\nCosts 1 Less For\nEach Time You Take\nUnblocked Damage'; break
            case 574: this.desc+='Gain '+this.damage+' Energy\nLose '+this.alt+' Health'; break
            case 575: this.desc+='Every Turn,\nDeal '+this.damage+' Damage\nto All Enemies\nand Take '+this.alt+' Damage'; break
            case 576: this.desc+='All Enemies Gain\n'+this.damage+' Temporary Weak'; break
            case 577: this.desc+='Counter '+this.damage+' All\nThis Combat'; break
            case 578: this.desc+='Deal '+this.damage+' Damage\nTarget Takes '+this.alt+'\nDamage Per\nCard Played'; break
            case 579: this.desc+='Is Copied '+this.alt+'\nTimes When Drawn\nDeal '+this.damage+' Damage'; break
            case 580: this.desc+='Draw '+this.damage+' Card\nIf it is a Skill,\nGain '+this.alt+' Block'; break
            case 581: this.desc+='Next Card\nPlayed is Free'; break
            case 582: this.desc+='Deal '+this.damage+' Damage\n'+this.alt+' Times\nCosts 1 Less\nFor Each Discard\nThis Turn'; break
            case 583: this.desc+='Deal '+this.damage+' Damage\nIf Target Has\nVulnerable, Gain\n'+this.alt+' Energy and\nDraw '+this.alt+' Card'; break
            case 584: this.desc+='Apply '+this.damage+' Weak\nGain '+this.alt+' Block'; break
            case 585: this.desc+='Deal '+this.damage+' Damage\nDraw '+this.alt+' Cards\nNext Turn'; break
            case 586: this.desc+='Put a Card\non Top of\nYour Draw Pile\nIt Costs 0'; break
            case 587: this.desc+='All Cards in\nHand Cost 0\nCannot Draw Cards\nThis Turn'; break
            case 588: this.desc+='When Target Dies,\nDeal Damage to\nAll Enemies Equal\nto its Max HP'; break
            case 589: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\nHas No Effect if\nThere Are Cards\nin Your Draw Pile'; break
            case 590: this.desc+='Apply '+this.damage+'X\nWeak'; break
            case 591: this.desc+='Put '+this.damage+' Copies\nof a Card\non Top of\nYour Draw Pile\nIt Costs 0'; break
            case 592: this.desc+='Next Turn,\nYour Attacks Deal\nDouble Damage'; break
            case 593: this.desc+='Draw '+this.damage+' More\nCard Every Turn\nDiscard '+this.alt+' Card\nEvery Turn'; break
            case 594: this.desc+='Deal '+this.damage+' Damage\nDiscard All\nNon-Attacks'; break
            case 595: this.desc+='Gain '+this.damage+' Intangible\nLose '+this.alt+' Dexterity\nPer Turn'; break
            case 596: this.desc+='When You Draw a\nStatus or Curse,\nDeal '+this.damage+' Damage\nto All Enemies'; break
            case 597: this.desc+='Deal '+this.damage+' Damage'; if(this.spec!=0){this.desc+='\nEthereal'} break
            case 598: this.desc+='Add '+this.damage+' Block'; if(this.spec!=0){this.desc+='\nEthereal'} break
            case 599: this.desc+='Deal '+this.damage+' Damage\nTemporarily Increase\nDamage by '+this.alt; break
            case 600: this.desc+='Add '+this.damage+' Block\nGain '+this.alt+' Energy\nWhen Exhausted'; break
            case 601: this.desc+='Deal '+this.damage+' Damage\nExhaust Non-Attacks\nin Your Hand'; break
            case 602: this.desc+='If the Enemy\nIntends to Attack,\nGain '+this.damage+' Strength'; break
            case 603: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\nX Times'; break
            case 604: this.desc+='Block is\nNot Removed\nat the End\nof Your Turn'; break
            case 605: this.desc+='Gain '+this.damage+' Vulnerable\nIncrease Energy\nGain by '+this.alt; break
            case 606: this.desc+='Draw '+this.damage+' More\nCards Per Turn\nLose '+this.alt+' Health\nPer Turn'; break
            case 607: this.desc+='All Skills\nin Hand Cost 0\nand Exhaust'; break
            case 608: this.desc+='Deal '+this.damage+' Damage\nIf Fatal, Gain\n'+this.alt+' Max Health'; break
            case 609: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\nWhen You Gain\nBlock'; break
            case 610: this.desc+='Double All\nYour Stat Buffs'; break
            case 611: this.desc+='When You\nTake Damage,\nAdd '+this.damage+' Shivs\nto Your Hand'; break
            case 612: this.desc+='Play All Shivs,\nDealing 8\nUnblockable Damage\nfor Each Shiv'; break
            case 613: this.desc+='Draw '+this.damage+' Card\nIf it is an Attack,\nAdd '+this.alt+' Shivs\nto Your Hand'; break
            case 614: this.desc+='When You\nPlay a Shiv,\nDraw '+this.damage+' Cards'; break
            case 615: this.desc+='Deal '+this.damage+' Damage\nIf Fatal, Deal '+this.alt+'\nDamage to\nAll Enemies'; break
            case 616: this.desc+='Deal '+this.damage+' Damage\nIf You Have Weak,\nDeal '+this.alt+'\nExtra Damage'; break
            case 617: this.desc+='Put a Card\nFrom Your Draw\nPile into\nYour Hand'; break
            case 618: this.desc+='Return Discard\nPile to Hand'; break
            case 619: this.desc+='Put First Memory\nin Discard Pile\ninto Your Hand'; break
            case 620: this.desc+='Draw '+this.damage+' Cards\nPut a\nDiscarded Card\ninto Your Hand'; break
            case 621: this.desc+='Put All Memories\nin Discard Pile\ninto Your Hand'; break
            case 622: this.desc+='Apply '+this.damage+' Weak\nApply '+this.damage+' Vulnerable'; break
            case 623: this.desc+='Draw '+this.damage+' Cards\nDoes Not Discard\nMemories'; break
            case 624: this.desc+='Add a Random\nMemory to\nYour Hand'; break
            case 625: this.desc+='Memories in Hand\nLose Memory'; break
            case 626: this.desc+='Cards in Hand\nCost 0 and\nBecome Memories'; break
            case 627: this.desc+='Draw '+this.damage+' Cards'; if(this.spec!=0){this.desc+='\nEthereal'} break
            case 628: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+'\nRandom Status'; break
            case 629: this.desc+='Gain '+this.damage+' Intangible\nand '+this.alt+' Energy\nNext Turn'; break
            case 630: this.desc+='Tick Statuses'; break
            case 631: this.desc+='Deal '+this.damage+' For\nEach Card Played\nThis Turn'; break
            case 632: this.desc+='Deal '+this.damage+' For\nEach Card Played\nThis Combat'; break
            case 633: this.desc+='Deal '+this.damage+' Damage\nCosts 1 Less\nWhen You Play\na Card'; break
            case 634: this.desc+='Every 13\nCards Played\nDeal '+this.damage+' Damage\nto All Enemies\nand Add '+this.damage+' Block'; break
            case 635: this.desc+='Send Hand\nto Draw Pile\nSwap Draw and\nDiscard Piles'; break
            case 636: this.desc+='Deal '+this.damage+' Damage\nHas No Effect if\nOther Cards Are\nin Your Hand'; break
            case 637: this.desc+='Deal '+this.damage+' Damage\nHas No Effect if\nYou Have More\nThan 0 Energy'; break
            case 638: if(this.damage>0){this.desc+='Shuffle a Peak+\nand a Trough into\nYour Draw Pile'}else{this.desc+='Shuffle a Peak\nand a Trough into\nYour Draw Pile'}; break
            case 639: this.desc+='Add '+this.damage+' Shivs\nto Your Hand\nor\nAdd '+this.damage+' Screens\nto Your Hand'; break
            case 640: this.desc+='After Turn 5\n('+turn+')\nGain '+this.damage+' Energy\nDraw '+this.alt+' Cards'; break
            case 641: this.desc+='Draw '+this.damage+' Cards\nDraw '+this.alt+' More\nWhen Retained'; break
            case 642: this.desc+='Deal '+this.damage+' Damage'; break
            case 643: this.desc+='Deal '+this.damage+' Damage\nShuffle a Dazed\ninto Draw Pile'; break
            case 644: this.desc+='Deal '+this.damage+' Damage\nIf First Card\nPlayed This Turn,\nApply '+this.alt+' Vulnerable'; break
            case 645: this.desc+='Draw '+this.damage+' Card\nIt Costs 0 This Turn\nIf First Card\nPlayed This Turn,\nGain '+this.alt+' Energy'; break
            case 646: this.desc+='Deal '+this.damage+' Damage\nHas No Effect if\nThere Are No\nCurses or Statuses\nin Your Hand'; break
            case 647: this.desc+='Deal '+this.damage+' Damage\nHas No Effect if\nThere Are\nCurses or Statuses\nin Your Hand'; break
            case 648: this.desc+='Deal '+this.damage+' Damage\nIf First Card\nPlayed This Turn,\nDeals Double\nDamage'; break
            case 649: this.desc+='Add '+this.damage+' Block\nAdd '+this.alt+' Spins to\nYour Draw Pile'; break
            case 650: this.desc+='Add '+this.damage+' Dodge\nDiscard '+this.alt+'\nRandom Card'; break
            case 651: this.desc+='Add '+this.damage+' Block\nCalm: Gain '+this.alt+'\nAdditional Block'; break
            case 652: this.desc+='Add '+this.damage+' Block\nNext Block Gain\nis Tripled'; break
            case 653: this.desc+='Add '+this.damage+' Block\nNext Block Gain\nDeals Damage to\nFirst Enemy Equal\nto Block Gained'; break
            case 654: this.desc+='Apply '+this.damage+'\nAnti-Control'; break
            case 655: this.desc+='Deal Unblockable\nDamage Equal to\nYour Missing Health'; break
            case 656: this.desc+='Add '+this.damage+' Block\nYou Cannot Die\nThis Turn'; break
            case 657: this.desc+='Add '+this.damage+' Block\nCosts 1 Less For\nEach Time You Take\nUnblocked Damage'; break
            case 658: this.desc+='The First Time You\nPlay an Attack Each\nTurn that Costs\n2 or More,\nGain '+this.damage+' Energy'; break
            case 659: this.desc+='Exhaust '+this.damage+' Card\nAdd Block Equal to\n'+this.alt+'x its Cost'; break
            case 660: this.desc+='Exhaust '+this.damage+' Card\nDeal Damage Equal\nto '+this.alt+'x its Cost\nto First Enemy'; break
            case 661: this.desc+='Add '+this.damage+' Block\nRetain Unused\nBlock for the\nNext 2 Turns'; break
            case 662: this.desc+='Deal '+this.damage+' Damage to\nAll Enemies and\n'+this.damage*2+' Damage to Target'; break
            case 663: this.desc+='Draw '+this.damage+' Cards\nAll Cards Cost\n0 This Turn'; break
            case 664: this.desc+='Gain '+this.damage+' Energy\nNext Turn\nTake an Extra Turn'; break
            case 665: this.desc+='Gain '+this.damage+' Energy\nfor Every Enemy\nThat Intends\nto Attack'; break
            case 666: this.desc+='Draw '+this.damage+' Cards\nNext Card\nPlayed is Free'; break
            case 667: this.desc+='Exhaust Your Hand\nGain '+this.damage+' Strength\nfor Each Card\nin Your Hand'; break
            case 668: this.desc+='Add '+this.damage+' Block\nEnter Wrath'; break
            case 669: this.desc+='Deal '+this.damage+' Damage\nEnter Calm'; break
            case 670: this.desc+='When You\nChange Stance,\nDeal '+this.damage+' Damage\nto All Enemies'; break
            case 671: this.desc+='When You\nChange Stance,\nDraw '+this.damage+' Cards'; break
            case 672: this.desc+='When You\nChange Stance,\na Random Card\nCosts '+this.damage+' Less'; break
            case 673: this.desc+='Calm:\nDeal '+this.damage+' Damage\nExit Stance'; break
            case 674: this.desc+='Wrath:\nAdd '+this.damage+' Block\nExit Stance'; break
            case 675: this.desc+='All Enemies Take\nUncounterable\nDamage Equal\nto '+this.damage+'x their Mark'; break
            case 676: this.desc+='Apply '+this.damage+' Mark'; break
            case 677: this.desc+='Add '+this.damage+' Block\nAt End of Turn,\nDeal Damage to\nFirst Enemy Equal\nto Unused Block'; break
            case 678: this.desc+='Deal '+this.damage+' Damage\nFor Each Debuff\nof Target'; break
            case 679: this.desc+='If Target Has\nLess Than '+(this.damage*10)+'%\nHealth, Kill it'; break
            case 680: this.desc+='Hold '+this.damage+' Lightning\nCharges\nAdd '+this.alt+' Block\nFor Every Lightning\nCharge'; break
            case 681: this.desc+='Deal '+this.damage+' Damage\nIf the Enemy\nIntends to Attack,\nHold '+this.alt+' Shield\nCharge'; break
            case 682: this.desc+='Hold '+this.damage+' Lightning\nCharges\nTrigger Weak Evokes\non All Orbs'; break
            case 683: this.desc+='Deal '+this.damage+' Damage\nAll Claws Gain\n+5 Damage'; break
            case 684: this.desc+='Hold '+this.damage+'\nBasic Charges\nAll Claws Gain\n+2 Damage'; break
            case 685: this.desc+='Draw '+this.damage+' Cards\nAdd '+this.alt+' Block\nPer Charge'; break
            case 686: this.desc+='Deal '+this.damage+' Damage\nAdd '+this.alt+' Block\nNext Turn'; break
            case 687: this.desc+='Dark Charge Gain\nPower '+this.damage+' Faster\nPer Turn'; break
            case 688: this.desc+='Deal '+this.damage+' Damage\nHold '+this.alt+' Dark\nCharge'; break
            case 689: this.desc+='All Held Dark\nCharges Have '+this.damage+'x\nMore Power'; break
            case 690: this.desc+='Fill All Empty\nCharge Slots With\nShield Charges'; break
            case 691: this.desc+='Hold '+this.damage+'\nBasic Charge\nEvery Turn'; break
            case 692: this.desc+='Basic Charges\nAct as Explosive\nCharges'; break
            case 693: this.desc+='Draw '+this.damage+' Cards\nLose '+this.alt+' Focus'; break
            case 694: this.desc+='Draw '+this.damage+' Cards\nDiscard Them if\nThey Do Not Cost 0'; break
            case 695: this.desc+='Gain '+this.damage+' Orb\nSlots'; break
            case 696: this.desc+='Trigger a Weak\nEvoke on All Orbs'; break
            case 697: this.desc+='Lightning Charges\nDeal '+this.damage+' More\nPassive Damage'; break
            case 698: this.desc+='Add '+this.damage+' Dodge\nDiscard '+this.alt+' Card'; break
            case 699: this.desc+='Increase Energy\nGain by '+this.damage+'\nDraw 1 Less\nCard Per Turn\nReset Balance'; break
            case 700: this.desc+='All Attacks\nApply '+this.damage+' Bleed'; break
            case 701: this.desc+='Apply '+this.damage+' Bleed\nto a Random\nEnemy '+this.alt+' Times\n'+nfp(3)+' Balance'; break
            case 702: this.desc+='Apply '+this.damage+' Bleed\nand '+this.alt+' Weak\nto All Enemies\n'+nfp(-3)+' Balance'; break
            case 703: this.desc+='Add '+this.damage+' Dodge\n'+nfp(this.alt)+' Balance'; break
            case 704: this.desc+='Apply '+this.damage+' Bleed\nPer Turn\nto All Enemies\n'+nfp(this.alt)+' Balance'; break
            case 705: this.desc+='Deal '+this.damage+' Damage\nDeals Double Damage\nif Target Has Bleed\n'+nfp(this.alt)+' Balance'; break
            case 706: this.desc+='You Cannot\nbe Debuffed'; break
            case 707: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Bleed\n'+nfp(-2)+' Balance'; break
            case 708: if(this.damage>0){this.desc+='Gain Block\nEqual to 2x Enemy\nBleed +'+this.damage+'\n'+nfp(this.alt)+' Balance'}else{this.desc+='Gain Block\nEqual to 2x\nEnemy Bleed\n'+nfp(this.alt)+' Balance'} break
            case 709: this.desc+='Gain '+this.damage+' Strength\nWhen You\nTake Damage\n'+nfp(this.alt)+' Balance'; break
            case 710: this.desc+='Deal '+this.damage+' Damage\nDraw 1 Less\nCard Per Turn\n'+nfp(this.alt)+' Balance'; break
            case 711: this.desc+='Discard All Attacks\nin Hand\nAdd '+this.damage+' Block\n'+nfp(this.alt)+' Balance'; break
            case 712: this.desc+='You Can No\nLonger Be\nUnarmed'; break
            case 713: this.desc+='Gain '+this.damage+' Energy'; if(this.alt>0){'\nDraw '+this.alt+' Cards'} break
            case 714: this.desc+='Next '+this.damage+' Times\nYou are Armed,\nDeal 10 Damage\nto First Enemy\nand Disarm'; break
            case 715: this.desc+='Deal '+this.damage+' Damage\nIf Target Intends\nto Attack,\nReduce Power of\nAttack by '+this.alt; break
            case 716: this.desc+='If Target Intends\nto Attack,\nReduce Power of\nAttack by '+this.damage; break
            case 717: this.desc+='If Target Intends\nto Block,\nReduce Power of\nBlock by '+this.damage; break
            case 718: this.desc+='Add '+this.damage+' Block\nPer Turn, Increasing\nBlock Gain by '+this.alt; break
            case 719: this.desc+='Remove Primary\nEffect of Target'+"'"+'s\nCurrent Attack'; break
            case 720: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Vulnerable\nto Self and Target\n'+nfp(-4)+' Balance'; break
            case 721: this.desc+='Draw '+this.damage+' Cards\nAdd '+this.alt+' Random\nConstruction Card\nto Your Hand'; break
            case 722: this.desc+='Build All\nof Construct\nTake '+this.damage+' Damage'; break
            default:
        }
        if(this.spec==2||this.spec==5||this.spec==9){
            this.desc+='\nRetain'
        }
        if(this.spec==3||this.spec==8||this.spec==9||this.spec==14||this.playExhaust){
            this.desc+='\nExhaust'
        }
        if(this.spec==12){
            this.desc+='\nReturn to Draw Pile'
        }
        if(this.spec==17){
            this.desc+='\nVanishing '+this.alt
        }
        if(this.desc[this.desc.length-1]=='\n'){
            this.desc=this.desc.substr(0,this.desc.length-1)
        }
        if(this.desc[0]=='\n'){
            this.desc=this.desc.substr(1,this.desc.length)
        }
    }
    display(deckSize=0,handSize=0,discardSize=0,drawSize=0,turn=0,random=current.defaultRandom){
        this.displayName(deckSize,handSize,discardSize,drawSize,turn,random)
        if(this.size>0){
            this.layer.translate(this.position.x,this.position.y)
            this.layer.scale(this.size)
            this.layer.fill(255,this.fade*this.anim.select)
            this.layer.noStroke()
            this.layer.rect(0,0,this.width+15,this.height+15,10)
            playerFill(this.layer,this.color,this.fade)
            this.layer.strokeWeight(5)
            this.layer.rect(0,0,this.width,this.height,5)
            if(this.color==stage.playerNumber+3){
                this.layer.image(graphics.minor[8],-this.width/2-10,-this.height/2-10,this.width+20,this.height+20)
            }
            if(this.attack==63||this.attack==280||this.attack==296||this.attack==367||this.attack==503||this.attack==639){
                this.layer.rect(0,-this.height/4+5,this.width,this.height/2+10,5)
                this.layer.rect(0,this.height/4+5,this.width,this.height/2-10,5)
            }
            if(this.spec==5||this.spec==11||this.spec==14){
                this.layer.fill(138,141,207,this.fade)
                this.layer.stroke(111,114,178,this.fade)
                this.layer.strokeWeight(2)
                this.layer.ellipse(-this.width/2+16,-this.height/2+20,30,30)
            }
            if(this.spec==4){
                this.layer.noFill()
				this.layer.stroke(240,240,40,this.fade)
				this.layer.strokeWeight(4)
				this.layer.strokeCap(SQUARE)
				this.layer.arc(-this.width/2+17,-this.height/2+19,20,20,-45,135)
				this.layer.arc(-this.width/2+15,-this.height/2+17,20,20,135,315)
				this.layer.strokeCap(ROUND)
                this.layer.fill(250-this.anim.afford*10,250-this.anim.afford*250,250-this.anim.afford*250,this.fade)
            }else if(this.spec!=1&&this.spec!=6&&this.spec!=7){
                this.layer.fill(200,225,250,this.fade)
                this.layer.stroke(150,200,250,this.fade)
                this.layer.strokeWeight(3)
                this.layer.quad(-this.width/2+4,-this.height/2+20,-this.width/2+16,-this.height/2+4,-this.width/2+28,-this.height/2+20,-this.width/2+16,-this.height/2+36)
                this.layer.fill(this.anim.afford*240,0,0,this.fade)
            }
            this.layer.noStroke()
            this.layer.textSize(20)
            if(this.cost==-1){
                this.layer.text('X',-this.width/2+16,-this.height/2+20)
            }else if(this.spec!=1&&this.spec!=6&&this.spec!=7){
                this.layer.text(this.cost,-this.width/2+16,-this.height/2+20)
            }
            this.layer.textSize(14)
            if(this.level==1){
                switch(this.color){
                    case 0:
                        this.layer.fill(80,this.fade)
                    break
                    case 1:
                        this.layer.fill(50,100,50,this.fade)
                    break
                    case 2:
                        this.layer.fill(100,0,50,this.fade)
                    break
                    case 3:
                        this.layer.fill(150,100,50,this.fade)
                    break
                    case 4:
                        this.layer.fill(100,0,100,this.fade)
                    break
                    case 5:
                        this.layer.fill(0,50,100,this.fade)
                    break
                    case 6:
                        this.layer.fill(50,0,100,this.fade)
                    break
                    case 7:
                        this.layer.fill(100,100,50,this.fade)
                    break
                    case 8:
                        this.layer.fill(40,this.fade)
                    break
                    case 9:
                        this.layer.fill(20,this.fade)
                    break
                    case 10:
                        this.layer.fill(200,this.fade)
                    break
                    case 11:
                        this.layer.fill(100,this.fade)
                    break
                }
                this.layer.text(this.name+'+',0,-this.height/2+24)
                if(this.color==10){
                    this.layer.fill(255,this.fade)
                }else{
                    this.layer.fill(0,this.fade)
                }
            }else{
                if(this.color==10){
                    this.layer.fill(255,this.fade)
                }else{
                    this.layer.fill(0,this.fade)
                }
                this.layer.text(this.name,0,-this.height/2+24)
            }
            this.layer.textSize(12)
            this.layer.text(this.desc,0,10)
            this.layer.textSize(10)
            if(this.list==10){
                this.layer.text('Curse',0,this.height/2-10)
            }else if(this.list==11){
                this.layer.text('Status',0,this.height/2-10)
            }else if(this.list!=12){
                switch(this.class){
                    case 0:
                        this.layer.text('Attack',0,this.height/2-10)
                    break
                    case 1:
                        this.layer.text('Skill',0,this.height/2-10)
                    break
                    case 2:
                        this.layer.text('Power',0,this.height/2-10)
                    break
                    case 3:
                        this.layer.text('Blueprint',0,this.height/2-10)
                    break
                }
            }
            this.layer.textSize(8)
            if(dev.id){
                if(this.id==null){
                    this.layer.text('-',-this.width/2+10,this.height/2-10)
                }else{
                    this.layer.text(this.id,-this.width/2+10,this.height/2-10)
                }
            }
            if(dev.attack){
                this.layer.text(this.attack,this.width/2-10,this.height/2-10)
            }
            this.layer.scale(1/this.size)
            this.layer.translate(-this.position.x,-this.position.y)
        }
    }
    displayExtra(color,value){
        if(this.size>0){
            this.layer.translate(this.position.x,this.position.y)
            this.layer.scale(this.size)
            this.layer.fill(color[0],color[1],color[2],this.fade*value)
            this.layer.noStroke()
            this.layer.rect(0,0,this.width+15,this.height+15,10)
            this.layer.scale(1/this.size)
            this.layer.translate(-this.position.x,-this.position.y)
        }
    }
    update(energy,combo,armed,random){
        if(this.base.cost==-2){
            this.cost=random.hits
        }else if(this.base.cost==-3){
            this.cost=max(0,4-random.hits)
        }else if(this.base.cost==-4){
            this.cost=max(0,3-random.discards)
        }
        if(this.size<1&&!this.used){
            this.size=round(this.size*5+1)*0.2
        }else if(this.size>0&&this.used){
            if(this.spec==16&&!this.trigger){
                this.size=round(this.size*50-1)*0.02
            }else{
                this.size=round(this.size*5-1)*0.2
            }
        }
        if(this.size<=0&&this.used){
            if((this.spec==3||this.spec==8||this.spec==9||this.spec==13||this.spec==14||this.playExhaust)&&this.trigger||this.exhaust){
                this.remove=true
            }else if(this.spec==12){
                this.draw=true
            }else{
                this.discard=true
            }
        }
        if(this.select&&this.anim.select<1){
            this.anim.select=round(this.anim.select*5+1)/5
        }else if(!this.select&&this.anim.select>0){
            this.anim.select=round(this.anim.select*5-1)/5
        }
        if((energy.main<this.cost&&this.spec!=4||combo<this.cost&&this.spec==4||(this.spec==5||this.spec==11||this.spec==13)&&armed!=1)&&this.anim.afford<1){
            this.anim.afford=round(this.anim.afford*5+1)/5
        }else if(!(energy.main<this.cost&&this.spec!=4||combo<this.cost&&this.spec==4||(this.spec==5||this.spec==11||this.spec==13)&&armed!=1)&&this.anim.afford>0){
            this.anim.afford=round(this.anim.afford*5-1)/5
        }
        if(this.trigger&&!this.used){
            if(dist(this.position.x,this.position.y,100,120)<20){
                this.position.x=100
                this.position.y=120
            }else{
                this.calcDirection=atan2(100-this.position.x,120-this.position.y)
                this.position.x+=sin(this.calcDirection)*20
                this.position.y+=cos(this.calcDirection)*20
            }
        }
    }
}