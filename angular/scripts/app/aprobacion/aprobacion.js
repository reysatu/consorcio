/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.aprobacion')
        .config(Config)
        .controller('AprobacionCtrl', AprobacionCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    AprobacionCtrl.$inject = ['$scope'];

    function AprobacionCtrl($scope)
    {
        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonBrand');

        var table_container_aprobacion = $("#table_container_aprobacion");

        table_container_aprobacion.jtable({
            title: "Lista de Aprobacion",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/aprobacion/list',
                createAction: base_url + '/aprobacion/create',
                updateAction: base_url + '/aprobacion/update',
                deleteAction: base_url + '/aprobacion/delete',
            },
            messages: {
                addNewRecord: 'Nueva Aprobacion',
                editRecord: 'Editar Aprobacion'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('aprobacion/excel', {});
                    }
                }]
            },
            fields: {
                idaprobacion: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false,
                },
                idtienda: {
                    title: 'Tienda',
                    options: base_url + '/aprobacion/getTiendas' 

                },
                nombre_aprobacion: {
                    title: 'Nombre Aprobacion'
                },
               
                
            },
            formCreated: function (event, data) {
     
                //data.form.find('input[name="convenio"]').attr('onkeypress','return soloLetras(event)');
              
            },
            formSubmitting: function (event, data) {
                var bval = true;
                // bval = bval && data.form.find('input[name="codigo_formapago"]').required();
                bval = bval && data.form.find('input[name="nombre_aprobacion"]').required();
     
                return bval;
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonBrand', function(){
            table_container_aprobacion.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('aprobacion', {
                url: '/aprobacion',
                templateUrl: base_url + '/templates/aprobacion/base.html',
                controller: 'AprobacionCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();