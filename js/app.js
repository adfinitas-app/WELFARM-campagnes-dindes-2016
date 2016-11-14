/* Smooth scroll */
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
         scrollTop: target.offset().top + 1
       }, 1000);
        return false;
      }
    }
  });
});

function extractUrlParams(){
  var t = document.location.search.substring(1).split('&'); var f = [];
  for (var i=0; i<t.length; i++){
    var x = t[ i ].split('=');
    f[x[0]]=decodeURIComponent(x[1]);
  }
  return f;
};

function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function removeClass()
{
  if ($(this).attr("type") == "radio") {
    $("input[name=" + $(this).attr("name") + "]").parent().removeClass("error");
  } else {
    $(this).parent().removeClass("error");
  }
  $(this).off("change");
}

function showError(elem) {
  if (elem.attr("type") == "radio" || elem.attr("type") == "checkbox") {
    $("input[name=" + elem.attr("name") + "]").parent().addClass("error");
    $("input[name=" + elem.attr("name") + "]").on("change", removeClass);
  } else if (elem.prop("tagName") == "SELECT") {
    elem.parent().parent().addClass("error");
    elem.on("change", removeClass);
  } else if (elem.attr("name") == "phone") { // For intlTelInput only
    elem.parent().parent().addClass("error");
    elem.on("change", removeClass);
  } else {
    elem.parent().addClass("error");
    elem.on("change", removeClass);
  }
}

function isValid() {
  var status = true;
  $(".error").removeClass("error");
  $("form.petitionForm input").each(function() {
    if ($(this).attr("required") && $(this).attr != "submit") {
      if ($(this).attr("type") == "radio" || $(this).attr("type") == "checkbox") {
        if ($("input[name=" + $(this).attr("name") + "]:checked").length == 0) {
          showError($(this));
          status = false;
        }
      } else {
        if ($(this).val() == "" || $(this).val() == null ||
          ($(this).attr("type") == "email" && isValidEmail($(this).val()) == false) ||
          ($(this).attr("name") == "phone" && $(this).intlTelInput("isValidNumber") == false)) {
          showError($(this));
        status = false;
      }
    }
  }
});
  return (status);
}

function fillFieldsFromUrl() {
  p = extractUrlParams();

  if (p['email'] && p['email'] != "undefined") {
    $("input[name=email]").val(p['email']);
  }

  if (p['firstname'] && p['firstname'] != "undefined") {
    $("input[name=firstname]").val(p['firstname']);
  }

  if (p['lastname'] && p['lastname'] != "undefined") {
    $("input[name=lastname]").val(p['lastname']);
  }

  if (p['phone'] && p['phone'] != "undefined") {
    $("input[name=phone]").val(p['phone']);
  }
}

function  height_adjust()
{
  $(".media > div:last-child").css({"height":"auto"});
  var     max = $(".media > div:last-child").first().height();

  if ($(window).width() > 640)
  {
    $(".media > div:last-child").each(function()
    {
      if ($(this).height() > max)
        max = $(this).height();
    });
    console.log("hello max " + max + ";" + $(window).width());
    max += 10;
    max = max + "px";
    $(".media > div:last-child").css({"height" : max});
  }
}

$(window).resize(function() {
  height_adjust();
});

$(window).load(function() {
  $('.block-list').equalize({
    children: '.block',
    equalize: 'outerHeight'
  });
});


$(document).ready(function()
{
 fillFieldsFromUrl();
 height_adjust();
 $("#id_phone").intlTelInput({
  utilsScript: "/js/tel-input/lib/libphonenumber/build/utils.js",
  initialCountry: "fr"
});

 $(".petitionForm").on("submit", function(e)
 {
  e.preventDefault();
  if (isValid() == true) {
    console.log("form submitted");
  }
});
 $(".social-network").on("click", function(e) { e.preventDefault(); window.open($(this).attr('href'),'Je partage', 'height=500,width=500'); });
});

$(document).foundation();
