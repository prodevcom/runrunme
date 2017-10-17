var sequelize = require('sequelize');

function ChildrenDao(connection) {
    this._connection = connection;

    this.table = connection.define('together_childrens', {
        id_children: {
            type: sequelize.INTEGER,
            primaryKey: true
        },
        fk_together_partners: sequelize.INTEGER,
        fk_campaign: sequelize.INTEGER,
        villa_id: sequelize.INTEGER,
        type: sequelize.STRING,
        name: sequelize.STRING,
        last_name: sequelize.STRING,
        alias: sequelize.STRING,
        birthday_date: sequelize.DATE,
        picture: sequelize.STRING,
        father: sequelize.STRING,
        mother: sequelize.STRING,
        city: sequelize.STRING,
        uf: sequelize.STRING,
        project_date: sequelize.DATE,
        description: sequelize.TEXT,
        fk_diagnosis: sequelize.STRING,
        diagnosis: sequelize.STRING,
        diagnosis_explanation: sequelize.STRING,
        education_level: sequelize.STRING,
        education_favourite_subject: sequelize.STRING,
        school_name: sequelize.STRING,
        gender: sequelize.INTEGER,
        created_at: sequelize.DATE,
        updated_at: sequelize.DATE,
        fk_status: sequelize.INTEGER,
        active: sequelize.INTEGER
    }, {
        timestamps: false
    });

    this.view = connection.define('vw_jpc_children_partner', {
        id_children: {
            type: sequelize.INTEGER,
            primaryKey: true
        },
        child_fk_campaign: sequelize.INTEGER,
        child_villa_id: sequelize.INTEGER,
        child_name: sequelize.STRING,
        child_last_name: sequelize.STRING,
        child_alias: sequelize.STRING,
        birthday_date: sequelize.DATE,
        age: sequelize.INTEGER,
        child_picture: sequelize.STRING,
        father: sequelize.STRING,
        mother: sequelize.STRING,
        child_city: sequelize.STRING,
        child_uf: sequelize.STRING,
        project_date: sequelize.DATE,
        description: sequelize.TEXT,
        fk_diagnosis: sequelize.STRING,
        diagnosis: sequelize.STRING,
        diagnosis_explanation: sequelize.STRING,
        education_level: sequelize.STRING,
        education_favourite_subject: sequelize.STRING,
        school_name: sequelize.STRING,
        gender: sequelize.INTEGER,
        child_created: sequelize.DATE,
        child_updated: sequelize.DATE,
        fk_status: sequelize.INTEGER,
        child_active: sequelize.INTEGER,
        id_together_partners: sequelize.INTEGER,
        partner_villa_id: sequelize.INTEGER,
        fk_together_partners_category: sequelize.INTEGER,
        impacts_list: sequelize.STRING,
        layout: sequelize.STRING,
        ong_alias: sequelize.STRING,
        ong_name: sequelize.STRING,
        ong_razao: sequelize.STRING,
        ong_inscricao: sequelize.INTEGER,
        ong_cnpj: sequelize.STRING,
        ong_cep: sequelize.STRING,
        ong_street: sequelize.STRING,
        ong_number: sequelize.STRING,
        ong_comp: sequelize.STRING,
        ong_district: sequelize.STRING,
        ong_city: sequelize.STRING,
        ong_state: sequelize.STRING,
        ong_month_cost: sequelize.INTEGER,
        ong_num_of_kids: sequelize.INTEGER,
        ong_site: sequelize.STRING,
        ong_facebook: sequelize.STRING,
        ong_video_id: sequelize.INTEGER,
        ong_tel: sequelize.STRING,
        ong_description: sequelize.STRING,
        ong_picture: sequelize.STRING,
        ong_bank: sequelize.STRING,
        ong_agency: sequelize.STRING,
        ong_account: sequelize.STRING,
        latitude: sequelize.STRING,
        longitude: sequelize.STRING,
        ong_created_at: sequelize.DATE,
        ong_updated_at: sequelize.DATE,
        adhesion_charter: sequelize.INTEGER,
        privacy_policy: sequelize.INTEGER,
        ong_active: sequelize.INTEGER
    }, {
        freezeTableName: true,
        timestamps: false
    });
}

ChildrenDao.prototype.findAll = function (limit, offset) {
    return this.view.findAndCountAll({
        limit: limit,
        offset: offset
    });
};

ChildrenDao.prototype.find = function (conditions, limit, offset) {
    return this.view.findAndCountAll({
        where: conditions,
        limit: limit,
        offset: offset
    });
};

ChildrenDao.prototype.percentage = function (villa_id) {
    return this._connection.query("call sp_jpc_child_donations_goal(?)", { replacements: [villa_id]})
};

ChildrenDao.prototype.create = function(params){
    this.table.name = params.name;
    this.table.last_name = params.last_name ? params.last_name : "";
    this.table.villa_id = params.villa_id;
    this.table.alias = params.alias;
    this.table.fk_together_partners = params.partner;
    this.table.birthday_date = params.birthday;
    this.table.active = 1;

};


ChildrenDao.prototype.getChildrenLocations = function(conditions){
    return this.view.findAll({
        attributes: ["child_uf, child_city"],
        where: conditions,
        distinct: true
    });
};

module.exports = function () {
    return ChildrenDao;
};
