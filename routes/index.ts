import adminRoute from './admin';
import supportersRoute from './supporter';

export default (app: any) => {
  app.use("/admin", adminRoute)
  app.use("/supporter", supportersRoute)
}