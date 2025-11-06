'use client'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
export default function ReportPage(){
  const router = useRouter()
  const [title,setTitle]=useState(''); const [desc,setDesc]=useState(''); const [zone,setZone]=useState(''); const [image,setImage]=useState<string|null>(null)
  const onFile = (e:any)=>{ const f=e.target.files?.[0]; if(!f) return; const reader=new FileReader(); reader.onload=()=>setImage(reader.result as string); reader.readAsDataURL(f); }
  const submit = (e:any)=>{ e.preventDefault(); const reports = JSON.parse(localStorage.getItem('reports')||'[]'); const id='R'+Date.now(); reports.push({id,title,desc,zone,image,time:new Date().toISOString()}); localStorage.setItem('reports',JSON.stringify(reports)); router.push('/reports') }
  return (
    <div className="container mt-6"><h1 className="text-2xl font-bold">Report an Issue</h1>
      <form onSubmit={submit} className="mt-4 space-y-4">
        <input required className="w-full p-2 rounded bg-slate-800" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Short title" />
        <textarea required className="w-full p-2 rounded bg-slate-800" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Describe the problem" rows={4}></textarea>
        <input className="w-full p-2 rounded bg-slate-800" value={zone} onChange={e=>setZone(e.target.value)} placeholder="Zone (e.g., Zone A)" />
        <input type="file" accept="image/*" onChange={onFile} />
        {image && <img src={image} alt="preview" className="mt-2 w-48 h-32 object-cover" />}
        <button className="px-4 py-2 bg-emerald-600 rounded">Submit</button>
      </form>
    </div>
  )
}
