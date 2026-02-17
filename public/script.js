// Custom Video Player
function initVideoPlayer() {
    const video = document.getElementById('vslVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    const progressFilled = document.getElementById('progressFilled');
    const videoPlayer = document.querySelector('.custom-video-player');

    if (!video || !playPauseBtn) return;

    function togglePlay() {
        if (video.paused) {
            video.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            video.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    // Click anywhere on the video container to play/pause
    video.addEventListener('click', togglePlay);
    playPauseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        togglePlay();
    });

    // Eased progress bar: fast at start, slows down toward end
    // Uses a power curve so early % of video maps to more bar width
    function easedProgress(linearPercent) {
        // Square root easing: progress bar moves fast early, slow later
        return Math.pow(linearPercent / 100, 0.6) * 100;
    }

    video.addEventListener('timeupdate', () => {
        if (video.duration && isFinite(video.duration)) {
            const linearPercent = Math.min((video.currentTime / video.duration) * 100, 100);
            const easedPercent = easedProgress(linearPercent);
            progressFilled.style.width = easedPercent + '%';
        }
    });

    // Show/hide play button overlay
    video.addEventListener('pause', () => {
        videoPlayer.classList.add('controls-visible');
    });

    video.addEventListener('play', () => {
        setTimeout(() => {
            if (!video.paused) {
                videoPlayer.classList.remove('controls-visible');
            }
        }, 1500);
    });

    videoPlayer.addEventListener('mouseenter', () => {
        videoPlayer.classList.add('controls-visible');
    });

    videoPlayer.addEventListener('mouseleave', () => {
        if (!video.paused) {
            videoPlayer.classList.remove('controls-visible');
        }
    });

    video.addEventListener('ended', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        videoPlayer.classList.add('controls-visible');
        progressFilled.style.width = '100%';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initVideoPlayer();
});
