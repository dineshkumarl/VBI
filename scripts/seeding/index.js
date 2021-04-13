const config = {
    database: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/testdb',
    dropDatabase: true,
    dropCollections:true
};
const path = require('path');
const collectionDataPath = path.resolve(__dirname + "/collection_data"); 

const { Seeder } = require('mongo-seeding');
const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(collectionDataPath, {
    transformers: [
        Seeder.Transformers.replaceDocumentIdWithUnderscoreId,
    ]
});

seeder
.import(collections)
.then(()=>{
    console.log("Seeding successful")
}).catch((e)=>{
    console.log('Seeding failed')
    console.log(e);
})