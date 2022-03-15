/**
 * Created by JAIR on 4/5/2017.
 */

 (function () {
    'use strict';
    angular.module('sys.app.visita_cliente')
        .config(Config)
        .controller('VisitaClienteCtrl', VisitaClienteCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    VisitaClienteCtrl.$inject = ['$scope', 'AlertFactory', 'RESTService'];

    function VisitaClienteCtrl($scope, AlertFactory, RESTService)
    {

        var search = getFormSearch('frm-search-visita_cliente', 'search_b_visita_cliente', 'LoadRecordsButtonvisita_cliente');

        var table_container_visita_cliente = $("#table_container_visita_cliente");

        table_container_visita_cliente.jtable({
            title: "Lista de Visitas a Clientes ",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/visita_cliente/list',
                // createAction: base_url + '/visita_cliente/create',
                // updateAction: base_url + '/visita_cliente/update',
                // deleteAction: base_url + '/visita_cliente/delete',
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
                        $scope.openDoc('visita_cliente/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Visita',
                    click: function () {
                        newVisitaCliente();
                    }
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false,
                    title: 'id',
                },
                fechareg: {
                    title: 'Fecha',
                    display: function (data) {
                        return moment(data.record.fecha_emision).format('DD/MM/YYYY');
                    }

                },
                cobrador: {
                    title: 'Cobrador',


                },
                estado: {
                    title: 'Estado',


                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="emitir-nota" data-estado="' + data.record.estado + '"  data-tipo_solicitud="' + data.record.tipo_solicitud + '" data-idtipodocumento="' + data.record.IdTipoDocumento + '"  data-anticipo="' + data.record.anticipo + '" data-id="' + data.record.cCodConsecutivo_solicitud + '|' + data.record.nConsecutivo_solicitud + '|' + data.record.idventa + '" data-idventa="'+data.record.idventa+'" data-idventa_referencia="'+data.record.idventa_referencia+'" title="Emitir Nota"><i class="fa fa-file-text fa-1-5x"></i></a>';
                    }

                }

            },  
            
            recordsLoaded: function (event, data) {
                $('.emitir-nota').click(function (e) {
                    var idventa = $(this).attr('data-idventa');
                    var idtipodocumento = $(this).attr('data-idtipodocumento');
                    var idventa_referencia = $(this).attr('data-idventa_referencia');
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
                                find_documento(idventa);
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

        generateSearchForm('frm-search-visita_cliente', 'LoadRecordsButtonvisita_cliente', function(){
            table_container_visita_cliente.jtable('load', {
                search: $('#search_b_visita_cliente').val()
            });
        }, true);

        function obtener_data_for_visita() {
            RESTService.all('visita_cliente/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    // if (response.parametro_igv.length > 0) {
                    //     // alert(response.parametro_igv[0].value);
                    //     // $("#valor_igv").val(response.parametro_igv[0].value);
                    // }
                  
                    $("#idmotivo").append('<option value="">Seleccionar</option>');
                    _.each(response.motivos, function (item) {
                        $("#idmotivo").append('<option value="' + item.codigo + '">' + item.descripcion + '</option>');
                    });


                    $("#idcobrador").append('<option value="" selected>Seleccionar</option>');
                    response.cobrador.map(function (index) {
                       $("#idcobrador").append('<option value="'+index.id+'">'+index.descripcion+'</option>');
                    });


                    $("#idcliente").append('<option value="" selected>Seleccionar</option>');
                    response.clientes.map(function (index) {
                       $("#idcliente").append('<option data-cliente="'+index.razonsocial_cliente+'" value="'+index.id+'">'+index.razonsocial_cliente+'</option>');
                    });



                    $("#idcobrador").select2();
                    $("#idcliente").select2();
                   

                }
            }, function () {
                obtener_data_for_visita();
            });
        }

        obtener_data_for_visita();

        function newVisitaCliente() {
            // alert("hola");
            $("#modal-visita").modal("show");
        }


        $(document).on("change", "#idcliente", function () {
            var idcliente = $(this).val();
            $.post("visita_cliente/obtener_solicitud", { idcliente: idcliente},
                function (data, textStatus, jqXHR) {
                    // console.log(data);
                    if(data.length > 0) {
                        $("#idsolicitud").append('<option value="" selected>Seleccionar</option>');
                        data.map(function (index) {
                        $("#idsolicitud").append('<option data-saldo="'+index.saldo+'" value="'+index.id+'">'+index.descripcion+'</option>');
                        });
                        $("#idsolicitud").select2();
                    }  else {
                        AlertFactory.textType({
                            title: '',
                            message: 'El cliente no tiene solicitudes a credito con cuotas pendientes.',
                            type: 'info'
                        });
                    }
                    
                },  
                "json"
            );
        });

        $(document).on("change", "#idsolicitud", function () {
            var id = $(this).val();
            $.post("solicitud/find", { id: id },
            function (data, textStatus, jqXHR) {



                var prox_venc = "";
                if (data.solicitud_cronograma.length > 0) {
                    var html = "";
                    var disabled = "";
                    var checked = "";
                    for (var index = 0; index < data.solicitud_cronograma.length; index++) {
                        disabled = "";
                        checked = "";
                        //    console.log(data.solicitud_cronograma[index].saldo_cuota);
                        if (data.solicitud_cronograma[index].saldo_cuota != 0 && prox_venc == "") {
                            prox_venc = data.solicitud_cronograma[index].fecha_vencimiento_credito;
                        }

                     

                        html += '<tr>';
                        html += '<td><span class="inputs-hidden" nrocuota="'+data.solicitud_cronograma[index].nrocuota+'" ></span>'+data.solicitud_cronograma[index].fecha_vencimiento+'</td>';
                        
                        html += '<td class="valor-cuota">'+parseFloat(data.solicitud_cronograma[index].valor_cuota).toFixed(2)+'</td>';
                        html += '<td class="int-moratorio">'+parseFloat(data.solicitud_cronograma[index].int_moratorio).toFixed(2)+'</td>';
                        html += '<td class="">'+parseFloat(data.solicitud_cronograma[index].saldo_cuota).toFixed(2)+'</td>';
                        html += '<td class="">'+parseFloat(data.solicitud_cronograma[index].monto_pago).toFixed(2)+'</td>';
                        
                        html += '<td>'+data.solicitud_cronograma[index].nrocuota+'</td>';
                        if(parseFloat(data.solicitud_cronograma[index].saldo_cuota) > 0) {
                          
                            html += '<input type="hidden" class="" name="nrocuota[]" value="'+data.solicitud_cronograma[index].nrocuota+'" >';
                            html += '<td><center><input type="checkbox" nrocuota="'+data.solicitud_cronograma[index].nrocuota+'" value="'+data.solicitud_cronograma[index].nrocuota+'" class="check-cuota" /></center></td>';
                        } else {
                            html += '<td class=""></td>';
                            
                            html += '<td class=""></td>';
                        }
                        
                        

                      
                        html += '</tr>';
                    }
                    // alert(html);
                    $("#cuotas-credito").html(html);
                    // alert(prox_venc);
                    $("#prox_venc_credito").val(prox_venc);
                }

                $("#modalSolicitudCredito").modal("show");
            },
            "json"
        );
        })
      

        function find_documento(id) {
            
            $.post("visita_cliente/find_documento", { idventa: id },
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


                    $("#modalvisita_cliente").modal("show");
                },
                "json"
            );
    
            
    
           
        }

        $scope.agregar_solicitud = function () {
            // alert("hola");
            $("#idcliente").val("");
            $("#idsolicitud").val("");
            $("#cuotas-credito").html("");
            $("#modal-detalle").modal("show");
        }

        $scope.agregar_solicitud_detalle = function () {
            // alert("hola");
            var cliente = $('#idcliente').find(':selected').data('cliente');
            var saldo = parseFloat($('#idsolicitud').find(':selected').data('saldo'));
            var idcliente = $("#idcliente").val();
            var idsolicitud = $("#idsolicitud").val();

            var checks = $(".check-cuota");
            var cuotas = [];
            for (var check = 0; check < checks.length; check++) {
                if($(checks[check]).is(":checked")) {
                    cuotas.push($(checks[check]).val());
                  
                }

              
            }

            var html = '<tr>';
            html += '    <input type="hidden" name="cuotas[]" value="'+cuotas.join(",")+'" />';
            html += '    <input type="hidden" name="idcliente[]" value="'+idcliente+'" />';
            html += '    <input type="hidden" name="idsolicitud[]" value="'+idsolicitud+'" />';
            html += '    <td>'+cliente+'</td>';
            html += '    <td>'+idsolicitud+'</td>';
            html += '    <td>'+saldo.toFixed(2)+'</td>';
            html += '    <td>['+cuotas.join(",")+']</td>';
            html += '    <td><button type="button" class="btn btn-danger btn-xs eliminar-detalle-solicitud"><i class="fa fa-trash"></i></button></td>';
            html += '</tr>';

            $("#detalle-visitas").append(html);
            $("#modal-detalle").modal("hide");  
        }

        $scope.guardar_visita = function () {
            var bval = true;
            bval = bval && $("#fechareg").required();
            bval = bval && $("#idcobrador").required();

            if($("#detalle-visitas").html() == "") {
                AlertFactory.textType({
                    title: '',
                    message: "Debe ingresar al menos una solicitud al detalle!",
                    type: 'info'
                });
                return false;
            }

            if(bval) {
                $.post("visita_cliente/guardar_visita", $("#formulario-visita").serialize(),
                function (data, textStatus, jqXHR) {

                    if (data.status == "i") {

                   
                        $("#modal-visita").modal("hide");
                       
                        $("#formulario-visita").trigger("reset");

                        // var id = data.datos[0].cCodConsecutivo_solicitud + "|" + data.datos[0].nConsecutivo_solicitud + "|" + data.datos[0].idventa;

                        // window.open("movimientoCajas/imprimir_comprobante/" + id);
                        
                        LoadRecordsButtonvisita_cliente.click();
                        // AlertFactory.textType({
                        //     title: '',
                        //     message: 'El documento se facturó correctamente.',
                        //     type: 'success'
                        // });

                      


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

            .state('visita_cliente', {
                url: '/visita_cliente',
                templateUrl: base_url + '/templates/visita_cliente/base.html',
                controller: 'VisitaClienteCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();