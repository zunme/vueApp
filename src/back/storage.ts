import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

export async function setStorage(key: string, value: any): Promise<void> {
  if (typeof value == 'object') value = JSON.stringify(value)
  await Storage.set({
    key: key,
    value: value,
  });
}

export async function getStorage(key: string): Promise<any> {
  const item = await Storage.get({ key: key });
  if (!item.value || item.value !== 'undefined') {
    return Promise.resolve( item.value );
  } else {
    Promise.resolve('');
  }
}