const mongoose = require('mongoose');
// Map global promise -get rid of the warning
mongoose.promise = global.promise;
// Connection to the database
const db = mongoose.connect('mongo://localhost:27017/customercli',
                            {useMongoClient : true});

// Import models
const Customer = require('./models/Customer');

// Add Customer
const addCustomer =
    (customer) => {
      Customer.create(customer).then(customer => {
        console.infor('New Customer Added');
        db.close();
      });
    }

// FInd  Customer
const findCustomer =
    (name) => {
      // Make case insensitive
      const search = new RegExp(name, 'i');
      Customer.find({$or : [ {fistname : search}, {lastname : search} ]})
          .then(customer => {
            console.info(customer);
            console.info(`${customer.length} matches`);
            db.close();
          });
    }
              // Export ALl methdos
              module.exports = {
      addCustomer,
      findCustomer

    }