/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.query_movements')
        .config(Config)
        .controller('Query_MovementCtrl', Query_MovementCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Query_MovementCtrl.$inject = ['$scope'];

    function Query_MovementCtrl($scope)
    {
        
        
        var titlemodalQueryMovement=$("#titlemodalQueryMovement");
        var modalQueryMovement=$("#modalQueryMovement");

        function newQueryMovement()
        {
            titlemodalQueryMovement.html('Nueva Consulta de Movimiento');
            modalQueryMovement.modal('show');
        }


         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Query_Movement', 'search_b', 'LoadRecordsButtonQuery_Movement');

        var table_container_Query_Movement = $("#table_container_Query_Movement");

        table_container_Query_Movement.jtable({
           title: "Lista de Movimientos por Articulo",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/query_movements/list',
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
                        $scope.openDoc('query_movements/excel', {});
                    }
                }]
            },
            fields: {
                idTransaccion: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                id: {
                    key: false,
                    create: false,
                    edit: false,
                    list: false
                },
                fecha_registro: {
                    key: false,
                    create: false,
                    edit: false,
                    list: false
                },
                fecha_proceso_s: {
                    title: 'F. Proceso'
                },
                fecha_registro_s: {
                    title: 'F. Registro'
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
                Tipo_Operacion: {
                    title: 'Tip.Ope.',
                    width: '3%'
                },
                Naturaleza: {
                    title: 'Nat.',
                    width: '3%'
                },
                Origen: {
                    title: 'Ori.',
                    width: '3%'
                },
                idOrigen: {
                    title: 'Id',
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
                Cantidad: {
                    title:'Cant.',
                    listClass:'text-right',
                    width: '3%'
                },
                Costo_Unitario: {
                    title:'C.Unitario',
                    listClass:'text-right',
                    width: '3%'
                },
                Precio_Unitario: {
                    title:'P.Unitario',
                    listClass:'text-right',
                    width: '3%'
                },
                Costo_Total: {
                    title:'C.Total',
                    listClass:'text-right',
                    width: '3%'
                },
                Precio_Total: {
                    title:'P.Total',
                    listClass:'text-right',
                    width: '3%'
                },

                Lote: {
                    title: 'Lote'
                },
                Serie: {
                    title: 'Serie'
                }

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

        generateSearchForm('frm-search-Query_Movement', 'LoadRecordsButtonQuery_Movement', function(){
            table_container_Query_Movement.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('query_movements', {
                url: '/query_movements',
                templateUrl: base_url + '/templates/query_movements/base.html',
                controller: 'Query_MovementCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();