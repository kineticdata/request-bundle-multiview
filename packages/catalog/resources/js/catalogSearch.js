jQuery(document).ready(function() {
    // Setup initial ajaxForm state for catelog search
    var searchForm = '#catalogSearchForm';
    formSubmissionInit(
        searchForm,
        'html', 
        before, 
        success,
        error
    );
        
    /**
     * Form Initializer for ajaxSubmit
     * 
     * @param formSelector string
     * @param dataType string
     * @param beforeSend function
     * @param success function
     * @param error function
     * 
     * @author Andre Crouch
     */
    function formSubmissionInit(formSelector, dataType, beforeSend, success, error) {
       jQuery(formSelector).ajaxForm({
            dataType: dataType,
            beforeSend: function() {
                beforeSend();
            },
            success: function(data) {
                success(data);
            },
            error: function() {
                error();
            } 
        }); 
    }

    /**
     * Action functions for catalog search
     * @author Andre Crouch
     */
    function before() {
        jQuery.blockUI({ message: '<h1>Loading...</h1>' });
        jQuery('#loadingControl').hide();
        jQuery('#tabs').hide();
        jQuery('#submissionsTable').hide();
        jQuery('#searchResults').hide();
        jQuery('#searchSpinner').show();
        
    }

    function success(data) {
        if(data) {
            jQuery('#searchSpinner').hide();
            jQuery('#searchResults').html(data).show();
            jQuery('#loadingControl').fadeIn();
            jQuery.unblockUI();
            jQuery('#searchBack').on('click', '.header', function() {
                jQuery('#searchResults').hide();
                jQuery('#tabs').show();
            });
            // Retrieve the search value from the search input
            var searchValue = jQuery('#searchInput').val();
            jQuery('#searchBack').append('<span class="breadCrumbArrow">> Search Results:<span class="searchValue">'+searchValue+'</span></span>');
        }
    }

    function error() {
        jQuery('#searchSpinner').hide();
        jQuery('#searchResults').html('<div class="message">There was an error. Try again.</div>').show();
        jQuery('#loadingControl').fadeIn();
        jQuery.unblockUI();
    }
});