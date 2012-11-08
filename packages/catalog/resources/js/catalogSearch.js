jQuery(document).ready(function() {
    // Click event for search
    jQuery('#catalogSearchForm').on('submit', function(event) {
        // Prevent default action.
        event.preventDefault();
        // Execute the ajax request.
        BUNDLE.ajax({
            cache: false,
            type: jQuery(this).attr('method'),
            data: jQuery(this).serialize(),
            url: jQuery(this).attr('action'),
            beforeSend: function(jqXHR, settings) {
                before(jqXHR, settings);
            },
            success: function(data, textStatus, jqXHR) {
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
        blockUICustom('<h1>Loading...</h1>', '300px');
        jQuery('.searchValue').text(searchValue);
        jQuery('#catalogContainer').hide();
        jQuery('#searchResults').empty();
        jQuery('#breadCrumbRoot').nextAll().remove();
        jQuery('.breadCrumbArrow').remove();
        jQuery('#breadCrumbRoot').append('<span class="breadCrumbArrow">></span>');
        jQuery('#catalogBreadCrumbs').append(jQuery('#breadCrumbSearchResults').html());
        // Retrieve the search value from the search input
        var searchValue = $('input[name="query"]').val();
        // Blank validation
        if(!searchValue) {
            // Fail abort request
            jqXHR.abort();
            // Focus on input
            $('input[name="query"]').focus();
            // Message
            jQuery('#searchResults').html('<div class="message alert alert-error"><a class="close" data-dismiss="alert">x</a> Search field required!</div>').show();
            jQuery.unblockUI();
        }    
    }

    function success(data, textStatus, jqXHR) {
        if(data) {
            jQuery('#searchResults').html(data).show();
            jQuery.unblockUI();
        }
    }

    function error(jqXHR, textStatus, errorThrown) {
        jQuery('#searchResults').html('<div class="message alert alert-error"><a class="close" data-dismiss="alert">x</a> There was an error. Try again.</div>').show();
        jQuery.unblockUI();
    }
});