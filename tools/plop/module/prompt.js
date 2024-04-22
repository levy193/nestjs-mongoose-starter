const { isNotEmpty } = require('../utils');

module.exports = {
  description: 'Generate Nest module',
  prompts: [
    {
      type: 'input',
      name: 'module',
      message: 'module name:',
      validate: isNotEmpty('module'),
    },
    {
      type: 'input',
      name: 'model',
      message: 'model name:',
      validate: isNotEmpty('model'),
    },
  ],
  actions: (data) => {
    const actions = [
      // module
      {
        type: 'add',
        path: `../../src/modules/${data.module}/${data.module}.module.ts`,
        templateFile: './module/module.hbs',
        data: data,
      },
      {
        type: 'add',
        path: `../../src/modules/${data.module}/index.ts`,
        templateFile: './module/module.index.hbs',
        data: data,
      },
      // controller
      {
        type: 'add',
        path: `../../src/modules/${data.module}/controllers/${data.module}.controller.ts`,
        templateFile: './module/controller.hbs',
        data: data,
      },
      {
        type: 'add',
        path: `../../src/modules/${data.module}/controllers/index.ts`,
        templateFile: './module/controller.index.hbs',
        data: data,
      },
      // service
      {
        type: 'add',
        path: `../../src/modules/${data.module}/services/${data.module}.service.ts`,
        templateFile: './module/service.hbs',
        data: data,
      },
      {
        type: 'add',
        path: `../../src/modules/${data.module}/services/index.ts`,
        templateFile: './module/service.index.hbs',
        data: data,
      },
      // model
      {
        type: 'add',
        path: `../../src/entities/main/${data.model}.schema.ts`,
        templateFile: './module/model.hbs',
        data: data,
      },
      {
        type: 'modify',
        path: `../../src/entities/main/index.ts`,
        pattern: /(\/\/ schemas)/g,
        template: `$1\nexport * from './${data.model}.schema';`,
      },
      // repository
      {
        type: 'add',
        path: `../../src/modules/${data.module}/repositories/${data.module}.repository.ts`,
        templateFile: './module/repository.hbs',
        data: data,
      },
      {
        type: 'add',
        path: `../../src/modules/${data.module}/repositories/index.ts`,
        template: `// repositories\n`,
      },
      {
        type: 'modify',
        path: `../../src/modules/${data.module}/repositories/index.ts`,
        pattern: /(\/\/ repositories)/g,
        template: `$1\nexport * from './${data.module}.repository';`,
      },
    ];
    return actions;
  },
};
