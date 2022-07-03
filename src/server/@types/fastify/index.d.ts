import fastify, { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

declare module "fastify" {
  interface FastifyInstance {
    authenticate: RouteHandlerMethod;
  }
}

declare function handle(request: FastifyRequest, reply: FastifyReply): any;