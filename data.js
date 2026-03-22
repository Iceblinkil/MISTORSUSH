const menuData = [
  {
    category: "Классические роллы",
    categoryEn: "Classic Rolls",
    items: [
      { id: "c1", name: "Ролл маки с лососем", nameEn: "Salmon Maki Roll", price: 25, ingredients: "Рис, нори, лосось", ingredientsEn: "Rice, nori, salmon", image: "img/classic_maki_roll.png" },
      { id: "c2", name: "Ролл маки с тунцом", nameEn: "Tuna Maki Roll", price: 25, ingredients: "Рис, нори, тунец", ingredientsEn: "Rice, nori, tuna", image: "img/classic_maki_roll.png" },
      { id: "c3", name: "Маки соломон-авокадо", nameEn: "Salmon-Avocado Maki", price: 27, ingredients: "Рис, нори, лосось, авокадо", ingredientsEn: "Rice, nori, salmon, avocado", image: "img/classic_maki_roll.png" },
      { id: "c4", name: "Ролл маки с креветкой", nameEn: "Shrimp Maki Roll", price: 30, ingredients: "Рис, нори, креветка", ingredientsEn: "Rice, nori, shrimp", image: "img/classic_maki_roll.png" },
      { id: "c5", name: "Филадельфия с манго", nameEn: "Philadelphia with Mango", price: 51, ingredients: "Рис, нори, кремчиз, соломон, манго", ingredientsEn: "Rice, nori, cream cheese, salmon, mango", image: "img/classic_maki_roll.png" },
      { id: "c6", name: "Филадельфия с огурцом", nameEn: "Philadelphia with Cucumber", price: 48, ingredients: "Рис, нори, лосось, кремчиз, огурец", ingredientsEn: "Rice, nori, salmon, cream cheese, cucumber", image: "img/classic_maki_roll.png" },
      { id: "c7", name: "Филадельфия с авокадо", nameEn: "Philadelphia with Avocado", price: 50, ingredients: "Рис, нори, лосось, кремчиз, авокадо", ingredientsEn: "Rice, nori, salmon, cream cheese, avocado", image: "img/classic_maki_roll.png" },
      { id: "c8", name: "Филадельфия с крабовыми палочками", nameEn: "Philadelphia with Crab Sticks", price: 50, ingredients: "Рис, нори, лосось, кремчиз, крабовые палочки, огурец", ingredientsEn: "Rice, nori, salmon, cream cheese, crab sticks, cucumber", image: "img/classic_maki_roll.png" }
    ]
  },
  {
    category: "Запеченные роллы",
    categoryEn: "Baked Rolls",
    items: [
      { id: "z1", name: "Ролл грибной", nameEn: "Mushroom Roll", price: 50, ingredients: "Рис, нори, грибы Шампиньоны, кремчиз, перец болгарский красный, помидор, кунжут, сырный соус", ingredientsEn: "Rice, nori, mushrooms, cream cheese, red bell pepper, tomato, sesame, cheese sauce", image: "img/baked_sushi_roll.png" },
      { id: "z2", name: "Ролл Белый самурай", nameEn: "White Samurai Roll", price: 60, ingredients: "Рис, нори, лосось, омлет Тамаго, креветка, сырный соус, соус Терияки", ingredientsEn: "Rice, nori, salmon, tamago omelet, shrimp, cheese sauce, teriyaki sauce", image: "img/baked_sushi_roll.png" },
      { id: "z3", name: "Авокадо хакаси", nameEn: "Avocado Hakasi", price: 55, ingredients: "Рис, нори, лосось, кремчиз, огурец, авокадо, сырный соус, морковка", ingredientsEn: "Rice, nori, salmon, cream cheese, cucumber, avocado, cheese sauce, carrots", image: "img/baked_sushi_roll.png" },
      { id: "p1", name: "Вегетарианский бум", nameEn: "Vegetarian Boom", price: 36, ingredients: "Рис, нори, перец красный болгарский, огурец, салат зеленый, авокадо, кунжут", ingredientsEn: "Rice, nori, red bell pepper, cucumber, green lettuce, avocado, sesame", image: "img/baked_sushi_roll.png" },
      { id: "p2", name: "Миндальный ушутоми", nameEn: "Almond Ushutomi", price: 59, ingredients: "Рис, нори, лосось, огурец, кремчиз, соус Терияки, миндаль", ingredientsEn: "Rice, nori, salmon, cucumber, cream cheese, teriyaki sauce, almonds", image: "img/baked_sushi_roll.png" },
      { id: "p3", name: "Фотумаки шамп", nameEn: "Futomaki Champ", price: 40, ingredients: "Рис, нори, омлет Томаго, огурец, грибы Шампиньоны (жареные)", ingredientsEn: "Rice, nori, tamago omelet, cucumber, fried mushrooms", image: "img/baked_sushi_roll.png" },
      { id: "p4", name: "Чиз ролл с креветкой", nameEn: "Cheese Roll with Shrimp", price: 55, ingredients: "Рис, нори, креветка, огурец, сыр сливочный, сыр Чеддер", ingredientsEn: "Rice, nori, shrimp, cucumber, cream cheese, cheddar cheese", image: "img/baked_sushi_roll.png" },
      { id: "p5", name: "Лосось панко", nameEn: "Salmon Panko", price: 47, ingredients: "Рис, нори, лосось слабосолёный, огурец, сливочный сыр, панировочные сухари", ingredientsEn: "Rice, nori, lightly salted salmon, cucumber, cream cheese, breadcrumbs", image: "img/baked_sushi_roll.png" },
      { id: "p6", name: "Новый год", nameEn: "New Year", price: 60, ingredients: "Рис, нори, лосось, кремчиз, укроп, икра лосося", ingredientsEn: "Rice, nori, salmon, cream cheese, dill, salmon caviar", image: "img/baked_sushi_roll.png" },
      { id: "p7", name: "Филадельфия с креветкой", nameEn: "Philadelphia with Shrimp", price: 55, ingredients: "Рис, нори, лосось, кремчиз, огурец, креветки", ingredientsEn: "Rice, nori, salmon, cream cheese, cucumber, shrimp", image: "img/baked_sushi_roll.png" },
      { id: "p8", name: "Травенной ясай маки", nameEn: "Herbal Yasai Maki", price: 55, ingredients: "Рис, нори, огурец, помидор, красный перец болгарский, салат зеленый, кунжут", ingredientsEn: "Rice, nori, cucumber, tomato, red bell pepper, green lettuce, sesame", image: "img/baked_sushi_roll.png" },
      { id: "p9", name: "Зелёный дракон", nameEn: "Green Dragon", price: 57, ingredients: "Рис, нори, лосось, сливочный сыр, огурец, покрыт авокадо, соус Терияки, кунжут", ingredientsEn: "Rice, nori, salmon, cream cheese, cucumber, covered with avocado, teriyaki sauce, sesame", image: "img/baked_sushi_roll.png" },
      { id: "p10", name: "Креветка панко", nameEn: "Shrimp Panko", price: 45, ingredients: "Рис, нори, креветка, сливочный сыр, салат зеленый, панировочные сухари", ingredientsEn: "Rice, nori, shrimp, cream cheese, green lettuce, breadcrumbs", image: "img/baked_sushi_roll.png" },
      { id: "p11", name: "Филадельфия с соломоном", nameEn: "Philadelphia with Salmon", price: 50, ingredients: "Рис, нори, кремчиз, соломон, огурец", ingredientsEn: "Rice, nori, cream cheese, salmon, cucumber", image: "img/baked_sushi_roll.png" }
    ]
  },
  {
    category: "Напитки",
    categoryEn: "Drinks",
    items: []
  }
];
