/**
 * Created with JetBrains WebStorm.
 * User: bambalakkat
 * Date: 11/4/12
 * Time: 3:58 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function () {
    // Toggle the dropdown menu's
    $(".dropdown .guibutton, .dropdown guibutton").click(function () {
        $(this).parent().find('.dropdown-slider').slideToggle('fast');
        $(this).find('span.toggle').toggleClass('active');
        return false;
    });
}); // END document.ready

// Close open dropdown slider/s by clicking elsewhwere on page
$(document).bind('click', function (e) {
    if (e.target.id != $('.dropdown').attr('class')) {
        $('.dropdown-slider').slideUp();
        $('span.toggle').removeClass('active');
    }
}); // END document.bind