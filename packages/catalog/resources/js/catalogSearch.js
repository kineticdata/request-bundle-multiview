jQuery(document).ready(function() {
    // Click event for search
    jQuery('#catalogSearchForm').submit(function(event) {
        // Prevent default action.
        event.preventDefault();
        // Execute the ajax request.
        BUNDLE.ajax({
            cache: false,
            type: 'post',
            data: jQuery(this).serialize(),
            url: jQuery(this).attr('action'),
            beforeSend: function(jqXHR, settings) {
                before(jqXHR, settings);
            },
            success: function(data) {
                success(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                error(jqXHR, textStatus, errorThrown);
            }
        });
    });

    /**
     * Action functions for catalog search
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
        jQuery('#searchResults').html('<div class="message alert alert-danger"><a class="close" data-dismiss="alert">x</a> There was an error. Try again.</div>').show();
    }
});