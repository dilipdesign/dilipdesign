document.addEventListener('DOMContentLoaded', function () {
    function updateBodyPadding() {
        const nav = document.querySelector('header .navbar.fixed-top');
        if (nav) {
            document.body.style.paddingTop = nav.offsetHeight + 'px';
        }
    }

    updateBodyPadding();
    window.addEventListener('resize', updateBodyPadding);
    // AJAX form submit to FormSubmit — show confirmation modal and clear form
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;

            const formData = new FormData(form);
            const action = form.action;

            fetch(action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(function (response) {
                if (!response.ok) throw new Error('Network response was not ok');
                const modalEl = document.getElementById('contactSuccessModal');
                if (modalEl) {
                    const bsModal = new bootstrap.Modal(modalEl);
                    bsModal.show();
                } else {
                    alert('Thanks — your message has been sent.');
                }
                form.reset();
                form.classList.remove('was-validated');
            }).catch(function (err) {
                console.error(err);
                alert('There was an error sending the message. Please try again.');
            }).finally(function () {
                if (submitBtn) submitBtn.disabled = false;
            });
        });
    });
});
