const Email = require('./email-context');
const createEmailContent = require('./email-content-factory');

test('adds 1 + 1 to equal 2', () => {
  expect(1 + 1).toBe(2);
});

test('instantiate Email class', () => {
  const strategy = {
    sendingStrategy: () => {
      return { status: '200', message: 'email sent' };
    },
  };
  const email = new Email(strategy);
  expect(email).toBeInstanceOf(Email);
});

test('setContent(emailContent) & getContent()', () => {
  const emailContent = createEmailContent({
    from: 'dialysfe@umich.edu',
    to: 'huzhx@uci.edu',
    subject: 'Meeting Timesheet',
    text: 'Meeting timesheet attached',
    html: '<b>Meeting timesheet attached</b>',
    attachments: [{ path: 'ClinicXXX_Meetings_2019-06-23_2019-06-29.pdf' }],
  });
  const strategy = {
    sendingStrategy: () => {
      return { status: '200', message: 'email sent' };
    },
  };
  const email = new Email(strategy);
  email.setContent(emailContent);
  const result = email.getContent();
  expect(result).toEqual(emailContent);
});

test('send()', () => {
  const emailContent = createEmailContent({
    from: 'dialysfe@umich.edu',
    to: 'huzhx@uci.edu',
    subject: 'Meeting Timesheet',
    text: 'Meeting timesheet attached',
    html: '<b>Meeting timesheet attached</b>',
    attachments: [{ path: 'ClinicXXX_Meetings_2019-06-23_2019-06-29.pdf' }],
  });
  const anAlwaysSuccessSendingStrategy = {
    send: (_) => Promise.resolve({ status: '200', message: 'email sent' }),
  };
  const email = new Email(anAlwaysSuccessSendingStrategy);
  email.setContent(emailContent);
  const result = email.send();
  const expected = { status: '200', message: 'email sent' };
  expect(result).resolves.toEqual(expected);
});
