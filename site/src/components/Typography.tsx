import type { ReactNode } from "react";
import type { Headline } from "@/content/copy";

export function DisplayHeadline({
  headline,
  level = "h2",
  className = "display-l",
  after,
}: {
  headline: Headline;
  level?: "h1" | "h2";
  className?: string;
  after?: ReactNode;
}) {
  const content = (
    <>
      {headline.lead}
      <br />
      <em>{headline.accent}</em>
      {after}
    </>
  );

  return level === "h1" ? (
    <h1 className={className}>{content}</h1>
  ) : (
    <h2 className={className}>{content}</h2>
  );
}

export function SectionLabel({
  index,
  children,
  className = "section-label",
}: {
  index: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={className}>
      <span className="index">{index}</span>
      <span>{children}</span>
    </p>
  );
}
