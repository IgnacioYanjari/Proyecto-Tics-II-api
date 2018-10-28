'use strict';
const bcrypt = require('bcrypt');

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
      rut : '212098327',
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
      created_at : new Date(),
      updated_at : new Date()
    },{
      id : 2,
      name : 'Montaje',
      created_at : new Date(),
      updated_at : new Date()
    },{
      id : 3,
      name : 'Maquinaria',
      created_at : new Date(),
      updated_at : new Date()
    }], {});

    const users = await queryInterface.sequelize.query(
      `SELECT id from users;`
    );

    let usersIds = users[0],
      cnt = 1,
      dataProfiles = [];

    // Perfiles administrador para todos los usuarios
    usersIds.forEach( async(user) => {
      let aux = { id : cnt++, user_id : user.id, role_id : 1 ,
        created_at : new Date(), updated_at: new Date() };
      dataProfiles.push(aux);
    });
    queryInterface.bulkInsert('profiles',dataProfiles);

    // ------------------------------------------------------------------------

    return null;
  },

  down: async(queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('users', null ,{});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('client_types', null, {});
    await queryInterface.bulkDelete('tender_types', null, {});
    await queryInterface.bulkDelete('work_types', null, {});
    await queryInterface.bulkDelete('workforce_types', null, {});
    return queryInterface.bulkDelete('profiles', null, {});
  }
};
