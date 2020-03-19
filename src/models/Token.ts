
import { Document, Schema, Model, model, Types } from 'mongoose';

export interface IToken {
  token: String,
  userId: String,
  validUntil: Date,
}

export interface ITokenModel extends IToken, Document {
}

export const TokenSchema = new Schema({
  _id: {
      type: Schema.Types.ObjectId,
      default: function () {
          return new Types.ObjectId()
      }
  },
  token: String,
  userId: String,
  validUntil: Date,
});

TokenSchema.set('toObject', {
  transform: function(doc, ret, opt) {
      delete ret['hashedPassword']
      return ret
  }
})

const TokenModel: Model<ITokenModel> = model<ITokenModel>('Token', TokenSchema);

export default TokenModel
