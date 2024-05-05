Table users {
id integer [primary key, not null]
first_name varchar
last_name varchar
email varchar
address varchar
phone_number integer
password varchar
role varchar
created_at datetime
gdpr datetime
}

Table equipement_rent {
id integer [primary , not null]
user_id integer
equipement_id integer
rent_start datetime
rent_end datetime
price integer
}

Table equipement {
id integer [primary key, not null]
name varchar
image varchar
description varchar
category varchar
stock integer
}

Ref: "equipement"."id" < "equipement_rent"."equipement_id"

Ref: "users"."id" < "equipement_rent"."user_id"
