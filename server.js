const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Lobby = require('./Classes/Lobby.js');
const gpc = require('generate-pincode');
const port = 8080;

const app = express();

const clientPath = __dirname;
console.log('Serving static from' + clientPath);
app.use(express.static(clientPath));
const server = http.createServer(app);
const io = socketio(server);
let lobbys = [];

let GeneratePincode = () => {
  let pincode = gpc(4);
  for (var i = 0; i < lobbys.length; i++) {
    if (pincode == lobbys[i].pincode) {
      pincode = GeneratePincode();
    }
  }
  return pincode;
};

io.on('connection', (sock) => {

  sock.on('CreateAGame', (id) => {
    let pincode = GeneratePincode();
    let room = new Lobby(pincode,sock.id);
    room.Join(sock);
    lobbys.push(room);
    sock.emit('GameCreated', room.pincode);
    console.log("Game created, Pin: " + pincode);
  });

  sock.on('JoinGame', (pincode, name) => {
    let found = false;
    for (var i = 0; i < lobbys.length; i++) {
      if (pincode = lobbys[i].pincode) {
        found = "true";
        lobbys[i].Join(sock);
        let payload = {
          id: sock.id,
          name
        }
        io.to(pincode).emit('PlayerJoined', payload);
        sock.emit('Joined', pincode);
        console.log("Player Joined, pin: " + lobbys[i].pincode + " Name: " + name);
        break;
      }
    }
    if (!found) {
      sock.emit('FailedToJoin');
    }
  });

  sock.on('UpdateRounds', (pin, currentRound) => {
    io.to(pin).emit('UpdateRoundToMobiel', currentRound);
  });


  sock.on('Awnsered', (value)=>{
    io.emit('GetAwnser', value, sock.id);
  });

  sock.on('SendAwnsers', (awnsers, pincode)=>{
    console.log(pincode);
    io.to(pincode).emit('GetAwnsers', awnsers);
  });

  sock.on('Voted', (VoteID) => {
    console.log("Got Vote from: " + sock.id + " " + VoteID);
    io.emit('GetVotes', VoteID, sock.id);
  });

  sock.on('disconnect', () => {
    let sockislobby = false;
    for (var i = 0; i < lobbys.length; i++) {
      if (lobbys[i].socketid == sock.id) {
        sockislobby = true;
        lobbys.splice(i,1);
        console.log(lobbys);
      }
    }

    if (!sockislobby) {
      console.log(sockislobby);
      io.emit('PlayerDisconnected',sock.id);
    }
    console.log(sock.id + " disconnected");
  });


})

server.on('error', (err) => {
  console.error("server error: ", err);
  io.emit('message', "server Error: " + err);
});

server.listen(process.env.PORT || port, () => {
  console.log("RPS started on " + process.env.PORT || port);
});
