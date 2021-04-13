import express from 'express';
import compression from 'compression';
import morgan from 'morgan';

import PDFRoutes from './pdf';

const app = express();

app.use(compression());
app.use(morgan('dev'));

app.use('/pdf', PDFRoutes);

app.get('/', (req, res) => {
  return res.send('Hi there');
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server running on port: ', PORT);
});

export default app;
