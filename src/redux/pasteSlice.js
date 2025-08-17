import {createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


const initialState = {
      pastes: localStorage.getItem("pastes")
           ? JSON.parse(localStorage.getItem("pastes")) 
           : [],
}

export const pasteSlice = createSlice({
      name: 'Paste',
      initialState,
      reducers: {
            addToPastes: (state, action) => {
                  const paste = action.payload;
                  const index = state.pastes.findIndex((item) => item._id === paste._id)

                  if (index >= 0) {
                  // If the course is already in the Pastes, do not modify the quantity
                        toast.error("Paste already exist")
                        return
                  }

                  state.pastes.push(paste);
                  localStorage.setItem("pastes", JSON.stringify(state.pastes));
                  toast.success("Paste created successfully");
            },
            updateToPastes: (state, action) => {
                  const paste = action.payload;
                  const index = state.pastes.findIndex((item) => 
                  item._id === paste._id);

                  if(index >= 0) {
                        state.pastes[index] = paste;

                        localStorage.setItem("pastes", JSON.stringify(state.pastes));

                        toast.success("Paste updated");
                  }
            },
            removeFromPastes: (state, action) => {
                  const pasteId = String(action.payload);
                  console.log("Looking for ID:", pasteId);
                  console.log("All pastes:", state.pastes);

                  const index = state.pastes.findIndex(item => String(item._id) === pasteId);

                  if (index >= 0) {
                        state.pastes.splice(index, 1);
                        localStorage.setItem("pastes", JSON.stringify(state.pastes));
                        toast.success("Paste deleted");
                  } else {
                        toast.error("Paste not found");
                  }
            },

            resetAllPastes: (state, action) => {
                  const pasteId = [];
                  localStorage.setItem("pastes");
            },
      }
})

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes} =
      pasteSlice.actions

export default pasteSlice.reducer