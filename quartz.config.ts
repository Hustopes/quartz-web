import { QuartzConfig } from "./quartz/cfg"

const config: QuartzConfig = {
  configuration: {
    name: "Obsidian Vault",
    description: "Personal knowledge base",
    baseUrl: "",
    theme: {
      cdnCaching: true,
      typography: {
        header: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
        body: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
        code: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap",
      },
      colors: {
        lightMode: {
          background: "#fafafa",
          lightgray: "#e5e5e5",
          gray: "#a3a3a3",
          darkgray: "#525252",
          dark: "#171717",
          accent: "#7c3aed",
          highlight: "#7c3aed15",
        },
        darkMode: {
          background: "#111111",
          lightgray: "#2a2a2a",
          gray: "#525252",
          darkgray: "#a3a3a3",
          dark: "#e5e5e5",
          accent: "#a78bfa",
          highlight: "#a78bfa15",
        },
      },
    },
  },
  plugins: {
    transformers: [
      "quartz.layouts.tableOfContents",
      "quartz.layouts.createdModifiedDate",
      "quartz.layouts.slug",
      "quartz.layouts.canonicalUrl",
    ],
    filters: [],
    emitters: [
      "quartz.emitters.static",
      "quartz.emitters.contentPage",
      "quartz.emitters.tagPage",
      "quartz.emitters.assets",
      "quartz.emitters.static",
    ],
  },
}

export default config
