import express, { Request, Response} from 'express'
import { Test } from '../models/test'

const router = express.Router()

router.get('/api/test', async (req: Request, res: Response) => {
    const test = await Test.find({})
    return res.status(200).send(test)
})

router.post('/api/test', async (req: Request, res: Response) => {
    const { title, description } = req.body

    const test = Test.build({ title, description })
    await test.save()
    return res.status(201).send(test)
})

export { router as testRouter }