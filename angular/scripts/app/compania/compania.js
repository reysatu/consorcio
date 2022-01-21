/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.companias')
        .config(Config)
        .controller('CompaniaCtrl', CompaniaCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CompaniaCtrl.$inject = ['$scope'];

    function CompaniaCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Compania', 'search_b', 'LoadRecordsButtonCompania');

        var table_container_Compania = $("#table_container_Compania");
        table_container_Compania.jtable({
            title: "Lista de Companias",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/companias/list',
                createAction: base_url + '/companias/create',
                updateAction: base_url + '/companias/update',
                deleteAction: base_url + '/companias/delete',
            },
            messages: {
                addNewRecord: 'Nueva Compania',
                editRecord: 'Editar Compania',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('companias/excel', {});
                    }
                }]
            },
            fields: {
                IdCompania: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                RazonSocial: {
                    title: 'Razón Social',
                },
                NombreComercial: {
                    title: 'Nombre Comercial',
                },
                Direccion: {
                    title: 'Dirección',
                },
                Ruc: {
                    title: 'Ruc',
                },
                Telefono1: {
                      title: 'Telefono 1',

                },
                Telefono2: {
                    title: 'Telefono 2',
                    list: false,
                },
                 Telefono3: {
                   title: 'Telefono 3',
                   list: false,
                },
                 Telefono4: {
                     title: 'Telefono 4',
                     list: false,
                   
                },
                 Contacto: {
                    title: 'Contacto',
                     list: false,

                },
                Correo: {
                     title: 'Correo',
                     list: false,
                },
                 Base: {
                    title: 'Base',
                    list: false,
                },
                Estado: {
                  title: 'Estado',
                    values: { '0': 'Inactivo', '1': 'Activo' },
                    type: 'checkbox',
                    defaultValue: '1',
                },
                RutaData: {
                    title: 'RutaData',
                    list: false,
                },
                RutaLog: {
                    title: 'RutaLog',
                    list: false,
                },
                FechaUltBackup: {
                   title: 'Fecha Backup',
                   type: 'date',
                    displayFormat: 'dd/mm/yy',
                   list: false,
                },
               
            },
           

            formCreated: function (event, data) {
                data.form.find('input[name="Categoria"]').attr('onkeypress','return soloLetras(event)');
                $("#Edit-Ruc").attr('maxlength','11');
                $('#Edit-Estado').parent().addClass('i-checks');
               
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                     if(e.target.value=='1'){
                        $("#Edit-Estado").val("0");
                        $(".i-checks span").text("Inactivo");

                     }else{
                        $("#Edit-Estado").val("1");
                        $(".i-checks span").text("Activo");
                     };
                });
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="RazonSocial"]').required();
                bval = bval && data.form.find('input[name="NombreComercial"]').required();
                bval = bval && data.form.find('input[name="Direccion"]').required();
                bval = bval && data.form.find('input[name="Ruc"]').required();
                bval = bval && data.form.find('input[name="Telefono1"]').required();
                bval = bval && data.form.find('input[name="Contacto"]').required();
                bval = bval && data.form.find('input[name="Correo"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Compania', 'LoadRecordsButtonCompania', function(){
            table_container_Compania.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('companias', {
                url: '/companias',
                templateUrl: base_url + '/templates/companias/base.html',
                controller: 'CompaniaCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();