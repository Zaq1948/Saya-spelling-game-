let currentWord = null;
let wins = 0;
let fails = 0;
let wordsLeft = words.length;  // Uses the words list from words.js
let attempt = 1;
const winSounds = ['win1', 'win2', 'win3', 'win4', 'win5', 'win6'];
const sadSounds = ['sad1', 'sad2', 'sad3', 'sad4'];

function preloadSounds() {
    winSounds.forEach(sound => {
        const audio = document.getElementById(sound);
        audio.load();
    });
    sadSounds.forEach(sound => {
        const audio = document.getElementById(sound);
        audio.load();
    });
    document.getElementById('end1').load();
}

function playSound(id) {
    const sound = document.getElementById(id);
    if (sound) {
        sound.play();
    }
}

function updateStatusBar() {
    document.getElementById('win-count').textContent = wins;
    document.getElementById('fail-count').textContent = fails;
    document.getElementById('words-left').textContent = wordsLeft;
}

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function showDefinition() {
    currentWord = getRandomWord();
    document.getElementById('definition-text').textContent = currentWord.definition;
    wordsLeft--;
    attempt = 1; // Reset attempt count for each new word
    updateStatusBar();
}

function checkAnswer() {
    const userAnswer = document.getElementById('word-input').value.trim().toLowerCase();
    document.getElementById('feedback').classList.remove('correct', 'wrong');
    
    if (userAnswer === currentWord.word.toLowerCase()) {
        document.getElementById('feedback').textContent = "Correct!";
        document.getElementById('feedback').classList.add('correct');
        playSound(winSounds[Math.floor(Math.random() * winSounds.length)]);
        wins++;
        setTimeout(showDefinition, 2000);
    } else {
        if (attempt < 3) {
            document.getElementById('feedback').textContent = "Wrong, try again!";
            document.getElementById('feedback').classList.add('wrong');
            playSound(sadSounds[Math.floor(Math.random() * sadSounds.length)]);
            attempt++;

            if (attempt === 3) {
                document.getElementById('feedback').textContent = `Here's a hint! Translation: ${currentWord.translation}`;
            }
        } else {
            document.getElementById('feedback').textContent = `Wrong again! The correct word was: ${currentWord.word}`;
            document.getElementById('feedback').classList.add('wrong');
            playSound(sadSounds[Math.floor(Math.random() * sadSounds.length)]);
            fails++;
            setTimeout(showDefinition, 2000);
        }
    }
    
    updateStatusBar();
    document.getElementById('word-input').value = ''; // Clear input after each submission
}

document.getElementById('submit-button').addEventListener('click', checkAnswer);

window.onload = function() {
    preloadSounds(); // Preload sounds on page load to allow interaction
    showDefinition();
    updateStatusBar();
}
