
import { Document, Schema, Model, model, Types } from 'mongoose';

export interface IUser {
  fullName: String,
  email: String,
  hashedPassword: String,
  emailVerified: Boolean,
  dateActive: Date,
  resetToken: String,
  resetTokenExpiry: Date
}

export interface IUserModel extends IUser, Document {
}

export const UserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: function () {
        return new Types.ObjectId()
    }
  },
  fullName: String,
  email: {
    type: String,
    unique: true
  },
  hashedPassword: {
    type: String,
    expose: false
  },
  emailVerified: Boolean,
  dateActive: Date,
  resetToken: String,
  resetTokenExpiry: Date
});

// UserSchema.set('toObject', {
//   transform: function(doc, ret, opt) {
//       delete ret['hashedPassword']
//       return ret
//   }
// })

const UserModel: Model<IUserModel> = model<IUserModel>('User', UserSchema);

export default UserModel
