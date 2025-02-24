fetch("http://localhost:5000/api/auth/verify-email", {
    method: "POST", // Wrapped in an object
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email: "test@gmail.com"
    }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));
