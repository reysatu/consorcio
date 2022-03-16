/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.reporteRepuestos')
        .config(Config)
        .controller('ReporteRepuestoCtrl', ReporteRepuestoCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReporteRepuestoCtrl.$inject = ['$scope'];

    function ReporteRepuestoCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-ReporteRepuesto', 'search_b', 'LoadRecordsButtonReporteRepuesto');

        var table_container_ReporteRepuesto = $("#table_container_ReporteRepuesto");

        table_container_ReporteRepuesto.jtable({
            title: "Lista de Ventas",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/reporteRepuestos/list',
                // createAction: base_url + '/reporteRepuestos/create',
                // updateAction: base_url + '/reporteRepuestos/update',
                // deleteAction: base_url + '/reporteRepuestos/delete',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('reporteRepuestos/excel', {});
                    }
                },{
                    cssClass: 'btn-success',
                    text: '<i class="fa fa-file-pdf-o"></i> Reporte pdf',
                    click: function () {
                            var data_pdf = {
                               nConsecutivo:"",
                            };
                            $scope.loadReporteRepuestoPDF('reporteRepuestos/pdf',data_pdf);
                    }
                }]
            },
            fields: {
                idventa_ca: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                cCodConsecutivo: {
                    title: 'Codigo',
                     

                },

                nConsecutivo: {
                    title: 'N°',
                     

                },
                documento_ven: {
                    title: 'Documento venta',
                     

                },
                fecha: {
                    title: 'Fecha venta',
                     

                },
                monto_total: {
                    title: 'Monto Total',
                     

                },
                razonsocial_cliente: {
                    title: 'Cliente',
                     

                },
                vendedor: {
                    title: 'Vndedor',
                     

                },
                estado: {
                    title: 'Estado',
                    options: { '1': 'Registrado', '2': 'Vigente', '3': 'Por Aprobar', '4': 'Aprobado', '5': 'Rechazado', '6': 'Facturado', '7': 'Despachado' },
                },

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
        // $('.reporteRepuestos').click(function (e) {
                 
        //             var data_pdf = {
        //                     nConsecutivo:"",
        //             };
        //             $scope.loadTarjetaCobranzaPDF('reporteRepuestos/tarjetaCobranza',data_pdf);
                 
        //             e.preventDefault();
        // });
        generateSearchForm('frm-search-ReporteRepuesto', 'LoadRecordsButtonReporteRepuesto', function(){
            table_container_ReporteRepuesto.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('reporteRepuestos', {
                url: '/reporteRepuestos',
                templateUrl: base_url + '/templates/reporteRepuestos/base.html',
                controller: 'ReporteRepuestoCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();