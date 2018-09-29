var config = {
    apiKey: "AIzaSyBI-ISFTpKEKiySTqAC1Gr4xiDJpLqqzO0",
    authDomain: "nodemcu-4974a.firebaseapp.com",
    databaseURL: "https://nodemcu-4974a.firebaseio.com",
    projectId: "nodemcu-4974a",
    storageBucket: "nodemcu-4974a.appspot.com",
    messagingSenderId: "16397337337"
  };
firebase.initializeApp(config);

//Variables de la vista de iniciar sesión
var json;
var user = document.getElementById("inputEmail");
var pass = document.getElementById("inputPassword");
var login = document.getElementById("logIn");
var error_login = document.getElementById("errorLogin");
var logout = document.getElementById("logOut");
var clickAlbercaPanel = document.getElementById("albercaCard");
var clickPuertaPanel = document.getElementById("puertaCard");
var clickIlumPanel = document.getElementById("ilumCard");
var clickAbrirPuerta = document.getElementById("abrirPuerta");
var isProteccionEnable;
//var clickActivaProteccion = document.getElementById("lockON")
//Variables del panel de control
//var greetings = document.getElementById("welcomeText");
//var humedad = document.getElementById("humedadValue");
//var temperatura = document.getElementById("temperaturaValue");
//var distancia = document.getElementById("distanciaValue");
//var movimiento = document.getElementById("movimientoValue");
//var movimiento_card = document.getElementById("movimientoCard");

const auth = firebase.auth();

$("#protCard").hover(function(){
  $("#lockON").removeAttr("src");
  $("#lockON").attr("src","lockdown.png");
  $("#textProt").text("¡ACTIVAR!");
},function(){
  $("#lockON").removeAttr("src");
  $("#lockON").attr("src","lockdownOFF.png");
  $("#textProt").text("¡SIN PROTECCIÓN!");
});

$("#protCardON").hover(function(){
  $("#lockOFF").removeAttr("src");
  $("#lockOFF").attr("src","lockdownOFF.png");
  $("#textProt2").text("DESACTIVAR!");
},function(){
  $("#lockOFF").removeAttr("src");
  $("#lockOFF").attr("src","lockdown.png");
  $("#textProt2").text("¡PROTEGIDO!");
});

$("#protSHOW").click(function() {
  $("#protSHOW").addClass("collapse");
  $("#protSHOW2").removeClass("collapse");
  var tosend = {};
  tosend["lockdown"] = 1
  firebase.database().ref().update(tosend)
});

$("#protSHOW2").click(function() {
  $("#protSHOW2").addClass("collapse");
  $("#protSHOW").removeClass("collapse");
  var tosend = {};
  tosend["lockdown"] = 0
  firebase.database().ref().update(tosend)
});



clickAbrirPuerta.addEventListener("click", function(){
  var state = json["cerradura"];
  var state2 = json["puertaprincipal"];
  var tosend = {};
  var tosend2 = {};
  if (state == 0){
    tosend["cerradura"] = 1;
    tosend2["puertaprincipal"] = 0;
    firebase.database().ref().update(tosend2);
    firebase.database().ref().update(tosend);
  }else{
    tosend["cerradura"] = 0;
    tosend2["puertaprincipal"] = 0;
    firebase.database().ref().update(tosend2);
    firebase.database().ref().update(tosend);
  }
  //var value = $()
  //firebase.database().ref().update({[]})
});

function updateThreshold(){
  var tosend={};
  tosend["threshold"]= parseInt($("#thresholdVal").val(),10);
  firebase.database().ref().update(tosend);
}

clickAlbercaPanel.addEventListener("click", function() {
  if ($("#albercaJB").hasClass("collapse")){
    $("#doorJB").addClass("collapse");
    $("#ilumJB").addClass("collapse");
    $("#albercaJB").removeClass("collapse");
    $("#puertaCard").css("background-color","rgb(255, 255, 255)");
    $("#ilumCard").css("background-color","rgb(255, 255, 255)");
    $("#albercaCard").css("background-color", "rgb(96, 180, 244)");
  }else{
    $("#doorJB").addClass("collapse");
    $("#ilumJB").addClass("collapse");
    $("#albercaJB").addClass("collapse");
    $("#puertaCard").css("background-color","rgb(255, 255, 255)");
    $("#ilumCard").css("background-color","rgb(255, 255, 255)");
    $("#albercaCard").css("background-color","rgb(255, 255, 255)");
  }
});

clickPuertaPanel.addEventListener("click", function() {
  if ($("#doorJB").hasClass("collapse")){
    $("#albercaJB").addClass("collapse");
    $("#ilumJB").addClass("collapse");
    $("#doorJB").removeClass("collapse");
    $("#albercaCard").css("background-color", "rgb(255, 255, 255)");
    $("#ilumCard").css("background-color","rgb(255, 255, 255)");
    $("#puertaCard").css("background-color","rgb(4, 23, 69)");
  }else {
    $("#albercaJB").addClass("collapse");
    $("#ilumJB").addClass("collapse");
    $("#doorJB").addClass("collapse");
    $("#albercaCard").css("background-color", "rgb(255, 255, 255)");
    $("#ilumCard").css("background-color","rgb(255, 255, 255)");
    $("#puertaCard").css("background-color","rgb(255, 255, 255)");
  }
});

clickIlumPanel.addEventListener("click", function(){
  if ($("#ilumJB").hasClass("collapse")){
    $("#albercaJB").addClass("collapse");
    $("#doorJB").addClass("collapse");
    $("#ilumJB").removeClass("collapse");
    $("#albercaCard").css("background-color", "rgb(255, 255, 255)");
    $("#puertaCard").css("background-color","rgb(255, 255, 255)");
    $("#ilumCard").css("background-color","rgb(21, 142, 91)");
  }else {
    $("#albercaJB").addClass("collapse");
    $("#doorJB").addClass("collapse");
    $("#ilumJB").addClass("collapse");
    $("#albercaCard").css("background-color", "rgb(255, 255, 255)");
    $("#puertaCard").css("background-color","rgb(255, 255, 255)");
    $("#ilumCard").css("background-color","rgb(255, 255, 255)");
  }
});

login.addEventListener("click", function () {
  var email = user.value;
	var password= pass.value;

  console.log(email);
  console.log(password);
	auth.signInWithEmailAndPassword(email, password).catch(function(error) {
    $("#okayLogin").addClass("collapse");
	  $("#errorLogin").removeClass("collapse");
    console.log(error);
	});
});

auth.onAuthStateChanged(function(user) {
  if (user){
    $("#welcomeText").append("<p id='welcome'>Bienvenido " +user.email+ "</p>");
    $("#errorLogin").addClass("collapse");
    $("#okayLogin").removeClass("collapse");
    $("#okayLogin").fadeIn("fast");
    $("#loginPanel").addClass("collapse");
    $("#controlPanel").removeClass("collapse");

    var ref = firebase.database().ref();
    ref.on("value",function(data){

      $("#puertaprincipaltag").remove();
      $("#temperaturatag").remove();
      $("#lucestag").remove();
      $("#calentadortag").remove();
      $("#climatag").remove();
      $("#humedadtag").remove();
      $("#cuidadotag").remove();
      $("#cuidadotag2").remove();

      json = data.val();
      if (json["lockdown"]==0){
        isProteccionEnable = false;
      }else {
        isProteccionEnable = true;
      }
      $.each(json, function(index,value){
        var stringplaceholder = "#";
        stringplaceholder = stringplaceholder + index;
        if (index=="puertaprincipal"){
          if (value == 0){
            $(stringplaceholder).append("<div id='puertaprincipaltag' class='alert alert-success' role='alert'>Todo correcto</div>");
            $("#abrirPuerta").attr("disabled","true");
          }else{
            $(stringplaceholder).append("<div id='puertaprincipaltag' class='alert alert-danger' role='alert'>¡Alguien esta en la puerta!</div>");
            $("#abrirPuerta").removeAttr("disabled");
          }
        }else if (index=="alberca") {
          $(stringplaceholder).append("<p id='temperaturatag'>Temperatura actual: "+value+"ºC");
        }else if (index=="luces") {
          if (value == 0) {
            $(stringplaceholder).append("<p id='lucestag'>Foco entrada: <span id='luzStatusOFF'>APAGADO</span></p>")
          } else {
            $(stringplaceholder).append("<p id='lucestag'>Foco entrada: <span id='luzStatusON'>ENCENDIDO</span ></p>")
          }
        }else if (index=="calentador") {
          if (value==0){
            $(stringplaceholder).append("<p id='calentadortag'>Calentador: <span id='calentadorStatusOFF'>APAGADO</span></p>")
          }else {
            $(stringplaceholder).append("<p id='calentadortag'>Calentador: <span id='calentadorStatusON'>ENCENDIDO</span></p>")
          }
        }else if (index=="threshold") {
          var element = document.getElementById("thresholdVal");
          element.value = value;
        }else if (index=="temperatura") {
          $("#clima").append("<snap id='climatag'>Temperatura: " + value + "</snap>");
        }else if (index=="humedad") {
          $("#clima").append("<snap id='humedadtag' style='margin-right:1em'>Humedad: " + value + "\t</snap>");
        }else if (index=="distancia"){
          console.log(value);
          if (value<100 && isProteccionEnable){
            $("#cuidado").append("<snap id='cuidadotag'>¡Cuidado! Alguien esta a menos de 1 m de la puerta</snap>");
            $("#cuidado").removeClass("collapse");
          }else{
            $("#cuidadotag").remove();
            $("#cuidado").addClass("collapse");
          }
        }else if (index=="movimiento") {
          console.log("Movimiento val:" + value);
          if (value==1 && isProteccionEnable) {
            $("#cuidado2").append("<snap id='cuidadotag2'>¡Se detecto movimiento!</snap>");
            $("#cuidado2").removeClass("collapse");
          }else {
            $("#cuidadotag2").remove();
            $("#cuidado2").addClass("collapse");

          }
        } else if (index=="lockdown") {
          if (isProteccionEnable) {
            $("#protSHOW").addClass("collapse");
            $("#protSHOW2").removeClass("collapse");
          }else {
            $("#protSHOW2").addClass("collapse");
            $("#protSHOW").removeClass("collapse");
          }
        }
      });
    });
}else{
  $("#welcome").remove();
  $("#loginPanel").removeClass("collapse");
  $("#controlPanel").addClass("collapse");
  $("#okayLogin").delay(1000).fadeOut('slow');
}});

logout.addEventListener("click",function(){
	auth.signOut();
});
