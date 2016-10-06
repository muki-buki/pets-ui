const compression = require('compression');
const express = require('express');
const path = require('path');
const config = require('config');
const port = process.env.PORT || config.get('app.port');
const outDir = config.get('build.dir');

const app = express();

app.use(compression());git
app.use(express.static(outDir));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, `${outDir}/index.html`));
});

const server = app.listen(port, () => {
  let address = server.address();
  console.log(`Listening on port: ${address.port}`);
  let autoStart = config.get('app.autoStart');
  console.log(config.get('app'));
  if (autoStart) {
    require('open')(`http://localhost:${address.port}`);
  }
});
