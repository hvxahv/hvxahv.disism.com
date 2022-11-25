import Link from "next/link";

const menu = [
  {
    "name": "HOME",
    "address": "/",
  },
  {
    "name": "DOCS",
    "address": "/docs",
  },
  {
    "name": "FAQ",
    "address": "/faq",
  }
]

export const Header = () => {
  return (
    <ul className="flex">
      {menu && menu.map((i, idx) => {
        return (
          <li className="mr-2
          font-semibold text-2xl text-neutral-200 text-slate-900 underline decoration-indigo-500/30 hover:text-red-400
          "
              key={idx}>
            <Link href={i.address}
            >{i.name}</Link>
          </li>
        )
      })}
    </ul>
  )
}