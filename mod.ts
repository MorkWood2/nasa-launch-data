import { Application, send } from "https://deno.land/x/oak@v6.0.2/mod.ts";

const app = new Application();
const PORT = 8000;
//next() async function that triggers next piece of middleware is called
app.use(async (ctx, next) => {
  await next();
  const time = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url}: ${time}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const delta = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${delta} ms`);
});

app.use(async (ctx) => {
  const filePath = ctx.request.url.pathname;
  const fileWhitelist = [
    "/index.html",
    "/javascripts/script.js",
    "/stylesheets/style.css",
    "/images/favicon.png",
  ];
  await send(ctx, filePath, {
    root: `${Deno.cwd()}/public`,
  });
});

app.use(async (ctx, next) => {
  ctx.response.body = "hello world";
  await next();
});

if (import.meta.main) {
  await app.listen({
    port: PORT,
  });
}
