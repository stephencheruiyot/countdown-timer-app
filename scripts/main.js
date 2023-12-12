// Function to set the countdown timer
function setCountdown() {
    const eventName = document.getElementById('event-name').value;
    const eventDate = new Date(document.getElementById('event-date').value).getTime();


    // Check if the date is valid
    if (isNaN(eventDate)) {
        alert('Please enter a valid date.');
        return;
    }

    // Save event details to local storage
    saveEventDetails(eventName, eventDate);

    // Update the countdown every second
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const currentDate = new Date().getTime();
        const timeDifference = eventDate - currentDate;

        // Check if the event date has passed
        if (timeDifference < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = 'Event has already occurred!';
        } else {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
}

// Function to save event details to local storage
function saveEventDetails(eventName, eventDate) {
    const eventDetails = {
        name: eventName,
        date: eventDate,
    };

    // Convert the event details object to a JSON string
    const eventDetailsJSON = JSON.stringify(eventDetails);

    // Save the JSON string to local storage
    localStorage.setItem('eventDetails', eventDetailsJSON);
}

// Function to load event details from local storage
function loadEventDetails() {
    const eventDetailsJSON = localStorage.getItem('eventDetails');

    // Check if there are saved event details
    if (eventDetailsJSON) {
        const eventDetails = JSON.parse(eventDetailsJSON);
        document.getElementById('event-name').value = eventDetails.name;
        document.getElementById('event-date').valueAsDate = new Date(eventDetails.date);
    }
}

// Function to share on Twitter
function shareOnTwitter(eventName, countdownText) {
    const twitterUrl = `https://twitter.com/intent/tweet?text=Countdown to ${eventName}: ${countdownText}&url=${window.location.href}`;
    openPopup(twitterUrl);
}

// Function to share on Facebook
function shareOnFacebook(eventName, countdownText) {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=Countdown to ${eventName}: ${countdownText}`;
    openPopup(facebookUrl);
}

// Function to open a popup window for social media sharing
function openPopup(url) {
    window.open(url, 'Share', 'width=600,height=400,toolbar=0,status=0');
}

// Attach these functions to your social media icons/buttons
document.getElementById('twitter-icon').addEventListener('click', () => shareOnTwitter('Your Event', '2 days left'));
document.getElementById('facebook-icon').addEventListener('click', () => shareOnFacebook('Your Event', '2 days left'));


// Load event details when the page loads
loadEventDetails();
