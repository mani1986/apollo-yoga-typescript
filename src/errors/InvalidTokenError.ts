class InvalidTokenError extends Error {
  constructor(message: string = 'invalid_token') {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default InvalidTokenError
