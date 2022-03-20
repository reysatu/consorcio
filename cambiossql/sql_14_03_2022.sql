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

select * from ERP_Solicitud where nConsecutivo='73'

SELECT * FROM ERP_Venta
select * from  ERP_VentaDetalle where idventa='98'
select * from ERP_Productos where id='6524'
SELECT * FROM ERP_FormasPago
SELECT * FROM ERP_CondicionPago
select * from ERP_Solicitud
select * from ERP_Moneda
select * from ERP_Vendedores where estado='A'
select * from ERP_Moneda
///view creditos aprobados///
alter VIEW [dbo].[ERP_view_reporte_creditos_aprobados] AS 
select s.estado,vend.descripcion as vendedor,concat(v.serie_comprobante,'-',RIGHT('00000' + CAST(FLOOR(v.numero_comprobante) AS VARCHAR), 5),'-',RIGHT('00000' + CAST(FLOOR(tike.numero_comprobante) AS VARCHAR), 5) ) as documento_ven,v.idtienda,sc.total_financiado+sc.intereses as financiado,sc.intereses+sc.monto_venta as Credito,total_financiado as total_financiado,sc.valor_cuota as cuota,sc.cuota_inicial as inicial,sc.monto_venta as precio_lista,sc.intereses,sc.nro_cuotas,mon.IdMoneda, mon.Descripcion as moneda,mon.Simbolo, s.cCodConsecutivo, s.nConsecutivo,s.fecha_solicitud,s.idvendedor,s.idcliente,cli.razonsocial_cliente,cli.id_tipocli as idTipoCliente,tcl.descripcion as tipocliente,v.fecha_emision as fecdoc,v.serie_comprobante,v.numero_comprobante from ERP_Solicitud as s 
inner join ERP_SolicitudCredito as sc on (sc.cCodConsecutivo=s.cCodConsecutivo and sc.nConsecutivo=s.nConsecutivo)
INNER JOIN  ERP_Clientes as cli on (cli.id=s.idcliente) 
inner join  ERP_Venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo  and v.IdTipoDocumento in ('03','01'))
inner join ERP_Moneda as mon on (mon.IdMoneda=v.idmoneda)
inner join 	ERP_Venta as tike on(tike.idventa_comprobante=v.idventa)
inner join ERP_Vendedores as vend on(vend.idvendedor=s.idvendedor) 
left join ERP_TipoCliente as tcl on (tcl.id=cli.id_tipocli)
where s.estado='4'

SELECT * FROM ERP_TipoCliente
select * from ERP_Vendedores
//VIEW ASIGNACION COBRADOR ///
ALTER VIEW [dbo].[ERP_view_solicitud_Asignacion] AS 
SELECT v.idventa,v.IdTipoDocumento,v.serie_comprobante,v.numero_comprobante,co.id as idCobrador ,c.id as idCliente ,c.razonsocial_cliente as cliente , tdoc.Descripcion as tipoComprobanteText,co.descripcion as Cobrador, con.nCodTienda, v.tipo_comprobante,s.cCodConsecutivo, s.nConsecutivo, s.fecha_solicitud, s.tipo_solicitud, s.estado, s.idconvenio, s.descuento_id, tc.cDescripcion AS tipo_documento, c.documento AS numero_documento, m.Descripcion AS moneda, s.t_monto_total,
CASE WHEN s.saldo IS NULL THEN 0 ELSE s.saldo END AS saldo,
CASE WHEN s.pagado IS NULL THEN 0 ELSE s.pagado END AS pagado,
CASE WHEN s.facturado IS NULL THEN 0 ELSE s.facturado END AS facturado
FROM ERP_Solicitud AS s
INNER JOIN ERP_Clientes AS c ON(s.idcliente=c.id)
INNER JOIN ERP_TABLASUNAT AS tc ON(cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=s.idmoneda)
INNER JOIN ERP_Venta AS v on(v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo and v.tipo_comprobante = 0 and v.IdTipoDocumento in ('03','01'))
INNER JOIN ERP_Consecutivos AS con on (con.cCodConsecutivo=s.cCodConsecutivo)
INNER JOIN ERP_TipoDocumento AS tdoc on (v.IdTipoDocumento=tdoc.IdTipoDocumento)
left  join ERP_Cobrador as co on(s.idCobrador=co.id)
WHERE S.saldo > 0 AND S.estado > 5

GO


/// vie reporte repuesto 16/03/2022/ ///////////
select * from ERP_VW_REPORTE_REPUESTO
alter VIEW ERP_VW_REPORTE_REPUESTO AS 
SELECT * FROM (select mo.IdMoneda, mo.Simbolo,v.idtienda,s.idvendedor,s.idcliente,v.fecha_emision as fecha,s.origen,v.idventa as idventa_ca,v.t_monto_total as monto_total,s.estado as estado,concat(v.serie_comprobante,'-',RIGHT('00000' + CAST(FLOOR(v.numero_comprobante) AS VARCHAR), 5),'-',RIGHT('00000' + CAST(FLOOR(tic.numero_comprobante) AS VARCHAR), 5) ) as documento_ven,s.cCodConsecutivo as cCodConsecutivo, s.nConsecutivo as nConsecutivo,v.serie_comprobante as serie_comprobante,v.numero_comprobante as numero_comprobante,cl.razonsocial_cliente,vend.descripcion as vendedor
from ERP_Solicitud as s inner join erp_venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo)
inner join ERP_Moneda as mo on mo.idmoneda=v.IdMoneda
inner join ERP_Clientes as cl on (s.idcliente=cl.id)		
inner join ERP_Venta as tic on (tic.idventa_comprobante=v.idventa)
inner join ERP_Vendedores as vend on(vend.idvendedor=s.idvendedor) ) AS T1 right join
(select v.idventa as idventa_cu,sum(CASE  
             WHEN p.idCategoria =3 THEN sa.monto_total 
              ELSE 0 
           END) as REPUESTO, sum(CASE  
             WHEN p.idCategoria =4 THEN sa.monto_total 
              ELSE 0 
           END) as ACEITE,
					 sum(CASE  
             WHEN p.idCategoria =6 THEN sa.monto_total 
              ELSE 0 
           END) as SERVICIO,
					 sum(CASE  
             WHEN p.idCategoria =7 THEN sa.monto_total 
              ELSE 0 
           END) as TERCEROS			
from ERP_Solicitud as s inner join erp_venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo)
			inner join ERP_VentaDetalle as sa on (sa.idventa=v.idventa) inner join ERP_Clientes as cl on (s.idcliente=cl.id)
inner join ERP_Venta as tic on (tic.idventa_comprobante=v.idventa)
inner join ERP_Vendedores as vend on(vend.idvendedor=s.idvendedor)
inner join ERP_Productos as p on (p.id=sa.idArticulo) where  p.idCategoria IN (3,4,6,7) GROUP BY v.idventa ) AS T2 ON T1.idventa_ca=T2.idventa_cu  ORDER BY T1.IdMoneda  where t2.idventa_cu='98'


//////// NO SE ////////
select SUM(vp.monto_pago) as total,cp.id as idCondicionPago,cp.description as condicionPago from ERP_VentaFormaPago as vp inner join erp_venta as v on vp.idventa=v.idventa inner join ERP_Clientes as cl on v.idcliente=cl.id inner join ERP_FormasPago as fp on fp.codigo_formapago=vp.codigo_formapago inner join ERP_CondicionPago as cp on cp.id=v.condicion_pago GROUP BY v.condicion_pago ,cp.id,cp.description

select cp.id as idCondicionPago,cp.description as condicionPago , v.fecha_emision,vp.codigo_formapago,fp.descripcion_subtipo,vp.monto_pago,v.idventa,v.serie_comprobante,v.numero_comprobante,v.idcliente,cl.razonsocial_cliente from ERP_VentaFormaPago as vp inner join erp_venta as v on vp.idventa=v.idventa inner join ERP_Clientes as cl on v.idcliente=cl.id inner join ERP_FormasPago as fp on fp.codigo_formapago=vp.codigo_formapago inner join ERP_CondicionPago as cp on cp.id=v.condicion_pago inner join erp_venta as tiket on (tiket.idventa_comprobante=v.idventa) where convert(date,v.fecha_emision)='$date' and v.idcajero='$usuario' ORDER BY codigo_formapago
select * from ERP_Venta

//////////////////// 14/03/2022 info_reporte_comprobantes///////////////////////////////////////////
select * from ERP_Venta 



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
LEFT JOIN ERP_Modelo AS mo ON (pr.idModelo=mo.idModelo)  where s.cCodConsecutivo='SOL' and s.nConsecutivo='65'

select * from ERP_Solicitud as s where s.cCodConsecutivo='SOL' and s.nConsecutivo='65'
select * from ERP_Clientes where id='5'
select * from ERP_Persona 

select * from ERP_Venta
select * from er
///////////////////////////////////////// info_view reporte_venta_cliente////////////////////////////////////////////////

create VIEW ERP_VW_VentaClientes AS
select pr.idCategoria as idCategoria,ven.idtienda as idtienda ,ved.idvendedor as idvendedor,ved.descripcion as usuario,ven.idventa,ven.fecha_emision as Fecha,concat(ven.serie_comprobante,'-', ven.numero_comprobante) as Documento ,ven.serie_comprobante, ven.numero_comprobante,cl.id as idcliente,cl.documento as DocumentoCliente,cl.razonsocial_cliente as razonsocial_cliente, cl.direccion as Direccion,cl.celular,mo.descripcion as Modelo,ser.motor as Motor,ser.nombreSerie as numero_serie,ser.color as Color , ser.idSerie as idSerie,
sc.cuota_inicial as cuota_inicial,sa.precio_unitario as precio_unitario,fp.id as idcondicion_pago,fp.description as condicion_pago,mon.IdMoneda as IdMoneda,mon.descripcion as Moneda,ven.saldo, ven.pagado
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


select *
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
select * from ERP_Clientes
select * from ERP_Solicitud
select v.idtienda,sc.total_financiado+sc.intereses as financiado,sc.intereses+sc.monto_venta as Credito,total_financiado as total_financiado,sc.valor_cuota as cuota,sc.cuota_inicial as inicial,sc.monto_venta as precio_lista,sc.intereses,sc.nro_cuotas,mon.IdMoneda, mon.Descripcion as moneda,mon.Simbolo, s.cCodConsecutivo, s.nConsecutivo,s.fecha_solicitud,s.idvendedor,s.idcliente,cli.razonsocial_cliente,cli.id_tipocli as idTipoCliente,tcl.descripcion as tipocliente,v.fecha_emision as fecdoc,v.serie_comprobante,v.numero_comprobante from ERP_Solicitud as s 
inner join ERP_SolicitudCredito as sc on (sc.cCodConsecutivo=s.cCodConsecutivo and sc.nConsecutivo=s.nConsecutivo)
INNER JOIN  ERP_Clientes as cli on (cli.id=s.idcliente) 
inner join  ERP_Venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo  and v.IdTipoDocumento in ('03','01'))
inner join ERP_Moneda as mon on (mon.IdMoneda=v.idmoneda)
inner join 	ERP_Venta as tike on(tike.idventa_comprobante=v.idventa)left join ERP_TipoCliente as tcl on (tcl.id=cli.id_tipocli)
where s.estado='4'

select * from ERP_SolicitudCredito
select * from erp_venta
select * from ERP_Moneda
s

select * from ERP_Solicitud as s 
inner join ERP_SolicitudCredito as sc on (sc.cCodConsecutivo=s.cCodConsecutivo and sc.nConsecutivo=s.nConsecutivo)
INNER JOIN  ERP_Clientes as cli on (cli.id=s.idcliente) 
inner join  ERP_Venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo  and v.IdTipoDocumento in ('03','01'))
inner join 	ERP_Venta as tike on(tike.idventa_comprobante=v.idventa)
left join ERP_TipoCliente as tcl on (tcl.id=cli.id_tipocli)
where s.estado='4'


select * from ERP_GuiaRemision
select * from ERP_Compania
select * from ERP_GuiaRemisionDetalle
select * from ERP_Marcas
select * from ERP_Productos 
select * from ERP_Marcas
select * from ERP_Modelo
select pr.code_article,concat(pr.description,', Marca: ',mar.description,', Modelo: ',mod.descripcion, ', Color: ',se.color,', Chasis: ',se.chasis,',Motor: ',se.motor) as producto,gp.cantidad,un.descripcion as unidadMedida from ERP_GuiaRemisionProducto as gp inner join ERP_Productos as pr on (pr.id =gp.idarticulo) inner join ERP_GuiaRemisionDetalle as gd on (gp.cCodConsecutivo=gd.cCodConsecutivo and gp.nConsecutivo=gd.nConsecutivo and gd.consecutivo=gp.consecutivo) inner join ERP_UnidadMedida as un on(un.IdUnidadMedida=pr.um_id) left join ERP_Modelo as mod on(mod.idModelo=pr.idModelo) left join ERP_Marcas as mar on(mar.id=pr.idMarca) inner join ERP_Serie as se on (se.idSerie=gd.idSerie)  WHERE gp.cCodConsecutivo='G001' and gp.nConsecutivo='2' and pr.serie=1

select * from ERP_Serie
select * from ERP_UnidadMedida
select * from ERP_GuiaRemisionProducto as p left join ERP_GuiaRemisionDetalle as gd on (p.cCodConsecutivo=gd.cCodConsecutivo and p.nConsecutivo=gd.nConsecutivo and gd.consecutivo=p.consecutivo) inner join ERP_Serie as se on (se.idSerie=gd.idSerie) WHERE p.cCodConsecutivo='G001' and p.nConsecutivo='2' 

select pr.code_article,pr.description as producto,gp.cantidad,un.descripcion as unidadMedida from ERP_GuiaRemisionProducto as gp inner join ERP_Productos as pr on (pr.id =gp.idarticulo) inner join ERP_UnidadMedida as un on(un.IdUnidadMedida=pr.um_id) WHERE gp.cCodConsecutivo='G001' and gp.nConsecutivo='3' and pr.serie=0

SELECT *,tt.descripcion as traslado , FORMAT(g.fechaEmision, 'yyyy-MM-dd') AS fechaEmision, FORMAT(g.fechaInicioTraslado, 'yyyy-MM-dd') AS fechaInicioTraslado from ERP_GuiaRemision as g inner join ERP_TipoTraslado as tt on (tt.id=g.idtraslado) WHERE g.cCodConsecutivo='{$cCodConsecutivo}' AND g.nConsecutivo={$nConsecutivo}

select * from ERP_TipoTraslado
