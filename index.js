// TODO : form'ları text'e bağlanacak


var http = require('http')
var openFile = require('./javascripts/openFile.js')
var localhost = require('./localhost')
var url = "";

http.createServer((request, response) => {
    if(!request.url.includes('favicon')){
      url = request.url 
    
      if(url == "/?"){
          openFile('./page/adminPage.html',response);
          console.log("-----------------MAIN MENU-----------------")
      }else{
          openFile('./page/streamer.html',response);
          console.log("------------------"+url.slice(1,-1).toUpperCase()+ "-----------------")
      }
    }
}).listen(localhost.port_number)

const tmi = require('tmi.js');
const options = require('./options.js')

// Create a client with our options
const client = new tmi.client(options);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

var loginUsername = options.identity.username

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; }

  var commandName = msg.trim();
  if( target.substr(1) === url.slice(1,-1)){
    console.log(context.username + " -> " + commandName)
  }

  if (commandName === '!shot') {
    var num = rollDice();
    if(num > 0.5){
      num = 1
    }else{
      num = 0
    }
    (num == 1) ? client.say(target, `You Lived`) : client.say(target, `You Dead`);

  }/* if(commandName.includes('KEKW')){

    client.say(target, `KEKW`);
  
  } */if(commandName.includes(loginUsername)){
      
      if(context.subscriber){
        client.say(target, `${context.username} Efendim canım abonem`);
      }else{
        client.say(target, `${context.username} Efendim canım`);
      }
  }
}
// Function called when the "dice" command is issued
function rollDice () {
  return (Math.random() % 2)
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

