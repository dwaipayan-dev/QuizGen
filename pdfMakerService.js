const PDFDocument = require('pdfkit');
function buildPDF(dataCallback, endCallback, questionSheet) {
    try{
        const doc = new PDFDocument({
            bufferPages: true,
            font: 'Helvetica'
        });
        doc.on('data', dataCallback);
        doc.on('end', endCallback)
        doc.fontSize(20).font('Helvetica-Bold').text(`Physics Paper`);
    
        //doc.fontSize(12).text(`Lorem Ipsum dolor`);
        doc.fontSize(14).font('Helvetica-Bold').text("\nSECTION 1: EASY\n");
        doc.fontSize(12).font('Helvetica');
        let questionCount = 1;
        for (let obj of questionSheet.easy.questionPaper) {
            doc.text(`\n Q${questionCount}: ${obj.value[0]}          ${obj.value[3]}`);
            questionCount++;
        }
        doc.fontSize(14).font('Helvetica-Bold').text("\nSECTION 2: MEDIUM\n");
        doc.fontSize(12).font('Helvetica');
        for (let obj of questionSheet.medium.questionPaper) {
            doc.text(`\n Q${questionCount}: ${obj.value[0]}          ${obj.value[3]}`);
            questionCount++;
        }
        doc.fontSize(14).font('Helvetica-Bold').text("\nSECTION 3: HARD\n");
        doc.fontSize(12).font('Helvetica');
        for (let obj of questionSheet.hard.questionPaper) {
            doc.text(`\n Q${questionCount}: ${obj.value[0]}          ${obj.value[3]}`);
            questionCount++;
        }
    
        doc.text("\n\n\n All the Best!")
        doc.end();
    }
    catch(e){
        console.log(e);
    }
}

module.exports = { buildPDF };