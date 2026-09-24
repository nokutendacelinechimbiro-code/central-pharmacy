/**
 * Static file server for GoDaddy / Node hosting.
 * Binds to process.env.PORT as required by the platform.
 */
const http = require("http");
const handler = require("serve-handler");

const port = Number(process.env.PORT) || 3000;

const server = http.createServer(function (request, response) {
  return handler(request, response, {
    public: ".",
    cleanUrls: true,
    trailingSlash: false
  });
});

server.listen(port, "0.0.0.0", function () {
  console.log("Central Pharmacy listening on port " + port);
});
