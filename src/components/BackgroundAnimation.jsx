export default function BackgroundAnimation() {
  return (
    <div className="bg-animation-wrapper -z-10 opacity-40 dark:opacity-100 transition-opacity">
      <div className="bg-animation-content">
        <div className="bg-obj obj-1" aria-hidden="true"></div>
        <div className="bg-obj obj-2" aria-hidden="true"></div>
        <div className="bg-obj obj-3" aria-hidden="true"></div>
        <div className="bg-obj obj-4" aria-hidden="true"></div>
        <div className="bg-obj obj-5" aria-hidden="true"></div>
        <div className="bg-obj obj-6" aria-hidden="true"></div>
      </div>
    </div>
  );
}
