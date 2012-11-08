$(document).ready(function() {
    // Click event for search
    $('#catalogSearchForm').on('submit', function(event) {
        // Prevent default action.
        event.preventDefault();
        // Execute the ajax request.
        BUNDLE.ajax({
            cache: false,
            type: $(this).attr('method'),
            data: $(this).serialize(),
            url: $(this).attr('action'),
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

    // Set variables
    var searchResults = '#searchResults';
    var loader = '#loader';
    /**
     * Action functions for catalog search
     */
    function before() {
        blockUICustom('<h1>Loading...</h1>', '300px');
        // Retrieve the search value from the search input
        var searchValue = jQuery('#searchInput').val();
        jQuery('.searchValue').text(searchValue);
        jQuery('#catalogContainer').hide();
        jQuery('#submissionsTable').hide();
        jQuery('#searchResults').hide();
    }

    function success(data, textStatus, jqXHR) {
        if(data) {
            jQuery('#searchResults').html(data).show();
            jQuery.unblockUI();
            // Retrieve the search value from the search input
            var searchValue = jQuery('#searchInput').val();
            jQuery('#searchFor').append('Search Results:<span class="searchValue">&nbsp;'+searchValue+'</span>');
        }
    }

    function error(jqXHR, textStatus, errorThrown) {
        $(searchResults).html('<div class="message alert alert-error"><a class="close" data-dismiss="alert">x</a> There was an error. Try again.</div>').show();
        $(loader).hide();
    }
});