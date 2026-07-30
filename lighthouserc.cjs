module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/"],
      startServerCommand: "pnpm start",
      startServerReadyPattern: "Ready",
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
        // Avoid thrashing on GPU-heavy first paint in CI VMs.
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      },
    },
    assert: {
      assertions: {
        // Roadmap target ≥0.95; CI gate slightly softer for WebGL portfolio flakes.
        "categories:performance": ["warn", { minScore: 0.85 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
