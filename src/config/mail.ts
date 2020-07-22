// Its an example file to simulate an email driver for production.

interface IMailDriver {
  driver: 'ethereal' | 'other_option';
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
};
