const BaseTestUnit = require('../BaseTestUnit');
const Server = require('../../dist/Channel/Server');
const { ServerRequest } = require('../../dist/');

class TestUnit extends BaseTestUnit {

  test() {

    it('Should response the same echostr', async () => {
      let request = (new ServerRequest('GET', 'http://www.easywechat.com/?echostr=mock-echostr')).withQueryParams({
        echostr: 'mock-echostr',
      });

      let server = new Server(request);
      let response = await server.serve();

      this.assert.strictEqual(response.getBody().toString(), 'mock-echostr');
    });

    it('Should response the same echostr via IncomingMessage', async () => {
      let req = {
        url: 'http://www.easywechat.com/?echostr=mock-echostr',
        method: 'post',
        headers: {
          'content-length': 0,
          'content-type': 'application/json',
        },
      };
      let request = await ServerRequest.createFromIncomingMessage(req, {
        foo: 'bar',
      });

      let server = new Server(request);
      let response = await server.serve();

      this.assert.strictEqual(response.getBody().toString(), 'mock-echostr');
    });

    it('Should response success without handler', async () => {
      let body = {
        "ToUserName": "gh_*",
        "FromUserName": "OPENID",
        "CreateTime": 1662480000,
        "MsgType": "event",
        "Event": "product_spu_audit",
        "ProductSpuAudit": {
          "product_id": "12345678",
          "status": 3,
          "reason": "abc"
        }
      };
      let request = (new ServerRequest('POST', 'http://www.easywechat.com/', {
        'content-type': 'application/json',
      }, body));

      let server = new Server(request);
      let response = await server.serve();

      this.assert.strictEqual(response.getBody().toString(), 'success');
    });

    it('Should response from event handler', async () => {
      let body = {
        "ToUserName": "toUser",
        "FromUserName": "fromUser",
        "CreateTime": 1662480000,
        "MsgType": "event",
        "Event": "product_spu_audit",
        "ProductSpuAudit": {
          "product_id": "12345678",
          "status": 3,
          "reason": "abc"
        }
      };
      let request = new ServerRequest('POST', 'http://www.easywechat.com/', {}, body);

      let server = new Server(request);

      server
        .addEventListener('product_spu_audit', function (message) {
          return 'product_spu_audit';
        })
        .addEventListener('product_spu_listing', function (message) {
          return 'product_spu_listing';
        });

      let response = await server.serve();

      let json = JSON.parse(response.getBody().toString());

      this.assert.strictEqual(json.ToUserName, 'fromUser');
      this.assert.strictEqual(json.FromUserName, 'toUser');
      this.assert.strictEqual(json.MsgType, 'text');
      this.assert.strictEqual(json.Content, 'product_spu_audit');
    });

  }
}

new TestUnit('Channel/Server');
