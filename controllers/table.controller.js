var Table = require('../models/table');

exports.table_create = function(req , res){

    
    const { decoded } = req;
    var tableData = {
        ...req.body,
        addedBy: decoded.id,
        cafeId: decoded.cafeId
    }
    if(decoded.role == "cafeadmin")
    {
        var table = new Table(tableData);
        table.addedBy = decoded.id
        table.save((err, table) => {
            if (err) {
                res.send(err);
            }
            res.json(table);
            // res.send('table Created successfully');
        });
    }
    else {
        res.send('You are not authorized to add tables!');
    }

}



exports.table_details = function (req, res, next) {
    const { decoded } = req;

    if(decoded.role == "cafeadmin" || decoded.role === 'waiter')
    {
        Table.findById(req.params.id, function (err, table) {
            if (err) return next(err);
            res.send(table);
        })
    }
    else{
        res.send('You Are Not an Authorized User!');
    }
};


exports.tabel_all = function (req, res) {
    
    const { decoded } = req;

    if(decoded.role == "cafeadmin" || decoded.role === 'waiter')
    {
        Table.find({ }, function (err, tabel) {
            if (err) return next(err);
            res.send(table);
        })
    }
    else{
        res.send('You Are Not an Authorized User!');
    }
};

exports.table_update = function (req, res) {
    
    const { decoded } = req;

    if(decoded.role == "cafeadmin" || decoded.role === 'waiter')
    {
        Table.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, table) {
            if (err) return next(err);
            res.send('table udpated.');
        });
    }
    else{
    res.send('You Are Not an Authorized User!');
    }

};

exports.table_delete = function (req, res) {
    const { decoded } = req;

    if(decoded.role == "cafeadmin")
    {
        Table.findByIdAndRemove(req.params.id, function (err) {
            if (err) return next(err);
            res.send('Deleted successfully!');
        });
    }
    else{
    res.send('You Are Not an Authorized User!');
    }
};
