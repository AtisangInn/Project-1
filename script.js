document.addEventListener('DOMContentLoaded', function() {
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // --- Configuration ---
            // IMPORTANT: Replace this with the actual business WhatsApp number
            // including the country code, but without any '+', '00' or '-'.
            // For example, for a US number +1-123-456-7890, you would use '11234567890'.
            const businessWhatsAppNumber = '27762123888'; // <--- UPDATED NUMBER

            // --- Form Data ---
            const name = document.getElementById('name').value.trim();
            const contactNumber = document.getElementById('contactNumber').value.trim();
            const eventDate = document.getElementById('eventDate').value;
            const message = document.getElementById('message').value.trim();
            
            const selectedServices = document.querySelectorAll('input[name="service"]:checked');
            let servicesText = 'None';
            if (selectedServices.length > 0) {
                servicesText = Array.from(selectedServices).map(s => s.value).join(', ');
            }

            // --- Validation ---
            if (!name || !contactNumber || !eventDate || selectedServices.length === 0) {
                alert('Please fill out all required fields: Name, WhatsApp Number, Event Date, and select at least one service.');
                return;
            }

            // --- Message Construction ---
            let enquiryMessage = `
*New Outdoor Event Enquiry*

*Name:* ${name}
*Contact Number:* ${contactNumber}
*Event Date:* ${eventDate}
*Services Required:* ${servicesText}
`;

            if (message) {
                enquiryMessage += `
*Message:*
${message}
`;
            }

            // --- WhatsApp URL Generation ---
            const encodedMessage = encodeURIComponent(enquiryMessage);
            const whatsappUrl = `https://wa.me/${businessWhatsAppNumber}?text=${encodedMessage}`;

            // --- Redirect ---
            window.open(whatsappUrl, '_blank');
            enquiryForm.reset();
        });
    }
});
