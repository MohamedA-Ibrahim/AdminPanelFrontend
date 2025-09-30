// package: 
// file: src/app/grpc/protos/user.proto

import * as src_app_grpc_protos_user_pb from "../../../../src/app/grpc/protos/user_pb";
import {grpc} from "@improbable-eng/grpc-web";

type UserServiceGetUserById = {
  readonly methodName: string;
  readonly service: typeof UserService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof src_app_grpc_protos_user_pb.UserRequest;
  readonly responseType: typeof src_app_grpc_protos_user_pb.UserReply;
};

export class UserService {
  static readonly serviceName: string;
  static readonly GetUserById: UserServiceGetUserById;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class UserServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getUserById(
    requestMessage: src_app_grpc_protos_user_pb.UserRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: src_app_grpc_protos_user_pb.UserReply|null) => void
  ): UnaryResponse;
  getUserById(
    requestMessage: src_app_grpc_protos_user_pb.UserRequest,
    callback: (error: ServiceError|null, responseMessage: src_app_grpc_protos_user_pb.UserReply|null) => void
  ): UnaryResponse;
}

