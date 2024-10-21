import express from 'express';
import cors from 'cors';
import { clientRoutes } from './routes/clientRoutes';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/clients', clientRoutes);
//app.use('/properties', propertyRoutes);
//app.use('/deals', dealRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
