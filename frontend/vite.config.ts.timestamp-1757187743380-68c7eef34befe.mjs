// vite.config.ts
import { defineConfig } from "file:///C:/Users/jfras/OneDrive/Documents/VS%20Repos/unmatched-online/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/jfras/OneDrive/Documents/VS%20Repos/unmatched-online/frontend/node_modules/@vitejs/plugin-react-swc/index.mjs";
import TanStackRouterVite from "file:///C:/Users/jfras/OneDrive/Documents/VS%20Repos/unmatched-online/frontend/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import svgr from "file:///C:/Users/jfras/OneDrive/Documents/VS%20Repos/unmatched-online/node_modules/vite-plugin-svgr/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\jfras\\OneDrive\\Documents\\VS Repos\\unmatched-online\\frontend";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    svgr({
      svgrOptions: {
        svgoConfig: {
          plugins: [
            { name: "preset-default", params: { overrides: { removeViewBox: false } } },
            { name: "convertColors", params: { currentColor: true } },
            {
              name: "addAttributesToSVGElement",
              // Then add fill="currentColor"
              params: {
                attributes: [{ fill: "currentColor" }]
              }
            }
          ]
        }
      }
    })
  ],
  resolve: {
    alias: {
      src: path.resolve(__vite_injected_original_dirname, "./src")
      // Maps 'src' to the src/ directory
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqZnJhc1xcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcVlMgUmVwb3NcXFxcdW5tYXRjaGVkLW9ubGluZVxcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcamZyYXNcXFxcT25lRHJpdmVcXFxcRG9jdW1lbnRzXFxcXFZTIFJlcG9zXFxcXHVubWF0Y2hlZC1vbmxpbmVcXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2pmcmFzL09uZURyaXZlL0RvY3VtZW50cy9WUyUyMFJlcG9zL3VubWF0Y2hlZC1vbmxpbmUvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xyXG5pbXBvcnQgVGFuU3RhY2tSb3V0ZXJWaXRlIGZyb20gJ0B0YW5zdGFjay9yb3V0ZXItcGx1Z2luL3ZpdGUnXHJcbmltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcblxyXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuXHRwbHVnaW5zOiBbXHJcblx0XHRyZWFjdCgpLFxyXG5cdFx0VGFuU3RhY2tSb3V0ZXJWaXRlKCksXHJcblx0XHRzdmdyKHtcclxuXHRcdFx0c3Znck9wdGlvbnM6IHtcclxuXHRcdFx0XHRzdmdvQ29uZmlnOiB7XHJcblx0XHRcdFx0XHRwbHVnaW5zOiBbXHJcblx0XHRcdFx0XHRcdHsgbmFtZTogJ3ByZXNldC1kZWZhdWx0JywgcGFyYW1zOiB7IG92ZXJyaWRlczogeyByZW1vdmVWaWV3Qm94OiBmYWxzZSB9IH0gfSxcclxuXHRcdFx0XHRcdFx0eyBuYW1lOiAnY29udmVydENvbG9ycycsIHBhcmFtczogeyBjdXJyZW50Q29sb3I6IHRydWUgfSB9LFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0bmFtZTogJ2FkZEF0dHJpYnV0ZXNUb1NWR0VsZW1lbnQnLCAvLyBUaGVuIGFkZCBmaWxsPVwiY3VycmVudENvbG9yXCJcclxuXHRcdFx0XHRcdFx0XHRwYXJhbXM6IHtcclxuXHRcdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZXM6IFt7IGZpbGw6ICdjdXJyZW50Q29sb3InIH1dLFxyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRdLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHR9KSxcclxuXHRdLFxyXG5cdHJlc29sdmU6IHtcclxuXHRcdGFsaWFzOiB7XHJcblx0XHRcdHNyYzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksIC8vIE1hcHMgJ3NyYycgdG8gdGhlIHNyYy8gZGlyZWN0b3J5XHJcblx0XHR9LFxyXG5cdH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1osU0FBUyxvQkFBb0I7QUFDN2EsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sd0JBQXdCO0FBQy9CLE9BQU8sVUFBVTtBQUNqQixPQUFPLFVBQVU7QUFKakIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sbUJBQW1CO0FBQUEsSUFDbkIsS0FBSztBQUFBLE1BQ0osYUFBYTtBQUFBLFFBQ1osWUFBWTtBQUFBLFVBQ1gsU0FBUztBQUFBLFlBQ1IsRUFBRSxNQUFNLGtCQUFrQixRQUFRLEVBQUUsV0FBVyxFQUFFLGVBQWUsTUFBTSxFQUFFLEVBQUU7QUFBQSxZQUMxRSxFQUFFLE1BQU0saUJBQWlCLFFBQVEsRUFBRSxjQUFjLEtBQUssRUFBRTtBQUFBLFlBQ3hEO0FBQUEsY0FDQyxNQUFNO0FBQUE7QUFBQSxjQUNOLFFBQVE7QUFBQSxnQkFDUCxZQUFZLENBQUMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUFBLGNBQ3RDO0FBQUEsWUFDRDtBQUFBLFVBQ0Q7QUFBQSxRQUNEO0FBQUEsTUFDRDtBQUFBLElBQ0QsQ0FBQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLE9BQU87QUFBQSxNQUNOLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQTtBQUFBLElBQ3JDO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
