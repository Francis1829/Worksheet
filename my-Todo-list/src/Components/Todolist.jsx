import React, { useEffect, useRef, useState } from 'react'
import pic from '../assets/Todolist.png'
import { supabase } from './SupabaseClient'
import {FiTrash2} from 'react-icons/fi'
import { FaCheckCircle } from "react-icons/fa";


function Todolist ({session}) {
        const [users, setUsers] = useState([]);
        const [feterror, setFeterror] = useState(null)


        const inputref = useRef();

        // For updating the task to not complete
        const UpdateTaskfalse = async (id) => {
            const {data, error}  = await supabase
                .from('Todo - list')
                .update({ complete: false })
                .eq('id', id)
                .select();
    
            if (!error) {
                setUsers((currentTask) => currentTask.map((task) => {
                    if(task.id === id) {    
                        task.complete = false;
                    }
                    return task;
                })) 
            } else {
                setFeterror(error)
            }
            console.log(data)
        };  


                 // For updating the task to complete
              const UpdateTask = async (id) => {
                    const {data, error}  = await supabase
                        .from('Todo - list')
                        .update({ complete: true })
                        .eq('id', id)
                        .select();
            
                    if (!error) {
                        setUsers((currentTask) => currentTask.map((task) => {
                            if(task.id === id) {    
                                task.complete = true;
                            }
                            return task;
                        })) 
                    } else {
                        setFeterror(error)
                    }
                    console.log(data)
                };  

                //  fetching the data from supabase 

                useEffect(() => {
                    const fetchTask = async () => {
                     const {data, error} = await supabase.from("Todo - list").select("*");
      
                     if(error) {
                      setFeterror("Error fetching!")
                      setUsers()
                      console.log(error)
                     }
                     if (data){
                      setUsers(data)
                      setFeterror(null)
                     }
                  };
                  fetchTask()
                    }, []) 

        // Logout to Todo-list app
    const logouts = async function signOut() {
      await supabase.auth.signOut()
      }
      

    //   Create new Task
      const createTask = async () =>{
        const Task = inputref.current.value

        const data = await supabase.from("Todo - list").insert({Task, user_id: session.id}).select("*").single();

        if(data) {
            setUsers((currentTask) => [...currentTask, data])
            inputref.current.value = "";
        }
      }

     
    //   Delete a task
    const deleteTask = async (id) => {
        const { data, error } = await supabase
            .from('Todo - list')
            .delete()
            .eq('id', id)
            .select();

            if (!error) {
                setUsers((currentTask) => currentTask.filter((task) =>
                task.id !== id
                ))
            }else {
                setFeterror(error)
            }
            console.log(users)
           
    };
    

  return (
    <>
   <main className='h-screen w-full bg-violet-400'>
    <header className='flex w-full justify-center relative'>
        <div className='cards h-[300px] w-[700px] bg-violet-600 mt-12 rounded-xl shadow-black/50 shadow-xl p-10'>
            <div className='flex justify-between items-center'>
            <div className='flex items-center gap-3 px-5'>
                <h1 className='text-3xl text-black/80 tracking-wider'>Todo - list</h1>
                <img src={pic} alt="" width={70} />
            </div>
            <button onClick={logouts} className='w-[100px] h-[50px] text-white bg-black/90 text-xl rounded-md font-semibold border-2 border-black/90 hover:text-black/90 hover:bg-violet-600 hover:border-white duration-300 transition-all ease-in-out'>Logout</button>
            </div>
            <div className='flex w-full justify-center items-center my-10 gap-2'>
                <input ref={inputref} type="text" placeholder='Create Task Here!' className='outline-none w-[400px] h-[50px] rounded-lg px-4 py-2 text-2xl' />
                <button onClick={createTask}  className='w-[100px] h-[50px] text-white bg-black/90 text-xl rounded-md font-semibold border-2 border-black/90 hover:text-black/90 hover:bg-violet-600 hover:border-white duration-300 transition-all ease-in-out'>Add</button>
            </div>
        </div>

        <div className='w-[800px] absolute top-[17rem] rounded-xl bg-[#e8ebf7] shadow-black/50 shadow-2xl px-20 pb-10 pt-20'>
        {users.map((item) => (
                            <ul className='w-full flex flex-col gap-4' >
                                <div className='border-b border-black/10 flex justify-between items-center w-full'>
                                <li onClick={() => UpdateTaskfalse(item.id)} key={item.user_id} className='text-2xl font-mono font-bold py-4 cursor-pointer capitalize' style={{
                                    textDecoration: item.complete ? "line-through" : "",
                                    color: item.complete ? "#006636" : ""
                                }}>{item.Task}</li>
                                   
                                    <div className='flex gap-2'>
                              
                                <FaCheckCircle onClick={() => UpdateTask(item.id)} size={45} className="text-black p-2 bg-[#aeaeae] rounded-lg cursor-pointer hover:text-[#006636] hover:bg-[#f1f1f1] duration-300 transition-all ease-in-out shadow-sm shadow-black/50"  />
                                <FiTrash2 onClick={() => deleteTask(item.id)} size={45} className="text-black p-2 bg-[#aeaeae] rounded-lg cursor-pointer hover:text-[#bf184c] hover:bg-[#f1f1f1] duration-300 transition-all ease-in-out shadow-sm shadow-black/50" />
                                </div>
                                
                                </div>
                            </ul>
                        ))}
        </div>

    </header>
   </main>
   </>
  )
}

export default Todolist