var fields = [
    ["#input_name", "שם מלא:", "^[\\sa-zA-Z\u0590-\u05FF\b ']+$"],
    ["#input_phone", 'טלפון:', "^[\b0-9]+$"],
    ["#input_email", 'מייל:', "^[\\-a-zA-Z0-9@._\u0590-\u05FF\b]+$"]
];

function getQueryVariable(variable) {
    "use strict";
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return "nosource";
}

function reportLead() {

    "use strict";
    var url = "http://crmleads.si-mark.com/mcm/datao/lead?externalURL=true";
    var groupID = "4008";
    var siteID = "57";
    var msp = "P09TI01R548VPK4L";
    var uName = $("#input_name").val();
    var uPhone = $("#input_phone").val();
    var uEmail = $("#input_email").val();
    var uDivur = $('#check-box').is(':checked');
    var uRef = getQueryVariable("utm_source");
    var campaignName = "december2017";
    var imgURL = encodeURI(url + '&groupID=' + groupID + '&siteID=' + siteID + '&msp=' + msp + '&uName=' + uName + '&uPhone=' + uPhone + '&uEmail=' + uEmail + '&general1=' + uDivur + '&general2=' + uRef + '&general3=' + campaignName);
    var i = document.createElement("img");
    i.src = imgURL;

    if (getQueryVariable('utm_source') === 'yad2') {

        var pxls = $('.pxls');
        var html = '<script src="http://q.mimgoal.com/l/?mdscampaignid=5912e29363135833635686&mdschannelid=' + getQueryVariable('mdschannelid') + '&mdsviewid=' + getQueryVariable('mdsviewid') + '&fname=' + uName + '&lname=' + '' + '&email=' + uEmail + '&phone=' + uPhone + '" type="text/javascript"></script><noscript><img src="http://q.mimgoal.com/l/?mdscampaignid=5912e29363135833635686&mdschannelid=' + getQueryVariable('mdschannelid') + '&mdsviewid=' + getQueryVariable('mdsviewid') + '&fname=' + uName + '&lname=' + '' + '&email=' + uEmail + '&phone=' + uPhone + '" width="1" height="1" /></noscript>';
        pxls.html(html);

    }

    var url2 = "http://www1.tami4.co.il/campaigns/sendlead";
    var imgURL2 = encodeURI(url2 + '&name=' + uName + '&phone=' + uPhone + '&mail=' + uEmail + '&newsletter=' + uDivur + '&campaignName=' + "campaign_March_17" + '&landingUrl=' + window.location.href + '&providerName=' + "Adler" + '&affiliateid=' + getQueryVariable("utm_source") + '&refName=' + getQueryVariable("utm_source") + '&ref=' + getQueryVariable("utm_source") + '&bantype=' + getQueryVariable("utm_source") + '&banid=' + "3144");
    var i2 = document.createElement("img");
    i2.src = imgURL2;
}


function validateForm() {
    "use strict";
    $(".error").html('');
    $("#input_email").removeClass('input-error');
    $("#input_name").removeClass('input-error');
    $("#input_phone").removeClass('input-error');
    if (!isValidName($("#input_name").val()) || $("#input_name").val() === fields[0][1]) {
        $(".error").html("שם מלא - שדה חובה");
        $("#input_name").focus();
        $("#input_name").addClass('input-error');
        return false;
    }
    if (!isValidPhone($("#input_phone").val()) || $("#input_phone").val() === fields[1][1]) {
        $(".error").html("שדה טלפון - שדה חובה");
        $("#input_phone").focus();
        $("#input_phone").addClass('input-error');
        return false;
    }
    if ($("#input_email").val() !== '') {
        if (!isValidEmailAddress($("#input_email").val())) {
            $(".error").html('שדה מייל - שדה חובה');
            $("#input_email").focus();
            $("#input_email").addClass('input-error');
            return false;
        }
    }

    return true;
}

function isValidName(name) {
    "use strict";
    var pattern1 = new RegExp(/^[a-zA-Z\.\u0590-\u05FF \s']{1,}$/i);
    return pattern1.test(name);
}

function isValidPhone(phone) {
    "use strict";
    var pattern = new RegExp(/^0+(50|52|53|54|55|56|58|59|2|3|4|8|9|72|73|74|76|77|79)[1-9]{1}[0-9]{6}$/i);
    return pattern.test(phone);
}


function isValidEmailAddress(emailAddress) {
    "use strict";
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    return pattern.test(emailAddress);
}

function minH() {
    // if( window.innerWidth > 1000 ){
    //     if( window.innerHeight < 780 ){
    //         if( window.innerWidth < 1100 ){
    //             $('.wrapper').css('min-height', window.innerHeight+'px');
    //         }else {
    //             $('.wrapper').css('min-height', '780px');
    //         }
    //     }else {
    //         $('body').css('min-height', window.innerHeight+'px');
    //     }
    // }
}


function doFields(fld) {
    "use strict";
    $(fld[0]).focus(function () {
        if ($(this).val() === fld[1]) {
            $(this).val('').removeClass("placeholder");
        }
    });

    $(fld[0]).blur(function () {
        var newValue = $(this).val();
        if (newValue === '' || newValue === fld[1]) {
            $(this).val(fld[1]).addClass("placeholder");
        }
    }).triggerHandler('blur');

    $(fld[0]).bind('keypress', function (event) {
        var regex = new RegExp(fld[2]);
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    });
}

$(document).ready(function () {

    minH();
    $(window).on('resize', minH);

    $('#submit').on('click', function (e) {
        e.preventDefault();
        if (validateForm()) {
            //$('.thanks').fadeIn(500);
            $('.container').addClass('fade-out');
            setTimeout(function () { $('.wrapper').addClass('wrapper-thanks'); }, 500);

            reportLead();
            $('#pxl').attr('src', 'thanks_pxl.html');
        }

    });

    if (getQueryVariable("utm_source") === 'facebook') {
        $('.c2c').attr('href', 'tel:072-330-8374')
    }


    var date = new Date();
    var day = date.getDay();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var currentDay = date.getDate();
    var month = date.getMonth();
    var showForm = true;

    if (day >= 0 && day <= 5) {
        if (day === 5 && ((hour >= 8 && minute >= 30) || hour >= 9) && hour <= 11) {
            showForm = false;
            console.log('friday day');
        } else if (day < 5 && ((hour >= 8 && minute >= 30) || hour >= 9) && hour <= 17) {
            showForm = false;
        } else {
            showForm = true;
        }
    } else if (day === 6) {
        showForm = true;
    }

    if (showForm) {
        if ($(window).width() < 1000) {
            $('.form').css('display', 'block');
            $('.mobile_btns').css('display', 'none');
        }
    }

    $('.open-form').on('click', function () {
        //$('.form').css('display', 'block');
        //$('.mobile_btns').css('display', 'none');
        $('.mobile_btns').hide();
        $('.form').fadeIn(500);

    });

    // $('.c2c').on('click', function () {
    //     $('#pxl').attr('src', 'c2c_pxl.html')
    // })

});

function lettersOnly(evt) {
    evt = (evt) ? evt : event;
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
    if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
        return false;
    } else {
        return true;
    }
}