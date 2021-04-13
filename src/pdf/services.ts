import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export function CreateReceipt(name: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    let doc = new PDFDocument({ size: 'A4', margin: 50 });

    try {
      const robotoFont = fs.readFileSync(
        path.join(__dirname, './font/Roboto.ttf')
      );

      const robotoFontBold = fs.readFileSync(
        path.join(__dirname, './font/Roboto-Bold.ttf')
      );

      doc.registerFont('Roboto', robotoFont);
      doc.registerFont('Roboto-Bold', robotoFontBold);

      generateHeader(doc);
      generateBookingInfo(doc);
      generateBookingDetail(doc);
      generatePaymentSummary(doc);
      generateFooter(doc);
      generateIssuedDate(doc);

      doc.end();
      doc.pipe(
        fs.createWriteStream(`PDFs/${name}.pdf`).on('error', (e) => reject(e))
      );
      return resolve(true);
    } catch (e) {
      return reject(e);
    }
  });
}

function generateHeader(doc: PDFKit.PDFDocument) {
  doc
    .image(path.join(__dirname, './img/logo.png'), 50, 47, { width: 100 })
    .font('Roboto-Bold')
    .fontSize(11)
    .text('ABC Car Rental and Tour', 200, 50, {
      align: 'right',
      underline: true,
    })
    .font('Roboto')
    .fontSize(9)
    .text('111 ABC Road,', 200, 70, { align: 'right' })
    .text('Tambon ABC, Amphoe Muang ABC,', 200, 82, { align: 'right' })
    .text('Krabi Province, Thailand 81000', 200, 94, { align: 'right' })
    .text('(+66) 0 12 345 6789', 200, 110, { align: 'right' })
    .text('(+66) 0 12 345 6789', 200, 122, { align: 'right' })
    .text('info@example.com', 200, 134, { align: 'right' });

  generateHr(doc, 160);
}

function generateBookingInfo(doc: PDFKit.PDFDocument) {
  doc
    .font('Roboto')
    .fontSize(10)
    .text('Booking Status: ', 50, 180, { align: 'left' })
    .font('Roboto-Bold')
    .fontSize(10)
    .text('Confirmed', 150, 180)
    .font('Roboto')
    .fontSize(10)
    .text('Booking ID: ', 50, 195, { align: 'left' })
    .font('Roboto-Bold')
    .fontSize(10)
    .text('ABC12345', 150, 195)
    .moveDown();
}

function generateBookingDetail(doc: PDFKit.PDFDocument) {
  doc.font('Roboto').fontSize(13).text('Booking Detail', 50, 265);

  generateHr(doc, 285);

  const bookingDetailTop = 300;

  doc
    .fontSize(10)
    .text('Booking Name:', 50, bookingDetailTop)
    .font('Roboto-Bold')
    .text('John Doe', 150, bookingDetailTop)
    .font('Roboto')
    .text('Vehicle Title:', 50, bookingDetailTop + 15)
    .font('Roboto-Bold')
    .text('Mazda CX-30', 150, bookingDetailTop + 15)
    .font('Roboto')
    .text('Pick-up Location:', 50, bookingDetailTop + 30)
    .font('Roboto-Bold')
    .text('Ao Nang', 150, bookingDetailTop + 30)
    .font('Roboto')
    .text('Return Location:', 50, bookingDetailTop + 45)
    .font('Roboto-Bold')
    .text('Krabi International Airport', 150, bookingDetailTop + 45)
    .font('Roboto')
    .text('Pick-up Date:', 50, bookingDetailTop + 60)
    .font('Roboto-Bold')
    .text('Friday, 01 Dec 2020 - 12:00', 150, bookingDetailTop + 60)
    .font('Roboto')
    .text('Return Date:', 50, bookingDetailTop + 75)
    .font('Roboto-Bold')
    .text('Sunday, 03 Dec 2020 - 12:00', 150, bookingDetailTop + 75)
    .moveDown();
}

function generatePaymentSummary(doc: PDFKit.PDFDocument) {
  doc.font('Roboto').fontSize(13).text('Payment Summary', 50, 445);

  generateHr(doc, 465);

  let PaymentSummaryTop = 490;
  let hrTop = 15;

  doc
    .fontSize(10)
    .text('+Mazda CX-30 (2 days)', 50, PaymentSummaryTop)
    .font('Roboto-Bold')
    .text('THB 1,500.00', 150, PaymentSummaryTop, { align: 'right' });

  generateHr(doc, PaymentSummaryTop + hrTop);
  PaymentSummaryTop += 25;

  doc
    .font('Roboto')
    .text('+Pick-up Rate', 50, PaymentSummaryTop)
    .font('Roboto-Bold')
    .text('THB 200.00', 150, PaymentSummaryTop, { align: 'right' });

  generateHr(doc, PaymentSummaryTop + hrTop);
  PaymentSummaryTop += 25;

  doc
    .font('Roboto')
    .text('+Return Rate', 50, PaymentSummaryTop)
    .font('Roboto-Bold')
    .text('THB 0.00', 150, PaymentSummaryTop, { align: 'right' });

  generateHr(doc, PaymentSummaryTop + hrTop);
  PaymentSummaryTop += 25;

  doc
    .font('Roboto-Bold')
    .text('Subtotal ', 50, PaymentSummaryTop)
    .font('Roboto-Bold')
    .text('THB 1,700.00', 150, PaymentSummaryTop, { align: 'right' });

  generateHr(doc, PaymentSummaryTop + hrTop);
  PaymentSummaryTop += 25;

  doc
    .font('Roboto')
    .text('-Discount', 50, PaymentSummaryTop)
    .font('Roboto-Bold')
    .text('THB 200.00', 150, PaymentSummaryTop, { align: 'right' });

  generateHr(doc, PaymentSummaryTop + hrTop);
  PaymentSummaryTop += 25;

  doc
    .font('Roboto-Bold')
    .text('Total ', 50, PaymentSummaryTop)
    .font('Roboto-Bold')
    .text('THB 1,500.00', 150, PaymentSummaryTop, { align: 'right' });

  generateHr(doc, PaymentSummaryTop + hrTop);
  generateHr(doc, PaymentSummaryTop + hrTop + 5);
  PaymentSummaryTop += 25 + 5;

  doc
    .font('Roboto')
    .text('Payment Method', 50, PaymentSummaryTop)
    .font('Roboto-Bold')
    .text('Bank Transfer', 150, PaymentSummaryTop, { align: 'right' });

  generateHr(doc, 660);
}

function generateFooter(doc: PDFKit.PDFDocument) {
  doc
    .font('Roboto')
    .text('*Please make payment before ', 50, 715, { continued: true })
    .font('Roboto-Bold')
    .text('25/11/2020 - 12:00 ', { continued: true })
    .font('Roboto')
    .text('by securely booking is ', { continued: true })
    .font('Roboto-Bold')
    .text('THB 750.00 or fully paid is THB 1,500.00.', { continued: true });
}

function generateIssuedDate(doc: PDFKit.PDFDocument) {
  doc
    .font('Roboto-Bold')
    .text('Issued Date: Friday, 01 Dec 2020 - 12:30:33', 50, 780, {
      align: 'right',
    });
}

function generateHr(doc: PDFKit.PDFDocument, y: number) {
  doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(545, y).stroke();
}
