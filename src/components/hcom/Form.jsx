import { useState } from "react";
import Filter from "./Filter";

function Form({ data, titleSubmit, onCancel, onSubmit, titleForm }) {
    const [requestData, setRequestData] = useState(() => {
        return Object.keys(data).reduce((pre, current, key) => {
            return {
                ...pre,
                [current]: data[current].type !== 'selection' ? data[current].data : data[current].value.value
            }
        }, {});
    }); 

    const onFilterData = (selectedOption, key) => {
        setRequestData(prevState => ({
            ...prevState,
            [key]: selectedOption.value
        }));
    }

    function onChange(e, key) {
        setRequestData(prevState => ({
            ...prevState,
            [key]: e.target.value
        }));
    }

    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-blur z-10 flex items-center justify-center">
            <div className="h-fit w-[500px] bg-white rounded-xl shadow-sm">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className={
                        "flex flex-col py-4 px-8 justify-start items-center border-2 border-gray-100 gap-4 h-full w-full"
                    }
                >
                    <h1 className="text-[50px] font-bold">{titleForm}</h1>
                    <div className="flex flex-col h-fit w-full gap-4">
                        {
                            Object.keys(data).map((key, index) => {
                                return (
                                    <div key={index} className="flex flex-col w-full gap-2">
                                        <label className="text-[20px] font-bold">{key}</label>
                                        {
                                            data[key].type !== 'selection' ? (
                                                <input 
                                                    className="h-10 w-full border-2 border-gray-300 rounded-[8px] p-2"
                                                    type={data[key].type} value={requestData[key]}
                                                    onChange={(e) => onChange(e, key)}
                                                    disabled={key === 'id'}
                                                    />
                                            ) :
                                            <Filter options={data[key].data} defaultValue={data[key].value} onChange={(selectedOption) => onFilterData(selectedOption, key)}/>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex gap-10 justify-center items-center w-full">
                        <button
                            className="bg-red-500 h-10 rounded-[8px] text-white hover:bg-red-700 px-4"
                            onClick={() => onCancel()}
                            type="button">
                            Cancel
                        </button>
                        <button
                            className="bg-green-500 h-10 rounded-[8px] text-white hover:bg-green-700 px-4"
                            onClick={() => onSubmit(requestData)}
                            type="button">
                            {titleSubmit}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;