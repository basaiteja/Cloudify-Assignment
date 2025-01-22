import { IoIosClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function Label1({ 
  value, 
  options, 
  isOpen, 
  onToggle, 
  onChange 
}) 



{
  return (
    <div className="relative">
      <div 
        onClick={onToggle}
        className=" px-3 py-2  flex bg-white border border-gray-400 rounded-md  cursor-pointer items-center min-h-[38px]  min-w-[120px]  md:min-w-[250px] lg:min-w-[300px]"
      >
        {value ? (
          <div className="flex items-center bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-md">
            {value}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
              className="ml-1  text-gray-900 hover:text-gray-800 text-lg"
            >
              <IoIosClose />

            </button>
          </div>
        ) : (
          
          <div className="  ">

          <span className="text-gray-400 text-sm  flex items-center">Select Options  </span>
          <IoIosArrowDown className="absolute right-1 top-2 mt-1 text-gray-700 "/>
          </div> 
        )}
      </div>
      
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1  bg-white border rounded-md shadow-lg">
          <div className="max-h-[200px]  p-2 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option}
                className="flex  px-4 py-2 hover:bg-blue-600 hover:text-white rounded-md cursor-pointer"
                onClick={() => onChange(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}