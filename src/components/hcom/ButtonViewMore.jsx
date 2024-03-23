function ButtonViewMore({ onClick }) {
    return (
        <div className="flex w-full h-[50px]">
            <button
                className="grow hover:bg-slate-100 hover:underline hover:cursor-pointer"
                onClick={onClick}
            >View more</button>
        </div>
    )
}

export default ButtonViewMore;