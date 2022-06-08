/**
 * @param {any[]} aa
 * @param {any[]} bb
 */
export function crossJoin(aa, bb) {
  return aa.map(a => bb.map(b => [a, b])).flat();
}
