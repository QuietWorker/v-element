// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/frontedDevelopment/%E7%BB%84%E4%BB%B6%E5%BA%93%E9%A1%B9%E7%9B%AE/02_LEARN_VUE3/v-element/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/frontedDevelopment/%E7%BB%84%E4%BB%B6%E5%BA%93%E9%A1%B9%E7%9B%AE/02_LEARN_VUE3/v-element/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/frontedDevelopment/%E7%BB%84%E4%BB%B6%E5%BA%93%E9%A1%B9%E7%9B%AE/02_LEARN_VUE3/v-element/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueDevTools from "file:///D:/frontedDevelopment/%E7%BB%84%E4%BB%B6%E5%BA%93%E9%A1%B9%E7%9B%AE/02_LEARN_VUE3/v-element/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/frontedDevelopment/%E7%BB%84%E4%BB%B6%E5%BA%93%E9%A1%B9%E7%9B%AE/02_LEARN_VUE3/v-element/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxmcm9udGVkRGV2ZWxvcG1lbnRcXFxcXHU3RUM0XHU0RUY2XHU1RTkzXHU5ODc5XHU3NkVFXFxcXDAyX0xFQVJOX1ZVRTNcXFxcdi1lbGVtZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxmcm9udGVkRGV2ZWxvcG1lbnRcXFxcXHU3RUM0XHU0RUY2XHU1RTkzXHU5ODc5XHU3NkVFXFxcXDAyX0xFQVJOX1ZVRTNcXFxcdi1lbGVtZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9mcm9udGVkRGV2ZWxvcG1lbnQvJUU3JUJCJTg0JUU0JUJCJUI2JUU1JUJBJTkzJUU5JUExJUI5JUU3JTlCJUFFLzAyX0xFQVJOX1ZVRTMvdi1lbGVtZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcbmltcG9ydCB2dWVKc3ggZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjtcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tIFwidml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbdnVlKCksIHZ1ZUpzeCgpLCB2dWVEZXZUb29scygpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2WCxTQUFTLGVBQWUsV0FBVztBQUVoYSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8saUJBQWlCO0FBTCtMLElBQU0sMkNBQTJDO0FBUXhRLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxHQUFHLFlBQVksQ0FBQztBQUFBLEVBQ3hDLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
