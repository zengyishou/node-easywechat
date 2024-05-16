'use strict';

import Encryptor from "../Encryptor";
import Message from "../Message";
import { createHash, parseXml } from "../Support/Utils";

class DecryptMessageMixin
{
  /**
   * 解密消息
   * @returns
   */
  async decryptMessage(message: Message, encryptor: Encryptor, signature: string, timestamp: number, nonce: string): Promise<Message>
  {
    const ciphertext = message['Encrypt'];

    this.validateSignature(encryptor.getToken(), ciphertext, signature, timestamp, nonce);

    const plaintext = encryptor.decrypt(ciphertext, signature, nonce, timestamp);

    let attributes: Record<string, any>;
    if (plaintext.substring(0,1) === '<') {
      attributes = await parseXml(plaintext);
    }
    else {
      attributes = JSON.parse(plaintext);
    }

    message.merge(attributes);

    return message;
  }

  protected validateSignature(token: string, ciphertext: string, signature: string, timestamp: number, nonce: string): void
  {
    if (!signature) {
      throw new Error('Request signature must not be empty.');
    }

    let params = [token, timestamp, nonce, ciphertext];
    params.sort();

    if (signature !== createHash(params.join(''), 'sha1')) {
      throw new Error('Invalid request signature.');
    }
  }

};

export = DecryptMessageMixin;
