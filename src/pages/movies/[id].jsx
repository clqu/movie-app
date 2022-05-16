import { AiFillStar } from "react-icons/ai"
import { BsFillPlayFill } from "react-icons/bs"
import WatchTrailer from "../../components/Global/WatchTrailer";
import CardGroup from "../../components/Static/CardGroup";
import Router from 'next/router'
import { NextSeo } from 'next-seo';

function Movie({ data }) {
    const backdropImage = data?.backdrop_path ? ("https://image.tmdb.org/t/p/original" + data?.backdrop_path) : '/no-image.svg';
    const verticalImage = data?.poster_path ? ("https://image.tmdb.org/t/p/w400" + data?.poster_path) : '/no-image.svg';

    const latestTrailer = data?.videos?.results?.filter((video) => video.official === true && video.type === "Trailer")?.[0];

    return <>
        <NextSeo
            title={`${data?.original_title} | Movies | Movie App`}
            description={data?.overview}
        />
        <div style={{ zIndex: '-1', "--card-banner": 'url(' + backdropImage + ')' }} className="absolute left-0 top-0 hero-image w-full h-[40rem] text-white">
            <div className="flex items-center justify-center w-full gap-4 h-full">

                <div className="text-black lg:text-white px-6 xl:px-0 max-w-7xl w-full flex flex-col lg:flex-row items-center gap-8 pt-56 lg:pt-0" >
                    <img className="rounded-lg shadow-xl w-72" src={verticalImage} />
                    <div className="text-center lg:text-left">
                        <p className="font-semibold text-4xl">{data?.original_title}</p>
                        <div className="flex justify-center lg:justify-start items-center gap-4">
                            <div className="text-center">{data?.release_date?.split('-')[0]}</div>
                            <div><p className="flex items-center gap-1"><AiFillStar className="text-yellow-500" />{data?.vote_average}</p></div>
                            <div className="text-center">{data?.genres?.[0]?.name}</div>
                            {data?.homepage && (
                                <div>
                                    <a target="_blank" className="text-blue-600 lg:text-blue-200 underline" href={data?.homepage}>
                                        Homepage
                                    </a>
                                </div>
                            )}
                        </div>
                        <p className="font-medium text-md opacity-75">{data?.overview}</p>

                        <div className="flex justify-center lg:justify-start items-center mt-4 gap-4">
                            {latestTrailer?.key && (
                                <WatchTrailer id={latestTrailer?.key}>
                                    <button className="h-12 outline-none ring-none shadow-xl border-2 border-black lg:border-white flex items-center gap-5 hover:bg-black/10 transition-all duration-200 px-3 py-3 rounded-full uppercase text-sm font-medium">
                                        <div className="bg-black lg:bg-white w-6 h-6 flex text-white lg:text-black items-center justify-center rounded-full">
                                            <BsFillPlayFill />
                                        </div>
                                        Watch Trailer
                                    </button>
                                </WatchTrailer>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-56 lg:mt-5 flex items-center justify-center w-full">
                <div className="max-w-7xl w-full py-4 pb-24 px-8 xl:px-0 space-y-24">
                    <div>
                        <CardGroup seeMore={false} value="actors" cardTypes='horizontal' gridClass="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-6 mt-4" title="Cast" data={data?.credits?.cast?.slice(0, 14)} />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export async function getServerSideProps(ctx) {
    const _result = await (await fetch(`https://api.themoviedb.org/3/movie/${ctx?.query?.id}?api_key=3044afc915e1301ae1d9551614db3711&append_to_response=videos,credits,reviews`).then(r => r.json()));
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
            data: _result
        },
    }
}

export default Movie;