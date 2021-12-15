/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.proformas')
        .config(Config)
        .controller('ProformaCtrl', ProformaCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ProformaCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ProformaCtrl($scope, _, RESTService, AlertFactory)
    {   
        var servicios;
        var igv;
        var btn_aprobarProforma=$(".btn_aprobarProforma");
        var btn_guardarProforma=$(".btn_guardarProforma");
        var estado=$("#estado");
        var btn_cerrar=$("#btn_cerrar");
        var btn_cancelar_servicio=$("#btn_cancelar_servicio");
        var modalDeleteProforma=$("#modalDeleteProforma");
        var idProformaDelete=$("#idProformaDelete");
        var totalMO=$("#totalMO");
        var repuestos_array;
        var estado=$("#estado");
        var table_repuestos=$("#table_repuestos");
        var table_servicios=$("#table_servicios");
        var modalDeleteDetalle=$("#modalDeleteDetalle");
        var idAsesor=$("#idAsesor");
        var cCodConsecutivo=$("#cCodConsecutivo");
        var idcCondicionPago=$("#idcCondicionPago");
        var modalProforma=$("#modalProforma");
        var id_cliente_tipo_or=$("#id_cliente_tipo_or");
        var cCodConsecutivo_orden=$("#cCodConsecutivo_orden");
        var idMoneda=$("#IdMoneda");
        var titlemodalProforma=$("#titlemodalProforma");
        var idcliente=$("#idcliente");
        var documento_or=$("#documento_or");
        var razonsocial_cliente_or=$("#razonsocial_cliente_or");
        var placa=$("#placa");
        var nKilometraje=$("#nKilometraje");
        var motor=$("#motor");
        var color=$("#color");
        var cCodConsecutivoOS=$("#cCodConsecutivoOS");
        var nConsecutivoOS=$("#nConsecutivoOS");
        var articulos_repuestos=$("#articulos_repuestos");
        var tipo_totales_slec=$("#tipo_totales_slec");
        var tipo_totales_slec2=$("#tipo_totales_slec2");
        var servicios_select=$("#servicios_select");
        var btn_cambio_delete=$("#btn_cambio_delete");
        var mo_revision=$("#mo_revision");
        var mo_mecanica=$("#mo_mecanica");
        var terceros=$("#terceros");
        var otros_mo=$("#otros_mo");
        var subtotal_moa=$("#subtotal_moa");
        var nConsecutivo=$("#nConsecutivo");
        var repuestos=$("#repuestos");
        var accesorios=$("#accesorios");
        var lubricantes=$("#lubricantes");
        var otros_rep=$("#otros_rep");
        var subtotal_mob=$("#subtotal_mob");
        var total=$("#total");
        var totalDetalle=$("#totalDetalle");
        var dFecEntrega=$("#dFecEntrega");
        var nEstimadoHoras=$("#nEstimadoHoras");
        var idProforma=$("#idProforma");
        var btn_imprimirProforma=$(".btn_imprimirProforma");
        btn_imprimirProforma.click(function(e){
            var id=cCodConsecutivo.val()+"_"+nConsecutivo.val();
            if(id!=''){
                 var data = {
                        id: id,        
                };
              $scope.loadProformaPDF('proformas/pdf', data);
            }
        });
        function cleandatos(){
            id_cliente_tipo_or.val('');
            idcliente.val('');
            documento_or.val('');
            razonsocial_cliente_or.val('');
            placa.val('');
            nKilometraje.val('');
            motor.val('');
            color.val('');
            cCodConsecutivoOS.val('');
            nConsecutivoOS.val('');
            idMoneda.val('');
            idcCondicionPago.val('');
            idAsesor.val('').trigger('change');
        }
         btn_aprobarProforma.click(function () {
           Aprobar_Proforma_servicio();
          });
          function Aprobar_Proforma_servicio(){
             var id=cCodConsecutivo.val()+"_"+nConsecutivo.val();
             var params = {
                    'estado':1,
                 };
              RESTService.updated('proformas/cambiar_estado', id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var data=response.data;
                        if(data[0].Mensaje=='OK'){
                              AlertFactory.textType({
                                    title: '',
                                    message: 'La Proforma se aprobó correctamente',
                                    type: 'success'
                                });
                                btn_guardarProforma.prop('disabled',true); 
                                estado.val(1);
                            }else{
                              

                                 AlertFactory.textType({
                                    title: '',
                                    message: data[0].Mensaje,
                                    type: 'info'
                                });
                               
                            }
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar el Vehiculo. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                        
                });
          }
         function findRegister_Proforma(id)
        {
            
            RESTService.get('proformas/find', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                  
                    var data=response.data;
                    titlemodalProforma.html('Editar Proforma '+'['+data[0].nConsecutivo+ ']');
                    console.log(data);
                    console.log(response.data_repuesto);
                    console.log(response.data_servicio);
                    cCodConsecutivo.prop('disabled',true);
                    cCodConsecutivo.val(data[0].cCodConsecutivo).trigger("change");
                    nConsecutivo.prop('disabled',true);
                    nConsecutivo.val(data[0].nConsecutivo);
                    var valor_orden_servicio=data[0].cCodConsecutivoOS+'*'+data[0].nConsecutivoOS+'*'+data[0].IdMoneda+'*'+data[0].idcCondicionPago+'*'+data[0].idAsesor+'*'+data[0].asesor+'*'+data[0].idCliente+'*'+data[0].documento+'*'+data[0].idTipoCliente+'*'+data[0].razonsocial_cliente+'*'+data[0].cPlacaVeh+'*'+data[0].nKilometraje+'*'+data[0].cMotor+'*'+data[0].cColor;
                    cCodConsecutivo_orden.val(valor_orden_servicio).trigger("change");
                    idAsesor.val(data[0].idAsesorProforma).trigger("change");
                    var hor=Number(data[0].nEstimadoHoras);
                    nEstimadoHoras.val(hor.toFixed(2));
                    estado.val(data[0].iEstado);
                    if(data[0].iEstado!='0'){
                          btn_guardarProforma.prop('disabled',true); 
                    }
                    dFecEntrega.val(data.dFechaRegistro2);
                    _.each(response.data_repuesto, function (b) {
                        var modo_m=1;
                         addRepuesto(b.idProducto,b.description,b.nPrecioUnitario,b.id_tipototal,b.descripcion,b.nCant,b.impuesto,modo_m,b.idDetalleRepues);
                    });


                    _.each(response.data_servicio, function (b) {
                        var modo_m=1;
                        var vto=b.idProducto+'*'+b.description+'*'+b.nTotal+'*'+b.impuesto;
                         addServicios(vto,b.id_tipototal,b.descripcion,modo_m,b.idDetalleServicio);
                    });
                     btn_aprobarProforma.prop('disabled',false); 
                    modalProforma.modal("show");
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la Proforma. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
         btn_cancelar_servicio.click(function () {
             cCodConsecutivo_orden.val(cCodConsecutivo_orden.data("prev")).trigger("change");
          });
          btn_cerrar.click(function () {
            cCodConsecutivo_orden.val(cCodConsecutivo_orden.data("prev")).trigger("change");
          });
         $scope.EliminarProforma = function()
        {
           var id=idProformaDelete.val();
            RESTService.get('proformas/delete', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                    var dta=response.data;
                    if(dta[0]['Mensaje']!=""){
                         AlertFactory.textType({
                                title: '',
                                message: dta[0]['Mensaje'],
                                type: 'info'
                        }); 
                        modalDeleteProforma.modal("hide"); 
                    }else{
                         AlertFactory.textType({
                            title: '',
                            message: 'El registro se eliminó correctamente',
                            type: 'success'
                        });
                        modalDeleteProforma.modal("hide"); 
                        LoadRecordsButtonProforma.click();
                    }
                  
                  
                    
                    }
               }); 
        }
         $scope.saveProforma = function()
        {
            var bval = true;
            bval = bval && cCodConsecutivo.required();
            bval = bval && idAsesor.required();

            bval = bval && dFecEntrega.required();
            bval = bval && nEstimadoHoras.required();

            bval = bval && documento_or.required();
            bval = bval && placa.required();

            if($("#table_repuestos").html()==''){
               AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar un mínimo de 1  Repuesto'
                });
                return false;  
            }
             if($("#table_servicios").html()==''){
               AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar un mínimo de 1 Servicio'
                });
                return false;  
            }
            if($("#total").val()==0){
               AlertFactory.showWarning({
                    title: '',
                    message: 'El total no puede ser 0'
                });
                return false;  
            }
            if(bval){

                var id_repuesto_array =[];
                $.each($('.idRepuesto_select'), function (idx, item) {
                    id_repuesto_array[idx] = $(item).val();
                });
                id_repuesto_array = id_repuesto_array.join(',');
                
                var id_repuesto_cantidad =[];
                $.each($('.cantidad_m'), function (idx, item) {
                    id_repuesto_cantidad[idx] = $(item).val();
                });
                id_repuesto_cantidad = id_repuesto_cantidad.join(',');
                var id_repuesto_precio =[];
                $.each($('.precioRepuesto_m'), function (idx, item) {
                    id_repuesto_precio[idx] = $(item).val();
                });
                id_repuesto_precio = id_repuesto_precio.join(',');
                var id_repuesto_impuesto =[];
                $.each($('.totalImpuesto_repuesto'), function (idx, item) {
                    id_repuesto_impuesto[idx] = $(item).val();
                });
                 id_repuesto_impuesto = id_repuesto_impuesto.join(',');

                 var id_repuesto_tipoTotal =[];
                $.each($('.idTipoRepuesto_select'), function (idx, item) {
                    id_repuesto_tipoTotal[idx] = $(item).val();
                });
                id_repuesto_tipoTotal = id_repuesto_tipoTotal.join(',');

                var modo_array_repuesto =[];
                $.each($('.modo_serRepuestoDet'), function (idx, item) {
                    modo_array_repuesto[idx] = $(item).val();
                });
                modo_array_repuesto = modo_array_repuesto.join(',');

                var id_revision_array =[];
                $.each($('.idRevision_select'), function (idx, item) {
                    id_revision_array[idx] = $(item).val();
                });
                id_revision_array = id_revision_array.join(',');

                var id_tipo_array =[];
                $.each($('.idTipo_select'), function (idx, item) {
                    id_tipo_array[idx] = $(item).val();
                });
                id_tipo_array = id_tipo_array.join(',');

                 var precio_array =[];
                $.each($('.precio_m'), function (idx, item) {
                    precio_array[idx] = $(item).val();
                });
                precio_array = precio_array.join(',');

                var impuesto_servicio =[];
                $.each($('.totalImpuesto_servicio'), function (idx, item) {
                    impuesto_servicio[idx] = $(item).val();
                });
                impuesto_servicio = impuesto_servicio.join(',');

                var modo_array_servicio =[];
                $.each($('.modo_serDet'), function (idx, item) {
                    modo_array_servicio[idx] = $(item).val();
                });
                modo_array_servicio = modo_array_servicio.join(',');
                

                var idDetalleGrup =[];
                $.each($('.idDetalleGrup'), function (idx, item) {
                    idDetalleGrup[idx] = $(item).val();
                });
                idDetalleGrup = idDetalleGrup.join(',');


                var idDetalleRepuestoGrup =[];
                $.each($('.idDetalleRepuestoGrup'), function (idx, item) {
                    idDetalleRepuestoGrup[idx] = $(item).val();
                });
                idDetalleRepuestoGrup = idDetalleRepuestoGrup.join(',');
                var con=$("#nConsecutivo").val();
                if($("#nConsecutivo").val()==""){
                    con=0;
                };
                var params = {
                    'cCod': cCodConsecutivo.val(),
                    'nCons': con,
                    'cCodOS':cCodConsecutivoOS.val(),
                    'nConsOS':nConsecutivoOS.val(),
                    'cMoneda':idMoneda.val(),
                    'nidCliente':idcliente.val(),
                    'nidAsesor':idAsesor.val(),
                    'cPlacaVeh':placa.val(),
                    'dFecRec':dFecEntrega.val(),
                    'nEstimado':nEstimadoHoras.val(),
                    'idDetalleRepuestoGrup':idDetalleRepuestoGrup,
                    'id_repuesto_array':id_repuesto_array,
                    'id_repuesto_cantidad':id_repuesto_cantidad,
                    'id_repuesto_precio':id_repuesto_precio,
                    'id_repuesto_impuesto':id_repuesto_impuesto,
                    'id_repuesto_tipoTotal':id_repuesto_tipoTotal,
                    'modo_array_repuesto':modo_array_repuesto,
                    'id_revision_array':id_revision_array,
                    'id_tipo_array':id_tipo_array,
                    'idDetalleGrup':idDetalleGrup,
                    'precio_array_servicio':precio_array,
                    'impuesto_servicio':impuesto_servicio,
                    'modo_array_servicio':modo_array_servicio,
                 };

               
                var id = (idProforma.val() === '') ? 0 : idProforma.val();
                    RESTService.updated('proformas/createProforma', id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                       var data_p =response.res;
                       if(Number(data_p[0].Mensaje)){
                        $("#nConsecutivo").val(data_p[0].Mensaje);
                        estado.val("0");
                        btn_aprobarProforma.prop('disabled',false); 
                        btn_guardarProforma.prop('disabled',true); 
                        cCodConsecutivo.prop('disabled',true); 
                        AlertFactory.textType({
                            title: '',
                            message: 'La Proforma se registró correctamente.',
                            type: 'success'
                        });
                         LoadRecordsButtonProforma.click();
                    }else{
                         AlertFactory.textType({
                            title: '',
                            message: data_p[0].Mensaje,
                            type: 'info'
                        });
                    }
                        
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar el Vehiculo. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                        
                  });
            } 
        }
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
         modalProforma.on('hidden.bs.modal', function (e) {
              cleanProforma();
        });
        $('#btn_cambio_delete').click(function(e){
            EliminarServiciosDetalle();
        });
        function sumar_key(){
            var subA=Number(mo_revision.val())+Number(mo_mecanica.val())+Number(terceros.val())+Number(otros_mo.val());
            var subB=Number(repuestos.val())+Number(accesorios.val())+Number(lubricantes.val())+Number(otros_rep.val());
            subtotal_moa.val(subA.toFixed(2));
            subtotal_mob.val(subB.toFixed(2));
            var totalfin=Number(subtotal_moa.val())+Number(subtotal_mob.val());
            total.val(totalfin.toFixed(2));
        }
          function clean_totale(){
            mo_revision.val(0);
            mo_mecanica.val(0);
            terceros.val(0);
            otros_mo.val(0);
            repuestos.val(0);
            accesorios.val(0);
            lubricantes.val(0);
            otros_rep.val(0);
        }

         function EliminarServiciosDetalle (){
            
            if(nConsecutivo.val()!=""){
                var id=cCodConsecutivo.val()+"_"+nConsecutivo.val();
             var id_revision_array =[];
                $.each($('.idDetalleGrup'), function (idx, item) {
                    id_revision_array[idx] = $(item).val();

                });
            id_revision_array = id_revision_array.join(',');

              var idDetalleRepuestoGrup =[];
                $.each($('.idDetalleRepuestoGrup'), function (idx, item) {
                    idDetalleRepuestoGrup[idx] = $(item).val();

                });
            idDetalleRepuestoGrup = idDetalleRepuestoGrup.join(',');
            
            var params = {
                    'id_revision_array':id_revision_array,
                    'idDetalleRepuestoGrup':idDetalleRepuestoGrup,
                 };
                 
             RESTService.updated('proformas/deleteDetalleMO', id, params, function(response)  {
                 if (!_.isUndefined(response.status) && response.status) {
                          var data=response.dato;
                            console.log(data);
                            if(data[0].Mensaje!=''){
                                  AlertFactory.textType({
                                    title: '',
                                    message: data[0].Mensaje,
                                    type: 'info'
                                });
                                  cCodConsecutivo_orden.data("prev",cCodConsecutivo_orden.val()); 
                                   modalDeleteDetalle.modal("hide");
                            }else{
                                 // console.log(response.data);
                                 // console.log(response.datad);
                                table_servicios.html("");
                                cCodConsecutivo_orden.data("prev",cCodConsecutivo_orden.val()); 
                                // if(id_tipocli.val()!=''){
                                //    id_cliente_tipo_or.val(id_tipocli.val()).trigger("change"); 
                                // }
                              AlertFactory.textType({
                                    title: '',
                                    message: 'Repuestos y  servicios se eliminaron correctamente',
                                    type: 'success'
                            });
                              table_servicios.html("");
                              table_repuestos.html("");
                              clean_totale();
                              calcular_total_repuesto();
                              calcular_total_MO();
                              sumar_key();
                             modalDeleteDetalle.modal("hide");
                            }
                    }else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo eliminar. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'error'
                        });
                        cCodConsecutivo_orden.data("prev",cCodConsecutivo_orden.val()); 
                        modalDeleteDetalle.modal("hide"); 
                    }
               });
         }else{
              modalDeleteDetalle.modal("hide"); 
              table_servicios.html("");
              table_repuestos.html("");
              clean_totale();
              calcular_total_repuesto();
              calcular_total_MO();
              sumar_key();
         }
        }
        tipo_totales_slec2.change(function () {
                var tipoTo=tipo_totales_slec2.val();
                var tipoText=$("#tipo_totales_slec2 option:selected").text();
                var vto =articulos_repuestos.val();
                if(vto!='' && tipoTo!=''){
                    var modo_ser=0;
                    var iddet=0;
                    var cantidad=1;
                    var totRep=vto.split('*');
                    var idRepues=totRep[0];
                    var precio=totRep[1];
                    var prodDescrip=totRep[2];
                    var impuesto=totRep[3];
                    addRepuesto(idRepues,prodDescrip,precio,tipoTo,tipoText,cantidad,impuesto,modo_ser,iddet);
                }
        });
         tipo_totales_slec.change(function () {
                var tipoTo=tipo_totales_slec.val();
                var tipoText=$("#tipo_totales_slec option:selected").text();
                var vto =servicios_select.val();
                if(vto!='' && tipoTo!=''){
                    var modo_ser=0;
                    var iddet=0;
                    addServicios(vto,tipoTo,tipoText,modo_ser,iddet);
                }
        });
        function calcular_impueso(precio,cantidad){
            var impu=(Number(precio)*Number(cantidad))*((Number(igv)/100));
            impu=impu.toFixed(2);
            return impu;
        }
        function calcular_total_repuesto(){
            var totalt=0;
            $("#table_repuestos tr").each(function(){
                var cantidadt=Number($(this).find("td:eq(1)").children("input").val());
                var preciot=Number($(this).find("td:eq(2)").children("input").val());
                var impuestot=Number($(this).find("td:eq(3)").children("input").val());
                var subtota=(cantidadt*preciot)+impuestot;
                $(this).find("td:eq(4)").children("input").val(subtota.toFixed(2));
                totalt=totalt+subtota;
            });
       
            totalDetalle.val(totalt.toFixed(2));
        }
        function calcular_total_MO(){
            var totalt=0;
            $("#table_servicios tr").each(function(){
                var cantidadt=1;
                var preciot=Number($(this).find("td:eq(1)").children("input").val());
                var impuestot=Number($(this).find("td:eq(2)").children("input").val());
                var subtota=(cantidadt*preciot)+impuestot;
                $(this).find("td:eq(3)").children("input").val(subtota.toFixed(2));
                totalt=totalt+subtota;
            });
       
            totalMO.val(totalt.toFixed(2));
        }
        function calcular_precio_totales(precio_ant,precio_act,tipoTo,code,tr_pre,data_prec){
            if(tipoTo=='1'){
                            var mo=mo_revision.val();
                            var precio_temp=Number(mo)-Number(precio_ant);
                            var mont=Number(precio_temp)+Number(precio_act);
                            $("#"+tr_pre+code).attr(data_prec,mont.toFixed(2));
                            mo_revision.val(mont.toFixed(2));
                         }else if(tipoTo=='2'){
                            var mo=mo_mecanica.val();
                            var precio_temp=Number(mo)-Number(precio_ant);
                            var mont=Number(precio_temp)+Number(precio_act);
                           $("#"+tr_pre+code).attr(data_prec,mont.toFixed(2));
                            mo_mecanica.val(mont.toFixed(2));
                         }else if(tipoTo=='3'){
                            var mo=terceros.val();
                             var precio_temp=Number(mo)-Number(precio_ant);
                            var mont=Number(precio_temp)+Number(precio_act);
                           $("#"+tr_pre+code).attr(data_prec,mont.toFixed(2));
                            terceros.val(mont.toFixed(2));
                         }else if(tipoTo=='4'){
                            var mo=otros_mo.val();
                            var precio_temp=Number(mo)-Number(precio_ant);
                            var mont=Number(precio_temp)+Number(precio_act);
                           $("#"+tr_pre+code).attr(data_prec,mont.toFixed(2));
                            otros_mo.val(mont.toFixed(2));
                         }else if(tipoTo=='5'){
                            var mo=repuestos.val();
                            var precio_temp=Number(mo)-Number(precio_ant);
                            var mont=Number(precio_temp)+Number(precio_act);
                           $("#"+tr_pre+code).attr(data_prec,mont.toFixed(2));
                            repuestos.val(mont.toFixed(2));
                         }else if(tipoTo=='6'){
                            var mo=accesorios.val();
                            var precio_temp=Number(mo)-Number(precio_ant);
                            var mont=Number(precio_temp)+Number(precio_act);
                           $("#"+tr_pre+code).attr(data_prec,mont.toFixed(2));
                            accesorios.val(mont.toFixed(2));
                         }else if(tipoTo=='7'){
                            var mo=lubricantes.val();
                            var precio_temp=Number(mo)-Number(precio_ant);
                            var mont=Number(precio_temp)+Number(precio_act);
                           $("#"+tr_pre+code).attr(data_prec,mont.toFixed(2));
                            lubricantes.val(mont.toFixed(2));
                         }else if(tipoTo=='8'){
                            var mo=otros_rep.val();
                            var precio_temp=Number(mo)-Number(precio_ant);
                            var mont=Number(precio_temp)+Number(precio_act);
                           $("#"+tr_pre+code).attr(data_prec,mont.toFixed(2));
                            otros_rep.val(new_trp.toFixed(2));
                         }
        }
        function  addRepuesto(idRepues,prodDescrip,precio,tipoTo,tipoText,cantidad,impuesto,modo_ser,iddet){
            var code=idRepues;
            var producto=prodDescrip;
            var precio=precio;
            var precio_cam=precio;
            var preci_t=Number(precio).toFixed(2);
           
            var impuesto_can=0;
            if(impuesto=='1'){
                impuesto_can=calcular_impueso(preci_t,cantidad);
            };
             var subt=Number(preci_t)*Number(cantidad)+Number(impuesto_can);
            if ($('#tr_rep_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este repuesto'
                });
                return false;
            }
             var tr = $('<tr id="tr_rep_' + code + '"></tr>');
             var td1 = $('<td>' + producto + '</td>');
             var tdcant = $('<td></td>');
             var tda = $('<td></td>');
             var tsImp= $('<td></td>');
             var tdSubT= $('<td></td>');
             var tdb = $('<td></td>');
             var td2 = $('<td class="text-center"></td>');
             var idRepuesto_input = $('<input type="hidden" class="idRepuesto_select form-control input-sm"  value="'+code+'" />');
             var idTipo_input = $('<input type="hidden" class="idTipoRepuesto_select form-control input-sm"  value="'+tipoTo+'" />');
             var idGrupDe_input= $('<input type="hidden" class="idDetalleRepuestoGrup form-control input-sm"  value="'+iddet+'" />');
             var idinput_modoser = $('<input type="hidden" class="modo_serRepuestoDet form-control input-sm"  value="'+modo_ser+'" />');
             var tipototal = $('<input class="total_repuesto form-control input-sm" data-idTipoRepuesto="'+tipoTo+'" data-idS="' + code + '" id="tr_pre' + code + '"  value="'+tipoText+'" readonly/>');
             var impuestoRe = $('<input type="number" class="totalImpuesto_repuesto form-control input-sm" data-impuestoRepuesto="'+impuesto+'"  id="tr_impu' + code + '"  value="'+impuesto_can+'" readonly/>');
             var subtotal_input = $('<input type="number" class="subtotal_repuesto form-control input-sm" data-Subtotal="'+subt+'"  id="tr_subtotal' + code + '"  value="'+subt.toFixed(2)+'" readonly/>');
             var cantidad = $('<input type="number" min="1" class="cantidad_m form-control input-sm"  data_idTipoCanti="'+tipoTo+'" data-cantidad="' +cantidad+ '" id="tr_cantidad_'+code+'" value="' +cantidad+ '"  />');
             var precio = $('<input type="number" min="1" class="precioRepuesto_m form-control input-sm"  data_idTipoPresRepuesto="'+tipoTo+'" id="tr_prec_Repuesto'+code+'" data-precioRepuesto="' +preci_t+ '" value="' +preci_t+ '"  />');
             var btn = $('<button class="btn btn-danger btn-xs deltotalRepues" data-idedetRepues="'+iddet+'" data_idTipoDelRepues="'+tipoTo+'"   data-idRepues="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
             tda.append(precio);
             tsImp.append(impuestoRe);
             tdcant.append(cantidad);
             tdSubT.append(subtotal_input);
             tdb.append(tipototal);
             td2.append(btn).append(idRepuesto_input).append(idTipo_input).append(idinput_modoser).append(idGrupDe_input);
             tr.append(td1).append(tdcant).append(tda).append(tsImp).append(tdSubT).append(tdb).append(td2);
             table_repuestos.append(tr);
             cCodConsecutivo_orden.data("prev",cCodConsecutivo_orden.val()); 
             var precio=precio_cam;
             var precio_antT=0;
             var precio_actT=Number(precio)+Number(impuesto_can);
             var tr_pre='tr_prec_Repuesto';
             var data_prec='data-precioRepuesto';
             calcular_precio_totales(precio_antT,precio_actT,tipoTo,code,tr_pre,data_prec);
             sumar_key(); 
             calcular_total_repuesto();
             articulos_repuestos.val("").trigger("change");
             tipo_totales_slec2.val("").trigger("change");
                $("#tr_prec_Repuesto"+code).keypress(function(e) {
                 var tecl = (e.keyCode ? e.keyCode : e.which);
                    if(tecl==13){
                    var tipoTo =$(this).attr('data_idTipoPresRepuesto');
                    var precio_ant =$(this).attr('data-precioRepuesto');
                    var impuEstado=$("#tr_impu"+code).attr('data-impuestoRepuesto');
                    var impuesto_can=0;
                    var cantidad=Number($("#tr_cantidad_"+code).val());
                    var precio_act=$(this).val()*cantidad;
                    if(impuEstado=='1'){
                        var preci=$(this).val();
                        impuesto_can=calcular_impueso(preci,cantidad);
                    }
                    precio_act=Number(precio_act)+Number(impuesto_can);
                    $("#tr_impu"+code).val(impuesto_can);
                    calcular_total_repuesto();
                    var tr_pre='tr_prec_Repuesto';
                    var data_prec='data-precioRepuesto';
                    calcular_precio_totales(precio_ant,precio_act,tipoTo,code,tr_pre,data_prec);
                    sumar_key(); 
                    }
                 });
                 $("#tr_cantidad_"+code).keypress(function(e) {
                 var tecl = (e.keyCode ? e.keyCode : e.which);
                    if(tecl==13){
                    var tipoTo =$("#tr_prec_Repuesto"+code).attr('data_idTipoPresRepuesto');
                    var precio_ant =$("#tr_prec_Repuesto"+code).attr('data-precioRepuesto');
                    var impuEstado=$("#tr_impu"+code).attr('data-impuestoRepuesto');
                    var impuesto_can=0;
                    var cantidad=Number($("#tr_cantidad_"+code).val());
                    var precio_act=$("#tr_prec_Repuesto"+code).val()*cantidad;
                    if(impuEstado=='1'){
                        var preci=$("#tr_prec_Repuesto"+code).val();
                        impuesto_can=calcular_impueso(preci,cantidad);
                    }
                    precio_act=Number(precio_act)+Number(impuesto_can);
                    $("#tr_impu"+code).val(impuesto_can);
                    calcular_total_repuesto();
                    var tr_pre='tr_prec_Repuesto';
                    var data_prec='data-precioRepuesto';
                    calcular_precio_totales(precio_ant,precio_act,tipoTo,code,tr_pre,data_prec);
                    sumar_key(); 
                    }
                 });
          
             $('.deltotalRepues').click(function (e) {
                var code = $(this).attr('data-idRepues');
                var idTipo = $(this).attr('data_idTipoDelRepues');
                var idedet=$(this).attr('data-idedetRepues');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este repuesto ?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    if(nConsecutivo.val()!='' && idedet){
                        var id=cCodConsecutivo.val()+'_'+nConsecutivo.val()+'_'+idedet;
                        RESTService.get('proformas/deleteDetalleRepuesto', id, function(response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            var data=response.data;
                            if(data[0].Mensaje!=''){
                                  AlertFactory.textType({
                                    title: '',
                                    message: data[0].Mensaje,
                                    type: 'info'
                                });
                            }else{
                                   AlertFactory.textType({
                                    title: '',
                                    message: 'El repuesto se eliminó correctamente',
                                    type: 'success'
                                });
                                $('#tr_rep_' + code).remove();
                            }
                     }else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo eliminar. Intente nuevamente.' : response.message;
                                AlertFactory.textType({
                                    title: '',
                                    message: msg_,
                                    type: 'error'
                                });
                         }
                        });
                    }else{
                    console.log(code);
                    var precio_borrar=$("#tr_subtotal"+code).val();
                    console.log(precio_borrar);
                    console.log(idTipo);
                    if(idTipo=='1'){
                        var mo_r=mo_revision.val();
                        var new_mor=Number(mo_r)-Number(precio_borrar);
                        mo_revision.val(new_mor.toFixed(2));
                     }else if(idTipo=='2'){
                        var mo_m=mo_mecanica.val();
                        var new_mo_m=Number(mo_m)-Number(precio_borrar);
                        
                        mo_mecanica.val(new_mo_m.toFixed(2));
                     }else if(idTipo=='3'){
                        var mo_tr=terceros.val();
                        var new_mo_tr=Number(mo_tr)-Number(precio_borrar);
                        terceros.val(new_mo_tr.toFixed(2));
                     }else if(idTipo=='4'){
                        var mo_otr=otros_mo.val();
                        var new_mo_otr=Number(mo_otr)-Number(precio_borrar);
                        otros_mo.val(new_mo_otr.toFixed(2));
                     }else if(idTipo=='5'){
                        var mo_rp=repuestos.val();
                        var new_mo_rp=Number(mo_rp)-Number(precio_borrar);
                        repuestos.val(new_mo_rp.toFixed(2));
                     }else if(idTipo=='6'){
                        var mo_ac=accesorios.val();
                        var new_mo_ac=Number(mo_ac)-Number(precio_borrar);
                        accesorios.val(new_mo_ac.toFixed(2));
                     }else if(idTipo=='7'){
                        var mo_lub=lubricantes.val();
                        var new_mo_lub=Number(mo_lub)-Number(precio_borrar);
                        lubricantes.val(new_mo_lub.toFixed(2));
                     }else if(idTipo=='8'){
                        var mo_trp=otros_rep.val();
                        var new_trp=Number(mo_trp)-Number(precio_borrar);
                        otros_rep.val(new_trp.toFixed(2));
                     }
                    sumar_key();
                    $('#tr_rep_' + code).remove();
                    calcular_total_repuesto() 
                }
                   
                });
                e.preventDefault();
            });
        }
        function addServicios(vto,tipoTo,tipoText,modo_ser,iddet){
            var arrayRe=vto.split("*");
            var code=arrayRe[0];
            var producto=arrayRe[1];
            var precio=arrayRe[2];
            var impuesto=arrayRe[3];
            var preci_t=Number(precio).toFixed(2);
            var impuesto_can=0;
            var cantidad=1;
            if(impuesto=='1'){
                impuesto_can=calcular_impueso(preci_t,cantidad);
            };
            var subt=Number(preci_t)*Number(cantidad)+Number(impuesto_can);
            if ($('#tr_b_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este servicio'
                });
                return false;
            }
             var tr = $('<tr id="tr_b_' + code + '"></tr>');
             var td1 = $('<td>' + producto + '</td>');
             var tda = $('<td></td>');
             var tdb = $('<td></td>');
             var tdim = $('<td></td>');
             var tdsub = $('<td></td>');
             var td2 = $('<td class="text-center"></td>');
             var idRevision_input = $('<input type="hidden" class="idRevision_select form-control input-sm"  value="'+code+'" />');
             var impuestoRe = $('<input type="number" class="totalImpuesto_servicio form-control input-sm" data-impuestoSer="'+impuesto+'"  id="tr_impSer' + code + '"  value="'+impuesto_can+'" readonly/>');
             var subtotal_input = $('<input type="number" class="subtotal_repuesto form-control input-sm" data-SubtotalSer="'+subt+'"  id="tr_subtotalSer' + code + '"  value="'+subt.toFixed(2)+'" readonly/>');
             var idTipo_input = $('<input type="hidden" class="idTipo_select form-control input-sm"  value="'+tipoTo+'" />');
             var idGrupDe_input= $('<input type="hidden" class="idDetalleGrup form-control input-sm"  value="'+iddet+'" />');
             var idinput_modoser = $('<input type="hidden" class="modo_serDet form-control input-sm"  value="'+modo_ser+'" />');
             var tipototal = $('<input class="total_revision form-control input-sm" data-idTipo="'+tipoTo+'" data-idS2="' + code + '"  value="'+tipoText+'" readonly/>');
             var precio = $('<input type="number" class="precio_m form-control input-sm"  data_idTipoPres="'+tipoTo+'" id="tr_prec_'+code+'" data-precio="' +preci_t+ '" value="' +preci_t+ '"  />');
             var btn = $('<button class="btn btn-danger btn-xs deltotal" data-idedet="'+iddet+'" data_idTipoDel="'+tipoTo+'" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
             tda.append(precio);
             tdb.append(tipototal);
             tdim.append(impuestoRe);
             tdsub.append(subtotal_input);
             td2.append(btn).append(idRevision_input).append(idTipo_input).append(idinput_modoser).append(idGrupDe_input);
             tr.append(td1).append(tda).append(tda).append(tdim).append(tdsub).append(tdb).append(td2);
             table_servicios.append(tr);
             cCodConsecutivo_orden.data("prev",cCodConsecutivo_orden.val()); 
             var precio=arrayRe[2];
             var precio_antT=0;
             var precio_actT=Number(precio)+Number(impuesto_can);
             var data_prec='data-precio';
             var tr_pre='tr_prec_';
             calcular_precio_totales(precio_antT,precio_actT,tipoTo,code,tr_pre,data_prec);
             sumar_key(); 
             calcular_total_MO();
            servicios_select.val("").trigger("change");
            tipo_totales_slec.val("").trigger("change");
            //  var totales_table=$("#tr_pre"+code);
            // totales_table.append('<option value="" selected>Seleccionar </option>');
            // _.each(totales, function(item) {
            // totales_table.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
            // });
             // $('.total_revision').change(function (e) {
             //    var code = $(this).val();

             // });
                $("#tr_prec_"+code).keypress(function(e) {
                 var tecl = (e.keyCode ? e.keyCode : e.which);
                    if(tecl==13){
                    var tipoTo =$(this).attr('data_idTipoPres');
                    var precio_ant =$(this).attr('data-precio');
                    var precio_act=$(this).val();
                    var impuEstado=$("#tr_impSer"+code).attr('data-impuestoSer');
                    var impuesto_can=0;
                    var cantidad=1;
                    if(impuEstado=='1'){
                        impuesto_can=calcular_impueso(precio_act,cantidad);
                    }
                    precio_act=Number(precio_act)+Number(impuesto_can);
                    $("#tr_impSer"+code).val(impuesto_can);
                    var data_prec='data-precio';
                    var tr_pre='tr_prec_';
                    calcular_precio_totales(precio_ant,precio_act,tipoTo,code,tr_pre,data_prec);
                    calcular_total_MO();
                    sumar_key();

                    }
                 });
          
             $('.deltotal').click(function (e) {
                var code = $(this).attr('data-id');
                var idTipo = $(this).attr('data_idTipoDel');
                var idedet=$(this).attr('data-idedet');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este servicio ?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    if(nConsecutivo.val()!='' && idedet){
                        var id=cCodConsecutivo.val()+'_'+nConsecutivo.val()+'_'+idedet;
                        RESTService.get('proformas/deleteDetalleServicio', id, function(response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            var data=response.data;
                            if(data[0].Mensaje!=''){
                                  AlertFactory.textType({
                                    title: '',
                                    message: data[0].Mensaje,
                                    type: 'info'
                                });
                            }else{
                                   AlertFactory.textType({
                                    title: '',
                                    message: 'El Servicio se eliminó correctamente',
                                    type: 'success'
                                });
                                $('#tr_b_' + code).remove();
                            }
                     }else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo eliminar. Intente nuevamente.' : response.message;
                                AlertFactory.textType({
                                    title: '',
                                    message: msg_,
                                    type: 'error'
                                });
                         }
                        });
                    }else{
                        var idcod='#tr_' + code;
                    var precio_borrar=$("#tr_subtotalSer"+code).val();
                if(idTipo=='1'){
                    var mo_r=mo_revision.val();
                    var new_mor=Number(mo_r)-Number(precio_borrar);
                    mo_revision.val(new_mor.toFixed(2));
                 }else if(idTipo=='2'){
                    var mo_m=mo_mecanica.val();
                    var new_mo_m=Number(mo_m)-Number(precio_borrar);
                    
                    mo_mecanica.val(new_mo_m.toFixed(2));
                 }else if(idTipo=='3'){
                    var mo_tr=terceros.val();
                    var new_mo_tr=Number(mo_tr)-Number(precio_borrar);
                    terceros.val(new_mo_tr.toFixed(2));
                 }else if(idTipo=='4'){
                    var mo_otr=otros_mo.val();
                    var new_mo_otr=Number(mo_otr)-Number(precio_borrar);
                    otros_mo.val(new_mo_otr.toFixed(2));
                 }else if(idTipo=='5'){
                    var mo_rp=repuestos.val();
                    var new_mo_rp=Number(mo_rp)-Number(precio_borrar);
                    repuestos.val(new_mo_rp.toFixed(2));
                 }else if(idTipo=='6'){
                    var mo_ac=accesorios.val();
                    var new_mo_ac=Number(mo_ac)-Number(precio_borrar);
                    accesorios.val(new_mo_ac.toFixed(2));
                 }else if(idTipo=='7'){
                    var mo_lub=lubricantes.val();
                    var new_mo_lub=Number(mo_lub)-Number(precio_borrar);
                    lubricantes.val(new_mo_lub.toFixed(2));
                 }else if(idTipo=='8'){
                    var mo_trp=otros_rep.val();
                    var new_trp=Number(mo_trp)-Number(precio_borrar);
                    otros_rep.val(new_trp.toFixed(2));
                 }
                    sumar_key(); 
                    $('#tr_b_' + code).remove();
                    calcular_total_MO();
                }


                   
                });
                e.preventDefault();
            });

        }
         function llenarServicios(){
         var bval = true;
         bval = bval && cCodConsecutivo.required();  
        if(bval){
            var mone_ser=idMoneda.val();
          var clientipo_ser=id_cliente_tipo_or.val();
          servicios_select.html(''); 
          servicios_select.append('<option value="" selected>Seleccionar </option>');
            _.each(servicios, function(item) {
                if(mone_ser==item.idMoneda && clientipo_ser==item.tipo_cliente){
                    servicios_select.append('<option value="'+item.idProducto+'*'+item.producto+'*'+item.precio+'*'+item.impuesto+'">'+item.codigo_articulo+' '+item.producto+'</option>');
                }
            });  
            var id=cCodConsecutivo.val();
             RESTService.get('proformas/get_repuestos_consecutivo', id, function(response) {
             if (!_.isUndefined(response.status) && response.status) {
                     articulos_repuestos.html(''); 
                     articulos_repuestos.append('<option value="">Seleccionar</option>');
                     _.each(response.data, function(item) {
                    if(mone_ser==item.IdMoneda && clientipo_ser==item.id_tpocli){
                        articulos_repuestos.append('<option value="'+item.idProducto+'*'+item.nPrecio+'*'+item.description+'*'+item.impuesto+'">'+item.code_article+' '+item.description+' / '+Number(item.stock)+'</option>');
                     }
                    });
                }
            });
        }
          
        }  
         
        function cleanProforma(){
           
            cCodConsecutivo.val("").trigger('change');
            nConsecutivo.val("");
            table_servicios.html("");
            idMoneda.val("").trigger("change");
            idAsesor.val("").trigger("change");
            articulos_repuestos.val("").trigger("change");
            tipo_totales_slec2.val("").trigger("change");
            servicios_select.val("").trigger("change");
            tipo_totales_slec.val("").trigger("change");
            dFecEntrega.val("");
            nEstimadoHoras.val("");
            table_repuestos.html("");
            cCodConsecutivo_orden.val("").trigger('change');
            servicios_select.html(''); 
            servicios_select.append('<option value="" selected>Seleccionar </option>');
            articulos_repuestos.html(''); 
            articulos_repuestos.append('<option value="" selected>Seleccionar </option>');
            btn_aprobarProforma.prop('disabled',true); 
            btn_guardarProforma.prop('disabled',false); 
            cCodConsecutivo.prop('disabled',false); 
             estado.val("");
            cleandatos();
            clean_totale();
             calcular_total_repuesto();
              calcular_total_MO();
              sumar_key();
          
        }
        cCodConsecutivo.change(function () {
            var bval = true;
            bval = bval && cCodConsecutivo_orden.required();  
            if(bval){
                llenarServicios();
            }
        });

        cCodConsecutivo_orden.change(function () {
            console.log("hola");
            if(table_servicios.html()!="" || table_repuestos.html()!=""){
                 modalDeleteDetalle.modal("show");
            }
            
            if(cCodConsecutivo_orden.val()==""){
                cleandatos();
            }else{
                var total=cCodConsecutivo_orden.val();
                var total=total.split('*');
                id_cliente_tipo_or.val(total[8]);
                idMoneda.val(total[2]);
                idcCondicionPago.val(total[3]);
                var ase=total[4];
                if(total[4]==0){
                 ase='';
                }
                idAsesor.val(ase).trigger('change');
                idcliente.val(total[6]);
                documento_or.val(total[7]);
                razonsocial_cliente_or.val(total[9]);
                placa.val(total[10]);
                nKilometraje.val(total[11]);
                motor.val(total[12]);
                color.val(total[13]);
                cCodConsecutivoOS.val(total[0]);
                nConsecutivoOS.val(total[1]);
            }
            llenarServicios();
             
        });

        cCodConsecutivo_orden.select2();
        articulos_repuestos.select2();
        idAsesor.select2();
        servicios_select.select2();
        $.fn.modal.Constructor.prototype.enforceFocus = function () {};
        
        var search = getFormSearch('frm-search-Proforma', 'search_b', 'LoadRecordsButtonProforma');

        var table_container_Proforma = $("#table_container_Proforma");

         articulos_repuestos.change(function () {
                var vto =articulos_repuestos.val();
                if(vto!=''){
                    var modo_t=0;
                    // addMante(vto,modo_t);
                }
              
           
        });

        function newProforma() {
            // var hoy = new Date();
            // var actu=hoy.getFullYear()+"-"+ (hoy.getMonth()+1)+ "-" +hoy.getDate() ;
            // var hora = hoy.getHours() + ':' + hoy.getMinutes();
            modalProforma.modal('show');
            titlemodalProforma.html('Nueva Proforma');
        }
         function getDataFormCustomer () {
            RESTService.all('customers/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var tip=response.tipoc_doc;
                     var tipo_clie=response.tipo_clie;
                    id_cliente_tipo_or.append('<option value="">Seleccionar</option>');
                        tipo_clie.map(function(index) {
                        id_cliente_tipo_or.append('<option value="'+index.id+'">'+index.descripcion+'</option>');
                    });
                }
            }, function() {
                getDataFormCustomer();
            });
        }
        getDataFormCustomer();

        function getDataForOrdenServicio () {
            RESTService.all('orden_servicios/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                   
                     cCodConsecutivo.append('<option value="">Seleccionar</option>');
                     _.each(response.codigo_proforma, function(item) {
                        cCodConsecutivo.append('<option value="'+item.cCodConsecutivo+'">'+item.cCodConsecutivo+'</option>');
                    });
                    //   cCodConsecutivo.append('<option value="'+item.cCodConsecutivo+'*'+item.nConsecutivo+'">'+item.cCodConsecutivo+'</option>');
                       idcCondicionPago.append('<option value="">Seleccionar</option>');
                     _.each(response.condicion_pago, function(item) {
                        idcCondicionPago.append('<option value="'+item.id+'">'+item.description+'</option>');
                    });
                    //    _.each(response.tipo_servicio, function(item) {
                    //     id_tipo.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
                    // });
                    //      idDocumentoCli.append('<option value="">Seleccionar</option>');
                    //      _.each(response.tipo_document, function(item) {
                    //     idDocumentoCli.append('<option value="'+item.Codigo+'">'+item.TipoDocumento+'</option>');
                    // });
                    //     gru_revisiones.append('<option value="" selected>Seleccionar </option>');
                    //   _.each(response.revisiones, function(item) {
                    //     gru_revisiones.append('<option value="'+item.id+'*'+item.nombre+'*'+item.mo_revision+'*'+item.mo_mecanica+'*'+item.terceros+'*'+item.otros_mo+'*'+item.repuestos+'*'+item.accesorios+'*'+item.lubricantes+'*'+item.otros_rep+'">'+item.nombre+'</option>');
                    // });
                    //   idTecnico.append('<option value="">Seleccionar</option>');
                    //   _.each(response.tecnico, function(item) {
                    //     idTecnico.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
                    // });
                       idAsesor.append('<option value="">Seleccionar</option>');
                     _.each(response.asesor, function(item) {
                        idAsesor.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
                    });
                    //    id_tipomant.append('<option value="">Seleccionar</option>');
                    //    _.each(response.tipoMantenimiento, function(item) {
                    //     id_tipomant.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
                    // });
                 
                       servicios=response.servicios;
                        idMoneda.append('<option value="">Seleccionar</option>');
                       _.each(response.moneda, function(item) {
                        idMoneda.append('<option value="'+item.IdMoneda+'">'+item.Descripcion+'</option>');
                    });
                    var totales=response.totales;
                    tipo_totales_slec.append('<option value="">Tipo</option>');
                       _.each(response.totales, function(item) {
                        tipo_totales_slec.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
                    });
                        tipo_totales_slec2.append('<option value="">Tipo</option>');
                       _.each(response.totales, function(item) {
                        tipo_totales_slec2.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
                    });
                
                } 
            }, function() {
                getDataForOrdenServicio();
            });
        }
        getDataForOrdenServicio();

        function getDataForProforma () {
            RESTService.all('proformas/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                     cCodConsecutivo_orden.append('<option value="">Seleccionar</option>');
                     _.each(response.codigo_proforma, function(item) {
                        cCodConsecutivo_orden.append('<option value="'+item.cCodConsecutivo+'*'+item.nConsecutivo+'*'+item.IdMoneda+'*'+item.idcCondicionPago+'*'+item.idAsesor+'*'+item.asesor+'*'+item.idCliente+'*'+item.documento+'*'+item.idTipoCliente+'*'+item.razonsocial_cliente+'*'+item.cPlacaVeh+'*'+item.nKilometraje+'*'+item.cMotor+'*'+item.cColor+'">'+item.cCodConsecutivo+' '+item.nConsecutivo+' '+item.razonsocial_cliente+' '+item.cPlacaVeh+'</option>');
                    });
                     igv=response.igv[0].value;
                     // repuestos_array=response.articulos_repuestos;
                    //   articulos_repuestos.append('<option value="">Seleccionar</option>');
                    //  _.each(response.articulos_repuestos, function(item) {
                    //     articulos_repuestos.append('<option value="'+item.id+'*'+item.nPrecio+'">'+item.code_article+' '+item.description+'</option>');
                    // });
                } 
            }, function() {
                getDataForProforma();
            });
        }
        getDataForProforma();

        table_container_Proforma.jtable({
            title: "Lista de Proformas",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/proformas/list',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('proformas/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Proforma',
                    click: function () {
                        newProforma();
                    }
                }]
            },
            fields: {
                cCodConsecutivo: {
                    key: true,
                    create: false,
                    edit: false,
                    list: true,
                    title: 'Código Proforma',
                },
                nConsecutivo: {
                    title: 'Nro',
                     

                },
                cCodConsecutivoOS: {
                    title: 'Código Orden',
                   
                },
                nConsecutivoOS: {
                    title: 'Nro ',
                   
                },
                dFechaRegistro: {
                    title: 'Fecha Registro',
                     display: function (data) {
                            return moment(data.record.dFechaRegistro).format('DD/MM/YYYY');
                    }
                   
                },
                iEstado: {
                    title: 'Fecha Registro',
                     options: {0: 'Registrado', 1: 'Aprobada',2:'Entregada',3:'Entrega parcial',4:'Con devolucion'},
                   
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-proforma" data-id="'+data.record.cCodConsecutivo
                            +'_'+data.record.nConsecutivo+'" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                },Eliminar: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a data-target="#"  data-ide="'+data.record.cCodConsecutivo+'_'+data.record.nConsecutivo+'"   title="Eliminar" class="jtable-command-button eliminar-Proforma"><i class="fa fa-trash fa-1-5x fa-red"><span>Eliminar</span></i></a>';
                    }
                    
                }

            },
           
            recordsLoaded: function(event, data) {
                $('.edit-proforma').click(function(e){
                    var id = $(this).attr('data-id');
                    findRegister_Proforma(id);
                    e.preventDefault();
                });
                  $('.eliminar-Proforma').click(function(e){
                    var ide = $(this).attr('data-ide');
                    idProformaDelete.val(ide);
                    modalDeleteProforma.modal("show");
                    e.preventDefault();
                });
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

        generateSearchForm('frm-search-Proforma', 'LoadRecordsButtonProforma', function(){
            table_container_Proforma.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('proformas', {
                url: '/proformas',
                templateUrl: base_url + '/templates/proformas/base.html',
                controller: 'ProformaCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();