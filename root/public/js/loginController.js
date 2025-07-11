document.addEventListener("DOMContentLoaded", () => {
    console.log("JS Yüklendi")
    const form = document.getElementById("login-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try{
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username,password})
            })
            console.log(response);
            const result = await response.json()
                .then(data => console.log(data))
        }catch(err){
            console.log(err);
        }

    })
})