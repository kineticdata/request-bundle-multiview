jQuery(document).ready(function() {
    // Local selectors that are used quite a bit
    var templatesNav = '#templatesNav';
    var categoriesNav = '#categoriesNav';
    var nestedPreview = '#nestedNavigationPreview';

    // Some Default states for dom elements
    jQuery('#tabs').tabs();
    setTimeout(function() {
        jQuery('#tabs').fadeIn();
    }, 1);
    jQuery('body').on('click', 'a', function() {
        jQuery('html, body').animate({ scrollTop: 0 }, 0);
    });
    jQuery('.infield').inFieldLabels();
    initializeAlphabeticalNav('#templatesAlphabetical', true);
    // Display the header for categories and templates
    routeHeaderDisplay();
    
    /**
     * This jquery unobtrusive on click event displays the menus
     * @author Andre Crouch
     */
    jQuery(categoriesNav).on('click', '.category', function() {
        // Clear previews
        jQuery(nestedPreview).empty();
        // Get current clicked category id and name
        var categoryId =  jQuery(this).data('id');
        var categoryName =  jQuery(this).data('name');
        // Find category's children and get the html
        var currentSubcategories = jQuery('#'+categoryId).find('.subcategories').html();
        // Display the category's children into div
        if(currentSubcategories) {
            jQuery(categoriesNav).html(currentSubcategories);
        } else {
            jQuery(categoriesNav).html('');
        }
        // Find category's templates and get the html
        var currentTemplates = jQuery('#'+categoryId).find('.templates').html();
         // Display the category's templates into div
        jQuery(templatesNav).html(currentTemplates);
        // Add arrow to the last bread crumbs child before we append new category bread crumb
        jQuery('#catalogBreadCrumbs .breadCrumb').last().append('<span class="breadCrumbArrow">></span>'); 
        // Create new bread crumb with the category's details
        var breadCrumb = '<div class="breadCrumb" data-id="'+categoryId+'" data-name="'+categoryName+'">'+categoryName+'</div>';
        // Append new bread crumb to current list of bread crumbs
        jQuery('#catalogBreadCrumbs').append(breadCrumb);
        // Route header display
        routeHeaderDisplay();
        getDescription(this, nestedPreview);
    });

    // Show template description
    jQuery(templatesNav).on('click', '.template', function() {
        getDescription(this, nestedPreview);
    });

    /**
     * This jquery unobtrusive on click event manages the view for bread crumbs, categories and templates.
     * @author Andre Crouch
     */
    jQuery('#catalogBreadCrumbs').on('click', '.breadCrumb', function() {
        // Clear previous previews
        jQuery(nestedPreview).empty();
        // Get current clicked bread crumb category id
        var categoryId =  jQuery(this).data('id');
        // Check if root bread crumb is selected
        if(categoryId == 'root') {
            // Remove arrow for currently selected
            jQuery(this).find('.breadCrumbArrow').remove();
            var rootCategories = jQuery('#rootCategories').html();
            jQuery(categoriesNav).html(rootCategories);
            jQuery(templatesNav).empty();           
            jQuery(this).nextAll().remove();
            routeHeaderDisplay();
        } else {
            // Remove arrow for currently selected
            jQuery(this).find('.breadCrumbArrow').remove();
            var currentSubcategories = jQuery('#'+categoryId).find('.subcategories').html();
            var currentTemplates = jQuery('#'+categoryId).find('.templates').html();
            jQuery(categoriesNav).html(currentSubcategories);
            jQuery(templatesNav).html(currentTemplates);
            jQuery(this).nextAll().remove();
            routeHeaderDisplay();     
            getDescription('#'+categoryId, nestedPreview);
        }
    });

    /**
    * @TODO, this might be overkill, mostly wanted to try out getters and setters 
    * along with building a fluent interface using JavaScript
    * @author Andre Crouch
    */
    function Selector() {
       /**
        *@param private string
        */
       var selector = new String();

       /**
        *@param private function
        */
       var sucessAction = function(){};

       /**
        *@param private function
        */
       var failAction = function(){};

       /**
        *@param element
        *@return SelectorExistance
        */
       this.setSelector = function(element) {
           selector = jQuery(element);
           return this;
       }

       /**
        *@param successFunction
        *@return SelectorExistance
        */
       this.setSuccessAction = function(successFunction) {
           sucessAction = successFunction;
           return this;

       }

       /**
        *@param failFunction
        *@return SelectorExistance
        */
       this.setFailAction = function(failFunction) {
           failAction = failFunction;
           return this;

       }

       /**
        *@return success or fail action
        */
       this.checkExistance = function() {
           if(!selector || selector.length == 0) {
               return failAction()
           } else {
               return sucessAction()
           }
       }
    }

    /**
    * Just a lib of javascript functions that have DOM specific behaviors.
    * @author Andre Crouch
    */    
    function sucessActionTemplate() {
       selector.setSelector(categoriesNav+' .category')
               .setSuccessAction(sucessActionHeadCategory)
               .setFailAction(failActionTemplate)
               .checkExistance();
    }

    function sucessActionHeadCategory() {
       jQuery('#categoriesNavHeader').show();
    }

    function failActionTemplate() {
       jQuery('#categoriesNavHeader').hide();
    }

    /**
     * This function will display template and category descriptions
     * @author Andre Crouch
     */
    function getDescription(element, previewElement) {
        jQuery('.template').removeClass('textGreen');
        jQuery('.category').removeClass('textGreen');
        jQuery(element).addClass('textGreen');
        jQuery(previewElement).empty();
        var currentCategoryDescription = jQuery(element).find('.description').html();
        jQuery(previewElement).html(currentCategoryDescription);
    }

    /**
     * @TODO
     * It is not easy to find happiness in ourselves, and it is not possible to find it elsewhere.
     */
    function routeHeaderDisplay() {
        // Instantiate object
        selector = new Selector();
        // fluent interface
        selector.setSelector(templatesNav+' .template')
                .setSuccessAction(sucessActionTemplate)
                .setFailAction(failActionTemplate)
                .checkExistance();
    }

    function initializeAlphabeticalNav(ulSelector, includeAll) {
        jQuery(ulSelector).listnav({
            includeAll: includeAll,
            noMatchText: 'There are no matching entries.',
            showCounts: false
        });
    }
});