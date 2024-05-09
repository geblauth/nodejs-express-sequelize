const Sequelize = require('sequelize');
const Controller = require('./Controllers.js');
const MatriculaServices = require('../services/MatriculaService.js');


const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
    constructor() {
        super(matriculaServices);
    }


    async pegaMatriculasPorEstudante(req, res) {
        const { estudante_id } = req.params;
        try {
            const listaMatriculasPorEstudante = await matriculaServices.pegaContaRegistros({
                where: {
                    estudante_id: Number(estudante_id),
                    status: 'matriculado'
                }
            });
            return res.status(200).json(listaMatriculasPorEstudante);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }


    async pegaCursosLotados(req, res) {
        const lotacaoCurso = 2;
        try {
            const cursosLotados = await matriculaServices.pegaContaRegistros({
                where: {
                    status: 'matriculado' 
                },
                attributes: ['curso_id'],
                group: ['curso_id'],
                having: Sequelize.literal(`count(curso_id)>= ${lotacaoCurso}`)
            });
            return res.status(200).json(cursosLotados);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}

module.exports = MatriculaController;