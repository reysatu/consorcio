/**
 * Created by JAIR on 7/9/2016.
 */

var cargando = '<div class="text-center" style="color:#fff;padding:1em"><i class="fa fa-spinner fa-spin"></i></div>';

var icon_select = 'circle-o';

var mensajes_validador = function (data) {
    var div_mensaje = $(".mensajes_validador");

    if (data != '') {
        var mensaje = '<div class="alert alert-block alert-danger"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times"></i></button>';
        for (var property in data) {
            mensaje += '- ' + data[property] + '<br/>';
        }
        mensaje += '</div>';
        div_mensaje.html(mensaje);
    }
};

function tooltipMobile(item) {
    console.log(item);
    if (!show_list_) {
        console.log(!show_list_);
        $(item).on('click', '', function (e) {
            $(this).mouseleave();
            e.stopPropagation();
        });
    }
}

var limpiar_validaciones = function () {
    $(".mensajes_validador").html('');
};

function cleanRequired() {
    $(".modal-backdrop").remove();
    cleanBorderRequired();
}

function cleanBorderRequired() {
    $('.border-red').removeClass('border-red');
}

// var unloaded = false;
//  $(window).on('beforeunload', unload);
//  $(window).on('unload', unload);
// function unload() {
//     if (!unloaded) {
//         $('body').css('cursor', 'wait');
//         $.ajax({
//             type: 'get',
//             async: false,
//             url: base_url + '/logout',
//             success: function () {
//                 unloaded = true;
//                 $('body').css('cursor', 'default');
//             },
//             timeout: 5000
//         });
//     }
// }
//     function pedirVoto(){
//      if(!pedirVoto){
//        alert();
//      }else{
//          alert('u');
//      }
//     }


$(function () {

    //validar vacios
    $.fn.required = function () {
        if ($(this).val() === '' || $(this).val() === null) {
            $(this).addClass('border-red').focus();
            return false;
        } else {
            $(this).removeClass('border-red');
            return true;
        }
    };
    //validar email
    $.fn.email = function () {
        var filter = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
        if ($.trim($(this).val()) != '' && filter.test($(this).val())) {
            return true;
        } else {
            $(this).focus();
            return false;
        }
    };
    $.fn.modal.Constructor.DEFAULTS.backdrop = 'static';
});

function callCHK() {
    $('.i-chk').iCheck({
        checkboxClass: 'icheckbox_square-green'
        // labelHover: false
    }).on('ifChanged', function (event) {
        $(event.target).click();
    });
}

function generateListMatrix(table_id, matrix, callback) {
    table_id = $('#' + table_id);
    // table_id.empty();
    // var td_ = '<td width="10px"><label class="checkbox-inline i-checks"><input type="checkbox" class="chk_sp"></label></td>';
    // $.each(matrix, function (idx, item) {
    //     table_id.append('<tr>'+td_+'<td colspan="4">'+item.text+'</td></tr>');
    //     $.each(item.nodes, function (idx2, item2) {
    //         table_id.append('<tr><td></td>'+td_+'<td colspan="3">'+item2.text+'</td></tr>');
    //     });
    // });
    table_id.treeview({
        levels: 1,
        data: matrix,
        // showIcon: false,
        showCheckbox: true,
        highlightSelected: false
    }).css({
        'min-height': '350px',
        'max-height': '350px',
        'border': 'none'
    });
    if (typeof callback == "function") {
        callback();
    }
}

function generateListMatrix_(table_id, matrix) {
    table_id.treeview({
        levels: 1,
        data: matrix,
        highlightSelected: false
    });
}

//validar solo letras
var soloLetras = function (e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = [8, 9, 37, 39, 46];
    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }
    if (letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;
};

//validar solo numeros
function soloNumeros(evt) {
    evt = (evt) ? evt : event; //Validar la existencia del objeto event
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0)); //Extraer el codigo del caracter de uno de los diferentes grupos de codigos
    var respuesta = true; //Predefinir como valido
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        respuesta = false;
    }
    return respuesta;
}

//validar numero telefonico
function numeroTelefonico(evt) {
    evt = (evt) ? evt : event; //Validar la existencia del objeto event
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
    var respuesta = true; //Predefinir como valido
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode != 42 && charCode != 35 && charCode != 32 && charCode != 40 && charCode != 41 && charCode != 45)) {
        respuesta = false;
    }
    return respuesta;
}

function onlyNumeric(evt, control) {
    var pattern = /^\d{0,4}(\.\d{0,3})?$/i;
    if (pattern.test(control.value)) {
        console.log("Vadid number:" + control.value);
        return true;
    } else {
        console.log("Invadid number:" + control.value);
        return false;
    }
}

function validDecimals(evt, control, decimals) {
    var texto = control.value;
    var punto = texto.indexOf('.');

    if (evt.keyCode <= 13 || (evt.keyCode >= 48 && evt.keyCode <= 57)) {
        if ((punto != -1) && (texto.length - (punto + 1)) >= decimals) {
            return false;
        }
    }
    else if (evt.keyCode == 46 && texto.length >= 1) {
        if (punto != -1 && texto.indexOf('.', punto) != -1) {
            return false;
        }
    } else {
        return false;
    }
    return true;
}

function roundValue(value, decimals) {
    return (parseFloat(value)).toFixed(decimals)
}

function roundMath(val) {
    return Math.round(parseFloat(val) * 100) / 100;
}

function numberFormat(value, decimals, dec_point, thousands_sep) {
    if (value === '') {
        return '';
    }
    value = parseFloat(value);
    dec_point = typeof dec_point !== 'undefined' ? dec_point : '.';
    thousands_sep = typeof thousands_sep !== 'undefined' ? thousands_sep : ',';

    var parts = value.toFixed(decimals).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);

    return parts.join(dec_point);
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function roundDecimals(control, decimals) {
    control = $(control);
    if (control.val() !== '') {
        var val_ = parseFloat(control.val());
        control.val(val_.toFixed(decimals));
    }
}

jQuery(function ($) {
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '',
        nextText: '',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
            'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Mi&eacute;rcoles', 'Jueves', 'Viernes', 'S&aacute;bado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mi&eacute;', 'Juv', 'Vie', 'S&aacute;b'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S&aacute;'],
        weekHeader: 'Sm',
        dateFormat: 'yy-mm-dd',
        //firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: '',
        changeMonth: true,
        changeYear: true,
        //defaultDate: '1990-01-01'
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});

var ajaxGet = function (url, param, before, callback, error) {
    $.ajax({
        data: param,
        url: base_url + url,
        type: 'get',
        dataType: 'json',
        beforeSend: function () {
            if (typeof before === "function") {
                before();
            }
        },
        success: function (data) {
            if (typeof callback === "function") {
                callback(data);
            }
        },
        error: function () {
            if (typeof error === "function") {
                error();
            }
        }
    });
};

var ajaxPost = function (url, param, before, callback, error) {
    $.ajax({
        data: param,
        url: base_url + url,
        type: 'post',
        dataType: 'json',
        beforeSend: function () {
            if (typeof before === "function") {
                before();
            }
        },
        success: function (data) {
            if (typeof callback === "function") {
                callback(data);
            }
        },
        error: function () {
            if (typeof error === "function") {
                error();
            }
        }
    });
};

function changeTheme(theme) {
    ajaxPost('admin/changeTheme', 'theme=' + theme);
}
function changeHeaderStyling(style) {
    ajaxPost('admin/changeHeaderStyling', 'style=' + style);
}
function changeContentStyling(style) {
    ajaxPost('admin/changeContentStyling', 'style=' + style);
}
function changeSidebarGradient(style) {
    ajaxPost('admin/changeSidebarGradient', 'style=' + style);
}
function changeSidebarStyling(style) {
    ajaxPost('admin/changeSidebarStyling', 'style=' + style);
}

function activeTab(tab) {
    $('.nav-tabs a[data-target="#' + tab + '"]').tab('show');
}

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

function getFormSearch(form_id, input_id, btn_id) {
    return '<form class="form-inline" id="' + form_id + '" style="margin-bottom:-3px">' +
        '<div class="input-group input-group-sm">' +
        '<input type="text" id="' + input_id + '" name="search" class="form-control" autocomplete="off" placeholder="Buscar..." />' +
        '<span class="input-group-btn">' +
        '<button type="submit" id="' + btn_id + '" class="btn btn-danger-admin">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '</span>' +
        '</div>' +
        '</form>';
}
function getFormSearch_MovimientoCaja(form_id, input_id, btn_id) {
    return '<form class="form-horizontal" id="' + form_id + '" style="margin-bottom:-3px">' +
        '<div class="form-group">'+
            '<div class="col-md-4"><select id="filtro_tipoMovi"  style="margin-right:5px;width: 100%" name="filtro_tipoMovi" class="form-control input-sm "></select></div>'+
            '<div class="col-md-3"><select id="filtro_monedaMovi" style="margin-right:5px,width: 100%"  name="filtro_monedaMovi" class="form-control input-sm"></select></div>'+
            '<div class="input-group input-group-sm">' +
                '<input type="text" id="' + input_id + '" name="search" class="form-control" autocomplete="off" placeholder="Concepto" />' +
                '<span class="input-group-btn">' +
                    '<button  type="submit" id="' + btn_id + '" class="btn-danger-admin btn-sm">' +
                        '<i class="fa fa-search"></i>' +
                    '</button>' +
                '</span>' +
                '<span class="input-group-btn">' +
                    '<button  type="button"  id="btn_exportar_CM" class="btn-primary  btn-sm">' +
                    '<i class="fa fa-file-excel-o">Exportar a Excel</i>' +
                    '</button>' +
                '</span>' +
            '</div></div>' +
            '</div>'+
        '</form>';
}
function getFormSearch2(form_id, input_id, btn_id) {
    return '<form class="form-horizontal" id="' + form_id + '" style="margin-bottom:-3px">' +
        '<div class="form-group">'+
            '<div class="col-md-4"><select id="filtro_art"  style="margin-right:5px;width: 100%" name="filtro_art" class="form-control input-sm "></select></div>'+
            '<div class="col-md-2"><select id="filtro_cate" style="margin-right:5px"  name="filtro_cate" class="form-control input-sm"></select></div>'+
            '<div class="col-md-2"><select style="margin-right:5px" id="filtro_idAlm" name="filtro_idAlm" class="form-control input-sm"></select></div>'+
            '<div class="col-md-2"><select style="margin-right:5px" id="filtro_idLoc"  name="filtro_idLoc"  class="form-control input-sm"></select></div>'+
            '<div class="col-md-2"><div class="input-group input-group-sm">' +
            '<input value="a" type="hidden" id="' + input_id + '" name="search" class="form-control" autocomplete="off" placeholder="Buscar..." />' +
            '<span class="input-group-btn">' +
            '<button  type="submit" id="' + btn_id + '" class="btn-danger-admin btn-sm">' +
            '<i class="fa fa-search"></i>' +
            '</button>' +
            '</span>' +
            '<span class="input-group-btn">' +
            '<button  type="button"  id="btn_exportar_QS" class="btn-primary  btn-sm">' +
            '<i class="fa fa-file-excel-o">Exportar a Excel</i>' +
            '</button>' +
            '</span>' +
            '</div></div>' +
            '</div>'+
        '</form>';
}
function getFormSearch3(form_id, input_id, btn_id) {
    return '<form class="form-horizontal" id="' + form_id + '" style="margin-bottom:-3px">' +
        '<div class="form-group">'+
            '<div class="col-md-3"><input  type="date" class="form-control input-sm" id="fecha_inicio" placeholder="Fecha Inicio"></div>'+
            '<div class="col-md-3"><input type="date" class="form-control input-sm"  id="fecha_fin" placeholder="Fecha Fin"></div>'+
            '<div class="col-md-4"><select id="filtro_art"  style="margin-right:5px" name="filtro_art" class="form-control input-sm "></select></div>'+
            '<div class="col-md-2"><select id="filtro_oper"  style="margin-right:5px" name="filtro_art" class="form-control input-sm "></select></div>'+
          
           
        '</div>'+
        '<div class="form-group">'+
           '<div class="col-md-2"><select id="filtro_nat"  style="margin-right:5px" name="filtro_art" class="form-control input-sm "></select></div>'+
            '<div class="col-md-2"><select id="filtro_cate" style="margin-right:5px"  name="filtro_cate" class="form-control input-sm"></select></div>'+
            '<div class="col-md-2"><select style="margin-right:5px;width: 100%" id="filtro_idAlm" name="filtro_idAlm" class="form-control input-sm"></select></div>'+
            '<div class="col-md-2"><select style="margin-right:5px" id="filtro_idLoc"  name="filtro_idLoc"  class="form-control input-sm"></select></div>'+
            '<div class="col-md-2"><input type="text" class="form-control input-sm" id="n_movimiento" placeholder="N° Movimiento" width="100px"></div>'+
            '<div class="col-md-2"><input type="text" class="form-control input-sm" id="cod_lote" placeholder="Cod Lote" width="100px"></div>'+
        '</div>'+
        '<div class="form-group">'+
        '<div class="col-md-2" ><input type="text" class="form-control input-sm" id="cod_serie" placeholder="Cod Serie" width="100px"></div>'+
        '<div class="col-md-2">'+
        '<input value="a" type="hidden" id="' + input_id + '" name="search" class="form-control" autocomplete="off" placeholder="Buscar..." />' +
        '<span class="input-group-btn">' +
        '<button  type="submit" id="' + btn_id + '" class="btn-danger-admin btn-sm">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '<button  type="button"  id="btn_exportar_QM" class="btn-primary  btn-sm">' +
        '<i class="fa fa-file-excel-o">Exportar a Excel</i>' +
        '</button>' +
        '</span>' +
        // '<span class="input-group-btn">' +
       
        // '</span>' +
         '</div>' +
        '</div>' +
        '</form>';
}

function generateSearchForm(form_id, btn_id, callback, is_click) {
    var btn = $('#' + btn_id);

    btn.click(function (e) {
        callback();
        e.preventDefault();
    });

    if (is_click) {
        btn.click();
    }

    $('#' + form_id).submit(function (e) {
        btn.click();
        e.preventDefault();
    });
}

function generateDateRangePicker(calendar, start, end, callback) {
    calendar.daterangepicker({
        startDate: start,
        endDate: end,
        opens: 'left',
        showDropdowns: true,
        alwaysShowCalendars: true,
        showCustomRangeLabel: false,
        ranges: {
            'Hoy': [moment(), moment()],
            'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Últimos 7 días': [moment().subtract(6, 'days'), moment()],
            'Últimos 30 días': [moment().subtract(29, 'days'), moment()],
            'Este mes': [moment().startOf('month'), moment().endOf('month')],
            'Mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'Este año': [moment().startOf('year'), moment().endOf('year')],
            'Año pasado': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
        },
        locale: {
            cancelLabel: 'Cancelar',
            applyLabel: 'Aplicar',
            daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
                'Octubre', 'Noviembre', 'Diciembre']
        }
    }, callback);
}

function generateDatePicker(inp) {
    inp.datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        beforeShow: function () {
            setTimeout(function () {
                $('.ui-datepicker').css('z-index', 2052);
            });
        }
    })
}

function generateCheckBox(inp) {
    $(inp).iCheck({
        checkboxClass: 'icheckbox_square-green'
    }).on('ifClicked', function (event) {
        $(event.target).click();
    });
}

function generateRadio(inp) {
    $(inp).iCheck({
        radioClass: 'iradio_square-green'
    }).on('ifClicked', function (event) {
        $(event.target).click();
    });
}

function generateSelect2Ajax(inp, placeholder, url, allow_clear) {
    allow_clear = (typeof allow_clear === 'undefined') ? true : allow_clear;
    inp.select2({
        language: 'es',
        placeholder: placeholder,
        allowClear: allow_clear,
        ajax: {
            url: url,
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data, params) {
                return {
                    results: data.items
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) {
            return markup;
        },
        minimumInputLength: 1
    });
}

function activeURL() {
    setTimeout(function () {
        var url = window.location.href.split('/');
        if (typeof url[3] != 'undefined' && url[3] != 'home' && url[3] != '#') {
            $(".active_url").removeClass('active active_url');
            var mod_now = $(".mod" + url[3]);
            mod_now.addClass('active active_url');
            mod_now.parent().addClass('in menu_open');
            mod_now.parent().parent().addClass('active active_url');
        } else {
            $(".active_url").removeClass('active active_url');
            $(".menu_open").removeClass('in menu_open');
            $(".li_home").addClass('active active_url');
        }
        if (!show_list_) {
            if ($("body").hasClass("mini-navbar")) {
                $('.navbar-minimalize').click();
            }
            // $(".active_url").removeClass('active active_url');
            // $(".menu_open").removeClass('in menu_open');
        }
    }, 300);
}
activeURL();

function closeSession() {
    swal({
            title: '',
            text: '¿Está seguro que desea cerrar sesión?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            closeOnConfirm: true,
            showLoaderOnConfirm: false,
            closeOnCancel: true
        },
        function () {
            window.location = base_url + '/logout';
            $('#show_loading').removeClass('ng-hide');
        });
}

function PrintDiv() {
    var divToPrint = document.getElementById('printDiv');

    var myWindow = window.open();
    myWindow.document.write(divToPrint.innerHTML);

    divToPrint.innerHTML = '';

    myWindow.document.close();
    myWindow.focus();
    myWindow.print();
    myWindow.close();
}

function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

function createExcel(file, name) {
    $('#modalLabelExcel').html(name);
    // $('#frame_excel').attr('src', file);
    $('#modalExcel').modal('show');
}

function create_pdf(response) {
    var docDefinition = {
        // a string or { width: number, height: number }
        pageSize: response.pageSize,
        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: response.pageOrientation,
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        // pageMargins: [15, 15, 15, 15],
        content: [
            {
                columns: [
                    {
                        width: 'auto',
                        // normally you could put image directly here, but since you're
                        // setting width to auto, we need an artificial wrapping-node
                        // so that column-width does not interfere with image width
                        stack: [
                            {
                                image: response.img,
                                fit: [120, 120]
                            }
                        ]
                    },
                    {text: response.title, style: 'header'}
                ]
            },
            {text: 'Fecha: ' + moment().format('DD [de] MMMM [de] YYYY, h:mm A'), style: 'subheader'},
            {
                columns: [
                    {
                        width: 'auto',
                        table: {
                            headerRows: 1,
                            body: response.info
                        }
                    }
                ]
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [-120, 0, 0, 0],
                alignment: 'center'
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 5, 0, 5],
                alignment: 'center'
            },
            footer: {
                fontSize: 10,
                margin: [0, 10, 40, 0],
                alignment: 'right'
            }
        },
        footer: function (currentPage, pageCount) {
            return {
                columns: [{
                    text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
                    style: 'footer'
                }]
            }
            // return currentPage.toString() + ' de ' + pageCount;
        }
    };

    var win = window.open('', '_blank');
    if (response.type === 1) {
        pdfMake.createPdf(docDefinition).download();
    } else if (response.type === 2) {
        pdfMake.createPdf(docDefinition).open({}, win);
    } else {
        pdfMake.createPdf(docDefinition).print({}, win);
    }
}

function create_vouchers_pdf(response) {
    var data = [];
    var array_head = [];
    var array_dataBody = [];
    var valor_image = response.img;
    var array_dataHead = [];
    // data.push(['N°', 'PROVEEDOR', 'DOCUMENTO'])
    for (var i = 0; i < response.data_header.length; i++) {
        var data_header = response.data_header[i];
        var info = response.info[i];
        (i === 0) ? pag = {text: response.title, style: 'header'} : pag = {
            text: response.title,
            style: 'header',
            pageBreak: 'before'
        };
        //
        array_head.push([
            {text: 'N° : ' + data_header[0][4], style: 'dataHeader'},
            {text: 'Fecha: ' + moment().format('DD [de] MMMM [de] YYYY, h:mm A'), style: 'subheader'}
        ])

        array_dataHead.push([
            pag,
            {
                width: 'auto',
                // normally you could put image directly here, but since you're
                // setting width to auto, we need an artificial wrapping-node
                // so that column-width does not interfere with image width
                stack: [
                    {
                        image: response.img,
                        fit: [120, 120]
                    }
                ]
            },
            {text: 'Fecha: ' + moment().format('DD [de] MMMM [de] YYYY, h:mm A'), style: 'subheader'},
            {text: 'N° : ' + data_header[0][4], style: 'dataHeader'},
            {
                style: 'dataHeaderAll',
                table: {
                    headerRows: 1,
                    body: [
                        [{text: 'PROVEEDOR: ', style: 'dataHeader'},
                            {text: data_header[0][0]},
                            {text: 'ALMACÉN ORIGEN : ', style: 'dataHeader'},
                            {text: data_header[0][2]}
                        ],
                        [{text: 'DOCUMENTO: ', style: 'dataHeader'},
                            {text: data_header[0][1]},
                            {text: 'ALMACÉN DESTINO : ', style: 'dataHeader'},
                            {text: data_header[0][3]}
                        ]
                    ]
                },
                layout: 'noBorders'
            },
            {
                widths: 'auto',
                style: 'tableDetail',
                table: {
                    headerRows: 1,
                    widths: [50, 245, 40, 50, 40],
                    body: info
                }
            },
            {
                style: 'dataFooter',
                table: {
                    widths: ['*', '*', 20, '*', '*'],
                    body: [
                        [
                            {
                                colSpan: 2,
                                text: 'DATOS DE TRANSPORTISTA',
                                // fillColor: '#eeeeee',
                                bold: true,
                                border: [false, false, false, false]
                            },
                            '',
                            {
                                border: [false, false, false, false],
                                text: ''
                            },
                            {
                                colSpan: 2,
                                text: ' TRANSPORTE Y CONDUCTOR',
                                bold: true,
                                border: [false, false, false, false]
                            },
                            ''
                        ],
                        [
                            {
                                border: [true, true, true, true],
                                text: 'RUC:\n' + data_header[0][5]
                            },
                            {
                                border: [true, true, true, true],
                                text: 'RAZÓN SOCIAL:\n' + data_header[0][6]
                            },
                            {
                                border: [false, false, false, false],
                                text: ''
                            },
                            {
                                border: [true, true, true, true],
                                text: 'MARCA Y PLACA :\n' + data_header[0][7]
                            },
                            {
                                border: [true, true, true, true],
                                text: 'LICENCIA DE CONDUCIR:\n' + data_header[0][8]
                            }
                        ]
                    ]
                }
            }
        ])
    }
    var docDefinition = {
        content: [
            {
                columns: [
                    array_dataHead
                ]
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [-120, 0, 0, 0],
                alignment: 'center'
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 5, 0, 5],
                alignment: 'center'
            },
            dataHeader: {
                bold: true,
                fontSize: 8,
                color: 'black'
            },
            dataHeaderAll: {
                fontSize: 10,
                color: 'black',
                margin: [0, 0, 10, 0]
            },

            dataFooter: {
                // bold: true,
                fontSize: 9,
                color: 'black',
                // alignment: 'center',
                margin: [0, 10, 0, 0]
            },
            tableDetail: {
                fontSize: 9,
                // bold: true,
                margin: [0, 5, 0, 1],
                alignment: 'left'
            },
            footer: {
                fontSize: 10,
                margin: [0, 10, 40, 0],
                alignment: 'right'
            }
        },
        pageMargins: [72, 100, 72, 40]
    };


    var win = window.open('', '_blank');
    if (response.type === 1) {
        pdfMake.createPdf(docDefinition).download();
    } else if (response.type === 2) {
        pdfMake.createPdf(docDefinition).open({}, win);
    } else {
        pdfMake.createPdf(docDefinition).print({}, win);
    }

}
function create_pdf_ordenServicio(response) {
     var data=response.data;
    console.log(response.data);
    var dataCli=response.data_cliente;
    console.log(dataCli);
    console.log(response.data_matenimiento);
    console.log(response.data_detalle);
    console.log(response.con);
    console.log(response.nr);
    console.log(data.dFecRec2);
    console.log(data.dFecEntrega2);
    var data_dis=response.get_distrito;
    var get_vehiculo=response.get_vehiculo;
    var modelo=get_vehiculo[0].Modelo;
    console.log(data[0].idcCondicionPago);
    var horaEnt=data[0].horaEnt;
    var dni='';
    var ruc=''; 
    console.log("****");
    console.log(dataCli[0].documento);
    console.log("****");
    if(dataCli[0].tipodoc=='01'){
        dni=dataCli[0].documento;
    }else{
       ruc=dataCli[0].documento;
    }
    var razonsocial_cliente=dataCli[0].razonsocial_cliente;
    var documento=dataCli[0].documento;
    var direccion=dataCli[0].direccion;
    var distrito=data_dis[0].cDistrito;
    var telefono=dataCli[0].telefono;
    var correo_electronico=dataCli[0].correo_electronico;
    var celular=dataCli[0].celular;
    var cMotor=data[0].cMotor;
    var cChasis=data[0].cChasis;
    var iAnioFab=data[0].iAnioFab;
    var cColor=data[0].cColor;
    var cPlacaVeh=data[0].cPlacaVeh;
    var nKilometraje=data[0].nKilometraje;

    var mo_revision=Number(data[0].mo_revision);
    var mo_mecanica=Number(data[0].mo_mecanica);
    var terceros=Number(data[0].terceros);
    var otros_mo=Number(data[0].otros_mo);
    var sub_mo=mo_revision+mo_mecanica+terceros+otros_mo;
    sub_mo=sub_mo.toFixed(2);
    var respuestos=Number(data[0].respuestos);
    var accesorios=Number(data[0].accesorios);
    var lubricantes=Number(data[0].lubricantes);
    var otros_rep=Number(data[0].otros_rep);
    var cObservaciones=data[0].cObservaciones;
    var sub_re= respuestos+accesorios+lubricantes+otros_rep;
    sub_re=sub_re.toFixed(2);
    var total=Number(data[0].total);


    var mcondicionPago='';
    if(data[0].idcCondicionPago=='9'){
        mcondicionPago=394;
    }else if(data[0].idcCondicionPago=='10'){
          mcondicionPago=455;
    }else{
         mcondicionPago=500;
    };
    var tipoSer='';
    if(data[0].id_tipo=='1'){
        tipoSer=166;
    }else if(data[0].id_tipo=='2'){
        tipoSer=236;
    }else{
        tipoSer=200;
    }
    var mantenimiento_X="";
    var cambioAciete_X="";
    var reparacioMotor_x="";
    var descar_x="";
    var embrague_x="";
    var transmi_x="";
    var sisArras_x="";
    var fren_x="";
    var bate_x="";
    var revisitE_x="";
    var revisitIN_x="";
    var suspencio_x="";
    var aroneu_x="";
    var sistEsca_x="";
    var sistDirecc_x="";
    var otro_x="";

    var fechRecep= moment(data.dFecRec2).format('DD/MM/YYYY');
    var fechEntrega= moment(data.dFecEntrega2).format('DD/MM/YYYY');

    var data_matenimiento=response.data_matenimiento;
    _.each(data_matenimiento, function (b) {
        var vto=b.idMantenimiento;
        if(vto==1){
            mantenimiento_X='X';
        };
        if(vto==2){
            cambioAciete_X='X';
        };
        if(vto==3){
            reparacioMotor_x='X';
        };
        if(vto==4){
            descar_x='X';
        };
        if(vto==5){
            embrague_x='X';
        };
        if(vto==6){
            transmi_x='X';
        };
        if(vto==7){
            sisArras_x='X';
        };
        if(vto==8){
            fren_x='X';
        };
        if(vto==9){
            bate_x='X';
        };
        

        if(vto==10){
            revisitE_x='X';
        };
        if(vto==11){
            revisitIN_x='X';
        };
        if(vto==12){
            suspencio_x='X';
        };
        if(vto==13){
            aroneu_x='X';
        };
        if(vto==14){
            sistEsca_x='X';
        };
        if(vto==15){
            sistDirecc_x='X';
        };
        if(vto==16){
            otro_x='X';
        };
       
    });
    

    var docDefinition = {
           content: [
        {
            text: ""+response.con+'  '+response.nr+"",
            fontSize: 14,
             bold: true,
            absolutePosition: { x:479 , y: 64 }
        },
        {
            text: 'X',
            fontSize: 14,
            bold: true,
            absolutePosition: { x:mcondicionPago , y: 90 }
        },
        {
            text: fechRecep,
            bold: true,
            fontSize: 10,
            absolutePosition: { x:329 , y: 98 }
        },
        {
            text: fechEntrega,
            absolutePosition: { x:329 , y: 107 },
            bold: true,
            fontSize: 10,
        },
        {
            text:""+horaEnt+"",
            absolutePosition: { x:529 , y: 101 },
            bold: true,
            fontSize: 10,
        },
        {
            text: razonsocial_cliente,
            absolutePosition: { x:102 , y: 146 },
            bold: true,
            fontSize: 10,
        },
        {
            text: ruc,
            absolutePosition: { x:102 , y: 163 },
            bold: true,
            fontSize: 10,
        },
        {
            text: direccion,
            absolutePosition: { x:102 , y: 180 },
            bold: true,
            fontSize: 10,
        },
        {
            text: distrito,
            absolutePosition: { x:102 , y: 200 },
            bold: true,
            fontSize: 10,
        },
        {
            text: razonsocial_cliente,
            absolutePosition: { x:102 , y: 214 },
            bold: true,
            fontSize: 10,
        },
        {
            text: dni,
            absolutePosition: { x:76 , y: 233 },
            bold: true,
            fontSize: 10,
        },
        {
            text: telefono,
            absolutePosition: { x:76 , y: 253 },
            bold: true,
            fontSize: 10,
        },
        {
            text: correo_electronico,
            absolutePosition: { x:152 , y: 233 },
            bold: true,
            fontSize: 10,
        },
        {
            text: celular,
            absolutePosition: { x:152 , y: 253 },
            bold: true,
            fontSize: 10,
        },
        {
            text: 'X',
            absolutePosition: { x:285 , y: tipoSer },
            bold: true,
            fontSize: 14,
        },
        {
            text: modelo,
            absolutePosition: { x:420 , y: 146 },
            bold: true,
            fontSize: 10,
        },
         {
            text: cMotor,
            absolutePosition: { x:420 , y: 163 },
            bold: true,
            fontSize: 10,
        },
         {
            text: cChasis,
            absolutePosition: { x:420 , y: 180 },
            bold: true,
            fontSize: 10,
        },
         {
            text: iAnioFab,
            absolutePosition: { x:420 , y: 200 },
            bold: true,
            fontSize: 10,
        },
         {
            text: cColor,
            absolutePosition: { x:420 , y: 214 },
            bold: true,
            fontSize: 10,
        },
         {
            text: cPlacaVeh,
            absolutePosition: { x:420 , y: 233 },
            bold: true,
            fontSize: 10,
        },
         {
            text: nKilometraje,
            absolutePosition: { x:420 , y: 253 },
            bold: true,
            fontSize: 10,
        },

        {
            text: mantenimiento_X,
            absolutePosition: { x:52 , y: 295 },
            bold: true,
            fontSize: 14,
        },
         {
            text: cambioAciete_X,
            absolutePosition: { x:52 , y: 318 },
            bold: true,
            fontSize: 14,
        },
         {
            text: reparacioMotor_x,
            absolutePosition: { x:52 , y: 343 },
            bold: true,
            fontSize: 14,
        },
         {
            text: descar_x,
            absolutePosition: { x:52 , y: 366 },
            bold: true,
            fontSize: 14,
        },
         {
            text: embrague_x,
            absolutePosition: { x:52 , y: 391 },
            bold: true,
            fontSize: 14,
        },
         {
            text: transmi_x,
            absolutePosition: { x:52 , y: 416 },
            bold: true,
            fontSize: 14,
        },
         {
            text: sisArras_x,
            absolutePosition: { x:52 , y: 439 },
            bold: true,
            fontSize: 14,
        },
         {
            text: fren_x,
            absolutePosition: { x:52 , y: 464 },
            bold: true,
            fontSize: 14,
        },

         {
            text: bate_x,
            absolutePosition: { x:173 , y: 295 },
            bold: true,
            fontSize: 14,
        },
         {
            text: revisitE_x,
            absolutePosition: { x:173 , y: 318 },
            bold: true,
            fontSize: 14,
        },
         {
            text: revisitIN_x,
            absolutePosition: { x:173 , y: 343 },
            bold: true,
            fontSize: 14,
        },
         {
            text: suspencio_x,
            absolutePosition: { x:173 , y: 366 },
            bold: true,
            fontSize: 14,
        },
         {
            text: aroneu_x,
            absolutePosition: { x:173 , y: 391 },
            bold: true,
            fontSize: 14,
        },
         {
            text: sistEsca_x,
            absolutePosition: { x:173 , y: 416 },
            bold: true,
            fontSize: 14,
        },
         {
            text: sistDirecc_x,
            absolutePosition: { x:173 , y: 439 },
            bold: true,
            fontSize: 14,
        },
         {
            text: otro_x,
            absolutePosition: { x:173 , y: 464 },
            bold: true,
            fontSize: 14,
        },



        {
            text: mo_revision,
            absolutePosition: { x:441 , y: 284 },
            bold: true,
            fontSize: 10,
        },
         {
            text: mo_mecanica,
            absolutePosition: { x:441 , y: 298 },
            bold: true,
            fontSize: 10,
        },
        {
            text: terceros,
            absolutePosition: { x:441 , y: 315 },
            bold: true,
            fontSize: 10,
        },
         {
            text: otros_mo,
            absolutePosition: { x:441 , y: 335 },
            bold: true,
            fontSize: 10,
        },
        {
            text: sub_mo,
            absolutePosition: { x:441 , y: 354 },
            bold: true,
            fontSize: 10,
        },
         {
            text: respuestos,
            absolutePosition: { x:441 , y: 369 },
            bold: true,
            fontSize: 10,
        },
        {
            text: accesorios,
            absolutePosition: { x:441 , y: 385 },
            bold: true,
            fontSize: 10,
        },
         {
            text: lubricantes,
            absolutePosition: { x:441 , y: 402 },
            bold: true,
            fontSize: 10,
        },
        {
            text: otros_rep,
            absolutePosition: { x:441 , y: 419 },
            bold: true,
            fontSize: 10,
        },
         {
            text: sub_re,
            absolutePosition: { x:441 , y: 439 },
            bold: true,
            fontSize: 10,
        },
        {
            text: total,
            absolutePosition: { x:441 , y: 459 },
            bold: true,
            fontSize: 10,
        },
        {
            text: cObservaciones ,
            absolutePosition: { x:61 , y: 538 },
            bold: true,
            fontSize: 10,
        },
         {
            text: modelo ,
            absolutePosition: { x:341 , y: 594 },
            bold: true,
            fontSize: 10,
        },
        {
            text: cPlacaVeh,
            absolutePosition: { x:488 , y: 594 },
            bold: true,
            fontSize: 10,
        },


    ],
    styles: {
        header: {
            fontSize: 18,
            bold: true,
            alignment: 'right',
            margin: [0, 20, 0, 80]
        },
        subheader: {
            fontSize: 14
        },
        superMargin: {
            margin: [20, 0, 40, 0],
            fontSize: 15
        }
    }
                };


    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    pdfMake.createPdf(docDefinition).print({}, win);
    // }

}
function create_pdf_qualityControl(response) {
    var data=response.data;
    var detalle=response.detalle;
    var cliente=response.get_cliente;
    var vehiculo=response.get_vehiculo;
    var data_orden=response.data_orden;

    var razonsocial_cliente=cliente[0].razonsocial_cliente;
    var modelo=vehiculo[0].descripcion;
    var vin=data_orden[0].cChasis;
    var motor=data_orden[0].cMotor;

    var cOtros=data[0].cOtros;

    var procedimientoG="";
    var cargaBat="";
    var lavadoVehi="";
    var tanqueComb="";
    var llaveComb="";
    var aceisMot="";
    var refrige="";
    var palancaFre="";
    var frenoDelant="";
    var fluidoFreno="";
    var frenoTraser="";
    var embrage="";
    var acelerad="";
    var fluidosRevi="";
    var revisionLuce="";
    var estrangulador="";
    var valvulas="";
    var cadenaTransmisi="";
    var ralenti="";
    var neumatico="";
    var espejosRetro="";
    var tuerca="";
    var suspDelant="";
    var suspTrase="";
    var soportLat="";
    var rayosRued="";
    var lavadoVehiDes="";
    var otros="";

    _.each(detalle, function (b) {
        var vto=b.idrevision;
        if(vto=='1' && b.iRevisado=='1'){
            procedimientoG='X';
        };
        if(vto=='2' && b.iRevisado=='1'){
            cargaBat='X';
        };
        ////
        if(vto=='3' && b.iRevisado=='1'){
            lavadoVehi='X';
        };
        if(vto=='4'  && b.iRevisado=='1'){
            tanqueComb='X';
        };
        if(vto=='5' && b.iRevisado=='1'){
            llaveComb='X';
        };
        if(vto=='6' && b.iRevisado=='1'){
            aceisMot='X';
        };
        if(vto=='14'  && b.iRevisado=='1'){
            refrige='X';
        };
//
        if(vto=='7' && b.iRevisado=='1'){
            palancaFre='X';
        };
        if(vto=='8' && b.iRevisado=='1'){
            frenoDelant='X';
        };
        if(vto=='9' && b.iRevisado=='1'){
            fluidoFreno='X';
        };
        if(vto=='10' && b.iRevisado=='1'){
            frenoTraser='X';
        };
        if(vto=='15' && b.iRevisado=='1'){
            embrage='X';
        };
        if(vto=='16' && b.iRevisado=='1'){
            acelerad='X';
        };
         if(vto=='17' && b.iRevisado=='1'){
            fluidosRevi='X';
        };
         if(vto=='18' && b.iRevisado=='1'){
            revisionLuce='X';
        };

        //////

        if(vto=='11' && b.iRevisado=='1'){
            estrangulador='X';
        };
        if(vto=='12' && b.iRevisado=='1'){
            valvulas='X';
        };
        if(vto=='13' && b.iRevisado=='1'){
            cadenaTransmisi='X';
        };
        if(vto=='19' && b.iRevisado=='1'){
            ralenti='X';
        };
        if(vto=='20' && b.iRevisado=='1'){
            neumatico='X';
        };
        if(vto=='21' && b.iRevisado=='1'){
            espejosRetro='X';
        };
        if(vto=='22' && b.iRevisado=='1'){
            tuerca='X';
        };

        if(vto=='23' && b.iRevisado=='1'){
            suspDelant='X';
        };
        if(vto=='24' && b.iRevisado=='1'){
            suspTrase='X';
        };
        if(vto=='25' && b.iRevisado=='1'){
            soportLat='X';
        };
        if(vto=='26' && b.iRevisado=='1'){
            rayosRued='X';
        };
        if(vto=='27' && b.iRevisado=='1'){
            lavadoVehiDes='X';
        };
        if(vto=='28' && b.iRevisado=='1'){
            otros='X';
        };

        
        
       
    });
    var otrosTex='';
   if(cOtros!=''){
        otrosTex='X';
   };
    var docDefinition = {
           content: [
           {
            text: modelo,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:81 , y: 115 }
        },
        {
            text: vin,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:81 , y: 126 }
        },
        {
            text: razonsocial_cliente,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:292 , y: 115 }
        },
        {
            text: motor,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:292 , y: 126 }
        },

        //

        {
            text: procedimientoG,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:405 , y: 139 }
        },
        {
            text: cargaBat,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:405 , y: 155 }
        },
        //
         {
            text: lavadoVehi,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 189 }
        },
        {
            text: tanqueComb,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 205 }
        },
         {
            text: llaveComb,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 221 }
        },
        {
            text: aceisMot,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 236 }
        },
         {
            text: refrige,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 252 }
        },


        ////
        {
            text: palancaFre,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 289 }
        },
         {
            text: frenoDelant,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 305 }
        },
        {
            text: fluidoFreno,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 321 }
        },
         {
            text: frenoTraser,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 336 }
        },
        {
            text: embrage,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 352 }
        },
         {
            text: acelerad,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 368 }
        },
        {
            text: fluidosRevi,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 384 }
        },
         {
            text: revisionLuce,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 400 }
        },

        /////

        {
            text: suspDelant,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 431 }
        },
        {
            text: suspTrase,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 447 }
        },
         {
            text: soportLat,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 463 }
        },
        {
            text: rayosRued,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 478 }
        },
        {
            text: lavadoVehiDes,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 494 }
        },
         {
            text: otros,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 510 }
        },
        ///////

        {
            text: estrangulador,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:223 , y: 431 }
        },
        {
            text: valvulas,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:223 , y: 447 }
        },
         {
            text: cadenaTransmisi,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:223 , y: 463 }
        },
        {
            text: ralenti,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:223 , y: 478 }
        },
        {
            text: neumatico,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:223 , y: 494 }
        },
         {
            text: espejosRetro,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:223 , y: 510 }
        },
         {
            text: tuerca,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:223 , y: 526 }
        },
         {
            text: cOtros,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:249 , y: 523 }
        },
         {
            text: otrosTex,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:423 , y: 526 }
        },
    ],
    styles: {
        header: {
            fontSize: 18,
            bold: true,
            alignment: 'right',
            margin: [0, 20, 0, 80]
        },
        subheader: {
            fontSize: 14
        },
        superMargin: {
            margin: [20, 0, 40, 0],
            fontSize: 15
        }
    }
                };


    var win = window.open('', '_blank');
   
    pdfMake.createPdf(docDefinition).print({}, win);
    // }

}

function create_pdf_movimientoCaja(response) {
    var data=response.dataCaDet;
    var fec=response.feca;
    var fecAct=response.fechacA;
    var dataCajaDetForSol=response.dataCajaDetForSol;
    var dataCajaDetEfeSol=response.dataCajaDetEfeSol;
    var dataCajaDetForDol=response.dataCajaDetForDol;
    var dataCajaDetEfeDol=response.dataCajaDetEfeDol;

    var dataSolesEfec=[];
    var dataSolesMovimientos=[];
    var totalSolesEfec=0; 
    var totalSolesForm=0;
    var tituloSolesEfec=[
                    { 
                        text: 'COMPROBANTES',
                        fillColor: '#eeeeee',
                        fontSize: 8 ,
                        alignment: 'center' 

                    },
                       { 
                            text: 'TOTAL',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,
                             alignment: 'center' 

                        },
                    ];
    var tituloSolesForm=[
                        { 
                            text:'MOVIMIENTO DE EFECTIVO',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,

                        },
                        { 
                            text: 'TOTAL',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,
                            alignment: 'center' 

                        },
                    ];               
      dataSolesEfec.push(tituloSolesEfec);
      dataSolesMovimientos.push(tituloSolesForm) ;

    _.each(dataCajaDetEfeSol, function (b) {
        var monto=Number(b.monto).toFixed(2);
        totalSolesEfec=Number(monto)+Number(totalSolesEfec);
        var dataEfecSol=[
                    { 
                        text: b.descripcion_tipo,
                        fontSize: 8 ,

                    },
                       { 
                            text:monto,
                            fontSize: 8 ,
                             alignment: 'right' 

                        },
                    ];
         dataSolesMovimientos.push(dataEfecSol)   ;        
    });

   
    var TotalSolesEfec=[
                        { 
                            text:'TOTAL EFECTIVO',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,

                        },
                        { 
                            text: totalSolesEfec.toFixed(2),
                            fillColor: '#eeeeee',
                            fontSize: 8 ,
                            alignment: 'right' 

                        },
                    ];
    dataSolesMovimientos.push(TotalSolesEfec)   ;
    ////////////////
    var titulo2SolesForm=[
                        { 
                            text:'VENTAS FORMA DE PAGO',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,

                        },
                        { 
                            text: '',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,
                            alignment: 'center' 

                        },
                    ];
    dataSolesMovimientos.push(titulo2SolesForm);                 
    //////////
    _.each(dataCajaDetForSol, function (b) {
        var monto=Number(b.monto).toFixed(2);
        totalSolesForm=Number(monto)+Number(totalSolesForm);
        var dataFormSol=[
                    { 
                        text: b.descripcion_subtipo,
                        fontSize: 8 ,
                        

                    },
                       { 
                            text:monto,
                            fontSize: 8 ,
                             alignment: 'right' 

                        },
                    ];
         dataSolesMovimientos.push(dataFormSol)   ;        
    });
     // totalSolesForm=Number(totalSolesForm).toFixed(2);
    var TotalSolesForm=[
                        { 
                            text:'TOTAL VENTA',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,

                        },
                        { 
                            text: totalSolesForm.toFixed(2),
                            fillColor: '#eeeeee',
                            fontSize: 8 ,
                            alignment: 'right' 

                        },
                    ];
    dataSolesMovimientos.push(TotalSolesForm);

    /////////////////////////////////////////////
    var dataDolEfec=[];
    var dataDolMovimientos=[];
    var totalDolEfec=0; 
    var totalDolForm=0;
    var tituloDolEfec=[
                    { 
                        text: 'COMPROBANTES',
                        fillColor: '#eeeeee',
                        fontSize: 8 ,
                        alignment: 'center' 

                    },
                       { 
                            text: 'TOTAL',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,
                             alignment: 'center' 

                        },
                    ];
    var tituloDolForm=[
                        { 
                            text:'MOVIMIENTO DE EFECTIVO',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,

                        },
                        { 
                            text: 'TOTAL',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,
                            alignment: 'center' 

                        },
                    ];               
      dataDolEfec.push(tituloDolEfec);
      dataDolMovimientos.push(tituloDolForm) ;

    _.each(dataCajaDetEfeDol, function (b) {
        var monto=Number(b.monto).toFixed(2);
        totalDolEfec=Number(monto)+Number(totalDolEfec);
        var dataEfecSol=[
                    { 
                        text: b.descripcion_tipo,
                        fontSize: 8 ,

                    },
                       { 
                            text:monto,
                            fontSize: 8 ,
                             alignment: 'right' 

                        },
                    ];
         dataDolMovimientos.push(dataEfecSol)   ;        
    });

   
    var TotalDolEfec=[
                        { 
                            text:'TOTAL EFECTIVO',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,

                        },
                        { 
                            text: totalDolEfec.toFixed(2),
                            fillColor: '#eeeeee',
                            fontSize: 8 ,
                            alignment: 'right' 

                        },
                    ];
    dataDolMovimientos.push(TotalDolEfec)   ;
    ////////////////
    var titulo2DolForm=[
                        { 
                            text:'VENTAS FORMA DE PAGO',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,

                        },
                        { 
                            text: '',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,
                            alignment: 'center' 

                        },
                    ];
    dataDolMovimientos.push(titulo2DolForm);                 
    //////////
    _.each(dataCajaDetForDol, function (b) {
        var monto=Number(b.monto).toFixed(2);
        totalDolForm=Number(monto)+Number(totalDolForm);
        var dataFormSol=[
                    { 
                        text: b.descripcion_subtipo,
                        fontSize: 8 ,
                        

                    },
                       { 
                            text:monto,
                            fontSize: 8 ,
                             alignment: 'right' 

                        },
                    ];
         dataDolMovimientos.push(dataFormSol)   ;        
    });
     // totalDolForm=Number(totalDolForm).toFixed(2);
    var TotalDolForm=[
                        { 
                            text:'TOTAL VENTA',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,

                        },
                        { 
                            text: totalDolForm.toFixed(2),
                            fillColor: '#eeeeee',
                            fontSize: 8 ,
                            alignment: 'right' 

                        },
                    ];
    dataDolMovimientos.push(TotalDolForm);

    var docDefinition = {
        pageOrientation: 'landscape',
           content: [
        {
            text: "Caja: "+fec,
            fontSize: 15,
            bold: true,
            absolutePosition: { x:40 , y: 20 }
        },
         {
            text: "Fecha de Impresión: "+fecAct,
            fontSize: 15,
            bold: true,
            absolutePosition: { x:460 , y: 20 }
        },  
        { text: 'SOLES', style: 'header',fontSize: 13},
        {
            absolutePosition: { x:40 , y: 60 },
            style: 'tableExample',
            table: {
                widths: [250, 90],
                body: 
                    dataSolesEfec,
                   
            }

        },
        {  
            absolutePosition: { x:460 , y: 60 },
            style: 'tableExample',
            table: {
                widths: [250,90],
                body: dataSolesMovimientos,
            }

        },
        {
            text: '',
            absolutePosition: { x: 300, y: 100 },
            pageBreak: 'after'
        },
        { text: 'DOLARES', style: 'header',fontSize: 13},
        {
            absolutePosition: { x:40 , y: 60 },
            style: 'tableExample',
            table: {
                widths: [250, 90],
                body: [
                    [
                        { 
                            text: 'COMPROBANTES',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,
                            alignment: 'center' 

                        },
                       { 
                            text: 'TOTAL',
                            fillColor: '#eeeeee',
                            fontSize: 8 ,
                             alignment: 'center' 

                        },
                    ],
                   
                ]
            }

        },
        {  
            absolutePosition: { x:460 , y: 60 },
            style: 'tableExample',
            table: {
                widths: [250,90],
                body: dataDolMovimientos,
            }

        },
    ],
    styles: {

        header: {
            fontSize: 18,
            bold: true,
            alignment: 'left',
        },
        subheader: {
            fontSize: 14
        },
        superMargin: {
            margin: [20, 0, 40, 0],
            fontSize: 15
        }
    }
                };
   
    var win = window.open('', '_blank');
    // var win = window.open('', '_blank');
   
    pdfMake.createPdf(docDefinition).print({}, win);
    // }

}
function create_pdf_proforma(response) {
    var data=response.data;
    var repus=response.data_repuesto;
    var servi=response.data_servicio;
    var data_cli=response.data_cliente;
    var array_head=[];
    var nConsecutivo=data[0].nConsecutivo;
    var cPlacaVeh=data[0].cPlacaVeh;
    var razonsocial_cliente=data[0].razonsocial_cliente;
    var nEstimadoHoras=Number(data[0].nEstimadoHoras);
    var celular=data_cli[0].celular;
    var dFechaRegistro= moment(data[0].dFechaRegistro).format('DD/MM/YYYY');
    console.log(data);
    console.log(repus);
    console.log(servi);
    console.log(data_cli);

    var mantenimiento_X="";
    var cambioAciete_X="";
    var reparacioMotor_x="";
    var descar_x="";
    var embrague_x="";
    var transmi_x="";
    var sisArras_x="";
    var fren_x="";
    var bate_x="";
    var revisitE_x="";
    var revisitIN_x="";
    var suspencio_x="";
    var aroneu_x="";
    var sistEsca_x="";
    var sistDirecc_x="";
    var otro_x="";
    array_head.push([
        {
            text: nConsecutivo,
            fontSize: 14,
            bold: true,
            absolutePosition: { x:479 , y: 64 }
        },
         {
            text: cPlacaVeh,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:118 , y: 144 }
        },
         {
            text: razonsocial_cliente,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:118 , y: 163 }
        },
         {
            text: celular,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:118 , y: 181 }
        },
         {
            text: dFechaRegistro,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:452 , y: 181 }
        },
        ]);
    var cont=0;
    var alt=239;
    var totalRep=0;
    _.each(repus, function (b) {
        var desc=b.description;
        var cant=b.nCant;
        var pre=b.nPrecioUnitario;
        var tot=Number(b.nTotal)+Number(b.nImpuesto);
        totalRep=totalRep+tot;
        alt=alt+13
        cont=cont+1;
        if(cont<16){
        array_head.push([
        {
            text: desc,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:66 , y: alt }
        },
         {
            text: cant,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:336 , y: alt }
        },
         {
            text: pre,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:417 , y: alt }
        },
         {
            text: tot,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:498 , y: alt }
        }
        ]);
        }
    });
    totalRep=totalRep.toFixed(2);
    array_head.push([
        {
            text: totalRep,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:501 , y: 452 }
        }
    ]);
    var cont=0;
    var totalRepMo=0;
    var altu=492;
     _.each(servi, function (b) {
        var desc=b.description;
        var tota=b.nTotal;
        var tot=Number(b.nTotal)+Number(b.nImpuesto);
        totalRepMo=totalRepMo+tot;
         altu=altu+13;
          cont=cont+1;
          if(cont<6){
          array_head.push([
                {
                    text: desc,
                    fontSize: 10,
                    bold: true,
                    absolutePosition: { x:66 , y: altu }
                },
                 {
                    text: tot,
                    fontSize: 10,
                    bold: true,
                    absolutePosition: { x:498 , y: altu }
                }
            ])
        };
     });
     totalRepMo=totalRepMo.toFixed(2);
     array_head.push([
        {
            text: totalRepMo,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:498 , y: 573 }
        }
    ]);
    var totalcom=Number(totalRep)+Number(totalRepMo);
    totalcom=totalcom.toFixed(2);
    array_head.push([
        {
            text: totalcom,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:498 , y: 594 }
        },
        {
            text: nEstimadoHoras,
            fontSize: 10,
            bold: true,
            absolutePosition: { x:498 , y: 607 }
        }
    ]);
    var docDefinition = {
           content: [
           array_head
    ],
    styles: {
        header: {
            fontSize: 18,
            bold: true,
            alignment: 'right',
            margin: [0, 20, 0, 80]
        },
        subheader: {
            fontSize: 14
        },
        superMargin: {
            margin: [20, 0, 40, 0],
            fontSize: 15
        }
    }
                };


    var win = window.open('', '_blank');
   
    pdfMake.createPdf(docDefinition).print({}, win);
    // }

}
function create_pdf_transfer(response) {
    var data_p = response.data;
    var mov_ar=response.movimiento_Ar;
    var mov_det=response.data_movimiento_serie;
    console.log(mov_ar);
    var data = [];
    var array_head = [];
    var array_dataBody = [];
    var array_dataHead = [];
    var ident='I';
    var column1  = [];
    var column2  = [];
    var column3  = [];
    var column4  = [];
    var column5  = [];
    var column6= [];
    var header=[];
   column1.push({image: response.img,rowSpan: 3, colSpan: 8, alignment: 'center',width:120,height:50}, {}, {}, {},{}, {}, {},{}, {text:'Movimiento de Transferencia',alignment: 'center', bold: true,colSpan: 39,height:80},{}, {},{}, {}, {},{}, {}, {},{}, {}, {},{}, {},{}, {},{}, {}, {},{}, {}, {},{}, {}, {},{}, {},{}, {},{},{}, {},{}, {},{},{}, {},{},{}); 
   column2.push({}, {}, {}, {},{}, {}, {},{}, {text:' \n N° Transferencia:',bold: true,alignment: 'center',fontSize: 10,border: [false, false, false, true],rowSpan: 2, colSpan: 7,height:200},{}, {},{}, {}, {},{}, {text:' \n'+data_p.idTransferencia,border: [false, false, true, true],fontSize: 10,rowSpan: 2, colSpan: 3,height:200}, {},{}, {text:'\n Fecha Transacción: ',bold: true,fontSize: 10,border: [false, false, false, true],alignment: 'center', rowSpan: 2,colSpan: 10,height:80}, {},{}, {},{}, {},{}, {}, {},{},{text:'\n'+data_p.fecha_proceso,fontSize: 10,border: [false, false, true, true], rowSpan: 2,colSpan: 5,height:80}, {}, {},{},{}, {text:'\n Fecha Impresión:',bold: true,fontSize: 10,border: [false, false, false, true],alignment: 'center', colSpan: 9,rowSpan: 2,height:80}, {},{}, {},{},{}, {},{}, {},{text:'\n'+data_p.fecha_impresion,fontSize: 10,border: [false, false, true, true], colSpan: 5,rowSpan: 2,height:80},{}, {},{},{}); 
   column3.push({}, {}, {}, {},{}, {}, {},{}, ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1',' 1'); 
   column4.push({text:' ', border: [true, false, true, true], fontSize: 6,alignment: 'center', colSpan: 47,height:100}, ' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1',' 1'); 
   column5.push({text:'Item',bold: true, colSpan: 2, fontSize: 10,height:100}, {}, {text:'Artículo',alignment: 'center',bold: true, colSpan: 16, fontSize: 10,height:100},{}, {}, {},{},{}, {},{}, {},{}, {}, {}, {},{}, {}, {}, {text:'Alm. Origen',bold: true, colSpan: 5, fontSize: 10,height:100}, {},{}, {}, {},{text:'Loc. Origen',bold: true, colSpan: 5, fontSize: 10,height:100}, {}, {},{}, {}, {text:'Alm. Destino',bold: true, colSpan: 5, fontSize: 10,height:100},{}, {},{}, {},{text:'Loc. Destino',bold: true, colSpan: 5, fontSize: 10,height:100},{}, {},{}, {},{text:'Lote',bold: true, colSpan: 4, fontSize: 10,height:100},{},{},{}, {text:'Unidad',bold: true,colSpan: 2, fontSize: 10,height:100},{},{text:'Cantidad', bold: true,colSpan: 3,fontSize: 10,height:100},{},{}); 
    header.push(column1);
    header.push(column2);
    header.push(column3);
    header.push(column4);
    header.push(column5);
    var cont=0;
    mov_ar.map(function(index) {
        var cantidad=Math.trunc(index.cantidad);
        var colunmx=[]
         cont=cont+1;   
         colunmx.push({text:cont, colSpan: 2, fontSize: 10,height:100}, {}, {text:index.producto, colSpan: 16, fontSize: 10,height:100},{}, {}, {},{},{}, {},{}, {},{}, {}, {}, {},{}, {}, {}, {text:index.almacenOrigen, colSpan: 5, fontSize: 10,height:100}, {},{}, {}, {},{text:index.localizacionOrigen, colSpan: 5, fontSize: 10,height:100}, {}, {},{}, {}, {text:index.almacenDestino, colSpan: 5, fontSize: 10,height:100},{}, {},{}, {},{text:index.localizacionDestino, colSpan: 5, fontSize: 10,height:100},{}, {},{}, {},{text:index.lote, colSpan: 4, fontSize: 10,height:100},{},{},{}, {text:index.unidad,colSpan: 2, fontSize: 10,height:100},{},{text:cantidad, colSpan: 3,fontSize: 10,height:100},{},{});
         header.push(colunmx);
         var idenDet='I';
         mov_det.map(function(index2) {
            console.log("entro");
            console.log(index.consecutivo);
            if(index.consecutivo==index2.identificador){
                var columnz=[];
                if(idenDet=='I'){
                    var columny=[];
                    columny.push({text:'', colSpan: 2, fontSize: 10,height:100},{}, {text:'Serie', colSpan: 6, fontSize: 10,height:100,bold: true},{}, {}, {},{},{}, {text:'Motor', colSpan: 5, fontSize: 10,height:100,bold: true},{}, {},{}, {}, {text:'Color',bold: true, colSpan: 5, fontSize: 10,height:100}, {},{}, {}, {}, {text:'Año de Fabricación', bold: true,colSpan: 5, fontSize: 10,height:100}, {},{}, {}, {},{text:'Año Modelo',bold: true, colSpan: 5, fontSize: 10,height:100}, {}, {},{}, {}, {text:'', colSpan: 18, fontSize: 10,height:100,border: [false, false, false, false]},{}, {},{}, {},{},{}, {},{}, {},{},{},{},{}, {},{},{},{},{text:'', fontSize: 10,height:100,border: [false, false, true, true]}); 
                    header.push(columny);
                    idenDet='A';
                };
                columnz.push({text:'', colSpan: 2, fontSize: 10,height:100},{}, {text:index2.nombreSerie, colSpan: 6, fontSize: 10,height:100},{}, {}, {},{},{}, {text:index2.motor, colSpan: 5, fontSize: 10,height:100},{}, {},{}, {}, {text:index2.color, colSpan: 5, fontSize: 10,height:100}, {},{}, {}, {}, {text:index2.anio_fabricacion, colSpan: 5, fontSize: 10,height:100}, {},{}, {}, {},{text:index2.anio_modelo, colSpan: 5, fontSize: 10,height:100}, {}, {},{}, {}, {text:'', colSpan: 18, fontSize: 10,height:100,border: [false, true, false, true]},{}, {},{}, {},{},{}, {},{}, {},{},{},{},{}, {},{},{},{},{text:'', fontSize: 10,height:100,border: [false, false, true, true]}); 
                header.push(columnz);

            }

        });


    });
    for (var i = 0; i < 8; i++) {
        var colum_espacio_blanco=[];
        colum_espacio_blanco.push({text:' ', border: [false, false, false, false], fontSize: 6,alignment: 'center', colSpan: 47,height:100}, ' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1',' 1'); 
        header.push(colum_espacio_blanco);
    }
    var columnfooter=[];
     columnfooter.push({text:'',  border: [false, false, false, false], colSpan: 2, fontSize: 10,height:100},{}, {text:'ALMACÉN', border: [false, true, false, false], alignment: 'center',colSpan: 6, fontSize: 10,height:100,bold: true},{}, {}, {},{},{}, {text:'', alignment: 'center',colSpan: 30,border: [false, false, false, false], fontSize: 10,height:100,bold: true},{}, {},{}, {}, {}, {},{}, {}, {}, {}, {},{}, {}, {},{}, {}, {},{}, {}, {},{}, {},{}, {},{},{}, {},{}, {},{text:'RECIBÍ CONFORME', border: [false, true, false, false], colSpan: 6, fontSize: 10,height:100},{},{},{}, {},{},{text:'', border: [false, false, false, false], colSpan: 3,fontSize: 10,height:100,bold: true},{},{}); 
     header.push(columnfooter);
     // var lote='';
     //    var unidad='UND';
     //    if(index.lote!=''){
     //        lote=index.lote;
     //        unidad='';
     //    }

    // mov_ar.map(function(index) {
    //     array_dataHead.push([
    //             {
    //                table: {
    //                      body: [
    //                         [ {image: response.img,rowSpan: 3, colSpan: 8, alignment: 'center',width:120,height:50}, {}, {}, {},{}, {}, {},{}, {text:'Movimiento de Transferencia',alignment: 'center', bold: true,colSpan: 39,height:80},{}, {},{}, {}, {},{}, {}, {},{}, {}, {},{}, {},{}, {},{}, {}, {},{}, {}, {},{}, {}, {},{}, {},{}, {},{},{}, {},{}, {},{},{}, {},{},{}],
    //                         [ {}, {}, {}, {},{}, {}, {},{}, {text:' \n N° Transferencia:',bold: true,alignment: 'center',fontSize: 10,border: [false, false, false, true],rowSpan: 2, colSpan: 7,height:200},{}, {},{}, {}, {},{}, {text:' \n'+data_p.idTransferencia,border: [false, false, true, true],fontSize: 10,rowSpan: 2, colSpan: 3,height:200}, {},{}, {text:'\n Fecha Transacción: ',bold: true,fontSize: 10,border: [false, false, false, true],alignment: 'center', rowSpan: 2,colSpan: 10,height:80}, {},{}, {},{}, {},{}, {}, {},{},{text:'\n'+data_p.fecha_registro,fontSize: 10,border: [false, false, true, true], rowSpan: 2,colSpan: 5,height:80}, {}, {},{},{}, {text:'\n Fecha Impresión:',bold: true,fontSize: 10,border: [false, false, false, true],alignment: 'center', colSpan: 9,rowSpan: 2,height:80}, {},{}, {},{},{}, {},{}, {},{text:'\n'+data_p.fecha_impresion,fontSize: 10,border: [false, false, true, true], colSpan: 5,rowSpan: 2,height:80},{}, {},{},{}],
    //                         [ {}, {}, {}, {},{}, {}, {},{}, ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1',' 1'],
    //                         [ {text:' ', border: [true, false, true, true], fontSize: 6,alignment: 'center', colSpan: 47,height:100}, ' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1',' 1'],
    //                         [{text:'Item',bold: true, colSpan: 2, fontSize: 10,height:100}, {}, {text:'Artículo',alignment: 'center',bold: true, colSpan: 16, fontSize: 10,height:100},{}, {}, {},{},{}, {},{}, {},{}, {}, {}, {},{}, {}, {}, {text:'Alm. Origen',bold: true, colSpan: 5, fontSize: 10,height:100}, {},{}, {}, {},{text:'Loc. Origen',bold: true, colSpan: 5, fontSize: 10,height:100}, {}, {},{}, {}, {text:'Alm. Destino',bold: true, colSpan: 5, fontSize: 10,height:100},{}, {},{}, {},{text:'Loc. Destino',bold: true, colSpan: 5, fontSize: 10,height:100},{}, {},{}, {},{text:'Lote',bold: true, colSpan: 4, fontSize: 10,height:100},{},{},{}, {text:'Unidad',bold: true,colSpan: 2, fontSize: 10,height:100},{},{text:'Cantidad', bold: true,colSpan: 3,fontSize: 10,height:100},{},{}],
    //                      ]
    //                }  
    //             }

    //         ]);
    // });

   var docDefinition = {
            pageOrientation: 'landscape',
            content: [ {
                        table: {
                           body: header
                        }
                    }
            
                    ]
                };


    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    pdfMake.createPdf(docDefinition).print({}, win);
    // }

}

function create_pdf_movimiento(response) {
    var data_p = response.data;
    var operacion=response.operacion;
    var mov_ar=response.movimiento_Ar;
    var mov_det=response.data_movimiento_serie;
    console.log(data_p);
    var data = [];
    var array_head = [];
    var array_dataBody = [];
    var array_dataHead = [];
    var ident='I';
    var column1  = [];
    var column2  = [];
    var column3  = [];
    var column4  = [];
    var column5  = [];
    var column6= [];
    var header=[];
    column1.push({image: response.img,rowSpan: 3, colSpan: 8, alignment: 'center',width:120,height:50}, {}, {}, {},{}, {}, {},{}, {text:'MOVIMIENTO DE '+operacion[0].descripcion,alignment: 'center', bold: true,colSpan: 39,height:80},{}, {},{}, {}, {},{}, {}, {},{}, {}, {},{}, {},{}, {},{}, {}, {},{}, {}, {},{}, {}, {},{}, {},{}, {},{},{}, {},{}, {},{},{}, {},{},{}); 
    column2.push({}, {}, {}, {},{}, {}, {},{}, {text:' \n N° Movimiento:',bold: true,alignment: 'center',fontSize: 10,border: [false, false, false, true],rowSpan: 2, colSpan: 7,height:200},{}, {},{}, {}, {},{}, {text:' \n'+data_p.idMovimiento,border: [false, false, true, true],fontSize: 10,rowSpan: 2, colSpan: 3,height:200}, {},{}, {text:'\n Fecha Transacción: ',bold: true,fontSize: 10,border: [false, false, false, true],alignment: 'center', rowSpan: 2,colSpan: 10,height:80}, {},{}, {},{}, {},{}, {}, {},{},{text:'\n'+data_p.fecha_proceso,fontSize: 10,border: [false, false, true, true], rowSpan: 2,colSpan: 5,height:80}, {}, {},{},{}, {text:'\n Fecha Impresión:',bold: true,fontSize: 10,border: [false, false, false, true],alignment: 'center', colSpan: 9,rowSpan: 2,height:80}, {},{}, {},{},{}, {},{}, {},{text:'\n'+data_p.fecha_impresion,fontSize: 10,border: [false, false, true, true], colSpan: 5,rowSpan: 2,height:80},{}, {},{},{}); 
    column3.push({}, {}, {}, {},{}, {}, {},{}, ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1',' 1'); 
    column4.push({text:' ', border: [true, false, true, true], fontSize: 6,alignment: 'center', colSpan: 47,height:100}, ' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1',' 1'); 
    column5.push({text:'Item',bold: true, colSpan: 2, fontSize: 10,height:100}, {}, {text:'Artículo',alignment: 'center',bold: true, colSpan: 16, fontSize: 10,height:100},{}, {}, {},{},{}, {},{}, {},{}, {}, {}, {},{}, {}, {}, {text:'Almacén',bold: true, colSpan: 7, fontSize: 10,height:100}, {},{}, {}, {},{}, {}, {text:'Localización',bold: true, colSpan: 8, fontSize: 10,height:100},{}, {}, {},{}, {},{}, {},{text:'Lote',bold: true, colSpan: 9, fontSize: 10,height:100},{}, {},{}, {},{},{},{},{}, {text:'Unidad',bold: true,colSpan: 2, fontSize: 10,height:100},{},{text:'Cantidad', bold: true,colSpan: 3,fontSize: 10,height:100},{},{}); 
    header.push(column1);
    header.push(column2);
    header.push(column3);
    header.push(column4);
    header.push(column5);
    var cont=0;
    mov_ar.map(function(index) {
        var cantidad=Math.trunc(index.cantidad);
        var colunmx=[]
         cont=cont+1;   
         colunmx.push({text:cont, colSpan: 2, fontSize: 10,height:100}, {}, {text:index.producto, colSpan: 16, fontSize: 10,height:100},{}, {}, {},{},{}, {},{}, {},{}, {}, {}, {},{}, {}, {}, {text:index.almacen, colSpan: 7, fontSize: 10,height:100}, {},{}, {}, {},{}, {}, {text:index.localizacion, colSpan: 8, fontSize: 10,height:100},{}, {}, {},{}, {},{}, {},{text:index.lote, colSpan: 9, fontSize: 10,height:100},{}, {},{}, {},{},{},{},{}, {text:index.unidad,colSpan: 2, fontSize: 10,height:100},{},{text:cantidad, colSpan: 3,fontSize: 10,height:100},{},{});
         header.push(colunmx);
         var idenDet='I';
         mov_det.map(function(index2) {
            console.log("entro");
            console.log(index.consecutivo);
            if(index.consecutivo==index2.identificador){
                var columnz=[];
                if(idenDet=='I'){
                    var columny=[];
                    columny.push({text:'', colSpan: 2, fontSize: 10,height:100},{}, {text:'Serie', colSpan: 6, fontSize: 10,height:100,bold: true},{}, {}, {},{},{}, {text:'Motor', colSpan: 5, fontSize: 10,height:100,bold: true},{}, {},{}, {}, {text:'Color',bold: true, colSpan: 5, fontSize: 10,height:100}, {},{}, {}, {}, {text:'Año de Fabricación', bold: true,colSpan: 7, fontSize: 10,height:100}, {},{}, {}, {},{}, {}, {text:'Año Modelo',bold: true, colSpan: 8, fontSize: 10,height:100},{}, {}, {},{}, {},{}, {},{text:'', colSpan: 13, fontSize: 10,height:100,border: [false, false, false, false]},{}, {},{}, {},{},{},{},{}, {},{},{},{},{text:'', fontSize: 10,height:100,border: [false, false, true, true]}); 
                    header.push(columny);
                    idenDet='A';
                };
                columnz.push({text:'', colSpan: 2, fontSize: 10,height:100},{}, {text:index2.nombreSerie, colSpan: 6, fontSize: 10,height:100},{}, {}, {},{},{}, {text:index2.motor, colSpan: 5, fontSize: 10,height:100},{}, {},{}, {}, {text:index2.color, colSpan: 5, fontSize: 10,height:100}, {},{}, {}, {}, {text:index2.anio_fabricacion, colSpan: 7, fontSize: 10,height:100}, {},{}, {}, {},{}, {}, {text:index2.anio_modelo, colSpan: 8, fontSize: 10,height:100},{}, {}, {},{}, {},{}, {},{text:'', colSpan: 13, fontSize: 10,height:100,border: [false, true, false, true]},{}, {},{}, {},{},{},{},{}, {},{},{},{},{text:'', fontSize: 10,height:100,border: [false, false, true, true]}); 
                header.push(columnz);

            }

        });


    });
    for (var i = 0; i < 8; i++) {
        var colum_espacio_blanco=[];
        colum_espacio_blanco.push({text:' ', border: [false, false, false, false], fontSize: 6,alignment: 'center', colSpan: 47,height:100}, ' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1',' 1'); 
        header.push(colum_espacio_blanco);
    }
    var columnfooter=[];
     columnfooter.push({text:'',  border: [false, false, false, false], colSpan: 2, fontSize: 10,height:100},{}, {text:'ALMACÉN', border: [false, true, false, false], alignment: 'center',colSpan: 6, fontSize: 10,height:100,bold: true},{}, {}, {},{},{}, {text:'', alignment: 'center',colSpan: 30,border: [false, false, false, false], fontSize: 10,height:100,bold: true},{}, {},{}, {}, {}, {},{}, {}, {}, {}, {},{}, {}, {},{}, {}, {},{}, {}, {},{}, {},{}, {},{},{}, {},{}, {},{text:'RECIBÍ CONFORME', border: [false, true, false, false], colSpan: 6, fontSize: 10,height:100},{},{},{}, {},{},{text:'', border: [false, false, false, false], colSpan: 3,fontSize: 10,height:100,bold: true},{},{}); 
     header.push(columnfooter);
     

   var docDefinition = {
            pageOrientation: 'landscape',
            content: [ {
                        table: {
                           body: header
                        }
                    }
            
                    ]
                };


    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    pdfMake.createPdf(docDefinition).print({}, win);
    // }

}
function create_receptionTransfer_pdf(response) {
    var data = [];
    var array_head = [];
    var array_dataBody = [];
    var valor_image = response.img;
    var array_dataHead = [];
    // data.push(['N°', 'PROVEEDOR', 'DOCUMENTO'])
    var data_header = response.data_header[0];
    var info = response.info[0];
    pag = {text: response.title, style: 'header'};
    array_dataHead.push([
        pag,
        {
            width: 'auto',
            // normally you could put image directly here, but since you're
            // setting width to auto, we need an artificial wrapping-node
            // so that column-width does not interfere with image width
            stack: [
                {
                    image: response.img,
                    fit: [120, 120]
                }
            ]
        },
        {text: 'Fecha: ' + moment().format('DD [de] MMMM [de] YYYY, h:mm A'), style: 'subheader'},
        {text: 'USUARIO° : ' + data_header[0][1], style: 'dataHeader'},
        {
            style: 'dataHeaderAll',
            table: {
                headerRows: 1,
                body: [
                    [{text: 'ALMACÉN ORIGEN: ', style: 'dataHeader'},
                        {text: data_header[0][2]},
                        {text: 'ALMACÉN DESTINO : ', style: 'dataHeader'},
                        {text: data_header[0][3]}
                    ]
                ]
            },
            layout: 'noBorders'
        },
        {
            widths: 'auto',
            style: 'tableDetail',
            table: {
                headerRows: 1,
                widths: [50, 245, 40, 50, 40],
                body: info
            }
        }
    ])

    var docDefinition = {
        content: [
            {
                columns: [
                    array_dataHead
                ]
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [-120, 0, 0, 0],
                alignment: 'center'
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 5, 0, 5],
                alignment: 'center'
            },
            dataHeader: {
                bold: true,
                fontSize: 8,
                color: 'black'
            },
            dataHeaderAll: {
                fontSize: 10,
                color: 'black',
                margin: [0, 0, 10, 0]
            },

            dataFooter: {
                // bold: true,
                fontSize: 9,
                color: 'black',
                // alignment: 'center',
                margin: [0, 10, 0, 0]
            },
            tableDetail: {
                fontSize: 9,
                // bold: true,
                margin: [0, 5, 0, 1],
                alignment: 'left'
            },
            footer: {
                fontSize: 10,
                margin: [0, 10, 40, 0],
                alignment: 'right'
            }
        },
        pageMargins: [72, 100, 72, 40]
    };


    var win = window.open('', '_blank');
    if (response.type === 1) {
        pdfMake.createPdf(docDefinition).download();
    } else if (response.type === 2) {
        pdfMake.createPdf(docDefinition).open({}, win);
    } else {
        pdfMake.createPdf(docDefinition).print({}, win);
    }

}

