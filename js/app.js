/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var cardDeckModel = function() {
  var self = this;
  self.varGameTimer = ko.observable();
  self.showCardsTimeout = ko.observable();
  self.cardsTimedOut = ko.observable(false);
  self.playerMoves = ko.observable(0);
  self.playerRating = ko.observableArray([{name: 1}, {name: 2}, {name: 3}]);
  self.cardsOpened = ko.observableArray();
  self.pairsFound = ko.observable(0);
  self.cardDeckOriginal = [
    {cardId: "diamonda", card: "fa fa-diamond", isOpen: ko.observable(false), cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "diamondb", card: "fa fa-diamond", isOpen: ko.observable(false), cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "banka", card: "fa fa-bank", isOpen: ko.observable(false), cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "bankb", card: "fa fa-bank", isOpen: ko.observable(false), cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "anchora", card: "fa fa-anchor", isOpen: ko.observable(false), cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "anchorb", card: "fa fa-anchor", isOpen: ko.observable(false), cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "bolta", card: "fa fa-bolt", isOpen: ko.observable(false), cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "boltb", card: "fa fa-bolt", isOpen: ko.observable(false), cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "cubea", card: "fa fa-cube", isOpen: ko.observable(false), cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "cubeb", card: "fa fa-cube", isOpen: ko.observable(false), cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "leafa", card: "fa fa-leaf", isOpen: ko.observable(false), cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "leafb", card: "fa fa-leaf", isOpen: ko.observable(false), cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "bicyclea", card: "fa fa-bicycle", isOpen: ko.observable(false), cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "bicycleb", card: "fa fa-bicycle", isOpen: ko.observable(false), cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "bomba", card: "fa fa-bomb", isOpen: ko.observable(false), cardPair: "a", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }},
    {cardId: "bombb", card: "fa fa-bomb", isOpen: ko.observable(false), cardPair: "b", cardClasses: ko.observable("card"), cardClick: function() { self.playerMoves(self.playerMoves() + 1); this.cardClasses("card open show"); this.isOpen(true); matchGameApp.cardsOpened.push(this.card + "_" + this.cardPair); }}
  ];
  self.cardDeck = ko.observableArray(shuffle(self.cardDeckOriginal));
  self.cardsTimeout = ko.observable(3);
  self.gameTimer = ko.observable(0);

  this.checkTheGame = ko.computed(function() {
    if (self.cardsOpened().length >= 2) {
      if ((self.cardsOpened()[0].split("_")[0] === self.cardsOpened()[1].split("_")[0]) && !(self.cardsOpened()[0].split("_")[1] === self.cardsOpened()[1].split("_")[1])) {
        var cardIdA = self.cardsOpened()[0].split("_")[0] + self.cardsOpened()[0].split("_")[1];
        cardIdA = cardIdA.replace("fa fa-", "");
        var cardIdB = self.cardsOpened()[1].split("_")[0] + self.cardsOpened()[1].split("_")[1];
        cardIdB = cardIdB.replace("fa fa-", "");
        ko.utils.arrayFilter(self.cardDeck(), function(card) {
          if (card.cardId.includes(cardIdA)) {
            if (card.cardPair.includes("a")) {
              card.cardPair = "c";
            } else if (card.cardPair.includes("b")) {
              card.cardPair = "d";
            }
          }
          if (card.cardId.includes(cardIdB)) {
            if (card.cardPair.includes("a")) {
              card.cardPair = "c";
            } else if (card.cardPair.includes("b")) {
              card.cardPair = "d";
            }
          }
        });
        self.pairsFound(self.pairsFound() + 1);
        self.cardsOpened.removeAll();
      } else {
        var cardIdA = self.cardsOpened()[0].split("_")[0] + self.cardsOpened()[0].split("_")[1];
        cardIdA = cardIdA.replace("fa fa-", "");
        var cardIdB = self.cardsOpened()[1].split("_")[0] + self.cardsOpened()[1].split("_")[1];
        cardIdB = cardIdB.replace("fa fa-", "");
        ko.utils.arrayFilter(self.cardDeck(), function(card) {
          if (card.cardId.includes(cardIdA)) {
            card.cardClasses("card");
          }
          if (card.cardId.includes(cardIdB)) {
            card.cardClasses("card");
          }
        });
        self.cardsOpened.removeAll();
      }
      if (self.playerMoves() >= 24) {
        self.playerRating.remove(function (item) { return item.name === 3; });
      }
      if (self.playerMoves() >= 30) {
        self.playerRating.remove(function (item) { return item.name === 2; });
      }
    }
    if (self.pairsFound() == 8) {
      clearInterval(self.varGameTimer());
      (function($) {
        $('#gameWinModal').show();
      })(jQuery);
    }
    if (self.cardsTimeout() == 3 && self.cardsTimedOut() == false) {
      Object.keys(self.cardDeck()).forEach(function(card) {
        self.cardDeck()[card].cardClasses("card show");
      });
      self.cardsTimedOut(true);
    }
    if (self.cardsTimeout() == 0 && self.cardsTimedOut() == true) {
      clearInterval(self.showCardsTimeout());
      Object.keys(self.cardDeck()).forEach(function(card) {
        self.cardDeck()[card].cardClasses("card");
      });
      self.cardsTimedOut(false);
    }
  }, this);
  self.gameReset = function() {
    self.cardDeck(shuffle(self.cardDeckOriginal));
    Object.keys(self.cardDeck()).forEach(function(card) {
      self.cardDeck()[card].cardClasses("card");
    });
    ko.utils.arrayFilter(self.cardDeck(), function(card) {
      if (card.cardPair.includes("c")) {
        card.cardPair = "a";
      }
      if (card.cardPair.includes("d")) {
        card.cardPair = "b";
      }
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
  self.varGameTimer(setInterval(function() { self.gameTimer(self.gameTimer() + 1); }, 1000));
  self.showCardsTimeout(setInterval(function() { self.cardsTimeout(self.cardsTimeout() - 1); }, 1000));
}

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
