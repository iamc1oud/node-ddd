const express = require('express');

class Server {
  constructor({ logger, router }) {
    this.app = express();
    this.logger = logger;
    this.router = router;
  }

  /**
   * Server Configurations
   */
  configure() {
    // remove the Powered by Express header
    this.app.disable('x-powered-by');

    // load up the router
    this.app.use(this.router);

    // static folder
    this.app.use(express.static('public'));
  }

  start() {
    // enable the configuration of the server.
    this.configure();

    return new Promise(resolve => {
      const http = this.app.listen(3000, () => {
        const { port } = http.address();

        this.logger.info(`API Running at port: ${port}`);
      });
    });
  }
}

module.exports = Server;
