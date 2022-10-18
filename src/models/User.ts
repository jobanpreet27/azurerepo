import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import _ from 'lodash';

export interface IUser {
  username: string;
  password: string;
  removePass: Function;
  comparePassword: Function;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

UserSchema.methods.removePass = function () {
  return _.omit(this.toObject(), 'password');
};

const updatePassword = (user: any, next: any) => {
  bcrypt.genSalt(10, (err: any, salt: string) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
};

UserSchema.pre('save', function (next) {
  updatePassword(this, next);
});

UserSchema.methods.comparePassword = function (password: string, next: any) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return next(err);
    return next(null, isMatch);
  });
};

export default mongoose.model<IUserModel>('User', UserSchema);
