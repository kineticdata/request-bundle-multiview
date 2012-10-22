/**
 * @param loadingMsg string
 * @param width string
 */
function blockUICustom(loadingMsg, width) {
    jQuery.blockUI({ 
        message: loadingMsg,
        showOverlay: true, 
        centerY: true,
        centerX: true,
        baseZ: 10000,
        css: {
            width: width,
            border: 'none', 
            padding: '5px', 
            backgroundColor: '#000000', 
            '-moz-border-radius': '5px',
            '-webkit-border-radius': '5px',
            '-khtml-border-radius': '5px',
            'border-radius': '5px',
            opacity: .6, 
            color: '#FFFFFF'
        }
    });
}

/**
 * Ajax Class
 */
function Ajax() {
   'use strict';

    /**
     * @var string private
     */
    var ajaxSelector = new String();

    /**
     * @var object private
     */
    var options = {};

    /**
     * @param selector
     * @return FormInitializer
     */
    this.setAjaxSelector = function(selector) {
        ajaxSelector = selector;
        return this;
    }

    /**
     * @param object
     * @return FormInitializer
     */
    this.setOptions = function(ajaxOptions) {
        options = ajaxOptions;
        return this;
    }

    /**
     * @return FormInitializer
     */
    this.makeRequest = function() {
        if(ajaxSelector == null) {
             $(selector).ajax(options);
         } else {
            $.ajax(options);
         }      
        return this;
    }
}

/**
 * Message class
 */
function Message() {
    'use strict';

    /**
     * @var string private
     */
    var message = new String();

    /**
     * @param msg
     * @return Message
     */
    this.setMessage = function(msg) {
        message = msg;
        return this;
    }

    /**
     * @return error message
     */
    this.getErrorMessage = function() {
        return '<div class="message alert alert-error"><a class="close" data-dismiss="alert">x</a>'+message+'</div>';
    }

    /**
     * @return success message
     */
    this.getSuccessMessage = function() {
        return '<div class="message alert alert-success"><a class="close" data-dismiss="alert">x</a>'+message+'</div>';
    }

    /**
     * @return info message
     */
    this.getWarningMessage = function() {
        return '<div class="message alert alert-info"><a class="close" data-dismiss="alert">x</a>'+message+'</div>';
    }
}

/**
 * DialogInitializer Class
 */
function DialogInitializer() {
    'use strict';

    /**
     * @var function private
     */
    var openAction = function(){};

    /**
     * @var function private
     */
    var beforeCloseAction = function(){};

    /**
     * @var function private
     */
    var closeAction = function(){};

    /**
     * @var string private
     */
    var dialogSelector = new String();

    /**
     * @var string private
     */
    var title = new String();

     /**
     * @var string private
     */
    var width = 0;

    /**
     * @param element
     * @return DialogInitializer
     */
    this.setDialogSelector = function(element) {
        dialogSelector = element;
        return this;
    }

    /**
     * @param dialogTitle
     * @return DialogInitializer
     */
    this.setDialogTitle = function(dialogTitle) {
        title = dialogTitle;
        return this;
    }

    /**
     * @param dialogWidth
     * @return DialogInitializer
     */
    this.setDialogWidth = function(dialogWidth) {
        width = dialogWidth;
        return this;
    }

    /**
     * @param openFunction
     * @return DialogInitializer
     */
    this.setOpenAction = function(openFunction) {
        openAction = openFunction;
        return this;
    }

   /**
     * @param beforeCloseFunction
     * @return DialogInitializer
     */
    this.setBeforeCloseAction = function(beforeCloseFunction) {
        beforeCloseAction = beforeCloseFunction;
        return this;
    }

    /**
     * @param closeFunction
     * @return DialogInitializer
     */
    this.setCloseAction = function(closeFunction) {
        closeAction = closeFunction;
        return this;
    }

    /**
     * @return DialogInitializer
     */
    this.closeDialog = function() {
        $(dialogSelector).dialog('close');
        return this;
    }

    /**
     * @return DialogInitializer
     */
    this.startDialog = function() {
        jQuery(dialogSelector).dialog({
            title: title,
            resizable: false,
            draggable: false,
            modal: true,
            closeOnEscape: true,
            closeText: '',
            position:['middle', 240],
            width: width,
            show: 'fade',
            hide: 'fade',
            dialogClass:'dev_dialog',
            minHeight: 0,
            zIndex: 10000,
            open: openAction,
            close: closeAction
        });
        return this;
    }
}

/**
 * TabsInitializer Class
 */
function TabsInitializer() {
    'use strict';

    /**
     * @var function private
     */
    var createAction = function(){};

    /**
     * @var function private
     */
    var selectAction = function(){};

    /**
     * @var string private
     */
    var tabsSelector = new String();

    /**
     * @var int private
     */
    var selectedTab = 0;

    /**
     * @param element
     * @return TabsInitializer
     */
    this.setTabsSelector = function(element) {
        tabsSelector = element;
        return this;
    }

    /**
     * @param createFunction
     * @return TabsInitializer
     */
    this.setCreateAction = function(createFunction) {
        createAction = createFunction;
        return this;
    }

    /**
     * @param selectFunction
     * @return TabsInitializer
     */
    this.setSelectAction = function(selectFunction) {
        selectAction = selectFunction;
        return this;
    }

    /**
     * @param selected int
     * @return TabsInitializer
     */
    this.setSelectedTab = function(selected) {
        selectedTab = selected;
        return this;
    }

    /**
     * @return TabsInitializer
     */
    this.startTabs = function() {
        jQuery(tabsSelector).tabs({
            selected: selectedTab,
            create: function(event, ui) {
                // ui.index is undefined, this little hax fixes that problem
                ui.index = selectedTab;
                createAction(this, event, ui);
            },
            select: function(event, ui) {
                selectAction(this, event, ui);
            }
        });
        return this;
    }
}