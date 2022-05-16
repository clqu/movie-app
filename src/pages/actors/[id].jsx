import { AiFillStar } from "react-icons/ai"
import { BsFillPlayFill } from "react-icons/bs"
import WatchTrailer from "../../components/Global/WatchTrailer";
import CardGroup from "../../components/Static/CardGroup";
import Router from 'next/router'
import { NextSeo } from 'next-seo';

function Movie({ data, movies }) {
    const backdropImage = data?.credits?.cast?.[0]?.backdrop_path ? ("https://image.tmdb.org/t/p/original" + data?.credits?.cast?.[0]?.backdrop_path) : '/no-image.svg';
    const verticalImage = data?.profile_path ? ("https://image.tmdb.org/t/p/w500" + data?.profile_path) : '/no-image.svg';

    const latestTrailer = data?.videos?.results?.filter((video) => video.official === true && video.type === "Trailer")?.[0];

    return <>
        <NextSeo
            title={`${data?.name} | Actor | Movie App`}
            description={data?.biography}
        />
        <div style={{ zIndex: '-1', "--card-banner": 'url(' + backdropImage + ')' }} className="absolute left-0 top-0 hero-image w-full h-[40rem] text-white">
            <div className="flex items-center justify-center w-full gap-4 h-full">

                <div className="text-black lg:text-white px-6 xl:px-0 max-w-7xl w-full flex flex-col lg:flex-row items-center gap-8 pt-56 lg:pt-0" >
                    <div className="bg-black shadow-xl w-72 h-72 rounded-full relative overflow-hidden">
                        <img className="absolute w-72  h-96 -top-6 shadow-xl" src={verticalImage} />
                    </div>
                    <div className="text-center lg:text-left">
                        <p className="font-semibold text-4xl">{data?.name}</p>
                        <div className="flex justify-center lg:justify-start items-center gap-4">
                            <div className="text-center">{data?.known_for_department}, {data?.place_of_birth}</div>
                        </div>
                        <p className="font-medium text-md opacity-75">{data?.overview}</p>
                    </div>
                </div>
            </div>

            <div className="mt-56 lg:mt-5 flex items-center justify-center w-full">
                <div className="max-w-7xl w-full py-4 pb-24 px-8 xl:px-0 space-y-24">
                    <div>
                        <p className="text-xl text-black font-semibold">Biography</p>
                        <p className="text-zinc-600 mt-4">{data?.biography}</p>
                    </div>
                    <div>
                        <p className="text-xl text-black font-semibold">Also Known As</p>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-5">
                            {data?.also_known_as?.map((i, idx) => (
                                <p className="text-zinc-600">{i}</p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <CardGroup seeMore={false} value="movies" cardTypes='horizontal' gridClass="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-6 mt-4" title="Known For" data={movies?.cast?.slice(0, 14)} />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export async function getServerSideProps(ctx) {
    const _result = await (await fetch(`https://api.themoviedb.org/3/person/${ctx?.query?.id}?api_key=3044afc915e1301ae1d9551614db3711&append_to_response=videos,credits,reviews`).then(r => r.json()));
    const _cast = await (await fetch(`https://api.themoviedb.org/3/person/${ctx?.query?.id}/movie_credits?api_key=3044afc915e1301ae1d9551614db3711&append_to_response=videos,credits,reviews`).then(r => r.json()));
    if (_result?.status_code === 34) {
        if (ctx?.res) {
            ctx?.res.writeHead(307, { Location: '/' })
            ctx?.res.end()
        } else {
            Router.replace('/')
        }
    }
    return {
        props: {
            data: _result,
            movies: _cast
        },
    }
}

export default Movie;