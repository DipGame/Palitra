document.addEventListener("DOMContentLoaded", function () {

    function addClass(el, class_name) {
        el.classList.add(class_name);
    }
    function removeClass(el, class_name) {
        el.classList.remove(class_name);
    }
    function toggleClass(el, class_name) {
        el.classList.toggle(class_name);
    }

    function handleClosePopup(popup) {
        removeClass(overlay, 'open');
        removeClass(popup, 'open');
    }

    function handleOpenPopup(popup) {
        addClass(overlay, 'open');
        addClass(popup, 'open');
    }

    function handleTogglePopup(popup) {
        toggleClass(overlay, 'open');
        toggleClass(popup, 'open');
    }

    function handleCloseCityPopup(popup) {
        removeClass(overlay_2, 'open');
        removeClass(popup, 'open');
    }

    function handleOpenCityPopup(popup) {
        addClass(overlay_2, 'open');
        addClass(popup, 'open');
    }

    const main = document.querySelector('main');

    // Функция для обновления отступа
    function updateMainMargin() {
        if (header && main) {
            const headerHeight = header.offsetHeight;

            if (header.classList.contains('scrolled')) {
                main.style.marginTop = `${headerHeight}px`;
            } else {
                main.style.marginTop = '0';
            }
        }
    }

    if (document.querySelector('.overlay')) {
        var overlay = document.querySelector('.overlay')
        var overlay_2 = document.querySelector('.overlay_2')

        overlay.addEventListener('click', () => {
            document.querySelectorAll('.open').forEach(el => {
                removeClass(el, "open");
            })
        })
        overlay_2.addEventListener('click', () => {
            removeClass(overlay_2, "open");
            handleCloseCityPopup(popup_city);
        })
    }

    if (document.querySelector('.popupCheck')) {
        // var popupCloseBtn = popupForm.querySelector('.close-btn');
        var popupCheck = document.querySelector('.popupCheck');
        var popupCheckCloseBtn = popupCheck.querySelector('.close-btn');
    }

    if (document.querySelector('.popup_city')) {
        var popup_city = document.querySelector('.popup_city');
        var close_popup = popup_city.querySelector('.close_popup');

        close_popup.addEventListener('click', () => {
            handleCloseCityPopup(popup_city);
        })
    }

    if (document.querySelector('.open_city_popup')) {
        document.querySelectorAll('.open_city_popup').forEach(el => {
            el.addEventListener('click', (e) => {
                if (!e.target.classList.contains('yes')) {
                    handleOpenCityPopup(popup_city);
                }
            })
        })
    }

    if (document.querySelector('.your_city')) {
        // Функция для инициализации каждого попапа
        function initPopup(yourCity) {
            const yourCityYes = yourCity.querySelector('.yes');
            const yourCityNo = yourCity.querySelector('.no');

            // Функция получения cookie по имени
            function getCookie(name) {
                const matches = document.cookie.match(
                    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)")
                );
                return matches ? decodeURIComponent(matches[1]) : undefined;
            }

            // Функция установки cookie с указанием времени жизни
            function setCookie(name, value, days) {
                let expires = "";
                if (days) {
                    const date = new Date();
                    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Установка времени жизни в днях
                    expires = "; expires=" + date.toUTCString();
                }
                document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
            }

            // Функция показа попапа
            function showPopup() {
                yourCity.classList.add('open');
            }

            // Функция обработки клика по кнопкам
            function handleButtonClick() {
                const currentTimestamp = Date.now();
                setCookie('last_open_' + yourCity.dataset.id, currentTimestamp, 1); // Устанавливаем cookie на 1 день
                removeClass(yourCity, 'open');
            }

            // Получение текущего timestamp
            const currentTimestamp = Date.now();

            // Проверка, был ли попап открыт последние 24 часа
            const lastOpenTimestamp = getCookie('last_open_' + yourCity.dataset.id);
            if (lastOpenTimestamp) {
                const elapsedTime = currentTimestamp - parseInt(lastOpenTimestamp, 10); // Разница во времени
                const oneDayInMs = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах
                if (elapsedTime >= oneDayInMs) {
                    // Если прошло 24 часа или больше, показать попап
                    showPopup();
                    setCookie('last_open_' + yourCity.dataset.id, currentTimestamp, 1); // Обновляем cookie на 1 день
                }
            } else {
                // Если cookie нет, показываем попап и создаём cookie
                showPopup();
                setCookie('last_open_' + yourCity.dataset.id, currentTimestamp, 1); // Устанавливаем cookie на 1 день
            }

            // Добавляем обработчики кликов
            yourCityYes.addEventListener('click', handleButtonClick);
            yourCityNo.addEventListener('click', handleButtonClick);
        }

        // Получаем все элементы your_city на странице
        const yourCities = document.querySelectorAll('.your_city');
        yourCities.forEach((yourCity, index) => {
            yourCity.dataset.id = index; // Присваиваем уникальный идентификатор для каждого элемента
            initPopup(yourCity); // Инициализируем попап для текущего элемента
        });

        // Функция для удаления класса
        function removeClass(element, className) {
            element.classList.remove(className);
        }

    }

    if (document.getElementById('top-menu')) {
        const topMenu = document.getElementById('top-menu');
        const linkList = topMenu.querySelectorAll('.drop');

        linkList.forEach(drop => {
            if (drop.querySelector('.drop_2')) {
                let drop_2 = drop.querySelectorAll('.drop_2');

                drop_2.forEach(dropTwo => {
                    dropTwo.addEventListener('click', (e) => {
                        if (!e.target.closest('.drop_menu_2')) {
                            e.preventDefault();
                            toggleClass(dropTwo, "open");
                        }
                    })
                });
            }



            drop.addEventListener('click', (e) => {
                if (window.screen.width < 1281) {
                    if (e.target.classList.contains('drop_2') || e.target.classList.contains('first_link_drop_2') || e.target.closest('.drop_2')) {
                    } else {
                        if (!e.target.href) {
                            e.preventDefault();
                            toggleClass(drop, "open");
                        } else {
                            if (e.target.classList.contains('first_link')) {
                                e.preventDefault();
                                toggleClass(drop, "open");
                            }
                        }
                    }
                }

            })
        });
    }

    if (document.querySelector('header')) {
        var header = document.querySelector('header');

        let closeMobMenu = header.querySelector('#close_mob_menu');
        let openMobMenu = document.querySelectorAll('#open_mob_menu');
        if (closeMobMenu) {
            closeMobMenu.addEventListener('click', () => {
                handleClosePopup(header);
            })
        }
        openMobMenu.forEach(btn => {
            btn.addEventListener('click', () => {
                handleTogglePopup(header);
            })
        });


    }

    if (document.querySelector('footer .menu_cont')) {
        const menu_cont = document.querySelector('footer .menu_cont');
        const tabs = menu_cont.querySelectorAll('.tab');
        const menuList = menu_cont.querySelectorAll('.menu_list');

        let num = 0;
        let num_1 = 0;

        menuList.forEach(menu => {

            if (num_1 > 0) {
                addClass(menu, "invise");
            }

            num_1++;
        });

        tabs.forEach(tab => {
            if (num == 0) {
                addClass(tab, "active");
            }
            tab.addEventListener('click', () => {
                if (!tab.classList.contains('active')) {
                    tabs.forEach(tab_1 => {
                        removeClass(tab_1, "active");
                    });
                    addClass(tab, "active");
                }
                menuList.forEach(menu => {
                    addClass(menu, "invise");
                    if (tab.id == menu.id) {

                        removeClass(menu, "invise");
                    }
                });
            })
            num++;
        });
    }

    if (document.querySelector('.main_destination')) {
        const destination = document.querySelector('.main_destination');
        let links = destination.querySelectorAll('[data-src]');

        links.forEach(link => {
            let linkSrc = link.getAttribute('data-src');

            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = linkSrc;
            })

        });
    }

    if (document.querySelector('a[href^="#"]')) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const headerHeight = header.offsetHeight; // Высота header
                const targetId = this.getAttribute('href').substring(1); // Получаем ID из ссылки
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY; // Позиция элемента относительно страницы
                    const offsetPosition = targetPosition - headerHeight; // Вычитаем высоту header

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    if (document.querySelector('.form-all')) {
        const formSect = document.querySelectorAll(".form-all");
        const titlePopupCheck = popupCheck.querySelector('h2');
        formSect.forEach(formSect => {

            let form = formSect.querySelector("form");
            let formBtn = formSect.querySelector("[type='submit']");
            let nameInp = formSect.querySelector("[name='name']");
            let phoneInp = formSect.querySelector("[name='phone']");
            let textarea = formSect.querySelector("[name='text']");
            let fileInp = formSect.querySelector("[name='file']");
            let fileLabel = formSect.querySelector("[for='file']");
            let fileInfoCont = formSect.querySelector(".file_info");
            let labelCheckbox = formSect.querySelector("[for='checkbox']");





            if (fileInp) {
                var fileDetails = document.getElementById('fileDetails');
                var removeFileButton = document.getElementById('removeFileButton');

                // Переменная для хранения выбранного файла
                var selectedFile = null;

                // Максимальный размер файла (10 MB)
                const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB в байтах

                fileInp.addEventListener('change', (event) => {
                    const file = event.target.files[0]; // Получаем первый выбранный файл

                    // Проверка, был ли выбран файл
                    if (!file) {
                        return;
                    }

                    // Проверка на максимальный размер файла
                    if (file.size > MAX_FILE_SIZE) {
                        alert(`Файл "${file.name}" превышает максимальный размер 10 MB.`);
                        fileInp.value = ''; // Очищаем input
                        return;
                    }

                    // Допустимые форматы для пользователей
                    const allowedFormats = ['JPEG', 'PNG', 'GIF', 'PDF', 'TXT', 'ZIP', 'DOC', 'DOCX'];

                    // Проверка на допустимые типы файлов
                    const allowedTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                        "application/pdf",
                        "text/plain",
                        "application/zip",
                        "application/x-zip-compressed",
                        "application/x-zip",
                        "application/octet-stream",
                        "application/msword",
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    ];

                    if (!allowedTypes.includes(file.type)) {
                        alert(`Файл "${file.name}" имеет недопустимый тип. Допустимые форматы: ${allowedFormats.join(', ')}.`);
                        fileInp.value = ''; // Очищаем input
                        return;
                    }

                    // Сохраняем выбранный файл
                    selectedFile = file;

                    // Обновляем отображение информации о файле
                    updateFileDetails();
                });

                // Функция для обновления информации о выбранном файле в интерфейсе
                function updateFileDetails() {
                    if (selectedFile) {
                        addClass(fileLabel, 'invise');
                        removeClass(fileInfoCont, 'invise');
                        fileDetails.innerHTML = `
            <div class="file-item">
                <span>${selectedFile.name} (${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
            </div>
        `;
                    }
                }

                // Обработчик нажатия кнопки удаления
                removeFileButton.addEventListener('click', () => {
                    selectedFile = null; // Очищаем переменную с выбранным файлом
                    fileInp.value = ''; // Очищаем input
                    fileDetails.innerHTML = ''; // Очищаем отображение информации о файле
                    addClass(fileInfoCont, 'invise');
                    removeClass(fileLabel, 'invise');
                });
            }









            if (labelCheckbox) {
                var labelSvg = labelCheckbox.querySelector('svg');
                var errCheck = labelCheckbox.querySelector('.errCheck');
                var inputCheckbox = formSect.querySelector(`#${labelCheckbox.getAttribute('for')}`);

                labelCheckbox.addEventListener('click', (e) => {
                    if (e.target.getAttribute('for')) {
                        inputCheckbox.checked = true;
                        addClass(inputCheckbox, "checked");
                        labelSvg.classList.remove("invise");
                        errCheck.classList.add("no-vis");
                    }
                })

            }

            function handleRemoveCheckedInput() {
                if (labelCheckbox) {
                    inputCheckbox.checked = false;
                    removeClass(inputCheckbox, "checked");
                    labelSvg.classList.add("invise");
                }
            }

            function handleRemoveInputFile() {
                if (removeFileButton) {
                    selectedFile = null; // Очищаем переменную с выбранным файлом
                    fileInp.value = ''; // Очищаем input
                    fileDetails.innerHTML = ''; // Очищаем отображение информации о файле
                    addClass(fileInfoCont, 'invise');
                    removeClass(fileLabel, 'invise');
                }
            }

            textarea.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                }
            });

            window.addEventListener("DOMContentLoaded", function () {
                [].forEach.call(document.querySelectorAll("[name='phone']"), function (input) {
                    var keyCode;
                    function mask(event) {
                        event.keyCode && (keyCode = event.keyCode);
                        var pos = this.selectionStart;
                        if (pos < 3) event.preventDefault();
                        var matrix = "+7 (___) ___ ____",
                            i = 0,
                            def = matrix.replace(/\D/g, ""),
                            val = this.value.replace(/\D/g, ""),
                            new_value = matrix.replace(/[_\d]/g, function (a) {
                                return i < val.length ? val.charAt(i++) : a
                            });
                        i = new_value.indexOf("_");
                        if (i != -1) {
                            i < 5 && (i = 3);
                            new_value = new_value.slice(0, i)
                        }
                        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                            function (a) {
                                return "\\d{1," + a.length + "}"
                            }).replace(/[+()]/g, "\\$&");
                        reg = new RegExp("^" + reg + "$");
                        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                            this.value = new_value;
                        }
                        if (event.type == "blur" && this.value.length < 5) {
                            this.value = "";
                        }
                    }

                    input.addEventListener("input", mask, false);
                    input.addEventListener("focus", mask, false);
                    input.addEventListener("blur", mask, false);
                    input.addEventListener("keydown", mask, false);

                });
            });

            function handleErrAnimation(input) {
                input.parentNode.classList.add("err-animation");

                setTimeout(() => {
                    input.parentNode.classList.remove("err-animation");
                }, 250);
            }

            function checkInputsValid(input, num) {
                if (num == 0) {
                    if (!input.classList.contains('checked')) {
                        formBtn.disabled = true;
                        return false;
                    } else {
                        return true;
                    }
                } else if (input.value.length < num) {
                    input.parentNode.classList.add("err");
                    formBtn.disabled = true;
                    return false;
                } else {
                    input.parentNode.classList.remove("err");

                    return true;
                }
            }

            let check;

            function addLisInput(input, num) {
                checkInputsValid(input, num);
                input.addEventListener('input', check = () => {
                    checkInputsValid(input, num);
                    if (checkInputsValid(nameInp, 1) && checkInputsValid(phoneInp, 17) && checkInputsValid(inputCheckbox, 0)) {
                        formBtn.disabled = false;
                    } else {
                        formBtn.disabled = true;
                    }
                })
            }

            function removeLisInput(input) {
                input.removeEventListener('input', check)
            }

            function clearInputs() {
                formSect.querySelectorAll('[type="text"]').forEach(inp => {
                    inp.value = '';
                });
                if (formSect.querySelector('[type="email"]')) {
                    formSect.querySelector('[type="email"]').value = '';
                }
                handleRemoveCheckedInput();
                handleRemoveInputFile();
            }

            function handleAddLoad() {
                if (formSect.querySelector(".overlay_form")) {
                    removeClass(formSect.querySelector(".overlay_form"), "invise");
                    addClass(form, "form_load");
                }
            }

            function handleRemoveLoad() {
                if (formSect.querySelector(".overlay_form")) {
                    addClass(formSect.querySelector(".overlay_form"), "invise");
                    removeClass(form, "form_load");
                }
            }

            function handleTextGood() {
                titlePopupCheck.textContent = 'Спасибо за заявку! Скоро с вами свяжется наш консультант!';
                removeClass(formSect, 'open');
                addClass(overlay, 'open')
                addClass(popupCheck, 'open')
                clearInputs();
                setTimeout(() => {
                    handleRemoveLoad();
                    document.querySelectorAll('.open').forEach(el => {
                        removeClass(el, 'open');
                    })
                }, 3500);
            }

            function handleTextNoGood() {
                titlePopupCheck.textContent = 'Повторите попытку позже';
                removeClass(formSect, 'open');
                addClass(popupCheck, 'open');
                setTimeout(() => {
                    handleRemoveLoad();
                    if (overlay.classList.contains('open')) {
                        addClass(formSect, 'open');
                    }
                }, 3500);
            }

            function handleTextError() {
                titlePopupCheck.textContent = 'Что-то пошло не так';
                removeClass(formSect, 'open');
                addClass(popupCheck, 'open');
                setTimeout(() => {
                    handleRemoveLoad();
                    if (overlay.classList.contains('open')) {
                        addClass(formSect, 'open');
                    }
                }, 3500);
            }

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                removeLisInput(nameInp);
                removeLisInput(phoneInp);
                removeLisInput(inputCheckbox);

                addLisInput(nameInp, 1);
                addLisInput(phoneInp, 17);
                addLisInput(inputCheckbox, 0);

                if (!inputCheckbox.classList.contains('checked')) {
                    removeClass(errCheck, "no-vis");
                }

                if (checkInputsValid(nameInp, 1) && checkInputsValid(phoneInp, 17) && inputCheckbox.classList.contains('checked')) {
                    handleAddLoad();

                    // grecaptcha.ready(function () {
                    //     grecaptcha.execute('6LeHnXgqAAAAACI8Ui3I0XmOdVq1FhxZe4ojSV6k', { action: 'submit' }).then(function (token) {
                    //         let formData = new FormData(form);
                    //         formData.append('token', token);
                    //         fetch('/local/templates/main/tools/send.php', {
                    //             method: 'POST',
                    //             body: formData,
                    //         })
                    //             .then((res) => {
                    //                 return res.json();
                    //             })
                    //             .then(result => {
                    //                 if (result > 0.5) {
                    //                     handleTextGood();
                    //                 } else {
                    //                     handleTextNoGood();
                    //                 }
                    //             })
                    //             .catch((err) => {
                    //                 handleTextError();
                    //                 console.log(err);
                    //             })
                    //     });
                    // });
                    handleTextGood();
                    console.log('form_ok');

                } else {
                    if (!checkInputsValid(nameInp, 1)) {
                        handleErrAnimation(nameInp);
                    }
                    if (!checkInputsValid(phoneInp, 17)) {
                        handleErrAnimation(phoneInp);
                    }
                }
            })
        });
    }

    if (document.querySelector('.with_label')) {
        let input = document.querySelectorAll('.with_label');
        input.forEach(element => {
            let wrapper = element.closest('.input_cont');

            element.addEventListener('focus', () => {
                wrapper.classList.add('focused');
            });

            element.addEventListener('blur', () => {
                if (element.value.trim() === '') {
                    wrapper.classList.remove('focused');
                }
            });
        });
    }

    if (document.querySelector('.footer_mob_menu')) {
        const footer_mob_menu = document.querySelector('.footer_mob_menu');
        const tab_link = footer_mob_menu.querySelectorAll('.tab_link');
        const tab_grids = footer_mob_menu.querySelectorAll('.grid');
        let num = 0;

        tab_grids.forEach(element => {
            if (num > 0) {
                addClass(element, "invise");
            }
            num++;
        });

        tab_link.forEach(tab => {
            tab.addEventListener('click', () => {
                tab_grids.forEach(element => {
                    if (element.id != tab.id) {
                        addClass(element, "invise");
                    } else {
                        removeClass(element, "invise");
                    }
                });
            })
        });
    }

    if (document.querySelector('[data-max-view-cards]')) {
        const dataMaxView = document.querySelector('[data-max-view-cards]');
        const btnMoreCard = dataMaxView.querySelector('#more-card');
        const cards = dataMaxView.querySelectorAll('.card');

        if (dataMaxView.querySelector('.card') && btnMoreCard) {
            let maxView = dataMaxView.getAttribute("data-max-view-cards");
            var numMore = btnMoreCard.getAttribute("data-num-more");
            if (!numMore) {
                var numMore = 4;
            }
            let num = 0;

            cards.forEach(card => {
                if (num + 1 > maxView) {
                    addClass(card, "invise");
                }
                num++;
            });
            btnMoreCard.addEventListener('click', () => {
                let num_2 = 0;
                cards.forEach(card => {
                    if (card.classList.contains("invise")) {
                        if (num_2 < numMore) {
                            console.log('click');
                            removeClass(card, "invise");
                        }
                        num_2++;
                    }
                });
                if (!dataMaxView.querySelector('.card.invise')) {
                    addClass(btnMoreCard, "invise");
                }
            })
        }
    }

    if (document.querySelector('#guest')) {
        const guests = document.querySelectorAll('#guest');

        guests.forEach(guest => {
            let guestCard = guest.querySelectorAll('.card');

            guestCard.forEach(card => {
                card.addEventListener('click', () => {
                    toggleClass(card, "active");
                })
            });
        });
    }

    if (document.getElementById('map')) {

        var map;

        var centerCoordinates;

        var iconSize = window.innerWidth <= 720 ? [100, 100] : [136, 136]; // задаем размеры

        // Функция для обновления центра карты
        function updateMapCenter() {
            if (window.innerWidth > 970) {
                centerCoordinates = [61.2656986286963, 73.43288239896799];
            } else if (window.innerWidth <= 970 && window.innerWidth > 720) {
                centerCoordinates = [61.2656986286963, 73.38288239896799]; // Незначительные координаты для узкого экрана
            } else {
                centerCoordinates = [61.2856986286963, 73.43288239896799]; // Незначительные координаты для узкого экрана
            }

            if (map) {
                map.setView(centerCoordinates); // Устанавливаем новый центр карты, только если карта инициализирована
            }
        }

        DG.then(function () {

            updateMapCenter();

            map = DG.map('map', {
                center: centerCoordinates, // Координаты для центра карты по адресу
                zoom: 13
            });

            // Определяем SVG маркер
            const svgMarker = `
                <svg width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_692_9625)">
<g filter="url(#filter0_d_692_9625)">
<path d="M67.5 105C41.8188 105 21 84.1812 21 58.5C21 32.8188 41.8188 12 67.5 12C93.1812 12 114 32.8188 114 58.5C114 84.1812 93.1812 105 67.5 105Z" fill="#F17B2C"/>
<path d="M25.4687 17.6169C36.8291 6.25653 51.9338 0 68.0002 0C84.0666 0 99.1713 6.25653 110.532 17.6169C121.892 28.9778 128.149 44.0824 128.149 60.1487C128.149 88.4929 108.333 112.963 80.8052 118.927L68.0002 136L55.1949 118.926C27.667 112.963 7.85147 88.4929 7.85147 60.1487C7.85147 44.0824 14.108 28.9778 25.4687 17.6169ZM68.0002 15.7025C43.6392 15.7025 23.8202 35.5218 23.8202 59.8826C23.8202 84.2433 43.6392 104.063 68.0002 104.063C92.3612 104.063 112.18 84.2433 112.18 59.8826C112.18 35.5218 92.3612 15.7025 68.0002 15.7025Z" fill="#F17B2C"/>
</g>
<path d="M46.2134 39.2134V66.2056H43V38.5707C43 37.1509 44.1504 36 45.5707 36H70.7635C72.1838 36 73.3342 37.1509 73.3342 38.5707V66.2056H70.1208V39.2134H46.2134Z" fill="white"/>
<path d="M74.6196 36V39.2134H89.9152V47.311H93.0001V38.5707C93.0001 37.1509 91.8497 36 90.4294 36H74.6196Z" fill="white"/>
<path d="M43 67.6196V71.3471C43 72.7669 44.1504 73.9178 45.5707 73.9178H56.6247V73.2751C56.6247 71.8553 55.4743 70.7044 54.054 70.7044H46.2751V67.6196H43Z" fill="white"/>
<path d="M73.3344 67.4911V71.3471C73.3344 72.7669 72.184 73.9178 70.7637 73.9178H59.9668V73.3407C59.9668 71.921 61.1172 70.77 62.5375 70.77H70.121V67.4911H73.3344Z" fill="white"/>
<path d="M53.4111 75.2029H56.6245V92.1695H53.4111V75.2029Z" fill="white"/>
<path d="M59.9668 75.2029H63.1802V92.1695H59.9668V75.2029Z" fill="white"/>
<path d="M62.9229 51.1671C62.9229 49.7473 64.0732 48.5964 65.4935 48.5964H90.4293C91.8496 48.5964 93 49.7473 93 51.1671V71.3471C93 72.7669 91.8496 73.9178 90.4293 73.9178H77.8329V92.1697H70.1208V88.9563H74.6195V73.9178L77.8329 70.8329H89.7866V51.8098H66.1362V66.2057H62.9229V51.1671Z" fill="white"/>
</g>
<defs>
<filter id="filter0_d_692_9625" x="-24.1484" y="-16" width="184.297" height="200" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="8" operator="erode" in="SourceAlpha" result="effect1_dropShadow_692_9625"/>
<feOffset dy="16"/>
<feGaussianBlur stdDeviation="20"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.345098 0 0 0 0 0.360784 0 0 0 0 0.372549 0 0 0 0.16 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_692_9625"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_692_9625" result="shape"/>
</filter>
<clipPath id="clip0_692_9625">
<rect width="136" height="136" fill="white" transform="matrix(-1 0 0 1 136 0)"/>
</clipPath>
</defs>
</svg>

            `;

            // Создаем кастомный маркер
            const marker = new DG.Marker([61.2656986286963, 73.43288239896799], {
                icon: DG.icon({
                    className: 'custom-marker',
                    iconSize: iconSize,
                    iconUrl: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgMarker)
                })
            }).addTo(map);

            // Добавляем кнопку геолокации
            // DG.control.locate({
            //     position: 'topright', // Позиция кнопки
            //     strings: {
            //         title: 'Показать мое местоположение'
            //     },
            //     follow: true,
            //     keepCurrentZoomLevel: true
            // }).addTo(map);

            // Добавляем кнопку компаса
            // DG.control.scale({
            //     position: 'topright' // Позиция кнопки
            // }).addTo(map);
        });

    }

    if (document.querySelector('.franchise_format')) {
        const franchise_format = document.querySelector('.franchise_format');
        const cont_franchise_format = franchise_format.querySelectorAll('.cont');
        const headerHeight = header.offsetHeight + 20;

        cont_franchise_format.forEach(cont => {
            cont.addEventListener('click', () => {
                cont_franchise_format.forEach(cont_2 => {
                    removeClass(cont_2, "active");
                });
                addClass(cont, "active");
                const elementPosition = cont.getBoundingClientRect().top + window.scrollY; // Позиция элемента относительно окна
                const offsetPosition = elementPosition - headerHeight; // Учитываем высоту заголовка

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            })
        });
    }

    updateMainMargin();

    window.addEventListener('resize', () => {
        if (header) {
            updateMainMargin();
        }

        if (map) {
            updateMapCenter();
        }
    });

    window.addEventListener('scroll', () => {
        if (header) {
            let headerHeight = header.offsetHeight;
            if (window.scrollY > 0) {
                header.classList.add('scrolled_active');
            } else {
                header.classList.remove('scrolled_active');
            }
        }
    });



    console.log('index.js finish work');
});