module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  extends: [
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "prettier",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    // 0=disable 1=warning 2=error
    "prettier/prettier": [2, require("./prettier.config")],
    // "@typescript-eslint/explicit-function-return-type": 1,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/no-explicit-any": 2,
    "@typescript-eslint/no-empty-interface": 2,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-var-requires": 1,
    "@typescript-eslint/no-use-before-define": 2,
    "@typescript-eslint/type-annotation-spacing": 2,
    "@typescript-eslint/no-unused-vars": [2, { argsIgnorePattern: "^_" }],
    "@typescript-eslint/ban-ts-ignore": 0,
    "eqeqeq": [2, "smart"],
    "default-case": 0,
    "no-caller": 2,
    "no-case-declarations": 0,
    "no-console": [1, { allow: ["error", "info", "warn"] }],
    "no-debugger": 2,
    "no-eval": 2,
    "no-fallthrough": 2, // can be escaped with: /* falls through */
    "no-labels": 1,
    "no-redeclare": 2,
    "no-shadow": 2,
    "no-unused-expressions": 2,
    "radix": [2, "as-needed"],
    "no-restricted-syntax": [
      "error",
      {
        "selector": "CallExpression[callee.name!='parseInt'] > Identifier[name='parseInt']",
        "message": "Call parseInt directly to guarantee radix param is not incorrectly provided"
      },
      "error",
      {
        "selector": "CallExpression[callee.name!='parseFloat'] > Identifier[name='parseFloat']",
        "message": "Call parseFloat directly to guarantee radix param is not incorrectly provided"
      }
    ],
    "strict": [2, "global"],
    "valid-jsdoc": 2,
  },
};