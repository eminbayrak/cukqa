import { TRPCError } from '@trpc/server';
import { createRouter } from "./context";

import { z } from "zod";


export const likesRouter = createRouter()
    .query("getAllLikesById", {
        input: z.object({
            questionId: z.string()
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.like?.findMany({
                where: {
                    questionId: input?.questionId
                },
                select: {
                    like: true,
                    email: true
                }
            });
        },
    })
    .mutation("addLike", {
        input: z.object({
            email: z.string(),
            like: z.boolean(),
            questionId: z.string()
        }),
        async resolve({ input, ctx }) {
            const like = await ctx.prisma.like.create({
                data: {
                    like: input.like,
                    questionId: input.questionId,
                    email: input.email,
                }
            });
            return { success: true, like: like }
        }
    })