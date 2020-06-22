/* tslint:ignore */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ModuleContext } from '@graphql-modules/core';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};









export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AuthToken = {
   __typename?: 'AuthToken';
  accessToken: Scalars['String'];
  deviceId: Scalars['String'];
  kind: AuthTokenKind;
  validUntil: Scalars['Date'];
};

export enum AuthTokenKind {
  Auth = 'auth'
}

export type Company = {
   __typename?: 'Company';
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};


export type ImageInput = {
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
};

export type ImageResponse = {
   __typename?: 'ImageResponse';
  id: Scalars['String'];
  location: Scalars['String'];
};

export type LoginResponse = {
   __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: UserResponse;
};

export type MessageResponse = {
   __typename?: 'MessageResponse';
  message: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  updateUser: UserResponse;
  deleteUser: MessageResponse;
  login: LoginResponse;
  logout: MessageResponse;
  logoutAll: MessageResponse;
  setPassword: MessageResponse;
  setPasswordFromToken: MessageResponse;
  forgotPassword?: Maybe<MessageResponse>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  input: UserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSetPasswordArgs = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationSetPasswordFromTokenArgs = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  username: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  currentUser?: Maybe<UserResponse>;
  getUsers: Array<UserResponse>;
  getStatus: StatusResponse;
};

export type StatusResponse = {
   __typename?: 'StatusResponse';
  user: UserResponse;
};

export type User = {
   __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  dateActive: Scalars['Date'];
  fullName?: Maybe<Scalars['String']>;
  role: UserRole;
  tokens: Array<Maybe<AuthToken>>;
  password: Scalars['String'];
  passwordResetToken?: Maybe<Scalars['String']>;
  passwordResetExpires: Scalars['Date'];
};

export type UserInput = {
  email: Scalars['String'];
  profile: UserProfileInput;
  role: UserRole;
};

export type UserProfileInput = {
  fullName: Scalars['String'];
};

export type UserProfileResponse = {
   __typename?: 'UserProfileResponse';
  fullName: Scalars['String'];
};

export type UserResponse = {
   __typename?: 'UserResponse';
  id: Scalars['String'];
  email: Scalars['String'];
  profile: UserProfileResponse;
  role: UserRole;
};

export enum UserRole {
  Manager = 'Manager',
  Personnel = 'Personnel',
  Admin = 'Admin'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  UserResponse: ResolverTypeWrapper<UserResponse>,
  String: ResolverTypeWrapper<Scalars['String']>,
  UserProfileResponse: ResolverTypeWrapper<UserProfileResponse>,
  UserRole: UserRole,
  StatusResponse: ResolverTypeWrapper<StatusResponse>,
  Mutation: ResolverTypeWrapper<{}>,
  UserInput: UserInput,
  UserProfileInput: UserProfileInput,
  MessageResponse: ResolverTypeWrapper<MessageResponse>,
  LoginResponse: ResolverTypeWrapper<LoginResponse>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  AdditionalEntityFields: AdditionalEntityFields,
  ImageResponse: ResolverTypeWrapper<ImageResponse>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  ImageInput: ImageInput,
  User: ResolverTypeWrapper<UserDbObject>,
  AuthToken: ResolverTypeWrapper<AuthToken>,
  AuthTokenKind: AuthTokenKind,
  Company: ResolverTypeWrapper<Company>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  UserResponse: UserResponse,
  String: Scalars['String'],
  UserProfileResponse: UserProfileResponse,
  UserRole: UserRole,
  StatusResponse: StatusResponse,
  Mutation: {},
  UserInput: UserInput,
  UserProfileInput: UserProfileInput,
  MessageResponse: MessageResponse,
  LoginResponse: LoginResponse,
  Boolean: Scalars['Boolean'],
  AdditionalEntityFields: AdditionalEntityFields,
  ImageResponse: ImageResponse,
  Date: Scalars['Date'],
  ImageInput: ImageInput,
  User: UserDbObject,
  AuthToken: AuthToken,
  AuthTokenKind: AuthTokenKind,
  Company: Company,
};

export type UnionDirectiveArgs = {   discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type UnionDirectiveResolver<Result, Parent, ContextType = ModuleContext, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {   discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = ModuleContext, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {   embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type EntityDirectiveResolver<Result, Parent, ContextType = ModuleContext, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type ColumnDirectiveResolver<Result, Parent, ContextType = ModuleContext, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {  };

export type IdDirectiveResolver<Result, Parent, ContextType = ModuleContext, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type LinkDirectiveResolver<Result, Parent, ContextType = ModuleContext, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {  };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = ModuleContext, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {   path: Scalars['String']; };

export type MapDirectiveResolver<Result, Parent, ContextType = ModuleContext, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthTokenResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['AuthToken'] = ResolversParentTypes['AuthToken']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  deviceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  kind?: Resolver<ResolversTypes['AuthTokenKind'], ParentType, ContextType>,
  validUntil?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CompanyResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type ImageResponseResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['ImageResponse'] = ResolversParentTypes['ImageResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type LoginResponseResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MessageResponseResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['MessageResponse'] = ResolversParentTypes['MessageResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  updateUser?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'input'>>,
  deleteUser?: Resolver<ResolversTypes['MessageResponse'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>,
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'username' | 'password'>>,
  logout?: Resolver<ResolversTypes['MessageResponse'], ParentType, ContextType>,
  logoutAll?: Resolver<ResolversTypes['MessageResponse'], ParentType, ContextType>,
  setPassword?: Resolver<ResolversTypes['MessageResponse'], ParentType, ContextType, RequireFields<MutationSetPasswordArgs, 'oldPassword' | 'newPassword'>>,
  setPasswordFromToken?: Resolver<ResolversTypes['MessageResponse'], ParentType, ContextType, RequireFields<MutationSetPasswordFromTokenArgs, 'token' | 'newPassword'>>,
  forgotPassword?: Resolver<Maybe<ResolversTypes['MessageResponse']>, ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'username'>>,
};

export type QueryResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  currentUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType>,
  getUsers?: Resolver<Array<ResolversTypes['UserResponse']>, ParentType, ContextType>,
  getStatus?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType>,
};

export type StatusResponseResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['StatusResponse'] = ResolversParentTypes['StatusResponse']> = {
  user?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  emailVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  dateActive?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>,
  tokens?: Resolver<Array<Maybe<ResolversTypes['AuthToken']>>, ParentType, ContextType>,
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  passwordResetToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  passwordResetExpires?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserProfileResponseResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['UserProfileResponse'] = ResolversParentTypes['UserProfileResponse']> = {
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserResponseResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  profile?: Resolver<ResolversTypes['UserProfileResponse'], ParentType, ContextType>,
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = ModuleContext> = {
  AuthToken?: AuthTokenResolvers<ContextType>,
  Company?: CompanyResolvers<ContextType>,
  Date?: GraphQLScalarType,
  ImageResponse?: ImageResponseResolvers<ContextType>,
  LoginResponse?: LoginResponseResolvers<ContextType>,
  MessageResponse?: MessageResponseResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  StatusResponse?: StatusResponseResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  UserProfileResponse?: UserProfileResponseResolvers<ContextType>,
  UserResponse?: UserResponseResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = ModuleContext> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = ModuleContext> = {
  union?: UnionDirectiveResolver<any, any, ContextType>,
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>,
  entity?: EntityDirectiveResolver<any, any, ContextType>,
  column?: ColumnDirectiveResolver<any, any, ContextType>,
  id?: IdDirectiveResolver<any, any, ContextType>,
  link?: LinkDirectiveResolver<any, any, ContextType>,
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>,
  map?: MapDirectiveResolver<any, any, ContextType>,
};


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = ModuleContext> = DirectiveResolvers<ContextType>;

import { ObjectID } from 'mongodb';
export type UserDbObject = {
  _id?: Maybe<ObjectID>,
  email: string,
  emailVerified: boolean,
  dateActive: any,
  profile: {
    fullName: Maybe<string>,
  },
  role: string,
  tokens: Array<Maybe<AuthToken>>,
  password: string,
  passwordResetToken?: Maybe<string>,
  passwordResetExpires: any,
};

export type AuthTokenDbObject = {
  accessToken: string,
  deviceId: string,
  kind: string,
  validUntil: any,
};

export type CompanyDbObject = {
  _id?: Maybe<ObjectID>,
  name: string,
};
