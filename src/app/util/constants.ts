const appConstants = {};

Object.defineProperties(appConstants, {
  goibibourl: {
    value: 'http://developer.goibibo.com/api/search/',
    writable: false
  },
  app_id: {
    value: 'd4463230',
    writable: false
  },
  app_key: {
    value: 'ebd14cbde42bb89ebe7ac48ee6f82345',
    writable: false
  },
  format: {
    value: 'json',
    writable: false
  },
  counter: {
    value: '100',
    writable: false
  },
  tripTypes: {
    value: ['OneWay', 'RoundTrip', 'Multicity'],
    writable: false
  },
  defaultTripType: {
    value: 'OneWay',
    writable: false
  },
  sortCols: {
    value: ['Airlines', 'Departure', 'Duration', 'Arrival', 'Price'],
    writable: false
  },

  /**
   * util Constants file
   */

  Airlines: {
    value: 'ibibopartner',
    writable: false
  },
  Departure: {
    value: 'deptime',
    writable: false
  },
  Duration: {
    value: 'duration',
    writable: false
  },
  Arrival: {
    value: 'arrtime',
    writable: false
  }
});

export default appConstants;
