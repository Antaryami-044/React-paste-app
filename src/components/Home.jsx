import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
 
    if(pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
    // navigate("/");
  };

  useEffect(() => {
    if(pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if(paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }

  }, [pasteId]);

  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>

        <input className='p-2 border-2 rounded-2xl mt-2'
              type="text"
              placeholder='Enter your title'
              value={title}
              onChange ={ (e) => setTitle(e.target.value)}
        />

        <button className='p-2 border-2 rounded-2xl mt-2' onClick={createPaste}>
          {
            pasteId ? "Update My Paste" : "Create My Paste"
          }
        </button>

        {pasteId &&  <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={resetPaste}
          >
            <PlusCircle size={20} />
          </button>}

      </div>

      <div className='mt-8 '>
        <textarea
          className='border-2 rounded-2xl mt-4 min-w-[500px] p-4'
          value = {value}
          placeholder='Enter Your Text'
          onChange ={ (e) => setValue(e.target.value)}
          rows={20}

        />
      </div>
    </div>
  )
}

export default Home