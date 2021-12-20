/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.solicitud')
        .config(Config)
        .controller('SolicitudCtrl', SolicitudCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    SolicitudCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function SolicitudCtrl($scope, _, RESTService, AlertFactory) {
        var modalSolicitud = $('#modalSolicitud');
        var titlemodalSolicitud = $('#titleModalSolicitud');
        var estado = $("#estado");
        var cCodConsecutivo = $("#cCodConsecutivo");
        var totalDescuento=$("#totalDescuento");
        var idcCondicionPago=$("#idcCondicionPago");
        var idMoneda=$("#IdMoneda");

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

                    descuentos = response.descuentos;
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
                                    totalDescuento.append('<option value="' + item.id + '*' + por + '*' + monto + '" >' + item.descripcion + '</option>');
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

                    servicios = response.servicios;
                    idMoneda.append('<option value="">Seleccionar</option>');
                    _.each(response.moneda, function (item) {
                        idMoneda.append('<option value="' + item.IdMoneda + '">' + item.Descripcion + '</option>');
                    });
                    // totales = response.totales;
                    // tipo_totales_slec.append('<option value="">Tipo</option>');
                    // _.each(response.totales, function (item) {
                    //     tipo_totales_slec.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    // });

                }
            }, function () {
                obtener_data_for_solicitud();
            });
        }

        obtener_data_for_solicitud();

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
                idsolicitud: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false,
                },
                idtienda: {
                    title: 'Tienda',
                    options: base_url + '/solicitud/getTiendas'

                },
                nombre_caja: {
                    title: 'Nombre Caja'
                },
                usuario: {
                    title: 'Usuario'
                },
                activo: {
                    title: 'Activo',
                    values: { 'N': 'Inactivo', 'S': 'Activo' },
                    type: 'checkbox',
                    listClass: 'text-center',
                    defaultValue: 'S',


                },

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