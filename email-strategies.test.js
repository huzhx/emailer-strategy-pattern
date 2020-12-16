const { NodemailerStrategy } = require('./email-strategies');
const createEmailContent = require('./email-content-factory');

test('adds 1 + 1 to equal 2', () => {
  expect(1 + 1).toBe(2);
});

test('instantiate NodemailerStrategy class', () => {
  const nodemailer = new NodemailerStrategy();
  expect(nodemailer).toBeInstanceOf(NodemailerStrategy);
});

test('set transportParams', () => {
  const nodemailer = new NodemailerStrategy();
  nodemailer.setHost('fakehost');
  nodemailer.setPort(465);
  nodemailer.setSecure(true);
  nodemailer.setAuth({
    user: 'fakeaccount',
    pass: 'fakepass',
  });
  const expected = {
    host: 'fakehost',
    port: 465,
    secure: true,
    auth: {
      user: 'fakeaccount',
      pass: 'fakepass',
    },
  };
  expect(nodemailer.transportParams).toEqual(expected);
});

test('send(emailContent)', async () => {
  const nodemailer = new NodemailerStrategy();
  if (process.env.EMAIL_PASS) {
    nodemailer.setHost(process.env.EMAIL_HOST);
    nodemailer.setPort(process.env.EMAIL_PORT);
    nodemailer.setSecure(process.env.EMAIL_SECURE === 'true');
    nodemailer.setAuth({
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    });
  } else {
    nodemailer.setHost(process.env.EMAIL_HOST);
    nodemailer.setPort(process.env.EMAIL_PORT);
    nodemailer.setSecure(process.env.EMAIL_SECURE === 'true');
  }
  const emailContent = createEmailContent({
    from: process.env.EMAIL_SENDER,
    to: process.env.EMAIL_RECEIVER,
    subject: 'Meeting Timesheet',
    text: 'Meeting timesheet attached',
    html: '<b>Meeting timesheet attached</b>',
    attachments: [{ path: 'ClinicXXX_Meetings_2019-06-23_2019-06-29.pdf' }],
  });
  const result = await nodemailer.send(emailContent);
  console.log(result);
  const expected = '250';
  expect(result.response).toEqual(expect.stringContaining(expected));
});
