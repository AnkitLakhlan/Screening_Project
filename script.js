document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded');

    const radioInputs = document.querySelectorAll('input[name="pricing"]');
    const totalDisplay = document.querySelector('.total_text');

    const prices = {
        '1unit': '$10.00 USD',
        '2unit': '$18.00 USD',
        '3unit': '$24.00 USD'
    };

    function updateTotal(selectedValue) {
        if (totalDisplay && prices[selectedValue]) {
            totalDisplay.textContent = `Total : ${prices[selectedValue]}`;
        }
    }

    // Add click handlers to the entire option header
    function setupExpandHandlers() {
        const optionHeaders = document.querySelectorAll('.option_header');
        console.log('Found option headers:', optionHeaders.length);

        optionHeaders.forEach(function(header, index) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', function(e) {
                console.log('Header clicked:', index);

                // Prevent radio button selection when clicking arrow area
                if (e.target.closest('.expand_arrow')) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                const optionLabel = this.closest('.option_label');
                const optionDetails = optionLabel.querySelector('.option_details');
                const arrowIcon = optionLabel.querySelector('.arrow_icon');

                console.log('Option details found:', !!optionDetails);
                console.log('Arrow icon found:', !!arrowIcon);

                // Check if currently expanded
                const isExpanded = optionDetails.style.display === 'block';
                console.log('Currently expanded:', isExpanded);

                // Close all first
                const allDetails = document.querySelectorAll('.option_details');
                const allArrows = document.querySelectorAll('.arrow_icon');

                allDetails.forEach(function(detail) {
                    detail.style.display = 'none';
                });

                allArrows.forEach(function(arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                });

                // If wasn't expanded, expand it
                if (!isExpanded) {
                    optionDetails.style.display = 'block';
                    arrowIcon.style.transform = 'rotate(180deg)';
                    console.log('Expanded option');
                } else {
                    console.log('Collapsed option');
                }
            });
        });
    }

    function handleRadioChange(event) {
        const selectedValue = event.target.value;
        updateTotal(selectedValue);
    }

    radioInputs.forEach(function(radio) {
        radio.addEventListener('change', handleRadioChange);
    });

    // Setup expansion handlers
    setupExpandHandlers();

    // Initialize
    const checkedRadio = document.querySelector('input[name="pricing"]:checked');
    if (checkedRadio) {
        updateTotal(checkedRadio.value);
    }

    const addToCartBtn = document.querySelector('.add_to_cart_btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const selectedOption = document.querySelector('input[name="pricing"]:checked');
            if (selectedOption) {
                const selectedValue = selectedOption.value;
                const selectedPrice = prices[selectedValue];

                let alertMessage = `Added to cart: ${selectedValue.replace('unit', ' Unit')} - ${selectedPrice}`;

                if (selectedValue === '2unit') {
                    const sizeDropdowns = document.querySelectorAll('.size_dropdown');
                    const colorDropdowns = document.querySelectorAll('.color_dropdown');

                    if (sizeDropdowns.length >= 2 && colorDropdowns.length >= 2) {
                        const size1 = sizeDropdowns[0].value;
                        const size2 = sizeDropdowns[1].value;
                        const color1 = colorDropdowns[0].value;
                        const color2 = colorDropdowns[1].value;

                        alertMessage += `\nCustomization:\n#1: Size ${size1}, Color ${color1}\n#2: Size ${size2}, Color ${color2}`;
                    }
                }

                alert(alertMessage);
            }
        });
    }

    const colorDropdowns = document.querySelectorAll('.color_dropdown');
    colorDropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('change', function() {
            updateColorPreview(this);
        });
    });

    function updateColorPreview(dropdown) {
        const colorPreview = dropdown.parentNode.querySelector('.color_img');
        if (colorPreview) {
            const selectedColor = dropdown.value.toLowerCase();
            let colorHex = '#333';

            switch(selectedColor) {
                case 'black':
                    colorHex = '#333';
                    break;
                case 'white':
                    colorHex = '#fff';
                    break;
                case 'red':
                    colorHex = '#ff0000';
                    break;
                case 'blue':
                    colorHex = '#0066cc';
                    break;
                default:
                    colorHex = '#333';
            }

            colorPreview.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='12' fill='${encodeURIComponent(colorHex)}'/%3E%3C/svg%3E`;
        }
    }

    const firstColorDropdown = document.querySelector('.color_dropdown');
    if (firstColorDropdown) {
        updateColorPreview(firstColorDropdown);
    }
});