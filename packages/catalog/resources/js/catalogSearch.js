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
        // Retrieve the search value from the search input
        var searchValue = jQuery('#searchInput').val();
        jQuery('.searchValue').text(searchValue);
        jQuery('#catalogContainer').hide();
        jQuery('#submissionsTable').hide();
        jQuery('#searchResults').hide();
        jQuery('#searchSpinner').show();
        jQuery('#breadCrumbRoot').nextAll().remove();
        jQuery('.breadCrumbArrow').remove();
        jQuery('#breadCrumbRoot').append('<span class="breadCrumbArrow">></span>');
        jQuery('#catalogBreadCrumbs').append(jQuery('#breadCrumbSearchResults').html());
    }

    function success(data) {
        if(data) {
            jQuery('#searchSpinner').hide();
            jQuery('#searchResults').html(data).show();
        }
    }

    function error() {
        jQuery('#searchSpinner').hide();
        jQuery('#searchResults').html('<div class="message">There was an error. Try again.</div>').show();
    }
});