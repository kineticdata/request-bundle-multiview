/*
 * When the page loads, use jQuery infield label and focus username. Note that
 * infield labels uses class 'infield' and the id of the input element set focus is 'UserName' in the login.jsp.
 */
jQuery(document).ready(function() {
    jQuery('.infield').inFieldLabels();
    jQuery('#UserName').focus();
    jQuery('#loginSubmit').on('click', function(event) {
        // This will try to remove alert whether it is there or not so loader will take it's place.
        jQuery('.alert').remove();
        // This will display the loader.
        jQuery('#loader.hidden').show().css({'visibility':'visible'});
    });
});