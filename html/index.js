
var func=function (data){
  $("#result").html(data);
}

$(document).ready(function() {



  $("#submit").bind("click", function(){

    //var params={"method":"validate_user", "class":"", "args":{"user", "pass"}};
    //var params={"callback":"func"};
    //var params={"method":"validate_user", "class":"Core","args":["user", "pass"]};
    // EXAMPLE var params={"method":"validate_user", "args":["user", "pass"]};
    //var params={"method":"listvars", "class":"['',VariablesManager]", "args":""};

    var command=$("#command").val();
    var n4dclass=$("#class").val();
    var user=$("#user").val();
    var pass=$("#pass").val();
    var arglist=$("#arglist").val();

    var params={};
    console.log("1");
    if (command!=="") params["method"]=command;
    //if (command!=="") $(params).append({"method": command});
    console.log(params.method);
    if (user!=="") params["user"]=user;
    if (pass!=="") params["pass"]=pass;
    if (n4dclass!=="") params["class"]=n4dclass;
    if (arglist!=="") params["args"]=arglist.split(",");

    console.log(params);

    $.ajax({
        url: "http://"+location.host+":7997/'",
        data: JSON.stringify(params),
        type: "GET",
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8;",
        crossDomain: true,
        jsonpCallback: "func",
        xhrFields: {
          withCredentials: true
        },
        ajaxSuccess: function(data)
         {
          data = JSON.parse(data);
          console.log("data _" +data);
         },
         error: function(xhr, status, error) {
          if (status === 'parsererror') {
                  console.log("resptext__" + xhr.responseText)
              }
            console.log("status _" +status);
            console.log("error _" +error);
         },
         complete: function(response)
         {
          console.log("response _" +JSON.stringify(response));
         }



    });




  });








})
