import ContentItem from "./ContentItem";
import { ContentItem as ContentItemType } from "@/types/content";

interface Props {
    items: ContentItemType[];
    onItemClick?: (item: ContentItemType) => void;
}

const ContentGrid: React.FC<Props> = ({ items, onItemClick }) => (
    <div className="content-section">
        <div className="flex overflow-x-scroll gap-4 py-5">
            {items.map((item) => (
                <ContentItem
                    key={item.id}
                    item={item}
                    onClick={() => onItemClick?.(item)}
                />
            ))}
        </div>
    </div>
);

export default ContentGrid;
