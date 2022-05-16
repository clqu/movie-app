import Card from "./Card"

export default function CardGroup({ seeMore = true, value = "movies", cardTypes = "vertical", gridClass, data, title }) {
  return data?.length > 0 && (
    <>
    <div className="w-full flex items-center justify-between">
        <p className="text-xl text-black font-semibold">{title}</p>
        {seeMore && (
          <p className="hidden lg:block text-md font-normal text-blue-600 hover:underline cursor-pointer">See more</p>
        )}
    </div>
    <div className={gridClass}>
        {(data || [])?.map((a, index) => (
            <Card value={value} type={cardTypes} key={index} movie={a} />
        ))}
    </div>
    </>
  )
}