import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(async () => {
  const allPosts = await db.post.findMany()

  return allPosts
})
