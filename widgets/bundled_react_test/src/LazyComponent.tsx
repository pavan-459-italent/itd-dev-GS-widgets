import { useEffect } from "react";

interface LazyComponentProps {
  onLoaded: () => void;
  onError: (error: string) => void;
}

function LazyComponent({ onLoaded, onError }: LazyComponentProps) {
  useEffect(() => {
    try {
      onLoaded();
    } catch (err) {
      onError(err instanceof Error ? err.message : String(err));
    }
  }, [onLoaded, onError]);

  return (
    <div
      style={{
        marginTop: "12px",
        padding: "16px",
        background: "#f0fdf4",
        borderRadius: "8px",
        border: "1px solid #86efac",
      }}
    >
      <h4 style={{ margin: "0 0 8px 0", color: "#166534" }}>
        Lazy Component Loaded!
      </h4>
      <p style={{ margin: 0, color: "#15803d" }}>
        This component was loaded via React.lazy() and dynamic import().
        <br />
        If code splitting is enabled, this would be a separate chunk file.
      </p>
    </div>
  );
}

export default LazyComponent;
