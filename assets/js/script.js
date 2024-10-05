let userData = JSON.parse(localStorage.getItem("userData")) || {};
let bookingCount = parseInt(localStorage.getItem("bookingCount")) || 0; // Booking count ကို localStorage မှ ရယူခြင်း


//sign up & sign in & log out
function signUp() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (username && email && password) {
        userData = { username, email, password };
        localStorage.setItem("userData", JSON.stringify(userData)); // User data ကို localStorage တွင် သိမ်းခြင်း
        alert("Sign up successful!");
        closeForm();
        openSignInForm();
    } else {
        alert("Please fill in all fields.");
    }
}

function signIn() {
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;

    if (email === userData.email && password === userData.password) {
        alert("Sign in successful!");
        document.getElementById("signUpBtn").classList.add("hidden");
        document.getElementById("logOutBtn").classList.remove("hidden");
        closeForm();
    } else {
        alert("Incorrect email or password.");
    }
}

function openSignUpForm() {
    document.getElementById("signUpForm").classList.remove("hidden");
    document.getElementById("signInForm").classList.add("hidden");
}

function openSignInForm() {
    document.getElementById("signInEmail").value = userData.email;
    document.getElementById("signInPassword").value = "";
    document.getElementById("signInForm").classList.remove("hidden");
    document.getElementById("signUpForm").classList.add("hidden");
}

function closeForm() {
    document.getElementById("signUpForm").classList.add("hidden");
    document.getElementById("signInForm").classList.add("hidden");
}

function logOut() {
    userData = {};
    localStorage.removeItem("userData"); // User data ကို ဖျက်ခြင်း
    localStorage.removeItem("bookingCount"); // Booking count ကို ဖျက်ခြင်း
    document.getElementById("logOutBtn").classList.add("hidden");
    document.getElementById("signUpBtn").classList.remove("hidden"); // Sign up button ကို ပြပါ
    alert("Logged out successfully!");
}

// Check if user is signed in
if (userData.email) {
    document.getElementById("logOutBtn").classList.remove("hidden"); // Log out button ကို ပြပါ
    document.getElementById("signUpBtn").classList.add("hidden"); // Sign up button ကို ဖျက်ပါ
} else {
    document.getElementById("signUpBtn").classList.remove("hidden"); // Sign up button ကို ပြပါ
    document.getElementById("logOutBtn").classList.add("hidden"); // Log out button ကို ဖျက်ပါ
}

document.getElementById("signUpBtn").onclick = openSignUpForm;

// Set minimum date to tomorrow (exclude today)
var today = new Date();
var tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);  // Add one day to today to get tomorrow's date
var dd = String(tomorrow.getDate()).padStart(2, '0');
var mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); // January is 0!
var yyyy = tomorrow.getFullYear();
var minDate = yyyy + '-' + mm + '-' + dd;
document.getElementById("bookingDate").setAttribute("min", minDate);

// calculateCost

function calculateCost() {
    var package = document.getElementById("package").value;
    var numPeople = document.getElementById("numPeople").value;
    var costPerPerson;

    switch (package) {
        case "Bagan & Mt.Poppa": costPerPerson = 150; break;
        case "Shan-State": costPerPerson = 200; break;
        case "PyinooLwin-Trip": costPerPerson = 250; break;
        case "Highlights of Myanmar": costPerPerson = 180; break;
        case "The Golden Rock": costPerPerson = 170; break;
        case "Dawei-Myeik": costPerPerson = 220; break;
        default: costPerPerson = 0;
    }

    var totalCost = costPerPerson * numPeople;
    document.getElementById("totalCost").innerText = "Total Cost: $" + totalCost;
}

function showDetails(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var package = document.getElementById("package").value;
    var numPeople = document.getElementById("numPeople").value;
    var bookingDate = document.getElementById("bookingDate").value;
    var costPerPerson;

    switch (package) {
        case "Bagan & Mt.Poppa": costPerPerson = 150; break;
        case "Shan-State": costPerPerson = 200; break;
        case "PyinooLwin-Trip": costPerPerson = 250; break;
        case "Highlights of Myanmar": costPerPerson = 180; break;
        case "The Golden Rock": costPerPerson = 170; break;
        case "Dawei-Myeik": costPerPerson = 220; break;
        default: costPerPerson = 0;
    }

    var totalCost = costPerPerson * numPeople;
    const registeredEmail = userData.email; // Registered email ကို ရယူခြင်း

    if (email === registeredEmail) {
        bookingCount++;
        localStorage.setItem("bookingCount", bookingCount); // Booking count ကို localStorage တွင် သိမ်းခြင်း
        if (bookingCount % 4 === 0) { // ၄ ကြိမ် booking ဖြစ်လျှင်
            totalCost *= 0.9; // 10% လျော့
        }
    }

    document.getElementById("bookingForm").style.display = "none";
    document.getElementById("confirmationDetails").style.display = "block";
    
    document.getElementById("confirmationDetails").innerHTML = `
        <h2>Booking Confirmation</h2>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Destination:</strong> ${package}</p>
        <p><strong>Booking Date:</strong> ${bookingDate}</p>
        <p><strong>Number of people:</strong> ${numPeople}</p>
        <p><strong>Cost per person:</strong> $${costPerPerson}</p>
        <p><strong>Total Cost:</strong> $${totalCost.toFixed(2)}</p>
        <p><strong style="color: darkblue;">Thank you for your order! Your purchase has been successfully confirmed!</strong></p>
        <button class="back-button" onclick="goBack()">Ok!</button>
    `;
}

function goBack() {
    document.getElementById("bookingForm").style.display = "block"; // Booking form ကို ပြန်ဖျက်မိ
    document.getElementById("confirmationDetails").style.display = "none"; // Confirmation details ကို ဖျက်ရန်
    window.history.back();
}
