//Variables globales
var blanco   = "#ffffff";
var negro    = "#000000";
var obscuro  = "#343A40";
var azul     = "#1278F4";
var verde    = "#2AA44E";
var rojo     = "#D9304B";
var amarillo = "#FFC107";
var celeste  = "#17A2B8";
var gris     ="#F2F2F2";
var cielo    ="#74b9ff";

function abrirModalCarga(mensaje) {
    $("#modalCarga").modal("show");
    $("#msjCarga").text(mensaje);
}

function cerrarModalCarga(mensaje) {
    $("#modalCarga").modal("hide");
}

//Verifica el tamaño de la pantalla
$(document).ready(function(){
    $(window).resize(function() {
      if ($(this).width() <= 800){
        $(".btnEspacio").addClass("btn-block");
      }else{
        $(".btnEspacio").removeClass("btn-block");
      }
    });
  });

function cambioColor(duracion , colorF , mensaje , colorL=blanco){
    //color azul
    $(".jumbotron , .hTabla").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "background-color": colorF,
        color: colorL
    });

    $("#titular").html(mensaje);
}


function inputsGenerales(){

    $(".imprimir").mouseover(function(){
        if ($(this).is('[disabled]')) {
            cambioColor('.5s' , rojo , 'Imprimir datos','#fff')
        }else{
            cambioColor('.5s' , amarillo , 'Imprimir datos','#000')
        }
    });
    
    $(".editar").mouseover(function(){
        if ($(this).is('[disabled]')) {
            cambioColor('.5s' , rojo , 'Editar datos')
        }else{
            cambioColor('.5s' , verde , 'Editar datos')
        }
    });

    $(".ventana").mouseover(function(){
        if ($(this).is('[disabled]')) {
            cambioColor('.5s' , rojo , 'Mostrar ventana modal')
        }else{
            cambioColor('.5s' , celeste , 'Mostrar ventana modal')
        }
    });

    $(".foto").mouseover(function(){
        if ($(this).is('[disabled]')) {
            cambioColor('.5s' , rojo , 'Mostrar ventana para fotografia')
        }else{
            cambioColor('.5s' , gris , 'Mostrar ventana para fotografia','#000')
        }
    });

    $(".resetear").mouseover(function(){
        if ($(this).is('[disabled]')) {
            cambioColor('.5s' , rojo , 'Permite resetear la contraseña del usuario')
        }else{
            cambioColor('.5s' , amarillo , 'Permite resetear la contraseña del usuario','#000')
        }
    });

    $(".permisos").mouseover(function(){
        if ($(this).is('[disabled]')) {
            cambioColor('.5s' , rojo , 'Mostrar ventana para cambiar permisos del usuario')
        }else{
            cambioColor('.5s' , celeste , 'Mostrar ventana para cambiar permisos del usuario')
        }
    });


    $(".audio").mouseover(function(){
        if ($(this).is('[disabled]')) {
            cambioColor('.5s' , rojo , 'Texto a Audio')
        }else{
            cambioColor('.5s' , cielo , 'Texto a Audio')
        }
    });

    $(".imprimir , .editar , .ventana, .foto, .resetear, .permisos, .audio").mouseout(function(){
        cambioColor('.5s' , obscuro , 'Acceso a datos')
    });

  
}
//Manipulacion de eventos con jquery

function log(actividad){
    $.ajax({
        url:"log.php",
        type:"POST",
        dateType:"html",
        data:{actividad},
        success:function(respuesta){

        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

//solo numeros
function soloNumeros(e){
    if(event.shiftKey)
    {
         event.preventDefault();
    }
 
    if (event.keyCode == 46 || event.keyCode == 9 || event.keyCode == 8 )    {
    }
    else {
         if (event.keyCode < 95) {
           if (event.keyCode < 45 || event.keyCode > 57) {
                 event.preventDefault();
           }
         } 
         else {
               if (event.keyCode < 96 || event.keyCode > 105) {
                   event.preventDefault();
               }
         }
       }
}

function selectTwo(){
    $( ".select2" ).select2({
        theme: "bootstrap4",
        placeholder: 'Seleccione...'
    });
}

function printDiv(nombreDiv) {
	var mode = 'iframe'; //popup
	var close = mode == "popup";
	var options = { mode : mode, popClose : close};
	$('#areaImprimir').printArea( options );

}


function hablar(texto){
    var textoAtraducir;
    textoAtraducir=texto; 
    responsiveVoice.speak(textoAtraducir,"Spanish Female"); 
    alertify.success("<i class='fa fa-volume-up fa-lg'></i>", 2);
}

