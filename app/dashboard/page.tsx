'use client'
import React from 'react'
export default function Dashboard(){ const user = typeof window!=='undefined' ? JSON.parse(localStorage.getItem('current_user')||'null') : null
  return (<div className="container mt-6"><h1 className="text-2xl font-bold">Dashboard</h1><p className="text-slate-300">Welcome {user?.name||'User'}</p><div className="mt-4 grid grid-cols-3 gap-4"><div className="card">Quick Actions<ul className="mt-2"><li><a href="/report" className="text-blue-400">Report Issue</a></li><li><a href="/services" className="text-blue-400">Find Services</a></li></ul></div><div className="card">Subscriptions<div className="mt-2 text-slate-300">No subscriptions yet</div></div><div className="card">Notifications<div className="mt-2 text-slate-300">None</div></div></div></div>) }
