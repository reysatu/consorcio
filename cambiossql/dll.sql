CREATE TABLE ERP_SolicitudArticulo(
	id int not null,
    cCodConsecutivo varchar(10) not null,
    nConsecutivo int not null,
    idarticulo int not null,
    unidad varchar(20),
    cantidad money,
    idalmacen int,
    idlocalizacion int,
    idlote int,
    costo decimal(18,5),
    costo_total decimal(18,5),
    precio_unitario decimal(18,5),
    iddescuento int,
    porcentaje_descuento money,
    precio_total decimal(18,5),
    monto_descuento decimal(18,5),
    subtotal decimal(18,5),
    monto_exonerado decimal(18,5),
    monto_afecto decimal(18,5),
    monto_inafecto decimal(18,5),
    impuestos decimal(18,5),
    monto_total decimal(18,5),
    constraint pk_solicitud_articulo PRIMARY key(id, cCodConsecutivo, nConsecutivo),
    constraint fk_productos_solicitud_articulo foreign key(idarticulo) references ERP_Productos(id)
);


CREATE TABLE ERP_SolicitudDetalle(
    id int not null,
    cCodConsecutivo varchar(10) not null,
    nConsecutivo int not null,
    idarticulo int not null,
    idSerie int not null, 
    constraint pk_solicitud_detalle PRIMARY key(id, cCodConsecutivo, nConsecutivo),
    constraint fk_productos_solicitud_detalle foreign key(idarticulo) references ERP_Productos(id),
    constraint fk_serie_solicitud_detalle foreign key(idSerie) references ERP_Serie(idSerie)
);



--- LLAVES FORÁNEAS
/*

alter table ERP_Solicitud add constraint fk_convenios_solicitud foreign key(idconvenio) 
references ERP_Convenios(idconvenio);

alter table ERP_Solicitud add constraint fk_clientes_solicitud foreign key(idcliente) 
references ERP_Clientes(id);

alter table ERP_Solicitud add constraint fk_descuentos_solicitud foreign key(iddescuento) 
references ERP_Descuentos(id);

*/