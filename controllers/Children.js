exports.findAll = function (req, res) {
    var model = new req.app.models.ChildrenDao(req.app.get('connection'));
    var page = req.param('page') ? parseInt(req.param('page')) : 1;
    var limit = req.param('limit') ? parseInt(req.param('limit')) : 10;

    var offset = (page - 1) * limit;
    model.findAll(limit, offset)
        .then(function (result) {
            res.status(200);
            res.send({
                result: result
            });
        })
        .catch(function (err) {
            res.status(400);
            res.send({
                message: "Erro ao conectar com o banco de dados!",
                err: err
            })
        });
};

exports.find = function (req, res) {
    var db = new req.app.models.ChildrenDao(req.app.get('connection'));
    var conditions = {};
    if (req.param('uf')) conditions.child_uf = req.param('uf');
    if (req.param('cidade')) conditions.child_city = req.param('cidade');
    if (req.param('sexo')) conditions.gender = req.param('sexo');
    if (req.param('partner')) conditions.id_together_partners = req.param('partner');


    if (req.param('idade')) conditions.age = req.param('idade');

    if (req.param('min_idade') && !req.param('max_idade')) conditions.age = {[req.app.get('Op').gte] : req.param('min_idade')};
    if (req.param('max_idade') && !req.param('min_idade')) conditions.age = {[req.app.get('Op').lte] : req.param('max_idade')};
    if (req.param('max_idade') && req.param('min_idade')) conditions.age = {[req.app.get('Op').lte] : req.param('max_idade'), [req.app.get('Op').gte] : req.param('min_idade')};


    conditions.child_active = req.param('active') ? req.param('active'): 1;
    conditions.ong_active = req.param('active') ? req.param('active'): 1;

    var page = req.param('page') ? parseInt(req.param('page')) : 1;
    var limit = req.param('limit') ? parseInt(req.param('limit')) : 10;
    var offset = (page - 1) * limit;

    db.find(conditions, limit, offset)
        .then(function (result) {
            res.status(200);
            res.send({
                result: result
            });
        }).catch(function (err) {
        res.status(400);
        res.send({
            message: "Erro ao conectar com o banco de dados!",
            err: err
        })
    });
};

exports.percentage = function (req, res) {
    var db = new req.app.models.ChildrenDao(req.app.get('connection'));
    db.percentage(req.param('villa_id')).then(function (result) {
        result[0].percentage = (result[0].month_donation * 100) / result[0].child_goal;
        res.status(200);
        res.send({
            result: result
        });
    }).catch(function (err) {
        res.status(500);
        res.send({
            message: "Erro ao conectar com o banco de dados",
            err: err
        })

    });
};

exports.getChildrenLocation = function(req, res){
    var db = new req.app.models.ChildrenDao(req.app.get('connection'));
    db.getChildrenLocations().then(function (result) {

    });
};

exports.getCities = function(req,res){

};