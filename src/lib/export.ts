import jsPDF from 'jspdf';

export function exportPropertyToPDF(property: any) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(property.headline, 10, 20);
  doc.setFontSize(12);
  doc.text(`Location: ${property.address.estate}, ${property.address.town}, ${property.address.province}`, 10, 30);
  doc.text(`Price: ${property.askingPrice}`, 10, 40);
  doc.text(`Description: ${property.description}`, 10, 50);
  doc.text(`Features: ${property.features.map(f => f.items.join(', ')).join('; ')}`, 10, 60);
  doc.save(`${property.headline}.pdf`);
}

export function exportPropertyToHTML(property: any) {
  return `
    <html>
      <head><title>${property.headline}</title></head>
      <body>
        <h1>${property.headline}</h1>
        <p><strong>Location:</strong> ${property.address.estate}, ${property.address.town}, ${property.address.province}</p>
        <p><strong>Price:</strong> ${property.askingPrice}</p>
        <p><strong>Description:</strong> ${property.description}</p>
        <ul><strong>Features:</strong> ${property.features.map(f => `<li>${f.items.join(', ')}</li>`).join('')}</ul>
      </body>
    </html>
  `;
}
