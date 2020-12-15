createEmailContent = (emailObject) => {
  const privateProperties = {};
  const emailContent = {
    setFrom(from) {
      if (!from) {
        throw new Error('Email sender info (from) is missing');
      }
      privateProperties.from = from;
    },
    setTo(to) {
      if (!to) {
        throw new Error('Email receiver info (to) is missing');
      }
      privateProperties.to = to;
    },
    setSubject(subject) {
      if (!subject) {
        throw new Error('Email subject is missing');
      }
      privateProperties.subject = subject;
    },
    setText(text) {
      if (!text) {
        throw new Error('Email text content is missing');
      }
      privateProperties.text = text;
    },
    setHtml(html) {
      privateProperties.html = html;
    },
    setAttachments(attachments) {
      privateProperties.attachments = attachments;
    },
  };
  emailContent.setFrom(emailObject.from || '');
  emailContent.setTo(emailObject.to || '');
  emailContent.setSubject(emailObject.subject || '');
  emailContent.setText(emailObject.text || '');
  emailContent.setHtml(emailObject.html || '');
  emailContent.setAttachments(emailObject.attachments || []);
  return privateProperties;
};

module.exports = createEmailContent;
