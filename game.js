function Game() {
  this.secretNum = Math.floor((Math.random() * 100) +1);
  this.lives = 5;
  this.guesses = [];
}

Game.prototype.checkGuess = function(guess) {
  if (guess == this.secretNum) {
    $('body').css('background-color', 'white');
    $('#title').text('Congratulations! You guessed the number!');
    $('#guess').prop("readonly", true);
    return;
  } else {
    this.lives--;
    $('#lives').text('IIIII'.slice(0, this.lives));
    if (this.lives == 0) {
      $('#title').text('Out of lives! The number was ' + this.secretNum + '.');
      $('#guess').prop("readonly", true);
      return;
    }

    var difference = Math.abs(this.secretNum - guess),
        response;

    if (difference > 40) {
      response = 'Ice cold.';
    } else if (difference > 30) {
      response = 'Cold.';
    } else if (difference > 20) {
      response = 'Warm.';
    } else if (difference > 10) {
      response = 'Hot.';
    } else {
      response = 'On fire.';
    }
    this.guesses.push(guess + ' - ' + response);

    if (this.secretNum > guess) {
      response += '<br>Guess higher.'
    } else {
      response += '<br>Guess lower.'
    }

    $('#title').html(response);
    $('#guess').val('').focus();
  }
}

function submit(game) {
  var guess = $('#guess').val();
  if (guess >= 1 && guess <= 100) {
    game.checkGuess(+guess);
  } else {
    $('#title').html('Invalid guess!<br>1-100 only!')
    $('#guess').val('').focus();
  }
}

$(document).ready(function() {
  var game = new Game;

  $('#guess').focus();

  $('#submit').click(function() {
    submit(game);
  });
  $('#guess').keydown(function(e) {
    if (e.keyCode == 13) {
      submit(game);
    }
  });

  $('#newgame').click(function() {
    game = new Game;
    $('body').css('background-color', 'black');
    $('#guess').val('');
    $('#guess').prop("readonly", false);
    $('#title').html('Guess the number!<br>(1 - 100)');
  });

  $('#hint').click(function() {
    $('#guess').val(game.secretNum);
  })
});
