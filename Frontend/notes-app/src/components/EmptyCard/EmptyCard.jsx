/* eslint-disable react/prop-types */

const EmptyCard = ({ imgSrc , message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-0">
      <img src={imgSrc} alt="No Notes" className="w-[50%]" />
      <p className="w-1/2 text-lg font-semibold text-slate-700 text-center leading-7 mt-5" >
      {message}</p>
    </div>
  )
}

export default EmptyCard
