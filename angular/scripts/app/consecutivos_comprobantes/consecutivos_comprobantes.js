/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.consecutivos_comprobantes')
        .config(Config)
        .controller('ConsecutivosComprobantesCtrl', ConsecutivosComprobantesCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ConsecutivosComprobantesCtrl.$inject = ['$scope'];

    function ConsecutivosComprobantesCtrl($scope)
    {
        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonBrand');

        var table_container_consecutivos_comprobantes = $("#table_container_consecutivos_comprobantes");

        table_container_consecutivos_comprobantes.jtable({
            title: "Lista de Consecutivos Comprobantes",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/consecutivos_comprobantes/list',
                createAction: base_url + '/consecutivos_comprobantes/create',
                updateAction: base_url + '/consecutivos_comprobantes/update',
                deleteAction: base_url + '/consecutivos_comprobantes/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Consecutivo',
                editRecord: 'Editar Consecutivo'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('consecutivos_comprobantes/excel', {});
                    }
                }]
            },
            fields: {
                id_consecutivo: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false,
                },
                idtienda: {
                    title: 'Tienda',
                    options: base_url + '/consecutivos_comprobantes/getTiendas' 

                },
                serie: {
                    title: 'Serie'
                },
                numero: {
                    title: 'Número'
                },
                actual: {
                    title: 'Actual'
                },
                ultimo: {
                    title: 'Último'
                },
                longitud: {
                    title: 'Longitud'
                },
            },
            formCreated: function (event, data) {
     
                //data.form.find('input[name="convenio"]').attr('onkeypress','return soloLetras(event)');
               
            },
            formSubmitting: function (event, data) {
                var bval = true;
                // bval = bval && data.form.find('input[name="codigo_formapago"]').required();
                bval = bval && data.form.find('input[name="serie"]').required();
                bval = bval && data.form.find('input[name="numero"]').required();
                bval = bval && data.form.find('input[name="actual"]').required();
                bval = bval && data.form.find('input[name="ultimo"]').required();
                bval = bval && data.form.find('input[name="longitud"]').required();
                // bval = bval && data.form.find('input[name="longitud"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonBrand', function(){
            table_container_consecutivos_comprobantes.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('consecutivos_comprobantes', {
                url: '/consecutivos_comprobantes',
                templateUrl: base_url + '/templates/consecutivos_comprobantes/base.html',
                controller: 'ConsecutivosComprobantesCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();