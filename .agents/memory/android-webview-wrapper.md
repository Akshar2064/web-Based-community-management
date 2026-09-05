---
name: Android WebView wrapper
description: Local Vite ES-module bundles need secure Android asset loading inside the APK.
---

Use AndroidX WebViewAssetLoader with the `https://appassets.androidplatform.net/assets/...` URL when packaging the Vite prototype into an Android WebView. Loading the module bundle directly from `file://` can produce a blank screen because of local-file origin and module/CORS behavior.

**Why:** The first generated APK installed successfully but rendered no content even though the embedded HTML and assets were present.

**How to apply:** Keep Vite output paths relative for offline packaging, serve the embedded `www` directory through `WebViewAssetLoader`, and rebuild after any frontend bundle change.