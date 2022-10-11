import Head from 'next/head'
import {GetOrganizations} from "../components/github/organization";
import {useEffect, useState} from "react";
import Image from 'next/image'

const Home = () => {
  const [data, setData] = useState({})
  const [organization, setOrganization] = useState({})
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    GetOrganizations().then(r => {
      setData(r.data)
      setOrganization(r.data.viewer.organization)
      setRepositories(r.data.viewer.organization.repositories.edges)
    })
  }, [])

  return (
    <div>
      <Head>
        <title>HOME | DISISM</title>
        <meta name="description" content={process.env.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {organization &&
          <section>
            <div>

              {organization.avatarUrl &&
                <Image
                  className="w-44 h-44 border-2"
                  src={organization.avatarUrl}
                  alt="avatar"
                  width={250}
                  height={250}
                />
              }

              <div>
                <h1 className="text-2xl font-bold">{organization.name}</h1>
                <h2 className="text-xl">{organization.description}</h2>
              </div>
              <div className="flex">
                <a className="mr-3 underline decoration-sky-500"
                   href={organization.websiteUrl}
                   target={`_blank`}
                >{organization.websiteUrl}</a>
                <a className="underline decoration-pink-500"
                   type="email"
                   href={`mailto:${organization.email}`}
                   target={`_blank`}
                >{organization.email}</a>
              </div>
            </div>

            <h1 className="text-lg font-bold">REPOSITORIES</h1>

            <section>
              <ul className="grid grid-cols-3 gap-2">
                {repositories && repositories.map((i, idx) => {
                  return (
                    <li
                    className="border-2 p-3 rounded-lg"
                      key={idx}>
                      <div>
                        <a
                          className="text-lg font-bold underline decoration-indigo-500/30"
                          href={i.node.url} target={`_blank`}>{i.node.name}</a>
                        <p>{i.node.description}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>

          </section>
        }
      </main>
    </div>
  )
}

export default Home