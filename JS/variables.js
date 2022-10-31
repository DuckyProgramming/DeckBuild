types={
    card:[
        {name:'',
        stats:[],
        },{name:'Strike',
        stats:[
            {damage:6,cost:1,attack:1,target:1,desc:'Deal 6\nDamage',spec:0},
            {damage:9,cost:1,attack:1,target:1,desc:'Deal 9\nDamage',spec:0},
        ],
        },{name:'Defend',
        stats:[
            {damage:5,cost:1,attack:2,target:0,desc:'Add 5\nBlock',spec:0},
            {damage:8,cost:1,attack:2,target:0,desc:'Add 8\nBlock',spec:0},
        ],
        },{name:'Big Strike',
        stats:[
            {damage:14,cost:2,attack:1,target:1,desc:'Deal 14\nDamage',spec:0},
            {damage:22,cost:2,attack:1,target:1,desc:'Deal 22\nDamage',spec:0},
        ],
        },{name:'Triple',
        stats:[
            {damage:3,cost:1,attack:3,target:1,desc:'Deal 3\nDamage 3\nTimes',spec:0},
            {damage:4,cost:1,attack:3,target:1,desc:'Deal 4\nDamage 3\nTimes',spec:0},
        ],
        },{name:'Think',
        stats:[
            {damage:2,cost:1,attack:4,target:0,desc:'Draw 2 Cards',spec:0},
            {damage:2,cost:0,attack:4,target:0,desc:'Draw 2 Cards',spec:0},
        ],
        },{name:'Confusion',
        stats:[
            {damage:0,cost:0,attack:0,target:0,desc:'Unplayable',spec:1},
            {damage:0,cost:0,attack:0,target:0,desc:'Unplayable',spec:1},
        ],
        },
    ],combatant:[
        {name:'',alt:'',life:0,height:0,behavior:0,attacks:[],damage:[]},
        {name:'Player',alt:'',life:40,height:75,behavior:0,attacks:[],damage:[]},
        {name:'Human',alt:'',life:20,height:75,behavior:0,attacks:[1,2],damage:[4]},
    ],
}
combatants=[
    {type:2},
    {type:2},
    {type:0},
    {type:0},
    {type:0},
    {type:0},
]
stage={scale:0,scene:'battle'}
graphics={main:0}
transition={trigger:false,anim:0,scene:stage.scene}
inputs={mouse:{x:0,y:0},rel:{x:0,y:0},keys:[[false,false,false,false],[false,false,false,false]]}
a=0;b=0;c=0;d=0;e=0;f=0;g=0;h=0;i=0;j=0;k=0;l=0;m=0;n=0;o=0;p=0
la=0;lb=0;lc=0;ld=0;le=0;lf=0;lg=0;lh=0;li=0;lj=0;lk=0;ll=0;lm=0;ln=0;lo=0;lp=0