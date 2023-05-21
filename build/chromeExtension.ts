import type { Plugin } from "vite";
import ChromeExtension from "crx";
import consola from "consola";
// @ts-ignore
import ora from "ora";
import * as path from "path";
import * as fs from "fs/promises";
// @ts-ignore
import packageJson from "../package.json";

export interface ChromeExtensionOptions {
  bundleName?: string;
  assetsPath?: string;
  privateKey?: string | Buffer;
}

export function chromeExtension(options: ChromeExtensionOptions = {}): Plugin {
  const defaultOpts: ChromeExtensionOptions = {
    bundleName: packageJson.name,
    assetsPath: path.resolve(__dirname, "../dist"),
    privateKey: path.resolve(__dirname, "../private.pem"),
  };

  const finalOpts = { ...defaultOpts, ...options };

  return {
    name: "vite-chrome-extension",
    enforce: "pre",
    closeBundle: bundle,
  };

  async function bundle() {
    const bundler = new ChromeExtension({
      privateKey: await loadPrivateKey(finalOpts.privateKey),
    });

    const spinner = ora();
    try {
      spinner.start("Bundle chrome extension");
      const crx = await bundler.load(finalOpts.assetsPath);
      spinner.text = "Build crx bundle";
      const bundle = await crx.pack();
      spinner.text = "Generate crx bundle";
      await fs.writeFile(
        path.resolve(
          __dirname,
          "../dist",
          normalizeBundleName(finalOpts.bundleName)
        ),
        bundle
      );
      spinner.succeed("Build crx bundle success");
    } catch (e) {
      spinner.fail("Build crx bundle failed");
      consola.error(e);
    }
  }

  function loadPrivateKey(raw: string | Buffer) {
    return typeof raw === "string" ? fs.readFile(raw) : raw;
  }

  function normalizeBundleName(name: string) {
    return /\.crx$/.test(name)
      ? finalOpts.bundleName
      : finalOpts.bundleName + ".crx";
  }
}
