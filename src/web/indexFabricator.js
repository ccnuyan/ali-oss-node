import fs from 'fs';
import path from 'path';
import assets from '../../build/assets.json'; // eslint-disable-line

let rawIndexHTML = fs.readFileSync(path.join(__dirname, './index.html'), 'utf-8');

rawIndexHTML = rawIndexHTML.replace('_app_title_', serverConfig.title);

const styles =
  Object.keys(serverConfig.resources_stylesheets).map(key => (
    `<link href="${serverConfig.resources_stylesheets[key]}" rel="stylesheet"/>`));

if (assets.vendor.css) styles.push(`<link href="${assets.vendor.css}" rel="stylesheet"/>`);
if (assets.app.css) styles.push(`<link href="${assets.app.css}" rel="stylesheet"/>`);

rawIndexHTML = rawIndexHTML.replace('_app_styles_', styles.join('\n'));

const scripts =
  Object.keys(serverConfig.resources_scripts).map(key => (
    `<script src="${serverConfig.resources_scripts[key]}"></script>`));

if (assets.vendor.js) scripts.push(`<script src="${assets.vendor.js}"></script>`);
if (assets.app.js) scripts.push(`<script src="${assets.app.js}"></script>`);

rawIndexHTML = rawIndexHTML.replace('_app_scripts_', scripts.join('\n'));

const indexHTML = rawIndexHTML;

export default indexHTML;
