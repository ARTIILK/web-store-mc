/**
 * ARMOR SKIN TEXTURE SYSTEM - ARCHITECTURE
 * =========================================
 * 
 * OVERVIEW:
 * The armor skin texture system allows admins to assign different armor skins/textures
 * to kits in the backend. Regular users can ONLY view the applied texture, not change it.
 * 
 * COMPONENTS:
 * -----------
 * 1. ArmorPreview.tsx
 *    - Renders 3D armor models with color/texture applied
 *    - Props: color, enchanted, textureUrl, armorType
 *    - Used on: Home page, Kits page
 * 
 * 2. ArmorSkinSelector.tsx
 *    - DEPRECATED from frontend (removed from user pages)
 *    - Contains predefined armor skins (Iron, Diamond, Netherite, Gold, Copper)
 *    - Now used only by AdminArmorManager component
 * 
 * 3. AdminArmorManager.tsx
 *    - Admin-only component for assigning textures to kits
 *    - Shows drop-down selector only if user.isAdmin === true
 *    - Returns read-only display for regular users
 *    - Props: kitId, currentSkin, customColor, onSkinAssign, isAdmin
 * 
 * DATABASE SCHEMA (Backend Integration):
 * ======================================
 * Extend the Kit model with:
 * 
 * {
 *   id: string,
 *   name: string,
 *   price: number,
 *   ...otherFields,
 *   armor: {
 *     type: 'iron' | 'diamond' | 'netherite' | 'gold' | 'copper' | 'custom',
 *     color: string, // hex color code
 *     customTextureUrl: string?, // optional custom texture URL
 *     enchanted: boolean
 *   }
 * }
 * 
 * API ENDPOINTS (Backend):
 * =======================
 * 
 * GET /api/admin/kits/:kitId
 *   - Returns kit data including armor settings
 *   - Admin auth required
 * 
 * PATCH /api/admin/kits/:kitId/armor
 *   - Update armor settings for a kit
 *   - Admin auth required
 *   - Payload: { type: 'diamond', color: '#33ebcb', customTextureUrl?: string }
 *   - Response: updated kit with new armor settings
 * 
 * POST /api/admin/kits/:kitId/armor/upload
 *   - Upload custom texture image
 *   - Admin auth required
 *   - Returns: { textureUrl: 'https://...' }
 * 
 * FRONTEND USAGE (Admin Dashboard - Not Yet Implemented):
 * ========================================================
 * 
 * import AdminArmorManager from '@/components/AdminArmorManager';
 * 
 * function AdminKitEditor({ kit }) {
 *   const { user } = useUserStore();
 * 
 *   const handleArmorAssign = async (kitId, skin, color) => {
 *     await api.patch(`/api/admin/kits/${kitId}/armor`, {
 *       type: skin,
 *       color: color
 *     });
 *     // Refresh kit data
 *   };
 * 
 *   return (
 *     <AdminArmorManager
 *       kitId={kit.id}
 *       currentSkin={kit.armor?.type || 'iron'}
 *       customColor={kit.armor?.color}
 *       onSkinAssign={handleArmorAssign}
 *       isAdmin={user?.role === 'admin'}
 *     />
 *   );
 * }
 * 
 * CURRENT FRONTEND BEHAVIOR:
 * ==========================
 * ✅ Home Page: Kits display with admin-assigned armor textures
 * ✅ Kits Page: Users see 3D preview with applied texture (non-interactive)
 * ✅ Users cannot change/select textures
 * ⏳ Admin Panel: AdminArmorManager component ready for backend integration
 * 
 * FUTURE ENHANCEMENTS:
 * ====================
 * - Custom texture upload for admins
 * - Texture preview in admin dashboard
 * - Batch armor assignment to multiple kits
 * - Texture presets library
 */

export const ARMOR_SYSTEM_CONFIG = {
  AVAILABLE_SKINS: ['iron', 'diamond', 'netherite', 'gold', 'copper'],
  CUSTOM_SKIN_IDENTIFIER: 'custom',
  DEFAULT_SKIN: 'iron',
  ADMIN_ONLY: true
} as const;
