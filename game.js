function Game() {
  this.secretNum = Math.floor((Math.random() * 100) +1);
  this.lives = 5;
  this.guesses = [];
  this.guessDiffs = [];
}

Game.prototype.checkGuess = function(guess) {
  var secretNum = this.secretNum;

  if (guess == secretNum) {
    $('body').css('background-color', 'white');
    $('#title').text('Congratulations! You guessed the number!');
    $('#guess').prop("readonly", true);
    return;
  } else {
    if (this.guesses.some(function(el) { return el == guess })) {
      $('#title').html('You\'ve already guessed that number!');
      $('#guess').val('').focus();
      return;
    }

    this.guesses.push(guess);

    this.lives--;
    $('#lives').text('IIIII'.slice(0, this.lives));
    if (this.lives == 0) {
      $('body').css('background-color', 'white');
      $('#title').html('Out of lives!<br>The number<br>was ' + this.secretNum + '.');
      $('#guess').prop("readonly", true);
      return;
    }

    var difference = Math.abs(secretNum - guess),
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
    $('#guesses').find('ol').append('<li>' + guess + ' - ' + response + '</li>');

    this.guessDiffs.push(difference);
    var lastIndex = this.guessDiffs.length - 1;
    if (lastIndex > 0) {
      if (this.guessDiffs[lastIndex] > this.guessDiffs[lastIndex - 1]) {
        response += '<br>Getting colder.'
      } else {
        response += '<br>Getting warmer.'
      }
    }

    if (secretNum > guess) {
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
    $('#guess').prop("readonly", false);
    $('#guess').val('').focus();
    $('#lives').text('IIIII');
    $('#guesses').find('ol').html('');
    $('#title').html('Guess the number!<br>(1 - 100)');
  });

  $('#hint').click(function() {
    $('#guess').val(game.secretNum);
  })
});
