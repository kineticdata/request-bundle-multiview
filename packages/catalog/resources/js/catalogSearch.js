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
    function before(jqXHR, settings) {
        jQuery.blockUI({ message: '<h1>Loading...</h1>' });
        jQuery('#searchResults').hide();
        jQuery('#searchSpinner').show();
        
    }

    function success(data) {
        if(data) {
            jQuery('#searchSpinner').hide();
            jQuery('#searchResults').html(data).show();
            jQuery.unblockUI();
            // Retrieve the search value from the search input
            var searchValue = jQuery('#searchInput').val();
            jQuery('#searchFor').append('Search Results:<span class="searchValue">&nbsp;'+searchValue+'</span>');
        }
    }

    function error(jqXHR, textStatus, errorThrown) {
        // Clear alert
        jQuery.unblockUI();
        jQuery('#searchSpinner').hide();
        jQuery('#searchResults').html('<div class="message alert alert-danger"><a class="close" data-dismiss="alert">x</a> There was an error. Try again.</div>').show();
    }
});