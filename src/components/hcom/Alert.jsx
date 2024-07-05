import { LuAlertTriangle } from "react-icons/lu";
function Alert({title, onCancel, onConfirm}) {
  return (
    <div 
        className="fixed z-10 top-0 left-0 right-0 bottom-0 flex justify-center items-center" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
        <div className="w-[20rem] h-[15rem] border-2 border-gray rounded-lg shadow-lg flex flex-col justify-center items-center bg-white gap-5">
            <LuAlertTriangle className="text-yellow-500 w-[50px] h-[50px]"/>
            <h1 className="text-[20px] font-bold">{title}</h1>
            <div className="flex justify-around gap-5">
                <button 
                    className="h-10 w-20 bg-red-500 text-white rounded-lg"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button 
                    className="h-10 w-20 bg-green-500 text-white rounded-lg"
                    onClick={onConfirm}
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
  )
}

export default Alert;