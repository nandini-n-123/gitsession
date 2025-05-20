// Get references to the player controls and audio element
const playButton = document.querySelector('.fa-circle-play');
const audioElement = document.querySelector('audio');

// Add an event listener to the play button
playButton.addEventListener('click', function () {
    if (audioElement.paused) {
        audioElement.play();
        playButton.classList.add('fa-pause');
        playButton.classList.remove('fa-circle-play');
    } else {
        audioElement.pause();
        playButton.classList.add('fa-circle-play');
        playButton.classList.remove('fa-pause');
    }
});

// Update the progress bar as the audio plays
const progressBar = document.querySelector('.progress-bar');
audioElement.addEventListener('timeupdate', function () {
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;
    const progressPercentage = (currentTime / duration) * 100;
    progressBar.value = progressPercentage;
});

// Handle user interaction with the progress bar
progressBar.addEventListener('input', function () {
    const seekTime = (progressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});

// Handle previous and next track buttons if needed
const previousButton = document.querySelector('.fa-backward-step');
const nextButton = document.querySelector('.fa-forward-step');

// Add event listeners for previous and next track buttons
// You can implement logic to change the audio source here

// Function to change the source of the audio element
function changeAudioSource(src) {
    audioElement.src = src;
    audioElement.play();
}

// Example usage:
// previousButton.addEventListener('click', function () {
//     // Change the source to the previous track
//     changeAudioSource('path-to-previous-track.mp3');
// });

// nextButton.addEventListener('click', function () {
//     // Change the source to the next track
//     changeAudioSource('path-to-next-track.mp3');
// });
