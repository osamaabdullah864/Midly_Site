// Interactivity and simple animations
document.addEventListener("DOMContentLoaded", () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple scroll animation for fade-in elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // Form Submission Handling
    const supportForm = document.getElementById('support-form');
    const toast = document.getElementById('toast');
    const submitBtn = document.getElementById('submit-btn');

    if (supportForm) {
        supportForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Basic UI loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            submitBtn.disabled = true;

            const formData = new FormData(supportForm);
            
            try {
                // Using FormSubmit AJAX endpoint (clean fetch request, no page reload)
                const response = await fetch('https://formsubmit.co/ajax/midlysupport@gmail.com', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show success toast
                    toast.classList.add('show');
                    supportForm.reset();
                    
                    // Hide toast after 5 seconds
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 5000);
                } else {
                    alert("عذراً، حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة لاحقاً.");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("عذراً، حدث خطأ في الاتصال. يرجى التأكد من الإنترنت والمحاولة لاحقاً.");
            } finally {
                // Restore button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
