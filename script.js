const navbarLinks = document.querySelectorAll(".nav-items li a");
const mainContent = document.querySelector(".main-section");
const sidebarContent = document.querySelector(".sidebar");


// Function to load content from an external file and insert it into the target element
const loadContent = (url, targetElement) => {
    fetch(url)
        .then(response => response.text())
        .then(data => targetElement.innerHTML = data)
        .catch(error => console.error("Error loading content:", error));
};


// Call the function to load the sidebar content
loadContent("pages/sidebar.html", sidebarContent);

// Add click event listeners to the navbar links
navbarLinks.forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
    const pageURL = link.getAttribute("href");
    navbarLinks.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
    loadContent(pageURL, mainContent);
}));

// Load the initial content when the page loads (e.g., "home.html")
loadContent(navbarLinks[0].getAttribute("href"), mainContent);
navbarLinks[0].classList.add("active");

// WhatsApp Redirect Function
const redirectToWhatsApp = () => window.open(`https://wa.me/9372794091?text=${encodeURIComponent("Hello, I have a question.")}`, '_blank');

// Attach a click event to the WhatsApp button
document.getElementById('whatsappButton').addEventListener('click', redirectToWhatsApp);

// Function to reload the page
// const reloadPage = () => location.reload();

// Add an event listener for the visibility change
// document.addEventListener("visibilitychange", () => document.visibilityState === "visible" && reloadPage());





// Search functionality
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const contentContainers = document.querySelectorAll(".main-section");
const notFoundMessage = document.getElementById("not-found-message");

// Function to perform search
const performSearch = () => {
    const searchText = searchInput.value.toLowerCase().trim();
    let resultFound = false;

    contentContainers.forEach(container => {
        const sectionName = container.getAttribute("data-section");
        const paragraphs = container.querySelectorAll("p");

        paragraphs.forEach(paragraph => {
            const text = paragraph.textContent.toLowerCase();
            const regex = new RegExp(searchText, "gi");
            const highlightedText = text.replace(
                regex,
                (match) => `<span class="highlighted">${match}</span>`
            );
            paragraph.innerHTML = highlightedText;
        });

        for (let i = 0; i < paragraphs.length; i++) {
            const text = paragraphs[i].textContent.toLowerCase();

            if (text.includes(searchText)) {
                paragraphs[i].scrollIntoView({ behavior: "smooth" });
                resultFound = true;
                break; // Exit the loop after scrolling to the first occurrence
            }
        }
    });

    notFoundMessage.style.display = resultFound ? "none" : "block";
    if (!resultFound) {
        setTimeout(() => {
            notFoundMessage.style.display = "none";
        }, 3000);
    }
};

// Event listener for the search button click
searchButton.addEventListener("click", performSearch);

// Event listener for Enter key press in the search input
searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission behavior
        performSearch();
    }
});

// Event listener for the search button click and Enter key press in the search input
searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", event => event.key === "Enter" && (event.preventDefault(), performSearch()));



// Contact Page

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Reset error messages
    document.querySelectorAll('.name-error, .email-error, .phone-error, .message-error').forEach(error => error.textContent = '');

    let isValid = true;

    // Validate Name
    if (name === '') {
        document.querySelector('.name-error').textContent = 'Name is required';
        isValid = false;
    }

    // Validate Email
    if (email === '') {
        document.querySelector('.email-error').textContent = 'Email is required';
        isValid = false;
    } else if (!isValidEmail(email)) {
        document.querySelector('.email-error').textContent = 'Enter a valid email address';
        isValid = false;
    }

    // Validate Phone
    if (phone === '') {
        document.querySelector('.phone-error').textContent = 'Phone number is required';
        isValid = false;
    } else if (!isValidPhone(phone)) {
        document.querySelector('.phone-error').textContent = 'Enter a valid phone number';
        isValid = false;
    }

    // Validate Message
    if (message === '') {
        document.querySelector('.message-error').textContent = 'Message is required';
        isValid = false;
    }

    if (isValid) {
        // If the form is valid, submit it
        submitForm();
    }
    function isValidEmail(email) {
        // Add your email validation logic here
        // This is a basic example, you may want to use a more robust solution
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        // Add your phone validation logic here
        // This is a basic example, you may want to use a more robust solution
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }
}




function submitForm() {

    var params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
    };

    var serviceID = "service_j39jra2";
    var templateID = "template_kn6hutc";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            alert("Email Sent Successfully");
        });

}