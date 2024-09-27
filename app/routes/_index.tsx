import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [{ title: 'Remix and Hono on Vite on Cloudflare pages' }]
}

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { env } = context.cloudflare;
  const { kv } = env as Env
  await kv.put('remix','remix can access cloudflare kv')
  const value = await kv.get('remix')
  console.log("at remix loader",value)
  return json({ myVar: env.MY_VAR,value })
}

export default function Index() {
  const { myVar,value } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>Welcome Remix and Hono on Vite on Cloudflare</h1>
      <p>you can use vite as you dev tools,and use remix as your framework,and use hono as your backend</p>
      <ul>
        <li>Remix, {value}</li>
        <li>myVar, {myVar}</li>
        <li>
          <a href="/hono">Hono</a>
        </li>
        <li>
          <a href="/session-set">session-set</a>
        </li>
        <li>
          <a href="/session-get">session-get</a>
        </li>
      </ul>
      <img src="/assets/hono-logo.png" />
    </div>
  )
}
