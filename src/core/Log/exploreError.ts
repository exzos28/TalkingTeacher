export default function exploreError(_: unknown) {
  if (!(_ instanceof Error)) {
    return _;
  }
  let result = '';
  for (const key in _) {
    if (_.hasOwnProperty(key)) {
      // @ts-ignore
      result += `${key}: ${_[key]}`;
    }
  }
  return result;
}
