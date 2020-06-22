class UnauthenticatedError extends Error {
  constructor(message: string = 'unauthenticated') {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default UnauthenticatedError
