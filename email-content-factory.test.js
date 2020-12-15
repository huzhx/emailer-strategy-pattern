const createEmailContent = require('./email-content-factory');

test('adds 1 + 1 to equal 2', () => {
  expect(1 + 1).toBe(2);
});

test('if missing From, it should throw error', () => {
  expect(() => {
    createEmailContent({
      to: 'huzhx@uci.edu',
      subject: 'Meeting Timesheet',
      text: 'Meeting timesheet attached',
      html: '<b>Meeting timesheet attached</b>',
      attachments: [{ path: 'ClinicXXX_Meetings_2019-06-23_2019-06-29.pdf' }],
    });
  }).toThrow();
});

test('if missing To, it should throw error', () => {
  expect(() => {
    createEmailContent({
      from: 'dialysfe@umich.edu',
      subject: 'Meeting Timesheet',
      text: 'Meeting timesheet attached',
      html: '<b>Meeting timesheet attached</b>',
      attachments: [{ path: 'ClinicXXX_Meetings_2019-06-23_2019-06-29.pdf' }],
    });
  }).toThrow();
});

test('if missing Subject, it should throw error', () => {
  expect(() => {
    createEmailContent({
      from: 'dialysfe@umich.edu',
      to: 'huzhx@uci.edu',
      text: 'Meeting timesheet attached',
      html: '<b>Meeting timesheet attached</b>',
      attachments: [{ path: 'ClinicXXX_Meetings_2019-06-23_2019-06-29.pdf' }],
    });
  }).toThrow();
});

test('if missing Text, it should throw error', () => {
  expect(() => {
    createEmailContent({
      from: 'dialysfe@umich.edu',
      to: 'huzhx@uci.edu',
      subject: 'Meeting Timesheet',
      html: '<b>Meeting timesheet attached</b>',
      attachments: [{ path: 'ClinicXXX_Meetings_2019-06-23_2019-06-29.pdf' }],
    });
  }).toThrow();
});

test('create email content', () => {
  const result = createEmailContent({
    from: 'dialysfe@umich.edu',
    to: 'huzhx@uci.edu',
    text: 'Meeting timesheet attached',
    subject: 'Meeting Timesheet',
    html: '<b>Meeting timesheet attached</b>',
    attachments: [{ path: 'ClinicXXX_Meetings_2019-06-23_2019-06-29.pdf' }],
  });
  const expected = {
    from: 'dialysfe@umich.edu',
    to: 'huzhx@uci.edu',
    text: 'Meeting timesheet attached',
    subject: 'Meeting Timesheet',
    html: '<b>Meeting timesheet attached</b>',
    attachments: [{ path: 'ClinicXXX_Meetings_2019-06-23_2019-06-29.pdf' }],
  };
  expect(result).toEqual(expected);
});
