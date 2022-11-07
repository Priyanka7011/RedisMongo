import express,{Request,Response} from 'express'
import { LandingPage,FetchTasks,taskCreate,taskDelete } from '../controllers/tasks';
const router = express.Router();
const http=require('http')
router.get('/',LandingPage)
router.get('/fetchAllTasks',FetchTasks)

router.post('/add',taskCreate)
router.delete('/delete/:id',taskDelete)
export{
    router
}