/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    angular.module('sys.utils.services')

        .factory('Helpers', Helpers);

    Helpers.$inject = ['_'];

    function Helpers(_) {
       
        var helpers = {
            saludo: saludo,
            formato_fecha: formato_fecha,
            set_datos_formulario: set_datos_formulario
        };
        return helpers;

        function saludo() {
            alert("hola");
        }
        
        function formato_fecha(fecha, formato) {

            if (fecha != null) {
               
                var date = fecha.toString().split(/[\/.-]/);
                if (formato == "user") {
                    // var array = fecha.toString().split(/[\/.-]/);
                    // console.log(array)
                    //var date = fecha.toString().split("-");
                    if (date.length == 3 && date[0].toString().length == 4 && date[1].toString().length == 2 && date[2].toString().length == 2) {
                        return date[2] + "/" + date[1] + "/" + date[0];
                    }
                }
                if (formato == "server") {
                    //var date = fecha.toString().split("/");
                    if (date.length == 3 && date[0].toString().length == 2 && date[1].toString().length == 2 && date[2].toString().length == 4) {
                        return date[2] + "-" + date[1] + "-" + date[0];
                    }
                }
            }
            return fecha;
        }

        function set_datos_formulario(id_form, datos) {
            // console.log(datos);
            var elementos = document.getElementById(id_form).getElementsByClassName("form-control");
            // console.log(elementos);

            for (var i = 0; i < elementos.length; i++) {

                if (datos[elementos[i].name] != null && elementos[i].type != "file" ) {
            
                    if(elementos[i].type == "radio") {
                        if(elementos[i].value == datos[elementos[i].name]) {
                            
                            elementos[i].checked = true;
                            $("input[name='"+elementos[i].name+"']").attr("checked", "checked");
                            elementos[i].parentNode.classList.add("checked");
                        } else {
                            elementos[i].checked = false;
                            $("input[name='"+elementos[i].name+"']").removeAttr("checked");
                            elementos[i].parentNode.classList.remove("checked");
                        }
                    } else {
                        if(elementos[i].type == "checkbox" ) {
                            // console.log(datos[elementos[i].name]);
                            if(datos[elementos[i].name] == 1 || datos[elementos[i].name] == 'S') {
                                elementos[i].checked = true;
                                $("input[name='"+elementos[i].name+"']").attr("checked", "checked");
                                elementos[i].parentNode.classList.add("checked");
                            } else {
                                elementos[i].checked = false;
                                $("input[name='"+elementos[i].name+"']").removeAttr("checked");
                                elementos[i].parentNode.classList.remove("checked");
                                
                            }
                        }
                        // console.log(elementos[i].name+" = "+datos[elementos[i].name]);

                        // elementos[i].value = formato_fecha(datos[elementos[i].name], "user");
                        elementos[i].value = datos[elementos[i].name];
                        // console.log(elementos[i].value );
                    }
                       
                    
                }
            }
        }


    }
})();