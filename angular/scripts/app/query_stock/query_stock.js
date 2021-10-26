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
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Query_Stock', 'search_b', 'LoadRecordsButtonQuery_Stock');

        var table_container_Query_Stock = $("#table_container_Query_Stock");

        table_container_Query_Stock.jtable({
            title: "Lista de Articulos con Stock",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/query_stocks/list',
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
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Articulo: {
                    title: 'Articulo'
                },
                Categoria: {
                    title: 'Categoria'
                },
                Unidad: {
                    title: 'Uni.',
                    width: '3%'
                },
                Almacen: {
                    title: 'Alm.',
                    width: '6%'
                },
                Localizacion: {
                    title: 'Loc.',
                    width: '6%'
                },
                Lote: {
                    title: 'Lote'
                },
                Serie: {
                    title: 'Serie'
                },
                Disponible: {
                    title:'Disponible',
                    listClass:'text-right',
                    width: '3%'
                },
                Remitido: {
                    title:'Remitido',
                    listClass:'text-right',
                    width: '3%'
                },
                Total: {
                    title:'S.Total',
                    listClass:'text-right',
                    width: '3%'
                },
                Transito: {
                    title:'Tránsito',
                    listClass:'text-right',
                    width: '3%'
                },
                Costo_Promedio_Unitario: {
                    title:'Costo',
                    listClass:'text-right',
                    width: '3%'
                },
                Costo_Total: {
                    title:'C.Total',
                    listClass:'text-right',
                    width: '3%'
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