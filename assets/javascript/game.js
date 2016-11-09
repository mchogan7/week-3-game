


//Clears choose a letter text.

document.addEventListener("keypress", ready);
function ready() {
    document.getElementById("gameStart").innerHTML = " ";
}
//This function triggers the drawing animation. Feed it the element 'name' of the path.
function animate(element) {
    var path = document.querySelector(element);
    var length = path.getTotalLength();
    // Makes path visible before animation
    path.style.opacity = "1";
    // Resets stroke length to 0
    path.style.transition = path.style.WebkitTransition = 'none';
    // Sets initial positions
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path.getBoundingClientRect();
    // Define our transition
    path.style.transition = path.style.WebkitTransition =
        'stroke-dashoffset 1s ease-in-out';
    // Begins Trace
    path.style.strokeDashoffset = '0';
}

// Gather Global variabless
var words = ["triceratops", "tyrannosaurus", "apatosaurus", "brachiosaurus", "gallimimus", "stegosaurus", "velociraptor", "dilophosaurus", "pterosaur"]

var wins = 0;

var losses = 0;

var guesses = 6;

var guessBox = document.getElementById('blanks')




// Writes to HTML score boxes

document.getElementById('winbox').innerHTML = wins;

document.getElementById('guessesLeft').innerHTML = guesses;



// Start the Game
if (ready) {

    function game() {
        // Empty array to store guessed letters.
        var step = 6;
        var usedLetters = []
        var clear = document.getElementsByClassName('reset');
        for (var i = 0; i < clear.length; i++) {
            clear[i].style.opacity = "0";
        }

        // This section sets the default state of the game. Generates new random word.
        document.getElementById('usedBox').innerHTML = usedLetters;
        // Generate random word from word list.
        var targetWord = words[Math.floor(Math.random() * words.length)];
        guessBox.innerHTML = "";
        //Writes guess to html.
        document.getElementById('guessesLeft').innerHTML = (guesses = 6);
        //Creates dashes in html equal to the length of the word.
        for (var i = 0; i < targetWord.length; i++) {
            guessBox.innerHTML += '_';
        }
        //Takes user input and applies the game logic... messily
        document.onkeyup = function(event) {
            document.getElementById('loseBox').innerHTML = "";
            if (targetWord.indexOf(event.key) == -1 && usedLetters.indexOf(event.key) == -1) {
                guesses--;
                document.getElementById('guessesLeft').innerHTML = guesses;
            }

            if (usedLetters.indexOf(event.key) == -1) {
                usedLetters.push(event.key);
                document.getElementById('usedBox').innerHTML = usedLetters;
            }
			
			 for (var i = 0; i < targetWord.length; i++) {
                if (targetWord[i] === event.key) {
                    guessBox.innerHTML = guessBox.innerHTML.substr(0, i) + event.key + guessBox.innerHTML.substr(i + 1);
                }
            }
                if (guessBox.innerHTML === targetWord) {
                	wins++;
                    document.getElementById('winbox').innerHTML = wins;
                    console.log(wins);
                    document.getElementById('loseBox').innerHTML = "You have saved the dinos! For now....<br>(press any key to continue)";
                    document.onkeyup = function(event) {
                        game();
                    }
                

            }
            //triggering animations and win/lose notifications
			if (guesses === 0) {
				document.getElementById('loseBox').innerHTML = "The dinosaurs are now extinct because of YOU. <br>(push any key to try again)";
                animate('.Anim6a');
                animate('.Anim6b');
                animate('.Anim6c');
                animate('.Anim6d');
                animate('.Anim6e');
                animate('.Anim6f');
                document.getElementById('eye').style.opacity = "0";
                document.onkeyup = function(event) {
                    game();
                }
            }
            if (guesses === 5 && step === 6) {
				animate('.Anim1a');
                animate('.Anim1');
                step = 5;
            }

            if (guesses === 4 && step === 5) {
				animate('.Anim2');
                step = 4;
            }

            if (guesses === 3 && step === 4) {
				animate('.Anim3');
                step = 3;
            }

            if (guesses === 2 && step === 3) {
				animate('.Anim4');
                step = 2;
            }

            if (guesses === 1 && step === 2) {
                animate('.Anim5');
                step = 1
			}
        }
	 }
    game();
}


