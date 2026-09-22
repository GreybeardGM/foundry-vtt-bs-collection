import { registerEmilyMovesTokensFeature } from "./features/emily-schiebt-heimlich-tokens.js";

Hooks.once("init", () => {
  registerEmilyMovesTokensFeature();
});
