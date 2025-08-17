import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';


const Paste = () => {

  const pastes = useSelector((state) =>
    state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch();

  const filterData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    alert("Item deleted soon");
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <input
        className="p-2 border-2 rounded-2xl min-w-[600px] mt-5 mb-5"
        type="text"
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-5'>
        {
          filterData.length > 0 &&
          filterData.map((paste, i) => {
            return (
              <div className='border-2 mt-2 rounded-2xl' key={i}>
                {paste.title !== "" ? <h2>{paste.title}</h2> : null}

                <div>
                  {paste.content}
                </div>

                <div className='flex justify-evenly'>
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>
                      Edit
                    </a>
                  </button>

                  <button>
                    <a href={`/pastes/${paste?._id}`} target="_blank">
                      View
                    </a>
                  </button>

                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>

                  <button 
                    onClick={() => {navigator.clipboard.writeText(paste?.content)
                      toast.success("Copied to clipboard")
                    }}>
                    Copy
                  </button>

                  <button>
                    Share
                  </button>
                </div>

                <div>
                  {paste.createdAt}
                </div>
              </div>
            )
          }
          )
        }
      </div>
    </div>
  )
}

export default Paste