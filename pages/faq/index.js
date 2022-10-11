import Head from 'next/head'
import {useEffect, useState} from "react";
import {GetFAQ} from "../../components/github/faq";

const FAQ = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    GetFAQ().then(r => {
      setData(r.data.viewer.organization.repository.discussion)
      // setFAQ(r.data.viewer.organization)
    })
  }, [])

  return (
    <div>
      <Head>
        <title>Q&A | DISISM</title>
        <meta name="description" content={process.env.description} />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <main>


        {data && <div dangerouslySetInnerHTML={{__html: data.bodyHTML}} />}
      </main>

    </div>
  )
}

export default FAQ