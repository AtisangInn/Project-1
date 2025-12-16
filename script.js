document.addEventListener('DOMContentLoaded', function() {
    // --- Element References ---
    const enquiryForm = document.getElementById('enquiryForm');
    const messagePreview = document.querySelector('#messagePreview pre');

    // Service checkboxes and their corresponding option divs
    const services = {
        fencing: document.querySelector('input[value="Crowd Control Fencing"]'),
        stage: document.querySelector('input[value="Stage Setup"]')
    };
    const serviceOptions = {
        fencing: document.getElementById('fencingOptions'),
        stage: document.getElementById('stageOptions')
    };

    // All input elements that should trigger a preview update
    const formInputs = enquiryForm.querySelectorAll('input, textarea');

    // --- Core Function: Update Preview ---
    function updateMessagePreview() {
        // Get values from standard fields
        const name = document.getElementById('name').value.trim();
        const contactNumber = document.getElementById('contactNumber').value.trim();
        const eventDate = document.getElementById('eventDate').value;
        const message = document.getElementById('message').value.trim();
        
        // Get values from selected services
        const selectedServices = document.querySelectorAll('input[name="service"]:checked');
        let servicesText = 'None';
        if (selectedServices.length > 0) {
            servicesText = Array.from(selectedServices).map(s => s.value).join(', ');
        }

        // --- Message Construction ---
        let enquiryMessage = `*New Outdoor Event Enquiry*\n\n`;
        enquiryMessage += `*Name:* ${name}\n`;
        enquiryMessage += `*Contact Number:* ${contactNumber}\n`;
        enquiryMessage += `*Event Date:* ${eventDate}\n`;
        enquiryMessage += `*Services Required:* ${servicesText}\n`;

        // Add dynamic fields to the message if they are selected and have a value
        if (services.stage.checked) {
            const stageDimensions = document.getElementById('stageDimensions').value.trim();
            if (stageDimensions) {
                enquiryMessage += `*Stage Dimensions:* ${stageDimensions}\n`;
            }
        }
        if (services.fencing.checked) {
            const fencingLength = document.getElementById('fencingLength').value.trim();
            if (fencingLength) {
                enquiryMessage += `*Est. Fencing Length:* ${fencingLength} meters\n`;
            }
        }

        if (message) {
            enquiryMessage += `\n*Message:*\n${message}`;
        }
        
        // Update the preview area
        messagePreview.textContent = enquiryMessage;
    }

    // --- Event Listener: Toggle Dynamic Fields ---
    function toggleDynamicOptions() {
        serviceOptions.stage.style.display = services.stage.checked ? 'block' : 'none';
        serviceOptions.fencing.style.display = services.fencing.checked ? 'block' : 'none';
        updateMessagePreview(); // Update preview when services change
    }

    services.stage.addEventListener('change', toggleDynamicOptions);
    services.fencing.addEventListener('change', toggleDynamicOptions);

    // --- Event Listener: Live Preview on Input ---
    formInputs.forEach(input => {
        input.addEventListener('input', updateMessagePreview);
    });

    // --- Event Listener: Form Submission ---
    enquiryForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default submission

        // --- Configuration ---
        const businessWhatsAppNumber = '27762123888';

        // --- Validation ---
        const name = document.getElementById('name').value.trim();
        const contactNumber = document.getElementById('contactNumber').value.trim();
        const eventDate = document.getElementById('eventDate').value;
        const selectedServices = document.querySelectorAll('input[name="service"]:checked');

        if (!name || !contactNumber || !eventDate || selectedServices.length === 0) {
            alert('Please fill out all required fields: Name, WhatsApp Number, Event Date, and select at least one service.');
            return;
        }

        // --- URL Generation ---
        const finalMessage = messagePreview.textContent; // Get message from preview
        const encodedMessage = encodeURIComponent(finalMessage);
        const whatsappUrl = `https://wa.me/${businessWhatsAppNumber}?text=${encodedMessage}`;

        // --- Redirect & Reset ---
        window.open(whatsappUrl, '_blank');
        
        // Custom reset logic
        enquiryForm.reset(); // Clears all form fields
        toggleDynamicOptions(); // Hides the dynamic options divs
        updateMessagePreview(); // Resets the preview to its initial state
    });

    // --- Initial State Setup ---
    toggleDynamicOptions(); // Set initial visibility of dynamic fields
    updateMessagePreview(); // Set the initial state of the preview
});
