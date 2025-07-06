# Code Review: `ContentBrowser.tsx`

This review focuses on the **Trending Now** category and identifies **3 high-impact issues** related to **performance**, **accessibility**, and **code structure**. Each issue includes actionable recommendations with `before/after` examples.

---

## 1. Performance: Unnecessary Re-renders and Inline Styles

### Problem
- The entire `ContentBrowser` re-renders when only individual content items change.
- Inline styles in JSX lead to recalculation on every render and hinder caching optimizations.
- No memoization for content items or fetch logic.

### Solution
- Replace inline styles with Tailwind CSS utility classes for better performance and maintainability.
- Extract `<ContentItem>` into a separate **memoized** component using `React.memo()` to prevent unnecessary re-renders.

### Before
```tsx
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
```

### After
```tsx
<div className="flex overflow-x-scroll gap-4 py-5">
  {trendingContent.map((item) => (
    <ContentItem key={item.id} item={item} />
  ))}
</div>

// components/ContentItem.tsx
import React from "react";
import { ContentItem as ContentItemType } from "@/types/content";

const ContentItem = React.memo(({ item }: { item: ContentItemType }) => (
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

export default ContentItem;
```

---

## 2. Accessibility: Improve Semantic HTML and ARIA Support

### Problem
- Interactive content blocks use `<div>` elements, which are not keyboard focusable.
- Missing meaningful `alt` attributes for images.
- No ARIA landmarks for screen readers.

### Solution
- Add descriptive `alt` text and `aria-label` for assistive technology.
- Ensure keyboard focus with `tabIndex` and focus states.

### Before
```tsx
<div
  key={item.id}
  className="content-item"
  onClick={() => console.log(item)}
>
  <img src={item.thumbnail} alt={item.title} />
  <h3>{item.title}</h3>
</div>
```

### After
```tsx
<div
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    className="block min-w-[200px] border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
    aria-label={`Open details for ${item.title}`}
>
  <img
    src={item.thumbnail}
    alt={`Poster for ${item.title}`}
    className="w-full h-[120px] object-cover rounded"
  />
  <h3 className="font-semibold mt-2 text-gray-600">{item.title}</h3>
  <p className="text-gray-600 text-sm">{item.year} • {item.rating}/10</p>
</div>
```

---

## 3. Code Structure: Isolate API Logic and Improve Scalability

### Problem
- Fetching logic and pagination are tightly coupled to the `ContentBrowser` component.
- Mocked data and types are mixed in multiple locations, increasing coupling.
- No clear folder structure for scalability.

### Solution
- Isolate API logic in `src/api/content.ts`.
- Centralize type definitions in `src/types/content.ts`.
- Move mocked data to `src/mocks/api/content.ts`.
- Refactor pagination into a reusable custom hook `useContentPagination()`.

### Before
```tsx
const fetchContent = async (page: number): Promise<ApiResponse> => {
  const response = await fetch(`/api/content?page=${page}`);
  return response.json();
};

const ContentBrowser: React.FC = () => {
  const [trendingContent, setTrendingContent] = useState<ContentItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    fetchContent(page)
      .then((data) => setTrendingContent(data.categories.trending))
      .catch(() => setError("Failed to load content"))
      .finally(() => setLoading(false));
  }, [page]);
  ...
};
```

### After
```tsx
// src/api/content.ts
export const fetchContent = async (
  page: number,
  category: keyof ApiResponse["categories"] = "trending"
): Promise<ApiResponse> => {
  return new Promise<ApiResponse>((resolve, reject) => {
    setTimeout(() => {
      if (page === 3) {
        reject(new Error("Simulated API failure"));
      } else {
        resolve(MOCKED_CONTENT_DATA);
      }
    }, 1000);
  });
};

// src/hooks/useContentPagination.ts
export const useContentPagination = (
  category: keyof ApiResponse["categories"] = "trending"
) => {
  // Logic for pagination and API fetch
};
```

---
