var button = document.getElementById('counter'); 
var span=document.getElementById('count');
span.innerHTML="Many";
button.onClick = function() {
 var request = new XMLHttpRequest();
 request.onreadystatechange = function() {
    if(request.readyState===XMLHttpRequest.DONE)
    {
        if(request.status===200){
            var counter=request.responseText;
            var span=document.getElementById('count');
            span.innerHTML="Many";
        }
 }
 
  };
  request.open('GET', 'http://souravagarwal54321.imad.hasura-app.io/counter',true);
  request.send(null);
};
console.log('Loaded!');
