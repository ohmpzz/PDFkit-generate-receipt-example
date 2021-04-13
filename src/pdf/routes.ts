import express from 'express';
import * as Controllers from './controllers';
import path from 'path';

export const router = express.Router();

router.get('/', (req, res) => {
  return res.send('Hi, pdf');
});

router.get('/create-receipt', Controllers.CreateReceipt);

router.use('/files', express.static(path.join(__dirname, '../../PDFs')));
