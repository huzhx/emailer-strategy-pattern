class Email {
  constructor(sendingStrategy) {
    this.content = {};
    this.sendingStrategy = sendingStrategy;
  }

  getContent() {
    return this.content;
  }

  setContent(emailContent) {
    this.content = {
      from: emailContent.from,
      to: emailContent.to,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
      attachments: emailContent.attachments,
    };
  }

  async send() {
    const resp = await this.sendingStrategy.send(this.content);
    return resp;
  }
}

module.exports = Email;
