export default function InputComponent({field, type, onChangeInput, valueInput}) {
    return (
        <div className="flex items-center">
            {type !== 'checkbox' && (
                <>
                    <label className="flex-initial w-[7rem]">{field}:</label>
                    <input
                        type={type}
                        placeholder={field}
                        className="border-2 border-gray p-2"
                        onChange={onChangeInput}
                        value={valueInput}
                    />
                </>
            )}
            {type ==='checkbox' && (
                <>
                    <label className="flex-initial w-[7rem]">{field}:</label>
                    <input
                        type={type}
                        className="mr-[255px] h-4 left-0"
                        onChange={onChangeInput}
                        value={valueInput}
                    />
                </>
            )}
        </div>
    )
}