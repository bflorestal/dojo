import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";
import reactCompiler from "eslint-plugin-react-compiler";

import baseConfig, { restrictEnvAccess } from "@dojo/eslint-config/base";
import reactConfig from "@dojo/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist"],
    plugins: {
      "react-compiler": reactCompiler,
    },
    rules: {
      "react-compiler/react-compiler": "error",
    },
  },
  ...pluginRouter.configs["flat/recommended"],
  ...pluginQuery.configs["flat/recommended"],
  ...baseConfig,
  ...reactConfig,
  ...restrictEnvAccess,
];
