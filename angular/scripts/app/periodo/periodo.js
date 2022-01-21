/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.periodos')
        .config(Config)
        .controller('PeriodoCtrl', PeriodoCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    PeriodoCtrl.$inject = ['$scope', '_', 'RESTService','AlertFactory'];

    function PeriodoCtrl($scope,_, RESTService ,AlertFactory)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Periodo', 'search_b', 'LoadRecordsButtonPeriodo');

        var table_container_Periodo = $("#table_container_Periodo");

        table_container_Periodo.jtable({
            title: "Lista de Periodos",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/periodos/list',
                createAction: function (postData) {
                    console.log("creating from custom function...");
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            url: '/periodos/create',
                            type: 'POST',
                            dataType: 'json',
                            data: postData,
                            success: function (data) {
                                console.log(data.data_ide);
                                if(data.data_ide=='A'){
                                    $dfd.resolve(data);
                                }else{
                                    $("#AddRecordDialogSaveButton").prop("disabled",false);
                                     AlertFactory.textType({
                                                    title: '',
                                                    message: 'El periodo ya existe',
                                                    type: 'info'
                                    });
                                       $("#AddRecordDialogSaveButton").prop("disabled",false);
                                        $("#AddRecordDialogSaveButton").removeClass("ui-state-disabled");
                                }
                                
                            },
                            error: function () {
                               
                            }
                        });
                    });
                },
                updateAction: base_url + '/periodos/update',
                deleteAction: base_url + '/periodos/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Periodo',
                editRecord: 'Editar Periodo',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('periodos/excel', {});
                    }
                }]
            },
            fields: {
                periodo: {
                    title: 'Periodo',
                    key: true,
                    create: true,
                    edit: true,
                    list: true
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
                  data.form.find('input[name="periodo"]').attr('maxlength','7');
                 // $("#ms_num").attr('maxlength','6');
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
                if(data.formType=='edit') {
                $('#Edit-periodo').prop('readonly', true);
                $('#Edit-periodo').addClass('jtable-input-readonly');
            }
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="Categoria"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Periodo', 'LoadRecordsButtonPeriodo', function(){
            table_container_Periodo.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('periodos', {
                url: '/periodos',
                templateUrl: base_url + '/templates/periodos/base.html',
                controller: 'PeriodoCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();