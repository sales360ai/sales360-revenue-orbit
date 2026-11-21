CREATE TABLE public.lead_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  interest TEXT NOT NULL,
  goal TEXT
);

GRANT ALL ON public.lead_submissions TO service_role;

ALTER TABLE public.lead_submissions ENABLE ROW LEVEL SECURITY;