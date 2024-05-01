/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2c26i3q1lpq8mbe")

  // remove
  collection.schema.removeField("evr4mpud")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zgc90twy",
    "name": "cart",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2c26i3q1lpq8mbe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "evr4mpud",
    "name": "cart",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "6yndc7kh24i4foa",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("zgc90twy")

  return dao.saveCollection(collection)
})
