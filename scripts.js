// Load the YouTube Player API asynchronously
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
let timeCheckInterval;

// Initialize YouTube Player when API is ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'UnBJMnWzAPE',
        playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            fs: 0,
            start: 63,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin,
            showinfo: 0,
            autohide: 1
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError
        }
    });
}

// Handle player ready event
function onPlayerReady(event) {
    event.target.playVideo();
    event.target.setPlaybackQuality('hd1080');
    resizeVideo();
    
    // Start checking video time
    timeCheckInterval = setInterval(checkVideoTime, 100);
    
    // Add a class to fade in content after video loads
    document.querySelector('.content-wrapper').classList.add('loaded');
}

// Check video time and loop if necessary
function checkVideoTime() {
    if (player && player.getCurrentTime) {
        const currentTime = player.getCurrentTime();
        if (currentTime >= 76) {
            player.seekTo(63);
        }
    }
}

// Handle player state changes
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED) {
        player.playVideo();
    }
}

// Handle player errors
function onPlayerError(event) {
    console.error('YouTube Player Error:', event.data);
    // Fallback to a static background if video fails
    document.getElementById('video-background').style.display = 'none';
    document.body.style.backgroundColor = '#1F1711';
    
    // Clear interval if there's an error
    if (timeCheckInterval) {
        clearInterval(timeCheckInterval);
    }
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (timeCheckInterval) {
        clearInterval(timeCheckInterval);
    }
});

// Resize video to cover viewport
function resizeVideo() {
    const iframe = document.querySelector('#player');
    if (!iframe) return;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const videoRatio = 16 / 9;
    const windowRatio = windowWidth / windowHeight;
    
    let newWidth, newHeight;
    
    if (windowRatio > videoRatio) {
        newWidth = windowWidth;
        newHeight = windowWidth / videoRatio;
    } else {
        newWidth = windowHeight * videoRatio;
        newHeight = windowHeight;
    }
    
    // Center the video
    const left = (windowWidth - newWidth) / 2;
    const top = (windowHeight - newHeight) / 2;
    
    // Apply the styles
    Object.assign(iframe.style, {
        width: `${newWidth}px`,
        height: `${newHeight}px`,
        left: `${left}px`,
        top: `${top}px`,
        position: 'absolute'
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Handle mobile menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const menuLinks = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Handle email button
function initEmailButton() {
    const emailButton = document.getElementById('email-button');
    if (emailButton) {
        emailButton.addEventListener('click', () => {
            const recipient = 'claytonnileyoung@gmail.com';
            const subject = encodeURIComponent('Inquiry from Your Website');
            const body = encodeURIComponent('Hi,\n\nI would like to inquire about:\n\nBest regards,\n[Your Name]');
            window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
        });
    }
}

// Handle scroll effects
function initScrollEffects() {
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove header background opacity based on scroll
        if (currentScroll > 50) {
            header.style.backgroundColor = 'rgba(31, 23, 17, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(31, 23, 17, 0.9)';
        }

        lastScroll = currentScroll;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initMobileMenu();
    initEmailButton();
    initScrollEffects();
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    // Debounce resize event
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeVideo, 150);
});

// Handle visibility change to ensure video keeps playing
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && player && player.playVideo) {
        player.playVideo();
    }
});