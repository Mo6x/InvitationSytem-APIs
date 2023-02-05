


export async function getGroups(req: Request, res: Response) {
    try {
      const result = await connection.query('SELECT * FROM groups');
      return res.status(200).json(result.rows);
    } catch (err) {
        let errorMessage ="Group not Found";
    if (err instanceof Error) {
        errorMessage = err.message;
      }
      res.status(500).send('errorMessage');
    }
  }
  
  export async function getGroup(req: Request, res: Response) {
    const { groupId } = req.params;
    try {
      const result = await connection.query('SELECT * FROM groups WHERE id = $1', [groupId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Group not found' });
      }
      return res.status(200).json(result.rows[0]);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  export async function getGroupMembers(req: Request, res: Response) {
    const { groupId } = req.params;
    try {
      const result = await connection.query('SELECT * FROM group_members WHERE group_id = $1', [groupId]);
      return res.status(200).json(result.rows);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  export async function updateMember(req: Request, res: Response) {
    const { id, name, email } = req.body;
    try {
      const result = await connection.query('UPDATE members SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
      return res.status(200).json({ message: 'Member information updated successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }