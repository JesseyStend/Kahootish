
const PinForm = document.getElementById('PincodeForm');
const awnserTab = document.getElementById('Awnsers');
const sock = io();
const turns = ["Awnser", "Choose", "Show"];
let currentPin;
let joined = false;
let currentTurn = "";
let myName = null;

for (var i = 0; i < turns.length; i++) {
  document.getElementById(turns[i]).style.display = 'none';
}

document.getElementById('Submit').onclick = () => {
    console.log("Joining game");
    myName = document.getElementById('NameInput').value;
    sock.emit('JoinGame', document.getElementById('PinInput').value, myName);
};

document.getElementById('GameSubmit').onclick = () =>{
  sock.emit('Awnsered', document.getElementById('AwnserValue').value);
  console.log(document.getElementById('AwnserValue').value);
  document.getElementById('Awnser').style.visibility = "hidden";
};

sock.on('GetAwnsers',(awnsers) => {
  console.log(awnsers);
  awnserTab.innerHTML = "";
  let voteID = awnsers.length;
  for (var i = 0; i < awnsers.length; i++) {
    voteID--;
    let node = document.createElement('LI');
    let p = document.createElement('p');
    let textnode = document.createTextNode(awnsers[i].awnser);
    node.onclick = ()=>{
      console.log("voted");
      sock.emit('Voted',(voteID));
      awnserTab.style.visibility = "hidden"
    };
    p.appendChild(textnode)
    node.appendChild(p);
    awnserTab.appendChild(node);
  }
});

sock.on('UpdateRoundToMobiel',(currentRound) => {
  awnserTab.style.visibility = "visible";
  document.getElementById('Awnser').style.visibility = "visible";
  if (currentTurn!= "") {
    document.getElementById(currentTurn).style.display = 'none';
  }
  if (currentRound != null) {
      currentTurn = currentRound;
  } else {
      currentTurn = "Show";
  }
  document.getElementById(currentTurn).style.display = 'block';
});

sock.on('Joined', (pincode) => {
  console.log("Game joined");
  currentPin = pincode;
  joined = true;
  document.getElementById('name').innerHTML = "Your name: " + myName;
  PinForm.style.visibility = 'hidden';
});

sock.on('FailedToJoin', () => {
  console.error("Failed to join, unkown pin");
  document.getElementById('name').innerHTML = "Failed to join, unkown pin";
});
