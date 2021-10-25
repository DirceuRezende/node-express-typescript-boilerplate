module.exports = (plop) => {
  plop.setGenerator('module', {
    description: 'Create a module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your module name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/modules/{{pascalCase name}}/{{pascalCase name}}Controller.ts',
        templateFile: 'templates/ModuleController.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/modules/{{pascalCase name}}/{{pascalCase name}}Controller.spec.ts',
        templateFile: 'templates/ModuleController.spec.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/modules/{{pascalCase name}}/{{pascalCase name}}Service.ts',
        templateFile: 'templates/ModuleService.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/modules/{{pascalCase name}}/{{pascalCase name}}Service.spec.ts',
        templateFile: 'templates/ModuleService.spec.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/modules/{{pascalCase name}}/index.ts',
        templateFile: 'templates/index.ts.hbs',
      },
    ],
  })
}
