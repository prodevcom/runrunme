var sequelize = require('sequelize');

function PartnersDao(connection) {
    this._connection = connection;

    this.table = connection.define('together_partners', {
        id_together_partners: {
            type: sequelize.INTEGER,
            primaryKey: true
        },
        villa_id: sequelize.INTEGER,
        fk_together_partners_category: sequelize.INTEGER,
        impacts_list: sequelize.STRING,
        activities_list: sequelize.STRING,
        layout: sequelize.STRING,
        ong_alias: sequelize.STRING,
        ong_name: sequelize.STRING,
        ong_razao: sequelize.STRING,
        ong_inscricao: sequelize.INTEGER,
        ong_cnpj: sequelize.STRING,
        ong_cep: sequelize.STRING,
        ong_street: sequelize.STRING,
        ong_month_cost: sequelize.INTEGER,
        ong_num_of_kids: sequelize.INTEGER,
        ong_kids_cost: sequelize.STRING,
        ong_site: sequelize.STRING,
        ong_facebook: sequelize.STRING,
        ong_video_id: sequelize.STRING,
        ong_tel: sequelize.STRING,
        ong_description: sequelize.STRING,
        ong_picture: sequelize.STRING,
        ong_bank: sequelize.STRING,
        ong_agency: sequelize.STRING,
        ong_account: sequelize.STRING,
        ong_foundation: sequelize.STRING,
        vm_partner: sequelize.STRING,
        created_at: sequelize.DATE,
        updated_at: sequelize.DATE,
        active: sequelize.INTEGER
    }, {
        timestamps: false
    });

    this.view = connection.define('vw_jpc_partners', {
        id_together_partners: {
            type: sequelize.INTEGER,
            primaryKey: true
        },
        villa_id: sequelize.INTEGER,
        fk_together_partners_category: sequelize.INTEGER,
        impacts_list: sequelize.STRING,
        activities_list: sequelize.STRING,
        layout: sequelize.STRING,
        ong_alias: sequelize.STRING,
        ong_name: sequelize.STRING,
        ong_razao: sequelize.STRING,
        ong_inscricao: sequelize.INTEGER,
        ong_cnpj: sequelize.STRING,
        ong_cep: sequelize.STRING,
        ong_street: sequelize.STRING,
        ong_month_cost: sequelize.INTEGER,
        ong_num_of_kids: sequelize.INTEGER,
        ong_kids_cost: sequelize.STRING,
        ong_site: sequelize.STRING,
        ong_facebook: sequelize.STRING,
        ong_video_id: sequelize.STRING,
        ong_tel: sequelize.STRING,
        ong_description: sequelize.STRING,
        ong_picture: sequelize.STRING,
        ong_bank: sequelize.STRING,
        ong_agency: sequelize.STRING,
        ong_account: sequelize.STRING,
        ong_foundation: sequelize.STRING,
        vm_partner: sequelize.STRING,
        created_at: sequelize.DATE,
        updated_at: sequelize.DATE,
        active: sequelize.INTEGER,
        children: sequelize.INTEGER
    }, {
        freezeTableName: true,
        timestamps: false
    });
}

PartnersDao.prototype.findAll = function (limit, offset) {
    return this.view.findAndCountAll({
        limit: limit,
        offset: offset
    });
};

PartnersDao.prototype.find = function (conditions, limit, offset) {
    return this.view.findAndCountAll({
        where: conditions,
        limit: limit,
        offset: offset
    });
};

PartnersDao.prototype.create = function(params){
    this.table.name = params.name;
    this.table.last_name = params.last_name ? params.last_name : "";
    this.table.villa_id = params.villa_id;
    this.table.alias = params.alias;
    this.table.fk_together_partners = params.partner;
    this.table.birthday_date = params.birthday;
    this.table.active = 1;

};

module.exports = function () {
    return PartnersDao;
};
