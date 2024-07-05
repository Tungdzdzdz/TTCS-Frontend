import { forwardRef, useRef } from 'react';
import Select from 'react-select';

const Filter = forwardRef(({ options, title, onChange, defaultValue, className = ''}, ref) => {
    return (
        <div className="h-full w-fit">
            <Select 
                defaultValue={defaultValue ? defaultValue : options[0]}
                className={"min-w-[220px] bg-white" + className}
                options={options} 
                placeholder={title}
                onChange={(selectedOption) => onChange(selectedOption)}
                ref={ref}
                />
        </div>
    )
})

export default Filter;