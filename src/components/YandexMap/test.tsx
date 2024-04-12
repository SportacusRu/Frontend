<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
    <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
    <!-- To make the map appear, you must add your apikey -->
    <script src="https://api-maps.yandex.ru/v3/?apikey=<YOUR_APIKEY>&lang=en_US" type="text/javascript"></script>

    <script
      data-plugins="transform-modules-umd"
      data-presets="react, typescript"
      type="text/babel"
      src="./common.ts"
    ></script>
    <script data-plugins="transform-modules-umd" data-presets="react, typescript" type="text/babel">
      import type {LngLat, RouteFeature} from '@yandex/ymaps3-types';
      import {LOCATION, INITIAL_ROUTE_POINTS, getPointStr, fetchRoute, lineStyle, InfoMessage} from './common';

      window.map = null;

      main();
      async function main() {
        // For each object in the JS API, there is a React counterpart
        // To use the React version of the API, include the module @yandex/ymaps3-reactify
        const [ymaps3React] = await Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]);
        const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
        const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapFeature, YMapControls} =
          reactify.module(ymaps3);

        // Import the package to add a default marker
        const {YMapDefaultMarker} = reactify.module(await ymaps3.import('@yandex/ymaps3-markers@0.0.1'));

        // Using ymaps3-rectify, we turn a custom InfoMessage into a React component
        const {InfoMessage: InfoMessageR} = reactify.module({InfoMessage});

        const {useState, useCallback, useEffect} = React;

        function App() {
          const [location, setLocation] = useState(LOCATION);
          const [pointASubtitle, setPointASubtitle] = useState(getPointStr(INITIAL_ROUTE_POINTS[0]));
          const [pointBSubtitle, setPointBSubtitle] = useState(getPointStr(INITIAL_ROUTE_POINTS[0]));
          const [pointACoordinates, setPointACoordinates] = useState(INITIAL_ROUTE_POINTS[0]);
          const [pointBCoordinates, setPointBCoordinates] = useState(INITIAL_ROUTE_POINTS[1]);
          const [route, setRoute] = useState < RouteFeature > null;

          // Get and process route data during the first rendering
          useEffect(() => {
            fetchRoute(pointACoordinates, pointBCoordinates).then(routeHandler);
          }, []);

          // The handler functions for updating the coordinates and subtitle of the marker when dragging
          const onDragMovePointAHandler = useCallback((coordinates: LngLat) => {
            setPointASubtitle(getPointStr(coordinates));
            setPointACoordinates(coordinates);
          }, []);
          const onDragMovePointBHandler = useCallback((coordinates: LngLat) => {
            setPointBSubtitle(getPointStr(coordinates));
            setPointBCoordinates(coordinates);
          }, []);

          // The handler function for updating route data after dragging the marker
          const onDragEndHandler = useCallback(() => {
            fetchRoute(pointACoordinates, pointBCoordinates).then(routeHandler);
          }, [pointACoordinates, pointBCoordinates]);

          /* A handler function that updates the route line 
        and shifts the map to the new route boundaries, if they are available. */
          const routeHandler = useCallback((newRoute: RouteFeature) => {
            // If the route is not found, then we alert a message and clear the route line
            if (!newRoute) {
              alert('Route not found');
              setRoute(null);
              return;
            }

            setRoute(newRoute);
            if (newRoute.properties.bounds) {
              setLocation({bounds: newRoute.properties.bounds, duration: 300});
            }
          }, []);
          return (
            // Initialize the map and pass initialization parameters
            <YMap
              location={location}
              showScaleInCopyrights={true}
              margin={[100, 100, 100, 100]}
              ref={(x) => (map = x)}
            >
              {/* Add a map scheme layer */}
              <YMapDefaultSchemeLayer />
              {/* Add a layer of geo objects to display markers and line */}
              <YMapDefaultFeaturesLayer />

              {/* Add route start and end markers to the map */}
              <YMapDefaultMarker
                coordinates={pointACoordinates}
                title="Point A"
                subtitle={pointASubtitle}
                draggable
                onDragMove={onDragMovePointAHandler}
                onDragEnd={onDragEndHandler}
              />
              <YMapDefaultMarker
                coordinates={pointBCoordinates}
                title="Point B"
                subtitle={pointBSubtitle}
                draggable
                onDragMove={onDragMovePointBHandler}
                onDragEnd={onDragEndHandler}
              />

              {/* Add the route line to the map when it becomes available */}
              {route && <YMapFeature {...route} style={lineStyle} />}

              {/* Add a shared container for controls to the map.
                Using YMapControls you can change the position of the control */}
              <YMapControls position="top right">
                {/* Add a custom information message control to the map */}
                <InfoMessageR text="Drag any marker to rebuild the route." />
              </YMapControls>
            </YMap>
          );
        }

        ReactDOM.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>,
          document.getElementById('app')
        );
      }
    </script>

    <!-- prettier-ignore -->
    <style> html, body, #app { width: 100%; height: 100%; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; } .toolbar { position: absolute; z-index: 1000; top: 0; left: 0; display: flex; align-items: center; padding: 16px; } .toolbar a { padding: 16px; }  </style>
    <link rel="stylesheet" href="./common.css" />
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
