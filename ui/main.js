

var btn = document.getElementById('login_btn'); 
btn.onclick = function() {
 var request = new XMLHttpRequest();
 request.onreadystatechange = function() {
    if(request.readyState===XMLHttpRequest.DONE)
    {
        if(request.status===200){
           console.log('User logged in!');
           alert('Login Success!');
        }
        else if(request.status===403)
        {
            alert('incorrect credentials!');
        }
        else if(request.status==500)
        {
            alert('Something went wrong! Try again!');
        }
 }
 
  };
  var user=document.getElementById('username').value;
  var pass=document.getElementById('password').value;
  console.log('Username and password received!');
  request.open('POST', 'http://souravagarwal54321.imad.hasura-app.io/login',true);
  request.setRequestHeader('Content-Type':'application/json');
  request.send(JSON.stringify({username: user,password:pass}));
};
console.log('Loaded!');


var button = document.getElementById('counter'); 
button.onclick = function() {
 var request = new XMLHttpRequest();
 request.onreadystatechange = function() {
    if(request.readyState===XMLHttpRequest.DONE)
    {
        if(request.status===200){
            var counter=request.responseText;
            var span=document.getElementById('count');
            span.innerHTML=counter.toString();
        }
 }
 
  };
  request.open('GET', 'http://souravagarwal54321.imad.hasura-app.io/counter',true);
  request.send(null);
};
console.log('Loaded!');

var submit=document.getElementById('submit_btn');

submit.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
    if(request.readyState===XMLHttpRequest.DONE)
    {
        if(request.status===200){
            var names=request.responseText;
            names=JSON.parse(names);
            var list='';
            for(var i=0;i<names.length;i++){
             list +='<li>' + names[i] + '</li>';
        }
        var ul = document.getElementById('namesList');
        ul.innerHTML=list;
 }
    }
};
    //var names=['sands','hello','welcome','good luck'];
    var nameInput=document.getElementById('name');
    var str = nameInput.value;
    request.open('GET', 'http://souravagarwal54321.imad.hasura-app.io/username?name='+str,true);
  request.send(null);
    

};

var submitone = document.getElementById('submit_btnArticle One');
var submittwo = document.getElementById('submit_btnArticle Two');
var submitthree = document.getElementById('submit_btnArticle Three');
console.log("Articles!");
submitone.onclick = function() {
    console.log("Button clicked!");
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readystate===XMLHttpRequest.DONE)
    {
        if(request.status===200){
            var comments=request.responseText;
            comments=JSON.parse(comments);
            var list='';
            for(var i=0;i<comments.length;i++){
                list +='<li>' + comments[i] + '<li>';
            }
            var ul = document.getElementById('nameListArticle One');
            ul.innerHTML=list;
        }
    }
  };
  var inputtext = document.getElementById('Article One');
  var str=inputtext.value;
  request.open('GET', 'http://souravagarwal54321.imad.hasura-app.io/articles/article-one/comment?comment='+str,true);
  request.send(null);
};

//submittwo.onclick = function() {
    
//};

//submitthree.onclick = function() {
    
//};