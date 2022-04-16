'use strict';

import BaseConfig from '../Core/Config';

class Config extends BaseConfig
{
  protected requiredKeys: string[] = [
    'app_id',
  ];
}

export = Config;
