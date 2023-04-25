export class BaseError extends Error {
  constructor(message = 'Erro interno do servidor', status = 500) {
    super();
    this.message = message;
    this.status = status;
  }

  sendError(response) {
    response.status(this.status).json({ message: this.message, status: this.status });
  }
}
