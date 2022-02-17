/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.asignacioncobradors')
        .config(Config)
        .controller('AsignacioncobradorCtrl', AsignacioncobradorCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    AsignacioncobradorCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory', 'Helpers'];

    function AsignacioncobradorCtrl($scope, _, RESTService, AlertFactory, Helpers)
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
               
                RESTService.updated('asignacioncobradors/saveCobrador', w_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'Se asignó el cobrador correctamente.',
                            type: 'success'
                        });
                         modalCobradores.modal('hide');
                        $("#LoadRecordsButtonAsignacioncobrador").click();
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
        
        var search = getFormSearchAsignacion('frm-search-Asignacioncobrador', 'search_b', 'LoadRecordsButtonAsignacioncobrador');

        var table_container_Asignacioncobrador = $("#table_container_Asignacioncobrador");

        table_container_Asignacioncobrador.jtable({
            title: "Lista de Solicitudes",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/asignacioncobradors/list',
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
                select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                           return '<label class="checkbox-inline i-checks"> <input name="idSolicitud" class="check valcheck" type="checkbox" id="p_state" data_idSolicitud="'+data.record.cCodConsecutivo+'*'+data.record.nConsecutivo+'" ></label>';
                       }
                },
                Cronograma: {
                    title: '',
                    width: '5%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (studentData) {
                      
                        var $img = $('<i class="fa fa-plus" style="font-size:20px;color:#1c84c6;cursor: pointer"></i>');
                     
                        $img.click(function () {
                            $('#table_container_Asignacioncobrador').jtable('openChildTable',
                                    $img.closest('tr'), //Parent row
                                    {
                                    title:'Cronograma',
                                    actions: {
                                        listAction: base_url + '/asignacioncobradors/listCronograma?cCodConsecutivo=' + studentData.record.cCodConsecutivo +'&nConsecutivo='+studentData.record.nConsecutivo,
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
                tipoComprobanteText: {
                    title: 'Tipo Comprobante',
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
                Cobrador: {
                    title: 'Cobrador',


                },
                cliente: {
                    title: 'Cliente',
                },
                estado: {
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

        generateSearchForm('frm-search-Asignacioncobrador', 'LoadRecordsButtonAsignacioncobrador', function(){
            table_container_Asignacioncobrador.jtable('load', {
                search: $('#search_b').val(),
                filtro_tienda: $('#filtro_tienda').val(),
                idInicio: $('#idInicio').val(),
                idFin: $('#idFin').val(),
                idClienteFiltro: $('#idClienteFiltro').val(),
                idCobradorFiltro: $('#idCobradorFiltro').val(),
                

            });
        }, true);
        $(".jtable-title-text").removeClass('col-md-4');
        $(".jtable-title-text").addClass('col-md-2');

        $(".jtable-toolbar").removeClass('col-md-8');
        $(".jtable-toolbar").addClass('col-md-10');


        $("#btn_exportar_dd").click(function(e){
            newAsignacion();
        });
        function getDataForm () {
            RESTService.all('asignacioncobradors/data_form', '', function(response) {
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

            .state('asignacioncobradors', {
                url: '/asignacioncobradors',
                templateUrl: base_url + '/templates/asignacioncobradors/base.html',
                controller: 'AsignacioncobradorCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();