import { createRouter } from "./context";

import { z } from "zod";

export const categoryRouter = createRouter()
    .query("getAllCategoriesByName", {
        input: z.object({
            category: z.string()
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.category?.findMany({
                where: {
                    category: input?.category
                },
                select: {
                    category: true,
                    id: true
                }
            });
        }
    })