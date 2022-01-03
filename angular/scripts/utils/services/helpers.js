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
            saludo: saludo            
        };

        return helpers;
        
        function saludo() {
            alert("hola desde Helpers");
        }

    }
})();