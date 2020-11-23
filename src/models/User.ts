import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import moment from 'moment';
import { UserRole, AuthTokenKind } from '../generated/models';
import { prop, pre, getModelForClass, Ref, DocumentType } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import auth from 'lib/auth';

class AuthToken {
  @prop()
  public accessToken: string

  @prop()
  public deviceId: string

  @prop({ type: AuthTokenKind })
  public kind: AuthTokenKind

  @prop()
  public validUntil: Date
}

class UserProfile {
  @prop()
  public fullName: string
}

@pre<User>('save', function (next) {
  const user = this as User;
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err: any, salt: any) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, undefined, (err: Error, hash: string) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
})

export class User extends Base {
  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public emailVerified: boolean = false;

  @prop({ required: true })
  public password!: string;

  @prop()
  public passwordResetToken?: string;

  @prop()
  public passwordResetExpires?: Date;

  @prop({ required: true })
  public dateActive: Date = new Date();

  @prop({ _id: false, required: true })
  public profile!: UserProfile;

  @prop({ type: String, enum: UserRole, required: true })
  public role!: UserRole;

  @prop()
  public tokens: Array<AuthToken> = [];

  public async comparePassword(this: DocumentType<User>, candidatePassword: string) {
    return bcrypt.compareSync(candidatePassword, this.password);
  }

  public async gravatar(this: DocumentType<User>, size: number = 200) {
    if (!this.email) {
      return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
  }

  public async createToken(this: DocumentType<User>): Promise<AuthToken> {
    const TOKEN_VALIDITY_MINUTES = process.env.TOKEN_VALIDITY_MINUTES || 180; // @todo Change this\

    let tokenObj: AuthToken = {
      kind: AuthTokenKind.Auth,
      deviceId: null,
      accessToken: auth.signToken(this),
      validUntil: moment().add(TOKEN_VALIDITY_MINUTES, 'minutes').toDate(),
    };

    this.tokens.push(tokenObj);
    await this.save();

    return tokenObj;
  }
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });
