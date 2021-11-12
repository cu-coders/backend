const program = require('commander');
const {addCustomer, findCustomer} = require('./index');

program.version('1.0.0').description('CUcoders Managment CLI ')

program.command('add <firstname> <lastname> <phone> <email>')
    .alias('a')
    .description('Add your details to apply for Job')
    .action((firstname, lastname, phone,
             email) => { addCustomer({firstname, lastname, phone, email}); });

program.command('find <name>')
    .alias('f')
    .description('Find an applicant')
    .action(name => findCustomer(name));

program.parse(process.argv);