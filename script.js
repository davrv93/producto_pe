$(document).ready(function () {
    $('#customizeToggle').change(function () {
        $('#customizationOptions').toggle(this.checked);
    });

    let fontSize = 20;

    function updatePreview() {
        const text = $('#customText').val();
        const orientation = $('input[name="orientation"]:checked').val();
        const font = $('#fontSelector').val();
        const isVertical = orientation === 'vertical';

        const preview = $('#textPreview');
        preview.text(text);
        preview.css({
            'font-size': fontSize + 'px',
            'font-family': font,
            'transform': isVertical ? 'rotate(-90deg)' : 'rotate(0deg)',
            'top': isVertical ? '50%' : '80%',
            'left': isVertical ? '50%' : '50%',
            'transform-origin': 'center center'
        });
    }

    $('#customText, input[name="orientation"], #fontSelector').on('input change', updatePreview);

    $('#increaseFont').click(function () {
        fontSize += 2;
        updatePreview();
    });

    $('#decreaseFont').click(function () {
        if (fontSize > 10) fontSize -= 2;
        updatePreview();
    });

    $('#customText').on('input', function () {
        const type = $('input[name="engravingType"]:checked').val();
        let value = $(this).val();

        if (type === 'initial') {
            value = value.replace(/[^A-Z0-9]/g, '').toUpperCase().slice(0, 1);
        } else if (type === 'name') {
            value = value.replace(/[^a-zA-Z]/g, '').slice(0, 15);
        } else if (type === 'phrase') {
            value = value.replace(/[^a-zA-Z ]/g, '').slice(0, 20);
        }

        $(this).val(value);
        updatePreview();
    });

    updatePreview();
});
