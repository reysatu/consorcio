/**
 * Created by JAIR on 4/5/2017.
 */

 (function () {
    'use strict';
    angular.module('sys.app.ventas')
        .config(Config)
        .controller('VentasCtrl', VentasCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    VentasCtrl.$inject = ['$scope', 'AlertFactory', 'RESTService'];

    function VentasCtrl($scope, AlertFactory, RESTService)
    {

        var search = getFormSearch('frm-search-ventas', 'search_b_ventas', 'LoadRecordsButtonVentas');

        var table_container_ventas = $("#table_container_ventas");

        table_container_ventas.jtable({
            title: "Lista de Documentos Emitidos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/ventas/list',
                // createAction: base_url + '/ventas/create',
                // updateAction: base_url + '/ventas/update',
                // deleteAction: base_url + '/ventas/delete',
            },
            // messages: {
            //     addNewRecord: 'Nuevo Banco',
            //     editRecord: 'Editar Banco'
            // },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('ventas/excel', {});
                    }
                }]
            },
            fields: {
                idventa: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false,
                    title: 'Código',
                },
                cCodConsecutivo_solicitud: {
                    title: 'cCodConsecutivo',
                    create: false,
                    edit: false,
                    list: false,

                },
                nConsecutivo_solicitud: {
                    title: 'nConsecutivo',
                    create: false,
                    edit: false,
                    list: false,

                },
                tipo_solicitud: {
                    title: 'tipo_solicitud',
                    create: false,
                    edit: false,
                    list: false,

                },
                estado: {
                    title: 'estado',
                    create: false,
                    edit: false,
                    list: false,

                },
                IdTipoDocumento: {
                    title: 'IdTipoDocumento',
                    create: false,
                    edit: false,
                    list: false,

                },
                anticipo: {
                    title: 'anticipo',
                    create: false,
                    edit: false,
                    list: false,

                },
                idventa_referencia: {
                    title: 'idventa_referencia',
                    create: false,
                    edit: false,
                    list: false,

                },
                serie_comprobante: {
                    title: 'Serie',

                },
                numero_comprobante: {
                    title: 'Número',


                },
                fecha_emision: {
                    title: 'Fecha',
                    display: function (data) {
                        return moment(data.record.fecha_emision).format('DD/MM/YYYY');
                    }

                },
                tipo_documento: {
                    title: 'Tipo Doc.',


                },
                numero_documento: {
                    title: 'N° Documento',


                },
                moneda: {
                    title: 'Moneda',


                },
                t_monto_total: {
                    title: 'Monto',


                },
                pagado: {
                    title: 'Pagado',


                },
                saldo: {
                    title: 'Saldo',


                },

                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="emitir-nota" data-estado="' + data.record.estado + '"  data-tipo_solicitud="' + data.record.tipo_solicitud + '" data-idtipodocumento="' + data.record.IdTipoDocumento + '"  data-anticipo="' + data.record.anticipo + '" data-id="' + data.record.cCodConsecutivo_solicitud + '|' + data.record.nConsecutivo_solicitud + '|' + data.record.idventa + '" data-idventa="'+data.record.idventa+'" data-cCodConsecutivo="' + data.record.cCodConsecutivo_solicitud + '" data-nConsecutivo="' + data.record.nConsecutivo_solicitud + '"  data-idventa_referencia="'+data.record.idventa_referencia+'" title="Emitir Nota"><i class="fa fa-file-text fa-1-5x"></i></a>';
                    }

                }

            },  
            
            recordsLoaded: function (event, data) {
                $('.emitir-nota').click(function (e) {
                    var idventa = $(this).attr('data-idventa');
                    var idtipodocumento = $(this).attr('data-idtipodocumento');
                    var idventa_referencia = $(this).attr('data-idventa_referencia');
                    var cCodConsecutivo = $(this).attr('data-cCodConsecutivo');
                    var nConsecutivo = $(this).attr('data-nConsecutivo');
                    // alert(idventa_referencia);
                    if(idventa_referencia != "null" && idventa_referencia != "") {
                        AlertFactory.textType({
                            title: '',
                            message: 'Ya se emitio una nota de este documento!',
                            type: 'info'
                        });
                        return false;
                    }

                    if(idtipodocumento == "07") {
                        return false;
                    }

                    $.post("movimientoCajas/get_caja_diaria", {},
                        function (data, textStatus, jqXHR) {
                            // console.log();
                            if (data.length > 0) {

                                $.post("ventas/validar_venta_anticipo", { cCodConsecutivo: cCodConsecutivo, nConsecutivo: nConsecutivo },
                                    function (data, textStatus, jqXHR) {

                                        if(data.length == 0) {

                                            find_documento(idventa);
                                        } else {
                                            AlertFactory.textType({
                                                title: '',
                                                message: 'Este documento por anticipo ya tiene una venta por el saldo',
                                                type: 'info'
                                            });
                                            return false;
                                        }
                                    },  
                                    "json"
                                );

                                
                            } else {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'Primero debe apertura la caja del día',
                                    type: 'info'
                                });
                                return false;
                            }
                        },
                        "json"
                    );
                    e.preventDefault();
                });
               
            },
            formCreated: function (event, data) {
                // data.form.find('input[name="banco"]').attr('onkeypress','return soloLetras(event)');
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="banco"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-ventas', 'LoadRecordsButtonVentas', function(){
            table_container_ventas.jtable('load', {
                search: $('#search_b_ventas').val()
            });
        }, true);

        function obtener_data_for_venta() {
            RESTService.all('ventas/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    // if (response.parametro_igv.length > 0) {
                    //     // alert(response.parametro_igv[0].value);
                    //     // $("#valor_igv").val(response.parametro_igv[0].value);
                    // }
                  
                    $("#idmotivo").append('<option value="">Seleccionar</option>');
                    _.each(response.motivos, function (item) {
                        $("#idmotivo").append('<option value="' + item.codigo + '">' + item.descripcion + '</option>');
                    });

                }
            }, function () {
                obtener_data_for_venta();
            });
        }

        obtener_data_for_venta();

        $(document).on("change", "#serie_comprobante", function () {
            var serie_comprobante = $(this).val();
            if (serie_comprobante != "") {

                var actual = $("#serie_comprobante option[value=" + serie_comprobante + "]").attr("actual");
                $("#numero_comprobante").val(actual);
            }
            // alert(numero);
        });

        function select_comprobante(data) {
            $("#serie_comprobante").html("");
            $("#serie_comprobante").append('<option value="">Seleccionar</option>');
            _.each(data, function (item) {
                if (serie_comprobante == item.serie) {
                    $("#serie_comprobante").append('<option selected="selected" actual="' + item.actual + '" value="' + item.serie + '">' + item.serie + '</option>');
                } else {
                    $("#serie_comprobante").append('<option actual="' + item.actual + '" value="' + item.serie + '">' + item.serie + '</option>');
                }

            });
        }

        function find_documento(id) {
            
            $.post("ventas/find_documento", { idventa: id },
                function (data, textStatus, jqXHR) {

                    if (data.documento.length > 0) {

                        $("#cliente").val(data.documento[0].cliente);
                        $("#idcliente").val(data.documento[0].idcliente);
                        $("#documento").val(data.documento[0].documento);
                        $("#cCodConsecutivo").val(data.documento[0].cCodConsecutivo_solicitud);
                        $("#nConsecutivo").val(data.documento[0].nConsecutivo_solicitud);
                        $("#idventa").val(data.documento[0].idventa);
                        $("#anticipo").val(data.documento[0].anticipo);
                        $("#idmoneda").val(data.documento[0].idmoneda);
                        $("#tipo_comprobante").val(data.documento[0].tipo_comprobante);
                        $("#t_monto_total").val(parseFloat(data.documento[0].t_monto_total).toFixed(2));
                        $("#condicion_pago").val(parseFloat(data.documento[0].condicion_pago).toFixed(2));

                        $("#monto").attr("max", parseFloat(data.documento[0].t_monto_total).toFixed(2));
                        $("#monto").val(parseFloat(data.documento[0].t_monto_total).toFixed(2));
                      
                    }

                    
                    $.post("consecutivos_comprobantes/obtener_consecutivo_comprobante", { tipo_documento: '07' },
                        function (data, textStatus, jqXHR) {
                            select_comprobante(data);
                        },
                        "json"
                    );


                    $("#modalVentas").modal("show");
                },
                "json"
            );
    
            
    
           
        }

        $scope.guardar_venta = function () {
            var bval = true;
            bval = bval && $("#serie_comprobante").required();
            bval = bval && $("#numero_comprobante").required();
            bval = bval && $("#idmotivo").required();
            bval = bval && $("#monto").required();

            if(bval) {
                $.post("ventas/guardar_venta", $("#formulario-ventas").serialize(),
                function (data, textStatus, jqXHR) {

                    if (data.status == "i") {

                   
                        $("#modalVentas").modal("hide");
                       
                        $("#formulario-ventas").trigger("reset");

                        var id = data.datos[0].cCodConsecutivo_solicitud + "|" + data.datos[0].nConsecutivo_solicitud + "|" + data.datos[0].idventa;

                        window.open("movimientoCajas/imprimir_comprobante/" + id);
                        
                        LoadRecordsButtonVentas.click();

                        // nota de credito por un anticipo
                        var msg = "";
                        if(data.datos[0].tipo_comprobante == "0") {
                            msg = "Se registro un movimiento de devolución en movimientos de caja y se debe entregar el dinero al cliente."
                        }

                        AlertFactory.textType({
                            title: '',
                            message: 'El documento se facturó correctamente. '+msg,
                            type: 'success'
                        });

                        // CUANDO ES CREDITO Y ESTA EN ESTADO YA 
                        // var id = data.datos[0].cCodConsecutivo_solicitud + "|" + data.datos[0].nConsecutivo_solicitud + "|" + data.datos[0].idventa;

                        // if (data.datos[0].tipo_solicitud != "1" && data.datos[0].estado == "6") {

                        //     window.open("movimientoCajas/imprimir_cronograma/" + id);
                        // }

                        // window.open("movimientoCajas/imprimir_comprobante/" + id);


                        // id = data.datos[0].cCodConsecutivo_solicitud + "|" + data.datos[0].nConsecutivo_solicitud + "|" + data.datos[0].idventa_ticket;
                        // window.open("movimientoCajas/imprimir_ticket/" + id);


                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: data.msg,
                            type: 'info'
                        });
                    }
                    // console.log(data);
                },
                "json"
            );
            }
        }
    }




    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('ventas', {
                url: '/ventas',
                templateUrl: base_url + '/templates/ventas/base.html',
                controller: 'VentasCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();