import { likesRouter } from './like';
// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { questionRouter } from "./question";
import { categoryRouter } from "./category";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("question.", questionRouter)
  .merge("auth.", authRouter)
  .merge("category.", categoryRouter)
  .merge("like.", likesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
