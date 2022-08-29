import express, { Request, Response} from 'express'

const router = express.Router()

router.get('/api/test', async (req: Request, res: Response) => {
    
    return res.status(200).send('hello word!')
})


export { router as testRouter }