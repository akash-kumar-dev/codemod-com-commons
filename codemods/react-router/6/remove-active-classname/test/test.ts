import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildApi } from "@codemod-com/utilities";
import type { FileInfo } from "jscodeshift";
import { describe, it } from "vitest";
import transform from "../src/index.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

describe("react-router v6 remove-active-classname", () => {
  it("should remove activeClassName", async () => {
    const input = await readFile(join(__dirname, "../__testfixtures__/input.js"), {
      encoding: "utf8",
    });

    const output = await readFile(join(__dirname, "../__testfixtures__/output.js"), {
      encoding: "utf8",
    });

    const fileInfo: FileInfo = {
      path: "index.js",
      source: input,
    };

    const actualOutput = transform(fileInfo, buildApi("js"), {
      quote: "single",
    });

    assert.deepEqual(
      actualOutput?.replace(/\W/gm, ""),
      output.replace(/\W/gm, ""),
    );
  });
});
