import { resolver, Ctx } from "blitz"
import db, { Post } from "db"
import * as z from "zod"

export const CreatePostDTO = z.object({
  title: z.string(),
  content: z.string(),
})

export default resolver.pipe(resolver.zod(CreatePostDTO), async ({ content, title }, ctx: Ctx) => {
  ctx.session.$authorize()

  const userId = ctx.session.userId

  console.log(userId)

  const post = await db.post.create({
    data: { title, content },
  })

  return post
})
