import Head from 'next/head'
import {getAllPosts} from "../../lib/post";
import Private from "../../lib/private";

const APIs = ({ allPosts }) => {

  return (
    <div>
      <Head>
        <title>APIs | DISISM</title>
        <meta name="description" content={process.env.description} />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <main>

        {allPosts && allPosts.map((i, idx) => {
          return (
            <div key={idx}>
              <Private title={i.title} slug={i.slug} />
            </div>
          )
        })}


      </main>

    </div>
  )
}


export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}

export default APIs