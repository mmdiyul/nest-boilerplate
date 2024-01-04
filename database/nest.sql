-- role
create table public.role (
    id bigserial primary key,
    code varchar(10) not null,
    name varchar(50) not null,
    created_by int8,
    updated_by int8,
    deleted_by int8,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    deleted_at timestamp
);
-- user
create table public.user (
    id bigserial primary key,
    role_id int8 not null,
    nip varchar(32),
    username varchar(32) not null,
    fullname varchar(50) not null,
    email varchar(100),
    password text not null,
    created_by int8,
    updated_by int8,
    deleted_by int8,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    deleted_at timestamp,
    constraint fk_user_role foreign key (role_id) references public.role(id)
);
-- file
create table public.file (
    id bigserial primary key,
    filename varchar(255) not null,
    filetype varchar(255) not null,
    filesize float8 not null,
    category varchar(50) not null,
    uploader_ip varchar(20) not null,
    path text not null,
    status bool not null default false,
    created_by int8,
    updated_by int8,
    deleted_by int8,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    deleted_at timestamp
);