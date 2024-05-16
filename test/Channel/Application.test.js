const BaseTestUnit = require('../BaseTestUnit');
const { Channel, ServerRequest } = require('../../dist/');
const Account = require('../../dist/Channel/Account');
const AccessTokenAwareClient = require('../../dist/Core/HttpClient/AccessTokenAwareClient');
const Server = require('../../dist/Channel/Server');
const Encryptor = require('../../dist/Core/Encryptor');
const AccessToken = require('../../dist/Channel/AccessToken');

class TestUnit extends BaseTestUnit {

  test() {

    it('Should create correct instance', async () => {
      let app = new Channel({
        app_id: 'mock-appid',
        secret: 'mock-secret',
        token: 'mock-token',
      });

      this.assert.strictEqual(app instanceof Channel, true);
    });

    it('Should set and get account successful', async () => {
      let app = new Channel({
        app_id: 'mock-appid',
        secret: 'mock-secret',
        token: 'mock-token',
      });

      this.assert.strictEqual(app.getAccount() instanceof Account, true);

      let account = new Account('mock-account-appid', 'mock-account-secret', 'mock-account-token');
      app.setAccount(account);
      this.assert.deepStrictEqual(app.getAccount(), account);
    });

    it('Should set and get client successful', async () => {
      let app = new Channel({
        app_id: 'mock-appid',
        secret: 'mock-secret',
        token: 'mock-token',
      });

      this.assert.strictEqual(app.getClient() instanceof AccessTokenAwareClient, true);

      let client = new AccessTokenAwareClient();
      app.setClient(client);
      this.assert.deepStrictEqual(app.getClient(), client);
    });

    it('Should set and get encryptor successful', async () => {
      let app = new Channel({
        app_id: 'mock-appid',
        secret: 'mock-secret',
        token: 'mock-token',
        aes_key: 'mock-aeskey',
      });

      this.assert.strictEqual(app.getEncryptor() instanceof Encryptor, true);

      let encryptor = new Encryptor('mock-encryptor-appid', 'mock-encryptor-secret', 'mock-encryptor-token', 'mock-encryptor-aeskey');
      app.setEncryptor(encryptor);
      this.assert.deepStrictEqual(app.getEncryptor(), encryptor);
    });

    it('Should throw error when getServer before set ServerRequest', async () => {
      let app = new Channel({
        app_id: 'mock-appid',
        secret: 'mock-secret',
        token: 'mock-token',
        aes_key: 'mock-aeskey',
      });

      try {
        app.getServer();
      }
      catch (e) {
        this.assert.strictEqual(e.message, 'Please set request instance before use.');
      }
    });

    it('Should set and get server successful', async () => {
      let app = new Channel({
        app_id: 'mock-appid',
        secret: 'mock-secret',
        token: 'mock-token',
        aes_key: 'mock-aeskey',
      });

      let request = new ServerRequest('GET', 'http://www.easywechat.com/?echostr=mock-echostr');
      app.setRequest(request);
      let server = new Server(request);
      app.setServer(server);
      this.assert.deepStrictEqual(app.getServer(), server);
    });

    it('Should set and get access_token successful', async () => {
      let app = new Channel({
        app_id: 'mock-appid',
        secret: 'mock-secret',
        token: 'mock-token',
        aes_key: 'mock-aeskey',
      });

      this.assert.strictEqual(app.getAccessToken() instanceof AccessToken, true);

      let access_token = new AccessToken('mock-access_token-appid', 'mock-access_token-secret');
      app.setAccessToken(access_token);
      this.assert.deepStrictEqual(app.getAccessToken(), access_token);
    });

    it('Should mock client request successful', async () => {
      let app = new Channel({
        app_id: 'wx298ee3e964cafbf1',
        secret: '4bd70932ee9b72a7341af9eb82258eae',
        token: 'mock-token',
        file_cache: {
          path: './test/temp/'
        },
      });

      let httpClient = this.getMockedHttpClient(app.getHttpClient());
      app.setHttpClient(httpClient);

      httpClient.mock('get', 'cgi-bin/token').reply(200, {
        "access_token": "mock-access_token",
        "expires_in": "1500",
      });

      httpClient.mock('get', 'channels/ec/basics/info/get').reply(200, {
        "errcode": 0,
        "errmsg": "ok",
        "info": {
          "nickname": "NICKNAME",
          "headimg_url": "HEADIMG_URL",
          "subject_type": "企业",
          "status": "opening",
          "username": "USERNAME"
        }
      });

      let client = app.getClient();
      let response = await client.get('channels/ec/basics/info/get');
      let resp = response.toObject();

      this.assert.strictEqual(resp.errcode, 0);
      this.assert.strictEqual(resp.info.nickname, 'NICKNAME');
    });

  }
}

new TestUnit('Channel/Application');
