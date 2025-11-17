import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  // Global JS/TS/Browser/Node globals
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },

  // JS rules
  pluginJs.configs.recommended,

  // TS rules
  ...tseslint.configs.recommended,

  // React rules for app code
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ...pluginReactConfig,
    settings: {
      react: {
        version: "detect", // Fixes React version warning
      },
    },
    rules: {
      ...pluginReactConfig.rules,
      "react/react-in-jsx-scope": "off", // React 17+
    },
  },

  // Test files (Jest + Detox) - fixed glob patterns
  {
    files: [
      "**/*.test.js", "**/*.test.jsx",
      "**/*.test.ts", "**/*.test.tsx",
      "**/*.spec.js", "**/*.spec.jsx",
      "**/*.spec.ts", "**/*.spec.tsx",
      "**/e2e/**/*.js", "**/e2e/**/*.ts", // Detox e2e tests
      "**/__tests__/**/*.js", "**/__tests__/**/*.jsx",
      "**/__tests__/**/*.ts", "**/__tests__/**/*.tsx"
    ],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        beforeEach: "readonly",
        afterAll: "readonly",
        afterEach: "readonly",
        jest: "readonly", // Added jest global
        device: "readonly", // Detox global
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/display-name": "off",
      "@typescript-eslint/no-require-imports": "off"
    },
  },
];