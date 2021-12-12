const PDFDocument = require('pdfkit');
function buildPDF(dataCallback, endCallback, questionSheet) {
    try{
        const doc = new PDFDocument({
            bufferPages: true,
            font: 'Courier'
        });
        doc.on('data', dataCallback);
        doc.on('end', endCallback)
        doc.fontSize(20).text(`A heading`);
    
        doc.fontSize(12).text(`Lorem Ipsum dolor`);
        doc.text("SECTION 1: EASY");
        let questionCount = 1;
        for (let obj of questionSheet.easy.questionPaper) {
            doc.text(`Q${questionCount}: ${obj.value[0]} -> ${obj.value[3]}`);
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