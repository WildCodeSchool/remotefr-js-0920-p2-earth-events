const cardinal = (txt) => {
  const news = {
    N: 'North',
    E: 'East',
    W: 'West',
    S: 'South',
  };
  return txt
    .split('')
    .map((c) => news[c])
    .join('-');
};

export default (parsable) => {
  let title = parsable;
  let type;
  let county;
  let state;
  let country;
  //   const reg1 = /^(.+)\s-\s(.+),\s(.+)(?:,|\s-)\s(.+)$/i.exec(title);
  const reg1 = /^(.+)(?:,|\s-)\s([^,]+)$/i.exec(title);
  if (reg1) {
    [title, country] = reg1.slice(1);
    if (!/volcano$/i.test(title)) {
      const reg2 = /^(.+)\s-\s(.+)$/i.exec(title);
      if (reg2) {
        [type, title] = reg2.slice(1);
      }
      const reg3 = /^(.+),\s([^,]+)$/i.exec(title);
      if (reg3) {
        [title, state] = reg3.slice(1);
      }
      const reg4 = /^(.+)\s\(([^)]+)\)$/i.exec(title);
      if (reg4) {
        [county, title] = reg4.slice(1);
      } else {
        county = title;
        title = type;
      }
      if (county) {
        const fixCounty = /^([NEWS]{1,3})\sof\s(.+)$/.exec(county);
        if (fixCounty) county = `${cardinal(fixCounty[1])} of ${fixCounty[2]}`;
      }
    }
  }
  return { title, county, state, country };
};
