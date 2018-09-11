class Player {
  constructor(name,id) {
    this._name = name;
    this._id = id;
    this._score = 0;
  }

  get score () {
    return this._score;
  }

  SetScore(amount){
    this._score = amount;
  }

  AddToScore(amount){
    this._score+= amount;
  }

  get id (){
    return this._id;
  }

  get name (){
    return this._name;
  }
}
