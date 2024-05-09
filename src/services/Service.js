const dataSource = require('../database/models');

class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;
    }

    async getAllRegs(where = {}){
        return dataSource[this.model].findAll({where:{...where}});
    }

    async getRegisterById(id){
        return dataSource[this.model].findByPk(id);
    }
    async getRegister(where){
        return dataSource[this.model].findOne({where: {...where}});
    }

    async pegaRegistroPorEscopo(escopo)
    {
        return dataSource[this.model].scope(escopo).findAll();
    }

    async pegaContaRegistros(options){
        return dataSource[this.model].findAndCountAll({...options});

    }

    async createRegister(registerData){
        return dataSource[this.model].create(registerData);
    }

    async updateRegister(data, where, transacao={}){
        const listUpdatedData = await dataSource[this.model]
            .update(data,{
                where:{...where},
                transaction:transacao
            });
        if(listUpdatedData[0]===0){
            return false;
        }
        return true;
    }

    async deleteRegister(id){
        return dataSource[this.model].destroy({ where: { id: id } });
    }

}

module.exports = Services;