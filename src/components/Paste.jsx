// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { removeFromPastes } from '../redux/pasteSlice';
// import toast from 'react-hot-toast';


// const Paste = () => {

//   const pastes = useSelector((state) =>
//     state.paste.pastes);
//   const [searchTerm, setSearchTerm] = useState('')
//   const dispatch = useDispatch();

//   const filterData = pastes.filter(
//     (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   function handleDelete(pasteId) {
//     alert("Item deleted soon");
//     dispatch(removeFromPastes(pasteId));
//   }

//   return (
//     <div>
//       <input
//         className="p-2 border-2 rounded-2xl min-w-[600px] mt-5 mb-5"
//         type="text"
//         placeholder='Search here'
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <div className='flex flex-col gap-5'>
//         {
//           filterData.length > 0 &&
//           filterData.map((paste, i) => {
//             return (
//               <div className='border-2 mt-2 rounded-2xl' key={i}>
//                 {paste.title !== "" ? <h2>{paste?.title}</h2> : null}

//                 <div>
//                   {paste?.content}
//                 </div>

//                 <div className='flex justify-evenly'>
//                   <button>
//                     {/* <a href={`/?pasteId=${paste?._id}`} target="_blank">
//                       Edit
//                     </a> */}
//                     <a href={`/?pasteId=${paste?._id}`} target="_blank" rel="noopener noreferrer">
//                       View
//                     </a>
//                   </button>

//                   <button>
//                     {/* <a href={`/pastes/${paste?._id}`} target="_blank"> */}
//                     <a href={`/pastes/${paste?._id}`} target="_blank">
//                       View
//                     </a>
//                   </button>

//                   <button onClick={() => handleDelete(paste?._id)}>
//                     Delete
//                   </button>

//                   <button 
//                     onClick={() => {navigator.clipboard.writeText(paste?.content)
//                       toast.success("Copied to clipboard")
//                     }}>
//                     Copy
//                   </button>

//                   <button
//                     onClick={() => toast.error("Not working")}
//                   >
//                     Share
//                   </button>
//                 </div>

//                 <div>
//                   {paste.createdAt}
//                 </div>
//               </div>
//             )
//           }
//           )
//         }
//       </div>
//     </div>
//   )
// }

// export default Paste


import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast'

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes)
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  // filter pastes by title
  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // delete paste
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
    toast.success('Paste deleted successfully')
  }

  return (
    <div>
      {/* search bar */}
      <input
        className="p-2 border-2 rounded-2xl min-w-[600px] mt-5 mb-5"
        type="text"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* pastes list */}
      <div className="flex flex-col gap-5">
        {filterData.length > 0 &&
          filterData.map((paste, i) => {
            return (
              <div className="border-2 mt-2 rounded-2xl p-4" key={i}>
                {/* paste title */}
                {paste.title !== '' ? (
                  <h2 className="text-lg font-bold mb-2">{paste?.title}</h2>
                ) : null}

                {/* paste content */}
                <div className="mb-2">{paste?.content}</div>

                {/* action buttons */}
                <div className="flex justify-evenly gap-2 mt-3">
                  {/* edit */}
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>

                  {/* view (fixed to use query param viewId) */}
                  <button className="px-3 py-1 bg-green-500 text-white rounded-lg">
                    <a href={`/?viewId=${paste?._id}`} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </button>

                  {/* delete */}
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg"
                  >
                    Delete
                  </button>

                  {/* copy */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success('Copied to clipboard')
                    }}
                    className="px-3 py-1 bg-gray-500 text-white rounded-lg"
                  >
                    Copy
                  </button>

                  {/* share (not implemented yet) */}
                  <button
                    onClick={() => toast.error('Share feature not implemented yet')}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg"
                  >
                    Share
                  </button>
                </div>

                {/* created date */}
                <div className="text-sm text-gray-500 mt-3">{paste.createdAt}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Paste
