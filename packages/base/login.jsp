<%-- Set the page content type, ensuring that UTF-8 is used. --%>
<%@page contentType="text/html; charset=UTF-8"%>

<%-- Include the package initialization file. --%>
<%@include file="framework/includes/packageInitialization.jspf"%>

<%--
    If the user is already logged in, redirect them to the appropriate location
    and return (this prevents the JSP content from being evaluated and
    rendered).
--%>
<%@include file="framework/includes/redirectIfLoggedIn.jspf"%>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><%= customerRequest.getTemplateName()%></title>

        <%-- Include the application head content. --%>
        <%@include file="../../core/interface/fragments/applicationHeadContent.jspf" %>

        <%-- Include the bundle common content. --%>
        <%@include file="../../common/interface/fragments/headContent.jspf"%>

        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/login.css" type="text/css" />
        <!-- Page Javascript -->       
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/login.js"></script>
    </head>
    <body>
        <%@include file="../../common/interface/fragments/contentHeader.jspf"%>       
        <div class="container">
            <div id="loginHeader" class="header">
                Catalog Login
            </div>
            <!-- Render the Login Box -->
            <div class="loginSection">
                <!-- Login Box Header -->
                <div class="pageHeader">
                    <h3>Please Log In</h3>
                </div>
                <!-- Logging In Spinner -->
                <div class="hidden" id="loader">
                    <img style="margin: 0px 0px 10px 0px; height: 24px; width: 24px;" alt="Please Wait." src="<%=bundle.bundlePath()%>common/resources/images/spinner.gif" />
                    <br />
                    Authenticating
                </div>
                <!-- Error Message -->
                <% if (!("".equals(customerRequest.getErrorMessage()) || customerRequest.getErrorMessage() == null)) { %>   
                    <div class="message alert alert-error">
                        <a class="close" data-dismiss="alert">x</a>
                            <%= customerRequest.getErrorMessage() %>
                            <% customerRequest.clearErrorMessage(); %>
                </div>
                <% }%>
                <!-- Login Form -->
                <form id="loginForm" class="border rounded boxShadow gradient" name="Login" method="post" action="KSAuthenticationServlet">
                    <!-- User Name -->
                    <p>
                        <label class="infield" for="UserName">Username</label>
                        <input id="UserName" name="UserName" type="text" autocomplete="off" />
                    </p>
                    <!-- Password -->
                    <p>
                        <label class="infield" for="Password">Password</label>
                        <input id="Password" name="Password" type="password" autocomplete="off" />
                    </p>
                    <!-- Options -->
                    <!-- Log In Button -->
                    <input id="loginSubmit" class="templateButton" type="submit" value="Log In" />
                    <% if (bundle.getProperty("forgotPasswordAction") != null) {%>
                        <!-- Forgot Password -->
                        <a href="<%= bundle.getProperty("forgotPasswordAction")%>">Forgot Password</a>
                    <% }%>
                </form>
            </div>
            <div class="clearfix"></div>
        </div>
        <%@include file="../../common/interface/fragments/contentFooter.jspf"%>
    </body>
</html>