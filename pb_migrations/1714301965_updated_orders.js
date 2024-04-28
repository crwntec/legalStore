/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2c26i3q1lpq8mbe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ps3u804j",
    "name": "subtotal",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tesvhfen",
    "name": "delivery",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2c26i3q1lpq8mbe")

  // remove
  collection.schema.removeField("ps3u804j")

  // remove
  collection.schema.removeField("tesvhfen")

  return dao.saveCollection(collection)
})
