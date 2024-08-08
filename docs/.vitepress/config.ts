import { defineConfig } from "vitepress"
import { fileURLToPath, URL } from "node:url"
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin"
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "V-ELement",
  description: "A VitePress Site",
  srcDir: "components",
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../../src", import.meta.url)),
      },
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/markdown-examples" },
      { text: "Refrence", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "Basic",
        items: [
          { text: "Button", link: "/button" },
          { text: "Switch", link: "/switch" },
          { text: "Select", link: "/select" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
})
