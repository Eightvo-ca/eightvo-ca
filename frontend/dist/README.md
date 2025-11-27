Place your site public assets here.

To use your logo file `IMG_1789.png` (from `E:\`), copy it into this folder so it will be available at `/IMG_1789.png`.

Example (PowerShell):

```powershell
# from local machine where the file currently exists
Copy-Item -Path "E:\IMG_1789.png" -Destination "d:\ddc-material-master\eightvo-ca\frontend\public\IMG_1789.png"
```

Vite will serve files in `public/` at the root of the dev server and they are copied into `dist/` on build.
