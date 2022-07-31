module.exports = {
    parser: "babel-eslint",
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true
    },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "prettier",
        "plugin:prettier/recommended"
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
    plugins: ["import"],
    rules: {
        "prettier/prettier": "error"
    }
};