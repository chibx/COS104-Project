import { copyFile, readdir } from "node:fs/promises";

import { join, relative } from "node:path";
const srcDir = join(process.cwd(), "/src");
const files = await readdir(srcDir, {
    recursive: true,
    withFileTypes: true,
});

const include = [
    ...files.map((file) => {
        if (file.isDirectory()) {
            return;
        }

        if (file.name.startsWith("group-17.")) {
            return;
        }
        if (file.name.startsWith(".woff2")) {
            return;
        }

        return relative(process.cwd(), join(file.parentPath, file.name));
    }),
].filter((e) => e != undefined);

console.log(include);

await Bun.build({
    entrypoints: ["./src/index.html"],
    outdir: "./dist",
    // target: ,
    minify: {
        syntax: true,
    },
    // publicPath: "./src/public",
});

await copyFile(join(srcDir, "/public/group-17.ico"), join(process.cwd(), "dist/public/group-17.ico"));
