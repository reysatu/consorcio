/**
 * Created by JAIR on 4/5/2017.
 */
   
(function () {
    'use strict';
    angular.module('sys.app.orden_servicios')
        .config(Config)
        .controller('Orden_ServicioCtrl', Orden_ServicioCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Orden_ServicioCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function Orden_ServicioCtrl($scope, _, RESTService, AlertFactory)
    {   
        var totalMO=$("#totalMO");
        var totales;
        var igv;
        var servicios;
        var valor_moneda;
        var btn_save_cliente=$("#btn_save_cliente");
        var modalDeleteDetalle=$("#modalDeleteDetalle");
        var id_tipomant=$("#id_tipomant");
        var tipo_totales_slec=$("#tipo_totales_slec");
        var id_cliente_tipo_or=$("#id_cliente_tipo_or");
        var table_servicios=$("#table_servicios");
        var servicios_select=$("#servicios_select");
        var idMoneda=$("#IdMoneda");
        var btn_cancelar_servicio=$("#btn_cancelar_servicio");
        var tipo_vehi=$("#tipo_vehi");
        var idTipoVehi_add=$("#idTipoVehi_add");
        var tipoCliente_or=$("#tipoCliente_or");
        var id_tipocli=$("#id_tipocli");
        var idOrdenDelete=$("#idOrdenDelete");
        var modalDeleteOrden=$("#modalDeleteOrden");
        var modaClientes = $('#modaClientes');
        var titleModalClientes = $('#titleModalClientes');
        var btn_guardarOrden=$("#btn_guardarOrden");
        var modaVehiculosTerceros=$("#modaVehiculosTerceros");
        var titleModalVehiculosTerceros=$("#titleModalVehiculosTerceros");
        var estado=$("#estado");
        var motor=$("#motor");
        var idOrden=$("#idOrden");
        var motor_add=$("#motor_add");
        var departamento = $('#departamento');
        var provincia = $('#provincia');
        var distrito = $('#distrito');
        var observaciones=$("#observaciones");
        var cCodConsecutivo=$("#cCodConsecutivo");
        var idcCondicionPago=$("#idcCondicionPago");
        var id_tipo=$("#id_tipo");
        var idDocumentoCli=$("#idDocumentoCli");
        var gru_revisiones=$("#gru_revisiones");
        var idTecnico=$("#idTecnico");
        var idAsesor=$("#idAsesor");
        var horaEnt=$("#horaEnt");
        var nKilometraje=$("#nKilometraje");
        var dFecRec=$('#dFecRec');
        var horaRec=$("#horaRec");
        var dFecEntrega=$("#dFecEntrega");
        var articulo_dd_det=$("#articulo_dd_det");
        var modalOrdenServivio=$("#modalOrdenServivio");
        var titlemodalOrdenServivio=$("#titlemodalOrdenServivio");
        var tabla_grupo_revision=$("#articulo_dd_det");
        var tipodoc=$("#tipodoc");
        var razonsocial_cliente=$("#razonsocial_cliente");
        var btn_cerrar=$("#btn_cerrar");
        var documento=$("#documento");
        var contacto=$("#contacto");
        var direccion=$("#direccion");
        var correo_electronico=$("#correo_electronico");
        var celular=$("#celular");
        var telefono=$("#telefono");
        var cliente_id=$("#cliente_id");
        var distrito = $('#distrito');
        var distrito_ver = $('#distrito_ver');
        var nConsecutivo=$('#nConsecutivo');
        var mo_revision=$("#mo_revision");
        var mo_mecanica=$("#mo_mecanica");
        var terceros=$("#terceros");
        var otros_mo=$("#otros_mo");
        var subtotal_moa=$("#subtotal_moa");

       var repuestos=$("#repuestos");
        var accesorios=$("#accesorios");
        var lubricantes=$("#lubricantes");
        var otros_rep=$("#otros_rep");
        var subtotal_mob=$("#subtotal_mob");
        var total=$("#total");

        var idDocumentoCli=$("#idDocumentoCli");
        var documento_or=$("#documento_or");
        var razonsocial_cliente_or=$("#razonsocial_cliente_or");
        var contacto_or=$("#contacto_or");
        var direccion_or=$("#direccion_or");
        var correo_electronico_or=$("#correo_electronico_or");
        var celular_or=$("#celular_or");
        var telefono_or=$("#telefono_or");
        var cliente_id_or=$("#cliente_id_or");
        var distrito_or = $('#distrito_or');
        
        var idVehiculo_add=$('#idVehiculo_add');
        var idMarca_add=$('#idMarca_add');
        var idModelo_add=$('#idModelo_add');
        var n_chasis_add=$('#n_chasis_add');
        var anio_fabricacion_add=$('#anio_fabricacion_add');
        var color_add=$('#color_add');
        var placa_add=$('#placa_add');

        var placa=$("#placa");
        var marca=$("#marca");
        var modelo=$("#modelo");
        var chasis=$("#chasis");
        var anio_fabricacion=$("#anio_fabricacion");
        var color=$("#color");
        function findRegister_Orden(id)
        {
            
            RESTService.get('orden_servicios/find', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                  
                    var data=response.data;
                    titlemodalOrdenServivio.html('Editar Orden '+'['+data[0].nConsecutivo+ ']');
                    cCodConsecutivo.prop('disabled',true);
                    cCodConsecutivo.val(data[0].cCodConsecutivo).trigger("change");
                     // cCodConsecutivo.val(data[0].cCodConsecutivo+'*'+data[0].nConsecutivo).trigger("change");
                    nConsecutivo.prop('disabled',true);
                    nConsecutivo.val(data[0].nConsecutivo);
                    idMoneda.val(data[0].IdMoneda).trigger("change");
                    idcCondicionPago.val(data[0].idcCondicionPago).trigger("change");
                    cliente_id_or.val(data[0].idCliente);
                    dFecRec.val(data.dFecRec2);
                    horaEnt.val(data[0].horaEnt);
                    horaRec.val(data[0].horaRec);
                    dFecEntrega.val(data.dFecEntrega2);
                    idTecnico.val(data[0].idTecnico).trigger('change');
                    idAsesor.val(data[0].idAsesor).trigger("change");
                    id_tipo.val(data[0].id_tipo).trigger("change");
                    id_tipomant.val(data[0].id_tipomant).trigger("change");
                    idTipoVehi_add.val(data[0].id_tipoveh).trigger("change");
                    tipodoc.val(data[0].tipodoc).trigger("change");
                    estado.val(data[0].iEstado).trigger("change");
                    var data_cliente=response.data_cliente;
                   
                    cliente_id_or.val(data_cliente[0].id);
                    documento_or.val(data_cliente[0].documento);
                    getCliente();
                    observaciones.val(data[0].cObservaciones);
                    nKilometraje.val(data[0].nKilometraje);
                    placa.val(data[0].cPlacaVeh);
                    getPlaca();
                    var data_matenimiento=response.data_matenimiento;
                    _.each(data_matenimiento, function (b) {
                        var vto=b.idMantenimiento+'*'+b.nombre;
                        var modo_m=1;
                         addMante(vto,modo_m);
                    });

                    var data_detalle=response.data_detalle;
                      _.each(data_detalle, function (b) {
                        var vto=b.idProducto+'*'+b.description+'*'+b.nTotal+'*'+b.impuesto;
                         var tipoTo=b.id_tipototal;
                         var tipoText=b.descripcion;
                         var modo_servi=1;
                         var idte=b.idDetalleSer;
                         addServicios(vto,tipoTo,tipoText,modo_servi,idte);
                    });

                  
                    // gru_revisiones
                    // idTecnico
                    // idAsesor
                    // horaEnt
                    // nKilometraje
                    id_tipocli.data("prev",id_cliente_tipo_or.val());
                    idMoneda.data("prev",idMoneda.val());
                    modalOrdenServivio.modal("show");
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        function newOrdenServicio() {
            var hoy = new Date();
            var actu=hoy.getFullYear()+"-"+ (hoy.getMonth()+1)+ "-" +hoy.getDate() ;
            var hora = hoy.getHours() + ':' + hoy.getMinutes();
            dFecRec.val(actu);
            horaRec.val(hora);
            modalOrdenServivio.modal('show');
            titlemodalOrdenServivio.html('Nuevo Orden de Servicio');
        }
         idTecnico.select2();
         servicios_select.select2();
         $.fn.modal.Constructor.prototype.enforceFocus = function () {};
         idAsesor.select2();
         documento_or.keypress(function(e) {
         var code = (e.keyCode ? e.keyCode : e.which);
            if(code==13){
                getCliente();
            }
         });
        placa.keypress(function(e) {
         var code = (e.keyCode ? e.keyCode : e.which);
            if(code==13){
                getPlaca();
            }
         });
         
        function getDepartamento(bandera){
            var id="0";
            RESTService.get('shops/TraerDepartamentos', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     departamento.html('');
                      departamento.append('<option value="" selected >Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.cDepartamento==bandera){
                             departamento.append('<option value="'+item.cDepartamento+'"  >'+item.cDepartamento+'</option>');
                        }else{
                             departamento.append('<option value="'+item.cDepartamento+'" >'+item.cDepartamento+'</option>');
                        };
            
                    });

                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
        }
          function getProvincia(bandera,id){
                RESTService.get('shops/TraerProvincias', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                   
                      provincia.html('');
                      provincia.append('<option value="" >Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.cProvincia==bandera){
                             provincia.append('<option value="'+item.cProvincia+'" selected>'+item.cProvincia+'</option>');
                         }else{
                             provincia.append('<option value="'+item.cProvincia+'">'+item.cProvincia+'</option>');
                         }
                       
                    });

                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
       }
        function getDistrito(bandera,id){
        RESTService.get('shops/TraerDistritos', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                 
                       distrito.html('');
                      distrito.append('<option value="" >Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.cCodUbigeo==bandera){
                             distrito.append('<option value="'+item.cCodUbigeo+'" selected>'+item.cDistrito+'</option>');
                         }else{
                             distrito.append('<option value="'+item.cCodUbigeo+'">'+item.cDistrito+'</option>');
                         }
                       
                    });

                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
       }
         function getCliente(){
            var bval = true;
            bval = bval && documento_or.required();
            if(bval){
            var id=documento_or.val();
            RESTService.get('orden_servicios/get_cliente', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                    var datos=response.data;
                     if(datos.length == 0){
                        titleModalClientes.html('Nuevo Cliente');
                        modaClientes.modal('show');
                        var bandera='xxxxx';
                        getDepartamento(bandera);
                        distrito_ver.val("");
                        distrito_or.val("");
                        idDocumentoCli.val("");
                        razonsocial_cliente_or.val("");
                        documento_or.val("");
                        contacto_or.val("");
                        direccion_or.val("");
                        correo_electronico_or.val("");
                        celular_or.val("");
                        telefono_or.val("");
                        cliente_id_or.val("");
                        tipoCliente_or.val("");
                        id_tipocli.data("prev",id_cliente_tipo_or.val());
                        id_tipocli.val(id_cliente_tipo_or.val());
                        // id_cliente_tipo_or.val("")
                        llenarServicios();
                     }else{
                        distrito_ver.val(datos[0].cDistrito);
                        distrito_or.val(datos[0].ubigeo);
                        idDocumentoCli.val(datos[0].tipodoc).trigger('change');
                        razonsocial_cliente_or.val(datos[0].razonsocial_cliente);
                        documento_or.val(datos[0].documento);
                        contacto_or.val(datos[0].contacto);
                        direccion_or.val(datos[0].direccion);
                        correo_electronico_or.val(datos[0].correo_electronico);
                        celular_or.val(datos[0].celular);
                        telefono_or.val(datos[0].telefono);
                        cliente_id_or.val(datos[0].id);
                        tipoCliente_or.val(datos[0].tipo_cliente_descr).trigger('change');
                        id_cliente_tipo_or.val(datos[0].id_tipocli)
                         id_tipocli.data("prev",id_cliente_tipo_or.val());
                        llenarServicios();
                 
                     }
                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'info'
                    });
                }

               });
            }
        }
        function getPlaca(){
            var bval = true;
            bval = bval && placa.required();
            if(bval){
            var id=placa.val();
            RESTService.get('orden_servicios/get_Placa', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                    var datos=response.data;
                 
                    idMarca_add.html("");
                    idMarca_add.append('<option value="" selected>Seleccionar</option>');
                     _.each(response.marca, function(item) {
                          idMarca_add.append('<option value="'+item.id+'" >'+item.description+'</option>');
                     });
                     if(datos.length == 0){
                        titleModalVehiculosTerceros.html('Nuevo Vehiculo');
                        modaVehiculosTerceros.modal('show');
                        placa.val("");
                        marca.val("");
                        modelo.val("");
                        chasis.val("");
                        anio_fabricacion.val("");
                        color.val("");
                        motor.val("");
                        tipo_vehi.val("");
                     }else{
                        placa.val(datos[0].placa);
                        marca.val(datos[0].description);
                        modelo.val(datos[0].descripcion);
                        chasis.val(datos[0].n_chasis);
                        anio_fabricacion.val(datos[0].anio_fabricacion);
                        color.val(datos[0].color);
                        motor.val(datos[0].motor);
                        tipo_vehi.val(datos[0].tipo_vehiculo);
                     }
                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
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
         departamento.change(function () {
            var bandera='xxxxxx';
            var id=departamento.val();
            getProvincia(bandera,id);
        });
          idMoneda.change(function () {
              if(table_servicios.html()!=""){
                 modalDeleteDetalle.modal("show");
              }
              llenarServicios();
        });
        id_cliente_tipo_or.change(function () {
             
              llenarServicios();
        });
           id_tipocli.change(function () {
          
            if(id_cliente_tipo_or.val()!=""){
              
                 if(id_tipocli.val()!=id_cliente_tipo_or.val() && id_tipocli.val()!=""){
                    if(table_servicios.html()!=""){
                        

                        modalDeleteDetalle.modal('show');
                    }
                 }
            }
           
        });
        btn_cancelar_servicio.click(function () {
            idMoneda.val(idMoneda.data("prev")).trigger("change");
            id_tipocli.val(id_tipocli.data("prev")).trigger("change");
            
          });
        
        btn_cerrar.click(function () {
            idMoneda.val(idMoneda.data("prev")).trigger("change");
            id_tipocli.val(id_tipocli.data("prev")).trigger("change");
          });
        // idMoneda.click(function () {
        //     valor_moneda=$(this).val();
        //     console.log(valor_moneda);
        // });
        function llenarServicios(){

           var mone_ser=idMoneda.val();
          var clientipo_ser=id_cliente_tipo_or.val();
          servicios_select.html(''); 
          servicios_select.append('<option value="" selected>Seleccionar </option>');
            _.each(servicios, function(item) {
                if(mone_ser==item.idMoneda && clientipo_ser==item.tipo_cliente){
                    servicios_select.append('<option value="'+item.idProducto+'*'+item.producto+'*'+item.precio+'*'+item.impuesto+'">'+item.codigo_articulo+' '+item.producto+'</option>');
                }
            }); 
        }  
        idMarca_add.change(function () {
             var id=idMarca_add.val();
             RESTService.get('orden_servicios/get_Modelo', id, function(response) {
                  if (!_.isUndefined(response.status) && response.status) {
                        idModelo_add.html('');
                        _.each(response.modelo, function(item) {
                          idModelo_add.append('<option value="'+item.idModelo+'" selected>'+item.descripcion+'</option>');
                        });
                  }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'No se pudo obtner los modelos . Intente nuevamente.',
                        type: 'info'
                    });
                }

             });
        });
        
        provincia.change(function () {
                var bandera='xxxxxx';
                var id=provincia.val();
                getDistrito(bandera,id);
           
        });
         gru_revisiones.change(function () {
                var vto =gru_revisiones.val();
                if(vto!=''){
                    var modo_t=0;
                    addMante(vto,modo_t);
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
        // function addServicios(vto,tipoTo,tipoText,modo_ser,iddet){
        //     var arrayRe=vto.split("*");
        //     var code=arrayRe[0];
        //     var producto=arrayRe[1];
        //     var precio=arrayRe[2];
        //     var impuesto=arrayRe[3];
        //     var preci_t=Number(precio).toFixed(2);

        //     if ($('#tr_b_' + code).length > 0) {
        //         AlertFactory.showWarning({
        //             title: '',
        //             message: 'Ya se asignó este servicio'
        //         });
        //         return false;
        //     }
        //      var tr = $('<tr id="tr_b_' + code + '"></tr>');
        //      var td1 = $('<td>' + producto + '</td>');
        //      var tda = $('<td></td>');
        //      var tdb = $('<td></td>');
        //      var td2 = $('<td class="text-center"></td>');
        //      var idRevision_input = $('<input type="hidden" class="idRevision_select form-control input-sm"  value="'+code+'" />');
        //      var idTipo_input = $('<input type="hidden" class="idTipo_select form-control input-sm"  value="'+tipoTo+'" />');
        //     var idGrupDe_input= $('<input type="hidden" class="idDetalleGrup form-control input-sm"  value="'+iddet+'" />');
        //      var idinput_modoser = $('<input type="hidden" class="modo_serDet form-control input-sm"  value="'+modo_ser+'" />');
        //      var tipototal = $('<input class="total_revision form-control input-sm" data-idTipo="'+tipoTo+'" data-idS="' + code + '" id="tr_pre' + code + '"  value="'+tipoText+'" readonly/>');
        //      var precio = $('<input type="number" min="1" class="precio_m form-control input-sm"  data_idTipoPres="'+tipoTo+'" id="tr_prec_'+code+'" data-precio="' +preci_t+ '" value="' +preci_t+ '"  />');
        //      var btn = $('<button class="btn btn-danger btn-xs deltotal" data-idedet="'+iddet+'" data_idTipoDel="'+tipoTo+'" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
        //      tda.append(precio);
        //      tdb.append(tipototal);
        //      td2.append(btn).append(idRevision_input).append(idTipo_input).append(idinput_modoser).append(idGrupDe_input);
        //      tr.append(td1).append(tda).append(tdb).append(td2);
        //      table_servicios.append(tr);
        //     idMoneda.data("prev",idMoneda.val()); 
        //     id_tipocli.data("prev",id_cliente_tipo_or.val());   
        //     var precio=arrayRe[2];
        //      if(tipoTo=='1'){
        //         var mo_r=mo_revision.val();
              
             
        //         var new_mor=Number(mo_r)+Number(precio);
        //         mo_revision.val(new_mor.toFixed(2));
        //      }else if(tipoTo=='2'){
        //         var mo_m=mo_mecanica.val();
        //         var new_mo_m=Number(mo_m)+Number(precio);
        //         mo_mecanica.val(new_mo_m.toFixed(2));
        //      }else if(tipoTo=='3'){
        //         var mo_tr=terceros.val();
        //         var new_mo_tr=Number(mo_tr)+Number(precio);
        //         terceros.val(new_mo_tr.toFixed(2));
        //      }else if(tipoTo=='4'){
        //         var mo_otr=otros_mo.val();
        //         var new_mo_otr=Number(mo_otr)+Number(precio);
        //         otros_mo.val(new_mo_otr.toFixed(2));
        //      }else if(tipoTo=='5'){
        //         var mo_rp=repuestos.val();
        //         var new_mo_rp=Number(mo_rp)+Number(precio);
        //         repuestos.val(new_mo_rp.toFixed(2));
        //      }else if(tipoTo=='6'){
        //         var mo_ac=accesorios.val();
        //         var new_mo_ac=Number(mo_ac)+Number(precio);
        //         accesorios.val(new_mo_ac.toFixed(2));
        //      }else if(tipoTo=='7'){
        //         var mo_lub=lubricantes.val();
        //         var new_mo_lub=Number(mo_lub)+Number(precio);
        //         lubricantes.val(new_mo_lub.toFixed(2));
        //      }else if(tipoTo=='8'){
        //         var mo_trp=otros_rep.val();
        //         var new_trp=Number(mo_trp)+Number(precio);
        //         otros_rep.val(new_trp.toFixed(2));
        //      }
        //     sumar_key(); 
        //     servicios_select.val("").trigger("change");
        //     tipo_totales_slec.val("").trigger("change");
        //     //  var totales_table=$("#tr_pre"+code);
        //     // totales_table.append('<option value="" selected>Seleccionar </option>');
        //     // _.each(totales, function(item) {
        //     // totales_table.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
        //     // });
        //      // $('.total_revision').change(function (e) {
        //      //    var code = $(this).val();

        //      // });
        //         $("#tr_prec_"+code).keypress(function(e) {
        //          var code = (e.keyCode ? e.keyCode : e.which);
        //             if(code==13){
        //             var tipoTo =$(this).attr('data_idTipoPres');
                    

        //             var precio_ant =$(this).attr('data-precio');
        //             var precio_act=$(this).val();
                   
        //                if(tipoTo=='1'){
        //                     var mo=mo_revision.val();
        //                     var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(2));
        //                     mo_revision.val(mont.toFixed(2));
        //                  }else if(tipoTo=='2'){
        //                     var mo=mo_mecanica.val();
        //                     var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(2));
        //                     mo_mecanica.val(mont.toFixed(2));
        //                  }else if(tipoTo=='3'){
        //                     var mo=terceros.val();
        //                      var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(2));
        //                     terceros.val(mont.toFixed(2));
        //                  }else if(tipoTo=='4'){
        //                     var mo=otros_mo.val();
        //                     var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(2));
        //                     otros_mo.val(mont.toFixed(2));
        //                  }else if(tipoTo=='5'){
        //                     var mo=repuestos.val();
        //                     var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(2));
        //                     repuestos.val(mont.toFixed(2));
        //                  }else if(tipoTo=='6'){
        //                     var mo=accesorios.val();
        //                     var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(2));
        //                     accesorios.val(mont.toFixed(2));
        //                  }else if(tipoTo=='7'){
        //                     var mo=lubricantes.val();
        //                     var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(2));
        //                     lubricantes.val(mont.toFixed(2));
        //                  }else if(tipoTo=='8'){
        //                     var mo=otros_rep.val();
        //                     var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(2));
        //                     otros_rep.val(new_trp.toFixed(2));
        //                  }
        //                 sumar_key(); 
        //             }
        //          });
          
        //      $('.deltotal').click(function (e) {
        //         var code = $(this).attr('data-id');
        //         var idTipo = $(this).attr('data_idTipoDel');
        //         var idedet=$(this).attr('data-idedet');
        //         AlertFactory.confirm({
        //             title: '',
        //             message: '¿Está seguro que desea quitar este servicio ?',
        //             confirm: 'Si',
        //             cancel: 'No'
        //         }, function () {
        //             if(nConsecutivo.val()!='' && idedet){

        //                 var id=cCodConsecutivo.val()+'_'+nConsecutivo.val()+'_'+idedet;
                      
        //                 RESTService.get('orden_servicios/deleteDetalle', id, function(response) {
        //                 if (!_.isUndefined(response.status) && response.status) {
        //                     var data=response.data;
        //                     if(data[0].Mensaje!=''){
        //                           AlertFactory.textType({
        //                             title: '',
        //                             message: data[0].Mensaje,
        //                             type: 'info'
        //                         });
        //                     }else{
        //                            AlertFactory.textType({
        //                             title: '',
        //                             message: 'El servicio se eliminó correctamente',
        //                             type: 'success'
        //                         });
        //                         $('#tr_b_' + code).remove();
        //                     }
        //              }else {
        //                 var msg_ = (_.isUndefined(response.message)) ?
        //                     'No se pudo eliminar. Intente nuevamente.' : response.message;
        //                         AlertFactory.textType({
        //                             title: '',
        //                             message: msg_,
        //                             type: 'error'
        //                         });
        //                  }
        //                 });
        //             }else{
        //                 var idcod='#tr_' + code;
        //             var precio_borrar=$("#tr_prec_"+code).val();
        //         if(idTipo=='1'){
        //             var mo_r=mo_revision.val();
        //             var new_mor=Number(mo_r)-Number(precio_borrar);
        //             mo_revision.val(new_mor.toFixed(2));
        //          }else if(idTipo=='2'){
        //             var mo_m=mo_mecanica.val();
        //             var new_mo_m=Number(mo_m)-Number(precio_borrar);
                    
        //             mo_mecanica.val(new_mo_m.toFixed(2));
        //          }else if(idTipo=='3'){
        //             var mo_tr=terceros.val();
        //             var new_mo_tr=Number(mo_tr)-Number(precio_borrar);
        //             terceros.val(new_mo_tr.toFixed(2));
        //          }else if(idTipo=='4'){
        //             var mo_otr=otros_mo.val();
        //             var new_mo_otr=Number(mo_otr)-Number(precio_borrar);
        //             otros_mo.val(new_mo_otr.toFixed(2));
        //          }else if(idTipo=='5'){
        //             var mo_rp=repuestos.val();
        //             var new_mo_rp=Number(mo_rp)-Number(precio_borrar);
        //             repuestos.val(new_mo_rp.toFixed(2));
        //          }else if(idTipo=='6'){
        //             var mo_ac=accesorios.val();
        //             var new_mo_ac=Number(mo_ac)-Number(precio_borrar);
        //             accesorios.val(new_mo_ac.toFixed(2));
        //          }else if(idTipo=='7'){
        //             var mo_lub=lubricantes.val();
        //             var new_mo_lub=Number(mo_lub)-Number(precio_borrar);
        //             lubricantes.val(new_mo_lub.toFixed(2));
        //          }else if(idTipo=='8'){
        //             var mo_trp=otros_rep.val();
        //             var new_trp=Number(mo_trp)-Number(precio_borrar);
        //             otros_rep.val(new_trp.toFixed(2));
        //          }
        //             sumar_key(); 
        //             $('#tr_b_' + code).remove();
        //         }


                   
        //         });
        //         e.preventDefault();
        //     });

        // }
          function calcular_impueso(precio,cantidad){
            var impu=(Number(precio)*Number(cantidad))*((Number(igv)/100));
            impu=impu.toFixed(2);
            return impu;
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
             idMoneda.data("prev",idMoneda.val()); 
             id_tipocli.data("prev",id_cliente_tipo_or.val()); 
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
                        RESTService.get('orden_servicios/deleteDetalle', id, function(response) {
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
        function getDataForProforma () {
            RESTService.all('proformas/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                     igv=response.igv[0].value;
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
        function addMante(total,modo_t) {
            var arrayRe=total.split("*");
            var code=arrayRe[0];
            var username=arrayRe[1];

             if ($('#tr_b_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este mantenimiento'
                });
                return false;

            }

             var tr = $('<tr id="tr_b_' + code + '"></tr>');
             var td1 = $('<td>' + username + '</td>');
             var td2 = $('<td class="text-center"></td>');
             var inpcodigo = $('<input type="hidden" class="total_revision" id="tr_' + code + '" value="' +total+ '" />');
             var modo_mant = $('<input type="hidden" class="modo_mant" id="tr_' + code + '" value="' +modo_t+ '" />');
             var codigo_mantenimiento = $('<input type="hidden" class="id_mantenimiento_group"  value="' +code+ '"  />');
             var btn = $('<button class="btn btn-danger btn-xs delRevi" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
             td2.append(btn).append(codigo_mantenimiento).append(modo_mant);
             tr.append(td1).append(td2).append(inpcodigo);
             tabla_grupo_revision.append(tr);

            // var mo_r=arrayRe[2];
            // var mo_me=arrayRe[3];
            // var mo_ter=arrayRe[4];
            // var mo_otros_mo=arrayRe[5];
         
            // var mo_rep=arrayRe[6];
            // var mo_acc=arrayRe[7];
            // var mo_lu=arrayRe[8];
            // var mo_ot_re=arrayRe[9];

            // sumar(mo_r,mo_me,mo_ter,mo_otros_mo,mo_rep,mo_acc,mo_lu,mo_ot_re)
              
              $('.delRevi').click(function (e) {
                var code = $(this).attr('data-id');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este mantenimiento?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    var idcod='#tr_' + code;
                    if(nConsecutivo.val()!=''){
                        var id=cCodConsecutivo.val()+'_'+nConsecutivo.val()+'_'+code;
                        RESTService.get('orden_servicios/deleteMovimiento', id, function(response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            var data=response.data;
                            console.log(data);
                            if(data[0].Mensaje!=''){
                                  AlertFactory.textType({
                                    title: '',
                                    message: data[0].Mensaje,
                                    type: 'info'
                                });
                            }else{
                                   AlertFactory.textType({
                                    title: '',
                                    message: 'El mantenimiento se eliminó correctamente',
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
                        $('#tr_b_' + code).remove();
                    }
                    
                });
                e.preventDefault();
            });
        }
        $( "#mo_revision" ).keyup(function() {
            sumar_key();
        });
         $( "#mo_mecanica" ).keyup(function() {
            sumar_key();
        });
         $( "#terceros" ).keyup(function() {
            sumar_key();
        });
         $( "#otros_mo" ).keyup(function() {
            sumar_key();
        });
         $( "#repuestos" ).keyup(function() {
            sumar_key();
        });
         $( "#accesorios" ).keyup(function() {
            sumar_key();
        });
         $( "#lubricantes" ).keyup(function() {
            sumar_key();
        });
         $( "#otros_rep" ).keyup(function() {
            sumar_key();
        });

        

        $( "#mo_revision" ).change(function() {
            sumar_key();
        });
         $( "#mo_mecanica" ).change(function() {
            sumar_key();
        });
         $( "#terceros" ).change(function() {
            sumar_key();
        });
         $( "#otros_mo" ).change(function() {
            sumar_key();
        });
         $( "#repuestos" ).change(function() {
            sumar_key();
        });
         $( "#accesorios" ).change(function() {
            sumar_key();
        });
         $( "#lubricantes" ).change(function() {
            sumar_key();
        });
         $( "#otros_rep" ).change(function() {
            sumar_key();
        }); 

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

       function sumar_key(){
            var subA=Number(mo_revision.val())+Number(mo_mecanica.val())+Number(terceros.val())+Number(otros_mo.val());
            var subB=Number(repuestos.val())+Number(accesorios.val())+Number(lubricantes.val())+Number(otros_rep.val());
            subtotal_moa.val(subA.toFixed(2));
            subtotal_mob.val(subB.toFixed(2));
            var totalfin=Number(subtotal_moa.val())+Number(subtotal_mob.val());
            total.val(totalfin.toFixed(2));
        }
        function sumar(m1,m2,m3,m4,m5,m6,m7,m8){
            var mo_revision_va =mo_revision.val();
            var mo_mecanica_va=mo_mecanica.val();
            var terceros_va=terceros.val();
            var otros_mo_va=otros_mo.val();

            mo_revision.val(Number(mo_revision_va)+Number(m1));
            mo_mecanica.val(Number(mo_mecanica_va)+Number(m2));
            terceros.val(Number(terceros_va)+Number(m3));
            otros_mo.val(Number(otros_mo_va)+Number(m4));


            subtotal_moa.val(Number(mo_revision.val())+Number(mo_mecanica.val())+Number(terceros.val())+Number(otros_mo.val()))

            

            var re_c=repuestos.val();
            var acc_c=accesorios.val();
            var lu_c=lubricantes.val();
            var ot_c=otros_rep.val();

            repuestos.val(Number(re_c)+Number(m5));
            accesorios.val(Number(acc_c)+Number(m6));
            lubricantes.val(Number(lu_c)+Number(m7));
            otros_rep.val(Number(ot_c)+Number(m8));

            subtotal_mob.val(Number(repuestos.val())+Number(accesorios.val())+Number(lubricantes.val())+Number(otros_rep.val()))
            total.val(Number(subtotal_moa.val())+Number(subtotal_mob.val()));
        };
         modaClientes.on('hidden.bs.modal', function (e) {
              cleanCliente();
        });
       
          modaVehiculosTerceros.on('hidden.bs.modal', function (e) {
              cleanVehi();
        });
           modalOrdenServivio.on('hidden.bs.modal', function (e) {
              cleanOrdenServi();
        });
       
        function cleanOrdenServi(){
            table_servicios.html("");
            cCodConsecutivo.val("");
            idcCondicionPago.val("");
            nConsecutivo.val("");
            idTecnico.val("");
            idAsesor.val("");
            btn_guardarOrden.prop('disabled',false); 
            idTipoVehi_add.val("").trigger("change");
            idMoneda.val("1").trigger("change");
            tipoCliente_or.val("");
            id_cliente_tipo_or.val("");
            dFecRec.val("");
            horaRec.val("");
            tipo_totales_slec.val("");
            cCodConsecutivo.prop('disabled',false); 
            dFecEntrega.val("");
            horaEnt.val("");
            servicios_select.html(''); 
            servicios_select.append('<option value="" selected>Seleccionar </option>');
            estado.val("");
            idcCondicionPago.val('1').trigger("change");
            documento_or.val("");
            distrito_ver.val("");
            distrito_or.val("");
            idDocumentoCli.val("01").trigger("change");
            razonsocial_cliente_or.val("");
            documento_or.val("");
            contacto_or.val("");
            direccion_or.val("");
            correo_electronico_or.val("");
            celular_or.val("");
            telefono_or.val("");
            cliente_id_or.val("");
            placa.val("");
            marca.val("");
            modelo.val("");
            chasis.val("");
            anio_fabricacion.val("");
            color.val("");
            idMoneda.val("").trigger("change");
            idTecnico.val("").trigger("change");
            id_tipomant.val("").trigger("change");
            idAsesor.val("").trigger("change");
            idDocumentoCli.val("").trigger("change");
            gru_revisiones.val("").trigger("change");
            articulo_dd_det.html("");
            nKilometraje.val("");
            observaciones.val("");
            mo_revision.val("");
            mo_mecanica.val("");
            terceros.val("");
            otros_mo.val("");
            subtotal_moa.val("");
            repuestos.val("");
            accesorios.val("");
            lubricantes.val("");
            otros_rep.val("");
            subtotal_mob.val("");
            total.val("");
            motor_add.val("");
            motor.val("");
        }
        function cleanCliente () {
            cleanRequired();
            titleModalClientes.html('');
            tipodoc.val('01').trigger("change");
            id_tipocli.val('').trigger("change");
            razonsocial_cliente.val('');
            documento.val('');
            contacto.val('');
            direccion.val('');
            correo_electronico.val('');
            celular.val('');
            telefono.val('');
            cliente_id.val('');
            departamento.val('');
            provincia.val('');
            distrito.val('');
            provincia.html('');
            distrito.html('');
        };
          $('#btn_cambio_delete').click(function(e){
            EliminarServiciosDetalle();
          })


         function EliminarServiciosDetalle (){
            
            if(nConsecutivo.val()!=""){
                var id=cCodConsecutivo.val()+"_"+nConsecutivo.val();
                var id_revision_array =[];
                $.each($('.idDetalleGrup'), function (idx, item) {
                    id_revision_array[idx] = $(item).val();

                });
            id_revision_array = id_revision_array.join(',');
            
            var params = {
                    'id_revision_array':id_revision_array,
                 };
                 
             RESTService.updated('orden_servicios/deleteDetalle', id, params, function(response)  {
                 if (!_.isUndefined(response.status) && response.status) {
                          var data=response.dato;
                            console.log(data);
                            if(data[0].Mensaje!=''){
                                  AlertFactory.textType({
                                    title: '',
                                    message: data[0].Mensaje,
                                    type: 'info'
                                });
                                   idMoneda.val(idMoneda.data("prev")).trigger("change");
                                  id_tipocli.val(id_tipocli.data("prev")).trigger("change");
                                   modalDeleteDetalle.modal("hide");
                            }else{
                                 console.log(response.data);
                                 console.log(response.datad);
                                table_servicios.html("");
                                idMoneda.data("prev",idMoneda.val());  
                                id_tipocli.data("prev",id_tipocli.val());
                                if(id_tipocli.val()!=''){
                                   id_cliente_tipo_or.val(id_tipocli.val()).trigger("change"); 
                                }
                                modalDeleteDetalle.modal("hide");
                                
                                clean_totale();
                                sumar_key();
                            }
                    }else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo eliminar. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'error'
                        });
                        id_cliente_tipo_or.val(id_tipocli.val()).trigger("change");
                        idMoneda.data("prev",idMoneda.val()); 
                        id_tipocli.data("prev",id_tipocli.val()); 
                        modalDeleteDetalle.modal("hide"); 
                    }
               });
         }else{
              modalDeleteDetalle.modal("hide"); 
              table_servicios.html("");
                clean_totale();
               sumar_key();
         }
        }
          $scope.EliminarOrden = function()
        {
           var id=idOrdenDelete.val();
            console.log(id);
            RESTService.get('orden_servicios/delete', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                    var dta=response.data;
                    if(dta[0]['Mensaje']!=""){
                         AlertFactory.textType({
                                title: '',
                                message: dta[0]['Mensaje'],
                                type: 'info'
                        }); 
                        modalDeleteOrden.modal("hide"); 
                    }else{
                         AlertFactory.textType({
                            title: '',
                            message: 'El registro se eliminó correctamente',
                            type: 'success'
                        });
                        modalDeleteOrden.modal("hide"); 
                        LoadRecordsButtonOrden_Servicio.click();
                    }
                  
                  
                    
                    }
               }); 
        }
        function cleanVehi () {
            cleanRequired();
            titleModalVehiculosTerceros.html('');
            idMarca_add.html('');
            idModelo_add.val('');
            idVehiculo_add.val('');
            n_chasis_add.val('');
            anio_fabricacion_add.val('');
            color_add.val('');
            placa_add.val('');
        };
         $scope.saveOrdenServicio = function()
        {
            var bval = true;
            bval = bval && cCodConsecutivo.required();
            bval = bval && idcCondicionPago.required();
            bval = bval && idMoneda.required();
            bval = bval && dFecRec.required();
            bval = bval && horaRec.required();
            bval = bval && dFecEntrega.required();
            bval = bval && horaEnt.required();
            bval = bval && id_tipo.required();
            bval = bval && id_tipomant.required();
            bval = bval && idTipoVehi_add.required();
            bval = bval && documento_or.required();
            bval = bval && placa.required();
            bval = bval && documento_or.required();
            bval = bval && idDocumentoCli.required();
            bval = bval && distrito_ver.required();
            bval = bval && nKilometraje.required();
            bval = bval && placa.required();
            if($("#articulo_dd_det").html()==''){
               AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar un mínimo de 1 en mantenimientos'
                });
                activeTab('trbajoES');
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
                var id_mantenimiento_array =[];
                $.each($('.id_mantenimiento_group'), function (idx, item) {
                    id_mantenimiento_array[idx] = $(item).val();
                });
                id_mantenimiento_array = id_mantenimiento_array.join(',');

                

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

                var modo_array_mant =[];
                $.each($('.modo_mant'), function (idx, item) {
                    modo_array_mant[idx] = $(item).val();
                });
                modo_array_mant = modo_array_mant.join(',');

                 var modo_array_serv =[];
                $.each($('.modo_serDet'), function (idx, item) {
                    modo_array_serv[idx] = $(item).val();
                });
                modo_array_serv = modo_array_serv.join(',');
                
                 var impuesto_servicio =[];
                $.each($('.totalImpuesto_servicio'), function (idx, item) {
                    impuesto_servicio[idx] = $(item).val();
                });
                impuesto_servicio = impuesto_servicio.join(',');
  


                 var idDetalleGrup =[];
                $.each($('.idDetalleGrup'), function (idx, item) {
                    idDetalleGrup[idx] = $(item).val();
                });
                idDetalleGrup = idDetalleGrup.join(',');


                var totalConse=cCodConsecutivo.val();
                var arrayConEn=totalConse.split("*");
                var con=$("#nConsecutivo").val();
                if($("#nConsecutivo").val()==""){
                    con=0;
                };
                var params = {
                    'cCodConsecutivo': arrayConEn[0],
                    'nConsecutivo': con,
                    'id_tipo': id_tipo.val(),
                    'id_tipomant':id_tipomant.val(),
                    'IdMoneda':idMoneda.val(),
                    'dFecRec': dFecRec.val(),
                    'horaRec': horaRec.val(),
                    'dFecEntrega': dFecEntrega.val(),

                    'horaEnt': horaEnt.val(),
                    'id_tipoveh':idTipoVehi_add.val(),
                    'cPlacaVeh': placa.val(),
                    'cMotor': motor.val(),
                    'cChasis': chasis.val(),
                    'iAnioFab': anio_fabricacion.val(),
                    'cColor': color.val(),
                     'nKilometraje': nKilometraje.val(),
                     'idCliente': cliente_id_or.val(),
                    'idTecnico': idTecnico.val(),
                    'idAsesor': idAsesor.val(),
                    'idcCondicionPago': idcCondicionPago.val(),
                    'cObservaciones': observaciones.val(),
                    
                    'mo_revision': mo_revision.val(),

                    'mo_mecanica': mo_mecanica.val(),
                    'terceros': terceros.val(),
                    'otros_mo': otros_mo.val(),
                    'respuestos': repuestos.val(),
                    'accesorios': accesorios.val(),
                    'impuesto_servicio':impuesto_servicio,
                    'lubricantes': lubricantes.val(),
                    'otros_rep': otros_rep.val(),
                    'total': total.val(),
                    'id_mantenimiento_array':id_mantenimiento_array,
                    'id_revision_array':id_revision_array,
                    'idDetalleGrup':idDetalleGrup,
                    'id_tipo_array':id_tipo_array,
                    'precio_array':precio_array,
                    'modo_array_mant':modo_array_mant,
                    'modo_array_serv':modo_array_serv,
                 };
               
                var id = (idOrden.val() === '') ? 0 : idOrden.val();
                    RESTService.updated('orden_servicios/createOrden', id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                       var data_p =response.res;
                       if(Number(data_p[0].Mensaje)){
                        $("#nConsecutivo").val(data_p[0].Mensaje);
                        estado.val("0");
                        btn_guardarOrden.prop('disabled',true); 
                        cCodConsecutivo.prop('disabled',true); 
                        AlertFactory.textType({
                            title: '',
                            message: 'La orden se registró correctamente.',
                            type: 'success'
                        });
                         LoadRecordsButtonOrden_Servicio.click();
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
         $scope.saveVehiculos = function()
        {
            var bval = true;
            bval = bval && idMarca_add.required();
            bval = bval && idModelo_add.required();
            bval = bval && n_chasis_add.required();
            bval = bval && anio_fabricacion_add.required();
            bval = bval && color_add.required();
            bval = bval && placa_add.required();
            bval = bval && motor_add.required();
            if(bval){
                 var params = {
                    'idMarca': idMarca_add.val(),
                    'idModelo': idModelo_add.val(),
                    'motor': motor_add.val(),
                    'n_chasis': n_chasis_add.val(),
                    'anio_fabricacion': anio_fabricacion_add.val(),
                    'color': color_add.val(),
                    'placa': placa_add.val(),
                 };

                 var id = 0;
              
                  RESTService.updated('vehiculos_terceros/createVehi', id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        placa.val(placa_add.val());
                        getPlaca();
                        modaVehiculosTerceros.modal('hide');
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
        btn_save_cliente.click(function(e){
            saveCliente();
        });
        
        function saveCliente()
        {
            var bval = true;
            bval = bval && tipodoc.required();
            bval = bval && documento.required();
            bval = bval && id_tipocli.required();
            bval = bval && razonsocial_cliente.required();
            bval = bval && celular.required();
            bval = bval && distrito.required();
            if(tipodoc.val()=='01' && documento.val().length!=8){
                AlertFactory.textType({
                            title: '',
                            message: 'Longitud de LE/DNI INCORRECTA',
                            type: 'info'
                });
             bval = false;
            };
            if(tipodoc.val()=='06' && documento.val().length!=11){
                AlertFactory.textType({
                            title: '',
                            message: 'Longitud de RUC INCORRECTA',
                            type: 'info'
                });
             bval = false;
            };
           
            if(bval){
                 var params = {
                    'tipodoc': tipodoc.val(),
                    'razonsocial_cliente': razonsocial_cliente.val(),
                    'documento': documento.val(),
                    'contacto': contacto.val(),
                    'direccion': direccion.val(),
                    'correo_electronico': correo_electronico.val(),
                    'celular': celular.val(),
                    'telefono': telefono.val(),
                    'distrito': distrito.val(),
                    'id_tipocli':id_tipocli.val(),

                 };
                var cli_id = (cliente_id.val() === '') ? 0 : cliente_id.val();
                  RESTService.updated('customers/createCliente', cli_id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        documento_or.val(documento.val());
                        getCliente();
                        modaClientes.modal('hide');
                        
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar el Cliente. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });
            }

        };
         function getDataFormCustomer () {
            RESTService.all('customers/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var tip=response.tipoc_doc;
                     var tipo_clie=response.tipo_clie;
                      tip.map(function(index) {
                         tipodoc.append('<option value="'+index.Codigo+'">'+index.TipoDocumento+'</option>');
                      });
                  
                     id_tipocli.append('<option value="">Seleccionar</option>');
                        tipo_clie.map(function(index) {
                        id_tipocli.append('<option value="'+index.id+'">'+index.descripcion+'</option>');
                    });
                  
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

        function getDataFormOrden () {
            var id=0;
            RESTService.get('orden_servicios/get_Placa', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     idTipoVehi_add.append('<option value="" selected>Seleccionar</option>');
                     _.each(response.tipo_ve, function(item) {
                          idTipoVehi_add.append('<option value="'+item.id+'" >'+item.descripcion+'</option>');
                     }); 
                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'info'
                    });
                }
               });
        }
        getDataFormOrden();
        function getDataForOrdenServicio () {
            RESTService.all('orden_servicios/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                   
                     cCodConsecutivo.append('<option value="">Seleccionar</option>');
                     _.each(response.codigo, function(item) {
                        cCodConsecutivo.append('<option value="'+item.cCodConsecutivo+'">'+item.cCodConsecutivo+'</option>');
                    });
                      // cCodConsecutivo.append('<option value="'+item.cCodConsecutivo+'*'+item.nConsecutivo+'">'+item.cCodConsecutivo+'</option>');
                       idcCondicionPago.append('<option value="">Seleccionar</option>');
                     _.each(response.condicion_pago, function(item) {
                        idcCondicionPago.append('<option value="'+item.id+'">'+item.description+'</option>');
                    });
                       _.each(response.tipo_servicio, function(item) {
                        id_tipo.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
                    });
                         idDocumentoCli.append('<option value="">Seleccionar</option>');
                         _.each(response.tipo_document, function(item) {
                        idDocumentoCli.append('<option value="'+item.Codigo+'">'+item.TipoDocumento+'</option>');
                    });
                        gru_revisiones.append('<option value="" selected>Seleccionar </option>');
                      _.each(response.revisiones, function(item) {
                        gru_revisiones.append('<option value="'+item.id+'*'+item.nombre+'*'+item.mo_revision+'*'+item.mo_mecanica+'*'+item.terceros+'*'+item.otros_mo+'*'+item.repuestos+'*'+item.accesorios+'*'+item.lubricantes+'*'+item.otros_rep+'">'+item.nombre+'</option>');
                    });
                      idTecnico.append('<option value="">Seleccionar</option>');
                      _.each(response.tecnico, function(item) {
                        idTecnico.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
                    });
                       idAsesor.append('<option value="">Seleccionar</option>');
                     _.each(response.asesor, function(item) {
                        idAsesor.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
                    });
                       id_tipomant.append('<option value="">Seleccionar</option>');
                       _.each(response.tipoMantenimiento, function(item) {
                        id_tipomant.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
                    });
                    //     servicios_select.append('<option value="" selected>Seleccionar </option>');
                    //    _.each(response.servicios, function(item) {
                    //     servicios_select.append('<option value="'+item.idProducto+'*'+item.producto+'*'+item.precio+'">'+item.producto+'</option>');
                    // });
                       servicios=response.servicios;
                        idMoneda.append('<option value="">Seleccionar</option>');
                       _.each(response.moneda, function(item) {
                        idMoneda.append('<option value="'+item.IdMoneda+'">'+item.Descripcion+'</option>');
                    });
                    totales=response.totales;
                    tipo_totales_slec.append('<option value="">Tipo</option>');
                       _.each(response.totales, function(item) {
                        tipo_totales_slec.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
                    });
                
                } 
            }, function() {
                getDataForOrdenServicio();
            });
        }
        getDataForOrdenServicio();
        
        var search = getFormSearch('frm-search-Orden_Servicio', 'search_b', 'LoadRecordsButtonOrden_Servicio');

        var table_container_Orden_Servicio = $("#table_container_Orden_Servicio");

        table_container_Orden_Servicio.jtable({
            title: "Lista de Ordenes de Servicios",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/orden_servicios/list',
            },
            messages: {
                addNewRecord: 'Nuevo Orden de Servicio',
                editRecord: 'Editar Orden de Servicio',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('orden_servicios/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Orden de Servicio',
                    click: function () {
                        newOrdenServicio();
                    }
                }]
            },
            fields: {
                cCodConsecutivo: {
                    key: true,
                    create: false,
                    edit: false,
                    list: true
                },
                nConsecutivo: {
                    title: 'Consecutivo',
                     

                },
                dFecRec: {
                    title: 'Fecha Registro',
                    width: '20%',
                        sorting: false,
                        display: function (data) {
                            return moment(data.record.dFecRec).format('DD/MM/YYYY');
                        }

                },
                idCliente: {
                    title: 'Cliente',
                    options: base_url + '/orden_servicios/getCliente' ,
                },
                iEstado: {
                   title: 'Estado',
                   options: {0: 'Registrado', 1: 'Con Proforma',2:'En ejecución',3:'Terminada',4:'Cancelada'},

                },

                cPlacaVeh: {
                    title: 'Placa',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                   
                   
                },edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-orden" data-id="'+data.record.cCodConsecutivo
                            +'_'+data.record.nConsecutivo+'" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                },Eliminar: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a data-target="#"  data-ide="'+data.record.cCodConsecutivo+'_'+data.record.nConsecutivo+'"   title="Eliminar" class="jtable-command-button eliminar-Orden"><i class="fa fa-trash fa-1-5x fa-red"><span>Eliminar</span></i></a>';
                    }
                    
                }
            },
            recordsLoaded: function(event, data) {
                $('.edit-orden').click(function(e){
                    var id = $(this).attr('data-id');
                    findRegister_Orden(id);
                    e.preventDefault();
                });
                  $('.eliminar-Orden').click(function(e){
                    var ide = $(this).attr('data-ide');
                    idOrdenDelete.val(ide);
                    modalDeleteOrden.modal("show");
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

        generateSearchForm('frm-search-Orden_Servicio', 'LoadRecordsButtonOrden_Servicio', function(){
            table_container_Orden_Servicio.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('orden_servicios', {
                url: '/orden_servicios',
                templateUrl: base_url + '/templates/orden_servicios/base.html',
                controller: 'Orden_ServicioCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();