/* tslint:ignore */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ModuleContext } from '@graphql-modules/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String'];
};

export type ImageResponse = {
  __typename?: 'ImageResponse';
  id: Scalars['String'];
  location: Scalars['String'];
};


export type ImageInput = {
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
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

export type UserResponse = {
  __typename?: 'UserResponse';
  id: Scalars['String'];
  email: Scalars['String'];
  profile: UserProfileResponse;
  role: UserRole;
};

export type UserProfileResponse = {
  __typename?: 'UserProfileResponse';
  fullName: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  profile: UserProfileInput;
  role: UserRole;
};

export type UserProfileInput = {
  fullName: Scalars['String'];
};

export enum UserRole {
  Manager = 'Manager',
  Personnel = 'Personnel',
  Admin = 'Admin'
}

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: UserResponse;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
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

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  MessageResponse: ResolverTypeWrapper<MessageResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ImageResponse: ResolverTypeWrapper<ImageResponse>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ImageInput: ImageInput;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  AuthToken: ResolverTypeWrapper<AuthToken>;
  AuthTokenKind: AuthTokenKind;
  Company: ResolverTypeWrapper<Company>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  StatusResponse: ResolverTypeWrapper<StatusResponse>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  UserProfileResponse: ResolverTypeWrapper<UserProfileResponse>;
  UserInput: UserInput;
  UserProfileInput: UserProfileInput;
  UserRole: UserRole;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  MessageResponse: MessageResponse;
  String: Scalars['String'];
  ImageResponse: ImageResponse;
  Date: Scalars['Date'];
  ImageInput: ImageInput;
  User: User;
  Boolean: Scalars['Boolean'];
  AuthToken: AuthToken;
  Company: Company;
  Mutation: {};
  Query: {};
  StatusResponse: StatusResponse;
  UserResponse: UserResponse;
  UserProfileResponse: UserProfileResponse;
  UserInput: UserInput;
  UserProfileInput: UserProfileInput;
  LoginResponse: LoginResponse;
};

export type MessageResponseResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['MessageResponse'] = ResolversParentTypes['MessageResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResponseResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['ImageResponse'] = ResolversParentTypes['ImageResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type UserResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  dateActive?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  tokens?: Resolver<Array<Maybe<ResolversTypes['AuthToken']>>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  passwordResetToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passwordResetExpires?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthTokenResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['AuthToken'] = ResolversParentTypes['AuthToken']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deviceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['AuthTokenKind'], ParentType, ContextType>;
  validUntil?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  updateUser?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'input'>>;
  deleteUser?: Resolver<ResolversTypes['MessageResponse'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'username' | 'password'>>;
  logout?: Resolver<ResolversTypes['MessageResponse'], ParentType, ContextType>;
  logoutAll?: Resolver<ResolversTypes['MessageResponse'], ParentType, ContextType>;
  setPassword?: Resolver<ResolversTypes['MessageResponse'], ParentType, ContextType, RequireFields<MutationSetPasswordArgs, 'oldPassword' | 'newPassword'>>;
  setPasswordFromToken?: Resolver<ResolversTypes['MessageResponse'], ParentType, ContextType, RequireFields<MutationSetPasswordFromTokenArgs, 'token' | 'newPassword'>>;
  forgotPassword?: Resolver<Maybe<ResolversTypes['MessageResponse']>, ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'username'>>;
};

export type QueryResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  currentUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType>;
  getUsers?: Resolver<Array<ResolversTypes['UserResponse']>, ParentType, ContextType>;
  getStatus?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType>;
};

export type StatusResponseResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['StatusResponse'] = ResolversParentTypes['StatusResponse']> = {
  user?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['UserProfileResponse'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProfileResponseResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['UserProfileResponse'] = ResolversParentTypes['UserProfileResponse']> = {
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResponseResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ModuleContext> = {
  MessageResponse?: MessageResponseResolvers<ContextType>;
  ImageResponse?: ImageResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  AuthToken?: AuthTokenResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StatusResponse?: StatusResponseResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  UserProfileResponse?: UserProfileResponseResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ModuleContext> = Resolvers<ContextType>;
