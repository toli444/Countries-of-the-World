import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:7000/Countries-of-the-World',
    video: false
  },
});
