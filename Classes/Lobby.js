class Lobby {
  constructor(pin,id) {
    this._pincode = pin;
    this._socketid = id;
  }

  get pincode() {
    return this._pincode;
  }

  get socketid() {
    return this._socketid;
  }

  Join(player) {
    player.join(this._pincode);
  }
}
module.exports = Lobby;
