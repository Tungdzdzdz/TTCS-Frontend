function AddButton({ className, onClick}) {
    return (
      <button 
        onClick={() => onClick()}
        className={`rounded-md bg-green-700 text-white ${className}`}>Add</button>
    );
  }
  
  export default AddButton;