/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict'; 
    angular.module('sys.app.aprobacionSolicituds')
        .config(Config)
        .controller('AprobacionSolicitudCtrl', AprobacionSolicitudCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    AprobacionSolicitudCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory', 'Helpers'];

    function AprobacionSolicitudCtrl($scope, _, RESTService, AlertFactory, Helpers)
    {   

        var modalVerAproba=$("#modalVerAproba");   
        var btn_verAprobacio=$(".btn_verAprobacio");
        var modalObservacion=$("#modalObservacion");
        var titleModalProduct=$("#titleModalProduct"); 
        var estadoApro=$("#estadoApro");
        var btn_Aprobar=$(".btn_Aprobar");
        var btn_Rechazar=$(".btn_Rechazar"); 
        var aprobacion_ventas=$("#aprobacion_ventas");
        var aprobaComentario=$("#AprobaComentario");
        var modalSolicitud = $('#modalSolicitud');
        var titlemodalSolicitud = $('#titleModalSolicitud');
        var redondeo;
        var cambCan;
        var cambioChe;
        var cambioDes; 
        var acodigos = [];
        var totalMO = $("#totalMO");
        var totales;
        var btn_imprimir = $(".btn_imprimir");
        var igv;
        var desTotal = $("#desTotal");
        var descuentos;
        var servicios;
        var porcentajeTotal = $("#porcentajeTotal");
        var comentario_aprobacion=$("#comentario_aprobacion");
        var btn_observacion=$(".btn_observacion");
        // var t_monto_descuento = $("#t_monto_descuento");
        var valor_moneda;
        var btn_save_cliente = $("#btn_save_cliente");
        var id_tipoDoc_Venta = $("#id_tipoDoc_Venta");
        var modalDeleteDetalle = $("#modalDeleteDetalle");
        var id_tipomant = $("#id_tipomant");
        var tipo_totales_slec = $("#tipo_totales_slec");
        var id_cliente_tipo_or = $("#id_cliente_tipo_or");
        var table_servicios = $("#table_servicios");
        var servicios_select = $("#servicios_select");
        var idMoneda = $("#IdMoneda");
        var btn_cancelar_servicio = $("#btn_cancelar_servicio");
        var tipo_vehi = $("#tipo_vehi");
        var idTipoVehi_add = $("#idTipoVehi_add");
        var tipoCliente_or = $("#tipoCliente_or");
        var id_tipocli = $("#id_tipocli");
        var idOrdenDelete = $("#idOrdenDelete");
        var modalDeleteOrden = $("#modalDeleteOrden");
        var modaClientes = $('#modaClientes');
        var titleModalClientes = $('#titleModalClientes');
        var btn_guardarOrden = $(".btn_guardarOrden");
        var modaVehiculosTerceros = $("#modaVehiculosTerceros");
        var titleModalVehiculosTerceros = $("#titleModalVehiculosTerceros");
        var estado = $("#estado");
        var motor = $("#motor");
        var idOrden = $("#idOrden");
        var motor_add = $("#motor_add");
        var departamento = $('#departamento');
        var provincia = $('#provincia');
        var distrito = $('#distrito');
        var observaciones = $("#observaciones");
        var cCodConsecutivo = $("#cCodConsecutivo");
        var idcCondicionPago = $("#idcCondicionPago");
        var id_tipo = $("#id_tipo");
        var idDocumentoCli = $("#idDocumentoCli");
        var gru_revisiones = $("#gru_revisiones");
        var idTecnico = $("#idTecnico");
        var idAsesor = $("#idAsesor");
        var horaEnt = $("#horaEnt");
        var nKilometraje = $("#nKilometraje");
        var dFecRec = $('#dFecRec');
        var horaRec = $("#horaRec");
        var dFecEntrega = $("#dFecEntrega");
        var articulo_dd_det = $("#articulo_dd_det");
        var modalOrdenServivio = $("#modalOrdenServivio");
        var titlemodalOrdenServivio = $("#titlemodalOrdenServivio");
        var tabla_grupo_revision = $("#articulo_dd_det");
        var tipodoc = $("#tipodoc");
        var razonsocial_cliente = $("#razonsocial_cliente");
        var btn_cerrar = $("#btn_cerrar");
        var documento = $("#documento");
        var contacto = $("#contacto");
        var direccion = $("#direccion");
        var correo_electronico = $("#correo_electronico");
        var id_tipoDoc_Venta_or = $("#id_tipoDoc_Venta_or");
        var celular = $("#celular");
        var telefono = $("#telefono");
        var cliente_id = $("#cliente_id");
        var distrito = $('#distrito');
        var distrito_ver = $('#distrito_ver');
        var nConsecutivo = $('#nConsecutivo');
        var mo_revision = $("#mo_revision");
        var mo_mecanica = $("#mo_mecanica");
        var terceros = $("#terceros");
        var otros_mo = $("#otros_mo");
        var subtotal_moa = $("#subtotal_moa");
        var btn_guardarObservacion=$("#btn_guardarObservacion");

        var totalDescuento = $("#totalDescuento");

        var btn_ejecucion = $(".btn_ejecucion");
        var btn_terminada = $(".btn_terminada");
        var btn_cancelar = $(".btn_cancelar");

        var repuestos = $("#repuestos");
        var accesorios = $("#accesorios");
        var lubricantes = $("#lubricantes");
        var otros_rep = $("#otros_rep");
        var subtotal_mob = $("#subtotal_mob");
        var total = $("#total");

        var idDocumentoCli = $("#idDocumentoCli");
        var documento_or = $("#documento_or");
        var razonsocial_cliente_or = $("#razonsocial_cliente_or");
        var contacto_or = $("#contacto_or");
        var direccion_or = $("#direccion_or");
        var correo_electronico_or = $("#correo_electronico_or");
        var celular_or = $("#celular_or");
        var telefono_or = $("#telefono_or");
        var cliente_id_or = $("#cliente_id_or");
        var distrito_or = $('#distrito_or');

        var idVehiculo_add = $('#idVehiculo_add');
        var idMarca_add = $('#idMarca_add');
        var idModelo_add = $('#idModelo_add');
        var n_chasis_add = $('#n_chasis_add');
        var anio_fabricacion_add = $('#anio_fabricacion_add');
        var color_add = $('#color_add');
        var placa_add = $('#placa_add');

        var placa = $("#placa");
        var marca = $("#marca");
        var modelo = $("#modelo");
        var chasis = $("#chasis");
        var anio_fabricacion = $("#anio_fabricacion");
        var color = $("#color");
        var idconvenio = $("#idconvenio");
        var idvendedor = $("#idvendedor");
        var comentario_aprobacion_so=$("#comentario_aprobacion_so");
        var AlmacenesSele;//variable para guardar almacenes
        var LotesSele;//variable para guardar lotes
        var DescuentosSele;//variable para guardar los decuentos
        var LocalizacionesSele;//variable para guardar localizaciones del almacen
             var modalAprobar=$("#modalAprobar");
          modalAprobar.on('hidden.bs.modal', function (e) {
            cleanAprobar();
        });
             modalSolicitud.on('hidden.bs.modal', function (e) {
                $("#comentario_aprobacion_so").val("");
                        btn_Aprobar.prop('disabled',false);
                         btn_Rechazar.prop('disabled',false);
        });
              modalVerAproba.on('hidden.bs.modal', function (e) {
            cleanAprobadores();
        });
        function cleanAprobadores() {
           $("#aprobadores_table").html("");
        }

        btn_verAprobacio.click(function (e) {
             var id=cCodConsecutivo.val()+'*'+nConsecutivo.val();
              RESTService.get('aprobacionSolicituds/getAprobadores', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    console.log(data_p);
                     data_p.map(function(index) {
                        var com='';
                        if(index.cObservacion!=null){
                            com=index.cObservacion;
                        }
                        var est='Por Aprobar'; 
                                if(index.iEstado==1){
                                    est='Aprobado';
                                }else if(index.iEstado==2){
                                    est='Rechazado';
                                };
                         var fre=moment(index.dFecReg).format('DD/MM/YYYY');;
                         var fmo=moment(index.updated_at).format('DD/MM/YYYY');;      

                        addAprobadores(index.name,com,est,fre,fmo);
                         });
                  
                    modalVerAproba.modal('show');
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Cliente. Intente nuevamente.',
                        type: 'error'
                    });
                } 
            });
        
        });
          function addAprobadores(Aprbador,comentarios,estadoText,fre,fmo){
                var tr = $('<tr></tr>');
                var td1 = $('<td id="tr_identO ">' + Aprbador + '</td>');
                var tda = $('<td>' + comentarios + '</td>');
                var tdb = $('<td>' + fre + '</td>');
                var td2 = $('<td>' + fmo + '</td>');
                var td3 = $('<td>' + estadoText + '</td>');
                tr.append(td1).append(tda).append(tdb).append(td2).append(td3);
                $("#aprobadores_table").append(tr);
        }  
        function cleanAprobar() {
            titleModalProduct.html("");
           $("#aprobacion_ventas").html("");
            $("#AprobaComentario").val("");
        }

        function newSolicitud() {
            // var hoy = new Date();
            // var hAnio=hoy.getFullYear();
            // var hmes=hoy.getMonth()+1;
            // if(Number(hmes)<10){
            //     hmes='0'+String(hmes);
            // }

            // var hdia=hoy.getDate();
            // if(Number(hdia)<10){
            //     hdia='0'+String(hdia);
            // }
            // var hora = hoy.getHours();
            // if(Number(hora)<10){
            //     hora='0'+String(hora);
            // }
            // var minutos= hoy.getMinutes();
            // if(Number(minutos)<10){
            //     minutos='0'+String(minutos);
            // }
            // var actu=hAnio+'-'+hmes+'-'+hdia;
            // var hora_ac=hora+':'+minutos;
            // dFecRec.val(actu);
            // horaRec.val(hora_ac);
            if (estado.val() != '') {
                if (estado.val() == 0 || estado.val() == 1) {
                    btn_ejecucion.prop('disabled', false);
                };
                if (estado.val() == 1 || estado.val() == 2) {
                    btn_cancelar.prop('disabled', false);
                };
                if (estado.val() == 2) {
                    btn_terminada.prop('disabled', false);
                };
            }
            modalSolicitud.modal('show');
            titlemodalSolicitud.html('Nueva Solicitud');
            habilitar_inputs();
            $("#enviar_solicitud").hide();
            $("#aprobaciones").hide();
            $("#articulo_mov_det").html("");
            $("#aprobacion_ventas").html("");
            $("#formulario-solicitud").trigger("reset");
            $("#formulario-creditos").trigger("reset");
            $("#formulario-persona").trigger("reset");
            $("#AprobaComentario").val("");

        }
        function obtener_data_for_solicitud() {
            RESTService.all('aprobacionSolicituds/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    if (response.parametro_igv.length > 0) {
                        // alert(response.parametro_igv[0].value);
                        $("#valor_igv").val(response.parametro_igv[0].value);
                    }
                    redondeo = response.dataredondeo
                    // descuentos = response.descuentos;
                    var hoy = new Date();
                    var hAnio = hoy.getFullYear();
                    var hmes = hoy.getMonth() + 1;
                    if (Number(hmes) < 10) {
                        hmes = '0' + String(hmes);
                    }

                    var hdia = hoy.getDate();
                    if (Number(hdia) < 10) {
                        hdia = '0' + String(hdia); 
                    }
                    var actu = hAnio + '-' + hmes + '-' + hdia;
                    totalDescuento.append('<option value="">Seleccionar</option>');
                    _.each(response.descuentos, function (item) {
                        if (item.cTipoAplica == 'T') {
                            var mo = idMoneda.val();
                            var por = Number(item.nPorcDescuento);
                            var monto = Number(item.nMonto);
                            if ((item.idMoneda == mo || item.nPorcDescuento != '0') && (item.nSaldoUso > 0 || item.nLimiteUso == '0')) {
                                if (item.dFecIni <= actu && item.dFecFin > actu) {
                                    totalDescuento.append('<option idTipo="' + item.idTipo + '" value="' + item.id + '*' + por + '*' + monto + '" >' + item.descripcion + '</option>');
                                }
                            }
                        }
                    });
                    cCodConsecutivo.append('<option value="">Seleccionar</option>');
                    _.each(response.codigo, function (item) {
                        cCodConsecutivo.append('<option value="' + item.cCodConsecutivo + '">' + item.cCodConsecutivo + '</option>');
                    });
                    // cCodConsecutivo.append('<option value="'+item.cCodConsecutivo+'*'+item.nConsecutivo+'">'+item.cCodConsecutivo+'</option>');
                    idcCondicionPago.append('<option value="">Seleccionar</option>');
                    _.each(response.condicion_pago, function (item) {
                        idcCondicionPago.append('<option value="' + item.id + '">' + item.description + '</option>');
                    });
                    // _.each(response.tipo_servicio, function (item) {
                    //     id_tipo.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    // });
                    idDocumentoCli.append('<option value="">Seleccionar</option>');
                    _.each(response.tipo_document, function (item) {
                        idDocumentoCli.append('<option value="' + item.Codigo + '">' + item.TipoDocumento + '</option>');
                    });
                    id_tipoDoc_Venta_or.append('<option value="">Seleccionar</option>');
                    _.each(response.tipo_document_venta, function (item) {
                        id_tipoDoc_Venta_or.append('<option value="' + item.IdTipoDocumento + '">' + item.Descripcion + '</option>');
                    });
                    id_tipoDoc_Venta.append('<option value="">Seleccionar</option>');
                    _.each(response.tipo_document_venta, function (item) {
                        id_tipoDoc_Venta.append('<option value="' + item.IdTipoDocumento + '">' + item.Descripcion + '</option>');
                    });
                    // gru_revisiones.append('<option value="" selected>Seleccionar </option>');
                    // _.each(response.revisiones, function (item) {
                    //     gru_revisiones.append('<option value="' + item.id + '*' + item.nombre + '*' + item.mo_revision + '*' + item.mo_mecanica + '*' + item.terceros + '*' + item.otros_mo + '*' + item.repuestos + '*' + item.accesorios + '*' + item.lubricantes + '*' + item.otros_rep + '">' + item.nombre + '</option>');
                    // });
                    // idTecnico.append('<option value="">Seleccionar</option>');
                    // _.each(response.tecnico, function (item) {
                    //     idTecnico.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    // });
                    // idAsesor.append('<option value="">Seleccionar</option>');
                    // _.each(response.asesor, function (item) {
                    //     idAsesor.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    // });
                    // id_tipomant.append('<option value="">Seleccionar</option>');
                    // _.each(response.tipoMantenimiento, function (item) {
                    //     id_tipomant.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    // });

                    // servicios = response.servicios;
                    idMoneda.append('<option value="">Seleccionar</option>');
                    _.each(response.moneda, function (item) {
                        idMoneda.append('<option data-simbolo="' + item.Simbolo + '" value="' + item.IdMoneda + '">' + item.Descripcion + '</option>');
                    });

                    idconvenio.append('<option value="">Seleccionar</option>');
                    _.each(response.convenios, function (item) {
                        idconvenio.append('<option value="' + item.idconvenio + '">' + item.descripcionconvenio + '</option>');
                    });

                    idvendedor.append('<option value="">Seleccionar</option>');
                    _.each(response.vendedores, function (item) {
                        idvendedor.append('<option  value="' + item.idvendedor + '">' + item.descripcion + '</option>');
                    });

                    // $("#idconyugue").append('<option value="">Seleccionar</option>');
                    // _.each(response.personas, function (item) {
                    //     $("#idconyugue").append('<option value="' + item.idPersona + '">' + item.cNombres + ' ' + item.cApepat + ' ' + item.cApemat + '</option>');
                    // });

                    // $("#idfiador").append('<option value="">Seleccionar</option>');
                    // _.each(response.personas, function (item) {
                    //     $("#idfiador").append('<option value="' + item.idPersona + '">' + item.cNombres + ' ' + item.cApepat + ' ' + item.cApemat + '</option>');
                    // });

                    // $("#idfiadorconyugue").append('<option value="">Seleccionar</option>');
                    // _.each(response.personas, function (item) {
                    //     $("#idfiadorconyugue").append('<option value="' + item.idPersona + '">' + item.cNombres + ' ' + item.cApepat + ' ' + item.cApemat + '</option>');
                    // });
                    // totales = response.totales;
                    // tipo_totales_slec.append('<option value="">Tipo</option>');
                    // _.each(response.totales, function (item) {
                    //     tipo_totales_slec.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    // });




                    AlmacenesSele = response.almacen_usuario;
                    LotesSele = response.lotes;
                    DescuentosSele = response.descuentos;



                }
            }, function () {
                obtener_data_for_solicitud();
            });
        }

        obtener_data_for_solicitud();



        // CLIENTES 
        var btn_editar_cliente = $("#btn_editar_cliente");
        var cEstadoCivil = $("#cEstadoCivil");
        btn_editar_cliente.click(function (e) {
            if (cliente_id_or.val() == '') {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe seleccionar un cliente',
                    type: 'info'
                });
            } else {
                titleModalClientes.html('Editar Cliente');
                var id = cliente_id_or.val();
                RESTService.get('aprobacionSolicituds/findCustomer', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var data_p = response.data;
                        tipodoc.val(data_p[0].tipodoc).trigger('change');
                        razonsocial_cliente.val(data_p[0].razonsocial_cliente);
                        documento.val(data_p[0].documento);
                        contacto.val(data_p[0].contacto);
                        direccion.val(data_p[0].direccion);
                        correo_electronico.val(data_p[0].correo_electronico);
                        celular.val(data_p[0].celular);
                        telefono.val(data_p[0].telefono);
                        cEstadoCivil.val(data_p[0].cEstadoCivil);
                        cliente_id.val(data_p[0].id);
                        id_tipocli.val(data_p[0].id_tipocli).trigger('change');
                        id_tipoDoc_Venta.val(data_p[0].IdTipoDocumento).trigger("change");
                        getDepartamento(data_p[0].cDepartamento);
                        getProvincia(data_p[0].cProvincia, data_p[0].cDepartamento);
                        getDistrito(data_p[0].cCodUbigeo, data_p[0].cProvincia);
                        modaClientes.modal('show');
                        console.log(data_p);
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al obtener el Cliente. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            }
        });

        // PERSONAS

        var modalPersona = $("#modalPersona");
        var titleModalPersona = $("#titleModalPersona");
        var idPersona = $("#idPersona");
        var cTipopersona = $("#cTipopersona");
        var cDireccion = $("#cDireccion");
        var cReferencia = $("#cReferencia");
        var cDigitoVerificador = $("#cDigitoVerificador");
        var cTipodocumento = $("#cTipodocumento");
        var cNumerodocumento = $("#cNumerodocumento");
        var dFechacaducidad = $("#dFechacaducidad");
        var cRegion = $("#cRegion");
        var cProvincia = $("#cProvincia");
        var cUbigeo = $("#cUbigeo");
        var cEmail = $("#cEmail");
        var cCelular = $("#cCelular");
        var dFechanacimiento = $("#dFechanacimiento");
        var cEstadoCivil = $("#cEstadoCivil");
        var cApepat = $("#cApepat");
        var cApemat = $("#cApemat");
        var cNombres = $("#cNombres");
        var cRazonsocial = $("#cRazonsocial");
        var cNombrePersona = $("#cNombrePersona");
        var cSexo = $("#cSexo");
   

        $(".btn-editar-persona").click(function (e) {
            var tipo = $(this).data("tipo");
            // alert(tipo );
            if ($("#id" + tipo).val() == '') {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe seleccionar un ' + tipo,
                    type: 'info'
                });
            } else {
                var id = $("#id" + tipo).val();
                // alert(id);
                findPersona(id);
            }
        });
         btn_Rechazar.click(function (e) {
                  $("#LoadRecordsButtonAsignacioncobrador").click(); 
                    titleModalProduct.html("Rechazar");
                    estadoApro.val("2");
                    modalAprobar.modal('show');
        });
          btn_observacion.click(function (e) {
                    modalObservacion.modal('show');
        });
         btn_Aprobar.click(function (e) {
                 $("#LoadRecordsButtonAsignacioncobrador").click(); 
                 // $('#LoadRecordsButtonAsignacioncobrador').jtable('load');
                    titleModalProduct.html("Aprobar");
                    estadoApro.val("1");
                    modalAprobar.modal('show');
        
        });
                
        function addToDetaApro(TipoDocumento,Serie,Nr,cliente,saldo,moneda,codConse,nConse,fecha_emi,condicion_pago_text,t_monto_total,pagado ){
                var tr = $('<tr id="tr_contDetalle"></tr>');
                var tdA = $('<td>' + codConse + '</td>');
                var tdB = $('<td>' + nConse + '</td>');
                var tdC = $('<td>' + moneda + '</td>');
                var tdD = $('<td>' + fecha_emi + '</td>');
                var td1 = $('<td >' + TipoDocumento + '</td>');
                var td11 = $('<td>' + condicion_pago_text + '</td>');
                var td2 = $('<td>' + Serie + '</td>');
                var td3 = $('<td>' + Nr + '</td>');
                var td4 = $('<td>' + cliente + '</td>');
                var td41 = $('<td>' + t_monto_total + '</td>');
                var td42 = $('<td>' + pagado + '</td>');
                var td5 = $('<td>' + saldo + '</td>');
                tr.append(tdA).append(tdB).append(tdC).append(tdD).append(td1).append(td11).append(td2).append(td3).append(td4).append(td41).append(td42).append(td5);
                aprobacion_ventas.append(tr);
        }
        function findPersona(id) {
            titleModalPersona.html('Editar Persona');
            RESTService.get('aprobacionSolicituds/findPersona', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;


                    idPersona.val(data_p[0].idPersona);
                    cTipopersona.val(data_p[0].cTipopersona).trigger('change');
                    cDireccion.val(data_p[0].cDireccion);
                    cReferencia.val(data_p[0].cReferencia);
                    cDigitoVerificador.val(data_p[0].cDigitoVerificador);
                    cTipodocumento.val(data_p[0].cTipodocumento).trigger('change');;
                    cNumerodocumento.val(data_p[0].cNumerodocumento);
                    dFechacaducidad.val(data_p.dFechacaducidad2);

                    cEmail.val(data_p[0].cEmail);
                    cCelular.val(data_p[0].cCelular);
                    dFechanacimiento.val(data_p.dFechanacimiento2);
                    cEstadoCivil.val(data_p[0].cEstadoCivil).trigger('change');;
                    cApepat.val(data_p[0].cApepat);
                    cApemat.val(data_p[0].cApemat);
                    cNombres.val(data_p[0].cNombres);
                    cRazonsocial.val(data_p[0].cRazonsocial);
                    cNombrePersona.val(data_p[0].cNombrePersona);
                    cSexo.val(data_p[0].cSexo);

                    getDepartamentoPersona(data_p[0].cDepartamento);
                    getProvinciaPersona(data_p[0].cProvincia, data_p[0].cDepartamento);
                    getDistritoPersona(data_p[0].cCodUbigeo, data_p[0].cProvincia);

                    modalPersona.modal('show');
                    console.log(data_p);
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Cliente. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        documento_or.keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                getCliente();
            }
        });

        $(".documento-persona").keypress(function (e) {

            var tipo = $(this).data("tipo");
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                getPersona(tipo);
            }
        });



        btn_save_cliente.click(function (e) {
            saveCliente();
        });
        btn_guardarObservacion.click(function (e) {
            var bval = true;
            bval = bval && comentario_aprobacion.required();
            if (bval) {
                var params = {
                    'comentario_aprobacion': comentario_aprobacion.val(),
                };
                var cli_id =cCodConsecutivo.val()+'_'+nConsecutivo.val();

                RESTService.updated('aprobacionSolicituds/updateComentarioAprobacion', cli_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                           AlertFactory.textType({
                                title: '',
                                message: 'El comentario se guardó correctamente',
                                type: 'success'
                            });
                            comentario_aprobacion_so.val(response.data_comentario);
                            modalObservacion.modal("hide");
                            comentario_aprobacion.val(""); 
                       // response.data_comentario;

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
        });

        function saveCliente() {
            var bval = true;
            bval = bval && tipodoc.required();
            bval = bval && documento.required();
            bval = bval && id_tipocli.required();
            bval = bval && id_tipoDoc_Venta.required();
            bval = bval && razonsocial_cliente.required();
            bval = bval && celular.required();
            bval = bval && distrito.required();
            if (tipodoc.val() == '01' && documento.val().length != 8) {
                AlertFactory.textType({
                    title: '',
                    message: 'Longitud de LE/DNI INCORRECTA',
                    type: 'info'
                });
                bval = false;
            };
            if (tipodoc.val() == '06' && documento.val().length != 11) {
                AlertFactory.textType({
                    title: '',
                    message: 'Longitud de RUC INCORRECTA',
                    type: 'info'
                });
                bval = false;
            };

            if (bval) {
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
                    'id_tipocli': id_tipocli.val(),
                    'IdTipoDocumento': id_tipoDoc_Venta.val(),
                    'cEstadoCivil': cEstadoCivil.val(),

                };
                var cli_id = (cliente_id.val() === '') ? 0 : cliente_id.val();
                RESTService.updated('aprobacionSolicituds/createClienteAproba', cli_id, params, function (response) {
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
        function getDataFormCustomer() {
            RESTService.all('aprobacionSolicituds/data_formCustomer', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var tip = response.tipoc_doc;
                    var tipo_clie = response.tipo_clie;
                    var tipo_persona = response.tipo_persona;

                    tipodoc.append('<option value="">Seleccionar</option>');
                    $("#cTipodocumento").append('<option value="">Seleccionar</option>');
                    $("#tipo_documento_conyugue").append('<option value="">Seleccionar</option>');
                    $("#tipo_documento_fiador").append('<option value="">Seleccionar</option>');
                    $("#tipo_documento_fiadorconyugue").append('<option value="">Seleccionar</option>');
                    tip.map(function (index) {
                        tipodoc.append('<option value="' + index.Codigo + '">' + index.TipoDocumento + '</option>');

                        $("#tipo_documento_conyugue").append('<option value="' + index.Codigo + '">' + index.TipoDocumento + '</option>');

                        $("#tipo_documento_fiador").append('<option value="' + index.Codigo + '">' + index.TipoDocumento + '</option>');

                        $("#tipo_documento_fiadorconyugue").append('<option value="' + index.Codigo + '">' + index.TipoDocumento + '</option>');

                        $("#cTipodocumento").append('<option value="' + index.Codigo + '">' + index.TipoDocumento + '</option>');
                    });

                    id_tipocli.append('<option value="">Seleccionar</option>');
                    tipo_clie.map(function (index) {
                        id_tipocli.append('<option value="' + index.id + '">' + index.descripcion + '</option>');

                        // id_tipocli.append('<option value="' + index.id + '">' + index.descripcion + '</option>');
                    });

                    $("#cTipopersona").append('<option value="">Seleccionar</option>');
                    tipo_persona.map(function (index) {
                        $("#cTipopersona").append('<option value="' + index.cCodigo + '">' + index.cDescripcion + '</option>');
                    });

                    id_cliente_tipo_or.append('<option value="">Seleccionar</option>');
                    tipo_clie.map(function (index) {
                        id_cliente_tipo_or.append('<option value="' + index.id + '">' + index.descripcion + '</option>');
                    });
                }
            }, function () {
                getDataFormCustomer();
            });
        }
        getDataFormCustomer();

        function getCliente() {
            var bval = true;
            bval = bval && documento_or.required();
            if (bval) {
                var id = documento_or.val();
                RESTService.get('aprobacionSolicituds/get_clienteAprobaciom', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var datos = response.data;
                        if (datos.length == 0) {
                            titleModalClientes.html('Nuevo Cliente');
                            modaClientes.modal('show');
                            var bandera = 'xxxxx';
                            getDepartamento(bandera);
                            distrito_ver.val("");
                            distrito_or.val("");
                            idDocumentoCli.val("");
                            razonsocial_cliente_or.val("");
                            documento.val(documento_or.val());
                            documento_or.val("");
                            contacto_or.val("");
                            direccion_or.val("");
                            correo_electronico_or.val("");
                            id_tipoDoc_Venta_or.val("").trigger('change');
                            celular_or.val("");
                            telefono_or.val("");
                            cliente_id_or.val("");
                            tipoCliente_or.val("");
                            id_tipocli.data("prev", id_cliente_tipo_or.val());
                            id_tipocli.val(id_cliente_tipo_or.val());
                            // id_cliente_tipo_or.val("")
                            // llenarServicios();
                        } else {
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
                            cliente_id_or.val(datos[0].idCliente);
                            tipoCliente_or.val(datos[0].tipo_cliente_descr).trigger('change');
                            id_cliente_tipo_or.val(datos[0].id_tipocli)
                            id_tipocli.data("prev", id_cliente_tipo_or.val());
                            id_tipoDoc_Venta_or.val(datos[0].IdTipoDocumento).trigger("change");
                            if (nConsecutivo.val() == "") {
                                id_tipoDoc_Venta_or.focus();
                            }



                   

                            // llenarServicios();

                        }
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error1 . Intente nuevamente.',
                            type: 'info'
                        });
                    }


                });
            }
        }



        function getPersona(tipo) {
            //    alert(tipo);
            var bval = true;
            bval = bval && $("#documento_" + tipo).required();
            if (bval) {
                var id = $("#documento_" + tipo).val();
                RESTService.get('aprobacionSolicituds/get_persona_documentoAprobac', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var datos = response.data;
                        if (datos.length == 0) {
                            console.log("entroooooooooooooooooooooooooooooooooooooooo");
                            $("#titleModalPersona").html('Nueva Persona');
                            $("#modalPersona").modal('show');
                            $("#formulario-persona").trigger("reset");
                            $("#tipo_persona").val(tipo);
                            var bandera = 'xxxxx';
                            getDepartamentoPersona(bandera);
                            $("#cNumerodocumento").val($("#documento_" + tipo).val());
                            $("#cNumerodocumento").focus();
                            $("." + tipo).val("");

                        } else {

                            // alert(tipo);
                            // alert(datos[0].cTipodocumento);
                            $("#tipo_documento_" + tipo).val(datos[0].cTipodocumento);
                            $("#id" + tipo).val(datos[0].idPersona);
                            // alert($("#nombres_" + tipo).val());
                            $("#nombres_" + tipo).val(datos[0].cNombres);
                            // alert(datos[0].cNombres);
                            // alert($("#nombres_" + tipo).val());
                            $("#apellido_paterno_" + tipo).val(datos[0].cApepat);
                            $("#apellido_materno_" + tipo).val(datos[0].cApemat);

                        }
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error2 . Intente nuevamente.',
                            type: 'info'
                        });
                    }


                });
            }
        }


        function getDepartamentoPersona(bandera) {
            var id = "0";
            RESTService.get('aprobacionSolicituds/TraerDepartamentosApro', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    cRegion.html('');
                    cRegion.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cDepartamento == bandera) {
                            cRegion.append('<option value="' + item.cDepartamento + '" selected >' + item.cDepartamento + '</option>');
                        } else {
                            cRegion.append('<option value="' + item.cDepartamento + '" >' + item.cDepartamento + '</option>');
                        };

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        function getProvinciaPersona(bandera, id) {
            RESTService.get('aprobacionSolicituds/TraerProvinciasAprob', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    console.log(data_p);
                    cProvincia.html('');
                    cProvincia.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cProvincia == bandera) {
                            cProvincia.append('<option value="' + item.cProvincia + '" selected>' + item.cProvincia + '</option>');
                        } else {
                            cProvincia.append('<option value="' + item.cProvincia + '">' + item.cProvincia + '</option>');
                        }

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error3 . Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        function getDistritoPersona(bandera, id) {
            RESTService.get('aprobacionSolicituds/TraerDistritosApro', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    console.log(data_p);
                    cUbigeo.html('');
                    cUbigeo.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cCodUbigeo == bandera) {
                            cUbigeo.append('<option value="' + item.cCodUbigeo + '" selected>' + item.cDistrito + '</option>');
                        } else {
                            cUbigeo.append('<option value="' + item.cCodUbigeo + '">' + item.cDistrito + '</option>');
                        }

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        cRegion.change(function () {
            var bandera = 'xxxxxx';
            var id = cRegion.val();
            getProvinciaPersona(bandera, id);
        });

        cProvincia.change(function () {
            var bandera = 'xxxxxx';
            var id = cProvincia.val();
            getDistritoPersona(bandera, id);

        });
        cNumerodocumento.keypress(function (e) {
            var bval = true;
            bval = bval && $("#cTipodocumento").required();
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                if (bval) {
                    $('#show_loading').removeClass('ng-hide');
                    getDatosPersona();
                }

            }
        });

        function getDatosPersona() {

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                // Si nada da error
                if (this.readyState == 4 && this.status == 200) {
                    // La respuesta, aunque sea JSON, viene en formato texto, por lo que tendremos que hace run parse
                    var data = JSON.parse(this.responseText);
                    console.log(data);
                    if (data.nombres != null) {
                        var razon = data.nombres + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno;
                        cApepat.val(data.apellidoPaterno);
                        cApemat.val(data.apellidoMaterno);
                        cNombrePersona.val(razon);
                        cNombres.val(data.nombres);
                    } else if (data.razonSocial != null) {
                        var razon = data.razonSocial;
                        var direc = data.direccion;
                        cRazonsocial.val(razon);
                        cDireccion.val(direc);
                    } else {
                        cDireccion.val('');
                        cRazonsocial.val('');
                        AlertFactory.textType({
                            title: '',
                            message: 'No se encontró datos de la persona',
                            type: 'info'
                        });
                        $('#show_loading').addClass('ng-hide');
                    };
                    $('#show_loading').addClass('ng-hide');
                }
            };
            if (cTipodocumento.val() == '01') {
                if (cNumerodocumento.val().length == 8) {
                    var dni = cNumerodocumento.val();
                    xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/dni/" + dni + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send();
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'dígitos del documento incompletos',
                        type: 'info'
                    });
                    cDireccion.val('');
                    cRazonsocial.val('');
                    $('#show_loading').addClass('ng-hide');
                }


            } else {
                if (cNumerodocumento.val().length == 11) {
                    var ruc = cNumerodocumento.val();
                    xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/ruc/" + ruc + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send();
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'dígitos del documento incompletos',
                        type: 'info'
                    });
                    cDireccion.val('');
                    cRazonsocial.val('');
                    $('#show_loading').addClass('ng-hide');

                }

            }

        }
        $scope.aprobarSolitud = function () {
            var bval = true;
            if (bval) {
                var params = {
                    'nCodConformidad': $("#nCodConformidad").val(),
                    'aprobaComentario': aprobaComentario.val(),
                    'iEstado': estadoApro.val(), 
                };
                var idPe =0;
                RESTService.updated('aprobacionSolicituds/AprobarRechazar', idPe, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var ms=response.msg;
                        console.log(ms);

                        if(response.conformidad.length > 0 && response.solicitud.length > 0) {
                            if(response.solicitud[0].tipo_solicitud == 2 && ms == "Aprobada") {

                               

                                var id = response.conformidad[0].cCodConsecutivo + "|" + response.conformidad[0].nConsecutivo;

                                // window.open("movimientoCajas/imprimir_cronograma/" + id);
                                window.open("aprobacionSolicituds/imprimir_cronograma/" + id);


                            }
                          
                      
                        }   

                        if(ms!='OK'){
                            AlertFactory.textType({
                                title: '',
                                message: ms,
                                type: 'info'
                                });
                        }else{
                           AlertFactory.textType({
                                title: '',
                                message: 'El registro se guardó correctamente',
                                type: 'success'
                            });
                           
                            // $("#modalSolicitud").modal("hide");
                        }

                        modalAprobar.modal("hide"); 
                        $("#modalSolicitud").modal("hide");

                        btn_Aprobar.prop('disabled',true);
                        btn_Rechazar.prop('disabled',true);
                        LoadRecordsButtonAprobacionSolicitud.click(); 
                        // modalPersona.modal('hide');
                       
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar la persona. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });
            }
        }
        $scope.savePersona = function () {
            var bval = true;
            bval = bval && cTipopersona.required();
            bval = bval && cTipodocumento.required();
            bval = bval && cNumerodocumento.required();
            bval = bval && cDigitoVerificador.required();
            bval = bval && dFechacaducidad.required();


            // bval = bval && cReferencia.required();




            bval = bval && cRegion.required();
            bval = bval && cProvincia.required();
            bval = bval && cUbigeo.required();
            bval = bval && cCelular.required();
            bval = bval && cEmail.required();
            bval = bval && cDireccion.required();

            // bval = bval && dFechanacimiento.required();
            // bval = bval && cEstadoCivil.required();
            // bval = bval && cSexo.required();
            if (cTipodocumento.val() == '01' && cNumerodocumento.val().length != 8) {
                AlertFactory.textType({
                    title: '',
                    message: 'Longitud de LE/DNI INCORRECTA',
                    type: 'info'
                });
                bval = false;
            };
            if (cTipodocumento.val() == '06' && cNumerodocumento.val().length != 11) {
                AlertFactory.textType({
                    title: '',
                    message: 'Longitud de RUC INCORRECTA',
                    type: 'info'
                });
                bval = false;
            };
            if (bval) {
                var params = {
                    'cTipopersona': cTipopersona.val(),
                    'cDireccion': cDireccion.val(),
                    'cReferencia': cReferencia.val(),
                    'cDigitoVerificador': cDigitoVerificador.val(),
                    'cTipodocumento': cTipodocumento.val(),
                    'cNumerodocumento': cNumerodocumento.val(),
                    'dFechacaducidad': dFechacaducidad.val(),
                    'cRegion': cRegion.val(),
                    'cProvincia': cProvincia.val(),
                    'cUbigeo': cUbigeo.val(),
                    'cCelular': cCelular.val(),
                    'cEmail': cEmail.val(),
                    'dFechanacimiento': dFechanacimiento.val(),
                    'cEstadoCivil': cEstadoCivil.val(),
                    'cApepat': cApepat.val(),
                    'cApemat': cApemat.val(),
                    'cNombres': cNombres.val(),
                    'cRazonsocial': cRazonsocial.val(),
                    'cNombrePersona': cNombrePersona.val(),
                    'cSexo': cSexo.val(),

                };
                var idPe = (idPersona.val() === '') ? 0 : idPersona.val();
                RESTService.updated('aprobacionSolicituds/createPersonaAprobac', idPe, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // documento_or.val(documento.val());
                        getPersona($("#tipo_persona").val());
                        modalPersona.modal('hide');
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });
                        // LoadRecordsButtonPersona.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar la persona. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });
            }

        };
        function getDepartamento(bandera) {
            var id = "0";
            RESTService.get('aprobacionSolicituds/TraerDepartamentosApro', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    departamento.html('');
                    departamento.append('<option value="" selected >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cDepartamento == bandera) {
                            departamento.append('<option value="' + item.cDepartamento + '"  >' + item.cDepartamento + '</option>');
                        } else {
                            departamento.append('<option value="' + item.cDepartamento + '" >' + item.cDepartamento + '</option>');
                        };

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        departamento.change(function () {
            var bandera = 'xxxxxx';
            var id = departamento.val();
            getProvincia(bandera, id);
        });

        function getProvincia(bandera, id) {
            RESTService.get('aprobacionSolicituds/TraerProvinciasAprob', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;

                    provincia.html('');
                    provincia.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cProvincia == bandera) {
                            provincia.append('<option value="' + item.cProvincia + '" selected>' + item.cProvincia + '</option>');
                        } else {
                            provincia.append('<option value="' + item.cProvincia + '">' + item.cProvincia + '</option>');
                        }

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error4 . Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }

        provincia.change(function () {
            var bandera = 'xxxxxx';
            var id = provincia.val();
            getDistrito(bandera, id);

        });
        function getDistrito(bandera, id) {
            RESTService.get('aprobacionSolicituds/TraerDistritosApro', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;

                    distrito.html('');
                    distrito.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cCodUbigeo == bandera) {
                            distrito.append('<option value="' + item.cCodUbigeo + '" selected>' + item.cDistrito + '</option>');
                        } else {
                            distrito.append('<option value="' + item.cCodUbigeo + '">' + item.cDistrito + '</option>');
                        }

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }

        documento.keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                $('#show_loading').removeClass('ng-hide');
                getDatosCliente();
            }
        });
        function getDatosCliente() {
            // RESTService.get("https://dniruc.apisperu.com/api/v1/dni/71980490?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", '', function(response) {
            //            console.log(response);
            //          });
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                // Si nada da error
                if (this.readyState == 4 && this.status == 200) {
                    // La respuesta, aunque sea JSON, viene en formato texto, por lo que tendremos que hace run parse
                    var data = JSON.parse(this.responseText);
                    console.log(data);
                    if (data.nombres != null) {
                        var razon = data.nombres + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno;
                        razonsocial_cliente.val(razon);
                    } else if (data.razonSocial != null) {
                        var razon = data.razonSocial;
                        var direc = data.direccion;
                        razonsocial_cliente.val(razon);
                        direccion.val(direc);
                    } else {
                        razonsocial_cliente.val('');
                        direccion.val('');
                        AlertFactory.textType({
                            title: '',
                            message: 'No se encontró datos del cliente',
                            type: 'info'
                        });
                        $('#show_loading').addClass('ng-hide');
                    };
                    $('#show_loading').addClass('ng-hide');
                }
            };
            if (tipodoc.val() == '01') {
                if (documento.val().length == 8) {
                    var dni = documento.val();
                    xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/dni/" + dni + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send();
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'dígitos del documento incompletos',
                        type: 'info'
                    });
                    razonsocial_cliente.val('');
                    direccion.val('');
                    $('#show_loading').addClass('ng-hide');
                }


            } else {
                if (documento.val().length == 11) {
                    var ruc = documento.val();
                    xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/ruc/" + ruc + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send();
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'dígitos del documento incompletos',
                        type: 'info'
                    });
                    razonsocial_cliente.val('');
                    direccion.val('');
                    $('#show_loading').addClass('ng-hide');

                }

            }

        }

        var titlemodalMovimietoArticulo = $("#titlemodalMovimietoArticulo");
        var idenifcador_table_art = $("#idenifcador_table_art");
        var table_container_cc2;
        var modalMovimietoArticulo = $("#modalMovimietoArticulo");
        $scope.addArticulo = function () {
            var bval = true;
            // bval = bval && idTipoOperacion.required();
            if (!idMoneda.prop("disabled")) {
                bval = bval && idMoneda.required();
            }
            bval = bval && documento_or.required();
            bval = bval && razonsocial_cliente_or.required();
            if (bval) {
                // if(idMovimiento.val()==""){
                //     saveMovimientoCab(); 
                // }
                titlemodalMovimietoArticulo.html('Nuevo Articulo');


                if (idenifcador_table_art.val() != 'I') {
                    table_container_cc2.jtable('destroy');
                }
                cargartableMovAr();
                idenifcador_table_art.val("A");


                modalMovimietoArticulo.modal('show');

                $('#search_cc2').val('');
                $('#LoadRecordsButtonCC2').click();
                $('#search_cc22').val('');
                $('#LoadRecordsButtonCC22').click();
                $("#table_container_Register_Articulo .jtable-main-container .jtable-bottom-panel .jtable-left-area .jtable-goto-page select ").val("1").trigger("change");
            }



        }

        function cargartableMovAr() {
            var search_cc2 = getFormSearch('frm-search-cc2', 'search_cc2', 'LoadRecordsButtonCC2');
            table_container_cc2 = $("#table_container_Register_Articulo");
            table_container_cc2.jtable({
                title: "Lista de Articulos",
                paging: true,
                sorting: true,
                cache: false,
                actions: {
                    listAction: base_url + '/register_movements/getArticulosSelect'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_cc2
                    }]
                },
                fields: {
                    id: {
                        key: true,
                        create: false,
                        edit: false,
                        list: false
                    },
                    type_id: {
                        create: false,
                        edit: false,
                        list: false
                    },
                    serie: {
                        create: false,
                        edit: false,
                        list: false
                    },
                    lote: {
                        create: false,
                        edit: false,
                        list: false
                    },
                    code_article: {
                        title: 'Código'

                    },
                    description: {
                        title: 'Articulos'

                    },
                    // costo: {
                    //     title: 'costo'

                    // },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-costo="' + data.record.costo + '" data-name="' +
                                data.record.description + '" data-type="' + data.record.type_id + '"  data-serie="' + data.record.serie + '" data-lote="' + data.record.lote + '" data-code="' + data.record.id + '" data-impuesto="' + data.record.impuesto + '"><i class="fa fa-' +
                                icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_cc').click(function (e) {
                        var codigo = $(this).attr('data-code');
                        var descripcionArt = $(this).attr('data-name');
                        var idTipoArt = $(this).attr('data-type');
                        var serie = $(this).attr('data-serie');
                        var lote = $(this).attr('data-lote');
                        var costo = $(this).attr('data-costo');
                        var impuesto = $(this).attr('data-impuesto');

                        seleccionarModal(codigo, descripcionArt, idTipoArt, serie, lote, costo, impuesto);
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-cc2', 'LoadRecordsButtonCC2', function () {
                table_container_cc2.jtable('load', {
                    search: $('#search_cc2').val()
                });
            }, false);

        }

        var desProductoMss = $("#desProductoMss");
        var idProductoMss = $("#idProductoMss");
        var costoMK = $("#costoMK");
        var costoNa = $("#costoNa");
        var costoAS = $("#costoAS");
        var costoAL = $("#costoAL");
        var modalSerieR = $("#modalSerieR");

        var idProductoMN = $("#idProductoMN");
        var desProductoMN = $("#desProductoMN");
        var cantProductoMN = $("#cantProductoMN");
        var modalNada = $("#modalNada");

        cantProductoMN.keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                addArtNada();
            }
        });

        var aartMN = [];//arrays de nada 
        function addArtNada() {
            var bval = true;
            bval = bval && cantProductoMN.required();
            if (bval) {
                var codigo = Math.random().toString(36).substr(2, 18);
                var grubNa = {
                    'identificador': codigo,
                    'idProducto': idProductoMN.val(),
                }
                aartMN.push(grubNa);
                var ver = 'A';
                var tipoArt = 'NA';
                var codl = "";
                var datl = "";
                var idAlmacen = "";
                var idLocalizacion = "";
                var costo = costoNa.val();
                var costo_total = "";
                var precio = "";
                var precioTotal = "";

                var id_tipo_cliente = id_cliente_tipo_or.val();
                var id = idProductoMN.val() + "_" + id_tipo_cliente + "_" + idMoneda.val();
                // alert(id);
                RESTService.get('aprobacionSolicituds/get_precios_listAproba', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        if (response.newPrecio != "") {
                            precio = response.newPrecio;
                        }

                        var impuesto_articulo = $("#impuesto_articulo").val();
                        var lote_articulo = $("#lote_articulo").val();
                        var cOperGrat = "N"
                        var posee_serie = $("#posee-serie").val();
                        // alert("antes " + posee_serie);
                        addArticuloTable(idProductoMN.val(), desProductoMN.val(), cantProductoMN.val(), ver, codigo, tipoArt, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, precioTotal, impuesto_articulo, lote_articulo, cOperGrat, "", posee_serie);
                        modalNada.modal('hide');
                        modalMovimietoArticulo.modal('hide');
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error5 . Intente nuevamente.',
                            type: 'info'
                        });
                    }
                })


            }

        }

        $(document).on("change", "#id_tipoDoc_Venta_or, #id_tipoDoc_Venta", function () {
            var id_tipoDoc_Venta_or = $(this).val();
            if (id_tipoDoc_Venta_or == "01" && idDocumentoCli.val() != "06") {
                AlertFactory.textType({
                    title: '',
                    message: 'El Tipo Documento del Cliente debe ser R.U.C.',
                    type: 'info'
                });
                $(".btn_guardarOrden").attr("disabled", "disabled");
            } else {
                $(".btn_guardarOrden").removeAttr("disabled");
            }
        });

        function seleccionarModal(codigo, descripcionArt, idTipoArt, serie, lote, costo, impuesto) {
            // comentado por manuel 02/01/2022
            // alert("idTipoArt " + idTipoArt);
            // alert("lote " + lote);
            // alert("serie " + serie);
            // if (idTipoArt == '3') {
            //     modalKit.modal('show');
            //     $('#cantProductoMK').attr('onkeypress', 'return soloNumeros(event)');
            //     desProductoMK.val(descripcionArt);
            //     idProductoMK.val(codigo);
            //     costoMK.val(costo);
            // } else if (serie == '1') {
            //     // $('#cantProductoMS').attr('onkeypress','return soloNumeros(event)');
            //     // $('#anio_modeloMS').attr('onkeypress','return soloNumeros(event)');
            //     // $('#anio_fabricacionMS').attr('onkeypress','return soloNumeros(event)');
            //     desProductoMss.val(descripcionArt);
            //     idProductoMss.val(codigo);
            //     // var str2=idTipoOperacion.val();
            //     // var complet2=str2.split("*");
            //     // var nat2=complet2[1];
            //     costoAS.val(costo);
            //     // if(nat2=='S'){

            //     //     btnAgreSer.prop('disabled',true);
            //     //     btnAgreSer.trigger('change');
            //     // }else{
            //     //     btnAgreSer.prop('disabled',false);
            //     //     btnAgreSer.trigger('change');
            //     // }
            //     modalSerieR.modal('show');
            // } else if (lote == '1') {
            //     modalLoteR.modal('show');
            //     idProductoMll.val(codigo);
            //     desProductoMll.val(descripcionArt);
            //     costoAL.val(costo);
            // } else {
            $('#cantProductoMN').attr('onkeypress', 'return soloNumeros(event)');
            idProductoMN.val(codigo);
            desProductoMN.val(descripcionArt);
            $("#impuesto_articulo").val(impuesto);
            $("#lote_articulo").val(lote);
            $("#posee-serie").val(serie);
            // alert("focusss selectsssss");

            modalNada.modal('show');
            $("#cantProductoMN").focus();
            $("#cantProductoMN").select();
            costoNa.val(costo);

            // }

        }

        var table_serie_cabecera = $("#table_serie_cabecera");
        var articulo_serie_det = $("#articulo_serie_det");
        var cantProductoMss = $("#cantProductoMss");
        var identiSelec = "I";
        var aartMSN = [];//ARRAY DE series nueva
        var aartMSE = [];

         modalObservacion.on('hidden.bs.modal', function (e) {
          comentario_aprobacion.val("");
        });

        modalNada.on('hidden.bs.modal', function (e) {
            cleanArtNada();
        });

        function cleanArtNada() {
            idProductoMN.val("");
            desProductoMN.val("");
            cantProductoMN.val(1);

        }

        $scope.addSeleccSerie = function () {
            table_serie_cabecera.html("");
            articulo_serie_det.html("");

            var bval = true;
            bval = bval && cantProductoMss.required();
            if (bval) {
                var id = idProductoMss.val() + '*' + cantProductoMss.val();
                RESTService.get('aprobacionSolicituds/validateCantSerieAproba', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        if (response.data == 'N') {
                            AlertFactory.textType({
                                title: '',
                                message: 'No hay series de este Artículo ',
                                type: 'info'
                            });
                        }
                        else if (response.data == 'S') {
                            AlertFactory.textType({
                                title: '',
                                message: 'Existen solo ' + response.cantidad + ' series de este Artículo . Ingrese Nueva cantidad.',
                                type: 'info'
                            });
                        } else {
                            identiSelec = "A";
                            // console.log(aartMSE);
                            cargarTableSerie(idProductoMss.val(), aartMSE);
                            btn_serC.prop('disabled', false);
                            btn_serC.trigger('change');

                        }
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Nose pudo obtener las Series . Intente nuevamente.',
                            type: 'info'
                        });
                    }
                });


            }
        }

        var cont_check = 0;
        var cont_table = 0;
        var table_container_cc4;
        var naturalezaGeneral;
        var btn_serC = $("#btn_serC");
        var identSerAr = $("#identSerAr");//identificador para modificar el array de series esxisten

        function cargarTableSerie(idProducto, aarraySe) {
            cont_check = 0;
            identiSelec = "A";
            var search_cc4 = getFormSearch('frm-search-cc4', 'search_cc4', 'LoadRecordsButtonCC4');
            table_container_cc4 = $("#table_container_Series_Articulo");
            var url = 'getProductoSerieAproba';
            if (naturalezaGeneral == "S") {
                url = 'getProductoSerieStockAproba';
            };
            table_container_cc4.jtable({
                title: "Lista de Series",
                paging: true,
                sorting: true,
                actions: {
                    listAction: function (postData, jtParams) {
                        return $.Deferred(function ($dfd) {
                            $.ajax({
                                url: base_url + '/aprobacionSolicituds/' + url,
                                type: 'POST',
                                dataType: 'json',
                                data: { postData: postData, idProducto: idProducto },
                                success: function (data) {
                                    $dfd.resolve(data);
                                },
                                error: function () {
                                    $dfd.reject();
                                }
                            });
                        });
                    }
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_cc4
                    }]
                },
                fields: {
                    idSerie: {
                        key: true,
                        create: false,
                        edit: false,
                        list: false
                    },
                    serie: {
                        create: false,
                        edit: false,
                        title: 'N° Serie'
                    },
                    chasis: {
                        create: false,
                        edit: false,
                        title: 'Chasis'

                    },
                    motor: {
                        create: false,
                        edit: false,
                        title: 'Motor'

                    },
                    anio_fabricacion: {
                        title: 'Año de Fabricación'
                    },
                    anio_modelo: {
                        title: 'Año de Modelo'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            var ichc = 'N';
                            if (identSerAr.val() != "") {
                                console.log("entro");
                                aartMSE.map(function (index) {
                                    if (data.record.serie == index.serie && identSerAr.val() == index.identificador) {
                                        ichc = 'A';
                                    }
                                });
                                if (ichc == 'A') {
                                    cont_check = cont_check + 1;
                                    ichc = 'N';
                                    return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="' + data.record.idSerie + '" data-code="' + data.record.serie + '" checked ></label>';
                                } else {
                                    return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="' + data.record.idSerie + '" data-code="' + data.record.serie + '"  ></label>';
                                }
                            } else {
                                return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="' + data.record.idSerie + '" data-code="' + data.record.serie + '"  ></label>';
                            }


                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    // $('.select_cc').click(function(e){
                    //     var codigo = $(this).attr('data-code');
                    //     var descripcionArt = $(this).attr('data-name');
                    //     var idTipoArt = $(this).attr('data-type');
                    //     var serie = $(this).attr('data-serie');
                    //     var lote = $(this).attr('data-lote');
                    //     e.preventDefault();
                    // });

                    $('.i-checks').iCheck({
                        checkboxClass: 'icheckbox_square-green'
                    }).on('ifChanged', function (event) {
                        if ($(this).prop('checked')) {
                            cont_check = cont_check + 1
                        } else {
                            cont_check = cont_check - 1;
                        };
                        var codigo = $(this).attr('data-code');

                        // $(event.target).click();
                    });

                }
            });

            generateSearchForm('frm-search-cc4', 'LoadRecordsButtonCC4', function () {
                table_container_cc4.jtable('load', {
                    search: $('#search_cc4').val()
                });
            }, true);
        }

        $scope.addSerieCompleTab = function () {
            var bval = true;
            var cant = cantProductoMss.val();
            var series_id = [];
            var articulos_id = [];
            bval = bval && cantProductoMss.required();
            if (bval) {
                // alert(identiSelec);
                if (identiSelec == "A") {
                    var conta1 = 0;
                    $(".valcheck:checked").each(function () {
                        conta1 = conta1 + 1
                    });
                    if (cant == conta1) {
                        if (identSerAr.val() != "") {
                            var updteSe = aartMSE.filter(function (car) {
                                return car.identificador !== identSerAr.val();
                            })
                            aartMSE = updteSe;
                            $(".check:checkbox:checked").each(function () {
                                var grubSE = {
                                    'identificador': identSerAr.val(),
                                    'idProducto': idProductoMss.val(),
                                    'serie': $(this).attr('data-code'),
                                    'idSerie': $(this).attr('data_idSerie'),
                                    'cantidad': cantProductoMss.val(),
                                }
                                series_id.push($(this).attr('data_idSerie'));
                                articulos_id.push(idProductoMss.val());
                                aartMSE.push(grubSE);
                            });
                            $("#tr_idArticulo" + identSerAr.val()).find("td:eq(3)").children("p").text(cantProductoMss.val());
                            $("#tr_idArticulo" + identSerAr.val()).find("td:eq(3)").children("input").val(cantProductoMss.val());
                            modalSerieR.modal("hide");
                            modalMovimietoArticulo.modal("hide");
                        } else {
                            var vers = 'N';
                            //var codigoLSr = Math.random().toString(36).substr(2, 18);
                            var codigoLSr = $("#codigo-tr").val();
                            // alert(codigoLSr);
                            var tipoArtLSr = 'SE';
                            $(".check:checkbox:checked").each(function () {
                                var grubSE = {
                                    'identificador': codigoLSr,
                                    'idProducto': idProductoMss.val(),
                                    'serie': $(this).attr('data-code'),
                                    'idSerie': $(this).attr('data_idSerie'),
                                    'cantidad': cantProductoMss.val(),
                                }
                                series_id.push($(this).attr('data_idSerie'));
                                articulos_id.push(idProductoMss.val());
                                aartMSE.push(grubSE);
                            });
                            var codl = "";
                            var datl = "";
                            var idAlmacen = "";
                            var idLocalizacion = "";
                            var costo = costoAS.val();
                            var costo_total = "";
                            var precio = "";
                            var precioTotal = "";
                            // addArticuloTable(idProductoMss.val(), desProductoMss.val(), cantProductoMss.val(), vers, codigoLSr, tipoArtLSr, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, precioTotal);
                            modalSerieR.modal("hide");
                            modalMovimietoArticulo.modal("hide");

                        }



                        $("#tr_idArticulo" + codigoLSr).find("td").eq(0).append('<input type="hidden" name="series_id[]" value="' + series_id.join(",") + '" />');
                        $("#tr_idArticulo" + codigoLSr).find("td").eq(0).append('<input type="hidden" name="articulos_id[]" value="' + articulos_id.join(",") + '" />');
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Las series seleccionadas debe ser igual a la cantidad',
                            type: 'info'
                        });
                    }
                }
                else {


                    var camposunicos = [];
                    var vali = "";

                    for (var i = 0; i < cant; i++) {
                        var ident = "#s_serie" + i;
                        var ident = $(ident);
                        bval = bval && ident.required();
                    }
                    for (var i = 0; i < cant; i++) {
                        var ident = "#s_serie" + i;
                        var ident = $(ident).val();
                        camposunicos.push(ident);
                    }
                    for (var i = 0; i < cant; i++) {
                        var ident = "#s_serie" + i;
                        var ident = $(ident).val();
                        var ctr = 0;
                        for (var e in camposunicos) {
                            if (camposunicos[e] == ident) {
                                ctr = ctr + 1;
                                if (ctr == 2) {
                                    vali = ident;
                                    break;
                                }
                            }

                        }
                    }
                    if (vali != "") {
                        AlertFactory.textType({
                            title: '',
                            message: 'La serie ' + vali + ' ya existe en esta lista',
                            type: 'info'
                        });
                        return false;
                    }
                    var validaSerie = "";
                    var val = "";
                    for (var i = 0; i < cant; i++) {
                        var ident = "#s_serie" + i;
                        var ident = $(ident);

                        validaSerie = aartMSN.map(function (index) {
                            if (identSerAr.val() != '') {

                                if (index.serie == ident.val()) {

                                    if (index.identificador != identSerAr.val()) {

                                        if (val == "") {

                                            val = index.serie;
                                        }
                                    }
                                }
                            } else {
                                if (index.serie == ident.val()) {
                                    if (val == "") {

                                        val = index.serie;
                                    }
                                }
                            }

                        })
                    }
                    if (val != "") {
                        AlertFactory.textType({
                            title: '',
                            message: 'La serie ' + val + ' ya existe en este movimiento',
                            type: 'info'
                        });
                        return false;
                    };

                    if (bval) {
                        camposunicos = camposunicos.join(',');
                        RESTService.get('aprobacionSolicituds/valida_series_serveAproba', camposunicos, function (response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                if (cant == cont_table) {
                                    if (identSerAr.val() != "") {
                                        var updteSN = aartMSN.filter(function (car) {
                                            return car.identificador !== identSerAr.val();
                                        })
                                        aartMSN = updteSN;
                                        for (var i = 0; i < cant; i++) {
                                            var grubSN = {
                                                'identificador': identSerAr.val(),
                                                'idProducto': idProductoMss.val(),
                                                'serie': $("#s_serie" + i).val(),
                                                'chasis': $("#s_chasis" + i).val(),
                                                'motor': $("#s_motor" + i).val(),
                                                'anio_fabricacion': $("#s_aniof" + i).val(),
                                                'anio_modelo': $("#s_aniom" + i).val(),
                                                'color': $("#s_color" + i).val(),
                                                'idTipoCompraVenta': $("#s_tipoCompra" + i).val(),
                                                'nPoliza': $("#s_nroPoliza" + i).val(),
                                                'nLoteCompra': $("#s_nroLote" + i).val(),
                                            }
                                            aartMSN.push(grubSN);
                                        }
                                        $("#tr_idArticulo" + identSerAr.val()).find("td:eq(3)").children("p").text(cantProductoMss.val());
                                        $("#tr_idArticulo" + identSerAr.val()).find("td:eq(3)").children("input").val(cantProductoMss.val());
                                        modalSerieR.modal("hide");
                                        modalMovimietoArticulo.modal("hide");

                                    } else {
                                        var ver = 'N';
                                        var codigoLr = Math.random().toString(36).substr(2, 18);
                                        var tipoArtLr = 'SN';
                                        for (var i = 0; i < cant; i++) {
                                            var grubSN = {
                                                'identificador': codigoLr,
                                                'idProducto': idProductoMss.val(),
                                                'serie': $("#s_serie" + i).val(),
                                                'chasis': $("#s_chasis" + i).val(),
                                                'motor': $("#s_motor" + i).val(),
                                                'anio_fabricacion': $("#s_aniof" + i).val(),
                                                'anio_modelo': $("#s_aniom" + i).val(),
                                                'color': $("#s_color" + i).val(),
                                                'idTipoCompraVenta': $("#s_tipoCompra" + i).val(),
                                                'nPoliza': $("#s_nroPoliza" + i).val(),
                                                'nLoteCompra': $("#s_nroLote" + i).val(),
                                            }
                                            aartMSN.push(grubSN);
                                        }
                                        var codl = "";
                                        var datl = "";
                                        var codl = "";
                                        var datl = "";
                                        var idAlmacen = "";
                                        var idLocalizacion = "";
                                        var costo = costoAS.val();
                                        var costo_total = "";
                                        var precio = "";
                                        var precioTotal = "";
                                        // addArticuloTable(idProductoMss.val(), desProductoMss.val(), cantProductoMss.val(), ver, codigoLr, tipoArtLr, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, precioTotal);
                                        modalSerieR.modal("hide");
                                        modalMovimietoArticulo.modal("hide");
                                    }
                                } else {
                                    AlertFactory.textType({
                                        title: '',
                                        message: 'Las series  debe ser igual a la cantidad',
                                        type: 'info'
                                    });
                                }

                            } else {
                                var msg_ = (_.isUndefined(response.message)) ?
                                    'No se pudo guardar la Serie. Intente nuevamente.' : response.message;
                                AlertFactory.textType({
                                    title: '',
                                    message: msg_,
                                    type: 'info'
                                });

                            }
                        });


                    }
                }
            }


        }

        var articulo_mov_det = $("#articulo_mov_det");
        var LocalizacionesSele;//variable para guardar localizaciones del almacen




        function addArticuloTable(idProducto, desProducto, cantProducto, ver, codigo, tipo, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, presio_total, impuesto_articulo, lote_articulo, cOperGrat, iddescuento, posee_serie) {
            // alert("durante " + posee_serie);
            // var precio = 0;
            // if (response.newPrecio != "") {
            //     precio = response.newPrecio;
            // }

            // alert(precio);
            acodigos.push(codigo);
            // alert(costo+" c "+ costo_total+" c "+ precio);
            // console.log(idLocalizacion);
            var costonew = 0;
            var precionew = 0;

            if (costo != 0 || costo != "") {
                costonew = Number(costo);
            };
            if (precio != 0 || precio != "") {
                precionew = Number(precio);
            };

            var impor = Number(cantProducto) * Number(costonew);
            var pretotal = Number(cantProducto) * Number(precionew);
            // alert(pretotal);
            //  if(naturalezaGeneral=="C"){
            //     impor=0;
            //  }
           if (cOperGrat == "S") {
              pretotal=0;
           } 
            var tr = $('<tr id="tr_idArticulo' + codigo + '"></tr>');
            var td1 = $('<td>' + desProducto + '</td>');

            var td3;
            var inp3;
            // if(naturalezaGeneral=="S" || naturalezaGeneral=="A" ){
            //     var tdpr = $('<td></td>');
            //     var inpr = $('<input type="number" id="preMs_'+codigo+'" min="1" class="m_articulo_precio form-control input-sm" value="' + precionew + '" />');
            // }else{
            // precionew = "";
            var tdpr = $('<td><p>0</p></td>');
            var inpr = $('<input type="hidden"  name="porcentaje_descuento[]" id="preMs_' + codigo + '" min="1" class="m_articulo_precio form-control input-sm"  />');
            // }

            // if(naturalezaGeneral=="E" || naturalezaGeneral=="C"){
            //     var td4 = $('<td></td>');
            //     var inp4 = $('<input type="number" id="cosMs_'+codigo+'" min="1" class="m_articulo_costo form-control input-sm" value="' + costonew + '" />');
            // }else{
            var td4 = $('<td style="width: 40px !important;"><input style="width: 40px !important;" data-precioOrigen="' + precionew + '" impuesto_articulo="' + impuesto_articulo + '" name="precio_unitario[]" onkeypress="return validDecimals(event, this, 2)" type="text" codigo="' + codigo + '"  id="precio_unitario_' + codigo + '" min="1" class="m_articulo_precio_unitario form-control input-sm" value="' + precionew + '" /></td>');
            var inp4 = $('<input name="costo[]"  id="costo_' + codigo + '" type="hidden"   value="' + costonew + '" /><input name="costo_total[]" id="costo_total_' + codigo + '"  type="hidden" value="' + impor + '" />');
            // }

            // if(naturalezaGeneral=="C"){
            //     var tdy = $('<td></td>');
            //     var td2 = $('<td></td>');
            //     var inpy=$('<select  data-arts="'+idProducto+'" id="Al_'+codigo+'" data-idAraAl="'+codigo+'" class="m_articulo_idAlm form-control input-sm" disabled></select>');
            //     var inpl=$('<select id="'+codigo+'" data-idArl="'+idProducto+'" class="m_articulo_idLoc form-control input-sm" disabled ></select>');
            //     var td3 = $('<td><p></p></td>');
            //     var inp3 = $('<input type="hidden" id="canMs_'+codigo+'" class="m_articulo_cantidad" value="0" />');
            // }else{
            if (ver == 'A') {
                var td3 = $('<td style="width: 40px !important;" class="text-center"></td>');
                var inp3 = $('<input type="text" style="width: 40px !important;" id="canMs_' + codigo + '" codigo="' + codigo + '" onkeypress="return soloNumeros(event)" codigo="' + codigo + '" name="cantidad[]" class="m_articulo_cantidad form-control input-sm" value="' + cantProducto + '" />');
            } else {
                var td3 = $('<td style="width: 30px !important;"><p>' + cantProducto + '</p></td>');
                var inp3 = $('<input type="hidden" style="width: 30px !important;" id="canMs_' + codigo + '" class="m_articulo_cantidad"  impuesto_articulo="' + impuesto_articulo + '" codigo="' + codigo + '" name="cantidad[]" value="' + cantProducto + '" />');
            }
            var td2 = $('<td></td>');
            var tdy = $('<td></td>');
            var inpy = $('<select name="idalmacen[]" data-arts="' + idProducto + '" id="Al_' + codigo + '" data-idAraAl="' + codigo + '" class="m_articulo_idAlm form-control input-sm"></select>');
            var inpl = $('<select name="idlocalizacion[]" id="' + codigo + '" data-idArl="' + idProducto + '" class="m_articulo_idLoc form-control input-sm"></select>');

            var td_lote = $('<td></td>');
            var disabled_lote = "";
            if (lote_articulo == "0") {
                disabled_lote = 'disabled="disabled"';
            }

            var select_lote = $('<select ' + disabled_lote + ' name="idlote[]" id="lote_' + codigo + '" class="select_lote form-control input-sm" lote_articulo="' + lote_articulo + '"></select>');

            var td_descuentos = $('<td></td>');
            var select_descuento = $('<select impuesto_articulo="' + impuesto_articulo + '" name="iddescuento[]" codigo="' + codigo + '" id="descuento_' + codigo + '" class="select_descuento form-control input-sm"></select>');

            // }


            var td5 = $('<td><p>' + pretotal.toFixed(2) + '</p></td>');
            var tdpreT = $('<td><p></p></td>');

            var inp = $('<input type="hidden" class="m_articulo_id" name="idarticulo[]" posee-serie="' + posee_serie + '" value="' + idProducto + '"  cantidad="' + cantProducto + '" producto="' + desProducto + '" />');

            var inp5 = $('<input type="hidden" class="m_articulo_precioTotal" name="precio_total[]" codigo="' + codigo + '"  value="' + pretotal.toFixed(2) + '" />');
            var inpPreTo = $('<input type="hidden" class="m_articulo_montoDescuento" codigo="' + codigo + '"  name="monto_descuento[]" />');

            var op = $('<option value="" selected>Seleccione</option>');
            var fclt = $('<input type="hidden" class="m_codigo_lote" value="' + codl + '" />');
            var fdlt = $('<input type="hidden" class="m_dato_lote" value="' + datl + '" />');
            var identificador_serie_bd = $('<input type="hidden" class="identificador_serie_bd" value="' + codigo + '" />');
            td1.append(inp).append(fclt).append(fdlt).append(identificador_serie_bd);


            td2.append(inpy);
            tdy.append(inpl);
            td_lote.append(select_lote);
            td_descuentos.append(select_descuento);
            td3.append(inp3);
            td4.append(inp4);
            td5.append(inp5);
            tdpr.append(inpr);
            tdpreT.append(inpPreTo);
            // var td6 = $('<td class="text-center"></td>');
            // var btn1 = $('<button class="btn btn-info btn-xs verUpdate" title="ver" data-cantiShow="' + cantProducto + '" data-descrip="' + desProducto + '" data-idProducto="' + idProducto + '" data-tShow="' + tipo + '" data-idv="' + codigo + '" type="button"><span class="fa fa-eye"></span></button>');
            var td8 = $('<td class="text-center"></td>');

            var button_series = "";

            if (posee_serie == "1") {
                button_series = '&nbsp;&nbsp;<button data-cantidad="' + cantProducto + '" class="btn btn-success btn-xs agregar-series" data-tipo="' + tipo + '" title="Agregar Series" disabled data-id="' + codigo + '" data-idarticulo="' + idProducto + '" data-articulo="' + desProducto + '" data-costo="' + costo + '"  data-posee-serie="' + posee_serie + '" type="button"><span class="fa fa-plus"></span>&nbsp;Agregar Series</button>';
            }

            var desactivar_del = "";
            if($("#estado").val() == "4") {
                desactivar_del = 'disabled="disabled"';
            }

            var btn3 = $('<center><button '+desactivar_del+' class="btn btn-danger btn-xs delMovPro" disabled data-tipo="' + tipo + '" title="Eliminar" data-id="' + codigo + '" type="button"><span class="fa fa-trash"></span></button>' + button_series + '</center>');
            // td6.append(btn1);

            var monto_exonerado = 0;
            var monto_afecto = 0;
            var monto_inafecto = 0;
            var impuestos = 0;
            var valor_igv = parseFloat($("#valor_igv").val());
            var monto_subtotal = pretotal;
            // alert(impuesto_articulo);

            if (impuesto_articulo == "0") {
                monto_exonerado = pretotal;
            } else {
                // alert(valor_igv);
                monto_afecto = pretotal;
                impuestos = pretotal * valor_igv / 100;
                pretotal = pretotal + impuestos;
            }
             if (cOperGrat == "S") {
                     monto_exonerado = 0;
                     monto_afecto = 0;
                     monto_inafecto = 0;
                     impuestos = 0;
                     monto_subtotal=0;
            }
            var html = '<td codigo="' + codigo + '" class="monto_descuento_prorrateado"><p>0</p><input type="hidden" codigo="' + codigo + '" name="monto_descuento_prorrateado[]" value="0"></td>';
            html += '<td codigo="' + codigo + '" class="monto_subtotal"><p>' + monto_subtotal.toFixed(2) + '</p><input type="hidden" codigo="' + codigo + '" name="monto_subtotal[]" value="' + monto_subtotal.toFixed(2) + '"><input type="hidden" codigo="' + codigo + '" name="monto_subtotal_sin_descuento_prorrateado[]" value="' + monto_subtotal.toFixed(2) + '"></td>';

            html += '<td codigo="' + codigo + '" class="monto_exonerado"><p>' + monto_exonerado.toFixed(2) + '</p><input type="hidden" codigo="' + codigo + '" name="monto_exonerado[]" value="' + monto_exonerado.toFixed(2) + '"></td>';
            html += '<td codigo="' + codigo + '" class="monto_afecto"><p>' + monto_afecto.toFixed(2) + '</p><input type="hidden" codigo="' + codigo + '" name="monto_afecto[]" value="' + monto_afecto.toFixed(2) + '"></td>';
            html += '<td codigo="' + codigo + '" class="monto_inafecto"><p>' + monto_inafecto.toFixed(2) + '</p><input type="hidden" codigo="' + codigo + '" name="monto_inafecto[]" value="' + monto_inafecto.toFixed(2) + '"></td>';
            html += '<td codigo="' + codigo + '" class="impuestos"><p>' + impuestos.toFixed(2) + '</p><input type="hidden" codigo="' + codigo + '" name="impuestos[]" value="' + impuestos.toFixed(2) + '"></td>';
            html += '<td codigo="' + codigo + '" class="total"><p>' + pretotal.toFixed(2) + '</p><input type="hidden" codigo="' + codigo + '" name="monto_total[]" value="' + pretotal.toFixed(2) + '"></td>';

            var check = "";

            if (cOperGrat == "S") {
                check = "checked";
            }

            var disabled_check = "";
            if($("#estado").val() == "4") {
                disabled_check = 'disabled="disabled"';
            }
            var chek = $('<td><div class="col-sm-1"><label class="checkbox-inline i-checks"><input data-idCheck="' + codigo + '"  class="checkClass"  '+disabled_check+' type="checkbox" id="pOper' + codigo + '" ' + check + '  > <input type="hidden" name="cOperGrat[]" codigo="' + codigo + '" id="cOperGrat_' + codigo + '" /> <input type="hidden" name="nOperGratuita[]" codigo="' + codigo + '" id="nOperGratuita_' + codigo + '" /> </label></div></td>');


            td8.append(btn3);
            tr.append(td1).append(td2).append(tdy).append(td_lote).append(td3).append(td4).append(chek).append(td5).append(td_descuentos).append(tdpr).append(tdpreT).append(html).append(td8);
            articulo_mov_det.append(tr);
            addAlmaSelec(codigo);
            addlocSele(codigo);
            obtener_descuentos(codigo, idProducto);
            obtener_lotes(codigo);

            if (iddescuento != "") {
                $("#descuento_" + codigo).val(iddescuento).trigger("change");
            }


            $('.delMovPro').click(function (e) {
                var code = $(this).attr('data-id');
                var tip = $(this).attr('data-tipo');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este Artículo?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    if (tip == "NA") {
                        var arrTna = aartMN.filter(function (car) {
                            return car.identificador !== code;
                        })
                        aartMN = arrTna;
                    } else if (tip == "K") {
                        var arrTK = aartMK.filter(function (car) {
                            return car.identificador !== code;
                        })
                        aartMK = arrTK;
                    } else if (tip == "LE") {
                        var arrTLE = aartMLE.filter(function (car) {
                            return car.identificador !== code;
                        })
                        aartMLE = arrTLE;
                    } else if (tip == "LN") {
                        var arrTLN = aartML.filter(function (car) {
                            return car.identificador !== code;
                        })
                        aartML = arrTLN;
                    } else if (tip == "SN") {
                        var arrTSN = aartMSN.filter(function (car) {
                            return car.identificador !== code;
                        })
                        aartMSN = arrTSN;
                    } else if (tip == "SE") {
                        var arrTSE = aartMSE.filter(function (car) {
                            return car.identificador !== code;
                        })
                        aartMSE = arrTSE;
                    }
                    $('#tr_idArticulo' + code).remove();
                    calcular_totales();
                });
                e.preventDefault();
            });

            $('.addMovPro').click(function (e) {
                var idArticuloAl = $(this).attr('data-ida');
                modalAlmacenArticulo.modal('show');
                $('#search_cc3').val('');
                $('#LoadRecordsButtonCC3').click();
                e.preventDefault();
            });
            // $('.m_articulo_idLoc').change(function (e) {
            //     var idl = $(this).val();
            //     var idAl=$(this).attr('data-idArl');
            //     var stock=getStock(idl,idAl);
            //     e.preventDefault();
            // });
            $('.m_articulo_idAlm').change(function (e) {
                var idl = $(this).val();
                var ident = $(this).attr('data-idAraAl');
                var idPrAl = $(this).attr('data-arts');

                getLocaStock(idl, ident, idPrAl, idLocalizacion);
                e.preventDefault();
            });
            // $('.m_articulo_cantidad').keyup(function (e) {
            //     var cantidap = $(this).val();
            //     var costo = $(this).closest("tr").find("td:eq(4)").children("input").val();
            //     var importe = Number(cantidap) * Number(costo);
            //     $(this).closest("tr").find("td:eq(5)").children("p").text(importe.toFixed(2));
            //     $(this).closest("tr").find("td:eq(5)").children("input").val(importe.toFixed(2));
            //     if (naturalezaGeneral == "S" || naturalezaGeneral == "A") {
            //         var preciUni = $(this).closest("tr").find("td:eq(6)").children("input").val();
            //         var precioTotal = Number(cantidap) * Number(preciUni);
            //         $(this).closest("tr").find("td:eq(7)").children("p").text(precioTotal.toFixed(2));
            //         $(this).closest("tr").find("td:eq(7)").children("input").val(precioTotal.toFixed(2));
            //     }
            // })
            $('.m_articulo_precio').keyup(function (e) {
                var preciop = $(this).val();
                var cantidad = $(this).closest("tr").find("td:eq(3)").children("input").val();
                var precioTotal = Number(cantidad) * Number(preciop);
                $(this).closest("tr").find("td:eq(7)").children("p").text(precioTotal.toFixed(2));
                $(this).closest("tr").find("td:eq(7)").children("input").val(precioTotal.toFixed(2));
            })

            $('.m_articulo_precio').change(function (e) {
                var preciop = $(this).val();
                var cantidad = $(this).closest("tr").find("td:eq(3)").children("input").val();
                var precioTotal = Number(cantidad) * Number(preciop);
                $(this).closest("tr").find("td:eq(7)").children("p").text(precioTotal.toFixed(2));
                $(this).closest("tr").find("td:eq(7)").children("input").val(precioTotal.toFixed(2));
            })

            $('.m_articulo_costo').keyup(function (e) {
                var costop = $(this).val();
                var cantidad = $(this).closest("tr").find("td:eq(3)").children("input").val();
                var importe = Number(cantidad) * Number(costop);
                $(this).closest("tr").find("td:eq(5)").children("p").text(importe.toFixed(2));
                $(this).closest("tr").find("td:eq(5)").children("input").val(importe.toFixed(2));
            })
            $('#cosMs_' + codigo).change(function (e) {
                var costop = $(this).val();
                var cantidad = $(this).closest("tr").find("td:eq(3)").children("input").val();
                var importe = Number(cantidad) * Number(costop);
                $(this).closest("tr").find("td:eq(5)").children("p").text(importe.toFixed(2));
                $(this).closest("tr").find("td:eq(5)").children("input").val(importe.toFixed(2));
            })

            if (idAlmacen != "") {
                // alert(idAlmacen);
                $("#Al_" + codigo).val(idAlmacen).trigger('change');
                $("#" + codigo).val(idLocalizacion).trigger('change');

                $("#cosMs_" + codigo).val(Number(costo));
                var cos = Number(costo_total);
                $("#tr_idArticulo" + codigo).find("td:eq(5)").children("p").text(cos);
                $("#tr_idArticulo" + codigo).find("td:eq(5)").children("input").val(cos);
            };

            calcular_totales();

            if ($("#tipo_solicitud").val() == "2" || $("#tipo_solicitud").val() == "3") {
                $("#tipo_solicitud").trigger("change");
            }

            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green'
            }).on('ifChanged', function (event) {
                $(event.target).click();


                var codigo = $(this).data("idcheck");
                if ($("#pOper" + codigo).prop('checked')) {

                    $(".m_articulo_precioTotal[codigo='" + codigo + "']").val(0);
                    $(".m_articulo_precioTotal[codigo='" + codigo + "']").siblings("p").text(0);

                    $(".select_descuento[codigo='" + codigo + "']").val("");
                    $(".select_descuento[codigo='" + codigo + "']").attr("disabled", "disabled");
                    // console.log($(".select_descuento[codigo='" + codigo + "']")[0]);
                    $(".m_articulo_precio[codigo='" + codigo + "']").val(0);
                    $(".m_articulo_precio[codigo='" + codigo + "']").siblings("p").text(0);

                    $(".m_articulo_montoDescuento[codigo='" + codigo + "']").val(0);
                    $(".m_articulo_montoDescuento[codigo='" + codigo + "']").siblings("p").text(0);


                    $("input[name='monto_subtotal[]'][codigo=" + codigo + "]").val(0);
                    $(".monto_subtotal[codigo=" + codigo + "]").find("p").text(0);

                    $("input[name='monto_exonerado[]'][codigo=" + codigo + "]").val(0);
                    $(".monto_exonerado[codigo=" + codigo + "]").find("p").text(0);

                    $("input[name='monto_afecto[]'][codigo=" + codigo + "]").val(0);
                    $(".monto_afecto[codigo=" + codigo + "]").find("p").text(0);

                    $("input[name='monto_inafecto[]'][codigo=" + codigo + "]").val(0);
                    $(".monto_inafecto[codigo=" + codigo + "]").find("p").text(0);

                    $("input[name='impuestos[]'][codigo=" + codigo + "]").val(0);
                    $(".impuestos[codigo=" + codigo + "]").find("p").text(0);

                    $("input[name='monto_total[]'][codigo=" + codigo + "]").val(0);
                    $(".total[codigo=" + codigo + "]").find("p").text(0);

                    var cantidad = parseFloat($("input[name='cantidad[]'][codigo=" + codigo + "]").val());
                    var precio = parseFloat($("#precio_unitario_" + codigo).val());
                    // alert(cantidad);
                    // alert(precio);
                    var nOperGratuita = cantidad * precio;
                    $("input[name='nOperGratuita[]'][codigo=" + codigo + "]").val(nOperGratuita);
                    $("input[name='cOperGrat[]'][codigo=" + codigo + "]").val("S");

                } else {
                    // alert("hola");
                    $("#canMs_" + codigo).trigger("keyup");
                    $(".select_descuento[codigo='" + codigo + "']").removeAttr("disabled");
                    $("input[name='cOperGrat[]'][codigo=" + codigo + "]").val("N");
                    $("input[name='nOperGratuita[]'][codigo=" + codigo + "]").val(0);


                }

                calcular_totales();
            });







        }



        $(document).on("blur", "input[name='precio_unitario[]']", function () {
            // console.log("perdio");
            var preciofin = $(this).val();
            var precioOr = $(this).attr('data-precioorigen');
            var codigo = $(this).attr("codigo");
            // alert(precioOr);
            var newpp = Number(precioOr) + Number(redondeo);
            var newpn = Number(precioOr) - Number(redondeo);
            if (preciofin > newpp || preciofin < newpn) {
                AlertFactory.textType({
                    title: '',
                    message: 'El precio del producto solo se puede ajustar +- ' + redondeo,
                    type: 'info'
                });

                $(this).val(precioOr);


            }
            $("#canMs_" + codigo).trigger("keyup");
            // calcular_total_MO();
            // sumar_key();

        });


        $(document).on("click", ".agregar-series", function () {
            var costo = $(this).data("costo");
            var idarticulo = $(this).data("idarticulo");
            var articulo = $(this).data("articulo");
            var codigo_tr = $(this).data("id");
            var cantidad = $(this).data("cantidad");
            desProductoMss.val(articulo);
            idProductoMss.val(idarticulo);
            costoAS.val(costo);
            $("#codigo-tr").val(codigo_tr);
            modalSerieR.modal('show');
            // alert(cantidad);
            $("#cantProductoMss").val(cantidad);
            $("#cantProductoMss").focus();
            $("#cantProductoMss").select();
        });


        $(document).on("change", "#IdMoneda", function () {
            if ($(this).val() != "") {

                var simbolo = $(this).find("option[value=" + $(this).val() + "]").data("simbolo");
                // alert("hola " + simbolo);
                $(".simbolo-moneda").text(simbolo);
            }
        })

        function calcular_totales_detalle(codigo, impuesto_articulo) {
            var porcentaje_descuento = 0;
            var monto_descuento = 0;
            // var tipo_descuento = $(this).val();
            // var codigo = $(this).attr("codigo");
            // var impuesto_articulo = $(this).attr("impuesto_articulo");
            var idtipo = "";
            var descuento = 0;

            var precio_total = parseFloat($(".m_articulo_precioTotal[codigo='" + codigo + "']").val());
            
            //PRORRATEO EN CASO DE EXISTIR DESCUENTO SOBRE EL TOTAL
            var descuento_total = (!isNaN(parseFloat($("#t_monto_descuento").val()))) ? parseFloat($("#t_monto_descuento").val()) : 0;
            var monto_descuento_prorrateado = 0;
        
            var sum_precios = 0;
            $.each($("input[name='precio_unitario[]']"), function (indexInArray, precio_unitario) {
                // alert(typeof nOperGratuita.value);
                sum_precios += parseFloat(precio_unitario.value);

            });

            monto_descuento_prorrateado = precio_total * descuento_total / sum_precios;
            // alert(monto_descuento_prorrateado);
            $("input[name='monto_descuento_prorrateado[]'][codigo=" + codigo + "]").val(monto_descuento_prorrateado.toFixed(2));
            $(".monto_descuento_prorrateado[codigo=" + codigo + "]").find("p").text(monto_descuento_prorrateado.toFixed(2));
            
            var dom_descuento = $("#descuento_"+codigo);

            if (dom_descuento.val() != "") {
                porcentaje_descuento = parseFloat(dom_descuento.find("option[value=" + dom_descuento.val() + "]").attr("nPorcDescuento"));
                monto_descuento = parseFloat(dom_descuento.find("option[value=" + dom_descuento.val() + "]").attr("nMonto"));
                idtipo = dom_descuento.find("option[value=" + dom_descuento.val() + "]").attr("idtipo");
            }
            
            // alert(precio_total);
            if (idtipo == "P") {

                descuento = precio_total * porcentaje_descuento / 100;
            } else {
                descuento = monto_descuento;
            }

            // alert(descuento);

            $("#preMs_" + codigo).val(porcentaje_descuento);
            $("#preMs_" + codigo).siblings("p").text(porcentaje_descuento.toString());

            $(".m_articulo_montoDescuento[codigo='" + codigo + "']").val(descuento.toFixed(2));
            $(".m_articulo_montoDescuento[codigo='" + codigo + "']").siblings("p").text(descuento.toFixed(2));

            var nuevo_total = precio_total - descuento - monto_descuento_prorrateado;
           
            // alert(nuevo_total);

            var monto_exonerado = 0;
            var monto_afecto = 0;
            // var monto_inafecto = 0;
            var impuestos = 0;
            var valor_igv = parseFloat($("#valor_igv").val());
            var monto_subtotal = nuevo_total;

            if (impuesto_articulo == "0") {
                monto_exonerado = nuevo_total;
            } else {
                monto_afecto = nuevo_total;
                impuestos = nuevo_total * valor_igv / 100;
                nuevo_total = nuevo_total + impuestos;
            }

            var monto_subtotal_sin_descuento_prorrateado = precio_total - descuento;

            $("input[name='monto_exonerado[]'][codigo=" + codigo + "]").val(monto_exonerado.toFixed(2));
            $(".monto_exonerado[codigo=" + codigo + "]").find("p").text(monto_exonerado.toFixed(2));

            $("input[name='monto_subtotal[]'][codigo=" + codigo + "]").val(monto_subtotal.toFixed(2));
            $("input[name='monto_subtotal_sin_descuento_prorrateado[]'][codigo=" + codigo + "]").val(monto_subtotal_sin_descuento_prorrateado.toFixed(2));
            $(".monto_subtotal[codigo=" + codigo + "]").find("p").text(monto_subtotal.toFixed(2));

            $("input[name='monto_afecto[]'][codigo=" + codigo + "]").val(monto_afecto.toFixed(2));
            $(".monto_afecto[codigo=" + codigo + "]").find("p").text(monto_afecto.toFixed(2));

            $("input[name='impuestos[]'][codigo=" + codigo + "]").val(impuestos.toFixed(2));
            $(".impuestos[codigo=" + codigo + "]").find("p").text(impuestos.toFixed(2));

            $(".total[codigo=" + codigo + "]").find("p").text(nuevo_total.toFixed(2));
            $("input[name='monto_total[]'][codigo=" + codigo + "]").val(nuevo_total.toFixed(2));

        }

        $(document).on("change", ".select_descuento", function () {
        
            totalDescuento.trigger("change");

        });

        totalDescuento.change(function () {
            // var codigo=$(this).attr('data-desc');
            var val = $(this).val();
            var idtipo = "";
            var porTotal = 0.0;
            var code = "";
            var porc = 0;
            var mont = 0;
            if (val == "" || val == null) {

                porcentajeTotal.val(0);
                $("#t_monto_descuento").val(0);


            } else {
                // console.log(val);
                var arrayRe = val.split("*");
                code = arrayRe[0];
                porc = parseFloat(arrayRe[1]);
                mont = parseFloat(arrayRe[2]);
                // alert();


            }

            var total_sin_descuento_prorrateado = 0;

            $.each($("input[name='monto_subtotal_sin_descuento_prorrateado[]']"), function (indexInArray, monto_subtotal_sin_descuento_prorrateado) {
               
                total_sin_descuento_prorrateado += parseFloat(monto_subtotal_sin_descuento_prorrateado.value);

            });

            // alert(total_sin_descuento_prorrateado);

            idtipo = $(this).find("option[value='" + $(this).val() + "']").attr("idtipo");
            if (idtipo == "P") {

                porTotal = Number((Number(porc) * Number(total_sin_descuento_prorrateado)) / 100);
            } else {
                porTotal = mont;
            }

            // alert("desc " + porTotal.toFixed(2));
            $("#porcentajeTotal").val(porc);
            $("#t_monto_descuento").val(porTotal.toFixed(2));

            // var totalDes = parseFloat($("#desTotal").attr("importe_original"));
            // totalDes = Number(totalDes);

            // totalDes = totalDes - porTotal;

            // desTotal.val(totalDes.toFixed(2));
            calcular_totales();
            // $("#tipo_solicitud").trigger("change");
            // $("#cuota_inicial").trigger("keyup");
            // $("#nro_cuotas").trigger("keyup");

        });

        $(document).on("keyup", ".m_articulo_cantidad", function () {
            var cantidad = parseInt($(this).val());
            if (isNaN(cantidad)) {
                cantidad = 0;
            }

            var codigo = $(this).attr("codigo");
            var precio = parseFloat($("#precio_unitario_" + codigo).val());
            var precio_total = cantidad * precio;
            var costo = parseFloat($("#costo_" + codigo).val());


            var costo_total = cantidad * costo;
            // alert(precio_total);
            $("#costo_total_" + codigo).val(costo_total);
            $(".m_articulo_precioTotal[codigo='" + codigo + "']").val(precio_total.toFixed(2));
            $(".m_articulo_precioTotal[codigo='" + codigo + "']").siblings("p").text(precio_total.toFixed(2));
            $(".select_descuento").trigger("change");
        })

        function calcular_totales() {
            // console.log("hola s");
            // console.log($("input[name='monto_subtotal[]']").val());
            var t_monto_descuento = 0;
            var t_monto_subtotal = 0;
            var t_monto_exonerado = 0;
            var t_monto_afecto = 0;
            var t_monto_inafecto = 0;
            var t_impuestos = 0;
            var t_total = 0;
            var t_nOperGratuita = 0;

        
            $.each($("input[name='precio_unitario[]']"), function (indexInArray, precio_unitario) {
                // alert(typeof nOperGratuita.value);
                var codigo = precio_unitario.getAttribute("codigo");
                var impuesto_articulo = precio_unitario.getAttribute("impuesto_articulo");
                // console.log(precio_unitario);
                calcular_totales_detalle(codigo, impuesto_articulo);

            });

            $.each($("input[name='monto_descuento[]']"), function (indexInArray, monto_descuento) {
                t_monto_descuento += parseFloat(monto_descuento.value);

            });

            $.each($("input[name='monto_subtotal[]']"), function (indexInArray, monto_subtotal) {
                t_monto_subtotal += parseFloat(monto_subtotal.value);
            });

            $.each($("input[name='monto_exonerado[]']"), function (indexInArray, monto_exonerado) {
                t_monto_exonerado += parseFloat(monto_exonerado.value);
            });

            $.each($("input[name='monto_afecto[]']"), function (indexInArray, monto_afecto) {
                t_monto_afecto += parseFloat(monto_afecto.value);
            });

            $.each($("input[name='monto_inafecto[]']"), function (indexInArray, monto_inafecto) {
                t_monto_inafecto += parseFloat(monto_inafecto.value);
            });

            $.each($("input[name='impuestos[]']"), function (indexInArray, impuestos) {
                t_impuestos += parseFloat(impuestos.value);
            });

            $.each($("input[name='monto_total[]']"), function (indexInArray, total) {
                t_total += parseFloat(total.value);
                // alert(t_total);
            });

            $.each($("input[name='nOperGratuita[]']"), function (indexInArray, nOperGratuita) {
                // alert(typeof nOperGratuita.value);
                t_nOperGratuita += parseFloat(nOperGratuita.value);
            });
            // alert(t_nOperGratuita);
            if (isNaN(t_nOperGratuita)) {
                t_nOperGratuita = 0;
            }




            var descuento_total = (!isNaN(parseFloat($("#t_monto_descuento").val()))) ? parseFloat($("#t_monto_descuento").val()) : 0;

          

            // if(descuento_total > 0) {
            //     // alert(descuento_total);
            //     $.each($("input[name='precio_unitario[]']"), function (indexInArray, monto_descuento_prorrateo) {
            //         // alert(typeof nOperGratuita.value);
            //         var codigo = monto_descuento_prorrateo.getAttribute("codigo");
            //         // console.log(codigo);
            //         $(".select_descuento[codigo='"+codigo+"']").trigger("change");
            //     });
            // }

            // TOTALES CREDITO

            var monto_venta = t_total;
            var cuota_inicial = (!isNaN(parseFloat($("#cuota_inicial").val()))) ? parseFloat($("#cuota_inicial").val()) : 0;
            // alert(monto_venta);
            if ($("#tipo_solicitud").val() != "1") {
                $("#monto_venta").val(monto_venta.toFixed(2));
                $("#cuota_inicial").attr("max", monto_venta.toFixed(2));
                var total_financiado = monto_venta - cuota_inicial;
                $("#total_financiado").val(total_financiado.toFixed(2));
            }

            // MONTOS TOTALES DEL DETALLE
            $("#monto_descuento_detalle").val(t_monto_descuento.toFixed(2));
            $("#subtotal_detalle").val(t_monto_subtotal.toFixed(2));
            $("#monto_exonerado_detalle").val(t_monto_exonerado.toFixed(2));
            $("#monto_afecto_detalle").val(t_monto_afecto.toFixed(2));
            $("#monto_inafecto_detalle").val(t_monto_inafecto.toFixed(2));
            $("#impuestos_detalle").val(t_impuestos.toFixed(2));
            $("#monto_total_detalle").val(t_total.toFixed(2));


            // TOTALES FINALES
            var intereses = (!isNaN(parseFloat($("#intereses").val()))) ? parseFloat($("#intereses").val()) : 0;

            t_monto_subtotal = intereses + t_monto_subtotal;
            $("#t_monto_subtotal").val(t_monto_subtotal.toFixed(2)); // antes

            // alert("d" + t_monto_subtotal);
            // $("#t_monto_subtotal").val(t_monto_subtotal.toFixed(2));

            var monto_exonerado = 0;
            var monto_afecto = 0;
            var valor_igv = 0;
            var impuestos = 0;
            var total = 0;

            if (t_impuestos > 0) {
                valor_igv = parseFloat($("#valor_igv").val());
                impuestos = t_monto_subtotal * valor_igv / 100;
                monto_afecto = t_monto_subtotal;
            } else {
                monto_exonerado = t_monto_subtotal;
            }


            $("#t_monto_exonerado").val(monto_exonerado.toFixed(2));
            $("#t_monto_afecto").val(monto_afecto.toFixed(2));
            $("#t_monto_inafecto").val(t_monto_inafecto.toFixed(2));
            $("#t_impuestos").val(impuestos.toFixed(2));

            total = monto_exonerado + monto_afecto + t_monto_inafecto + impuestos;
            $("#desTotal").val(total.toFixed(2));
            // $("#desTotal").attr("importe_original", total.toFixed(2));
            $("#t_nOperGratuita").val(t_nOperGratuita.toFixed(2));
            // console.log(t_monto_descuento, t_monto_subtotal, t_monto_exonerado, t_monto_afecto, t_monto_inafecto, t_impuestos, t_total);


        }

        function addlocSele(codigo) {
            var idLocali = $("#" + codigo);
            idLocali.append('<option value="" selected>Seleccionar</option>');
            _.each(LocalizacionesSele, function (item) {
                idLocali.append('<option value="' + item.idLocalizacion + '" >' + item.descripcion + '</option>');
            });

        }
        function addAlmaSelec(codigo) {
            var idAlmacenSele = $("#Al_" + codigo);
            idAlmacenSele.append('<option value="" selected>Seleccionar</option>');
            _.each(AlmacenesSele, function (item) {
                idAlmacenSele.append('<option value="' + item.idAlmacen + '" >' + item.descripcion + '</option>');
            });
        }

        function obtener_lotes(codigo) {
            var idLoteSele = $("#lote_" + codigo);
            idLoteSele.append('<option value="" selected>Seleccionar</option>');
            _.each(LotesSele, function (item) {
                idLoteSele.append('<option  value="' + item.idLote + '" >' + item.Lote + '</option>');
            });
        }

        function obtener_descuentos(codigo, idarticulo) {
            var idDescSele = $("#descuento_" + codigo);
            var hoy = new Date();
            var hAnio = hoy.getFullYear();
            var hmes = hoy.getMonth() + 1;
            if (Number(hmes) < 10) {
                hmes = '0' + String(hmes);
            }

            var hdia = hoy.getDate();
            if (Number(hdia) < 10) {
                hdia = '0' + String(hdia);
            }
            var actu = hAnio + '-' + hmes + '-' + hdia;

            idDescSele.append('<option value="" selected>Seleccionar</option>');
            _.each(DescuentosSele, function (item) {
                // idDescSele.append('<option nPorcDescuento="' + item.nPorcDescuento + '" nMonto="' + item.nMonto + '" idTipo="' + item.idTipo + '" value="' + item.id + '" >' + item.descripcion + '</option>');

                var mo = idMoneda.val();
                if (item.nIdProducto == idarticulo || item.cTipoAplica == 'T') {
                    var por = Number(item.nPorcDescuento);
                    var monto = Number(item.nMonto);
                    if ((item.idMoneda == mo || item.nPorcDescuento != 0) && (item.nSaldoUso > 0 || item.nLimiteUso == 0) && item.cTipoAplica == 'L') {
                        if (item.dFecIni <= actu && item.dFecFin > actu) {
                            var valDes = item.id + '*' + por + '*' + monto;
                            // console.log(valDes,idDescuento);
                            // if(valDes==idDescuento){
                            //     selectDescuento.append('<option value="'+item.id+'*'+por+'*'+monto+'" selected>'+item.descripcion+'</option>');
                            // }else{
                            idDescSele.append('<option nPorcDescuento="' + item.nPorcDescuento + '" nMonto="' + item.nMonto + '" idTipo="' + item.idTipo + '" value="' + item.id + '" >' + item.descripcion + '</option>');
                            // }


                        }
                    }
                }
            });
        }



        function getLocaStock(idl, ident, idPrAl, idLocalizacion) {
            naturalezaGeneral = "S";
            var idLocali = $("#" + ident);
            var id = idl;
            // alert(id);
            RESTService.get('aprobacionSolicituds/getLocaStockAproba', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {

                    idLocali.html('');
                    idLocali.append('<option value="" selected>Seleccionar</option>');
                    _.each(response.LocalizacionAlmacen, function (itemdos) {
                        var stock = 0;
                        _.each(response.data, function (item) {
                            if (idPrAl == item.idArticulo && itemdos.idLocalizacion == item.idLocalizacion) {
                                stock = Math.trunc(item.total);
                            }
                        });
                        // console.log("hola", naturalezaGeneral);
                        if (naturalezaGeneral == "S") {
                            if (stock > 0) {
                                if (itemdos.idLocalizacion == idLocalizacion) {
                                    idLocali.append('<option selected value="' + itemdos.idLocalizacion + '" >' + itemdos.descripcion + ' / ' + stock + '</option>');
                                } else {
                                    idLocali.append('<option value="' + itemdos.idLocalizacion + '" >' + itemdos.descripcion + ' / ' + stock + '</option>');
                                }
                            }
                        } else {
                            if (itemdos.idLocalizacion == idLocalizacion) {

                                idLocali.append('<option selected value="' + itemdos.idLocalizacion + '" >' + itemdos.descripcion + ' / ' + stock + '</option>');
                            } else {

                                idLocali.append('<option value="' + itemdos.idLocalizacion + '" >' + itemdos.descripcion + ' / ' + stock + '</option>');
                            }
                        }
                    });
                } else {
                    
                    if($("#tipo_solicitud").val() == "1") {
                        if (naturalezaGeneral != 'C') {

                            AlertFactory.textType({
                                title: '',
                                message: 'No se pudo obtener las Localizaciones. Intente nuevamente.',
                                type: 'info'
                            });
                        }
                    }
                    
                }

            });
        }
        $scope.datos_credito = function () {
            // $("#idconyugue").focus();


            if (articulo_mov_det.html() == "") {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe ingresar al menos un articulo al detalle!',
                    type: 'info'
                });
                return false;
            }

            $("#modal-creditos").modal("show");
        }

        $(document).on("keyup", "#cuota_inicial", function () {
            // var cuota_inicial = parseFloat($(this).val());
            // var monto_venta = parseFloat($("#monto_venta").val());
            // if (isNaN(cuota_inicial)) {
            //     cuota_inicial = 0;
            // }

            // var total_financiado = monto_venta - cuota_inicial;
            // $("#total_financiado").val(total_financiado.toFixed(2));
            $("#nro_cuotas").trigger("keyup");
        });

        $(document).on("keyup", "#nro_cuotas", function () {
            var nro_cuotas = parseFloat($(this).val());
            var total_financiado = parseFloat($("#total_financiado").val());
            if (isNaN(nro_cuotas)) {
                nro_cuotas = 0;
            }

            $.post("aprobacionSolicituds/factor_credito", { nro_cuotas: nro_cuotas },
                function (data, textStatus, jqXHR) {
                    calcular_totales();
                    var porcentaje = 0;
                    var intereses = 0;
                    var valor_cuota = 0;

                    if (data.length > 0) {
                        porcentaje = parseFloat(data[0].porcentaje);
                    }

                    if (porcentaje > 0) {

                        valor_cuota = total_financiado * porcentaje;
                    } else {
                        valor_cuota = total_financiado / nro_cuotas;
                    }
                    // console.log(valor_cuota);
                    if (porcentaje > 0) {

                        intereses = (Math.ceil(valor_cuota) * nro_cuotas) - total_financiado;
                    }
                    // console.log(intereses);
                    $("#valor_cuota").val(Math.ceil(valor_cuota));
                    var nuevo_total = parseFloat($("#desTotal").val());
                    
                    // CALCULAR NUEVO IGV PARA VALOR CUOTA FINAL IGV
                    var t_impuestos = (!isNaN(parseFloat($("#t_monto_descuento").val()))) ? parseFloat($("#t_monto_descuento").val()) : 0;
                 
                    var valor_igv = parseFloat($("#valor_igv").val());
                    var valor_cuota_final = Math.ceil(valor_cuota);

                
                    if(t_impuestos > 0) {
                        valor_cuota_final = valor_cuota_final + (valor_cuota_final * valor_igv / 100);
                    }
                   

                    $("#intereses").val(intereses.toFixed(2));
                    $("#valor_cuota_final").val(valor_cuota_final.toFixed(2));
                    nuevo_total += intereses;
                    $("#desTotal").val(nuevo_total.toFixed(2));
                    // $("#desTotal").attr("importe_original", nuevo_total.toFixed(2));
                    totalDescuento.trigger("change");
                },
                "json"
            );

        });

        $scope.guardar_solicitud = function () {

            var bval = true;
            bval = bval && cCodConsecutivo.required();
            bval = bval && idMoneda.required();
            bval = bval && $("#tipo_solicitud").required();
            bval = bval && idvendedor.required();
            bval = bval && documento_or.required();
            if ($("#tipo_solicitud").val() == "2") {
                bval = bval && $("#cuota_inicial").required();
                bval = bval && $("#nro_cuotas").required();
            }

            if (bval) {

                if ($("#tipo_solicitud").val() == "1") {
                    var cont = 0;
                    $.each($("select[name='idalmacen[]']"), function (indexInArray, idalmacen) {
                        // console.log(idalmacen);
                        if (idalmacen.value == "") {
                            idalmacen.classList.add("border-red");
                            idalmacen.focus();
                            cont++;

                        }
                    });

                    $.each($("select[name='idlocalizacion[]']"), function (indexInArray, idlocalizacion) {
                        // console.log(idlocalizacion);
                        if (idlocalizacion.value == "") {
                            idlocalizacion.classList.add("border-red");
                            idlocalizacion.focus();
                            cont++;

                        }
                    });

                    $.each($("select[name='idlote[]']"), function (indexInArray, idlote) {
                        // console.log(idlote);
                        var lote_articulo = idlote.getAttribute("lote_articulo");
                        if (lote_articulo == "1" && idlote.value == "") {
                            idlote.classList.add("border-red");
                            idlote.focus();
                            cont++;

                        }
                    });

                    var articulos_id = $("input[name='idarticulo[]']");
                    var series_id = $("input[name='series_id[]']");

                    for (var ar = 0; ar < articulos_id.length; ar++) {
                        // console.log(articulos_id[ar]);
                        var posee_serie = articulos_id[ar].getAttribute("posee-serie");
                        var cantidad = articulos_id[ar].getAttribute("cantidad");
                        var producto = articulos_id[ar].getAttribute("producto");
                        if (posee_serie == "1") {
                            // console.log(series_id);
                            // console.log(ar, series_id[ar]);
                            if (typeof series_id[ar] == "undefined") {
                                // console.log(series_id[ar]);
                                AlertFactory.textType({
                                    title: '',
                                    message: 'Por Favor Agregue las series del producto: ' + producto,
                                    type: 'info'
                                });

                                return false;
                            } else {

                                var cant = series_id[ar].value.split(",");

                                if (cant.length != cantidad) {
                                    AlertFactory.textType({
                                        title: '',
                                        message: 'Por Favor Agregue la cantidad de ' + cantidad + ' series del producto: ' + producto,
                                        type: 'info'
                                    });

                                    return false;
                                }
                            }
                        }

                    }

                    // return false;
                }
                // alert(cont);
                if (cont > 0) {

                    return false;
                }

                $.post("aprobacionSolicituds/guardar_solicitud", $("#formulario-solicitud").serialize() + "&" + $("#formulario-creditos").serialize(),
                    function (data, textStatus, jqXHR) {

                        if (data.status == "i") {
                            LoadRecordsButtonSolicitud.click();
                            $("#nConsecutivo").val(data.datos[0].nConsecutivo);
                            $("#estado").val(data.datos[0].estado);
                            AlertFactory.textType({
                                title: '',
                                message: 'La solicitud se registró correctamente.',
                                type: 'success'
                            });
                            // alert("show");
                            $("#enviar_solicitud").show();
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: data.msg,
                                type: 'info'
                            });
                        }

                    },
                    "json"
                );
            }
        }

        $scope.mostrar_aprobaciones = function () {
            var bval = true;
            bval = bval && cCodConsecutivo.required();
            bval = bval && nConsecutivo.required();

            if (bval) { 
                $.post("aprobacionSolicituds/mostrar_aprobaciones", { cCodConsecutivo: cCodConsecutivo.val(), nConsecutivo: nConsecutivo.val() },
                    function (data, textStatus, jqXHR) {
                        if (data.length > 0) {
                            var html = '';
                            $("#detalle-aprobaciones").html("");
                            for (var i = 0; i < data.length; i++) {
                                html += '<tr>';
                                html += '   <td>' + data[i].aprobacion + '</td>';
                                html += '   <td>' + data[i].nOrden + '</td>';
                                html += '   <td>' + data[i].usuario + '</td>';
                                html += '   <td>' + data[i].dFecReg + '</td>';
                                html += '   <td>' + data[i].iEstado + '</td>';
                                html += '   <td>' + data[i].cObservacion + '</td>';
                                html += '</tr>';
                            }
                            $("#detalle-aprobaciones").html(html);
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: 'No hay datos!',
                                type: 'info'
                            });
                        }
                    },
                    "json"
                );
            }
        }

        $scope.imprimir_solicitud = function () {
           
            var cCodConsecutivo = $("#cCodConsecutivo").val();
            var nConsecutivo = $("#nConsecutivo").val();

            var id = cCodConsecutivo + "|" + nConsecutivo;
   
            window.open("aprobacionSolicituds/imprimir_solicitud/"+id);

        }

        $scope.enviar_solicitud = function () {
            var bval = true;
            bval = bval && cCodConsecutivo.required();
            bval = bval && nConsecutivo.required();
            bval = bval && $("#estado").required();


            if (bval) {
                // alert($("#estado").val());
                $.post("aprobacionSolicituds/enviar_solicitud", $("#formulario-solicitud").serialize() + "&estado=" + $("#estado").val(),
                    function (data, textStatus, jqXHR) {
                        if (data.status == "i") {
                            $("#estado").val(data.datos.estado);
                            // alert($("#estado option[value='"+$("#estado").val()+"']").text());
                            AlertFactory.textType({
                                title: '',
                                message: 'La solicitud se envio correctamente. Se cambio al estado: ' + $("#estado option[value='" + $("#estado").val() + "']").text(),
                                type: 'success'
                            });

                            $("#aprobaciones").show();
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: data.msg,
                                type: 'info'
                            });
                        }


                    }, "json");
            }


        }


        $(document).on("change", "#tipo_solicitud", function () {
            var tipo_solicitud = $(this).val();
            // alert("change " + tipo_solicitud);   
            $(".condicion_pago").hide();
            if(tipo_solicitud == "4") {
              
                $(".condicion_pago").show();
            }

            if (tipo_solicitud == "1" || tipo_solicitud == "3") {
                $(".credito").hide();

            } else {

                $(".credito").show();
            }

            if (tipo_solicitud == "3") {
                $(".convenio").show();
                // $("#cuota_inicial").val("");
                $("#nro_cuotas").attr("readonly", "readonly");

            } else {
                if (tipo_solicitud == "2") {
                    $("#nro_cuotas").removeAttr("readonly");
                    $(".inputs-credito").removeAttr("readonly");
                }

                if (tipo_solicitud == "1") {
                    $(".montos-credito").val(0);
                    $(".inputs-credito").attr("readonly", "readonly");
                }
                $(".convenio").hide();
            }

            if (tipo_solicitud == "2" || tipo_solicitud == "3") {
                calcular_totales();
            }
        });

        function find_solicitud(id) {

            $.post("aprobacionSolicituds/find", { id: id },
                function (data, textStatus, jqXHR) {
                    // console.log(data);

                    Helpers.set_datos_formulario("formulario-solicitud", data.solicitud[0]);
                    if (data.solicitud_credito.length > 0) {
                        Helpers.set_datos_formulario("formulario-creditos", data.solicitud_credito[0]);
                    }

                    $("#documento_or").val(data.solicitud[0].documento);
                    $("#comentario_aprobacion_so").val(data.solicitud[0].comentario_aprobacion);
                    getCliente();
                    $("#tipo_solicitud").trigger("change");
                    $("#IdMoneda").trigger("change");
                    if (data.solicitud_credito.length > 0) {

                        $("#cuota_inicial").val(data.solicitud_credito[0].cuota_inicial);
                        $("#total_financiado").val(data.solicitud_credito[0].total_financiado);
                        $("#monto_venta").val(data.solicitud_credito[0].monto_venta);
                        $("#nro_cuotas").val(data.solicitud_credito[0].nro_cuotas);
                        $("#valor_cuota").val(data.solicitud_credito[0].valor_cuota);
                        $("#intereses").val(data.solicitud_credito[0].intereses);
                        $("#documento_fiador").val(data.solicitud_credito[0].documento_fiador);
                        $("#documento_conyugue").val(data.solicitud_credito[0].documento_conyugue);
                        $("#documento_fiadorconyugue").val(data.solicitud_credito[0].documento_fiadorconyugue);
                        $("#dia_vencimiento_cuota").val(data.solicitud_credito[0].dia_vencimiento_cuota);

                    }

                    if (data.solicitud_articulo.length > 0) {
                        $("#articulo_mov_det").html("");
                        for (var i = 0; i < data.solicitud_articulo.length; i++) {

                            var codigo = Math.random().toString(36).substr(2, 18);
                            console.log(data.solicitud_articulo[i].precio_total);
                            console.log("precio_one");
                            addArticuloTable(data.solicitud_articulo[i].idarticulo, data.solicitud_articulo[i].producto, data.solicitud_articulo[i].cantidad, 'A', codigo, 'NA', "", "", data.solicitud_articulo[i].idalmacen, data.solicitud_articulo[i].idlocalizacion, data.solicitud_articulo[i].costo, data.solicitud_articulo[i].costo_total, data.solicitud_articulo[i].precio_unitario, data.solicitud_articulo[i].precio_total, data.solicitud_articulo[i].impuesto, data.solicitud_articulo[i].lote, data.solicitud_articulo[i].cOperGrat, data.solicitud_articulo[i].iddescuento, data.solicitud_articulo[i].serie);

                        }
                    }
                    console.log(data.solicitud_credito);
                    if (data.solicitud_credito.length > 0) {

                        $("#cuota_inicial").val(data.solicitud_credito[0].cuota_inicial);
                        $("#total_financiado").val(data.solicitud_credito[0].total_financiado);
                        $("#monto_venta").val(data.solicitud_credito[0].monto_venta);
                        $("#nro_cuotas").val(data.solicitud_credito[0].nro_cuotas);
                        $("#valor_cuota").val(data.solicitud_credito[0].valor_cuota);
                        $("#valor_cuota_final").val(data.solicitud_credito[0].valor_cuota_final);
                        $("#intereses").val(data.solicitud_credito[0].intereses);
                        $("#documento_fiador").val(data.solicitud_credito[0].documento_fiador);
                        $("#documento_conyugue").val(data.solicitud_credito[0].documento_conyugue);
                        $("#documento_fiadorconyugue").val(data.solicitud_credito[0].documento_fiadorconyugue);

                        if(data.solicitud_credito[0].documento_fiador != null) {
                            getPersona("fiador");
                        }

                        if(data.solicitud_credito[0].documento_conyugue != null) {
                            getPersona("conyugue");
                        }
                        // console.log("dddddddddddd");
                        // console.log($("#documento_fiadorconyugue").val());
                        // console.log("ddd");
                        console.log(data.solicitud_credito[0].documento_fiadorconyugue);
                        if(data.solicitud_credito[0].documento_fiadorconyugue != null) {
                            getPersona("fiadorconyugue");
                        }
                       
                    }

                    if(data.solicitud[0].estado != "4") {
                        deshabilitar_inputs();
                        $("#enviar_solicitud").show();
                    } else {
                        deshabilitar_inputs();
                    }
                    $("#aprobaciones").show();
                    $("#modalSolicitud").modal("show");
                },
                "json"
            );
        }

        function habilitar_inputs() {

            $("#agregar-articulo").show();
            $("#btn_editar_cliente").show();
           
            $("#btn_editar_conyugue").show();
            $("#btn_editar_fiador").show();
            $("#btn_editar_fiadorconyugue").show();
            
            $("#cCodConsecutivo").removeAttr("disabled");
            $("#IdMoneda").removeAttr("disabled");
            $("#id_tipoDoc_Venta_or").removeAttr("disabled");
            $("#tipo_solicitud").removeAttr("disabled");
            $("#idconvenio").removeAttr("disabled");
            $("#idvendedor").removeAttr("disabled");
            $("#totalDescuento").removeAttr("disabled");

            $("#fecha_vencimiento").removeAttr("readonly");
            $("#documento_or").removeAttr("readonly");
            $("#comentarios").removeAttr("readonly");
           
        }

        function deshabilitar_inputs() {
    
            $("#formulario-solicitud").find("input").attr("readonly", "readonly");
            $("#formulario-solicitud").find("select").attr("disabled", "disabled");
            $("#formulario-solicitud").find("textarea").attr("readonly", "readonly");
            $("#formulario-creditos").find("input").attr("readonly", "readonly");
            $("#formulario-creditos").find("select").attr("disabled", "disabled");

            $("#agregar-articulo").hide();
            $("#btn_editar_cliente").hide();
            $("#enviar_solicitud").hide();
            $("#btn_editar_conyugue").hide();
            $("#btn_editar_fiador").hide();
            $("#btn_editar_fiadorconyugue").hide();
            $(".m_articulo_idAlm").removeAttr("disabled");
            $(".m_articulo_idLoc").removeAttr("disabled");
            $(".select_lote").removeAttr("disabled");
           
   
        }
        function calcular_total_ingresos_comprador() {
            
            var ingreso_neto_mensual = 0;
            var ingreso_neto_conyugue = 0;
            var otros_ingresos = 0;
            var total_ingresos = 0;
    
            if (!isNaN($("#ingreso_neto_mensual").val())) {
                ingreso_neto_mensual = parseFloat($("#ingreso_neto_mensual").val());
            }

            if (!isNaN($("#ingreso_neto_conyugue").val())) {
                ingreso_neto_conyugue = parseFloat($("#ingreso_neto_conyugue").val());
            }

            if (!isNaN($("#otros_ingresos").val())) {
                otros_ingresos = parseFloat($("#otros_ingresos").val());
            }

            total_ingresos = ingreso_neto_mensual + ingreso_neto_conyugue + otros_ingresos;
            
    

            $("#total_ingresos").val(total_ingresos); 
        }

        function calcular_total_ingresos_fiador() {
            var ingreso_neto_mensual_fiador = 0;
            var ingreso_neto_conyugue_fiador = 0;
            var otros_ingresos_fiador = 0;
            var total_ingresos_fiador = 0;
    
            if (!isNaN($("#ingreso_neto_mensual_fiador").val())) {
                ingreso_neto_mensual_fiador = parseFloat($("#ingreso_neto_mensual_fiador").val());
            }

            if (!isNaN($("#ingreso_neto_conyugue_fiador").val())) {
                ingreso_neto_conyugue_fiador = parseFloat($("#ingreso_neto_conyugue_fiador").val());
            }

            if (!isNaN($("#otros_ingresos_fiador").val())) {
                otros_ingresos_fiador = parseFloat($("#otros_ingresos_fiador").val());
            }
            
            total_ingresos_fiador = ingreso_neto_mensual_fiador + ingreso_neto_conyugue_fiador + otros_ingresos_fiador;
            $("#total_ingresos_fiador").val(total_ingresos_fiador);   
        }

        $(document).on("keyup", "#ingreso_neto_mensual", function () {
            calcular_total_ingresos_comprador();
        });

        $(document).on("keyup", "#ingreso_neto_conyugue", function () {
            calcular_total_ingresos_comprador();
        });

        $(document).on("keyup", "#otros_ingresos", function () {
            calcular_total_ingresos_comprador();
        });

        $(document).on("keyup", "#ingreso_neto_mensual_fiador", function () {
            calcular_total_ingresos_fiador();
        });

        $(document).on("keyup", "#ingreso_neto_conyugue_fiador", function () {
            calcular_total_ingresos_fiador();
        });

        $(document).on("keyup", "#otros_ingresos_fiador", function () {
            calcular_total_ingresos_fiador();
        });

        var search_c = getFormSearchAsigApro('frm-search-Asignacioncobrador', 'search_c', 'LoadRecordsButtonAsignacioncobrador');

        var table_container_Asignacioncobrador = $("#table_container_pendienteCobro");

        table_container_Asignacioncobrador.jtable({
            title: "Listado",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/aprobacionSolicituds/totalesAproba',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_c
                },
                // {
                //     cssClass: 'btn-danger-admin',
                //     text: '<i class="fa fa-plus"></i>Asignar Cobrador',
                //     click: function () {
                //         newAsignacion();
                //     }
                // }
                ]
            },
            fields: {
                Cronograma: {
                    title: '',
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (studentData) {
                      
                        var $img = $('<i class="fa fa-plus" style="font-size:20px;color:#1c84c6;cursor: pointer"></i>');
                     
                        $img.click(function () {
                            $('#table_container_pendienteCobro').jtable('openChildTable',
                                    $img.closest('tr'), //Parent row
                                    {
                                    title:'Cronograma',
                                    actions: {
                                        listAction: base_url + '/aprobacionSolicituds/listpendientesCobro?idcliente=' + studentData.record.idcliente  +'&IdMoneda='+studentData.record.idMoneda,
                                    },
                                    fields: {
                                        cCodConsecutivo_solicitud: {
                                            title: 'Cod Solicitud',
                                        },
                                        nConsecutivo_solicitud: {
                                            title: 'N° Solicitud',
                                        },
                                        nConsecutivo_solicitud: {
                                            title: 'N° Solicitud',
                                        },
                                         moneda: {
                                            title: 'Moneda',
                                        },
                                         fecha_emision: {
                                            title: 'Fecha Emisión',
                                             display: function (data) {
                                                return moment(data.record.fecha_emision).format('DD/MM/YYYY');
                                            }
                                        },
                                         tipoDocumento: {
                                            title: 'Tipo Documento',
                                        },
                                         condicion_pago_text: {
                                            title: 'Condición Pago',
                                        },
                                         serie_comprobante: {
                                            title: 'Serie',
                                        },
                                         numero_comprobante: {
                                            title: 'N°',
                                        },
                                         razonsocial_cliente: {
                                            title: 'Cliente',
                                        },
                                         t_monto_total: {
                                            title: 'Monto Total',
                                             display: function (data) {
                                                 var  saldo=data.record.t_monto_total;
                                                 var newsal=Number(saldo).toFixed(2);
                                                 return(addCommas(newsal));
                                            }
                                        },
                                         pagado: {
                                            title: 'Pagado',
                                             display: function (data) {
                                                 var  saldo=data.record.pagado;
                                                 var newsal=Number(saldo).toFixed(2);
                                                 return(addCommas(newsal));
                                            }
                                        },
                                        saldo: {
                                            title: 'Saldo',
                                            display: function (data) {
                                                 var  saldo=data.record.saldo;
                                                 var newsal=Number(saldo).toFixed(2);
                                                 return(addCommas(newsal));
                                            }
                                        },

                                    }
                                }, function (data) { //opened handler
                                    data.childTable.jtable('load');
                                });
                        });
                        //Return image to show on the person row
                        return $img;
                    }
                },
                idcliente: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false,
                    title: 'Código',
                       width: '1%',
                },
                idMoneda: {
                    list: false,
                    title: 'Nro',
                     width: '1%',
                },
                moneda: {
                    title: 'Moneda',
                       width: '1%',
                },
                saldoTotal: {
                    title: 'Total',
                      display: function (data) {
                         var  saldo=data.record.saldoTotal;
                         var newsal=Number(saldo).toFixed(2);
                         return(addCommas(newsal));
                    }
                },
             
              
            },
            
            
        });

        generateSearchForm('frm-search-Asignacioncobrador', 'LoadRecordsButtonAsignacioncobrador', function(){
            table_container_Asignacioncobrador.jtable('load', {
                search_c: $('#search_c').val(),
                cliente_id_or: cliente_id_or.val(),
            });
        }, true);
       

        var search = getFormSearch('frm-search-AprobacionSolicitud', 'search_b', 'LoadRecordsButtonAprobacionSolicitud');


        var table_container_AprobacionSolicitud = $("#table_container_AprobacionSolicitud");

        table_container_AprobacionSolicitud.jtable({
            title: "Lista de solicitudes",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/aprobacionSolicituds/list',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }]
            },
            fields: {
                Codigo: {
                    title: 'Código',
                },
                Consecutivo: {
                    title: 'Consecutivo',
                },
                Conformidad: {
                    title: 'Conformidad',
                   
                },
                Fecha: {
                    title: 'Fecha',
                    display: function (data) {
                        return moment(data.record.Fecha).format('DD/MM/YYYY');
                    }

                },
                TipoSolicitud: {
                    title: 'Tipo Solicitud',
                },
                TipoDoc: {
                    title: 'Típo Documento',
                },
                NumeroDoc: {
                    title: 'N° Documento',
                },
                Cliente: {
                    title: 'Cliente',
                },
                Moneda: {
                    title: 'Moneda',
                },
                 Total: {
                    title: 'Total',
                      display: function (data) {
                                                 var  saldo=data.record.Total;
                                                 var newsal=Number(saldo).toFixed(2);
                                                 return(addCommas(newsal));
                                            }
                },
                 Saldo: {
                    title: 'Saldo',
                     display: function (data) {
                                                 var  saldo=data.record.Saldo;
                                                 var newsal=Number(saldo).toFixed(2);
                                                 return(addCommas(newsal));
                                            }
                },
                 EstadoSol: {
                    title: 'Estado Sol',
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-solicitud" data-nrConfr="' + data.record.Conformidad
                            + '" data-id="' + data.record.Codigo
                            + '_' + data.record.Consecutivo + '" title="Editar"><i class="fa fa-search fa-1-5x"></i></a>';
                    }

                },

            },
           
            recordsLoaded: function (event, data) {
                $('.edit-solicitud').click(function (e) {
                    var id = $(this).attr('data-id');
                    var conformi = $(this).attr('data-nrConfr');
                    var estado = $(this).data('estado');
                    $("#nCodConformidad").val(conformi);

                    // if (estado != "1" && estado != "4") {
                    //     AlertFactory.textType({
                    //         title: '',
                    //         message: 'No se puede modificar, la solicitud ya no se encuentra en estado Registrado',
                    //         type: 'info'
                    //     });
                    //     return false;
                    // }
                    // console.log(id);
                    find_solicitud(id);
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

        generateSearchForm('frm-search-AprobacionSolicitud', 'LoadRecordsButtonAprobacionSolicitud', function(){
            table_container_AprobacionSolicitud.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('aprobacionSolicituds', {
                url: '/aprobacionSolicituds',
                templateUrl: base_url + '/templates/aprobacionSolicituds/base.html',
                controller: 'AprobacionSolicitudCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();