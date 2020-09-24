import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();

const providersController = new ProvidersController();
const providerMonthAvailabilityContoller = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
    '/:provider_id/month-availability',
    providerMonthAvailabilityContoller.index,
);
providersRouter.get(
    '/:provider_id/day-availability',
    providerDayAvailabilityController.index,
);

export default providersRouter;
