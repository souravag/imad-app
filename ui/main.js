var button = document.getElementById('counter'); 
button.onclick = function() {
 var request = new XMLHttpRequest();
 request.onreadystatechange = function() {
    if(request.readyState===XMLHttpRequest.DONE)
    {
        if(request.status===200){
            var counter=request.responseText;
            var span=document.getElementById('count');
            span.innerHTML="hello";
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
submitone.onclick = function() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readystate===XMLHttpRequest.DONE)
    {
        if(request.status===200){
            var comments=request.responseText;
            comments=JSON.parse(comments);
            var list='';
            for(var i=0;i<comments.length;i++){
                list + ='<li>' + comments[i] + '<li>';
            }
            var ul = document.getElementById('nameListArticleOne');
            ul.innerHTML=list;
        }
    }
  };
  var inputtext = document.getElementById('Article One');
  var str=inputtext.value;
  request.open('GET', 'http://souravagarwal54321.imad.hasura-app.io/article-one/comment?comment='+str,true);
  request.send(null);
};

//submittwo.onclick = function() {
    
//};

//submitthree.onclick = function() {
    
//};