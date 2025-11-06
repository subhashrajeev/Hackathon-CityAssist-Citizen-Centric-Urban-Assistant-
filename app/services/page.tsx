'use client'
import React, {useEffect, useState} from 'react'
export default function Services(){ const [list,setList]=useState([]); useEffect(()=>fetch('/data/services.json').then(r=>r.json()).then(setList),[])
  return (<div className="container mt-6"><h1 className="text-2xl font-bold">Local Services</h1><div className="mt-4 grid gap-4">{list.map((s:any)=>(<div key={s.id} className="card"><h3 className="font-semibold">{s.name}</h3><div className="text-slate-300">{s.type}</div><div className="mt-2 text-xs">Phone: {s.phone}</div></div>))}</div></div>) }
