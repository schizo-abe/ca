// Update progress bar
function updateProgressBar(slideNumber) {
    const totalSlides = 5;
    const progressPercentage = (slideNumber / totalSlides) * 100;
    
    // Update progress fill
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = progressPercentage + '%';
    }
}

// Multi-step form navigation
function nextSlide(currentSlide) {
    const currentSlideElement = document.querySelector(`[data-slide="${currentSlide}"]`);
    const nextSlideElement = document.querySelector(`[data-slide="${currentSlide + 1}"]`);
    
    // Validate current slide
    if (!validateSlide(currentSlide)) {
        return;
    }
    
    // Hide current slide
    if (currentSlideElement) {
        currentSlideElement.classList.remove('active');
    }
    
    // Show next slide
    if (nextSlideElement) {
        nextSlideElement.classList.add('active');
        updateProgressBar(currentSlide + 1);
    }
}

function prevSlide(currentSlide) {
    const currentSlideElement = document.querySelector(`[data-slide="${currentSlide}"]`);
    const prevSlideElement = document.querySelector(`[data-slide="${currentSlide - 1}"]`);
    
    // Hide current slide
    if (currentSlideElement) {
        currentSlideElement.classList.remove('active');
    }
    
    // Show previous slide
    if (prevSlideElement) {
        prevSlideElement.classList.add('active');
        updateProgressBar(currentSlide - 1);
    }
}

function validateSlide(slideNumber) {
    let isValid = true;
    
    switch(slideNumber) {
        case 1:
            const nameInput = document.getElementById('name');
            if (!nameInput.value.trim()) {
                nameInput.style.borderColor = '#E52D27';
                isValid = false;
            } else {
                nameInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
            break;
            
        case 2:
            const radioInput = document.querySelector('input[name="newToClipping"]:checked');
            if (!radioInput) {
                const radioOptions = document.querySelectorAll('.radio-option');
                radioOptions.forEach(option => {
                    option.style.borderColor = '#E52D27';
                    option.classList.remove('selected');
                });
                isValid = false;
            } else {
                const radioOptions = document.querySelectorAll('.radio-option');
                radioOptions.forEach(option => {
                    option.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    if (option.querySelector('input[type="radio"]').checked) {
                        option.classList.add('selected');
                    } else {
                        option.classList.remove('selected');
                    }
                });
            }
            break;
            
        case 3:
            const dreamIncomeInput = document.getElementById('dreamIncome');
            if (!dreamIncomeInput.value.trim()) {
                dreamIncomeInput.style.borderColor = '#E52D27';
                isValid = false;
            } else {
                dreamIncomeInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
            break;
            
        case 4:
            const currentIncomeInput = document.getElementById('currentIncome');
            if (!currentIncomeInput.value.trim()) {
                currentIncomeInput.style.borderColor = '#E52D27';
                isValid = false;
            } else {
                currentIncomeInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
            break;
            
        case 5:
            const ageInput = document.getElementById('age');
            if (!ageInput.value || ageInput.value < 1 || ageInput.value > 120) {
                ageInput.style.borderColor = '#E52D27';
                isValid = false;
            } else {
                ageInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
            break;
    }
    
    return isValid;
}

function parseIncome(incomeString) {
    // Remove $, commas, spaces, and convert to number
    const cleaned = incomeString.replace(/[\$,\s]/g, '');
    return parseFloat(cleaned) || 0;
}

function submitForm() {
    // Validate last slide
    if (!validateSlide(5)) {
        return;
    }
    
    // Collect all form data
    const currentIncomeValue = document.getElementById('currentIncome').value;
    const currentIncomeNumber = parseIncome(currentIncomeValue);
    
    // Check if current monthly income is less than $1000
    if (currentIncomeNumber < 1000) {
        // Hide all slides
        const allSlides = document.querySelectorAll('.form-slide');
        allSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Hide progress bar
        const progressBar = document.querySelector('.progress-bar-container');
        if (progressBar) {
            progressBar.style.display = 'none';
        }
        
        // Show message in the form section
        const formContainer = document.getElementById('multiStepForm');
        formContainer.innerHTML = '<div class="form-message"><h3 class="form-question">Thanks, we will get back to you when more spots open up!</h3></div>';
        return;
    }
    
    // If income is $1000 or more, redirect to TidyCal booking page
    window.location.href = 'https://tidycal.com/creatorabe/free';
}

// Animated amount cycling
function initAnimatedAmount() {
    const amounts = ['$10,000', '$20,000', '$50,000'];
    const animatedElement = document.getElementById('animatedAmount');
    const textElement = animatedElement.querySelector('.amount-text');
    let currentIndex = 0; // Start with $10,000
    
    if (!animatedElement || !textElement) return;
    
    // Set initial state
    animatedElement.classList.add('slide-in');
    
    setInterval(() => {
        // Slide out current text
        animatedElement.classList.remove('slide-in');
        animatedElement.classList.add('slide-out');
        
        // After slide out, change text and slide in
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % amounts.length;
            textElement.textContent = amounts[currentIndex];
            animatedElement.classList.remove('slide-out');
            animatedElement.classList.add('slide-in');
        }, 500);
    }, 2000); // 2 second delay between switches
}

// Custom Video Player Controls
function initVideoPlayer() {
    const video = document.getElementById('vslVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBarVideo');
    const progressFilled = document.getElementById('progressFilled');
    const progressHandle = document.getElementById('progressHandle');
    const videoPlayer = document.querySelector('.custom-video-player');
    
    if (!video || !playPauseBtn) return;
    
    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            video.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    });
    
    // Update progress bar as video plays
    video.addEventListener('timeupdate', () => {
        const percent = (video.currentTime / video.duration) * 100;
        progressFilled.style.width = percent + '%';
        progressHandle.style.left = percent + '%';
    });
    
    // Seek functionality - click on progress bar to jump to position
    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = clickX / rect.width;
        video.currentTime = percent * video.duration;
    });
    
    // Show controls on hover and when paused
    video.addEventListener('pause', () => {
        videoPlayer.classList.add('controls-visible');
    });
    
    video.addEventListener('play', () => {
        setTimeout(() => {
            if (!video.paused) {
                videoPlayer.classList.remove('controls-visible');
            }
        }, 2000);
    });
    
    videoPlayer.addEventListener('mouseenter', () => {
        videoPlayer.classList.add('controls-visible');
    });
    
    videoPlayer.addEventListener('mouseleave', () => {
        if (!video.paused) {
            videoPlayer.classList.remove('controls-visible');
        }
    });
    
    // Update play/pause icon when video ends
    video.addEventListener('ended', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        videoPlayer.classList.add('controls-visible');
    });
}

// Allow Enter key to submit on text inputs
document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress bar
    updateProgressBar(1);
    
    // Initialize animated amount
    initAnimatedAmount();
    
    // Initialize video player
    initVideoPlayer();
    
    // Add click handlers for radio buttons
    const radioInputs = document.querySelectorAll('input[name="newToClipping"]');
    radioInputs.forEach(radio => {
        radio.addEventListener('change', function() {
            const radioOptions = document.querySelectorAll('.radio-option');
            radioOptions.forEach(option => {
                option.classList.remove('selected');
                if (option.querySelector('input[type="radio"]').checked) {
                    option.classList.add('selected');
                }
            });
        });
    });
    
    const textInputs = document.querySelectorAll('.form-input[type="text"]');
    textInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const slideNumber = parseInt(this.closest('.form-slide').dataset.slide);
                if (slideNumber < 5) {
                    nextSlide(slideNumber);
                } else {
                    submitForm();
                }
            }
        });
    });
    
    const numberInput = document.getElementById('age');
    if (numberInput) {
        numberInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitForm();
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

