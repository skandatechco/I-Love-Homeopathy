import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { build } from "velite";

class VeliteWebpackPlugin {
  private static started = false;

  apply(compiler: {
    hooks: {
      beforeCompile: {
        tapPromise: (name: string, fn: () => Promise<void>) => void;
      };
    };
    options: { mode?: string };
  }) {
    compiler.hooks.beforeCompile.tapPromise(
      "VeliteWebpackPlugin",
      async () => {
        if (VeliteWebpackPlugin.started) return;
        VeliteWebpackPlugin.started = true;

        const dev = compiler.options.mode === "development";

        await build({
          watch: dev,
          logLevel: dev ? "info" : "warn",
        });
      }
    );
  }
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx"],
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

export default withMDX(nextConfig);
