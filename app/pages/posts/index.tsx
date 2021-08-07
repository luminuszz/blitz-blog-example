import { Suspense } from "react"
import { BlitzPage, useRouter, useQuery } from "blitz"
import { Container, List, ListItem, Flex, Button } from "@chakra-ui/react"

import getPosts from "app/posts/queries/getPosts"

const Posts: BlitzPage = () => {
  const router = useRouter()

  const RenderPosts = () => {
    const [posts] = useQuery(getPosts, null)

    return (
      <List>
        {posts?.map((post) => (
          <>
            <ListItem key={post.id}>{post.title}</ListItem>
            <ListItem key={post.id}>{post.content}</ListItem>
          </>
        ))}
      </List>
    )
  }

  return (
    <Container>
      <Flex justify="center" align="center" flexDir="column">
        <Suspense fallback="Carregando...">
          <RenderPosts />
        </Suspense>

        <Button onClick={() => router.push("/posts/create")} mt="20">
          Criar post
        </Button>
      </Flex>
    </Container>
  )
}

export default Posts
