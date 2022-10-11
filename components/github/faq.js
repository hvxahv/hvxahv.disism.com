import {Github} from "./github";

export const GetFAQ = async () => {
  return await Github(`
     {
    viewer {
    organization(login: "hvxahv") {
      id
      repository(name: "community") {
        id
        discussion(number: 2) {
          id
          bodyHTML
        }
      }
      }
     }
    }
  `)
}