import { BlitzPage, useMutation, invalidateQuery } from "blitz"
import { useState } from "react"
import { Button, Flex, VStack } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import createPostMutation from "app/posts/mutations/createPost"
import { Input } from "app/core/components/Input"
import { Textarea } from "app/core/components/TextArea"
import Layout from "app/core/layouts/Layout"

import * as Yup from "yup"
import { useRouter } from "next/router"
import getPosts from "app/posts/queries/getPosts"

const schema = Yup.object({
  title: Yup.string().required(),
  content: Yup.string().max(20).required(),
})

type FormData = Yup.InferType<typeof schema>

const CreatePost: BlitzPage = () => {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const [createPost] = useMutation(createPostMutation, {
    onSuccess() {
      router.push("/posts/")
      invalidateQuery(getPosts)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      content: "",
    },

    resolver: yupResolver(schema),
  })

  const handleCreatePost = async (formData: FormData) => {
    try {
      setLoading(true)
      const post = await createPost(formData)

      console.log(post)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex flexDir="column" align="center">
      <VStack spacing="5">
        <Input
          label="title"
          type="text"
          error={errors.title?.message}
          {...register("title")}
          isRequired
        />
        <Textarea
          label="content"
          isRequired
          error={errors.content?.message}
          {...register("content")}
        />
        <Button isLoading={loading} onClick={handleSubmit(handleCreatePost)}>
          Criar post
        </Button>
      </VStack>
    </Flex>
  )
}

CreatePost.suppressFirstRenderFlicker = true

CreatePost.authenticate = true

CreatePost.getLayout = (page) => <Layout>{page}</Layout>

export default CreatePost
