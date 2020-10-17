var barraAltura, barraLargura, playerPosX, playerSpeed, bolaDiametro, bolaX, bolaY, vidas, bolaSpeed, pontos, colisao,canvas, context;

$("#btnStart").hide();

function inicializar(){
  canvas = document.getElementById("canvas");
  context = canvas.getContext('2d');

  barraAltura = 15;
  barraLargura = 100;
  playerSpeed = 18;
  playerPosX = (canvas.width - barraLargura)/2;

  bolaDiametro = 10;
  bolaSpeed = 10;
  bolaX = canvas.width/2;
  bolaY = 20;

  pontos = 0;
  colisao = false;
  vidas = 3;
  
  context.fillRect(playerPosX,canvas.height-barraAltura, barraLargura, barraAltura);
  document.addEventListener('keydown',keydown);
  setInterval(gameLoop,30);
}

function keydown(e){
  if(e.keyCode == 37 || e.keyCode == 65){
    if(playerPosX > 0){
      playerPosX -= playerSpeed;
    }
  }
  if(e.keyCode == 39 || e.keyCode == 68){
    if(playerPosX < canvas.width-barraLargura){
      playerPosX += playerSpeed;
    }
  }
}

function gameLoop(){
  context.clearRect(0,0,canvas.width,canvas.height);
  context.fillRect(playerPosX,canvas.height-barraAltura, barraLargura, barraAltura);
  if(bolaY <= canvas.height){
    bolaY += bolaSpeed;
  }
  else{
    bolaX = Math.random() * 600;
    bolaY = -10;
    colisao = false;
  }
  context.beginPath();
  context.arc(bolaX, bolaY, bolaDiametro, 0, Math.PI*2, true);
  context.fill();

  if ((bolaX > playerPosX && bolaX < playerPosX + barraLargura) && bolaY >= canvas.height - barraAltura && colisao == false){
    pontos++;
    colisao = true;
    bolaSpeed += bolaSpeed * (pontos/200);
    var audio = new Audio("sound.mp3");
    audio.play();
  }

  if ((bolaX < playerPosX || bolaX > playerPosX + barraLargura) && bolaY >= canvas.height && colisao == false){
    vidas--;
    colisao = true;
  }

  context.font = "30pt Arial"

  if (vidas<1){
    context.fillText("Pontos: "+pontos+" Game Over!", 20, 50);
    bolaSpeed = 0;
    document.removeEventListener('keydown',keydown);
    $("#btnStart").show();
  }

  else{
    context.fillText("Pontos: "+pontos+" Vidas: "+vidas, 20, 50);
  }

}

function start(){
  window.location.reload();
}