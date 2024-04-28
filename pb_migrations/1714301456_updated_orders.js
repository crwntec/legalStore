/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2c26i3q1lpq8mbe")

  collection.viewRule = "@request.auth.id=user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2c26i3q1lpq8mbe")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
