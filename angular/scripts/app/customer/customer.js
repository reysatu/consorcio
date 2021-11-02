/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.customers')
        .config(Config)
        .controller('CustomerCtrl', CustomerCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CustomerCtrl.$inject = ['$scope'];

    function CustomerCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Customer', 'search_b', 'LoadRecordsButtonCustomer');

        var table_container_Customer = $("#table_container_Customer");

        table_container_Customer.jtable({
            title: "Lista de Clientes",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/customers/list',
                createAction: base_url + '/customers/create',
                updateAction: base_url + '/customers/update',
                deleteAction: base_url + '/customers/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Cliente',
                editRecord: 'Editar Cliente',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('customers/excel', {});
                    }
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                tipodoc: {
                    title: 'Tipo Documento',
                    options: { 'DNI': 'DNI', 'RUC': 'RUC'}
                },
                documento: {
                    title: 'Documento',
                },
                razonsocial_cliente: {
                   title: 'Razon Social',
                   
                },
                contacto: {
                   title: 'Contacto',
                   
                },
                direccion: {
                   title: 'Razon Social',
                   
                },
                correo_electronico: {
                   title: 'Correo',
                   
                },
                celular: {
                   title: 'Celular',
                   
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
                bval = bval && data.form.find('input[name="tipodoc"]').required();
                bval = bval && data.form.find('input[name="documento"]').required();
                bval = bval && data.form.find('input[name="razonsocial_cliente"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Customer', 'LoadRecordsButtonCustomer', function(){
            table_container_Customer.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('customers', {
                url: '/customers',
                templateUrl: base_url + '/templates/customers/base.html',
                controller: 'CustomerCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();