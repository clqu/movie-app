import Head from 'next/head'
import Image from 'next/image'
import { FiFilter } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import CardGroup from '../components/Static/CardGroup';

function Home({ discoverMovies, trendingMovies, trendingTv, trendingActors}) {
  return <>
    
    <div className="w-full py-24">
      <p className="text-4xl font-semibold">Millions of movies, TV shows and people to discover. Explore now.</p>
      <form action="/search">
        <div className="relative flex items-center w-full gap-4 mt-4">
          <input autoComplete='off' name="q" placeholder="Search for movies, series or actors..." className="border-2 border-zinc-600/0 focus:border-blue-600/75 focus:text-blue-600 transition-all duration-200 outline-none bg-zinc-500/10 w-full px-6 pr-16 py-4 rounded-lg" />
          <button as="button" type="submit" className='hover:bg-black/10 transition-all duration-200 p-5 rounded-r-lg text-xl absolute right-0 opacity-50'>
            <BsSearch />
          </button>
        </div>
      </form>
    </div>
    <div className="space-y-24">
      <div>
        <CardGroup value="movies" cardTypes='hortical' gridClass="grid lg:grid-cols-3 gap-6 mt-4" title="Dont Miss Watching" data={discoverMovies.slice(0,3)} />
      </div>
      <div>
        <CardGroup value="actors" cardTypes='horizontal' gridClass="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 mt-4" title="Trending Actors" data={trendingActors.slice(0,5)} />
      </div>
      <div>
        <CardGroup value="movies" cardTypes='horizontal' gridClass="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 mt-4" title="Trending Movies" data={trendingMovies.slice(0,5)} />
      </div>
      <div>
        <CardGroup value="series" cardTypes='horizontal' gridClass="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 mt-4" title="Trending Series" data={trendingTv.slice(0,5)} />
      </div>
    </div>
  </>
}

export async function getServerSideProps() {
	const _discover = await (await fetch('https://api.themoviedb.org/3/discover/movie?api_key=3044afc915e1301ae1d9551614db3711').then(r => r.json()))?.results;
	const _trendingMovies = await (await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=3044afc915e1301ae1d9551614db3711').then(r => r.json()))?.results;
	const _trendingTv = await (await fetch('https://api.themoviedb.org/3/trending/tv/week?api_key=3044afc915e1301ae1d9551614db3711').then(r => r.json()))?.results;
	const _trendingActors = await (await fetch('https://api.themoviedb.org/3/trending/person/week?api_key=3044afc915e1301ae1d9551614db3711').then(r => r.json()))?.results;
	return {
		props: {
			discoverMovies: _discover,
			trendingMovies: _trendingMovies,
			trendingTv: _trendingTv,
      trendingActors: _trendingActors
		},
	}
}


export default Home;
