const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { StaticRouter } = require("react-router-dom/server");
const App = require("./src/App").default;
const { Helmet } = require("react-helmet");

const app = express();

app.get("*", (req, res) => {
  const context = {};
  const initialMetaTags = {
    title: "Default Title",
    description: "Default description",
    ogTitle: "Default OG Title",
    ogDescription: "Default OG Description",
    ogImage: "https://example.com/default-image.jpg",
  };

  // Update meta tags based on the route
  if (req.url.startsWith("/noharika/pages-and-peaks")) {
    initialMetaTags.title = "Pages and Peaks";
    initialMetaTags.description = "Explore the world of books and mountains";
    // ... update other meta tags
  } else if (req.url.startsWith("/aditya/purrfect-escape")) {
    initialMetaTags.title = "Purrfect Escape";
    initialMetaTags.description = "A cat-lover's paradise";
    // ... update other meta tags
  }

  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App initialMetaTags={initialMetaTags} />
    </StaticRouter>
  );

  const helmet = Helmet.renderStatic();

  const html = `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${app}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
