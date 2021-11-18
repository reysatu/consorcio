/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.proformas')
        .config(Config)
        .controller('ProformaCtrl', ProformaCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ProformaCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ProformaCtrl($scope, _, RESTService, AlertFactory)
    {
        

        var modalProforma=$("#modalProforma");
        var titlemodalProforma=$("#titlemodalProforma");
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };


        
        var search = getFormSearch('frm-search-Proforma', 'search_b', 'LoadRecordsButtonProforma');

        var table_container_Proforma = $("#table_container_Proforma");


        function newProforma() {
            // var hoy = new Date();
            // var actu=hoy.getFullYear()+"-"+ (hoy.getMonth()+1)+ "-" +hoy.getDate() ;
            // var hora = hoy.getHours() + ':' + hoy.getMinutes();
            modalProforma.modal('show');
            titlemodalProforma.html('Nueva Proforma');
        }


        table_container_Proforma.jtable({
            title: "Lista de Proformas",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/proformas/list',
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
                        $scope.openDoc('proformas/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Proforma',
                    click: function () {
                        newProforma();
                    }
                }]
            },
            fields: {
                cCodConsecutivo: {
                    key: true,
                    create: false,
                    edit: false,
                    list: true,
                    title: 'Cod',
                },
                nConsecutivo: {
                    title: 'Consecutivo',
                     

                },
                cCodConsecutivoOS: {
                    title: 'Consecutivo Os',
                   
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-orden" data-id="'+data.record.cCodConsecutivo
                            +'_'+data.record.nConsecutivo+'" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                },Eliminar: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a data-target="#"  data-ide="'+data.record.cCodConsecutivo+'_'+data.record.nConsecutivo+'"   title="Eliminar" class="jtable-command-button eliminar-Orden"><i class="fa fa-trash fa-1-5x fa-red"><span>Eliminar</span></i></a>';
                    }
                    
                }

            },
           
            recordsLoaded: function(event, data) {
                $('.edit-orden').click(function(e){
                    var id = $(this).attr('data-id');
                    findRegister_Orden(id);
                    e.preventDefault();
                });
                  $('.eliminar-Orden').click(function(e){
                    var ide = $(this).attr('data-ide');
                    idOrdenDelete.val(ide);
                    modalDeleteOrden.modal("show");
                    e.preventDefault();
                });
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

        generateSearchForm('frm-search-Proforma', 'LoadRecordsButtonProforma', function(){
            table_container_Proforma.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('proformas', {
                url: '/proformas',
                templateUrl: base_url + '/templates/proformas/base.html',
                controller: 'ProformaCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();