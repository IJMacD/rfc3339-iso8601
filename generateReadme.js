require("@babel/register")({
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", {"runtime": "automatic"}]
  ],
  "plugins": [
    [
      "transform-assets",
      {
        "extensions": [
          "css",
          "svg"
        ],
        "name": "static/media/[name].[hash:8].[ext]"
      }
    ]
  ]
});
const pkg = require("./package.json");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const App = require("./src/App").default;
const Diagram = require("./src/Diagram").default;
const fs = require("fs");
const { convert } = require('convert-svg-to-png');

const README_FILE = "README.md";
// Always use the same date to avoid large irrelevant diffs
const README_DATE = new Date("2021-07-27T14:20:32.556+00:00");

const outputStream = fs.createWriteStream(README_FILE);

// Output the README header
outputStream.write(
`# ${pkg.displayName}

${pkg.description}

[![Screenshot](${pkg.screenshot})](${pkg.homepage})

`);

// Output the Notes, FormatTable, and Format Key
const appHTML = ReactDOMServer.renderToStaticMarkup(React.createElement(App, { initialDate: README_DATE, readOnlyMode: true, showDiagram: false }));

outputStream.write(appHTML);

outputStream.end();

// Generate the Diagram
const diagramSVG = ReactDOMServer.renderToStaticMarkup(React.createElement(Diagram, { date: README_DATE }));

// Write png as screenshot
convert(diagramSVG, { background: "white", height: 1200 }).then(png => {
  fs.writeFileSync("." + pkg.screenshot, png);
});