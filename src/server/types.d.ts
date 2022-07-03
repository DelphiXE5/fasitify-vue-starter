import { TSchema } from "@sinclair/typebox";
import {
    ContextConfigDefault,
    FastifyInstance,
    FastifyLoggerInstance,
    FastifySchema,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
} from "fastify";
import { RouteGenericInterface, RouteHandlerMethod } from "fastify/types/route";
import {
    FastifyRequestType,
    FastifyTypeProviderDefault,
    ResolveFastifyReplyReturnType,
    ResolveFastifyRequestType,
} from "fastify/types/type-provider";

export {};

declare global {
    var fastify: FastifyInstance;

    function handleHttpRequest<
        RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
        ContextConfig = ContextConfigDefault,
        SchemaCompiler = FastifySchema,
        ReturnType = ResolveFastifyReplyReturnType<
            FastifyTypeProviderDefault,
            SchemaCompiler,
            RouteGeneric
        >,
        RequestType extends FastifyRequestType = ResolveFastifyRequestType<
            FastifyTypeProviderDefault,
            SchemaCompiler,
            RouteGeneric
        >,
        Logger extends FastifyLoggerInstance = FastifyLoggerInstance
    >(handel: {
        handler: RouteHandlerMethod<
            RawServerDefault,
            RawRequestDefaultExpression<RawServerDefault>,
            RawReplyDefaultExpression<RawServerDefault>,
            RouteGeneric,
            ContextConfig,
            SchemaCompiler,
            FastifyTypeProviderDefault,
            ReturnType,
            RequestType,
            Logger
        >;
        body?: TSchema | Object;
        response?: TSchema | Object;
    }): RouteHandlerMethod<
        RawServerDefault,
        RawRequestDefaultExpression<RawServerDefault>,
        RawReplyDefaultExpression<RawServerDefault>,
        RouteGeneric,
        ContextConfig,
        SchemaCompiler,
        FastifyTypeProviderDefault,
        ReturnType,
        RequestType,
        Logger
    >;
}
