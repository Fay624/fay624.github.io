/*Author: Lumberjacks
  Template: Campfire (Landing Page)
  Version: 1.0
  URL: http://themeforest.net/user/Lumberjacks/
*/


"use strict";

$(document).ready(function (){

  // backstretch
  $("header").backstretch("img/header.jpg");
  $(".contact").backstretch("img/contact.jpg");

  // Tweetie
  $('.lj-twitter').twittie({
    username: 'lumberjacksnews',
    count: 3,
    dateFormat: '%d %b %Y',
    hideReplies: true,
    template: '<p>{{tweet}}</p><span>{{date}}</span>',
    apiPath: 'twitter/api/tweet.php'
  });

  // E-mail validation via regular expression
  function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
  };

  // Contact form functions
  $("#contactform").on('submit',function (event) {
      
      var input = $('.contact-warning');
      
      if(!input.is(':empty')) {
        input.stop(true);
      }
      event.preventDefault();
      event.stopImmediatePropagation();

      var name = $("input#contact-name");
      var email = $("input#contact-email");
      var phone = $("input#contact-phone");
      var message = $("textarea#contact-message");

      if (name.val() == "" || email.val() == "" || message.val() == "") {
        input.stop(true).html('<i class="ion-android-alert"></i> Please make sure to fill in required fields.');
        $("#contactform").find("input[type=text],textarea").filter(function(){
          if($(this).val() == ""){
             event.preventDefault();
             return true;
          }
        }).first().focus();
      }
      else if (!isValidEmailAddress( email.val() )) {
        input.stop(true).html('<i class="ion-android-alert"></i> E-mail address is not valid.');
        email.focus();
      }
      else {
        $.ajax({
          type: "POST",
          url: "./php/send-contact.php",
          data: {contact_name:name.val(),
                 contact_email:email.val(),
                 contact_phone:phone.val(),
                 contact_message:message.val()},
          success: function () {
            input.addClass('success').html('<i class="ion-checkmark-circled"></i> Thank you for your message!');
            name.val('');
            email.val('');
            phone.val('');
            message.val('');
          }
        });
      }
   });

  // Setting default easing
  jQuery.easing.def = "easeInOutExpo";

  // Slick initializer function
  $(".panels-carousel").slick({
    autoplay: false,
    autoplaySpeed: 5000,
    infinite: false,
    dots: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

  // Scroll To # Links
  $('a.scroll[href^="#"]').on('click', function(e) {
    e.preventDefault();

    var target = this.hash;
    target = target.replace('#', '');
     var $target = $('#' + target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 1000, function() {
      window.location.hash = '#' + target;
    });
  });

});

// Preloader
// Change delay and fadeOut speed (in miliseconds)
$(window).load(function() {
  $(".preloader").delay(250).fadeOut(500);
});