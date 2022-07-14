import { createRouter } from "./context";

import { z } from "zod";


export const questionRouter = createRouter()
    .query("getAllQuestions", {
        async resolve({ ctx }) {
            return await ctx.prisma.question.findMany({
                include: {
                    author: {
                        select: {
                            image: true,
                            name: true
                        }
                    }
                }
            });
        },
    })
    .mutation("question", {
        input: z.object({
            title: z.string(),
            content: z.string(),
            email: z.string()
        }),
        async resolve({ input, ctx }) {
            const question = await ctx.prisma.question.create({
                data: {
                    title: input?.title,
                    content: input?.content,
                    author: {
                        connectOrCreate: {
                            create: {
                                email: input?.email,
                            },
                            where: {
                                email: input?.email,
                            },
                        },
                    },
                    // category: {
                    //     connectOrCreate: {
                    //         create: {

                    //         }
                    //     }
                    // }
                },
                include: {
                    author: true,
                },
            });
            return { success: true, question: question };
        },
    })

    // .query("getAllQuestions", {
    //     async resolve({ ctx }) {
    //         return await ctx.prisma.example.findMany();
    //     },
    // })