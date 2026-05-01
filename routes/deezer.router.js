const router = require('express').Router()
const axios = require('axios')

router.get('/search', async (req, res) => {
  try {
    const response = await axios.get(`https://api.deezer.com/search`, { params: req.query })
    res.json(response.data)
  } catch (err) {
    res.status(500).json({ message: 'Erreur Deezer', error: err.message })
  }
})

router.get('/track/:id', async (req, res) => {
  try {
    const response = await axios.get(`https://api.deezer.com/track/${req.params.id}`)
    res.json(response.data)
  } catch (err) {
    res.status(500).json({ message: 'Erreur Deezer', error: err.message })
  }
})

router.get('/image', async (req, res) => {
  try {
    const response = await axios.get(req.query.url, { responseType: 'stream' })
    response.data.pipe(res)
  } catch (err) {
    res.status(500).json({ message: 'Erreur image', error: err.message })
  }
})

module.exports = router