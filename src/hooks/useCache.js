const cacheStore = {};
const defaultNamespace = Symbol('defaultNamespace');

//expiresAt is expired if it is set and in the past
function expired(expiresAt) {
  return expiresAt && expiresAt < Date.now();
}

//Pull this out of useNamespace
function getNamedCache(namespace) {
  if (!cacheStore[namespace]) {
    cacheStore[namespace] = new Map();
  }

  return cacheStore[namespace];
}

export function useNamespace(namespace) {
  const namedCache = getNamedCache(namespace);

  function get(key) {
    //destructure get so we have the value and expiresAt
    //the || {} protects us if our key doesn't exist
    const { value, expiresAt } = namedCache.get(key) || {};

    //if the key is expired return undefined
    //It is like it never existed
    if (expired(expiresAt)) {
      //let's be good citizens and remove the key
      remove(key);
      return undefined;
    }

    return value;
  }

  //add an optional timeout parameter; if not set, value will never expire
  //timeout is in milliseconds
  function set(key, value, timeout) {
    //if timeout is passed in then set expiresAt to the current time plus the timeout
    const expiresAt = timeout ? Date.now() + timeout : null;
    namedCache.set(key, { value, expiresAt });
  }

  //see how much time is left until the key expires
  function timeTillExpires(key) {
    const { expiresAt } = namedCache.get(key) || {};
    //if there is no expiresAt or the key doesn't exist
    if (!expiresAt) {
      return null;
    }

    //if the key has already expired return 0
    if (expired(expiresAt)) {
      return 0;
    }

    return expiresAt - Date.now();
  }

  function remove(key) {
    namedCache.delete(key);
  }

  function removeAll() {
    namedCache.clear();
  }

  return { get, set, timeTillExpires, remove, removeAll };
}

//We don't expose removeAll on the defaultNamespace.
//We only allow remove all on custom namespaces
// module.exports = { get, set, timeTillExpires, remove, useNamespace };
