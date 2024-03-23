import Select from 'react-select';

function Filter({ options, title, onChange}) {
    return (
        <div className="h-full w-fit">
            <Select 
                className="min-w-[220px] bg-white"
                options={options} 
                placeholder={title}
                onChange={(selectedOption) => onChange(selectedOption)}
                />
        </div>
    )
}

export default Filter;