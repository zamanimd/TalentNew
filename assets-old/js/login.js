$("#loginForm").submit(function(event) {

    /* stop form from submitting normally */
    event.preventDefault();

    var $form = $( this );
    //var url = 'http://142.93.178.254:8091/v1/tmp/saveCustomerDetails';
    var url= 'https://api.talenthut.com/v1/user/login' //please replace this value for production

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify({ email: $('#email').val(), password: $('#password').val()}),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        success: function (data, status, jqXHR) {
            window.location.href='/hireapp/#/login?token='+data.data.jwtToken;
        },

        error: function (jqXHR, status) {
            // error handler
            alert('Error :   ' + jqXHR.responseJSON.message);
        }
     });
  });