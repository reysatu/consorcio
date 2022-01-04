/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.solicitud')
        .config(Config)
        .controller('SolicitudCtrl', SolicitudCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    SolicitudCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory', 'Helpers'];

    function SolicitudCtrl($scope, _, RESTService, AlertFactory, Helpers) {

        // Helpers.saludo();


        var modalSolicitud = $('#modalSolicitud');
        var titlemodalSolicitud = $('#titleModalSolicitud');
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
        var montoTotal = $("#montoTotal");
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

        var AlmacenesSele;//variable para guardar almacenes
        var LotesSele;//variable para guardar lotes
        var DescuentosSele;//variable para guardar los decuentos
        var LocalizacionesSele;//variable para guardar localizaciones del almacen



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
        }

        function obtener_data_for_solicitud() {
            RESTService.all('solicitud/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {

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
                    // id_tipoDoc_Venta_or.append('<option value="">Seleccionar</option>');
                    // _.each(response.tipo_document_venta, function (item) {
                    //     id_tipoDoc_Venta_or.append('<option value="' + item.IdTipoDocumento + '">' + item.Descripcion + '</option>');
                    // });
                    // id_tipoDoc_Venta.append('<option value="">Seleccionar</option>');
                    // _.each(response.tipo_document_venta, function (item) {
                    //     id_tipoDoc_Venta.append('<option value="' + item.IdTipoDocumento + '">' + item.Descripcion + '</option>');
                    // });
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
                        idMoneda.append('<option value="' + item.IdMoneda + '">' + item.Descripcion + '</option>');
                    });

                    idconvenio.append('<option value="">Seleccionar</option>');
                    _.each(response.convenios, function (item) {
                        idconvenio.append('<option value="' + item.idconvenio + '">' + item.descripcionconvenio + '</option>');
                    });

                    idvendedor.append('<option value="">Seleccionar</option>');
                    _.each(response.vendedores, function (item) {
                        idvendedor.append('<option value="' + item.idvendedor + '">' + item.descripcion + '</option>');
                    });

                    $("#idconyugue").append('<option value="">Seleccionar</option>');
                    _.each(response.personas, function (item) {
                         $("#idconyugue").append('<option value="' + item.idPersona + '">' + item.cNombres + ' ' + item.cApepat + ' ' + item.cApemat + '</option>');
                    });

                    $("#idfiador").append('<option value="">Seleccionar</option>');
                    _.each(response.personas, function (item) {
                         $("#idfiador").append('<option value="' + item.idPersona + '">' + item.cNombres + ' ' + item.cApepat + ' ' + item.cApemat + '</option>');
                    });

                    $("#idfiadorconyugue").append('<option value="">Seleccionar</option>');
                    _.each(response.personas, function (item) {
                         $("#idfiadorconyugue").append('<option value="' + item.idPersona + '">' + item.cNombres + ' ' + item.cApepat + ' ' + item.cApemat + '</option>');
                    });
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

        documento_or.keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                getCliente();
            }
        });

        btn_save_cliente.click(function (e) {
            saveCliente();
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

                };
                var cli_id = (cliente_id.val() === '') ? 0 : cliente_id.val();
                RESTService.updated('customers/createCliente', cli_id, params, function (response) {
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
            RESTService.all('customers/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var tip = response.tipoc_doc;
                    var tipo_clie = response.tipo_clie;
                    tip.map(function (index) {
                        tipodoc.append('<option value="' + index.Codigo + '">' + index.TipoDocumento + '</option>');
                    });

                    id_tipocli.append('<option value="">Seleccionar</option>');
                    tipo_clie.map(function (index) {
                        id_tipocli.append('<option value="' + index.id + '">' + index.descripcion + '</option>');
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
                RESTService.get('orden_servicios/get_cliente', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var datos = response.data;
                        // console.log(titleModalClientes);
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
                            cliente_id_or.val(datos[0].id);
                            tipoCliente_or.val(datos[0].tipo_cliente_descr).trigger('change');
                            id_cliente_tipo_or.val(datos[0].id_tipocli)
                            id_tipocli.data("prev", id_cliente_tipo_or.val());
                            // llenarServicios();

                        }
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error . Intente nuevamente.',
                            type: 'info'
                        });
                    }

                });
            }
        }

        function getDepartamento(bandera) {
            var id = "0";
            RESTService.get('shops/TraerDepartamentos', id, function (response) {
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
            RESTService.get('shops/TraerProvincias', id, function (response) {
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
                        message: 'Hubo un error . Intente nuevamente.',
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
            RESTService.get('shops/TraerDistritos', id, function (response) {
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
                    costo: {
                        title: 'costo'

                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-costo="' + data.record.costo + '" data-name="' +
                                data.record.description + '" data-type="' + data.record.type_id + '"  data-serie="' + data.record.serie + '" data-lote="' + data.record.lote + '" data-code="' + data.record.id + '"><i class="fa fa-' +
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

                        seleccionarModal(codigo, descripcionArt, idTipoArt, serie, lote, costo);
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
                addArticuloTable(idProductoMN.val(), desProductoMN.val(), cantProductoMN.val(), ver, codigo, tipoArt, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, precioTotal);
                modalNada.modal('hide');
                modalMovimietoArticulo.modal('hide');
            }

        }

        function seleccionarModal(codigo, descripcionArt, idTipoArt, serie, lote, costo) {
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
            $("#posee-serie").val(serie);
            modalNada.modal('show');
            costoNa.val(costo);

            // }

        }

        var table_serie_cabecera = $("#table_serie_cabecera");
        var articulo_serie_det = $("#articulo_serie_det");
        var cantProductoMss = $("#cantProductoMss");
        var identiSelec = "I";
        var aartMSN = [];//ARRAY DE series nueva
        var aartMSE = [];



        modalNada.on('hidden.bs.modal', function (e) {
            cleanArtNada();
        });

        function cleanArtNada() {
            idProductoMN.val("");
            desProductoMN.val("");
            cantProductoMN.val("");

        }

        $scope.addSeleccSerie = function () {
            table_serie_cabecera.html("");
            articulo_serie_det.html("");

            var bval = true;
            bval = bval && cantProductoMss.required();
            if (bval) {
                var id = idProductoMss.val() + '*' + cantProductoMss.val();
                RESTService.get('register_movements/validateCantSerie', id, function (response) {
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
            var url = 'getProductoSerie';
            if (naturalezaGeneral == "S") {
                url = 'getProductoSerieStock';
            };
            table_container_cc4.jtable({
                title: "Lista de Series",
                paging: true,
                sorting: true,
                actions: {
                    listAction: function (postData, jtParams) {
                        return $.Deferred(function ($dfd) {
                            $.ajax({
                                url: base_url + '/register_movements/' + url,
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



                        $("#tr_idArticulo" + codigoLSr).find("td").eq(0).append('<input type="hidden" name="series_id" value="' + series_id.join(",") + '" />');
                        $("#tr_idArticulo" + codigoLSr).find("td").eq(0).append('<input type="hidden" name="articulos_id" value="' + articulos_id.join(",") + '" />');
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
                        RESTService.get('register_movements/valida_series_serve', camposunicos, function (response) {
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




        function addArticuloTable(idProducto, desProducto, cantProducto, ver, codigo, tipo, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, presio_total) {
            // alert("price " +precio);
            var id_tipo_cliente = id_cliente_tipo_or.val();
            var id = idProducto+"_"+id_tipo_cliente+"_"+idMoneda.val();
            // alert(id);
            RESTService.get('orden_servicios/get_precios_list', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    // console.log(response.data);
               
                    // return false;
                    var precio = 0;
                    if (response.newPrecio != "") {
                        precio = response.newPrecio;
                    }

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
                    var td4 = $('<td><p>' + precionew + '</p></td>');
                    var inp4 = $('<input name="costo[]"  id="costo_' + codigo + '" type="hidden"   value="' + costonew + '" /><input name="costo_total[]" id="costo_total_' + codigo + '"  type="hidden" value="' + impor + '" /><input name="precio[]" type="hidden" id="cosMs_' + codigo + '" min="1" class="m_articulo_costo form-control input-sm" value="' + precionew + '" />');
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
                        var td3 = $('<td style="width: 30px !important;" class="text-center"></td>');
                        var inp3 = $('<input  type="text" style="width: 30px !important;" id="canMs_' + codigo + '" onkeypress="return soloNumeros(event)" codigo="' + codigo + '" class="m_articulo_cantidad" name="cantidad[]" form-control input-sm" value="' + cantProducto + '" />');
                    } else {
                        var td3 = $('<td style="width: 30px !important;"><p>' + cantProducto + '</p></td>');
                        var inp3 = $('<input type="hidden" style="width: 30px !important;" id="canMs_' + codigo + '" class="m_articulo_cantidad"  codigo="' + codigo + '" name="cantidad[]" value="' + cantProducto + '" />');
                    }
                    var td2 = $('<td></td>');
                    var tdy = $('<td></td>');
                    var inpy = $('<select name="idalmacen[]" data-arts="' + idProducto + '" id="Al_' + codigo + '" data-idAraAl="' + codigo + '" class="m_articulo_idAlm form-control input-sm"></select>');
                    var inpl = $('<select name="idlocalizacion[]" id="' + codigo + '" data-idArl="' + idProducto + '" class="m_articulo_idLoc form-control input-sm"></select>');

                    var td_lote = $('<td></td>');
                    var select_lote = $('<select name="idlote[]" id="lote_' + codigo + '" class="select_lote form-control input-sm"></select>');

                    var td_descuentos = $('<td></td>');
                    var select_descuento = $('<select name="iddescuento[]" codigo="' + codigo + '" id="descuento_' + codigo + '" class="select_descuento form-control input-sm"></select>');

                    // }


                    var td5 = $('<td><p>' + pretotal.toFixed(2) + '</p></td>');
                    var tdpreT = $('<td><p></p></td>');
                    var inp = $('<input type="hidden" class="m_articulo_id" name="idarticulo[]" value="' + idProducto + '" />');

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

                    if ($("#posee-serie").val() == "1") {
                        button_series = '&nbsp;&nbsp;<button class="btn btn-success btn-xs agregar-series" data-tipo="' + tipo + '" title="Agregar Series" data-id="' + codigo + '" data-idarticulo="' + idProducto + '" data-articulo="' + desProducto + '" data-costo="' + costo + '"  data-posee-serie="' + $("#posee-serie").val() + '" type="button"><span class="fa fa-plus"></span></button>';
                    }

                    var btn3 = $('<center><button class="btn btn-danger btn-xs delMovPro" data-tipo="' + tipo + '" title="Eliminar" data-id="' + codigo + '" type="button"><span class="fa fa-trash"></span></button>' + button_series + '</center>');
                    // td6.append(btn1);

                    var html = '<td codigo="' + codigo + '" class="monto_subtotal"><p>' + impor.toFixed(2) + '</p><input type="hidden" codigo="' + codigo + '" name="monto_subtotal[]" value="' + impor.toFixed(2) + '"></td>';
                    html += '<td codigo="' + codigo + '" class="monto_exonerado"><p>' + impor.toFixed(2) + '</p><input type="hidden" codigo="' + codigo + '" name="monto_exonerado[]" value="' + impor.toFixed(2) + '"></td>';
                    html += '<td codigo="' + codigo + '" class="monto_afecto"><p>0.00</p><input type="hidden" codigo="' + codigo + '" name="monto_afecto[]" value="0.00"></td>';
                    html += '<td codigo="' + codigo + '" class="monto_inafecto"><p>0.00</p><input type="hidden" codigo="' + codigo + '" name="monto_inafecto[]" value="0.00"></td>';
                    html += '<td codigo="' + codigo + '" class="impuestos"><p>0.00</p><input type="hidden" codigo="' + codigo + '" name="impuestos[]" value="0.00"></td>';
                    html += '<td codigo="' + codigo + '" class="total"><p>' + impor.toFixed(2) + '</p><input type="hidden" codigo="' + codigo + '" name="monto_total[]" value="' + impor.toFixed(2) + '"></td>';
                    td8.append(btn3);
                    tr.append(td1).append(td2).append(tdy).append(td_lote).append(td3).append(td4).append(td5).append(td_descuentos).append(tdpr).append(tdpreT).append(html).append(td8);
                    articulo_mov_det.append(tr);
                    addAlmaSelec(codigo);
                    addlocSele(codigo);
                    obtener_descuentos(codigo);
                    obtener_lotes(codigo);


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
                        $("#Al_" + codigo).val(idAlmacen).trigger('change');
                        $("#" + codigo).val(idLocalizacion).trigger('change');

                        $("#cosMs_" + codigo).val(Number(costo));
                        var cos = Number(costo_total);
                        $("#tr_idArticulo" + codigo).find("td:eq(5)").children("p").text(cos);
                        $("#tr_idArticulo" + codigo).find("td:eq(5)").children("input").val(cos);
                    };

                    calcular_totales();
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'info'
                    });
                }


            });


        }

        $(document).on("click", ".agregar-series", function () {
            var costo = $(this).data("costo");
            var idarticulo = $(this).data("idarticulo");
            var articulo = $(this).data("articulo");
            var codigo_tr = $(this).data("id");
            desProductoMss.val(articulo);
            idProductoMss.val(idarticulo);
            costoAS.val(costo);
            $("#codigo-tr").val(codigo_tr);
            modalSerieR.modal('show');
        });

        $(document).on("change", ".select_descuento", function () {
            // alert($(this).attr("codigo"));
            var porcentaje_descuento = 0;
            var tipo_descuento = $(this).val();
            var codigo = $(this).attr("codigo");
            if ($(this).val() != "") {

                porcentaje_descuento = parseFloat($(this).find("option[value=" + $(this).val() + "]").attr("nPorcDescuento"));
            }
            var precio_total = parseFloat($(".m_articulo_precioTotal[codigo='" + codigo + "']").val());
            // alert(precio_total);

            var descuento = precio_total * porcentaje_descuento / 100;

            $("#preMs_" + codigo).val(porcentaje_descuento);
            $("#preMs_" + codigo).siblings("p").text(porcentaje_descuento.toString());

            $(".m_articulo_montoDescuento[codigo='" + codigo + "']").val(descuento.toFixed(2));
            $(".m_articulo_montoDescuento[codigo='" + codigo + "']").siblings("p").text(descuento.toFixed(2));

            var nuevo_total = precio_total - descuento;
            // alert(nuevo_total);
            $("input[name='monto_subtotal[]'][codigo=" + codigo + "]").val(nuevo_total.toFixed(2));
            $("input[name='monto_exonerado[]'][codigo=" + codigo + "]").val(nuevo_total.toFixed(2));
            $("input[name='monto_total[]'][codigo=" + codigo + "]").val(nuevo_total.toFixed(2));

            $(".monto_subtotal[codigo=" + codigo + "]").find("p").text(nuevo_total.toFixed(2));
            $(".monto_exonerado[codigo=" + codigo + "]").find("p").text(nuevo_total.toFixed(2));
            $(".total[codigo=" + codigo + "]").find("p").text(nuevo_total.toFixed(2));

            // console.log();
            calcular_totales();
            totalDescuento.trigger("change");

        });

        totalDescuento.change(function () {
            // var codigo=$(this).attr('data-desc');
            var val = $(this).val();
            if (val == "") {

                porcentajeTotal.val(0);
                montoTotal.val(0);


            } else {

                var arrayRe = val.split("*");
                var code = arrayRe[0];
                var porc = arrayRe[1];
                var mont = arrayRe[2];
                // alert();
                var porTotal = Number((Number(porc) * Number($("#t_monto_subtotal").val())) / 100);


                $("#porcentajeTotal").val(porc);
                $("#montoTotal").val(porTotal.toFixed(2));
            }
            var totalDes = $("#t_monto_subtotal").val();
            totalDes = Number(totalDes);
            // alert(totalDescuento.val());
            if (totalDescuento.val() != '') {
                // if(montoTotal.val()<1){
                //         var por=Number(porcentajeTotal.val());
                //         totalDes=totalDes-por;
                //     }else{

                //         totalDes=Number(totalDes)-Number(montoTotal.val());
                //     }
                totalDes = totalDes - porTotal;
                // alert(totalDes);
            }
            desTotal.val(totalDes.toFixed(2));


        });

        $(document).on("keyup", ".m_articulo_cantidad", function () {
            var cantidad = parseInt($(this).val());
            if (isNaN(cantidad)) {
                cantidad = 0;
            }

            var codigo = $(this).attr("codigo");
            var precio = parseFloat($("#cosMs_" + codigo).val());
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
            });

            $("#monto_descuento_detalle").val(t_monto_descuento.toFixed(2));
            $("#t_monto_subtotal").val(t_monto_subtotal.toFixed(2));
            $("#t_monto_exonerado").val(t_monto_exonerado.toFixed(2));
            $("#t_monto_afecto").val(t_monto_afecto.toFixed(2));
            $("#t_monto_inafecto").val(t_monto_inafecto.toFixed(2));
            $("#t_impuestos").val(t_impuestos.toFixed(2));
            $("#desTotal").val(t_total.toFixed(2));
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

        function obtener_descuentos(codigo) {
            var idDescSele = $("#descuento_" + codigo);
            idDescSele.append('<option value="" selected>Seleccionar</option>');
            _.each(DescuentosSele, function (item) {
                idDescSele.append('<option nPorcDescuento="' + item.nPorcDescuento + '" nMonto="' + item.nMonto + '" idTipo="' + item.idTipo + '" value="' + item.id + '" >' + item.descripcion + '</option>');
            });
        }



        function getLocaStock(idl, ident, idPrAl, idLocalizacion) {
            naturalezaGeneral = "S";
            var idLocali = $("#" + ident);
            var id = idl;
            RESTService.get('register_movements/getLocaStock', id, function (response) {
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
                    if (naturalezaGeneral != 'C') {

                        AlertFactory.textType({
                            title: '',
                            message: 'No se pudo obtener las Localizaciones. Intente nuevamente.',
                            type: 'info'
                        });
                    }
                }

            });
        }
        $scope.datos_credito = function() {
            // $("#idconyugue").focus();
            var t_monto_total = $("#desTotal").val();
            $("#monto_venta").val(t_monto_total);
            $("#total_financiado").val(t_monto_total);
            $("#cuota_inicial").attr("max", t_monto_total);

            if(articulo_mov_det.html() == "") {
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
            var cuota_inicial = parseFloat($(this).val());
            var monto_venta = parseFloat($("#monto_venta").val());
            if(isNaN(cuota_inicial)) {
                cuota_inicial = 0;
            }

            var total_financiado = monto_venta - cuota_inicial;
            $("#total_financiado").val(total_financiado.toFixed(2));
            $("#nro_cuotas").trigger("keyup");
        });

        $(document).on("keyup", "#nro_cuotas", function () {
            var nro_cuotas = parseFloat($(this).val());
            var total_financiado = parseFloat($("#total_financiado").val());
            if(isNaN(nro_cuotas)) {
                nro_cuotas = 0;
            }

            $.post("solicitud/factor_credito", { nro_cuotas: nro_cuotas },
                function (data, textStatus, jqXHR) {
                    var porcentaje = 0;
                    if(data.length > 0) {
                        porcentaje = parseFloat(data[0].porcentaje);
                    }

                    var intereses = total_financiado * porcentaje;
                    var valor_cuota = (total_financiado + intereses) / nro_cuotas;
                    // alert(intereses);
                    $("#valor_cuota").val(valor_cuota.toFixed(2));
                    $("#intereses").val(intereses.toFixed(2));

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

            if (bval) {
                // alert($("#formulario-solicitud").serialize() + $("#formulario-creditos").serialize());
                $.post("solicitud/guardar_solicitud", $("#formulario-solicitud").serialize() + "&" + $("#formulario-creditos").serialize(),
                    function (data, textStatus, jqXHR) {
                        console.log(data);
                        if() {
                            
                        }
                        AlertFactory.textType({
                            title: '',
                            message: 'La solicitud se registró correctamente.',
                            type: 'success'
                        });
                    },
                    "json"
                );
            }
        }

        $(document).on("change", "#tipo_solicitud", function () {
            var tipo_solicitud = $(this).val();
            // alert(tipo_solicitud);
            if (tipo_solicitud == "1") {
                $(".credito").hide();

            } else {

                $(".credito").show();
            }
        });

        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonBrand');

        var table_container_solicitud = $("#table_container_solicitud");

        table_container_solicitud.jtable({
            title: "Lista de Solicitudes",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/solicitud/list',
                // createAction: base_url + '/solicitud/create',
                // updateAction: base_url + '/solicitud/update',
                // deleteAction: base_url + '/solicitud/delete',
            },
            messages: {
                addNewRecord: 'Nueva Caja',
                editRecord: 'Editar Caja'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('solicitud/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Solicitud',
                    click: function () {
                        newSolicitud();
                    }
                }]
            },
            fields: {
                cCodConsecutivo: {
                    key: true,
                    create: false,
                    edit: false,
                    list: true,
                    title: 'Código',
                },
                nConsecutivo: {
                    title: 'Nro',


                },

                fecha_solicitud: {
                    title: 'Fecha Solicitud',
                    display: function (data) {
                        return moment(data.record.fecha_solicitud).format('DD/MM/YYYY');
                    }

                },
                tipo_solicitud: {
                    title: 'Tipo Solicitud',
                    options: { '1': 'Contado', '2': 'Crédito Directo', '3': 'Crédito Financiero' },

                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-solicitud" data-id="' + data.record.cCodConsecutivo
                            + '_' + data.record.nConsecutivo + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                }, Eliminar: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a data-target="#"  data-ide="' + data.record.cCodConsecutivo + '_' + data.record.nConsecutivo + '"   title="Eliminar" class="jtable-command-button eliminar-solicitud"><i class="fa fa-trash fa-1-5x fa-red"><span>Eliminar</span></i></a>';
                    }

                }

            },
            formCreated: function (event, data) {

                //data.form.find('input[name="convenio"]').attr('onkeypress','return soloLetras(event)');
                $('#Edit-activo').parent().addClass('i-checks');

                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                    if (e.target.value == 'S') {
                        $("#Edit-activo").val("N");
                        $(".i-checks span").text("Inactivo");

                    } else {
                        $("#Edit-activo").val("S");
                        $(".i-checks span").text("Activo");
                    };
                });
            },
            formSubmitting: function (event, data) {
                var bval = true;
                // bval = bval && data.form.find('input[name="codigo_formapago"]').required();
                bval = bval && data.form.find('input[name="nombre_caja"]').required();
                bval = bval && data.form.find('input[name="usuario"]').required();
                bval = bval && data.form.find('input[name="activo"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonBrand', function () {
            table_container_solicitud.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('solicitud', {
                url: '/solicitud',
                templateUrl: base_url + '/templates/solicitud/base.html',
                controller: 'SolicitudCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();