# WoodMC Store Admin Panel - Documentation

## Overview
The admin panel is a comprehensive management system for WoodMC store administrators. It allows full control over products, pricing, inventory, and sales analytics.

## Access

### Frontend Access
- **URL**: `http://localhost:3001/admin`
- **Required**: Admin authentication (checks `user.role === 'admin'`)
- **Navigation**: Click the **Settings ⚙️** icon in the top navbar (only visible when logged in)

### Current Setup
- Admin access is currently unrestricted (for development)
- Implement proper authentication before production

## Panel Structure

### 1. **Admin Dashboard** (`/admin`)
Main overview page with:
- **Quick Stats**: Total kits, ranks, orders, active users
- **Quick Actions**: Fast links to add new items
- **Recent Orders**: Table of latest transactions
- **System Status**: Server health indicators

### 2. **Kits Management** (`/admin/kits`)
Manage game kits:
- **Create Kits**: Add new armor kits with properties
  - Name, Price, Armor Type, Enchantment status
  - Description, Item count
- **Edit Kits**: Modify existing kit details
- **Delete Kits**: Remove kits from store
- **Armor Texture Assignment**: Set armor skins for each kit
- **View Kits**: Preview kit details

### 3. **Ranks Management** (`/admin/ranks`)
Manage membership ranks:
- **Create Ranks**: Add new ranks with benefits
  - Name, Lifetime price, Color theme
  - Feature list, Mark as popular
- **Edit Ranks**: Update rank details
- **Delete Ranks**: Remove ranks
- **Status Management**: Active, Draft, or Archived states

### 4. **Offers Management** (`/admin/offers`)
Create and manage special offers:
- **Create Offers**: Bundle deals, crates, seasonal offers
  - Name, Price, Item count, Discount percentage
  - Expiration date, Status
- **Edit Offers**: Update offer details
- **Time Management**: Set automatic expiration
- **Status Tracking**: Active, Draft, or Archived

### 5. **Analytics** (`/admin/analytics`)
Sales and engagement tracking:
- **Revenue Metrics**: Total revenue, orders, conversion rate
- **Weekly Sales Chart**: Visual sales trends
- **Top Products**: Best selling items by category
- **Revenue Breakdown**: Kits, Ranks, Offers breakdown
- **Category Performance**: Percentage distribution

## Features

### Armor Texture Management (Kit Editor)
When editing kits, admins can:
- Select from predefined armor skins:
  - ✅ Iron (#a8a8a8)
  - ✅ Diamond (#33ebcb)
  - ✅ Netherite (#443a3b)
  - ✅ Gold (#ffd700)
  - ✅ Copper (#b87333)
- Upload custom textures (future feature)
- Preview changes in real-time

**Note**: Regular users can ONLY view textures, not modify them.

### User Roles
```
Admin Panel Access:
├── Full CRUD on Kits
├── Full CRUD on Ranks
├── Full CRUD on Offers
├── Armor texture assignment
├── View analytics & reports
└── System configuration (future)

Regular Users:
├── View products with textures
├── Add to cart
├── Purchase items
└── View account dashboard
```

## Backend Integration Points

### Required API Endpoints

```
// Kits
GET    /api/admin/kits
GET    /api/admin/kits/:id
POST   /api/admin/kits
PATCH  /api/admin/kits/:id
DELETE /api/admin/kits/:id
PATCH  /api/admin/kits/:id/armor

// Ranks
GET    /api/admin/ranks
GET    /api/admin/ranks/:id
POST   /api/admin/ranks
PATCH  /api/admin/ranks/:id
DELETE /api/admin/ranks/:id

// Offers
GET    /api/admin/offers
GET    /api/admin/offers/:id
POST   /api/admin/offers
PATCH  /api/admin/offers/:id
DELETE /api/admin/offers/:id

// Analytics
GET    /api/admin/analytics/overview
GET    /api/admin/analytics/revenue
GET    /api/admin/analytics/products
```

### Database Schema Extensions

**Kits Table**
```javascript
{
  id: string,
  name: string,
  price: number,
  description: string,
  items: Array<ItemDetail>,
  armor: {
    type: 'iron' | 'diamond' | 'netherite' | 'gold' | 'copper',
    color: string, // hex code
    customTextureUrl?: string
  },
  enchanted: boolean,
  status: 'active' | 'draft' | 'archived',
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Ranks Table**
```javascript
{
  id: string,
  name: string,
  price: number,
  color: string,
  description: string,
  features: Array<string>,
  popular: boolean,
  status: 'active' | 'draft' | 'archived',
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Offers Table**
```javascript
{
  id: string,
  name: string,
  price: number,
  items: number,
  discount: number, // percentage
  description: string,
  expiresAt: timestamp,
  status: 'active' | 'draft' | 'archived',
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Development Workflow

### 1. Setting Up Admin Access
```typescript
// In store/index.ts, extend useUserStore
const useUserStore = create<UserState>((set) => ({
  // ... existing code
  role: 'admin' | 'user' | 'moderator',
  // Add role management
}));
```

### 2. Connecting to Backend
Update API calls in each admin page:
```typescript
const handleAddKit = async (kitData) => {
  const response = await fetch('/api/admin/kits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(kitData)
  });
  // Handle response
};
```

### 3. Real-time Updates
Consider implementing:
- WebSocket connections for live updates
- Cache invalidation on data changes
- Optimistic UI updates

## File Structure
```
src/pages/Admin/
├── AdminPanel.tsx          # Main container with routing
├── AdminDashboard.tsx      # Dashboard overview
├── AdminKits.tsx           # Kit management
├── AdminRanks.tsx          # Rank management
├── AdminOffers.tsx         # Offer management
└── AdminAnalytics.tsx      # Analytics & reports

src/components/
├── AdminArmorManager.tsx   # Admin-only armor texture selector
└── CurrencyToggle.tsx      # User-facing currency switcher
```

## Security Considerations

### Authentication
- ✅ Check `user.role === 'admin'` on component load
- ✅ Add auth tokens to API requests
- ✅ Implement 2FA for admin accounts
- ✅ Log all admin actions

### Authorization
- Backend must verify admin role on API calls
- Implement RBAC (Role-Based Access Control)
- Rate limit admin endpoints
- Audit all modifications

### Data Protection
- All admin API endpoints must require authentication
- Validate all input on backend
- Sanitize file uploads
- Encrypt sensitive data

## Future Enhancements

- [ ] Advanced filtering and search
- [ ] Bulk operations (edit multiple items)
- [ ] Custom report generation
- [ ] Email notifications for sales
- [ ] Inventory management
- [ ] Staff account management
- [ ] API key management
- [ ] Backup & restore functionality
- [ ] A/B testing tools
- [ ] Marketing campaign tools

## Support & Troubleshooting

### Common Issues

**Admin panel not accessible:**
- Check user role in database
- Verify authentication token
- Check browser console for errors

**Data not updating:**
- Verify API endpoints are connected
- Check network tab in dev tools
- Ensure backend is responding

**UI elements not rendering:**
- Clear browser cache
- Check for console errors
- Verify all imports are correct

## Contact
For questions or issues with the admin panel, contact the development team.
