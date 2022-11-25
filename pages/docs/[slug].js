import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '../../components/post/body'
import { getPostBySlug, getAllPosts } from '../../lib/post'
import Head from 'next/head'
import markdownToHtml from '../../lib/markdownToHtml'


const Post = ({ post, morePosts, preview }) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
        <article>
          <button onClick={() => router.push("/docs")}>BACK</button>
          <Head>
            <title>
              {post.title}
            </title>
          </Head>
          <h1>{post.title}</h1>
          <p>{post.date}</p>
          <p>{post.author}</p>
          <PostBody content={post.content} />
        </article>
  )
}

export default Post


export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}