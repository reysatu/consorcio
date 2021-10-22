/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.query_stocks')
        .config(Config)
        .controller('Query_StockCtrl', Query_StockCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Query_StockCtrl.$inject = ['$scope'];

    function Query_StockCtrl($scope)
    {
        var titlemodalQueryStock=$("#titlemodalQueryStock");
        var modalQueryStock=$("#modalQueryStock");

        function newStock()
        {
            titlemodalQueryStock.html('Nueva Consulta de Stock');
            modalQueryStock.modal('show');
        }
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Query_Stock', 'search_b', 'LoadRecordsButtonQuery_Stock');

        var table_container_Query_Stock = $("#table_container_Query_Stock");

        table_container_Query_Stock.jtable({
            title: "Lista de Categorías",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/categories/list',
                // createAction: base_url + '/query_stocks/create',
                // updateAction: base_url + '/query_stocks/update',
                // deleteAction: base_url + '/query_stocks/delete',
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
                        $scope.openDoc('query_stocks/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Consulta Stock',
                    click: function () {
                        newStock();
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

        generateSearchForm('frm-search-Query_Stock', 'LoadRecordsButtonQuery_Stock', function(){
            table_container_Query_Stock.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('query_stocks', {
                url: '/query_stocks',
                templateUrl: base_url + '/templates/query_stocks/base.html',
                controller: 'Query_StockCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();