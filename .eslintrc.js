module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: false,
    node: true,
    es6: true
  },
  extends: 'airbnb-base',
  globals: {
    "__DEV__": true,
    "__WECHAT__": true,
    "App": true,
    "Page": true,
    "Component": true,
    "wx": true,
    "my": true,
    "getApp": true
  },
  settings: {
    "import/resolver": {
      "webpack": {
        "config": "webpack.config.babel.js"
      }
    }
  },
  "rules": {
    // don"t require .vue extension when importing
    "import/extensions": ["error", "always", {
      'js': 'never',
      "vue": "never"
    }],
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "no-unused-vars":0,
    "no-use-before-define": ["error", { "functions": false, "classes": true }],
    "import/no-extraneous-dependencies": 0,
    "import/no-cycle": 0,
    "no-else-return": ["error", { "allowElseIf": true }],
    // "import/extensions": 0,
    // "import/no-unresolved": 0,
    "no-unused-expressions": 0,
    "prefer-spread": 0,
    "prefer-rest-params": 0,
    "no-console": process.env.NODE_ENV === "test" ? 2: 0,
    "no-param-reassign": 0,
    "camelcase": 0,
    "no-underscore-dangle": 0,
    // disable `template-curly-spacing` and `indent` checking for
    // https://github.com/babel/babel-eslint/issues/530
    "template-curly-spacing": 0,
    "indent": 0,
    "prefer-destructuring": ["error", {
      "array": false,
      "object": true
    }, {
      "enforceForRenamedProperties": false
    }]
  },
}
