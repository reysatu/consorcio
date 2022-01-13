/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.movimientoCajas')
        .config(Config)
        .controller('movimientoCajaCtrl', movimientoCajaCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    movimientoCajaCtrl.$inject = ['$scope','_', 'RESTService', 'AlertFactory', 'Notify'];

    function movimientoCajaCtrl($scope, _, RESTService, AlertFactory, Notify)
    {
        

        // var modalMovCaj=$("#modalMovCaj");
        // var titleModalMovCaj=$("#titleModalMovCaj");
 
        // function newMovimiCaja()
        // {
        //     titleModalMovCaj.html('Nuevo Movimiento de caja');
        //     modalMovCaj.modal('show');
        // }
        var tipoMovimientoAdd=$("#tipoMovimientoAdd");
        var idMonedaAdd=$("#idMonedaAdd");
        var conceptoAdd=$("#conceptoAdd");
        var montoAdd=$("#montoAdd");
        var formaPagoAdd=$("#formaPagoAdd");

        var modalMovimientoCaja=$("#modalMovimientoCaja");
        var btn_MovimientoInicio=$("#btn_MovimientoInicio");

        var btn_imprimirCaja=$("#btn_imprimirCaja");
        var table_movimientoEfecti=$("#table_movimientoEfecti");
        var usuarioActual;
        var modalAperturaCaja=$("#modalAperturaCaja");
        var titlemodalAperturaCaja=$("#titlemodalAperturaCaja");
        var fecha_actualMc=$("#fecha_actualMc");
        var idUsuario=$("#idUsuario");
        var idCaja=$("#idCaja");
        var estado=$("#estado");
        var estadoMc=$("#estadoMc");
        var caja_text=$("#caja_text");
        var idcajaMC=$("#idcajaMC");
        var btn_Mapertura=$("#btn_Mapertura");
        var btn_Mcierra=$("#btn_Mcierra");
        var ventanaP;
        var caja_sin=$("#caja_sin");
        var idCajaDiaria=$("#idCajaDiaria");
        var fechaCaja=$("#fechaCaja");
        var table_movimientoDEfecti=$("#table_movimientoDEfecti");
        var consecutivo=$("#consecutivo");
        var btn_procesarApertura=$("#btn_procesarApertura");
        var totalEfectivo=$("#totalEfectivo");
        var totalEgresos=$("#totalEgresos");
        var totalOtrosIngresos=$("#totalOtrosIngresos");
        var totalNoEfectivo=$("#totalNoEfectivo");
        var totalEfectivoDol=$("#totalEfectivoDol");
        var totalEgresosDol=$("#totalEgresosDol");
        var totalOtrosIngresosDol=$("#totalOtrosIngresosDol");
        var totalNoEfectivoDol=$("#totalNoEfectivoDol");

        var btn_apertura=$("#btn_apertura");
        var btn_cierra=$("#btn_cierra");

        var table_demoninacionesSoles=$("#table_demoninacionesSoles");
        var totalSoles=$("#totalSoles");
        var table_demoninacionesDolares=$("#table_demoninacionesDolares");
        var totalDolares=$("#totalDolares");
         $('#btn_MovimientoInicio').click(function (e) {
             modalMovimientoCaja.modal('show');
        });
        function cleanMovimientoCajaAdd() {
            cleanRequired();
            tipoMovimientoAdd.val("");
            idMonedaAdd.val("");
            conceptoAdd.val("");
            montoAdd.val("");
        }

        modalMovimientoCaja.on('hidden.bs.modal', function (e) {
            cleanMovimientoCajaAdd();
        });

        $('#btn_Mapertura').click(function (e) {
            // ventanaP='A';
             // if(estado.val()==""){
                if(caja_sin.html()!=""){
                    AlertFactory.showWarning({
                        title: '',
                        message: 'Debe cerrar la caja pendiente',
                         type: 'info'
                    });  
                }else{
                    idUsuario.val(usuarioActual).trigger("change");
                    titlemodalAperturaCaja.html('Nueva Apertura de Caja');
                    generarTablaApertura();    
                    modalAperturaCaja.modal('show');
                }
        });
        btn_imprimirCaja.click(function(e){
                var data = {
                        id: '0',        
                };
            if(estadoMc.val()!=''){
              $scope.loadMovimientoCajaPDF('movimientoCajas/pdf', data);
            }
            
        });
         $('#btn_Mcierra').click(function (e) {
             if(estadoMc.val()==""){
                AlertFactory.textType({
                        title: '',
                        message: 'Debe aperturar la caja',
                        type: 'info'
                    });
            }else if(estadoMc.val()==1){
                console.log("texi");
                if(caja_sin.html()!=""){
                    AlertFactory.showWarning({
                        title: '',
                        message: 'Debe cerrar la caja pendiente',
                         type: 'info'
                    });  
                }else{
                     titlemodalAperturaCaja.html('Cierre de Caja');
                     var idcaja=idcajaMC.val();
                     findCajaDiariaMc(idcaja);
                     generarTablaApertura();
                }
                    
                 // modalAperturaCaja.modal('show');  
            }
            // else{

            // }    
        });
        function findCajaDiariaMc(id) {
            titlemodalAperturaCaja.html('Cerrar Caja');
            RESTService.get('movimientoCajas/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    var data_fecha = response.fechaCaja;
                    var data_detalle = response.dataDetalle;
                    var dataDenominacion = response.dataDenominacion;

                    idUsuario.val(data_p.idUsuario).trigger("change");
                    idCaja.val(data_p.idCaja).trigger("change");
                    estado.val(data_p.estado);
                    idCajaDiaria.val(data_p.idCajaDiaria);
                    fechaCaja.val(data_p.fechaCaja2);

                    totalEfectivo.val(data_p.totalEfectivo);
                    totalEgresos.val(data_p.totalEgresos);
                    totalOtrosIngresos.val(data_p.totalOtrosIngresos);
                    totalNoEfectivo.val(data_p.totalNoEfectivo);
                    totalEfectivoDol.val(data_p.totalEfectivoDol);
                    totalEgresosDol.val(data_p.totalEgresosDol);
                    totalOtrosIngresosDol.val(data_p.totalOtrosIngresosDol);
                    totalNoEfectivoDol.val(data_p.totalNoEfectivoDol);

                    fechaCaja.prop('disabled',true);
                    idCaja.prop('disabled',true);
                    // if(data_p.estado==0){
                    //     btn_procesarApertura.prop('disabled',true);
                    // }
                    // ventanaP='A';
                   // console.log(data_p);
                   // console.log(data_detalle);
                   // console.log(dataDenominacion);

                   // consecutivo.val(data_detalle[0].consecutivo);
                   
                    // _.each(dataDenominacion, function (c) {
                    //    if(c.idMoneda=='1' && c.tipo=='1'){
                    //         var estadoCant='disabled';
                    //         addDenominacionSoles(c.id_denominacion,c.descripcion,Number(c.cantidad),Number(c.monto),estadoCant);
                    //     }else if(c.idMoneda=='2' && c.tipo=='1'){
                    //         var estadoCant='disabled';
                    //         addDenominacionDolar(c.id_denominacion,c.descripcion,Number(c.cantidad),Number(c.monto),estadoCant);
                    //     }
                    // });
                   // sumar_cantidades();
                    modalAperturaCaja.modal('show');
                   
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la caja. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        idUsuario.select2();
        idCaja.select2();
        function Fecha_actual() {
            var hoy = new Date();
            var hAnio=hoy.getFullYear();
            var hmes=hoy.getMonth()+1;
            if(Number(hmes)<10){
                hmes='0'+String(hmes);
            }

            var hdia=hoy.getDate();
            if(Number(hdia)<10){
                hdia='0'+String(hdia);
            }
            var hora = hoy.getHours();
            if(Number(hora)<10){
                hora='0'+String(hora);
            }
            var minutos= hoy.getMinutes();
            if(Number(minutos)<10){
                minutos='0'+String(minutos);
            }
            var actu=hAnio+'-'+hmes+'-'+hdia;
            fechaCaja.val(actu);
            fecha_actualMc.val(actu);
             return actu;
        }

        function findCajaDiaria(id) {
            titlemodalAperturaCaja.html('Editar Apertura de Caja');
            RESTService.get('movimientoCajas/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    var data_fecha = response.fechaCaja;
                    var data_detalle = response.dataDetalle;
                    var dataDenominacion = response.dataDenominacion;

                    idUsuario.val(data_p.idUsuario).trigger("change");
                    idCaja.val(data_p.idCaja).trigger("change");
                    estado.val(data_p.estado);
                    idCajaDiaria.val(data_p.idCajaDiaria);
                    fechaCaja.val(data_p.fechaCaja2);

                    totalEfectivo.val(data_p.totalEfectivo);
                    totalEgresos.val(data_p.totalEgresos);
                    totalOtrosIngresos.val(data_p.totalOtrosIngresos);
                    totalNoEfectivo.val(data_p.totalNoEfectivo);
                    totalEfectivoDol.val(data_p.totalEfectivoDol);
                    totalEgresosDol.val(data_p.totalEgresosDol);
                    totalOtrosIngresosDol.val(data_p.totalOtrosIngresosDol);
                    totalNoEfectivoDol.val(data_p.totalNoEfectivoDol);

                    fechaCaja.prop('disabled',true);
                    idCaja.prop('disabled',true);
                    if(data_p.estado==0){
                        btn_procesarApertura.prop('disabled',true);
                    }
                    ventanaP='A';
                   // console.log(data_p);
                   // console.log(data_detalle);
                   console.log(dataDenominacion);

                   consecutivo.val(data_detalle[0].consecutivo);
                   
                    _.each(dataDenominacion, function (c) {
                       if(c.idMoneda=='1' && c.tipo=='1'){
                            var estadoCant='disabled';
                            addDenominacionSoles(c.id_denominacion,c.descripcion,Number(c.cantidad),Number(c.monto),estadoCant);
                        }else if(c.idMoneda=='2' && c.tipo=='1'){
                            var estadoCant='disabled';
                            addDenominacionDolar(c.id_denominacion,c.descripcion,Number(c.cantidad),Number(c.monto),estadoCant);
                        }
                    });
                   sumar_cantidades();
                    modalAperturaCaja.modal('show');
                   
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la caja. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        function getDataFormDescuento () {
            RESTService.all('movimientoCajas/data_formUsu', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                        idUsuario.append('<option value="">Seleccionar</option>');
                       _.each(response.usuarios, function(item) {
                        idUsuario.append('<option value="'+item.id+'">'+item.name+'</option>');

                    });
                } 
            }, function() {
                getDataFormDescuento();
            });
        }
        getDataFormDescuento();
        Fecha_actual();
        function getDataFormCajaDiaria() {
            RESTService.all('movimientoCajas/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    console.log(response.cajas);
                        idCaja.append('<option value="">Seleccionar</option>');
                       _.each(response.cajas, function(item) {
                        idCaja.append('<option value="'+item.idcaja+'">'+item.nombre_caja+'</option>');
                    });
                    idUsuario.val(response.usuario).trigger("change");
                    usuarioActual=response.usuario;
                } 
            }, function() {
                getDataFormCajaDiaria();
            });
        }
        getDataFormCajaDiaria();
        // $('#btn_apertura').click(function (e) {
        //     ventanaP='A';
        //      if(estado.val()==""){
        //          generarTablaApertura();      
        //      }else{
        //         var apertura='1';
        //         generarTablaView(apertura);
        //      }
        // });
       
        function generarTablaView(apertura){
            table_demoninacionesSoles.html("");
            table_demoninacionesDolares.html("");
            var id=idCajaDiaria.val();
            RESTService.get('movimientoCajas/getDenominacionesView', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                      var data_p = response.dataDenominacion;
                      table_demoninacionesSoles.html("");
                      table_demoninacionesDolares.html("");
                     _.each(data_p, function (c) {
                        if(c.idMoneda=='1' && c.tipo==apertura){
                            var estadoCant='disabled';
                            addDenominacionSoles(c.id_denominacion,c.descripcion,Number(c.cantidad),Number(c.monto),estadoCant);
                        }else if(c.idMoneda=='2' && c.tipo==apertura){
                            var estadoCant='disabled';
                            addDenominacionDolar(c.id_denominacion,c.descripcion,Number(c.cantidad),Number(c.monto),estadoCant);
                        }
                      
                    });
                     sumar_cantidades();
                     console.log(data_p);
                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
        }
        function sumar_cantidades(){
            console.log("sumando");
            var totalt=0;
            var totalD=0;
            $("#table_demoninacionesSoles tr").each(function(){
                var cantidadt=Number($(this).find("td:eq(1)").children("input").val());
                var monto=Number($(this).find("td:eq(2)").children("input").val());
                var subtota=cantidadt*monto;
                totalt=totalt+subtota;
                console.log("sumando2");
            });
            totalSoles.val(totalt.toFixed(3));
            $("#table_demoninacionesDolares tr").each(function(){
                var cantidadt=Number($(this).find("td:eq(1)").children("input").val());
                var monto=Number($(this).find("td:eq(2)").children("input").val());
                var subtota=cantidadt*monto;
                totalD=totalD+subtota;
                console.log("sumando2");
            });
            totalDolares.val(totalD.toFixed(3));
            if(estado.val()==''){
                totalEfectivo.val(totalt.toFixed(3));
                totalEfectivoDol.val(totalD.toFixed(3));
            }
        }
        function generarTablaApertura(){
            table_demoninacionesSoles.html("");
            table_demoninacionesDolares.html("");
            var id="0";
            var tabs=0;
            RESTService.get('movimientoCajas/getDenominaciones', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                      var data_p = response.dataDenominacion;
                     _.each(data_p, function (c) {
                        if(c.idMoneda=='1'){
                            var cantidad=0;
                            var estadoCant='';
                            tabs=tabs+1;
                            addDenominacionSoles(c.id_denominacion,c.descripcion,cantidad,Number(c.valor),estadoCant,tabs);
                        }
                      
                    });
                      _.each(data_p, function (c) {
                         if(c.idMoneda=='2'){
                            var cantidad=0;
                            var estadoCant='';
                            tabs=tabs+1;
                            addDenominacionDolar(c.id_denominacion,c.descripcion,cantidad,Number(c.valor),estadoCant,tabs);
                        }
                      
                    });
                      tabs=tabs+1; 
                     $("#btn_procesarApertura").attr('tabindex', tabs);  
                      sumar_cantidades();
                     console.log(data_p);
                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
        }

        function addDenominacionSoles(idDenominacion,denominacion,cantidad,monto,estadoCant,tabs) {
             var tr = $('<tr id="tr_b_' + idDenominacion + '"></tr>');
             var td1 = $('<td>' + denominacion + '</td>');
             var td2 =$('<td></td>');
             var td3 =$('<td></td>');
             var iddenominacion =$('<input type="hidden" name="idDenominacionS[]" class="idDenominacionS form-control input-sm"  value="' +idDenominacion+ '"  />');
             var cantidad = $('<input type="text" name="cantidadS[]" class="cantidadS form-control input-sm"  value="' +cantidad+ '"   tabindex="'+tabs+'" onkeypress="return soloNumeros(event)" '+estadoCant+'/>');
             var monto = $('<input type="text" name="montoS[]" class="montoS form-control input-sm"  value="' +monto+ '"  disabled/>');
             td1.append(iddenominacion);
             td2.append(cantidad);
             td3.append(monto);
             tr.append(td1).append(td2).append(td3);
             table_demoninacionesSoles.append(tr);
             $('.cantidadS').keyup(function (e) {
                 sumar_cantidades();
            });
             $('.cantidadS').keypress(function(e) {
             var code = (e.keyCode ? e.keyCode : e.which);
                if(code==13){
                     var cb = parseInt($(this).attr('tabindex'));
                     console.log()
                    if ($(':input[tabindex=\'' + (cb + 1) + '\']') != null) {
                       $(':input[tabindex=\'' + (cb + 1) + '\']').focus();
                       $(':input[tabindex=\'' + (cb + 1) + '\']').select();
                       e.preventDefault();
            
                       return false;
                   }
                }
             });

             // documento_or.keypress(function(e) {
             // var code = (e.keyCode ? e.keyCode : e.which);
             //    if(code==13){
             //        getCliente();
             //    }
             // });

        } 
        function addDenominacionDolar(idDenominacion,denominacion,cantidad,monto,estadoCant,tabs) {
             var tr = $('<tr id="tr_b_' + idDenominacion + '"></tr>');
             var td1 = $('<td>' + denominacion + '</td>');
             var td2 =$('<td></td>');
             var td3 =$('<td></td>');
             var iddenominacion =$('<input type="hidden" name="idDenominacionD[]" class="idDenominacionD form-control input-sm"  value="' +idDenominacion+ '"  />');
             var cantidad = $('<input type="text" name="cantidadD[]" class="cantidadD form-control input-sm"  value="' +cantidad+ '"  tabindex="'+tabs+'" onkeypress="return soloNumeros(event)" '+estadoCant+'/>');
             var monto = $('<input type="text" name="montoD[]" class="montoD form-control input-sm"  value="' +monto+ '"  disabled/>');
             td1.append(iddenominacion);
             td2.append(cantidad);
             td3.append(monto);
             tr.append(td1).append(td2).append(td3);
             table_demoninacionesDolares.append(tr);
             $('.cantidadD').keyup(function (e) {
                 sumar_cantidades();
            });
             $('.cantidadD').keypress(function(e) {
             var code = (e.keyCode ? e.keyCode : e.which);
                if(code==13){
                     var cb = parseInt($(this).attr('tabindex'));
                     console.log()
                    if ($(':input[tabindex=\'' + (cb + 1) + '\']') != null) {
                       $(':input[tabindex=\'' + (cb + 1) + '\']').focus();
                       $(':input[tabindex=\'' + (cb + 1) + '\']').select();
                       e.preventDefault();
            
                       return false;
                   }
                }
             });

        } 
        function cleanAperturaCaja() {
            cleanRequired();
            titlemodalAperturaCaja.html('');
            idUsuario.val(usuarioActual).trigger("change");
            idCaja.val("").trigger("change");
            estado.val("").trigger("change");

            idCajaDiaria.val("");
            // fechaCaja.val("");
            totalEfectivo.val("");
            totalEgresos.val("");
            totalOtrosIngresos.val("");
            totalNoEfectivo.val("");
            totalEfectivoDol.val("");
            totalEgresosDol.val("");
            totalOtrosIngresosDol.val("");
            totalNoEfectivoDol.val("");
            consecutivo.val("");
            totalSoles.val("");
            table_demoninacionesDolares.html("");
            table_demoninacionesSoles.html("");
            // fechaCaja.prop('disabled',false);
            idCaja.prop('disabled',false);
            btn_procesarApertura.prop('disabled',false);
            totalDolares.val("");
        }

        modalAperturaCaja.on('hidden.bs.modal', function (e) {
            cleanAperturaCaja();
        });
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        function newAperturaCaja()
        {
            titlemodalAperturaCaja.html('Nueva Apertura de Caja');
            modalAperturaCaja.modal('show');
        }
         $scope.saveAddMovimientoCaja = function()
        {
            var bval = true;
            bval = bval && tipoMovimientoAdd.required();
            bval = bval && idMonedaAdd.required();
            bval = bval && montoAdd.required();
            bval = bval && conceptoAdd.required();
            if(bval){
               var params = {
                        'tipoMovimientoAdd':tipoMovimientoAdd.val(),
                        'idMonedaAdd':idMonedaAdd.val(),
                        'montoAdd':montoAdd.val(),
                        'conceptoAdd':conceptoAdd.val(),
                        'formaPagoAdd':formaPagoAdd.val(),
                     };
                    var id =idcajaMC.val();
                 RESTService.updated('movimientoCajas/saveMovimientoCaja', id, params, function(response) {
                        if (!_.isUndefined(response.status) && response.status) {
                           
                            AlertFactory.textType({
                                title: '',
                                message: 'Se registró correctamente.',
                                type: 'success'
                            });
                            getDataFormMovementCaja();
                             $('#table_container_movimientoCaja').jtable('reload');

                            // estadoMc.val(cajaGuar[0].estado);
                            // caja_text.val(cajaGuar[0].nombre_caja);
                            // if(cajaGuar[0].estado==1){
                            //      btn_Mapertura.prop('disabled',true);
                            // };
                            // if(cajaGuar[0].estado==0){
                            //      btn_Mapertura.prop('disabled',true);
                            //      btn_Mcierra.prop('disabled',true);
                            // };
                           
                            // idcajaMC.val(cajaGuar[0].idCajaDiaria);
                             modalMovimientoCaja.modal('hide');
                            
                        } else {
                            var msg_ = (_.isUndefined(response.message)) ?
                                'No se pudo guardar . Intente nuevamente.' : response.message;
                            AlertFactory.textType({
                                title: '',
                                message: msg_,
                                type: 'info'
                            });
                        }
                            
                      }); 
            };

        }

        $scope.saveCajasDiarias = function()
        {
            var bval = true;
            bval = bval && fechaCaja.required();
            bval = bval && idCaja.required();
            bval = bval && idUsuario.required();



           if($("#table_demoninacionesSoles").html()==''){
               AlertFactory.showWarning({
                    title: '',
                    message: 'Debe aperturar o cerrar la caja',
                     type: 'info'
                });
                return false;  
            }
             if($("#table_demoninacionesDolares").html()==''){
               AlertFactory.showWarning({
                    title: '',
                    message: 'Debe aperturar o cerrar la caja',
                     type: 'info'
                });
                return false;  
            }


            if(estado.val()==''){
               if(totalEfectivo.val()<0){
                AlertFactory.showWarning({
                    title: '',
                    message: 'El total efectivo no puede ser menor a cero',
                     type: 'info',
                });
                return false;  
               } 
                if(totalEfectivoDol.val()<0){
                AlertFactory.showWarning({
                    title: '',
                    message: 'El total efectivo no puede ser menor a cero',
                     type: 'info',
                });
                return false;  
               } 

            }else if(estado.val()==1){
                if(Number(totalEfectivo.val())!=Number(totalSoles.val())){
                AlertFactory.showWarning({
                    title: '',
                    message: 'El total efectivo soles no es igual al monto ingresado',
                     type: 'info'
                });
                return false;  
               } 
                if(Number(totalEfectivoDol.val())!=Number(totalDolares.val())){
                AlertFactory.showWarning({
                    title: '',
                    message: 'El total efectivo dólares no es igual al monto ingresado',
                     type: 'info',
                });
                return false;  
               } 
               if(ventanaP=='A'){
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ingrese montos para cerrar caja',
                     type: 'info',
                });
                return false;  
               } 

            }

            if(bval){
                var textS="";
                var textD="";
               
                if(Number(totalEfectivo.val())==0){
                        textS=" ,con 0 efectivo en soles";
                }
                if(Number(totalEfectivoDol.val())==0){
                        textD=" ,con 0 efectivo en dólares";
                }
                 AlertFactory.confirm({
                    title: '',
                    message: "¿Está seguro que desea procesar esta caja"+textS+" "+textD+"?",
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    
                    var idDenominacionS =[];
                    $.each($('.idDenominacionS'), function (idx, item) {
                        idDenominacionS[idx] = $(item).val();
                    });
                    idDenominacionS = idDenominacionS.join(',');

                    var cantidadS =[];
                    $.each($('.cantidadS'), function (idx, item) {
                        cantidadS[idx] = $(item).val();
                    });
                      cantidadS = cantidadS.join(',');

                    var montoS =[];
                    $.each($('.montoS'), function (idx, item) {
                        montoS[idx] = $(item).val();
                    });
                    montoS = montoS.join(',');

                    var idDenominacionD =[];
                    $.each($('.idDenominacionD'), function (idx, item) {
                        idDenominacionD[idx] = $(item).val();
                    });
                    idDenominacionD = idDenominacionD.join(',');

                    var cantidadD =[];
                    $.each($('.cantidadD'), function (idx, item) {
                        cantidadD[idx] = $(item).val();
                    });
                    cantidadD = cantidadD.join(',');

                    var montoD =[];
                    $.each($('.montoD'), function (idx, item) {
                        montoD[idx] = $(item).val();
                    });
                    montoD = montoD.join(',');

                    var params = {
                        'fechaCaja':fechaCaja.val(),
                        'idCaja':idCaja.val(),
                        'idUsuario':idUsuario.val(),
                        'idDenominacionS':idDenominacionS,
                        'cantidadS':cantidadS,
                        'montoS':montoS,
                        'idDenominacionD':idDenominacionD,
                        'cantidadD':cantidadD,
                        'montoD':montoD,
                        'totalEfectivo':totalEfectivo.val(),
                        'totalEgresos':totalEgresos.val(),
                        'totalOtrosIngresos':totalOtrosIngresos.val(),
                        'totalNoEfectivo':totalNoEfectivo.val(),
                        'totalEfectivoDol':totalEfectivoDol.val(),
                        'totalEgresosDol':totalEgresosDol.val(),
                        'totalOtrosIngresosDol':totalOtrosIngresosDol.val(),
                        'totalNoEfectivoDol':totalNoEfectivoDol.val(),
                        'estado':estado.val(),
                        'consecutivo':consecutivo.val(),
                     };
                    var id = (idCajaDiaria.val() === '') ? 0 : idCajaDiaria.val();
                    RESTService.updated('movimientoCajas/saveCajasDiarias', id, params, function(response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            var cajaGuar=response.dataCaja;
                            AlertFactory.textType({
                                title: '',
                                message: 'Se registró correctamente.',
                                type: 'success'
                            });

                            // estadoMc.val(cajaGuar[0].estado);
                            // caja_text.val(cajaGuar[0].nombre_caja);
                            // if(cajaGuar[0].estado==1){
                            //      btn_Mapertura.prop('disabled',true);
                            // };
                            // if(cajaGuar[0].estado==0){
                            //      btn_Mapertura.prop('disabled',true);
                            //      btn_Mcierra.prop('disabled',true);
                            // };
                            getDataFormMovementCaja();
                            // idcajaMC.val(cajaGuar[0].idCajaDiaria);
                             modalAperturaCaja.modal('hide');
                            
                        } else {
                            var msg_ = (_.isUndefined(response.message)) ?
                                'No se pudo guardar . Intente nuevamente.' : response.message;
                            AlertFactory.textType({
                                title: '',
                                message: msg_,
                                type: 'info'
                            });
                        }
                            
                      }); 
                });
              
                 
            } 
        }
        function convertDateFormat(string) {
          var info = string.split('-');
          return info[2] + '/' + info[1] + '/' + info[0];
        }
        function cerrarCaja(id){
            console.log(id);
            titlemodalAperturaCaja.html('Cierre de Caja');
            findCajaDiariaMc(id);
             generarTablaApertura(); 
        }
        function addTableEfecSol(codigoTipo,tipotext,monto,tipoSum) {
            //  if ($('#tr_b_' + codigoTipo).length > 0) {
            //     var tota=Number($('#tr_b_' + codigoTipo).find("td:eq(2)").children("p").text());
            //     console.log("esdto es total");
            //     console.log(tota);
            //     var ntotal=Number(tota)+Number(monto);
            //     $('#tr_b_' + codigoTipo).find("td:eq(2)").children("p").text(ntotal.toFixed(2));
               
            // }else{
                console.log("entrovvvv");
                 var tr = $('<tr id="tr_b_' + codigoTipo + '"></tr>');
                 var td0 =$('<td></td>');
                 var td1 =$('<td><p>'+tipotext+'</p></td>');
                 var td2 =$('<td style="text-align:center; vertical-align:middle"><p>'+monto.toFixed(2)+'</p></td>');
                 var tip =$('<input type="hidden" class=" form-control input-sm"  value="' +tipoSum+ '"  />');
                 td0.append(tip);
                 tr.append(td0).append(td1).append(td2);
                 table_movimientoEfecti.append(tr);
            // }
             

            //  $('.cantidadS').keyup(function (e) {
            //      sumar_cantidades();
            // });
        }
        function addTableEfecDolar(codigoTipo,tipotext,monto,tipoSum) {
            //  if ($('#tr_bd_' + codigoTipo).length > 0) {
            //     var tota=Number($('#tr_bd_' + codigoTipo).find("td:eq(2)").children("p").text());
            //     console.log("esdto es total");
            //     console.log(tota);
            //     var ntotal=Number(tota)+Number(monto);
            //     $('#tr_bd_' + codigoTipo).find("td:eq(2)").children("p").text(ntotal.toFixed(2));
               
            // }else{
                console.log("entrovvvv");
                 var tr = $('<tr id="tr_bd_' + codigoTipo + '"></tr>');
                 var td0 =$('<td></td>');
                 var td1 =$('<td><p>'+tipotext+'</p></td>');
                 var td2 =$('<td style="text-align:center; vertical-align:middle"><p>'+monto.toFixed(2)+'</p></td>');
                 var tip =$('<input type="hidden" class=" form-control input-sm"  value="' +tipoSum+ '"  />');
                 td0.append(tip);
                 tr.append(td0).append(td1).append(td2);
                 table_movimientoDEfecti.append(tr);
            // }
             

            //  $('.cantidadS').keyup(function (e) {
            //      sumar_cantidades();
            // });
        }  
        function calcularTotalEfect(tipoSumX,totalefecdb){
            var totalEfectivo=0;
            var totalForma=0;
            $("#table_movimientoEfecti tr").each(function(){
                var tipo=$(this).find("td:eq(0)").children("input").val();
                var total=Number($(this).find("td:eq(2)").children("p").text());
                if(tipo=='SE'){
                    totalEfectivo=total+totalEfectivo;
                }else{
                    totalForma=total+totalForma;
                }
            });
            if(tipoSumX=='SE'){
                 var tr = $('<tr></tr>');
                 var td0 =$('<th height="20px" width="30px"></th>');
                 var td1 =$('<th height="20px" width="30px" style="text-align:left; vertical-align:middle">TOTAL EFECTIVO</th>');
                 var td2 =$('<th height="20px" width="30px">'+Number(totalefecdb).toFixed(2)+'</th>');
                 tr.append(td0).append(td1).append(td2);
                 table_movimientoEfecti.append(tr);
                 var tr2 = $('<tr></tr>');
                 var td02 =$('<th height="20px" width="30px"></th>');
                 var td12 =$('<th height="20px" width="30px" style="text-align:left; vertical-align:middle">VENTAS FORMA DE PAGO</th>');
                 var td22 =$('<th height="20px" width="30px"></th>');
                 tr2.append(td02).append(td12).append(td22);
                 table_movimientoEfecti.append(tr2);   
            }else{
                 var tr = $('<tr></tr>');
                 var td0 =$('<th height="20px" width="30px"></th>');
                 var td1 =$('<th height="20px" width="30px" style="text-align:left; vertical-align:middle">TOTAL VENTA</th>');
                 var td2 =$('<th height="20px" width="30px">'+totalForma.toFixed(2)+'</th>');
                 tr.append(td0).append(td1).append(td2);
                 table_movimientoEfecti.append(tr); 
            }
            
            
        }
        function calcularTotalEfectDola(tipoSumX,totalefecdb){
            var totalEfectivo=0;
            var totalForma=0;
            $("#table_movimientoDEfecti tr").each(function(){
                var tipo=$(this).find("td:eq(0)").children("input").val();
                var total=Number($(this).find("td:eq(2)").children("p").text());
                if(tipo=='DE'){
                    totalEfectivo=total+totalEfectivo;
                }else{
                    totalForma=total+totalForma;
                }
            });
            if(tipoSumX=='DE'){
                 var tr = $('<tr></tr>');
                 var td0 =$('<th height="20px" width="30px"></th>');
                 var td1 =$('<th height="20px" width="30px" style="text-align:left; vertical-align:middle">TOTAL EFECTIVO</th>');
                 var td2 =$('<th height="20px" width="30px">'+Number(totalefecdb).toFixed(2)+'</th>');
                 tr.append(td0).append(td1).append(td2);
                 table_movimientoDEfecti.append(tr);
                 var tr2 = $('<tr></tr>');
                 var td02 =$('<th height="20px" width="30px"></th>');
                 var td12 =$('<th height="20px" width="30px" style="text-align:left; vertical-align:middle">VENTAS FORMA DE PAGO</th>');
                 var td22 =$('<th height="20px" width="30px"></th>');
                 tr2.append(td02).append(td12).append(td22);
                 table_movimientoDEfecti.append(tr2);       
            }else{
                 var tr = $('<tr></tr>');
                 var td0 =$('<th height="20px" width="30px"></th>');
                 var td1 =$('<th height="20px" width="30px" style="text-align:left; vertical-align:middle">TOTAL VENTA</th>');
                 var td2 =$('<th height="20px" width="30px">'+totalForma.toFixed(2)+'</th>');
                 tr.append(td0).append(td1).append(td2);
                 table_movimientoDEfecti.append(tr); 
            }
            
            
        }
        

        $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        // var filtro_tipo = '<select id="filtro_tipo" class="form-control input-sm""><option value="">Tipo</option></select>';
        // var filtro_moneda ='<select id="filtro_moneda"  style="width: 100%" class="form-control input-sm""><option value="">Moneda</option></select>';
        var search = getFormSearch_MovimientoCaja('frm-search-movimientoCaja', 'search_b', 'LoadRecordsButtonmovimientoCaja');
        var btn_exportar_CM=$("#btn_exportar_CM");

        function getDataFormMovementCaja () { 
            var id=Fecha_actual();
            RESTService.get('movimientoCajas/data_form', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var fecha_caja=response.fechacA;
                     var dataCajaDetForSol=response.dataCajaDetForSol;
                    var dataCajaDetEfeSol=response.dataCajaDetEfeSol;
                    var dataCajaDetForDol=response.dataCajaDetForDol;
                    var dataCajaDetEfeDol=response.dataCajaDetEfeDol;

                    var dataCajaDetEfeSolAper=response.dataCajaDetEfeSolAper;
                    var dataCajaDetEfeDolAper=response.dataCajaDetEfeDolAper;

 
                    console.log(dataCajaDetEfeSolAper);
                    console.log(dataCajaDetEfeDolAper);
                    console.log("esta es la fecha");
                    console.log(fecha_caja);
                    var tip=response.data;
                    var dataCaja=response.dataMc;
                    var dataCajaAbir=response.dataCA;
                    var dataCaDet=response.dataCaDet;
                    console.log("aaaaa");
                    console.log(dataCaDet);
                    caja_sin.html("");
                    var fechaCajaAbir=response.fechacA;
                    if(dataCajaAbir.length!=0){
                        var fechaAbi=convertDateFormat(dataCajaAbir[0].fecha);
                        var html="";
                        html+='<p><h5 class="mensajeCaja" >Existe una caja sin cerrar en la fecha '+fechaAbi+'</h5></p>'
                        caja_sin.append(html);
                         $('.mensajeCaja').click(function (e) {
                                cerrarCaja(dataCajaAbir[0].idCajaDiaria);

                            });

                    }
                   
                   
                     if(dataCaDet.length!=0){
                        table_movimientoEfecti.html("");
                        table_movimientoDEfecti.html("");
                         var cotipoApe=0;
                        var tipoTexApe='APERTURA';
                        var montoApe=Number(dataCajaDetEfeSolAper[0].monto);
                        var tiposumApe='SE';
                        addTableEfecSol(cotipoApe,tipoTexApe,montoApe,tiposumApe);
                        dataCajaDetEfeSol.map(function(index) {
                              var codigoTipo=index.codigoTipo;
                               var tipotext=index.descripcion_tipo;
                                var montoadd=0;
                               if(index.monto!=null){
                                    montoadd=Number(index.monto);
                                }
                            // if(index.codigoFormaPago=='EFE' && index.idMoneda=='1'){
                            //     var codigoTipo=index.codigoTipo;
                            //     var tipotext=index.descripcion_tipo;
                            //     var montoadd=0;
                            //     if(index.monto!=null){
                            //         montoadd=Number(index.monto);
                            //     }
                                var tiposum='SE';
                                addTableEfecSol(codigoTipo,tipotext,montoadd,tiposum);
                            // }
                        });


                            var tipoSumA='SE';
                            var totalefectSol= dataCaja[0].totalEfectivo;
                            calcularTotalEfect(tipoSumA,totalefectSol);
                            dataCajaDetForSol.map(function(index) {
                            // if(index.idMoneda=='1'){
                                var codigoFormaPago=index.codigoFormaPago;
                                var tipotext=index.descripcion_subtipo;
                                var montoadd=0;
                                if(index.monto!=null){
                                    montoadd=Number(index.monto);
                                }
                                var tiposum='SP';
                                addTableEfecSol(codigoFormaPago,tipotext,montoadd,tiposum);
                            
                        });   
                        var tipoSumB='SP';
                        totalefectSol='';
                        calcularTotalEfect(tipoSumB.totalefectSol);
                        var cotipoApeDol=0;
                        var tipoTexApeDol='APERTURA';
                        var montoApeDol=Number(dataCajaDetEfeDolAper[0].monto);
                        var tiposumApeDol='DE';
                        addTableEfecDolar(cotipoApeDol,tipoTexApeDol,montoApeDol,tiposumApeDol);
                        dataCajaDetEfeDol.map(function(index) {
                            // if(index.codigoFormaPago=='EFE' && index.idMoneda=='2'){
                                var codigoTipo=index.codigoTipo;
                                var tipotext=index.descripcion_tipo;
                                var montoadd=0;
                                if(index.monto!=null){
                                    montoadd=Number(index.monto);
                                }
                                var tiposum='DE';
                                addTableEfecDolar(codigoTipo,tipotext,montoadd,tiposum);
                            // }
                        });
                        var tipodSumA='DE';
                        var totalefectDol= dataCaja[0].totalEfectivoDol;
                        calcularTotalEfectDola(tipodSumA,totalefectDol);
                        dataCajaDetForDol.map(function(index) {
                            // if(index.idMoneda=='2'){
                                var codigoFormaPago=index.codigoFormaPago;
                                var tipotext=index.descripcion_subtipo;
                                var montoadd=0;
                                if(index.monto!=null){
                                    montoadd=Number(index.monto);
                                }
                                var tiposum='DP';
                                addTableEfecDolar(codigoFormaPago,tipotext,montoadd,tiposum);
                            // }
                        });   
                        var tipodSumB='DP';
                        totalefectDol='';
                        calcularTotalEfectDola(tipodSumB,totalefectDol);
                     }

                     if(dataCaja.length!=0){
                        estadoMc.val(dataCaja[0].estado);
                        caja_text.val(dataCaja[0].nombre_caja);
                        idcajaMC.val(dataCaja[0].idCajaDiaria);
                        // console.log("holaaaaa");
                        // console.log(dataCaja);
                        // console.log("hdhdd");
                        if(dataCaja[0].estado==1){
                            btn_Mapertura.prop('disabled',true);
                        };
                        if(dataCaja[0].estado==0){
                             btn_Mapertura.prop('disabled',true);
                             btn_Mcierra.prop('disabled',true);
                        };
                     }
                     console.log(response.data_tipo);
                     console.log("response tipo");
                     $("#filtro_tipoMovi").html("");
                     $("#filtro_tipoMovi").append('<option value="">Tipo</option>');
                     // tipoMovimientoAdd.append('<option value="">Tipo</option>');
                    _.each(response.data_tipo, function (item) {
                        $("#filtro_tipoMovi").append('<option value="' + item.codigo_tipo + '">' + item.descripcion_tipo + '</option>');
                        // tipoMovimientoAdd.append('<option value="' + item.codigo_tipo + '">' + item.descripcion_tipo + '</option>');
                    });


                    $("#filtro_monedaMovi").html("");
                    $("#filtro_monedaMovi").append('<option value="">Moneda</option>');
                    // idMonedaAdd.append('<option value="">Moneda</option>');
                    _.each(response.data_moneda, function (item) {
                        $("#filtro_monedaMovi").append('<option value="' + item.IdMoneda + '">'+ item.Descripcion + '</option>');
                        // idMonedaAdd.append('<option value="' + item.IdMoneda + '">'+ item.Descripcion + '</option>');
                    });

                    // var tipo_clie=response.tipo_clie;
                    // var tipoc_doc_venta=response.tipoc_doc_venta;
                    // var tipo_persona=response.tipo_persona;
                   // cTipodocumento.append('<option value="">Seleccionar</option>');
                  // tip.map(function(index) {
                  //    cTipodocumento.append('<option value="'+index.Codigo+'">'+index.TipoDocumento+'</option>');
                  // });
                   // cTipopersona.append('<option value="">Seleccionar</option>');
                  // tipo_persona.map(function(index) {
                  //    cTipopersona.append('<option value="'+index.cCodigo+'">'+index.cDescripcion+'</option>');
                  // });
                }
            }, function() {
                getDataFormMovementCaja();
            });
        }
        getDataFormMovementCaja();
        var table_container_movimientoCaja = $("#table_container_movimientoCaja");

        table_container_movimientoCaja.jtable({
            title: "Lista de Movimientos",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/movimientoCajas/list',
                // deleteAction: base_url + '/movimientoCajas/delete',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }
                // ,{
                //     cssClass: 'btn-primary',
                //     text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                //     click: function () {
                //         $scope.openDoc('movimientoCajas/excel', {});
                //     }
                // }
                // ,{
                //     cssClass: 'btn-danger-admin',
                //     text: '<i class="fa fa-plus"></i>Movimiento caja',
                //     click: function () {
                //         newMovimiCaja();
                //     }
                // }
                ]
            },
            fields: {
                consecutivo: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                descripcion: {
                    title: 'Concepto',
                },
                codigoTipo: {
                    title: 'Tipo',
                    options: base_url + '/movimientoCajas/getTipoMoCa',
                },
                idMoneda: {
                    title: 'Moneda',
                    options: base_url + '/movimientoCajas/getMonedasMoc',
                },
                monto: {
                    title: 'Monto',
                    
                },
                nroOperacion: {
                    title: 'Nro Operación',
                },
                codigoFormaPago: {
                    title: 'Forma de pago',
                    options: base_url + '/movimientoCajas/getFormPaCa',
                },

                

            },
           

            formCreated: function (event, data) {
                data.form.find('input[name="Categoria"]').attr('onkeypress','return soloLetras(event)');
                $('#Edit-estado').parent().addClass('i-checks');
               
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                     if(e.target.value=='A'){
                        $("#Edit-estado").val("I");
                        $(".i-checks span").text("Inactivo");

                     }else{
                        $("#Edit-estado").val("A");
                        $(".i-checks span").text("Activo");
                     };
                });
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="Categoria"]').required();
                return bval;
            }
        });
        $("#btn_exportar_CM").click(function(e){
            console.log("exporta");
            $scope.openDoc('movimientoCajas/excel', {});
        });

        generateSearchForm('frm-search-movimientoCaja', 'LoadRecordsButtonmovimientoCaja', function(){
            table_container_movimientoCaja.jtable('load', {
                search: $('#search_b').val(),
                filtro_tipoMovi:$('#filtro_tipoMovi').val(),
                filtro_monedaMovi:$('#filtro_monedaMovi').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('movimientoCajas', {
                url: '/movimientoCajas',
                templateUrl: base_url + '/templates/movimientoCajas/base.html',
                controller: 'movimientoCajaCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();