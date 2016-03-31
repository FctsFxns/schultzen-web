//= require_self
$(document).ready(function() {
    $('img.duotone').duotone();
});


$(function() {
    // Homepage logo
    if ($('body.page-home').length > 0)
    {

        $('#index-slideshow h1.super-title').appear();

        $('#index-slideshow h1.super-title').on('appear', function(event, $all_appeared_elements) {
            // this element is now inside browser viewport
            $('a.navbar-brand').removeClass('show');    
        });

        $('#index-slideshow h1.super-title').on('disappear', function(event, $all_appeared_elements) {
            // this element is now outside browser viewport
            $('a.navbar-brand').addClass('show');    
        });

        $('.navbar-toggle').click(function() {
            $('a.navbar-brand').toggleClass('show');
        });

    }

});