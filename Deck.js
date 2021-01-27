"use strict";
exports.__esModule = true;
exports.Suits = exports.Values = exports.Deck = exports.Card = void 0;
var RandomNumber_1 = require("./RandomNumber");
var Suits;
(function (Suits) {
    Suits[Suits["Hearts"] = 1] = "Hearts";
    Suits[Suits["Clubs"] = 2] = "Clubs";
    Suits[Suits["Diamonds"] = 3] = "Diamonds";
    Suits[Suits["Spades"] = 4] = "Spades";
})(Suits || (Suits = {}));
exports.Suits = Suits;
var Values;
(function (Values) {
    Values[Values["Joker"] = 0] = "Joker";
    Values[Values["Ace"] = 1] = "Ace";
    Values[Values["Two"] = 2] = "Two";
    Values[Values["Three"] = 3] = "Three";
    Values[Values["Four"] = 4] = "Four";
    Values[Values["Five"] = 5] = "Five";
    Values[Values["Six"] = 6] = "Six";
    Values[Values["Seven"] = 7] = "Seven";
    Values[Values["Eight"] = 8] = "Eight";
    Values[Values["Nine"] = 9] = "Nine";
    Values[Values["Ten"] = 10] = "Ten";
    Values[Values["Jack"] = 11] = "Jack";
    Values[Values["Queen"] = 12] = "Queen";
    Values[Values["King"] = 13] = "King";
})(Values || (Values = {}));
exports.Values = Values;
var ValueNames;
(function (ValueNames) {
    ValueNames["Joker"] = "Joker";
    ValueNames["Ace"] = "Ace";
    ValueNames["Two"] = "Two";
    ValueNames["Three"] = "Three";
    ValueNames["Four"] = "Four";
    ValueNames["Five"] = "Five";
    ValueNames["Six"] = "Six";
    ValueNames["Seven"] = "Seven";
    ValueNames["Eight"] = "Eight";
    ValueNames["Nine"] = "Nine";
    ValueNames["Ten"] = "Ten";
    ValueNames["Jack"] = "Jack";
    ValueNames["Queen"] = "Queen";
    ValueNames["King"] = "King";
})(ValueNames || (ValueNames = {}));
var Deck = /** @class */ (function () {
    function Deck(jokers) {
        this.deck = jokers
            ? [
                new Card(Suits.Hearts, Values.Joker),
                new Card(Suits.Spades, Values.Joker),
            ]
            : [];
        if (jokers !== undefined) {
            //Suits
            for (var i = 1; i <= 4; i++) {
                //Values
                for (var j = 1; j <= 13; j++) {
                    this.deck.push(new Card(i, j));
                }
            }
        }
    }
    //Returns number of cards left in deck
    Deck.prototype.size = function () {
        return +this.deck.length;
    };
    //Returns if can draw a card
    Deck.prototype.canDraw = function () {
        return +this.size() > 0;
    };
    //Adds a card to top of deck
    Deck.prototype.addToTop = function (card) {
        this.deck.unshift(card);
    };
    //Adds a card to the bottom of the deck
    Deck.prototype.addToBottom = function (card) {
        this.deck.push(card);
    };
    //Adds a deck to top of the deck
    Deck.prototype.addDecktoTop = function (deck) {
        while (deck.canDraw()) {
            this.addToTop(deck.draw());
        }
    };
    //Adds a deck to bottom of the deck
    Deck.prototype.addDeckToBottom = function (deck) {
        while (deck.canDraw()) {
            this.addToBottom(deck.draw());
        }
    };
    //returns card from top of deck
    Deck.prototype.draw = function () {
        if (this.canDraw()) {
            return this.deck.shift();
        }
        return null;
    };
    //Shuffles deck
    Deck.prototype.shuffle = function () {
        if (this.canDraw()) {
            var shuffle = [];
            var rand = new RandomNumber_1.RandomWholeNumber();
            rand.setMinMax(0, 5000);
            while (this.canDraw()) {
                shuffle.push({ card: this.draw(), shuffleValue: rand.next() });
            }
            shuffle.sort(function (a, b) {
                return a.shuffleValue - b.shuffleValue;
            });
            for (var _i = 0, shuffle_1 = shuffle; _i < shuffle_1.length; _i++) {
                var card = shuffle_1[_i];
                this.deck.push(card.card);
            }
        }
    };
    return Deck;
}());
exports.Deck = Deck;
var Card = /** @class */ (function () {
    function Card(suit, value) {
        this.suit = suit;
        this.value = value;
    }
    Card.prototype.getSuit = function () {
        return +this.suit;
    };
    Card.prototype.getValue = function () {
        return +this.value;
    };
    Card.prototype.isRed = function () {
        return +this.suit % 2 === 1;
    };
    Card.prototype.isBlack = function () {
        return !this.isRed();
    };
    Card.prototype.compareValue = function (card) {
        if (card.getValue() === this.getValue()) {
            return 0;
        }
        return this.getValue() < card.getValue() ? -1 : 1;
    };
    Card.prototype.suitToString = function () {
        return Suits[+this.suit];
    };
    Card.prototype.valueToString = function () {
        return Values[+this.value];
    };
    Card.prototype.toString = function () {
        return this.valueToString() + " of " + this.suitToString();
    };
    return Card;
}());
exports.Card = Card;
