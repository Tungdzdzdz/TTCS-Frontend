function EditButton({index, onClick, className})
{
    return (
        <button 
            onClick={() => onClick(index)}
            type="button" 
            className={`rounded-md bg-blue-700 text-white ${className}`}>Edit</button>
    )
}

export default EditButton;