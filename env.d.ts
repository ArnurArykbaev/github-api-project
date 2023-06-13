interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_API_KEY: string;
  // Add more variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}