# Product Roadmap Details Feature

This feature provides a comprehensive view of product EOL/roadmap data with filtering, sorting, and visualization capabilities.

## Structure

```
features/analytics/product-roadmap-details/
├── components/
│   ├── RoadmapDetailsTable.js      # Main data table with filters and sorting
│   ├── RoadmapOverviewCards.js     # Overview metrics cards
│   ├── RoadmapTimelineChart.js     # Timeline visualization chart
│   └── index.js                    # Components exports
├── constants/
│   └── index.js                    # All constants and configurations
├── utils/
│   └── index.js                    # Reusable utility functions
├── ProductRoadmapDetails.js        # Main page component
└── index.js                        # Feature export
```

## Constants

### Status and Health Mappings

- `STATUS_TYPES`: Available status types for roadmap items
- `STATUS_COLORS`: Color mapping for different statuses
- `HEALTH_COLORS`: Color mapping for health indicators

### UI Configuration

- `OVERVIEW_CARD_CONFIGS`: Configuration for overview metric cards
- `DEFAULT_SORT`: Default sorting configuration
- `FILTER_ALL_OPTION`: Constant for "All" filter option

## Utility Functions

### Data Processing

- `calculateRoadmapMetrics(details)`: Calculate completion metrics
- `generateOverviewCards(metrics, cardConfigs)`: Generate overview cards with metrics data

### Filtering and Sorting

- `filterRoadmapItems(items, searchTerm, statusFilter, healthFilter)`: Filter roadmap items
- `sortRoadmapItems(items, sortField, sortDirection)`: Sort roadmap items
- `getUniqueValues(items, field)`: Get unique values for filter dropdowns

### UI Helpers

- `getStatusColor(status)`: Get MUI color for status
- `getStatusIcon(status)`: Get appropriate icon for status
- `getHealthColor(health)`: Get MUI color for health status
- `getOverviewCardIcon(cardKey)`: Get icon for overview cards
- `getDateValue(dateStr)`: Convert date strings for sorting

## Components

### RoadmapDetailsTable

- **Features**: Search, filtering by status/health, sortable columns
- **Data**: Displays go-live dates, scope, health, status, and summaries
- **Interactions**: Action menus, hover effects, responsive design

### RoadmapOverviewCards

- **Metrics**: Total items, completed items, planning items, completion rate
- **Design**: Color-coded cards with icons and responsive grid layout

### RoadmapTimelineChart

- **Visualization**: Bar chart showing items by year and status
- **Data**: Combines roadmap details and items for comprehensive view
- **Styling**: MUI X-Charts with consistent color scheme

## Usage

```javascript
import { ProductRoadmapDetails } from './features/analytics/product-roadmap-details';

// Use in routing
<Route path='/product-roadmap-details' element={<ProductRoadmapDetails />} />;
```

## Data Requirements

The component expects data in the following format:

```json
{
  "productRoadmap": {
    "items": [{ "name": "Item Name", "year": "2025", "type": "Upgrade" }],
    "details": [
      {
        "goLive": "May 4th",
        "scope": "Portal",
        "region": "Americas",
        "health": "Green",
        "currentStatus": "Completed",
        "overallSummary": "Description of the item..."
      }
    ]
  }
}
```

## Benefits of Refactoring

1. **Maintainability**: Separated concerns with dedicated utils and constants
2. **Reusability**: Utility functions can be used across components
3. **Consistency**: Centralized constants ensure consistent behavior
4. **Testability**: Isolated functions are easier to unit test
5. **Scalability**: New features can easily leverage existing utilities
