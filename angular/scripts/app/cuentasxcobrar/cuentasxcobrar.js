/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () { 
    'use strict';
    angular.module('sys.app.cuentasxcobrars')
        .config(Config)
        .controller('CuentasxcobrarCtrl', CuentasxcobrarCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CuentasxcobrarCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory', 'Helpers'];

    function CuentasxcobrarCtrl($scope, _, RESTService, AlertFactory, Helpers)
    {
        var modalCobradores=$("#modalCobradores");
        var idCobrador=$("#idCobrador"); 
        //  $scope.chkState = function () {
        //     var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
        //     state_state.html(txt_state2);
        // };
         modalCobradores.on('hidden.bs.modal', function (e) {
                    idCobrador.val("").trigger("change"); 
        });
        $scope.savecobrador = function () {
            var bval = true;
            bval = bval && idCobrador.required();
            var sele=0;
            $("input[name=idSolicitud]:checkbox:checked").each(function(idx, item) {
                sele=sele+1;
            });
            if(sele==0){
                 AlertFactory.showWarning({
                    title: '',
                    message: 'Debe seleccionar al menos una solicitud'
                });
                return false;
            }
            if (bval) { 
                var cobradores = [];
                $("input[name=idSolicitud]:checkbox:checked").each(function(idx, item) {
                    cobradores[idx] =$(this).attr('data_idSolicitud');
                });
                cobradores = cobradores.join(',');
 
                var params = {
                    'idCobrador':idCobrador.val(),
                    'cobradores':cobradores,
                };
                var w_id=0;
               
                RESTService.updated('cuentasxcobrars/saveCobrador', w_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'Se asignó el cobrador correctamente.',
                            type: 'success'
                        });
                         modalCobradores.modal('hide');
                        $("#LoadRecordsButtonCuentasxcobrar").click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'error'
                        });
                    }
                });
            }

        }
        
         function newAsignacion()
        {  

        //      $("input[name=idSolicitud]:checkbox:checked").each(function() {
        //      console.log($(this).attr('data_idSolicitud'));
        // });
            modalCobradores.modal('show');
        }
         idCobrador.select2();
        
        var search = getFormSearchCuentasxcobrar('frm-search-Cuentasxcobrar', 'search_b', 'LoadRecordsButtonCuentasxcobrar');

        var table_container_Cuentasxcobrar = $("#table_container_Cuentasxcobrar");

        table_container_Cuentasxcobrar.jtable({
            title: "Lista de Solicitudes",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/cuentasxcobrars/listcuentas',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
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
                            $('#table_container_Cuentasxcobrar').jtable('openChildTable',
                                    $img.closest('tr'), //Parent row
                                    {
                                    title:'Cronograma',
                                    actions: {
                                        listAction: base_url + '/cuentasxcobrars/listCronogramaCuentasxCobrar?cCodConsecutivo=' + studentData.record.cCodConsecutivo +'&nConsecutivo='+studentData.record.nConsecutivo,
                                    },
                                    fields: {
                                        nrocuota: {
                                            title: 'N° de Cuota',
                                        },
                                        fecha_vencimiento: {
                                            title: 'Fecha Vencimiento',
                                               display: function (data) {
                                                    return moment(data.record.fecha_vencimiento).format('DD/MM/YYYY');
                                                 }   
                                        },
                                        valor_cuota: {
                                            title: 'Valor Cuota',
                                        },
                                        int_moratorio: {
                                            title: 'Mora',
                                        },
                                        saldo_cuota: {
                                            title: 'Saldo',
                                        },
                                        dias_mora: {
                                            title: 'Días de mora',
                                            display: function (data) {
                                                    var fecha1=moment(data.record.fecha_vencimiento).format('YYYY/MM/DD');
                                                    var fecha1 = new Date(fecha1);
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
                                                    var fecha2=hAnio+'/'+hmes+'/'+hdia;
                                                    var fecha2 = new Date(fecha2);
                                                    var resta = fecha2.getTime() - fecha1.getTime();
                                                    var total=Math.round(resta/ (1000*60*60*24));
                                                    var dim=0;
                                                    if(total>0){
                                                        dim=total;
                                                    };
                                                    if(Number(data.record.saldo_cuota)<=0){
                                                        dim=0;
                                                    };
                                                   return dim;
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
                //  print: {
                //     width: '1%',
                //     sorting: false,
                //     edit: false,
                //     create: false,
                //     listClass: 'text-center', 
                //     display: function (data) {
                //         return '<a href="javascript:void(0)" title="Tarjeta" class="print_content" data-code="' +
                //             data.record.cCodConsecutivo +'*'+data.record.nConsecutivo+'"><i class="fa fa-file fa-1-5x fa-green"></i></a>';
                //     }
                // },
                cCodConsecutivo: {
                    key: true,
                    create: false,
                    edit: false,
                    list: true,
                    title: 'Código',
                       width: '1%',
                },
                nConsecutivo: {
                    title: 'Nro',
                       width: '1%',
                },

                fecha_solicitud: {
                    title: 'Fecha',
                    display: function (data) {
                        return moment(data.record.fecha_solicitud).format('DD/MM/YYYY');
                    }

                },
                tipoComprobanteText: {
                    title: 'Tipo Comprobante',
                       width: '1%',
                },
                serie_comprobante: {
                    title: 'Serie',
                       width: '1%',
                },
                numero_comprobante: {
                    title: 'N°',
                       width: '1%',
                },
                tipo_solicitud: {
                       width: '1%',
                    title: 'Tipo Solicitud',
                    options: { '1': 'Contado', '2': 'Crédito Directo', '3': 'Crédito Financiero' },

                },
                tipo_documento: {
                       width: '1%',
                    title: 'Tipo Doc.',


                },
                numero_documento: {
                       width: '1%',
                    title: 'N° Documento',


                },
                moneda: {
                       width: '1%',
                    title: 'Moneda',

 
                },
                t_monto_total: {
                       width: '1%',
                    title: 'Monto',
                     display: function (data) {
                                                 var  saldo=data.record.t_monto_total;
                                                 var newsal=Number(saldo).toFixed(2);
                                                 return(addCommas(newsal));
                  }


                },
                pagado: {
                       width: '1%',
                    title: 'Pagado',
                   display: function (data) {
                                                 var  saldo=data.record.pagado;
                                                 var newsal=Number(saldo).toFixed(2);
                                                 return(addCommas(newsal));
                  }



                },
                saldo: {
                       width: '1%',
                    title: 'Saldo',
                     display: function (data) {
                                                 var  saldo=data.record.saldo;
                                                 var newsal=Number(saldo).toFixed(2);
                                                 return(addCommas(newsal));
                  }



                },
                Cobrador: {
                    title: 'Cobrador',
                    width: '15%',


                },
                cliente: {
                    title: 'Cliente',
                    width: '50%',
                },
                estado: {
                       width: '1%',
                    title: 'Estado',
                    options: { '1': 'Registrado', '2': 'Vigente', '3': 'Por Aprobar', '4': 'Aprobado', '5': 'Rechazado', '6': 'Facturado', '7': 'Despachado' },
                },
               
              
            },
             recordsLoaded: function(event, data) {
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
                            $(event.target).click();
                    });
                    $('.print_content').click(function (e) {
                    var id = $(this).attr('data-code');
                    var totalid=id.split("*");
                    var data_pdf = {
                            cCodConsecutivo:totalid[0],
                            nConsecutivo:totalid[1],
                    };
                    $scope.loadTarjetaCobranzaPDF('cuentasxcobrars/tarjetaCobranza',data_pdf);
                 
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

        generateSearchForm('frm-search-Cuentasxcobrar', 'LoadRecordsButtonCuentasxcobrar', function(){
            table_container_Cuentasxcobrar.jtable('load', {
                search: $('#search_b').val(),
                filtro_tienda: $('#filtro_tienda').val(),
                idInicio: $('#idInicio').val(),
                idFin: $('#idFin').val(),
                idClienteFiltro: $('#idClienteFiltro').val(),
                idCobradorFiltro: $('#idCobradorFiltro').val(),
                FechaInicioFiltro: $('#FechaInicioFiltro').val(),
                FechaFinFiltro: $('#FechaFinFiltro').val(),
                

            });
        }, true); 
        $("#btn_exportar_CC").click(function(e){
            var data_excel = {
                            search: '',
                            filtro_tienda: $('#filtro_tienda').val(),
                            idInicio: $('#idInicio').val(),
                            idFin: $('#idFin').val(),
                            idClienteFiltro: $('#idClienteFiltro').val(),
                            idCobradorFiltro: $('#idCobradorFiltro').val(),
                            FechaInicioFiltro: $('#FechaInicioFiltro').val(),
                            FechaFinFiltro: $('#FechaFinFiltro').val(),
             };
            //             $scope.openDoc('projects/excel', data_excel);

            $scope.loadCCPDF('cuentasxcobrars/cuentasporcobrar',data_excel);
        });

        $(".jtable-title-text").removeClass('col-md-4');
        $(".jtable-title-text").addClass('col-md-2');

        $(".jtable-toolbar").removeClass('col-md-8');
        $(".jtable-toolbar").addClass('col-md-10');


        $("#btn_exportar_dd").click(function(e){
            newAsignacion();
        });
        function getDataForm () {
            RESTService.all('cuentasxcobrars/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var cobradores=response.cobrador;
                    var cobradores=response.cobrador;
                    var clientes=response.cliente;
                       var tiendas=response.tienda;
                      idCobrador.append('<option value="" selected>Seleccionar</option>');
                      cobradores.map(function (index) {
                         idCobrador.append('<option value="'+index.id+'">'+index.descripcion+'</option>');
                      });
                      $("#idCobradorFiltro").append('<option value="" selected>Cobradores</option>');
                      cobradores.map(function (index) {
                         $("#idCobradorFiltro").append('<option value="'+index.id+'">'+index.descripcion+'</option>');
                      });
                      $("#idClienteFiltro").append('<option value="" selected>Clientes</option>');
                      clientes.map(function (index) {
                         $("#idClienteFiltro").append('<option value="'+index.id+'">'+index.razonsocial_cliente+'</option>');
                      });
                       $("#filtro_tienda").append('<option value="" selected>Tiendas</option>');
                       tiendas.map(function (index) {
                         $("#filtro_tienda").append('<option value="'+index.idTienda+'">'+index.descripcion+'</option>');
                      });

                }
            }, function() {
                getDataForm();
            });
        }
        getDataForm();
        $("#idCobradorFiltro").select2();
        $("#idClienteFiltro").select2();
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('cuentasxcobrars', {
                url: '/cuentasxcobrars',
                templateUrl: base_url + '/templates/cuentasxcobrars/base.html',
                controller: 'CuentasxcobrarCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();