import { Router } from 'express';
import { register, login } from '../controller/registerLogin';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.post('/group', async (req, res) => {
    // Create a new group
    
  });
  
  router.post('/group/:groupId/members', async (req, res) => {
    // Add members to a group
  });
  
  router.patch('/group/:groupId/members/:memberId', async (req, res) => {
    // Accept or reject a group invitation
  });



  
export default router;