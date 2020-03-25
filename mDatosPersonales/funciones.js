//VARIABLE GLOBAL PARA NOMBRAR LOS ELEMENTOS DE LOS  FORMULARIOS
//DATOS PERSONALES -DP 
var varGral="-DP";//<--Es la misma variable declarada en formEditar,formGuardar,lista

$("#frmGuardar"+varGral).submit(function(e){

    var clave    = $("#clave").val();
    var nombre    = $("#nombre").val();
    var apPaterno = $("#apPaterno").val();
    var apMaterno = $("#apMaterno").val();
    var fNac      = $("#fNac").val();
    var correo    = $("#correo").val();
    var curp      = $("#curp").val();
    var domicilio = $("#domicilio").val();
    var sexo      = $("#sexo").val();
    var ecivil    = $("#ecivil").val();

    //transition -> slide , zoom , flipx , flipy , fade , pulse
    alertify.confirm('alert').set({transition:'zoom',message: 'Transition effect: zoom'}).show();
    alertify.confirm(
        'Sistema', 
        '¿Deseas guardar la información?', 
        function(){ 

            $.ajax({
                url:"../mDatosPersonales/guardar.php",
                type:"POST",
                dateType:"html",
                data:{clave,nombre,apPaterno,apMaterno,fNac,correo,curp,domicilio,sexo,ecivil},
                success:function(respuesta){
                    
                    $("#guardar"+varGral).hide();
                    llenar_lista();
                    $("#frmGuardar"+varGral)[0].reset();
                    selectTwo();
                    alertify.success("<i class='fa fa-save fa-lg'></i>", 2);
                    $('#nombre').focus();
                    log("Se insertado un nuevo registro a la tabla datos");
        
                },
                error:function(xhr,status){
                    alert("Error en metodo AJAX"); 
                },
            });

        }, 
        function(){ 
            alertify.error("<i class='fa fa-times fa-lg'></i>", 2);
                }
    ).set('labels',{ok:'Guardar',cancel:'Salir'});
    

    e.preventDefault();
    return false;
});

$("#frmActualizar"+varGral).submit(function(e){

    var id        = $("#eId").val();
    var nombre    = $("#eNombre").val();
    var apPaterno = $("#eApPaterno").val();
    var apMaterno = $("#eApMaterno").val();
    var fNac      = $("#eFnac").val();
    var correo    = $("#eCorreo").val();
    var curp      = $("#eCurp").val();
    var clave     = $("#eClave").val();
    var domicilio = $("#eDomicilio").val();
    var sexo      = $("#eSexo").val();
    var ecivil    = $("#eEcivil").val();

        //transition -> slide , zoom , flipx , flipy , fade , pulse
        alertify.confirm('alert').set({transition:'zoom',message: 'Transition effect: zoom'}).show();
        alertify.confirm(
            'Sistema', 
            '¿Deseas actualizar la Información?', 
            function(){ 
    
                $.ajax({
                    url:"../mDatosPersonales/actualizar.php",
                    type:"POST",
                    dateType:"html",
                    data:{clave,id,nombre,apPaterno,apMaterno,fNac,correo,curp,clave,domicilio,sexo,ecivil},
                    success:function(respuesta){
                        console.log(respuesta);
                        llenar_lista();
                            $("#frmGuardar"+varGral)[0].reset();
                            $("#frmActualizar"+varGral)[0].reset();
                            alertify.success("<i class='fa fa-bolt fa-lg'></i>", 2);
                        $("#btnCancelarG"+varGral+" , #btnCancelarA"+varGral).click();
                        log("Se ha modificado un registro de la tabla datos");
                        $('#nombre').focus();
                    },
                    error:function(xhr,status){
                        alert("Error en metodo AJAX"); 
                    },
                });
    
            }, 
            function(){ 
                alertify.error("<i class='fa fa-times fa-lg'></i>", 2);
                    }
        ).set('labels',{ok:'Actualizar',cancel:'Salir'});

    e.preventDefault();
    return false;
});

function llenar_lista(){
    abrirModalCarga('Cargando Lista');
    $("#frmGuardar"+varGral)[0].reset();
    $("#Listado"+varGral).hide();
    $.ajax({
        url:"../mDatosPersonales/lista.php",
        type:"POST",
        dateType:"html",
        data:{},
        success:function(respuesta){
            $("#Listado"+varGral).html(respuesta);
            $("#Listado"+varGral).slideDown('slow');
            cerrarModalCarga();
            $("#nombre").focus();
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function edad(fecha){
    $.ajax({
        url:"../mDatosPersonales/calcularEdad.php",
        type:"POST",
        dateType:"html",
        data:{fecha},
        success:function(respuesta){

            $("#edad").val(respuesta);
            $("#eEdad").val(respuesta);

            xedad= parseInt(respuesta);
            if (xedad < 0) {
                cambioColor('.5s' , rojo , 'Fecha invalida')
                $("#edad, #eEdad , #fNac , #efNac").css("color", rojo);
            } else {
                cambioColor('.5s' , obscuro , 'Acceso a datos')
                $("#edad, #eEdad , #fNac , #efNac").css("color", obscuro);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function llenar_formulario(id,nombre,apPaterno,apMaterno,fNac,edad,correo,curp,clave,domicilio,sexo,ecivil){
   
    $("#eId").val(id);
    $("#eClave").val(clave);
    $("#eNombre").val(nombre);
    $("#eApPaterno").val(apPaterno);
    $("#eApMaterno").val(apMaterno);
    $("#eFnac").val(fNac);
    $("#eEdad").val(edad);
    $("#eCorreo").val(correo);
    $("#eCurp").val(curp);
    $("#eClave").val(clave);
    $("#eDomicilio").val(domicilio);
    $("#eSexo").val(sexo);
    $("#eEcivil").val(ecivil);

    selectTwo();

    $("#titular").text("Actualizar Información");
    $("#guardar"+varGral).hide();
    $("#Listado"+varGral).hide();
    $("#editar"+varGral).fadeIn();
    $("#eNombre").focus();
}

function cambiar_estatus(id,consecutivo){

    var valor=$("#check"+consecutivo).val();
    var contravalor=(valor==1)?0:1;
    $("#check"+consecutivo).val(contravalor);

    $.ajax({
        url:"../mDatosPersonales/cEstatus.php",
        type:"POST",
        dateType:"html",
        data:{id,contravalor},
        success:function(respuesta){
            // console.log(respuesta);
            if(contravalor==1){
                alertify.success("<i class='fa fa-check fa-lg'></i>", 2);
                $("#btnEditar"+varGral+consecutivo).removeAttr('disabled');
                $("#btnImprimir"+varGral+consecutivo).removeAttr('disabled');
                $("#btnModal"+varGral+consecutivo).removeAttr('disabled');
                $("#btnFoto"+varGral+consecutivo).removeAttr('disabled');
                $("#btnSonido"+varGral+consecutivo).removeAttr('disabled');
                $("#icoSound"+varGral+consecutivo).removeClass("fa fa-volume-mute fa-lg");
                $("#icoSound"+varGral+consecutivo).addClass("fa fa-volume-up fa-lg");
                log("Se ha reactivado un registro de la tabla datos");
            }else{
                alertify.error("<i class='fa fa-times fa-lg'></i>", 2);
                $("#btnEditar"+varGral+consecutivo).attr('disabled','disabled');
                $("#btnImprimir"+varGral+consecutivo).attr('disabled','disabled');
                $("#btnModal"+varGral+consecutivo).attr('disabled','disabled');
                $("#btnFoto"+varGral+consecutivo).attr('disabled','disabled');
                $("#btnSonido"+varGral+consecutivo).attr('disabled','disabled');
                $("#icoSound"+varGral+consecutivo).removeClass("fa fa-volume-up fa-lg");
                $("#icoSound"+varGral+consecutivo).addClass("fa fa-volume-mute fa-lg");
                log("Se ha desactivado un registro de la tabla datos");
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });

}

function abrirModalDatos(id,nombre,apPaterno,apMaterno,fNac,edad,correo,curp,clave,domicilio,sexo,ecivil) {
    $("#modalTitle").text("Datos personales - "+nombre+' '+apPaterno);

    $("#mNombre").val(nombre);
    $("#mApPaterno").val(apPaterno);
    $("#mApMaterno").val(apMaterno);
    $("#mFnac").val(fNac);
    $("#mEdad").val(edad);
    $("#mCorreo").val(correo);
    $("#mCurp").val(curp);
    $("#mClave").val(clave);
    $("#mDomicilio").val(domicilio);
    $("#mSexo").val(sexo);
    $("#mEcivil").val(ecivil);

    selectTwo();

    $("#modalDatos").modal("show");
}


//Manipulacion de eventos con jquery
$("#fNac").change(function(){
    var fecha = $(this).val();
    edad(fecha);
    ;
});

$("#efNac").change(function(){
    var fecha = $(this).val();
    edad(fecha);

});

$("#btnCancelarG"+varGral+" , #btnCancelarA"+varGral).click(function(){
    $("#editar"+varGral).hide();
    $("#guardar"+varGral).hide();
    $("#Listado"+varGral).fadeIn();
    cambioColor('.5s' , obscuro , "Acceso a datos", blanco)
});

$("#btnCancelarG"+varGral).mouseover(function(){
    cambioColor('.5s' , rojo , 'Cancelar captura de Información')
});

$("#btnCancelarA"+varGral).mouseover(function(){
    cambioColor('.5s' , rojo , 'Cancelar actualizacion de Información')
});

$("#btnActualizar"+varGral).mouseout(function(){
    cambioColor('.5s' , obscuro , 'Acceso a datos')
});

$("#btnGuardar"+varGral).mouseout(function(){
    cambioColor('.5s' , obscuro , 'Acceso a datos',blanco)
});

$("#btnCancelarG"+varGral).mouseout(function(){
    cambioColor('.5s' , obscuro , 'Acceso a datos')
});

$("#btnCancelarA"+varGral).mouseout(function(){
    cambioColor('.5s' , obscuro , 'Acceso a datos')
});

function inputs(){

    $("#btnGuardar"+varGral).mouseover(function(){
        if ($(this).is('[disabled]')) {
            cambioColor('.5s' , rojo , 'Acceso a datos')
        }else{
            cambioColor('.5s' , azul , 'Captura de Información')
        }
    });

    $("#btnActualizar"+varGral).mouseover(function(){
        if ($(this).is('[disabled]')) {
            cambioColor('.5s' , rojo , 'Acceso a datos')
        }else{
            cambioColor('.5s' , verde , 'Actualizar datos personales')
        }
    });
    
    $("#clave").keydown(function() {
        var valor=$(this).val();
        soloNumeros(valor);
        
    });

    $("#curp , #eCurp").keyup(function() {

        valor=$(this);
        // Convierte en mayuscula
        valor.val(valor.val().toUpperCase());
        
        //validar curp + expresion regular
        if (curpValida(valor.val())=="Si") {
            //$("#btnGuardar"+varGral).removeAttr('disabled');
            $(valor).css("color", obscuro);
            alertify.success("Curp valida !",1);
            cambioColor('.5s' , azul , 'Acceso a datos')
        }else{
            //$("#btnGuardar"+varGral).attr('disabled','disabled');
            $(valor).css("color", rojo);
            cambioColor('.5s' , rojo , 'Curp no valida')
        }

    });

    $("#clave").keyup(function(){
        var valor=$(this).val();
        revisar_clave(valor);
    });
}
//Manipulacion de eventos con jquery

//Revisar clave repetida
function revisar_clave(valor){
    $.ajax({
        url:"../mDatosPersonales/rClave.php",
        type:"POST",
        dateType:"html",
        data:{valor},
        success:function(respuesta){
            res =parseInt(respuesta);
            if (res == 0) {
                $("#clave").css("color", obscuro);
                cambioColor('.5s' , obscuro , 'Acceso a datos');
            }else{
                $("#clave").css("color", rojo);
                cambioColor('.5s' , rojo , 'Clave repetida');
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function abrirModalPDF(id) {

    $("#txtTitularPDF").text("Datos Personales")

    var link = "../mDatosPersonales/pdfDatos.php?id="+id ;
    PDFObject.embed(link, "#visualizador");

    $("#modalPDF").modal("show");

}

//validar curp
function curpValida(valor) {

    var validador;
    var curp=valor;

    // Expresion regular para curp
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);
    
    if (!validado){  //Coincide con el formato general?
        validador = "No";
    }else{
        validador = "Si";
    }
    return validador;
}

//llenar combo
function combo_ecivil()
{
    $.ajax({
        url : '../mDatosPersonales/comboEcivil.php',
        data : {},
        type : 'POST',
        dataType : 'html',
        success : function(respuesta) {
            $("#ecivil , #eEcivil , #mEcivil").empty();
            $("#ecivil , #eEcivil , #mEcivil").html(respuesta);    
            selectTwo();
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
}

function nuevo_registro(){
    $("#Listado"+varGral).hide();
    $("#guardar"+varGral).fadeIn();
    $("#clave").focus();
    
}

function abrirModalFoto(id,clave,nombre,valorfoto) {

    $("#clavePersona").val(clave);

    if (valorfoto=="No") {
        $('#formVista').hide();
        $('#formSubida').fadeIn();
        $('#formSubida')[0].reset();
        $("#txtTitularFoto").text(nombre)
    }else{
        $('#formSubida').hide();
        $('#formVista').fadeIn();
        var archivo='../fotos/'+clave+".jpg";
        $("#imgFoto").attr("src",archivo);
    }
    
    $("#modalFoto").modal("show");

}

function  eliminarFoto(){

    var formData = new FormData();
    var clave=$('#clavePersona').val();
    formData.append('clave',clave);

    //transition -> slide , zoom , flipx , flipy , fade , pulse
    alertify.confirm('alert').set({transition:'zoom',message: 'Transition effect: zoom'}).show();
    alertify.confirm(
        'Borrando Foto', 
        '¿Estas seguro de querer eliminar la Fotografia?', 
        function(){ 

            $.ajax({
                url: '../mDatosPersonales/fotoBorrar.php',
                type: 'post',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                  var res=parseInt(response);
                  switch(res){
                    case 0 :
                        alertify.error("<i class='fa fa-times fa-lg'></i> No se encuentra el archivo",1);
                        $("#modalFoto").modal("hide");
                        llenar_lista();
                      break;
                    case 1 :
                        alertify.success("<i class='fa fa-check fa-lg'></i> Foto Eliminada",1);
                        $("#modalFoto").modal("hide");
                        llenar_lista();
                        break;
                  }
        
                },
                error:function(xhr,status){
                    alertify.error('Error en proceso');
                },
            });

        }, 
        function(){ 
            alertify.error("<i class='fa fa-times fa-lg'></i>", 2);
                }
    ).set('labels',{ok:'Eliminar',cancel:'Salir'});



}

function subirFoto(){
    var formData = new FormData();

    var files = $('#image')[0].files[0];

    var clave=$('#clavePersona').val();
    var tam=$('#tamanoKB').val();

    formData.append('file',files);
    formData.append('clave',clave);
    formData.append('tam',tam);

    $.ajax({
        url: '../mDatosPersonales/fotoSubir.php',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
          var res=parseInt(response);
          switch(res){
            case 0 :
                alertify.success("<i class='fas fa-file-upload'></i>",1);
                $("#modalFoto").modal("hide");
                llenar_lista();
              break;
            case 1 :
                alertify
                .alert()
                .setting({
                  title: "Información",
                  label: "OK",
                  message: "No ha sido posible cargar el archivo debido a que este debe de tener extención jpg y no debe de sobrepasar los 3 megabytes",
                  onok: function() {
                    alertify.message("Gracias !");
                  }
                })
                .show();
              break;
            default:
                  alertify.error("<i class='fa fa-times fa-lg'></i>",1);
          }

        },
        error:function(xhr,status){
            alertify.error('Error en proceso');
        },
    });
// return false;
}