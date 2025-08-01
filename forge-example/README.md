# Forge example

This directory contains a minimal Atlassian Forge app that embeds the `v86` WASM PC emulator in a Confluence macro.

The `static` directory contains `index.html`, which loads `libv86.js` from a CDN and starts an instance using the provided BIOS and disk images. See `manifest.yml` for the module definitions.

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
========