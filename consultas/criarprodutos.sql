create table produto (
	id serial,
	nome varchar(20),
	preco float,
	primary key(id)
);

insert into produto(nome,preco) values ('litro de pitu' , '2.50');
