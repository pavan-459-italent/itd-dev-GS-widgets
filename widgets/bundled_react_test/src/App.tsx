import { useState, lazy, Suspense, useCallback } from "react";
import iconUrl from "./assets/icon.svg";

const LazyComponent = lazy(() => import("./LazyComponent"));

interface TestResult {
  status: "pending" | "success" | "error";
  message: string;
}

function App() {
  const [assetImportResult, setAssetImportResult] = useState<TestResult>({
    status: "pending",
    message: "Click button to test...",
  });
  const [lazyLoadResult, setLazyLoadResult] = useState<TestResult>({
    status: "pending",
    message: "Click button to test...",
  });
  const [fetchResult, setFetchResult] = useState<TestResult>({
    status: "pending",
    message: "Click button to test...",
  });
  const [showLazy, setShowLazy] = useState(false);

  const testAssetImport = () => {
    try {
      if (iconUrl) {
        setAssetImportResult({
          status: "success",
          message: `SUCCESS: Asset imported as "${iconUrl}"`,
        });
      } else {
        setAssetImportResult({
          status: "error",
          message: "ERROR: Asset import returned undefined",
        });
      }
    } catch (err) {
      setAssetImportResult({
        status: "error",
        message: `ERROR: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  };

  const testLazyLoad = () => {
    setShowLazy(true);
    setLazyLoadResult({
      status: "pending",
      message: "Loading lazy component...",
    });
  };

  const handleLazyLoaded = useCallback(() => {
    setLazyLoadResult({
      status: "success",
      message: "SUCCESS: Lazy component loaded via React.lazy() + import()",
    });
  }, []);

  const handleLazyError = useCallback((error: string) => {
    setLazyLoadResult({
      status: "error",
      message: `ERROR: ${error}`,
    });
  }, []);

  const testRuntimeFetch = async () => {
    try {
      const response = await fetch("./assets/data.json");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      setFetchResult({
        status: "success",
        message: `SUCCESS: ${JSON.stringify(data, null, 2)}`,
      });
    } catch (err) {
      setFetchResult({
        status: "error",
        message: `ERROR: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  };

  return (
    <div className="bundled-react-widget">
      <h2>Bundled React Test Widget</h2>
      <p>
        This widget tests how Vite-bundled React code handles paths after CDN
        deployment.
      </p>

      <div className="test-section">
        <h3>
          1. Static Asset Import{" "}
          <span className="category-label category-bundled">
            BUNDLER HANDLES
          </span>
        </h3>
        <p>
          Import statement: <code>import iconUrl from "./assets/icon.svg"</code>
        </p>
        <button className="test-button" onClick={testAssetImport}>
          Test Asset Import
        </button>
        <div className={`result result-${assetImportResult.status}`}>
          {assetImportResult.message}
        </div>
        {assetImportResult.status === "success" && (
          <div style={{ marginTop: "8px" }}>
            <img src={iconUrl} alt="Imported icon" className="asset-image" />
          </div>
        )}
      </div>

      <div className="test-section">
        <h3>
          2. React.lazy() Dynamic Import{" "}
          <span className="category-label category-bundled">
            BUNDLER HANDLES
          </span>
        </h3>
        <p>
          Code splitting: <code>lazy(() =&gt; import("./LazyComponent"))</code>
        </p>
        <button className="test-button" onClick={testLazyLoad}>
          Load Lazy Component
        </button>
        <div className={`result result-${lazyLoadResult.status}`}>
          {lazyLoadResult.message}
        </div>
        {showLazy && (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent
              onLoaded={handleLazyLoaded}
              onError={handleLazyError}
            />
          </Suspense>
        )}
      </div>

      <div className="test-section">
        <h3>
          3. Runtime fetch() in React{" "}
          <span className="category-label category-runtime">
            NEEDS TRANSFORMATION
          </span>
        </h3>
        <p>
          Runtime call:{" "}
          <code>fetch("./assets/data.json") inside useEffect or handler</code>
        </p>
        <button className="test-button" onClick={testRuntimeFetch}>
          Test Runtime Fetch
        </button>
        <div className={`result result-${fetchResult.status}`}>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
            {fetchResult.message}
          </pre>
        </div>
      </div>

      <div className="test-section">
        <h3>
          4. CSS url() in imported stylesheet{" "}
          <span className="category-label category-bundled">
            BUNDLER HANDLES
          </span>
        </h3>
        <p>
          The styles.css file is imported and bundled. Any url() references in
          CSS are processed by Vite at build time.
        </p>
        <div className="result result-success">
          If styles are applied, CSS bundling worked correctly.
        </div>
      </div>
    </div>
  );
}

export default App;
