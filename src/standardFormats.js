
const time_formats_rfc_only = [
  "%h:%m:%s-00:00",
  "%h:%m:%.3s-00:00",
];

const formats_rfc_only = [
  "%Y-%M-%D %h:%m:%sZ",
  "%Y-%M-%D_%h:%m:%sZ",
  "%Y-%M-%D %h:%m:%sz",
  "%Y-%M-%D_%h:%m:%sz",
  "%Y-%M-%D %h:%m:%.3sZ",
  "%Y-%M-%D_%h:%m:%.3sZ",
  "%Y-%M-%D %h:%m:%.3sz",
  "%Y-%M-%D_%h:%m:%.3sz",
  "%Y-%M-%D %h:%m:%s-00:00",
  "%Y-%M-%D %h:%m:%.3s-00:00",
  "%Y-%M-%DT%h:%m:%s-00:00",
  "%Y-%M-%DT%h:%m:%.3s-00:00",
];

const date_formats_both = [
  "%Y-%M-%D",
];

const time_formats_both_utc = [
  "%h:%m:%sZ",
  "%h:%m:%.1sZ",
  "%h:%m:%.3sZ",
  "%h:%m:%s.%uZ",
  "%h:%m:%s+00:00",
  "%h:%m:%.1s+00:00",
  "%h:%m:%.3s+00:00",
  "%h:%m:%s.%u+00:00",
];

const time_formats_both_local = [
  "%h:%m:%s%Z:%z",
  "%h:%m:%.1s%Z:%z",
  "%h:%m:%.3s%Z:%z",
  "%h:%m:%s.%u%Z:%z",
];

const formats_both_utc = [
  "%Y-%M-%DT%h:%m:%sZ",
  "%Y-%M-%DT%h:%m:%.3sZ",
  "%Y-%M-%DT%h:%m:%s+00:00",
  "%Y-%M-%DT%h:%m:%.3s+00:00",
  "%Y-%M-%DT%h:%m:%s.%u+00:00",
];

const formats_both_local = [
  "%Y-%M-%DT%h:%m:%s%Z:%z",
  "%Y-%M-%DT%h:%m:%.3s%Z:%z",
  "%Y-%M-%DT%h:%m:%s.%u%Z:%z",
];

const full_date_formats = [
  "%Y-%M-%D",
  "%V-W%W-%w",
  "%Y-%O",
];

const basic_time_formats_iso_only = [
  "%h",
  "%,1h",
  "%.1h",
  "%h:%m",
  "%h:%,1m",
  "%h:%.1m",
  "%h:%m:%s",
  "%h:%m:%,3s",
  "%h:%m:%.3s",
  "%h:%m:%s,%u",
  "%h:%m:%s.%u",
];

const expanded_time_formats_iso_only = [
  ...basic_time_formats_iso_only,
  ...basic_time_formats_iso_only.map(s => "T" + s),
];

const time_formats_iso_only = [
  ...new Set([
    ...expanded_time_formats_iso_only,
    ...expanded_time_formats_iso_only.map(s => s.replace(/[-:]/g, "")),
  ]
  )
];

const time_formats_iso_utc = time_formats_iso_only.map(s => s + "Z").filter(s => !time_formats_both_utc.includes(s));

const merged = crossJoin(full_date_formats, basic_time_formats_iso_only).map(([d, t]) => `${d}T${t}`);

const mergedBasic = merged.map(s => s.replace(/[-:]/g, ""));

const mergedBoth = [...merged, ...mergedBasic];

const formats_timezone = [
  "%Y-%M-%DT%h:%m:%s%Z:%z",
  "%Y-%M-%DT%h:%m:%.3s%Z:%z",
];

const formats_timezone_2212 = [
  "%Y-%M-%DT%h%−Z",
  "%Y-%M-%DT%h:%m%−Z",
  "%Y-%M-%DT%h:%m:%s%−Z",
  "%Y-%M-%DT%h:%m:%,3s%−Z",
  "%Y-%M-%DT%h:%m:%.3s%−Z",
  "%Y-%M-%DT%h%−Z:%z",
  "%Y-%M-%DT%h:%m%−Z:%z",
  "%Y-%M-%DT%h:%m:%s%−Z:%z",
  "%Y-%M-%DT%h:%m:%,3s%−Z:%z",
  "%Y-%M-%DT%h:%m:%.3s%−Z:%z",
  "%Y%M%DT%h%−Z",
  "%Y%M%DT%h%m%−Z",
  "%Y%M%DT%h%m%s%−Z",
  "%Y%M%DT%h%m%,3s%−Z",
  "%Y%M%DT%h%m%.3s%−Z",
  "%Y%M%DT%h%−Z%z",
  "%Y%M%DT%h%m%−Z%z",
  "%Y%M%DT%h%m%s%−Z%z",
  "%Y%M%DT%h%m%,3s%−Z%z",
  "%Y%M%DT%h%m%.3s%−Z%z",
];

const date_formats_iso_only = [
  "%L",
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

const formats_iso_only = [
  ...mergedBoth,
  ...mergedBoth.map(s => s + "%Z"),
  ...merged.map(s => s + "%Z:%z"),
  ...mergedBasic.map(s => s + "%Z%z"),
].filter(s => !formats_both_local.includes(s));

export const periods = [
  "P1Y",
  "P1,5Y",
  "P1.5Y",
  "P1M",
  "P1,5M",
  "P1.5M",
  "P1W",
  "P1D",
  "PT1H",
  "PT1M",
  "PT1S",
  "P1Y1M",
  "P1Y1D",
  "P1Y1M1D",
  "P1DT1H",
  "P1MT1M",
  "P1DT1M",
  "P1WT1M",
  "P1WT1M1S",
];

const example_periods = [
  "P1Y",
  "P1M",
  "P1D",
];

export const ranges = [
  ...crossJoin(full_date_formats, example_periods).map(([d, p]) => `${d}/${p}`),
  ...crossJoin(full_date_formats, full_date_formats).map(([d1, d2]) => `${d1}/${d2}`),
  ...crossJoin(example_periods, full_date_formats).map(([p, d]) => `${p}/${d}`),

  ...crossJoin(merged, ["P1DT1H"]).map(([d, p]) => `${d}/${p}`),

  ...crossJoin(full_date_formats, ["P1Y"]).map(([d, p]) => `R/${d}/${p}`),
  ...crossJoin(full_date_formats, full_date_formats).map(([d1, d2]) => `R/${d1}/${d2}`),

  ...crossJoin(full_date_formats, ["P1Y"]).map(([d, p]) => `R10/${d}/${p}`),
  ...crossJoin(full_date_formats, full_date_formats).map(([d1, d2]) => `R10/${d1}/${d2}`),
];

export const date_formats = [
  ...date_formats_both.map(f => ({ format: f, rfc: true, iso: true })),
  ...date_formats_iso_only.map(f => ({ format: f, rfc: false, iso: true })),
];

export const time_formats = [
  ...time_formats_rfc_only.map(f => ({ format: f, timezone: 0, rfc: true, iso: false })),
  ...time_formats_both_utc.map(f => ({ format: f, timezone: 0, rfc: true, iso: true })),
  ...time_formats_both_local.map(f => ({ format: f, timezone: NaN, rfc: true, iso: true })),
  ...time_formats_iso_only.map(f => ({ format: f, timezone: NaN, rfc: false, iso: true })),
  ...time_formats_iso_utc.map(f => ({ format: f, timezone: 0, rfc: false, iso: true })),
];

export const date_time_formats = [
  ...formats_rfc_only.map(f => ({ format: f,                  timezone: 0,            rfc: true, iso: false })),
  ...formats_both_utc.map(f => ({ format: f,                  timezone: 0,            rfc: true, iso: true })),
  ...formats_both_local.map(f => ({ format: f,                timezone: NaN,          rfc: true, iso: true })),
  ...formats_timezone.map(f => ({ format: f.replace("T","t"), timezone: NaN,  rfc: true, iso: true })),
  ...formats_timezone.map(f => ({ format: f,                  timezone: -12 * 60,     rfc: true, iso: true })),
  ...formats_timezone.map(f => ({ format: f,                  timezone: 8 * 60 + 45,  rfc: true, iso: true })),
  ...formats_timezone_2212.map(f => ({ format: f,             timezone: -12 * 60,     rfc: false, iso: true })),
  ...formats_iso_only.map(f => ({ format: f,                  timezone: NaN,          rfc: false, iso: true })),
];

/**
 * @param {any[]} aa
 * @param {any[]} bb
 */
function crossJoin (aa, bb) {
  return aa.map(a => bb.map(b => [a,b])).flat();
}
