select * from ERP_FormasPago
select * from ERP_CondicionPago
select * from erp_venta
select * from ERP_Moneda
select * from ERP_Modelo
select * from ERP_Clientes
select * from ERP_Serie
select * from ERP_Cobrador
select * from ERP_Solicitud
select * from ERP_Venta
select * from erp_caja
select * from ERP_CajaDiaria
select * from ERP_SolicitudCredito
select * from ERP_SolicitudArticulo
select * from ERP_SolicitudDetalle
select * from ERP_Vendedores
select * from ERP_Categoria
select * from ERP_Productos
select * from ERP_Marcas
select * from ERP_Modelo
select * from ERP_Clientes
select * from ERP_Ubigeo
select * from ERP_Moneda

//////// 14/03/2022 info_reporte_cuentasxcliente///////////////////////////////////////////////////
select max(v.fecha_emision) as fecha_ultimo_pago,C.cCodConsecutivo,C.nConsecutivo,cl.razonsocial_cliente,ub.cDepartamento,ub.cProvincia,ub.cDistrito from ERP_SolicitudCronograma C
inner join ERP_Venta V on v.cCodConsecutivo_solicitud = c.cCodConsecutivo and v.nConsecutivo_solicitud = c.nConsecutivo
inner join ERP_Clientes as cl on cl.id=v.idCliente
left join ERP_Ubigeo as ub on ub.cCodUbigeo=cl.ubigeo
inner join ERP_VentaDetalle VD on VD.idventa = v.idventa and c.nrocuota = vd.nrocuota GROUP BY C.cCodConsecutivo,C.nConsecutivo,cl.razonsocial_cliente,ub.cDepartamento,ub.cProvincia,ub.cDistrito

select mo.Descripcion as moneda ,concat(ve.serie_comprobante,'-',RIGHT('00000' + CAST(FLOOR(ve.numero_comprobante) AS VARCHAR), 5),'-',RIGHT('00000' + CAST(FLOOR(sc.nrocuota) AS VARCHAR), 5) ) as documento_ven, * from ERP_SolicitudCronograma as sc INNER JOIN ERP_Venta as ve on (sc.cCodConsecutivo=ve.cCodConsecutivo_solicitud and sc.nConsecutivo=ve.nConsecutivo_solicitud)
inner join ERP_Moneda as mo on (mo.IdMoneda=ve.IdMoneda)
inner join ERP_Venta as tiket on(tiket.idventa_comprobante=ve.idventa) where sc.saldo_cuota>0 order BY ve.idmoneda


//////////////////// 14/03/2022 info_reporte_guia///////////////////////////////////////////////////

select * from ERP_GuiaRemision
select gp.cantidad,pr.description as producto,mo.descripcion as modelo,mar.description as marca,ser.color as color,ser.chasis as chasis,ser.nombreSerie as serie from ERP_GuiaRemisionProducto as gp inner JOIN ERP_GuiaRemisionDetalle as gd on (gp.cCodConsecutivo=gp.cCodConsecutivo and gp.nConsecutivo=gd.nConsecutivo and gp.consecutivo=gd.consecutivo)
inner join ERP_Productos as pr on (pr.id=gp.idarticulo)
LEFT JOIN ERP_Marcas AS mar ON (mar.id=pr.idMarca)LEFT JOIN ERP_Serie AS ser ON (ser.idSerie=gd.idSerie)
LEFT JOIN ERP_Modelo AS mo ON (pr.idModelo=mo.idModelo)

//////////////////// 14/03/2022 info_reporte_tarjeta////////////////////////////////////////////////////       
select mo.descripcion as modelo,ser.color as color,ser.cPlacaVeh as placa,ser.motor as motor,ser.chasis as chasis,cob.descripcion as cobrador ,ved.descripcion as vendedor,ven.fecha_emision as fecha_venta,sc.monto_venta as precio_lista, sc.cuota_inicial as cuota_inicial ,cl.cNumerodocumento as documento_cl,CONCAT(cl.cApePat,' ',cl.cApemat) as apellidos_cl, cl.cNombres as nombres_cl,cl.cCelular as celular_cl,
f.cNumerodocumento as documento_f,CONCAT(f.cApePat,' ',f.cApemat) as apellidos_f, f.cNombres as nombres_f,f.cCelular as celular_f,
cy.cNumerodocumento as documento_cy,CONCAT(cy.cApePat,' ',cy.cApemat) as apellidos_cy, cy.cNombres as nombres_cy,cy.cCelular as celular_cy,
fc.cNumerodocumento as documento_fc,CONCAT(fc.cApePat,' ',fc.cApemat) as apellidos_fc, fc.cNombres as nombres_fc,fc.cCelular as celular_fc
from ERP_Solicitud as s inner join ERP_SolicitudCredito as sc on (s.cCodConsecutivo=sc.cCodConsecutivo and s.nConsecutivo=sc.nConsecutivo)
INNER JOIN ERP_Venta as ven on(ven.cCodConsecutivo_solicitud=s.cCodConsecutivo and ven.nConsecutivo_solicitud=s.nConsecutivo)
INNER JOIN ERP_SolicitudArticulo as sa on(sa.cCodConsecutivo=s.cCodConsecutivo and sa.nConsecutivo=s.nConsecutivo)
INNER JOIN ERP_SolicitudDetalle as sd on(sd.cCodConsecutivo=sa.cCodConsecutivo and sd.nConsecutivo=sa.nConsecutivo and sa.id=sd.id_solicitud_articulo)
inner join ERP_Productos as pr on (pr.id=sa.idarticulo)
LEFT JOIN ERP_Clientes AS clp ON(clp.id=s.idcliente)
LEFT JOIN ERP_Persona AS cl ON(cl.idPersona=clp.idPersona)
LEFT JOIN ERP_Persona AS f ON(f.idPersona=sc.idfiador)
LEFT JOIN ERP_Persona AS cy ON (cy.idPersona=sc.idconyugue)
LEFT JOIN ERP_Persona AS fc ON(fc.idPersona=sc.idfiadorconyugue)
LEFT JOIN ERP_Vendedores AS ved ON (ved.idvendedor=s.idvendedor)
LEFT JOIN ERP_Cobrador AS cob ON (cob.id=s.idCobrador)
LEFT JOIN ERP_Serie AS ser ON (ser.idSerie=sd.idSerie)
LEFT JOIN ERP_Modelo AS mo ON (pr.idModelo=mo.idModelo)

select * from ERP_SolicitudCredito

///////////////////////////////////////// info_view reporte_venta_cliente////////////////////////////////////////////////


select pr.idCategoria as idcategoria,ven.idtienda, cl.id as idcliente ,ved.idvendedor,ved.descripcion as vendedor,ven.fecha_emision as fecha,concat(ven.serie_comprobante,'-', ven.numero_comprobante) as documento_venta ,ven.serie_comprobante, ven.numero_comprobante,cl.id as idcliente,cl.documento as nro_documento_cliente,cl.razonsocial_cliente as razonsocial_cliente, cl.direccion,cl.celular,mo.descripcion as modelo,ser.nombreSerie,ser.color,
sc.cuota_inicial as inicial,sa.precio_unitario,fp.description as forma_pago,mon.descripcion as moneda
from ERP_Venta as ven
INNER JOIN ERP_Solicitud as s on(ven.cCodConsecutivo_solicitud=s.cCodConsecutivo and ven.nConsecutivo_solicitud=s.nConsecutivo)
INNER JOIN ERP_SolicitudArticulo as sa on(sa.cCodConsecutivo=s.cCodConsecutivo and sa.nConsecutivo=s.nConsecutivo)
inner join ERP_Productos as pr on (pr.id=sa.idarticulo)
inner join ERP_Moneda as mon on (mon.IdMoneda=ven.idmoneda)
inner join ERP_Venta as tiket on (ven.idventa=tiket.idventa_comprobante)
left JOIN ERP_SolicitudCredito as sc on(sc.cCodConsecutivo=s.cCodConsecutivo and sc.nConsecutivo=s.nConsecutivo)
left JOIN ERP_SolicitudDetalle as sd on(sd.cCodConsecutivo=sa.cCodConsecutivo and sd.nConsecutivo=sa.nConsecutivo and sa.id=sd.id_solicitud_articulo)
LEFT JOIN ERP_Serie AS ser ON (ser.idSerie=sd.idSerie)
LEFT JOIN ERP_Modelo AS mo ON (pr.idModelo=mo.idModelo)
LEFT JOIN ERP_Clientes AS cl ON (cl.id=s.idcliente)
LEFT JOIN ERP_Vendedores AS ved ON (ved.idvendedor=s.idvendedor)
left join ERP_CondicionPago as fp on (fp.id=ven.condicion_pago)

///
CREATE TABLE ERP_TipoTraslado (
		id int not null,
    descripcion varchar(255)  null,
		estado varchar(1)  null,
		user_created varchar(10) null,
		created_at datetime null,
		user_updated varchar(10) null,
		updated_at datetime null,
	  PRIMARY KEY (id)
);




