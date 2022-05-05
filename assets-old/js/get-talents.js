$("#getTalent").submit(function(event) {

    /* stop form from submitting normally */
    event.preventDefault();

    var $form = $( this );
    //var url = 'http://142.93.178.254:8091/v1/tmp/saveCustomerDetails';
    var url= 'https://api.talenthut.com/v1/tmp/saveCustomerDetails' //please replace this value for production

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify({ firstName: $('#full-name').val(), email: $('#email').val()
                    ,role: 'CUSTOMER',phoneNum: $('#phoneNumber').val(),howCanWeHelpYou: $('#howCanWeHelpYou').val(),
                    countryCode: $('#countryCode').val(), designation:   $('#designation').val(), 
                    companyName: $('#companyName').val(), companySize: $('#companySize').val()}),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        success: function (data, status, jqXHR) {

            alert("Data saved successfully");
            $form[0].reset();
        },

        error: function (jqXHR, status) {
            // error handler
            alert('Error :   ' + jqXHR.responseJSON.error);
        }
     });
  });