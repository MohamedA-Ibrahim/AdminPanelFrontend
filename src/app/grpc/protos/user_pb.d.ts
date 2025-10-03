import * as jspb from 'google-protobuf'



export class UserRequest extends jspb.Message {
  getId(): string;
  setId(value: string): UserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserRequest): UserRequest.AsObject;
  static serializeBinaryToWriter(message: UserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserRequest;
  static deserializeBinaryFromReader(message: UserRequest, reader: jspb.BinaryReader): UserRequest;
}

export namespace UserRequest {
  export type AsObject = {
    id: string;
  };
}

export class UserReply extends jspb.Message {
  getId(): string;
  setId(value: string): UserReply;

  getFirstname(): string;
  setFirstname(value: string): UserReply;

  getLastname(): string;
  setLastname(value: string): UserReply;

  getEmail(): string;
  setEmail(value: string): UserReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserReply.AsObject;
  static toObject(includeInstance: boolean, msg: UserReply): UserReply.AsObject;
  static serializeBinaryToWriter(message: UserReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserReply;
  static deserializeBinaryFromReader(message: UserReply, reader: jspb.BinaryReader): UserReply;
}

export namespace UserReply {
  export type AsObject = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}

