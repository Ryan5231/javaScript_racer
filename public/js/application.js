numOfPlayers = 2;
$(document).ready(function() {
  $.get('/gameinfo/'+gameID).done(function(data){
  var player1 = new Player(data.player1,81,0);
  var player2 = new Player(data.player2,80,1);
  var game = new Game(player1, player2, data.trackLength);
  $(document).on('keyup', function(event) {
  game.startTimer();
  game.onKeyUp(event.which);
    });
  });
});

function Player(player_id,keyCode,playerNumber) {
  this.playerNumber = playerNumber;
  this.player_id = player_id;
  this.position = 0;
  this.keyCode = keyCode;
}

function Game(player1, player2, trackLength) {
  this.player1 = player1;
  this.player2 = player2;
  this.timerTrigger = false;
  this.winner = null;
  this.trackLength = trackLength;

  this.renderTrack = function(){
    this.renderStrip();
    this.renderCells();
  };

  this.renderStrip = function(){
    for (var i=0; i<numOfPlayers;i++) {
      $('table').append('<tr class=player_strip></tr>');
    }
  };

  this.renderCells = function(){
    for (var i=0; i<this.trackLength;i++){
      $('.player_strip').append('<td></td>');
    }
  };

  this.renderTrack();
  this.renderPlayers(player1);
  this.renderPlayers(player2);
}

Game.prototype = {
  onKeyUp: function(keyCode) {
    if (keyCode==this.player1.keyCode) {
      (this.player1.position+=1);
      this.renderPlayers(this.player1);
    }else if (keyCode==this.player2.keyCode) {
      (this.player2.position+=1);
      this.renderPlayers(this.player2);
    }
    this.endGame();
  },

  endGame: function(){
    if (this.player1.position == (this.trackLength - 1)){
      this.winner = this.player1;
      this.gameTimer();
    } else if (this.player2.position == (this.trackLength - 1)){
      this.winner = this.player2;
      this.gameTimer();
    }
    this.endGameInfo();
  },

  endGameInfo: function() {
    if (this.winner === null){
    }else{
      alert(this.winner.player_id + " has won!");
      $(document).unbind('keyup');
      $.ajax({
        url: "/gameinfo/" + gameID,
        type: "PUT",
        data: {player_id : this.winner.player_id, winning_time : this.gameTime}}).done(function(data){alert(data);});
    }
  },

  renderPlayers: function(player){
    var playerNumber = player.playerNumber;
    var position = player.position;
    $(".player_strip:eq("+playerNumber+")").children().eq(position).addClass('active');
  },

  startTimer: function(){
    if (this.timerTrigger) {
    }else{
      this.timerTrigger = true;
      startDate = new Date();
      this.startTime = startDate.getTime();
    }
  },

  endTimer: function(){
    endDate = new Date();
    this.endTime = endDate.getTime();
  },

  gameTimer: function(){
    this.endTimer();
    this.gameTime = ((this.endTime - this.startTime)/1000);
    return this.gameTime;
  }
};
