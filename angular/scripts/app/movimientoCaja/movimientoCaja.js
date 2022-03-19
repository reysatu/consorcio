/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict'; 
    angular.module('sys.app.movimientoCajas')
        .config(Config)
        .controller('movimientoCajaCtrl', movimientoCajaCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    movimientoCajaCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory', 'Notify', 'Helpers'];

    function movimientoCajaCtrl($scope, _, RESTService, AlertFactory, Notify, Helpers) {
        // Helpers.saludo();
        // var modalMovCaj=$("#modalMovCaj");
        // var titleModalMovCaj=$("#titleModalMovCaj");

        // function newMovimiCaja()
        // {
        //     titleModalMovCaj.html('Nuevo Movimiento de caja');
        //     modalMovCaj.modal('show');
        // }
        var cuentas_bancarias;
        var nrOperacion = $("#nrOperacion");
        var banco = $("#banco");
        var cuentaBancaria = $("#cuentaBancaria");

        var tipoMovimientoAdd = $("#tipoMovimientoAdd");
        var idMonedaAdd = $("#idMonedaAdd");
        var conceptoAdd = $("#conceptoAdd");
        var montoAdd = $("#montoAdd");
        var formaPagoAdd = $("#formaPagoAdd");

        var modalMovimientoCaja = $("#modalMovimientoCaja");
        var btn_MovimientoInicio = $("#btn_MovimientoInicio");

        var btn_imprimirCaja = $("#btn_imprimirCaja");
        var table_movimientoEfecti = $("#table_movimientoEfecti");
        var usuarioActual;
        var modalAperturaCaja = $("#modalAperturaCaja");
        var titlemodalAperturaCaja = $("#titlemodalAperturaCaja");
        var fecha_actualMc = $("#fecha_actualMc");
        var idUsuario = $("#idUsuario");
        var idCaja = $("#idCaja");
        var estado = $("#estado");
        var estadoMc = $("#estadoMc");
        var caja_text = $("#caja_text");
        var idcajaMC = $("#idcajaMC");
        var btn_Mapertura = $("#btn_Mapertura");
        var btn_Mcierra = $("#btn_Mcierra");
        var ventanaP;
        var caja_sin = $("#caja_sin");
        var idCajaDiaria = $("#idCajaDiaria");
        var fechaCaja = $("#fechaCaja");
        var table_movimientoDEfecti = $("#table_movimientoDEfecti");
        var consecutivo = $("#consecutivo");
        var btn_procesarApertura = $("#btn_procesarApertura");
        var totalEfectivo = $("#totalEfectivo");
        var totalEgresos = $("#totalEgresos");
        var totalOtrosIngresos = $("#totalOtrosIngresos");
        var totalNoEfectivo = $("#totalNoEfectivo");
        var totalEfectivoDol = $("#totalEfectivoDol");
        var totalEgresosDol = $("#totalEgresosDol");
        var totalOtrosIngresosDol = $("#totalOtrosIngresosDol");
        var totalNoEfectivoDol = $("#totalNoEfectivoDol");

        var btn_apertura = $("#btn_apertura");
        var btn_cierra = $("#btn_cierra");

        var table_demoninacionesSoles = $("#table_demoninacionesSoles");
        var totalSoles = $("#totalSoles");
        var table_demoninacionesDolares = $("#table_demoninacionesDolares");
        var totalDolares = $("#totalDolares");
        $('#btn_MovimientoInicio').click(function (e) {
            $.post("movimientoCajas/get_caja_diaria", {},
                function (data, textStatus, jqXHR) {
                    // console.log();

                    if (data.length > 0) {

                        modalMovimientoCaja.modal('show');
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
           
        });

        $("#documento_cliente").keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                getCliente("movimiento_caja");
            }
        });


        function cleanMovimientoCajaAdd() {
            cleanRequired();
            tipoMovimientoAdd.val("");
            idMonedaAdd.val("");
            conceptoAdd.val("");
            montoAdd.val("");
            cuentaBancaria.val("");
            nrOperacion.prop('disabled', true);
            nrOperacion.val("");
            banco.prop('disabled', true);
            cuentaBancaria.prop('disabled', true);
            banco.val("").trigger("change");
        }

        modalMovimientoCaja.on('hidden.bs.modal', function (e) {
            cleanMovimientoCajaAdd();
        });

        $('#btn_Mapertura').click(function (e) {
            // ventanaP='A';
            // if(estado.val()==""){
            if (caja_sin.html() != "") {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe cerrar la caja pendiente',
                    type: 'info'
                });
            } else {
                idUsuario.val(usuarioActual).trigger("change");
                titlemodalAperturaCaja.html('Nueva Apertura de Caja');
                generarTablaApertura();
                modalAperturaCaja.modal('show');
            }
        });
        btn_imprimirCaja.click(function (e) {
                var data = {id: '0',};
               if (estadoMc.val() != '') {
                    if($("#estadReporte").val()==1){
                       $scope.loadMovimientoCajaPDF('movimientoCajas/pdf', data);
                    }else if($("#estadReporte").val()==2){
                       $scope.loadMovimientoCuadreCajaPDF('movimientoCajas/Cuadrepdf', data);
                     }else if($("#estadReporte").val()==3){
                       $scope.loadMovimientoEmisionComproPDF('movimientoCajas/EmisionComprpdf', data);
                    }
               }
        });
        tipoMovimientoAdd.change(function (e) {
            $(".separacion").hide();
            if (tipoMovimientoAdd.val() == 'BCO') {
                nrOperacion.prop('disabled', false);
                banco.prop('disabled', false);
                cuentaBancaria.prop('disabled', false);
            } else {
                nrOperacion.prop('disabled', true);
                nrOperacion.val("");
                banco.prop('disabled', true);
                banco.val("").trigger("change");
                cuentaBancaria.prop('disabled', true);
                cuentaBancaria.val("");
            }

            if (tipoMovimientoAdd.val() == 'SEP') {
            
                $(".separacion").show();
            }
        });
        $('#btn_Mcierra').click(function (e) {
            if (estadoMc.val() == "") {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe aperturar la caja',
                    type: 'info'
                });
            } else if (estadoMc.val() == 1) {
                console.log("texi");
                if (caja_sin.html() != "") {
                    AlertFactory.showWarning({
                        title: '',
                        message: 'Debe cerrar la caja pendiente',
                        type: 'info'
                    });
                } else {
                    titlemodalAperturaCaja.html('Cierre de Caja');
                    var idcaja = idcajaMC.val();
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

                    fechaCaja.prop('disabled', true);
                    idCaja.prop('disabled', true);
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
            var hAnio = hoy.getFullYear();
            var hmes = hoy.getMonth() + 1;
            if (Number(hmes) < 10) {
                hmes = '0' + String(hmes);
            }

            var hdia = hoy.getDate();
            if (Number(hdia) < 10) {
                hdia = '0' + String(hdia);
            }
            var hora = hoy.getHours();
            if (Number(hora) < 10) {
                hora = '0' + String(hora);
            }
            var minutos = hoy.getMinutes();
            if (Number(minutos) < 10) {
                minutos = '0' + String(minutos);
            }
            var actu = hAnio + '-' + hmes + '-' + hdia;
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

                    fechaCaja.prop('disabled', true);
                    idCaja.prop('disabled', true);
                    if (data_p.estado == 0) {
                        btn_procesarApertura.prop('disabled', true);
                    }
                    ventanaP = 'A';
                    // console.log(data_p);
                    // console.log(data_detalle);
                    console.log(dataDenominacion);

                    consecutivo.val(data_detalle[0].consecutivo);

                    _.each(dataDenominacion, function (c) {
                        if (c.idMoneda == '1' && c.tipo == '1') {
                            var estadoCant = 'disabled';
                            addDenominacionSoles(c.id_denominacion, c.descripcion, Number(c.cantidad), Number(c.monto), estadoCant);
                        } else if (c.idMoneda == '2' && c.tipo == '1') {
                            var estadoCant = 'disabled';
                            addDenominacionDolar(c.id_denominacion, c.descripcion, Number(c.cantidad), Number(c.monto), estadoCant);
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
        banco.change(function (e) {
            cargarCuentasBancarias();
        });
        idMonedaAdd.change(function (e) {
            cargarCuentasBancarias();
        });
        function cargarCuentasBancarias() {
            var bval = true;
            cuentaBancaria.html("");
            cuentaBancaria.append('<option value="">Seleccionar</option>');
            bval = bval && idMonedaAdd.required();
            bval = bval && banco.required();
            if (bval) {
                _.each(cuentas_bancarias, function (item) {
                    if (item.idbanco == banco.val() && item.IdMoneda == idMonedaAdd.val()) {
                        cuentaBancaria.append('<option value="' + item.id_cuentabancaria + '*' + item.numero_cuenta + '">' + item.numero_cuenta + ' ' + item.descripcion_cuenta + '</option>');
                    }

                });
            }
        }

        function getDataFormCajaInicio() {
            RESTService.all('movimientoCajas/data_formIncio', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    banco.append('<option value="">Seleccionar</option>');
                    _.each(response.bancos, function (item) {
                        banco.append('<option value="' + item.idbanco + '">' + item.descripcion + '</option>');
                    });
                    cuentas_bancarias = response.cuenta_bancarias;
                }
            }, function () {
                getDataFormCajaInicio();
            });
        }
        getDataFormCajaInicio();
        function getDataFormDescuento() {
            RESTService.all('movimientoCajas/data_formUsu', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    idUsuario.append('<option value="">Seleccionar</option>');
                    _.each(response.usuarios, function (item) {
                        idUsuario.append('<option value="' + item.id + '">' + item.name + '</option>');

                    });
                }
            }, function () {
                getDataFormDescuento();
            });
        }
        getDataFormDescuento();
        Fecha_actual();
        function getDataFormCajaDiaria() {
            RESTService.all('movimientoCajas/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    console.log(response.cajas);
                    idCaja.append('<option value="">Seleccionar</option>');
                    _.each(response.cajas, function (item) {
                        idCaja.append('<option value="' + item.idcaja + '">' + item.nombre_caja + '</option>');
                    });
                    idUsuario.val(response.usuario).trigger("change");
                    usuarioActual = response.usuario;

                    cuentaBancaria
                }
            }, function () {
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

        function generarTablaView(apertura) {
            table_demoninacionesSoles.html("");
            table_demoninacionesDolares.html("");
            var id = idCajaDiaria.val();
            RESTService.get('movimientoCajas/getDenominacionesView', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.dataDenominacion;
                    table_demoninacionesSoles.html("");
                    table_demoninacionesDolares.html("");
                    _.each(data_p, function (c) {
                        if (c.idMoneda == '1' && c.tipo == apertura) {
                            var estadoCant = 'disabled';
                            addDenominacionSoles(c.id_denominacion, c.descripcion, Number(c.cantidad), Number(c.monto), estadoCant);
                        } else if (c.idMoneda == '2' && c.tipo == apertura) {
                            var estadoCant = 'disabled';
                            addDenominacionDolar(c.id_denominacion, c.descripcion, Number(c.cantidad), Number(c.monto), estadoCant);
                        }

                    });
                    sumar_cantidades();
                    console.log(data_p);
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        function sumar_cantidades() {
            console.log("sumando");
            var totalt = 0;
            var totalD = 0;
            $("#table_demoninacionesSoles tr").each(function () {
                var cantidadt = Number($(this).find("td:eq(1)").children("input").val());
                var monto = Number($(this).find("td:eq(2)").children("input").val());
                var montest = Number($(this).find("td:eq(2)").children("input").attr('data-montoEsta'));

                var subtota = cantidadt * montest;
                 $(this).find("td:eq(2)").children("input").val(Number(subtota).toFixed(2))
                totalt = totalt + subtota;
                console.log("sumando2");
            });
            totalSoles.val(totalt.toFixed(2));
            $("#table_demoninacionesDolares tr").each(function () {
                var cantidadt = Number($(this).find("td:eq(1)").children("input").val());
                var monto = Number($(this).find("td:eq(2)").children("input").val());
                var montest = Number($(this).find("td:eq(2)").children("input").attr('data-montoEsta'));

                var subtota = cantidadt * montest;
                $(this).find("td:eq(2)").children("input").val(Number(subtota).toFixed(2))
                totalD = totalD + subtota;
                console.log("sumando2");
            });
            totalDolares.val(totalD.toFixed(2));
            if (estado.val() == '') {
                totalEfectivo.val(totalt.toFixed(2));
                totalEfectivoDol.val(totalD.toFixed(2));
            }
        }
        function generarTablaApertura() {
            table_demoninacionesSoles.html("");
            table_demoninacionesDolares.html("");
            var id = "0";
            var tabs = 0;
            RESTService.get('movimientoCajas/getDenominaciones', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.dataDenominacion;
                    _.each(data_p, function (c) {
                        if (c.idMoneda == '1') {
                            var cantidad = 0;
                            var estadoCant = '';
                            tabs = tabs + 1;
                            addDenominacionSoles(c.id_denominacion, c.descripcion, cantidad, Number(c.valor), estadoCant, tabs);
                        }

                    });
                    _.each(data_p, function (c) {
                        if (c.idMoneda == '2') {
                            var cantidad = 0;
                            var estadoCant = '';
                            tabs = tabs + 1;
                            addDenominacionDolar(c.id_denominacion, c.descripcion, cantidad, Number(c.valor), estadoCant, tabs);
                        }

                    });
                    tabs = tabs + 1;
                    $("#btn_procesarApertura").attr('tabindex', tabs);
                    sumar_cantidades();
                    console.log(data_p);
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }

        function addDenominacionSoles(idDenominacion, denominacion, cantidad, monto, estadoCant, tabs) {
            var tr = $('<tr id="tr_b_' + idDenominacion + '"></tr>');
            var td1 = $('<td>' + denominacion + '</td>');
            var td2 = $('<td></td>');
            var td3 = $('<td></td>');
            var iddenominacion = $('<input type="hidden" name="idDenominacionS[]" class="idDenominacionS form-control input-sm"  value="' + idDenominacion + '"  />');
            var cantidad = $('<input type="text" name="cantidadS[]" class="cantidadS form-control input-sm"  value="' + cantidad + '"   tabindex="' + tabs + '" onkeypress="return soloNumeros(event)" ' + estadoCant + '/>');
            var monto = $('<input type="text" name="montoS[]" class="montoS form-control input-sm" data-montoEsta="'+monto+'" value="' + monto + '"  disabled/>');
            var montest = $('<input type="hidden" class="montoSt form-control input-sm"  value="' + monto + '"  disabled/>');
            td1.append(iddenominacion);
            td2.append(cantidad);
            td3.append(monto).append(montest);
            tr.append(td1).append(td2).append(td3);
            table_demoninacionesSoles.append(tr);

            // $('.cantidadS').keyup(function (e) {
            //     sumar_cantidades();
            // });

            $('.cantidadS').keypress(function (e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) {
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
         $(document).on("keyup", ".cantidadS", function () {
              sumar_cantidades();
        });
           $(document).on("keyup", ".cantidadD", function () {
              sumar_cantidades();
        });
        function addDenominacionDolar(idDenominacion, denominacion, cantidad, monto, estadoCant, tabs) {
            var tr = $('<tr id="tr_b_' + idDenominacion + '"></tr>');
            var td1 = $('<td>' + denominacion + '</td>');
            var td2 = $('<td></td>');
            var td3 = $('<td></td>');
            var iddenominacion = $('<input type="hidden" name="idDenominacionD[]" class="idDenominacionD form-control input-sm"  value="' + idDenominacion + '"  />');
            var cantidad = $('<input type="text" name="cantidadD[]" class="cantidadD form-control input-sm"  value="' + cantidad + '"  tabindex="' + tabs + '" onkeypress="return soloNumeros(event)" ' + estadoCant + '/>');
            var monto = $('<input type="text" name="montoD[]" class="montoD form-control input-sm" data-montoEsta="'+monto+'" value="' + monto + '"  disabled/>');
            td1.append(iddenominacion);
            td2.append(cantidad);
            td3.append(monto);
            tr.append(td1).append(td2).append(td3);
            table_demoninacionesDolares.append(tr);
            // $('.cantidadD').keyup(function (e) {
            //     sumar_cantidades();
            // });
            $('.cantidadD').keypress(function (e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) {
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
            idCaja.prop('disabled', false);
            btn_procesarApertura.prop('disabled', false);
            totalDolares.val("");
        }

        modalAperturaCaja.on('hidden.bs.modal', function (e) {
            cleanAperturaCaja();
        });
        $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        function newAperturaCaja() {
            titlemodalAperturaCaja.html('Nueva Apertura de Caja');
            modalAperturaCaja.modal('show');
        }
        $scope.saveAddMovimientoCaja = function () {
            var bval = true;
            bval = bval && tipoMovimientoAdd.required();
            bval = bval && idMonedaAdd.required();
            bval = bval && montoAdd.required();

            if (tipoMovimientoAdd.val() == 'BCO') {
                bval = bval && nrOperacion.required();
                bval = bval && banco.required();
                bval = bval && cuentaBancaria.required();
            }
            if (tipoMovimientoAdd.val() != 'BCO') {
                bval = bval && conceptoAdd.required();
            }
            if (bval) {
                var to = cuentaBancaria.val();
                var toCuenta = to.split('*');
                var params = {
                    'tipoMovimientoAdd': tipoMovimientoAdd.val(),
                    'idMonedaAdd': idMonedaAdd.val(),
                    'montoAdd': montoAdd.val(),
                    'conceptoAdd': conceptoAdd.val(),
                    'formaPagoAdd': formaPagoAdd.val(),
                    'nrOperacion': nrOperacion.val(),
                    'bancoText': $("#banco option:selected").text(),
                    'idBanco': banco.val(),
                    'idCuenta': toCuenta[0],
                    'numero_cuenta': toCuenta[1],

                    'serie_comprobante': $("#serie_comprobante_m").val(),
                    'numero_comprobante': $("#numero_comprobante_m").val(),
                    'IdTipoDocumento': $("#tipo_doc_venta").val(),
                    'idcliente': $("#idcliente_m").val(),


                };
                var id = idcajaMC.val();
                RESTService.updated('movimientoCajas/saveMovimientoCaja', id, params, function (response) {
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

        $scope.saveCajasDiarias = function () {
            var bval = true;
            bval = bval && fechaCaja.required();
            bval = bval && idCaja.required();
            bval = bval && idUsuario.required();

            if ($("#table_demoninacionesSoles").html() == '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe aperturar o cerrar la caja',
                    type: 'info'
                });
                return false;
            }
            if ($("#table_demoninacionesDolares").html() == '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe aperturar o cerrar la caja',
                    type: 'info'
                });
                return false;
            }


            if (estado.val() == '') {
                if (totalEfectivo.val() < 0) {
                    AlertFactory.showWarning({
                        title: '',
                        message: 'El total efectivo no puede ser menor a cero',
                        type: 'info',
                    });
                    return false;
                }
                if (totalEfectivoDol.val() < 0) {
                    AlertFactory.showWarning({
                        title: '',
                        message: 'El total efectivo no puede ser menor a cero',
                        type: 'info',
                    });
                    return false;
                }

            } else if (estado.val() == 1) {
                if (Number(totalEfectivo.val()) != Number(totalSoles.val())) {
                    AlertFactory.showWarning({
                        title: '',
                        message: 'El total efectivo soles no es igual al monto ingresado',
                        type: 'info'
                    });
                    return false;
                }
                if (Number(totalEfectivoDol.val()) != Number(totalDolares.val())) {
                    AlertFactory.showWarning({
                        title: '',
                        message: 'El total efectivo dólares no es igual al monto ingresado',
                        type: 'info',
                    });
                    return false;
                }
                if (ventanaP == 'A') {
                    AlertFactory.showWarning({
                        title: '',
                        message: 'Ingrese montos para cerrar caja',
                        type: 'info',
                    });
                    return false;
                }

            }

            if (bval) {
                var textS = "";
                var textD = "";

                if (Number(totalEfectivo.val()) == 0) {
                    textS = " ,con 0 efectivo en soles";
                }
                if (Number(totalEfectivoDol.val()) == 0) {
                    textD = " ,con 0 efectivo en dólares";
                }
                AlertFactory.confirm({
                    title: '',
                    message: "¿Está seguro que desea procesar esta caja" + textS + " " + textD + "?",
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {

                    var idDenominacionS = [];
                    $.each($('.idDenominacionS'), function (idx, item) {
                        idDenominacionS[idx] = $(item).val();
                    });
                    idDenominacionS = idDenominacionS.join(',');

                    var cantidadS = [];
                    $.each($('.cantidadS'), function (idx, item) {
                        cantidadS[idx] = $(item).val();
                    });
                    cantidadS = cantidadS.join(',');

                    var montoS = [];
                    $.each($('.montoS'), function (idx, item) {
                        montoS[idx] = $(item).val();
                    });
                    montoS = montoS.join(',');

                    var idDenominacionD = [];
                    $.each($('.idDenominacionD'), function (idx, item) {
                        idDenominacionD[idx] = $(item).val();
                    });
                    idDenominacionD = idDenominacionD.join(',');

                    var cantidadD = [];
                    $.each($('.cantidadD'), function (idx, item) {
                        cantidadD[idx] = $(item).val();
                    });
                    cantidadD = cantidadD.join(',');

                    var montoD = [];
                    $.each($('.montoD'), function (idx, item) {
                        montoD[idx] = $(item).val();
                    });
                    montoD = montoD.join(',');

                    var params = {
                        'fechaCaja': fechaCaja.val(),
                        'idCaja': idCaja.val(),
                        'idUsuario': idUsuario.val(),
                        'idDenominacionS': idDenominacionS,
                        'cantidadS': cantidadS,
                        'montoS': montoS,
                        'idDenominacionD': idDenominacionD,
                        'cantidadD': cantidadD,
                        'montoD': montoD,
                        'totalEfectivo': totalEfectivo.val(),
                        'totalEgresos': totalEgresos.val(),
                        'totalOtrosIngresos': totalOtrosIngresos.val(),
                        'totalNoEfectivo': totalNoEfectivo.val(),
                        'totalEfectivoDol': totalEfectivoDol.val(),
                        'totalEgresosDol': totalEgresosDol.val(),
                        'totalOtrosIngresosDol': totalOtrosIngresosDol.val(),
                        'totalNoEfectivoDol': totalNoEfectivoDol.val(),
                        'estado': estado.val(),
                        'consecutivo': consecutivo.val(),
                    }; 
                    var id = (idCajaDiaria.val() === '') ? 0 : idCajaDiaria.val();
                    RESTService.updated('movimientoCajas/saveCajasDiarias', id, params, function (response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            var cajaGuar = response.dataCaja;
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
        function cerrarCaja(id) {
            console.log(id);
            titlemodalAperturaCaja.html('Cierre de Caja');
            findCajaDiariaMc(id);
            generarTablaApertura();
        }
        function addTableEfecSol(codigoTipo, tipotext, monto, tipoSum) {
            //  if ($('#tr_b_' + codigoTipo).length > 0) {
            //     var tota=Number($('#tr_b_' + codigoTipo).find("td:eq(2)").children("p").text());
            //     console.log("esdto es total");
            //     console.log(tota);
            //     var ntotal=Number(tota)+Number(monto);
            //     $('#tr_b_' + codigoTipo).find("td:eq(2)").children("p").text(ntotal.toFixed(2));

            // }else{
            console.log("entrovvvv");
            var tr = $('<tr id="tr_b_' + codigoTipo + '"></tr>');
            var td0 = $('<td></td>');
            var td1 = $('<td><p>' + tipotext + '</p></td>');
            var td2 = $('<td style="text-align:center; vertical-align:middle"><p>' + monto.toFixed(2) + '</p></td>');
            var tip = $('<input type="hidden" class=" form-control input-sm"  value="' + tipoSum + '"  />');
            td0.append(tip);
            tr.append(td0).append(td1).append(td2);
            table_movimientoEfecti.append(tr);
            // }


            //  $('.cantidadS').keyup(function (e) {
            //      sumar_cantidades();
            // });
        }
        function addTableEfecDolar(codigoTipo, tipotext, monto, tipoSum) {
            //  if ($('#tr_bd_' + codigoTipo).length > 0) {
            //     var tota=Number($('#tr_bd_' + codigoTipo).find("td:eq(2)").children("p").text());
            //     console.log("esdto es total");
            //     console.log(tota);
            //     var ntotal=Number(tota)+Number(monto);
            //     $('#tr_bd_' + codigoTipo).find("td:eq(2)").children("p").text(ntotal.toFixed(2));

            // }else{
            console.log("entrovvvv");
            var tr = $('<tr id="tr_bd_' + codigoTipo + '"></tr>');
            var td0 = $('<td></td>');
            var td1 = $('<td><p>' + tipotext + '</p></td>');
            var td2 = $('<td style="text-align:center; vertical-align:middle"><p>' + monto.toFixed(2) + '</p></td>');
            var tip = $('<input type="hidden" class=" form-control input-sm"  value="' + tipoSum + '"  />');
            td0.append(tip);
            tr.append(td0).append(td1).append(td2);
            table_movimientoDEfecti.append(tr);
            // }


            //  $('.cantidadS').keyup(function (e) {
            //      sumar_cantidades();
            // });
        }
        function calcularTotalEfect(tipoSumX, totalefecdb) {
            var totalEfectivo = 0;
            var totalForma = 0;
            $("#table_movimientoEfecti tr").each(function () {
                var tipo = $(this).find("td:eq(0)").children("input").val();
                var total = Number($(this).find("td:eq(2)").children("p").text());
                if (tipo == 'SE') {
                    totalEfectivo = total + totalEfectivo;
                } else {
                    totalForma = total + totalForma;
                }
            });
            if (tipoSumX == 'SE') {
                var tr = $('<tr></tr>');
                var td0 = $('<th height="20px" width="30px"></th>');
                var td1 = $('<th height="20px" width="30px" style="text-align:left; vertical-align:middle">TOTAL EFECTIVO</th>');
                var td2 = $('<th height="20px" width="30px">' + Number(totalefecdb).toFixed(2) + '</th>');
                tr.append(td0).append(td1).append(td2);
                table_movimientoEfecti.append(tr);
                var tr2 = $('<tr></tr>');
                var td02 = $('<th height="20px" width="30px"></th>');
                var td12 = $('<th height="20px" width="30px" style="text-align:left; vertical-align:middle">VENTAS FORMA DE PAGO</th>');
                var td22 = $('<th height="20px" width="30px"></th>');
                tr2.append(td02).append(td12).append(td22);
                table_movimientoEfecti.append(tr2);
            } else {
                var tr = $('<tr></tr>');
                var td0 = $('<th height="20px" width="30px"></th>');
                var td1 = $('<th height="20px" width="30px" style="text-align:left; vertical-align:middle">TOTAL VENTA</th>');
                var td2 = $('<th height="20px" width="30px">' + totalForma.toFixed(2) + '</th>');
                tr.append(td0).append(td1).append(td2);
                table_movimientoEfecti.append(tr);
            }


        }
        function calcularTotalEfectDola(tipoSumX, totalefecdb) {
            var totalEfectivo = 0;
            var totalForma = 0;
            $("#table_movimientoDEfecti tr").each(function () {
                var tipo = $(this).find("td:eq(0)").children("input").val();
                var total = Number($(this).find("td:eq(2)").children("p").text());
                if (tipo == 'DE') {
                    totalEfectivo = total + totalEfectivo;
                } else {
                    totalForma = total + totalForma;
                }
            });
            if (tipoSumX == 'DE') {
                var tr = $('<tr></tr>');
                var td0 = $('<th height="20px" width="30px"></th>');
                var td1 = $('<th height="20px" width="30px" style="text-align:left; vertical-align:middle">TOTAL EFECTIVO</th>');
                var td2 = $('<th height="20px" width="30px">' + Number(totalefecdb).toFixed(2) + '</th>');
                tr.append(td0).append(td1).append(td2);
                table_movimientoDEfecti.append(tr);
                var tr2 = $('<tr></tr>');
                var td02 = $('<th height="20px" width="30px"></th>');
                var td12 = $('<th height="20px" width="30px" style="text-align:left; vertical-align:middle">VENTAS FORMA DE PAGO</th>');
                var td22 = $('<th height="20px" width="30px"></th>');
                tr2.append(td02).append(td12).append(td22);
                table_movimientoDEfecti.append(tr2);
            } else {
                var tr = $('<tr></tr>');
                var td0 = $('<th height="20px" width="30px"></th>');
                var td1 = $('<th height="20px" width="30px" style="text-align:left; vertical-align:middle">TOTAL VENTA</th>');
                var td2 = $('<th height="20px" width="30px">' + totalForma.toFixed(2) + '</th>');
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
        var btn_exportar_CM = $("#btn_exportar_CM");

        function getDataFormMovementCaja() {
            var id = Fecha_actual();
            RESTService.get('movimientoCajas/data_form', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var fecha_caja = response.fechacA;
                    var dataCajaDetForSol = response.dataCajaDetForSol;
                    var dataCajaDetEfeSol = response.dataCajaDetEfeSol;
                    var dataCajaDetForDol = response.dataCajaDetForDol;
                    var dataCajaDetEfeDol = response.dataCajaDetEfeDol;

                    var dataCajaDetEfeSolAper = response.dataCajaDetEfeSolAper;
                    var dataCajaDetEfeDolAper = response.dataCajaDetEfeDolAper;


                    console.log(dataCajaDetEfeSolAper);
                    console.log(dataCajaDetEfeDolAper);
                    console.log("esta es la fecha");
                    console.log(fecha_caja);
                    var tip = response.data;
                    var dataCaja = response.dataMc;
                    var dataCajaAbir = response.dataCA;
                    var dataCaDet = response.dataCaDet;
                    console.log("aaaaa");
                    console.log(dataCaDet);
                    caja_sin.html("");
                    var fechaCajaAbir = response.fechacA;
                    if (dataCajaAbir.length != 0) {
                        var fechaAbi = convertDateFormat(dataCajaAbir[0].fecha);
                        var html = "";
                        html += '<p><h5 class="mensajeCaja" >Existe una caja sin cerrar en la fecha ' + fechaAbi + '</h5></p>'
                        caja_sin.append(html);
                        $('.mensajeCaja').click(function (e) {
                            cerrarCaja(dataCajaAbir[0].idCajaDiaria);

                        });

                    }


                    if (dataCaDet.length != 0) {
                        table_movimientoEfecti.html("");
                        table_movimientoDEfecti.html("");
                        var cotipoApe = 0;
                        var tipoTexApe = 'APERTURA';
                        var montoApe = Number(dataCajaDetEfeSolAper[0].monto);
                        var tiposumApe = 'SE';
                        addTableEfecSol(cotipoApe, tipoTexApe, montoApe, tiposumApe);
                        dataCajaDetEfeSol.map(function (index) {
                            var codigoTipo = index.codigoTipo;
                            var tipotext = index.descripcion_tipo;
                            var montoadd = 0;
                            if (index.monto != null) {
                                montoadd = Number(index.monto);
                            }
                            // if(index.codigoFormaPago=='EFE' && index.idMoneda=='1'){
                            //     var codigoTipo=index.codigoTipo;
                            //     var tipotext=index.descripcion_tipo;
                            //     var montoadd=0;
                            //     if(index.monto!=null){
                            //         montoadd=Number(index.monto);
                            //     }
                            var tiposum = 'SE';
                            addTableEfecSol(codigoTipo, tipotext, montoadd, tiposum);
                            // }
                        });


                        var tipoSumA = 'SE';
                        var totalefectSol = dataCaja[0].totalEfectivo;
                        calcularTotalEfect(tipoSumA, totalefectSol);
                        dataCajaDetForSol.map(function (index) {
                            // if(index.idMoneda=='1'){
                            var codigoFormaPago = index.codigoFormaPago;
                            var tipotext = index.descripcion_subtipo;
                            var montoadd = 0;
                            if (index.monto != null) {
                                montoadd = Number(index.monto);
                            }
                            var tiposum = 'SP';
                            addTableEfecSol(codigoFormaPago, tipotext, montoadd, tiposum);

                        });
                        var tipoSumB = 'SP';
                        totalefectSol = '';
                        calcularTotalEfect(tipoSumB.totalefectSol);
                        var cotipoApeDol = 0;
                        var tipoTexApeDol = 'APERTURA';
                        var montoApeDol = Number(dataCajaDetEfeDolAper[0].monto);
                        var tiposumApeDol = 'DE';
                        addTableEfecDolar(cotipoApeDol, tipoTexApeDol, montoApeDol, tiposumApeDol);
                        dataCajaDetEfeDol.map(function (index) {
                            // if(index.codigoFormaPago=='EFE' && index.idMoneda=='2'){
                            var codigoTipo = index.codigoTipo;
                            var tipotext = index.descripcion_tipo;
                            var montoadd = 0;
                            if (index.monto != null) {
                                montoadd = Number(index.monto);
                            }
                            var tiposum = 'DE';
                            addTableEfecDolar(codigoTipo, tipotext, montoadd, tiposum);
                            // }
                        });
                        var tipodSumA = 'DE';
                        var totalefectDol = dataCaja[0].totalEfectivoDol;
                        calcularTotalEfectDola(tipodSumA, totalefectDol);
                        dataCajaDetForDol.map(function (index) {
                            // if(index.idMoneda=='2'){
                            var codigoFormaPago = index.codigoFormaPago;
                            var tipotext = index.descripcion_subtipo;
                            var montoadd = 0;
                            if (index.monto != null) {
                                montoadd = Number(index.monto);
                            }
                            var tiposum = 'DP';
                            addTableEfecDolar(codigoFormaPago, tipotext, montoadd, tiposum);
                            // }
                        });
                        var tipodSumB = 'DP';
                        totalefectDol = '';
                        calcularTotalEfectDola(tipodSumB, totalefectDol);
                    }

                    if (dataCaja.length != 0) {
                        estadoMc.val(dataCaja[0].estado);
                        caja_text.val(dataCaja[0].nombre_caja);
                        idcajaMC.val(dataCaja[0].idCajaDiaria);
                        // console.log("holaaaaa");
                        // console.log(dataCaja);
                        // console.log("hdhdd");
                        if (dataCaja[0].estado == 1) {
                            btn_Mapertura.prop('disabled', true);
                        };
                        if (dataCaja[0].estado == 0) {
                            btn_Mapertura.prop('disabled', true);
                            btn_Mcierra.prop('disabled', true);
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
                        $("#filtro_monedaMovi").append('<option value="' + item.IdMoneda + '">' + item.Descripcion + '</option>');
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
            }, function () {
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
                data.form.find('input[name="Categoria"]').attr('onkeypress', 'return soloLetras(event)');
                $('#Edit-estado').parent().addClass('i-checks');

                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                    if (e.target.value == 'A') {
                        $("#Edit-estado").val("I");
                        $(".i-checks span").text("Inactivo");

                    } else {
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
        $("#btn_exportar_CM").click(function (e) {
            console.log("exporta");
            $scope.openDoc('movimientoCajas/excel', {});
        });

        generateSearchForm('frm-search-movimientoCaja', 'LoadRecordsButtonmovimientoCaja', function () {
            table_container_movimientoCaja.jtable('load', {
                search: $('#search_b').val(),
                filtro_tipoMovi: $('#filtro_tipoMovi').val(),
                filtro_monedaMovi: $('#filtro_monedaMovi').val()
            });
        }, true);


        // ##################################################################### //
        // ######################### SOLICITUD / VENTA ######################### //
        // ##################################################################### //

        var search_solicitud = getFormSearch('frm-search-solicitud', 'search_b_solicitud', 'LoadRecordsButtonSolicitud');

        var table_container_solicitud = $("#table_container_solicitud");

        table_container_solicitud.jtable({
            title: "Lista de Solicitudes",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/movimientoCajas/list_ventas', 
            },
            // messages: {
            //     addNewRecord: 'Nueva Caja',
            //     editRecord: 'Editar Caja'
            // },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_solicitud
                }
                    // , {
                    //     cssClass: 'btn-primary',
                    //     text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    //     click: function () {
                    //         $scope.openDoc('solicitud/excel', {});
                    //     }
                    // }, {
                    //     cssClass: 'btn-danger-admin',
                    //     text: '<i class="fa fa-plus"></i> Nueva Solicitud',
                    //     click: function () {
                    //         newSolicitud();
                    //     }
                    // }
                ]
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
                        return '<a href="javascript:void(0)" class="emitir-comprobante" data-estado="' + data.record.estado
                            + '" data-id="' + data.record.cCodConsecutivo
                            + '_' + data.record.nConsecutivo + '" title="Emitir Comprobante"><i class="fa fa-money fa-1-5x"></i></a>';
                    }

                }

            },
            recordsLoaded: function (event, data) {
                $('.emitir-comprobante').click(function (e) {
                    var id = $(this).attr('data-id');
                    $.post("movimientoCajas/get_caja_diaria", {},
                        function (data, textStatus, jqXHR) {
                            // console.log();

                            if (data.length > 0) {

                                find_solicitud(id);
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
                $('.eliminar-Orden').click(function (e) {
                    var ide = $(this).attr('data-ide');
                    var estado = $(this).data('estado');

                    if (estado != "1") {
                        AlertFactory.textType({
                            title: '',
                            message: 'No se puede eliminar, la solicitud ya no se encuentra en estado Registrado',
                            type: 'info'
                        });
                        return false;
                    }
                    idOrdenDelete.val(ide);
                    modalDeleteOrden.modal("show");
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

        var cCodConsecutivo = $("#cCodConsecutivo");

        var tipoCliente_or = $("#tipoCliente_or");
        var id_tipocli = $("#id_tipocli");
        var id_cliente_tipo_or = $("#id_cliente_tipo_or");

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
        var redondeo;
        var idMoneda = $("#IdMoneda");
        var idcCondicionPago = $("#idcCondicionPago");
        var id_tipoDoc_Venta = $("#id_tipoDoc_Venta");
        var AlmacenesSele;//variable para guardar almacenes
        var LotesSele;//variable para guardar lotes
        var DescuentosSele;//variable para guardar los decuentos
        var LocalizacionesSele;//variable para guardar localizaciones del almacen
        var idconvenio = $("#idconvenio");
        var idvendedor = $("#idvendedor");
        var articulo_mov_det = $("#articulo_mov_det");
        var totalDescuento = $("#totalDescuento");

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


        function select_comprobante_m(data) {
            $("#serie_comprobante_m").html("");
            $("#serie_comprobante_m").append('<option value="">Seleccionar</option>');
            _.each(data, function (item) {
                if (serie_comprobante_m == item.serie) {
                    $("#serie_comprobante_m").append('<option selected="selected" actual="' + item.actual + '" value="' + item.serie + '">' + item.serie + '</option>');
                } else {
                    $("#serie_comprobante_m").append('<option actual="' + item.actual + '" value="' + item.serie + '">' + item.serie + '</option>');
                }

            });
        }

        $scope.emitir_comprobante = function () {
            // $("#idconyugue").focus();
            // alert($("#desTotal").val());


            if ($('#modalSolicitud').is(':visible')) {
                var total = parseFloat($("#desTotal").val());
                var cuota_inicial = parseFloat($("#cuota_inicial").val());
                var saldo = parseFloat($("#saldo").val());
                var pagado = parseFloat($("#pagado").val());
                var facturado = parseFloat($("#facturado").val());
                var total_financiado = parseFloat($("#total_financiado").val());
                var t_monto_subtotal = parseFloat($("#t_monto_subtotal").val());
                var valor_igv = parseFloat($("#valor_igv").val());
                var t_impuestos = parseFloat($("#t_impuestos").val());

                if (isNaN(valor_igv)) {
                    valor_igv = 0;
                }

                if (isNaN(pagado)) {
                    pagado = 0;
                }
                if (isNaN(facturado)) {
                    facturado = 0;
                }

                if (cuota_inicial > 0) {
                    if (pagado == 0) {
                        if (t_impuestos > 0) {
                            total = cuota_inicial + (cuota_inicial * valor_igv) / 100;
                        } else {
                            total = cuota_inicial;
                        }
                    } else {
                        total = t_monto_subtotal - cuota_inicial;
                        if (t_impuestos > 0) {
                            total = total + (total * valor_igv) / 100;
                        }

                    }
                }
                $("#total_pagar").val(total.toFixed(2));
                $("#monto").val(total.toFixed(2));
                $("#id_tipoDoc_Venta_or").trigger("change");

                $("#modal-emitir-comprobante").modal("show");
            }


            //  PARA PAGOS DE CUOTAS DE CREDITO
            if ($('#modalSolicitudCredito').is(':visible')) {
                $.post("movimientoCajas/obtener_consecutivo_comprobante", {},
                    function (data, textStatus, jqXHR) {
                        // console.log(data);
                        if(data.length > 0) {
                            select_comprobante(data);

                            if (typeof serie_comprobante != "undefined") {
                                $("#serie_comprobante").trigger("change");
                            }

                            var monto_pagar = sumar_montos_pago();
                            if(monto_pagar == 0) {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'El monto a pagar esta en cero!',
                                    type: 'info'
                                });
                                return false;
                            }

                            var check_cuota = $(".check-cuota");
                            var checks = 0;
                            for (var ii = 0; ii < check_cuota.length; ii++) {
                                if($(check_cuota[ii]).is(":checked")) {
                                    checks++;
                                }
                                
                            }

                            if(checks <= 0) {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'Debe Seleccionar al menos una cuota a pagar!',
                                    type: 'info'
                                });
                                return false;
                            }

                            // alert(checks);
                            $("#total_pagar").val(monto_pagar.toFixed(2));
                            $("#monto").val(monto_pagar.toFixed(2));
                           

                            $("#modal-emitir-comprobante").modal("show");
                          
                            
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: 'Cree una serie y consecutivo de ticket!',
                                type: 'info'
                            });
                        }
                    },
                    "json"
                );
                
            }



        }

        $scope.agregar_formas_pago = function () {
            // $("#idconyugue").focus();
            // alert($("#desTotal").val());
            var total_pagar = parseFloat($("#total_pagar").val());
            var subtotal_montos_pago = sumar_montos_formas_pago();
            var saldo = total_pagar - subtotal_montos_pago;
            // alert();
            if (saldo <= 0) {
                AlertFactory.textType({
                    title: '',
                    message: 'Ya se distribuyo el total!',
                    type: 'info'
                });
                return false;
            }

            $("#monto_p").val(saldo.toFixed(2));
            $("#forma_pago").val("EFE");
          

            if ($('#modalSolicitudCredito').is(':visible')) {
                $("#moneda").val($("#idmoneda_credito").val());
            }

            if ($('#modalSolicitud').is(':visible')) {
                $("#moneda").val($("#IdMoneda").val());
            }
           
            $(".clean-monto").val(0);
            $("#noperacion").val("");
            $("#tarjeta").val("");
            $("#monto_aplicar").val(saldo.toFixed(2));
            $("#modal-formas-pago").modal("show");

        }

        $(document).on("change", "#id_tipoDoc_Venta_or", function (event, serie_comprobante) {
            // console.log(IdTipoDocumento, serie_comprobante);
            var tipo_documento = $(this).val();
            $.post("consecutivos_comprobantes/obtener_consecutivo_comprobante", { tipo_documento: tipo_documento },
                function (data, textStatus, jqXHR) {
                    select_comprobante(data);

                    if (typeof serie_comprobante != "undefined") {
                        $("#serie_comprobante").trigger("change");
                    }
                },
                "json"
            );
        });

        $(document).on("change", "#forma_pago", function (event) {
            // console.log(IdTipoDocumento, serie_comprobante);
            var forma_pago = $(this).val();
            var idcliente = cliente_id_or.val();
            if(forma_pago == "SEP") {
                $.post("ventas/get_venta_separacion", { idcliente: idcliente },
                    function (data, textStatus, jqXHR) {
                        // console.log(data);
                        if(data.length > 0) {
                            var monto_venta = parseFloat(data[0].t_monto_total);
                            $("#idventa_separacion").val(data[0].idventa);
                            $("#devolucion_producto").val(data[0].devolucion_producto);
                            $("#idventa_nota").val("");
                            $("#monto_p").val(monto_venta.toFixed(2));
                            $("#monto_aplicar").val(monto_venta.toFixed(2));

                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: 'No hay ninguna venta por separación!',
                                type: 'info'
                            });
                        }
                    
                    },
                    "json"
                );
            } else {
                
                if(forma_pago == "NCR") {
                    $.post("ventas/get_venta_nota", { idcliente: idcliente },
                        function (data, textStatus, jqXHR) {
                            // console.log(data);
                            if(data.length > 0) {
                                var monto_venta = parseFloat(data[0].t_monto_total);
                                $("#idventa_nota").val(data[0].idventa);
                                $("#devolucion_producto").val(data[0].devolucion_producto);
                                $("#idventa_separacion").val("");
                                $("#monto_p").val(monto_venta.toFixed(2));
                                $("#monto_aplicar").val(monto_venta.toFixed(2));
    
                            } else {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'No hay ninguna nota de credito!',
                                    type: 'info'
                                });
                            }
                        
                        },
                        "json"
                    );
                } else {
                    $("#idventa_separacion").val("");
                    $("#idventa_nota").val("");
                    $("#devolucion_producto").val("");
                    var total_pagar = parseFloat($("#total_pagar").val());
                    var subtotal_montos_pago = sumar_montos_formas_pago();
                    var saldo = total_pagar - subtotal_montos_pago;
                    $("#monto_aplicar").val(saldo.toFixed(2));
                }
              
            }
        });

        $(document).on("change", "#tipo_doc_venta", function (event, serie_comprobante) {
            // console.log(IdTipoDocumento, serie_comprobante);
            var tipo_documento = $(this).val();
            // console.log(tipo_documento);
            $.post("consecutivos_comprobantes/obtener_consecutivo_comprobante", { tipo_documento: tipo_documento },
                function (data, textStatus, jqXHR) {
                    select_comprobante_m(data);

                    if (typeof serie_comprobante != "undefined") {
                        $("#serie_comprobante_m").trigger("change");
                    }
                },
                "json"
            );
        });

        $(document).on("change", "#serie_comprobante", function () {
            var serie_comprobante = $(this).val();
            if (serie_comprobante != "") {

                var actual = $("#serie_comprobante option[value=" + serie_comprobante + "]").attr("actual");
                $("#numero_comprobante").val(actual);
            }
            // alert(numero);
        });

        $(document).on("change", "#serie_comprobante_m", function () {
            var serie_comprobante_m = $(this).val();
            if (serie_comprobante_m != "") {

                var actual = $("#serie_comprobante_m option[value=" + serie_comprobante_m + "]").attr("actual");
                $("#numero_comprobante_m").val(actual);
            }
            // alert(numero);
        });

        function sumar_montos_formas_pago() {
            // var montos_pago = $("input[name='monto_pago[]']");
            var montos_pago = $("input[name='monto_aplicado_moneda_documento[]']");
            var subtotal_montos_pago = 0;

            for (var i = 0; i < montos_pago.length; i++) {
                subtotal_montos_pago += parseFloat(montos_pago[i].value);

            }
            return subtotal_montos_pago;
        };

        $scope.guardar_forma_pago = function () {
            var bval = true;
            var vuelto_real = parseFloat($("#vuelto_real").val());
            bval = bval && $("#forma_pago").required();
            if ($("#forma_pago").val() == "TCR" || $("#forma_pago").val() == "TDE") {
                bval = bval && $("#noperacion").required();
                bval = bval && $("#tarjeta").required();
            }

            if ($("#forma_pago").val() == "DEP" || $("#forma_pago").val() == "ELE" || $("#forma_pago").val() == "TRA") {
                bval = bval && $("#noperacion").required();
            }

            bval = bval && $("#moneda").required();
            bval = bval && $("#monto_p").required();

            if (vuelto_real < 0) {
                AlertFactory.textType({
                    title: '',
                    message: 'El monto a pagar no cubre el monto a aplicar!',
                    type: 'info'
                });

                return false;
            }



            if (!bval) {
                return false;
            }

            var serie_comprobante = $("#serie_comprobante").val();
            var numero_comprobante = $("#numero_comprobante").val();
            var forma_pago = $("#forma_pago").val();
            var forma_pago_text = $("#forma_pago option[value=" + forma_pago + "]").text();
            var moneda = $("#moneda").val();
            var moneda_text = $("#moneda option[value=" + moneda + "]").text();
            var noperacion = $("#noperacion").val();
            var tarjeta = $("#tarjeta").val();
            var monto_p = parseFloat($("#monto_p").val());
            var tipo_cambio = (!isNaN(parseFloat($("#tipo_cambio").val()))) ? parseFloat($("#tipo_cambio").val()) : 0;
            var monto_local = (!isNaN(parseFloat($("#monto_local").val()))) ? parseFloat($("#monto_local").val()) : 0;
            var monto_aplicar = (!isNaN(parseFloat($("#monto_aplicar").val()))) ? parseFloat($("#monto_aplicar").val()) : 0;
            var monto_vuelto = (!isNaN(parseFloat($("#monto_vuelto").val()))) ? parseFloat($("#monto_vuelto").val()) : 0;
            var html = "<tr>";
            html += '   <input type="hidden" name="IdMoneda[]" value="' + moneda + '" />';
            html += '   <input type="hidden" name="codigo_formapago[]" value="' + forma_pago + '" />';
            html += '   <input type="hidden" name="nrotarjeta[]" value="' + tarjeta + '" />';
            html += '   <input type="hidden" name="nrooperacion[]" value="' + noperacion + '" />';
            html += '   <input type="hidden" name="monto_pago[]" value="' + monto_p + '" />';
            html += '   <input type="hidden" name="monto_moneda_documento[]" value="' + monto_local + '" />';
            html += '   <input type="hidden" name="monto_aplicado_moneda_documento[]" value="' + monto_aplicar + '" />';
            html += '   <input type="hidden" name="monto_tipo_cambio_soles[]" value="' + tipo_cambio + '" />';
            html += '   <input type="hidden" name="vuelto[]" value="' + monto_vuelto + '" />';
            html += '   <td>' + moneda_text + '</td>';
            html += '   <td>' + forma_pago_text + '</td>';
            html += '   <td>' + noperacion + '</td>';
            html += '   <td>' + tarjeta + '</td>';
            // html += '   <td>' + serie_comprobante + '-'+numero_comprobante+'</td>';
            html += '   <td>' + monto_p + '</td>';
            html += '   <td>' + tipo_cambio + '</td>';
            html += '   <td>' + monto_local + '</td>';
            html += '   <td>' + monto_aplicar + '</td>';
            html += '   <td>' + monto_vuelto + '</td>';
            html += '   <td><button title="Eliminar Registro" class="btn btn-danger btn-xs eliminar-forma-pago" type="button"><i class="fa fa-trash"></i></button></td>';
            html += '</tr>';
            $("#detalle-formas-pago").append(html);

            var total_pagar = parseFloat($("#total_pagar").val());
            var subtotal_montos_pago = sumar_montos_formas_pago();
            var saldo = total_pagar - subtotal_montos_pago;

            // alert(saldo);

            $("#monto").val(saldo);
            $("#modal-formas-pago").modal("hide");
        }

        function guardar_comprobante() {
            $.post("movimientoCajas/guardar_comprobante", $("#formulario-emitir-comprobante").serialize() + "&cCodConsecutivo=" + $("#cCodConsecutivo").val() + "&nConsecutivo=" + $("#nConsecutivo").val() + "&IdTipoDocumento=" + $("#id_tipoDoc_Venta_or").val() + "&idventa_separacion=" + $("#idventa_separacion").val()+ "&idventa_nota=" + $("#idventa_nota").val(),
                function (data, textStatus, jqXHR) {

                    if (data.status == "i") {

                        // $("#id_tipoDoc_Venta_or").val(data.datos[0].IdTipoDocumento).trigger("change", [data.datos[0].serie_comprobante]);
                        var msg = "";
                        if($("#devolucion_producto").val() == 1) {
                            msg = "¡Importante! Se debe ingresar a almacén los articulos devueltos de la Nota de Crédito aplicada.";
                        } 

                        $("#modal-emitir-comprobante").modal("hide");
                        $("#modalSolicitud").modal("hide");
                        $("#formulario-solicitud").trigger("reset");
                        $("#formulario-creditos").trigger("reset");
                        $("#formulario-emitir-comprobante").trigger("reset");
                        $("#formulario-formas-pago").trigger("reset");
                        $("#detalle-formas-pago").html("");
                        $("#articulo_mov_det").html("");
                        LoadRecordsButtonSolicitud.click();
                        AlertFactory.textType({
                            title: '',
                            message: 'El documento se facturó correctamente. ' + msg,
                            type: 'success'
                        });

                        // CUANDO ES CREDITO Y ESTA EN ESTADO YA 
                        var id = data.datos[0].cCodConsecutivo_solicitud + "|" + data.datos[0].nConsecutivo_solicitud + "|" + data.datos[0].idventa;

                        if (data.datos[0].tipo_solicitud != "1" && data.datos[0].estado == "6") {

                            window.open("movimientoCajas/imprimir_cronograma/" + id);
                        }

                        window.open("movimientoCajas/imprimir_comprobante/" + id);


                        id = data.datos[0].cCodConsecutivo_solicitud + "|" + data.datos[0].nConsecutivo_solicitud + "|" + data.datos[0].idventa_ticket;
                        window.open("movimientoCajas/imprimir_ticket/" + id);


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

        function guardar_pago_cuotas_credito() {
            // alert("hola");
            $.post("movimientoCajas/guardar_pago_cuotas_credito", $("#formulario-emitir-comprobante").serialize() + "&cCodConsecutivo=" + $("#cCodConsecutivo_credito").val() + "&nConsecutivo=" + $("#nConsecutivo_credito").val() + "&IdTipoDocumento=12&"+$("#formulario-solicitud-credito").serialize(),
            function (data, textStatus, jqXHR) {
                    if (data.status == "i") {
                        $("#modal-emitir-comprobante").modal("hide");
                        $("#modalSolicitudCredito").modal("hide");
                        $("#formulario-solicitud-credito").trigger("reset");
                       
                        $("#formulario-emitir-comprobante").trigger("reset");
                        $("#formulario-formas-pago").trigger("reset");
                        $("#detalle-formas-pago").html("");
                        $("#cuotas-credito").html("");
                  

                        LoadRecordsButtonSolicitudCreditos.click();
                        AlertFactory.textType({
                            title: '',
                            message: 'El pago se realizó orrectamente.',
                            type: 'success'
                        });

                        var id = data.datos[0].cCodConsecutivo_solicitud + "|" + data.datos[0].nConsecutivo_solicitud + "|" + data.datos[0].idventa;
                        window.open("movimientoCajas/imprimir_ticket_pago_cuota/" + id);
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

        $scope.emitir = function () {

            var bval = true;
            bval = bval && $("#serie_comprobante").required();
            bval = bval && $("#numero_comprobante").required();
            bval = bval && $("#correo_electronico").required();
            // alert($("#detalle-formas-pago").html());
            if ($("#detalle-formas-pago").html() == "") {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe ingresar al menos 1 registro al detalle',
                    type: 'info'
                });

                return false;
            }

            if (bval) {
                if ($('#modalSolicitud').is(':visible')) {
                    guardar_comprobante();
                }

                if ($('#modalSolicitudCredito').is(':visible')) {
                    
                    guardar_pago_cuotas_credito();
                }

               
            }

        }

        $(document).on("click", ".eliminar-forma-pago", function () {
            // console.log($(this).parent("button").parent("td").parent("tr"));
            $(this).parent("td").parent("tr").remove();
            var total_pagar = parseFloat($("#total_pagar").val());
            var subtotal_montos_pago = sumar_montos_formas_pago();
            var saldo = total_pagar - subtotal_montos_pago;
            // alert(saldo);
            $("#monto").val(saldo);
        })

        $(document).on("change", "#tipo_solicitud", function () {
            var tipo_solicitud = $(this).val();
            // alert("change " + tipo_solicitud);   
            if (tipo_solicitud == "1" || tipo_solicitud == "3") {
                $(".credito").hide();

            } else {

                $(".credito").show();
            }

            if (tipo_solicitud == "3") {
                $(".convenio").show();

            } else {

                if (tipo_solicitud == "1") {
                    $(".montos-credito").val(0);
                }
                $(".convenio").hide();
            }


        });

        function obtener_data_for_solicitud() {
            RESTService.all('solicitud/data_form', '', function (response) {
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
                    $("#tipo_doc_venta").append('<option value="">Seleccionar</option>');
                    _.each(response.tipo_document_venta, function (item) {
                        $("#tipo_doc_venta").append('<option value="' + item.IdTipoDocumento + '">' + item.Descripcion + '</option>');
                    });

                    cCodConsecutivo.append('<option value="">Seleccionar</option>');
                    _.each(response.codigo, function (item) {
                        cCodConsecutivo.append('<option value="' + item.cCodConsecutivo + '">' + item.cCodConsecutivo + '</option>');
                    });

                    $("#forma_pago").append('<option value="">Seleccionar</option>');
                    _.each(response.formas_pago, function (item) {
                        $("#forma_pago").append('<option value="' + item.codigo_formapago + '">' + item.descripcion_subtipo + '</option>');
                    });


                    idcCondicionPago.append('<option value="">Seleccionar</option>');
                    _.each(response.condicion_pago, function (item) {
                        idcCondicionPago.append('<option value="' + item.id + '">' + item.description + '</option>');
                    });

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

                    // servicios = response.servicios;
                    idMoneda.append('<option value="">Seleccionar</option>');
                    _.each(response.moneda, function (item) {
                        idMoneda.append('<option data-simbolo="' + item.Simbolo + '" value="' + item.IdMoneda + '">' + item.Descripcion + '</option>');
                    });

                    $("#moneda").append('<option value="">Seleccionar</option>');
                    _.each(response.moneda, function (item) {
                        $("#moneda").append('<option data-simbolo="' + item.Simbolo + '" value="' + item.IdMoneda + '">' + item.Descripcion + '</option>');
                    });

                    idconvenio.append('<option value="">Seleccionar</option>');
                    _.each(response.convenios, function (item) {
                        idconvenio.append('<option value="' + item.idconvenio + '">' + item.descripcionconvenio + '</option>');
                    });

                    idvendedor.append('<option value="">Seleccionar</option>');
                    _.each(response.vendedores, function (item) {
                        idvendedor.append('<option  value="' + item.idvendedor + '">' + item.descripcion + '</option>');
                    });


                    AlmacenesSele = response.almacen_usuario;
                    LotesSele = response.lotes;
                    DescuentosSele = response.descuentos;



                }
            }, function () {
                obtener_data_for_solicitud();
            });
        }

        obtener_data_for_solicitud();
        var titleModalClientes = $('#titleModalClientes');
        var modaClientes = $('#modaClientes');
        function getCliente(movimiento_caja) {
            var bval = true;
            if(typeof movimiento_caja != "undefined") {

                documento_or = $("#documento_cliente");
                razonsocial_cliente_or = $("#razonsocial_cliente_m");
            }  else {
                documento_or = $("#documento_or");
                razonsocial_cliente_or = $("#razonsocial_cliente_or");
            }
            bval = bval && documento_or.required();
            if (bval) {
                var id = documento_or.val();
                // alert(id);
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
                            $("#idcliente_m").val(datos[0].idCliente);
                            tipoCliente_or.val(datos[0].tipo_cliente_descr).trigger('change');
                            id_cliente_tipo_or.val(datos[0].id_tipocli)
                            id_tipocli.data("prev", id_cliente_tipo_or.val());
                            id_tipoDoc_Venta_or.val(datos[0].IdTipoDocumento).trigger("change");
                            if (nConsecutivo.val() == "") {
                                id_tipoDoc_Venta_or.focus();
                            }

                            id_tipoDoc_Venta_or.removeAttr("disabled");

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
        var tipodoc = $("#tipodoc");

        function getDataFormCustomer() {
            RESTService.all('customers/data_form', '', function (response) {
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

        var departamento = $('#departamento');
        var provincia = $('#provincia');
        var distrito = $('#distrito');

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
        
        var btn_save_cliente = $("#btn_save_cliente");
        var cEstadoCivil = $("#cEstadoCivil");
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
            // alert(bval);
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
                RESTService.updated('customers/createCliente', cli_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // console.log(response);
                        $("#idcliente_m").val(response.data[0].idCliente);
                        $("#documento_cliente").val(documento.val());
                        getCliente("movimiento_caja");
                        $("#tipo_doc_venta").val(id_tipoDoc_Venta.val());
                        $("#tipo_doc_venta").trigger("change");
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

        $(document).on("change", "#IdMoneda", function () {
            if ($(this).val() != "") {

                var simbolo = $(this).find("option[value=" + $(this).val() + "]").data("simbolo");
                // alert("hola " + simbolo);
                $(".simbolo-moneda").text(simbolo);
                $(".simbolo-moneda-2").text(simbolo);
            }
        })

        $(document).on("keyup", "#monto_p", function () {
            $("#moneda").trigger("change");
        })

        $(document).on("keyup", "#monto_aplicar", function () {
            var monto_aplicar = parseFloat($(this).val());
            var monto = parseFloat($("#monto").val()); // monto total que se debe pagar
            if (monto_aplicar > monto) {
                AlertFactory.textType({
                    title: '',
                    message: 'El monto aplicar no debe ser mayor al monto total a pagar',
                    type: 'info'
                });
                $("#guardar_forma_pago").attr("disabled", "disabled");
                return false;
            } else {
                $("#guardar_forma_pago").removeAttr("disabled");
            }
            $("#moneda").trigger("change");
        })

        $(document).on("change", "#moneda", function () {
            var idmoneda = $(this).val();
            if (idmoneda != "") {

                var simbolo = $(this).find("option[value=" + idmoneda + "]").data("simbolo");

                $(".simbolo-moneda-2").text(simbolo);

                $.post("movimientoCajas/obtener_tipo_cambio_venta", { idmoneda: idmoneda },
                    function (data, textStatus, jqXHR) {
                        if (data.length > 0) {
                            var tipo_cambio = 1;
                            if (data[0].tipo_cambio_venta != null) {
                                tipo_cambio = data[0].tipo_cambio_venta;

                            }
                            if (tipo_cambio == 1) {
                                $("#tipo_cambio").val(0);
                            } else {

                                $("#tipo_cambio").val(tipo_cambio);
                            }

                            var monto_p = parseFloat($("#monto_p").val()); // monto pagar  x forma de pago
                            var monto = parseFloat($("#monto_aplicar").val()); // monto aplicar que se debe pagar
                            var monto_convertido = 0;
                            var vuelto = 0;

                            monto_convertido = monto_p * tipo_cambio;
                            vuelto = monto_convertido - monto;
                            $("#vuelto_real").val(vuelto.toFixed(2));
                            if (vuelto < 0) {
                                vuelto = 0;
                            }
                            $("#monto_local").val(monto_convertido.toFixed(2));
                            // $("#monto_aplicar").val(monto.toFixed(2));
                            $("#monto_vuelto").val(vuelto.toFixed(2));


                            // if(tipo_cambio > 0) {

                            // } else {
                            //     $("#monto_local").val(monto.toFixed(2));
                            //     $("#monto_aplicar").val(monto.toFixed(2));
                            //     $("#monto_vuelto").val(0);
                            // }
                        }
                    },
                    "json"
                );
            }
        })

        function getPersona(tipo) {
            //    alert(tipo);
            var bval = true;
            bval = bval && $("#documento_" + tipo).required();
            if (bval) {
                var id = $("#documento_" + tipo).val();
                RESTService.get('personas/get_persona_documento', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var datos = response.data;
                        if (datos.length == 0) {
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
                        // AlertFactory.textType({
                        //     title: '',
                        //     message: 'Hubo un error . Intente nuevamente.',
                        //     type: 'info'
                        // });
                    }


                });
            }
        }


        function find_solicitud(id) {
            $("#formulario-solicitud").find("input").attr("readonly", "readonly");
            $("#formulario-solicitud").find("select").attr("disabled", "disabled");
            $("#formulario-creditos").find("input").attr("readonly", "readonly");
            $("#formulario-creditos").find("select").attr("disabled", "disabled");

            $.post("solicitud/find", { id: id },
                function (data, textStatus, jqXHR) {
                    // console.log(data);
                    Helpers.set_datos_formulario("formulario-solicitud", data.solicitud[0]);
                    if (data.solicitud_credito.length > 0) {
                        Helpers.set_datos_formulario("formulario-creditos", data.solicitud_credito[0]);
                    }
                    $("#correo_electronico").val(data.solicitud[0].correo_electronico);

                    $("#documento_or").val(data.solicitud[0].documento);
                    getCliente();
                    $("#tipo_solicitud").trigger("change");
                    $("#IdMoneda").trigger("change");
                    $("#moneda").trigger("change");

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

                        if (data.solicitud_credito[0].documento_fiador != null) {
                            getPersona("fiador");
                        }

                        if (data.solicitud_credito[0].documento_conyugue != null) {
                            getPersona("conyugue");
                        }

                        if (data.solicitud_credito[0].documento_fiadorconyugue != null) {
                            getPersona("documento_fiadorconyugue");
                        }
                    }

                    if (data.solicitud_articulo.length > 0) {
                        $("#articulo_mov_det").html("");
                        var html = '';
                        for (var i = 0; i < data.solicitud_articulo.length; i++) {
                            html += '<tr>';
                            html += '   <td>' + data.solicitud_articulo[i].producto + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].almacen + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].localizacion + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].lote + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].cantidad + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].precio_unitario + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].cOperGrat + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].precio_total + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].descuento + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].porcentaje_descuento + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].monto_descuento + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].monto_descuento_prorrateado + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].monto_subtotal + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].monto_exonerado + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].monto_afecto + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].monto_inafecto + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].impuestos + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].monto_total + '</td>';
                            html += '</tr>';

                        }
                        $("#articulo_mov_det").html(html);
                    }
                    // $("#enviar_solicitud").show();
                    // $("#aprobaciones").show();
                    $("#modalSolicitud").modal("show");
                },
                "json"
            );
        }

        //COMPROBANTES
        var search_comprobantes = getFormSearch('frm-search-comprobantes', 'search_b_comprobantes', 'LoadRecordsButtonComprobantes');

        var table_container_comprobantes = $("#table_container_comprobantes");

        table_container_comprobantes.jtable({
            title: "Lista de Comprobantes",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/movimientoCajas/list_comprobantes',
            },

            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_comprobantes
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
                        return '<a href="javascript:void(0)" class="imprimir-comprobante" data-estado="' + data.record.estado + '"  data-tipo_solicitud="' + data.record.tipo_solicitud + '" data-idtipodocumento="' + data.record.IdTipoDocumento + '"  data-anticipo="' + data.record.anticipo + '" data-id="' + data.record.cCodConsecutivo_solicitud + '|' + data.record.nConsecutivo_solicitud + '|' + data.record.idventa + '" title="Imprimir Comprobante"><i class="fa fa-print fa-1-5x"></i></a>';
                    }

                }

            },
            recordsLoaded: function (event, data) {
                $('.imprimir-comprobante').click(function (e) {
                    var id = $(this).attr('data-id');
                    var tipo_solicitud = $(this).attr('data-tipo_solicitud');
                    var idtipodocumento = $(this).attr('data-idtipodocumento');
                    var estado = $(this).attr('data-estado');

                    if (idtipodocumento == "12") {

                        window.open("movimientoCajas/imprimir_ticket/" + id);
                    } else {
                        window.open("movimientoCajas/imprimir_comprobante/" + id);
                        if (tipo_solicitud != "1" && estado == "6") {
                            window.open("movimientoCajas/imprimir_cronograma/" + id);
                        }

                    }

                    e.preventDefault();
                });

            }
        });

        generateSearchForm('frm-search-comprobantes', 'LoadRecordsButtonComprobantes', function () {
            table_container_comprobantes.jtable('load', {
                search: $('#search_b_comprobantes').val()
            });
        }, true);

        
        function find_solicitud_credito(id) {

            $.post("solicitud/find", { id: id },
                function (data, textStatus, jqXHR) {

                    if (data.solicitud.length > 0) {
                        $("#documento_credito").val(data.solicitud[0].documento);
                        $("#cliente_credito").val(data.solicitud[0].razonsocial_cliente);
                        $("#monto_credito").val(data.solicitud[0].t_monto_total);
                        $("#monto_pagado_credito").val(data.solicitud[0].pagado);
                        $("#saldo_capital_credito").val(data.solicitud[0].saldo);
                        $("#fecha_pago_credito").val(data.solicitud[0].fecha_pago);

                        $("#idmoneda_credito").val(data.solicitud[0].IdMoneda);
                        // $("#simbolo_moneda_credito").val(data.solicitud[0].Simbolo);
                        $(".simbolo-moneda").text(data.solicitud[0].simbolo_moneda);
                        $(".simbolo-moneda-2").text(data.solicitud[0].simbolo_moneda);
                        $("#correo_electronico").val(data.solicitud[0].correo_electronico);
                        $("#cCodConsecutivo_credito").val(data.solicitud[0].cCodConsecutivo);
                        $("#nConsecutivo_credito").val(data.solicitud[0].nConsecutivo);
                    }

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

                            var saldo_pagar = parseFloat(data.solicitud_cronograma[index].saldo_cuota) + parseFloat(data.solicitud_cronograma[index].int_moratorio);

                            html += '<tr>';
                            html += '<td><span class="inputs-hidden" nrocuota="'+data.solicitud_cronograma[index].nrocuota+'" ></span>'+data.solicitud_cronograma[index].fecha_vencimiento+'</td>';
                            html += '<input type="hidden" class="subtotal-pagar" value="'+saldo_pagar.toFixed(2)+'" >';
                            html += '<td class="valor-cuota">'+parseFloat(data.solicitud_cronograma[index].valor_cuota).toFixed(2)+'</td>';
                            html += '<td class="int-moratorio">'+parseFloat(data.solicitud_cronograma[index].int_moratorio).toFixed(2)+'</td>';
                            html += '<td>'+parseFloat(data.solicitud_cronograma[index].valor_cuota).toFixed(2)+'</td>';
                            html += '<td class="saldo-cuota">'+parseFloat(data.solicitud_cronograma[index].saldo_cuota).toFixed(2)+'</td>';
                            html += '<td>'+parseFloat(data.solicitud_cronograma[index].int_moratorio).toFixed(2)+'</td>';
                            
                            if(parseFloat(data.solicitud_cronograma[index].saldo_cuota) == 0) {
                                disabled = 'disabled="disabled"';
                                checked = 'checked="checked"';
                            }
                            // console.log(parseFloat(data.solicitud_cronograma[index].saldo_cuota), disabled);
                           
                            html += '<td><center><input '+disabled+' '+checked+' saldo_pagar="'+saldo_pagar.toFixed(2)+'"  type="checkbox" nrocuota="'+data.solicitud_cronograma[index].nrocuota+'" class="check-cuota" /></center></td>';
                            html += '<td class="monto-pagar-cuota"></td>';
                            html += '<td>'+data.solicitud_cronograma[index].nrocuota+'</td>';
                            html += '<td class="saldo-pagar">'+saldo_pagar.toFixed(2)+'</td>';
                            html += '</tr>';
                        }
                        $("#cuotas-credito").html(html);
                        // alert(prox_venc);
                        $("#prox_venc_credito").val(prox_venc);
                    }

                    $("#modalSolicitudCredito").modal("show");
                },
                "json"
            );

        }

        $(document).on("click", ".check-cuota", function (e) {
            var saldo_pagar = parseFloat($(this).attr("saldo_pagar"));
            var nrocuota = $(this).attr("nrocuota");
            var html = "";
            if((nrocuota-1) > 0 && !$(".check-cuota[nrocuota='"+(nrocuota-1)+"']").is(":checked")) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }   
            
            // if(!$(".check-cuota[nrocuota='"+(nrocuota-1)+"']").is(":checked") && (nrocuota-1) > 0) {
            //     console.log("checked anterior");
            // } else {
            //     console.log("nooo checked anterior");
            // }
            // console.log($(".check-cuota[nrocuota='"+(nrocuota-1)+"']"));

            if($(this).is(":checked")) {
                $(this).parent("center").parent("td").siblings(".monto-pagar-cuota").text(saldo_pagar.toFixed(2));
                $(this).parent("center").parent("td").siblings(".saldo-pagar").text("0.00");
                html += '<input type="hidden" name="nrocuota[]" value="'+nrocuota+'" />';
                html += '<input type="hidden" name="saldo_cuota[]" value="0" />';
                html += '<input type="hidden" name="monto_pago_credito[]" value="'+saldo_pagar.toFixed(2)+'" />';
               
            } else {
                $(this).parent("center").parent("td").siblings(".monto-pagar-cuota").text("0.00");
                $(this).parent("center").parent("td").siblings(".saldo-pagar").text(saldo_pagar.toFixed(2));
            }
            
            $(".inputs-hidden[nrocuota='"+nrocuota+"']").html(html);
            var monto_pagar = sumar_montos_pago();
            $("#monto_pagar_credito").val(monto_pagar.toFixed(2));
        });

        $(document).on("keyup", "#monto_pagar_credito", function () {
            var monto_pagar_credito = parseFloat($("#monto_pagar_credito").val());
            var saldo_capital_credito = parseFloat($("#saldo_capital_credito").val());

            if(isNaN(monto_pagar_credito)) {
                monto_pagar_credito = 0;
            }

            var nuevo_saldo_pagar = parseFloat(saldo_capital_credito) - monto_pagar_credito;
            $("#nuevo_saldo_pagar_credito").val(nuevo_saldo_pagar.toFixed(2));

            var saldo_pagar = parseFloat($(".valor-cuota").eq(0).text()) + parseFloat($(".int-moratorio").eq(0).text());

            

            //CUOTAS PAGADAS
            var checks = $(".check-cuota");
            var pagados = 0;
            for (var check = 0; check < checks.length; check++) {
                if(typeof $(checks[check]).attr("disabled") != "undefined" && $(checks[check]).is(":checked")) {
                    pagados++;
                }

                if(typeof $(checks[check]).attr("disabled") == "undefined") {
                    // console.log(check);
                    $(checks[check]).prop("checked", false);   
                    $(checks[check]).text(saldo_pagar.toFixed(2));
                    $(".monto-pagar-cuota").eq(check).text("");
                    if(parseFloat($(".saldo-cuota").eq(check).text()) != saldo_pagar) {
                        $(".saldo-pagar").eq(check).text(parseFloat($(".saldo-cuota").eq(check).text()).toFixed(2));
                    } else {
                        $(".saldo-pagar").eq(check).text(saldo_pagar.toFixed(2));
                    }
                    
                }
            }

             // SI ES NEGATIVO  O CERO YA NO CONTINUA
             if(monto_pagar_credito <= 0) {
                return false;
            }
            // alert(monto_pagar_credito);
            //SI EXISTE ALGUN SALDO SE CUOTA PAGADA ANTERIOR
            // console.log(parseFloat($(".saldo-cuota").eq(pagados).text()));
            var saldo_cuota_anterior = parseFloat($(".saldo-cuota").eq(pagados).text());
            var diff = 0;
            if(saldo_cuota_anterior != saldo_pagar) {
                diff = monto_pagar_credito - saldo_cuota_anterior;

                if(diff < 0) {
                    // console.log("diff: " + diff);
                    html = "";
                    nrocuota = $(".check-cuota").eq(pagados).attr("nrocuota");
                    $(".check-cuota").eq(pagados).prop("checked", true); 
                    $(".monto-pagar-cuota").eq(pagados).text(monto_pagar_credito.toFixed(2));
                    $(".saldo-pagar").eq(pagados).text(Math.abs(diff).toFixed(2));
    
                    html += '<input type="hidden" name="nrocuota[]" value="'+nrocuota+'" />';
                    html += '<input type="hidden" name="saldo_cuota[]" value="'+Math.abs(diff).toFixed(2)+'" />';
                    html += '<input type="hidden" name="monto_pago_credito[]" value="'+Math.abs(monto_pagar_credito).toFixed(2)+'" />';
                    $(".inputs-hidden[nrocuota='"+nrocuota+"']").html(html);
                } else {
                    // console.log("saldo_cuota_anterior: " + saldo_cuota_anterior);
                    html = "";
                    nrocuota = $(".check-cuota").eq(pagados).attr("nrocuota");
                    $(".check-cuota").eq(pagados).prop("checked", true); 
                    $(".monto-pagar-cuota").eq(pagados).text(saldo_cuota_anterior.toFixed(2));
                    $(".saldo-pagar").eq(pagados).text("0.00");
    
                    html += '<input type="hidden" name="nrocuota[]" value="'+nrocuota+'" />';
                    html += '<input type="hidden" name="saldo_cuota[]" value="0.00" />';
                    html += '<input type="hidden" name="monto_pago_credito[]" value="'+saldo_cuota_anterior.toFixed(2)+'" />';
                    $(".inputs-hidden[nrocuota='"+nrocuota+"']").html(html);

                   
                   
                }
                monto_pagar_credito = monto_pagar_credito - saldo_cuota_anterior;
                pagados++;
              
            }   

            // SI ES NEGATIVO  O CERO YA NO CONTINUA
            if(monto_pagar_credito <= 0) {
                return false;
            }
            // console.log("monto_pagar_credito: "+monto_pagar_credito);


            var resto = monto_pagar_credito % saldo_pagar;
            var entero = Math.floor(monto_pagar_credito/saldo_pagar) + pagados;

           
            

            var nuevo_saldo_pagar = saldo_pagar - resto;
            var html = "";
            var nrocuota = "";
            // console.log(pagados, entero);
            for (var i = pagados; i < entero; i++) {
                html = "";
                nrocuota = $(".check-cuota").eq(i).attr("nrocuota");
                $(".check-cuota").eq(i).prop("checked", true); 
              
                $(".monto-pagar-cuota").eq(i).text(saldo_pagar.toFixed(2));
                $(".saldo-pagar").eq(i).text("0.00");

                html += '<input type="hidden" name="nrocuota[]" value="'+nrocuota+'" />';
                html += '<input type="hidden" name="saldo_cuota[]" value="0" />';
                html += '<input type="hidden" name="monto_pago_credito[]" value="'+saldo_pagar.toFixed(2)+'" />';
                $(".inputs-hidden[nrocuota='"+nrocuota+"']").html(html);

            }
            
            if(resto > 0) {
                html = "";
                nrocuota = $(".check-cuota").eq(entero).attr("nrocuota");
                $(".check-cuota").eq(entero).prop("checked", true); 
                $(".monto-pagar-cuota").eq(entero).text(resto.toFixed(2));
                $(".saldo-pagar").eq(entero).text(nuevo_saldo_pagar.toFixed(2));

                html += '<input type="hidden" name="nrocuota[]" value="'+nrocuota+'" />';
                html += '<input type="hidden" name="saldo_cuota[]" value="'+nuevo_saldo_pagar.toFixed(2)+'" />';
                html += '<input type="hidden" name="monto_pago_credito[]" value="'+resto.toFixed(2)+'" />';
                $(".inputs-hidden[nrocuota='"+nrocuota+"']").html(html);
            
            }

         
        })

        function sumar_montos_pago() {
            var montos_pago = $(".monto-pagar-cuota");
            var subtotal_montos_pago = 0;
            var monto = 0;

            for (var i = 0; i < montos_pago.length; i++) {
                // console.log(montos_pago[i].textContent);
                monto = parseFloat(montos_pago[i].textContent);
                if(isNaN(monto)) {
                    monto = 0;
                }
                // console.log(monto);
                subtotal_montos_pago += parseFloat(monto);
            }

            return subtotal_montos_pago;
        }


        //CREDITOS
        var search_solicitud_creditos = getFormSearch('frm-search-solicitud-creditos', 'search_b_solicitud_creditos', 'LoadRecordsButtonSolicitudCreditos');

        var table_container_solicitud_creditos = $("#table_container_solicitud_creditos");

        table_container_solicitud_creditos.jtable({
            title: "Lista de Solicitudes de Crédito Pendientes",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/solicitud/list_creditos',
            },
            // messages: {
            //     addNewRecord: 'Nueva Caja',
            //     editRecord: 'Editar Caja'
            // },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_solicitud_creditos
                }
                    // , {
                    //     cssClass: 'btn-primary',
                    //     text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    //     click: function () {
                    //         $scope.openDoc('solicitud/excel', {});
                    //     }
                    // }, {
                    //     cssClass: 'btn-danger-admin',
                    //     text: '<i class="fa fa-plus"></i> Nueva Solicitud',
                    //     click: function () {
                    //         newSolicitud();
                    //     }
                    // }
                ]
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
                        return '<a href="javascript:void(0)" class="emitir-pago" data-estado="' + data.record.estado
                            + '" data-id="' + data.record.cCodConsecutivo
                            + '_' + data.record.nConsecutivo + '" title="Emitir Pago"><i class="fa fa-money fa-1-5x"></i></a>';
                    }

                }

            },
            recordsLoaded: function (event, data) {
                $('.emitir-pago').click(function (e) {
                    var id = $(this).attr('data-id');
                    $.post("movimientoCajas/get_caja_diaria", {},
                        function (data, textStatus, jqXHR) {
                            // console.log();

                            if (data.length > 0) {

                                find_solicitud_credito(id);
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
                $('.eliminar-Orden').click(function (e) {
                    var ide = $(this).attr('data-ide');
                    var estado = $(this).data('estado');

                    if (estado != "1") {
                        AlertFactory.textType({
                            title: '',
                            message: 'No se puede eliminar, la solicitud ya no se encuentra en estado Registrado',
                            type: 'info'
                        });
                        return false;
                    }
                    idOrdenDelete.val(ide);
                    modalDeleteOrden.modal("show");
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

                bval = bval && data.form.find('input[name="nombre_caja"]').required();
                bval = bval && data.form.find('input[name="usuario"]').required();
                bval = bval && data.form.find('input[name="activo"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-solicitud-creditos', 'LoadRecordsButtonSolicitudCreditos', function () {
            table_container_solicitud_creditos.jtable('load', {
                search: $('#search_b_solicitud_creditos').val()
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