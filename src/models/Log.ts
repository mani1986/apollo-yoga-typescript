import { User } from 'models/User'
import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses';


@modelOptions({ options: { customName: 'logs' } })
export class Log extends Base {
  // @prop({ ref: 'Company', required: true })
  // public company!: Ref<CompanyDocument>;

  // @prop({ ref: 'Person' })
  // public person?: Ref<PersonDocument>;

  @prop({ ref: 'User' })
  public user!: Ref<User>;

  @prop({ })
  public title?: string;

  @prop({ required: true })
  public type!: string;

  @prop()
  public data: any;
}

export const LogModel = getModelForClass(Log, { schemaOptions: { timestamps: true } });