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


SELECT * FROM ERP_Venta

SELECT * FROM ERP_FormasPago
SELECT * FROM ERP_CondicionPago
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

select * from ERP_GuiaRemisionProducto
select * from ERP_GuiaRemisionDetalle
ALTER TABLE ERP_GuiaRemisionProducto
ADD idlote int  NULL;
select * from ERP_Productos
select * from ERP_Lote
select * from ERP_Compania

select * from ERP_CajaDiariaDetalle as cd inner join ERP_TiposMovimiento as tm on cd.codigoTipo=tm.codigo_tipo INNER JOIN ERP_FormasPago as fp on cd.codigoFormaPago=fp.codigo_formapago inner join ERP_CajaDiaria as c on cd.idCajaDiaria=c.idCajaDiaria where c.fechaCaja='2022-02-15' and c.idUsuario='1006'

SELECT * FROM ERP_Solicitud as so inner join ERP_SolicitudCredito  AS s on  (so.cCodConsecutivo=s.cCodConsecutivo and so.nConsecutivo=s.nConsecutivo)
inner join ERP_SolicitudArticulo as sola on (sola.cCodConsecutivo=s.cCodConsecutivo and sola.nConsecutivo=s.nConsecutivo)
inner join ERP_Productos as pro on sola.idarticulo = pro.id
left join ERP_Modelo as mo on pro.idModelo=mo.idModelo
left join ERP_SolicitudDetalle as sold on (sold.cCodConsecutivo=s.cCodConsecutivo and sold.nConsecutivo=s.nConsecutivo)
inner join ERP_Moneda as mone on mone.IdMoneda=so.idmoneda
left join erp_venta as vent on(vent.cCodConsecutivo_solicitud=s.cCodConsecutivo and vent.nConsecutivo_solicitud=s.nConsecutivo)
left join ERP_Serie as ser on ser.idSerie=sold.idSerie
left join ERP_Vendedores as usv on usv.idvendedor=so.idvendedor
left join ERP_Cobrador as usc on usc.id=so.idCobrador
        LEFT JOIN ERP_Persona AS f ON(f.idPersona=s.idfiador)
        LEFT JOIN ERP_Persona AS cy ON(cy.idPersona=s.idconyugue)
        LEFT JOIN ERP_Persona AS fc ON(fc.idPersona=s.idfiadorconyugue)
        LEFT JOIN ERP_Clientes AS clp ON(clp.id=so.idCliente)
        LEFT JOIN ERP_Persona AS cli ON(cli.idPersona=clp.idPersona)
        where s.cCodConsecutivo='SOL' and s.nConsecutivo='65'
				
				select * from erp_soli
				
	select * from		ERP_view_solicitud_Asignacion
				select * from ERP_Venta 
				select * from ERP_Solicitud
				
				
				select  sum(CASE  
             WHEN p.idCategoria =3 THEN sa.monto_total 
           END) 
					 
				
					 
						,v.t_monto_total as monto_total,s.estado as estado,concat(v.serie_comprobante,'-',RIGHT('00000' + CAST(FLOOR(v.numero_comprobante) AS VARCHAR), 5),'-',RIGHT('00000' + CAST(FLOOR(tic.numero_comprobante) AS VARCHAR), 5) ) as documento_ven,s.cCodConsecutivo as cCodConsecutivo, s.nConsecutivo as nConsecutivo,v.serie_comprobante as serie_comprobante,v.numero_comprobante as numero_comprobante,cl.razonsocial_cliente,vend.descripcion as vendedor
from ERP_Solicitud as s inner join erp_venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo)
			inner join ERP_VentaDetalle as sa on (sa.idventa=v.idventa) inner join ERP_Clientes as cl on (s.idcliente=cl.id)
inner join ERP_Venta as tic on (tic.idventa_comprobante=v.idventa)
inner join ERP_Vendedores as vend on(vend.idvendedor=s.idvendedor)
inner join ERP_Productos as p on (p.id=sa.idArticulo) where  p.idCategoria IN (3,4,6,7) and v.idventa='70' 

GROUP BY sa.monto_total,v.t_monto_total,s.estado,p.idCategoria,v.serie_comprobante,tic.numero_comprobante,s.cCodConsecutivo , s.nConsecutivo,
v.serie_comprobante	,v.numero_comprobante,cl.razonsocial_cliente,vend.descripcion

select sa.monto_total as monto_total_articul ,v.t_monto_total as monto_total,s.estado as estado,p.idCategoria AS Categoria,concat(v.serie_comprobante,'-',RIGHT('00000' + CAST(FLOOR(v.numero_comprobante) AS VARCHAR), 5),'-',RIGHT('00000' + CAST(FLOOR(tic.numero_comprobante) AS VARCHAR), 5) ) as documento_ven,s.cCodConsecutivo as cCodConsecutivo, s.nConsecutivo as nConsecutivo,v.serie_comprobante as serie_comprobante,v.numero_comprobante as numero_comprobante,cl.razonsocial_cliente,vend.descripcion as vendedor
from ERP_Solicitud as s inner join erp_venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo)
			inner join ERP_VentaDetalle as sa on (sa.idventa=v.idventa) inner join ERP_Clientes as cl on (s.idcliente=cl.id)
inner join ERP_Venta as tic on (tic.idventa_comprobante=v.idventa)
inner join ERP_Vendedores as vend on(vend.idvendedor=s.idvendedor)
inner join ERP_Productos as p on (p.id=sa.idArticulo) where  p.idCategoria IN (3,4,6,7) and v.idventa='70'


select sum(vd.monto_total) from ERP_VentaDetalle as vd  inner join ERP_Productos as pr on (pr.id=vd.idarticulo) inner join ERP_Categoria as c on c.idCategoria=pr.idCategoria where idventa='70' GROUP BY c.idCategoria,monto_total

				select * from ERP_VentaDetalle
				

				select sum(CASE  
             WHEN p.idCategoria =3 THEN sa.monto_total 
              ELSE 0 
           END) as aceite, sum(CASE  
             WHEN p.idCategoria =4 THEN sa.monto_total 
              ELSE 0 
           END) as rep
						
from ERP_Solicitud as s inner join erp_venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo)
			inner join ERP_VentaDetalle as sa on (sa.idventa=v.idventa) inner join ERP_Clientes as cl on (s.idcliente=cl.id)
inner join ERP_Venta as tic on (tic.idventa_comprobante=v.idventa)
inner join ERP_Vendedores as vend on(vend.idvendedor=s.idvendedor)
inner join ERP_Productos as p on (p.id=sa.idArticulo) where  p.idCategoria IN (3,4,6,7) and v.idventa='70' 


GROUP BY p.idCategoria,sa.monto_total


select * from		ERP_view_solicitud_Asignacion
				select * from ERP_Venta 
				select * from ERP_Solicitud
				
				
				select  sum(CASE  
             WHEN p.idCategoria =3 THEN sa.monto_total 
              ELSE 0 
           END) as aceite, sum(CASE  
             WHEN p.idCategoria =4 THEN sa.monto_total 
              ELSE 0 
           END) as rep,
					  sum(CASE  
             WHEN p.idCategoria =6 THEN sa.monto_total 
              ELSE 0 
           END) as rep2
					 
				
					 
						,v.t_monto_total as monto_total,s.estado as estado,concat(v.serie_comprobante,'-',RIGHT('00000' + CAST(FLOOR(v.numero_comprobante) AS VARCHAR), 5),'-',RIGHT('00000' + CAST(FLOOR(tic.numero_comprobante) AS VARCHAR), 5) ) as documento_ven,s.cCodConsecutivo as cCodConsecutivo, s.nConsecutivo as nConsecutivo,v.serie_comprobante as serie_comprobante,v.numero_comprobante as numero_comprobante,cl.razonsocial_cliente,vend.descripcion as vendedor
from ERP_Solicitud as s inner join erp_venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo)
			inner join ERP_VentaDetalle as sa on (sa.idventa=v.idventa) inner join ERP_Clientes as cl on (s.idcliente=cl.id)
inner join ERP_Venta as tic on (tic.idventa_comprobante=v.idventa)
inner join ERP_Vendedores as vend on(vend.idvendedor=s.idvendedor)
inner join ERP_Productos as p on (p.id=sa.idArticulo) where  p.idCategoria IN (3,4,6,7) and v.idventa='70' 


GROUP BY sa.monto_total,v.t_monto_total,s.estado,p.idCategoria,v.serie_comprobante,tic.numero_comprobante,s.cCodConsecutivo , s.nConsecutivo,
v.serie_comprobante	,v.numero_comprobante,cl.razonsocial_cliente,vend.descripcion

select sa.monto_total as monto_total_articul ,v.t_monto_total as monto_total,s.estado as estado,p.idCategoria AS Categoria,concat(v.serie_comprobante,'-',RIGHT('00000' + CAST(FLOOR(v.numero_comprobante) AS VARCHAR), 5),'-',RIGHT('00000' + CAST(FLOOR(tic.numero_comprobante) AS VARCHAR), 5) ) as documento_ven,s.cCodConsecutivo as cCodConsecutivo, s.nConsecutivo as nConsecutivo,v.serie_comprobante as serie_comprobante,v.numero_comprobante as numero_comprobante,cl.razonsocial_cliente,vend.descripcion as vendedor
from ERP_Solicitud as s inner join erp_venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo)
			inner join ERP_VentaDetalle as sa on (sa.idventa=v.idventa) inner join ERP_Clientes as cl on (s.idcliente=cl.id)
inner join ERP_Venta as tic on (tic.idventa_comprobante=v.idventa)
inner join ERP_Vendedores as vend on(vend.idvendedor=s.idvendedor)
inner join ERP_Productos as p on (p.id=sa.idArticulo) where  p.idCategoria IN (3,4,6,7) and v.idventa='70'


select sum(CASE  
             WHEN p.idCategoria =3 THEN sa.monto_total 
              ELSE 0 
           END) as aceite, sum(CASE  
             WHEN p.idCategoria =4 THEN sa.monto_total 
              ELSE 0 
           END) as rep,
					 sum(CASE  
             WHEN p.idCategoria =6 THEN sa.monto_total 
              ELSE 0 
           END) as rep2
						
from ERP_Solicitud as s inner join erp_venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo)
			inner join ERP_VentaDetalle as sa on (sa.idventa=v.idventa) inner join ERP_Clientes as cl on (s.idcliente=cl.id)
inner join ERP_Venta as tic on (tic.idventa_comprobante=v.idventa)
inner join ERP_Vendedores as vend on(vend.idvendedor=s.idvendedor)
inner join ERP_Productos as p on (p.id=sa.idArticulo) where  p.idCategoria IN (3,4,6,7) and v.idventa='70'


SELECT * FROM ERP_Venta
SELECT * FROM ERP_VentaDetalle
SELECT * FROM ERP_SolicitudArticulo
SELECT * FROM ERP_Solicitud
SELECT * FROM ERP_SolicitudDetalle


				