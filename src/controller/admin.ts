import { Request, Response } from 'express';
import { connection } from './database';
import createHttpError from "http-errors";



// const errorHandler: ErrorRequestHandler = (err, req, res, next)  => { 
//     res.status(err.status || 500)
//     res.send({ status: err.status || 500,
//     message: err.message
//     })  
//    }

export async function createGroup(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    // Verify the admin's email and password
    const result = await connection.query('SELECT * FROM admin WHERE email = $1 AND password = $2', [email, password]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create a new group and return the group ID
    const groupId = result.rows[0].group_id + 1;
    await connection.query('UPDATE admin SET group_id = $1 WHERE email = $2', [groupId, email]);
    return res.status(200).json({ groupId });
  } catch (err) {
    let errorMessage = "Group UnSuccessfuly";
        if (err instanceof Error) {
            errorMessage = err.message;
          }
          return res.status(500).send('message');
    
  }
}

export async function addMembers(req: Request, res: Response) {
    const { groupId } = req.params;
    const { members } = req.body;
    try {
      // Add members to the group
      for (const member of members) {
        await connection.query('INSERT INTO group_members (group_id, member_email, status) VALUES ($1, $2, $3)', [groupId, member, 'pending']);
      }
      return res.status(200).json({ message: 'Members added successfully' });
    } catch (err) {
        let errorMessage = "Could'nt Add Successfuly";
        if (err instanceof Error) {
            errorMessage = err.message;
          }
          return res.status(500).send('message');
    }
  }
  
  export async function updateMemberStatus(req: Request, res: Response) {
    const { groupId, memberId } = req.params;
    const { status } = req.body;
    try {
      // Update the member's status
      await connection.query('UPDATE group_members SET status = $1 WHEREgroup_id = $2 AND id = $3', [status, groupId, memberId]);
      return res.status(200).json({ message: 'Member status updated successfully' });
      } catch (err) {
        let errorMessage = "Could'nt Update Successfuly";
        if (err instanceof Error) {
            errorMessage = err.message;
          }
      return res.status(500).send('message');
      }
      }

