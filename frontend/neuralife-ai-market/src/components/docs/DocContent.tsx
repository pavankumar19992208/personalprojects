import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // A nice dark theme for code blocks
import { useParams } from "react-router-dom";
import { DOCS_SECTIONS } from "./docsData";

export default function DocContent() {
  const { sectionId } = useParams();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const section =
      DOCS_SECTIONS.find((s) => s.id === sectionId) || DOCS_SECTIONS[0];

    // Construct the correct path using the base URL
    const filePath = `${import.meta.env.BASE_URL}docs/${section.file}`;

    fetch(filePath)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Documentation file not found at: ${filePath}`);
        }
        return res.text();
      })
      .then(setContent)
      .catch((error) => {
        console.error(error);
        setContent(
          "### ❌ Error loading documentation\n\nPlease ensure the markdown file exists in the `public/docs` directory and the application's base path is configured correctly."
        );
      })
      .finally(() => setLoading(false));
  }, [sectionId]);

  if (loading) {
    return <div className="flex-1 p-8">Loading...</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10">
      <article className="prose prose-primary max-w-none">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
