const nodemailer = require('nodemailer');

class NodemailerStrategy {
  constructor() {
    this.transportParams = {};
  }

  setHost(host) {
    this.transportParams.host = host;
  }

  setPort(port) {
    this.transportParams.port = port;
  }

  setSecure(secure) {
    this.transportParams.secure = secure;
  }

  setAuth({ user, pass }) {
    this.transportParams.auth = { user, pass };
  }

  async send(emailContent) {
    this.transporter = nodemailer.createTransport(this.transportParams);
    const res = await this.transporter.sendMail(emailContent);
    return res;
  }
}

module.exports = { NodemailerStrategy };
