import ResolverFn from './ResolverFn'

interface ResolverMap {
  [field: string]: ResolverFn;
}

export default ResolverMap
