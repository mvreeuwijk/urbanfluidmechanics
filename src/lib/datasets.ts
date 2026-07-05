// Dataset loader. Currently returns the synthetic seed; when the real Google Sheet
// is ready, replace `loadRaw()` with a build-time CSV fetch — nothing else changes.
import synthetic from '../data/datasets.synthetic.json';

export interface Article { title: string; doi?: string; year: number; }
export interface Dataset {
  id: string;
  projectName: string;
  description: string;
  method: string[];
  morphology: string[];
  quantities: string[];
  institution: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  correspondingAuthor: { name: string; email: string };
  projectUrl?: string;
  dataAvailableFrom?: string;
  keyArticle: Article;
  additionalInfo?: string;
}

/** Data source is synthetic for now (see spec §6.3). */
export const DATA_IS_SYNTHETIC = true;

function loadRaw(): Dataset[] {
  return (synthetic as Dataset[]).slice().sort((a, b) => a.projectName.localeCompare(b.projectName));
}

export const datasets: Dataset[] = loadRaw();

/** Primary method → drives chip/pin colour: 'field' | 'lab' | 'cfd'. */
export function primaryType(d: Dataset): 'field' | 'lab' | 'cfd' {
  if (d.method.some((m) => /field/i.test(m))) return 'field';
  if (d.method.some((m) => /physical|model|lab|tunnel|flume/i.test(m))) return 'lab';
  return 'cfd';
}

export const TYPE_LABEL: Record<'field' | 'lab' | 'cfd', string> = {
  field: 'Field', lab: 'Lab', cfd: 'CFD',
};

/** Sorted unique facet values across all datasets. */
export function facet(key: 'method' | 'morphology' | 'quantities' | 'institution'): string[] {
  const set = new Set<string>();
  for (const d of datasets) {
    const v = d[key];
    if (Array.isArray(v)) v.forEach((x) => set.add(x));
    else set.add(v);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

/** Key articles, newest first, de-duplicated by DOI/title, linked to their dataset. */
export function papers(): (Article & { datasetId: string; datasetName: string; institution: string })[] {
  const seen = new Set<string>();
  const out: (Article & { datasetId: string; datasetName: string; institution: string })[] = [];
  for (const d of datasets) {
    const key = d.keyArticle.doi ?? d.keyArticle.title;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ ...d.keyArticle, datasetId: d.id, datasetName: d.projectName, institution: d.institution });
  }
  return out.sort((a, b) => b.year - a.year);
}

/** Lightweight points for the Leaflet map (no need to ship full records to the client). */
export function mapPoints() {
  return datasets.map((d) => ({
    id: d.id,
    name: d.projectName,
    city: d.city,
    country: d.country,
    lat: d.lat,
    lng: d.lng,
    type: primaryType(d),
    institution: d.institution,
  }));
}
