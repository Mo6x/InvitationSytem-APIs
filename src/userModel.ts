import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

schema.pre('save', async function (next) {
    const user = this as any;
    if (!user.isModified('password')) {
      return next();
    }
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  });
  
  schema.methods.isValidPassword = async function (password: string) {
    const user = this as any;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  };
  
  export default mongoose.model<any, any>('User', schema);