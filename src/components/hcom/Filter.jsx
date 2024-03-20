import Select from 'react-select';

function Filter({ options, title }) {
    return (
        <div className="h-full w-fit">
            <Select className="min-w-[220px] bg-white" options={options} placeholder={title}/>
        </div>
    )
}

export default Filter;