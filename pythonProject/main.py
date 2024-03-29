# загружаем библиотеку json для парсинга файла с данными
import json
# из библиотеки flask загружаем приложение сервера (Flask) и обработчик шаблонов (render_template)
from flask import Flask, render_template
# создаем экземпляр приложения Flask
app = Flask(__name__)
# открываем файл с данными и парсим из него данные с помощью json, в результате у нас есть список с материалами из файла
figure_list: list = json.load(open('static/data.json', encoding='utf-8'))['figures']
# создаем маршрут доступный по пути '/' (то есть главная страница),
# этот маршрут может только возвращать данные (так как мы указали метод доступа 'GET')
@app.route("/", methods=['GET'])
# функция, которая возвращает то, что надо отобразить по указанному ранее маршруту
def index():
    # используя обработчик шаблона обрабатываем шаблон главной страницы (main.html) и возвращаем результат пользователю
    return render_template("main.html", figures=list(map(lambda x: {"id": x["id"], "name": x["name"] },figure_list)) )
# создаем маршрут доступный по пути '/figures/<figure>', где <figure> - уникальный ключ материала
# этот маршрут может только возвращать данные (так как мы указали метод доступа 'GET')
@app.route("/figures/<figure>", methods=['GET'])
# функция возвращает то, что надо отобразить по указанному ранее маршруту,
# на входе она получает уникальный ключ материала, который лежит в маршруте
def figure_page(figure):
    # используя обработчик шаблона обрабатываем шаблон страницы материала (figure.html),
    # предварительно указав, что в качестве переменной figure надо использовать элемент списка figure_list,
    # лежащий в позиции (уникальный ключ как число минус 1, так как список нумеруется с 0)
    return render_template("figure.html", figure=figure_list[int(figure) - 1], figures=list(map(lambda x: {"id": x["id"], "name": x["name"] },figure_list)) )

# если этот файл запускается самостоятельно, то включить приложение
if __name__ == '__main__':
    app.run()