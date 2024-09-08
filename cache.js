const CACHE_EXPIRATION_IN_HOURS = 1;
const CACHE_KEY = 'dataCache';
const CACHE_TIMESTAMP_KEY = 'cacheTimestamp';

function getDataFromCache() {
  const cache = PropertiesService.getScriptProperties();
  const cachedData = cache.getProperty(CACHE_KEY);
  const cacheTimestamp = cache.getProperty(CACHE_TIMESTAMP_KEY);

  if (cachedData && cacheTimestamp) {
    const now = new Date().getTime();
    const cacheAgeInMillis = now - new Date(cacheTimestamp).getTime();
    const cacheExpirationInMillis = CACHE_EXPIRATION_IN_HOURS * 60 * 60 * 1000;

    if (cacheAgeInMillis < cacheExpirationInMillis) {
      return JSON.parse(cachedData);
    }
  }

  return null;
}

function setDataToCache(data) {
  const cache = PropertiesService.getScriptProperties();
  cache.setProperty(CACHE_KEY, JSON.stringify(data));
  cache.setProperty(CACHE_TIMESTAMP_KEY, new Date().toISOString());
}

function resetCache() {
  const cache = PropertiesService.getScriptProperties();
  cache.deleteProperty(CACHE_KEY);
  cache.deleteProperty(CACHE_TIMESTAMP_KEY);
}

function handleResetCache(chatId, messageId) {
  resetCache();
  const messageReply = 'Cache telah direset. Data akan diperbarui pada pencarian berikutnya.';
  sendTelegramMessage(chatId, messageId, messageReply);
}
