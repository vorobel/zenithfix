import ContentBrowser from "@/components/ContentBrowser";

export default function Home() {
  return (
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Trending Now</h2>

        <ContentBrowser  />
      </div>
  )
}
