angular.module('rescour.services')
    .service('Utilities', function () {


        this.basicMatch = function(b, s) {
            var base = new String(b);
            var str = new String(s);
            str.toString();
            base.toString();

            // If the string is equal to the word, perfect match.
            if (str == base) return 1;

            //if it's not a perfect match and is empty return 0
            if (base == "") return 0;

            var runningScore = 0,
                charScore,
                finalScore,
                lString = str.toLowerCase(),
                strLength = str.length,
                lWord = base.toLowerCase(),
                wordLength = base.length,
                idxOf,
                startAt = 0;

            for (var i = 0; i < wordLength; ++i) {

                idxOf = lString.indexOf(lWord[i], startAt);

                if (-1 === idxOf) {
                    /* this would allow for typos in the search string */
                    charScore = -0.1 / idxOf;
                } else if (startAt === idxOf) {
                    charScore = 0.20 * ( wordLength / (idxOf + 1));
                } else {
                    charScore = 0.1;
                    if (str[idxOf - 1] === ' ') charScore += 0.8;
                }

                if (str[idxOf] === base[i]) charScore += 0.1;
                runningScore += charScore;
                startAt = idxOf + 1;
            }

            // Reduce penalty for longer strings.
            finalScore = 0.5 * (runningScore / strLength + runningScore / wordLength)

            if ((lWord[0] === lString[0]) && (finalScore < 0.80)) {
                finalScore += 0.20;
            }
            if ((lWord[0] === lString[0]) && (finalScore > 1.00)) {
                finalScore = 0.999999
            }

            return finalScore;
        };

        this.generateString = function(numWords, wordLength) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" +
                "0123456789~!@#=";
            var length = wordLength || 6;
            for(var x = 0; x < numWords; x++) {
                for(var i = 0; i <= length - 1; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                if (x < numWords - 1) text += ' ';
            }
            return text;
        };

        this.generateNum = function(low, high, isFloat) {
            var randomNum;
            if(isFloat) {
                randomNum = Math.random() * (high - low) + low
            } else {
                randomNum = Math.floor(Math.random() * (high - low) + low);
            }
            return randomNum;
        };

        this.randomTime = function() {
            return new Date(new Date(2014,1,30).getTime() + Math.random() * (new Date(2011,10,30).getTime()
                - new Date(1900, 1,30).getTime()));
        };

        this.randomDate = function(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
        };

        this.randomUrl = function(length) {
            var randomString = '';
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" +
                "0123456789";
            for(var i = 0; i <= length - 1; i++) {
                randomString += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return 'www.' + randomString + '.com';
        };

    });