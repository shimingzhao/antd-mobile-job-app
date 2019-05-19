export function getRedirectPath({ type, avatar }) {
  // get redirect path after the user register
  // user.type /boss genius
  // user.avatar /bossinfo /geniusinfo
  let url = type === 'boss' ? '/boss' : '/genius';
  if (!avatar) {
    url += 'info';
  }
  return url;
}

export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_');
}
