import '../styles/globals.css'
import {motion} from "framer-motion"
import {Header} from "../components/header";

const FooterText = ({name, url, hq, aff }) => {
  return (
    <p className="
         inline text-3xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
    ">{name} 💜 <a href={url} target={`_blank`}>{hq}</a> {aff} .</p>
  )
}

export const Layout = ({children}) => {
  return (
    <section className="p-9">


      <Header />
      {children}
      <footer className="
         font-serif
         flex flex-col
         grid-flow-row md:flex-row md:justify-between mt-16 mb-16 md:mb-12
         border-t-2 border-rose-800 pt-5 border-dotted
         ">
        <FooterText name="hvxahv" url="https://disism.com" hq="disism.com" aff="open source" />
      </footer>
    </section>
  )
}

const App = ({ Component, pageProps, router }) => {
  const ani = {
    pageInitial: {
      y: -200,
      opacity: 0
    },
    pageAnimate: {
      y: 0,
      opacity: 1
    },
  }

  return (
    <Layout>
      <motion.div key={router.route}
                  initial="pageInitial"
                  animate="pageAnimate"
                  variants={ani}
      >
        <Component {...pageProps} />
      </motion.div>
    </Layout>
  )
}

export default App