import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Handle unused variables and imports
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      "no-unused-vars": "off",

      // Handle any type
      "@typescript-eslint/no-explicit-any": "off",

      // Handle React hooks dependencies
      "react-hooks/exhaustive-deps": "warn",

      // Handle unescaped entities
      "react/no-unescaped-entities": "off",

      // Handle img element warnings
      "@next/next/no-img-element": "warn",

      // Handle const reassignment
      "prefer-const": "warn"
    }
  }
];

export default eslintConfig;
