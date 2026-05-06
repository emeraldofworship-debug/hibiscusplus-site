import { useEffect, useState } from 'react';
import axios from 'axios';
import { IMG } from '../assets/images';

/**
 * Returns the current HibiscusPlus logo URL — admin-overridable.
 * Hits /api/settings/branding once per mount; falls back to the bundled default.
 */
export const useLogo = () => {
  const [logo, setLogo] = useState(IMG.logo);

  useEffect(() => {
    let cancelled = false;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/settings/branding`)
      .then((res) => {
        if (cancelled) return;
        if (res?.data?.logo_url) {
          IMG.logo = res.data.logo_url;
          setLogo(res.data.logo_url);
        }
      })
      .catch(() => { /* keep default */ });
    return () => { cancelled = true; };
  }, []);

  return logo;
};
