'use strict';

import ResponseInterface from "../Http/Contracts/ResponseInterface";
import DecryptMessageMixin from "../Mixins/DecryptMessageMixin";
import HandlersMixin from "../Mixins/HandlersMixin";
import ResponseMessageMixin from "../Mixins/ResponseMessageMixin";
import ServerRequestMixin from "../Mixins/ServerRequestMixin";
import { applyMixins } from "../Support/Utils";

abstract class ServerInterface
{
  constructor () {
    this.handlers = [];
  }

  /**
   * 处理消息
   */
  async serve(): Promise<ResponseInterface> { return null; }
};

interface ServerInterface extends HandlersMixin, DecryptMessageMixin, ResponseMessageMixin, ServerRequestMixin { };

applyMixins(ServerInterface, [HandlersMixin, DecryptMessageMixin, ResponseMessageMixin, ServerRequestMixin]);

export = ServerInterface;
