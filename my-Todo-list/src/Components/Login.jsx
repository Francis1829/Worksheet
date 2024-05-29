import React, { useEffect, useState } from 'react'
import { supabase } from './SupabaseClient'
import Todolist from './Todolist';

function Login() {

const logins = async() => {
    await supabase.auth.signInWithOAuth({
        provider: "github"
    })
};

const [session, setSession] = useState(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
     
    }, []); 
  return (
    <>
    <div className='flex justify-center items-center h-screen w-full bg-slate-600'>

        {session ? ( <Todolist session={session} /> ) : <button onClick={logins} className='w-[300px] h-[70px] text-white bg-black/90 text-xl rounded-md font-semibold border-2 border-black/90 hover:text-black/90 hover:bg-slate-600 hover:border-white duration-300 transition-all ease-in-out'>Login with Github</button>}
    </div>
    </>
  )
}

export default Login