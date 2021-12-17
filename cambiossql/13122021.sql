USE [Consorcio]
GO

/****** Object:  Table [dbo].[ERP_Bancos]    Script Date: 13/12/2021 10:50:50 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ERP_Bancos](
	[idbanco] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](255) NOT NULL,
	[user_created] [int] NOT NULL,
	[user_updated] [int] NULL,
	[user_deleted] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
 CONSTRAINT [PK_ERP_Bancos] PRIMARY KEY CLUSTERED 
(
	[idbanco] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO




/****** Object:  Table [dbo].[ERP_TiposMovimiento]    Script Date: 17/12/2021 06:41:46 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[ERP_TiposMovimiento](
	[codigo_tipo] [varchar](5) NOT NULL,
	[descripcion_tipo] [varchar](50) NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
	[user_deleted] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
 CONSTRAINT [PK_ERP_TiposMovimiento] PRIMARY KEY CLUSTERED 
(
	[codigo_tipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO



/****** Object:  Table [dbo].[ERP_FormasPago]    Script Date: 17/12/2021 06:42:15 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[ERP_FormasPago](
	[codigo_formapago] [varchar](5) NOT NULL,
	[descripcion_subtipo] [varchar](50) NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
	[user_deleted] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
 CONSTRAINT [PK_ERP_FormasPago] PRIMARY KEY CLUSTERED 
(
	[codigo_formapago] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO



/****** Object:  Table [dbo].[ERP_Denominaciones]    Script Date: 17/12/2021 06:42:39 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[ERP_Denominaciones](
	[id_denominacion] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](50) NULL,
	[valor] [decimal](18, 5) NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
	[user_deleted] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
 CONSTRAINT [PK_ERP_Denominaciones] PRIMARY KEY CLUSTERED 
(
	[id_denominacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO



/****** Object:  Table [dbo].[ERP_Convenios]    Script Date: 17/12/2021 06:42:58 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[ERP_Convenios](
	[idconvenio] [int] IDENTITY(1,1) NOT NULL,
	[descripcionconvenio] [varchar](100) NULL,
	[estado] [int] NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
	[user_deleted] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
 CONSTRAINT [PK_ERP_Convenios] PRIMARY KEY CLUSTERED 
(
	[idconvenio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO



/****** Object:  Table [dbo].[ERP_CuentasBancarias]    Script Date: 17/12/2021 06:43:13 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[ERP_CuentasBancarias](
	[id_cuentabancaria] [int] IDENTITY(1,1) NOT NULL,
	[idbanco] [int] NULL,
	[numero_cuenta] [varchar](50) NULL,
	[descripcion_cuenta] [varchar](50) NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
	[user_deleted] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
 CONSTRAINT [PK_ERP_CuentasBancarias] PRIMARY KEY CLUSTERED 
(
	[id_cuentabancaria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[ERP_CuentasBancarias]  WITH CHECK ADD  CONSTRAINT [fk_bancos_cuentas_bancarias] FOREIGN KEY([idbanco])
REFERENCES [dbo].[ERP_Bancos] ([idbanco])
GO

ALTER TABLE [dbo].[ERP_CuentasBancarias] CHECK CONSTRAINT [fk_bancos_cuentas_bancarias]
GO




/****** Object:  Table [dbo].[ERP_Aprobacion]    Script Date: 17/12/2021 06:43:47 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[ERP_Aprobacion](
	[idaprobacion] [int] IDENTITY(1,1) NOT NULL,
	[nombre_aprobacion] [varchar](50) NULL,
	[idtienda] [int] NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
	[user_deleted] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
 CONSTRAINT [PK_ERP_Aprobacion] PRIMARY KEY CLUSTERED 
(
	[idaprobacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[ERP_Aprobacion]  WITH CHECK ADD  CONSTRAINT [fk_aprobacion_tienda] FOREIGN KEY([idtienda])
REFERENCES [dbo].[ERP_Tienda] ([idTienda])
GO

ALTER TABLE [dbo].[ERP_Aprobacion] CHECK CONSTRAINT [fk_aprobacion_tienda]
GO



/****** Object:  Table [dbo].[ERP_Cajas]    Script Date: 17/12/2021 06:44:12 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[ERP_Cajas](
	[idcaja] [int] IDENTITY(1,1) NOT NULL,
	[idtienda] [int] NULL,
	[nombre_caja] [varchar](100) NULL,
	[usuario] [varchar](10) NULL,
	[activo] [varchar](1) NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
	[user_deleted] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
 CONSTRAINT [PK_ERP_Cajas] PRIMARY KEY CLUSTERED 
(
	[idcaja] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[ERP_Cajas]  WITH CHECK ADD  CONSTRAINT [fk_cajas_tienda] FOREIGN KEY([idtienda])
REFERENCES [dbo].[ERP_Tienda] ([idTienda])
GO

ALTER TABLE [dbo].[ERP_Cajas] CHECK CONSTRAINT [fk_cajas_tienda]
GO



/****** Object:  Table [dbo].[ERP_ConsecutivosComprobantes]    Script Date: 17/12/2021 06:44:41 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ERP_ConsecutivosComprobantes](
	[id_consecutivo] [int] IDENTITY(1,1) NOT NULL,
	[idtienda] [int] NULL,
	[serie] [int] NULL,
	[numero] [int] NULL,
	[actual] [int] NULL,
	[ultimo] [int] NULL,
	[longitud] [int] NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
	[user_deleted] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
 CONSTRAINT [PK_ERP_ConsecutivosComprobantes] PRIMARY KEY CLUSTERED 
(
	[id_consecutivo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[ERP_ConsecutivosComprobantes]  WITH CHECK ADD  CONSTRAINT [fk_consecutivos_comprobantes_tienda] FOREIGN KEY([idtienda])
REFERENCES [dbo].[ERP_Tienda] ([idTienda])
GO

ALTER TABLE [dbo].[ERP_ConsecutivosComprobantes] CHECK CONSTRAINT [fk_consecutivos_comprobantes_tienda]
GO






--- LLAVES FORÁNEAS
/*alter table ERP_CuentasBancarias add constraint fk_bancos_cuentas_bancarias foreign key(idbanco) 
references ERP_Bancos(idbanco);

alter table ERP_Aprobacion add constraint fk_aprobacion_tienda foreign key(idtienda) 
references ERP_Tienda(idTienda);


alter table ERP_Cajas add constraint fk_cajas_tienda foreign key(idtienda) 
references ERP_Tienda(idTienda);


alter table ERP_ConsecutivosComprobantes add constraint fk_consecutivos_comprobantes_tienda foreign key(idtienda) 
references ERP_Tienda(idTienda);*/
