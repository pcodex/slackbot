var Slackbot = require('slackbots');

const mykeys = require('./config/key');

var bot = new Slackbot({
    token:mykeys.slacktoken,
    name:'kuska'
});

bot.on('start', function(){

    var params={
        icon_emoji:':mask:'
    };

    bot.postMessageToChannel('general','Obey rules! Stay indoors!', params);
    /*bot.getUsers()
    .then((users)=>{
        //console.log(users);
        for(var i=0; i<users.members.length;++i){
            console.log(users.members[i].id);
            console.log(users.members[i].name);
        }
    });*/

    bot.postMessageToUser('prabhu', 'Hi, Wear a mask when outdoors',params);
    bot.postMessageToUser('rosemary', 'Hi, Wear a mask when outdoors',params);

});

bot.on('message', (msg)=>{

    switch(msg.type){
        case "message":
            if(msg.channel[0] === 'D' && msg.bot_id === undefined) {
                bot.postMessage(msg.user, "Visit https://www.dhhs.vic.gov.au/coronavirus-covid-19-daily-update", {as_user:true}) 
                console.log(msg.user);               
            }
            break;
    }

});