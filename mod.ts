import { Application } from "https://deno.land/x/oak@v6.0.2/mod.ts";

const app = new Application();
const PORT = 8000;

app.use((ctx) => {
  ctx.response.body = "hello world";
});

if (import.meta.main) {
  await app.listen({
    port: PORT,
  });
}
