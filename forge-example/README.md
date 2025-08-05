# Forge example

This directory contains a minimal Atlassian Forge app that embeds the `v86` WASM PC emulator in a Confluence macro.

The macro renders a Custom UI resource declared in `manifest.yml`. The `static` directory provides `index.html`, which loads `libv86.js` and fetches all required BIOS and disk images from Confluence page attachments.

Upload the following files as attachments to the page before inserting the macro:

- `v86.wasm`
- `seabios.bin`
- `vgabios.bin`
- `linux.iso`

When you type `/doom` on a page, Confluence offers the **Doom** macro. The client invokes the resolver to obtain absolute download URLs for the attachments and passes them to the emulator.


You can also build a richer UI using Forge's React bindings. The snippet below shows how to render a full page app:

```javascript
import React from 'react';
import ForgeReconciler, { Box, Text, xcss } from '@forge/react';

const boxStyle = xcss({
  backgroundColor: 'color.background.accent.yellow.subtle',
});

const App = () => (
  <Box xcss={boxStyle}>
    <Text>My full page app!</Text>
  </Box>
);

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Deploying to Confluence

1. Run `forge deploy --environment development` to build and upload the app.
2. Install it on your site with `forge install --product confluence --site <your-domain>.atlassian.net --environment development`.
3. Edit a Confluence page and insert the **Doom** macro to launch the virtual machine using the attachments.

4. To load the macro as a full page, combine the app ID from `manifest.yml` with the environment ID returned by `forge environments list`:

   ```
   https://<your-domain>.atlassian.net/wiki/full-page/<app-id>/<environment-id>
   ```

   The snippet below prints the full URL for the development environment:

   ```bash
   APP_ID=$(grep '^  id:' manifest.yml | awk -F/ '{print $NF}')
   ENV_ID=$(forge environments list | awk '/development/ {print $4}')
   echo "https://<your-domain>.atlassian.net/wiki/full-page/$APP_ID/$ENV_ID"
   ```

   For the provided app ID and a sample environment ID, the full page URL would be:

   `https://a9data.atlassian.net/wiki/full-page/a25f6af5-720e-42ee-8c5a-44ac04deab48/4d9e7e75-28a4-45a8-9991-b6316580988d`

