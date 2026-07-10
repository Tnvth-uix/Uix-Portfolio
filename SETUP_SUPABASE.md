# Supabase Integration Setup Guide

This guide explains how to set up Supabase for the Business Cases app with two authentication modes: **viewer** and **admin**.

## Overview

- **Viewer mode** (`SomosLosMejoresUIX`) — Read-only access, cached data only
- **Admin mode** (`Esundemo1`) — Full CRUD operations, Supabase write access
- No user authentication required; password-based mode selection
- All data stored in Supabase tables with localStorage as fallback cache

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your **Project URL** and **Anon Key** from Settings → API

## Step 2: Configure Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

These are public (client-side safe) keys used for storage and basic queries only.

## Step 3: Create Database Tables

In the Supabase dashboard, go to SQL Editor and run these queries:

### business_cases table
```sql
CREATE TABLE public.business_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_example BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_business_cases_slug ON public.business_cases(slug);
```

### section_images table
```sql
CREATE TABLE public.section_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_case_id UUID NOT NULL REFERENCES public.business_cases(id) ON DELETE CASCADE,
  section_index INTEGER NOT NULL,
  layout TEXT DEFAULT 'single',
  image_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_section_images_case ON public.section_images(business_case_id);
```

### deck_pending table
```sql
CREATE TABLE public.deck_pending (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_case_id UUID NOT NULL REFERENCES public.business_cases(id) ON DELETE CASCADE,
  marker_key TEXT NOT NULL,
  value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(business_case_id, marker_key)
);

CREATE INDEX idx_deck_pending_case ON public.deck_pending(business_case_id);
```

### deck_taxonomy table
```sql
CREATE TABLE public.deck_taxonomy (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_case_id UUID NOT NULL REFERENCES public.business_cases(id) ON DELETE CASCADE,
  field TEXT NOT NULL,
  items TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(business_case_id, field)
);

CREATE INDEX idx_deck_taxonomy_case ON public.deck_taxonomy(business_case_id);
```

### interstitials table
```sql
CREATE TABLE public.interstitials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_case_id UUID NOT NULL REFERENCES public.business_cases(id) ON DELETE CASCADE,
  after_index INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(business_case_id, after_index)
);

CREATE INDEX idx_interstitials_case ON public.interstitials(business_case_id);
```

## Step 4: Create Storage Bucket

In the Supabase dashboard:

1. Go to Storage → Buckets
2. Create a new public bucket named `business-case-images`
3. Set it to public (Allow public access for reads)
4. Click Create

## Step 5: Set Row-Level Security (RLS) Policies

For each table, enable RLS and set these policies:

**For all tables (business_cases, section_images, deck_pending, deck_taxonomy, interstitials):**

- **SELECT policy** (Public read):
  ```sql
  CREATE POLICY "Enable read access for all users" ON business_cases
  FOR SELECT USING (TRUE);
  ```
  (Repeat for each table)

- **INSERT/UPDATE/DELETE policies** (Admin only - currently unrestricted):
  ```sql
  CREATE POLICY "Enable admin insert" ON business_cases
  FOR INSERT WITH CHECK (TRUE);
  
  CREATE POLICY "Enable admin update" ON business_cases
  FOR UPDATE USING (TRUE);
  
  CREATE POLICY "Enable admin delete" ON business_cases
  FOR DELETE USING (TRUE);
  ```
  (Repeat for each table)

> **Note:** These policies currently allow anyone with the anon key to write. In production, implement proper user identification (e.g., via a custom claim or IP whitelist).

**For storage bucket (business-case-images):**

- **Download policy** (Public):
  ```sql
  create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'business-case-images' );
  ```

- **Upload policy** (Admin only - currently unrestricted):
  ```sql
  create policy "Authenticated uploads"
  on storage.objects for insert
  with check ( bucket_id = 'business-case-images' );
  ```

## Step 6: Test the Setup

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Enter password: `SomosLosMejoresUIX` (viewer mode)
   - You should see read-only access
   - Upload/delete buttons should be hidden

4. Refresh and enter password: `Esundemo1` (admin mode)
   - You should see full editing capabilities
   - Upload button and delete should be visible

## Troubleshooting

**"Supabase credentials not configured"** — Make sure `.env.local` is set and restart the dev server

**RLS policies blocking access** — Check that policies are enabled and correct in Supabase dashboard

**Images not uploading** — Verify storage bucket exists and policies allow uploads

**Slow data loads** — Use browser DevTools Network tab to check Supabase response times; enable caching in cloudflare if needed

## Future Enhancements

- Add user authentication (Supabase Auth)
- Implement proper admin-only RLS policies based on user ID
- Add audit logging for all changes
- Implement real-time subscriptions for collaborative editing
- Add image optimization (auto-compress before upload)
- Implement version history for business cases
