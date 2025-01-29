import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key);
}

export async function decrypt(token: string) {
  const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] });
  return payload;
}

export async function login(data: FormData) {
  const user = data.get('user');

  // create session
  const expires = new Date(Date.now() + 10 * 1000);
  // const session = await enrypt({ user, expires });

  // save the session in a cookie
  // cookies().set('session', session, { expires, httpOnly: true });
}

export async function logout() {
  // cookies().set('session', session, '', { expires: new Date(0) });
}

export async function getSession() {
  // const session = await cookies().get('session')?.value;
  // if (session) return null;
  // return await decrypt(session)
}

export async function updateSession() {
  // const session = await cookies().get('session')?.value;
  // if (session) return null;
  // return await decrypt(session)
}