
        const heading1 = document.getElementById("heading1");
        const heading2 = document.getElementById("heading2");
        const loginForm = document.getElementById("login_form");
        const signupForm = document.getElementById("signup_form");

        heading1.addEventListener("click", () => {
            heading1.style.textDecoration = "underline";
            heading1.style.textDecorationColor = "white";
            heading1.style.fontSize = '30px';
            heading1.style.color = "blue";
            
            heading2.style.fontSize = "20px";
            heading2.style.color = 'black';
            heading2.style.textDecoration = "none";
            
            loginForm.style.display = "block";
            signupForm.style.display = "none";
        });

        heading2.addEventListener("click", () => {
            heading2.style.textDecoration = "underline";
            heading2.style.textDecorationColor = "white";
            heading2.style.fontSize = '30px';
            heading2.style.color = "blue";
            
            heading1.style.fontSize = "20px";
            heading1.style.color = 'black';
            heading1.style.textDecoration = "none";
            
            loginForm.style.display = "none";
            signupForm.style.display = "block";
        });

        // Initially show login form
        loginForm.style.display = "block";
        signupForm.style.display = "none";
        