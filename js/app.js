/*
 * Initialize a Knockout ModelView
 */
var cardDeckModel = function() {
  /*
   * Create a Timer to count how many seconds have passed since the game start.
   * Create Countdown timer to briefly show the Cards for the player.
   * Create a counter to register how many moves the player have done.
   * Create an object(Array) to set the Rating Stars.
   * Create an object(Array) to track cards that have been open in the current
   * game.
   * Create an Array to track how many card pairs have been found.
   */
  var self = this;
  self.varGameTimer = ko.observable();
  self.showCardsTimeout = ko.observable();
  self.cardsTimedOut = ko.observable(false);
  self.playerMoves = ko.observable(0);
  self.playerRating = ko.observableArray([{name: 1}, {name: 2}, {name: 3}]);
  self.cardsOpened = ko.observableArray();
  self.pairsFound = ko.observable(0);
  /*
   * Create an Array to hold the Card Deck.
   */
  self.cardDeckOriginal = [
    {cardId: "diamonda", card: "fa fa-diamond", cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "diamondb", card: "fa fa-diamond", cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "banka", card: "fa fa-bank", cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "bankb", card: "fa fa-bank", cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "anchora", card: "fa fa-anchor", cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "anchorb", card: "fa fa-anchor", cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "bolta", card: "fa fa-bolt", cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "boltb", card: "fa fa-bolt", cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "cubea", card: "fa fa-cube", cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "cubeb", card: "fa fa-cube", cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "leafa", card: "fa fa-leaf", cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "leafb", card: "fa fa-leaf", cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "bicyclea", card: "fa fa-bicycle", cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "bicycleb", card: "fa fa-bicycle", cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "bomba", card: "fa fa-bomb", cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "bombb", card: "fa fa-bomb", cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }}
  ];
  /*
   * Shuffle the Card Deck and set the Timers.
   */
  self.cardDeck = ko.observableArray(shuffle(self.cardDeckOriginal));
  self.cardsTimeout = ko.observable(3);
  self.gameTimer = ko.observable(0);

  /*
   * Create an KO Computed object to track the game status.
   */
  this.checkTheGame = ko.computed(function() {
    /*
     * Every time the player open 2 Cards check if it is a Match, if so
     * count a valid Card Pair.
     * Clear the cardsOpened array.
     */
    if (self.cardsOpened().length >= 2) {
      if ((self.cardsOpened()[0].split("_")[0] === self.cardsOpened()[1].split("_")[0]) && !(self.cardsOpened()[0].split("_")[1] === self.cardsOpened()[1].split("_")[1])) {
        self.pairsFound(self.pairsFound() + 1);
        self.cardsOpened.removeAll();
      /*
       * If it is not a match then find what cards are opened and close then.
       * Clear the cardsOpened array.
       */
      } else {
        var cardIdA = self.cardsOpened()[0].split("_")[0] + self.cardsOpened()[0].split("_")[1];
        cardIdA = cardIdA.replace("fa fa-", "");
        var cardIdB = self.cardsOpened()[1].split("_")[0] + self.cardsOpened()[1].split("_")[1];
        cardIdB = cardIdB.replace("fa fa-", "");
        ko.utils.arrayFilter(self.cardDeck(), function(card) {
          if (card.cardId.includes(cardIdA)) {
            setTimeout(function () { card.cardClasses("card"); }, 750);
          }
          if (card.cardId.includes(cardIdB)) {
            setTimeout(function () { card.cardClasses("card"); }, 750);
          }
        });
        self.cardsOpened.removeAll();
      }
      /*
       * If the Player do more than 24 moves, remove a Star.
       * if the Player reachs 30 moves leave one Star.
       */
      if (self.playerMoves() >= 24) {
        self.playerRating.remove(function (item) { return item.name === 3; });
      }
      if (self.playerMoves() >= 30) {
        self.playerRating.remove(function (item) { return item.name === 2; });
      }
    }
    /*
     * If the Player found the eight Pairs declare him/she a Winner showing the
     * Winner Modal.
     */
    if (self.pairsFound() == 8) {
      clearInterval(self.varGameTimer());
      (function($) {
        $('#gameWinModal').show();
      })(jQuery);
    }
    /*
     * At the game start check for the cardsTimeout and if it is equal 3 and
     * the cardsTimedOut is false, show the cards and set the cardsTimedOut
     * to true.
     */
    if (self.cardsTimeout() == 3 && self.cardsTimedOut() == false) {
      Object.keys(self.cardDeck()).forEach(function(card) {
        self.cardDeck()[card].cardClasses("card show");
      });
      self.cardsTimedOut(true);
    }
    /*
     * Everytime the cardsTimeout is zero and the cardsTimedOut is true clear
     * the showCardsTimeout and close all opened cards. Set the cardsTimedOut
     * to false.
     */
    if (self.cardsTimeout() == 0 && self.cardsTimedOut() == true) {
      clearInterval(self.showCardsTimeout());
      Object.keys(self.cardDeck()).forEach(function(card) {
        self.cardDeck()[card].cardClasses("card");
      });
      self.cardsTimedOut(false);
    }
  }, this);
  /*
   * Reset the Game. Reset all observables, timers and if the gameWinModal is
   * visible hide it.
   */
  self.gameReset = function() {
    self.cardDeck(shuffle(self.cardDeckOriginal));
    Object.keys(self.cardDeck()).forEach(function(card) {
      self.cardDeck()[card].cardClasses("card");
    });
    self.cardsOpened = ko.observableArray();
    self.playerRating([{name: 1}, {name: 2}, {name: 3}]);
    self.playerMoves(0);
    self.pairsFound(0)
    clearInterval(self.varGameTimer());
    self.gameTimer(0);
    self.varGameTimer(setInterval(function() { self.gameTimer(self.gameTimer() + 1); }, 1000));
    self.cardsTimeout(3);
    clearInterval(self.showCardsTimeout());
    self.showCardsTimeout(setInterval(function() { self.cardsTimeout(self.cardsTimeout() - 1); }, 1000));
    (function($) {
      if ($('#gameWinModal').is(":visible")) {
        $('#gameWinModal').hide();
      }
    })(jQuery);
  }
  /*
   * Start the timers.
   */
  self.varGameTimer(setInterval(function() { self.gameTimer(self.gameTimer() + 1); }, 1000));
  self.showCardsTimeout(setInterval(function() { self.cardsTimeout(self.cardsTimeout() - 1); }, 1000));
}

/*
 * Initialize the KO bindings.
 */
var matchGameApp = new cardDeckModel();
ko.applyBindings(matchGameApp);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
