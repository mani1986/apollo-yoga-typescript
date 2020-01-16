import Context from './Context'

type ResolverFn = (parent: any, args: any, ctx: Context) => any;

export default ResolverFn;
