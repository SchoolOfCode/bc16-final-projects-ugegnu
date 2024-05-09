export default function CreateRoutePage() {
  return (
    <>
      <header className="fixed-header">
        <h1>Fixed Header</h1>
      </header>
      <body>
        {/* p tag below header */}
        {/* map component */}
        <section className="createRoute__panel">
          <div className="createRoute__panelETABar">
            <ol className="">
              <li className="createRoute__panelETABar__startPoint"></li>
              <li className="createRoute__panelETABar__stops"></li>
              <li className="createRoute__panelETABar__endPoint"></li>
            </ol>
          </div>
          <div className="createRoute__panel__actionButtons">
            <button></button>
            <button></button>
            <button></button>
          </div>
        </section>
      </body>
    </>
  );
}
