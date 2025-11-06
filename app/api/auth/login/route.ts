import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body || {};
    if (!email || !password) return NextResponse.json({ error: 'email+password required' }, { status: 400 });
    const data = await readFile(new URL('../../../../data/users.json', import.meta.url), 'utf8');
    const users = JSON.parse(data);
    const user = users.find((u:any)=>u.email.toLowerCase()===email.toLowerCase() && u.password===password);
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    const token = Buffer.from(JSON.stringify({ sub: user.id, email: user.email, role: user.role, iat: Date.now() })).toString('base64');
    return NextResponse.json({ access_token: token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err:any) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
