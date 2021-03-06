var SOSCustomer = require('../models/sosCustomer');
var Customer  = require('../models/customer');
const decode = require('jsonwebtoken/decode');
const mongoose = require('mongoose');
const { sendMail } = require('../util/mailSMTP');


exports.create_sosUser = function (req, res) {
        
    const {decoded} = req;
    var { name, email, contact, image, password } = req.body;


    var customer = new SOSCustomer({
    
    _id: new mongoose.Types.ObjectId(),
    name: name,
    email:email,
    password: password,
    contact:contact,
    image:image
    });

    customer.save(async (err, customer) => {
        if (err) {
            res.send(err);
        }
        
        var mailRes = await sendMail({
            to: email,
            subject: "Welcome to SOS",
            text: 'Your SOS account successfully created',
            html: ` <h1>Welcome to SOS</h1>
                    <br>
                    <br>
                <p>You have successfully registered as Customer at Start Of Stories</p>
                    <br>
                    <br>
        `
        });
        res.json(customer); 
    })
};



exports.getSosUser =  function(req, res, next) {

    const { decoded } = req;

    if(decoded.role === "superadmin" || decoded.role === 'customer')
    {
        Order.findById(req.params.id, function(err, order){
            if (err) return next(err);
            res.send(order);
        });
    }
    else{
        res.send('You are not authorized to take orders!');
    }
};



exports.create_user = function (req, res) {

    const {decoded} = req;
    customerData = {
        ...req.body,
        addedBy: decoded.id
    }

    if (decoded.role === "cafeadmin" || decode.role === "waiter")
    {
        var customer = new Customer(customerData)
        customer.save((err, customer) =>{
            if (err) 
            {
                res.send(err);
            }
            res.json(customer);
        })
    }
};  


exports.customer_login = function (req, res){
    //SOS Customer Login 
};