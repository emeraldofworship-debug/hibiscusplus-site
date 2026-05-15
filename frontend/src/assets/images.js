// Centralised media URLs — HibiscusPlus user-provided assets.
import axios from 'axios';

const BASE = "https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts";

const DEFAULT_LOGO = `${BASE}/wmxpysl8_1000285452.png`;

export const IMG = {
  // Logo — initially the default; replaced at runtime by AppBranding.
  logo: DEFAULT_LOGO,
  defaultLogo: DEFAULT_LOGO,

  // Newly uploaded AVIF lifestyle / product assets
  avifAmberTea: `${BASE}/es20z9p4_c6bd88_826e8c717daa4cb3b8994c0efcf1b563~mv2.avif`,
  avifTeaByWindow: `${BASE}/pdmhq2jh_c6bd88_22879bdb819e4e3f822f97d4ed5d3237~mv2.avif`,
  avifRedPitcher: `${BASE}/6dm7dzp2_c6bd88_b894f60cb1b94012afaaa25f726172f9~mv2.avif`,
  avifPouchBowl: `${BASE}/qdhwsga1_c6bd88_d67eb8f8c8dd4e5ba51207f49473b615~mv2.avif`,
  avifMugPetals: `${BASE}/jobty70m_c6bd88_e44376b4b1364baa9ffdf3eea4a93801~mv2.avif`,

  // Existing curated images
  teaIngredients: `${BASE}/98wcn0lj_hibiscusplus_tea.jpg`,
  heroDrink: `${BASE}/cr446avj_Untitled%20%282%29.png`,
  pourDrink: `${BASE}/ui1jq7oq_Untitled%20%281%29.png`,
  tropicalJuice: `${BASE}/mr031toz_image%20%282%29%282%29.png`,
  juiceTrio: `${BASE}/rlmxmcsb_image%281%29.png`,
  streetFoodPlatter: `${BASE}/13mt3q4c_007.jpg`,
  breakfastPlate: `${BASE}/hud47goh_008.jpg`,
  puffPuffZobo: `${BASE}/pb4mbq6e_20260305_153012%20%281%29.png`,
};

// Fetch admin-overridden logo on first import. Listeners can subscribe to
// `branding-updated` window events to re-render. (Components that read IMG.logo
// once on mount won't update — Navbar/Footer instead use the React hook below
// so they always reflect the latest value.)
let _resolvers = [];
let _loaded = false;
export const refreshBranding = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/settings/branding`);
    if (data?.logo_url) {
      IMG.logo = data.logo_url;
    }
  } catch { /* keep default */ }
  _loaded = true;
  _resolvers.forEach((fn) => fn(IMG.logo));
  _resolvers = [];
};

export const onceBrandingLoaded = () => new Promise((resolve) => {
  if (_loaded) resolve(IMG.logo);
  else _resolvers.push(resolve);
});

if (typeof window !== 'undefined') refreshBranding();

export default IMG;
