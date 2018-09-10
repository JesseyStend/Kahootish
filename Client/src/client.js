const CreateAGameButton = document.getElementById('Submit');
const CreateAGameMenu = document.getElementById('CreateAGameMenu');
const GamePin = document.getElementById('GamePin');
const playerList = document.getElementById('PlayerList')
const sock = io();
let creatingGame = false;
let assignedPincode = null;
let players = [];
let game;


CreateAGameButton.onclick = () => {
  if (!creatingGame) {
    sock.emit('CreateAGame');
  }
  creatingGame = true;
  CreateAGameMenu.style.visibility = 'hidden';
}

sock.on('Test', (id) => {
  console.log(players);
  for (var i = 0; i < players.length; i++) {
    if (players[i] = id) {
      console.log("He is one of ours!");
    }
  }
});

sock.on('GameCreated', (pincode) => {
  console.log(pincode);
  assignedPincode = pincode;
  GamePin.innerHTML = pincode;
  game = new Game();
});

sock.on('PlayerJoined', (playerData) => {
  console.log(playerData);
  let newPlayer = new Player(playerData.name,playerData.id);
  players.push(newPlayer);
  console.log("Player Joined, Name: " + newPlayer.name + " id: " + newPlayer.id);
  UpdatePlayerList();
  game.UpdateRounds();
});

sock.on("PlayerDisconnected", (id) => {
  console.log("Player " + id + " disconnecting");
  for (var i = 0; i < players.length; i++) {
    if(players[i].id == id){
      players.splice(i,1);
      console.log(players);
      UpdatePlayerList();
    }
  }
});

let UpdatePlayerList = () => {
  playerList.innerHTML = "";
  for (var i = 0; i < players.length; i++) {
    let node = document.createElement('LI');
    let p = document.createElement('p');
    let textnode = document.createTextNode(players[i].name);
    p.appendChild(textnode)
    node.appendChild(p);
    playerList.appendChild(node);
  }
}
