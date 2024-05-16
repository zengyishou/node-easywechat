'use strict';

import merge from "merge";
import Encryptor from "../Encryptor";
import ResponseInterface from "../Http/Contracts/ResponseInterface";
import Response from "../Http/Response";
import Message from "../Message";
import { buildXml, getTimestamp } from "../Support/Utils";

class ResponseMessageMixin
{
  /**
   * 转化为回复消息
   * @returns
   */
  async transformToReply(response: any, message: Message, encryptor: Encryptor = null, isXml: boolean = true): Promise<ResponseInterface>
  {
    if (!response || response === true) {
      return new Response(200, {}, 'success');
    }

    let attributes = merge.recursive({
      ToUserName: message['FromUserName'],
      FromUserName: message['ToUserName'],
      CreateTime: getTimestamp(),
    }, await this.normalizeResponse(response));

    if (isXml) {
      return this.createXmlResponse(attributes, encryptor);
    }
    else {
      return this.createJsonResponse(attributes, encryptor);
    }
  }

  protected async normalizeResponse(response: any): Promise<Record<string, any>> {
    if (typeof response === 'function') {
      response = await response();
    }

    if (typeof response === 'object') {
      if (!response['MsgType']) {
        throw new Error('`MsgType` cannot be empty.');
      }

      return response;
    }

    if (typeof response === 'string' || typeof response === 'number') {
      return {
        MsgType: 'text',
        Content: response,
      }
    }

    throw new Error(`Invalid Response "${response.toString()}".`);
  }

  protected createXmlResponse(attributes: Record<string, any>, encryptor: Encryptor = null): ResponseInterface
  {
    let xml = buildXml(attributes);

    return new Response(
      200,
      {
        'Content-Type': 'text/xml'
      },
      encryptor ? encryptor.encrypt(xml) : xml
    );
  }

  protected createJsonResponse(attributes: Record<string, any>, encryptor: Encryptor = null): ResponseInterface
  {
    let json = JSON.stringify(attributes);

    return new Response(
      200,
      {
        'Content-Type': 'application/json'
      },
      encryptor ? encryptor.encrypt(json) : json
    );
  }

};

export = ResponseMessageMixin;
