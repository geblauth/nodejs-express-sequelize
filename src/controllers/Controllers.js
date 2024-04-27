class Controller {
    constructor(serviceEntity) {
        this.serviceEntity = serviceEntity;
    }


    async getAll(req, res) {
        try {
            const listRegister = await this.serviceEntity.getAllRegs();
            return res.status(200).json(listRegister);
        } catch (error) {
            //error
        }
    }

    async pegaUmPorId(req, res) {
        const { id } = req.params;
        try {
            const umRegistro = await this.serviceEntity.getRegisterById(Number(id));
            return res.status(200).json(umRegistro);
        } catch (erro) {
            // erro
        }
    }

    async criaNovo(req, res) {
        const dadosParaCriacao = req.body;
        try {
            const novoRegistroCriado = await this.serviceEntity.createRegister(dadosParaCriacao);
            return res.status(200).json(novoRegistroCriado);
        } catch (erro) {
            // erro
        }
    }

    async atualiza(req, res) {
        const { id } = req.params;
        const dados = req.body;

        try {
            const isUpdated = await this.serviceEntity.updateRegister(dados, Number(id));
            if (!isUpdated) {
                return res.status(400).json({ mensagem: 'Registro não atualizado!' });
            }
            return res.status(200).json({ message: 'Atualizado!' });
        } catch (error) {
            //erro
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