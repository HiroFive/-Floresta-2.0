import { app } from './server';
import { ENV } from './common/enums';

const server = app.listen(ENV.APP.SERVER_PORT, () => {
  console.log(`Listening to connections on port — ${ENV.APP.SERVER_PORT}`);
});

export { server };
