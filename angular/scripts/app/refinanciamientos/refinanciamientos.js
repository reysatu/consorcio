/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.refinanciamientos')
        .config(Config)
        .controller('RefinanciamientosCtrl', RefinanciamientosCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    RefinanciamientosCtrl.$inject = ['$scope', 'AlertFactory', 'RESTService', 'Helpers'];

    function RefinanciamientosCtrl($scope, AlertFactory, RESTService, Helpers) {

        function getCliente() {
            var bval = true;
            bval = bval && documento_or.required();
            if (bval) {
                var id = documento_or.val();
                RESTService.get('orden_servicios/get_cliente', id, function (response) {
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
                            message: 'Hubo un error . Intente nuevamente.',
                            type: 'info'
                        });
                    }


                });
            }
        }
        
        function find_solicitud(id) {

            $.post("solicitud/find", { id: id },
                function (data, textStatus, jqXHR) {
                    // console.log(data);

                    Helpers.set_datos_formulario("formulario-solicitud", data.solicitud[0]);
                    if (data.solicitud_credito.length > 0) {
                        Helpers.set_datos_formulario("formulario-creditos", data.solicitud_credito[0]);
                    }

                    $("#documento_or").val(data.solicitud[0].documento);
                    getCliente();
                    $("#tipo_solicitud").trigger("change");
                    $("#IdMoneda").trigger("change");
                    

                    if (data.solicitud_articulo.length > 0) {
                        $("#articulo_mov_det").html("");
                        for (var i = 0; i < data.solicitud_articulo.length; i++) {

                            var codigo = Math.random().toString(36).substr(2, 18);
                            // console.log("um_id => "+data.solicitud_articulo[i].um_id);
                            addArticuloTable(data.solicitud_articulo[i].idarticulo, data.solicitud_articulo[i].producto, data.solicitud_articulo[i].cantidad, 'A', codigo, 'NA', "", "", data.solicitud_articulo[i].idalmacen, data.solicitud_articulo[i].idlocalizacion, data.solicitud_articulo[i].costo, data.solicitud_articulo[i].costo_total, data.solicitud_articulo[i].precio_unitario, data.solicitud_articulo[i].precio_total, data.solicitud_articulo[i].impuesto, data.solicitud_articulo[i].lote, data.solicitud_articulo[i].cOperGrat, data.solicitud_articulo[i].iddescuento, data.solicitud_articulo[i].serie, data.solicitud_articulo[i].um_id);

                        }
                    }

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
                        
                        if(data.solicitud_credito[0].documento_fiadorconyugue != null) {
                            getPersona("fiadorconyugue");
                        }
                       
                    }
                    
                    if(data.solicitud[0].estado == "1") {
                        habilitar_inputs();
                        $("#enviar_solicitud").show();
                    } else {
                        
                        deshabilitar_inputs();
                    }

                    if(data.solicitud[0].estado == "6" && data.solicitud[0].tipo_solicitud == "2") {
                        $("#imprimir-cronograma").show();
                    }

                 
                    $("#aprobaciones").show();
                    $("#imprimir-solicitud").show();
                    $("#modalSolicitud").modal("show");
                },
                "json"
            );
        }



        var search = getFormSearch('frm-search-solicitud', 'search_b_solicitud', 'LoadRecordsButtonSolicitud');

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
                    title: 'Fecha',
                    display: function (data) {
                        return moment(data.record.fecha_solicitud).format('DD/MM/YYYY');
                    }

                },
                tipo_solicitud: {
                    title: 'Tipo Solicitud',
                    options: { '1': 'Contado', '2': 'Crédito Directo', '3': 'Crédito Financiero' },

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
                facturado: {
                    title: 'Facturado',


                },
                estado: {
                    title: 'Estado',
                    options: { '1': 'Registrado', '2': 'Vigente', '3': 'Por Aprobar', '4': 'Aprobado', '5': 'Rechazado', '6': 'Facturado', '7': 'Despachado' },
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-solicitud" data-estado="' + data.record.estado
                            + '" data-id="' + data.record.cCodConsecutivo
                            + '_' + data.record.nConsecutivo + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                }

            },
            recordsLoaded: function (event, data) {
                $('.edit-solicitud').click(function (e) {
                    var id = $(this).attr('data-id');
                    var estado = $(this).data('estado');

                    // if (estado != "1" && estado != "4") {
                    //     AlertFactory.textType({
                    //         title: '',
                    //         message: 'No se puede modificar, la solicitud ya no se encuentra en estado Registrado',
                    //         type: 'info'
                    //     });
                    //     return false;
                    // }

                   
                    find_solicitud(id);
                    e.preventDefault();
                });
                $('.eliminar-solicitud').click(function (e) {
                    var id = $(this).attr('data-id');
                    var estado = $(this).data('estado');
                    var ccodconsecutivo = $(this).data('ccodconsecutivo');
                    var nconsecutivo = $(this).data('nconsecutivo');
                  
                    if (estado != "1") {
                        AlertFactory.textType({
                            title: '',
                            message: 'No se puede eliminar, la solicitud ya no se encuentra en estado Registrado',
                            type: 'info'
                        });
                        return false;
                    }
                    $.post("solicitud/eliminar_solicitud", { cCodConsecutivo : ccodconsecutivo, nConsecutivo: nconsecutivo},
                        function (data, textStatus, jqXHR) {
                            console.log(data);
                            if (data.status == "e") {
                                LoadRecordsButtonSolicitud.click();
                             
                                AlertFactory.textType({
                                    title: '',
                                    message: 'La solicitud se eliminó correctamente.',
                                    type: 'success'
                                });
                              
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
                  
                    e.preventDefault();
                });
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

        generateSearchForm('frm-search-solicitud', 'LoadRecordsButtonSolicitud', function () {
            table_container_solicitud.jtable('load', {
                search: $('#search_b_solicitud').val()
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


        $scope.guardar_refinanciamientos = function () {
            var bval = true;
            // bval = bval && $("#serie_comprobante").required();
            // bval = bval && $("#numero_comprobante").required();
            // bval = bval && $("#idmotivo").required();
            // bval = bval && $("#monto").required();
            var mora = (($("#mora").prop('checked')) ? 1 : 0);
            // console.log(mora);
            if (bval) {
                $.post("refinanciamientos/guardar_refinanciamientos", $("#formulario-solicitud-credito").serialize()+"&nomora="+mora,
                    function (data, textStatus, jqXHR) {

                        if (data.status == "i") {


                            $("#modalSolicitudCredito").modal("hide");

                            $("#formulario-solicitud-credito").trigger("reset");

                            LoadRecordsButtonVentas.click();
                            AlertFactory.textType({
                                title: '',
                                message: 'La Renegociación de la mora se guardó correctamente.',
                                type: 'success'
                            });



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

            .state('refinanciamientos', {
                url: '/refinanciamientos',
                templateUrl: base_url + '/templates/refinanciamientos/base.html',
                controller: 'RefinanciamientosCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();