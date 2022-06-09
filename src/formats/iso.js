import { crossJoin } from "../util/crossJoin";

export const date = [
    "%Y-%M-%D",
    "%C",
    "%X",
    "%Y",
    "%Y-%M",
    "%Y-%O",
    "%V-W%W",
    "%V-W%W-%w",
    "%Y%M%D",
    "%Y%O",
    "%VW%W",
    "%VW%W%w",
];

const base_time = [
    "%h",
    "%,1h",
    "%.1h",
    "%h:%m",
    "%h:%,1m",
    "%h:%.1m",
    "%h:%m:%s",
    "%h:%m:%.1s",
    "%h:%m:%.2s",
    "%h:%m:%,3s",
    "%h:%m:%.3s",
    "%h:%m:%s,%u",
    "%h:%m:%s.%u",
];

const timezone_time = [
    ...base_time,
    ...base_time.map(f => `${f}Z`),
    ...base_time.map(f => `${f}%Z`),
    ...base_time.map(f => `${f}%Z:%z`),
];


const prefixed_time = [
    ...timezone_time,
    ...timezone_time.map(f => `T${f}`),
];

const basic_time = [
    ...prefixed_time,
    ...prefixed_time.map(f => f.replace(/:/g,"")),
    // Sample of positive 00:00 timezone
    "%h:%m:%s+00:00",
    "%h:%m:%.1s+00:00",
    "%h:%m:%.3s+00:00",
    "%h:%m:%s.%u+00:00",
];

export const time = [...new Set(basic_time)];

const full_date = [
  "%Y-%M-%D",
  "%V-W%W-%w",
  "%Y-%O",
];

export const dateTime = [
    ...crossJoin(full_date, timezone_time).map(([d, t]) => `${d}T${t}`),
    ...crossJoin(full_date, timezone_time).map(([d, t]) => `${d}T${t}`.replace(/[-:]/g, "")),
    // Sample using U+2010
    "%Y‐%M‐%DT%h:%m:%sZ",
    // Sample of positive timezone
    "%Y-%M-%DT%h:%m:%s+08",
    "%Y-%M-%DT%h:%m:%s+08:45",
    // Sample of negative timezone
    "%Y-%M-%DT%h-12",
    "%Y-%M-%DT%h-12:00",
    "%Y-%M-%DT%h:%m-12",
    "%Y-%M-%DT%h:%m-12:00",
    // Sample of negative timezone with U+2212
    "%Y-%M-%DT%h:%m:%s−12",
    "%Y-%M-%DT%h:%m:%s−12:00",
    // Sample of positive 00:00 timezone
    "%Y-%M-%DT%h:%m:%s+00:00",
    "%Y-%M-%DT%h:%m:%.3s+00:00",
];

export const period = [
    "P1Y",
    "P1,5Y",
    "P1.5Y",
    "P1M",
    "P1W",
    "P1D",
    "PT1H",
    "PT1M",
    "PT1S",
    "PT1,5S",
    "PT1.5S",
    "P1Y1M",
    "P1Y1D",
    "P1Y1M1D",
    "P1DT1H",
    "P1MT1M",
    "P1DT1M",
    "P1WT1M",
    "P1WT1M1S",
    "P1DT1.000S",
    "P1DT1H1M1.1S",
];

const example_periods = [
    "P1Y",
    "P1M",
    "P1D",
];

const example_dateTimes = crossJoin(full_date, ["%h","%h:%m","%h:%m:%s","%h:%m:%.3s","%h:%mZ"]).map(([d,t]) => `${d}T${t}`);

export const range = [
  ...crossJoin(full_date, example_periods).map(([d, p]) => `${d}/${p}`),
  ...crossJoin(full_date, full_date).map(([d1, d2]) => `${d1}/${d2}`),
  ...crossJoin(example_periods, full_date).map(([p, d]) => `${p}/${d}`),

  ...crossJoin(example_dateTimes, ["P1DT1H"]).map(([d, p]) => `${d}/${p}`),
  ...crossJoin(example_dateTimes, ["P1DT1H"]).map(([d, p]) => `${p}/${d}`),

  ...crossJoin(full_date, ["P1Y"]).map(([d, p]) => `R/${d}/${p}`),
  ...crossJoin(full_date, full_date).map(([d1, d2]) => `R/${d1}/${d2}`),

  ...crossJoin(full_date, ["P1Y"]).map(([d, p]) => `R10/${d}/${p}`),
  ...crossJoin(full_date, full_date).map(([d1, d2]) => `R10/${d1}/${d2}`),
];