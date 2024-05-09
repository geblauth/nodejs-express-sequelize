const converteIds = require('../utils/ConversoStringHelper.js');

class Controller {
    constructor(serviceEntity) {
        this.serviceEntity = serviceEntity;
    }


    async getAll(req, res) {
        try {
            const listRegister = await this.serviceEntity.getAllRegs();
            return res.status(200).json(listRegister);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async pegaUmPorId(req, res) {
        const { id } = req.params;
        try {
            const umRegistro = await this.serviceEntity.getRegisterById(Number(id));
            return res.status(200).json(umRegistro);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async pegaUm(req, res) {
        const { ...params } = req.params;
        const where  = converteIds(params);
        try {
            const umRegistro = await this.serviceEntity.getRegister(where);
            return res.status(200).json(umRegistro);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }



    async criaNovo(req, res) {
        const dadosParaCriacao = req.body;
        try {
            const novoRegistroCriado = await this.serviceEntity.createRegister(dadosParaCriacao);
            return res.status(200).json(novoRegistroCriado);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async atualiza(req, res) {
        const { ...params } = req.params;
        const dados = req.body;
        const where = converteIds(params);

        try {
            const isUpdated = await this.serviceEntity.updateRegister(dados, where);
            if (!isUpdated) {
                return res.status(400).json({ mensagem: 'Registro não atualizado!' });
            }
            return res.status(200).json({ message: 'Atualizado!' });
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async exclui(req, res) {
        const { id } = req.params;
        try {
            await this.serviceEntity.deleteRegister(Number(id));
            return res.status(200).json({ mensagem: `id ${id} deletado` });


        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = Controller;