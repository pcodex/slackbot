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

    bot.postMessageToUser('prabhu', 'Hi, Wear a mask when outdoors. Do you want the latest COVID update?',params);
    bot.postMessageToUser('rosemary', 'Hi, Wear a mask when outdoors. Do you want the latest COVID update?',params);

});

const getRandomJoke = (callback, user) => {
    return request("https://evilinsult.com/generate_insult.php?lang=en&type=json", (error, response) => {
      if (error) {
        console.log("Error: ", error)
      } else {
        let jokeJSON = JSON.parse(response.body)
        let joke = jokeJSON.insult
        return callback(joke, user)
      }
    });
  }

  const postMessage = (message, user) => {
    bot.postMessage(user, message, { as_user: true });
  }

bot.on('message', (msg)=>{

    switch(msg.type){
        case "message":
            if(msg.channel[0] === 'D' && msg.bot_id === undefined) {
                getRandomJoke(postMessage,msg.user);
                //bot.postMessage(msg.user, "Fed up!! Visit https://www.dhhs.vic.gov.au/coronavirus-covid-19-daily-update", {as_user:true}) 
                
            }
            break;
    }

});