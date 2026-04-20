const supportService = require('../services/support.service')

const supportController = {

    
    delete: async (req, res) => {
        try {
            const id = req.params.id
            const userId = req.user.id

            if(await supportService.delete(id, userId)) {
                res.sendStatus(204)
            } else {
                res.status(404).json({ 
                    statusCode: 404, 
                    message: 'Message de soutien non trouvé' 
                });
            }
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}

module.exports = supportController
