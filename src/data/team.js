export const TEAM_LEAD = {
  name: "Marco Antonio González Morales",
  role: "Customer Success",
  cv: null,
};

export const TEAM_REPORTS = [
  {
    name: "Miriam Dessire Martínez",
    role: "UX Researcher",
    cv: {
      title: "CV — Miriam Dessire Martínez",
      subtitle: "UX Researcher",
      url: "https://iytpfckxdikpqqzmstyp.supabase.co/storage/v1/object/public/business-case-images/Documentos/CV_Miriam_Dessire_Martinez_2026_OPS%20(1).pdf",
    },
  },
  {
    name: "Karla Itzel De la O Calleja",
    role: "UX/UI Designer",
    cv: {
      title: "CV — Karla Itzel De la O Calleja",
      subtitle: "UX/UI Designer",
      url: "https://iytpfckxdikpqqzmstyp.supabase.co/storage/v1/object/public/business-case-images/Documentos/UX-Karla%20Itzel%20De%20la%20O%20Calleja_FULL%20(1).pdf",
    },
  },
  {
    name: "Liliana Torres",
    role: "UX Writer",
    cv: {
      title: "CV — Liliana Torres",
      subtitle: "UX Writer",
      url: "https://iytpfckxdikpqqzmstyp.supabase.co/storage/v1/object/public/business-case-images/Documentos/LilianaTorres-UIX-2025%20(1).pdf",
    },
  },
];

export const TEAM_CV_DOCS = TEAM_REPORTS.filter((m) => m.cv).map((m) => m.cv);
