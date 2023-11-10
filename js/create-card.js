(function () {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone-number');
    const ratingInput = document.getElementById('rating');
    const urlInput = document.getElementById('url')
    const descriptionTextarea = document.getElementById('description');
    const imageInput = document.getElementById('add-photo');
    const form = document.getElementById('create-form')

    nameInput.value = localStorage.getItem('name') || '';
    emailInput.value = localStorage.getItem('email') || '';
    phoneInput.value = localStorage.getItem('phone') || '';
    ratingInput.value = localStorage.getItem('rating') || '';
    urlInput.value = localStorage.getItem('url') || '';
    descriptionTextarea.value = localStorage.getItem('description') || '';


    form.addEventListener('submit', function (event) {
        event.preventDefault();

        localStorage.setItem('name', nameInput.value);
        localStorage.setItem('email', emailInput.value);
        localStorage.setItem('phone', phoneInput.value);
        localStorage.setItem('rating', ratingInput.value);
        localStorage.setItem('url', urlInput.value);
        localStorage.setItem('description', descriptionTextarea.value);

        // venueCard
        const venueCard = document.createElement('div');
        venueCard.classList.add('venue', 'basic-border');

        // venueName
        const venueName = document.createElement('h2');
        venueName.classList.add('venue__name', 'h2-text');
        const venueLink = document.createElement('a');
        venueLink.classList.add('venue__link');
        if (!urlInput.value) {
          venueLink.href = '#';
        } else {
          venueLink.href = urlInput.value
        }
        venueLink.textContent = nameInput.value;
        venueName.appendChild(venueLink);

        // venuePhoto
        const venuePhoto = document.createElement('img');
        venuePhoto.classList.add('venue-info__photo');
        venuePhoto.alt = 'Фото заведения';

        // uploading and resizing image
        if (imageInput.files.length > 0) {
            const reader = new FileReader();

            reader.onload = function () {
                venuePhoto.src = reader.result;

                venuePhoto.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = 1920;
                    canvas.height = 1280;
                    ctx.drawImage(venuePhoto, 0, 0, canvas.width, canvas.height);
                    venuePhoto.src = canvas.toDataURL();
                };
            };

            reader.readAsDataURL(imageInput.files[0]); // Читаем файл как Data URL
        } else {
            venuePhoto.src = 'img/placeholder.jpg'; // Используем заглушку, если изображение не было загружено
        }
        venuePhoto.width = 1920
        venuePhoto.height = 1080

        // venueContent
        const venueContent = document.createElement('div');
        venueContent.classList.add('venue-content');

        // venueInfo
        const venueInfo = document.createElement('div');
        venueInfo.classList.add('venue-info');
        venueContent.appendChild(venueInfo);

        // venueReviews
        const venueReviews = document.createElement('div');
        venueReviews.classList.add('venue-reviews');
        venueContent.appendChild(venueReviews);

        // Photo container
        const photoContainer = document.createElement('div');
        photoContainer.classList.add('photo-container');
        const photoContent = document.createElement('div');
        photoContent.classList.add('photo-content');
        const venueDescription = document.createElement('p');
        venueDescription.classList.add('venue-info__description', 'paragraph-text');
        venueDescription.textContent = descriptionTextarea.value;
        photoContent.appendChild(venueDescription);
        photoContainer.appendChild(venuePhoto);
        photoContainer.appendChild(photoContent);
        venueInfo.appendChild(photoContainer);

        // Stats
        const venueStats = document.createElement('div');
        venueStats.classList.add('venue-stats');

        // RatingStat
        const ratingStat = document.createElement('div');
        ratingStat.classList.add('venue-stats__rating', 'default-text');
        ratingStat.textContent = 'Рейтинг: ';
        const ratingValue = document.createElement('span');
        ratingValue.classList.add('stat');
        ratingValue.textContent = ratingInput.value;
        ratingStat.appendChild(ratingValue);
        venueStats.appendChild(ratingStat);

        // ViewStat
        const viewsStat = document.createElement('div');
        viewsStat.classList.add('venue-stats__views', 'default-text');
        viewsStat.textContent = 'Просмотры: ';
        const viewsValue = document.createElement('span');
        viewsValue.textContent = '0';
        viewsValue.classList.add('stat');
        viewsStat.appendChild(viewsValue);
        venueStats.appendChild(viewsStat);

        // ContactsStat
        const contactsStat = document.createElement('div');
        contactsStat.classList.add('venue-stats__contacts', 'default-text');
        contactsStat.textContent = 'Контакты: ';
        const contactsValue = document.createElement('span');
        contactsValue.textContent = phoneInput.value + ',' + emailInput.value;
        contactsValue.classList.add('stat');
        contactsStat.appendChild(contactsValue);
        venueStats.appendChild(contactsStat);

        venueInfo.appendChild(venueStats);

        venueCard.appendChild(venueName);
        venueCard.appendChild(venueContent);

        const venueContainer = document.getElementById('venues');
        venueContainer.appendChild(venueCard);

        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        ratingInput.value = '';
        urlInput.value = ''
        descriptionTextarea.value = '';
        imageInput.value = '';
    })
})();
