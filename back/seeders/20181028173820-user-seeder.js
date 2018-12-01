"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // *-------------- Configuración del sistema -----------------------*
    // Usuarios del sistema.
    await queryInterface.bulkInsert(
      "users",
      [
        {
          first_name: "Ignacio",
          last_name: "Yanjari",
          rut: "192098327",
          password: bcrypt.hashSync("12345", 8),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: "Jorge",
          last_name: "Huerta",
          rut: "178121936",
          password: bcrypt.hashSync("12345", 8),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {returning: true, validate: true}
    );

    // Roles del sistema.
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          name: "Admin",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "Supervisor",
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {returning: true, validate: true}
    );

    // Tipos de clientes.
    await queryInterface.bulkInsert(
      "client_types",
      [
        {
          name: "Publico",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "Privado",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "Subvencionado",
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {returning: true, validate: true}
    );

    // Tipos de licitación
    await queryInterface.bulkInsert(
      "tender_types",
      [
        {
          type: "Peso",
          name: "Liviana",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          type: "Peso",
          name: "Semi-pesada",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          type: "Peso",
          name: "Pesada",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          type: "Unión",
          name: "Soldadas",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          type: "Unión",
          name: "Apernadas",
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {returning: true, validate: true}
    );

    // Tipos de obras
    await queryInterface.bulkInsert(
      "work_types",
      [
        {
          name: "Montaje",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "Construcción",
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {returning: true, validate: true}
    );

    // Tipo de mano de obras
    await queryInterface.bulkInsert(
      "workforce_types",
      [
        {
          name: "Fabricación",
          salary: 200000,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "Montaje",
          salary: 300000,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "Maquinaria",
          salary: 400000,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {returning: true, validate: true}
    );

    // Tipos de Insumos
    let types = [
        {
          name: "Disco corte"
        },
        {
          name: "Soldadura"
        },
        {
          name: "Pintura"
        },
        {
          name: "Protección"
        }
      ],
      dataTypes = [];

    types.forEach(data => {
      dataTypes.push(
        Object.assign({}, data, {
          created_at: new Date(),
          updated_at: new Date()
        })
      );
    });
    await queryInterface
      .bulkInsert("supply_types", dataTypes, {returning: true, validate: true})
      .catch(err => console.log(err));
    // Insumos
    let values = [
        {
          name: `14'' para cortes metalicos`,
          type: "Disco corte",
          price: 4290,
          brand: "Bauker"
        },
        {
          name: `7'' para cortes metalicos`,
          type: "Disco corte",
          price: 2690,
          brand: "Bosh"
        },
        {
          name: `4.5'' para cortes metalicos`,
          type: "Disco corte",
          price: 1790,
          brand: "Bosh"
        },
        {
          name: "E7018",
          type: "Soldadura",
          price: 3050,
          brand: "Bauker"
        },
        {
          name: "E6011",
          type: "Soldadura",
          price: 15160,
          brand: "M&M"
        },
        {
          name: "Anticorrosiva",
          type: "Pintura",
          price: 15190,
          brand: "Tricolor"
        },
        {
          name: "Casco",
          type: "Protección",
          price: 1990,
          brand: "Proseg"
        },
        {
          name: "Guante soldador",
          type: "Protección",
          price: 3990,
          brand: "Redline"
        },
        {
          name: "Guante carretillero",
          type: "Protección",
          price: 2300,
          brand: "Redline"
        },
        {
          name: "Barbiquejo",
          type: "Protección",
          price: 1390,
          brand: "Redline"
        },
        {
          name: "Arnés",
          type: "Protección",
          price: 49990,
          brand: "Redline"
        }
      ],
      dataInsert = [];

    types = [
      {
        name: "Disco corte",
        id: 1
      },
      {
        name: "Soldadura",
        id: 2
      },
      {
        name: "Pintura",
        id: 3
      },
      {
        name: "Protección",
        id: 4
      }
    ];

    await values.forEach(async data => {
      let type = types.find(val => val.name === data.type);
      delete data.type;
      await dataInsert.push(
        Object.assign({}, data, {
          type_id: type.id,
          created_at: new Date(),
          updated_at: new Date()
        })
      );
    });
    await queryInterface.bulkInsert("supplies", dataInsert, {
      returning: true,
      validate: true
    });
    // Tipo Materiales
    types = [
      {
        name: "Perfiles Cerrados"
      },
      {
        name: "Perfiles Abiertos"
      }
    ];
    dataTypes = [];

    types.forEach(data => {
      dataTypes.push(
        Object.assign({}, data, {
          created_at: new Date(),
          updated_at: new Date()
        })
      );
    });
    await queryInterface.bulkInsert("material_types", dataTypes, {
      returning: true,
      validate: true
    });
    types = [
      {
        name: "Perfiles Cerrados",
        id: 1
      },
      {
        name: "Perfiles Abiertos",
        id: 2
      }
    ];
    // Materiales
    values = [
      {
        name: "Angulo 50 x 50 x 3mm",
        type: "Perfiles Abiertos",
        brand: "VH",
        price: 7190
      },
      {
        name: "Angulo 30 x 30 x 3mm",
        type: "Perfiles Abiertos",
        brand: "VH",
        price: 4290
      },
      {
        name: "Canal 100 x 50 x 2mm",
        type: "Perfiles Abiertos",
        brand: "Genérico",
        price: 14590
      },
      {
        name: "Canal 150 x 75 x 3mm",
        type: "Perfiles Abiertos",
        brand: "Genérico",
        price: 30190
      },
      {
        name: "Canal 150 x 75 x 4mm",
        type: "Perfiles Abiertos",
        brand: "Genérico",
        price: 36000
      },
      {
        name: "Costanera 100 x 50 x 15 x 2mm",
        type: "Perfiles Abiertos",
        brand: "Genérico",
        price: 21340
      },
      {
        name: "Cuadrado 50 x 50 x 2mm",
        type: "Perfiles Cerrados",
        brand: "Genérico",
        price: 13600
      },
      {
        name: "Cuadrado 50 x 50 x 3mm",
        type: "Perfiles Cerrados",
        brand: "Genérico",
        price: 20590
      },
      {
        name: "Cuadrado 100 x 100 x 3mm",
        type: "Perfiles Cerrados",
        brand: "Genérico",
        price: 45040
      },
      {
        name: "Cuadrado 100 x 100 x 4mm",
        type: "Perfiles Cerrados",
        brand: "Genérico",
        price: 58740
      },
      {
        name: "Rectangulos 100 x 50 x 2mm",
        type: "Perfiles Cerrados",
        brand: "Genérico",
        price: 21210
      },
      {
        name: "Rectangulos 100 x 50 x 3mm",
        type: "Perfiles Cerrados",
        brand: "Genérico",
        price: 30390
      },
      {
        name: "Rectangulos 200 x 100 x 3mm",
        type: "Perfiles Cerrados",
        brand: "Genérico",
        price: 26990
      }
    ];
    dataInsert = [];
    await values.forEach(async data => {
      let type = types.find(val => val.name === data.type);
      delete data.type;
      dataInsert.push(
        Object.assign({}, data, {
          type_id: type.id,
          created_at: new Date(),
          updated_at: new Date()
        })
      );
    });
    await queryInterface.bulkInsert("materials", dataInsert, {
      returning: true,
      validate: true
    });

    // Tipos de maquinaria
    types = [
      {
        name: "Grua"
      },
      {
        name: "Elevador"
      }
    ];
    dataTypes = [];
    types.forEach(data => {
      dataTypes.push(
        Object.assign({}, data, {
          created_at: new Date(),
          updated_at: new Date()
        })
      );
    });
    await queryInterface.bulkInsert("machine_types", dataTypes, {
      returning: true,
      validate: true
    });

    // Maquinaria Todos en base a horas usadas.
    // Las gruas se calculan precioTotal = TON * precio * hora
    // Las demas se calculan precioTotal = precio * hora
    values = [
      {
        name: "Elevadores Personales",
        price: 1000000,
        type: "Elevador"
      },
      {
        name: "Camión pluma",
        price: 25000,
        type: "Grua"
      },
      {
        name: "Grua Hidraulica",
        price: 1000,
        type: "Grua",
        weight: 20,
        weight_type: "TON"
      },
      {
        name: "Grua Horquilla",
        type: "Grua",
        price: 500,
        weight: 5,
        weight_type: "TON"
      }
    ];
    dataInsert = [];
    types = [
      {
        name: "Grua",
        id: 1
      },
      {
        name: "Elevador",
        id: 2
      }
    ];
    await values.forEach(data => {
      let type = types.find(val => val.name === data.type);
      delete data.type;
      dataInsert.push(
        Object.assign({}, data, {
          type_id: type.id,
          created_at: new Date(),
          updated_at: new Date()
        })
      );
    });
    await queryInterface.bulkInsert("machines", dataInsert, {
      returning: true,
      validate: true
    });

    dataInsert = [];
    let workers = [
      {
        first_name: "Ignacio",
        last_name: "Yanjari",
        rut: "192098327",
        phone: "89628842"
      },
      {
        first_name: "Jorge",
        last_name: "Huerta",
        rut: "178121936",
        phone: "89628843"
      },
      {
        first_name: "Fabian",
        last_name: "Miranda",
        rut: "168121936",
        phone: "89628823"
      }
    ];
    await workers.forEach(data => {
      dataInsert.push(
        Object.assign({}, data, {
          created_at: new Date(),
          updated_at: new Date()
        })
      );
    });

    await queryInterface.bulkInsert("workers", dataInsert, {
      returning: true,
      validate: true
    });

    const users = await queryInterface.sequelize.query(`SELECT id from users;`);

    let usersIds = users[0],
      dataProfiles = [];

    // Perfiles administrador para todos los usuarios
    usersIds.forEach(async user => {
      let aux = {
        user_id: user.id,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      };
      dataProfiles.push(aux);
    });

    return queryInterface.bulkInsert("profiles", dataProfiles, {
      returning: true,
      validate: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("roles", null, {});
    await queryInterface.bulkDelete("client_types", null, {});
    await queryInterface.bulkDelete("tender_types", null, {});
    await queryInterface.bulkDelete("work_types", null, {});
    await queryInterface.bulkDelete("workforce_types", null, {});
    await queryInterface.bulkDelete("supply_types", null, {});
    await queryInterface.bulkDelete("material_types", null, {});
    await queryInterface.bulkDelete("supplies", null, {});
    await queryInterface.bulkDelete("materials", null, {});
    await queryInterface.bulkDelete("machines", null, {});
    await queryInterface.bulkDelete("workers", null, {});
    return queryInterface.bulkDelete("profiles", null, {});
  }
};
