import { Router } from 'express';
import { createClient, getClients, getClientById, updateClient, deleteClient } from '../controllers/clientController';

const router = Router();

router.post('/', createClient);
router.get('/', getClients);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export { router as clientRoutes };
