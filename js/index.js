function myFunction(){
  alert("hey!baby");
}



function changeColor(){
  var c=document.getElementById("myCanvas");
  var ctx=c.getContext("2d");

  ctx.font="20px Georgia";
  ctx.fillText("Hello World!",10,50);

  ctx.font="20px Verdana";
  // 创建渐变
  var gradient=ctx.createLinearGradient(0,0,c.width,0);
  gradient.addColorStop("0","magenta");
  gradient.addColorStop("0.5","blue");
  gradient.addColorStop("1.0","red");
  // 用渐变填色
  ctx.fillStyle=gradient;
  ctx.fillText("ouyangwenyu.github.io",10,90);
}

function doColor(){
  var dd1=document.getElementById('myCanvas');
  var colorinput=document.getElementById('clr');
  var color=colorinput.value;
  dd1.style.backgroundColor=color;
}

function dosquare(){
  var dd1=document.getElementById('myCanvas');
  var sizeinput=document.getElementById('sldr');
  var size=sizeinput.value;
  var ctx=dd1.getContext("2d");
  ctx.fillStyle="yellow";
  ctx.fillRect(10,10,size,size);
}

function upload(){
  var imgcanvas=document.getElementById('myCanvas');
  var fileinput=document.getElementById('finput');
  var image=new SimpleImage(fileinput);
  image.drawTo(imgcanvas);
}
