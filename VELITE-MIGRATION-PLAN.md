# Velite Migration Plan

## Current Status

✅ **Velite installed** (Next.js 15 compatible)  
❌ **Contentlayer config exists** (not compatible)  
✅ **Custom MDX system working** (lib/mdx.ts)

## Migration Options

### Option 1: Full Velite Integration (Recommended)
- Replace `lib/mdx.ts` with Velite queries
- Get type-safe content with Zod validation
- Automatic TypeScript types generated
- Requires updating all content loading code

### Option 2: Hybrid Approach (Quick)
- Keep existing `lib/mdx.ts` system
- Add Velite config for documentation/validation
- Use Velite types for reference
- Migrate gradually

### Option 3: Keep Current System
- Remove Contentlayer config
- Keep custom MDX loader
- Add Velite config as documentation only

## Recommendation

**Start with Option 2** (Hybrid):
1. Create velite.config.ts with same schema
2. Remove contentlayer.config.ts
3. Keep lib/mdx.ts working
4. Later migrate to full Velite if needed

This gives us:
- ✅ Working site immediately
- ✅ Type-safe schema definition
- ✅ Future migration path
- ✅ No breaking changes

## Next Steps

1. ✅ Install Velite
2. 🔄 Create velite.config.ts (in progress)
3. ⏳ Fix Velite API usage
4. ⏳ Remove contentlayer.config.ts
5. ⏳ Test build
6. ⏳ Update documentation

