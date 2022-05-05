

  // Wait for the DOM to be ready
$(function() {
    jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 && 
        phone_number.match(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/);
    }, "Please specify a valid phone number");
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[name='gethiredForms']").validate({
      // Specify validation rules
      rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
        fullName: "required",
        phoneNumber: 'required',
        timeToTalk: 'required',
        howCanWeHelpYou: 'required',
        email: {
          required: true,
          // Specify that email should be validated
          // by the built-in "email" rule
          email: true
        },
        experience: {
          required: true,
          maxlength: 2,
          number: true
        },
        phoneNumber: {
          required : true,
          maxlength: 13,
          phoneUS : true
        }
      },
      // Specify validation error messages
      messages: {
        firstname: "Please enter your firstname",
        lastname: "Please enter your lastname",
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long"
        },
        email: "Please enter a valid email address"
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        /* stop form from submitting normally */
        event.preventDefault();
    $('.modal-body').load('content.html',function(){
        $('#myModal').modal({show:true});
    });
        var $form = $( this );
        var url = 'https://api.talenthut.com/v1/tmp/saveTalentDetails';
        //var url= 'http://localhost:8091/v1/tmp/saveTalentDetails' //please replace this value for production
        var countryCode = $('#countryCode').val();
        var designation = $('#designation option:selected').text();
        var arr = countryCode.split(' ');
        var trimmedCode = arr[arr.length-1];
        var name = $('#fullName').val();
        var nameArray = name.split(' ');
        var fName,sName;
        fName = nameArray[0];
        if(nameArray.length > 1){
            sName = nameArray.slice(1,nameArray.length).join(' ');
        }
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify({ firstName: fName, lastName: sName , email: $('#email').val()
                        ,role: 'TALENT',phoneNum: $('#phoneNumber').val(),primarySkills: $('#howCanWeHelpYou').val(),
                        countryCode: trimmedCode, designation:   $('#designation').val(),
                        experience: $('#experience').val(), timeToTalk: $('#timeToTalk').val()}),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            beforeSend: function(){
                // Show image container
                $("#loader").show();
               },
            success: function (data, status, jqXHR) {
    
                showModalWithTitle('Registration Success',
                'Thank you for registering. Please check your email and click on the verification link.');
                $form[0].reset();
            },
    
            error: function (jqXHR, status) {
                // error handler
                if(jqXHR.responseJSON)
                showModalWithTitle('Error',  jqXHR.responseJSON.error);
                else {
                    showModalWithTitle('Error','Unable to contact server, please get back after sometime');
                }
            }, complete:function(data){
                // Hide image container
                $("#loader").hide();
            }
         });
      }
    });
    function showModalWithTitle(title, content) {
        html =  '<div id="dynamicModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
        html += '<div class="modal-dialog" style="margin-top: 16%;">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header">';
        html += '<a class="close" data-dismiss="modal">×</a>';
        html += '<h4>'+title+'</h4>'
        html += '</div>';
        html += '<div class="modal-body">';
        html += content;
        html += '</div>';
        html += '<div class="modal-footer">';
        html += '<span class="btn btn-primary" data-dismiss="modal">Close</span>';
        html += '</div>';  // content
        html += '</div>';  // dialog
        html += '</div>';  // footer
        html += '</div>';  // modalWindow
        $('body').append(html);
        $("#dynamicModal").modal();
        $("#dynamicModal").modal('show');
    
        $('#dynamicModal').on('hidden.bs.modal', function (e) {
            $(this).remove();
        });
    }
    $('.openBtn').on('click',function(){
        showModalWithTitle('Test','Msg');
    });
  });