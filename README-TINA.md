# TinaCMS Setup for ILH

## What is TinaCMS?

TinaCMS is a Git-based CMS that lets you edit content directly in the browser and save changes to your MDX files in Git. Perfect for the ILH editorial workflow.

## Features

✅ **Visual editing** - Edit content directly on the page
✅ **Built-in workflow** - Writers → BHMS Reviewers → Compliance
✅ **Draft system** - Save without publishing
✅ **Git-based** - All changes are versioned
✅ **Works with existing MDX** - No migration needed
✅ **Multilingual ready** - Extend for Hindi/Tamil content

## Setup

### 1. Get Tina Cloud credentials

1. Go to https://tina.io
2. Create an account
3. Create a new project
4. Copy your `TINA_CLIENT_ID` and `TINA_TOKEN`
5. Add them to `.env.local`:

```bash
TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
```

### 2. Start TinaCMS

```bash
npm run dev
```

This starts both TinaCMS and Next.js together.

### 3. Access the CMS

- **Admin UI**: http://localhost:3000/admin
- **Visual editing**: http://localhost:3000/[any-page]

In admin mode, click "Edit" button to enter visual editing.

## Workflow

### For Writers:
1. Go to http://localhost:3000/admin
2. Create new remedy or guide
3. Write content in the rich text editor
4. Add tags, reviewer, dates
5. Save draft

### For BHMS Reviewers:
1. Open content in visual editor
2. Review and edit as needed
3. Update reviewer attribution
4. Mark as approved in git

### For Compliance Officer:
1. Review approved content
2. Final compliance check
3. Merge to main branch
4. Auto-deploy to production

## Adding Translations

To add Hindi/Tamil support:
1. Update `tina/config.ts`
2. Add collections for `content/hi/remedies` and `content/ta/remedies`
3. Re-run `tinacms dev`

## Deployment

TinaCMS works with Vercel:

1. Add environment variables in Vercel:
   - `TINA_CLIENT_ID`
   - `TINA_TOKEN`
   - `NEXT_PUBLIC_TINA_CLIENT_ID` (same as client ID)

2. Deploy normally - TinaCMS syncs via git

## Benefits for ILH

- ✅ No separate admin panel setup needed
- ✅ Content stays in git (audit trail)
- ✅ Works with existing workflow (BHMS reviewers, compliance)
- ✅ Supports the "Draft-admin" tool from PRD Phase 3
- ✅ Can handle 1500+ legacy article migration
- ✅ Free for small teams, affordable for scale

## Docs

- TinaCMS: https://tina.io/docs
- Visual Editing: https://tina.io/docs/visual-editing
- Git Workflow: https://tina.io/docs/git-workflow

