document.addEventListener('DOMContentLoaded', function(){
        function create_error(div_element, text_error, class_error, ){
            let fault = document.createElement("div");
            let node = document.createTextNode(text_error);
            fault.className = class_error;
            fault.appendChild(node);
            div_element.appendChild(fault);
        }

        const input_username = document.querySelector(".login_username");
        const input_password = document.querySelector(".login_password");
        
        let login_btn = document.querySelector('.login_button');

        login_btn.addEventListener('click', function(){
            // div below the username
            let div_below_username = document.querySelector(".not_found");

            document.querySelectorAll('.not_found').forEach(function(element) {
                element.innerHTML = '';
            });

            xhttp = new XMLHttpRequest();
            let url = "php/login_user.php";
            let method = "POST";
            let data = {
                username: input_username.value,
                password: input_password.value
            }

            let json_Data = JSON.stringify(data);

            xhttp.open(method, url, true);
            xhttp.setRequestHeader('Content-Type', 'application/json');

            xhttp.onload = function() {
                if (xhttp.status === 200) {
                    if (xhttp.responseText == 0) {
                        Swal.fire({
                            icon: "success",
                            title: "Successful Login",
                            text: "Welcome to CollectiSearch! You are redirected to our Welcome Page.",
                            showConfirmButton: false,
                            timer: 2500
                          })
                          .then(function(){
                            window.location.assign("Welcome_page.html");
                        });
                    } else if (xhttp.responseText == 1) {
                        Swal.fire({
                            icon: "success",
                            title: "Successful Admin Login",
                            text: "You are logged in",
                            showConfirmButton:false,
                            timer: 2500
                          })
                          .then(function(){
                            window.location.assign("Welcome_page_admin.html");
                        });
                    } else if (xhttp.responseText == 2) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            footer: '<a href="">Forgot Password?</a>'
                        }).then(function(){
                            create_error(div_below_username, "The password you've entered is incorrect.", "not_found_msg");
                        });
                    } else if (xhttp.responseText == 3) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "We couldn't find an account that matches the credentials",
                            footer: '<a href="Register.html">Not You?</a>'
                        }).then(function(){
                            create_error(div_below_username, "The username you entered isn't connected to an account.", "not_found_msg");
                        })
                    }
                }
            }

            input_username.addEventListener('input', function(e) {
                if(e.target.value !== "" && div_below_username.children.length > 0) {
                    document.querySelectorAll('.not_found').forEach(function(element) {
                        element.innerHTML = '';
                    });
                }
            });

            input_password.addEventListener('input', function(e) {
                if(e.target.value !== "" && div_below_username.children.length > 0) {
                    document.querySelectorAll('.not_found').forEach(function(element) {
                        element.innerHTML = '';
                    });
                }
            });

            xhttp.send(json_Data);
        });
});