const {Restaurant, Menu, Item} = require('./models')
const db = require('./db')

describe('Restaurant', () =>
{
    beforeAll((done) =>
    {
        db.exec('CREATE TABLE IF NOT EXISTS restaurants(id INTEGER PRIMARY KEY, name TEXT, image TEXT);', done)

    })
    test('when restaurant created, add to database', async () =>
    {
        const restaurant = await new Restaurant({name:"Betty's tea room", image:"image.url"})
        expect(restaurant.id).toBe(1)
    })

    test('can create an instance of an restaurant from a row', (done) => 
    {
        db.get('SELECT * FROM restaurants WHERE id=?', 1, async (err, row) => 
        {
            const restaurant = await new Restaurant(row)
            expect(restaurant.id).toBe(1)
            expect(restaurant.name).toBe("Betty's tea room")
            db.get('SELECT COUNT(id) AS total FROM restaurants;', (err, count) => 
            {
                expect(count.total).toBe(1)
                done()
            })
        })        
    })

    test.skip('Checking a menu belongs to restaurants', async () => 
    {
        const restaurant2 = await new Restaurant({name:"Yori", image:"image.url"})
        expect(restaurant2.menus.length).toBe(0)
        // const menu2 = await new Menu({title:"Set Menu 2"})
        await restaurant2.addMenu({title:"Set Menu 2"});
        expect(restaurant2.menus[0].title).toBe("Set Menu 2")
        expect(restaurant2.menus[0] instanceof Menu).toBeTruthy()
    })
})


describe('Menu', () =>
{
    beforeAll((done) =>
    {
        db.exec('CREATE TABLE IF NOT EXISTS menus(id INTEGER PRIMARY KEY, title TEXT, restaurant_id INTEGER);', done)

    })
    test('when menu created, add to database', async () =>
    {
        const menu = await new Menu({title:"Set Menu 1"})
        expect(menu.id).toBe(1)
    })

    test('can create an instance of a menus from a row', (done) => 
    {
        db.get('SELECT * FROM menus WHERE id=?', 1, async (err, row) => 
        {
            const menu = await new Menu(row)
            expect(menu.id).toBe(1)
            expect(menu.title).toBe("Set Menu 1")
            db.get('SELECT COUNT(id) AS total FROM restaurants;', (err, count) => 
            {
                expect(count.total).toBe(1)
                done()
            })
        })        
    })
})

describe('Item', () =>
{
    beforeAll((done) =>
    {
        db.exec('CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY, name TEXT, price FLOAT,menu_id INTEGER);', done)

    })
    test('when item created, add to database', async () =>
    {
        const item = await new Item({name:"Alfredo",price: 11.50})
        expect(item.id).toBe(1)
    })

    test('can create an instance of a items from a row', (done) => 
    {
        db.get('SELECT * FROM items WHERE id=?', 1, async (err, row) => 
        {
            const item = await new Item(row)
            expect(item.id).toBe(1)
            expect(item.name).toBe("Alfredo")
            db.get('SELECT COUNT(id) AS total FROM items;', (err, count) => 
            {
                expect(count.total).toBe(1)
                done()
            })
        })        
    })
})