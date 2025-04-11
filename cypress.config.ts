import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // Здесь можно добавить обработчики событий
    },
  },
  viewportWidth: 1280,
  viewportHeight: 800,
});
