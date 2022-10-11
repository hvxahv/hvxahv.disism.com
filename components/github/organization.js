import {Github} from "./github";

export const GetOrganizations = async () => {
  return await Github(`
      query {
       viewer {
        bio
        name
        email
        avatarUrl
        organization(login: "hvxahv") {
          id
          name
          email
          description
          avatarUrl
          websiteUrl
          repositories(first: 40) {
            edges {
              node {
                id
                name
                description
                url
              }
            }
          }
        }
       }
      }
  `)
}