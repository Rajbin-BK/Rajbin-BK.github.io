//opening the resume

// Get references to the sidebar and header outside the functions for better performance
var sidebar = document.getElementById("sidebar");
var header = document.querySelector('header'); // Get the header

// Function to show the header when the page is loaded
function showHeaderOnLoad() {
    header.style.top = '10px'; // Show header
}

// Function to check if the scroll position is within the home section
function checkHomeVisibility() {
    const homeSection = document.getElementById('home');
    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    let homePosition = homeSection.offsetTop;
    let homeHeight = homeSection.offsetHeight;

}

// This function toggles the sidebar's visibility
function toggleNav() {
    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
        header.style.top = '10px'; // Show the header when sidebar is closed
    } else {
        sidebar.style.width = '250px';
        header.style.top = '-100px'; // Hide the header when sidebar is opened
    }
}

// This function explicitly closes the sidebar
function closeNav() {
    sidebar.style.width = '0'; // Closes the sidebar by setting its width to 0
    header.style.top = '10px'; // Ensure the header reappears when sidebar is closed
}



// Add event listeners when the document is ready
document.addEventListener('DOMContentLoaded', function () {
    showHeaderOnLoad();

    // Listener for closing the sidebar when clicking anywhere in the body
    document.body.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && event.target !== document.getElementById("nav-toggle") && !document.getElementById("nav-toggle").contains(event.target)) {
            closeNav(); // Closes the sidebar if the conditions are met
        }
    }, true); // Use capturing to handle click anywhere in the body

    // Close sidebar when any of its links are clicked
    var links = document.querySelectorAll('.sidebar .nav-links a');
    links.forEach(function(link) {
        link.addEventListener('click', closeNav); // Close sidebar when any of its links are clicked
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Smooth scrolling to the "Connect Me" section
    document.querySelector('.connect-btn').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
    });

    document.getElementById('resume-button').addEventListener('click', function() {
        window.open('./File/resume.pdf', '_blank');
    });

    // Initial call to check header visibility on load and set up scroll event listener
    checkHomeVisibility();
    window.addEventListener('scroll', checkHomeVisibility);

    // Handle the typewriter effect for professional titles
    let professions = ["web-developer", "app-developer", "freelancer"];
    let current = 0;
    let isDeleting = false;
    let text = '';
    let typingSpeed = 150;
    let deletingSpeed = 50;

    function typeEffect() {
        const element = document.getElementById('dynamic-text');
        const word = professions[current];

        if (isDeleting) {
            // Decrease text length by one
            text = word.substring(0, text.length - 1);
        } else {
            // Increase text length by one
            text = word.substring(0, text.length + 1);
        }

        // Update the text in HTML
        element.innerHTML = text;

        let timeout = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && text === word) {
            // If full word is typed and not deleting, pause before starting to delete
            timeout = 2000; // Wait for 2 seconds before starting to delete
            isDeleting = true;
        } else if (isDeleting && text === '') {
            // If the word is completely erased
            isDeleting = false;
            current = (current + 1) % professions.length; // Move to the next word
            timeout = 500; // Wait before starting to type next word
        }

        setTimeout(typeEffect, timeout);
    }

    typeEffect(); // Start the typewriter effect

    // Get all project links
    const projectLinks = document.querySelectorAll('.project a');

    // Loop through each project link
    projectLinks.forEach(link => {
        // Add click event listener to each link
        link.addEventListener('click', function(event) {
            // Prevent default link behavior
            event.preventDefault();
            // Get the href attribute of the clicked link
            const projectUrl = this.getAttribute('href');
            // Open the project URL in a new tab
            window.open(projectUrl, '_blank');
        });

        // Add mouseenter event listener to each link
        link.addEventListener('mouseenter', function() {
            // Get the video element inside the project
            const video = this.querySelector('.project-video');
            // Play the video
            if (video) {
                video.play();
            }

            // Get the project description
            const description = this.querySelector('.project-description');
            // Show the project description
            if (description) {
                description.style.display = 'block';
            }
        });

        // Add mouseleave event listener to each link
        link.addEventListener('mouseleave', function() {
            // Get the video element inside the project
            const video = this.querySelector('.project-video');
            // Pause the video
            if (video) {
                video.pause();
            }

            // Get the project description
            const description = this.querySelector('.project-description');
            // Hide the project description
            if (description) {
                description.style.display = 'none';
            }
        });
    });

    // Handle form submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Thank you for your message!');
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        alert(data.errors.map(error => error.message).join(', '));
                    } else {
                        alert('Oops! There was a problem submitting your form');
                    }
                });
            }
        }).catch(error => {
            alert('Oops! There was a problem submitting your form');
        });
    });
});

// Add event listener to scroll to home button
document.addEventListener("DOMContentLoaded", function() {
    // Get the button element
    var scrollToHomeBtn = document.getElementById("scrollToHomeBtn");

    // Add click event listener to the button
    scrollToHomeBtn.addEventListener("click", function() {
        // Get the position of the home section
        var homeSection = document.getElementById("home");
        var homeSectionPosition = homeSection.offsetTop;

        // Scroll to the position of the home section smoothly
        window.scrollTo({
            top: homeSectionPosition,
            behavior: "smooth"
        });
    });
});
 
