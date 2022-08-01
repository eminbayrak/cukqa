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
    .query("getQuestionsByCategory", {
        input: z.object({
            categoryName: z.string()
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.question.findMany({
                where: {
                    categoryName: input?.categoryName
                },
                include: {
                    category: true,
                    author: {
                        select: {
                            image: true,
                            name: true
                        }
                    }
                }
            });
        }
    })
    .mutation("question", {
        input: z.object({
            title: z.string().min(5).max(150),
            content: z.string().min(20).max(300),
            email: z.string(),
            category: z.string(),
            categoryName: z.string(),
            imageUrl: z.string()
        }),
        async resolve({ input, ctx }) {
            const question = await ctx.prisma.question.create({
                data: {
                    title: input?.title,
                    content: input?.content,
                    imageUrl: input?.imageUrl,
                    categoryName: input?.categoryName,
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
                    category: {
                        create: {
                            category: input?.category
                        }
                    }
                },
                include: {
                    author: true,
                },
            });
            return { success: true, question: question };
        },
    });