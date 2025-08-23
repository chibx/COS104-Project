import index from "./src/index.html";

const server = Bun.serve({
    routes: {
        "/": index,
    },
    port: 3000,
});
