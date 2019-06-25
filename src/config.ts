export default {
  node: {
    starter: 'node',
    configFiles: {
      'default.babelrc': '.babelrc',
      'default.eslintignore': '.eslintignore',
      'default.eslintrc': '.eslintrc',
      'default.gitignore': '.gitignore',
      'default.npmignore': '.npmignore',
      'default.prettierignore': '.prettierignore',
      'default.tsconfig.json': 'tsconfig.json',
      'default.tslint.json': 'tslint.json',
    },
    mkdir: ['.vscode', 'lib', 'src', 'node_modules'],
    seedFiles: {
      '.vscode/settings.json':
        '{\r\n  //Using double space as tab\r\n  "editor.tabSize": 2,\r\n  //Prettier will use single quote on string\r\n  "prettier.singleQuote": true,\r\n  //Prettier will use tabs set up above\r\n  "prettier.useTabs": true,\r\n  //Prettier will adjust rule based on eslint\r\n  "prettier.eslintIntegration": true,\r\n  //formate on save trigger\r\n  "editor.formatOnSave": true,\r\n  "editor.scrollBeyondLastLine": false,\r\n  "files.insertFinalNewline": true\r\n}\r\n',
      // tslint:disable-next-line: quotemark
      'src/main.ts': "console.log('Hello World');\n",
    },
    packages: [],
    devPackages: [
      // babel
      '@babel/core',
      '@babel/cli',
      '@babel/preset-env',
      '@babel/preset-typescript',

      // typescript
      'typescript',
      'tslint',
      'tslint-react',
      'tslint-config-prettier',

      // eslint
      // Using specific version because of compatibility issue
      'eslint@^5.4.0',
      'eslint-config-airbnb@^17.1.0',
      'eslint-config-prettier@^3.0.1',
      'eslint-import-resolver-typescript@^1.1.1',
      'eslint-plugin-import@^2.14.0',
      'eslint-plugin-jsx-a11y@^6.1.1',
      'eslint-plugin-react@^7.11.0',

      // code formatting
      'prettier',

      // testing
      'jest',

      // others
      'nodemon',
    ],
  },
};
