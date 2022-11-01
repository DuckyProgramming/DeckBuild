types={
    card:[
        {name:'',
        stats:[],
        },{name:'Strike',
        stats:[
            {damage:6,alt:0,cost:1,attack:1,target:1,desc:'Deal 6\nDamage',spec:0,class:0},
            {damage:9,alt:0,cost:1,attack:1,target:1,desc:'Deal 9\nDamage',spec:0,class:0},
        ],
        },{name:'Defend',
        stats:[
            {damage:5,alt:0,cost:1,attack:2,target:0,desc:'Add 5\nBlock',spec:0,class:1},
            {damage:8,alt:0,cost:1,attack:2,target:0,desc:'Add 8\nBlock',spec:0,class:1},
        ],
        },{name:'Big Strike',
        stats:[
            {damage:14,alt:0,cost:2,attack:1,target:1,desc:'Deal 14\nDamage',spec:0,class:0},
            {damage:22,alt:0,cost:2,attack:1,target:1,desc:'Deal 22\nDamage',spec:0,class:0},
        ],
        },{name:'Triple',
        stats:[
            {damage:3,alt:0,cost:1,attack:3,target:1,desc:'Deal 3\nDamage 3\nTimes',spec:0,class:0},
            {damage:4,alt:0,cost:1,attack:3,target:1,desc:'Deal 4\nDamage 3\nTimes',spec:0,class:0},
        ],
        },{name:'Think',
        stats:[
            {damage:2,alt:0,cost:1,attack:4,target:0,desc:'Draw 2 Cards',spec:0,class:3},
            {damage:2,alt:0,cost:0,attack:4,target:0,desc:'Draw 2 Cards',spec:0,class:3},
        ],
        },{name:'Confusion',
        stats:[
            {damage:0,alt:0,cost:0,attack:0,target:0,desc:'Unplayable',spec:1,class:0},
            {damage:0,alt:0,cost:0,attack:0,target:0,desc:'Unplayable',spec:1,class:0},
        ],
        },{name:'Weaken',
        stats:[
            {damage:1,alt:0,cost:0,attack:5,target:1,desc:'Apply 1\nWeak',spec:0,class:2},
            {damage:2,alt:0,cost:0,attack:5,target:1,desc:'Apply 2\nWeak',spec:0,class:2},
        ],
        },{name:'Electrify',
        stats:[
            {damage:3,alt:4,cost:1,attack:6,target:0,desc:'Add 3 Block\nCounter 4',spec:0,class:1},
            {damage:6,alt:8,cost:1,attack:6,target:0,desc:'Add 6 Block\nCounter 8',spec:0,class:1},
        ],
        },{name:'Dynamic\nShield',
        stats:[
            {damage:4,alt:0,cost:-1,attack:7,target:0,desc:'Add 4X\nBlock',spec:0,class:1},
            {damage:6,alt:0,cost:-1,attack:7,target:0,desc:'Add 6X\nBlock',spec:0,class:1},
        ],
        },{name:'Limit\nBreak',
        stats:[
            {damage:12,alt:0,cost:0,attack:8,target:1,desc:'Deal 12 Damage\nAdd a Bleed\nto Deck',spec:0,class:0},
            {damage:18,alt:0,cost:0,attack:8,target:1,desc:'Deal 18 Damage\nAdd a Bleed\nto Deck',spec:0,class:0},
        ],
        },{name:'Bleed',
        stats:[
            {damage:0,alt:0,cost:0,attack:0,target:0,desc:'Unplayable\nTake 1 Damage\nper Card Played',spec:1,class:0},
            {damage:0,alt:0,cost:0,attack:0,target:0,desc:'Unplayable\nTake 1 Damage\nper Card Played',spec:1,class:0},
        ],
        },{name:'Exhausting\nStrike',
        stats:[
            {damage:8,alt:0,cost:0,attack:9,target:1,desc:'Deal 8 Damage\nDiscard a Card',spec:0,class:1},
            {damage:12,alt:0,cost:0,attack:9,target:1,desc:'Deal 12 Damage\nDiscard a Card',spec:0,class:1},
        ],
        },{name:'Chain\nStrike',
        stats:[
            {damage:5,alt:0,cost:1,attack:10,target:1,desc:'Deal 5 Damage\nIf Fatal, gain\n1 Energy',spec:0,class:1},
            {damage:7,alt:0,cost:0,attack:10,target:1,desc:'Deal 7 Damage\nIf Fatal, gain\n1 Energy',spec:0,class:1},
        ],
        },{name:'Hook\nStrike',
        stats:[
            {damage:4,alt:2,cost:1,attack:11,target:1,desc:'Deal 4 Damage\nGain 2 Mana\nNext Turn',spec:0,class:1},
            {damage:6,alt:2,cost:1,attack:11,target:1,desc:'Deal 6 Damage\nGain 2 Mana\nNext Turn',spec:0,class:1},
        ],
        },{name:'Multi\nStrike',
        stats:[
            {damage:6,alt:0,cost:2,attack:12,target:0,desc:'Deal 6 Damage\nto All Enemies',spec:0,class:1},
            {damage:9,alt:0,cost:2,attack:12,target:0,desc:'Deal 9 Damage\nto All Enemies',spec:0,class:1},
        ],
        },{name:'Load',
        stats:[
            {damage:0,alt:0,cost:0,attack:13,target:0,desc:'Hold 1\nBasic Bullet',spec:0,class:3},
            {damage:0,alt:0,cost:0,attack:13,target:0,desc:'Hold 2\nBasic Bullet',spec:0,class:3},
        ],
        },{name:'Fire',
        stats:[
            {damage:2,alt:0,cost:1,attack:14,target:0,desc:'Fire 1st Bullet\n2 Times',spec:0,class:2},
            {damage:3,alt:0,cost:1,attack:14,target:0,desc:'Fire 1st Bullet\n3 Times',spec:0,class:2},
        ],
        },{name:'Explode',
        stats:[
            {damage:0,alt:0,cost:1,attack:15,target:0,desc:'Hold 1\nExplosive Bullet',spec:0,class:3},
            {damage:0,alt:0,cost:0,attack:15,target:0,desc:'Hold 1\nExplosive Bullet',spec:0,class:3},
        ],
        },{name:'Shields',
        stats:[
            {damage:0,alt:0,cost:0,attack:16,target:0,desc:'Hold 1\nShield Charge',spec:0,class:3},
            {damage:0,alt:0,cost:0,attack:16,target:0,desc:'Hold 2\nShield Charge',spec:0,class:3},
        ],
        },{name:'Unload',
        stats:[
            {damage:0,alt:0,cost:2,attack:17,target:0,desc:'Fire All\nBullets',spec:0,class:2},
            {damage:0,alt:0,cost:1,attack:17,target:0,desc:'Fire All\nBullets',spec:0,class:2},
        ],
        },{name:'Head\nSmash',
        stats:[
            {damage:22,alt:0,cost:3,attack:18,target:1,desc:'Deal 22 Damage\nDiscard Hand',spec:0,class:0},
            {damage:30,alt:0,cost:3,attack:18,target:1,desc:'Deal 30 Damage\nDiscard Hand',spec:0,class:0},
        ],
        },{name:'Streamline',
        stats:[
            {damage:1,alt:0,cost:1,attack:19,target:0,desc:'Lose 1\nAmmo Slot',spec:0,class:3},
            {damage:2,alt:0,cost:0,attack:19,target:0,desc:'Lose 1\nAmmo Slot',spec:0,class:3},
        ],
        },{name:'Energize',
        stats:[
            {damage:0,alt:0,cost:2,attack:20,target:0,desc:'Hold 1\nEnergy Charge',spec:0,class:3},
            {damage:0,alt:0,cost:1,attack:20,target:0,desc:'Hold 1\nEnergy Charge',spec:0,class:3},
        ],
        },
    ],combatant:[
        {name:'',alt:'',life:0,height:0,behavior:0,attacks:[],damage:[],alt:[]},
        {name:'Agent',alt:'',life:80,height:75,behavior:0,attacks:[],damage:[],alt:[]},
        {name:'Player',alt:'',life:40,height:75,behavior:0,attacks:[],damage:[],alt:[]},
        {name:'Player',alt:'',life:40,height:75,behavior:0,attacks:[],damage:[],alt:[]},
        {name:'Human',alt:'',life:20,height:75,behavior:0,attacks:[1,2],damage:[4],alt:[]},
    ],
}
combatants=[
    {type:4},
    {type:4},
    {type:4},
    {type:4},
    {type:0},
    {type:0},
]
stage={scale:0,scene:'battle'}
graphics={main:0}
transition={trigger:false,anim:0,scene:stage.scene}
inputs={mouse:{x:0,y:0},rel:{x:0,y:0},keys:[[false,false,false,false],[false,false,false,false]]}
a=0;b=0;c=0;d=0;e=0;f=0;g=0;h=0;i=0;j=0;k=0;l=0;m=0;n=0;o=0;p=0
la=0;lb=0;lc=0;ld=0;le=0;lf=0;lg=0;lh=0;li=0;lj=0;lk=0;ll=0;lm=0;ln=0;lo=0;lp=0