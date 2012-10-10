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

    function error(jqXHR, textStatus, errorThrown) {
        jQuery.unblockUI();
        jQuery('#searchSpinner').hide();
        jQuery('#searchResults').html('<div class="message">There was an error. Try again.</div>').show();
        jQuery('#loadingControl').fadeIn();
    }
});