import { Document, Schema, Model, model, Types } from "mongoose";
import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import { UserRole, UserDbObject } from '@models';


export type UserDocument = UserDbObject & Document & {
  comparePassword: comparePasswordFunction;
  gravatar: (size: number) => string;
}

type comparePasswordFunction = (candidatePassword: string) => Promise<boolean | Error>;

const userSchema = new Schema({
  profile: {
    fullName: {
      type: String,
      required: true
    },
  },

  tokens: Array,

  email: {
    type: String,
    unique: true
  },

  role: {
    type: String,
    required: true
  },

  emailVerified: Boolean,
  dateActive: Date,

  // Password stuff
  password: {
    type: String,
    required: true,
    expose: false
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
  const user = this as UserDocument;
  if (!user.isModified("password")) {
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
});

const comparePassword: comparePasswordFunction = async function (candidatePassword) {
  return bcrypt.compareSync(
    candidatePassword,
    this.password,
  );
};

userSchema.methods.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size: number = 200) {
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash("md5").update(this.email).digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export const User = model<UserDocument>("User", userSchema);
