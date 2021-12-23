import * as express from 'express';

import DriverController from './controllers/driver.js';

export default function setRoutes(app) {

  const router = express.Router();

  const driverCtrl = new DriverController();

  // Locations
  router.route('/drivers').get(driverCtrl.search);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
}
