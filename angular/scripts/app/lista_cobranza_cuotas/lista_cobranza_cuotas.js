/**
 * Created by JAIR on 4/5/2017.
 */
 
(function () {
    'use strict';
    angular.module('sys.app.lista_cobranza_cuotas')
        .config(Config)
        .controller('ListaCobranzaCuotasCtrl', ListaCobranzaCuotasCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ListaCobranzaCuotasCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ListaCobranzaCuotasCtrl($scope, _, RESTService, AlertFactory)
    {
        function chkState (id) {
            id = id.substr(13);
            var input_val = $('#input_option_'+id);
            var is_check = $('#check_option_'+id).prop('checked');
            input_val.prop('readonly', !is_check);
            if (!is_check) {
                input_val.val('');
            } else {
                input_val.focus();
            }
        }

        function verifyChkOption3 (verify) {
            if (verify) {
                $('.chk_main30').prop('checked', false).iCheck('update');
                setTimeout(function(){
                    $('.chk_main3').prop('checked', true).iCheck('update').parent().addClass('checked');
                });
            } else {
                $('.chk_main3').prop('checked', ($('.chk_main30:checked').length == 0)).iCheck('update');
            }
        }

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            var id = $(event.target).prop('id');
            if ($(event.target).hasClass('chk_option3')) {
                verifyChkOption3($(event.target).hasClass('chk_main3'));
            } else {
                chkState(id);
            }
        });


        function obtener_data_for_reporte() {
            RESTService.all('visita_cliente/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    

                    $("#idcobrador").append('<option value="" selected>Seleccionar</option>');
                    response.cobrador.map(function (index) {
                       $("#idcobrador").append('<option value="'+index.id+'">'+index.descripcion+'</option>');
                    });


                    $("#idtienda").append('<option value="" selected>Todos</option>');
                    response.tiendas.map(function (index) {
                       $("#idtienda").append('<option value="'+index.idTienda+'">'+index.descripcion+'</option>');
                    });

                  


                    $("#idcobrador").select2();
                    $("#idtienda").select2();
              
                   

                }
            }, function () {
                obtener_data_for_reporte();
            });
        }

        obtener_data_for_reporte();

        // function getConfigs() {
        //     RESTService.all('lista_cobranza_cuotas/all', '', function (response) {
        //         if (!_.isUndefined(response.status) && response.status) {
        //             _.each(response.Data, function (item) {
        //                 var id = item.id;
        //                 $('#config_'+id).val(item.description);
        //                 $('#check_option_'+id).prop('checked', (item.check == '1')).iCheck('update');
        //                 if (id == 3) {
        //                     var value = (item.value).split('-');
        //                     _.each(value, function (chk, idx) {
        //                         $('#check_option_3'+idx).prop('checked', (chk == '1')).iCheck('update');
        //                     });
        //                 } else {
        //                     $('#input_option_'+id).val(item.value).prop('readonly', (item.check != '1'));
        //                 }
        //             });
        //         } else {
        //             getConfigs();
        //         }
        //     });
        // }
        // getConfigs();

        $scope.ver_reporte = function () {
            var bval = true;
            bval = bval && $("#fecha_inicio").required();
            bval = bval && $("#fecha_fin").required();
            // bval = bval && $("#idcobrador").required();
            if(bval) {

                // alert("reporte");
                $("#formulario-reporte").attr("action", base_url + "/lista_cobranza_cuotas/imprimir_lista_cobraza_cuotas");
                $("#formulario-reporte").attr("method", "GET");
                $("#formulario-reporte").attr("target", "imprimir_lista_cobraza_cuotas");
              
         
                window.open('', 'imprimir_lista_cobraza_cuotas');
                document.getElementById('formulario-reporte').submit();
            }
        }

        // $scope.saveConfig = function () {
        //     var keys = [], values = [], checks = [];
        //     var bval = true;
        //     _.each($('.config_option'), function (item, idx) {
        //         var id = $(item).prop('id');
        //         id = id.substr(7);

        //         if ($('#check_option_'+id).length > 0 && $('#check_option_'+id).prop('checked')) {
        //             bval = bval && $('#input_option_'+id).required();
        //         }
        //         keys[idx] = $(item).val();

        //         checks[idx] = ($('#check_option_'+id).prop('checked')) ? '1' : '0';

        //         if (id == 3) {
        //             var chk = [];
        //             _.each($('.chk_option3'), function (item, idx) {
        //                 chk[idx] = ($(item).prop('checked')) ? '1' : '0';
        //             });
        //             values[idx] = chk.join('-');
        //         } else {
        //             values[idx] = $('#input_option_'+id).val();
        //         }
        //     });
          
        //     console.log(checks);
        //     if (bval) {
        //         var params = {
        //             'keys': keys.join(','),
        //             'values': values.join(','),
        //             'checks': checks.join(',')
        //         };
               
        //         RESTService.updated('lista_cobranza_cuotas/saveConfig', 0, params, function (response) {
        //             if (!_.isUndefined(response.status) && response.status) {
        //                 AlertFactory.textType({
        //                     title: '',
        //                     message: 'La configuración se guardó correctamente.',
        //                     type: 'success'
        //                 });
        //             } else {
        //                 AlertFactory.textType({
        //                     title: '',
        //                     message: 'Hubo un error al guardar la configuración. Intente nuevamente.',
        //                     type: 'error'
        //                 });
        //             }
        //         });
        //     }
        // }

    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('lista_cobranza_cuotas', {
                url: '/lista_cobranza_cuotas',
                templateUrl: base_url + '/templates/lista_cobranza_cuotas/base.html',
                controller: 'ListaCobranzaCuotasCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();