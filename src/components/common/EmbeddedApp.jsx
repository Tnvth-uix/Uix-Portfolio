export default function EmbeddedApp({ src, title }) {
  return (
    <div className="embed-frame">
      <iframe src={src} title={title} loading="lazy" />
    </div>
  );
}
