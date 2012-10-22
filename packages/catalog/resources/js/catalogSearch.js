jQuery(document).ready(function() {
    // Click event for search
    jQuery('#catalogSearchForm').on('submit', function(event) {
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
        jQuery.blockUI({ 
            message: '<h1>Loading...</h1>',
            showOverlay: true, 
            centerY: true,
            centerX: true,
            css: {
                width: '300px',
                border: 'none', 
                padding: '5px', 
                backgroundColor: '#000', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: .6, 
                color: '#fff' 
            }
        });
        // Retrieve the search value from the search input
        var searchValue = jQuery('#searchInput').val();
        jQuery('.searchValue').text(searchValue);
        jQuery('#catalogContainer').hide();
        jQuery('#submissionsTable').hide();
        jQuery('#searchResults').hide();
        jQuery('#breadCrumbRoot').nextAll().remove();
        jQuery('.breadCrumbArrow').remove();
        jQuery('#breadCrumbRoot').append('<span class="breadCrumbArrow">></span>');
        jQuery('#catalogBreadCrumbs').append(jQuery('#breadCrumbSearchResults').html());
    }

    function success(data) {
        if(data) {
            jQuery('#searchResults').html(data).show();
            jQuery.unblockUI();
        }
    }

    function error() {
        jQuery.unblockUI();
        jQuery('#searchResults').html('<div class="message alert alert-error"><a class="close" data-dismiss="alert">x</a> There was an error. Try again.</div>').show();
    }
});