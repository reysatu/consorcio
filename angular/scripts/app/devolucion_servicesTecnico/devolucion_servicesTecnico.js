/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.devolucion_servicesTecnicos')
        .config(Config)
        .controller('Devolucion_servicesTecnicoCtrl', Devolucion_servicesTecnicoCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Devolucion_servicesTecnicoCtrl.$inject = ['$scope'];

    function Devolucion_servicesTecnicoCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Devolucion_servicesTecnico', 'search_b', 'LoadRecordsButtonDevolucion_servicesTecnico');

        var table_container_Devolucion_servicesTecnico = $("#table_container_Devolucion_servicesTecnico");

        table_container_Devolucion_servicesTecnico.jtable({
            title: "Lista de Categorías",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/devolucion_servicesTecnicos/list',
                createAction: base_url + '/devolucion_servicesTecnicos/create',
                updateAction: base_url + '/devolucion_servicesTecnicos/update',
                deleteAction: base_url + '/devolucion_servicesTecnicos/delete',
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
                        $scope.openDoc('devolucion_servicesTecnicos/excel', {});
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

        generateSearchForm('frm-search-Devolucion_servicesTecnico', 'LoadRecordsButtonDevolucion_servicesTecnico', function(){
            table_container_Devolucion_servicesTecnico.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('devolucion_servicesTecnicos', {
                url: '/devolucion_servicesTecnicos',
                templateUrl: base_url + '/templates/devolucion_servicesTecnicos/base.html',
                controller: 'Devolucion_servicesTecnicoCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();