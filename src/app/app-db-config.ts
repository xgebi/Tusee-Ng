import {DBConfig} from 'ngx-indexed-db';

export const dbConfig: DBConfig  = {
  name: 'TuseeDb',
  version: 1,
  objectStoresMeta: [{
    store: 'persistent',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'token', keypath: 'token', options: { unique: false } },
      { name: 'keys', keypath: 'keys', options: { unique: false } },
      { name: 'automaticLogOut', keypath: 'automaticLogOut', options: { unique: false }}
    ]
  }]
};
