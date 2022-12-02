class card{
    constructor(layer,x,y,type,level,color,damage=types.card[type].stats[level].damage,alt=types.card[type].stats[level].alt,cost=types.card[type].stats[level].cost){
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
        this.attack=types.card[this.type].stats[this.level].attack
        this.target=types.card[this.type].stats[this.level].target
        this.spec=types.card[this.type].stats[this.level].spec
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
        this.selectDiscard=false
    }
    displayName(deckSize,handSize,discardSize,drawSize,random){
        this.desc=''
        if(this.spec==1||this.spec==6||this.spec==7){
            this.desc+='Unplayable\n'
        }
        if(this.spec==7||this.spec==8||this.spec==10){
            this.desc+='Innate\n'
        }
        switch(this.attack){
            case -2: this.desc+='Take '+this.damage+' Damage\nPer Card Played'; break
            case -3: this.desc+='Ethereal'; break
            case -4: this.desc+='At End of Turn,\nGain 1 Weak'; break
            case -5: this.desc+='Take 1 Damage\nPer Card Not Played'; break
            case -7: this.desc+='At End of Turn,\nGain 1 Vulnerable'; break
            case -8: this.desc+='When Removed,\nLose 3 Max Health'; break
            case -9: this.desc+='When Drawn,\nLose 1 Energy\nEthereal'; break
            case -10: this.desc+='At End of Turn,\nTake 2 Damage'; break
            case -11: this.desc+='Cannot Play more\nthan 3 Cards'; break
            case -12: this.desc+='Cannot Play more\nthan 1 Attack\nWhen Played,\nBreak Balance'; break
            case -13: this.desc+='Unremovable'; break
            case -14: this.desc+='At End of Turn,\nAdd 2 Bleed'; break
            case -15: this.desc+='When Drawn, Gain\n2 Temporary Weak'; break
            case -16: this.desc+='When Drawn,\na Random Card\nGains 1 Cost\nEthereal'; break
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
            case 10: this.desc+='Deal '+this.damage+' Damage\nIf Fatal, gain\n'+this.alt+' Energy'; break
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
            case 22: this.desc+='Deal '+this.damage+' Damage\nAll Claws gain\n+2 Damage'; break
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
            case 40: this.desc+='Add '+this.damage+' Block\nCounter '+this.alt+' +2\nPer Combo'+' Once'; break
            case 41: this.desc+='Deal '+this.damage+' Damage\nGain +'+this.alt+' Damage\nNext Turn'; break
            case 42: this.desc+='Deal '+this.damage+' Damage\nKnockdown'; break
            case 43: this.desc+='Deal '+this.damage+' Damage\nDeal '+this.alt+' Bonus\nDamage to Downed'; break
            case 44: this.desc+='Deal '+this.damage+' Damage\n+1 Per Combo\n'+this.alt+' Times'; break
            case 45: this.desc+='Deal '+this.damage+' Damage\nGain 1 Dodge'; break
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
            case 56: this.desc+='Exhaust\nYour Hand'; break
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
            case 124: this.desc+='Gain Block\nEqual to Number of\nCards in Deck\n('+handSize+')'; break
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
            case 147: this.desc+='Attacks add '+this.damage+'\nBleed Current Turn'; break
            case 148: this.desc+='Redraw your hand\nExhaust\nEthereal'; break
            case 149: this.desc+='Add '+this.damage+' Dodge\nExhausted when\nAnother Card Played\nDiscard Hand\nExhaust\nEthereal'; break
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
            case 170: this.desc+='Draw 1 Card\nDiscard 1 Card\nExhaust\nEthereal'; break
            case 171: this.desc+='Gain '+this.damage+'\nArtifact'; break
            case 172: this.desc+='Apply '+this.damage+'\nVulnerable'; break
            case 173: this.desc+='Apply '+this.damage+'\nPoison'; break
            case 174: this.desc+='Hold '+this.damage+'\nDark Charge'; break
            case 175: this.desc+='Deal '+this.damage+' Damage\nfor Every Combo'; break
            case 176: this.desc+='Add '+this.damage+' Dodge\nGain '+this.alt+' Strength'; break
            case 177: this.desc+='Deal '+this.damage+' Damage\nDeal Double Damage\nto Heavy Enemies'; break
            case 178: this.desc+='Add '+this.damage+' Block\nTake '+this.alt+' Damage'; break
            case 179: this.desc+='Next Attack\nadds '+this.damage+' Bleed'; break
            case 180: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Bleed\n'+nfp(-6)+' Balance'; break
            case 181: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Bleed\n'+nfp(-7)+' Balance'; break
            case 182: this.desc+='Deal '+this.damage+' Damage\nConvert Bleed of\nTarget to Health'; break
            case 183: this.desc+='Apply '+this.damage+' Bleed to Self\nGain '+this.alt+' Strength\n'+nfp(-3)+' Balance'; break
            case 184: this.desc+='Double all Bleed\n'+nfp(this.damage)+' Balance'; break
            case 185: this.desc+='Target Gains\n'+this.damage+' Weak\nPer Turn\n'+nfp(this.alt)+' Balance'; break
            case 186: this.desc+='Deal '+this.damage+' Damage\nGain '+this.alt+' Weak'; break
            case 187: this.desc+='Gain '+this.damage+' Block\nCounter With 1 Stun\n'+nfp(this.alt)+' Balance'; break
            case 188: this.desc+='Draw '+this.damage+' More\nCard Per Turn\n'+nfp(this.alt)+' Balance'; break
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
            case 200: this.desc+='Reflect Next\n'+this.damage+' Attacks\nCounter '+(7+this.level*3)+' Once\n'+nfp(this.alt)+' Balance'; break
            case 201: this.desc+='Add '+this.damage+' Dodge\n'+nfp(this.alt)+' Balance'; break
            case 202: this.desc+='Add '+this.damage+' Block\nCounter '+this.alt+'\nAll 3 Times\n'+nfp(6)+' Balance'; break
            case 203: this.desc+='Reflect Next\n'+this.damage+' Attacks\nDisarm'; break
            case 204: this.desc+='Deal '+this.damage+' Damage\nAdd a Winded\nto Draw Pile\n'+nfp(this.alt)+' Balance'; break
            case 205: this.desc+='When a Card\nis Exhausted,\nDraw '+this.damage+' Cards\n'+nfp(this.alt)+' Balance'; break
            case 206: this.desc+='Add '+this.damage+' Block\nSave Block\nfor 1 Turn\n'+nfp(this.alt)+' Balance'; break
            case 207: this.desc+='When an\nEnemy Dies,\nHeal '+this.damage+' Health\n'+nfp(this.alt)+' Balance'; break
            case 208: this.desc+='Change Balance\nto Opposite'; break
            case 209: this.desc+='Deal '+this.damage+' Damage\nAdd a Dizzy\nto Draw Pile\n'+nfp(this.alt)+' Balance'; break
            case 210: this.desc+='Deal '+this.damage+'\nfor Each Card\nExhaust Your Hand\n'+nfp(this.alt)+' Balance'; break
            case 211: this.desc+='Deal '+this.damage+' Damage\nto All Enemies\nAdd a Struggle\nto Draw Pile\n'+nfp(this.alt)+' Balance\nPer Enemy'; break
            case 212: this.desc+='Change Balance\nto Double'; break
            case 213: this.desc+='Increase Balance\nLimit by 5'; break
            case 214: this.desc+='Take 4 Damage\nAdd '+this.damage+' Block\nSave Block\nfor 1 Turn\n'+nfp(this.alt)+' Balance'; break
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
            case 242: this.desc+='When You\nPlay a Power,\nDraw '+this.damage+' Cards'; break
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
            case 265: if(this.damage==0){this.desc+='Add a Miracle+\nto Your Hand\nfor the Next\nX Turns'}else{this.desc+='Add a Miracle+\nto Your Hand\nFor the Next\nX+'+this.damage+' Turns'}; break
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
            case 301: this.desc+='Add '+this.damage+' Block\nGain '+this.alt+' Dodge\nCause an Enemy\nto Attack'; break
            case 302: this.desc+='Take '+this.damage+' Damage\nGain '+this.alt+' Strength'; break
            case 303: this.desc+='Discard 1 Card\nAdd '+this.damage+' Random\nCards'; break
            case 304: this.desc+='Gain '+this.damage+' Strength\nCannot Add Block\nFor '+this.alt+' Turns'; break
            case 305: this.desc+='Add '+this.damage+' Block\nCounter Once With\nPull Collision\nfor '+this.alt+' Damage'; break
            case 306: this.desc+='Counter '+this.damage+' All\nCounter Throw'; break
            case 307: if(this.alt>0){this.desc+='Add '+this.damage+' Random\nSkill to Your Hand\nIt Costs 0'}else{this.desc+='Add '+this.damage+' Random\nSkill to Your Hand\nIt Costs 0\nThis Turn'}; break
            case 308: this.desc+='Deal '+this.damage+' Damage\n'+this.alt+' Times\nGain 1 Dodge'; break
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
            case 320: this.desc+='Choose Between\n3 Cards to Add\nto Your Hand'; if(this.damage>0){this.desc+='\nIt Costs 0\nThis Turn'} break
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
            case 331: this.desc+='If Target Has\nLess Than '+this.damage+'\nHealth, Set its\nHealth to 0\n'+nfp(this.alt)+' Balance'; break
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
            case 343: this.desc+='Evoke 1st Charge\nFor Every Enemy'; break
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
            case 361: if(this.damage>0){this.desc+='End Your Turn\nRetain Your Energy\nFor Next Turn\nGain '+this.damage+' Energy'}else{this.desc+='End Your Turn\nRetain Your Energy\nFor Next Turn'}; break
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
            case 389: this.desc+='Add a Banked\nBalance Card With\nCurrent Balance\nto Your Hand\nReset Balance'; break
            case 390: this.desc+=nfp(this.damage)+' Balance'; break
            case 391: this.desc+='Gain '+this.damage+' Strength\nUnbalance by '+this.alt+'\nEvery Turn'; break
            case 392: this.desc+='Lose '+this.damage+' Health\nGain '+this.alt+' Strength'; break
            case 393: this.desc+='Lose '+this.damage+' Health\nGain '+this.alt+' Dexterity'; break
            case 394: this.desc+='Lose '+this.damage+' Health\nGain '+this.alt+' Energy'; break
            case 395: this.desc+='Gain '+this.damage+' Intangible\nExhaust\nEthereal'; break
            case 396: this.desc+='Deal '+this.damage+' Damage\nHeal '+this.alt+' Health'; break
            case 397: this.desc+='A Random Card\nin Your Hand\nCosts 0'; break
            case 398: this.desc+='Hold '+this.damage+' Light Charge\nGain '+this.alt+' Weak\nGain '+this.alt+' Frail'; break
            case 399: this.desc+='Gain '+this.damage+'\nArmor'; break
            case 400: this.desc+='Deal '+this.damage+' Damage\nApply '+this.alt+' Frail\nNo Combo Gain'; break
            default:
        }
        if(this.spec==2||this.spec==5||this.spec==9){
            this.desc+='\nRetain'
        }
        if(this.spec==3||this.spec==8||this.spec==9||this.spec==14){
            this.desc+='\nExhaust'
        }
        if(this.spec==12){
            this.desc+='\nReturn to Draw Pile'
        }
        if(this.desc[this.desc.length-1]=='\n'){
            this.desc=this.desc.substr(0,this.desc.length-1)
        }
    }
    display(deckSize=0,handSize=0,discardSize=0,drawSize=0,random={attacked:0}){
        this.displayName(deckSize,handSize,discardSize,drawSize,random)
        if(this.size>0){
            this.layer.translate(this.position.x,this.position.y)
            this.layer.scale(this.size)
            this.layer.fill(255,this.fade*this.anim.select)
            this.layer.noStroke()
            this.layer.rect(0,0,this.width+15,this.height+15,10)
            switch(this.color){
                case 0:
                    this.layer.fill(200,this.fade)
                    this.layer.stroke(160,this.fade)
                break
                case 1:
                    this.layer.fill(160,200,160,this.fade)
                    this.layer.stroke(120,160,120,this.fade)
                break
                case 2:
                    this.layer.fill(200,120,160,this.fade)
                    this.layer.stroke(160,80,120,this.fade)
                break
                case 3:
                    this.layer.fill(240,200,160,this.fade)
                    this.layer.stroke(200,160,120,this.fade)
                break
                case 4:
                    this.layer.fill(220,200,240,this.fade)
                    this.layer.stroke(180,160,200,this.fade)
                break
                case 5:
                    this.layer.fill(160,220,240,this.fade)
                    this.layer.stroke(120,180,200,this.fade)
                break
                case 6:
                    this.layer.fill(120,this.fade)
                    this.layer.stroke(80,this.fade)
                break
                case 7:
                    this.layer.fill(80,this.fade)
                    this.layer.stroke(50,this.fade)
                break
                case 8:
                    this.layer.fill(0,this.fade)
                break
            }
            this.layer.strokeWeight(5)
            this.layer.rect(0,0,this.width,this.height,5)
            if(this.color==8){
                this.layer.image(graphics.minor[8],-this.width/2-10,-this.height/2-10,this.width+20,this.height+20)
            }
            if(this.attack==63||this.attack==280||this.attack==296||this.attack==367){
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
            if(this.cost==-1){
                this.layer.textSize(20)
                this.layer.text('X',-this.width/2+16,-this.height/2+20)
            }else if(this.spec!=1&&this.spec!=6&&this.spec!=7){
                this.layer.textSize(20)
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
                        this.layer.fill(50,0,100,this.fade)
                    break
                    case 5:
                        this.layer.fill(0,50,100,this.fade)
                    break
                    case 6:
                        this.layer.fill(40,this.fade)
                    break
                    case 7:
                        this.layer.fill(20,this.fade)
                    break
                    case 8:
                        this.layer.fill(200,this.fade)
                    break
                }
                this.layer.text(this.name+'+',0,-this.height/2+24)
                if(this.color==8){
                    this.layer.fill(255,this.fade)
                }else{
                    this.layer.fill(0,this.fade)
                }
            }else{
                if(this.color==8){
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
                }
            }
            this.layer.scale(1/this.size)
            this.layer.translate(-this.position.x,-this.position.y)
        }
    }
    displayDiscarding(discarding){
        if(this.size>0){
            this.layer.translate(this.position.x,this.position.y)
            this.layer.scale(this.size)
            this.layer.fill(255,0,0,this.fade*discarding)
            this.layer.noStroke()
            this.layer.rect(0,0,this.width+15,this.height+15,10)
            this.layer.scale(1/this.size)
            this.layer.translate(-this.position.x,-this.position.y)
        }
    }
    update(energy,combo,armed,random){
        if(this.base.cost==-2){
            this.cost=random.hits
        }
        if(this.size<1&&!this.used){
            this.size=round(this.size*5+1)*0.2
        }else if(this.size>0&&this.used){
            this.size=round(this.size*5-1)*0.2
        }
        if(this.size<=0&&this.used){
            if((this.spec==3||this.spec==8||this.spec==9||this.spec==13||this.spec==14)&&this.trigger||this.exhaust){
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