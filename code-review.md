```markdown
# Code Review: `ContentBrowser.tsx`

This code review identifies **3 high-impact issues** in `ContentBrowser.tsx` and provides actionable recommendations to improve **performance**, **accessibility**, and **code structure**.

---

## 1. Performance: Unnecessary Re-renders and Inline Styles

### Problem
- Inline styles are recalculated on every render, impacting performance.  
- The entire component re-renders when only individual content items change.  
- No caching or optimization for repeated fetch calls.  

### Solution
- Replace inline styles with Tailwind CSS utility classes for better performance and maintainability.  
- Extract `<ContentItem>` into a separate memoized component using `React.memo` to avoid unnecessary re-renders.  

---

### **Before/After**
```tsx
// BEFORE
<div
  className="content-grid"
  style={{
    display: "flex",
    overflowX: "scroll",
    gap: "16px",
    padding: "20px 0",
  }}
>
  {trendingContent.map((item) => (
    <div
      key={item.id}
      style={{
        minWidth: "200px",
        cursor: "pointer",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "12px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <img
        src={item.thumbnail}
        alt={item.title}
        style={{
          width: "100%",
          height: "120px",
          objectFit: "cover",
        }}
      />
      <h3>{item.title}</h3>
      <p>{item.year} • {item.rating}/10</p>
    </div>
  ))}
</div>

// AFTER
<div className="flex overflow-x-scroll gap-4 py-5">
  {trendingContent.map((item) => (
    <ContentItem key={item.id} item={item} />
  ))}
</div>

// components/ContentItem.tsx
import React from "react";
import { ContentItem } from "../types/content";

const ContentItem = React.memo(({ item }: { item: ContentItem }) => (
  <div className="min-w-[200px] cursor-pointer border rounded-lg p-3 bg-gray-50 hover:bg-gray-100">
    <img
      src={item.thumbnail}
      alt={item.title}
      className="w-full h-[120px] object-cover rounded"
    />
    <h3 className="font-semibold mt-2">{item.title}</h3>
    <p className="text-gray-600 text-sm">
      {item.year} • {item.rating}/10
    </p>
  </div>
));
