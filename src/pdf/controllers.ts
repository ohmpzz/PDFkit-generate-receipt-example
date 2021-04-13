import { Request, Response } from 'express';
import { customAlphabet } from 'nanoid/async';
import * as Services from './services';

export async function CreateReceipt(req: Request, res: Response) {
  try {
    const name = await customAlphabet('1234567890', 6)();

    await Services.CreateReceipt(name);

    console.log(req);
    console.log(req.headers.host);
    console.log(req.protocol);

    const pdfURL = `${req?.protocol}://${req.headers?.host}/pdf/files/${name}.pdf`;

    return res.json({
      code: 'pdf/generate-success',
      message: 'generate pdf receipt has been successfully',
      pdf_url: pdfURL,
    });
  } catch (e) {
    console.log(e);
    return res.json({ success: false });
  }
}
