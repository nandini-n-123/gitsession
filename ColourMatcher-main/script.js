// Counter function from counter.js
function setupCounter(element) {
    let counter = 0;
    const setCounter = (count) => {
        counter = count;
        element.innerHTML = `count is ${counter}`;
    };
    element.addEventListener('click', () => setCounter(counter + 1));
    setCounter(0);
}

// Script logic from script.js
const colors = [
    { name: 'RED', code: '#FF6B6B' },
    { name: 'BLUE', code: '#45B7D1' },
    { name: 'GREEN', code: '#96E6A1' },
    { name: 'YELLOW', code: '#FFD93D' },
    { name: 'PURPLE', code: '#B8A9C6' },
    { name: 'ORANGE', code: '#FFA07A' }
];

let score = 0;
let timeLeft = 30;
let timer;
let isPlaying = false;
let lastClickTime = 0;

const gameOverModal = new bootstrap.Modal(document.getElementById('gameOverModal'));
const colorWord = document.getElementById('colorWord');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const finalScoreElement = document.getElementById('finalScore');
const startButton = document.getElementById('startButton');
const buttonContainer = document.getElementById('buttonContainer');
const introPage = document.getElementById('introPage');
const gamePage = document.getElementById('gamePage');
const playButton = document.getElementById('playButton');

function showIntro() {
    gamePage.classList.add('d-none');
    introPage.classList.remove('d-none');
    isPlaying = false;
    clearInterval(timer);
}

function showGame() {
    introPage.classList.add('d-none');
    gamePage.classList.remove('d-none');
}

function createColorButtons() {
    buttonContainer.innerHTML = colors.map(color => `
        <div class="col-6">
            <button class="color-button animate__animated animate__fadeIn" 
                    style="background-color: ${color.code}" 
                    onclick="checkColor('${color.name}')">
                ${color.name}
            </button>
        </div>
    `).join('');
}

function updateDisplay() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const displayColor = colors[Math.floor(Math.random() * colors.length)];
    
    colorWord.textContent = randomColor.name;
    colorWord.style.color = displayColor.code;
    lastClickTime = Date.now();
    
    // Add animation to color text
    colorWord.classList.remove('animate__bounceIn');
    void colorWord.offsetWidth; // Trigger reflow
    colorWord.classList.add('animate__bounceIn');
}

function checkColor(selectedColor) {
    if (!isPlaying) return;
    
    if (selectedColor === colorWord.textContent) {
        let pointsEarned = 10;
        const responseTime = (Date.now() - lastClickTime) / 1000;
        
        // Bonus points for quick responses
        if (responseTime < 1) {
            pointsEarned += 5;
        }
        
        score += pointsEarned;
        scoreElement.textContent = score;
        
        // Enhanced visual feedback
        scoreElement.classList.remove('scale-up');
        void scoreElement.offsetWidth; // Trigger reflow
        scoreElement.classList.add('scale-up');
    }
    
    updateDisplay();
}

function updateTimer() {
    timerElement.textContent = timeLeft;
    if (timeLeft === 0) {
        endGame();
    } else {
        timeLeft--;
    }
}

function startGame() {
    showGame();
    isPlaying = true;
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    
    startButton.style.display = 'none';
    
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
    
    createColorButtons();
    updateDisplay();
    
    gameOverModal.hide();
}

function endGame() {
    isPlaying = false;
    clearInterval(timer);
    finalScoreElement.textContent = score;
    gameOverModal.show();
    startButton.style.display = 'block';
}

// Event Listeners
startButton.addEventListener('click', startGame);
playButton.addEventListener('click', () => {
    showGame();
    startGame();
});

// Initialize
createColorButtons();
