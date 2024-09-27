# hono remix vite on cloudflare

In this project, I'm trying to mount the Remix application on Hono and run it on Vite on Cloudflare Pages
Hono has a [custom Vite dev server](https://github.com/honojs/vite-plugins/tree/main/packages/dev-server), so if you run your Hono application on it and import the Remix Virtual Module, it should work.
thanks to [Yusuke Wada](https://github.com/yusukebe)

[remix](https://remix.run/) is so good framework for web development 

when I use remix on cloudflare pages, [remix on cloudflare pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/)
it has some question for me.

1. how to access assets ,such as favicon.ico ,css,js ,logo images
2. when remix start use cloudflare stack like kv ,r2 ,d1 ,is must use wranger dev tools,
remix vite:build && wranger dev pages
3. how to use seesion
4. how to use cloudflare api

and then I build this project and deploy to cloudflare pages

# feature

1. use remix on cloudflare pages
2. use hono on cloudflare pages
  base on [hono-and-remix-on-vite](https://github.com/yusukebe/hono-and-remix-on-vite)
3. use vite when local development
  use [cloudflareDevProxyVitePlugin](https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/#binding-resources-in-local-development)
5. use cloudflare stack like kv ,r2 ,d1 in both remix and hono
6. use kv to store session


## live video

https://github.com/jiangsi/public/blob/main/img/honoremix.mp4

## Demo

https://hono-remix-vite-on-cloudflare.pages.dev/

## Note

some issue

1. pages is not support triggers cron, even if you add [triggers] in wranger.toml, it is not work


## Author

jiangsi <https://github.com/jiangsi>

and welcome to subscribe my youtube channel <https://youtube.com/@jiangsitech>

## License

MIT
