class NotFoundError extends Error {
  constructor(message: string = 'not_found') {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default NotFoundError
