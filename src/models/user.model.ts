import { Schema, model } from 'mongoose';
import { IUserModel } from '../types/model.types';
import { ErrorMessage } from '../utils/ErrorMessage';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<IUserModel>({
  username: {
    type: String,
    required: [true, ErrorMessage.required.username],
    unique: true,
  },
  email: {
    type: String,
    required: [true, ErrorMessage.required.email],
    unique: true,
  },
  password: {
    type: String,
  },
});

UserSchema.pre('save', function (next) {
  this.username = this.username.toLowerCase();
  this.email = this.email.toLowerCase();

  if (!this.isModified('password')) {
    next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;

  next();
});

const User = model<IUserModel>('User', UserSchema);

export default User;
