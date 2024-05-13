export default function RetrievedRoutePage({ handleRetrieve, selectedRoute }) {
  console.log(selectedRoute);
  return (
    <div>
      <h1>Retrieved Route Page</h1>
      <h1>route name</h1>
      <h2>{selectedRoute.payload.route_name}</h2>
      <h2>Marker1 lat{selectedRoute.payload.route_data[0].lat}</h2>
      <h2>Marker1 lng{selectedRoute.payload.route_data[0].lng}</h2>
      <button onClick={handleRetrieve}>Go back</button>
    </div>
  );
}
