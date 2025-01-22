import React from 'react';
import { IoIosClose,IoIosArrowDown } from "react-icons/io";



export default function Lable2(
  {
  values,
  options,
  isOpen,
  onToggle,
  onChange,
  onRemove,
  onAddNewOption
  }
) {


  const [newOption, setNewOption] = React.useState('');


//---add new option -----------------------//
  const handleAddNewOption = (e) => {
    e.stopPropagation();
    if (newOption) {
      onAddNewOption(newOption);
      setNewOption('');
    }
  };

  return (


    <div className="relative">
      <div onClick={onToggle} className="w-full px-3 py-2 text-left bg-white border rounded-md shadow-sm cursor-pointer flex items-center justify-between min-h-[38px] min-w-[120px]  md:min-w-[250px] lg:min-w-[500px]">
      <div className="flex flex-wrap gap-1 min-h-[26px]">
        {values.map((value) => (
            <span key={value} className="inline-flex items-center bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-md" >
              {value}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(value);
                }}
                className="ml-1  text-gray-900 hover:text-gray-800 text-lg"
              >
                <IoIosClose />

              </button>
            </span>
          ))}
          
           <div className=" flex items-center  ">
                     <span className="text-gray-400 text-sm  flex items-center">Select Options  </span>
                     <IoIosArrowDown className=" absolute right-1  text-gray-700 "/>
          </div>
          
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1 bg-white border rounded-md shadow-lg">
          <div className="max-h-[200px] overflow-y-auto">
            {options.map((option) => (
              <label key={option} className="flex px-4 py-2 hover:bg-blue-600 hover:text-white rounded-md cursor-pointer" >
                <input
                  type="checkbox"
                  checked={values.includes(option)}
                  onChange={() => onChange(option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          <div className="border-t p-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add new item"
                className="flex-1 px-3 py-1 border rounded-md"
              />
              <button onClick={handleAddNewOption} className="px-3 py-1 bg-black text-white rounded-md hover:bg-gray-800 flex items-center">
                 Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}