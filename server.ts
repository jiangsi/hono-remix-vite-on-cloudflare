import type { RequestHandler } from '@remix-run/cloudflare'
import { type AppLoadContext } from '@remix-run/cloudflare'
import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { staticAssets } from 'remix-hono/cloudflare'
import { remix } from 'remix-hono/handler'
import { workerKVSession } from "remix-hono/cloudflare";
import { getSession } from "remix-hono/session";

const app = new Hono<{ Bindings: Env }>();

let handler: RequestHandler | undefined

app.use(poweredBy())
app.use(
	"*",
	workerKVSession({
		autoCommit: true, // same as in the session middleware
		cookie: {
			name: "session", // all cookie options as in createWorkerKVSessionStorage
			// In this function, you can access c.env to get the session secret
			secrets(c) {
				return [c.env.SECRET];
			},
		},
		// The name of the binding using for the KVNamespace
		binding: "kv",
	}),
);
app.get('/hono', async (c) => {
  const { kv } = c.env
  const honokv = await kv.put('hono', 'hono can access cloudflare kv')
  const value = await kv.get('hono')
  console.log(value)
  return c.text(`Hono kv is ok, value is ${value} ,\n My_var is ${c.env.MY_VAR}`)
})

app.get('/session-set', async (c) => {
  const session = await getSession(c);
  // use session object
  session.set('key', 'write a value in session');
  // return response
  return c.json({ message: 'Session updated' });
});

app.get('/session-get', async (c) => {
  const session = await getSession(c);
  // use session object
  const value = session.get('key')
  // return response
  return c.json({ session: value });
});



app.get('kvtest', async (c) => {
  const { kv } = c.env as Env
  await kv.put('key', 'aaa')
  const value = await kv.get('key')
  console.log(value)
  // return response
  return c.json({ value });
});

app.use(
  async (c, next) => {
    if (process.env.NODE_ENV !== 'development' || import.meta.env.PROD) {
      return staticAssets()(c, next)
    }
    await next()
  },
  async (c, next) => {
    if (process.env.NODE_ENV !== 'development' || import.meta.env.PROD) {
      const serverBuild = await import('./build/server')
      return remix({
        build: serverBuild,
        mode: 'production',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getLoadContext(c) {
          return {
            cloudflare: {
              env: c.env
            }
          }
        }
      })(c, next)
    } else {
      if (!handler) {
        // @ts-expect-error it's not typed
        const build = await import('virtual:remix/server-build')
        const { createRequestHandler } = await import('@remix-run/cloudflare')
        handler = createRequestHandler(build, 'development')
      }
      const remixContext = {
        cloudflare: {
          env: c.env
        }
      } as unknown as AppLoadContext
      return handler(c.req.raw, remixContext)
    }
  }
)


export default app;
