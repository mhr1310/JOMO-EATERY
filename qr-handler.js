// QR Code Display Handler for E-Wallet Payment
// This script shows the DuitNow QR code when e-wallet is selected

document.addEventListener('DOMContentLoaded', function () {
    const paymentSelect = document.getElementById('co-payment');

    if (paymentSelect) {
        paymentSelect.addEventListener('change', function () {
            // Remove any existing QR section
            const existingQR = document.getElementById('qr-code-section');
            if (existingQR) {
                existingQR.remove();
            }

            if (this.value === 'ewallet') {
                // Create QR code section
                const qrSection = document.createElement('div');
                qrSection.id = 'qr-code-section';
                qrSection.style.cssText = 'margin-top: 20px; padding: 20px; background: #f9f9f9; border-radius: 8px; text-align: center;';

                qrSection.innerHTML = `
                    <h4 style="color: #8B6F47; margin-bottom: 15px;">📱 Scan to Pay with DuitNow</h4>
                    <img src="images/duitnow-qr.jpg" alt="DuitNow QR Code" style="max-width: 300px; width: 100%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 10px auto; display: block;">
                    <p style="margin-top: 15px; color: #666; font-size: 0.9rem;">
                        <strong>NUHA NADIRA BINTI MUHAMMAD ASHLYZAN</strong><br>
                        Scan this QR code with your DuitNow app to complete payment
                    </p>
                `;

                // Insert after the payment method select
                paymentSelect.closest('.form-group').after(qrSection);
            }
        });
    }
});
