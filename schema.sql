

/* TABLA DE USUARIOS */

create table tblUsuario
(
    id int identity(1,1) not null,
    Cedula int not null,
    Nombre varchar(30)not null,
    telefono int not null,
    Direccion varchar(30) not null,
    Estado_usuario varchar(30) not null,
    Primary Key (id),
)

create table tblLogin
(
    idUsuario int not null,
    username varchar(30) not null,
    password varchar(100) not null,
    Foreign key (idUsuario)references
    tblusuario (id) on delete cascade on update cascade
)


create table products
(
    id int identity(1,1) not null,
    name varchar(500) not null,
    price int not null,
    quantity int not null,
    description varchar(100) not null
)

Insert into tblLogin values(1,'daniela@gmail.com', '$2b$10$U/UJL8p.Iifsr5Yj4vEyyOXpPfTJ9IeOhiUA9qFhRul0snISYLUzu')
Insert into tblusuario values(123,'Daniela', 9541,'751','Vigente')
INSERT INTO products (name, price, quantity, description) VALUES ('producto 1', 50000, 10, 'Este es el producto 1')



