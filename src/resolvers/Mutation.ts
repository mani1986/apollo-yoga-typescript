import _ from "lodash";

import Context from "./Context";
import ResolverMap from "./ResolverMap";
import AuthMutations from './AuthMutations';

const Mutation: ResolverMap = {
  ...AuthMutations
};
export default Mutation;
