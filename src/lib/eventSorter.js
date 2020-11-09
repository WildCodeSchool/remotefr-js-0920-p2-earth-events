export default (a, b) => {
  const ageo = a.geometry.sort(
    (aa, ab) => new Date(ab.date).getTime() - new Date(aa.date).getTime(),
  );
  const bgeo = b.geometry.sort(
    (ba, bb) => new Date(bb.date).getTime() - new Date(ba.date).getTime(),
  );
  const dateCompare =
    new Date(bgeo[0].date).getTime() - new Date(ageo[0].date).getTime();
  if (dateCompare !== 0) return dateCompare;
  return (
    new Date(bgeo[bgeo.length - 1].date).getTime() -
    new Date(ageo[ageo.length - 1].date).getTime()
  );
};
