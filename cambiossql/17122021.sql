


--- LLAVES FORÁNEAS
/*

alter table ERP_Solicitud add constraint fk_convenios_solicitud foreign key(idconvenio) 
references ERP_Convenios(idconvenio);

alter table ERP_Solicitud add constraint fk_clientes_solicitud foreign key(idcliente) 
references ERP_Clientes(id);

alter table ERP_Solicitud add constraint fk_descuentos_solicitud foreign key(iddescuento) 
references ERP_Descuentos(id);

*/