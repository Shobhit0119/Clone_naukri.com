var registerArr = JSON.parse(sessionStorage.getItem("registedUser"));
document.querySelector("#form").addEventListener("submit", loginSub);

async function loginSub(event) {
    event.preventDefault();
    
    var userEmail = document.querySelector("#email").value;
    var userPass = document.querySelector("#pass").value;
    
    try {
        // Fetch users from the API
        const response = await fetch('http://localhost:5000/users');
        const users = await response.json();
        
        // Check if user exists
        var flag = false;
        var currentUser = null;
        
        for (var i = 0; i < users.length; i++) {
            // Check both password and pass fields since the database has inconsistent field names
            if (users[i].email == userEmail && (users[i].pass == userPass || users[i].password == userPass)) {
                flag = true;
                currentUser = users[i];
                break;
            }
        }
        
        if (flag == true) {
            document.querySelector("#result").textContent = "Logged in Successfully";
            // Store the current user in sessionStorage for later use
            sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
            
            // Redirect after a short delay to show the success message
            setTimeout(function() {
                window.location.href = "LoginPage-2.html";
            }, 1000);
        }
        else {
            document.querySelector("#result").textContent = "Invalid Email ID and Password";
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        document.querySelector("#result").textContent = "Error connecting to server. Make sure json-server is running.";
    }
}
