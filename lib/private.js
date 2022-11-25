import Link from 'next/link'


const PostPreview = ({
                       title,
                       coverImage,
                       date,
                       excerpt,
                       author,
                       slug,
                     }) => {
  return (
    <div>
      <h2 className="font-bold underline">
        <Link as={`/docs/${slug}`} href="/docs/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h2>
      <div className="text-lg mb-4">
        {/*<DateFormatter dateString={date} />*/}
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </div>
  )
}

export default PostPreview