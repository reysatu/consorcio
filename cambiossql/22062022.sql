create view AL_Movimientos as
select  idMovimiento Id, convert(date,fecha_registro) Fecha, u.name Usuario, T.descripcion Operacion, observaciones Observacion
from ERP_Movimiento M
inner join ERP_TipoOperacion T on M.idTipoOperacion = T.idTipoOperacion
inner join ERP_Usuarios U on U.id = M.idUsuario
