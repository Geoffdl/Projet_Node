/*
GET /bars/:id_bar/degree?prix_min=10&prix_max=20 => Degré d'alcool moyen des bières d'un bar avec un prix compris entre 10 et 20
- GET /bars/:id_bar/degree?date=2021-01-01 => Degré d'alcool moyen des bières des commandes d'un bar à une date donnée
- GET /bars/:id_bar/commandes?date=2021-01-01&prix_min=10&prix_max=20 => Liste des commandes d'un bar à une date donnée avec un prix compris entre 10 et 20
- GET /bars/:id_bar/commandes?date=2021-01-01&prix_min=10&prix_max=20&status=terminée => Liste des commandes d'un bar à une date donnée avec un prix compris entre 10 et 20 et terminée
- GET /bars/:id_bar/commandes?date=2021-01-01&prix_min=10&prix_max=20&status=terminée&name=example => Liste des commandes d'un bar à une date donnée avec un prix compris entre 10 et 20 et terminée et dont le nom contient "example"
*/
