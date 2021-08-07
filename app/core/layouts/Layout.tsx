import { ReactNode } from "react"
import { Head } from "blitz"
import { Container, Flex } from "@chakra-ui/react"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "blog-post-blitz"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex h="100vh" w="100vw" justify="center" align="center">
        {children}
      </Flex>
    </>
  )
}

export default Layout
