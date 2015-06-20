function Game() {
  this.secretNum = Math.floor((Math.random() * 100) +1);
  this.lives = 5;
  this.guesses = [];
}

Game.prototype.checkGuess = function(guess) {
  if (guess == this.secretNum) {
    $('body').css('background-color', 'white');
    $('#title').text('Congratulations! You guessed the number!');
    return;
  }
}

function submit(game) {
  var guess = $('#guess').val();

  if (guess >= 1 && guess <= 100) {
    game.checkGuess(guess);
  } else {
    $('#title').html('Invalid guess!<br>1-100 only!')
    $('#guess').val('').focus();
  };
}

$(document).ready(function() {
  var game = new Game;

  $('#submit').on('click', function() {
    submit(game);
  })

  $('#newgame').on('click', function() {
    game = new Game;
    $('body').css('background-color', 'black');
    $('#guess').val('');
    $('#title').html('Guess the number!<br>(1 - 100)');
  });

  $('#hint').on('click', function() {
    $('#guess').val(game.secretNum);
  })
});
