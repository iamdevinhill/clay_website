// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Load the YouTube Player API asynchronously
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

let player;

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
            end: 76
        },
        events: {
            onStateChange: onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        player.seekTo(63);
    }
}

document.getElementById("email-button").addEventListener("click", function () {
    const recipient = "claytonnileyoung@gmail.com"; // Replace with your email
    const subject = encodeURIComponent("Inquiry from Your Website");
    const body = encodeURIComponent("Hi,\n\nI would like to inquire about:\n\nBest regards,\n[Your Name]");
    
    // Construct the mailto link
    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
    
    // Open the mailto link
    window.location.href = mailtoLink;
});

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', (event) => {
        const isClickInsideMenu = hamburgerMenu.contains(event.target);
        const isClickInsideNavLinks = navLinks.contains(event.target);

        if (!isClickInsideMenu && !isClickInsideNavLinks) {
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});
