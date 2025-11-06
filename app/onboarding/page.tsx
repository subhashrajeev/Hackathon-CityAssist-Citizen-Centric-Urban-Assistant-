'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function Onboarding(){
  const router = useRouter()
  const [name,setName]=useState(''); const [age,setAge]=useState('')
  const submit = (e:any)=>{ e.preventDefault(); localStorage.setItem('profile', JSON.stringify({name,age})); router.push('/home') }
  return (
    <div className="container mt-8">
      <h1 className="text-2xl font-bold">Welcome to CityAssist</h1>
      <p className="mt-2 text-slate-300">Quick setup to personalise alerts</p>
      <form onSubmit={submit} className="mt-4 space-y-4">
        <input className="w-full p-2 rounded bg-slate-800" value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" required />
        <input className="w-full p-2 rounded bg-slate-800" value={age} onChange={e=>setAge(e.target.value)} placeholder="Age" type="number" />
        <button className="px-4 py-2 bg-emerald-600 rounded">Continue</button>
      </form>
    </div>
  )
}
