import '../../public/styles/globals.css'
import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo.config';
import Header from '../components/Static/Header';
import { AiFillStar } from "react-icons/ai"
import { useRouter } from "next/router";

function MyApp({ Component, pageProps, data }) {
  const router = useRouter();

  return <>
    <DefaultSeo {...SEO} />
    <div className="lg:flex w-full py-6 p-6 gap-24 justify-center">
      <div className={`w-full max-w-7xl`}>
        <div className={`w-full ${router.pathname !== '/' && 'text-blue-500' && router.pathname !== '/search' && 'text-blue-500' && router.pathname !== '/about' && 'text-blue-500'}`}>
          <Header />
        </div>
        <Component {...pageProps} />
      </div>
      {router.pathname === '/' && (
        <div className="hidden lg:block w-[30rem] h-[100%] space-y-4 bg-[#101010]/5 p-4 rounded-xl">
          {data.slice(0, 7).map((item, index) => (
            index === 0 ? (
              <div className="bg-white rounded-lg">
                <img className="rounded-b-2xl rounded-t-lg w-full" src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} />
                <div className="flex gap-8 p-4 justify-between w-full">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="flex items-center gap-1"><AiFillStar className="text-yellow-500" />{item.vote_average}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-between gap-4 px-3 h-16">
                <img width="72" className="flex-shrink-0 rounded-md shadow-xl w-16 h-16" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
                <div className="flex w-full flex-col h-full justify-center">
                  <div><p className="text-xs opacity-75">{index + 1}</p></div>
                  <div className="flex flex-col justify-start">
                    <p className="text-xs flex font-medium">{item.title}</p>
                  </div>
                </div>
                <p className="flex items-center gap-1"><AiFillStar className="text-yellow-500" />{item.vote_average}</p>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  </>
}

MyApp.getInitialProps = async (ctx) => {
  const data = await (await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=3044afc915e1301ae1d9551614db3711').then(r => r.json())).results;
  return {
    data
  }
}

export default MyApp
