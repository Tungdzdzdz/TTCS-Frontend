import { MdDelete } from "react-icons/md";
import Filter from "../hcom/Filter";
import { positionOptions } from "../hcom/FilterOptions";
import { useState } from "react";
import ReactSelect from "react-select";

function SelectPlayer({ onClose, optionPlayer, onChangePlayerFilter, data, onUnselectedPlayer, onChangePositionFilter, positions, optionCoach, onChangeCoachFilter, coach, numberJersey, dispatch, index}) {
    const [optionNumberJersey, setOptionNumberJersey] = useState(() => {
        return Array(99).fill(1).map((e, i) => i+1).filter((element, i) => {
            return numberJersey.indexOf(i + 1) === -1;
        }).map((e) => { return ({ label: e, value: e }) })
    });

    const onChangeNumberJersey = (optionSelected, playerIndex) => {
        var newOptionNumberJersey = [...optionNumberJersey]
        newOptionNumberJersey = newOptionNumberJersey.filter(e => e.value !== optionSelected.value)
        if(numberJersey[playerIndex]) 
            newOptionNumberJersey.push({ label: numberJersey[playerIndex], value: numberJersey[playerIndex] });
        newOptionNumberJersey.sort((a, b) => a.value - b.value);
        setOptionNumberJersey([...newOptionNumberJersey]);
        dispatch({ type: "CHANGE_NUMBERJERSEY", index: index, value: optionSelected.value, playerIndex: playerIndex });
    }

    return (
        <div className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
            <div className="h-[700px] w-[800px] flex flex-col bg-white rounded-xl p-4 gap-5">
                <h1 className="text-4xl text-center">Select Player</h1>
                <div className="h-fit w-full flex justify-between items-center">
                    <div className="h-fit w-fit flex items-center gap-2">
                        <label>Player</label>
                        <Filter options={optionPlayer} onChange={onChangePlayerFilter} />
                    </div>
                    <div className="h-fit w-fit flex items-center gap-2">
                        <label>Coach</label>
                        <Filter options={optionCoach} onChange={onChangeCoachFilter} defaultValue={!coach ? optionCoach[0] : { label: coach.name, value: coach.id }} />
                    </div>
                </div>
                <div className="flex flex-col w-full h-[480px] px-5 gap-4">
                    <div className="grid grid-cols-8 w-full h-fit gap-4">
                        <label className="col-span-3">Name</label>
                        <label className="col-span-2">Position</label>
                        <label className="col-span-2">Number</label>
                        <label>Delete</label>
                    </div>
                    <div className="w-full h-[400px] flex gap-4 flex-col overflow-y-scroll">
                        {
                            data.map((e, i) => {
                                return (
                                    <div key={i} className="grid grid-cols-8 w-full h-[40px] gap-4 border-b-2 border-solid border-gray-200 p-b-2">
                                        <div className="h-fit w-full col-span-3 flex items-center gap-2">
                                            <img src={e.img} alt={e.name} className="w-[30px] h-[30px] rounded-full" />
                                            <label className="">{e.name}</label>
                                        </div>
                                        <div className="col-span-2">
                                            <ReactSelect
                                                options={positionOptions}
                                                onChange={(optionSelected) => onChangePositionFilter(optionSelected, i)}
                                                defaultValue={positions[i] ? { value: positions[i].id, label: positions[i].name } : positionOptions[0]}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <ReactSelect
                                                options={optionNumberJersey}
                                                onChange={(optionSelected) => onChangeNumberJersey(optionSelected, i)}
                                                defaultValue={numberJersey[i] ? { value: numberJersey[i], label: numberJersey[i] } : {value: 0, label: "Not selected"}}
                                            />
                                        </div>
                                        <div
                                            className="flex justify-center"
                                            onClick={() => onUnselectedPlayer(i)}>
                                            <MdDelete className="text-3xl text-red-500 hover:cursor-pointer hover:text-red-700" />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="w-full h-fit flex items-center justify-center">
                    <button
                        className="h-[40px] w-[100px] bg-red-500 text-white rounded-lg hover:bg-red-700"
                        onClick={() => onClose()}
                    >Close</button>
                </div>
            </div>
        </div>
    )
}

export default SelectPlayer;