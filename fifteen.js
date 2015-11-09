//The animation and transition of tiles additional feature was implemented.
// The image change was also implemented
//id: 620024494
// Was assisted by Rojay paseley with some of the functions



var space=15; //Empty tile
var move="none";// direction
var boxes1;//Array of tiles
var counter=0;
var adder=0;
var str;
var inProgress= false;//Is tile still moving..

//Loads tiles when webpage loads
window.onload = function(){
	var boxes = document.getElementById('puzzlearea').getElementsByTagName('div');
	boxes1=boxes;
	var btn = document.getElementById('shufflebutton');
	btn.onclick=shuffle;
	for(var i=0; i<boxes.length;i++){
		boxes[i].className = 'puzzlepiece';
		boxes[i].onmouseover = canMove;
		boxes[i].onmouseout = clear;
		boxes[i].onclick = moveTile;

		if(i>=0 && i<=3){
			boxes[i].style.left+=i*100+'px';
			boxes[i].style.top=0+'px';
			boxes[i].style.backgroundPosition = -i*100+'px '+'0px';
		}else if(i>=4 && i<=7){
			boxes[i].style.left+=(i-4)*100+'px';
			boxes[i].style.top=100+'px';
			boxes[i].style.backgroundPosition = -(i-4)*100+'px '+'-100px';
		}else if(i>=8 && i<=11){
			boxes[i].style.left+=(i-8)*100+'px';
			boxes[i].style.top=200+'px';
			boxes[i].style.backgroundPosition = -(i-8)*100+'px '+'-200px';
		}else{
			boxes[i].style.left+=(i-12)*100+'px';
			boxes[i].style.top=300+'px';
			boxes[i].style.backgroundPosition = -(i-12)*100+'px '+'-300px';
		}
		
	}
};

// do check for the movement of the title
function canMove(){
	if(!inProgress){
		if((parseInt(this.style.left)+parseInt(this.offsetWidth)) === parseInt(getX()) && this.style.top===getY()){
		this.className = this.className + " movablepiece";
		move="right";
		}else if(parseInt(this.style.left) === (parseInt(getX())+parseInt(this.offsetWidth)) && this.style.top===getY()){
			this.className = this.className + " movablepiece";
			move= "left";
		}else if((parseInt(this.style.top)+parseInt(this.offsetHeight)) === parseInt(getY()) && this.style.left===getX()){
			this.className = this.className + " movablepiece";
			move= "down";
		}else if(parseInt(this.style.top) === (parseInt(getY())+parseInt(this.offsetHeight)) && this.style.left===getX()){
			this.className = this.className + " movablepiece";
			move= "up";
		}else{
			move= "none";
		}
	}
	

}

//.moveablepiece class is removed when mouse exits tile
function clear(){
	this.className = 'puzzlepiece';
}

//Check shuffle if possable
function canMove1(elmt){
	if((parseInt(elmt.style.left)+parseInt(elmt.offsetWidth)) === parseInt(getX()) && elmt.style.top===getY()){
		move="right";
		return "right";
	}else if(parseInt(elmt.style.left) === (parseInt(getX())+parseInt(elmt.offsetWidth)) && elmt.style.top===getY()){
		move= "left";
		return "left";
	}else if((parseInt(elmt.style.top)+parseInt(elmt.offsetHeight)) === parseInt(getY()) && elmt.style.left===getX()){
		move= "down";
		return "down";
	}else if(parseInt(elmt.style.top) === (parseInt(getY())+parseInt(elmt.offsetHeight)) && elmt.style.left===getX()){
		move= "up";
		return "up";
	}else{
		move= "none";
		return "none";
	}

}

//Animates movement of the title
function shift(){
	var x = 0;
	for(var i=0; i<boxes1.length;i++){
		if(boxes1[i].textContent===str){
			x=i;	
		}
	}
	
	if(adder!=100){
		if(move==="left" || move==="right"){
			boxes1[x].style.left=parseInt(boxes1[x].style.left)+counter+'px';
		}else{
			boxes1[x].style.top=parseInt(boxes1[x].style.top)+counter+'px';
		}
		adder+=1;
		inProgress=true;
		setTimeout("shift()", "1 * 1000");
	}else{
		adder=0;
		inProgress=false;
		move="none";
	}	
	
}

//Gets direction and shift title according
function moveTile(){
	if(!inProgress){
		if(move === "right"){
			counter=1;
			space-=1;
			str=this.textContent;
			shift();
		}else if(move === "left"){
			counter=-1;
			space+=1;
			str=this.textContent;
			shift();
		}else if(move === "down"){
			counter=1;
			space-=4;
			str=this.textContent;
			shift();
		}else if(move === "up"){
			counter=-1;
			space+=4;
			str=this.textContent;
			shift();
		}
	}

}

//Move method for shuffle
var moveTile1 = function(elmt){

	if(move === "right"){
		elmt.style.left=parseInt(elmt.style.left)+100+'px';
		space-=1;
	}else if(move === "left"){
		elmt.style.left=parseInt(elmt.style.left)-100+'px';
		space+=1;
	}else if (move === 'down'){
		elmt.style.top=parseInt(elmt.style.top)+100+'px';
		space-=4;
	}else if(move === 'up'){
		elmt.style.top=parseInt(elmt.style.top)-100+'px';
		space+=4;
	}
}

//shuffles tiles
function shuffle(){
	var num=100;
	for(var i =0; i<num; i++){
		var lst = [];
		for(var y =0; y<boxes1.length; y++){
			if(canMove1(boxes1[y])!="none"){
				lst.push(y);
			}

		}
		if(lst.length!=0){
			var n = lst[Math.floor((Math.random()*lst.length)+0)];
			canMove1(boxes1[n]);
			moveTile1(boxes1[n]);
		}
	}
	move="none";
}

//Returns the corresponding X for the empty tile
function getX(){
		if(space>=0 && space<=3){
			return space*100+'px';
		}else if(space>=4 && space<=7){
			return (space-4)*100+'px';
			
		}else if(space>=8 && space<=11){
			return (space-8)*100+'px';
			
		}else{
			return (space-12)*100+'px';
			
		}
		//return 0;
}


//Returns the corresponding Y for the empty tile
function getY(){
	if(space>=0 && space<=3){
			return '0px';
		}else if(space>=4 && space<=7){
			return '100px';
			
		}else if(space>=8 && space<=11){
			return '200px';
			
		}else{
			return '300px';
			
		}
}


$(document).ready(function (e) {
	console.log("in ajax");
	$("#uploadimage").on('submit',(function(e) {
		e.preventDefault();
		$("#message").empty();
		$('#loading').show();
		$.ajax({
		url: "fifteen.php", // Url to which the request is send
		type: "POST",             // Type of request to be send, called as method
		data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
		contentType:false,       // The content type used when sending data to the server.
		cache:false,             // To unable request pages to be cached
		processData:false,        // To send DOMDocument or non processed data file it is set to false
		success:function(data)   // A function to be called if request succeeds
		{
			$('#loading').hide();
			$("#message").html(data);
		}
	});
}));


// // $document.ready(function(){
// // 	$('body').html(<"input type='file' onchange='previewFile()'><br>
// // 		<img src='' height='200' alt='Image preview...'>");
// });

// Function to preview image after validation
$(function() {
	$("#file").change(function() {
	$("#message").empty(); // To remove the previous error message
	var file = this.files[0];
	var imagefile = file.type;
	var match= ["image/jpeg","image/png","image/jpg"];
	if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2])))
		{
			$('#previewing').attr('src','noimage.png');

			$("#message").html("<p id='error'>Please Select A valid Image File</p>"+"<h4>Note</h4>"+"<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
			return false;
		}
		else
			{
				var reader = new FileReader();
				reader.onload = imageIsLoaded;
				reader.readAsDataURL(this.files[0]);
			}
		});
});
function imageIsLoaded(e) {
	$("#file").css("color","green");
	$('#image_preview').css("display", "block");
	$('#previewing').attr('src', e.target.result);
	$('#previewing').attr('width', '250px');
	$('#previewing').attr('height', '230px');
};
});
