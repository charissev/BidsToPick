
// Write a comment
// DOESNT WORK-- JUST TRYING IT OUT
$(document).ready(function(){ 
 
  $(".primaryContained").on('click', function(){
  $(".comment").addClass("commentClicked");
});//end click
$("textarea").on('keyup.enter', function(){
  $(".comment").addClass("commentClicked");
});//end keyup
});//End Function

new Vue({
  el: "#app",
  data:{
     title: 'Add a comment',
    newItem: '',
    item: [],
  },
  methods:{
    addItem  (){
    this.item.push(this.newItem);
      this.newItem = "";
    }
}

});


function LikeToggle1(){
var likevar = document.getElementById("like1");
if (likevar.style.color =="red") {
  likevar.style.color = "grey"
}
else{
  likevar.style.color = "red"
}
}
function LikeToggle2(){
var likevar = document.getElementById("like2");
if (likevar.style.color =="red") {
  likevar.style.color = "grey"
}
else{
  likevar.style.color = "red"
}
}
function LikeToggle3(){
var likevar = document.getElementById("like3");
if (likevar.style.color =="red") {
  likevar.style.color = "grey"
}
else{
  likevar.style.color = "red"
}
}
function LikeToggle4(){
var likevar = document.getElementById("like4");
if (likevar.style.color =="red") {
  likevar.style.color = "grey"
}
else{
  likevar.style.color = "red"
}
}
function LikeToggle5(){
var likevar = document.getElementById("like5");
if (likevar.style.color =="red") {
  likevar.style.color = "grey"
}
else{
  likevar.style.color = "red"
}
}