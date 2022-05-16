import Head from 'next/head'
import Image from 'next/image'
import { FiFilter } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import CardGroup from '../components/Static/CardGroup';

function Search({ data, query }) {
  return <>
    
    <div className="w-full py-24">
      <p className="text-4xl font-semibold">Millions of movies, TV shows and people to discover. Explore now.</p>
      <form action="/search">
        <div className="relative flex items-center w-full gap-4 mt-4">
          <input defaultValue={query} autoComplete='off' name="q" placeholder="Search for movies, series or actors..." className="border-2 border-zinc-600/0 focus:border-blue-600/75 focus:text-blue-600 transition-all duration-200 outline-none bg-zinc-500/10 w-full px-6 pr-16 py-4 rounded-lg" />
          <button as="button" type="submit" className='hover:bg-black/10 transition-all duration-200 p-5 rounded-r-lg text-xl absolute right-0 opacity-50'>
            <BsSearch />
          </button>
        </div>
      </form>
    </div>
    {query?.trim()?.length > 0 && (
      <div className="space-y-24">
        <div>
          <CardGroup seeMore={false} value="movies" cardTypes='horizontal' gridClass="grid grid-cols-6 gap-6 mt-4" title={"Movies " + `(${data.filter(a => a.media_type === "movie" && a.poster_path).length || 0})`} data={data.filter(a => a.media_type === "movie")} />
        </div>
        <div>
          <CardGroup seeMore={false} value="series" cardTypes='horizontal' gridClass="grid grid-cols-6 gap-6 mt-4" title={"Series " + `(${data.filter(a => a.media_type === "tv" && a.poster_path).length || 0})`} data={data.filter(a => a.media_type === "tv")} />
        </div>
        <div>
          <CardGroup seeMore={false} value="actors" cardTypes='horizontal' gridClass="grid grid-cols-6 gap-6 mt-4" title={"Actors " + `(${data.filter(a => a.media_type === "person").length || 0})`} data={data.filter(a => a.media_type === "person")} />
        </div>
      </div>
    )}
  </>
}

export async function getServerSideProps(ctx) {
	const _result = await (await fetch('https://api.themoviedb.org/3/search/multi?api_key=3044afc915e1301ae1d9551614db3711&query='+ctx?.query?.q || ctx?.query?.query).then(r => r.json()))?.results;

    return {
		props: {
			data: _result,
            query: (ctx?.query?.q || ctx?.query?.query || "")
		},
	}
}


export default Search;
