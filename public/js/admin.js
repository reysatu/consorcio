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
            '<div class="col-md-3"><input onfocus=(this.type="date") onblur=(this.type="text") type="text" class="form-control input-sm" id="fecha_inicio" placeholder="Fecha Inicio"></div>'+
            '<div class="col-md-3"><input type="text" class="form-control input-sm" onfocus=(this.type="date") onblur=(this.type="text") id="fecha_fin" placeholder="Fecha Fin"></div>'+
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

