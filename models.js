const db = require('./db')

class Restaurant
{
    constructor(data)
    {
        const restaurant = this
        restaurant.id = data.id
        restaurant.name = data.name
        restaurant.image = data.image
        restaurant.menus = []

        if(restaurant.id)
        {
            return Promise.resolve(restaurant) 
        } else{
            return new Promise((resolve, reject) =>
            {
                db.run('INSERT INTO restaurants(name, image) VALUES(?,?);',[restaurant.name, restaurant.image], function(err)
                {
                    if(err) return reject(err)
                    restaurant.id = this.lastID
                    return resolve(restaurant)
                    
                })
            })
            
        }
    }

    async addMenu(data) {
        const menu = await new Menu({title: data.title, restaurant_id: this.id})
        this.menus.push(menu)
    }
}

class Menu{
    constructor(data)
    {
        const menu = this
        menu.id = data.id
        menu.title = data.title
        menu.restaurant_id = data.restaurant_id

        if(menu.id)
        {
            return Promise.resolve(menu) 
        } else{
            return new Promise((resolve, reject) =>
            {
                db.run('INSERT INTO menus(title, restaurant_id) VALUES(?,?);',[menu.title, menu.restaurant_id], function(err)
                {
                    if(err) return reject(err)
                    menu.id = this.lastID
                    return resolve(menu)
                    
                })
            })
            
        }
    }
}

class Item
{
    constructor(data)
    {
        const item = this
        item.id = data.id
        item.name = data.name
        item.price = data.price
        item.menu_id = data.menu_id

        if(item.id)
        {
            return Promise.resolve(item) 
        } else{
            return new Promise((resolve, reject) =>
            {
                db.run('INSERT INTO items(name, price) VALUES(?,?);',[item.name, item.price], function(err)
                {
                    if(err) return reject(err)
                    item.id = this.lastID
                    return resolve(item)
                    
                })
            })
            
        }

    }
}

module.exports = {
    Restaurant,
    Menu,
    Item
}