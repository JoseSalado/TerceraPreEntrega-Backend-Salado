import { Router } from "express";

const router = Router()

router.get('/public', (req, res) => {
    try {
        res.render('chat')    
    } catch (error) {
        res.render('chat', error)
    }
    
})

export default router;