function DeleteButton({ onClick , index}) {
  return (
    <button 
      onClick={() => onClick(index)}
      type="button" className="rounded-md bg-red-700 text-white h-full">Delete</button>
  );
}

export default DeleteButton;