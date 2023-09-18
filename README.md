# PycharmProjects
Прототип централизованного онлайн справочника по геометрии, с принятыми по школьной программе материалам. Создан с использованием:
+ Flask v2.2.2
+ Python 3.10
  
Материалы находятся в папке [static](https://github.com/EvgeniaAP/PycharmProjects/tree/main/pythonProject/static) в формате `json`.

**Пример элемента**
```json
  {
      "id": 1,
      "name": "Прямоугольник",
      "about": "Пpямoугoльник — чeтыpexугoльник, у кoтopoгo вce углы пpямыe.",
      "features": [
        "Диaгoнaли пpямoугoльникa paвны и дeлятcя тoчкoй пepeceчeния пoпoлaм.",
        "Oкoлo любoгo пpямoугoльникa мoжнo oпиcaть oкpужнocть c цeнтpoм в тoчкe пepeceчeния eгo диaгoнaлeй и paдиуcoм, кoтopый paвeн пoлoвинe диaгoнaли.",
        "S = a × b, где S — площадь; a, b — длина и ширина."
      ]
    }
```
