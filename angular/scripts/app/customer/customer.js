/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.customers')
        .config(Config)
        .controller('CustomerCtrl', CustomerCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CustomerCtrl.$inject = ['$scope'  ,'_', 'RESTService', 'AlertFactory'];

    function CustomerCtrl($scope, _, RESTService, AlertFactory)
    {
        var modaClientes = $('#modaClientes');
        var titleModalClientes = $('#titleModalClientes');
        var departamento = $('#departamento');
        var provincia = $('#provincia');
        var distrito = $('#distrito');
        var id_tipocli=$("#id_tipocli");
        var tipodoc=$("#tipodoc");
        var razonsocial_cliente=$("#razonsocial_cliente");
        var documento=$("#documento");
        var contacto=$("#contacto");
        var direccion=$("#direccion");
        var correo_electronico=$("#correo_electronico");
        var celular=$("#celular");
        var telefono=$("#telefono");
        var cliente_id=$("#cliente_id");
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Customer', 'search_b', 'LoadRecordsButtonCustomer');

        var table_container_Customer = $("#table_container_Customer");

        function newCliente()
        {
            titleModalClientes.html('Nuevo Cliente');
            modaClientes.modal('show');
            var bandera='xxxxx';
            getDepartamento(bandera);
        }
         function findCliente(id)
        {
            titleModalClientes.html('Editar Cliente');
            RESTService.get('customers/find', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                    tipodoc.val(data_p[0].tipodoc).trigger('change');
                    razonsocial_cliente.val(data_p[0].razonsocial_cliente);
                    documento.val(data_p[0].documento);
                    contacto.val(data_p[0].contacto);
                    direccion.val(data_p[0].direccion);
                    correo_electronico.val(data_p[0].correo_electronico);
                    celular.val(data_p[0].celular);
                    telefono.val(data_p[0].telefono);
                    cliente_id.val(data_p[0].id);
                    id_tipocli.val(data_p[0].id_tipocli).trigger('change');
                     getDepartamento(data_p[0].cDepartamento);
                     getProvincia(data_p[0].cProvincia,data_p[0].cDepartamento);
                     getDistrito(data_p[0].cCodUbigeo,data_p[0].cProvincia);

                     modaClientes.modal('show');
                     console.log(data_p);
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Cliente. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
      
        function getDepartamento(bandera){
            var id="0";
            RESTService.get('shops/TraerDepartamentos', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     departamento.html('');
                      departamento.append('<option value="" >Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.cDepartamento==bandera){
                             departamento.append('<option value="'+item.cDepartamento+'" selected >'+item.cDepartamento+'</option>');
                        }else{
                             departamento.append('<option value="'+item.cDepartamento+'" >'+item.cDepartamento+'</option>');
                        };
            
                    });

                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
        }
          function getProvincia(bandera,id){
                RESTService.get('shops/TraerProvincias', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     console.log(data_p);
                      provincia.html('');
                      provincia.append('<option value="" >Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.cProvincia==bandera){
                             provincia.append('<option value="'+item.cProvincia+'" selected>'+item.cProvincia+'</option>');
                         }else{
                             provincia.append('<option value="'+item.cProvincia+'">'+item.cProvincia+'</option>');
                         }
                       
                    });

                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
       }
        function getDistrito(bandera,id){
        RESTService.get('shops/TraerDistritos', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     console.log(data_p);
                       distrito.html('');
                      distrito.append('<option value="" >Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.cCodUbigeo==bandera){
                             distrito.append('<option value="'+item.cCodUbigeo+'" selected>'+item.cDistrito+'</option>');
                         }else{
                             distrito.append('<option value="'+item.cCodUbigeo+'">'+item.cDistrito+'</option>');
                         }
                       
                    });

                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
       }
        departamento.change(function () {
            var bandera='xxxxxx';
            var id=departamento.val();
            getProvincia(bandera,id);
        });
        
        provincia.change(function () {
                var bandera='xxxxxx';
                var id=provincia.val();
                getDistrito(bandera,id);
           
        });
         modaClientes.on('hidden.bs.modal', function (e) {
              cleanCliente();
        });
        function cleanCliente () {
            cleanRequired();
            titleModalClientes.html('');
            tipodoc.val('01').trigger("change");
            id_tipocli.val('').trigger("change");
            razonsocial_cliente.val('');
            documento.val('');
            contacto.val('');
            direccion.val('');
            correo_electronico.val('');
            celular.val('');
            telefono.val('');
            cliente_id.val('');
            departamento.val('');
            provincia.val('');
            distrito.val('');
            provincia.html('');
            distrito.html('');
        };
        $scope.saveCliente = function()
        {
            var bval = true;
            bval = bval && tipodoc.required();
            bval = bval && id_tipocli.required();
            bval = bval && razonsocial_cliente.required();
            bval = bval && documento.required();
            bval = bval && celular.required();
            bval = bval && distrito.required();
            if(tipodoc.val()=='01' && documento.val().length!=8){
                AlertFactory.textType({
                            title: '',
                            message: 'Longitud de LE/DNI INCORRECTA',
                            type: 'info'
                });
             bval = false;
            };
            if(tipodoc.val()=='06' && documento.val().length!=11){
                AlertFactory.textType({
                            title: '',
                            message: 'Longitud de RUC INCORRECTA',
                            type: 'info'
                });
             bval = false;
            };
            if(bval){
                 var params = {
                    'tipodoc': tipodoc.val(),
                    'razonsocial_cliente': razonsocial_cliente.val(),
                    'documento': documento.val(),
                    'contacto': contacto.val(),
                    'direccion': direccion.val(),
                    'correo_electronico': correo_electronico.val(),
                    'celular': celular.val(),
                    'telefono': telefono.val(),
                    'distrito': distrito.val(),
                    'id_tipocli':id_tipocli.val(),

                 };
                var cli_id = (cliente_id.val() === '') ? 0 : cliente_id.val();
                  RESTService.updated('customers/createCliente', cli_id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        modaClientes.modal('hide');
                        LoadRecordsButtonCustomer.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar el Cliente. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });
            }

        };
        function getDataFormCustomer () {
            RESTService.all('customers/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var tip=response.tipoc_doc;
                    var tipo_clie=response.tipo_clie;
                      tip.map(function(index) {
                         tipodoc.append('<option value="'+index.Codigo+'">'+index.TipoDocumento+'</option>');
                      });
                        id_tipocli.append('<option value="">Seleccionar</option>');
                        tipo_clie.map(function(index) {
                        id_tipocli.append('<option value="'+index.id+'">'+index.descripcion+'</option>');
                      });
                  
                    //  _.each(response.operaciones, function(item) {
                    //    
                    // });
                  
                }
            }, function() {
                getDataFormCustomer();
            });
        }
        getDataFormCustomer();

        table_container_Customer.jtable({
            title: "Lista de Clientes",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/customers/list',
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
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Cliente',
                    click: function () {
                        newCliente();
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
                      options: base_url + '/customers/getTipoDocumento' ,
                },
                 id_tipocli: {
                    title: 'Tipo Cliente',
                      options: base_url + '/customers/getTipoCliente' ,
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
                   title: 'Dirección',
                   
                },
                correo_electronico: {
                   title: 'Correo',
                   
                },
                celular: {
                   title: 'Celular',
                   
                },
                ubigeo: {
                    title: 'Distrito',
                     options: base_url + '/shops/getDistrito' 

                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-Cliente" data-id="'+data.record.id
                            +'" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }

            },
            recordsLoaded: function(event, data) {
                $('.edit-Cliente').click(function(e){
                    var id = $(this).attr('data-id');
                    findCliente(id);
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