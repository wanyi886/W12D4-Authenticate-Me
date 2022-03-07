// categories model
npx sequelize-cli model:generate --name Category --attributes type:string

// events model
npx sequelize-cli model:generate --name Event --attributes hostId:integer,categoryId:integer,title:string,description:text,imgUrl:text,price:integer,date:date,address:string,city:string,state:string,zipCode:string

// tickets model
npx sequelize-cli model:generate --name Ticket --attributes eventId:integer,userId:integer

npx sequelize-cli seed:generate --name category-data
npx sequelize-cli seed:generate --name event-data
npx sequelize-cli seed:generate --name titcket-data

npx dotenv sequelize db:migrate
npx dotenv sequelize db:migrate:undo:all

npx dotenv sequelize db:seed:all
npx dotenv sequelize db:seed:undo:all
