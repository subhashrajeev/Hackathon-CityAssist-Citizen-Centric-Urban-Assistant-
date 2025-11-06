'use client'
import React, {useEffect, useState} from 'react'
export default function Reports(){ const [list,setList]=useState([]); useEffect(()=>setList(JSON.parse(localStorage.getItem('reports')||'[]')),[])
  return (<div className="container mt-6"><h1 className="text-2xl font-bold">Your Reports</h1><div className="mt-4 grid gap-4">{list.map((r:any)=>(<div key={r.id} className="card"><h3 className="font-semibold">{r.title}</h3><p className="text-slate-300">{r.desc}</p>{r.image && <img src={r.image} className="mt-2 w-60 h-40 object-cover"/>}<div className="mt-2 text-xs text-slate-400">{new Date(r.time).toLocaleString()}</div></div>))}</div></div>) }
