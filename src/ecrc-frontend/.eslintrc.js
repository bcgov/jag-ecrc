module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "prettier",
    "plugin:storybook/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "prettier"],
  ignorePatterns: ["node_modules/", "build/"],
  rules: {
    "import/no-unresolved": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-curly-brace-presence": "off",
    "prettier/prettier": ["error"],
    "react/forbid-prop-types": "warn"
  }
};
