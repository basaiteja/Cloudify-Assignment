import { useState } from 'react';
import { IoIosAdd } from "react-icons/io";

import Label1 from './Label1';
import Label2 from './Label2';


//-------------------------------initialize-values-for-options---------------------------------//
const initialOptions1 = [
  "Apple",
  "Mango",
  "Orange",
  "Banana",
  "Grapes",
  "Pineapple",
  "Strawberry",
  "Cherry"
];

const initialOptions2 = [
 "Carrot",
 "Cucumber",
 "Onion",
 "Pear",
 "Peach",
 "Beans",
 "Rice",
 "Broccoli",
 "Leek",
 "Corn"
];
//--------------------------------------------------------------------------------------------------------------------------//

export default function Table() {

//--------------------------------------------states------------------------------------------------------------------------------//
  
const [rows, setRows] = useState([ { id: 1, label1: '', label2: [] }]); //rows data

const [options2, setOptions2] = useState(initialOptions2);//for lable 2 options initital values

const [openDropdowns, setOpenDropdowns] = useState({1: { label1: false, label2: false }});// for dropdowns open close

//-----------------------------------------------------------------------------------------------------------------------------//

//-----------------for lable 1 filter single select dropdown to select options from a static list----------------------------//
  const getAvailableOptions1 =  
     (currentRowId) => {
                        const usedOptions = rows.filter(row => row.id !== currentRowId).map(row => row.label1);
                        return initialOptions1.filter(option => !usedOptions.includes(option));
                      };

//------------------------update the filter options-----------------------//
  const handleLabel1Change = (rowId, value) => {
    setRows(rows.map(row => 
      row.id === rowId ? { ...row, label1: value } : row
    ));
    toggleDropdown(rowId, 'label1');
  };


//--------------Toggles the selected dropdown into input box-------------------------------//

  const handleLabel2Change = (rowId, value) => {
    setRows(rows.map(row => {
      if (row.id === rowId) {
        const newValues = row.label2.includes(value)
          ? row.label2.filter(v => v !== value)
          : [...row.label2, value];
        return { ...row, label2: newValues };
      }
      return row;
    }));
  };

//-----------------for adding new row to table----------------------------//
  const addNewRow = () => {
    const newId = Math.max(...rows.map(r => r.id)) + 1;  

    setRows([...rows, { id: newId, label1: '', label2: [] }]);

    setOpenDropdowns(prev => ({ ...prev,[newId]: { label1: false, label2: false }}));
  };

//-----------------for closing and opening dropdowns----------------------------//
  const toggleDropdown = (rowId, field) => {
    setOpenDropdowns(prev => {
      const newState = { ...prev };
      
      Object.keys(newState).forEach(key => {
        newState[parseInt(key)] = { label1: false, label2: false };
      });
      
      newState[rowId] = {
        ...newState[rowId],
        [field]: !prev[rowId]?.[field]
      };
      return newState;
    });
  };


//-----------------for adding new options to lable 2 dropdown----------------------------//
  const addNewOption2 = (value) => {
    if (value && !options2.includes(value)) {
      setOptions2([...options2, value]);
    }
  };

  

  return (
    <div className="w-full  max-w-7xl mx-auto p-6">
      <div className="bg-white  m-6 overflow-visible">
        <table className="w-full">
       
          <thead>
            <tr className="bg-gray-50">
              <th className="px-8 py-5 text-middle text-sm font-bold border border-gray-200 text-gray-800">Label 1</th>
              <th className="px-8 py-5 text-middle text-sm font-bold border border-gray-200 text-gray-800">Label 2</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row)=>

                  <tr key={row.id} className=' border  border-gray-200 ' >

                  {/* -----------------------------Label 1-------------------------------------------- */}
                  <td className="px-6 py-4 mx-auto   ">
                  <div className='flex justify-center '>
                  <Label1
                      value={row.label1}
                      options={getAvailableOptions1(row.id)}
                      isOpen={openDropdowns[row.id]?.label1}
                      onToggle={() => toggleDropdown(row.id, 'label1')}
                      onChange={(value) => handleLabel1Change(row.id, value)}
                    />
                  </div>
                  </td>
                  {/* -----------------------------Label 2-------------------------------------------- */}
                  <td className="px-6 py-4 border mx-auto  border-gray-200">
                  <div className='flex justify-center '>
                    <Label2
                      values={row.label2}
                      options={options2}
                      isOpen={openDropdowns[row.id]?.label2}
                      onToggle={() => toggleDropdown(row.id, 'label2')}
                      onChange={(value) => handleLabel2Change(row.id, value)}
                      onRemove={(value) => handleLabel2Change(row.id, value)}
                      onAddNewOption={addNewOption2}
                    />
                    </div>
                  </td>
                </tr>
    )}
          </tbody>
        </table>
      </div>

      {/* ---------------------------------------------Add New Row Button-------------------------------------------- */}

      <div className="w-full flex justify-end mt-4">
        <button onClick={addNewRow} className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 flex items-center">
          <IoIosAdd className='text-lg flex items-center justify-center' /> Add New Row
        </button>
      </div>


    </div>
  );
}