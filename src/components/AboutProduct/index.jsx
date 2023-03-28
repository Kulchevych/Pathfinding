import classNames from "classnames";
import React, { useState } from "react";
import classes from "./styles.module.scss";

export default function AboutProduct({ handleClose }) {
  const [activeTab, setActiveTab] = useState("Про програму");
  const tabs = ["Про програму", "Інструкція"];

  return (
    <div className={classes.AboutProduct}>
      <div className={classes.container}>
        <div className={classes.header}>
          {tabs.map((tab) => (
            <span
              className={classNames(classes.title, {
                [classes.activeTab]: activeTab === tab,
              })}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </span>
          ))}
          <div className={classes.closeIcon} onClick={() => handleClose()}>
            +
          </div>
        </div>
        {activeTab === 'Про програму' && (
          <div className={classes.text}>
            Програма розроблена у межах продукту "Мережі та потоки" студентами:
            <ul className={classes.list}>
              <li>Безрободько Ілля - керівник</li>
              <li>Воробьов Денис - оратор</li>
              <li>Гавучак Назар - діловод</li>
              <li>Захаров Данило - тестувальник</li>
              <li>Кульчевич Назарій - програміст</li>
            </ul>
            Призначенa для знаходження найкоротшого шляху
            методом Мінті. Програма виконує обчислення найкоротшого шляху від
            початку до кожної вершини, якої можна досягнути. Містить такі функції: 
            <ul className={classes.list}>
              <li>зчитування файлу</li>
              <li>зображення дуг і обмежень</li>
              <li>створення мережі</li>
              <li>додавання вершини</li>
              <li>зміна вершини</li>
              <li>видалення вершини</li>
              <li>вивід кроків обчислення</li>
            </ul>
          </div>
        )}
        {activeTab === 'Інструкція' && (
          <div className={classes.text}>Послідовність використання програми:
          <ul>
              <li>Потрібно мати текстовий файл, в якому кожен окремий рядок повинен містити інформацію про ребро мережі, а саме - з якої вершини виходить та входить ребро й "вага" цього ребра. Усі дані вводяться послідовно через пробіл. 
                <div>
                  Приклад:
                  <ul className={classes.example}>
                    <div>
                      1 2 10
                    </div>
                    <div>
                      1 3 4
                    </div>
                    <div>
                      2 3 8
                    </div>
                  </ul>
                </div>
              </li>
              <li>Натиснути кнопку "Завантажити файл" і обрати файл txt формату</li>
              <li>Побудується таблиця, в яку при потребі можна вносити зміни. Доступно: додавання, видалення при наведенні на стовбець та редагування комірок</li>
              <li>Для запуску програми потрібно натиснути кнопку "Старт", яка побудує мережу</li>
              <li>Щоб запустити алгоритм потрібно натиснути кнопку "Запустити", кнопка "Змінити розташування" дозволяє змінювати положення вершин. Кнопка "Очистити" очищує обчислення алгоритму. Кнопка "Змінити значення" дозволяє повернутися до кроку 2</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}