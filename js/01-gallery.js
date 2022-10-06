// Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного зображення
//  у модальному вікні.

//  Виконуй це завдання у файлах 01-gallery.html і 01-gallery.js.
//  Розбий його на декілька підзавдань:

// 1. Створення і рендер розмітки на підставі масиву даних galleryItems
//  і наданого шаблону елемента галереї.
// 2. Реалізація делегування на div.gallery і отримання url великого зображення.
// 3. Підключення скрипту і стилів бібліотеки модального вікна basicLightbox.
//  Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
//  Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією
//  і прикладами.
//  Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям.
//  Використовуй готову розмітку модального вікна із зображенням з прикладів
//  бібліотеки basicLightbox.

import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
const markup = galleryItems.reduce(
  (acc, { preview, original, description }) =>
    acc +
    `<div class="gallery__item">
            <a class="gallery__link" href="${original}">
                    <img
                    src="${preview}" 
                    alt="${description}"
                    data-source="${original}"
                    class="gallery__image">
                </a>
      </div>`,
  ""
);

galleryContainer.insertAdjacentHTML("beforeend", markup);
galleryContainer.addEventListener("click", onGalleryContainerClick);

function onGalleryContainerClick(evt) {
  evt.preventDefault();
  if (!evt.target.dataset.source) {
    return;
  }
  console.log(evt.target.dataset.source);

  const instance = basicLightbox.create(
    `    <img src=${evt.target.dataset.source} width="800" height="600">`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscapeBtn);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEscapeBtn);
      },
    }
  );
  instance.show();

  // galleryContainer.addEventListener("keydown", (evt) => {
  //   if (evt.code === "Escape") {
  //     instance.close();
  //   }
  // });

  function onEscapeBtn(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }
}
