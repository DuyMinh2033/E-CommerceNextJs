"use client";
import React, { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

interface Props {
  content: string;
}

const ContentComponent: React.FC<Props> = ({ content }) => {
  const [clientContent, setClientContent] = useState("");

  useEffect(() => {
    setClientContent(DOMPurify.sanitize(content));
  }, [content]);

  useEffect(() => {
    const removeAttributes = () => {
      document.documentElement.removeAttribute("data-new-gr-c-s-check-loaded");
      document.documentElement.removeAttribute("data-gr-ext-installed");
    };
    removeAttributes();
  }, []);

  return (
    <p
      className="text-base mt-3 text-gray-500"
      dangerouslySetInnerHTML={{
        __html: clientContent,
      }}
    />
  );
};

export default ContentComponent;
