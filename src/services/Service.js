const dataSource = require('../models');

class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;
    }

    async getAllRegs(){
        return dataSource[this.model].findAll();
    }

    async getRegisterById(id){
        return dataSource[this.model].findByPk(id);
    }

    async createRegister(registerData){
        return dataSource[this.model].create(registerData);
    }

    async updateRegister(data, id){
        const listUpdatedData = dataSource[this.model].update(data,{where: {id:id}});
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