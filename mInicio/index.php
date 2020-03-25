<?php
    date_default_timezone_set('America/Monterrey');
    $fecha=date("Y-m-d"); 
?>
<!DOCTYPE html>
<html lang="en">
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>Acceso a Datos</title>
     <!-- Bootstrap-4 -->
     <link rel="stylesheet" href="../plugins/bootstrap-4.0.0/dist/css/bootstrap.min.css">
     <!-- Estilos propios -->
     <link rel="stylesheet" href="../css/estilos.css">
     <!-- Alertifyjs -->
     <link rel="stylesheet" href="../plugins/alertifyjs/css/alertify.min.css">
     <link rel="stylesheet" href="../plugins/alertifyjs/css/themes/default.min.css">
     <!-- Fontawesome 5-->
     <link rel="stylesheet" href="../plugins/fontawesome-free-5.8.1-web/css/all.min.css">
     <!-- DataTables -->
     <link rel="stylesheet" href="../plugins/dataTablesB4/css/dataTables.bootstrap4.min.css">
     <link rel="stylesheet" href="../plugins/dataTablesB4/css/responsive.bootstrap4.min.css">
     <link rel="stylesheet" href="../plugins/dataTablesB4/css/responsive.dataTables.min.css">
     <!-- Animate -->
     <link rel="stylesheet" href="../plugins/animate/animate.css">
     <!-- Bootstrap Switch Button -->
     <link rel="stylesheet" href="../plugins/bootstrap4-toggle-master/css/bootstrap4-toggle.min.css">
     <!-- Select 2 -->
     <link rel="stylesheet" href="../plugins/select2-master/dist/css/select2.min.css">
     <link rel="stylesheet" href="../plugins/select2-master/dist/css/select2-bootstrap4.min.css">
     <!-- fileinput -->
     <link href="../plugins/bootstrap-fileinput-master/css/fileinput.css" media="all" rel="stylesheet" type="text/css"/>
     <link href="../plugins/bootstrap-fileinput-master/themes/explorer-fas/theme.css" media="all" rel="stylesheet" type="text/css"/>
</head>
<body>

    <div class="jumbotron jumbotron-fluid myJT animated  flipInX">
        <div class="container">
            <h1 class="display-4"><i class="far fa-user-circle"></i> Datos Personales </h1>
            <p class="lead" id="titular">Programa de ejemplo</p>
        </div>
    </div>

    <div class="container">
        <section id="guardar-DP" style="display:none;">
            <?php
                include'../mDatosPersonales/formGuardar.php';
            ?>
        </section>

        <section id="editar-DP" style="display:none;">
            <?php
                include'../mDatosPersonales/formEditar.php';
            ?>
        </section>
        
        <section id="Listado-DP" class="animated  fadeIn contenedor"></section>
    </div>


    <!-- Modal de carga -->
        <?php include'../modales/modalCarga.php'; ?>
    <!-- Modal de carga -->  
    <!-- Modal de datos -->
        <?php include'../mDatosPersonales/modalDatos.php'; ?>
    <!-- Modal de datos -->
    <!-- Modal de Foto -->
        <?php include'../modales/modalFoto.php'; ?>
    <!-- Modal de Foto -->
    <!-- Modal de PDF -->
        <?php include'../modales/modalPDF.php'; ?>
    <!-- Modal de PDF -->

    <!-- jQuery -->
    <script src="../plugins/jQuery/jquery-3.3.1.js"></script>   
    <!-- Bootstrap-4 -->
    <script src="../plugins/bootstrap-4.0.0/dist/js/bootstrap.js"></script> 
    <!-- Alertifyjs -->  
    <script src="../plugins/alertifyjs/alertify.min.js"></script> 
    <!-- Funciones Propias -->
    <script src="funciones.js"></script>
    <script src="../mDatosPersonales/funciones.js"></script>    
    <!-- DataTables -->
    <script src="../plugins/dataTablesB4/js/jquery.dataTables.min.js"></script>
    <script src="../plugins/dataTablesB4/js/dataTables.bootstrap4.min.js"></script>
    <!-- dataTableButtons -->
    <script type="text/javascript" src="../plugins/dataTableButtons/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="../plugins/dataTableButtons/buttons.flash.min.js"></script>
    <script type="text/javascript" src="../plugins/dataTableButtons/buttons.colVis.min.js"></script>
    <script type="text/javascript" src="../plugins/dataTableButtons/jszip.min.js"></script>
    <script type="text/javascript" src="../plugins/dataTableButtons/pdfmake.min.js"></script>
    <script type="text/javascript" src="../plugins/dataTableButtons/vfs_fonts.js"></script>
    <script type="text/javascript" src="../plugins/dataTableButtons/buttons.html5.min.js"></script>
    <script type="text/javascript" src="../plugins/dataTableButtons/buttons.print.min.js"></script>
    <!-- Bootstrap Switch Button -->
    <script type="text/javascript" src="../plugins/bootstrap4-toggle-master/js/bootstrap4-toggle.min.js"></script>
    <!-- pdfObject -->
    <script type="text/javascript" src="../plugins/PDFObject-master/pdfobject.min.js"></script>
    <!-- Select 2 -->
    <script type="text/javascript" src="../plugins/select2-master/dist/js/select2.full.min.js"></script>
    <!-- PrintArea -->
    <script src="../plugins/PrintArea-master/js/jquery.printarea.js" type="text/javascript"></script>
    <!-- responsivevoice -->
    <script src="../plugins/voice/responsivevoice.js?key=wJDGnQJT" type="text/javascript"></script>
    <!-- fileinput -->
    <script src="../plugins/bootstrap-fileinput-master/js/plugins/piexif.js" type="text/javascript"></script>
    <script src="../plugins/bootstrap-fileinput-master/js/plugins/sortable.js" type="text/javascript"></script>
    <script src="../plugins/bootstrap-fileinput-master/js/fileinput.js" type="text/javascript"></script>
    <script src="../plugins/bootstrap-fileinput-master/js/locales/fr.js" type="text/javascript"></script>
    <script src="../plugins/bootstrap-fileinput-master/js/locales/es.js" type="text/javascript"></script>
    <script src="../plugins/bootstrap-fileinput-master/themes/fas/theme.js" type="text/javascript"></script>
    <script src="../plugins/bootstrap-fileinput-master/themes/explorer-fas/theme.js" type="text/javascript"></script>

    <script>
        combo_ecivil();
        llenar_lista();
        selectTwo();
        inputsGenerales();
    </script>

    <script>
        $("#image").fileinput({
            'theme': 'fas',
            overwriteInitial: false,
            initialPreviewAsData: true,
            language: 'es',
            showUpload: false,
            showCaption: true,
            showCancel: false,
            showRemove: true,
            browseClass: "btn btn-primary",
            fileType: "jpg",
            allowedFileExtensions: ['jpg'],
            overwriteInitial: false,
            maxFileSize: 3000,
            maxFilesNum: 1
        });

    </script>
</body>
</html>
