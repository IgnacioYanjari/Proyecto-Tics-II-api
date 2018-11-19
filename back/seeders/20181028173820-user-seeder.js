'use strict';
const bcrypt = require('bcrypt');
let { MaterialType, MachineType, SupplyType,
      WorkType, WorkforceType, TenderType,
      ClientType} = require('../models');

module.exports = {
  up: async(queryInterface, Sequelize) => {

    // *-------------- Configuración del sistema -----------------------*
    // Usuarios del sistema.
    await queryInterface.bulkInsert('users', [{
      id: 1,
      first_name: 'Ignacio',
      last_name : 'Yanjari',
      rut : '192098327',
      password : bcrypt.hashSync('12345',8),
      created_at : new Date(),
      updated_at : new Date(),
    },{
      id: 2,
      first_name: 'Jorge',
      last_name : 'Huerta',
      rut : '178121936',
      password : bcrypt.hashSync('12345',8),
      created_at : new Date(),
      updated_at : new Date()
    }], {});

    // Roles del sistema.
    await queryInterface.bulkInsert('roles', [{
      id : 1,
      name : 'Admin',
      created_at : new Date(),
      updated_at : new Date()
    },{
      id : 2,
      name : 'Supervisor',
      created_at : new Date(),
      updated_at : new Date()
    }], {});

    // Tipos de clientes.
    await queryInterface.bulkInsert('client_types', [{
      id : 1,
      name : 'Publico',
      created_at : new Date(),
      updated_at : new Date()
    },{
      id : 2,
      name : 'Privado',
      created_at : new Date(),
      updated_at : new Date()
    }, {
      id : 3,
      name : 'Subvencionado',
      created_at : new Date(),
      updated_at : new Date()
    }], {});

    // Tipos de licitación
    await queryInterface.bulkInsert('tender_types', [{
      id : 1,
      type : 'Peso',
      name : 'Liviana',
      created_at : new Date(),
      updated_at : new Date()
    },{
      id : 2,
      type : 'Peso',
      name : 'Semi-pesada',
      created_at : new Date(),
      updated_at : new Date()
    },{
      id : 3,
      type : 'Peso',
      name : 'Pesada',
      created_at : new Date(),
      updated_at : new Date()
    },{
      id : 4,
      type : 'Unión',
      name : 'Soldadas',
      created_at : new Date(),
      updated_at : new Date()
    },{
      id : 5,
      type : 'Unión',
      name : 'Apernadas',
      created_at : new Date(),
      updated_at : new Date()
    }], {})

    // Tipos de obras
    await queryInterface.bulkInsert('work_types',[{
      id: 1,
      name : 'Montaje',
      created_at : new Date(),
      updated_at : new Date()
    },{
      id : 2,
      name : 'Construcción',
      created_at : new Date(),
      updated_at : new Date()
    }], {});

    // Tipo de mano de obras
    await queryInterface.bulkInsert('workforce_types', [{
      id : 1,
      name : 'Fabricación',
      salary: 200000,
      created_at : new Date(),
      updated_at : new Date()
    },{
      id : 2,
      name : 'Montaje',
      salary: 300000,
      created_at : new Date(),
      updated_at : new Date()
    },{
      id : 3,
      name : 'Maquinaria',
      salary: 400000,
      created_at : new Date(),
      updated_at : new Date()
    }], {});

    // Tipos de Insumos
    let cnt = 1;
    let types = [{
        name: 'Disco corte',
      },{
        name: 'Soldadura',
      },{
        name: 'Pintura',
      },{
        name: 'Protección',
      }], dataTypes = [];

    types.forEach(data => {
      dataTypes.push(Object.assign({}, data, {
        id : cnt++,
        created_at: new Date(),
        updated_at: new Date()
      }));
    });
    await queryInterface.bulkInsert('supply_types', dataTypes);

    // Insumos
    cnt = 1;
    let values = [
      {
        name : `14'' para cortes metalicos`,
        type: 'Disco corte',
        price: 4290,
        brand: 'Bauker',
      },{
        name : `7'' para cortes metalicos`,
        type: 'Disco corte',
        price: 2690,
        brand: 'Bosh',
      },{
        name : `4.5'' para cortes metalicos`,
        type: 'Disco corte',
        price: 1790,
        brand: 'Bosh',
      },{
        name : 'E7018',
        type: 'Soldadura',
        price: 3050,
        brand: 'Bauker',
      },{
        name : 'E6011',
        type: 'Soldadura',
        price: 15160,
        brand: 'M&M',
      },{
        name: 'Anticorrosiva',
        type: 'Pintura',
        price: 15190,
        brand: 'Tricolor',
      },{
        name: 'Casco',
        type: 'Protección',
        price: 1990,
        brand: 'Proseg',
      },{
        name: 'Guante soldador',
        type: 'Protección',
        price: 3990,
        brand: 'Redline',
      },{
        name: 'Guante carretillero',
        type: 'Protección',
        price: 2300,
        brand: 'Redline',
      },{
        name: 'Barbiquejo',
        type: 'Protección',
        price: 1390,
        brand: 'Redline',
      },{
        name: 'Arnés',
        type: 'Protección',
        price: 49990,
        brand: 'Redline',
    }], dataInsert = [];

    await values.forEach( async(data) => {
      let type = await dataTypes.find( value => value.name === data.type);
      delete data.type;
      dataInsert.push(Object.assign({}, data, {
        id : cnt++,
        type_id : type.id,
        created_at: new Date(),
        updated_at: new Date()
      }));
    });
    await queryInterface.bulkInsert('supplies', dataInsert);

    // Tipo Materiales
    cnt = 1;
    types = [{
        name: 'Perfiles Cerrados',
      },{
        name: 'Perfiles Abiertos',
      }];
    dataTypes = [];

    types.forEach(data => {
      dataTypes.push(Object.assign({}, data, {
        id : cnt++,
        created_at: new Date(),
        updated_at: new Date()
      }));
    });
    await queryInterface.bulkInsert('material_types', dataTypes);

    // Materiales
    cnt = 1;
    values = [
      {
        name: 'Angulo 50 x 50 x 3mm',
        type: 'Perfiles Abiertos',
        brand: 'VH',
        price: 7190
      },{
        name: 'Angulo 30 x 30 x 3mm',
        type: 'Perfiles Abiertos',
        brand: 'VH',
        price: 4290
      },{
        name: 'Canal 100 x 50 x 2mm',
        type: 'Perfiles Abiertos',
        brand: 'Genérico',
        price: 14590
      },{
        name: 'Canal 150 x 75 x 3mm',
        type: 'Perfiles Abiertos',
        brand: 'Genérico',
        price: 30190
      },{
        name: 'Canal 150 x 75 x 4mm',
        type: 'Perfiles Abiertos',
        brand: 'Genérico',
        price: 36000
      },{
        name: 'Costanera 100 x 50 x 15 x 2mm',
        type: 'Perfiles Abiertos',
        brand: 'Genérico',
        price: 21340
      },{
        name: 'Cuadrado 50 x 50 x 2mm',
        type: 'Perfiles Cerrados',
        brand: 'Genérico',
        price: 13600
      },{
        name: 'Cuadrado 50 x 50 x 3mm',
        type: 'Perfiles Cerrados',
        brand: 'Genérico',
        price: 20590
      },{
        name: 'Cuadrado 100 x 100 x 3mm',
        type: 'Perfiles Cerrados',
        brand: 'Genérico',
        price: 45040
      },{
        name: 'Cuadrado 100 x 100 x 4mm',
        type: 'Perfiles Cerrados',
        brand: 'Genérico',
        price: 58740
      },{
        name: 'Rectangulos 100 x 50 x 2mm',
        type: 'Perfiles Cerrados',
        brand: 'Genérico',
        price: 21210
      },{
        name: 'Rectangulos 100 x 50 x 3mm',
        type: 'Perfiles Cerrados',
        brand: 'Genérico',
        price: 30390
      },{
        name: 'Rectangulos 200 x 100 x 3mm',
        type: 'Perfiles Cerrados',
        brand: 'Genérico',
        price: 26990
      }
    ];
    dataInsert = [];
    await values.forEach( async(data) => {
      let type = await dataTypes.find( value => value.name === data.type);
      delete data.type;
      dataInsert.push(Object.assign({}, data, {
        id : cnt++,
        type_id : type.id,
        created_at: new Date(),
        updated_at: new Date()
      }));
    });
    await queryInterface.bulkInsert('materials', dataInsert);

    // Tipos de maquinaria
    cnt = 1;
    types = [{
      name: 'Grua'
    },{
      name: 'Elevador'
    }];
    dataTypes = [];
    types.forEach(data => {
      dataTypes.push(Object.assign({}, data, {
        id : cnt++,
        created_at: new Date(),
        updated_at: new Date()
      }));
    })
    await queryInterface.bulkInsert('machine_types', dataTypes);

    // Maquinaria Todos en base a horas usadas.
    // Las gruas se calculan precioTotal = TON * precio * hora
    // Las demas se calculan precioTotal = precio * hora
    cnt = 1;
    values = [
      {
        name: 'Elevadores Personales',
        price: 1000000,
        type: 'Elevador',
      }, {
        name: 'Camión pluma',
        price: 25000,
        type: 'Grua',
      }, {
        name: 'Grua Hidraulica',
        price: 1000,
        type: 'Grua',
        weight: 20,
        weight_type: 'TON'
      },{
        name: 'Grua Horquilla',
        type: 'Grua',
        price: 500,
        weight: 5,
        weight_type: 'TON'
      }
    ];
    dataInsert = [];
    await values.forEach(data => {
      let type = dataTypes.find( value => value.name === data.type);
      delete data.type;
      dataInsert.push(Object.assign({}, data, {
        id : cnt++,
        type_id: type.id,
        created_at: new Date(),
        updated_at: new Date()
      }));
    })
    await queryInterface.bulkInsert('machines', dataInsert);


    const users = await queryInterface.sequelize.query(
      `SELECT id from users;`
    );

    let usersIds = users[0],
      dataProfiles = [];
    cnt = 1;

    // Perfiles administrador para todos los usuarios
    usersIds.forEach( async(user) => {
      let aux = { id : cnt++, user_id : user.id, role_id : 1 ,
        created_at : new Date(), updated_at: new Date() };
      dataProfiles.push(aux);
    });

    return queryInterface.bulkInsert('profiles',dataProfiles);
  },

  down: async(queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('users', null ,{});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('client_types', null, {});
    await queryInterface.bulkDelete('tender_types', null, {});
    await queryInterface.bulkDelete('work_types', null, {});
    await queryInterface.bulkDelete('workforce_types', null, {});
    await queryInterface.bulkDelete('supply_types', null, {});
    await queryInterface.bulkDelete('material_types', null, {});
    await queryInterface.bulkDelete('supplies',null , {});
    await queryInterface.bulkDelete('materials',null, {});
    await queryInterface.bulkDelete('machines', null, {});
    return queryInterface.bulkDelete('profiles', null, {});
  }
};
