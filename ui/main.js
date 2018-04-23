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

var comment1[];
var submitone = document.getElementById('submit_btnArticle One');
submitone.onclick= function() {
    var comment=document.getElementById('Article One');
    var str=comment.value;
    comment1.push(str);
    var li='';
    for(var i=0;i<comment1.length;i++){
        li +='<li>' + comment1[i] + '</li>';
    }
    var ul = document.getElementById('nameListArticle One');
    ul.innerHTML=li;
};
