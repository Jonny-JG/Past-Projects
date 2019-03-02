var app = angular.module("PriceGame", []);

app.controller("GameController", ['$scope', function ($scope) {


  angular.element(document).ready(function () {
    document.getElementById("prize").style.display = 'none';
    document.getElementById("guessInput").value = "";
    document.getElementById("startButton").disabled = true;
    document.getElementById("guessInput").disabled = true;
    document.getElementById("submitGuess").disabled = true;
  });

  //Create Array of Prize Images
  var prizeImages = ['images/furniture.jpg', 'images/grill.jpg', 'images/television.jpg', 'images/tent.jpg', 'images/automobile.jpg'];
  //Create Array of Prize Images

  //Create Array of Prize Titles
  var prizeTitle = ['Patio Furniture', 'Barbecue Grill', 'Television', 'Camping Tent', 'Nissan Pathfinder'];
  //Creay Array of Prize Titles

  //Create Array of Prize Descriptions
  var prizeDescriptions = ['Fine funiture that will spruce up your outdoor patio!', 'A new stainless steel grill!', 'A 4k televison!', 'Camp in style with this new tent!', 'Enjoy a new vehicle!'];
  //Create Array of Prize Descriptions

  //Create Array of Prize Prices
  var prizePrices = ['1556', '787', '1290', '324', '34589'];
  //Create Array of Prize Prices

  $scope.getPrizeImage = function () {
    $scope.imageIndex = Math.floor(Math.random() * prizeImages.length);

    if (prizeImages[$scope.imageIndex] == undefined) {
      return;
    }

    $scope.image = [{
      src: prizeImages[$scope.imageIndex]
    }];
    document.getElementById("guessInput").value = "";
    document.getElementById("prize").style.display = '';
    document.getElementById("startButton").disabled = false;
    document.getElementById("prizeName").innerHTML = getTitle();
    document.getElementById("prizeDescription").innerHTML = getDescription();
  }

  getPrice = function () {
    return prizePrices[$scope.imageIndex];
  }

  getTitle = function () {
    return prizeTitle[$scope.imageIndex];
  }

  getDescription = function () {
    return prizeDescriptions[$scope.imageIndex];
  }

  winGame = function () {
    alert("You Won!!!");
    clearInterval($scope.timeLeft);
    document.getElementById("startButton").disabled = false;
    document.getElementById("prizeButton").disabled = false;
    document.getElementById("guessInput").disabled = true;
    document.getElementById("submitGuess").disabled = true;
    document.getElementById("guessInput").value = "";
    document.getElementById("userGuesses").innerHTML = "";
    document.getElementById("timer").innerHTML = "PLAY AGAIN?";
  }

  loseGame = function () {
    alert("You Lost!!!");
    document.getElementById("startButton").disabled = false;
    document.getElementById("prizeButton").disabled = false;
    document.getElementById("guessInput").disabled = true;
    document.getElementById("submitGuess").disabled = true;
    document.getElementById("guessInput").value = "";
    document.getElementById("userGuesses").innerHTML = "";
    document.getElementById("timer").innerHTML = "PLAY AGAIN?";
  }

  $scope.startGame = function () {

    document.getElementById("startButton").disabled = true;
    document.getElementById("prizeButton").disabled = true;
    document.getElementById("guessInput").disabled = false;
    document.getElementById("submitGuess").disabled = false;

    var gameTime = 30;
    $scope.timeLeft = setInterval(timerTick, 1000);

    function timerTick() {
      if (gameTime == 0) {
        document.getElementById("timer").innerHTML = gameTime + "s ";
        clearInterval($scope.timeLeft);
        loseGame();
      } else {
        document.getElementById("timer").innerHTML = gameTime + "s ";
        gameTime--;
      }
    }

  }

  $scope.checkGuess = function () {

    var playerGuess = document.getElementById("guessInput").value;
    var prizePrice = getPrice();
    console.log(playerGuess);
    console.log(prizePrice);

    if (+playerGuess < +prizePrice && +playerGuess > 0) {
      document.getElementById("userGuesses").innerHTML = playerGuess + " : too low!";
    } else if (+playerGuess > +prizePrice && +playerGuess > 0) {
      document.getElementById("userGuesses").innerHTML = playerGuess + " : too high!";
    } else if (+playerGuess == prizePrice && +playerGuess > 0) {
      winGame();
    }
  }

}])