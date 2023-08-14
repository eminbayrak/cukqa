import { createRouter } from "./context";
import { z } from "zod";
import { now } from "next-auth/client/_utils";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example?.findMany();
    },
  })
  // .query("question", {
  //   input: z
  //     .object({
  //       title: z.string(),
  //       subTitle: z?.string(),
  //     }),
  //   async resolve({ input, ctx }) {
  //     return await ctx.prisma.questions.create({
  //       data: {
  //         title: "awesome",
  //         subTitle: input?.subTitle
  //       },
  //     })
  //   },
  // })

  .query("user", {
    input: z
      .object({
        title: z.string(),
        subTitle: z?.string(),
      }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.user.create({
        data: {
          name: "awesome",
          email: "email@email.com",
          emailVerified: new Date(),
          image: "",
        },
      })
    },
  })
