document.addEventListener('DOMContentLoaded', function() {

    function create_error(div_element, text_error, class_error, ){
        let fault = document.createElement("div");
        let node = document.createTextNode(text_error);
        fault.className = class_error;
        fault.appendChild(node);
        div_element.appendChild(fault);
    }

    let Register_button = document.querySelector(".register_btn");
    

    Register_button.addEventListener('click', function() {
        
        //RegExp
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,1024}$/;

        const input_username = document.querySelector(".register_username");
        const input_email = document.querySelector(".register_email");
        const input_password = document.querySelector(".register_password");
        const input_password_repeat = document.querySelector(".register_password_repeat");
        const input_fullname =document.querySelector(".register_fullname");
        const input_user_tel= document.querySelector(".register_phone");  



        let div_below_username = document.querySelector(".alert_name");
        let div_below_email = document.querySelector(".alert_email");
        let div_below_password = document.querySelector(".alert_pswd");
        let div_below_password_repeat = document.querySelector(".alert_pswd_repeat");

        // Clean after mistake 
        document.querySelectorAll('.alert_name').forEach(function(element) {
            element.innerHTML = '';
        });
          
        document.querySelectorAll('.alert_email').forEach(function(element) {
          element.innerHTML = '';
        });
        
        document.querySelectorAll('.alert_pswd').forEach(function(element) {
          element.innerHTML = '';
        });
        
        document.querySelectorAll('.alert_pswd_repeat').forEach(function(element) {
          element.innerHTML = '';
        });

        // Check Username
        if(input_username.value === "" && div_below_username.children.length === 0) {
            create_error(div_below_username, "Enter your name", "a_alert_content");
        }

        // Check Email
        if(input_email.value === "" && div_below_username.children.length === 0) {
            create_error(div_below_email, "Enter your email", "a_alert_content");
        }

        // Check pass
        if(input_password.value === "" && div_below_password.children.length === 0) {
            create_error(div_below_password, "Enter your password", "a_alert_content");
        } else if (input_password_repeat.value === "" && div_below_password_repeat.children.length === 0) {
            create_error(div_below_password_repeat, "Type your password again", "a_alert_content");
        } else if (input_password.value !== input_password_repeat.value) {
            create_error(div_below_password_repeat, "Passwords must match", "a_alert_content");
        } else if (regex.test(input_password.value) === false) {
            create_error(div_below_password, "Passwords must be at least 8 characters and contain 1 capital letter, 1 minor letter, 1 number and 1 special character", "a_alert_content");
        } else {
            let xhttp = new XMLHttpRequest();
            let url = "php/register_user.php";
            let method = "POST";
            let data = {
                username: input_username.value,
                email: input_email.value,
                password: input_password.value,
                contact_info: input_user_tel.value,
                fullname: input_fullname.value
            }

            let json_Data = JSON.stringify(data);

            xhttp.open(method, url, true);
            xhttp.setRequestHeader('Content-Type', 'application/json');

            xhttp.onload = function() {
                console.log(xhttp.responseText); 
                if (xhttp.status === 200) {
                    if(xhttp.responseText == 0) {
                        Swal.fire({
                            title:"Welcome to our app!",
                            text: "We are almost done, we need to provide us your exaclty location.",
                            allowEscapeKey:false,
                            allowEnterKey:false,
                            confirmButtonColor:"#000000"//"#4267B2"
                        }).then(function(){
                            window.location.assign("location_provide.html");
                        })
                    } else {
                        Swal.fire({
                            title:"Error",
                            text: "Sorry, a user with the same username or email already exists!",
                            icon: "error",
                            allowEscapeKey:false,
                            allowEnterKey:false,
                            confirmButtonText:"OK,got it",
                            confirmButtonColor:"#000000"//"#4267B2"
                        }).then(function(){
                            window.location.reload();
                        });
                    }
                } else {
                    console.error('Request failed. Status code: ' + xhttp.status);
                }
            }

            xhttp.send(json_Data);
        }

        //remove user fault in username
        input_username.addEventListener('input', function(e) {
            if(e.target.value !=="" && div_below_username.children.length > 0) {
                document.querySelectorAll('.alert_name').forEach(function(element) {
                    element.innerHTML = '';
                });
            }
        });

        input_email.addEventListener('input', function(e) {
            if(e.target.value !== "" && div_below_email.children.length > 0) {
                document.querySelectorAll('.alert_email').forEach(function(element) {
                    element.innerHTML = '';
                });
            }
        });

        input_password.addEventListener('input', function(e) {
            if(e.target.value !== "" && div_below_password.children.length > 0) {
                document.querySelectorAll('.alert_pswd').forEach(function(element) {
                    element.innerHTML = '';
                });
            }
        });

        input_password_repeat.addEventListener('input', function(e) {
            if(e.target.value !== "" && div_below_password_repeat.children.length > 0) {
                document.querySelectorAll('.alert_pswd_repeat').forEach(function(element) {
                    element.innerHTML = '';
                });
            }
        });
          
    });
});