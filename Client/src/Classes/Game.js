class Game {
  constructor() {
    this._turns = ["Awnser", "Choose", "Show", "StartGame"];
    this._currentRoundid = 3;
    this._currentRound = this._turns[this._currentRoundid];
    this._timer = document.getElementById('Timer');
    this._timervalue = document.getElementById('Timerdepleated')
    this._questions = ["___ was invented in Nazi Germany.","Woman get turned on by ___.?", "___, the latest Facebook craze." + "The best way to find Malaysia Airlines Flight MH370 may be with ____", "___ burns 360 calories per hour"];
    this._questionsindex = 0;
    this._awnsers = [];
    this._awnsersTab = document.getElementById('Awnsers');
    this._questionText = document.getElementsByClassName('Question');
    this._awnserTab = document.getElementById('Awnsers');
    this._prevousWinnerText = document.getElementById('WinnerAwnser');
    this._leaderboard = document.getElementById('Leaderboard2')
    this._prevousWinner;
    this._votes = [];
    this._amountVoted = 0;

    for (var i = 0; i < this._turns.length; i++) {
      if (document.getElementById(this._turns[i]) != null) {
        document.getElementById(this._turns[i]).style.display = 'none';
      }
    }
    if (document.getElementById(this._currentRound) != null) {
      document.getElementById(this._currentRound).style.display = 'block';
    } else {
      console.error("Error: DOMid of currentRoundTab is missing");
    }
    this.StartRound();

    sock.on('GetAwnser',(playerawnser,id)=>{

      for (var i = 0; i < players.length; i++) {
        if (players[i].id == id) {
          let awnsered = {}
          awnsered.awnser = playerawnser;
          awnsered.id = id;
          this._awnsers.push(awnsered);
        }
      }
    });

    sock.on('GetVotes',(vote, id)=>{
      this._amountVoted++;
      for (var i = 0; i < players.length; i++) {
        if (players[i].id == id) {
          let tempVote = {};
          for (var i = 0; i < this._awnsers.length; i++) {
            tempVote.awnser = this._awnsers[vote].awnser;
          }

          let voteExists = false;
          for (var i = 0; i < this._votes.length; i++) {
            if (this._votes[i].awnser == tempVote.awnser) {
              this._votes[i].votes++;
              voteExists = true;
            }
          }

          if (!voteExists) {
            tempVote.votes = 0;
            this._votes.push(tempVote);
          }
        }
      }

      if (this._amountVoted >= players.length) {
        this._amountVoted = 0;
        this.NextRound();
      }
    });
  }

  RankVotes(){

    for (var i = 0; i < this._votes.length; i++) {
      for (var j = 0; j < this._votes.length; j++) {
        if (this._votes[i].votes > this._votes[j].votes) {
          let tempVote = this._votes[i];
          this._votes[i] = this._votes[j];
          this._votes[j] = tempVote;
          tempVote = null;
        }
      }
    }
    console.log(this._votes);

    let amountOfVotes;
    if (this._votes.length < 3) {
      amountOfVotes = this._votes.length;
    }
    else {
      amountOfVotes = 3
    }

    console.log(amountOfVotes);

    for (var i = 0; i < amountOfVotes; i++) {
      console.log(i);
      for (var j = 0; j < this._awnsers.length; j++) {
        console.log(this._votes[i].awnser + " " + this._awnsers[j].awnser);
        if (this._votes[i].awnser == this._awnsers[j].awnser) {
          for (var k = 0; k < players.length; k++) {
            console.log(players[k].id + " " + this._awnsers[j].id);
            if (players[k].id == this._awnsers[j].id) {
              console.log(players[k].name + " is on " + i + ". Place");
              players[k].AddToScore(300/(i + 1));
              if (i == 0) {
                this._prevousWinner = players[k].name

              }
            }
          }
        }
      }
    }
  }

  get currentQuestion () {
    return this._questions[this._questionsindex];
    console.log(this._questionsindex + " , " + this._questions);
  }

  RankPlayers(){
    for (var i = 0; i < players.length; i++) {
      for (var j = 0; j < players.length; j++) {
        if (players[i].score > players[j].score) {
          let tempPlayer = players[i];
          players[i] = players[j];
          players[j] = tempPlayer;
          tempPlayer = null;
        }
      }
    }
  }

  NextRound(){
    if (document.getElementById(this._currentRound) != null) {
      document.getElementById(this._currentRound).style.display = 'none';
    }
    if (this._currentRound != "GameOver") {
      this._currentRoundid++;
      if (this._currentRoundid > this._turns.length -2) {
        this._currentRoundid = 0;
      }
      this._currentRound = this._turns[this._currentRoundid];
    }

    if (document.getElementById(this._currentRound) != null) {
      document.getElementById(this._currentRound).style.display = 'block';
    } else {
      console.error("Error: DOMid of currentRoundTab is missing");
    }
    this.StartRound();
    sock.emit('UpdateRounds', assignedPincode, this._currentRound);
  }

  StartRound(){
    if (this._questionText[this._currentRoundid] != null) {
      this._questionText[this._currentRoundid].innerHTML = this.currentQuestion;
    }
    switch (this._currentRound) {
      case "Awnser":
        this._awnsers = [];
        for (var i = 0; i < this._awnsers; i++) {
          this._awnsers.splice(i);
        }
        console.log(this._awnsers);
        let maxvalue = 2000;
        let timervalue = maxvalue;
        let timer = setInterval(()=>{
          timervalue--;
          this._timervalue.style.width = (timervalue / maxvalue * 100)+ "%";
          if (timervalue <= 0) {
            clearInterval(timer);
            this.NextRound();
          }
        },10);
        break;
      case "Choose":
        //this.votes = [];
        this._awnserTab.innerHTML = "";
        sock.emit('SendAwnsers', this._awnsers, assignedPincode);
        for (var i = 0; i < this._awnsers.length; i++) {
          console.log("Chosen array " + this._awnsers[i].awnser);
        }
        for (var i = 0; i < this._awnsers.length; i++) {
          let li = document.createElement('LI');
          let p = document.createElement('p');
          p.innerHTML = (i + 1) + ". " + this._awnsers[i].awnser;
          li.appendChild(p);
          this._awnserTab.appendChild(li);
        }
        break;
      case "Show":
        this._leaderboard.innerHTML = "";
        this.RankVotes();
        this.RankPlayers();
        this._prevousWinnerText.innerHTML = "PrevousWinner: " + this._prevousWinner;

        let Leaderboardlength;
        if (players.length < 3) {
          Leaderboardlength = players.length;
        }
        else {
          Leaderboardlength = 3
        }

        for (var i = 0; i < Leaderboardlength; i++) {
          let node = document.createElement('LI');
          let p = document.createElement('p');
          let textnode = document.createTextNode(players[i].name + "      score: " + players[i].score);
          p.appendChild(textnode)
          node.appendChild(p);
          this._leaderboard.appendChild(node);
        }

        if (this._questionsindex < this._questions.length - 1) {
          let maxvalue = 750;
          let timervalue = maxvalue;
          let timer = setInterval(()=>{
            timervalue--;
            if (timervalue <= 0) {
              clearInterval(timer);
              this._questionsindex++;
              this.NextRound();

            }
          },10);
        } else {
          document.getElementById('GameEnded').innerHTML = "GameOver"
        }

        break;
      case "StartGame":
        document.getElementById('StartGameButton').onclick = ()=>{
          if (players.length > 1) {
            this.NextRound();
          }
          else {
            document.getElementById('LogText').innerHTML = "Not enough Players, a minimal of 2 is requert.";
          }
        }
        break;
      default:

    }
  }

  UpdateRounds(){
    sock.emit('UpdateRounds', assignedPincode, this._currentRound);
    console.log("Update rounds");
  }

  get turn (){
    return this._currentRound = this._turns[this._currentRoundid];
  }
}
