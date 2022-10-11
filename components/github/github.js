export const Github = async (query, variables) => {
  const NEXT_PUBLIC_GITHUB_AUTH_TOKEN = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${NEXT_PUBLIC_GITHUB_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables,
    }),
  })

  return await res.json()
}
