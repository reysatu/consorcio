/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.cajas')
        .config(Config)
        .controller('CajasCtrl', CajasCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CajasCtrl.$inject = ['$scope'];

    function CajasCtrl($scope)
    {
        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonBrand');

        var table_container_cajas = $("#table_container_cajas");

        table_container_cajas.jtable({
            title: "Lista de Cajas",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/cajas/list',
                createAction: base_url + '/cajas/create',
                updateAction: base_url + '/cajas/update',
                deleteAction: base_url + '/cajas/delete',
            },
            messages: {
                addNewRecord: 'Nueva Caja',
                editRecord: 'Editar Caja'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('cajas/excel', {});
                    }
                }]
            },
            fields: {
                idcaja: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false,
                },
                idtienda: {
                    title: 'Tienda',
                    options: base_url + '/cajas/getTiendas' 

                },
                nombre_caja: {
                    title: 'Nombre Caja'
                },
                usuario: {
                    title: 'Usuario'
                },
                activo: {
                    title: 'Activo',
                    values: { 'N': 'Inactivo', 'S': 'Activo' },
                    type: 'checkbox',
                    listClass: 'text-center',
                     defaultValue: 'S',
                   
                   
                },
                
            },
            formCreated: function (event, data) {
     
                //data.form.find('input[name="convenio"]').attr('onkeypress','return soloLetras(event)');
                $('#Edit-activo').parent().addClass('i-checks');
               
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                     if(e.target.value == 'S'){
                        $("#Edit-activo").val("N");
                        $(".i-checks span").text("Inactivo");

                     }else{
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

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonBrand', function(){
            table_container_cajas.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('cajas', {
                url: '/cajas',
                templateUrl: base_url + '/templates/cajas/base.html',
                controller: 'CajasCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();