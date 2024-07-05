import { BounceLoader } from "react-spinners";

function Loader()
{
    return (
        <div className="h-screen w-screen fixed z-10 top-0 left-0 right-0 bottom-0 flex justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                <BounceLoader color={"#37003c"} loading={true} size={100} />
        </div>
    )
}

export default Loader;