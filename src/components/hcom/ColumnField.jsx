function ColumnField({ data }) {
    return (
        <div className="h-fit w-full flex">
            {
                data.map((e, i) => {
                    return (
                        <div className="flex items-center flex-1 p-2" key={`columnField${i}`}>
                            <h4>{e}</h4>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ColumnField;