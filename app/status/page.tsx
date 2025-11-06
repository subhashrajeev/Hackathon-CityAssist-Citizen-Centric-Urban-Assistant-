'use client'
import React, {useEffect, useState} from 'react'
export default function Status(){ const [services,setServices]=useState([]); useEffect(()=>fetch('/data/services.json').then(r=>r.json()).then(setServices),[])
  return (<div className="container mt-6"><h1 className="text-2xl font-bold">Service Status</h1><div className="mt-4 grid gap-4">{services.map((s:any)=>(<div key={s.id} className="card"><h3 className="font-semibold">{s.name}</h3><div className="text-slate-300">Type: {s.type}</div><div className="mt-2"><a href={`tel:${s.phone}`} className="text-blue-400">Call</a></div></div>))}</div></div>) }
