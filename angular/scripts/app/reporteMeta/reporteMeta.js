/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.reporteMetas')
        .config(Config)
        .controller('ReporteMetaCtrl', ReporteMetaCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReporteMetaCtrl.$inject = ['$scope','_', 'RESTService', 'AlertFactory', 'Notify','Helpers'];

    function ReporteMetaCtrl($scope, _, RESTService, AlertFactory, Notify,Helpers)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        var btn_imprimirMovimiento=$("#btn_imprimirMovimiento");
        var tipoObjetivos=$("#tipoObjetivos");
        var btn_imprimirDiario=$("#btn_imprimirDiario");

        $("#btn_imprimirDiario").click(function(e){
            var data_excel = {
                            Anio: $('#Anio').val(),
             };
            var bval = true;
            bval = bval && tipoObjetivos.required();
            if(bval){
             if(tipoObjetivos.val()==1){
                 $scope.openDocExeclMes('reporteMetas/excelMes',data_excel);
              } 
            }
             
            //             $scope.openDoc('projects/excel', data_excel);
         
        });
        // $("#btn_exportar_QM").click(function(e){
        //     var data_excel = {
        //                     filtro_idAlm:$('#filtro_idAlm').val(),
        //                     filtro_idLoc:$('#filtro_idLoc').val(),
        //                     filtro_nat:$('#filtro_nat').val(),
        //                     filtro_oper:$('#filtro_oper').val(),
        //                     filtro_cate:$('#filtro_cate').val(),
        //                     filtro_art:$('#filtro_art').val(),
        //                     n_movimiento:$('#n_movimiento').val(),
        //                     cod_lote:$('#cod_lote').val(),
        //                     cod_serie:$('#cod_serie').val(),
        //                     fecha_inicio:$('#fecha_inicio').val(),
        //                     fecha_fin:$('#fecha_fin').val(),
        //                     search: '',
        //      };
        //     //             $scope.openDoc('projects/excel', data_excel);
        //     $scope.openDoc('query_movements/excel',data_excel);
        // });


        // $("#btn_imprimirMovimiento").click(function(e){
        //     var data_excel = {
        //                     Anio: $('#Anio').val(),
        //                     mes: $('#mes').val(),
        //      };
        //     //             $scope.openDoc('projects/excel', data_excel);
        //     $scope.loadReporResumenMensualPDF('reporteMetas/pdf',data_excel);
        // });

        function getDataFormMovement () {
            RESTService.all('reporteMetas/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                  
                    tipoObjetivos.html("");
                    tipoObjetivos.append('<option value="" selected>Seleccionar</option>');
                     _.each(response.tiposObjetivos, function(item) {
                        tipoObjetivos.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
                    });
                }
            }, function() {
                getDataFormMovement();
            });
        }
        getDataFormMovement();

 
        var search = getFormSearch('frm-search-ReporteMeta', 'search_b', 'LoadRecordsButtonReporteMeta');

        var table_container_ReporteMeta = $("#table_container_ReporteMeta");

        table_container_ReporteMeta.jtable({
            title: "Lista de Categorías",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/reporteMetas/list',
                createAction: base_url + '/reporteMetas/create',
                updateAction: base_url + '/reporteMetas/update',
                deleteAction: base_url + '/reporteMetas/delete',
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
                        $scope.openDoc('reporteMetas/excel', {});
                    }
                }]
            },
            fields: {
                idCategoria: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Categoria: {
                    title: 'Categoría',
                     

                },
                estado: {
                    title: 'Estado',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                    type: 'checkbox',
                    defaultValue: 'A',
                   
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

        generateSearchForm('frm-search-ReporteMeta', 'LoadRecordsButtonReporteMeta', function(){
            table_container_ReporteMeta.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('reporteMetas', {
                url: '/reporteMetas',
                templateUrl: base_url + '/templates/reporteMetas/base.html',
                controller: 'ReporteMetaCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();