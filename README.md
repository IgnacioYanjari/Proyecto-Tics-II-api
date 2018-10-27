# Proyecto-Tics-II
Desarrollo de proyecto del ramo Tics II

## Descripción de proyecto(a muy grandes rasgos) :
  - Tener en cuenta los valores de mercado.
  - Etapa de cotizacion :
    * Tipos de obras
      * Según unión
        * Estructuras soldadas
        * Estructuras apernadas
      * Según Clasificación
        * Pesada
        * Semi-Pesada
        * Ligero
    * Partes de una cotización :
      * Material ( Respecto a que tipo de metal o fierro se utilizará )
      * Insumos ( Respecto a los clavos, pernos y similares, son generalmente usados para unir o juntar el material )
      * Equipos o Maquinaria ( Respecto a gruas, elevadores, etc)
        - Tener en cuenta que pueden ser prestados, tenerlos en bodega(raro, pero puede pasar) o arrendados.
      * Mano de obra
        - Para fabricar.
        - Para montar la estructura.
      * Gastos generales ( Imposiciones, leyes sociales, arriendos, telefonos, movilización, etc )
        - Generalmente medido en porcentaje respecto a los anteriores.
      * Utilidad ( Porcentaje de costo sobre lo utilizado)
        - Debe poder modificarse para ajustarse al mercado (IMPORTANTE).

## Pasos para instalar dependencias :

1. Clonar git
2. Ejecutar ``` npm install ``` en el interior de la carpeta back
3. Instalar ```postgreSql``` si no está instalado.

### Links

- [Instalar postgreSql en MacOs con brew](https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/)

- [Usar postgreSql con Express y NodeJs](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize)

-[Usaremos sequelize-cli para migraciones y seeders](http://docs.sequelizejs.com/manual/tutorial/migrations.html#configuration)

### Comandos utiles

- Para ingresar a una bdd de postgresql se usa ```psql DB_NAME```
