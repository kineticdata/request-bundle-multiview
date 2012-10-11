jQuery(document).ready(function() {
    // Catalog global
    jQuery('body').on('click', 'a', function() {
        jQuery('html, body').animate({ scrollTop: 0 }, 0);
    });
    // Local selectors that are used quite a bit
    var templatesNav = '#templatesNav';
    var categoriesNav = '#categoriesNav';
    var preview = '#preview';
    
    // Some Default states for dom elements
    jQuery('.infield').inFieldLabels();
    // IE users do not get the privilege of this feature
    if(!jQuery.browser.msie) {
        /**
         * This wasn't simple because of all the element dependencies.  
         * Essentially we are turning the static dom elements into fixed and vice versa based on sideNavContainer position
         * @TODO how can we make this simply easy.
         */
        var nestedNav = jQuery('#nestedNav');
        stickyElement(nestedNav, 1, jQuery('.contentFooter').height() + 250, nestedNav.css('marginTop'), nestedNav.css('marginTop'), nestedNav.css('marginLeft'), nestedNav.css('marginLeft'));
        /** 
         * This is a control for the sticky element above.
         * nestedNav is sticky, which means it will become fixed on scroll if the window is large enough to support it.
         * This means that preview will float to the very left (once nestedNav is fixed) and so the preview margin has to be corrected for this.
         * Beside this, we need to control the fixed positioning of contentHeader, topNavContainer and sideBar.
         * Body is key to avoiding a break.
         */
        jQuery(window).scroll(function() {     
            if(nestedNav.css('position') == 'fixed') {
                jQuery('body').css({'padding-top':'95px'});
                jQuery('.contentHeader').css({'position':'fixed', 'top':0, 'left':0, 'right':0, 'z-index':9000});
                jQuery('#catalogBreadCrumbs').css({'position':'fixed', 'top':'71px', 'z-index': 9000});
                jQuery('#sideNav').css({'position':'fixed', 'margin-left':'844px', 'margin-top':'10px', 'z-index':9000});
                jQuery(preview).css({'margin':'22px 0px 0px 271px'});
            } else {
                jQuery('body').css({'padding-top':'0px'});
                jQuery('.contentHeader').css({position: 'static'});
                jQuery('#catalogBreadCrumbs').css({position: 'static'});
                jQuery('#sideNav').css({'position':'static', 'margin-left':'0px'});
                jQuery(preview).css({'margin':'22px 0px 0px 10px'});  
            }    
        });
    }
    // Display the header for categories and templates
    routeHeaderDisplay();
    
    /**
     * This jquery unobtrusive on click event displays the menus
     * @author Andre Crouch
     */
    jQuery(categoriesNav).on('click', '.category', function() {
        // Clear previews
        jQuery(preview).empty();
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
        getDescription(this);
    });
    
    // Show template description
    jQuery(templatesNav).on('click', '.template', function() {
        getDescription(this);
    });
    
    /**
     * This jquery unobtrusive on click event manages the view for bread crumbs, categories and templates.
     * @author Andre Crouch
     */
    jQuery('#catalogBreadCrumbs').on('click', '.breadCrumb', function() {
        // Clear previous previews
        jQuery(preview).empty();
        // Get current clicked bread crumb category id
        var categoryId =  jQuery(this).data('id');
        // Check if root bread crumb is selected
        if(categoryId == 'root') {
            
            // Default catalog state, make sure to hide any submissions or searches
            jQuery('#submissionsTable').hide();
            jQuery('#searchResults').hide();
            jQuery('.tableContainer').hide();
            jQuery('#catalogContainer').show();
            jQuery('#catalogSearchForm').show();
            
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
            getDescription('#'+categoryId);
        }
    });
    
   /**
    * StickyElement will make an element fixed based on the scroll position and parameters provided.
    * It also will return the element back to it's static position based on the scroll position and parameters provided.
    * 
    * @param selector string
    * @param topOffSet int
    * @param heightControlModifier int
    * @param marginTopFixed string
    * @param marginTopStatic string
    * @param marginLeftFixed string
    * @param marginLeftStatic string
    * @author Andre Crouch
    */
   function stickyElement(selector, topOffSet, heightControlModifier, marginTopFixed, marginTopStatic, marginLeftFixed, marginLeftStatic) {
       var obj = jQuery(selector);
       jQuery(window).scroll(function() {
           /**
            * So here's the deal, if your browser window is too small, the sticky elements displays improperly.
            * The scroll also acts very glithcy when the window is positioned so there is a minimal amount of scroll required.
            * So to solve for these problems we need to know the total height of the sticky element
            * The if statement checks if the total height is larger than the window height.
            * If that's the case, the sticky object remains static.
            */
           if(obj.height() + heightControlModifier >= jQuery(window).height()) {
               obj.css({
                   marginTop: marginTopStatic,
                   marginLeft: marginLeftStatic,
                   position: 'static'
               });
           } else {
               var scrollTop = jQuery(window).scrollTop();
               if (scrollTop < topOffSet){
                   obj.css({
                       marginTop: marginTopStatic,
                       marginLeft: marginLeftStatic,
                       position: 'static'
                   });
               }
               if (scrollTop >= topOffSet){

                   obj.css({
                       marginTop: marginTopFixed,
                       marginLeft: marginLeftFixed,
                       position: 'fixed'
                   });
               }
           }
       });    
   }

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
   function getDescription(element) {
       jQuery('.template').removeClass('textGreen');
       jQuery('.category').removeClass('textGreen');
       jQuery(element).addClass('textGreen');
       jQuery(preview).empty();
       var currentCategoryDescription = jQuery(element).find('.description').html();
       jQuery(preview).html(currentCategoryDescription);
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
});