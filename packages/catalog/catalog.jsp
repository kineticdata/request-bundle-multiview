<%-- Set the page content type, ensuring that UTF-8 is used. --%>
<%@page contentType="text/html; charset=UTF-8"%>

<%-- Include the package initialization file. --%>
<%@include file="framework/includes/packageInitialization.jspf"%>

<%-- Retrieve the Catalog --%>
<%
    // Retrieve the main catalog object
    Catalog catalog = Catalog.findByName(context, customerRequest.getCatalogName());
    // Preload the catalog child objects (such as Categories, Templates, etc) so
    // that they are available.  Preloading all of the related objects at once
    // is more efficient than loading them individually.
    catalog.preload(context);
%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><%= bundle.getProperty("companyName") + " " + bundle.getProperty("catalogName")%></title>

        <%-- Include the common content. --%>
        <%@include file="../../common/interface/fragments/headContent.jspf"%>

        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/catalog.css" type="text/css" />
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/catalogSearch.css" type="text/css" />
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/submissions.css" type="text/css" />
        <!-- Page Javascript -->
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/jquery.listnav.min-2.1.js"></script>
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/catalogSearch.js"></script>
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/catalog.js"></script>
        <script type="text/javascript" src="<%=bundle.bundlePath()%>common/resources/js/arsTable.js"></script>
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/submissions.js"></script>
    </head>
    
    <body>
        <%@include file="../../common/interface/fragments/contentHeader.jspf"%>
        <div class="container clearfix">
            <%-- SIDEBAR VIEW --%>
            <div id="sideNav">
                <div id="quicklinks">
                    <div class="header">
                        <div>
                        Quick Links
                        </div>
                    </div>
                    Service Item
                    <br />
                    Service Item
                    <br />
                    Service Item
                    <br />
                </div>
                <div id="contact">
                    <div class="header">Contact</div>
                    Name: Don Demo
                    <br />
                    Email: demo@demo.com
                    <br />
                    Phone: 612-555-5555
                    <br />
                    Department: IT
                </div>   
            </div>
            <div id="tabs">
                <ul>
                    <li><a href="#catalogContainer">Catalog</a></li>
                    <li><a href="#services">Services A - Z</a></li>
                    <li><a href="#searchServices">Search Services</a></li>
                    <li><a href="#submissionsTable">Submissions</a></li>
                </ul>
                <%-- CATALOG VIEW --%>
                <div id="catalogContainer" class="hidden clearfix">
                    <%-- BREADCRUMBS VIEW --%>
                    <div id="catalogBreadCrumbs">
                        <div id="breadCrumbRoot" data-id="root" class="breadCrumb">
                            Catalog
                        </div>
                    </div>
                    <div id="nestedNav">
                        <%-- TEMPLATES VIEW --%>
                        <div id="templatesNav">
                        </div>
                        <div id="categoriesNavHeader" class="hidden"></div>
                        <%-- CATAGORIES VIEW --%>
                        <div id="categoriesNav">
                            <% for (Category category : catalog.getRootCategories(context)) { %>
                                <% if (category.hasTemplates()) { %>
                                <div class="category" data-id="<%= category.getId()%>" data-name="<%= category.getName()%>">
                                    <div class="name navigation">
                                      <span class="arrow">></span>  <%= category.getName()%> 
                                    </div>                            
                                    <div class="description hidden">
                                        <%= category.getDescription()%>
                                    </div>
                                </div>
                                <%}%>
                            <%}%>
                        </div>
                    </div>
                    <div id="nestedNavigationPreview" class="preview">
                    </div>
                </div>
                <%-- TEMPLATES VIEW --%>
                <div id="services" class="hidden clearfix">
                    <%-- BROWSE ALPHABETICALLY --%>
                    <div id="browseAlphabetical" class="gradient">
                        <div class="header">
                            Browse Alphabetically
                        </div>
                        <div id="templatesAlphabetical-nav" class="templatesAlphabeticalNav">                        
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <%-- TEMPLATES WITH EXISTING CATEGORIES DATA --%>
                    <ul id="templatesAlphabetical">
                    <% for(Template template : catalog.getTemplates(context)) { %>
                        <% if (template.hasCategories()) {%>
                        <li class="template">
                            <div class="name">
                                <%= template.getName()%>
                            </div>
                            <div class="description">
                                <%= template.getDescription()%>
                                <a class="templateButton" href="<%= pathHelper.templateUrl(template.getId())%>">Request</a>
                            </div>
                        </li>
                        <% }%>
                    <% }%>
                    </ul>
                </div>
                <div id="searchServices" class="hidden clearfix">
                    <form id="catalogSearchForm" class="gradient" method="post" action="<%= bundle.packagePath() %>interface/callbacks/catalogSearch.html.jsp">
                        <input type="hidden" name="catalogName" value="<%= bundle.getProperty("catalogName") %>" />
                        <p>
                           <label class="infield" for="searchInput">Search Catalog</label>
                           <input type="text" name="query" id="searchInput" class="input-large" value="" />
                           <input type="submit" id="searchButton" value="" />
                        </p>
                    </form>
                    <div id="searchSpinner">
                        Searching for "<span class="searchValue"></span>"
                        <img alt="loading..." src="<%= bundle.bundlePath%>common/resources/images/spinner_00427E_FFFFFF.gif" />
                    </div>
                    <%-- SEARCH RESULTS VIEW --%>
                    <div id="searchResults">
                    </div>
                </div>
                <%-- SUBMISSIONS VIEW --%>
                <div id="submissionsTable" class="hidden clearfix">
                    <%-- SUBMISSION TABLE LINKS --%>
                    <div id="submissionsNavigation">
                        <% if (context != null) { %>
                            <%-- For each of the submission group queries specified in the
                                 common config.jsp file. --%>
                            <% for (String groupName : submissionGroups.keySet()) { %>
                                <%-- Count the number of submissions that match the current query --%>
                                <% Integer count = ArsBase.count(context, "KS_SRV_CustomerSurvey_base", submissionGroups.get(groupName)); %>
                                <%-- If there are more than 0 records matching, display a link to the table. --%>
                                <% if (count > 0) { %>
                                <div data-group-name="<%=groupName%>" class="nav box"><%=count%> <%=groupName%></div>
                                <% }%>
                            <% }%>
                        <% }%>
                    </div>
                    <div class="clearfix"></div>
                    <%@include file="interface/fragments/tableControls.jspf"%>
                    <div class="tableContainer hidden" id="tableContainerRequestsOpen"></div>
                    <div class="tableContainer hidden" id="tableContainerRequestsClosed"></div>
                    <div class="tableContainer hidden" id="tableContainerRequestsParked"></div>
                    <div class="tableContainer hidden" id="tableContainerApprovalsPending"></div>
                    <div class="tableContainer hidden" id="tableContainerApprovalsCompleted"></div>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
        <%@include file="../../common/interface/fragments/contentFooter.jspf"%>
        <%-- BREADCRUMB APPEND DATA FOR NON-CATAGORY ITEMS --%>
        <div id="breadCrumbSearchResults" class="hidden">
            <div class="breadCrumb">
                Search Results: "<span class="searchValue"></span>"
            </div>
        </div>
        <%-- ROOT CATEGORIES DATA --%>
        <div id="rootCategories" class="hidden">
        <% for (Category category : catalog.getRootCategories(context)) { %>
            <% if (category.hasTemplates()) { %>
            <div class="category" data-id="<%= category.getId()%>" data-name="<%= category.getName()%>">
                <div class="name navigation">
                    <span class="arrow">></span> <%= category.getName()%>
                </div>
                <div class="description hidden">
                    <%= category.getDescription()%>
                </div>
            </div>
            <% } %>
        <% }%>
        </div>
        <%-- CATEGORY DATA --%>
        <% for (Category category : catalog.getAllCategories(context)) {%>
            <% if (category.hasTemplates()) { %>
            <div class="category hidden" id="<%= category.getId()%>">
                <div class="name navigation">
                    <%= category.getName()%>
                </div>
                <div class="description hidden"><%= category.getDescription()%></div>
                <%-- SUBCATEGORIES DATA --%>
                <% if (category.hasNonEmptySubcategories()) {%>
                <div class="subcategories hidden">
                    <% for (Category subcategory : category.getSubcategories()) { %>
                        <% if (subcategory.hasTemplates()) { %>
                        <div class="category" data-id="<%= subcategory.getId()%>" data-name="<%= subcategory.getName()%>">
                            <div class="name navigation">
                                <span class="arrow">></span> <%= subcategory.getName()%>
                            </div>
                            <div class="description hidden">
                                <%= subcategory.getDescription()%>
                            </div>
                        </div>
                        <% }%>
                    <% }%>
                    <div class="clearfix"></div>
                </div>
                <% }%>
                <%-- TEMPLATES DATA --%>
                <% if (category.hasTemplates()) {%>
                <div class="templates hidden">
                    <% for (Template template : category.getTemplates()) {%>
                    <div class="template">
                        <div class="name navigation">
                            <%= template.getName()%>
                        </div>
                        <div class="description hidden">
                            <%= template.getDescription()%>
                            <a class="templateButton" href="<%= pathHelper.templateUrl(template.getId())%>">Request</a>
                        </div>
                    </div>
                    <% }%>
                </div>
                <% }%>
            </div>
            <% }%>
        <% }%>
    </body>
</html>